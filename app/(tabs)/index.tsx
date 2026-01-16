import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Alert,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  Handshake, 
  Sword, 
  Play, 
  RotateCcw,
  Trophy,
  Target
} from 'lucide-react-native';

type Choice = 'cooperate' | 'defect' | null;
type GameMode = 'local' | 'ai';

interface GameResult {
  player1Choice: Choice;
  player2Choice: Choice;
  player1Score: number;
  player2Score: number;
  round: number;
}

interface GameStats {
  totalGames: number;
  player1Wins: number;
  player2Wins: number;
  ties: number;
  totalRounds: number;
}

export default function GameScreen() {
  const [gameMode, setGameMode] = useState<GameMode>('local');
  const [currentPlayer, setCurrentPlayer] = useState<1 | 2>(1);
  const [player1Choice, setPlayer1Choice] = useState<Choice>(null);
  const [player2Choice, setPlayer2Choice] = useState<Choice>(null);
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
  const [round, setRound] = useState(1);
  const [gameHistory, setGameHistory] = useState<GameResult[]>([]);
  const [gameStats, setGameStats] = useState<GameStats>({
    totalGames: 0,
    player1Wins: 0,
    player2Wins: 0,
    ties: 0,
    totalRounds: 0,
  });
  const [showResults, setShowResults] = useState(false);
  const [animatedValue] = useState(new Animated.Value(0));

  const payoffMatrix = {
    cooperate: {
      cooperate: { player1: 3, player2: 3 },
      defect: { player1: 0, player2: 5 },
    },
    defect: {
      cooperate: { player1: 5, player2: 0 },
      defect: { player1: 1, player2: 1 },
    },
  };

  const makeAIChoice = (): Choice => {
    // Simple AI strategy: mostly cooperate with some defection
    return Math.random() < 0.7 ? 'cooperate' : 'defect';
  };

  const handleChoice = (choice: Choice) => {
    if (gameMode === 'local') {
      if (currentPlayer === 1) {
        setPlayer1Choice(choice);
        setCurrentPlayer(2);
      } else {
        setPlayer2Choice(choice);
        processRound(player1Choice, choice);
      }
    } else {
      const aiChoice = makeAIChoice();
      setPlayer1Choice(choice);
      setPlayer2Choice(aiChoice);
      processRound(choice, aiChoice);
    }
  };

  const processRound = (p1Choice: Choice, p2Choice: Choice) => {
    if (!p1Choice || !p2Choice) return;

    const result = payoffMatrix[p1Choice][p2Choice];
    const newP1Score = player1Score + result.player1;
    const newP2Score = player2Score + result.player2;

    setPlayer1Score(newP1Score);
    setPlayer2Score(newP2Score);

    const gameResult: GameResult = {
      player1Choice: p1Choice,
      player2Choice: p2Choice,
      player1Score: result.player1,
      player2Score: result.player2,
      round,
    };

    setGameHistory(prev => [...prev, gameResult]);
    setShowResults(true);

    // Animate results
    Animated.spring(animatedValue, {
      toValue: 1,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      nextRound();
    }, 3000);
  };

  const nextRound = () => {
    setPlayer1Choice(null);
    setPlayer2Choice(null);
    setCurrentPlayer(1);
    setRound(prev => prev + 1);
    setShowResults(false);
    
    Animated.spring(animatedValue, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
  };

  const resetGame = () => {
    // Update stats
    const newStats = { ...gameStats };
    newStats.totalGames += 1;
    newStats.totalRounds += round - 1;
    
    if (player1Score > player2Score) {
      newStats.player1Wins += 1;
    } else if (player2Score > player1Score) {
      newStats.player2Wins += 1;
    } else {
      newStats.ties += 1;
    }
    
    setGameStats(newStats);

    // Reset game state
    setPlayer1Choice(null);
    setPlayer2Choice(null);
    setPlayer1Score(0);
    setPlayer2Score(0);
    setRound(1);
    setCurrentPlayer(1);
    setGameHistory([]);
    setShowResults(false);
    
    Animated.spring(animatedValue, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
  };

  const getCurrentPlayerName = () => {
    if (gameMode === 'ai') return 'Your';
    return currentPlayer === 1 ? 'Player 1' : 'Player 2';
  };

  const getChoiceColor = (choice: Choice) => {
    return choice === 'cooperate' ? '#10B981' : '#EF4444';
  };

  const getChoiceIcon = (choice: Choice) => {
    return choice === 'cooperate' ? Handshake : Sword;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Prisoner's Dilemma</Text>
          <Text style={styles.subtitle}>Round {round}</Text>
        </View>

        {/* Game Mode Toggle */}
        <View style={styles.gameModeContainer}>
          <TouchableOpacity
            style={[
              styles.gameModeButton,
              gameMode === 'local' && styles.gameModeButtonActive,
            ]}
            onPress={() => setGameMode('local')}>
            <Text
              style={[
                styles.gameModeText,
                gameMode === 'local' && styles.gameModeTextActive,
              ]}>
              Local Multiplayer
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.gameModeButton,
              gameMode === 'ai' && styles.gameModeButtonActive,
            ]}
            onPress={() => setGameMode('ai')}>
            <Text
              style={[
                styles.gameModeText,
                gameMode === 'ai' && styles.gameModeTextActive,
              ]}>
              vs AI
            </Text>
          </TouchableOpacity>
        </View>

        {/* Scoreboard */}
        <View style={styles.scoreboard}>
          <View style={styles.scoreCard}>
            <Trophy size={24} color="#F59E0B" />
            <Text style={styles.scoreLabel}>
              {gameMode === 'ai' ? 'You' : 'Player 1'}
            </Text>
            <Text style={styles.scoreValue}>{player1Score}</Text>
          </View>
          <View style={styles.scoreCard}>
            <Target size={24} color="#8B5CF6" />
            <Text style={styles.scoreLabel}>
              {gameMode === 'ai' ? 'AI' : 'Player 2'}
            </Text>
            <Text style={styles.scoreValue}>{player2Score}</Text>
          </View>
        </View>

        {/* Current Turn Indicator */}
        {!showResults && (
          <View style={styles.turnIndicator}>
            <Text style={styles.turnText}>
              {getCurrentPlayerName()} Turn
            </Text>
          </View>
        )}

        {/* Choice Buttons */}
        {!showResults && (
          <View style={styles.choicesContainer}>
            <TouchableOpacity
              style={[styles.choiceButton, styles.cooperateButton]}
              onPress={() => handleChoice('cooperate')}>
              <Handshake size={32} color="#FFFFFF" />
              <Text style={styles.choiceButtonText}>Cooperate</Text>
              <Text style={styles.choiceDescription}>Stay silent</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.choiceButton, styles.defectButton]}
              onPress={() => handleChoice('defect')}>
              <Sword size={32} color="#FFFFFF" />
              <Text style={styles.choiceButtonText}>Defect</Text>
              <Text style={styles.choiceDescription}>Betray partner</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Results Display */}
        {showResults && (
          <Animated.View
            style={[
              styles.resultsContainer,
              {
                opacity: animatedValue,
                transform: [
                  {
                    scale: animatedValue.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.8, 1],
                    }),
                  },
                ],
              },
            ]}>
            <Text style={styles.resultsTitle}>Round {round} Results</Text>
            
            <View style={styles.choicesReveal}>
              <View style={styles.choiceReveal}>
                <Text style={styles.playerLabel}>
                  {gameMode === 'ai' ? 'You' : 'Player 1'}
                </Text>
                <View
                  style={[
                    styles.choiceRevealCard,
                    { backgroundColor: getChoiceColor(player1Choice) },
                  ]}>
                  {React.createElement(getChoiceIcon(player1Choice), {
                    size: 24,
                    color: '#FFFFFF',
                  })}
                  <Text style={styles.choiceRevealText}>
                    {player1Choice === 'cooperate' ? 'Cooperated' : 'Defected'}
                  </Text>
                </View>
              </View>

              <View style={styles.choiceReveal}>
                <Text style={styles.playerLabel}>
                  {gameMode === 'ai' ? 'AI' : 'Player 2'}
                </Text>
                <View
                  style={[
                    styles.choiceRevealCard,
                    { backgroundColor: getChoiceColor(player2Choice) },
                  ]}>
                  {React.createElement(getChoiceIcon(player2Choice), {
                    size: 24,
                    color: '#FFFFFF',
                  })}
                  <Text style={styles.choiceRevealText}>
                    {player2Choice === 'cooperate' ? 'Cooperated' : 'Defected'}
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.roundScores}>
              <Text style={styles.roundScoreText}>
                Points this round: {player1Score - (gameHistory.length > 1 ? gameHistory.slice(0, -1).reduce((sum, result) => sum + result.player1Score, 0) : 0)} - {player2Score - (gameHistory.length > 1 ? gameHistory.slice(0, -1).reduce((sum, result) => sum + result.player2Score, 0) : 0)}
              </Text>
            </View>
          </Animated.View>
        )}

        {/* Game Controls */}
        <View style={styles.gameControls}>
          <TouchableOpacity style={styles.controlButton} onPress={resetGame}>
            <RotateCcw size={20} color="#6B7280" />
            <Text style={styles.controlButtonText}>New Game</Text>
          </TouchableOpacity>
        </View>

        {/* Payoff Matrix */}
        <View style={styles.matrixContainer}>
          <Text style={styles.matrixTitle}>Payoff Matrix</Text>
          <View style={styles.matrix}>
            <View style={styles.matrixRow}>
              <View style={styles.matrixCorner} />
              <Text style={styles.matrixHeader}>Cooperate</Text>
              <Text style={styles.matrixHeader}>Defect</Text>
            </View>
            <View style={styles.matrixRow}>
              <Text style={styles.matrixHeader}>Cooperate</Text>
              <View style={styles.matrixCell}>
                <Text style={styles.matrixValue}>3, 3</Text>
              </View>
              <View style={styles.matrixCell}>
                <Text style={styles.matrixValue}>0, 5</Text>
              </View>
            </View>
            <View style={styles.matrixRow}>
              <Text style={styles.matrixHeader}>Defect</Text>
              <View style={styles.matrixCell}>
                <Text style={styles.matrixValue}>5, 0</Text>
              </View>
              <View style={styles.matrixCell}>
                <Text style={styles.matrixValue}>1, 1</Text>
              </View>
            </View>
          </View>
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
  gameModeContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 24,
    backgroundColor: '#E2E8F0',
    borderRadius: 12,
    padding: 4,
  },
  gameModeButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  gameModeButtonActive: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  gameModeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748B',
  },
  gameModeTextActive: {
    color: '#2563EB',
  },
  scoreboard: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 24,
    gap: 16,
  },
  scoreCard: {
    flex: 1,
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
  scoreLabel: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '500',
    marginTop: 8,
    marginBottom: 4,
  },
  scoreValue: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1E293B',
  },
  turnIndicator: {
    alignItems: 'center',
    marginBottom: 24,
    paddingHorizontal: 20,
  },
  turnText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2563EB',
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  choicesContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 32,
    gap: 16,
  },
  choiceButton: {
    flex: 1,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  cooperateButton: {
    backgroundColor: '#10B981',
  },
  defectButton: {
    backgroundColor: '#EF4444',
  },
  choiceButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginTop: 12,
    marginBottom: 4,
  },
  choiceDescription: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.9,
    textAlign: 'center',
  },
  resultsContainer: {
    marginHorizontal: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 8,
  },
  resultsTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1E293B',
    textAlign: 'center',
    marginBottom: 20,
  },
  choicesReveal: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 20,
  },
  choiceReveal: {
    flex: 1,
    alignItems: 'center',
  },
  playerLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748B',
    marginBottom: 8,
  },
  choiceRevealCard: {
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    minHeight: 80,
    justifyContent: 'center',
    width: '100%',
  },
  choiceRevealText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginTop: 8,
  },
  roundScores: {
    alignItems: 'center',
  },
  roundScoreText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2563EB',
  },
  gameControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: 20,
    marginBottom: 32,
  },
  controlButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  controlButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280',
    marginLeft: 8,
  },
  matrixContainer: {
    marginHorizontal: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  matrixTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E293B',
    textAlign: 'center',
    marginBottom: 16,
  },
  matrix: {
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
  },
  matrixRow: {
    flexDirection: 'row',
  },
  matrixCorner: {
    flex: 1,
    backgroundColor: '#F1F5F9',
  },
  matrixHeader: {
    flex: 1,
    backgroundColor: '#F1F5F9',
    padding: 12,
    fontSize: 14,
    fontWeight: '600',
    color: '#475569',
    textAlign: 'center',
    borderWidth: 0.5,
    borderColor: '#E2E8F0',
  },
  matrixCell: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderWidth: 0.5,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  matrixValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E293B',
  },
});