import React, { useEffect, useMemo, useCallback } from 'react';
import './BookDoctor.css';
import { Link } from 'react-router-dom';
import { useGetDoctorsQuery } from '../../../redux/api/doctorApi';
import { useAddFavouriteMutation } from '../../../redux/api/favouriteApi';
import { message } from 'antd';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import DoctorWidget from './DoctorWidget';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';

const mockDoctors = [
    {
        id: 'mock-1',
        firstName: 'Dr. James',
        lastName: 'Miller',
        designation: 'Consultant Family Physician',
        specialization: 'MD, FAAFP',
        img: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=300',
        rating: 5,
        reviewsCount: 52,
        location: 'New York, NY',
        availability: 'Mon - Sun',
    },
    {
        id: 'mock-2',
        firstName: 'Dr. Sarah',
        lastName: 'Jenkins',
        designation: 'Pediatric Specialist',
        specialization: 'Child & Adolescent Health',
        img: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300',
        rating: 5,
        reviewsCount: 38,
        location: 'Chicago, IL',
        availability: 'Mon - Fri',
    },
    {
        id: 'mock-3',
        firstName: 'Dr. Marcus',
        lastName: 'Vance',
        designation: 'Consultant Dermatologist',
        specialization: 'Skin Care & Dermatology',
        img: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=300',
        rating: 5,
        reviewsCount: 47,
        location: 'Los Angeles, CA',
        availability: 'Tue - Thu',
    }
];

const BookDoctor = () => {
    const { data, isLoading, isError } = useGetDoctorsQuery({ limit: 10 });
    const [addFavourite, { isSuccess, isLoading: FIsLoading, isError: fIsError, error }] = useAddFavouriteMutation();

    const handleAddFavourite = useCallback((id) => {
        if (id.toString().startsWith('mock')) {
            message.success('Successfully Added Mock Doctor to Favorites!');
            return;
        }
        addFavourite({ doctorId: id });
    }, [addFavourite]);

    useEffect(() => {
        if (!FIsLoading && fIsError) {
            message.error(error?.data?.message || 'Something went wrong');
        }
        if (isSuccess) {
            message.success('Successfully Added to Favorites');
        }
    }, [isSuccess, fIsError, FIsLoading, error?.data?.message]);

    // Memoize final display doctors list to avoid re-computations
    const displayDoctors = useMemo(() => {
        return (!isLoading && !isError && data?.doctors?.length > 0)
            ? data.doctors.map(d => ({
                id: d.id,
                firstName: d.firstName,
                lastName: d.lastName,
                designation: d.designation,
                specialization: d.specialization,
                img: d.img || 'https://via.placeholder.com/150',
                rating: 5,
                reviewsCount: 24,
                location: 'New York, NY',
                availability: 'Available on Fri',
                price: '$100 - $200'
            }))
            : mockDoctors;
    }, [data, isLoading, isError]);

    // Breakpoint settings memoized
    const swiperBreakpoints = useMemo(() => ({
        320: { slidesPerView: 1, spaceBetween: 15 },
        768: { slidesPerView: 2, spaceBetween: 20 }
    }), []);

    return (
        <section className="section-doctor">
            <div className="container">
                <div className="row g-4">
                    <div className="col-lg-4 d-flex flex-column justify-content-center">
                        <div className='mb-4 section-title text-start-lg text-center'>
                            <span className="section-subtitle">OUR SPECIALISTS</span>
                            <h2>Book Our Doctor</h2>
                        </div>
                        <div className="doctor-intro-text">
                            <p>Consult with our highly qualified and experienced family doctors and specialists from the comfort of your home or in person. Your health is our top priority.</p>
                            <p className="d-none d-md-block">Select a doctor, view their available timeslots, and schedule your appointment seamlessly in just a few clicks.</p>
                            <Link to={'/appointment'} className='more-btn mt-3'>See All Doctors</Link>
                        </div>
                    </div>
                    <div className="col-lg-8">
                        <div className="swiper-container-wrapper">
                            <Swiper
                                spaceBetween={20}
                                slidesPerView={2}
                                breakpoints={swiperBreakpoints}
                                modules={[Navigation, Autoplay]}
                                navigation={true}
                                loop={true}
                                autoplay={{ delay: 3000, disableOnInteraction: false }}
                            >
                                {displayDoctors.map((item) => (
                                    <SwiperSlide key={item.id}>
                                        <DoctorWidget item={item} handleAddFavourite={handleAddFavourite} />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </div>
                </div>
            </div>
        </section >
    );
};

export default BookDoctor;