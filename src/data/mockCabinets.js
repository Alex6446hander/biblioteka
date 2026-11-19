import { CABINET_TYPES } from '../constants/cabinetTypes';

export const MOCK_CABINETS = [
  {
    id: 'c1',
    name: 'Общий архив документов',
    type: CABINET_TYPES.GENERAL,
    capacity: 50,
    used: 12,
    status: 'active',
    owner: 'Александр',
  },
  {
    id: 'c2',
    name: 'Секретный отдел',
    type: CABINET_TYPES.CONFIDENTIAL,
    capacity: 10,
    used: 5,
    status: 'active',
    owner: 'Александр',
    password: '123',
  },
  {
    id: 'c3',
    name: 'Проект Альфа',
    type: CABINET_TYPES.PROJECT,
    capacity: 100,
    used: 45,
    status: 'active',
    owner: 'Александр',
  },
  {
    id: 'c4',
    name: 'Архив 2023',
    type: CABINET_TYPES.ARCHIVE,
    capacity: 500,
    used: 450,
    status: 'archive',
    owner: 'Александр',
  },
];
