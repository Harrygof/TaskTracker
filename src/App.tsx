import { useState, useEffect } from 'react';
import { useTaskStorage } from './hooks/useTaskStorage';
import { TaskForm } from './components/TaskForm';
import { TaskList } from './components/TaskList';
import { Calendar } from './components/Calendar';
import { ShareCard } from './components/ShareCard';
import './App.css';

function App() {
  const { tasks, isLoaded, addTask, deleteTask, addCheckIn, getTaskCheckIns, hasCheckIn } = useTaskStorage();
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [showShare, setShowShare] = useState(false);

  useEffect(() => {
    if (!isLoaded) return;
    setSelectedTaskId(prev => {
      if (tasks.length === 0) return null;
      if (prev === null || !tasks.find(t => t.id === prev)) return tasks[0].id;
      return prev;
    });
  }, [tasks, isLoaded]);

  if (!isLoaded) return <div className="loading">加载中...</div>;

  const selectedTask = tasks.find(t => t.id === selectedTaskId) ?? null;
  const selectedCheckIns = selectedTask ? getTaskCheckIns(selectedTask.id).map(c => c.date) : [];

  return (
    <div className="app">
      <header className="app-header">
        <div className="app-header-bg" />
        <div className="app-header-center">
          <div className="header-deco">
            <div className="header-deco-line" />
            <span className="header-deco-icon">⚔</span>
            <div className="header-deco-line right" />
          </div>
          <h1>自由的翅膀</h1>
          <p>献给每一个坚持前行的人</p>
        </div>
        {tasks.length > 0 && (
          <button className="btn-share-header" onClick={() => setShowShare(true)}>
            今日分享
          </button>
        )}
      </header>

      <main className="app-main">
        <div className="left-panel">
          <section className="section">
            <h2>新建任务</h2>
            <TaskForm onAddTask={addTask} />
          </section>

          <section className="section">
            <h2>当前任务</h2>
            <TaskList
              tasks={tasks}
              selectedTaskId={selectedTaskId}
              hasCheckIn={hasCheckIn}
              onCheckIn={addCheckIn}
              onDeleteTask={deleteTask}
              onSelectTask={setSelectedTaskId}
            />
          </section>
        </div>

        <div className="right-panel">
          {selectedTask ? (
            <section className="section calendar-section">
              <div className="calendar-task-title">{selectedTask.name}</div>
              <Calendar task={selectedTask} checkIns={selectedCheckIns} />
            </section>
          ) : (
            <div className="empty-calendar">
              <p>创建一个任务，开始你的征途</p>
            </div>
          )}
        </div>
      </main>

      {showShare && (
        <ShareCard
          tasks={tasks}
          hasCheckIn={hasCheckIn}
          onClose={() => setShowShare(false)}
        />
      )}
    </div>
  );
}

export default App;
