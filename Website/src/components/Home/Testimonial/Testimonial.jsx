import React, { useMemo } from 'react';
import './index.css';
import { useGetAllReviewsQuery } from '../../../redux/api/reviewsApi';
import { FaCheckDouble, FaQuoteLeft, FaStar } from "react-icons/fa";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { truncate } from '../../../utils/truncate';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';

const mockReviews = [
    {
        id: 'mock-r1',
        patient: {
            firstName: 'Emily',
            lastName: 'Watson',
            img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150'
        },
        description: 'Dr. Miller is an exceptional family doctor. He took the time to listen to my concerns and explained everything clearly. The continuous care model is exactly what we needed.',
        rating: 5
    },
    {
        id: 'mock-r2',
        patient: {
            firstName: 'David',
            lastName: 'Miller',
            img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150'
        },
        description: 'Excellent clinic service. Booking an appointment was extremely straightforward. The staff was highly professional, and Dr. Miller provided top-tier treatment advice.',
        rating: 5
    },
    {
        id: 'mock-r3',
        patient: {
            firstName: 'Jessica',
            lastName: 'Taylor',
            img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150'
        },
        description: 'I highly recommend MediCare Plus. They are very reliable, professional, and accessible 24/7. It gives my family immense peace of mind to be connected with them.',
        rating: 5
    }
];

const Testimonial = () => {
    const { data, isLoading, isError } = useGetAllReviewsQuery({});

    // Choose data source and memoize array operations
    const displayReviews = useMemo(() => {
        return (!isLoading && !isError && data?.length > 0)
            ? data.slice(0, 10).map(r => ({
                id: r.id,
                patient: r.patient || { firstName: 'Anonymous', lastName: '', img: '' },
                description: r.description,
                rating: 5
              }))
            : mockReviews;
    }, [data, isLoading, isError]);

    // Memoize Swiper breakpoint settings
    const swiperBreakpoints = useMemo(() => ({
        320: { slidesPerView: 1, spaceBetween: 15 },
        992: { slidesPerView: 2, spaceBetween: 30 }
    }), []);

    return (
        <section className="section-testimonial">
            <div className="container">
                <div className='mb-5 section-title text-center testimonial-header'>
                    <span className="section-subtitle">PATIENT FEEDBACK</span>
                    <h2>What Our Patients Say</h2>
                    <p className='m-0 text-secondary'>Read real feedback from families who trust MediCare Plus for their continuous and comprehensive care.</p>
                </div>
                <div className="row justify-content-center">
                    <div className="col-12 col-xl-10">
                        <Swiper
                            spaceBetween={30}
                            slidesPerView={2}
                            breakpoints={swiperBreakpoints}
                            modules={[Navigation, Autoplay]}
                            navigation={true}
                            loop={true}
                            autoplay={{ delay: 4000, disableOnInteraction: false }}
                        >
                            {displayReviews.map((item, index) => (
                                <SwiperSlide key={item.id || index}>
                                    <div className="testimonial-card">
                                        <FaQuoteLeft className="quote-icon" />
                                        <p className="testimonial-desc">{truncate(item.description, 160)}</p>
                                        <div className="testimonial-footer-card">
                                            <div className="d-flex align-items-center gap-3">
                                                <div className="patient-img-wrapper">
                                                    {item.patient?.img ? (
                                                        <img src={item.patient.img} alt="" className="patient-avatar" loading="lazy" />
                                                    ) : (
                                                        <div className="patient-avatar-placeholder">
                                                            {item.patient?.firstName?.charAt(0)}
                                                        </div>
                                                    )}
                                                </div>
                                                <div>
                                                    <h5 className="patient-name">{item.patient?.firstName + ' ' + item.patient?.lastName}</h5>
                                                    <span className="recommended-badge"><FaCheckDouble className="check-icon" /> Recommended</span>
                                                </div>
                                            </div>
                                            <div className="stars-wrapper">
                                                <FaStar className="star-fill" />
                                                <FaStar className="star-fill" />
                                                <FaStar className="star-fill" />
                                                <FaStar className="star-fill" />
                                                <FaStar className="star-fill" />
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonial;