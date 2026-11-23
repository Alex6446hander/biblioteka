import React, { useState, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLibrary } from '../context/LibraryContext';
import { FileText, Folder, Bell, User, Plus, LayoutDashboard, Search } from 'lucide-react';
import { cn } from '../lib/utils';
import DocumentList from '../components/DocumentList';
import CreateDocumentModal from '../components/CreateDocumentModal';
import CabinetList from '../components/CabinetList';
import CreateCabinetModal from '../components/CreateCabinetModal';
import CabinetDetailModal from '../components/CabinetDetailModal';
import DocumentDetailModal from '../components/DocumentDetailModal';
import EditDocumentModal from '../components/EditDocumentModal';
import Trash from '../components/Trash';
import { DOCUMENT_TYPES, DOCUMENT_STATUSES } from '../constants/documentTypes';

const Dashboard = () => {
  const { user } = useAuth();
  const { 
    documents, 
    cabinets, 
    trash,
    addDocument, 
    addCabinet, 
    placeDocumentInCabinet,
    restoreDocument,
    deleteFromTrash,
    updateDocument,
    deleteDocument
  } = useLibrary();

  const [isDocModalOpen, setIsDocModalOpen] = useState(false);
  const [isCabinetModalOpen, setIsCabinetModalOpen] = useState(false);
  const [selectedCabinet, setSelectedCabinet] = useState(null);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  
  // Search and Filter States
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');

  const stats = useMemo(() => [
    { label: 'Всего документов', value: documents.length, icon: FileText, color: 'text-blue-600', bg: 'bg-blue-100' },
    { label: 'В шкафах', value: documents.filter(doc => doc.cabinetId).length, icon: Folder, color: 'text-emerald-600', bg: 'bg-emerald-100' },
    { label: 'Ожидают проверки', value: documents.filter(doc => doc.status === DOCUMENT_STATUSES.DRAFT).length, icon: Bell, color: 'text-amber-600', bg: 'bg-amber-100' },
  ], [documents]);

  // Filtering Logic
  const filteredDocuments = useMemo(() => {
    return documents.filter(doc => {
      const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            doc.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = filterType === 'All' || doc.type === filterType;
      return matchesSearch && matchesType;
    });
  }, [documents, searchTerm, filterType]);

  const handleCreateDocument = (newDocData) => {
    try {
      addDocument({
        ...newDocData,
        owner: user?.name || 'Александр',
      });
      setIsDocModalOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateCabinet = (newCabinetData) => {
    try {
      addCabinet({
        ...newCabinetData,
        owner: user?.name || 'Александр',
      });
      setIsCabinetModalOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (doc) => {
    setSelectedDocument(doc);
    setIsEditModalOpen(true);
  };

  const handleDelete = (doc) => {
    if (window.confirm(`Вы уверены, что хотите удалить "${doc.name}"?`)) {
      deleteDocument(doc.id);
      setSelectedDocument(null);
    }
  };

  const handleMove = (doc) => {
    const cabinetId = prompt('Введите ID шкафа для перемещения (например, cab-123):');
    if (cabinetId) {
      try {
        placeDocumentInCabinet(doc.id, cabinetId);
        setSelectedDocument(null);
      } catch (err) {
        alert(err.message);
      }
    }
  };

  const handleSave = (id, updates) => {
    updateDocument(id, updates);
    setIsEditModalOpen(false);
    setSelectedDocument(null);
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
            
            <div className="bg-card p-4 rounded-xl border border-border mb-6 space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input 
                    type="text" 
                    placeholder="Поиск по названию или описанию..."
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <select 
                    className="px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                  >
                    <option value="All">Все типы</option>
                    {Object.entries(DOCUMENT_TYPES).map(([key, value]) => (
                      <option key={key} value={value}>{value}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <DocumentList 
              documents={filteredDocuments} 
              onDocumentClick={setSelectedDocument} 
            />
          </section>

          <section className="pt-8 border-t border-border">
            <div className="space-y-1 mb-6">
              <h3 className="text-xl font-bold">Корзина</h3>
              <p className="text-sm text-muted-foreground">Удаленные документы</p>
            </div>
            <Trash 
              trash={trash}
              onRestore={(doc) => restoreDocument(doc.id)}
              onDelete={(id) => deleteFromTrash(id)}
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

      <DocumentDetailModal 
        isOpen={!!selectedDocument} 
        onClose={() => setSelectedDocument(null)} 
        document={selectedDocument} 
        onEdit={handleEdit}
        onDelete={handleDelete}
        onMove={handleMove}
      />
      <EditDocumentModal 
        isOpen={isEditModalOpen} 
        onClose={() => setIsEditModalOpen(false)} 
        document={selectedDocument}
        onSave={handleSave}
      />
    </div>
  );
};

export default Dashboard;
