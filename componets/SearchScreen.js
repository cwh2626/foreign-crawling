import React,{ useState} from 'react';
import {Pressable,ActivityIndicator,Image, StyleSheet, Text, View,FlatList,SafeAreaView} from 'react-native';
// import PropTypes from "prop-types";
import axios from "axios"; 
import cheerio from "react-native-cheerio";
import 'react-native-gesture-handler';
import * as Linking from 'expo-linking'; // html로 따지면 a태그라고 생각하면됨


// 로딩 이미지 :<ActivityIndicator/> 

let siteList;
 
const Item = ({product}) => {
  const onPress =(url)=>{

    // Linking.openURL : a태그의 href이다 간다?
    Linking.openURL(url);

  };

  // console.log(price);
  return (
    <Pressable style={styles.item} onPress={()=>onPress(product.url)}>
      <View style={styles.imageContainer}>
        <View style={styles.imageShadow}>
          <Image
            style={styles.image}
            source={
              {
              uri:
                product.image,
            }
            }
            defaultSource={require(
              "../source/image/not-found-image-15383864787lu.jpg"
            )}
          />
        </View>
      </View>
      <View style={{ flex: 1 }}>
        {/* numberOfLines : 해당 Text에서 최대로 보여줄수있는 라인
            ellipsizeMode : numberOfLines의 최대줄을 넘어가면 생략부분을 ...으로대체 */}
        <Text numberOfLines={3} ellipsizeMode="tail" style={styles.title}>
          {product.name}
        </Text>
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.brandName}>
          {product.siteName}
        </Text>
        
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.price}>
          {/* 정규식 3번째마다 ,을 찍어서 string형으로변환 */}
          ₩{product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} 
        </Text>
      </View>
    </Pressable>
  );
}

