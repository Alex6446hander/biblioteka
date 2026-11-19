import { DOCUMENT_TYPES, DOCUMENT_STATUSES } from '../constants/documentTypes';

export const MOCK_DOCUMENTS = [
  {
    id: '1',
    name: 'Договор поставки №45',
    description: 'Основной договор с поставщиком оборудования',
    type: DOCUMENT_TYPES.INTERNAL,
    status: DOCUMENT_STATUSES.APPROVED,
    date: '2024-05-20',
    owner: 'Александр',
  },
  {
    id: '2',
    name: 'Проект развития ИТ-инфраструктуры',
    description: 'План развития на 2025 год',
    type: DOCUMENT_TYPES.PROJECT,
    status: DOCUMENT_STATUSES.ACTIVE,
    date: '2024-05-15',
    owner: 'Александр',
  },
  {
    id: '3',
    name: 'Конфиденциальное соглашение',
    description: 'NDA для внешних консультантов',
    type: DOCUMENT_TYPES.CONFIDENTIAL,
    status: DOCUMENT_STATUSES.DRAFT,
    date: '2024-05-22',
    owner: 'Александр',
  },
  {
    id: '4',
    name: 'Отчет по итогам квартала',
    description: 'Финансовые показатели за 1 квартал',
    type: DOCUMENT_TYPES.PUBLIC,
    status: DOCUMENT_STATUSES.APPROVED,
    date: '2024-04-10',
    owner: 'Александр',
  },
];
