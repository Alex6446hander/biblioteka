import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { FileText, Folder, Bell, User, Plus, LayoutDashboard } from 'lucide-react';
import { cn } from '../lib/utils';
import DocumentList from '../components/DocumentList';
import CreateDocumentModal from '../components/CreateDocumentModal';
import CabinetList from '../components/CabinetList';
import CreateCabinetModal from '../components/CreateCabinetModal';
import CabinetDetailModal from '../components/CabinetDetailModal';
import { MOCK_DOCUMENTS } from '../data/mockDocuments';
import { MOCK_CABINETS } from '../data/mockCabinets';

const Dashboard = () => {
  const { user } = useAuth();
  const [documents, setDocuments] = useState(MOCK_DOCUMENTS);
  const [cabinets, setCabinets] = useState(MOCK_CABINETS);
  const [isDocModalOpen, setIsDocModalOpen] = useState(false);
  const [isCabinetModalOpen, setIsCabinetModalOpen] = useState(false);
  const [selectedCabinet, setSelectedCabinet] = useState(null);

  const stats = [
    { label: 'Всего документов', value: documents.length, icon: FileText, color: 'text-blue-600', bg: 'bg-blue-100' },
    { label: 'В шкафах', value: cabinets.length, icon: Folder, color: 'text-emerald-600', bg: 'bg-emerald-100' },
    { label: 'Ожидают проверки', value: '12', icon: Bell, color: 'text-amber-600', bg: 'bg-amber-100' },
  ];

  const handleCreateDocument = (newDocData) => {
    const newDoc = {
      id: (documents.length + 1).toString(),
      ...newDocData,
      status: 'Активный',
      date: new Date().toISOString().split('T')[0],
      owner: user?.name || 'Александр',
    };
    setDocuments([newDoc, ...documents]);
    setIsDocModalOpen(false);
  };

  const handleCreateCabinet = (newCabinetData) => {
    const newCabinet = {
      id: (cabinets.length + 1).toString(),
      ...newCabinetData,
      capacity: newCabinetData.capacity,
      used: 0,
      status: 'active',
      owner: user?.name || 'Александр',
    };
    setCabinets([newCabinet, ...cabinets]);
    setIsCabinetModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card px-6 py-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold flex items-center gap-2">
            <LayoutDashboard className="h-5 w-5 text-primary" />
            Панель управления
          </h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <User className="h-4 w-4" />
              <span>{user?.name}</span>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto py-8 px-4">
        <div className="mb-8 flex justify-between items-end">
          <div className="space-y-1">
            <h2 className="text-3xl font-bold tracking-tight">Добро пожаловать, {user?.name}!</h2>
            <p className="text-muted-foreground">Ваша сводка за сегодня</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="p-6 rounded-xl border border-border bg-card shadow-sm flex items-center gap-4">
              <div className={cn("p-3 rounded-lg", stat.bg)}>
                <stat.icon className={cn("h-6 w-6", stat.color)} />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-12">
          <section>
            <div className="flex items-center justify-between mb-6">
              <div className="space-y-1">
                <h3 className="text-xl font-bold">Мои шкафы</h3>
                <p className="text-sm text-muted-foreground">Места хранения ваших документов</p>
              </div>
              <button 
                onClick={() => setIsCabinetModalOpen(true)}
                className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 transition-colors"
              >
                <Plus className="mr-2 h-4 w-4" />
                Новый шкаф
              </button>
            </div>
            <CabinetList 
              cabinets={cabinets} 
              onCabinetClick={(cabinet) => setSelectedCabinet(cabinet)} 
            />
          </section>

          <section>
            <div className="flex items-center justify-between mb-6">
              <div className="space-y-1">
                <h3 className="text-xl font-bold">Ваши документы</h3>
                <p className="text-sm text-muted-foreground">Список всех активных документов</p>
              </div>
              <button 
                onClick={() => setIsDocModalOpen(true)}
                className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 transition-colors"
              >
                <Plus className="mr-2 h-4 w-4" />
                Новый документ
              </button>
            </div>
            <DocumentList 
              documents={documents} 
              onDocumentClick={(doc) => console.log('Document clicked:', doc)} 
            />
          </section>
        </div>
      </main>

      <CreateDocumentModal 
        isOpen={isDocModalOpen} 
        onClose={() => setIsDocModalOpen(false)} 
        onSubmit={handleCreateDocument}
        cabinets={cabinets}
      />
      <CreateCabinetModal 
        isOpen={isCabinetModalOpen} 
        onClose={() => setIsCabinetModalOpen(false)} 
        onSubmit={handleCreateCabinet}
      />
      <CabinetDetailModal 
        isOpen={!!selectedCabinet} 
        onClose={() => setSelectedCabinet(null)} 
        cabinet={selectedCabinet} 
        documents={documents}
      />
    </div>
  );
};

export default Dashboard;
