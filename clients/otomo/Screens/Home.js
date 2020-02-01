import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  RefreshControl,
  alert,
  Image,
  TouchableOpacity,
} from 'react-native';
import response from './Data/data';
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
import responses from './Data/data2';

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      response: [],
      isLoading: true,
      refreshing: false,
      horizontal: true,
      color: true,
      responses,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        isLoading: false,
      });
    }, 3000);
    this.GetData();
    this.GetDatase();
  }
  GetDatase = () => {
    this.setState({
      response: response,
    });
  };
  GetData = () => {
    //Service to get the data from the server to render

    axios.get('http://jsonplaceholder.typicode.com/posts').then(res => {
      this.setState({
        data: res.data,
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

    this.setState({data: [], isLoading: true, response: []});
    //Call the Service to get the latest data
    this.GetData();
    this.GetDatase();
  }
  changeColor = () => {
    this.setState({
      color: !this.setState.color,
    });
  };
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
    const {data, isLoading} = this.state;
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
        style={{backgroundColor:'white'}}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={this.ListViewItemSeparator}
          enableEmptySections={true}
          // horizontal={this.state.isHorizontal}
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
            <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              height: 35,
              backgroundColor: 'gainsboro',
              paddingHorizontal: 30,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
              }}>
              <Icon name="phone" size={18} style={{justifyContent: 'center'}} />
              <Text style={{left: 10}}>+62-82369400291</Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Icon name="email" size={18} style={{justifyContent: 'center'}} />
              <Text style={{left: 10}}>customer@otomo.co</Text>
            </View>
          </View>
           <View
            style={{
              height: 60,
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}>
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

            <Text
              category="h6"
              style={{
                textAlign: 'center',

                top: 10,
                fontWeight: '400',
                color: '#58595b',
              }}>
              Murah Atau Mewah
            </Text>
            <Text
              category="h5"
              style={{
                textAlign: 'center',

                top: 14,
                fontWeight: '500',
                color: '#58595b',
              }}>
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
            <View style={{height:30}}></View>
            <View style={{alignItems: 'center'}}>
              <Text style={styles.title} category="h3">
                LISTINGS
              </Text>
            </View>
            <View style={{height:30}}></View>
            <ScrollView
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              style={styles.scroll}>
              <View style={{flexDirection: 'row'}}>
                {this.state.response.map((data, index) => (
                  <View style={{paddingHorizontal: 10}} key={index}>
                    <Card
                      style={{
                        width: 230,
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
                          source={{uri: data.image_url}}
                          style={{
                            height: 200,
                            width: 230,
                            justifyContent: 'center',
                            top: -20,
                          }}
                        />
                      </TouchableOpacity>
                      <Text
                        style={{
                          textAlign: 'center',
                          marginTop: 10,
                          fontSize: 18,
                        }}>
                        {data.name}
                      </Text>

                      {/* <View
                    style={{
                      position: 'absolute',
                      top: -240,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text>Centered text</Text>
                  </View> */}
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
            {this.state.responses.map((res, index) => {
              return (
                <Layout
                  key={index}
                  style={{
                    paddingHorizontal: 15,
                    height: 200,
                    borderRadius: 7,
                    paddingVertical: 15,
                  }}>
                  <Image
                    source={{uri: res.image_url}}
                    style={{
                      height: '100%',
                      width: '100%',
                      justifyContent: 'center',
                      top: -20,
                      borderRadius: 7,
                    }}
                  />
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
    paddingLeft: 20,
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
    top: 40,
    backgroundColor: '#999',
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
