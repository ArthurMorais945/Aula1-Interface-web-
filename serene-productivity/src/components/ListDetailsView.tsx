import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TaskList, Priority, Subtask } from '../types';
import Icon from './Icon';

interface ListDetailsViewProps {
  list: TaskList;
  onBack: (updatedList: TaskList) => void;
  onShowSaveModal: (updatedList: TaskList, nextAction: () => void) => void;
  onEditNotes: (list: TaskList) => void;
}

export default function ListDetailsView({
  list,
  onBack,
  onShowSaveModal,
  onEditNotes
}: ListDetailsViewProps) {
  const [currentList, setCurrentList] = useState<TaskList>({ ...list });
  const [newSubtaskTitle, setNewSubtaskTitle] = useState('');
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const [activeInputId, setActiveInputId] = useState<string | null>(null);
  
  // Track unmodified list to see if changes occurred
  const initialListRef = useRef<TaskList>({ ...list });

  useEffect(() => {
    setCurrentList({ ...list });
    initialListRef.current = { ...list };
  }, [list]);

  const toggleSubtask = (subId: string) => {
    const updatedSubtasks = currentList.subtasks.map((sub) =>
      sub.id === subId ? { ...sub, completed: !sub.completed } : sub
    );
    
    // Recalculate status and items count
    const completedCount = updatedSubtasks.filter((s) => s.completed).length;
    const isCompleted = completedCount === updatedSubtasks.length && updatedSubtasks.length > 0;
    
    setCurrentList({
      ...currentList,
      subtasks: updatedSubtasks,
      itemCompletedCount: completedCount,
      status: isCompleted ? 'CONCLUÍDO' : 'PENDENTE'
    });
  };

  const handlePriorityChange = (priority: Priority) => {
    setCurrentList({
      ...currentList,
      priority
    });
  };

  const handleAddSubtask = () => {
    if (!newSubtaskTitle.trim()) return;
    const newSub: Subtask = {
      id: `sub-new-${Date.now()}`,
      title: newSubtaskTitle,
      completed: false
    };
    const updatedSubtasks = [...currentList.subtasks, newSub];
    setCurrentList({
      ...currentList,
      subtasks: updatedSubtasks,
      itemsCount: currentList.itemsCount + 1,
      status: 'PENDENTE'
    });
    setNewSubtaskTitle('');
    setIsKeyboardVisible(false);
  };

  const checkUnsavedChangesAndGoBack = () => {
    const hasChanged = JSON.stringify(currentList) !== JSON.stringify(initialListRef.current);
    if (hasChanged) {
      onShowSaveModal(currentList, () => {
        onBack(currentList);
      });
    } else {
      onBack(currentList);
    }
  };

  // Keyboard button click handler
  const handleKeyboardPress = (key: string) => {
    if (key === '⌫') {
      setNewSubtaskTitle((prev) => prev.slice(0, -1));
    } else if (key === 'espaço') {
      setNewSubtaskTitle((prev) => prev + ' ');
    } else if (key === 'Enter' || key === '🔍') {
      handleAddSubtask();
    } else {
      setNewSubtaskTitle((prev) => prev + key);
    }
  };

  const keysRow1 = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'];
  const keysRow2 = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'];
  const keysRow3 = ['z', 'x', 'c', 'v', 'b', 'n', 'm', '⌫'];

  return (
    <div className="flex flex-col min-h-screen bg-brand-surface pb-12 relative select-none">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-[#f7dcdc]/30 bg-brand-surface/80 backdrop-blur sticky top-0 z-10">
        <button
          onClick={checkUnsavedChangesAndGoBack}
          className="p-2 -ml-2 rounded-full hover:bg-brand-surface-variant/20 text-brand-primary transition-colors cursor-pointer"
        >
          <Icon name="ArrowLeft" size={24} />
        </button>
        <span className="text-xl font-bold font-display text-brand-primary">To Do List</span>
        <button
          onClick={() => onEditNotes(currentList)}
          className="w-10 h-10 rounded-full bg-brand-surface-variant/60 flex items-center justify-center text-brand-on-surface text-xs font-semibold cursor-pointer border border-[#f7dcdc]"
        >
          img
        </button>
      </header>

      {/* Main Checklist Body */}
      <div className="flex-1 px-6 pt-6 pb-24 overflow-y-auto max-w-lg mx-auto w-full">
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-extrabold font-display text-brand-primary tracking-tight">
              {currentList.title}
            </h1>
            <button
              onClick={() => onEditNotes(currentList)}
              className="text-brand-secondary hover:text-brand-primary flex items-center gap-1.5 text-sm font-medium hover:underline bg-[#fff]/60 px-3 py-1.5 rounded-full border border-pink-100"
            >
              <Icon name="FileText" size={16} />
              Editar Notas
            </button>
          </div>
          <p className="text-sm font-sans text-brand-on-surface-variant/70 mt-1">
            {currentList.createdAt}
          </p>
        </div>

        {/* Priority Panel (Screen 3 stylized pink box) */}
        <div className="bg-[#fff0f0] border border-[#fde2e2] rounded-2xl p-5 mb-6 shadow-sm">
          <p className="text-brand-primary font-bold text-base mb-3 font-display">Prioridade:</p>
          <div className="flex gap-6">
            {(['Baixa', 'Média', 'Alta'] as Priority[]).map((p) => {
              const isActive = currentList.priority === p;
              return (
                <button
                  key={p}
                  type="button"
                  onClick={() => handlePriorityChange(p)}
                  className="flex items-center gap-2 cursor-pointer group text-brand-on-surface"
                >
                  <div className="relative flex items-center justify-center">
                    <div className="w-5 h-5 rounded-full border-2 border-brand-primary flex items-center justify-center transition-all">
                      {isActive && (
                        <motion.div
                          layoutId="priority-dot"
                          className="w-2.5 h-2.5 rounded-full bg-brand-primary"
                        />
                      )}
                    </div>
                  </div>
                  <span className={`text-sm font-medium ${isActive ? 'font-bold text-brand-primary' : 'text-brand-on-surface-variant'}`}>
                    {p}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Subtask items checklist */}
        <div className="space-y-3.5 mb-24">
          {currentList.subtasks.map((subtask) => (
            <motion.div
              key={subtask.id}
              layout
              className={`flex items-center gap-4 px-4 py-4 rounded-2xl border transition-all ${
                subtask.completed
                  ? 'bg-brand-surface-variant/30 border-transparent opacity-60'
                  : 'bg-white border-[#f7dcdc]/30 shadow-sm hover:shadow-md'
              }`}
            >
              {/* Checklist circle */}
              <button
                onClick={() => toggleSubtask(subtask.id)}
                className="text-brand-primary focus:outline-none transition-transform hover:scale-105 cursor-pointer"
              >
                {subtask.completed ? (
                  <Icon name="CheckCircle2" className="text-brand-secondary" size={24} />
                ) : (
                  <Icon name="Circle" className="text-brand-on-surface-variant/40" size={24} />
                )}
              </button>

              <span
                onClick={() => toggleSubtask(subtask.id)}
                className={`text-brand-on-surface font-medium cursor-pointer flex-1 line-clamp-2 select-none ${
                  subtask.completed ? 'line-through text-brand-on-surface-variant/50' : ''
                }`}
              >
                {subtask.title}
              </span>

              {/* Delete Subtask */}
              <button
                onClick={() => {
                  const updated = currentList.subtasks.filter((s) => s.id !== subtask.id);
                  setCurrentList({
                    ...currentList,
                    subtasks: updated,
                    itemsCount: Math.max(0, currentList.itemsCount - 1)
                  });
                }}
                className="opacity-0 group-hover:opacity-100 hover:opacity-100 p-1 text-red-500 hover:bg-red-50 rounded-lg transition-all cursor-pointer"
              >
                <Icon name="Trash2" size={16} />
              </button>
            </motion.div>
          ))}

          {/* Adicionar uma Subtarefa overlay/interactive bar (Matches floating look in Screen 3) */}
          <div className="rounded-2xl border-2 border-dashed border-brand-secondary/30 bg-[#fff5f5] p-3 mt-4">
            <div className="flex items-center gap-3">
              <span className="text-brand-secondary">
                <Icon name="Plus" size={20} />
              </span>
              <input
                type="text"
                value={newSubtaskTitle}
                onFocus={() => setIsKeyboardVisible(true)}
                onChange={(e) => setNewSubtaskTitle(e.target.value)}
                placeholder="Adicionar uma Subtarefa..."
                className="flex-1 bg-transparent font-medium text-brand-on-surface focus:outline-none text-sm placeholder:text-brand-on-surface-variant/50 placeholder:italic"
              />
              <button
                onClick={handleAddSubtask}
                className="p-1 px-3 bg-brand-primary text-white text-xs font-semibold rounded-lg hover:bg-brand-secondary transition-all cursor-pointer shadow-sm"
              >
                OK
              </button>
              <span className="text-brand-on-surface-variant/60 ml-1">
                <Icon name="FileText" size={18} />
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating simulated mobile keyboard overlay at bottom */}
      <AnimatePresence>
        {isKeyboardVisible && (
          <motion.div
            initial={{ y: 250 }}
            animate={{ y: 0 }}
            exit={{ y: 250 }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="fixed bottom-0 left-0 right-0 bg-[#fde2e2] border-t border-[#efd4d4] px-2 pt-3 pb-8 flex flex-col gap-2 shadow-2xl z-40 max-w-md mx-auto rounded-t-3xl"
          >
            {/* Keyboard row 1 */}
            <div className="flex justify-center gap-1.5 w-full">
              {keysRow1.map((char) => (
                <button
                  key={char}
                  onClick={() => handleKeyboardPress(char)}
                  className="flex-1 max-w-[40px] h-11 bg-white text-brand-on-surface rounded-xl flex items-center justify-center font-semibold text-base shadow-sm hover:bg-pink-50 active:scale-95 transition-all outline-none cursor-pointer"
                >
                  {char}
                </button>
              ))}
            </div>

            {/* Keyboard row 2 */}
            <div className="flex justify-center gap-1.5 w-full px-4">
              {keysRow2.map((char) => (
                <button
                  key={char}
                  onClick={() => handleKeyboardPress(char)}
                  className="flex-1 max-w-[40px] h-11 bg-white text-brand-on-surface rounded-xl flex items-center justify-center font-semibold text-base shadow-sm hover:bg-pink-50 active:scale-95 transition-all outline-none cursor-pointer"
                >
                  {char}
                </button>
              ))}
            </div>

            {/* Keyboard row 3 */}
            <div className="flex justify-center gap-1.5 w-full">
              {keysRow3.map((char) => {
                const isBack = char === '⌫';
                return (
                  <button
                    key={char}
                    onClick={() => handleKeyboardPress(char)}
                    className={`h-11 rounded-xl flex items-center justify-center font-semibold shadow-sm active:scale-95 transition-all outline-none cursor-pointer ${
                      isBack
                        ? 'flex-1 max-w-[60px] bg-[#efd4d4] text-brand-primary'
                        : 'flex-1 max-w-[40px] bg-white text-brand-on-surface'
                    } text-base`}
                  >
                    {char}
                  </button>
                );
              })}
            </div>

            {/* Keyboard row 4 (Space, search, etc.) */}
            <div className="flex justify-between items-center gap-2 w-full px-2 mt-1">
              <button
                onClick={() => handleKeyboardPress('?123')}
                className="w-16 h-11 bg-[#efd4d4] text-brand-on-surface rounded-xl font-semibold text-sm shadow-sm hover:bg-[#ffe9e9] cursor-pointer"
              >
                ?123
              </button>
              <button
                onClick={() => setIsKeyboardVisible(false)}
                className="w-11 h-11 bg-[#efd4d4] text-brand-on-surface rounded-xl flex items-center justify-center shadow-sm cursor-pointer"
              >
                <Icon name="Globe" size={18} />
              </button>
              <button
                onClick={() => handleKeyboardPress('espaço')}
                className="flex-1 h-11 bg-white text-brand-on-surface rounded-xl flex items-center justify-center font-medium shadow-sm active:scale-98 transition-all cursor-pointer"
              >
                espaço
              </button>
              <button
                onClick={() => handleKeyboardPress('🔍')}
                className="w-16 h-11 bg-brand-primary text-white rounded-xl flex items-center justify-center shadow-md hover:bg-brand-primary-container active:scale-95 transition-all cursor-pointer font-bold"
              >
                <Icon name="Search" size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop for closing keybard */}
      {isKeyboardVisible && (
        <div
          className="fixed inset-0 bg-transparent z-30"
          onClick={() => setIsKeyboardVisible(false)}
        />
      )}
    </div>
  );
}
