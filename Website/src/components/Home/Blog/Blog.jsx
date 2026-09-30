import React from 'react';
import dayjs from 'dayjs';
import { Empty } from 'antd';
import { useGetAllBlogsQuery } from "../../../redux/api/blogApi";
import { Link } from 'react-router-dom';
import { truncate } from '../../../utils/truncate';
import './Blog.css';

const mockBlogs = [
    {
        id: 'mock-b1',
        title: '5 Essential Tips for Protecting Your Family\'s Health in Winter',
        description: 'Winter brings cold weather and seasonal flu. Discover the key steps you can take to boost immunity, maintain vitamins, and keep your family safe and healthy this season.',
        img: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=400',
        user: { firstName: 'Dr. James', lastName: 'Miller' },
        createdAt: '2024-11-15T10:00:00.000Z',
        tag: 'Family Health',
        readTime: '5 min read'
    },
    {
        id: 'mock-b2',
        title: 'Understanding Continuous Care and Why Your Family Needs a GP',
        description: 'A family doctor does more than write prescriptions. Learn how continuous medical histories and whole-person treatments result in healthier, happier lives for your loved ones.',
        img: 'https://images.unsplash.com/photo-1581056771107-24ca5f033842?auto=format&fit=crop&q=80&w=400',
        user: { firstName: 'Dr. Sarah', lastName: 'Jenkins' },
        createdAt: '2024-11-10T14:30:00.000Z',
        tag: 'Medical Care',
        readTime: '6 min read'
    },
    {
        id: 'mock-b3',
        title: 'The Link Between Physical Well-being and Mental Health',
        description: 'Physical health and mental health are closely connected. Explore simple routines, breathing exercises, and lifestyle adjustments that keep both physical and emotional states in harmony.',
        img: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=400',
        user: { firstName: 'Dr. Marcus', lastName: 'Vance' },
        createdAt: '2024-11-05T09:15:00.000Z',
        tag: 'Mental Wellness',
        readTime: '4 min read'
    }
];

const Blog = () => {
    const { data, isError, isLoading } = useGetAllBlogsQuery({ limit: 3 });
    const blogData = data?.blogs;

    // Use mock data if API has no entries, errors out, or is loading
    const displayBlogs = (!isLoading && !isError && blogData?.length > 0)
        ? blogData.map(b => ({
            id: b.id,
            title: b.title,
            description: b.description,
            img: b.img,
            user: b.user || { firstName: 'Admin', lastName: '' },
            createdAt: b.createdAt,
            tag: 'Health Care',
            readTime: '5 min read'
          }))
        : mockBlogs;

    return (
        <section className="section-blog">
            <div className="container">
                <div className='mb-5 section-title text-center blog-header'>
                    <span className="section-subtitle">LATEST UPDATES</span>
                    <h2>Our Health Blog</h2>
                    <p className='m-0 text-secondary'>Stay updated with the latest medical insights, health advice, and wellness strategies written by our clinical experts.</p>
                </div>
                <div className="row g-4 justify-content-center">
                    {displayBlogs.map((item) => (
                        <div className="col-lg-4 col-md-6 col-sm-12" key={item.id}>
                            <div className="blog-card-custom">
                                <div className="blog-img-container">
                                    {item.img && <img src={item.img} alt="Blog cover" className="blog-image" />}
                                    <span className="blog-tag">{item.tag}</span>
                                </div>
                                <div className="blog-content">
                                    <div className="blog-meta">
                                        <span className="blog-author">{item.user?.firstName + ' ' + item.user?.lastName}</span>
                                        <span className="blog-dot">•</span>
                                        <span className="blog-date">{dayjs(item.createdAt).format('MMM D, YYYY')}</span>
                                    </div>
                                    <h3 className="blog-title">
                                        <Link to={`/appointment`}>{truncate(item.title, 55)}</Link>
                                    </h3>
                                    <p className="blog-desc">{truncate(item.description, 130)}</p>
                                    <div className="blog-footer">
                                        <Link to={`/appointment`} className="read-more-link">
                                            Read Article <i className="ri-arrow-right-line"></i>
                                        </Link>
                                        <span className="read-time">{item.readTime}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className='text-center mt-5'>
                    <Link to={'/appointment'} className='more-btn px-5'>See More Articles</Link>
                </div>
            </div>
        </section>
    );
};

export default Blog;