import React from 'react';
import { motion } from 'motion/react';
import Icon from './Icon';

interface SaveConfirmationModalProps {
  onSave: () => void;
  onExitWithoutSaving: () => void;
  onCancel: () => void;
}

export default function SaveConfirmationModal({
  onSave,
  onExitWithoutSaving,
  onCancel
}: SaveConfirmationModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-brand-on-surface/40 backdrop-blur-md">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: 'spring', damping: 20, stiffness: 250 }}
        className="w-full max-w-sm bg-white rounded-3xl p-8 text-center shadow-[0_15px_50px_rgba(82,40,81,0.15)] border border-[#f7dcdc]/30"
      >
        {/* Soft circle surrounding save icon */}
        <div className="w-20 h-20 rounded-full bg-[#fde2e2]/60 mx-auto flex items-center justify-center text-brand-primary mb-6 shadow-sm">
          <Icon name="Save" size={32} />
        </div>

        {/* Modal Info */}
        <h3 className="text-2xl font-bold font-display text-brand-primary mb-2">
          Salvar alterações?
        </h3>
        <p className="text-brand-on-surface-variant font-sans text-sm mb-8 leading-relaxed px-2">
          Você deseja salvar essa lista de tarefa?
        </p>

        {/* Stacked primary buttons */}
        <div className="space-y-3">
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={onSave}
            className="w-full py-4 bg-brand-primary text-white font-bold rounded-2xl hover:bg-brand-primary-container transition-colors shadow-md cursor-pointer outline-none"
          >
            Salvar
          </motion.button>
          
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={onExitWithoutSaving}
            className="w-full py-4 bg-white text-brand-primary font-bold rounded-2xl hover:bg-brand-surface-variant/20 transition-colors border border-brand-primary/10 cursor-pointer outline-none"
          >
            Sair
          </motion.button>

          <button
            onClick={onCancel}
            className="text-brand-on-surface-variant/60 hover:text-brand-on-surface text-xs font-semibold pt-2 hover:underline transition-colors block mx-auto cursor-pointer"
          >
            Cancelar
          </button>
        </div>
      </motion.div>
    </div>
  );
}
