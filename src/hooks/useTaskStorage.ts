import { useState, useCallback, useEffect } from 'react';
import { Task, CheckIn } from '../types';

const TASKS_KEY = 'tasks';
const CHECKINS_KEY = 'checkins';

export const useTaskStorage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [checkIns, setCheckIns] = useState<CheckIn[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // 初始化加载数据
  useEffect(() => {
    const savedTasks = localStorage.getItem(TASKS_KEY);
    const savedCheckIns = localStorage.getItem(CHECKINS_KEY);
    
    if (savedTasks) setTasks(JSON.parse(savedTasks));
    if (savedCheckIns) setCheckIns(JSON.parse(savedCheckIns));
    
    setIsLoaded(true);
  }, []);

  // 保存任务到 localStorage
  const saveTasks = useCallback((newTasks: Task[]) => {
    setTasks(newTasks);
    localStorage.setItem(TASKS_KEY, JSON.stringify(newTasks));
  }, []);

  // 保存打卡记录到 localStorage
  const saveCheckIns = useCallback((newCheckIns: CheckIn[]) => {
    setCheckIns(newCheckIns);
    localStorage.setItem(CHECKINS_KEY, JSON.stringify(newCheckIns));
  }, []);

  // 添加任务
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

  // 删除任务
  const deleteTask = useCallback((taskId: string) => {
    saveTasks(tasks.filter(t => t.id !== taskId));
    saveCheckIns(checkIns.filter(c => c.taskId !== taskId));
  }, [tasks, checkIns, saveTasks, saveCheckIns]);

  // 添加打卡记录
  const addCheckIn = useCallback((taskId: string, date: string) => {
    const exists = checkIns.some(c => c.taskId === taskId && c.date === date);
    if (!exists) {
      saveCheckIns([...checkIns, { taskId, date }]);
    }
  }, [checkIns, saveCheckIns]);

  // 获取特定任务的打卡记录
  const getTaskCheckIns = useCallback((taskId: string) => {
    return checkIns.filter(c => c.taskId === taskId);
  }, [checkIns]);

  // 检查某天是否已打卡
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
