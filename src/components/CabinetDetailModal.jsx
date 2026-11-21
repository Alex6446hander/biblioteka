import React, { useState } from 'react';
import { X, Folder, MoveRight, ChevronDown } from 'lucide-react';
import { cn } from '../lib/utils';
import DocumentCard from './DocumentCard';
import { useLibrary } from '../context/LibraryContext';

const CabinetDetailModal = ({ isOpen, onClose, cabinet }) => {
  const { documents, cabinets, placeDocumentInCabinet } = useLibrary();
  const [movingDocId, setMovingDocId] = useState(null);
  const [targetCabinetId, setTargetCabinetId] = useState(null);

  if (!isOpen || !cabinet) return null;

  const cabinetDocuments = documents.filter(doc => doc.cabinetId === cabinet.id);

  const handleMove = async (docId, targetId) => {
    try {
      await placeDocumentInCabinet(docId, targetId);
      setMovingDocId(null);
      setTargetCabinetId(null);
    } catch (err) {
      console.error("Ошибка при перемещении:", err);
      alert(err.message);
    }
  };

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
                <div key={doc.id} className="relative group">
                  <DocumentCard document={doc} />
                  <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => setMovingDocId(doc.id)}
                      className="p-1.5 bg-primary text-primary-foreground rounded-md shadow-md hover:bg-primary/90"
                      title="Переместить"
                    >
                      <MoveRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}

              {movingDocId && (
                <div className="md:col-span-2 p-4 bg-primary/5 border border-primary/20 rounded-xl mt-2">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                      <MoveRight className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium">Переместить документ:</span>
                      <span className="text-sm text-muted-foreground italic">
                        {documents.find(d => d.id === movingDocId)?.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <select 
                        className="px-3 py-1.5 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                        value={targetCabinetId || ''}
                        onChange={(e) => setTargetCabinetId(e.target.value)}
                      >
                        <option value="" disabled>Выберите шкаф...</option>
                        {cabinets
                          .filter(cab => cab.id !== cabinet.id)
                          .map(cab => (
                            <option key={cab.id} value={cab.id}>
                              {cab.name} ({cab.used}/{cab.capacity})
                            </option>
                          ))
                        }
                      </select>
                      <button 
                        onClick={() => handleMove(movingDocId, targetCabinetId)}
                        disabled={!targetCabinetId}
                        className="px-4 py-1.5 bg-primary text-primary-foreground rounded-md disabled:opacity-50 disabled:bg-muted"
                      >
                        Подтвердить
                      </button>
                      <button 
                        onClick={() => {
                          setMovingDocId(null);
                          setTargetCabinetId(null);
                        }}
                        className="text-xs text-muted-foreground underline"
                      >
                        Отмена
                      </button>
                    </div>
                  </div>
                </div>
              )}
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
