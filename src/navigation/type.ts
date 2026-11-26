import { UserRole } from '../types/domain';

export type AuthStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Register: { prefillEmail?: string; inviteCode?: string } | undefined;
  AcceptInvite: { inviteCode?: string } | undefined;
};

export type TenantStackParamList = {
  TenantHome: undefined;
  UnitDetails: { unitId: string };
  Profile: undefined;
};

export type CaretakerStackParamList = {
  CaretakerHome: undefined;
  AssignedPropertyDetails: { propertyId: string };
  Profile: undefined;
};

export type RootStackParamList = {
  Auth: undefined;
  TenantApp: undefined;
  CaretakerApp: undefined;
};