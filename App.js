import React ,{useState}from 'react';
import { Animated,StyleSheet} from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './componets/HomeScreen.js';
import SearchScreen from './componets/SearchScreen.js';
import { useFonts, Kodchasan_700Bold,Comfortaa_500Medium} from '@expo-google-fonts/dev';
import {AppLoading} from 'expo'; 
import Loading from './componets/Loading.js';

const Stack = createStackNavigator();

const App = () => {
  const [isLoading,setIsLoading] = useState(true);
  let [fontsLoaded] = useFonts({
    Kodchasan_700Bold,Comfortaa_500Medium
  });

  if (!fontsLoaded) {
    
      return <AppLoading/>; // 음 대충 fonts를 다운받기전에 아 몰라 expo font에서 보니깐 이렇게 사용하라고해서 이렇게한거 expo 참고
    }
    
  setTimeout(()=>setIsLoading(false), 2000);
  return ( isLoading ?<Loading/> :(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: "Observer",
            headerStyle: styles.header,
            headerTintColor: "#E0E3DA",
            headerTitleStyle: {
              fontWeight: "bold",
              fontSize: 25 ,
              fontFamily: 'Comfortaa_500Medium' 

            },
            
          }}
        />
        <Stack.Screen
          options={{
            headerTitle: false,
            headerBackTitle: "Search",

            headerStyle:styles.header,
            headerTintColor: "#E0E3DA",
            headerBackTitleStyle: {
              fontWeight: "bold",


              fontFamily: 'Comfortaa_500Medium' 

            },
          }}
          name="SearchScreen"
          component={SearchScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  ));
};

const styles = StyleSheet.create({
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
    
  },searchIcon: {
    paddingHorizontal: 5,
    paddingVertical: 5


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