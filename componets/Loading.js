import React ,{useRef}from 'react';
import { Animated,StyleSheet, Text, View , StatusBar} from 'react-native';

export default function Loading() {
  const fadeAnim = useRef(new Animated.Value(1)).current;
  
  // const fadeIn = () => {
  //   // Will change fadeAnim value to 1 in 5 seconds
  //   Animated.timing(fadeAnim, {
  //     toValue: 1,
  //     duration: 5000,
  //     useNativeDriver: true,
  //   }).start();
  // };

  const fadeOut = () => {
    // Will change fadeAnim value to 0 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  };

  console.log(fadeAnim);
  React.useEffect(() => {
    fadeOut();
  }, []); 

  return (
    // 보통 부모노드인 View에 스타일을 적용하면 
    // 자식노드도 같이 스타일이 적용될거같지만
    // 리엑트 네이티브는 그렇지않다 별개로 작동됨

      <View style={{flex:1,backgroundColor:"#E0E3DA"}}>
        <Animated.View style={{...styles.container,opacity:fadeAnim}}>
          <StatusBar barStyle={"dark-content"}/>
          <Text style={styles.text}>Observer</Text>

        </Animated.View>
      </View>

  )
} 

const styles = StyleSheet.create({
    container : {
      flex : 1,
      justifyContent : "center",
      alignItems: "center",
      backgroundColor : "#A593E0",
      paddingHorizontal : 30, // right,left패딩설정
      paddingVertical : 100 // top, bottom 패딩 설정
    },
    text : {
      color: "#E0E3DA",
      fontFamily: 'Comfortaa_500Medium' ,
      fontSize : 55 // reactnatve는 px로 명할 경우 "" 스트링형으로 입력해야함
    }
});
