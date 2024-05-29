import React from 'react';
import {StyleSheet, StyleProp, ViewStyle, View} from 'react-native';
import {WHITE} from '../config/colors';
import {BoldText} from './StyledTexts';

export type PageHeaderProps = {
  style?: StyleProp<ViewStyle>;
  title: string;
};

const PageHeader = (props: PageHeaderProps): JSX.Element => {
  return (
    <View style={styles.pageHeader}>
      <BoldText style={styles.headerText}>{props.title}</BoldText>
    </View>
  );
};

export default PageHeader;

const styles = StyleSheet.create({
  pageHeader: {
    backgroundColor: WHITE,
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 20,
  },
});
