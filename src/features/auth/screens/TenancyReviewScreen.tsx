import React, { useState } from 'react';
import {
    Alert,
    Modal,
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
import {
    AuthOnboardingStackParamList,
    InvitationIssueReason,
    TenantProfileFormData,
} from '../types/inviteOnboarding.types';

type Props = NativeStackScreenProps<
    AuthOnboardingStackParamList,
    'TenancyReview'
>;

const ISSUE_OPTIONS: { key: InvitationIssueReason; label: string }[] = [
    { key: 'incorrect_rent_or_fees', label: 'Rent, service charge, or deposit is wrong' },
    { key: 'wrong_unit_or_property', label: 'Wrong apartment unit or property name' },
    { key: 'wrong_lease_dates', label: 'Incorrect lease start or end date' },
    { key: 'did_not_request_invite', label: 'I did not expect this invitation' },
    { key: 'other', label: 'Other details need correction' },
];

export const TenancyReviewScreen: React.FC<Props> = ({
    navigation,
    route,
}) => {
    const { invitation, profile } = route.params;

    const [agreementVisible, setAgreementVisible] = useState(false);
    const [reportModalVisible, setReportModalVisible] = useState(false);
    const [selectedReason, setSelectedReason] =
        useState<InvitationIssueReason>('incorrect_rent_or_fees');
    const [reportNotes, setReportNotes] = useState('');
    const [reportSubmitted, setReportSubmitted] = useState(false);

    const monthlyRent =
        (invitation as { monthlyRentFormatted?: string }).monthlyRentFormatted ??
        '₦750,000/month';
    const serviceCharge =
        (invitation as { serviceChargeFormatted?: string })
            .serviceChargeFormatted ?? '₦50,000';
    const cautionDeposit =
        (invitation as { cautionDepositFormatted?: string })
            .cautionDepositFormatted ?? '₦100,000';

    const handleConfirmAndAccept = () => {
        const fallbackProfile: TenantProfileFormData = {
            fullName: invitation.tenantFullName,
            email: '',
            phoneNumber: '',
            password: '',
            confirmPassword: '',
            nextOfKinName: '',
            nextOfKinPhone: '',
            relationship: 'Other',
            acceptedTerms: true,
        };

        navigation.navigate('TenancyActivated', {
            invitation,
            profile: profile ?? fallbackProfile,
        });
    };

    const handleSubmitReport = () => {
        setReportModalVisible(false);
        setReportSubmitted(true);
        Alert.alert(
            'Feedback Sent',
            'We have notified the property manager to review and update your tenancy details.',
        );
    };

    return (
        <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
            {/* Top Header */}
            <View style={styles.header}>
                <Pressable
                    onPress={() => navigation.goBack()}
                    style={styles.backButton}
                    accessibilityRole="button"
                    accessibilityLabel="Go back"
                >
                    <Ionicons name="chevron-back" size={22} color="#111827" />
                </Pressable>
                <Text style={styles.headerTitle}>Review Tenancy Details</Text>
                <View style={styles.headerSpacer} />
            </View>

            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Status Banner */}
                <View style={styles.infoBanner}>
                    <Ionicons name="shield-checkmark-outline" size={18} color="#0F766E" />
                    <Text style={styles.infoBannerText}>
                        Please review your tenancy terms carefully before confirming.
                    </Text>
                </View>

                {reportSubmitted && (
                    <View style={styles.warningBanner}>
                        <Ionicons name="alert-circle-outline" size={18} color="#B45309" />
                        <Text style={styles.warningBannerText}>
                            Correction request logged. You can still confirm once updated, or
                            wait for your manager to resend the invite.
                        </Text>
                    </View>
                )}

                {/* Tenancy Breakdown Card */}
                <View style={styles.card}>
                    <DetailRow
                        icon="person-outline"
                        label="Landlord"
                        value={invitation.landlordOrManager}
                    />
                    <DetailRow
                        icon="business-outline"
                        label="Property"
                        value={invitation.propertyName}
                    />
                    <DetailRow
                        icon="home-outline"
                        label="Unit"
                        value={invitation.unitLabel}
                    />

                    <View style={styles.divider} />

                    <DetailRow
                        icon="cash-outline"
                        label="Rent"
                        value={monthlyRent}
                        highlight
                    />
                    <DetailRow
                        icon="layers-outline"
                        label="Service Charge"
                        value={serviceCharge}
                    />
                    <DetailRow
                        icon="lock-closed-outline"
                        label="Caution Deposit"
                        value={cautionDeposit}
                    />
                    <DetailRow
                        icon="calendar-outline"
                        label="Period"
                        value={invitation.leasePeriod}
                        isLast
                    />
                </View>

                {/* View Agreement Link */}
                <Pressable
                    onPress={() => setAgreementVisible(true)}
                    style={styles.agreementLink}
                    accessibilityRole="button"
                >
                    <Ionicons name="document-text-outline" size={18} color="#0F766E" />
                    <Text style={styles.agreementLinkText}>View Agreement</Text>
                </Pressable>

                {/* Primary & Secondary CTAs */}
                <Pressable
                    onPress={handleConfirmAndAccept}
                    style={({ pressed }) => [
                        styles.primaryButton,
                        pressed && styles.primaryButtonPressed,
                    ]}
                    accessibilityRole="button"
                >
                    <Text style={styles.primaryButtonText}>Confirm and Accept</Text>
                </Pressable>

                <Pressable
                    onPress={() => setReportModalVisible(true)}
                    style={styles.secondaryButton}
                    accessibilityRole="button"
                >
                    <Text style={styles.secondaryButtonText}>
                        Report Incorrect Details
                    </Text>
                </Pressable>
            </ScrollView>

            {/* Tenancy Agreement Preview Modal */}
            <Modal
                visible={agreementVisible}
                animationType="slide"
                transparent
                onRequestClose={() => setAgreementVisible(false)}
            >
                <View style={styles.modalBackdrop}>
                    <View style={styles.modalCard}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Tenancy Agreement Summary</Text>
                            <Pressable onPress={() => setAgreementVisible(false)}>
                                <Ionicons name="close" size={22} color="#374151" />
                            </Pressable>
                        </View>
                        <ScrollView style={styles.modalBody}>
                            <Text style={styles.modalParagraph}>
                                This residential tenancy agreement is between{' '}
                                <Text style={styles.bold}>{invitation.landlordOrManager}</Text>{' '}
                                (Landlord/Manager) and{' '}
                                <Text style={styles.bold}>
                                    {profile?.fullName || invitation.tenantFullName}
                                </Text>{' '}
                                (Tenant) for <Text style={styles.bold}>{invitation.unitLabel}</Text>{' '}
                                at <Text style={styles.bold}>{invitation.propertyName}</Text>.
                            </Text>
                            <Text style={styles.modalParagraph}>
                                • <Text style={styles.bold}>Tenancy Period:</Text>{' '}
                                {invitation.leasePeriod}
                                {'\n'}• <Text style={styles.bold}>Base Rent:</Text> {monthlyRent}
                                {'\n'}• <Text style={styles.bold}>Service Charge:</Text>{' '}
                                {serviceCharge}
                                {'\n'}• <Text style={styles.bold}>Caution Deposit:</Text>{' '}
                                {cautionDeposit} (refundable subject to exit inspection)
                            </Text>
                            <Text style={styles.modalMuted}>
                                By tapping "Confirm and Accept", you acknowledge the unit
                                allocation, payment schedule, and estate rules under RentCheck.
                            </Text>
                        </ScrollView>
                        <Pressable
                            onPress={() => setAgreementVisible(false)}
                            style={styles.primaryButton}
                        >
                            <Text style={styles.primaryButtonText}>Close Preview</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>

            {/* Report Incorrect Details Modal */}
            <Modal
                visible={reportModalVisible}
                animationType="slide"
                transparent
                onRequestClose={() => setReportModalVisible(false)}
            >
                <View style={styles.modalBackdrop}>
                    <View style={styles.modalCard}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Report Incorrect Details</Text>
                            <Pressable onPress={() => setReportModalVisible(false)}>
                                <Ionicons name="close" size={22} color="#374151" />
                            </Pressable>
                        </View>

                        <Text style={styles.modalSubtitle}>
                            Select what needs to be corrected before you accept this tenancy:
                        </Text>

                        {ISSUE_OPTIONS.map((option) => {
                            const active = selectedReason === option.key;
                            return (
                                <Pressable
                                    key={option.key}
                                    onPress={() => setSelectedReason(option.key)}
                                    style={[
                                        styles.reasonRow,
                                        active && styles.reasonRowActive,
                                    ]}
                                >
                                    <Ionicons
                                        name={active ? 'radio-button-on' : 'radio-button-off'}
                                        size={18}
                                        color={active ? '#0F766E' : '#6B7280'}
                                    />
                                    <Text style={styles.reasonText}>{option.label}</Text>
                                </Pressable>
                            );
                        })}

                        <TextInput
                            value={reportNotes}
                            onChangeText={setReportNotes}
                            placeholder="Add optional notes for your landlord or caretaker..."
                            placeholderTextColor="#9CA3AF"
                            multiline
                            style={styles.notesInput}
                        />

                        <Pressable
                            onPress={handleSubmitReport}
                            style={styles.primaryButton}
                        >
                            <Text style={styles.primaryButtonText}>Send Report</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

interface DetailRowProps {
    icon: keyof typeof Ionicons.glyphMap;
    label: string;
    value: string;
    highlight?: boolean;
    isLast?: boolean;
}

const DetailRow: React.FC<DetailRowProps> = ({
    icon,
    label,
    value,
    highlight = false,
    isLast = false,
}) => (
    <View style={[styles.detailRow, !isLast && styles.detailRowSpacing]}>
        <View style={styles.detailLeft}>
            <Ionicons name={icon} size={18} color="#6B7280" style={styles.rowIcon} />
            <Text style={styles.detailLabel}>{label}</Text>
        </View>
        <Text style={[styles.detailValue, highlight && styles.detailValueHighlight]}>
            {value}
        </Text>
    </View>
);

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#E5FDE7',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
    },
    backButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTitle: {
        fontSize: 17,
        fontWeight: '700',
        color: '#111827',
    },
    headerSpacer: {
        width: 36,
    },
    scrollContent: {
        padding: 20,
        paddingBottom: 36,
    },
    infoBanner: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F0FDFA',
        borderWidth: 1,
        borderColor: '#CCFBF1',
        borderRadius: 12,
        padding: 12,
        marginBottom: 16,
        gap: 10,
    },
    infoBannerText: {
        flex: 1,
        fontSize: 13,
        color: '#115E59',
        lineHeight: 18,
    },
    warningBanner: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFBEB',
        borderWidth: 1,
        borderColor: '#FDE68A',
        borderRadius: 12,
        padding: 12,
        marginBottom: 16,
        gap: 10,
    },
    warningBannerText: {
        flex: 1,
        fontSize: 13,
        color: '#92400E',
        lineHeight: 18,
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 18,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        shadowColor: '#000',
        shadowOpacity: 0.04,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    detailRowSpacing: {
        marginBottom: 14,
    },
    detailLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rowIcon: {
        marginRight: 8,
    },
    detailLabel: {
        fontSize: 14,
        color: '#6B7280',
    },
    detailValue: {
        fontSize: 14,
        fontWeight: '600',
        color: '#111827',
        maxWidth: '58%',
        textAlign: 'right',
    },
    detailValueHighlight: {
        color: '#0F766E',
        fontWeight: '700',
    },
    divider: {
        height: 1,
        backgroundColor: '#F3F4F6',
        marginVertical: 14,
    },
    agreementLink: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
        gap: 6,
    },
    agreementLinkText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#0F766E',
        textDecorationLine: 'underline',
    },
    primaryButton: {
        backgroundColor: '#0F766E',
        borderRadius: 12,
        paddingVertical: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 4,
    },
    primaryButtonPressed: {
        opacity: 0.9,
    },
    primaryButtonText: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: '700',
    },
    secondaryButton: {
        paddingVertical: 14,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 6,
    },
    secondaryButtonText: {
        color: '#DC2626',
        fontSize: 14,
        fontWeight: '600',
    },
    modalBackdrop: {
        flex: 1,
        backgroundColor: 'rgba(17, 24, 39, 0.45)',
        justifyContent: 'flex-end',
    },
    modalCard: {
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        maxHeight: '85%',
    },
    modalHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    modalTitle: {
        fontSize: 17,
        fontWeight: '700',
        color: '#111827',
    },
    modalSubtitle: {
        fontSize: 13,
        color: '#4B5563',
        marginBottom: 12,
    },
    modalBody: {
        marginBottom: 16,
    },
    modalParagraph: {
        fontSize: 14,
        color: '#374151',
        lineHeight: 21,
        marginBottom: 12,
    },
    modalMuted: {
        fontSize: 12,
        color: '#6B7280',
        lineHeight: 18,
    },
    bold: {
        fontWeight: '700',
        color: '#111827',
    },
    reasonRow: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        marginBottom: 8,
        gap: 10,
    },
    reasonRowActive: {
        borderColor: '#0F766E',
        backgroundColor: '#F0FDFA',
    },
    reasonText: {
        flex: 1,
        fontSize: 13,
        color: '#111827',
    },
    notesInput: {
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 10,
        padding: 12,
        minHeight: 76,
        textAlignVertical: 'top',
        fontSize: 13,
        color: '#111827',
        marginTop: 4,
        marginBottom: 14,
    },
});