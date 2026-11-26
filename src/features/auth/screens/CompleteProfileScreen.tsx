import React, { useMemo, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import {
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type {
    AuthOnboardingStackParamList,
    NextOfKinRelationship,
} from '../types/inviteOnboarding.types';

type Props = NativeStackScreenProps<
    AuthOnboardingStackParamList,
    'CompleteProfile'
>;

const RELATIONSHIPS: NextOfKinRelationship[] = [
    'Sister',
    'Brother',
    'Parent',
    'Spouse',
    'Guardian',
    'Other',
];

function getPasswordStrength(password: string): {
    score: number;
    label: string;
} {
    if (!password) return { score: 0, label: '' };
    let score = 0;
    if (password.length >= 8) score += 1;
    if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score += 1;
    if (/\d/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;

    if (score <= 1) return { score: 1, label: 'Weak' };
    if (score === 2) return { score: 2, label: 'Fair' };
    if (score === 3) return { score: 3, label: 'Good' };
    return { score: 4, label: 'Strong' };
}

export function CompleteProfileScreen({ navigation, route }: Props) {
    const { invitation } = route.params;

    const [phoneNumber, setPhoneNumber] = useState('+234 ');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [nextOfKinName, setNextOfKinName] = useState('');
    const [nextOfKinPhone, setNextOfKinPhone] = useState('');
    const [relationship, setRelationship] =
        useState<NextOfKinRelationship>('Sister');
    const [showRelationshipDropdown, setShowRelationshipDropdown] =
        useState(false);
    const [acceptedTerms, setAcceptedTerms] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const strength = useMemo(() => getPasswordStrength(password), [password]);

    const handleContinue = () => {
        if (phoneNumber.trim().length < 10) {
            setErrorMessage('Please enter a valid phone number.');
            return;
        }
        if (password.length < 8) {
            setErrorMessage('Password must be at least 8 characters.');
            return;
        }
        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match.');
            return;
        }
        if (!nextOfKinName.trim() || !nextOfKinPhone.trim()) {
            setErrorMessage('Please fill in your Next of Kin / Emergency Contact details.');
            return;
        }
        if (!acceptedTerms) {
            setErrorMessage('Please confirm your tenancy details and accept the terms.');
            return;
        }

        setErrorMessage('');
        navigation.navigate('VerifyIdentity', {
            invitation,
            profile: {
                fullName: invitation.tenantFullName,
                email: invitation.invitedEmail,
                phoneNumber: phoneNumber.trim(),
                password,
                confirmPassword,
                nextOfKinName: nextOfKinName.trim(),
                nextOfKinPhone: nextOfKinPhone.trim(),
                relationship,
                acceptedTerms,
            },
        });
    };

    return (
        <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
            <KeyboardAvoidingView
                style={styles.flex}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >
                    {/* Header */}
                    <View style={styles.headerRow}>
                        <Pressable
                            style={styles.backButton}
                            onPress={() => navigation.goBack()}
                        >
                            <Text style={styles.backIcon}>‹</Text>
                        </Pressable>
                        <View>
                            <Text style={styles.headerTitle}>Complete Tenant Profile</Text>
                            <Text style={styles.headerSubtitle}>
                                Invite Token: {invitation.inviteToken}
                            </Text>
                        </View>
                    </View>

                    {/* Locked Tenancy Banner */}

                    <LinearGradient
                        colors={['#02281E', '#055C46']}
                        locations={[0.0789, 0.9211]}
                        start={{ x: 0, y: 0.401 }}
                        end={{ x: 1, y: 0.599 }}
                        style={styles.lockedCard}
                    >
                        <View style={styles.lockedTextGroup}>
                            <Text style={styles.lockedLabel}>
                                Linked Tenancy. {invitation.roleLabel} Account
                            </Text>
                            <Text style={styles.lockedUnit}>
                                {invitation.unitLabel} {invitation.propertyName}
                            </Text>
                        </View>
                        <Text style={styles.lockGlyph}>🔒</Text>
                    </LinearGradient>




                    {/* Primary Account Card */}
                    <View style={styles.formCard}>
                        <Text style={styles.fieldLabel}>FULL NAME (FROM INVITATION)</Text>
                        <TextInput
                            value={invitation.tenantFullName}
                            editable={false}
                            style={[styles.input, styles.readOnlyInput]}
                        />

                        <Text style={styles.fieldLabel}>EMAIL ADDRESS</Text>
                        <TextInput
                            value={invitation.invitedEmail}
                            editable={false}
                            style={[styles.input, styles.readOnlyInput]}
                        />

                        <Text style={styles.fieldLabel}>Phone Number (+234)</Text>
                        <TextInput
                            value={phoneNumber}
                            onChangeText={setPhoneNumber}
                            keyboardType="phone-pad"
                            placeholder="+234 8034567890"
                            placeholderTextColor="#9CA3AF"
                            style={styles.input}
                        />

                        <Text style={styles.fieldLabel}>Create Password</Text>
                        <View style={styles.passwordWrapper}>
                            <TextInput
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry={!showPassword}
                                placeholder="Enter password"
                                placeholderTextColor="#9CA3AF"
                                style={styles.passwordInput}
                            />
                            <Pressable
                                onPress={() => setShowPassword((prev) => !prev)}
                                hitSlop={8}
                            >
                                <Ionicons
                                    name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                                    size={20}
                                    color="#6B7280"

                                />
                            </Pressable>
                        </View>

                        {/* 4-segment Password Strength Bar */}
                        <View style={styles.strengthRow}>
                            <View style={styles.barsContainer}>
                                {[1, 2, 3, 4].map((segment) => (
                                    <View
                                        key={segment}
                                        style={[
                                            styles.strengthBar,
                                            segment <= strength.score &&
                                            (strength.score <= 1
                                                ? styles.barWeak
                                                : strength.score === 2
                                                    ? styles.barFair
                                                    : styles.barStrong),
                                        ]}
                                    />
                                ))}
                            </View>
                            {strength.label ? (
                                <Text style={styles.strengthLabel}>{strength.label}</Text>
                            ) : null}
                        </View>

                        <Text style={styles.fieldLabel}>Confirm Password</Text>
                        <View style={styles.passwordWrapper}>
                            <TextInput
                                value={confirmPassword}
                                onChangeText={setConfirmPassword}
                                secureTextEntry={!showConfirmPassword}
                                placeholder="Re-enter password"
                                placeholderTextColor="#9CA3AF"
                                style={styles.passwordInput}
                            />
                            <Pressable
                                onPress={() => setShowConfirmPassword((prev) => !prev)}
                                hitSlop={8}
                            >
                                <Ionicons
                                    name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                                    size={20}
                                    color="#6B7280"

                                />
                            </Pressable>
                        </View>
                    </View>

                    {/* Emergency Contact Card */}
                    <View style={styles.formCard}>
                        <Text style={styles.sectionHeading}>
                            Next Of Kin / Emergency Contact
                        </Text>
                        <TextInput
                            value={nextOfKinName}
                            onChangeText={setNextOfKinName}
                            placeholder="Full name"
                            placeholderTextColor="#9CA3AF"
                            style={[styles.input, styles.spacedInput]}
                        />
                        <TextInput
                            value={nextOfKinPhone}
                            onChangeText={setNextOfKinPhone}
                            keyboardType="phone-pad"
                            placeholder="+2348029913340"
                            placeholderTextColor="#9CA3AF"
                            style={styles.input}
                        />

                        <Text style={styles.fieldLabel}>Relationship With Next Of Kin</Text>
                        <Pressable
                            style={styles.dropdownTrigger}
                            onPress={() =>
                                setShowRelationshipDropdown((prev) => !prev)
                            }
                        >
                            <Text style={styles.dropdownValue}>{relationship}</Text>
                            <Text style={styles.dropdownChevron}>▾</Text>
                        </Pressable>

                        {showRelationshipDropdown && (
                            <View style={styles.dropdownMenu}>
                                {RELATIONSHIPS.map((item) => (
                                    <Pressable
                                        key={item}
                                        style={styles.dropdownOption}
                                        onPress={() => {
                                            setRelationship(item);
                                            setShowRelationshipDropdown(false);
                                        }}
                                    >
                                        <Text
                                            style={[
                                                styles.dropdownOptionText,
                                                item === relationship && styles.dropdownOptionActive,
                                            ]}
                                        >
                                            {item}
                                        </Text>
                                    </Pressable>
                                ))}
                            </View>
                        )}
                    </View>

                    {/* Terms Checkbox */}
                    <Pressable
                        style={styles.termsRow}
                        onPress={() => setAcceptedTerms((prev) => !prev)}
                    >
                        <View
                            style={[
                                styles.checkbox,
                                acceptedTerms && styles.checkboxChecked,
                            ]}
                        >
                            {acceptedTerms && <Text style={styles.checkmark}>✓</Text>}
                        </View>
                        <Text style={styles.termsText}>
                            I confirm my tenancy details for{' '}
                            <Text style={styles.boldText}>
                                {invitation.unitLabel}, {invitation.propertyName}
                            </Text>{' '}
                            and agree to RentCheck's Tenant Terms & Privacy Policy.
                        </Text>
                    </Pressable>

                    {errorMessage ? (
                        <Text style={styles.errorText}>{errorMessage}</Text>
                    ) : null}
                </ScrollView>

                <View style={styles.footer}>
                    <Pressable style={styles.primaryButton} onPress={handleContinue}>
                        <Text style={styles.primaryButtonText}>
                            Continue Verification  ›
                        </Text>
                    </Pressable>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    flex: { flex: 1 },
    safeArea: {
        flex: 1,
        backgroundColor: '#E5FDE7',
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingTop: 42,
        paddingBottom: 24,
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginBottom: 16,
    },
    backButton: {
        width: 36,
        height: 36,
        borderRadius: 10,
        backgroundColor: '#D1E7D8',
        alignItems: 'center',
        justifyContent: 'center',
    },
    backIcon: {
        fontSize: 22,
        fontWeight: '700',
        color: '#1F2937',
        lineHeight: 24,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#111827',
    },
    headerSubtitle: {
        fontSize: 12,
        color: '#4B5563',
        marginTop: 1,
    },
    lockedCard: {
        backgroundColor: '#0F5132',
        borderRadius: 14,
        padding: 14,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 14,
    },
    lockedTextGroup: {
        flex: 1,
        paddingRight: 8,
    },
    lockedLabel: {
        fontSize: 11,
        fontWeight: '600',
        color: '#86EFAC',
        marginBottom: 4,
    },
    lockedUnit: {
        fontSize: 14,
        fontWeight: '700',
        color: '#FFFFFF',
    },
    lockGlyph: {
        fontSize: 16,
    },
    formCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 16,
        marginBottom: 14,
    },
    sectionHeading: {
        fontSize: 13,
        fontWeight: '700',
        color: '#1F2937',
        marginBottom: 10,
    },
    fieldLabel: {
        fontSize: 11,
        fontWeight: '600',
        color: '#4B5563',
        marginTop: 10,
        marginBottom: 6,
    },
    input: {
        backgroundColor: '#F3F4F6',
        borderRadius: 10,
        paddingHorizontal: 14,
        paddingVertical: 11,
        fontSize: 13,
        color: '#111827',
    },
    spacedInput: {
        marginBottom: 10,
    },
    readOnlyInput: {
        color: '#374151',
        backgroundColor: '#EAECEF',
    },
    passwordWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F3F4F6',
        borderRadius: 10,
        paddingHorizontal: 14,
    },
    passwordInput: {
        flex: 1,
        paddingVertical: 11,
        fontSize: 13,
        color: '#111827',
    },
    toggleText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#4B5563',
    },
    strengthRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
        gap: 8,
    },
    barsContainer: {
        flex: 1,
        flexDirection: 'row',
        gap: 6,
    },
    strengthBar: {
        flex: 1,
        height: 4,
        borderRadius: 2,
        backgroundColor: '#E5E7EB',
    },
    barWeak: { backgroundColor: '#EF4444' },
    barFair: { backgroundColor: '#F59E0B' },
    barStrong: { backgroundColor: '#22C55E' },
    strengthLabel: {
        fontSize: 11,
        fontWeight: '600',
        color: '#16A34A',
    },
    dropdownTrigger: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#F3F4F6',
        borderRadius: 10,
        paddingHorizontal: 14,
        paddingVertical: 12,
    },
    dropdownValue: {
        fontSize: 13,
        color: '#111827',
        fontWeight: '500',
    },
    dropdownChevron: {
        fontSize: 14,
        color: '#374151',
    },
    dropdownMenu: {
        marginTop: 6,
        borderRadius: 10,
        backgroundColor: '#F9FAFB',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        overflow: 'hidden',
    },
    dropdownOption: {
        paddingVertical: 10,
        paddingHorizontal: 14,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#E5E7EB',
    },
    dropdownOptionText: {
        fontSize: 13,
        color: '#374151',
    },
    dropdownOptionActive: {
        color: '#15803D',
        fontWeight: '700',
    },
    termsRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 10,
        marginTop: 4,
    },
    checkbox: {
        width: 18,
        height: 18,
        borderRadius: 4,
        borderWidth: 1.5,
        borderColor: '#15803D',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 2,
        backgroundColor: '#FFFFFF',
    },
    checkboxChecked: {
        backgroundColor: '#15803D',
    },
    checkmark: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: '700',
    },
    termsText: {
        flex: 1,
        fontSize: 11,
        lineHeight: 16,
        color: '#374151',
    },
    boldText: {
        fontWeight: '700',
        color: '#111827',
    },
    errorText: {
        marginTop: 10,
        fontSize: 12,
        fontWeight: '600',
        color: '#DC2626',
    },
    footer: {
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 20,
        paddingVertical: 14,
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor: '#E5E7EB',
    },
    primaryButton: {
        backgroundColor: '#20770D',
        borderRadius: 12,
        paddingVertical: 15,
        alignItems: 'center',
    },
    primaryButtonText: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: '700',
    },
});