import React, { useMemo } from 'react'
import 'react-vertical-timeline-component/style.min.css';
import TimelineSection from './TimelineSection';

const OverView = () => {
    const educationItems = useMemo(() => [
        {
            date: "2011 - 2000",
            title: "American Dental Medical University",
            subtitle: "Miami, FL",
            description: "Creative Direction, User Experience, Visual Design, Project Management, Team Leading"
        },
        {
            date: "2003 - 2005",
            title: "American Dental Medical University",
            subtitle: "Miami, FL",
            description: "Creative Direction, User Experience, Visual Design, Project Management, Team Leading"
        }
    ], []);

    const workExperienceItems = useMemo(() => [
        {
            date: "2010 - Present (5 years)",
            title: "Glowing Smiles Family Dental Clinic",
            subtitle: "Miami, FL",
            description: "Creative Direction, User Experience, Visual Design, Project Management, Team Leading"
        },
        {
            date: "2007 - 2010 (3 years)",
            title: "Comfort Care Dental Clinic",
            subtitle: "Miami, FL",
            description: "Creative Direction, User Experience, Visual Design, Project Management, Team Leading"
        },
        {
            date: "2005 - 2007 (2 years)",
            title: "Dream Smile Dental Practice",
            subtitle: "Miami, FL",
            description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur, dignissimos."
        }
    ], []);

    const awardsItems = useMemo(() => [
        {
            date: "July 2019",
            title: "Humanitarian Award",
            subtitle: "Miami, FL",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin a ipsum tellus. Interdum et malesuada fames ac ante ipsum primis in faucibus."
        },
        {
            date: "March 2011",
            title: "Certificate for International Volunteer Service",
            subtitle: "Miami, FL",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin a ipsum tellus. Interdum et malesuada fames ac ante ipsum primis in faucibus."
        },
        {
            date: "March 2011",
            title: "The Dental Professional of The Year Award",
            subtitle: "Miami, FL",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin a ipsum tellus. Interdum et malesuada fames ac ante ipsum primis in faucibus."
        }
    ], []);

    return (
        <div className="col-md-12 col-lg-9">
            <div className='mb-4'>
                <h5 className='overview-text'>About Me</h5>
                <p className='text-secondary'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div>

            <TimelineSection sectionTitle="Education" items={educationItems} />
            
            <TimelineSection sectionTitle="Work & Experience" items={workExperienceItems} />
            
            <TimelineSection sectionTitle="Awards" items={awardsItems} />

            <div className="mb-4">
                <h5 className='overview-text'>Services</h5>
                <ul>
                    <li>Tooth cleaning </li>
                    <li>Root Canal Therapy</li>
                    <li>Implants</li>
                    <li>Composite Bonding</li>
                    <li>Fissure Sealants</li>
                    <li>Surgical Extractions</li>
                </ul>
            </div>
            <div>
                <h5 className='overview-text'>Specializations</h5>
                <ul className="clearfix">
                    <li>Children Care</li>
                    <li>Dental Care</li>
                    <li>Oral and Maxillofacial Surgery </li>
                    <li>Orthodontist</li>
                    <li>Periodontist</li>
                    <li>Prosthodontics</li>
                </ul>
            </div>
        </div>
    );
};

export default OverView;