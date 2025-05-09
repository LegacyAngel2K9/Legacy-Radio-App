import React, { useEffect, useRef } from 'react';
import { View, TouchableOpacity, StyleSheet, Animated, Easing } from 'react-native';
import { Mic } from 'lucide-react-native';
import { colors } from '@/constants/Colors';

interface PTTButtonProps {
  onPressIn: () => void;
  onPressOut: () => void;
  isSpeaking: boolean;
  size?: 'normal' | 'large';
}

export default function PTTButton({ 
  onPressIn, 
  onPressOut, 
  isSpeaking,
  size = 'normal'
}: PTTButtonProps) {
  const pulseAnim = useRef(new Animated.Value(1)).current;
  
  useEffect(() => {
    if (isSpeaking) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.2,
            duration: 800,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 800,
            easing: Easing.in(Easing.ease),
            useNativeDriver: true,
          })
        ])
      ).start();
    } else {
      Animated.timing(pulseAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [isSpeaking]);
  
  const buttonSize = size === 'large' ? styles.largeButton : styles.button;
  const iconSize = size === 'large' ? 36 : 24;
  
  return (
    <View style={styles.container}>
      {isSpeaking && (
        <Animated.View 
          style={[
            size === 'large' ? styles.largePulse : styles.pulse,
            {
              transform: [{ scale: pulseAnim }],
              opacity: pulseAnim.interpolate({
                inputRange: [1, 1.2],
                outputRange: [0.6, 0]
              })
            }
          ]} 
        />
      )}
      
      <TouchableOpacity
        style={[
          buttonSize,
          isSpeaking ? styles.activePTT : styles.inactivePTT
        ]}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        activeOpacity={0.8}
      >
        <Mic size={iconSize} color={colors.white} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  largeButton: {
    width: 88,
    height: 88,
    borderRadius: 44,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  inactivePTT: {
    backgroundColor: colors.primary,
  },
  activePTT: {
    backgroundColor: colors.error,
  },
  pulse: {
    position: 'absolute',
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.error,
  },
  largePulse: {
    position: 'absolute',
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: colors.error,
  },
});