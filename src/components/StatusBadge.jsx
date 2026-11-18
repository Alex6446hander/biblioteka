import React from 'react';
import { cn } from '../lib/utils';

const statusConfig = {
  'Новый': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  'На проверке': 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  'Утвержден': 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
  'Архив': 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400',
};

const StatusBadge = ({ status }) => {
  return (
    <span className={cn(
      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
      statusConfig[status] || "bg-gray-100 text-gray-800"
    )}>
      {status}
    </span>
  );
};

export default StatusBadge;
