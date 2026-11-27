export type UserRole = 'TENANT' | 'CARETAKER';

export interface CaretakerPermissions {
  canLogComplaints: boolean;
  canViewRentStatus: boolean;
  canUpdateOccupancy: boolean;
}

interface BaseUser {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
}

export interface TenantUser extends BaseUser {
  role: 'TENANT';
}

export interface CaretakerUser extends BaseUser {
  role: 'CARETAKER';
  permissions: CaretakerPermissions;
}

export type User = TenantUser | CaretakerUser;

export interface PropertyUnit {
  id: string;
  propertyName: string;
  unitLabel: string;
  address: string;
  rentAmount: number;
  dueDate: string;
  paymentStatus: 'PAID' | 'PENDING' | 'OVERDUE';
}

export interface Invitation {
  id: string;
  inviteCode: string;
  role: UserRole;
  propertyName: string;
  unitLabel?: string;
  landlordName: string;
  status: 'PENDING' | 'ACCEPTED' | 'EXPIRED';
}