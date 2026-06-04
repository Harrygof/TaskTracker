import { useState } from 'react';
import { Task } from '../types';

interface CalendarProps {
  task: Task;
  checkIns: string[];
}

export const Calendar = ({ checkIns }: CalendarProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const now = new Date();

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const days: (number | null)[] = [
    ...Array(firstDay.getDay()).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const isCheckedIn = (day: number) => {
    const s = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return checkIns.includes(s);
  };

  const isToday = (day: number) =>
    day === now.getDate() && month === now.getMonth() && year === now.getFullYear();

  const monthNames = ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'];
  const weekDays = ['日','一','二','三','四','五','六'];

  const checkedThisMonth = days.filter(d => d !== null && isCheckedIn(d as number)).length;
  const totalDays = days.filter(d => d !== null).length;

  return (
    <div className="calendar">
      <div className="calendar-header">
        <button onClick={() => setCurrentDate(new Date(year, month - 1))} className="btn btn-nav">‹</button>
        <div className="calendar-title">
          <span className="calendar-month">{monthNames[month]}</span>
          <span className="calendar-year">{year}</span>
        </div>
        <button onClick={() => setCurrentDate(new Date(year, month + 1))} className="btn btn-nav">›</button>
      </div>

      <div className="calendar-stats-row">
        <span className="cal-stat">
          <span className="cal-stat-val">{checkedThisMonth}</span> 已打卡
        </span>
        <span className="cal-stat-sep">·</span>
        <span className="cal-stat">
          剩余 <span className="cal-stat-val">{totalDays - checkedThisMonth}</span> 天
        </span>
        <span className="cal-stat-sep">·</span>
        <span className="cal-stat">
          完成率 <span className="cal-stat-val cal-stat-pct">
            {totalDays > 0 ? Math.round(checkedThisMonth / Math.min(now.getDate(), totalDays) * 100) : 0}%
          </span>
        </span>
      </div>

      <div className="calendar-weekdays">
        {weekDays.map(d => <div key={d} className="weekday">{d}</div>)}
      </div>

      <div className="calendar-days">
        {days.map((day, i) => {
          const checked = day !== null && isCheckedIn(day);
          const today = day !== null && isToday(day);
          return (
            <div
              key={i}
              className={[
                'calendar-day',
                !day ? 'empty' : 'active',
                checked ? 'checked' : '',
                today ? 'today' : '',
              ].filter(Boolean).join(' ')}
            >
              {day && <span className="day-num">{day}</span>}
              {checked && <span className="day-check">✓</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
};
