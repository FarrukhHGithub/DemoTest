import React from 'react';
import img from '../../images/logo.png';

const AboutAwards = () => {
  return (
    <div className="container" style={{ marginBottom: 100, marginTop: 100 }}>
        <div className="row align-items-center">
            <div className="col-lg-4">
                <div className='section-title text-center'>
                    <h2 className='text-uppercase'>Our Doctors Acheivement</h2>
                    <p className='form-text m-0'>Lorem ipsum dolor sit amet.</p>
                </div>
            </div>
            <div className="col-lg-8">
                <div className="row">
                    {
                        Array(6).fill(null).map((_, id) => (
                            <div className="col-lg-4 col-md-6 col-sm-6" key={id + 3}>
                                <div className="award-img">
                                    <img src={img} alt="" className="img-fluid" />
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    </div>
  );
};

export default AboutAwards;
