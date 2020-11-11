import { StatusBar } from 'expo-status-bar';
import React,{ useRef,useState,useEffect} from 'react';
import {Animated,SafeAreaView,FlatList,Pressable,Text,Keyboard,Image,Platform, StyleSheet, TouchableWithoutFeedback, View,TextInput,Dimensions, TouchableOpacity} from 'react-native';
// import PropTypes from "prop-types";
import 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';

const window = Dimensions.get('window'); // 화면크기 받아오는 함수
const brandList = [
  {
    id:1,
    name : "END.",
    iconUrl :"https://www.endclothing.com/static/images/favicon.ico" ,
    toggle : false
  },
  {
    id:2,
    name : "Farfetch",
    iconUrl :"https://cdn-static.farfetch-contents.com/static/images/favicon/Farfetch/favicon_b.ico",
    toggle : false 
  },
  {
    id:3,
    name : "Farfetch",
    iconUrl :"https://cdn-static.farfetch-contents.com/static/images/favicon/Farfetch/favicon_b.ico",
    toggle : false 
  },
  {
    id:4,
    name : "Farfetch",
    iconUrl :"https://cdn-static.farfetch-contents.com/static/images/favicon/Farfetch/favicon_b.ico",
    toggle : false 
  },
  {
    id:5,
    name : "Farfetch",
    iconUrl :"https://cdn-static.farfetch-contents.com/static/images/favicon/Farfetch/favicon_b.ico",
    toggle : false 
  },
  {
    id:6,
    name : "Farfetch",
    iconUrl :"https://cdn-static.farfetch-contents.com/static/images/favicon/Farfetch/favicon_b.ico",
    toggle : false 
  },
  {
    id:7,
    name : "Farfetch",
    iconUrl :"https://cdn-static.farfetch-contents.com/static/images/favicon/Farfetch/favicon_b.ico",
    toggle : false 
  }
]

const HomeScreen = ({ navigation }) => {
  // alert("hey");
  const [text,setText] = useState('');
  const [dimensions, setDimensions] = useState(window); 
  const [check, setCheck] = useState(brandList);
  const brandButtonRef = useRef();
  
  const onChange = ({window} ) => {
    setDimensions(window);

  };
  const onPress = async (index)=>{
    console.log(check.findIndex(item=>item.id ===1), "find");
    // 음 useState는 읽기 전용은 상태를 변경할 수 있는거같다 다만 setCheck로 변경이아니기에 리랜더링은 하지 않는다
    check[index].toggle ?  check[index].toggle =false : check[index].toggle = true;
    // 그래서 여기에서 check상태를 변경한것을 map을 이용하여 상태를 변경을 적용하여 리렌더링을 발생시킨다
    // map을 활용한 이유는 그냥 array의 안에 상태를 변경하면 변경한걸로 인식을 못하기에 map을 활용한다
    setCheck(check.map((item)=>{
      return {...item};
    }));
    console.log(check[0]);
  };

  const renderItem = ({item,index}) =>{
    // let index = check.findIndex(val => val.id === item.id);
    // console.log(item)
    return (
      <Pressable
      onPress={() => {
        onPress(index);
        // check[0].toggle ? setCheck(false) : setCheck(true);
        return;
      }}
      style={{...styles.toggleBrand,opacity : check[index].toggle ? 1 : 0.5}}
    >
      <Image
        style={styles.toggleBrandIcon}
        source={{
          uri: item.iconUrl,
        }}
        size={20}
      ></Image>
      <Text style={styles.toggleBrandFence}>l</Text>
      <Text ref={brandButtonRef} style={styles.toggleBrandName}>{item.name}</Text>
    </Pressable>
      );
    }

  useEffect(() => {
    Dimensions.addEventListener("change", onChange);

    return () => {
      Dimensions.removeEventListener("change", onChange);


    };
  },[]);
  // const ccc = async ()=>{
  //   let test =  await ScreenOrientation.getOrientationAsync()
  //   console.log(test);
  // }
  // ccc();dd
  return (
    
    // 한 자식만 적용가능 그래서 view아에 다 꼴아박음
    // 키보드입력창을 다른 부분 터치시에 내리기위해서 만듬 
    // Keyboard.dismiss가 그 역할임
    <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
      <View style={styles.container} >
        <View style={styles.searchContainer}>
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
              onSubmitEditing={() => // 엔터눌렀을때 반응
                navigation.navigate("Profile", { searchText: text })
              }
              returnKeyType={"search"} // 키보드 엔터키 이름
              selectionColor={"#A593E0"} // 커서 색깔
            />
          </View>
        </View>
          
        {/* <View style={styles.toggleContainer}> */}
        <SafeAreaView style={{flex: 5, backgroundColor: "#E0E3DA"}}>
          <FlatList
            columnWrapperStyle={{ flexWrap: "wrap",flex:1,alignItems: "flex-start",
            justifyContent: "center",
        }}
          contentContainerStyle={styles.toggleContainer}
            numColumns={10}    
            data={check}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          ></FlatList>
        </SafeAreaView>
          {/* <Pressable
            onPress={() => {
              onPress(0);
              // check[0].toggle ? setCheck(false) : setCheck(true);
              return;
            }}
            style={{...styles.toggleBrand,opacity : check[0].toggle ? 1 : 0.5}}
          >
            <Image
              style={styles.toggleBrandIcon}
              source={{
                uri: "https://www.endclothing.com/static/images/favicon.ico",
              }}
              size={20}
            ></Image>
            <Text style={styles.toggleBrandFence}>l</Text>
            <Text ref={brandButtonRef} style={styles.toggleBrandName}>END.</Text>
          </Pressable>
          <TouchableOpacity
            style={styles.toggleBrand}
            onPress={() => alert("hello")}
          >
            <Image
              style={styles.toggleBrandIcon}
              source={{
                uri: "https://cdn-static.farfetch-contents.com/static/images/favicon/Farfetch/favicon_b.ico",
              }}
              size={20}
            ></Image>
            <Text style={styles.toggleBrandFence}>l</Text>
            <Text style={styles.toggleBrandName}>Farfetch</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.toggleBrand}
            onPress={() => alert("hello")}
          >
            <Image
              style={styles.toggleBrandIcon}
              source={{
                uri: "https://www.yoox.com/favicon.ico",
              }}
              size={20}
            ></Image>
            <Text style={styles.toggleBrandFence}>l</Text>
            <Text style={styles.toggleBrandName}>YOOX</Text>
          </TouchableOpacity>
         
        </View> */}

        <StatusBar style="auto" />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFF3",
    
    justifyContent: "center",
  },
  searchContainer :{
    minHeight :60,
    // flex : 1,
    backgroundColor: "#E0E3DA",
    alignItems: "center",
    justifyContent: "center",
  },
  toggleContainer:{
    flex : 1,
    // flexWrap :"wrap",
    // flexDirection: "row",
    backgroundColor: "#E0E3DA",
    alignItems: "flex-start",
    justifyContent: "center",
    paddingVertical : 30,
    

  },inputSearch : {
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
    shadowOpacity : 0.2,
    
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
export default HomeScreen;