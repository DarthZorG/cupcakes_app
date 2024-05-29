import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  TextStyle,
  ImageStyle,
} from 'react-native';
import {BLACK, GRAY, LIGHT_GRAY, WHITE} from '../config/colors';
import {BoldText, DefaultText} from './StyledTexts';


export interface MenuItemProps {
  title: string;
  description?: string;
  hasRightArrow?: boolean;
  hasBottomBorder?: boolean;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  arrowStyle?: StyleProp<ImageStyle>;
  testID?: string;
  disabled?: boolean;
}
// eslint-disable-next-line no-undef
export const MenuItem = (props: MenuItemProps): JSX.Element => {
  const hasRightArrow = props.hasRightArrow ?? true;
  const hasBottomBorder = props.hasBottomBorder ?? true;

  // eslint-disable-next-line no-undef
  let rightArrow: JSX.Element | null = null;
  if (hasRightArrow) {
    rightArrow = (
      <View>
        <Image
          source={require('../../assets/right-arrow.png')}
          style={[styles.rightArrow, props.arrowStyle]}
        />
      </View>
    );
  }
  const description = props.description ?? '';

  return (
    <TouchableOpacity
      disabled={props.disabled}
      onPress={props.onPress}
      testID={props.testID}
      style={{width: '100%'}}>
      <View style={[styles.mainContainer]}>
        <View
          style={[
            styles.containerStyle,
            hasBottomBorder ? styles.bottomBorder : null,
            props.style,
          ]}>
          <View style={styles.textsContainer}>
            <BoldText style={[styles.titleStyle, props.textStyle]}>
              {props.title}
            </BoldText>
            {description !== '' && (
              <DefaultText style={[styles.descriptionStyle]}>
                {description}
              </DefaultText>
            )}
          </View>
          {rightArrow}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default MenuItem;

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    paddingHorizontal: 10,
  },
  containerStyle: {
    width: '100%',
    flexDirection: 'row',
    // paddingLeft: 20,
    paddingTop: 6,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    minHeight: 42,
    backgroundColor: WHITE,
  },
  bottomBorder: {
    borderBottomColor: BLACK,
    borderBottomWidth: 1,
  },
  rightArrow: {
    marginTop: 8,
    width: 10,
    height: 15,
    resizeMode: 'contain',
    // marginRight: 10,
  },
  titleStyle: {
    color: BLACK,
    fontSize: 15,
    lineHeight: 18,
    textTransform: 'uppercase',
  },
  textsContainer: {
    flex: 1,
    paddingVertical: 10,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  descriptionStyle: {
    paddingTop: 10,
    color: BLACK,
    fontSize: 14,
  },
});
