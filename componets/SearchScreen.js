import React,{ useState} from 'react';
import { StyleSheet, Text, View,FlatList,SafeAreaView} from 'react-native';
// import PropTypes from "prop-types";
import axios from "axios"; 
import cheerio from "react-native-cheerio";
import 'react-native-gesture-handler';

const Item = ({price}) => {

  // console.log(price);
  return (

    <View style={styles.item}>
  <Text style={styles.title}>{price}</Text>
</View>
    );
}

const SearchScreen = ({navigation,route}) => {
  const {searchText} = route.params;
  const [list,setList] = useState();
    
  async function getData(){
    let DATA = [], price, key;
    const {data} = await axios.get(`https://www.endclothing.com/kr/catalogsearch/results?q=${searchText}`);
    const $ = cheerio.load (data);
    await $("[data-test=ProductCard__ProductCardSC]").each(function(index,val){
      // console.log($(this).find("[data-test=ProductCard__ProductFinalPrice]").text());
      price =$(this).find("[data-test=ProductCard__ProductFinalPrice]").text();
      key = index;
      DATA.push({price : price, key: index})

    });
    setList(DATA);
    // console.log(DATA);
    // setList(test);
    // console.log(DATA);
    console.log(list, " ????");
    console.log("hi");

  }  

  const renderItem = ({item}) =>{

    // console.log(item)
    return (
      <Item price={item.price} />
      );
    }

  React.useEffect(() => {
    getData();
    console.log("aaa");
  }, []);
  console.log("bbb");

  return (
    // SafeAreaView : 음 좀더 화면상에 여러노치들과 아울러져 여유있게 패딩을 주어서 다보여주는?? 아전한 뷰느낌
    <SafeAreaView style={styles.container}>
      <FlatList
        data={list}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
      ></FlatList>
    </SafeAreaView>
    // <Button
    //   title="Go to Jane's profile"
    //   onPress={() => navigation.navigate("Home", { name: "Jane" })}
    // />
  );
  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  }, item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default SearchScreen;