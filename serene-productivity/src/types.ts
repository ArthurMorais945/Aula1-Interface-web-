export interface Subtask {
  id: string;
  title: string;
  completed: boolean;
}

export type Priority = 'Baixa' | 'Média' | 'Alta';

export interface TaskList {
  id: string;
  title: string;
  icon: string; // lucide icon name
  category: string; // e.g., 'Trabalho', 'Pessoal'
  status: 'PENDENTE' | 'CONCLUÍDO';
  itemsCount: number;
  itemCompletedCount: number;
  subtasks: Subtask[];
  createdAt: string; // human readable like 'Criado há 2h'
  dueDate?: string; // e.g., 'Vence amanhã às 18:00'
  notes?: string;
  lastEdited?: string; // e.g., 'há 2 min'
  priority?: Priority;
  reminder?: string; // e.g., 'Hoje, 18:00'
}

export interface Category {
  id: string;
  name: string;
  icon: string; // lucide icon name
  itemsCount: number;
  color: string; // prefix hex or tailwind class
  bgColor: string;
}

export interface UserProfile {
  name: string;
  email: string;
  avatarUrl: string;
}

export interface WeeklyStats {
  completedRate: number;
  createdCount: number;
  completedCount: number;
  dailyGoalMet: number; // e.g., 6 (out of 10)
  dailyGoalTotal: number; // e.g., 10
  weeklyData: {
    day: string; // Dom, Seg, Ter...
    tasksCompleted: number;
  }[];
}
