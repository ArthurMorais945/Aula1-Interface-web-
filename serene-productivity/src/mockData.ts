import { TaskList, Category, UserProfile, WeeklyStats } from './types';

export const initialUser: UserProfile = {
  name: 'Usuário',
  email: 'alex.rivers@serene.com',
  avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200&h=200'
};

export const initialCategories: Category[] = [
  { id: '1', name: 'Trabalho', icon: 'Briefcase', itemsCount: 12, color: '#522851', bgColor: '#fff0f0' },
  { id: '2', name: 'Pessoal', icon: 'User', itemsCount: 8, color: '#7b4f7b', bgColor: '#fff0f0' },
  { id: '3', name: 'Compras', icon: 'ShoppingBasket', itemsCount: 5, color: '#7b4f7b', bgColor: '#fff0f0' },
  { id: '4', name: 'Saúde', icon: 'Heart', itemsCount: 3, color: '#ba1a1a', bgColor: '#fff0f0' },
  { id: '5', name: 'Finanças', icon: 'Building', itemsCount: 7, color: '#522851', bgColor: '#fff0f0' },
  { id: '6', name: 'Educação', icon: 'GraduationCap', itemsCount: 10, color: '#7b4f7b', bgColor: '#fff0f0' }
];

export const initialTaskLists: TaskList[] = [
  {
    id: 'list-1',
    title: 'Frutas',
    icon: 'ShoppingBasket',
    category: 'Compras',
    status: 'PENDENTE',
    itemsCount: 12, // overall count
    itemCompletedCount: 3,
    subtasks: [
      { id: 'sub-1', title: 'Mamão', completed: true },
      { id: 'sub-2', title: 'Maçã', completed: true },
      { id: 'sub-3', title: 'Pitaya', completed: false },
      { id: 'sub-4', title: 'Morango', completed: false },
      { id: 'sub-5', title: 'Pera', completed: true },
      { id: 'sub-6', title: 'Melancia', completed: false }
    ],
    createdAt: 'Segunda, 06/04/24 - 11h44min',
    dueDate: 'Vence hoje às 18:00',
    priority: 'Média',
    notes: 'Lembrar de comprar bananas verdes para não estragar rápido;',
    lastEdited: 'há 2 min',
    reminder: 'Hoje, 18:00'
  },
  {
    id: 'list-2',
    title: 'Mercearia',
    icon: 'Utensils',
    category: 'Compras',
    status: 'CONCLUÍDO',
    itemsCount: 5,
    itemCompletedCount: 5,
    subtasks: [
      { id: 'sub-7', title: 'Arroz integral', completed: true },
      { id: 'sub-8', title: 'Azeite', completed: true },
      { id: 'sub-9', title: 'Feijão preto', completed: true }
    ],
    createdAt: 'Criado há 2h',
    priority: 'Baixa',
    notes: 'Comprar de preferência marcas orgânicas se disponíveis.',
    reminder: 'Ontem, 15:00'
  },
  {
    id: 'list-3',
    title: 'Dieta',
    icon: 'Dumbbell',
    category: 'Saúde',
    status: 'CONCLUÍDO',
    itemsCount: 3,
    itemCompletedCount: 3,
    subtasks: [
      { id: 'sub-10', title: 'Whey protein de baunilha', completed: true },
      { id: 'sub-11', title: 'Pasta de amendoim integral', completed: true }
    ],
    createdAt: 'Criado há 3 dias',
    priority: 'Alta'
  },
  {
    id: 'list-4',
    title: 'Festa',
    icon: 'PartyPopper',
    category: 'Pessoal',
    status: 'PENDENTE',
    itemsCount: 4,
    itemCompletedCount: 1,
    subtasks: [
      { id: 'sub-12', title: 'Comprar balões coloridos', completed: false },
      { id: 'sub-13', title: 'Encomendar bolo de chocolate', completed: true },
      { id: 'sub-13-2', title: 'Enviar convites', completed: false }
    ],
    createdAt: 'Criado há 5h',
    dueDate: 'Vence amanhã às 18:00',
    priority: 'Alta',
    reminder: 'Amanhã, 18:00',
    notes: 'Festa surpresa! Chamar vizinhos e amigos próximos.'
  },
  {
    id: 'list-5',
    title: 'Trabalho de geografia',
    icon: 'GraduationCap',
    category: 'Educação',
    status: 'CONCLUÍDO',
    itemsCount: 10,
    itemCompletedCount: 10,
    subtasks: [
      { id: 'sub-14', title: 'Pesquisar relevo brasileiro', completed: true },
      { id: 'sub-15', title: 'Imprimir mapas temáticos', completed: true }
    ],
    createdAt: 'Criado há 4 dias',
    priority: 'Alta'
  },
  {
    id: 'list-6',
    title: 'Economia',
    icon: 'CreditCard',
    category: 'Finanças',
    status: 'PENDENTE',
    itemsCount: 1,
    itemCompletedCount: 0,
    subtasks: [
      { id: 'sub-16', title: 'Organizar comprovantes mensais', completed: false }
    ],
    createdAt: 'Criado há 1 semana',
    priority: 'Média'
  }
];

export const initialStats: WeeklyStats = {
  completedRate: 70, // Matches banner "Você concluiu 70% das suas metas de bem-estar..."
  createdCount: 7, // Matches cards in Stats: Listas Criadas = 7
  completedCount: 3, // Matches cards in Stats: Listas Concluídas = 3
  dailyGoalMet: 6, // Matches "6 de 10 concluidas"
  dailyGoalTotal: 10,
  weeklyData: [
    { day: 'Dom', tasksCompleted: 4 },
    { day: 'Seg', tasksCompleted: 7 },
    { day: 'Ter', tasksCompleted: 5 },
    { day: 'Qua', tasksCompleted: 9 },
    { day: 'Qui', tasksCompleted: 6 },
    { day: 'Sex', tasksCompleted: 10 },
    { day: 'Sáb', tasksCompleted: 3 }
  ]
};
