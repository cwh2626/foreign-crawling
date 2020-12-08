import { StatusBar } from 'expo-status-bar';
import React,{ useState} from 'react';
import {Keyboard, StyleSheet, TouchableWithoutFeedback, View,} from 'react-native';
// import PropTypes from "prop-types";

/* KeyboardAwareScrollView : 키보드가 나올떄 가려지는 뷰를 스크롤효과를 넣어 뷰를다 볼 수 있게하는것 */
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import InputSearch from "./InputSearch"
import BrandToggleList from "./BrandToggleList"
import siteList from "../source/data/siteList" // site data
import 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen = ({navigation}) => {
  const [checkSites, setCheckSites] = useState(siteList);

  return (
    // 한 자식만 적용가능 그래서 view아에 다 꼴아박음
    // 키보드입력창을 다른 부분 터치시에 내리기위해서 만듬
    // Keyboard.dismiss가 그 역할임
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View style={styles.searchContainer}> 
          <InputSearch navigation={navigation} checkSites={checkSites}></InputSearch>
          
        </View>
        <SafeAreaView style={styles.toggleListContainer}>
          <BrandToggleList checkSites={checkSites} setCheckSites={setCheckSites}></BrandToggleList>        
        </SafeAreaView> 
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
  },
  toggleListContainer: { flex: 5, backgroundColor: "#E0E3DA" },
});
export default HomeScreen;