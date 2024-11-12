import React from 'react';
import {
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
  Image,
  TouchableOpacity,
  View,
} from 'react-native';
import {BLUE, GRAY, WHITE} from '../config/colors';
import {BoldText} from './StyledTexts';

export type CustomButtonProps = {
  onPress: () => void;
  title: string;
  style?: StyleProp<ViewStyle>;
  testID?: string;
  enabled?: boolean;
  numberOfLines?: number;
  adjustsFontSizeToFit?: boolean;
  textStyle?: StyleProp<TextStyle>;
};

const CustomButton = (props: CustomButtonProps): JSX.Element => {
  const enabled = props.enabled ?? true;
  const disabledStyle = !enabled ? styles.disabledStyle : null;

  if (!enabled) {
    return (
      <View
        style={[styles.buttonStyle, disabledStyle, props.style]}
        testID={props.testID}>
        <BoldText
          style={[styles.textStyle, styles.disabledTextStyle, props.textStyle]}>
          {props.title}
        </BoldText>
      </View>
    );
  }
  return (
    <TouchableOpacity
      testID={props.testID}
      style={[styles.buttonStyle, disabledStyle, props.style]}
      onPress={props.onPress}>
      {/*  <Image
        style={styles.backgroundImageStyle}
        source={require('../../assets/copper-button-flame.png')}
  /> */}
      <BoldText
        numberOfLines={props.numberOfLines}
        adjustsFontSizeToFit={props.adjustsFontSizeToFit}
        style={[styles.textStyle, props.textStyle]}>
        {props.title}
      </BoldText>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: WHITE,
    borderRadius: 0,
    height: 40,
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    width: '100%',
  },
  backgroundImageStyle: {
    position: 'absolute',
    top: 0,
    height: 60,
    width: 240,
    resizeMode: 'contain',
  },
  textStyle: {
    color: BLUE,
    textTransform: 'uppercase',
    fontSize: 16,
  },
  disabledTextStyle: {
    color: GRAY,
    textTransform: 'uppercase',
    fontSize: 16,
  },
  disabledStyle: {
    backgroundColor: WHITE,
  },
});
