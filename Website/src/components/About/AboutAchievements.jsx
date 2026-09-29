import React from 'react';
import ImageHeading from '../../images/doc/doctor 5.jpg';

const AboutAchievements = () => {
  return (
    <div className="container" style={{ marginBottom: 100, marginTop: 100 }}>
        <div className="row p-5">
            <div className="col-lg-4">
                <div className='section-title text-center'>
                    <h2 className='text-uppercase'>Our Doctors Acheivement</h2>
                    <p className='form-text m-0'>Lorem ipsum dolor sit amet.</p>
                </div>
                <p className='mt-3'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Incidunt, quod laborum alias. Vitae dolorum, officia sit! Saepe ullam facere at, consequatur incidunt, quae esse, quis ut reprehenderit dignissimos, libero delectus.</p>
            </div>

            <div className="col-lg-8">
                <img src={ImageHeading} alt="" className="img-fluid rounded shadow" />
            </div>
        </div>
    </div>
  );
};

export default AboutAchievements;
