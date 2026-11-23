import React from 'react';
import DocumentCard from './DocumentCard';
import { DOCUMENT_TYPES } from '../constants/documentTypes';
import { FileText } from 'lucide-react';

const DocumentList = ({ documents, onDocumentClick }) => {
  if (documents.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed border-border rounded-xl bg-muted/30">
        <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4">
          <FileText className="h-6 w-6 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium">Нет документов</h3>
        <p className="text-muted-foreground text-sm">Начните с создания первого документа.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {documents.map((doc) => (
        <DocumentCard 
          key={doc.id} 
          document={doc} 
          onClick={() => onDocumentClick(doc)} 
        />
      ))}
    </div>
  );
};

export default DocumentList;
