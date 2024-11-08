/**
 * (C) 2024 Mauro Minoro
 *
 * @format
 */

import React, {useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import {Colors, Header} from 'react-native/Libraries/NewAppScreen';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';

import {BLUE, GRAY, LIGHT_BLUE, WHITE} from '../../config/colors';
import MenuItem from '../../components/MenuItem';
import {BoldText} from '../../components/StyledTexts';
import {AdminStackParamList} from '../../navigation/AdminStackNavigator';
import CustomButton from '../../components/CustomButton';
import FormField from '../../components/FormField';
import PageHeader from '../../components/PageHeader';
import ProductService from '../../services/ProductService';
import {Product} from '../../models/Product';
import {useDispatch} from 'react-redux';
import {startLoading, stopLoading} from '../../store/actions/LoaderActions';
import {APIError} from '../../Errors/APIError';
import {showAlert} from '../../store/actions/AlertActions';
import {Asset, launchCamera} from 'react-native-image-picker';
import ImageEditor from '@react-native-community/image-editor';
import UploadService, {makeFileSource} from '../../services/UploadService';

type PropsType = NativeStackScreenProps<AdminStackParamList, 'EditProduct'>;

function EditProductScreen(props: PropsType): JSX.Element {
  const item: Product = props.route.params.item;
  const [name, setName] = useState(item.name);
  const [flavor, setFlavor] = useState(item.flavor);
  const [price, setPrice] = useState(
    item.price.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }),
  );
  const [sugarFree, setSugarFree] = useState(item.sugarFree);
  const [lactoseFree, setLactoseFree] = useState(item.lactoseFree);
  const [glutenFree, setGlutenFree] = useState(item.glutenFree);
  const [picture, setPicture] = useState(item.picture?.uri);
  const dispatch = useDispatch();

  const savePicture = async (): Promise<number | null> => {
    if (picture == null) {
      return null;
    }
    const uploaded = await UploadService.uploadFile(makeFileSource(picture));
    return uploaded.fileId;
  };

  const saveItem = async (): Promise<void> => {
    const newItem: Product = {...item};
    dispatch(startLoading());
    try {
      if (picture !== item.picture?.uri) {
        newItem.imageId = await savePicture();
      }
      newItem.name = name;
      newItem.flavor = flavor;
      newItem.price = parseFloat(price);
      newItem.glutenFree = glutenFree;
      newItem.sugarFree = sugarFree;
      newItem.lactoseFree = lactoseFree;

      if (newItem.id <= 0) {
        //new item

        const savedItem = await ProductService.addProduct(newItem);
      } else {
        await ProductService.updateProduct(newItem.id, newItem);
      }
      dispatch(stopLoading());
      props.navigation.navigate('Products');
    } catch (e: any) {
      dispatch(stopLoading());
      console.log(e);
      if (e instanceof APIError) {
        e.showAlert(dispatch);
      } else {
        dispatch(showAlert('Error', e.message));
      }
    }
  };

  const pickPicture = async (): Promise<void> => {
    const results = await launchCamera({
      mediaType: 'photo',
      cameraType: 'back',
    });
    if (results.didCancel) {
      return;
    }
    if ((results.assets ?? []).length < 0) {
      return;
    }
    const source: Asset = results.assets![0];
    //square the picture
    if (source.width !== source.height) {
      if (source.width! > source.height!) {
        const cropped = await ImageEditor.cropImage(source.uri!, {
          offset: {x: (source.width! - source.height!) / 2, y: 0},
          size: {width: source.height!, height: source.height!},
        });
        source.uri = cropped.uri;
        source.width = source.height;
      } else {
        const cropped = await ImageEditor.cropImage(source.uri!, {
          offset: {x: 0, y: (source.height! - source.width!) / 2},
          size: {width: source.width!, height: source.width!},
        });
        source.uri = cropped.uri;
        source.height = source.width;
      }
    }
    setPicture(source.uri);
  };

  return (
    <SafeAreaView style={styles.container}>
      <PageHeader title="Editar Produto" />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollview}>
        <View style={styles.innerContainer}>
          <FormField
            title="Nome produto"
            value={name}
            onChange={newVal => {
              setName(newVal);
            }}
          />
          <FormField
            title="Sabor"
            value={flavor}
            onChange={newVal => {
              setFlavor(newVal);
            }}
          />
          <FormField
            title="Preço (R$)"
            value={price}
            onChange={newVal => {
              setPrice(newVal);
            }}
            keyboardType={'decimal-pad'}
            inputMode={'decimal'}
          />
          <View style={[styles.switchContainer]}>
            <BoldText>Sem açucar?</BoldText>
            <Switch
              style={styles.switchStyle}
              trackColor={{true: BLUE, false: GRAY}}
              thumbColor={Platform.OS === 'ios' ? WHITE : WHITE}
              value={sugarFree}
              onChange={() => {
                setSugarFree(!sugarFree);
              }}
            />
          </View>
          <View style={[styles.switchContainer]}>
            <BoldText>Sem lactose?</BoldText>
            <Switch
              style={styles.switchStyle}
              trackColor={{true: BLUE, false: GRAY}}
              thumbColor={Platform.OS === 'ios' ? WHITE : WHITE}
              value={lactoseFree}
              onChange={() => {
                setLactoseFree(!lactoseFree);
              }}
            />
          </View>
          <View style={[styles.switchContainer]}>
            <BoldText>Sem gluten?</BoldText>
            <Switch
              style={styles.switchStyle}
              trackColor={{true: BLUE, false: GRAY}}
              thumbColor={Platform.OS === 'ios' ? WHITE : WHITE}
              value={glutenFree}
              onChange={() => {
                setGlutenFree(!glutenFree);
              }}
            />
          </View>
          <View style={[styles.photoContainer]}>
            <BoldText>Foto</BoldText>
            <View style={styles.imageContainer}>
              <TouchableOpacity onPress={pickPicture}>
                <Image
                  source={
                    picture != null
                      ? {uri: picture}
                      : require('../../../assets/images/add-picture-placeholder.jpg')
                  }
                  style={styles.image}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
      <View>
        <CustomButton title="Salvar" onPress={saveItem} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: WHITE,
    flex: 1,
    paddingHorizontal: 10,
  },
  scrollview: {
    backgroundColor: WHITE,
    flex: 1,
  },
  innerContainer: {
    backgroundColor: WHITE,
  },
  pageHeader: {
    height: 60,
    backgroundColor: LIGHT_BLUE,
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  switchContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  photoContainer: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  switchStyle: {},
  imageContainer: {
    aspectRatio: 1,
    width: '100%',
  },

  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});

export default EditProductScreen;
