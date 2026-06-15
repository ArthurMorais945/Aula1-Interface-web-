import React, { useState } from 'react';
import { motion } from 'motion/react';
import Icon from './Icon';

interface LoginViewProps {
  onLogin: () => void;
}

export default function LoginView({ onLogin }: LoginViewProps) {
  const [email, setEmail] = useState('alex.rivers@serene.com');
  const [password, setPassword] = useState('••••••••');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[90vh] px-6 py-12 antialiased">
      {/* Centered capital T symbol in purple circle */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="w-16 h-16 rounded-full bg-brand-primary flex items-center justify-center text-white text-3xl font-bold font-display shadow-lg mb-12"
      >
        T
      </motion.div>

      {/* Main card */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.5, ease: 'easeOut' }}
        className="w-full max-w-md bg-[#fff8f7] rounded-3xl p-8 shadow-[0_10px_40px_rgba(82,40,81,0.04)] border border-[#f7dcdc]/20"
      >
        <h2 className="text-3xl font-bold font-display text-brand-primary text-center mb-8 tracking-tight">
          Bem-vindo(a)!
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email field */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-brand-on-surface/80 block">
              Email
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-secondary">
                <Icon name="User" size={18} />
              </span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ex.: facaseulogin@gmail.com"
                className="w-full bg-[#fff8f7] text-brand-on-surface border border-[#7f747c]/30 rounded-xl py-3.5 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all placeholder:text-brand-on-surface-variant/40"
              />
            </div>
          </div>

          {/* Password field */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-brand-on-surface/80 block">
              Senha
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-secondary">
                <Icon name="Lock" size={18} />
              </span>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="sua_senha"
                className="w-full bg-[#fff8f7] text-brand-on-surface border border-[#7f747c]/30 rounded-xl py-3.5 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all placeholder:text-brand-on-surface-variant/40"
              />
            </div>
          </div>

          {/* Submit button */}
          <motion.button
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-brand-primary text-white rounded-2xl py-4 font-semibold hover:bg-brand-primary-container transition-colors shadow-md mt-4 cursor-pointer"
          >
            Entrar
          </motion.button>
        </form>

        <div className="text-center mt-6">
          <button
            onClick={onLogin}
            className="text-brand-primary/80 hover:text-brand-primary text-sm font-medium transition-colors hover:underline"
          >
            Esqueceu sua senha?
          </button>
        </div>
      </motion.div>
    </div>
  );
}
