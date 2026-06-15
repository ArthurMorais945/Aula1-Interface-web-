import React, { useState } from 'react';
import { motion } from 'motion/react';
import { TaskList, Priority, Category } from '../types';
import Icon from './Icon';

interface NoteEditViewProps {
  list: TaskList;
  categories: Category[];
  onSave: (updatedList: TaskList) => void;
  onBack: () => void;
}

export default function NoteEditView({
  list,
  categories,
  onSave,
  onBack
}: NoteEditViewProps) {
  const [editedList, setEditedList] = useState<TaskList>({ ...list });
  const [textNotes, setTextNotes] = useState(list.notes || '');
  const [isBold, setIsBold] = useState(false);
  const [showCategoryPicker, setShowCategoryPicker] = useState(false);
  const [showReminderPicker, setShowReminderPicker] = useState(false);

  const handlePrioritySelect = (priority: Priority) => {
    setEditedList((prev) => ({ ...prev, priority }));
  };

  const handleSaveNotes = () => {
    const updated = {
      ...editedList,
      notes: textNotes,
      lastEdited: 'Agora'
    };
    onSave(updated);
  };

  const toggleCategorySelection = (catName: string) => {
    const currentCats = editedList.category ? editedList.category.split(', ') : [];
    let updatedCats: string[];
    if (currentCats.includes(catName)) {
      updatedCats = currentCats.filter((c) => c !== catName);
    } else {
      updatedCats = [...currentCats, catName];
    }
    setEditedList((prev) => ({
      ...prev,
      category: updatedCats.join(', ') || 'Nenhuma'
    }));
  };

  const handleSetReminder = (timeStr: string) => {
    setEditedList((prev) => ({ ...prev, reminder: timeStr }));
    setShowReminderPicker(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-brand-surface pb-12 select-none">
      {/* Top Header */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-[#f7dcdc]/30 bg-brand-surface/80 backdrop-blur sticky top-0 z-10">
        <button
          onClick={handleSaveNotes}
          className="p-2 -ml-2 rounded-full hover:bg-brand-surface-variant/20 text-brand-primary transition-colors cursor-pointer"
        >
          <Icon name="ArrowLeft" size={24} />
        </button>
        <div className="flex-1 px-4 text-center">
          <input
            type="text"
            value={editedList.title}
            onChange={(e) => setEditedList({ ...editedList, title: e.target.value })}
            className="text-xl font-bold font-display text-brand-primary text-center bg-transparent focus:outline-none border-b border-transparent focus:border-brand-primary/30"
          />
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 text-brand-primary hover:bg-brand-surface-variant/20 rounded-full cursor-pointer">
            <Icon name="EllipsisVertical" size={20} />
          </button>
          <button className="w-9 h-9 rounded-full bg-brand-surface-variant/60 flex items-center justify-center text-brand-on-surface text-xs font-semibold cursor-pointer border border-[#f7dcdc]">
            img
          </button>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 px-6 pt-6 pb-12 overflow-y-auto max-w-lg mx-auto w-full space-y-6">
        <div>
          <p className="text-sm font-sans text-brand-on-surface-variant/70">
            {editedList.createdAt}
          </p>
        </div>

        {/* Priority Filter segment chips (Matches top chip look in Screen 4) */}
        <div className="flex items-center gap-3">
          <span className="text-brand-on-surface-variant/70 font-semibold text-xs tracking-wider">
            PRIORIDADE:
          </span>
          <div className="flex gap-2">
            {(['Baixa', 'Média', 'Alta'] as Priority[]).map((p) => {
              const matches = editedList.priority === p;
              return (
                <button
                  key={p}
                  type="button"
                  onClick={() => handlePrioritySelect(p)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    matches
                      ? 'bg-brand-primary text-white shadow-sm ring-1 ring-brand-primary'
                      : 'bg-white text-brand-on-surface border border-[#f7dcdc]/50 hover:bg-zinc-50'
                  }`}
                >
                  {p}
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Tablet-Editor Notepad */}
        <div className="bg-white border border-[#f7dcdc]/30 rounded-3xl shadow-sm overflow-hidden flex flex-col min-h-[280px]">
          {/* Notepad Header Actions */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-[#fde2e2]/60 bg-[#fffcfc]">
            <div className="flex items-center gap-5 text-brand-on-surface-variant/60">
              <button
                onClick={() => setIsBold((b) => !b)}
                className={`p-1 rounded hover:bg-pink-50 transition-colors cursor-pointer ${
                  isBold ? 'text-brand-primary bg-pink-100/50' : ''
                }`}
              >
                <Icon name="Bold" size={18} />
              </button>
              <button className="p-1 rounded hover:bg-pink-50 transition-colors cursor-pointer">
                <Icon name="ListTodo" size={18} />
              </button>
              <button
                onClick={() => setShowCategoryPicker((prev) => !prev)}
                className="p-1 rounded hover:bg-pink-50 transition-colors cursor-pointer text-brand-secondary"
              >
                <Icon name="Menu" size={18} />
              </button>
            </div>
            
            <span className="text-xs font-sans text-brand-on-surface-variant/40 italic">
              Última edição: {editedList.lastEdited || 'há 2 min'}
            </span>
          </div>

          {/* Notepad Text Editor Area */}
          <div className="flex-1 p-5 relative">
            <textarea
              value={textNotes}
              onChange={(e) => setTextNotes(e.target.value)}
              className={`w-full h-40 bg-transparent text-brand-on-surface font-sans text-sm focus:outline-none resize-none leading-relaxed ${
                isBold ? 'font-semibold' : ''
              }`}
              placeholder="Digite suas observações ou anotações aqui..."
            />

            {/* Sync Alert Banner overlay */}
            <div className="mt-4 flex items-start gap-3 bg-[#fff0f0] border border-[#fde2e2] rounded-2xl p-4">
              <span className="text-brand-secondary mt-0.5 shrink-0">
                <Icon name="Info" size={18} />
              </span>
              <p className="text-xs text-brand-on-surface-variant font-medium leading-relaxed">
                Estas notas estão sincronizadas com o seu calendário.
              </p>
            </div>
          </div>
        </div>

        {/* Categories trigger card (Screen 4 visual) */}
        <div>
          <button
            onClick={() => setShowCategoryPicker((prev) => !prev)}
            className="w-full flex items-center justify-between bg-brand-surface-container-high/40 hover:bg-brand-surface-container-high/60 border border-[#fde2e2] rounded-2xl p-4 text-left transition-all cursor-pointer shadow-sm"
          >
            <div className="space-y-1">
              <span className="text-brand-secondary text-[10px] font-bold tracking-wider block">
                CATEGORIAS
              </span>
              <span className="text-brand-on-surface font-semibold text-sm">
                {editedList.category || 'Mantenha o Foco'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="p-2 bg-brand-surface-variant/40 rounded-xl text-brand-primary shrink-0">
                <Icon name="ShoppingBasket" size={20} />
              </span>
              <Icon name="ChevronDown" size={16} className={`text-brand-on-surface-variant/50 transition-transform ${showCategoryPicker ? 'rotate-180' : ''}`} />
            </div>
          </button>

          {/* Collapsible Category Multi-picker */}
          {showCategoryPicker && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              className="mt-2 bg-white border border-[#f7dcdc]/30 rounded-2xl p-4 grid grid-cols-2 gap-2 shadow-inner"
            >
              {categories.map((cat) => {
                const currentCats = editedList.category ? editedList.category.split(', ') : [];
                const isSelected = currentCats.includes(cat.name);
                return (
                  <button
                    key={cat.id}
                    onClick={() => toggleCategorySelection(cat.name)}
                    className={`flex items-center gap-2 p-2 rounded-xl border text-xs font-semibold text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-brand-primary text-white border-brand-primary'
                        : 'bg-brand-surface text-brand-on-surface-variant/80 border-[#f7dcdc]/55 hover:bg-pink-50'
                    }`}
                  >
                    <Icon name={cat.icon} size={14} />
                    <span>{cat.name}</span>
                  </button>
                );
              })}
            </motion.div>
          )}
        </div>

        {/* Lembrete dark visual card (Screen 4 visual) */}
        <div>
          <button
            onClick={() => setShowReminderPicker((prev) => !prev)}
            className="w-full flex items-center justify-between bg-[#522851] text-white hover:bg-brand-primary-container rounded-2xl p-5 text-left transition-all cursor-pointer shadow-md"
          >
            <div className="space-y-1">
              <span className="text-pink-300 text-[10px] font-bold tracking-wider block">
                LEMBRETE
              </span>
              <span className="text-white font-bold text-base">
                {editedList.reminder || 'Nenhum programado'}
              </span>
            </div>
            <span className="p-3 bg-white/10 rounded-2xl text-pink-200 shrink-0">
              <Icon name="Clock" size={22} />
            </span>
          </button>

          {/* Quick reminder scheduler */}
          {showReminderPicker && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-2 bg-white border border-[#f7dcdc]/30 rounded-2xl p-4 text-center space-y-2 shadow-lg"
            >
              <h4 className="text-xs font-bold text-brand-primary tracking-wider mb-2">SELECIONE HORÁRIO</h4>
              <div className="grid grid-cols-3 gap-2">
                {['Hoje, 18:00', 'Hoje, 20:00', 'Amanhã, 09:00', 'Amanhã, 14:00', 'Amanhã, 18:00', 'Sexta, 10:00'].map((time) => (
                  <button
                    key={time}
                    onClick={() => handleSetReminder(time)}
                    className="py-2.5 px-1 bg-brand-surface hover:bg-brand-surface-variant/40 text-[11px] text-brand-on-surface font-bold rounded-xl transition-all cursor-pointer"
                  >
                    {time}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
