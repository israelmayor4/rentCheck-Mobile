export type NextOfKinRelationship =
  | 'Sister'
  | 'Brother'
  | 'Parent'
  | 'Spouse'
  | 'Guardian'
  | 'Other';

export interface InvitationDetails {
  inviteToken: string;
  invitedByOrg: string;
  tenantFullName: string;
  invitedEmail: string;
  roleLabel: string;
  unitLabel: string;
  propertyName: string;
  propertyAddress: string;
  tenancyId: string;
  leasePeriod: string;
  landlordOrManager: string;
  caretakerName: string;
}

export interface TenantProfileFormData {
  fullName: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  nextOfKinName: string;
  nextOfKinPhone: string;
  relationship: NextOfKinRelationship;
  acceptedTerms: boolean;
}

export type AuthOnboardingStackParamList = {
  InviteLanding: { invitation: InvitationDetails };
  CompleteProfile: { invitation: InvitationDetails };
  VerifyIdentity: {
    invitation: InvitationDetails;
    profile: TenantProfileFormData;
  };
  TenancyActivated: {
    invitation: InvitationDetails;
    profile: TenantProfileFormData;
  };
  SignIn: {
    invitation?: InvitationDetails;
  } | undefined;
};