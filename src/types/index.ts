// src/types/index.ts
export interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  modified: string;
  status: 'pending' | 'approved' | 'rejected';
  author?: string;
  tags?: string[];
  filepath?: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'viewer';
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface DocumentsResponse {
  documents: Document[];
  pagination: {
    current: number;
    total: number;
    count: number;
  };
}

export interface Workflow {
  id: string;
  name: string;
  description: string;
  steps: string[];
  status: 'active' | 'inactive';
}

export interface DashboardStats {
  totalDocuments: number;
  pendingApprovals: number;
  approvedDocuments: number;
  totalUsers: number;
  recentActivity: ActivityItem[];
}

export interface ActivityItem {
  id: string;
  action: string;
  user: string;
  timestamp: string;
  document?: string;
}

export interface UploadProgress {
  loaded: number;
  total: number;
  percentage: number;
}

export interface SearchFilters {
  search?: string;
  type?: string;
  status?: string;
  author?: string;
  dateFrom?: string;
  dateTo?: string;
}

export interface PaginationParams {
  page: number;
  limit: number;
}

// API Error types
export interface ApiError {
  success: false;
  message: string;
  code?: string;
  details?: any;
}

// Form types
export interface LoginForm {
  email: string;
  password: string;
}

export interface UploadForm {
  files: FileList;
  tags?: string;
  description?: string;
}

// Component prop types
export interface DocumentItemProps {
  document: Document;
  onDelete?: (id: string) => void;
  onDownload?: (id: string) => void;
  onPreview?: (id: string) => void;
}

export interface TableColumn<T> {
  key: keyof T;
  label: string;
  sortable?: boolean;
  render?: (value: any, item: T) => React.ReactNode;
}
