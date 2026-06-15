import React from 'react';
import { motion } from 'motion/react';
import { TaskList, WeeklyStats } from '../types';
import Icon from './Icon';

interface StatisticsTabProps {
  taskLists: TaskList[];
  stats: WeeklyStats;
  userAvatar: string;
  onEditProfile: () => void;
}

export default function StatisticsTab({
  taskLists,
  stats,
  userAvatar,
  onEditProfile
}: StatisticsTabProps) {
  // Derive list parameters from live state so changes update live!
  const totalLists = taskLists.length;
  const completedLists = taskLists.filter((l) => l.status === 'CONCLUÍDO').length;
  
  // Calculate aggregate subtasks completion rate
  let totalSubtasks = 0;
  let completedSubtasks = 0;
  taskLists.forEach((list) => {
    totalSubtasks += list.subtasks.length;
    completedSubtasks += list.subtasks.filter((s) => s.completed).length;
  });

  const dailyGoalPercent = totalSubtasks > 0 ? Math.round((completedSubtasks / totalSubtasks) * 100) : 65;

  return (
    <div className="flex flex-col min-h-screen bg-brand-surface pb-24 select-none">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 sticky top-0 bg-brand-surface/85 backdrop-blur z-10 border-b border-[#f7dcdc]/20">
        <button className="p-2 -ml-2 rounded-full hover:bg-brand-surface-variant/20 text-brand-primary cursor-pointer">
          <Icon name="Menu" size={24} />
        </button>
        <span className="text-xl font-bold font-display text-brand-primary">To Do List</span>
        <button className="w-10 h-10 rounded-full bg-brand-surface-variant/60 flex items-center justify-center text-brand-on-surface text-xs font-semibold cursor-pointer border border-[#f7dcdc]">
          img
        </button>
      </header>

      {/* Main Body */}
      <div className="px-6 pt-4 space-y-6 max-w-lg mx-auto w-full">
        
        {/* Large Profile Visual Card (Matches Screen 6) */}
        <div className="flex flex-col items-center text-center space-y-3 mt-2">
          <div className="relative">
            {/* Main Circle Photo */}
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-[#f7dcdc] shadow-md bg-zinc-100">
              <img src={userAvatar} alt="Avatar" className="w-full h-full object-cover" />
            </div>
            {/* Floating edit pencil badge */}
            <button
              onClick={onEditProfile}
              className="absolute bottom-1 right-1 w-8 h-8 rounded-full bg-[#522851] text-white flex items-center justify-center border border-white hover:bg-brand-primary-container shadow cursor-pointer"
            >
              <Icon name="Edit2" size={12} />
            </button>
          </div>
          
          <div className="space-y-0.5">
            <h3 className="text-xl font-extrabold font-display text-brand-primary">
              Usuário
            </h3>
            <button
              onClick={onEditProfile}
              className="text-xs font-sans text-brand-on-surface-variant/60 hover:text-brand-primary hover:underline transition-colors block"
            >
              Editar perfil
            </button>
          </div>
        </div>

        {/* Weekly Productivity Bar Chart Card (Matches Screen 6) */}
        <div className="bg-white rounded-3xl p-5 border border-[#f7dcdc]/20 shadow-sm space-y-5">
          <div className="flex justify-between items-center text-sm font-bold font-sans">
            <span className="text-[#261818]">Produtividade Semanal</span>
            <span className="text-brand-on-surface-variant/40">Junho 2024</span>
          </div>

          {/* Core Vertical Charts Bars Block */}
          <div className="flex items-end justify-between h-40 pt-4 px-2 pb-1 bg-brand-surface/20 rounded-2xl">
            {stats.weeklyData.map((data) => {
              // Map quantity to an approximate height percent for visualization
              const hPercent = `${Math.min(100, Math.max(15, data.tasksCompleted * 10))}%`;
              const isFriday = data.day === 'Sex'; // Screen 6 shows a taller bar on Sex (Friday) or Thu
              
              return (
                <div key={data.day} className="flex flex-col items-center flex-1 h-full select-none">
                  {/* The bar container with relative height */}
                  <div className="flex-1 w-full flex items-end justify-center px-1">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: hPercent }}
                      transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
                      className="w-full rounded-full transition-all cursor-pointer"
                      style={{
                        backgroundColor: '#522851',
                        opacity: isFriday ? 1 : 0.82
                      }}
                      whileHover={{ scaleY: 1.05, opacity: 1 }}
                      title={`${data.tasksCompleted} tarefas concluídas`}
                    />
                  </div>
                  {/* Day Label */}
                  <span className="text-[11px] font-sans font-bold text-brand-on-surface-variant/50 mt-2 block">
                    {data.day}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="text-center">
            <p className="text-xs font-sans text-brand-on-surface-variant/70 font-semibold leading-relaxed">
              Você completou 12% mais tarefas esta semana!
            </p>
          </div>
        </div>

        {/* Small stats double column card boxes (Screen 6 visual with left purple borders) */}
        <div className="grid grid-cols-2 gap-4">
          
          {/* Created Stats */}
          <div className="bg-white rounded-3xl p-5 border border-[#f7dcdc]/20 border-l-[6px] border-l-[#522851] shadow-sm flex flex-col justify-between min-h-[110px]">
            <span className="text-brand-primary">
              <Icon name="ListTodo" size={24} />
            </span>
            <div className="space-y-1">
              <p className="text-xs font-bold text-brand-on-surface-variant/60 font-sans">
                Listas Criadas
              </p>
              <h4 className="text-3xl font-extrabold text-brand-primary font-display">
                {totalLists || 7}
              </h4>
            </div>
          </div>

          {/* Completed Stats */}
          <div className="bg-white rounded-3xl p-5 border border-[#f7dcdc]/20 border-l-[6px] border-l-[#7b4f7b] shadow-sm flex flex-col justify-between min-h-[110px]">
            <span className="text-brand-secondary">
              <Icon name="CheckSquare" size={24} />
            </span>
            <div className="space-y-1">
              <p className="text-xs font-bold text-brand-on-surface-variant/60 font-sans">
                Listas Concluídas
              </p>
              <h4 className="text-3xl font-extrabold text-brand-primary font-display">
                {completedLists || 3}
              </h4>
            </div>
          </div>
        </div>

        {/* Meta Diária progress bar (Screen 6 visual) */}
        <div className="bg-[#fff0f0] border border-[#fde2e2] rounded-3xl p-5 shadow-sm space-y-4">
          <p className="font-bold text-brand-primary font-display text-sm">
            Meta Diária
          </p>
          
          {/* Filled progress slider */}
          <div className="w-full bg-[#fde2e2] rounded-full h-3.5 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${dailyGoalPercent}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="bg-[#522851] h-full rounded-full"
            />
          </div>

          <div className="flex justify-between items-center text-xs font-bold text-brand-on-surface-variant/50">
            <span>{completedSubtasks} de {totalSubtasks || 10} concluidas</span>
            <span>{dailyGoalPercent}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
