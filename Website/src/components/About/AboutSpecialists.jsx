import React from 'react';
import { Empty } from 'antd';

const AboutSpecialists = ({ isLoading, isError, doctors }) => {
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Something Went Wrong!</div>;
  if (!doctors || doctors.length === 0) return <Empty />;

  return (
    <div className="container" style={{ marginBottom: 100, marginTop: 100 }}>
        <div className="row justify-content-center">
            <div className="col-lg-6">
                <div className='mb-4 section-title text-center'>
                    <h2 className='text-uppercase'>Meet Our Specialist</h2>
                    <p className='form-text m-0'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, ipsum!</p>
                </div>
            </div>
        </div>

        <div className="row">
            {doctors.map((item, id) => (
                <div className="col-lg-3 col-md-6 col-sm-6" key={id + item.id}>
                    <div className="card shadow border-0 mb-5 mb-lg-0">
                        {item.img && <img src={item.img} className="img-fluid w-100" alt="" />}
                        <div className="p-2">
                            <h4 className="mt-4 mb-0" style={{ color: '#223a66' }}><a>{item?.firstName + ' ' + item?.lastName}</a></h4>
                            <p>{item?.designation}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
  );
};

export default AboutSpecialists;