const SearchScreen = ({navigation,route}) => {
  const {searchText,checkSites,checkOptions} = route.params;
  const [list,setList] = useState();
  const [isLoading,setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
 
  console.log(checkOptions);
  const getCrawlResult = (id,$,DATA)=>{
    let productName ,price, key ,image, brand,url, siteName,baseSiteUrl;

    switch (id) {
      case 1: 
        // 이상하다 this.name이 안먹힌다 왜그럴까 하 답답하네 이거 다음에 해보자
        // 추가) 새로운걸 알아내었다 ()=> 에로우함수로하면 this.name을 인식을 못한다 
        //      그래서 function모양으로 했더니 드디어 인식한다 뭐가 문제일까 일단 해결완료
        // console.log(this.name);
        siteName = "END.";
        let dataJson = JSON.parse($("#__NEXT_DATA__").html());
        let dataProducts = dataJson.props.initialProps.pageProps.initialAlgoliaState.results.hits;
        let dataGeneral = dataJson.props.initialState.config.general;
        const baseMediaUrl = `https://media.endclothing.com/media/f_auto,q_auto:eco,w_400,h_400/prodmedia/media/catalog/product`;

        dataProducts.forEach((value, idx) => {

          productName = value.name;
          price = value.full_price_12;
          image = baseMediaUrl + value.small_image;
          url = dataGeneral.secure_store_url + value.url_key + ".html";
          key = siteName + idx;

          DATA.push({ index: idx, name: productName, price: price, key: key, image: image, url: url, siteName: siteName });

        });

        break;
      case 2: 
        siteName = "Farfetch";  
        baseSiteUrl = "https://www.farfetch.com";
    
        $("[data-test=productCard]").each(function(idx,val){
          productName = $(this).find("[data-test=productDescription]").text();
          brand = $(this).find("[data-test=productDesignerName]").text();
          image = $(this).find("meta[itemprop=image]").attr("content");
          price = $(this).find("meta[itemprop=price]").attr("content");
          url = baseSiteUrl + $(this).find("a[itemprop=itemListElement]").attr("href");
          key = siteName+idx;
    
          DATA.push({index: idx, name : brand + " " + productName  ,price : price, key: key, image :image , url : url, siteName : siteName})
          
        });
        
        break;
      case 3: 
        siteName = "YOOX";
        baseSiteUrl = "https://www.yoox.com";
        let temp;

        $(".itemContainer").each(function(idx,val){
          brand = $(this).attr("data-brand");
          productName =$(this).attr("data-category");

          image = $(this).find(".front").attr("data-original");
          price = $(this).find(".fullprice").text();
          
          if(price ==""){ // 세일상품일 경우
            price = $(this).find(".newprice").text();
          } 
          temp = price.indexOf("KRW");
          // console.log(price.indexOf("KRW"));
          price =price.slice(temp+4,price.lastIndexOf(".")).replace(",",""); // 먼저 원화부터 소수점까지 자르고 그다음 ","를 제거한다


          url = baseSiteUrl + $(this).find(".itemlink").attr("href");
          key = siteName+idx;
    
          DATA.push({index: idx, name : brand + " " + productName  ,price : price, key: key, image :image , url : url, siteName : siteName})

        });


        break;
      default:
        break;
    }

    return DATA;
  }
  
  async function getData() {
    let DATA = [];
    let res;
    let $;
    let searchUrl;
    for (i = 0; checkSites.length > i; i++) {
      if(!checkSites[i].toggle) continue; // 선택이안된사이트는 패스

      if(checkOptions.gender != 0){ // 옵션 : 성
        searchUrl= checkSites[i].searchUrlWomen;
        
      }else{
        searchUrl= checkSites[i].searchUrlMen;
        
      }
 
      res = await axios.get(searchUrl + `${searchText}`);
      // console.log(res.data);
      $ = cheerio.load(res.data);
      await getCrawlResult(checkSites[i].id,$, DATA);
      console.log("test " + i)
    }
 
    switch (checkOptions.methode) { 
      case 0: // 정확순
        // data를 index순으로 각 사이트롤 하나하나 섞이위한 정렬함수 // 기본 default
        DATA.sort((a,b)=> a.index - b.index);
        break;

      case 1: // 가격 높은순
        DATA.sort((a,b)=> b.price -a.price );
        break;

        case 2: // 가격 낮은순
        DATA.sort((a,b)=> a.price - b.price);
        break;
    
      default:
        break;
    }

    
    // +++++++ fetch test +++++++++
    // fetch(`https://www.endclothing.com/kr/catalogsearch/results?q=${searchText}`).then((resp) => { return resp.text() }).then((text) => { console.log(text) })
    
    setList(DATA);
    setIsLoading(false);
    setIsRefreshing(false);
  } 

  let count = 0;
  const renderItem = ({item}) =>{
    count++;
    console.log("몇번 리로드?????",count);
    return (
      <Item product={item} />
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
        // onEndReached={()=>alert("끝!")} // 맨아래에 갔을떄 발동하는 함수
        // onEndReachedThreshold={0.1} // 맨아래에서 화면의 어느지점까지 스크롤했을때 onEndReached할지 정하는 함수
        onRefresh={fetchItems} // 스크린을 맨위로 당기면 리프레쉬발동
        refreshing={isRefreshing} // 리프레쉬 중인지 아닌지 체크
        // ListFooterComponent={ <ActivityIndicator />} // flatlist의 맨아래 모양
        // windowSize={2} // 한면에서 보여줄 최대개수 지정 1 = 한 화면?
        //  removeClippedSubviews={true}
         initialNumToRender={2} // 초기 랜더링갯수 값은 windowsize로 예상
        //  maxToRenderPerBatch={1} // 음 화면에서 최대로 보여주는 갯수일까나?
         
        columnWrapperStyle={{ // 가로일떄 모양
          flexWrap: "wrap",
          // flex: 1,
          // alignItems: "flex-start",
          justifyContent: "center",
        }}
        numColumns={10} // 가로로할때 최대 몇개까지 나눌것인지
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
  brandName: {
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