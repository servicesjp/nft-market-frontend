import moment from 'moment';
import { useState, useEffect } from 'react';

function DateDifference({date}: any) {
  const [difference, setDifference] = useState<number>(0);

  const calculateDifferenceInSeconds = (date: Date) => {
    const currentDate = new Date();
    return Math.floor((date.getTime() - currentDate.getTime()) / 1000);
  };

  const formatDateToRender = () => {
    const textDifference = moment.duration(difference, 'seconds').humanize()
    if (difference < 0) {
      return textDifference + ' ago'
    } else {
      return 'in ' + textDifference;
    }
  }

  useEffect(() => {
    
    if (!date) return

    const targetDate = new Date(date)
    
    const updateDifference = () => {
      const newDifference = calculateDifferenceInSeconds(targetDate);

      setDifference(newDifference);

      if (newDifference <= 60) {
        const intervalId = setInterval(() => {
          const updatedDifference = calculateDifferenceInSeconds(targetDate);
          setDifference(updatedDifference);

          if (updatedDifference > 60) {
            clearInterval(intervalId);
          }
        }, 5000);
      }
    };
    updateDifference();


    const intervalId = setInterval(updateDifference, 60000);

    return () => {
      clearInterval(intervalId);
    };
  }, [date]);

  return (
    <>
        {formatDateToRender()}
    </>
  );
}

export default DateDifference;
