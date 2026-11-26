import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { AuthOnboardingStackParamList } from '../types/inviteOnboarding.types';

type Props = NativeStackScreenProps<
  AuthOnboardingStackParamList,
  'TenancyActivated'
>;

export function TenancyActivatedScreen({ route }: Props) {
  const { invitation } = route.params;
  const firstName = invitation.tenantFullName.split(' ')[0] || 'Tenant';

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <View style={styles.content}>
        <View style={styles.checkOuterCircle}>
          <View style={styles.checkInnerCircle}>
            <Text style={styles.checkIcon}>✓</Text>
          </View>
        </View>

        <View style={styles.statusPill}>
          <Text style={styles.statusPillText}>Tenancy Activated</Text>
        </View>

        <Text style={styles.heading}>You're All Set, {firstName}!</Text>
        <Text style={styles.subtitle}>
          Your RentCheck tenant profile is now connected to your apartment and
          landlord records.
        </Text>

        <View style={styles.summaryCard}>
          <SummaryRow label="Assigned Unit" value={invitation.unitLabel} />
          <SummaryRow label="Property" value={invitation.propertyName} />
          <SummaryRow
            label="Tenancy ID"
            value={invitation.tenancyId}
            highlight
          />
          <SummaryRow label="Active Lease" value={invitation.leasePeriod} />
          <SummaryRow
            label="Facility Caretaker"
            value={invitation.caretakerName}
            isLast
          />
        </View>
      </View>

      <View style={styles.footer}>
        <Pressable
          style={styles.primaryButton}
          onPress={() => {
            // Dispatch auth state / navigate to Tenant Dashboard stack
          }}
        >
          <Text style={styles.primaryButtonText}>
            Go to My Tenant Dashboard  ›
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

function SummaryRow({
  label,
  value,
  highlight = false,
  isLast = false,
}: {
  label: string;
  value: string;
  highlight?: boolean;
  isLast?: boolean;
}) {
  return (
    <View style={[styles.row, isLast && styles.rowLast]}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={[styles.rowValue, highlight && styles.rowValueHighlight]}>
        {value}
      </Text>
    </View>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkOuterCircle: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: '#D1FADF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  checkInnerCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    borderWidth: 3,
    borderColor: '#15803D',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkIcon: {
    fontSize: 26,
    fontWeight: '800',
    color: '#15803D',
  },
  statusPill: {
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderRadius: 999,
    marginBottom: 10,
  },
  statusPillText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#15803D',
  },
  heading: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 13,
    lineHeight: 19,
    color: '#4B5563',
    textAlign: 'center',
    paddingHorizontal: 12,
    marginBottom: 24,
  },
  summaryCard: {
    width: '100%',
    backgroundColor: '#DCEEE2',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#BBD7C4',
  },
  rowLast: {
    borderBottomWidth: 0,
  },
  rowLabel: {
    fontSize: 12,
    color: '#4B5563',
  },
  rowValue: {
    fontSize: 12,
    fontWeight: '700',
    color: '#111827',
  },
  rowValueHighlight: {
    color: '#15803D',
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
