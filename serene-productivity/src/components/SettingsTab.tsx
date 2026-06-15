import React, { useState } from 'react';
import { motion } from 'motion/react';
import { UserProfile } from '../types';
import Icon from './Icon';

interface SettingsTabProps {
  user: UserProfile;
  onUpdateUser: (updatedUser: UserProfile) => void;
  onLogout: () => void;
  onBack: () => void;
}

export default function SettingsTab({
  user,
  onUpdateUser,
  onLogout,
  onBack
}: SettingsTabProps) {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editName, setEditName] = useState(user.name);
  const [editEmail, setEditEmail] = useState(user.email);

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateUser({
      ...user,
      name: editName,
      email: editEmail
    });
    setIsEditingProfile(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-brand-surface pb-28 select-none">
      {/* Header (Matches Screen 2) */}
      <header className="flex items-center justify-between px-6 py-4 sticky top-0 bg-brand-surface/85 backdrop-blur z-10 border-b border-[#f7dcdc]/20">
        <button
          onClick={onBack}
          className="p-2 -ml-2 rounded-full hover:bg-brand-surface-variant/20 text-brand-primary transition-colors cursor-pointer"
        >
          <Icon name="ArrowLeft" size={24} />
        </button>
        <span className="text-xl font-bold font-display text-brand-primary">Configurações</span>
        <button className="p-2 -mr-2 rounded-full hover:bg-brand-surface-variant/20 text-brand-primary cursor-pointer">
          <Icon name="EllipsisVertical" size={20} />
        </button>
      </header>

      {/* Settings Body */}
      <div className="px-6 pt-5 space-y-6 max-w-lg mx-auto w-full">
        
        {/* Section Perfil (Screen 2 style) */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-brand-on-surface-variant/60 tracking-wider block px-1">
            Perfil
          </span>
          
          <div className="bg-white rounded-3xl p-5 border border-[#f7dcdc]/20 shadow-sm">
            {!isEditingProfile ? (
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  {/* Photo avatar left (Square with rounded corner, female photo) */}
                  <div className="w-14 h-14 rounded-2xl overflow-hidden border border-[#f7dcdc] shrink-0 bg-zinc-100">
                    <img src={user.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-base text-brand-on-surface font-sans">
                      {user.name}
                    </h4>
                    <p className="text-xs font-sans text-brand-on-surface-variant/60 leading-normal font-semibold">
                      {user.email}
                    </p>
                  </div>
                </div>

                {/* Edit profile button */}
                <button
                  onClick={() => setIsEditingProfile(true)}
                  className="px-4 py-2.5 bg-brand-primary hover:bg-brand-primary-container text-white text-xs font-bold rounded-2xl transition-all cursor-pointer shadow-sm shrink-0"
                >
                  Editar perfil
                </button>
              </div>
            ) : (
              <form onSubmit={handleUpdate} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-brand-on-surface-variant block">NOME</label>
                  <input
                    type="text"
                    required
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full bg-brand-surface border border-pink-100 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-brand-primary"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-brand-on-surface-variant block">EMAIL</label>
                  <input
                    type="email"
                    required
                    value={editEmail}
                    onChange={(e) => setEditEmail(e.target.value)}
                    className="w-full bg-brand-surface border border-pink-100 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-brand-primary"
                  />
                </div>
                <div className="flex gap-2 justify-end pt-1">
                  <button
                    type="button"
                    onClick={() => setIsEditingProfile(false)}
                    className="px-3 py-1.5 border border-pink-100 text-brand-primary rounded-xl text-xs font-bold hover:bg-pink-50"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-3 py-1.5 bg-brand-primary text-white rounded-xl text-xs font-bold hover:bg-brand-primary-container"
                  >
                    Salvar
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Section Preferências switches (Screen 2 style) */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-brand-on-surface-variant/60 tracking-wider block px-1">
            Preferências
          </span>
          
          <div className="bg-white rounded-3xl border border-[#f7dcdc]/20 shadow-sm divide-y divide-[#f7dcdc]/25 overflow-hidden">
            {/* Notificações Switches */}
            <div
              onClick={() => setNotifications(!notifications)}
              className="flex items-center justify-between p-5 hover:bg-pink-50/20 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-4 text-[#261818]">
                <span className="text-brand-secondary shrink-0">
                  <Icon name="Bell" size={20} />
                </span>
                <span className="font-bold text-sm font-sans text-brand-on-surface">Notificações</span>
              </div>
              
              {/* Outer sliding element (Toggled shape color customizer) */}
              <button
                type="button"
                className={`w-11 h-6 rounded-full p-0.5 transition-colors duration-300 pointer-events-none ${
                  notifications ? 'bg-[#522851]' : 'bg-[#efd4d4]'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white shadow transition-transform duration-300 ${
                    notifications ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Modo Escuro Switches */}
            <div
              onClick={() => {
                setDarkMode(!darkMode);
                // Trigger a playful site alert or simply state switch
              }}
              className="flex items-center justify-between p-5 hover:bg-pink-50/20 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-4 text-[#261818]">
                <span className="text-brand-secondary shrink-0">
                  <Icon name="Moon" size={20} />
                </span>
                <span className="font-bold text-sm font-sans text-brand-on-surface">Modo Escuro</span>
              </div>

              {/* Inactive light beige slider */}
              <button
                type="button"
                className={`w-11 h-6 rounded-full p-0.5 transition-colors duration-300 pointer-events-none ${
                  darkMode ? 'bg-[#522851]' : 'bg-[#fdc6f9]/30 border border-[#f7dcdc]'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white shadow transition-transform duration-300 ${
                    darkMode ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Section Segurança lines links (Screen 2 style) */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-brand-on-surface-variant/60 tracking-wider block px-1">
            Segurança
          </span>
          
          <div className="bg-white rounded-3xl border border-[#f7dcdc]/20 shadow-sm divide-y divide-[#f7dcdc]/25 overflow-hidden">
            {/* Alterar Senha */}
            <div className="flex items-center justify-between p-5 hover:bg-pink-50/15 transition-colors cursor-pointer group">
              <div className="flex items-center gap-4">
                <span className="text-brand-secondary">
                  <Icon name="Lock" size={18} />
                </span>
                <span className="font-bold text-sm font-sans text-brand-on-surface">Alterar Senha</span>
              </div>
              <span className="text-[#a376a2]/50 group-hover:text-brand-primary transition-colors">
                <Icon name="ChevronRight" size={16} />
              </span>
            </div>

            {/* Privacidade */}
            <div className="flex items-center justify-between p-5 hover:bg-pink-50/15 transition-colors cursor-pointer group">
              <div className="flex items-center gap-4">
                <span className="text-brand-secondary">
                  <Icon name="Shield" size={18} />
                </span>
                <span className="font-bold text-sm font-sans text-brand-on-surface">Privacidade</span>
              </div>
              <span className="text-[#a376a2]/50 group-hover:text-brand-primary transition-colors">
                <Icon name="ChevronRight" size={16} />
              </span>
            </div>
          </div>
        </div>

        {/* Section Geral lines links (Screen 2 style) */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-brand-on-surface-variant/60 tracking-wider block px-1">
            Geral
          </span>
          
          <div className="bg-white rounded-3xl border border-[#f7dcdc]/20 shadow-sm divide-y divide-[#f7dcdc]/25 overflow-hidden">
            {/* Idioma */}
            <div className="flex items-center justify-between p-5 hover:bg-pink-50/15 transition-colors cursor-pointer group">
              <div className="flex items-center gap-4">
                <span className="text-brand-secondary">
                  <Icon name="Globe" size={18} />
                </span>
                <span className="font-bold text-sm font-sans text-brand-on-surface">Idioma</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-brand-on-surface-variant/60 font-semibold font-sans">
                  Português
                </span>
                <span className="text-[#a376a2]/50 group-hover:text-brand-primary transition-colors">
                  <Icon name="ChevronRight" size={16} />
                </span>
              </div>
            </div>

            {/* Sobre o App */}
            <div className="flex items-center justify-between p-5 hover:bg-pink-50/15 transition-colors cursor-pointer group">
              <div className="flex items-center gap-4">
                <span className="text-brand-secondary">
                  <Icon name="Info" size={18} />
                </span>
                <span className="font-bold text-sm font-sans text-brand-on-surface">Sobre o App</span>
              </div>
              <span className="text-[#a376a2]/50 group-hover:text-brand-primary transition-colors">
                <Icon name="ChevronRight" size={16} />
              </span>
            </div>
          </div>
        </div>

        {/* Logout link line (Screen 2 centered "Sair da Conta" link with LogOut icon in maroon text) */}
        <div className="pt-6 text-center">
          <button
            onClick={onLogout}
            className="inline-flex items-center justify-center gap-2.5 mx-auto py-3 px-6 text-red-640 hover:text-red-700 font-bold text-sm transition-colors cursor-pointer hover:bg-red-50 rounded-2xl border border-transparent hover:border-red-100"
          >
            <Icon name="LogOut" size={18} />
            <span>Sair da Conta</span>
          </button>
        </div>
      </div>
    </div>
  );
}
