import React from 'react';
import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
    Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { AuthOnboardingStackParamList } from '../types/inviteOnboarding.types';


type Props = NativeStackScreenProps<
    AuthOnboardingStackParamList,
    'InviteLanding'
>;

export function InviteLandingScreen({ navigation, route }: Props) {
    const { invitation } = route.params;
    const firstName = invitation.tenantFullName.split(' ')[0] || 'Tenant';

    return (
        <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.topBar}>
                    <View>
                        <View style={styles.logoWrapper}>
                            <Image
                                source={require('../../../../assets/images/RentCheckLogo.svg')}
                                style={styles.brandLogo}
                                resizeMode="contain"
                                accessibilityLabel="RentCheck"
                            />
                        </View>
                        <Text style={styles.subBrandText}>Verified Tenant Portal</Text>
                        <Text style={styles.tokenText}>• {invitation.inviteToken}</Text>
                    </View>
                    <Pressable
                        onPress={() => {
                            // Hook up Get App / deep link modal or store action
                        }}
                        hitSlop={8}
                    >
                        <Text style={styles.getAppText}>Get App ↗</Text>
                    </Pressable>
                </View>

                <Text style={styles.heading}>Welcome, {firstName}!</Text>
                <Text style={styles.leadCopy}>
                    <Text style={styles.boldInline}>{invitation.invitedByOrg}</Text> has
                    invited you to manage your tenancy on RentCheck. Your unit and lease
                    terms are pre-linked below.
                </Text>

                <LinearGradient
                    colors={['#02281E', '#055C46']}
                    locations={[0.0789, 0.9211]}
                    start={{ x: 0, y: 0.401 }}
                    end={{ x: 1, y: 0.599 }}
                    style={styles.propertyCard}>
                    <View style={styles.propertyTopRow}>
                        <View style={{ flexDirection: "row", alignItems: "center", gap: 6, }}>
                            <Image
                                source={require('../../../../assets/images/home.svg')}
                            />
                            <Text style={styles.propertyBadge}>Assigned Property</Text>
                        </View>
                        <Text style={styles.propertyId}>ID: {invitation.tenancyId}</Text>
                    </View>

                    <Text style={styles.unitTitle}>{invitation.unitLabel}</Text>
                    <Text style={styles.propertySubtitle}>{invitation.propertyName}</Text>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 6, }}>
                        <Image
                            source={require('../../../../assets/images/location.svg')}
                        />
                        <Text style={styles.addressText}>{invitation.propertyAddress}</Text>
                    </View>


                </LinearGradient>


                <View style={styles.detailsCard}>
                    <DetailRow label="Landlord/Manager" value={invitation.landlordOrManager} />
                    <DetailRow label="Lease Period" value={invitation.leasePeriod} />
                    <DetailRow
                        label="Invited Email"
                        value={invitation.invitedEmail}
                        highlightValue
                    />
                    <DetailRow label="Caretaker" value={invitation.caretakerName} />
                </View>

                <View style={styles.infoBanner}>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 2, }}>
                        <Image
                                source={require('../../../../assets/images/tick.svg')}
                            />
                        <Text style={styles.infoBannerText}>
                        Your account is automatically configured as a{' '}
                        <Text style={styles.boldInline}>{invitation.roleLabel}</Text> for{' '}
                        {invitation.unitLabel}. No manual setup or property search required.
                    </Text>
                    </View>


                    <Text style={styles.infoBannerText}>
                        Your account is automatically configured as a{' '}
                        <Text style={styles.boldInline}>{invitation.roleLabel}</Text> for{' '}
                        {invitation.unitLabel}. No manual setup or property search required.
                    </Text>
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <Pressable
                    style={styles.primaryButton}
                    onPress={() =>
                        navigation.navigate('CompleteProfile', { invitation })
                    }
                >
                    <Text style={styles.primaryButtonText}>
                        Accept Invitation & Create Account  ›
                    </Text>
                </Pressable>

                <Pressable
                    style={styles.signInLinkRow}
                    onPress={() => navigation.navigate('SignIn', { invitation })}
                >
                    <Text style={styles.signInMuted}>
                        Already have a RentCheck account?{' '}
                        <Text style={styles.signInAction}>Sign In</Text>
                    </Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
}

function DetailRow({
    label,
    value,
    highlightValue = false,
}: {
    label: string;
    value: string;
    highlightValue?: boolean;
}) {
    return (
        <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>{label}</Text>
            <Text
                style={[
                    styles.detailValue,
                    highlightValue && styles.detailValueHighlight,
                ]}
            >
                {value}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#E5FDE7',

    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingTop: 34,
        paddingBottom: 24,
    },
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 38,
        // borderStyle: "solid",
        // borderWidth: 2,
    },
    logoWrapper: {
        height: 40,
        justifyContent: 'center',
        overflow: 'hidden',
    },
    brandLogo: {
        width: 110,
        height: 100,
    },

    subBrandText: {
        fontSize: 12,
        color: '#4B5563',
        // top: -60,
    },
    tokenText: {
        fontSize: 11,
        fontWeight: '600',
        color: '#15803D',
        marginTop: 2,
        // top: -60,
    },
    getAppText: {
        fontSize: 13,
        fontWeight: '600',
        color: '#15803D',
    },
    heading: {
        fontSize: 24,
        fontFamily: 'Inter_500Medium',
        color: '#111827',
        marginBottom: 8,
    },
    leadCopy: {
        fontSize: 12,
        lineHeight: 20,
        color: '#374151',
        marginBottom: 16,
    },
    boldInline: {
        fontFamily: 'Inter_500Medium',
        color: '#111827',
    },
    propertyCard: {
        backgroundColor: '#0F5132',
        borderRadius: 16,
        padding: 16,
        marginBottom: 14,
    },
    propertyTopRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    propertyBadge: {
        fontSize: 12,
        fontWeight: '600',
        color: '#A7F3D0',
    },
    propertyId: {
        fontSize: 12,
        fontWeight: '700',
        color: '#D1FAE5',
    },
    unitTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#FFFFFF',
    },
    propertySubtitle: {
        fontSize: 13,
        color: '#D1FAE5',
        marginTop: 2,
        marginBottom: 10,
    },
    addressText: {
        fontSize: 12,
        color: '#A7F3D0',
    },
    detailsCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 14,
        paddingHorizontal: 16,
        paddingVertical: 6,
        marginBottom: 14,
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 11,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#E5E7EB',
    },
    detailLabel: {
        fontSize: 13,
        color: '#6B7280',
    },
    detailValue: {
        fontSize: 13,
        fontWeight: '600',
        color: '#111827',
    },
    detailValueHighlight: {
        color: '#15803D',
    },
    infoBanner: {
        backgroundColor: '#DCFCE7',
        borderRadius: 12,
        padding: 12,
        borderWidth: 1,
        borderColor: '#BBF7D0',
    },
    infoBannerText: {
        fontSize: 12,
        lineHeight: 18,
        color: '#14532D',
    },
    footer: {
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 20,
        paddingTop: 24,
        paddingBottom: 12,
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor: '#E5E7EB',
    },
    primaryButton: {
        backgroundColor: '#20770D',
        borderRadius: 12,
        paddingVertical: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    primaryButtonText: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: '700',
    },
    signInLinkRow: {
        marginTop: 12,
        alignItems: 'center',
    },
    signInMuted: {
        fontSize: 13,
        color: '#6B7280',
    },
    signInAction: {
        color: '#15803D',
        fontWeight: '700',
    },
});