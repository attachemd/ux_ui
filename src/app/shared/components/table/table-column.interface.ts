import { TemplateRef } from '@angular/core';

export interface TableColumn {
  key: string;
  label: string;
  width?: string;
  minWidth?: string;
  maxWidth?: string;
  sticky?: 'left' | 'right' | 'none';
  sortable?: boolean;
  type?: 'text' | 'date' | 'status' | 'checkbox' | 'actions' | 'custom';
  cellTemplate?: TemplateRef<any>;
}
