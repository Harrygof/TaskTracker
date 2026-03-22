import { useState } from 'react';
import { useTaskStorage } from './hooks/useTaskStorage';
import { TaskForm } from './components/TaskForm';
import { TaskList } from './components/TaskList';
import { Calendar } from './components/Calendar';
import './App.css';

function App() {
  const { tasks, isLoaded, addTask, deleteTask, addCheckIn, getTaskCheckIns, hasCheckIn } = useTaskStorage();
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);

  if (!isLoaded) {
    return <div className="loading">加载中...</div>;
  }

  const selectedTask = tasks.find(t => t.id === selectedTaskId);
  const selectedTaskCheckIns = selectedTask ? getTaskCheckIns(selectedTask.id).map(c => c.date) : [];

  return (
    <div className="app">
      <header className="app-header">
        <h1>📋 打卡任务器</h1>
        <p>坚持打卡，养成习惯</p>
      </header>

      <main className="app-main">
        <div className="left-panel">
          <section className="section">
            <h2>创建任务</h2>
            <TaskForm onAddTask={addTask} />
          </section>

          <section className="section">
            <h2>我的任务</h2>
            <TaskList
              tasks={tasks}
              hasCheckIn={hasCheckIn}
              onCheckIn={addCheckIn}
              onDeleteTask={deleteTask}
            />
          </section>
        </div>

        <div className="right-panel">
          {selectedTask ? (
            <section className="section">
              <h2>打卡日历</h2>
              <div className="calendar-container">
                <Calendar task={selectedTask} checkIns={selectedTaskCheckIns} />
              </div>
            </section>
          ) : (
            <div className="empty-calendar">
              <p>选择一个任务查看打卡日历</p>
            </div>
          )}
        </div>
      </main>

      {tasks.length > 0 && (
        <div className="task-selector">
          <label>选择任务查看日历：</label>
          <select
            value={selectedTaskId || ''}
            onChange={(e) => setSelectedTaskId(e.target.value || null)}
            className="select"
          >
            <option value="">-- 选择任务 --</option>
            {tasks.map(task => (
              <option key={task.id} value={task.id}>
                {task.name}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}

export default App;
