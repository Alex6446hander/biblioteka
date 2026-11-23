import React from 'react';
import { X, FileText, Calendar, User, Edit2, Trash2, MoveRight } from 'lucide-react';
import { cn } from '../lib/utils';
import { DOCUMENT_STATUSES } from '../constants/documentTypes';

const DocumentDetailModal = ({ isOpen, onClose, document, onEdit, onDelete, onMove }) => {
  if (!isOpen || !document) return null;

  const statusLabels = {
    [DOCUMENT_STATUSES.DRAFT]: 'Черновик',
    [DOCUMENT_STATUSES.ACTIVE]: 'Активный',
    [DOCUMENT_STATUSES.APPROVED]: 'Утверждён',
    [DOCUMENT_STATUSES.ARCHIVED]: 'Архивный',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-2xl bg-card rounded-xl border border-border shadow-lg overflow-hidden flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg text-primary">
              <FileText className="h-6 w-6" />
            </div>
            <h2 className="text-xl font-bold truncate max-w-[300px]">{document.name}</h2>
          </div>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-6">
          <section>
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Информация</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Тип</p>
                <p className="font-medium">{document.type}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Статус</p>
                <span className={cn(
                  "text-xs font-bold px-2 py-0.5 rounded-full border",
                  document.status === DOCUMENT_STATUSES.DRAFT ? "bg-slate-100 text-slate-700" :
                  document.status === DOCUMENT_STATUSES.ACTIVE ? "bg-blue-100 text-blue-700" :
                  document.status === DOCUMENT_STATUSES.APPROVED ? "bg-emerald-100 text-emerald-700" :
                  "bg-gray-100 text-gray-500"
                )}>
                  {statusLabels[document.status] || document.status}
                </span>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Владелец</p>
                <p className="font-medium">{document.owner}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Дата создания</p>
                <p className="font-medium">{document.date}</p>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Описание</h3>
            <p className="text-sm text-foreground leading-relaxed">
              {document.description || <span className="text-muted-foreground italic">Описание отсутствует</span>}
            </p>
          </section>
        </div>

        <div className="p-6 border-t border-border bg-muted/30 flex justify-between items-center">
          <div className="flex gap-2">
            <button 
              onClick={() => onEdit(document)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-border bg-background hover:bg-muted transition-colors text-sm font-medium"
            >
              <Edit2 className="h-4 w-4" />
              Редактировать
            </button>
            <button 
              onClick={() => onMove(document)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-border bg-background hover:bg-muted transition-colors text-sm font-medium"
            >
              <MoveRight className="h-4 w-4" />
              Переместить
            </button>
          </div>
          <button 
            onClick={() => onDelete(document)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors text-sm font-medium"
          >
            <Trash2 className="h-4 w-4" />
            Удалить
          </button>
        </div>
      </div>
    </div>
  );
};

export default DocumentDetailModal;
