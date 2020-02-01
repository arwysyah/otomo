import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  RefreshControl,
  alert,
  Image
} from 'react-native';
import response from './Data/data';
import {Layout, Spinner, ApplicationProvider} from '@ui-kitten/components';
import axios from 'axios';

import {mapping, light as lightTheme} from '@eva-design/eva';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView} from 'react-native-gesture-handler';
export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      response:[],
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
    this.GetData();
    this.GetDatase()
  }
GetDatase=()=>{
  this.setState({
    response:response
  })
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

    this.setState({data: [], isLoading: true,response:[]});
    //Call the Service to get the latest data
    this.GetData();
    this.GetDatase()
  }
  render() {
    console.log(response);

    if (this.state.refreshing) {
      return (
        //loading view while data is loading
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator size="small" color="#00ff00" />
        </View>
      );
    }
    const {data, isLoading} = this.state;
    console.log(data);
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
            <ScrollView
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            style={styles.scroll}>
            <View
              style={{flexDirection: 'row', paddingRight: 20, marginTop: 15}}>
              {this.state.response.map((data, index) => (
                <View style={{top: 20, paddingRight: 20}} key={index}>
                    {/* {itemAdd.filter(fil=>item.id_product===fil.id_product).length>0 (
                      <View></View> */}
                  
                    <Image
                      source={{uri: data.image_url}}
                      style={{borderRadius: 10, height: 150, width: 140}}
                    />
                    
               
                  <Text
                    style={{
                      textAlign: 'center',
                      marginTop: 10,
                      fontSize: 18,
                    }}>
                    {data.name}
                  </Text>
                
                  <View style={{top: 20}}>
                  
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>
          {this.state.data.map((d, i) => {
            return (
              <View key={i}>
                <Text>{d.title}</Text>
                <Text>{d.body}</Text>
              </View>
            );
          })}
          <View>
          
          </View>
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
});
