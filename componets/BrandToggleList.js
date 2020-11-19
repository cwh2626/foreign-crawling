import React,{ useState} from 'react';
import {SafeAreaView,FlatList,Pressable,Text,Image, StyleSheet,} from 'react-native';
// import PropTypes from "prop-types";
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'



const BrandToggleList = ({checkBrands,setCheckBrands})=>{
  

  const onPress = async (index)=>{
    console.log(checkBrands.findIndex(item=>item.id ===1), "find");
    // 음 useState는 읽기 전용은 상태를 변경할 수 있는거같다 다만 setcheckBrands로 변경이아니기에 리랜더링은 하지 않는다
    checkBrands[index].toggle ?  checkBrands[index].toggle =false : checkBrands[index].toggle = true;
    // 그래서 여기에서 checkBrands상태를 변경한것을 map을 이용하여 상태를 변경을 적용하여 리렌더링을 발생시킨다
    // map을 활용한 이유는 그냥 array의 안에 상태를 변경하면 변경한걸로 인식을 못하기에 map을 활용한다
    setCheckBrands(checkBrands.map((item)=>{
      return {...item};
    }));
    console.log(checkBrands[0]);
  };
  
  const renderItem = ({item,index}) =>{

    return (
      <Pressable
      onPress={() => {
        onPress(index);
        // checkBrands[0].toggle ? setcheckBrands(false) : setcheckBrands(true);
        return;
      }}
      style={{...styles.toggleBrand,opacity : checkBrands[index].toggle ? 1 : 0.5}}
    >
      <Image
        style={styles.toggleBrandIcon}
        source={{
          uri: item.iconUrl,
        }}
        size={40}
      ></Image>
      <Text style={styles.toggleBrandFence}>l</Text>
      <Text style={styles.toggleBrandName}>{item.name}</Text>
    </Pressable>
      );
    }

  return (
      <FlatList
        columnWrapperStyle={{
          flexWrap: "wrap",
          // flex: 1,
          alignItems: "flex-start",
          justifyContent: "center",
        }}
        contentContainerStyle={styles.toggleContainer}
        numColumns={30}    
        data={checkBrands}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      ></FlatList>
  );
}

const styles = StyleSheet.create({
  toggleContainer:{
    backgroundColor: "#E0E3DA",
    paddingVertical : 30,    

  },
  toggleBrand: {
    height :35,
    flexDirection : "row",
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor : "#FFFFF3",
    borderRadius: 20,
    paddingHorizontal: 10,
    margin: 7,
    ...Platform.select({ // 플렛폼에 따라 값 설정
      ios :{
        shadowOpacity : 0.2,

      },android : {
        elevation: 1
      },default :{

      }
    }),
     
  },toggleBrandFence : {
    marginHorizontal: 3,
    fontSize : 20,
    color : "#A593E0"

  },toggleBrandIcon :{
    width:16,
    height: 16, 
    
  },toggleBrandName: {
    fontSize : 16,
    color : "#A593E0",
    borderStartColor: "black"

     
  }
  
});

export default BrandToggleList;