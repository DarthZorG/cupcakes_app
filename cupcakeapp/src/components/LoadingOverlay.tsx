// @ts-ignore
import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {BLACK, WHITE} from '../config/colors';
import {BoldText} from './StyledTexts';

export function LoadingOverlay({loading}: {loading: boolean}) {
  if (!loading) {
    return <View />;
  }

  return (
    <View style={styles.overlay}>
      <View style={styles.container}>
        <ActivityIndicator color={BLACK} size={'large'} />
        <BoldText style={styles.text}>Carregando...</BoldText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    // @ts-ignore
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    with: '100%',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  text: {
    marginLeft: 16,
    fontSize: 14,
    color: BLACK,
  },
});
