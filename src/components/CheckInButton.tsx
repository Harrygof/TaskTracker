import { useState } from 'react';
import { Task } from '../types';

interface CheckInButtonProps {
  task: Task;
  hasCheckedIn: boolean;
  onCheckIn: () => void;
}

export const CheckInButton = ({ task, hasCheckedIn, onCheckIn }: CheckInButtonProps) => {
  const [showMessage, setShowMessage] = useState(false);

  const handleClick = () => {
    if (!hasCheckedIn) {
      onCheckIn();
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 2000);
    }
  };

  const frequencyText: Record<string, string> = { daily: '每天', weekly: '每周', monthly: '每月' };

  return (
    <div className="checkin-card">
      <div className="checkin-info">
        <h3 className="task-name">{task.name}</h3>
        <p className="task-frequency">频率: {frequencyText[task.frequency]}</p>
      </div>

      <button
        onClick={handleClick}
        disabled={hasCheckedIn}
        className={`btn btn-checkin ${hasCheckedIn ? 'checked' : ''}`}
      >
        {hasCheckedIn ? '✓ 已打卡' : '打卡'}
      </button>

      {showMessage && <div className="success-message">打卡成功！</div>}
    </div>
  );
};
