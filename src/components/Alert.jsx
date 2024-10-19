import React, { useState, useEffect } from 'react';
import { Alert } from 'react-bootstrap';

function TimedAlert() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false); // Hide the alert after 5 seconds
    }, 5000); // 5000 ms = 5 seconds

    // Cleanup the timer on component unmount
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {show && (
        <Alert variant="warning" onClose={() => setShow(false)} dismissible>
          This alert will close after 5 seconds!
        </Alert>
      )}
    </>
  );
}

export default TimedAlert;
