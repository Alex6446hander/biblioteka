import React, { createContext, useContext, useState, useMemo } from 'react';
import { DOCUMENT_TYPES, DOCUMENT_STATUSES } from '../constants/documentTypes';
import { CABINET_TYPES } from '../constants/cabinetTypes';
import { isCompatible } from '../lib/compatibilityMatrix';
import { MOCK_DOCUMENTS } from '../data/mockDocuments';
import { MOCK_CABINETS } from '../data/mockCabinets';

const LibraryContext = createContext(null);

export const LibraryProvider = ({ children }) => {
  const [documents, setDocuments] = useState(MOCK_DOCUMENTS);
  const [cabinets, setCabinets] = useState(MOCK_CABINETS);
  const [trash, setTrash] = useState([]);
  const [logs, setLogs] = useState([]);

  // Helper to add a log entry
  const addLog = (action, details) => {
    const newLog = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      action,
      details: JSON.stringify(details),
    };
    setLogs(prev => [newLog, ...prev]);
    console.log(`[LOG]: ${action}`, details);
  };

  // --- Document Actions ---
  const addDocument = (data) => {
    const newDoc = {
      id: Date.now().toString(),
      ...data,
      status: data.status || DOCUMENT_STATUSES.ACTIVE,
      date: new Date().toISOString().split('T')[0],
      owner: data.owner,
    };
    setDocuments(prev => [newDoc, ...prev]);
    addLog('CREATE_DOCUMENT', { id: newDoc.id, name: newDoc.name });
    return newDoc;
  };

  const updateDocument = (id, updates) => {
    setDocuments(prev => prev.map(doc => doc.id === id ? { ...doc, ...updates } : doc));
    addLog('UPDATE_DOCUMENT', { id, updates });
  };

  const deleteDocument = (id) => {
    const doc = documents.find(d => d.id === id);
    if (doc) {
      setDocuments(prev => prev.filter(d => d.id !== id));
      setTrash(prev => [doc, ...prev]);
      addLog('MOVE_TO_TRASH', { id });
    }
  };

  const moveToTrash = (id) => {
    const doc = documents.find(d => d.id === id);
    if (doc) {
      setDocuments(prev => prev.filter(d => d.id !== id));
      setTrash(prev => [doc, ...prev]);
      addLog('MOVE_TO_TRASH', { id });
    }
  };

  const restoreDocument = (id) => {
    const doc = trash.find(d => d.id === id);
    if (doc) {
      setTrash(prev => prev.filter(d => d.id !== id));
      setDocuments(prev => [doc, ...prev]);
      addLog('RESTORE_DOCUMENT', { id });
      return doc;
    }
    return null;
  };

  const deleteFromTrash = (id) => {
    setTrash(prev => prev.filter(d => d.id !== id));
    addLog('DELETE_FROM_TRASH', { id });
  };

  // --- Cabinet Actions ---
  const addCabinet = (data) => {
    const newCabinet = {
      id: Date.now().toString(),
      ...data,
      used: 0,
      status: data.status || 'active',
      owner: data.owner,
    };
    setCabinets(prev => [newCabinet, ...prev]);
    addLog('CREATE_CABINET', { id: newCabinet.id, name: newCabinet.name });
    return newCabinet;
  };

  const updateCabinet = (id, updates) => {
    setCabinets(prev => prev.map(cab => cab.id === id ? { ...cab, ...updates } : cab));
    addLog('UPDATE_CABINET', { id, updates });
  };

  const deleteCabinet = (id) => {
    const cabinet = cabinets.find(c => c.id === id);
    if (cabinet) {
      const docsInCabinet = documents.filter(d => d.cabinetId === id);
      setDocuments(prev => prev.filter(d => d.id !== docsInCabinet.map(doc => doc.id)));
      setTrash(prev => [...prev, ...docsInCabinet]);
      setCabinets(prev => prev.filter(c => c.id !== id));
      addLog('DELETE_CABINET', { id, movedDocs: docsInCabinet.length });
    }
  };

  // --- Business Logic ---
  const placeDocumentInCabinet = (docId, cabinetId) => {
    const doc = documents.find(d => d.id === docId);
    const cabinet = cabinets.find(c => c.id === cabinetId);

    if (!doc || !cabinet) throw new Error('Document or Cabinet not found');

    // 1. Compatibility Check
    if (!isCompatible(doc.type, cabinet.type)) {
      throw new Error(`Нельзя поместить документ типа "${doc.type}" в шкаф типа "${cabinet.type}"`);
    }

    // 2. Capacity Check
    if (cabinet.used >= cabinet.capacity) {
      throw new Error('Шкаф переполнен');
    }

    // Update doc and cabinet
    updateDocument(docId, { cabinetId });
    setCabinets(prev => prev.map(cab => {
      if (cab.id === cabinetId) {
        return { ...cab, used: cab.used + 1 };
      }
      return cab;
    }));

    addLog('PLACE_DOCUMENT', { docId, cabinetId });
    return true;
  };

  const value = useMemo(() => ({
    documents,
    cabinets,
    trash,
    logs,
    addDocument,
    updateDocument,
    deleteDocument,
    moveToTrash,
    restoreDocument,
    deleteFromTrash,
    addCabinet,
    updateCabinet,
    deleteCabinet,
    placeDocumentInCabinet,
    user: null // Will be injected or handled by AuthContext
  }), [documents, cabinets, trash, logs]);

  return (
    <LibraryContext.Provider value={value}>
      {children}
    </LibraryContext.Provider>
  );
};

export const useLibrary = () => {
  const context = useContext(LibraryContext);
  if (!context) {
    throw new Error('useLibrary must be used within a LibraryProvider');
  }
  return context;
};
