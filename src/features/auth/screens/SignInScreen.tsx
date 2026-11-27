import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Linking,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthOnboardingStackParamList } from '../types/inviteOnboarding.types';

type Props = NativeStackScreenProps<AuthOnboardingStackParamList, 'SignIn'>;

export const SignInScreen: React.FC<Props> = ({ navigation, route }) => {
  const invitation = route.params?.invitation;
  const inviteCode = invitation?.inviteToken ?? 'RC-INV-88492';
  const unitLabel = invitation?.unitLabel ?? 'Flat 4B (2nd Floor)';

  const [identifier, setIdentifier] = useState(
    invitation?.invitedEmail ?? 'chineduokafor@gmail.com'
  );
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSignIn = () => {
    const trimmedIdentifier = identifier.trim();
    if (!trimmedIdentifier || !password.trim()) {
      setErrorMessage('Please enter your email/phone number and password.');
      return;
    }

    setErrorMessage(null);

    if (invitation) {
      navigation.navigate('TenancyActivated', {
        invitation,
        profile: {
          fullName: invitation.tenantFullName || 'Chinedu Okafor',
          email: trimmedIdentifier,
          phoneNumber: '',
          password,
          confirmPassword: password,
          nextOfKinName: '',
          nextOfKinPhone: '',
          relationship: 'Other',
          acceptedTerms: true,
        },
      });
    }
  };

  const handleReturnToInvite = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else if (invitation) {
      navigation.navigate('InviteLanding', { invitation });
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Top Brand & Invite Status Header */}
          <View style={styles.topHeader}>
            <View>
              <View style={styles.brandRow}>
                <View style={styles.logoBadge}>
                  <Ionicons name="home-outline" size={16} color="#1B7318" />
                </View>
                <Text style={styles.brandText}>RentCheck</Text>
              </View>
              <Text style={styles.portalSubtitle}>Verified Tenant Portal</Text>
              {invitation && (
                <View style={styles.inviteBadgeRow}>
                  <View style={styles.greenDot} />
                  <Text style={styles.inviteCodeText}>{inviteCode}</Text>
                </View>
              )}
            </View>

            <Pressable
              style={styles.getAppLink}
              onPress={() => Linking.openURL('https://rentcheck.app')}
              hitSlop={8}
            >
              <Text style={styles.getAppText}>Get App</Text>
              <Ionicons name="arrow-up-outline" size={14} color="#1E293B" style={styles.diagonalArrow} />
            </Pressable>
          </View>

          {/* Dark Emerald Hero Card */}
          <View style={styles.heroCard}>
            {/* Subtle background building line-art watermark */}
            <View pointerEvents="none" style={styles.watermarkOuter} />
            <View pointerEvents="none" style={styles.watermarkInner} />
            <View pointerEvents="none" style={styles.watermarkArch} />

            <Text style={styles.heroTitle}>Sign in to RentCheck</Text>
            <Text style={styles.heroSubtitle}>
              Access your apartment details, rent receipts, and maintenance requests.
            </Text>

            {invitation && (
              <View style={styles.linkedBanner}>
                <View style={styles.bannerCheckCircle}>
                  <Ionicons name="checkmark" size={14} color="#1B7318" />
                </View>
                <View style={styles.bannerTextWrap}>
                  <Text style={styles.bannerTitle}>
                    Active Invitation Linked ({inviteCode})
                  </Text>
                  <Text style={styles.bannerSubtext}>
                    Signing in will attach {unitLabel} automatically.
                  </Text>
                </View>
              </View>
            )}
          </View>

          {/* Credentials Card */}
          <View style={styles.formCard}>
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Email / Phone Number</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.textInput}
                  value={identifier}
                  onChangeText={(val) => {
                    setIdentifier(val);
                    if (errorMessage) setErrorMessage(null);
                  }}
                  placeholder="chineduokafor@gmail.com"
                  placeholderTextColor="#94A3B8"
                  autoCapitalize="none"
                  keyboardType="email-address"
                  autoComplete="email"
                />
              </View>
            </View>

            <View style={styles.fieldGroupLast}>
              <Text style={styles.fieldLabel}>Password</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.textInput}
                  value={password}
                  onChangeText={(val) => {
                    setPassword(val);
                    if (errorMessage) setErrorMessage(null);
                  }}
                  placeholder="••••••••••"
                  placeholderTextColor="#64748B"
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  autoComplete="password"
                />
                <Pressable
                  onPress={() => setShowPassword((prev) => !prev)}
                  hitSlop={10}
                  accessibilityLabel={showPassword ? 'Hide password' : 'Show password'}
                >
                  <Ionicons
                    name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                    size={20}
                    color="#334155"
                  />
                </Pressable>
              </View>
            </View>

            {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
          </View>

          {/* Primary Action Button */}
          <Pressable
            style={({ pressed }) => [
              styles.primaryButton,
              pressed && styles.primaryButtonPressed,
            ]}
            onPress={handleSignIn}
          >
            <Text style={styles.primaryButtonText}>
              {invitation ? 'Sign In & Link Tenancy' : 'Sign In'}
            </Text>
            <Ionicons name="chevron-forward" size={18} color="#FFFFFF" />
          </Pressable>

          {/* Footer Return Link */}
          <View style={styles.footerRow}>
            <Text style={styles.footerPrompt}>New to RentCheck? </Text>
            <Pressable onPress={handleReturnToInvite} hitSlop={8}>
              <Text style={styles.footerLink}>Return to invitation Link</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F3FAF2',
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 18,
    paddingTop: 10,
    paddingBottom: 28,
  },
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  logoBadge: {
    width: 24,
    height: 24,
    borderRadius: 6,
    backgroundColor: '#DCFCE7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#22C55E',
  },
  portalSubtitle: {
    fontSize: 11,
    color: '#334155',
    marginTop: 2,
  },
  inviteBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 4,
  },
  greenDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#22C55E',
  },
  inviteCodeText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#15803D',
  },
  getAppLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    paddingTop: 2,
  },
  getAppText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#1E293B',
    textDecorationLine: 'underline',
  },
  diagonalArrow: {
    transform: [{ rotate: '45deg' }],
  },
  heroCard: {
    backgroundColor: '#0E4831',
    borderRadius: 24,
    paddingHorizontal: 22,
    paddingTop: 68,
    paddingBottom: 56,
    overflow: 'hidden',
    position: 'relative',
    marginBottom: 20,
  },
  watermarkOuter: {
    position: 'absolute',
    top: 38,
    alignSelf: 'center',
    width: 170,
    height: 230,
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    borderWidth: 1.5,
    borderColor: 'rgba(134, 239, 172, 0.16)',
  },
  watermarkInner: {
    position: 'absolute',
    top: 84,
    alignSelf: 'center',
    width: 220,
    height: 190,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    borderWidth: 1.5,
    borderColor: 'rgba(134, 239, 172, 0.12)',
  },
  watermarkArch: {
    position: 'absolute',
    bottom: -10,
    alignSelf: 'center',
    width: 66,
    height: 76,
    borderTopLeftRadius: 33,
    borderTopRightRadius: 33,
    borderWidth: 1.5,
    borderColor: 'rgba(134, 239, 172, 0.18)',
  },
  heroTitle: {
    fontSize: 27,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 12.5,
    lineHeight: 18,
    color: '#D1FAE5',
    marginBottom: 20,
  },
  linkedBanner: {
    backgroundColor: '#CCF4BE',
    borderRadius: 10,
    paddingVertical: 11,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  bannerCheckCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1.5,
    borderColor: '#1B7318',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bannerTextWrap: {
    flex: 1,
  },
  bannerTitle: {
    fontSize: 11.5,
    fontWeight: '700',
    color: '#14532D',
  },
  bannerSubtext: {
    fontSize: 11,
    color: '#166534',
    marginTop: 1,
  },
  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 18,
    marginBottom: 20,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  fieldGroup: {
    marginBottom: 14,
  },
  fieldGroupLast: {
    marginBottom: 0,
  },
  fieldLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 6,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 44,
  },
  textInput: {
    flex: 1,
    fontSize: 13.5,
    color: '#1E293B',
  },
  errorText: {
    marginTop: 10,
    fontSize: 12,
    color: '#DC2626',
  },
  primaryButton: {
    backgroundColor: '#1B7318',
    borderRadius: 10,
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 18,
  },
  primaryButtonPressed: {
    opacity: 0.9,
  },
  primaryButtonText: {
    fontSize: 14.5,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerPrompt: {
    fontSize: 12,
    color: '#1E293B',
  },
  footerLink: {
    fontSize: 12,
    fontWeight: '600',
    color: '#15803D',
    textDecorationLine: 'underline',
  },
});