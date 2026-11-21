import { DOCUMENT_TYPES } from '../constants/documentTypes';
import { CABINET_TYPES } from '../constants/cabinetTypes';

/**
 * Матрица совместимости документов и шкафов согласно ТЗ (раздел 4.4).
 * Определяет, в какие типы шкафов можно поместить документы определенных типов.
 */
export const COMPATIBILITY_MATRIX = {
  [DOCUMENT_TYPES.CONFIDENTIAL]: [CABINET_TYPES.CONFIDENTIAL],
  [DOCUMENT_TYPES.PUBLIC]: [CABINET_TYPES.GENERAL, CABINET_TYPES.ARCHIVE, CABINET_TYPES.PROJECT],
  [DOCUMENT_TYPES.INTERNAL]: [CABINET_TYPES.NOMENCLATURE, CABINET_TYPES.ARCHIVE, CABINET_TYPES.TEMPORARY],
  [DOCUMENT_TYPES.PROJECT]: [CABINET_TYPES.PROJECT],
  [DOCUMENT_TYPES.DRAFT]: [CABINET_TYPES.NOMENCLATURE, CABINET_TYPES.TEMPORARY],
};

/**
 * Проверяет, можно ли поместить документ в выбранный шкаф.
 * @param {string} docType - Тип документа
 * @param {string} cabinetType - Тип шкафа
 * @returns {boolean}
 */
export const isCompatible = (docType, cabinetType) => {
  const allowedCabinets = COMPATIBILITY_MATRIX[docType];
  return allowedCabinets && allowedCabinets.includes(cabinetType);
};
