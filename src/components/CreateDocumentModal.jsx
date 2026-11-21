import React, { useState } from 'react';
import { X } from 'lucide-react';
import { cn } from '../lib/utils';
import Input from './Input';
import { DOCUMENT_TYPES } from '../constants/documentTypes';
import { useLibrary } from '../context/LibraryContext';

const CreateDocumentModal = ({ isOpen, onClose }) => {
  const { cabinets, addDocument } = useLibrary();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: DOCUMENT_TYPES.INTERNAL,
    cabinetId: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.cabinetId) {
      alert('Пожалуйста, выберите шкаф для хранения документа');
      return;
    }

    try {
      addDocument({
        ...formData,
        owner: 'Александр', // В реальном приложении здесь будет user.name из AuthContext
      });
      setFormData({ name: '', description: '', type: DOCUMENT_TYPES.INTERNAL, cabinetId: '' });
      onClose();
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-md bg-card rounded-xl border border-border shadow-lg overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold">Новый документ</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Название</label>
            <Input 
              placeholder="Введите название" 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Описание</label>
            <Input 
              placeholder="Краткое описание" 
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Тип документа</label>
            <select 
              className="w-full h-10 rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring"
              value={formData.type}
              onChange={(e) => setFormData({...formData, type: e.target.value})}
            >
              {Object.values(DOCUMENT_TYPES).map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Шкаф хранения</label>
            <select 
              className="w-full h-10 rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring"
              value={formData.cabinetId}
              onChange={(e) => setFormData({...formData, cabinetId: e.target.value})}
              required
            >
              <option value="">Выберите шкаф...</option>
              {cabinets?.map((cabinet) => (
                <option key={cabinet.id} value={cabinet.id}>
                  {cabinet.name} ({cabinet.type})
                </option>
              ))}
            </select>
          </div>

          <div className="pt-4 flex gap-3">
            <button 
              type="button" 
              onClick={onClose}
              className="flex-1 px-4 py-2 text-sm font-medium border border-border rounded-md hover:bg-muted transition-colors"
            >
              Отмена
            </button>
            <button 
              type="submit"
              className="flex-1 px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            >
              Создать
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateDocumentModal;
