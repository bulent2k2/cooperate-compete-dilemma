import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChartBar as BarChart3, Trophy, Target, TrendingUp, Calendar, Award, Users, Brain } from 'lucide-react-native';

// Mock data for demonstration
const mockStats = {
  totalGames: 15,
  player1Wins: 8,
  player2Wins: 5,
  ties: 2,
  totalRounds: 89,
  cooperationRate: 0.62,
  averageScore: 2.3,
};

const mockGameHistory = [
  {
    id: 1,
    date: '2025-01-07',
    mode: 'ai',
    rounds: 6,
    playerScore: 14,
    opponentScore: 11,
    result: 'win',
  },
  {
    id: 2,
    date: '2025-01-07',
    mode: 'local',
    rounds: 5,
    playerScore: 9,
    opponentScore: 12,
    result: 'loss',
  },
  {
    id: 3,
    date: '2025-01-06',
    mode: 'ai',
    rounds: 8,
    playerScore: 18,
    opponentScore: 15,
    result: 'win',
  },
  {
    id: 4,
    date: '2025-01-06',
    mode: 'local',
    rounds: 4,
    playerScore: 8,
    opponentScore: 8,
    result: 'tie',
  },
];

export default function HistoryScreen() {
  const [activeTab, setActiveTab] = useState<'stats' | 'games'>('stats');

  const winRate = mockStats.totalGames > 0 
    ? (mockStats.player1Wins / mockStats.totalGames * 100).toFixed(1) 
    : '0.0';

  const getResultColor = (result: string) => {
    switch (result) {
      case 'win': return '#10B981';
      case 'loss': return '#EF4444';
      case 'tie': return '#F59E0B';
      default: return '#6B7280';
    }
  };

  const getResultIcon = (result: string) => {
    switch (result) {
      case 'win': return Trophy;
      case 'loss': return Target;
      case 'tie': return Award;
      default: return Users;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Game History</Text>
          <Text style={styles.subtitle}>Your performance statistics</Text>
        </View>

        {/* Tab Switcher */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === 'stats' && styles.tabButtonActive,
            ]}
            onPress={() => setActiveTab('stats')}>
            <Text
              style={[
                styles.tabText,
                activeTab === 'stats' && styles.tabTextActive,
              ]}>
              Statistics
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === 'games' && styles.tabButtonActive,
            ]}
            onPress={() => setActiveTab('games')}>
            <Text
              style={[
                styles.tabText,
                activeTab === 'games' && styles.tabTextActive,
              ]}>
              Game History
            </Text>
          </TouchableOpacity>
        </View>

        {activeTab === 'stats' ? (
          <>
            {/* Overall Stats */}
            <View style={styles.statsGrid}>
              <View style={styles.statCard}>
                <BarChart3 size={24} color="#2563EB" />
                <Text style={styles.statValue}>{mockStats.totalGames}</Text>
                <Text style={styles.statLabel}>Total Games</Text>
              </View>
              
              <View style={styles.statCard}>
                <Trophy size={24} color="#F59E0B" />
                <Text style={styles.statValue}>{winRate}%</Text>
                <Text style={styles.statLabel}>Win Rate</Text>
              </View>
              
              <View style={styles.statCard}>
                <TrendingUp size={24} color="#10B981" />
                <Text style={styles.statValue}>{mockStats.averageScore}</Text>
                <Text style={styles.statLabel}>Avg Score</Text>
              </View>
              
              <View style={styles.statCard}>
                <Brain size={24} color="#8B5CF6" />
                <Text style={styles.statValue}>{(mockStats.cooperationRate * 100).toFixed(0)}%</Text>
                <Text style={styles.statLabel}>Cooperation</Text>
              </View>
            </View>

            {/* Detailed Stats */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Performance Breakdown</Text>
              
              <View style={styles.performanceCard}>
                <View style={styles.performanceRow}>
                  <Text style={styles.performanceLabel}>Games Won</Text>
                  <Text style={styles.performanceValue}>{mockStats.player1Wins}</Text>
                </View>
                <View style={styles.performanceRow}>
                  <Text style={styles.performanceLabel}>Games Lost</Text>
                  <Text style={styles.performanceValue}>{mockStats.player2Wins}</Text>
                </View>
                <View style={styles.performanceRow}>
                  <Text style={styles.performanceLabel}>Games Tied</Text>
                  <Text style={styles.performanceValue}>{mockStats.ties}</Text>
                </View>
                <View style={styles.performanceRow}>
                  <Text style={styles.performanceLabel}>Total Rounds</Text>
                  <Text style={styles.performanceValue}>{mockStats.totalRounds}</Text>
                </View>
              </View>
            </View>

            {/* Strategy Analysis */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Strategy Analysis</Text>
              
              <View style={styles.strategyCard}>
                <Text style={styles.strategyLabel}>Cooperation Rate</Text>
                <View style={styles.progressBar}>
                  <View 
                    style={[
                      styles.progressFill, 
                      { width: `${mockStats.cooperationRate * 100}%` }
                    ]} 
                  />
                </View>
                <Text style={styles.strategyDescription}>
                  You cooperate {(mockStats.cooperationRate * 100).toFixed(0)}% of the time. 
                  {mockStats.cooperationRate > 0.6 
                    ? ' You tend to be cooperative and trusting.' 
                    : ' You tend to be more competitive and cautious.'}
                </Text>
              </View>
            </View>
          </>
        ) : (
          /* Game History */
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recent Games</Text>
            
            {mockGameHistory.map((game) => (
              <View key={game.id} style={styles.gameCard}>
                <View style={styles.gameHeader}>
                  <View style={styles.gameInfo}>
                    <View style={styles.gameMeta}>
                      {React.createElement(getResultIcon(game.result), {
                        size: 20,
                        color: getResultColor(game.result),
                      })}
                      <Text style={styles.gameMode}>
                        {game.mode === 'ai' ? 'vs AI' : 'Local'}
                      </Text>
                    </View>
                    <Text style={styles.gameDate}>{game.date}</Text>
                  </View>
                  <View 
                    style={[
                      styles.resultBadge, 
                      { backgroundColor: getResultColor(game.result) }
                    ]}>
                    <Text style={styles.resultText}>
                      {game.result.toUpperCase()}
                    </Text>
                  </View>
                </View>
                
                <View style={styles.gameStats}>
                  <View style={styles.gameStatItem}>
                    <Text style={styles.gameStatLabel}>Score</Text>
                    <Text style={styles.gameStatValue}>
                      {game.playerScore} - {game.opponentScore}
                    </Text>
                  </View>
                  <View style={styles.gameStatItem}>
                    <Text style={styles.gameStatLabel}>Rounds</Text>
                    <Text style={styles.gameStatValue}>{game.rounds}</Text>
                  </View>
                </View>
              </View>
            ))}
            
            {mockGameHistory.length === 0 && (
              <View style={styles.emptyState}>
                <Calendar size={48} color="#CBD5E1" />
                <Text style={styles.emptyTitle}>No Games Yet</Text>
                <Text style={styles.emptyDescription}>
                  Start playing to see your game history here!
                </Text>
              </View>
            )}
          </View>
        )}
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
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 24,
    backgroundColor: '#E2E8F0',
    borderRadius: 12,
    padding: 4,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  tabButtonActive: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748B',
  },
  tabTextActive: {
    color: '#2563EB',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: 20,
    marginBottom: 32,
    gap: 16,
  },
  statCard: {
    width: '47%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1E293B',
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '500',
  },
  section: {
    marginHorizontal: 20,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 16,
  },
  performanceCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  performanceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  performanceLabel: {
    fontSize: 16,
    color: '#64748B',
    fontWeight: '500',
  },
  performanceValue: {
    fontSize: 16,
    color: '#1E293B',
    fontWeight: '600',
  },
  strategyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  strategyLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 12,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E2E8F0',
    borderRadius: 4,
    marginBottom: 12,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#2563EB',
    borderRadius: 4,
  },
  strategyDescription: {
    fontSize: 14,
    color: '#64748B',
    lineHeight: 20,
  },
  gameCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  gameHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  gameInfo: {
    flex: 1,
  },
  gameMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  gameMode: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginLeft: 8,
  },
  gameDate: {
    fontSize: 14,
    color: '#64748B',
  },
  resultBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  resultText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  gameStats: {
    flexDirection: 'row',
    gap: 32,
  },
  gameStatItem: {
    alignItems: 'center',
  },
  gameStatLabel: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 4,
  },
  gameStatValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
  },
  emptyState: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 40,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
  },
});