import React from 'react';
import img2 from '../../../images/features/9.jpeg';
import img3 from '../../../images/features/10.jpeg';
import img4 from '../../../images/features/14.jpeg';
import img5 from '../../../images/features/13.jpeg';
import img6 from '../../../images/features/1.jpeg';
import img7 from '../../../images/features/4.jpeg';
import img8 from '../../../images/features/3.jpeg';
import img9 from '../../../images/features/6.jpeg';
import doctorImg1 from '../../../images/features/doc1.jpeg';
import doctorImg2 from '../../../images/features/doc2.jpeg';
import doctorImg3 from '../../../images/features/doc3.jpeg';
import doctorImg4 from '../../../images/features/doc4.jpeg';
import doctorImg5 from '../../../images/features/doc5.jpeg';
import { Image } from 'antd';
import './index.css';

const imageStyle = {
    width: '100%',
    height: '240px',
    objectFit: 'cover',
    borderRadius: '12px',
    cursor: 'pointer'
};

const Gallery = () => {
    const images = [img2, img3, img4, img5, img6, img7, img8, img9];
    const doctorImages = [doctorImg1, doctorImg2, doctorImg3, doctorImg4, doctorImg5];

    return (
        <section className="section-gallery">
            <div className="container">
                <div className="text-center gallery-header">
                    <div className="section-title mb-4">
                        <span className="section-subtitle">VISUAL TOUR</span>
                        <h2>Our Gallery</h2>
                        <p className="m-0 text-secondary">A visual glimpse into our clinic environment, medical equipment, and clinical interactions.</p>
                    </div>
                </div>

                <div className="d-flex flex-column gap-5">
                    {/* Section for Doctor Images */}
                    <div>
                        <h3 className="gallery-section-title text-center d-block mx-auto mb-4" style={{ width: 'fit-content' }}>Clinical Practice</h3>
                        <Image.PreviewGroup>
                            <div className="gallery-responsive-grid">
                                {doctorImages.map((src, index) => (
                                    <div className="gallery-img-container" key={`doc-${index}`}>
                                        <Image 
                                            src={src} 
                                            alt={`Dr. James Miller ${index + 1}`} 
                                            wrapperStyle={{ width: '100%' }}
                                            loading="lazy"
                                            style={{ 
                                                width: '100%', 
                                                height: '240px', 
                                                objectFit: 'cover', 
                                                borderRadius: '12px' 
                                            }} 
                                        />
                                    </div>
                                ))}
                            </div>
                        </Image.PreviewGroup>
                    </div>

                    {/* Section for Other Images */}
                    <div className="mt-4">
                        <h3 className="gallery-section-title text-center d-block mx-auto mb-4" style={{ width: 'fit-content' }}>Our Facilities</h3>
                        <Image.PreviewGroup>
                            <div className="gallery-responsive-grid">
                                {images.map((item, index) => (
                                    <div className="gallery-img-container" key={`gallery-${index}`}>
                                        <Image 
                                            src={item} 
                                            alt={`Gallery Facility ${index + 1}`} 
                                            wrapperStyle={{ width: '100%' }}
                                            loading="lazy"
                                            style={{ 
                                                width: '100%', 
                                                height: '240px', 
                                                objectFit: 'cover', 
                                                borderRadius: '12px' 
                                            }} 
                                        />
                                    </div>
                                ))}
                            </div>
                        </Image.PreviewGroup>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Gallery;
