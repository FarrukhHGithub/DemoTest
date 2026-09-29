import React from 'react';
import { Empty } from 'antd';
import { Link } from 'react-router-dom';
import { truncate } from '../../utils/truncate';

const AboutBlogs = ({ isLoading, isError, blogData }) => {
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Something Went Wrong!</div>;
  if (!blogData || blogData.length === 0) return <Empty />;

  return (
    <div className="container" style={{ marginBottom: 100, marginTop: 100 }}>
      <div className="row">
        {blogData.map((item, id) => (
          <div className="col-lg-3 col-md-6" key={id + item.id}>
            <div className="card shadow border-0 mb-5 mb-lg-0">
              <img 
                src={item?.img} 
                alt="blog Image" 
                width={300} 
                height={200} 
                className="w-100 rounded-top image-hover" 
                style={{ objectFit: 'contain' }} 
              />
              <div className='p-2'>
                <Link to={`/blog/${item?.id}`}>
                  <h6 className="text-start mb-1 text-capitalize" style={{ color: '#223a66' }}>{truncate(item?.title, 40)}</h6>
                </Link>
                <div className="px-2">
                  <p className="form-text text-start text-capitalize">{truncate(item?.description, 80)}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutBlogs;
