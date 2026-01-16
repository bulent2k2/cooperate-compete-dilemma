import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  Settings as SettingsIcon, 
  Volume2, 
  VolumeX,
  Smartphone,
  Info,
  RotateCcw,
  Share2,
  Heart,
  ExternalLink
} from 'lucide-react-native';

export default function SettingsScreen() {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [hapticEnabled, setHapticEnabled] = useState(true);
  const [animations, setAnimations] = useState(true);

  const handleResetStats = () => {
    Alert.alert(
      'Reset Statistics',
      'Are you sure you want to reset all your game statistics? This action cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: () => {
            // Here you would reset the actual stats
            Alert.alert('Success', 'Statistics have been reset.');
          },
        },
      ]
    );
  };

  const handleShareApp = () => {
    Alert.alert(
      'Share App',
      'Thanks for wanting to share the Prisoner\'s Dilemma app! Sharing functionality would be implemented here.',
    );
  };

  const handleAbout = () => {
    Alert.alert(
      'About',
      'Prisoner\'s Dilemma v1.0\n\nA game theory educational app that lets you explore the classic prisoner\'s dilemma scenario.\n\nBuilt with React Native and Expo.',
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Settings</Text>
          <Text style={styles.subtitle}>Customize your experience</Text>
        </View>

        {/* Game Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Game Settings</Text>
          
          <View style={styles.settingCard}>
            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                {soundEnabled ? (
                  <Volume2 size={20} color="#2563EB" />
                ) : (
                  <VolumeX size={20} color="#6B7280" />
                )}
                <View style={styles.settingText}>
                  <Text style={styles.settingLabel}>Sound Effects</Text>
                  <Text style={styles.settingDescription}>
                    Play sounds for game actions
                  </Text>
                </View>
              </View>
              <Switch
                value={soundEnabled}
                onValueChange={setSoundEnabled}
                trackColor={{ false: '#E2E8F0', true: '#BFDBFE' }}
                thumbColor={soundEnabled ? '#2563EB' : '#F1F5F9'}
              />
            </View>
          </View>

          <View style={styles.settingCard}>
            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Smartphone size={20} color={hapticEnabled ? '#2563EB' : '#6B7280'} />
                <View style={styles.settingText}>
                  <Text style={styles.settingLabel}>Haptic Feedback</Text>
                  <Text style={styles.settingDescription}>
                    Vibrate on button presses
                  </Text>
                </View>
              </View>
              <Switch
                value={hapticEnabled}
                onValueChange={setHapticEnabled}
                trackColor={{ false: '#E2E8F0', true: '#BFDBFE' }}
                thumbColor={hapticEnabled ? '#2563EB' : '#F1F5F9'}
              />
            </View>
          </View>

          <View style={styles.settingCard}>
            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <RotateCcw size={20} color={animations ? '#2563EB' : '#6B7280'} />
                <View style={styles.settingText}>
                  <Text style={styles.settingLabel}>Animations</Text>
                  <Text style={styles.settingDescription}>
                    Enable smooth transitions
                  </Text>
                </View>
              </View>
              <Switch
                value={animations}
                onValueChange={setAnimations}
                trackColor={{ false: '#E2E8F0', true: '#BFDBFE' }}
                thumbColor={animations ? '#2563EB' : '#F1F5F9'}
              />
            </View>
          </View>
        </View>

        {/* Data & Privacy */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Data & Privacy</Text>
          
          <TouchableOpacity style={styles.actionCard} onPress={handleResetStats}>
            <View style={styles.actionInfo}>
              <RotateCcw size={20} color="#EF4444" />
              <View style={styles.actionText}>
                <Text style={styles.actionLabel}>Reset Statistics</Text>
                <Text style={styles.actionDescription}>
                  Clear all game history and stats
                </Text>
              </View>
            </View>
            <ExternalLink size={16} color="#6B7280" />
          </TouchableOpacity>
        </View>

        {/* Support */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          
          <TouchableOpacity style={styles.actionCard} onPress={handleShareApp}>
            <View style={styles.actionInfo}>
              <Share2 size={20} color="#2563EB" />
              <View style={styles.actionText}>
                <Text style={styles.actionLabel}>Share App</Text>
                <Text style={styles.actionDescription}>
                  Tell friends about this app
                </Text>
              </View>
            </View>
            <ExternalLink size={16} color="#6B7280" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionCard}>
            <View style={styles.actionInfo}>
              <Heart size={20} color="#EF4444" />
              <View style={styles.actionText}>
                <Text style={styles.actionLabel}>Rate App</Text>
                <Text style={styles.actionDescription}>
                  Leave a review in the app store
                </Text>
              </View>
            </View>
            <ExternalLink size={16} color="#6B7280" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionCard} onPress={handleAbout}>
            <View style={styles.actionInfo}>
              <Info size={20} color="#8B5CF6" />
              <View style={styles.actionText}>
                <Text style={styles.actionLabel}>About</Text>
                <Text style={styles.actionDescription}>
                  App version and information
                </Text>
              </View>
            </View>
            <ExternalLink size={16} color="#6B7280" />
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Prisoner's Dilemma v1.0
          </Text>
          <Text style={styles.footerSubtext}>
            Made with ❤️ for game theory enthusiasts
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1E293B',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748B',
    fontWeight: '500',
  },
  section: {
    marginHorizontal: 20,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 16,
  },
  settingCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingText: {
    marginLeft: 12,
    flex: 1,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 14,
    color: '#64748B',
  },
  actionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  actionInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  actionText: {
    marginLeft: 12,
    flex: 1,
  },
  actionLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 2,
  },
  actionDescription: {
    fontSize: 14,
    color: '#64748B',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 20,
  },
  footerText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 4,
  },
  footerSubtext: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
  },
});