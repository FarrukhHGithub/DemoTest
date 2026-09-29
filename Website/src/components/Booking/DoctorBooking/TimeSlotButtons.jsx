import React from 'react';
import { Empty, Button } from 'antd';

const TimeSlotButtons = ({ dIsLoading, dIsError, time, selectTime, handleSelectTime }) => {
  if (dIsLoading) return <div>Loading ...</div>;
  if (dIsError) return <div>Something went Wrong!</div>;
  if (!time || time.length === 0) return <Empty children="Doctor Is not Available" />;

  return (
    <>
      {time.map((item, id) => (
        <div className="col-md-4" key={id + 155}>
          <Button 
            type={item?.slot?.time === selectTime ? "primary" : "default"} 
            shape="round" 
            size='large' 
            className='mb-3' 
            onClick={() => handleSelectTime(item?.slot?.time)}
          > 
            {item?.slot?.time} 
          </Button>
        </div>
      ))}
    </>
  );
};

export default TimeSlotButtons;
