import React, { useRef, useState } from 'react';
import {
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
    Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { AuthOnboardingStackParamList } from '../types/inviteOnboarding.types';

type Props = NativeStackScreenProps<
    AuthOnboardingStackParamList,
    'VerifyIdentity'
>;

const CODE_LENGTH = 6;

export function VerifyIdentityScreen({ navigation, route }: Props) {
    const { invitation, profile } = route.params;
    const [digits, setDigits] = useState<string[]>(() =>
        Array<string>(CODE_LENGTH).fill('')
    );
    const [statusNotice, setStatusNotice] = useState('');
    const inputRefs = useRef<Array<React.ComponentRef<typeof TextInput> | null>>([]);

    const handleChangeDigit = (text: string, index: number) => {
        const cleaned = text.replace(/\D/g, '');
        if (!cleaned) {
            setDigits((prev) => {
                const next = [...prev];
                next[index] = '';
                return next;
            });
            return;
        }

        if (cleaned.length > 1) {
            const pasted = cleaned.slice(0, CODE_LENGTH).split('');
            const next = Array<string>(CODE_LENGTH)
                .fill('')
                .map((_, idx) => pasted[idx] ?? '');
            setDigits(next);
            const focusIdx = Math.min(pasted.length, CODE_LENGTH - 1);
            inputRefs.current[focusIdx]?.focus();
            return;
        }

        setDigits((prev) => {
            const next = [...prev];
            next[index] = cleaned;
            return next;
        });

        if (index < CODE_LENGTH - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyPress = (key: string, index: number) => {
        if (key === 'Backspace' && !digits[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleAutoFill = () => {
        setDigits(['4', '8', '2', '9', '1', '6']);
        setStatusNotice('');
    };

    const handleResend = () => {
        setDigits(Array<string>(CODE_LENGTH).fill(''));
        setStatusNotice(`A new code was sent to ${profile.email}`);
        inputRefs.current[0]?.focus();
    };

    const handleVerify = () => {
        const code = digits.join('');
        if (code.length < CODE_LENGTH) {
            setStatusNotice('Please enter all 6 digits to verify your identity.');
            return;
        }
        setStatusNotice('');
        navigation.navigate('TenancyReview', {
            invitation,
            profile,
        });
    };

    return (
        <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
            <View style={styles.content}>
                <View style={styles.headerRow}>
                    <Pressable
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}
                    >
                        <Text style={styles.backIcon}>‹</Text>
                    </Pressable>
                    <View>
                        <Text style={styles.headerTitle}>Verify Your Identity</Text>
                        <Text style={styles.headerSubtitle}>
                            Step 2 of 2 · Security Check
                        </Text>
                    </View>
                </View>

                <View style={styles.otpCard}>
                    <View style={styles.deviceBadge}>
                        <Text style={styles.deviceIcon}>📱</Text>
                    </View>

                    <Text style={styles.cardTitle}>Enter 6-Digit Code</Text>
                    <Text style={styles.cardSubtitle}>
                        We sent a one time verification code to{' '}
                        <Text style={styles.emailBold}>{profile.email}</Text>
                    </Text>

                    <View style={styles.boxesRow}>
                        {digits.map((digit, index) => (
                            <TextInput
                                key={index}
                                ref={(ref) => {
                                    inputRefs.current[index] = ref;
                                }}
                                value={digit}
                                onChangeText={(text) => handleChangeDigit(text, index)}
                                onKeyPress={({ nativeEvent }) =>
                                    handleKeyPress(nativeEvent.key, index)
                                }
                                keyboardType="number-pad"
                                maxLength={CODE_LENGTH}
                                style={[styles.otpBox, digit ? styles.otpBoxFilled : null]}
                                textAlign="center"
                            />
                        ))}
                    </View>

                    <View style={styles.actionsRow}>
                        <Pressable onPress={handleResend} hitSlop={8}>
                            <Text style={styles.resendText}>Resend Code</Text>
                        </Pressable>
                        <Pressable onPress={handleAutoFill} hitSlop={8}>
                            <Text style={styles.autoFillText}>AutoFill Code</Text>
                        </Pressable>
                    </View>

                    {statusNotice ? (
                        <Text style={styles.noticeText}>{statusNotice}</Text>
                    ) : null}
                </View>
            </View>

            <View style={styles.footer}>
                <Pressable style={styles.primaryButton} onPress={handleVerify}>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 2, }}>
                        <Text style={styles.primaryButtonText}>
                            Verify & Complete Setup
                        </Text>

                        <Image
                            source={require('../../../../assets/images/tick2.svg')}
                        />
                    </View>



                </Pressable>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#EAF8EE',
    },
    content: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 12,
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginBottom: 24,
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
    otpCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 18,
        padding: 20,
        alignItems: 'center',
    },
    deviceBadge: {
        width: 48,
        height: 48,
        borderRadius: 14,
        backgroundColor: '#DCFCE7',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 14,
    },
    deviceIcon: {
        fontSize: 22,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#111827',
        marginBottom: 6,
    },
    cardSubtitle: {
        fontSize: 12,
        lineHeight: 18,
        color: '#4B5563',
        textAlign: 'center',
        marginBottom: 20,
    },
    emailBold: {
        fontWeight: '700',
        color: '#111827',
    },
    boxesRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        gap: 8,
        marginBottom: 18,
    },
    otpBox: {
        flex: 1,
        height: 52,
        width: 40,
        borderRadius: 10,
        backgroundColor: '#F3F4F6',
        fontSize: 20,
        textAlign: 'center',
        fontWeight: '700',
        color: '#111827',
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    otpBoxFilled: {
        borderColor: '#15803D',
        backgroundColor: '#F0FDF4',
    },
    actionsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    resendText: {
        fontSize: 12,
        color: '#4B5563',
        fontWeight: '500',
    },
    autoFillText: {
        fontSize: 12,
        color: '#15803D',
        fontWeight: '700',
    },
    noticeText: {
        marginTop: 12,
        fontSize: 12,
        color: '#15803D',
        textAlign: 'center',
    },
    footer: {
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 20,
        paddingVertical: 14,
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor: '#E5E7EB',
    },
    primaryButton: {
        backgroundColor: '#15803D',
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