import React, { useMemo } from 'react'
import './index.css';
import Header from '../Shared/Header/Header';
import Footer from '../Shared/Footer/Footer';
import SubHeader from '../Shared/SubHeader';
import { useGetAllBlogsQuery } from '../../redux/api/blogApi';
import { useGetDoctorsQuery } from '../../redux/api/doctorApi';
import AboutAchievements from './AboutAchievements';
import AboutBlogs from './AboutBlogs';
import AboutAwards from './AboutAwards';
import AboutSpecialists from './AboutSpecialists';

const About = () => {
    const { data: blogQueryResult, isError: blogIsError, isLoading: blogIsLoading } = useGetAllBlogsQuery({ limit: 4 });
    const { data: doctorQueryResult, isLoading: doctorIsLoading, isError: doctorIsError } = useGetDoctorsQuery({ limit: 4 });

    const blogData = useMemo(() => blogQueryResult?.blogs, [blogQueryResult]);
    const doctors = useMemo(() => doctorQueryResult?.doctors, [doctorQueryResult]);

    return (
        <>
            <Header />
            <SubHeader title="about us" subtitle="Lorem ipsum dolor sit amet consectetur adipisicing." />
            
            <AboutAchievements />

            <AboutBlogs 
                isLoading={blogIsLoading} 
                isError={blogIsError} 
                blogData={blogData} 
            />

            <AboutAwards />

            <AboutSpecialists 
                isLoading={doctorIsLoading} 
                isError={doctorIsError} 
                doctors={doctors} 
            />

            <div className="container say-about" style={{ marginBottom: 100, marginTop: 100 }}>
                <div className="row">
                    <div className="col-lg-6 offset-lg-6">
                        <div className='mb-4 section-title text-center'>
                            <h2 className='text-uppercase'>What Doctor's Say</h2>
                            <p className='form-text m-0'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, ipsum!</p>
                        </div>
                    </div>
                </div>

                <div className="row align-items-center">
                    <div className="col-lg-6 offset-lg-6">
                        <div className="my-2">
                            <h4 style={{ color: '#223a66' }} className='my-0'>Amazing service!</h4>
                            <span>John Partho</span>
                        </div>
                        <p className='form-text'>
                            They provide great service facility consectetur adipisicing elit. Itaque rem, praesentium, iure, ipsum magnam deleniti a vel eos adipisci suscipit fugit placeat. Quibusdam laboriosam eveniet nostrum nemo commodi numquam quod.
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default About;