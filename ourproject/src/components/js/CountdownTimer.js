import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ expiryDate, expiryTime }) => {
    // Check if expiryTime is defined and then split it to remove "AM" or "PM"
    const time = expiryTime ? expiryTime.split(" ")[0] : '';
    // Combine expiry date and time into a single string
    const expiryDateTimeString = `${expiryDate}T${time}`;

    const calculateTimeLeft = () => {
        const difference = +new Date(expiryDateTimeString) - +new Date();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60)
            };
        }

        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setTimeout(() => {
            const newTimeLeft = calculateTimeLeft();
            // If time is over, stop the timer
            if (!newTimeLeft.days && !newTimeLeft.hours && !newTimeLeft.minutes && !newTimeLeft.seconds) {
                return clearTimeout(timer);
            }
            setTimeLeft(newTimeLeft);
        }, 1000);

        return () => clearTimeout(timer);
    });

    const { days, hours, minutes, seconds } = timeLeft;

    return (
        <>
            {days || hours || minutes || seconds ? (
                <div className='col-12 '>
                    <div className='col-lg-12 col-12 mt-3 d-flex   text-center align-item-center justify-content-lg-around justify-content-sm-start p-lg-3  gap-2 p-3' style={{ borderRadius: '10px', color: '#fff' }}>
                        <div className='Clock-box d-flex flex-column  justify-content-center align-items-center border border-4 border-danger  shadow-lg'><span className='text-dark' style={{ color: 'black', fontSize: '20px', fontWeight: '600' }}>Days</span><span className='text-dark' style={{ color: 'black', fontSize: '18px ', fontWeight: '600' }}> {days && `${days}`}</span></div>
                        <div className='Clock-box d-flex  flex-column justify-content-center align-items-center border border-4 border-danger  shadow-lg'><span className='text-dark' style={{ color: 'black', fontSize: '20px', fontWeight: '600' }}>Hours</span><span className='text-dark' style={{ color: 'black', fontSize: '18px ', fontWeight: '600' }}>{hours.toString().padStart(2, '0')}</span></div>
                        <div className='Clock-box d-flex  flex-column justify-content-center align-items-center border border-4 border-danger  shadow-lg'><span className='text-dark' style={{ color: 'black', fontSize: '20px', fontWeight: '600' }}>Mins</span><span className='text-dark' style={{ color: 'black', fontSize: '18px ', fontWeight: '600' }}> {minutes.toString().padStart(2, '0')}</span></div>
                        <div className='Clock-box d-flex  flex-column justify-content-center align-items-center border border-4 border-danger  shadow-lg'><span className='text-dark' style={{ color: 'black', fontSize: '20px', fontWeight: '600' }}>Sec</span><span className='text-dark' style={{ color: 'black', fontSize: '18px', fontWeight: '600' }}> {seconds.toString().padStart(2, '0')}</span></div>
                    </div>
                </div>
            ) : (
                <p>Timer expired!</p>
            )}
        </>
    );
};

export default CountdownTimer;
