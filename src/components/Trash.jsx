import React from 'react';
import { FileText, Trash2, RotateCcw } from 'lucide-react';
import { cn } from '../lib/utils';

const Trash = ({ trash, onRestore, onDelete }) => {
  if (trash.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed border-border rounded-xl bg-muted/30">
        <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4">
          <Trash2 className="h-6 w-6 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium">Корзина пуста</h3>
        <p className="text-muted-foreground text-sm">Удаленные документы автоматически попадают сюда.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold">Корзина</h3>
        <p className="text-sm text-muted-foreground">Удаленные документы</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {trash.map((item) => (
          <div 
            key={item.id} 
            className="p-4 bg-card border border-border rounded-xl shadow-sm flex flex-col justify-between hover:border-destructive/30 transition-colors"
          >
            <div className="flex justify-between items-start mb-2">
              <div className="p-2 rounded-lg bg-destructive/10 text-destructive">
                <FileText className="h-5 w-5" />
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => onRestore(item)}
                  className="p-1.5 rounded-md hover:bg-muted transition-colors"
                  title="Восстановить"
                >
                  <RotateCcw className="h-4 w-4 text-primary" />
                </button>
                <button 
                  onClick={() => onDelete(item.id)}
                  className="p-1.5 rounded-md hover:bg-muted transition-colors"
                  title="Удалить навсегда"
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </button>
              </div>
            </div>
            <div className="space-y-1">
              <h4 className="font-semibold text-foreground line-clamp-1">{item.name}</h4>
              <p className="text-xs text-muted-foreground line-clamp-2">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trash;
