import React, { useState, useMemo, useCallback } from 'react';
import img from '../../../../images/avatar.jpg';
import moment from 'moment';
import { message } from 'antd';
import CustomTable from '../../../UI/component/CustomTable';
import { Tabs } from 'antd';

const DashboardPage = () => {
    const [sortBy, setSortBy] = useState("upcoming");
    const [isLoading, setIsLoading] = useState(false); // Simulated loading state for demo
    const [data, setData] = useState([]); // Simulated appointment data for demo

    const handleOnSelect = useCallback((value) => {
        setSortBy(value);
    }, []);

    const updatedAppointmentStatus = useCallback((data, type) => {
        message.success("Appointment Updated: " + type);
    }, []);

    // Memoize columns to prevent recreation on every render
    const upcomingColumns = useMemo(() => [
        {
            title: 'Patient Name',
            key: '1',
            width: 100,
            render: function (data) {
                return (
                    <div className="table-avatar">
                        <a className="avatar avatar-sm mr-2 d-flex gap-2">
                            <img className="avatar-img rounded-circle" src={img} alt="" />
                            <div>
                                <p className='p-0 m-0 text-nowrap'>{data?.patient?.firstName + ' ' + data?.patient?.lastName}</p>
                                <p className='p-0 m-0'>{data?.patient?.designation}</p>
                            </div>
                        </a>
                    </div>
                );
            }
        },
        {
            title: 'Appointment Date',
            key: '2',
            width: 100,
            render: function (data) {
                return (
                    <div>{moment(data?.scheduleDate).format("LL")} <span className="d-block text-info">{data?.scheduleTime}</span></div>
                );
            }
        },
        {
            title: 'Status',
            key: '4',
            width: 100,
            render: function (data) {
                return <div>{data?.status}</div>;
            }
        },
    ], []);

    // Dummy data for demonstration
    const dummyUpcomingData = useMemo(() => [
        {
            id: 1,
            patient: { firstName: "John", lastName: "Doe", designation: "Engineer" },
            scheduleDate: "2024-02-09",
            scheduleTime: "10:00 AM",
            status: "pending"
        },
    ], []);

    const dummyTodayData = useMemo(() => [
        {
            id: 2,
            patient: { firstName: "Jane", lastName: "Smith", designation: "Doctor" },
            scheduleDate: "2024-02-09",
            scheduleTime: "11:00 AM",
            status: "scheduled"
        },
    ], []);

    const tabs = useMemo(() => [
        {
            key: '1',
            label: 'Today',
            children: (
                <CustomTable
                    loading={isLoading}
                    columns={upcomingColumns}
                    dataSource={dummyTodayData}
                    showPagination={true}
                    pageSize={10}
                    showSizeChanger={true}
                />
            )
        },
        {
            key: '2',
            label: 'Upcoming',
            children: (
                <CustomTable
                    loading={isLoading}
                    columns={upcomingColumns}
                    dataSource={dummyUpcomingData}
                    showPagination={true}
                    pageSize={10}
                    showSizeChanger={true}
                />
            )
        },
    ], [isLoading, upcomingColumns, dummyTodayData, dummyUpcomingData]);

    return (
        <Tabs defaultActiveKey="1" items={tabs} onChange={handleOnSelect} />
    );
};

export default DashboardPage;
