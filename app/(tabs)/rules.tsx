import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TriangleAlert as AlertTriangle, Handshake, Sword, Brain, Target, TrendingUp } from 'lucide-react-native';

export default function RulesScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Game Rules</Text>
          <Text style={styles.subtitle}>Learn the Prisoner's Dilemma</Text>
        </View>

        {/* Story Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <AlertTriangle size={24} color="#F59E0B" />
            <Text style={styles.sectionTitle}>The Story</Text>
          </View>
          <Text style={styles.text}>
            Two prisoners are arrested and held in separate cells, unable to communicate. 
            Each must decide whether to cooperate with their partner (stay silent) or 
            defect (testify against their partner).
          </Text>
        </View>

        {/* Choices Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Target size={24} color="#2563EB" />
            <Text style={styles.sectionTitle}>Your Choices</Text>
          </View>
          
          <View style={styles.choiceCard}>
            <View style={styles.choiceHeader}>
              <Handshake size={20} color="#10B981" />
              <Text style={styles.choiceTitle}>Cooperate (Stay Silent)</Text>
            </View>
            <Text style={styles.choiceDescription}>
              You choose to stay silent and not testify against your partner. 
              This shows loyalty but risks being betrayed.
            </Text>
          </View>

          <View style={styles.choiceCard}>
            <View style={styles.choiceHeader}>
              <Sword size={20} color="#EF4444" />
              <Text style={styles.choiceTitle}>Defect (Betray)</Text>
            </View>
            <Text style={styles.choiceDescription}>
              You choose to testify against your partner to reduce your own sentence. 
              This might benefit you but hurts your partner.
            </Text>
          </View>
        </View>

        {/* Scoring Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <TrendingUp size={24} color="#8B5CF6" />
            <Text style={styles.sectionTitle}>Scoring System</Text>
          </View>
          
          <View style={styles.scoreCard}>
            <Text style={styles.scoreScenario}>Both Cooperate</Text>
            <Text style={styles.scoreResult}>3 points each</Text>
            <Text style={styles.scoreExplanation}>
              Mutual cooperation - both benefit moderately
            </Text>
          </View>

          <View style={styles.scoreCard}>
            <Text style={styles.scoreScenario}>Both Defect</Text>
            <Text style={styles.scoreResult}>1 point each</Text>
            <Text style={styles.scoreExplanation}>
              Mutual defection - both suffer
            </Text>
          </View>

          <View style={styles.scoreCard}>
            <Text style={styles.scoreScenario}>One Cooperates, One Defects</Text>
            <Text style={styles.scoreResult}>0 points vs 5 points</Text>
            <Text style={styles.scoreExplanation}>
              The defector wins big, the cooperator loses
            </Text>
          </View>
        </View>

        {/* Strategy Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Brain size={24} color="#EA580C" />
            <Text style={styles.sectionTitle}>Strategy Tips</Text>
          </View>
          
          <View style={styles.strategyCard}>
            <Text style={styles.strategyTitle}>Tit-for-Tat</Text>
            <Text style={styles.strategyDescription}>
              Start by cooperating, then copy your opponent's last move. 
              This encourages cooperation while punishing defection.
            </Text>
          </View>

          <View style={styles.strategyCard}>
            <Text style={styles.strategyTitle}>Always Cooperate</Text>
            <Text style={styles.strategyDescription}>
              Always choose to cooperate. This maximizes mutual benefit 
              but is vulnerable to exploitation.
            </Text>
          </View>

          <View style={styles.strategyCard}>
            <Text style={styles.strategyTitle}>Always Defect</Text>
            <Text style={styles.strategyDescription}>
              Always choose to defect. This guarantees you won't be 
              exploited but leads to poor overall outcomes.
            </Text>
          </View>

          <View style={styles.strategyCard}>
            <Text style={styles.strategyTitle}>Random</Text>
            <Text style={styles.strategyDescription}>
              Choose randomly between cooperation and defection. 
              This makes you unpredictable but inconsistent.
            </Text>
          </View>
        </View>

        {/* Game Theory Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Brain size={24} color="#0891B2" />
            <Text style={styles.sectionTitle}>Why It Matters</Text>
          </View>
          <Text style={styles.text}>
            The Prisoner's Dilemma illustrates the conflict between individual 
            rationality and collective benefit. It appears in many real-world 
            situations like business negotiations, environmental protection, 
            and international relations.
          </Text>
          <Text style={styles.text}>
            The dilemma shows that what's best for individuals (defecting) 
            isn't always best for the group (cooperating). Understanding 
            this helps us make better decisions in complex social situations.
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
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1E293B',
    marginLeft: 12,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: '#475569',
    marginBottom: 16,
  },
  choiceCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#E2E8F0',
  },
  choiceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  choiceTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
    marginLeft: 8,
  },
  choiceDescription: {
    fontSize: 14,
    lineHeight: 20,
    color: '#64748B',
  },
  scoreCard: {
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  scoreScenario: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 4,
  },
  scoreResult: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2563EB',
    marginBottom: 8,
  },
  scoreExplanation: {
    fontSize: 14,
    color: '#64748B',
  },
  strategyCard: {
    backgroundColor: '#FEF7FF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#8B5CF6',
  },
  strategyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 8,
  },
  strategyDescription: {
    fontSize: 14,
    lineHeight: 20,
    color: '#64748B',
  },
});