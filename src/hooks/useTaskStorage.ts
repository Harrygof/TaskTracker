import { useState, useCallback, useEffect } from 'react';
import { Task, CheckIn } from '../types';

const fetchData = () => fetch('/api/data').then(r => r.json());
const postData = (tasks: Task[], checkIns: CheckIn[]) =>
  fetch('/api/data', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ tasks, checkIns }),
  });

export const useTaskStorage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [checkIns, setCheckIns] = useState<CheckIn[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    fetchData().then(data => {
      setTasks(data.tasks ?? []);
      setCheckIns(data.checkIns ?? []);
      setIsLoaded(true);
    });
  }, []);

  const saveTasks = useCallback((newTasks: Task[]) => {
    setTasks(newTasks);
    postData(newTasks, checkIns);
  }, [checkIns]);

  const saveCheckIns = useCallback((newCheckIns: CheckIn[]) => {
    setCheckIns(newCheckIns);
    postData(tasks, newCheckIns);
  }, [tasks]);

  const addTask = useCallback((name: string, frequency: 'daily' | 'weekly' | 'monthly') => {
    const newTask: Task = {
      id: Date.now().toString(),
      name,
      frequency,
      createdAt: new Date().toISOString(),
    };
    saveTasks([...tasks, newTask]);
    return newTask;
  }, [tasks, saveTasks]);

  const deleteTask = useCallback((taskId: string) => {
    saveTasks(tasks.filter(t => t.id !== taskId));
    saveCheckIns(checkIns.filter(c => c.taskId !== taskId));
  }, [tasks, checkIns, saveTasks, saveCheckIns]);

  const addCheckIn = useCallback((taskId: string, date: string) => {
    const exists = checkIns.some(c => c.taskId === taskId && c.date === date);
    if (!exists) {
      saveCheckIns([...checkIns, { taskId, date }]);
    }
  }, [checkIns, saveCheckIns]);

  const getTaskCheckIns = useCallback((taskId: string) => {
    return checkIns.filter(c => c.taskId === taskId);
  }, [checkIns]);

  const hasCheckIn = useCallback((taskId: string, date: string) => {
    return checkIns.some(c => c.taskId === taskId && c.date === date);
  }, [checkIns]);

  return {
    tasks,
    checkIns,
    isLoaded,
    addTask,
    deleteTask,
    addCheckIn,
    getTaskCheckIns,
    hasCheckIn,
  };
};
