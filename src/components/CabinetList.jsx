import React from 'react';
import CabinetCard from './CabinetCard';
import { FolderOpen } from 'lucide-react';

const CabinetList = ({ cabinets, onCabinetClick }) => {
  if (cabinets.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed border-border rounded-xl bg-muted/30">
        <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4">
          <FolderOpen className="h-6 w-6 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium">Нет шкафов</h3>
        <p className="text-muted-foreground text-sm">Создайте первый шкаф, чтобы начать хранение документов.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {cabinets.map((cabinet) => (
        <CabinetCard 
          key={cabinet.id} 
          cabinet={cabinet} 
          onClick={() => onCabinetClick(cabinet)} 
        />
      ))}
    </div>
  );
};

export default CabinetList;
