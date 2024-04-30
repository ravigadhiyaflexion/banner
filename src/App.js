// import FlipClockCountdown from '@leenguyen/react-flip-clock-countdown';
import '@leenguyen/react-flip-clock-countdown/dist/index.css';
import { CountdownCircleTimer } from 'react-countdown-circle-timer'

import "./App.css";
const minuteSeconds = 60;
const hourSeconds = 3600;
const daySeconds = 86400;

const timerProps = {
  isPlaying: true,
  size: 120,
  strokeWidth: 7
};

const renderTime = (dimension, time) => {
  return (
    <div className="time-wrapper">
      <div className="time">{time}</div>
      <div>{dimension}</div>
    </div>
  );
};

const getTimeSeconds = (time) => (minuteSeconds - time) | 0;
const getTimeMinutes = (time) => ((time % hourSeconds) / minuteSeconds) | 0;
const getTimeHours = (time) => ((time % daySeconds) / hourSeconds) | 0;
const getTimeDays = (time) => (time / daySeconds) | 0;


function App() {
  const stratTime = Date.now() / 1000; // use UNIX timestamp in seconds
  const endTime = stratTime + 243248; // use UNIX timestamp in seconds

  const remainingTime = endTime - stratTime;
  const days = Math.ceil(remainingTime / daySeconds);
  const daysDuration = days * daySeconds;
  return (
    <section className="container">
      <div className="clock_content">
        <h1 style={{ color: '#079EDB' }} >Our site Under Maintenance</h1>
        <h3 style={{ color: '#000000' }} >Our awesome new web is very coming soon.<br />
          we will get back soon as possible as</h3>
        <div className='countdownCircleTimer'>
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
          </div>
        </div>
        {/* <FlipClockCountdown
          className='flip-clock'
          de
          to={new Date().getTime() + 24 * 3600 * 1000 + 5000}
          labels={["Days", "Hours", "Minutes", "Seconds"]}
          showLabels
          duration={0.5}
        /> */}
        <input type='text' className="email-input" placeholder="Type your email" />
        <button className="button">Notify Me</button>
      </div>
    </section>
  );
}

export default App;
