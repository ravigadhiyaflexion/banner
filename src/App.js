import React, { useState, useEffect } from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import './App.css';
import SocialButton from './SocialButton';
import Loading from './Loading';
import { motion } from "framer-motion";
import { useMediaQuery } from 'react-responsive'


const minuteSeconds = 60;
const hourSeconds = 3600;
const daySeconds = 86400;

const timerProps = {
  isPlaying: true,
  size: 120,
  strokeWidth: 7
};

const renderTime = (dimension, time) => {
  const formattedTime = time < 10 ? `0${time}` : time;
  return (
    <div className="time-wrapper">
      <div className="time">{formattedTime}</div>
      {/* <div>{dimension}</div> */}
    </div>
  );
};

const getTimeSeconds = (time) => (minuteSeconds - time) | 0;
const getTimeMinutes = (time) => ((time % hourSeconds) / minuteSeconds) | 0;
const getTimeHours = (time) => ((time % daySeconds) / hourSeconds) | 0;
const getTimeDays = (time) => (time / daySeconds) | 0;

function App() {
  const [loading, setLoading] = useState(true); // State to manage loading status

  const [endTime, setEndTime] = useState(getEndOfDay());
  const Mobile = useMediaQuery({ query: '(max-width: 428px)' })

  function getEndOfDay() {
    const now = new Date();
    const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0);
    return Math.floor(endOfDay.getTime() / 1000);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setEndTime(getEndOfDay());
    }, 1000 * 60 * 60);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const stratTime = Date.now() / 1000;
  const remainingTime = endTime - stratTime;
  const days = Math.ceil(remainingTime / daySeconds);
  const daysDuration = days * daySeconds;

  const handleClick = (platform) => {
    switch (platform) {
      case 'instagram':
        window.open('https://www.instagram.com/', '_blank');
        break;
      case 'facebook':
        window.open('https://www.facebook.com/', '_blank');
        break;
      case 'linkedin':
        window.open('https://www.linkedin.com/', '_blank');
        break;
      case 'twitter':
        window.open('https://www.twitter.com/', '_blank');
        break;
      default:
        break;
    }
  };

  return (
    <div className="App">
      {loading ? (
        <Loading />
      ) : (<motion.section className="container"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}>

        <motion.div className='social-decoration'
          initial={{
            opacity: 0,
            x: -50
          }} whileInView={{
            opacity: 1,
            x: 0,
            transition: {
              duration: 1
            }
          }}
          viewport={{ once: true }}
        >
          <SocialButton platform="facebook" onClick={handleClick} />
          <SocialButton platform="instagram" onClick={handleClick} />
          <SocialButton platform="twitter" onClick={handleClick} />
          <SocialButton platform="linkedin" onClick={handleClick} />
        </motion.div>
        <motion.div className="clock_content"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          {Mobile ? <h1 style={{ color: '#079EDB' }}>Our site <br />Under Maintenance</h1> : <h1 style={{ color: '#079EDB' }}>Our site Under Maintenance</h1>}
          <h3 style={{ color: '#000000' }}>Our awesome new web is very coming soon.<br />
            We will get back as soon as possible</h3>
          <div className='countdownCircleTimer'>
            <div className='testing'>
              <div className='testing'>
                <CountdownCircleTimer
                  {...timerProps}
                  colors="#079EDB"
                  duration={daysDuration}
                  initialRemainingTime={remainingTime}
                >
                  {({ elapsedTime, color }) => (
                    <span style={{ color }}>
                      {renderTime("days", getTimeDays(daysDuration - elapsedTime))}
                    </span>
                  )}
                </CountdownCircleTimer>
                <div style={{ fontFamily: 'Inter', marginTop: '8px' }}>{"Days"}</div>
              </div>
              <div className='testing'>
                <CountdownCircleTimer
                  {...timerProps}
                  colors="#079EDB"
                  duration={daySeconds}
                  initialRemainingTime={remainingTime % daySeconds}
                  onComplete={(totalElapsedTime) => ({
                    shouldRepeat: remainingTime - totalElapsedTime > hourSeconds
                  })}
                >
                  {({ elapsedTime, color }) => (
                    <span style={{ color }}>
                      {renderTime("hours", getTimeHours(daySeconds - elapsedTime))}
                    </span>
                  )}
                </CountdownCircleTimer>
                <div style={{ fontFamily: 'Inter', marginTop: '8px' }}>{"Hours"}</div>
              </div>
              <div className='testing'>
                <CountdownCircleTimer
                  {...timerProps}
                  colors="#079EDB"
                  duration={hourSeconds}
                  initialRemainingTime={remainingTime % hourSeconds}
                  onComplete={(totalElapsedTime) => ({
                    shouldRepeat: remainingTime - totalElapsedTime > minuteSeconds
                  })}
                >
                  {({ elapsedTime, color }) => (
                    <span style={{ color }}>
                      {renderTime("minutes", getTimeMinutes(hourSeconds - elapsedTime))}
                    </span>
                  )}
                </CountdownCircleTimer>
                <div style={{ fontFamily: 'Inter', marginTop: '8px' }}>{"Minutes"}</div>
              </div>
              <div className='testing'>
                <CountdownCircleTimer
                  {...timerProps}
                  colors="#079EDB"
                  duration={minuteSeconds}
                  initialRemainingTime={remainingTime % minuteSeconds}
                  onComplete={(totalElapsedTime) => ({
                    shouldRepeat: remainingTime - totalElapsedTime > 0
                  })}
                >
                  {({ elapsedTime, color }) => (
                    <span style={{ color }}>
                      {renderTime("seconds", getTimeSeconds(elapsedTime))}
                    </span>
                  )}
                </CountdownCircleTimer>
                <div style={{ fontFamily: 'Inter', marginTop: '8px' }}>{"Seconds"}</div>
              </div>
            </div>
          </div>
          <input type='text' className="email-input" placeholder="Type your email" />
          <button className="button">Notify Me</button>

        </motion.div>
      </motion.section>
      )}
    </div>
  );

}

export default App;
