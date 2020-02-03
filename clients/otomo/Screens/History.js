import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  RefreshControl,
  alert,
  Image,
} from 'react-native';
import axios from 'axios';
import {ScrollView} from 'react-native-gesture-handler';
import {
  Spinner,
  Text,
  Card,
  Layout,
} from '@ui-kitten/components';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


export default class Detail extends Component {
  constructor() {
    super();
    this.state = {
      transcationData: [],
      isLoading: true,
      refreshing: false,
      horizontal: true,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        isLoading: false,
      });
    }, 3000);
    this.getDataTransaction()
  }


  getDataTransaction=()=>{
      axios.get('http://107.22.93.157:5080/transaction').then((response)=>{
          this.setState({
              transcationData:response.data.response,
              isLoading: !this.state.isLoading
          })
      })
  }

  ListViewItemSeparator = () => {
    return (
      
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
   

    this.setState({isLoading: true,transcationData:[]});
    this.getDataTransaction()
    
  }

  dateFormats = date_data => {
    let arrDate = String(date_data)
      .slice(0, 10)
      .split('/')
      .reverse();

    return arrDate;
  };
  formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  }

  render() {
    const {isLoading, refreshing,transcationData} = this.state;
    if (this.state.refreshing) {
      return (
        //loading view while data is loading
        <View style={{flex: 1, paddingTop: 15}}>
          <ActivityIndicator size="small" color="#00ff00" />
        </View>
      );
    }

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
          </View>
          <Layout><Text category='h4'style={{textAlign:'center'}}>History</Text></Layout>
{transcationData.map((transaction,index)=>{return(
          <Layout style={{paddingHorizontal: 20,paddingVertical:10}} key={index}>
            <Layout
              style={{flexDirection: 'row', justifyContent: 'space-around'}}>
              <Card
                style={{
                  height: 190,
                  width: 180,

                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 10,
                  
                }}>
                <Image
                  source={{uri:transaction.image}}
                  style={styles.imageProduct}
                />

                <Text style={styles.productName}>{transaction.product_name}</Text>
              </Card>
              <Layout>
              <Text category='h6'style={{textAlign:'center'}}>Start Date</Text>
                <Text style={styles.productName}>{this.dateFormats(transaction.start_date)}</Text>
                <Text category='h6' style={{textAlign:'center'}}>Start Date</Text>
                <Text style={styles.productName}>{this.dateFormats(transaction.end_date)}</Text>
                <Text style={styles.productName}>{transaction.location}</Text>
                <Text style={styles.productName}>Total</Text>
            <Text style={styles.productName}>Total: Rp{this.formatNumber(transaction.total)}</Text>
              </Layout>
            </Layout>
          </Layout>
          )})}
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
  map: {
    height: 400,
  },
  imaps: {
    height: 80,
    width: 80,
    marginTop: 10,
    left: 20,
  },
  button4: {
    textAlign: 'center',

    width: 120,
    height: 30,
    color: 'white',
    // shadowColor:'black',
    backgroundColor: '#a22937',
    borderRadius: 5,
    fontWeight: 'bold',
  },
  imageProduct: {
    height: 120,
    width: 150,
    justifyContent: 'center',
    top: -20,
  },
  productName: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 18,
  },
});
