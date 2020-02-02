import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  RefreshControl,
  Alert,
  Image,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import axios from 'axios';
import {ScrollView} from 'react-native-gesture-handler';
import {
  Spinner,
  Text,
  Button,
  Card,
  Input,
  Layout,
} from '@ui-kitten/components';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      product: [],
      isLoading: true,
      refreshing: false,
      horizontal: true,
      color: true,
      article: [],
    };
  }

  async componentDidMount() {
    setTimeout(() => {
      this.setState({
        isLoading: false,
      });
    }, 3000);
    await this.GetData();
    await this.getArticle();
  }
  getArticle = () => {
    axios.get('http://192.168.100.155:5080/article').then(res => {
      this.setState({
        article: res.data.response,
      });
    });
  };
  GetData = async () => {
    //Service to get the data from the server to render

    await axios.get('http://192.168.100.155:5080/product').then(res => {
      // console.log(res,'res')
      this.setState({
        product: res.data.response,
        isLoading: !this.state.isLoading,
      });
    });
  };
  ListViewItemSeparator = () => {
    return (
      //returning the listview item saparator view
      <View
        style={{
          height: 0.2,
          width: '90%',
          backgroundColor: '#808080',
        }}
      />
    );
  };
  onRefresh() {
    //Clear old data of the list

    this.setState({product: [], isLoading: true, response: []});
    //Call the Service to get the latest data
    this.GetData();
    this.getArticle();
  }
  changeColor = () => {
    this.setState({
      color: !this.setState.color,
    });
  };
  formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  }
  handleArticle = () => {
    Alert.alert(
      'Warning',
      `This article is not connected yet`,
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ],
      {cancelable: false},
    );
  };
  removeProduct=async (id_product)=>{
   await axios.delete(`http://192.168.100.155:5080/product/${id_product}`).then((res)=>{
     console.log(res)
   }).then(()=>{
     ToastAndroid.show('Delete Succesfully',ToastAndroid.SHORT)
   })
   
  }
  render() {
    // console.log(response);

    if (this.state.refreshing) {
      return (
        //loading view while data is loading
        <View style={{flex: 1, paddingTop: 15}}>
          <ActivityIndicator size="small" color="#00ff00" />
        </View>
      );
    }
    const {product, isLoading, article} = this.state;
    // console.log(data);
    if (isLoading === true) {
      return (
        <View style={styles.secondContainer}>
          <Spinner size="giant" />
        </View>
      );
    }

    return (
      //Returning the ListView
      <View style={styles.MainContainer}>
        <ScrollView
          style={{backgroundColor: 'white'}}
          // showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={this.ListViewItemSeparator}
          enableEmptySections={true}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <Text
              style={styles.rowViewContainer}
              onPress={() => alert(item.id)}>
              {item.title}
            </Text>
          )}
          refreshControl={
            <RefreshControl
              //refresh control used for the Pull to Refresh
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh.bind(this)}
            />
          }>
          <View style={styles.header}>
            <View style={styles.contact}>
              <Icon name="phone" size={18} style={{justifyContent: 'center'}} />
              <Text style={{left: 10}}>+62-82369400291</Text>
            </View>

            <View style={styles.email}>
              <Icon name="email" size={18} style={{justifyContent: 'center'}} />
              <Text style={{left: 10}}>customer@otomo.co</Text>
            </View>
          </View>
          <View style={styles.bigImage}>
            <Image
              source={require('./Assets/otomo.png')}
              style={{maxWidth: 150, maxHeight: 41, left: -10}}
            />
            <TouchableOpacity
              style={{backgroundColor: this.state.color ? 'white' : 'green'}}
              onPress={() => this.changeColor()}>
              <Icon name="format-list-bulleted" size={30} />
            </TouchableOpacity>
          </View>
          <View style={{justifyContent: 'center'}}>
            <Image
              source={require('./Assets/car.jpeg')}
              style={{maxWidth: '100%', maxHeight: '30%'}}
            />

            <Text category="h6" style={styles.note}>
              Murah Atau Mewah
            </Text>
            <Text category="h5" style={styles.note}>
              Everyone's "RIDE" Choice
            </Text>
            <View style={{paddingHorizontal: 20, top: 20}}>
              <Card style={{borderColor: 'red'}}>
                <Text>Masukkan Transportasi</Text>
                <Input
                  style={{maxHeight: '50%'}}
                  placeholder="Place your Text"
                  // value={value}
                  // onChangeText={setValue}
                />
                <Button style={{backgroundColor: 'grey'}} status="warning">
                  Pencarian
                </Button>
              </Card>
            </View>
            <Layout style={styles.containerlayout}>
              <Layout style={styles.layout} level="1">
                <Image
                  source={require('./Assets/icon-car.png')}
                  style={{maxWidth: '80%', maxHeight: '60%'}}
                />
                <Text style={{textAlign: 'center'}}>PRIVATE & PERSONAL</Text>
              </Layout>
              <Layout style={styles.layout} level="1">
                <Image
                  source={require('./Assets/phoneicon.png')}
                  style={{maxWidth: '80%', maxHeight: '65%'}}
                />
                <Text style={{textAlign: 'center'}}>ALL-INCLUDED PRICE</Text>
              </Layout>
              <Layout style={styles.layout} level="1">
                <Image
                  source={require('./Assets/services.png')}
                  style={{maxWidth: '80%', maxHeight: '60%'}}
                />
                <Text style={{textAlign: 'center'}}>24/7 HUMAN SUPPORT</Text>
              </Layout>
            </Layout>
            <View style={{height: 30}}></View>
            <View style={{alignItems: 'center'}}>
              <Text style={styles.title} category="h3">
                LISTINGS
              </Text>
            </View>
            <View style={{height: 30}}></View>
            <ScrollView
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              style={styles.scroll}>
              <View style={{flexDirection: 'row'}}>
                {product.reverse().map((data, index) => (
                  <View style={{paddingHorizontal: 10}} key={index}>
                    <Card
                      style={{
                        width: 230,
                        height: 300,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 10,
                      }}>
                      <TouchableOpacity
                        onPress={() =>
                          this.props.navigation.navigate('Detail', {
                            data: {...data},
                          })
                        }>
                        <Image
                          source={{uri: data.image}}
                          style={styles.imageProduct}
                        />
                      </TouchableOpacity>
                      <Text style={styles.productName}>
                        {data.product_name}
                      </Text>
                      <Text style={styles.productName}>
                        Rp. {this.formatNumber(data.price)}
                      </Text>
                      <Text style={styles.productName}>{data.location}</Text>
                      <Layout
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <Button
                      
                        status='info'
                       
                          style={{alignItems: 'center'}}
                          onPress={() =>
                            this.props.navigation.navigate('EditProduct', {
                              data: {...data},
                            })
                          }>
                          Edit Product
                        </Button>
                        <Button
                         status="danger"
                          style={{alignItems: 'center'}}
                          onPress={(id_product) =>
                           this.removeProduct(data.id_product)
                          }>
                          Remove
                        </Button>
                      </Layout>
                    </Card>
                  </View>
                ))}
              </View>
            </ScrollView>
          </View>

          {/* LISTINGS */}

          <Layout>
            <Text style={styles.title} category="h3">
              BERITA TERBARU
            </Text>
          </Layout>

          <Layout style={{top: 30}}>
            {article.map((articles, index) => {
              return (
                <Layout
                  key={index}
                  style={{
                    paddingHorizontal: 15,
                    height: 200,
                    borderRadius: 7,
                    paddingVertical: 35,
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      this.handleArticle();
                    }}>
                    <Image
                      source={{uri: articles.image}}
                      style={styles.article}
                    />
                  </TouchableOpacity>
                  <Layout level="4" style={{height: 50}}>
                    <Text style={styles.note}>{articles.title}</Text>
                  </Layout>
                </Layout>
              );
            })}
          </Layout>

          <Layout style={styles.footerlayout}>
            <View>
              <Text category="h4" style={{top: 10, color: 'white'}}>
                hubungi kami
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  top: 10,
                }}>
                <View>
                  <Icon
                    name="map-marker-outline"
                    size={15}
                    style={{color: 'white'}}
                  />
                  <Icon name="phone" size={15} style={{color: 'white'}} />
                  <Icon name="email" size={15} style={{color: 'white'}} />
                </View>
                <View style={{left: -60, paddingVertical: 4}}>
                  <Text
                    style={{color: 'white', textAlign: 'left'}}
                    category="c2">
                    Ariobimo Sentra Level 8, Jakarta, Indonesia, 12950
                  </Text>
                  <Text style={{color: 'white'}} category="c2">
                    +62-82369400291
                  </Text>
                  <Text style={{color: 'white'}} category="c2">
                    customer@otomo.co
                  </Text>
                </View>
              </View>
            </View>

            <View
              style={{
                borderBottomColor: 'black',
                borderBottomWidth: 1,
                height: 70,
              }}></View>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View>
                <Text style={{color: 'white'}} category="h5">
                  Otomo
                </Text>
                <Text style={{color: 'white'}} category="c2">
                  Tentang Kami
                </Text>
                <Text style={{color: 'white'}} category="c2">
                  How it works?
                </Text>
                <Text style={{color: 'white'}} category="c2">
                  Partner Kami
                </Text>
              </View>
              <View>
                <Text style={{color: 'white'}} category="h5">
                  help and contact
                </Text>
                <Text
                  style={{color: 'white', textAlign: 'right'}}
                  category="c2">
                  Faq
                </Text>
                <Text
                  style={{color: 'white', textAlign: 'right'}}
                  category="c2">
                  Hubungi Kami
                </Text>
              </View>
            </View>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View>
                <Text style={{color: 'white'}} category="h5">
                  more
                </Text>
                <Text style={{color: 'white'}} category="c2">
                  facebook
                </Text>
                <Text style={{color: 'white'}} category="c2">
                  Instagram
                </Text>
                <Text style={{color: 'white'}} category="c2">
                  Join As Vendor
                </Text>
              </View>
            </View>
          </Layout>
          <Layout
            style={{
              backgroundColor: '#a22937',
              paddingLeft: 10,
              paddingVertical: 5,
            }}>
            <Text style={{color: 'white'}} category="p2">
              Legal notices
            </Text>
            <Text style={{color: 'white'}} category="p2">
              ©2020 All Rights Reserved PT Automo Teknologi Indonesia
            </Text>
          </Layout>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  secondContainer: {
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
  },
  scroll: {
    flexDirection: 'row',
    height: 300,
  },
  containerlayout: {
    flex: 1,
    flexDirection: 'row',
    top: 25,
  },
  layout: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '40%',
    height: 150,
    borderRightColor: 'black',
    borderRightWidth: 0.5,
  },
  title: {
    color: '#58595b',
    textAlign: 'center',
    top: 5,
  },
  footerlayout: {
    flex: 1,

    paddingHorizontal: 10,

    height: 400,
    top: 60,
    backgroundColor: '#999',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 35,
    backgroundColor: 'gainsboro',
    paddingHorizontal: 30,
  },
  bigImage: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  contact: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  email: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  note: {
    textAlign: 'center',

    top: 10,
    fontWeight: '400',
    color: '#58595b',
  },
  imageProduct: {
    height: 200,
    width: 230,
    justifyContent: 'center',
    top: -20,
  },
  productName: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 18,
  },
  article: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    top: -20,
    borderRadius: 7,
  },
});
// {this.state.data.map((d, i) => {
//   return (
//     <View key={i}>
//       <Text>{d.title}</Text>
//       <Text>{d.body}</Text>
//     </View>
//   );
// })}
// <View></View>

// <View
// style={{
//   flexDirection: 'row',
//   justifyContent: 'space-around',
//   color: 'white',
//   top: 20,
// }}>
// <Icon
//   name="map-marker-outline"
//   size={18}
//   style={{color: 'white'}}
// />
// <Text style={{color: 'white',textAlign:'left'}}category='c2'>
//   Ariobimo Sentra Level 8, Jakarta, Indonesia, 12950
// </Text>
// </View>
// <View
// style={{
//   flexDirection: 'row',
//   justifyContent: 'space-around',

//   top: 20,
// }}>
// <Icon name="phone" size={18} style={{color: 'white'}} />
// <Text style={{ color: 'white'}}category='c2'>+62-82369400291</Text>
// </View>

// <View
// style={{
//   flexDirection: 'row',
//   justifyContent: 'space-between',
//   color: 'white',
//   top: 20,
// }}>
// <Icon name="email" size={18} style={{color: 'white'}} />
// <Text style={{ color: 'white'}} category='c2'>
//   customer@otomo.co
// </Text>
// </View>
