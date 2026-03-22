import { Task } from '../types';
import { CheckInButton } from './CheckInButton';

interface TaskListProps {
  tasks: Task[];
  hasCheckIn: (taskId: string, date: string) => boolean;
  onCheckIn: (taskId: string, date: string) => void;
  onDeleteTask: (taskId: string) => void;
}

export const TaskList = ({ tasks, hasCheckIn, onCheckIn, onDeleteTask }: TaskListProps) => {
  const today = new Date().toISOString().split('T')[0];

  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <p>还没有任务，创建一个开始打卡吧！</p>
      </div>
    );
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <div key={task.id} className="task-item">
          <CheckInButton
            task={task}
            hasCheckedIn={hasCheckIn(task.id, today)}
            onCheckIn={() => onCheckIn(task.id, today)}
          />
          <button
            onClick={() => onDeleteTask(task.id)}
            className="btn btn-delete"
            title="删除任务"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
};
