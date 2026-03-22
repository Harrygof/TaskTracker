import { useState } from 'react';
import { Frequency } from '../types';

interface TaskFormProps {
  onAddTask: (name: string, frequency: Frequency) => void;
}

export const TaskForm = ({ onAddTask }: TaskFormProps) => {
  const [name, setName] = useState('');
  const [frequency, setFrequency] = useState<Frequency>('daily');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onAddTask(name, frequency);
      setName('');
      setFrequency('daily');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <div className="form-group">
        <label htmlFor="taskName">任务名称</label>
        <input
          id="taskName"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="输入任务名称..."
          className="input"
        />
      </div>

      <div className="form-group">
        <label htmlFor="frequency">目标频率</label>
        <select
          id="frequency"
          value={frequency}
          onChange={(e) => setFrequency(e.target.value as Frequency)}
          className="select"
        >
          <option value="daily">每天</option>
          <option value="weekly">每周</option>
          <option value="monthly">每月</option>
        </select>
      </div>

      <button type="submit" className="btn btn-primary">
        创建任务
      </button>
    </form>
  );
};
