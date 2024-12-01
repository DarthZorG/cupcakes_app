import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  StyleProp,
  ViewStyle,
} from 'react-native';
import {BLACK, GRAY} from '../config/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';

export type SearchFieldProps = {
  value: string;
  placeHolder?: string;
  onSearch: () => void;
  onValueChange: (value: string) => void;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

const SearchField = (props: SearchFieldProps): JSX.Element => {
  return (
    <View style={[styles.inputContainer, props.style]}>
      <View style={styles.inputContent}>
        <TextInput
          value={props.value}
          style={styles.searchField}
          placeholder={props.placeHolder}
          onChangeText={text => {
            // setValue(text);
            if (props.onValueChange) {
              props.onValueChange(text);
            }
          }}
          returnKeyType="go"
          testID={props.testID}
          onSubmitEditing={props.onSearch}
          placeholderTextColor={GRAY}
        />
        <TouchableOpacity
          onPress={props.onSearch}
          testID={props.testID != null ? props.testID + '_button' : undefined}>
          <Ionicons
            style={{marginRight: 10, color: BLACK}}
            name="search-outline"
            size={24}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SearchField;

const styles = StyleSheet.create({
  inputContainer: {
    justifyContent: 'center',
  },
  inputContent: {
    marginTop: 10,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderColor: 'black',
    borderRadius: 30,
  },
  searchField: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 4,
    paddingHorizontal: 10,
    width: '100%',
    borderRadius: 10,
    color: BLACK,
  },
});
