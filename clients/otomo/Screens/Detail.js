import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  RefreshControl,
  alert,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import axios from 'axios';
import {ScrollView} from 'react-native-gesture-handler';
import {
  Spinner,
  Text,
  Button,
  Card,
  Input,
  Layout
  ,RangeCalendar
} from '@ui-kitten/components';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SecondIcon from 'react-native-vector-icons/SimpleLineIcons';
import getDirections from 'react-native-google-maps-directions';
import MapView, {PROVIDER_GOOGLE, Marker, Callout} from 'react-native-maps';
const {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
import CalendarPicker from 'react-native-calendar-picker';
export default class Detail extends Component {
  constructor() {
    super();
    this.state = {
      response: [],
      isLoading: true,
      refreshing: false,
      horizontal: true,
      color: true,
      selectedStartDate: null,
      selectedEndDate: null,
    };
    this.onDateChange = this.onDateChange.bind(this);
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        isLoading: false,
      });
    }, 3000);
    this.GetData()
  }
  
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

    this.setState({ isLoading: true});
    //Call the Service to get the latest data
    this.GetData();
    this.GetDatase();
  }
  
  handleGetDirections = () => {
    let propsData = this.props.navigation.getParam('data');
    console.log(propsData, 'part');
    const newData = {
      //  source: {
      //   latitude: -7.797068,
      //   longitude: 110.370529
      // },
      destination: {
        latitude: propsData.latitude,
        longitude: propsData.longitude,
      },
      params: [
        {
          key: 'travelmode',
          value: 'driving',
        },
        {
          key: 'dir_action',
          value: 'navigate',
        },
      ],
    };

    getDirections(newData);
  };
  onDateChange(date, type) {
    if (type === 'END_DATE') {
      this.setState({
        selectedEndDate: date,
      });
    } else {
      this.setState({
        selectedStartDate: date,
        selectedEndDate: null,
      });
    }
  }
 
  dateFormats = date_data => {
    let arrDate = String(date_data)
      .slice(0, 10)
      .split("/")
      .reverse();

    return arrDate;
  };
   formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }
  
  render() {
    const propsData = this.props.navigation.getParam('data');
    // console.log(propsData);
    // console.log(response);

    if (this.state.refreshing) {
      return (
        //loading view while data is loading
        <View style={{flex: 1, paddingTop: 15}}>
          <ActivityIndicator size="small" color="#00ff00" />
        </View>
      );
    }
    const {data, isLoading, selectedStartDate, selectedEndDate} = this.state;

    const minDate = new Date(); // Today
    const maxDate = new Date(2022, 6, 3);
    let startDate  =  selectedStartDate ? selectedStartDate.toString() : '';
    let  endDate = selectedEndDate ? selectedEndDate.toString() : '';
    const oneDay = 24 * 60 * 60 * 1000; 
    let startDates  =  selectedStartDate ? selectedStartDate : '';
    let  endDates = selectedEndDate ? selectedEndDate: '';
    const diffDays = Math.round(Math.abs((Number(endDates)-Number(startDates)) / oneDay)+1)
    const totalPrice= diffDays*propsData.price
    // let sumDate=Number(endDate)-Number(startDate)
    console.log('sum',Number(diffDays))
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
          >
              <Icon name="format-list-bulleted" size={30} />
            </TouchableOpacity>
          </View>
          <View style={{justifyContent: 'center'}}>
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
                  Search
                </Button>
              </Card>
              <Layout style={{height: 20}}></Layout>
              <View style={{alignItems: 'center'}}>
                <Text style={styles.title} category="h5">
                  {propsData.product_name}
                </Text>
                <Layout style={{height: 20}}></Layout>
              </View>
              <Card style={{width: 300, marginHorizontal: 20, height: 330}}>
                <Image
                  source={{uri: propsData.image}}
                  style={{
                    height: 140,
                    width: 250,
                    justifyContent: 'center',

                    borderRadius: 7,
                  }}
                />
                <Image
                  source={{uri: propsData.image}}
                  style={{
                    height: 50,
                    width: 80,
                    marginLeft: 170,
                    top: 40,
                  }}
                />
              </Card>
              <View style={{height: 20}}></View>
              <Layout level="1" style={{paddingVertical: 30}}>
                <Card>
                  <Text category="s2">Deskripsi</Text>
                </Card>
                <View style={{height: 20}}></View>
                <Card>
                  <Text category="s2">{propsData.description}</Text>
                </Card>
                <View style={{height: 20}}></View>
                <Text category="s2">Aturan</Text>
                <View style={{height: 20}}></View>
                <Card>
                  <Text category="s2">{propsData.rules}</Text>
                </Card>
                <View style={{height: 20}}></View>
                <Text category="s2">Aturan</Text>
                <View style={{height: 20}}></View>
                <Text category="s2">Detail Pemesanan </Text>

                <Card>
                  <Text category="h4">Booking Conditions</Text>
                  <Layout
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Layout>
                  <Text category="s2">bensin :</Text>
                      <Text category="s2">Jam Per Hari</Text>
                      <Text category="s2">Kapasitas Maksimal:</Text>
                      <Text category="s2">Toll & Parking</Text>
                      <Text category="s2">Harus Deposit:</Text>
                      <Text category="s2">Asuransi:</Text>
                    </Layout>
                    <Layout>
                      <Text category="s2"style={{fontWeight:"bold"}}>{propsData.fuel}</Text>
                      <Text category="s2"style={{fontWeight:"bold"}}>{propsData.hoursperDay}</Text>
                  <Text category="s2" style={{fontWeight:"bold"}}>{propsData.max_Capacity}-{propsData.max_secCapacity}Pax</Text>
                  <Text category="s2" style={{fontWeight:"bold"}}>{propsData.toll_parkingCharge}</Text>
                  <Text category="s2" style={{fontWeight:"bold"}}>{propsData.deposit}</Text>
                  <Text category="s2" style={{fontWeight:"bold"}}>{propsData.insurance}</Text>
                    </Layout>
                   
                    <Layout>
                      <SecondIcon name="question" size={16} />
                      <SecondIcon name="question" size={16} style={{top: 10}} />
                      <SecondIcon name="question" size={16} style={{top: 10}} />
                      <SecondIcon name="question" size={16} style={{top: 10}} />
                      <SecondIcon name="question" size={16} style={{top: 15}} />
                    </Layout>
                  </Layout>
                </Card>
              </Layout>
              <View style={{height: 20}}></View>
              <Text category="s2">Reviews</Text>
              <View style={{height: 20}}></View>
              <Card>
                <Text category="s2"></Text>
              </Card>
              <View style={{height: 20}}></View>

              <Card>
                <Text category="h3">Listing Serupa</Text>
                <Button
                  style={{backgroundColor: '#a22937'}}
                  status="warning"
                  onPress={() => {
                    this.props.navigation.navigate('Home');
                  }}>
                  KEMBALI KE HASIL PENCARIAN
                </Button>
              </Card>
            </View>
            <Layout style={{height: 40}}></Layout>
            <View style={{height: 500, marginHorizontal: 20}}>
              <MapView
                style={styles.map}
                provider={PROVIDER_GOOGLE}
                region={{
                  latitude: propsData.latitude,
                  longitude: propsData.longitude,
                  latitudeDelta: LATITUDE_DELTA,
                  longitudeDelta: LONGITUDE_DELTA,
                }}>
                <Marker
                  coordinate={{
                    latitude: propsData.latitude,
                    longitude: propsData.longitude,
                  }}
                  title={propsData.name}>
                  <Callout style={{height: 120}}>
                    {/* <Text>{part.location}</Text> */}

                    <Image
                      style={styles.imaps}
                      source={{uri: propsData.image_url}}
                    />
                  </Callout>
                </Marker>
              </MapView>
              <Layout style={{alignItems: 'center', top: 10}}>
                <Button
                  style={{width: 200, justifyContent: 'center'}}
                  onPress={this.handleGetDirections}>
                  Telusuri Lokasi
                </Button>
              </Layout>
            </View>
            <View>
            <CalendarPicker
          startFromMonday={true}
          allowRangeSelection={true}
          minDate={minDate}
          maxDate={maxDate}
          todayBackgroundColor="#f2e6ff"
          selectedDayColor="#7300e6"
          selectedDayTextColor="#FFFFFF"
          onDateChange={this.onDateChange}
        />
 
        <View style={{alignItems:'center',paddingHorizontal:20}}>
              <Text> Start Date:  {this.dateFormats(startDates)}</Text>
               <Text>  End Date : {this.dateFormats(endDates)}</Text>
               <Text>  Price : Rp. {this.formatNumber(totalPrice)}</Text>
        </View>
            </View>
          </View>

          {/* LISTINGS */}

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
});
