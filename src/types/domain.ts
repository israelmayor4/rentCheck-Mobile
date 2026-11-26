export type UserRole = 'TENANT' | 'CARETAKER';

export interface CaretakerPermissions {
  canLogComplaints: boolean;
  canViewRentStatus: boolean;
  canUpdateOccupancy: boolean;
}

export interface User {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  role: UserRole;
  permissions?: CaretakerPermissions;
}

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