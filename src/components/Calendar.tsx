import { useState } from 'react';
import { Task } from '../types';

interface CalendarProps {
  task: Task;
  checkIns: string[];
}

export const Calendar = ({ task, checkIns }: CalendarProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay();

  const days = [];
  for (let i = 0; i < startingDayOfWeek; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1));
  };

  const isCheckedIn = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return checkIns.includes(dateStr);
  };

  const monthNames = [
    '一月', '二月', '三月', '四月', '五月', '六月',
    '七月', '八月', '九月', '十月', '十一月', '十二月'
  ];

  const weekDays = ['日', '一', '二', '三', '四', '五', '六'];

  return (
    <div className="calendar">
      <div className="calendar-header">
        <button onClick={handlePrevMonth} className="btn btn-nav">←</button>
        <h3>{year}年 {monthNames[month]}</h3>
        <button onClick={handleNextMonth} className="btn btn-nav">→</button>
      </div>

      <div className="calendar-weekdays">
        {weekDays.map((day) => (
          <div key={day} className="weekday">
            {day}
          </div>
        ))}
      </div>

      <div className="calendar-days">
        {days.map((day, index) => (
          <div
            key={index}
            className={`calendar-day ${day ? 'active' : 'empty'} ${
              day && isCheckedIn(day) ? 'checked' : ''
            }`}
          >
            {day && (
              <>
                <span className="day-number">{day}</span>
                {isCheckedIn(day) && <span className="checkmark">✓</span>}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
