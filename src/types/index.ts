// User Types
export enum UserRole {
  ADMIN = "ADMIN",
  EDITOR = "EDITOR",
  VIEWER = "VIEWER"
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: UserRole;
}

export interface UserResponse {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
}

export interface CreateUserDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: UserRole;
}

export interface UpdateUserDto {
  firstName?: string;
  lastName?: string;
  email?: string;
  role?: UserRole;
}

// Content/Blog Types
export enum ContentTag {
  TECHNOLOGY = "TECHNOLOGY",
  BUSINESS = "BUSINESS",
  LIFESTYLE = "LIFESTYLE",
  EDUCATION = "EDUCATION",
  HEALTH = "HEALTH",
  ENTERTAINMENT = "ENTERTAINMENT"
}

export interface Content {
  id: string;
  title: string;
  description: string;
  image: string;
  authorId: string;
  tags: ContentTag[];
  category: string;
  createdAt: string;
  updatedAt: string;
}

export interface ContentWithAuthor extends Content {
  author: UserResponse;
}

export interface CreateContentDto {
  title: string;
  description: string;
  image: string;
  tags: ContentTag[];
  category: string;
}

export interface UpdateContentDto {
  title?: string;
  description?: string;
  image?: string;
  tags?: ContentTag[];
  category?: string;
}

// Activity/Logs Types
export enum ActivityAction {
  // Auth actions
  LOGIN = "LOGIN",
  LOGOUT = "LOGOUT",
  REGISTER = "REGISTER",
  
  // CRUD actions
  CREATE = "CREATE",
  READ = "READ",
  UPDATE = "UPDATE",
  DELETE = "DELETE"
}

export interface Activity {
  id: string;
  performedBy: string;
  performedAt: string;
  action: ActivityAction;
  resourceType?: string;
  resourceId?: string;
  details?: string;
}

export interface ActivityWithUser extends Activity {
  user: UserResponse;
}

// Dashboard Statistics Types
export interface DashboardStats {
  totalUsers: number;
  totalContents: number;
  totalActivities: number;
  recentActivities: ActivityWithUser[];
  contentsByCategory: Record<string, number>;
  usersByRole: Record<UserRole, number>;
}

// Pagination Types
export interface PaginationParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Filter Types
export interface ContentFilters extends PaginationParams {
  category?: string;
  tags?: ContentTag[];
  authorId?: string;
}

export interface ActivityFilters extends PaginationParams {
  action?: ActivityAction;
  performedBy?: string;
  startDate?: string;
  endDate?: string;
}
