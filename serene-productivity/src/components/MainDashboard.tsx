import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TaskList, Category } from '../types';
import Icon from './Icon';

interface MainDashboardProps {
  taskLists: TaskList[];
  categories: Category[];
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onSelectSelection: (list: TaskList) => void;
  onAddNewList: (title: string, category: string, icon: string) => void;
  onToggleCompleteList: (listId: string) => void;
  onDeleteList: (listId: string) => void;
  userAvatar: string;
}

export default function MainDashboard({
  taskLists,
  categories,
  searchQuery,
  setSearchQuery,
  onSelectSelection,
  onAddNewList,
  onToggleCompleteList,
  onDeleteList,
  userAvatar
}: MainDashboardProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newListTitle, setNewListTitle] = useState('');
  const [newListCategory, setNewListCategory] = useState('Pessoal');
  const [newListIcon, setNewListIcon] = useState('Briefcase');

  // Filter lists based on search
  const filteredLists = taskLists.filter(
    (list) =>
      list.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      list.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateList = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newListTitle.trim()) return;
    
    // Auto-resolve icon based on category
    let resolvedIcon = 'ListTodo';
    if (newListCategory === 'Trabalho') resolvedIcon = 'Briefcase';
    else if (newListCategory === 'Pessoal') resolvedIcon = 'User';
    else if (newListCategory === 'Compras') resolvedIcon = 'ShoppingBasket';
    else if (newListCategory === 'Saúde') resolvedIcon = 'Heart';
    else if (newListCategory === 'Finanças') resolvedIcon = 'Building';
    else if (newListCategory === 'Educação') resolvedIcon = 'GraduationCap';

    onAddNewList(newListTitle, newListCategory, resolvedIcon);
    setNewListTitle('');
    setShowAddForm(false);
  };

  // Get matching icon background details
  const getCategoryDetails = (catName: string) => {
    const defaultDetails = { icon: 'ListTodo', color: '#7b4f7b', bgColor: '#fff0f0' };
    const matched = categories.find((c) => c.name === catName);
    if (!matched) return defaultDetails;
    return matched;
  };

  // Calculate items completed for the banner progress bar
  const totalLists = taskLists.length;
  const completedLists = taskLists.filter((l) => l.status === 'CONCLUÍDO').length;
  const progressPercent = totalLists > 0 ? Math.round((completedLists / totalLists) * 100) : 70;

  return (
    <div className="flex flex-col min-h-screen bg-brand-surface pb-24 select-none">
      {/* Top Header */}
      <header className="flex items-center justify-between px-6 py-4 sticky top-0 bg-brand-surface/85 backdrop-blur z-10 border-b border-[#f7dcdc]/20">
        <button className="p-2 -ml-2 rounded-full hover:bg-brand-surface-variant/20 text-brand-primary cursor-pointer">
          <Icon name="Menu" size={24} />
        </button>
        <span className="text-xl font-bold font-display text-brand-primary tracking-tight">To Do List</span>
        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-brand-primary/20 shadow-sm">
          <img src={userAvatar} alt="Perfil" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
        </div>
      </header>

      {/* Main Column */}
      <div className="px-6 pt-5 space-y-6 max-w-lg mx-auto w-full">
        {/* Welcome Text */}
        <div className="space-y-1">
          <h2 className="text-2xl font-black font-display text-brand-primary">
            Olá usuário!
          </h2>
          <p className="text-sm font-sans text-brand-on-surface-variant/80">
            Qual sua próxima lista?
          </p>
        </div>

        {/* Search Bar (Matches Search look in Screen 5) */}
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7f747c]/60">
            <Icon name="Search" size={18} />
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar listas ou tarefas..."
            className="w-full bg-[#fde2e2]/40 text-brand-on-surface border-none rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 placeholder:text-brand-on-surface-variant/50 transition-all font-sans text-sm"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-on-surface-variant/60 hover:text-brand-primary text-xs cursor-pointer font-bold"
            >
              Limpar
            </button>
          )}
        </div>

        {/* Task lists summaries vertical container */}
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {filteredLists.map((list) => {
              const catInfo = getCategoryDetails(list.category);
              const isCompleted = list.status === 'CONCLUÍDO';

              return (
                <motion.div
                  key={list.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white rounded-3xl p-5 border border-[#f7dcdc]/20 hover:border-brand-primary/15 transition-all shadow-sm hover:shadow-md flex flex-col justify-between"
                >
                  <div className="flex items-start justify-between">
                    {/* Title and Icon */}
                    <div
                      onClick={() => onSelectSelection(list)}
                      className="flex items-center gap-4 flex-1 cursor-pointer"
                    >
                      {/* Icon inside tinted pill circle */}
                      <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
                        style={{ backgroundColor: `${catInfo.bgColor}` }}
                      >
                        <span style={{ color: `${catInfo.color}` }}>
                          <Icon name={list.icon} size={22} />
                        </span>
                      </div>

                      {/* Name/Count text */}
                      <div className="space-y-1">
                        <h3 className={`font-bold font-sans text-base text-brand-on-surface transition-colors ${isCompleted ? 'line-through text-brand-on-surface-variant/40' : ''}`}>
                          {list.title}
                        </h3>
                        <div className="flex items-center gap-1.5 text-xs font-sans text-[#7f747c]/70">
                          {list.dueDate ? (
                            <span className="flex items-center gap-1 text-brand-secondary font-semibold">
                              <Icon name="Clock" size={12} />
                              {list.dueDate}
                            </span>
                          ) : (
                            <span>
                              {list.subtasks.length} itens · {list.createdAt.includes('Segunda') ? 'Criado há 2h' : 'Criado há 1 dia'}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Status badge chip (Screen 5 reddish vs green look) */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onToggleCompleteList(list.id)}
                        className={`px-3 py-1.5 rounded-full text-[10px] font-bold tracking-wider transition-all cursor-pointer ${
                          isCompleted
                            ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                            : 'bg-red-50 text-red-700 hover:bg-red-100'
                        }`}
                      >
                        {isCompleted ? 'CONCLUÍDO' : 'PENDENTE'}
                      </button>

                      {/* Drop Action */}
                      <button
                        onClick={() => onDeleteList(list.id)}
                        className="p-1 rounded text-brand-on-surface-variant/40 hover:text-red-600 hover:bg-red-55 border border-transparent hover:border-red-100 transition-colors cursor-pointer"
                        title="Deletar lista"
                      >
                        <Icon name="Trash2" size={14} />
                      </button>
                    </div>
                  </div>

                  {/* Task list quick interactive mini checklists summary */}
                  {list.subtasks.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-brand-surface-variant/30 flex justify-between items-center text-xs font-sans text-brand-on-surface-variant/60">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-brand-primary">
                          {list.subtasks.filter(s => s.completed).length} / {list.subtasks.length}
                        </span>
                        <span>itens concluidos</span>
                      </div>
                      
                      {/* Interactive slide-over trigger shortcut */}
                      <button
                        onClick={() => onSelectSelection(list)}
                        className="text-brand-primary hover:text-brand-secondary font-bold flex items-center gap-0.5 hover:underline cursor-pointer"
                      >
                        Ver Detalhes
                        <Icon name="ChevronRight" size={12} />
                      </button>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Seu progresso semanal Banner block card */}
        <div className="bg-[#522851] rounded-3xl p-6 text-white shadow-lg space-y-4">
          <div className="space-y-1">
            <h4 className="text-lg font-bold font-display text-white">
              Seu progresso semanal
            </h4>
            <p className="text-xs font-sans text-pink-100/80 leading-relaxed">
              Você concluiu {progressPercent}% das suas metas de bem-estar esta semana. Continue assim!
            </p>
          </div>

          {/* Glowing custom slider */}
          <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="bg-gradient-to-r from-pink-300 to-violet-400 h-full rounded-full"
            />
          </div>
        </div>
      </div>

      {/* Embedded slide-up modal to add custom lists */}
      <AnimatePresence>
        {showAddForm && (
          <div className="fixed inset-0 z-40 bg-brand-on-surface/30 backdrop-blur-sm flex items-end justify-center p-4">
            <motion.div
              initial={{ y: 200, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 200, opacity: 0 }}
              className="bg-white rounded-t-[32px] rounded-b-3xl w-full max-w-md p-6 space-y-5 shadow-2xl border border-pink-100"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold font-display text-brand-primary">Nova Lista de Tarefas</h3>
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="p-1 text-brand-on-surface-variant/40 hover:text-brand-primary hover:bg-[#fff0f0] rounded-full cursor-pointer"
                >
                  Fechar
                </button>
              </div>

              <form onSubmit={handleCreateList} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-brand-on-surface-variant/80 block">Título da Lista</label>
                  <input
                    type="text"
                    required
                    value={newListTitle}
                    onChange={(e) => setNewListTitle(e.target.value)}
                    placeholder="Ex: Frutas, Supermercado, Estudos, etc."
                    className="w-full bg-brand-surface text-brand-on-surface border border-pink-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 font-sans"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-brand-on-surface-variant/80 block">Categoria</label>
                  <select
                    value={newListCategory}
                    onChange={(e) => setNewListCategory(e.target.value)}
                    className="w-full bg-brand-surface text-brand-on-surface border border-pink-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 text-sm font-semibold"
                  >
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.name}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <motion.button
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-[#522851] text-white rounded-xl py-3.5 font-bold hover:bg-[#6b3f69] transition-colors shadow-sm cursor-pointer"
                >
                  Criar Lista
                </motion.button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Floating Action Button (FAB) on bottom-right (Matches FAB look in Screen 5 with circle and "+" sign in white) */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowAddForm(true)}
        className="fixed bottom-24 right-6 w-14 h-14 bg-brand-primary hover:bg-brand-primary-container text-white rounded-full flex items-center justify-center shadow-[0_8px_30px_rgba(107,63,105,0.22)] z-30 cursor-pointer border border-[#fde2e2]/40"
      >
        <Icon name="Plus" size={28} />
      </motion.button>
    </div>
  );
}
