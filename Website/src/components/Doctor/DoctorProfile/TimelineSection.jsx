import React from 'react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import { FaBriefcase } from "react-icons/fa";

const TimelineSection = ({ sectionTitle, items }) => {
  return (
    <div className="mb-5">
      <h5 className="overview-text">{sectionTitle}</h5>
      <VerticalTimeline>
        {items.map((item, idx) => (
          <VerticalTimelineElement
            key={idx}
            className="vertical-timeline-element--work"
            contentStyle={{ background: '#2e81c4', color: '#fff' }}
            contentArrowStyle={{ borderRight: '7px solid  #2e81c4' }}
            date={item.date}
            iconStyle={{ background: '#2e81c4', color: '#fff' }}
            icon={<FaBriefcase />}
          >
            <h5 className="text-white">{item.title}</h5>
            <h6 className="text-white">{item.subtitle}</h6>
            <p style={{ fontSize: '14px' }}>{item.description}</p>
          </VerticalTimelineElement>
        ))}
      </VerticalTimeline>
    </div>
  );
};

export default TimelineSection;
