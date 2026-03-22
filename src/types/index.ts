export type Frequency = 'daily' | 'weekly' | 'monthly';

export interface Task {
  id: string;
  name: string;
  frequency: Frequency;
  createdAt: string;
}

export interface CheckIn {
  taskId: string;
  date: string;
}
