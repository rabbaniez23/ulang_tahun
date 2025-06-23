// components/Countdown.tsx
import React, { useEffect, useState } from 'react';

const Countdown: React.FC = () => {
  const calculateTimeLeft = () => {
    const now = new Date().getTime();
    const currentYear = new Date().getFullYear();
    let nextBirthday = new Date(currentYear, 5, 11).getTime(); // 11 Juni (bulan 5 karena 0-indexed)

    if (now > nextBirthday) {
      nextBirthday = new Date(currentYear + 1, 5, 11).getTime();
    }

    const distance = nextBirthday - now;

    return {
      days: Math.floor(distance / (1000 * 60 * 60 * 24)),
      hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((distance % (1000 * 60)) / 1000),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="text-center mt-10 bg-purple-50 p-6 rounded-xl shadow-lg max-w-md mx-auto">
      <h2 className="flex justify-center gap-4 text-lg font-bold text-purple-800">ini countdown ke ulang tahun selanjutnya 🎉</h2>
      <div className="flex justify-center gap-4 text-lg font-semibold text-purple-800">
        <div className="text-center">
          <div className="text-xl">{String(timeLeft.days).padStart(2, '0')}</div>
          <div>Days</div>
        </div>
        <div className="text-center">
          <div className="text-xl">{String(timeLeft.hours).padStart(2, '0')}</div>
          <div>Hours</div>
        </div>
        <div className="text-center">
          <div className="text-xl">{String(timeLeft.minutes).padStart(2, '0')}</div>
          <div>Minutes</div>
        </div>
        <div className="text-center">
          <div className="text-xl">{String(timeLeft.seconds).padStart(2, '0')}</div>
          <div>Seconds</div>
        </div>
      </div>
      <br></br>
      <h2 className="flex justify-center gap-4 text-lg font-bold text-purple-800">aku buat ini biar gk lupa wkwk🎉</h2>
    </div>
  );
};

export default Countdown;
