import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  RootStackParamList,
  AuthStackParamList,
  TenantStackParamList,
  CaretakerStackParamList,
} from './types';
import { UserRole } from '../types/domain';

const RootStack = createNativeStackNavigator<RootStackParamList>();
const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const TenantStack = createNativeStackNavigator<TenantStackParamList>();
const CaretakerStack = createNativeStackNavigator<CaretakerStackParamList>();

// Temporary placeholder screen until MOB-02, MOB-03, MOB-04, and MOB-05 screens are built
function PlaceholderScreen({ title }: { title: string }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>RENTCHECK Sprint 1 Placeholder</Text>
    </View>
  );
}

function AuthNavigator() {
  return (
    <AuthStack.Navigator initialRouteName="Welcome">
      <AuthStack.Screen name="Welcome">
        {() => <PlaceholderScreen title="Welcome" />}
      </AuthStack.Screen>
      <AuthStack.Screen name="Login">
        {() => <PlaceholderScreen title="Login (MOB-02)" />}
      </AuthStack.Screen>
      <AuthStack.Screen name="Register">
        {() => <PlaceholderScreen title="Register (MOB-02)" />}
      </AuthStack.Screen>
      <AuthStack.Screen name="AcceptInvite">
        {() => <PlaceholderScreen title="Accept Invite (MOB-03)" />}
      </AuthStack.Screen>
    </AuthStack.Navigator>
  );
}

function TenantNavigator() {
  return (
    <TenantStack.Navigator initialRouteName="TenantHome">
      <TenantStack.Screen name="TenantHome" options={{ title: 'Tenant Home' }}>
        {() => <PlaceholderScreen title="Tenant Home (MOB-04)" />}
      </TenantStack.Screen>
      <TenantStack.Screen name="UnitDetails" options={{ title: 'Unit Details' }}>
        {() => <PlaceholderScreen title="Unit Details" />}
      </TenantStack.Screen>
      <TenantStack.Screen name="Profile">
        {() => <PlaceholderScreen title="Profile" />}
      </TenantStack.Screen>
    </TenantStack.Navigator>
  );
}

function CaretakerNavigator() {
  return (
    <CaretakerStack.Navigator initialRouteName="CaretakerHome">
      <CaretakerStack.Screen name="CaretakerHome" options={{ title: 'Caretaker Home' }}>
        {() => <PlaceholderScreen title="Caretaker Home (MOB-05)" />}
      </CaretakerStack.Screen>
      <CaretakerStack.Screen
        name="AssignedPropertyDetails"
        options={{ title: 'Property Details' }}
      >
        {() => <PlaceholderScreen title="Assigned Property Details" />}
      </CaretakerStack.Screen>
      <CaretakerStack.Screen name="Profile">
        {() => <PlaceholderScreen title="Profile" />}
      </CaretakerStack.Screen>
    </CaretakerStack.Navigator>
  );
}

interface RootNavigatorProps {
  isAuthenticated?: boolean;
  userRole?: UserRole | null;
}

export default function RootNavigator({
  isAuthenticated = false,
  userRole = null,
}: RootNavigatorProps) {
  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {!isAuthenticated ? (
          <RootStack.Screen name="Auth" component={AuthNavigator} />
        ) : userRole === 'CARETAKER' ? (
          <RootStack.Screen name="CaretakerApp" component={CaretakerNavigator} />
        ) : (
          <RootStack.Screen name="TenantApp" component={TenantNavigator} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1E3A8A',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#64748B',
  },
});