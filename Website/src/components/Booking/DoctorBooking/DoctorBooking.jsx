import React, { useEffect, useState, useCallback, useMemo } from 'react'
import Footer from '../../Shared/Footer/Footer'
import img from '../../../images/doc/doctor 3.jpg'
import './index.css';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, message, Steps } from 'antd';
import { useGetDoctorQuery } from '../../../redux/api/doctorApi';
import { useGetAppointmentTimeQuery } from '../../../redux/api/timeSlotApi';
import moment from 'moment';
import SelectDateAndTime from '../SelectDateAndTime';
import PersonalInformation from '../PersonalInformation';
import CheckoutPage from '../BookingCheckout/CheckoutPage';
import { useCreateAppointmentMutation } from '../../../redux/api/appointmentApi';
import { useDispatch } from 'react-redux';
import { addInvoice } from '../../../redux/feature/invoiceSlice';
import Header from '../../Shared/Header/Header';
import DoctorBrief from './DoctorBrief';
import TimeSlotButtons from './TimeSlotButtons';

const DoctorBooking = () => {
    const dispatch = useDispatch();
    const initialValue = useMemo(() => ({
        paymentMethod: 'paypal',
        paymentType: 'creditCard',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        reasonForVisit: '',
        description: '',
        address: '',
        nameOnCard: '',
        cardNumber: '',
        expiredMonth: '',
        cardExpiredYear: '',
        cvv: '',
    }), []);
    const [current, setCurrent] = useState(0);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectDay, setSelecDay] = useState('');
    const [selectTime, setSelectTime] = useState('');
    const [isCheck, setIsChecked] = useState(false);
    const [createAppointment, { data: appointmentData, isSuccess: createIsSuccess, isError: createIsError, error: createError, isLoading: createIsLoading }] = useCreateAppointmentMutation();
    const { doctorId } = useParams();
    const navigation = useNavigate();
    const { data, isLoading, isError, error } = useGetDoctorQuery(doctorId);
    const { data: time, refetch, isLoading: dIsLoading, isError: dIsError, error: dError } = useGetAppointmentTimeQuery({ day: selectDay, id: doctorId });

    const [selectValue, setSelectValue] = useState(initialValue);
    const [IsdDisable, setIsDisable] = useState(true);
    const [IsConfirmDisable, setIsConfirmDisable] = useState(true);

    const handleChange = useCallback((e) => { 
        setSelectValue(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }, []);

    useEffect(() => {
        const { firstName, lastName, email, phone, nameOnCard, cardNumber, expiredMonth, cardExpiredYear, cvv, reasonForVisit } = selectValue;
        const isInputEmpty = !firstName || !lastName || !email || !phone || !reasonForVisit;
        const isConfirmInputEmpty = !nameOnCard || !cardNumber || !expiredMonth || !cardExpiredYear || !cvv || !isCheck;
        setIsDisable(isInputEmpty);
        setIsConfirmDisable(isConfirmInputEmpty);
    }, [selectValue, isCheck])

    const handleDateChange = useCallback((_date, dateString) => {
        setSelectedDate(dateString)
        setSelecDay(moment(dateString).format('dddd').toLowerCase());
        refetch();
    }, [refetch]);

    const disabledDateTime = useCallback((current) => current && (current < moment().add(1, 'day').startOf('day') || current > moment().add(8, 'days').startOf("day")), []);
    
    const handleSelectTime = useCallback((date) => { setSelectTime(date) }, []);

    const next = useCallback(() => { setCurrent(prev => prev + 1) }, []);
    const prev = useCallback(() => { setCurrent(prev => prev - 1) }, []);

    const dContent = (
        <TimeSlotButtons
            dIsLoading={dIsLoading}
            dIsError={dIsError}
            time={time}
            selectTime={selectTime}
            handleSelectTime={handleSelectTime}
        />
    );

    const content = (
        <DoctorBrief
            isLoading={isLoading}
            isError={isError}
            data={data}
            img={img}
        />
    );

    const steps = useMemo(() => [
        {
            title: 'Select Appointment Date & Time',
            content: <SelectDateAndTime
                content={content}
                handleDateChange={handleDateChange}
                disabledDateTime={disabledDateTime}
                selectedDate={selectedDate}
                dContent={dContent}
                selectTime={selectTime}
            />
        },
        {
            title: 'Patient Information',
            content: <PersonalInformation handleChange={handleChange} selectValue={selectValue} />
        },
        {
            title: 'Payment',
            content: <CheckoutPage
                handleChange={handleChange}
                selectValue={selectValue}
                isCheck={isCheck}
                setIsChecked={setIsChecked}
                data={data}
                selectedDate={selectedDate}
                selectTime={selectTime}
            />,
        },
    ], [content, handleDateChange, disabledDateTime, selectedDate, dContent, selectTime, handleChange, selectValue, isCheck, data]);

    const items = useMemo(() => steps.map((item) => ({
        key: item.title,
        title: item.title,
    })), [steps]);

    const handleConfirmSchedule = useCallback(() => {
        const obj = {};
        obj.patientInfo = {
            firstName: selectValue.firstName,
            lastName: selectValue.lastName,
            email: selectValue.email,
            phone: selectValue.phone,
            patientId: selectValue.patientId,
            scheduleDate: selectedDate,
            scheduleTime: selectTime,
            doctorId: doctorId
        }
        obj.payment = {
            paymentType: selectValue.paymentType,
            paymentMethod: selectValue.paymentMethod,
            cardNumber: selectValue.cardNumber,
            cardExpiredYear: selectValue.cardExpiredYear,
            cvv: selectValue.cvv,
            expiredMonth: selectValue.expiredMonth,
            nameOnCard: selectValue.nameOnCard
        }
        createAppointment(obj);
    }, [selectValue, selectedDate, selectTime, doctorId, createAppointment]);

    useEffect(() => {
        if (createIsSuccess) {
            message.success("Successfully Appointment Scheduled")
            setSelectValue(initialValue);
            dispatch(addInvoice({ ...appointmentData }))
            navigation(`/booking/success/${appointmentData.id}`)
        }
        if (createIsError) {
            message.error(createError?.data?.message || "Error scheduling appointment");
        }
    }, [createIsSuccess, createIsError, createError, appointmentData, dispatch, navigation, initialValue])

    return (
        <>
            <Header />
            <div className="container" style={{ marginBottom: '12rem', marginTop: '8rem' }}>
                <Steps current={current} items={items} />
                <div className='mb-5 mt-3 mx-3'>{steps[current].content}</div>
                <div className='text-end mx-3' >
                    {current < steps.length - 1 && (<Button type="primary"
                        disabled={current === 0 ? (selectTime ? false : true) : IsdDisable || !selectTime}
                        onClick={next}>Next</Button>)}

                    {current === steps.length - 1 && (<Button type="primary" disabled={IsConfirmDisable} loading={createIsLoading} onClick={handleConfirmSchedule}>Confirm</Button>)}
                    {current > 0 && (<Button style={{ margin: '0 8px', }} onClick={prev} >Previous</Button>)}
                </div>
            </div>
            <Footer />
        </>
    )
}

export default DoctorBooking;