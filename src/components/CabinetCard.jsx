import React from 'react';
import { cn } from '../lib/utils';
import { Lock, Folder, Info } from 'lucide-react';

const CabinetCard = ({ cabinet, onClick }) => {
  const isConfidential = cabinet.type === 'Конфиденциальное хранилище';
  const progress = (cabinet.used / cabinet.capacity) * 100;

  return (
    <div 
      onClick={onClick}
      className="group relative flex flex-col p-5 bg-card border border-border rounded-xl shadow-sm hover:shadow-md hover:border-primary/30 transition-all cursor-pointer"
    >
      <div className="flex justify-between items-start mb-4">
        <div className={cn(
          "p-2 rounded-lg",
          isConfidential ? "bg-red-100 text-red-600" : "bg-blue-100 text-blue-600"
        )}>
          {isConfidential ? <Lock className="h-5 w-5" /> : <Folder className="h-5 w-5" />}
        </div>
        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border border-border text-muted-foreground">
          {cabinet.type}
        </span>
      </div>

      <div className="space-y-1 mb-4">
        <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
          {cabinet.name}
        </h4>
        <p className="text-xs text-muted-foreground">Владелец: {cabinet.owner}</p>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-xs">
          <span className="text-muted-foreground">Заполнено</span>
          <span className="font-medium">{cabinet.used} / {cabinet.capacity}</span>
        </div>
        <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
          <div 
            className={cn(
              "h-full transition-all duration-500",
              progress > 90 ? "bg-destructive" : "bg-primary"
            )}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default CabinetCard;
