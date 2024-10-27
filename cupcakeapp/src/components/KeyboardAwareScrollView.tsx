import React from 'react';
import {
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  ScrollViewProps,
} from 'react-native';

export interface KeyboardAwareScrollViewProps extends ScrollViewProps {
  behavior?: 'height' | 'position' | 'padding' | undefined;
  keyboardVerticalOffset?: number | undefined;
  enabled?: boolean | undefined;
}

const KeyboardAwareScrollView = (
  props: React.PropsWithChildren<KeyboardAwareScrollViewProps>,
): JSX.Element => {
  const scrollProps = {...props, style: styles.fill};

  return (
    <KeyboardAvoidingView
      behavior={props.behavior ?? 'height'}
      keyboardVerticalOffset={props.keyboardVerticalOffset}
      enabled={props.enabled}
      style={props.style}>
      <ScrollView {...scrollProps}>{props.children}</ScrollView>
    </KeyboardAvoidingView>
  );
};

export default KeyboardAwareScrollView;

const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
});
