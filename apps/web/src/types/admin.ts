export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'ADMIN' | 'EDITOR';
}

export interface AdminAuthResponse {
  accessToken: string;
  user: AdminUser;
}

export interface AdminSummaryItem {
  key: string;
  label: string;
  count: number;
}

export interface AdminResourceList<T = Record<string, unknown>> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}

export interface AdminResourceConfig {
  key: string;
  label: string;
  titleField: string;
  descriptionField?: string;
  fields: AdminFieldConfig[];
  readonly?: boolean;
}

export type AdminFieldType = 'text' | 'textarea' | 'number' | 'date' | 'select' | 'checkbox';

export interface AdminFieldConfig {
  name: string;
  label: string;
  type?: AdminFieldType;
  required?: boolean;
  options?: string[];
}
