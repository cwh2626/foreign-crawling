import React,{ useState} from 'react';
import {ActivityIndicator,Image, StyleSheet, Text, View,FlatList,SafeAreaView} from 'react-native';
// import PropTypes from "prop-types";
import axios from "axios"; 
import cheerio from "react-native-cheerio";
import 'react-native-gesture-handler';
// 로딩 이미지 :<ActivityIndicator/> 


const Item = ({price}) => {

  // console.log(price);
  return (
    <View style={styles.item}>
      <View style={styles.imageContainer}>
        <View style={styles.imageShadow}>
          <Image
            style={styles.image}
            source={{
              uri:
                "https://media.endclothing.com/media/f_auto,q_auto:eco,w_400,h_400/prodmedia/media/catalog/product/0/8/08-10-2020_LL_26230001_1_1.jpg",
            }}
          />
        </View>
      </View>
      <View style={{ flex: 1 }}>
        {/* numberOfLines : 해당 Text에서 최대로 보여줄수있는 라인
            ellipsizeMode : numberOfLines의 최대줄을 넘어가면 생략부분을 ...으로대체 */}
        <Text numberOfLines={3} ellipsizeMode="tail" style={styles.title}>
          END. X REEBOK sdfdssdfsINSTAPUMP FURY sss'FOSSIL'sdfdsjfkdsjkfndjknfdjknsfjknjsdfknjfds
        </Text>
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.brendName}>
          END
        </Text>
        
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.price}>
          {price}
        </Text>
      </View>
    </View>
  );
}

const SearchScreen = ({navigation,route}) => {
  const {searchText,checkBrands} = route.params;
  const [list,setList] = useState();
  const [isLoading,setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  
  // console.log(checkBrands);  
  async function getData(){
    let DATA = [], price, key ,image;
    const res = await axios.get(`https://www.endclothing.com/kr/catalogsearch/results?q=${searchText}`);
    const $ = cheerio.load (res.data);
    const test = await axios.get(`https://www.farfetch.com/kr/shopping/men/search/items.aspx?rnd=637423160679422592&q=${searchText}`);
    
    // 아 드디어 찾았다 이 부분은 내일 다시해보자 현재 .END사이트에서는 이미지를 뭣같은 방식으로해서 지금 현재 겨운 간신히 사진 데이터를 찾았다 이제 이것을 활용해보자
    let dataJson = JSON.parse($("#__NEXT_DATA__").html());
    console.log(dataJson.props.initialProps.pageProps.initialAlgoliaState.results.hits);
      
    await $("[data-test=ProductCard__ProductCardSC]").each(function(index,val){
      // console.log($(this).find("[data-test=ProductCard__ProductFinalPrice]").text());
      price =$(this).find("[data-test=ProductCard__ProductFinalPrice]").text();
      image =$(this).find("[data-test=ProductCard__PlpImage]").attr("src");
      
      key = index;
      DATA.push({price : price, key: index, image :image})
      
    });
    // fetch(`https://www.endclothing.com/kr/catalogsearch/results?q=${searchText}`).then((resp) => { return resp.text() }).then((text) => { console.log(text) })
    setIsLoading(false);
    
    setList(DATA);

    setIsRefreshing(false);
    // console.log(DATA);
    // setList(test);
    // console.log(DATA);
    // console.log(list, " ????");
    console.log("hi");

  }  
  let count = 0;
  const renderItem = ({item}) =>{
    count++;
    console.log("몇번 리로드?????",count);
    return (
      <Item price={item.price} />
      );
    }

  React.useEffect(() => {
    getData();
    console.log("aaa");
  }, []);
  console.log("bbb");
  const fetchItems = () => {
    // alert("hey")
    setIsRefreshing(true);
    getData();
 
  }
  if(isLoading){
    return(
      <View style={styles.loading}>

       <ActivityIndicator size={"large"} color="#999999"/> 
      </View>


    )
  }
  return (
    // SafeAreaView : 음 좀더 화면상에 여러노치들과 아울러져 여유있게 패딩을 주어서 다 보여주는?? 안전한 뷰느낌
    <SafeAreaView style={styles.container}>
      <FlatList
        // onEndReached={()=>alert("hey")}
        onRefresh={fetchItems} // 스크린을 맨위로 당기면 리프레쉬발동
        refreshing={isRefreshing} // 리프레쉬 중인지 아닌지 체크
        windowSize={1}
        //  removeClippedSubviews={true}
         initialNumToRender={2}
        //  maxToRenderPerBatch={1}
         columnWrapperStyle={{
          flexWrap: "wrap",
          // flex: 1,
          // alignItems: "flex-start",
          justifyContent: "center",
        }}
        numColumns={10}    
        data={list}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
        contentContainerStyle={styles.flatListContentContainerStyle}
      ></FlatList>
    </SafeAreaView>
    // <Button
    //   title="Go to Jane's profile"
    //   onPress={() => navigation.navigate("Home", { name: "Jane" })}
    // />
  );
  
};

const styles = StyleSheet.create({
  flatListContentContainerStyle: {
    paddingVertical: 30,
    backgroundColor: "#E0E3DA",
    alignItems: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#E0E3DA",
  },loading:{
    flex: 1,
    backgroundColor: "#E0E3DA", 
    alignItems: "center",
    justifyContent : "center"
  },
  item: {
    width: 340,
    height: 120,
    borderRadius:5,
    backgroundColor: "#FFFFF3",
    paddingVertical: 5,
    marginVertical: 20,
    marginHorizontal: 10,

    flexDirection: "row",
    justifyContent: "space-around",
    ...Platform.select({ // 플렛폼에 따라 값 설정
      ios :{
        shadowColor: "black",
        shadowOffset: {
          height : 1,      
        },
        shadowRadius: 5,
        shadowOpacity: 0.1,
      },android : {
        // backgroundColor: "black",

        elevation: 10
      },default :{

      }
    }),
  },
  price: {
    fontSize: 18,
    marginTop: "auto",
    color: "#A593E0",
  },
  title: {},
  brendName: {
    marginTop: 2,
    fontSize: 12,
    color: "#999999",
  },
  imageContainer: {
    flex: 1,
    alignItems: "center",
  },
  imageShadow :{
    width: 135,
    height: 125,
    marginTop: -30,
    borderRadius:5,

    ...Platform.select({ // 플렛폼에 따라 값 설정
      ios :{
        shadowColor: "black",
        shadowOffset: {
          height : 1,      
        },
        shadowRadius: 3,
        shadowOpacity: 0.2,
      },android : {
        backgroundColor: "black",

        elevation: 15
      },default :{

      }
    }),
  },
  image: {
    borderRadius:5,
    width: 135,
    height: 125,
 
  },
});

export default SearchScreen;