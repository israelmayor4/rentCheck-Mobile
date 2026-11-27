import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type {
  AuthOnboardingStackParamList,
  InvitationDetails,
} from '../types/inviteOnboarding.types';
import { InviteLandingScreen } from '../screens/InviteLandingScreen';
import { CompleteProfileScreen } from '../screens/CompleteProfileScreen';
import { VerifyIdentityScreen } from '../screens/VerifyIdentityScreen';
import { TenancyReviewScreen } from '../screens/TenancyReviewScreen';
import { TenancyActivatedScreen } from '../screens/TenancyActivatedScreen';
import { SignInScreen } from '../screens/SignInScreen';

const Stack = createNativeStackNavigator<AuthOnboardingStackParamList>();

export const SAMPLE_INVITATION: InvitationDetails = {
  inviteToken: 'RC-INV-88492',
  invitedByOrg: 'Adeyemi Estate Holdings',
  tenantFullName: 'Chinedu Okafor',
  invitedEmail: 'chinedu.okafor@gmail.com',
  roleLabel: 'Tenant',
  unitLabel: 'Flat B (2nd Floor)',
  propertyName: 'Sapphire Court Apartments',
  propertyAddress: '14 Admiralty way, Lekki Phase 1, Lagos',
  tenancyId: 'TNT-2026-04B',
  leasePeriod: '01 Jan 2026 - 31 Dec 2026',
  landlordOrManager: 'Chief Babatunde Adeyemi',
  caretakerName: 'Mr. Tunde Bakare',
};

export function AuthOnboardingNavigator({
  invitation = SAMPLE_INVITATION,
}: {
  invitation?: InvitationDetails;
}) {
  return (
    <Stack.Navigator
      initialRouteName="InviteLanding"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name="InviteLanding"
        component={InviteLandingScreen}
        initialParams={{ invitation }}
      />
      <Stack.Screen
        name="SignIn"
        component={SignInScreen} />
      <Stack.Screen
        name="CompleteProfile"
        component={CompleteProfileScreen}
      />
      <Stack.Screen
        name="VerifyIdentity"
        component={VerifyIdentityScreen}
      />
      <Stack.Screen name="TenancyReview" component={TenancyReviewScreen} />
      <Stack.Screen
        name="TenancyActivated"
        component={TenancyActivatedScreen}
      />

    </Stack.Navigator>
  );
}