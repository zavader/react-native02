/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  PermissionsAndroid,
  BackHandler,
  FlatList
} from 'react-native';

import productDW from './src/assets/images/background/product-showcase.png';
import ARIcon from './src/assets/images/transparent/augmented-reality-icon.png';
import { RNCamera } from 'react-native-camera';
import Gestures from 'react-native-easy-gestures';
import data from './src/model/data'

const App = () => {

  const [isAr, setIsAr] = useState(false)
  const [imageGesture, setImageGesture] = useState(data.listOfShowCase[0])

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "Cool Photo App Camera Permission",
          message:
            "Cool Photo App needs access to your camera " +
            "so you can take awesome pictures.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      console.log({granted})
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        setIsAr(true)
      } else {
        console.log("Camera permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    const backAction = () => {
      setIsAr(false)
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  if(isAr) {
    return (
      <View style={styles.containerAR}>
        <RNCamera
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}
        />
        <View style={styles.gestureView}>
        <Gestures>
          <Image
            source={imageGesture}
            style={styles.gestureImage}
          />
        </Gestures>
        </View>
        <View style={styles.bottomView}>
          <FlatList 
            horizontal
            data={data.listOfShowCase}
            renderItem={({item})=>(
              <TouchableOpacity style={styles.buttonOption} onPress={()=> setImageGesture(item)}>
                <Image source={item} style={styles.imagePreview} />
              </TouchableOpacity>
            )}
            keyExtractor={(_,index)=> index}
          />
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <ScrollView>
      <Image source={productDW} style={styles.image} />
      <View style={styles.body}>
        <Text style={styles.title}>{data.title}</Text>
        <Text style={styles.subTitle}>{data.subTitile}</Text>
        <Text style={styles.price}>{data.price}</Text>
        <Text style={styles.color}>Warna :</Text>
        <View style={styles.row}>
          {data.color.map((item, index)=> <View key={index} style={[styles.round, {backgroundColor: item}]} />)}
        </View>
        <Text style={styles.descriptionTitle}>Detail</Text>
        <Text style={styles.description}>{data.description}</Text>
      </View>
      </ScrollView>
      <TouchableOpacity style={styles.button} onPress={()=>requestCameraPermission()}>
        <Image source={ARIcon} style={styles.ARIcon} />
      </TouchableOpacity>
    </View>
  )
};

const styles = StyleSheet.create({
  image: {
    width: '100%', 
    height: 400,
  },
  body: {
    padding: 10,
    borderTopRightRadius: 40,
    marginTop: -40,
    paddingTop: 30,
    paddingBottom: 60,
    backgroundColor:'#1B2430'
  },  
  title: {
    fontFamily: "serif",
    fontSize: 32,
    fontWeight:'bold',
    color: 'white',
  },
  subTitle: {
    fontFamily: "serif",
    fontSize: 18,
    marginBottom: 10
  },
  price: {
    fontFamily: "serif",
    fontSize: 18,
    marginBottom: 10
  },
  color: {
    fontFamily: "serif",
    fontSize: 16,
    marginBottom: 5
  },
  row: {
    flexDirection:'row',
    marginBottom: 20
  },
  round: {
    height: 18,
    width: 18,
    borderRadius: 9,
    marginRight: 5
  },
  descriptionTitle: {
    fontFamily: "serif",
    fontSize: 24,
    fontWeight:'bold'
  },
  description: {
    fontFamily: "serif",
    fontSize: 14
  },
  button: {
    bottom: 10,
    right: 10,
    height: 60,
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    borderRadius: 30,
    position:'absolute',
  },
  ARIcon: {
    width: 36,
    height: 36
  },
  containerAR: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  imagePreview: {
    width: 45,
    height: 70,
  },
  bottomView: {
    position:'absolute',
    bottom: 50,
    borderRadius: 20,
    backgroundColor:'rgba(255, 255, 255, 0.5)',
    paddingVertical: 15,
    alignSelf:'center',
    width:'100%',
  },
  buttonOption: {
    margin: 10,
  },
  gestureView: {
    position:'absolute', 
    top: 0,
    left: 0,
    right: 0,
    bottom: 150,
    justifyContent: "center",
    alignItems: "center"
  },
  gestureImage: {
    width: 150,
    height: 200,
  }
});

export default App;
