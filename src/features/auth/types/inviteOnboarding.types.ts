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
  SignIn: { invitation?: InvitationDetails } | undefined;
  CompleteProfile: { invitation: InvitationDetails };
  VerifyIdentity: {
    invitation: InvitationDetails;
    profile: TenantProfileFormData;
  };
  TenancyReview: {
    invitation: InvitationDetails;
    profile?: TenantProfileFormData;
  };
  TenancyActivated: {
    invitation: InvitationDetails;
    profile: TenantProfileFormData;
  };
};


// Add these optional fields to InvitationDetails so existing screens stay 100% compatible
export interface InvitationFinancialBreakdown {
  monthlyRentFormatted?: string;     // e.g. "₦750,000/month"
  serviceChargeFormatted?: string;   // e.g. "₦50,000"
  cautionDepositFormatted?: string;  // e.g. "₦100,000"
  agreementUrl?: string;
  agreementSummary?: string;
}

export type InvitationIssueReason =
  | 'incorrect_rent_or_fees'
  | 'wrong_unit_or_property'
  | 'wrong_lease_dates'
  | 'did_not_request_invite'
  | 'other';

export interface InvitationReportPayload {
  tenancyId: string;
  inviteToken: string;
  action: 'decline' | 'report_incorrect_details';
  reason: InvitationIssueReason;
  notes?: string;
}