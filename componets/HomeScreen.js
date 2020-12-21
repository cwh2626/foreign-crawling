import { StatusBar } from 'expo-status-bar';
import React,{ useState} from 'react';
import {Switch,Keyboard, StyleSheet, TouchableWithoutFeedback, View,Text} from 'react-native';
// import PropTypes from "prop-types";

/* KeyboardAwareScrollView : 키보드가 나올떄 가려지는 뷰를 스크롤효과를 넣어 뷰를다 볼 수 있게하는것 */
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import InputSearch from "./InputSearch"
import BrandToggleList from "./BrandToggleList"
import siteList from "../source/data/siteList" // site data
import 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import SwitchSelector from "react-native-switch-selector"; // switch 업그레이드버젼 나중에 따로 컴포넌트를 만들자 지저분하다




const searchOptions = {
  methode :[
    { label: "정확순", value: 0 },
    { label: "가격↗", value: 1 },
    { label: "가격↘", value: 2 }

  ],
  gender :[
    { label: "남", value: 0 },
    { label: "여", value: 1 }

  ]

};

const HomeScreen = ({navigation}) => {
  const [checkSites, setCheckSites] = useState(siteList);
  const [checkOptions,setCheckOptions] = useState({methode :0, gender :0});
 console.log(checkOptions);
  return (
    // 한 자식만 적용가능 그래서 view아에 다 꼴아박음
    // 키보드입력창을 다른 부분 터치시에 내리기위해서 만듬
    // Keyboard.dismiss가 그 역할임
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>

        <View style={styles.searchContainer}> 
          <InputSearch navigation={navigation} checkSites={checkSites} checkOptions={checkOptions}></InputSearch>
        </View>
        <View  style={styles.switchContainer}>
          <SwitchSelector
            height={30}
            style={{width:200,...styles.switch}}
            buttonMargin={1}
            // bold={true}
            border
            // borderColor={"#A593E0"}
            buttonColor={"#A593E0"}
            backgroundColor={"#FFFFF3"}
            options={searchOptions.methode}
            initial={checkOptions.methode}  
            onPress={value => setCheckOptions({ methode: value, gender: checkOptions.gender })}
          />
          <SwitchSelector
            height={30}
            style={{width:100,...styles.switch}}
            buttonMargin={1}
            // bold={true}
            border
            // borderColor={"#A593E0"}
            buttonColor={"#A593E0"}
            backgroundColor={"#FFFFF3"}
            options={searchOptions.gender}
            initial={checkOptions.gender}  
            onPress={value => setCheckOptions({ methode: checkOptions.methode, gender: value })}
          />

      

        </View>
        <View style={styles.toggleListContainer}>
          <BrandToggleList checkSites={checkSites} setCheckSites={setCheckSites}></BrandToggleList>        
        </View> 
        <StatusBar style="auto" />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E0E3DA",
    justifyContent: "center",
  },
  searchContainer: {
    minHeight: 60,
    // flex : 0.7,
    height: 80,
    backgroundColor: "#E0E3DA",
    alignItems: "center",
    justifyContent: "center",
  },switchContainer:{
    
    flex: 1,

    justifyContent:"center",
    alignItems:"center",
    flexDirection:"row",
    flexWrap:'wrap',
    backgroundColor:"#E0E3DA"

    
  },switch:{
    marginHorizontal:10,
    ...Platform.select({ // 플렛폼에 따라 값 설정
      ios :{
        shadowColor: "black",
        shadowOffset: {
          height : 1,      
        },
        shadowRadius: 3,
        shadowOpacity: 0.2,
      },android : {
       },default :{

      }
    }),
    
  },
  toggleListContainer: { flex: 5, backgroundColor: "#E0E3DA" },
});
export default HomeScreen;