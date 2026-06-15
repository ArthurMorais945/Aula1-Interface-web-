import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Category } from '../types';
import Icon from './Icon';

interface CategoriesTabProps {
  categories: Category[];
  onAddNewCategory: (name: string, icon: string, color: string) => void;
  onSelectCategoryFilter: (categoryName: string) => void;
  userAvatar: string;
}

export default function CategoriesTab({
  categories,
  onAddNewCategory,
  onSelectCategoryFilter,
  userAvatar
}: CategoriesTabProps) {
  const [showAddCat, setShowAddCat] = useState(false);
  const [newCatName, setNewCatName] = useState('');
  const [newCatIcon, setNewCatIcon] = useState('Briefcase');
  const [newCatColor, setNewCatColor] = useState('#7b4f7b');

  const handleSubmitCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName.trim()) return;
    onAddNewCategory(newCatName, newCatIcon, newCatColor);
    setNewCatName('');
    setShowAddCat(false);
  };

  const availableIcons = [
    { label: 'Trabalho', value: 'Briefcase' },
    { label: 'Pessoal', value: 'User' },
    { label: 'Compras', value: 'ShoppingBasket' },
    { label: 'Saúde', value: 'Heart' },
    { label: 'Finanças', value: 'Building' },
    { label: 'Educação', value: 'GraduationCap' },
    { label: 'Utensílios', value: 'Utensils' },
    { label: 'Esporte', value: 'Dumbbell' },
    { label: 'Eventos', value: 'PartyPopper' }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-brand-surface pb-24 select-none">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 sticky top-0 bg-brand-surface/85 backdrop-blur z-15 border-b border-[#f7dcdc]/20">
        <div className="w-10 h-10 rounded-full overflow-hidden border border-[#f7dcdc] shadow-sm">
          <img src={userAvatar} alt="Perfil" className="w-full h-full object-cover" />
        </div>
        <span className="text-xl font-bold font-display text-brand-primary">Categorias</span>
        <button className="p-2 -mr-2 rounded-full hover:bg-brand-surface-variant/20 text-brand-primary cursor-pointer">
          <Icon name="Search" size={24} />
        </button>
      </header>

      {/* Categories Body inside custom max-width wrapper */}
      <div className="px-6 pt-5 space-y-6 max-w-lg mx-auto w-full">
        
        {/* VISÃO GERAL PROGRESS (Matches top slide in Screen 1) */}
        <div className="bg-[#fff0f0] border border-[#fde2e2] rounded-3xl p-5 shadow-sm space-y-3.5">
          <div className="flex justify-between items-center text-xs font-bold tracking-wider">
            <span className="text-brand-on-surface-variant/50">VISÃO GERAL</span>
            <span className="text-brand-primary block">85% Meta Concluída</span>
          </div>
          
          <div className="space-y-1">
            <h3 className="text-base font-extrabold font-display text-brand-primary">
              Produtividade Semanal
            </h3>
            {/* Custom slider loaded filled at 85% */}
            <div className="w-full bg-[#f7dcdc]/50 rounded-full h-3 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '85%' }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="bg-[#522851] h-full rounded-full"
              />
            </div>
          </div>
        </div>

        {/* Categories Bento Grid (2 Columns, Screen 1 visual) */}
        <div className="grid grid-cols-2 gap-4">
          <AnimatePresence mode="popLayout">
            {categories.map((cat) => (
              <motion.div
                key={cat.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onSelectCategoryFilter(cat.name)}
                className="bg-white rounded-3xl p-5 border border-[#f7dcdc]/20 shadow-sm hover:shadow-md hover:border-brand-primary/10 transition-all flex flex-col items-start text-left cursor-pointer relative group overflow-hidden"
              >
                {/* Micro purple glow on hover */}
                <div className="absolute top-0 left-0 w-1.5 h-full bg-brand-primary opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* Categories Icon frame container (matches pinkish look) */}
                <div className="w-12 h-12 rounded-2xl bg-[#fde2e2]/50 flex items-center justify-center text-brand-primary mb-4 transition-transform group-hover:scale-105">
                  <Icon name={cat.icon} size={22} className="text-brand-primary" />
                </div>

                <div className="space-y-1">
                  <h4 className="font-extrabold text-base text-brand-on-surface font-sans">
                    {cat.name}
                  </h4>
                  <p className="text-xs font-sans text-brand-on-surface-variant/60 font-semibold">
                    {cat.itemsCount} itens
                  </p>
                </div>
              </motion.div>
            ))}

            {/* + Nova Categoria Interactive Dashed Spot Card */}
            <motion.div
              layout
              onClick={() => setShowAddCat(true)}
              className="bg-[#fff0f0]/30 rounded-3xl p-5 border-2 border-dashed border-[#d1c2cc]/80 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-[#fff0f0]/60 hover:border-brand-secondary/40 transition-all min-h-[140px] group"
            >
              <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center text-[#7f747c] group-hover:text-brand-primary group-hover:bg-[#fff0f0] transition-colors shadow-sm mb-3">
                <Icon name="Plus" size={24} />
              </div>
              <span className="font-bold text-sm text-brand-on-surface-variant/80 group-hover:text-brand-primary transition-colors font-sans">
                Nova Categoria
              </span>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Promotional Desk Image bottom Card (Screen 1 footer visual) */}
        <div className="relative rounded-3xl h-44 overflow-hidden shadow-md group">
          {/* Workdesk background image from Unsplash (Paper notes and high qualitative look) */}
          <img
            src="https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=600"
            alt="Mantenha o foco"
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            referrerPolicy="no-referrer"
          />
          {/* Subtle warm purple gradient overlay to make text highly readable */}
          <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/85 via-brand-primary/65 to-brand-primary/10" />
          
          {/* Typography overlaid box on top */}
          <div className="absolute bottom-5 left-5 right-5 text-white">
            <h3 className="text-lg font-extrabold font-display leading-tight mb-1">
              Mantenha o Foco
            </h3>
            <p className="text-xs font-sans text-pink-100/90 leading-relaxed max-w-[280px]">
              Organize suas tarefas por categorias para maior clareza mental.
            </p>
          </div>
        </div>
      </div>

      {/* Embedded slide-over modal to create custom Category */}
      <AnimatePresence>
        {showAddCat && (
          <div className="fixed inset-0 z-40 bg-brand-on-surface/35 backdrop-blur-sm flex items-end justify-center p-4">
            <motion.div
              initial={{ y: 200, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 200, opacity: 0 }}
              className="bg-white rounded-t-[32px] rounded-b-3xl w-full max-w-md p-6 space-y-5 shadow-2xl border border-pink-100"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-black font-display text-brand-primary">Nova Categoria</h3>
                <button
                  type="button"
                  onClick={() => setShowAddCat(false)}
                  className="p-1 text-brand-on-surface-variant/40 hover:text-brand-primary hover:bg-[#fff0f0] rounded-full cursor-pointer"
                >
                  Fechar
                </button>
              </div>

              <form onSubmit={handleSubmitCategory} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-brand-on-surface-variant/80 block">Nome da Categoria</label>
                  <input
                    type="text"
                    required
                    maxLength={15}
                    value={newCatName}
                    onChange={(e) => setNewCatName(e.target.value)}
                    placeholder="Ex: Trabalho, Exercício, Idiomas"
                    className="w-full bg-brand-surface text-brand-on-surface border border-pink-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 font-sans text-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-brand-on-surface-variant/80 block">Selecione o Ícone</label>
                  <div className="grid grid-cols-5 gap-2">
                    {availableIcons.map((ico) => (
                      <button
                        key={ico.value}
                        type="button"
                        onClick={() => setNewCatIcon(ico.value)}
                        className={`p-2.5 rounded-xl border flex items-center justify-center transition-all cursor-pointer ${
                          newCatIcon === ico.value
                            ? 'bg-[#522851] text-white border-brand-primary'
                            : 'bg-brand-surface text-brand-on-surface-variant hover:bg-pink-50 border-[#f7dcdc]/30'
                        }`}
                        title={ico.label}
                      >
                        <Icon name={ico.value} size={18} />
                      </button>
                    ))}
                  </div>
                </div>

                <motion.button
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-[#522851] text-white rounded-xl py-3.5 font-bold hover:bg-[#6b3f69] transition-colors shadow-sm cursor-pointer text-sm"
                >
                  Criar Categoria
                </motion.button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
