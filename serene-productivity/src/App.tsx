import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TaskList, Category, UserProfile, WeeklyStats } from './types';
import {
  initialUser,
  initialCategories,
  initialTaskLists,
  initialStats
} from './mockData';

// Subviews
import LoginView from './components/LoginView';
import MainDashboard from './components/MainDashboard';
import CategoriesTab from './components/CategoriesTab';
import StatisticsTab from './components/StatisticsTab';
import SettingsTab from './components/SettingsTab';
import ListDetailsView from './components/ListDetailsView';
import NoteEditView from './components/NoteEditView';
import SaveConfirmationModal from './components/SaveConfirmationModal';
import Icon from './components/Icon';

type Tab = 'tarefas' | 'categorias' | 'estatisticas' | 'perfil';
type ViewState = 'dashboard' | 'list-detail' | 'note-editing';

export default function App() {
  // Page authentication status (Starts with the Welcome/Login page Screen 8)
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Navigation Routing States
  const [activeTab, setActiveTab] = useState<Tab>('tarefas');
  const [viewState, setViewState] = useState<ViewState>('dashboard');

  // Core Applet State Objects
  const [user, setUser] = useState<UserProfile>(initialUser);
  const [taskLists, setTaskLists] = useState<TaskList[]>(initialTaskLists);
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [stats, setStats] = useState<WeeklyStats>(initialStats);
  
  // Selected lists for drilldown views (Screen 3 & Screen 4)
  const [selectedList, setSelectedList] = useState<TaskList | null>(null);
  
  // Master Search box query
  const [searchQuery, setSearchQuery] = useState('');

  // Save Confirmation Modal triggers (Screen 7)
  const [saveModalPendingAction, setSaveModalPendingAction] = useState<{
    updatedList: TaskList;
    execute: () => void;
  } | null>(null);

  // Derive categories task counts live!
  const derivedCategories = useMemo(() => {
    return categories.map((cat) => {
      const matchLists = taskLists.filter((l) => l.category === cat.name);
      let sum = 0;
      matchLists.forEach((l) => {
        sum += l.subtasks.length || 0;
      });
      return {
        ...cat,
        itemsCount: sum || cat.itemsCount
      };
    });
  }, [categories, taskLists]);

  // Handle addition of a new list (FAB action on Screen 5)
  const handleAddNewList = (title: string, category: string, icon: string) => {
    const newList: TaskList = {
      id: `list-new-${Date.now()}`,
      title,
      icon,
      category,
      status: 'PENDENTE',
      itemsCount: 0,
      itemCompletedCount: 0,
      subtasks: [],
      createdAt: `Segunda, ${new Date().toLocaleDateString('pt-BR')} - ${new Date().getHours()}h${new Date().getMinutes()}min`,
      priority: 'Média'
    };
    setTaskLists([newList, ...taskLists]);

    // Update stats count
    setStats((prev) => ({
      ...prev,
      createdCount: prev.createdCount + 1
    }));
  };

  // Quick toggle list completion (Screen 5 chip click)
  const handleToggleCompleteList = (listId: string) => {
    setTaskLists((prev) =>
      prev.map((l) => {
        if (l.id === listId) {
          const nextStatus = l.status === 'CONCLUÍDO' ? 'PENDENTE' : 'CONCLUÍDO';
          // If completing, toggle all subtasks to complete
          const updatedSubtasks = l.subtasks.map((s) => ({
            ...s,
            completed: nextStatus === 'CONCLUÍDO'
          }));
          return {
            ...l,
            status: nextStatus,
            subtasks: updatedSubtasks,
            itemCompletedCount: nextStatus === 'CONCLUÍDO' ? l.subtasks.length : 0
          };
        }
        return l;
      })
    );
  };

  // Delete checklist
  const handleDeleteList = (listId: string) => {
    setTaskLists((prev) => prev.filter((l) => l.id !== listId));
    setStats((prev) => ({
      ...prev,
      createdCount: Math.max(0, prev.createdCount - 1)
    }));
  };

  // Create custom categories (Screen 1 dialog click)
  const handleAddNewCategory = (name: string, icon: string, color: string) => {
    const newCat: Category = {
      id: `cat-new-${Date.now()}`,
      name,
      icon,
      itemsCount: 0,
      color,
      bgColor: '#fff0f0'
    };
    setCategories([...categories, newCat]);
  };

  // Filter tasks direct choice from category chip (Screen 1 bento click)
  const handleSelectCategoryFilter = (catName: string) => {
    setSearchQuery(catName);
    setActiveTab('tarefas'); // jump back to main list showing filtered categories
  };

  // Resolve drilldowns from card click
  const handleSelectSelection = (list: TaskList) => {
    setSelectedList(list);
    setViewState('list-detail');
  };

  // Direct Note Save (Screen 4 notepad commit)
  const handleSaveNotes = (updated: TaskList) => {
    setTaskLists((prev) => prev.map((l) => (l.id === updated.id ? updated : l)));
    setSelectedList(updated);
    setViewState('list-detail'); // go back to details checklist
  };

  // Handle detailed save modal answers (Screen 7 dialog resolution)
  const handleConfirmSave = () => {
    if (saveModalPendingAction) {
      const { updatedList, execute } = saveModalPendingAction;
      setTaskLists((prev) => prev.map((l) => (l.id === updatedList.id ? updatedList : l)));
      setSaveModalPendingAction(null);
      execute();
    }
  };

  const handleDiscardChanges = () => {
    if (saveModalPendingAction) {
      setSaveModalPendingAction(null);
      saveModalPendingAction.execute(); // run action without saving
    }
  };

  return (
    <div className="min-h-screen bg-[#fff8f7] text-[#261818] font-sans antialiased flex flex-col relative overflow-x-hidden md:max-w-md md:mx-auto md:shadow-2xl md:border-x md:border-[#fde2e2] md:min-h-[850px] md:my-4 md:rounded-[40px]">
      
      {/* Dynamic View rendering */}
      <div className="flex-1 w-full pb-20">
        {!isAuthenticated ? (
          // Welcome Screen / Login Page (Screen 8)
          <LoginView onLogin={() => setIsAuthenticated(true)} />
        ) : (
          <AnimatePresence mode="wait">
            {viewState === 'dashboard' && (
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="w-full"
              >
                {activeTab === 'tarefas' && (
                  <MainDashboard
                    taskLists={taskLists}
                    categories={derivedCategories}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    onSelectSelection={handleSelectSelection}
                    onAddNewList={handleAddNewList}
                    onToggleCompleteList={handleToggleCompleteList}
                    onDeleteList={handleDeleteList}
                    userAvatar={user.avatarUrl}
                  />
                )}

                {activeTab === 'categorias' && (
                  <CategoriesTab
                    categories={derivedCategories}
                    onAddNewCategory={handleAddNewCategory}
                    onSelectCategoryFilter={handleSelectCategoryFilter}
                    userAvatar={user.avatarUrl}
                  />
                )}

                {activeTab === 'estatisticas' && (
                  <StatisticsTab
                    taskLists={taskLists}
                    stats={stats}
                    userAvatar={user.avatarUrl}
                    onEditProfile={() => setActiveTab('perfil')}
                  />
                )}

                {activeTab === 'perfil' && (
                  <SettingsTab
                    user={user}
                    onUpdateUser={(usr) => setUser(usr)}
                    onLogout={() => {
                      setIsAuthenticated(false);
                      setActiveTab('tarefas');
                    }}
                    onBack={() => setActiveTab('tarefas')}
                  />
                )}
              </motion.div>
            )}

            {viewState === 'list-detail' && selectedList && (
              <motion.div
                key="list-detail"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                className="w-full"
              >
                <ListDetailsView
                  list={selectedList}
                  onBack={(updated) => {
                    setTaskLists((prev) => prev.map((l) => (l.id === updated.id ? updated : l)));
                    setViewState('dashboard');
                    setSelectedList(null);
                  }}
                  onShowSaveModal={(updated, nextAction) => {
                    setSaveModalPendingAction({
                      updatedList: updated,
                      execute: nextAction
                    });
                  }}
                  onEditNotes={(list) => {
                    setSelectedList(list);
                    setViewState('note-editing');
                  }}
                />
              </motion.div>
            )}

            {viewState === 'note-editing' && selectedList && (
              <motion.div
                key="note-editing"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full"
              >
                <NoteEditView
                  list={selectedList}
                  categories={derivedCategories}
                  onSave={handleSaveNotes}
                  onBack={() => setViewState('list-detail')}
                />
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>

      {/* Styled Bottom Navigation bar (Rendered for dashboard states matching Screen 1, Screen 2, Screen 5, Screen 6) */}
      {isAuthenticated && viewState === 'dashboard' && (
        <div className="fixed bottom-0 left-0 right-0 max-w-lg md:max-w-md mx-auto bg-[#fff0f0]/95 backdrop-blur-md border-t border-[#fde2e2] px-6 py-3.5 z-30 flex justify-between items-center rounded-t-3xl shadow-[0_-5px_25px_rgba(82,40,81,0.06)] select-none">
          {/* Outer Grid Buttons */}
          <div className="flex w-full justify-between items-center relative">
            
            {/* Tab: Tarefas */}
            <button
              onClick={() => setActiveTab('tarefas')}
              className={`flex flex-col items-center justify-center flex-1 gap-1 py-1 px-3.5 relative cursor-pointer outline-none transition-all ${
                activeTab === 'tarefas' ? 'text-brand-primary' : 'text-brand-on-surface-variant/50 hover:text-brand-primary/80'
              }`}
            >
              <div className={`p-1 flex items-center justify-center rounded-2xl ${activeTab === 'tarefas' ? 'bg-[#fdc6f9]/45' : ''}`}>
                <Icon name="CheckSquare" size={20} />
              </div>
              <span className="text-[10px] font-bold font-sans tracking-wide">Tarefas</span>
            </button>

            {/* Tab: Categorias */}
            <button
              onClick={() => setActiveTab('categorias')}
              className={`flex flex-col items-center justify-center flex-1 gap-1 py-1 px-3.5 relative cursor-pointer outline-none transition-all ${
                activeTab === 'categorias' ? 'text-brand-primary' : 'text-brand-on-surface-variant/50 hover:text-brand-primary/80'
              }`}
            >
              <div className={`p-1 flex items-center justify-center rounded-2xl ${activeTab === 'categorias' ? 'bg-[#fdc6f9]/45' : ''}`}>
                <Icon name="LayoutDashboard" size={20} />
              </div>
              <span className="text-[10px] font-bold font-sans tracking-wide">Categorias</span>
            </button>

            {/* Tab: Estatísticas */}
            <button
              onClick={() => setActiveTab('estatisticas')}
              className={`flex flex-col items-center justify-center flex-1 gap-1 py-1 px-3.5 relative cursor-pointer outline-none transition-all ${
                activeTab === 'estatisticas' ? 'text-brand-primary' : 'text-brand-on-surface-variant/50 hover:text-brand-primary/80'
              }`}
            >
              <div className={`p-1 flex items-center justify-center rounded-2xl ${activeTab === 'estatisticas' ? 'bg-[#fdc6f9]/45' : ''}`}>
                <Icon name="BarChart3" size={20} />
              </div>
              <span className="text-[10px] font-bold font-sans tracking-wide">Estatísticas</span>
            </button>

            {/* Tab: Perfil info (Screen 2) */}
            <button
              onClick={() => setActiveTab('perfil')}
              className={`flex flex-col items-center justify-center flex-1 gap-1 py-1 px-3.5 relative cursor-pointer outline-none transition-all ${
                activeTab === 'perfil' ? 'text-brand-primary' : 'text-brand-on-surface-variant/50 hover:text-brand-primary/80'
              }`}
            >
              <div className={`p-1 flex items-center justify-center rounded-2xl ${activeTab === 'perfil' ? 'bg-[#fdc6f9]/45' : ''}`}>
                <Icon name="User" size={20} />
              </div>
              <span className="text-[10px] font-bold font-sans tracking-wide">Perfil</span>
            </button>
          </div>
        </div>
      )}

      {/* Save Confirmation Modal gateway dialog (Screen 7) */}
      <AnimatePresence>
        {saveModalPendingAction && (
          <SaveConfirmationModal
            onSave={handleConfirmSave}
            onExitWithoutSaving={handleDiscardChanges}
            onCancel={() => setSaveModalPendingAction(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
