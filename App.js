import React from 'react';
import { TextInput,StyleSheet} from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './componets/HomeScreen.js';
import SearchScreen from './componets/SearchScreen.js';
import { useFonts, Kodchasan_700Bold} from '@expo-google-fonts/dev';
import {AppLoading} from 'expo';
const Stack = createStackNavigator();

const App = () => {
  let [fontsLoaded] = useFonts({
    Kodchasan_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />; 
  } 
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: "Observer",
            headerStyle: style.header,
            headerTintColor: "#E0E3DA",
            headerTitleStyle: {
              fontWeight: "bold",
              fontSize: 25 ,
              fontFamily: 'Kodchasan_700Bold' 

            },
            
          }}
        />
        <Stack.Screen
          options={{
            headerTitle: () => <TextInput value="hello"></TextInput>,
            headerStyle:style.header,
            headerTintColor: "#E0E3DA",
            headerTitleStyle: {
              fontWeight: "bold",

            },
          }}
          name="SearchScreen"
          component={SearchScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const style = StyleSheet.create({
  header : {

    backgroundColor: "#A593E0",
    ...Platform.select({ // 플렛폼에 따라 값 설정
      ios :{
        shadowColor: "black",

        shadowOffset: {
          height : 2,      
        },
        shadowRadius: 7,
        shadowOpacity: 0.5,
      },android : {
        elevation: 10
      },default :{

      }
    }),
    
  }
})
// export default class App extends React.Component{
  
//   constructor(props){
//     super(props);
//     this.state = {
//       searchText: "hello"
//     }
//   }

//   async getData(){
    
//     const {data} = await axios.get(`https://www.endclothing.com/kr/catalogsearch/results?q=${this.state.searchText}`);
//     const $ = cheerio.load (data);
//     let test = $("[data-test=ProductCard__ProductFinalPrice]").text();
//     console.log(test);
//     console.log("hi");

//   }  
//   // DOM을 선택할 수 있는 영역 왜에
//   // rander후에 발동되기에
//   componentDidMount(){
//     this.getData();
//     console.log("heel")
//   }

//   onChangeText(text){
//    return this.setState({searchText : text});
//   }
  
//   render(){

//     console.log("hhhh");

//     return (
//       <View style={styles.container}>
//       <TextInput
//       style={styles.inputStyle}
//       onChangeText={text => this.onChangeText(text)}
//       value={this.state.searchText}
//       onSubmitEditing={ ()=>console.log("aaa")}
//       returnKeyType={"search"}
//       />
//       <Text>{this.state.searchText}</Text>
//       <StatusBar style="auto"/>
//     </View>
//     );
  

//   }
// }


export default App;