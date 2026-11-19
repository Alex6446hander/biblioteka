import React from 'react';
import { X, FileText, Folder } from 'lucide-react';
import { cn } from '../lib/utils';
import DocumentCard from './DocumentCard';

const CabinetDetailModal = ({ isOpen, onClose, cabinet, documents }) => {
  if (!isOpen || !cabinet) return null;

  const cabinetDocuments = documents.filter(doc => doc.cabinetId === cabinet.id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-4xl bg-card rounded-xl border border-border shadow-lg overflow-hidden max-h-[80vh] flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Folder className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-bold">{cabinet.name}</h2>
              <p className="text-sm text-muted-foreground">{cabinet.type} • {cabinet.used}/{cabinet.capacity} документов</p>
            </div>
          </div>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto">
          {cabinetDocuments.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {cabinetDocuments.map((doc) => (
                <DocumentCard key={doc.id} document={doc} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <Folder className="h-12 w-12 text-muted-foreground/50 mb-4" />
              <h3 className="text-lg font-medium">В этом шкафу пусто</h3>
              <p className="text-muted-foreground">Добавьте документы, чтобы они появились здесь.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CabinetDetailModal;
