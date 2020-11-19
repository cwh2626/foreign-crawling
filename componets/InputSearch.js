import React,{ useState,useEffect} from 'react';
import { View,TextInput,Dimensions,StyleSheet} from 'react-native';
import { Feather } from '@expo/vector-icons';

// import PropTypes from "prop-types";
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
const window = Dimensions.get('window'); // 화면크기 받아오는 함수


const InputSearch = ({navigation,checkBrands} ) =>{
  const [text,setText] = useState('');
  const [dimensions, setDimensions] = useState(window); 
  const onChange = ({window} ) => {
    setDimensions(window);

  };

  useEffect(() => {
    Dimensions.addEventListener("change", onChange);
    return () => {
      Dimensions.removeEventListener("change", onChange);
    };
  },[]);

  return(

    <View style={styles.inputSearch}>
      <Feather
        style={styles.searchIcon}
        name="search"
        size={22}
        color="#A593E0"
      />
      <TextInput
        style={{
          ...styles.inputStyle,
          width: dimensions.width >= 0 ? dimensions.width - 150 : 200,
        }}
        onChangeText={(text) => setText(text)} // 글씨가 바뀔때마다
        value={text}
        placeholder={"search..."}
        clearButtonMode={"always"} // ios에서만 전체 지우기
        onSubmitEditing={() =>
          // 엔터눌렀을때 반응
          navigation.navigate("Profile", { searchText: text ,checkBrands : checkBrands})
        }
        returnKeyType={"search"} // 키보드 엔터키 이름
        selectionColor={"#A593E0"} // 커서 색깔
      />
    </View>

  );
}

const styles = StyleSheet.create({

 inputSearch : {
    flexDirection : "row",
    height : 37,
    borderColor: "#A593E0",
    marginTop: 20,
    borderWidth: 2.5,
    borderRadius: 15,
    paddingHorizontal: 10,
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
  }
  ,searchIcon: {
    paddingHorizontal: 5,
    paddingVertical: 5


  },
  inputStyle: {
    paddingVertical: 5,
    color: "#566270"
  }
  
});

export default InputSearch;