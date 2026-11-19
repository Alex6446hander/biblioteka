import React from 'react';
import { cn } from '../lib/utils';
import { FileText, Calendar, User, ChevronRight } from 'lucide-react';
import { DOCUMENT_STATUSES } from '../constants/documentTypes';

const DocumentCard = ({ document, onClick }) => {
  const statusConfig = {
    [DOCUMENT_STATUSES.DRAFT]: 'bg-slate-100 text-slate-700 border-slate-200',
    [DOCUMENT_STATUSES.ACTIVE]: 'bg-blue-100 text-blue-700 border-blue-200',
    [DOCUMENT_STATUSES.APPROVED]: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    [DOCUMENT_STATUSES.ARCHIVED]: 'bg-gray-100 text-gray-500 border-gray-200',
  };

  return (
    <div 
      onClick={onClick}
      className="group relative flex flex-col justify-between p-5 bg-card border border-border rounded-xl shadow-sm hover:shadow-md hover:border-primary/30 transition-all cursor-pointer"
    >
      <div className="space-y-3">
        <div className="flex justify-between items-start">
          <div className="p-2 rounded-lg bg-primary/10 text-primary">
            <FileText className="h-5 w-5" />
          </div>
          <span className={cn(
            "text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border",
            statusConfig[document.status] || "bg-gray-100 text-gray-600"
          )}>
            {document.status}
          </span>
        </div>
        
        <div className="space-y-1">
          <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
            {document.name}
          </h4>
          <p className="text-xs text-muted-foreground line-clamp-2 min-h-[32px]">
            {document.description}
          </p>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-border flex items-center justify-between text-[10px] text-muted-foreground">
        <div className="flex items-center gap-1">
          <Calendar className="h-3 w-3" />
          {document.date}
        </div>
        <div className="flex items-center gap-1">
          <User className="h-3 w-3" />
          {document.owner}
        </div>
      </div>
    </div>
  );
};

export default DocumentCard;
