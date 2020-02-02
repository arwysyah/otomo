import React, {Component} from 'react';
import {StyleSheet, RefreshControl,ToastAndroid} from 'react-native';
import {
  Spinner,
  Text,
  Button,
  Card,
  Input,
  Layout,
} from '@ui-kitten/components';
import {ScrollView} from 'react-native-gesture-handler';
import axios from 'axios'
export default class EditProduct extends Component {
  state = {
    refreshing: false,
    image: '',
    productName: '',
    price: '',
    description: '',
    category: '',
    rules: '',
    location: '',
    latitude: '',
    longitude: '',
    fuel: '',
    hours: '',
    maxCap: '',
    secMaxCap: '',
    toll: '',
    deposit: '',
    insurance: '',
  };

  onRefresh() {
    //Clear old data of the list
    
  }
  componentDidMount(){
let propsData = this.props.navigation.getParam('data')
    const {
        productName,image,price,description,category,
        rules,location,latitude,
        longitude,fuel,
        hours,maxCap,
        secMaxCap,toll,
        deposit,insurance} = this.state;
        this.setState({
            productName:propsData.product_name,
            image:propsData.image,
            price:propsData.price.toString(),
            description:propsData.description,
            category:propsData.category,
            rules:propsData.rules,
            location:propsData.location,
            latitude:propsData.latitude.toString(),
            longitude:propsData.longitude.toString(),
            fuel:propsData.fuel,
            hours:propsData.hoursperDay.toString(),
            maxCap:propsData.max_Capacity.toString(),
            secMaxCap:propsData.max_secCapacity.toString(),
            toll:propsData.toll_parkingCharge,
            deposit:propsData.deposit,
            insurance:propsData.insurance,
        })
  }
submitProduct=async ()=>{
  const {
    productName,image,price,description,category,
    rules,location,latitude,
    longitude,fuel,
    hours,maxCap,
    secMaxCap,toll,
    deposit,insurance} = this.state;
const productData={
  product_name:productName,image,price,description,category,latitude,
  rules,location,longitude,fuel,hoursperDay:hours,max_Capacity:maxCap,
  max_secCapacity:secMaxCap,toll_parkingCharge:toll,deposit,insurance
}
try {
    let propsData = this.props.navigation.getParam('data')
  await axios.put(`http://192.168.100.155:5080/product/${propsData.id_product}`,productData).then((response)=>{
  console.log(response)
 
})
  ToastAndroid.show('Edit Product Succesfully',ToastAndroid.SHORT)
} catch (error) {
  
  ToastAndroid.show(error.message,ToastAndroid.SHORT)
}


  // console.log('product',productData)
}
  render() {
    const {
      refreshing,
      productName,
      image,
      price,
      description,
      category,
      rules,
      location,
      latitude,
      longitude,
      fuel,
      hours,
      maxCap,
      secMaxCap,
      toll,
      deposit,
      insurance,
    } = this.state;
    

    if (refreshing) {
        
      return (
        //loading view while data is loading
        <View style={{flex: 1, paddingTop: 15}}>
          <Spinner size="small" color="#00ff00" />
        </View>
      );
    }
    return (
      <Layout style={{flex: 1, paddingHorizontal: 20}}>
        <Layout style={{height: 30}}></Layout>
        <Layout>
          <Text category="h5" style={{textAlign: 'center'}}>
            Edit Product
          </Text>
        </Layout>
        <Layout style={{height: 30}}></Layout>
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
          <Layout>
            <Text category="s2">Product Name</Text>
            <Input
              style={styles.input}
              size="small"
              value={productName}
              placeholder="Product Name"
              onChangeText={productName => this.setState({productName})}
            />
            <Text category="s2">Image</Text>
            <Input
              style={styles.input}
              value={image}
              size="small"
              placeholder="Image"
              onChangeText={image => this.setState({image})}
            />
            <Text category="s2">Price</Text>
            <Input
              style={styles.input}
              size="small"
              value={price}
              placeholder="Price"
              onChangeText={price => this.setState({price})}
            />
            <Text category="s2">Description</Text>
            <Input
              style={styles.input}
              value={description}
              size="small"
              placeholder="Description"
              onChangeText={description => this.setState({description})}
            />
            <Text category="s2">Category</Text>
            <Input
              style={styles.input}
              size="small"
              value={category}
              placeholder="Category"
              onChangeText={category => this.setState({category})}
            />
            <Text category="s2">Rules</Text>
            <Input
              style={styles.input}
              size="small"
              value={rules}
              placeholder="Rules"
              onChangeText={rules => this.setState({rules})}
            />
            <Text category="s2">Location</Text>
            <Input
              style={styles.input}
              size="small"
              value={location}
              placeholder="Location"
              onChangeText={location => this.setState({location})}
            />
            <Text category="s2">Latitude</Text>
            <Input
              style={styles.input}
              value={latitude}
              size="small"
              placeholder="Latitude"
              onChangeText={latitude => this.setState({latitude})}
            />
            <Text category="s2">Longitude</Text>
            <Input
              style={styles.input}
              value={longitude}
              size="small"
              placeholder="Longitude"
              onChangeText={longitude => this.setState({longitude})}
            />
            
            <Text category="s2">Fuel</Text>
            <Input
              style={styles.input}
              value={fuel}
              size="small"
              placeholder="Fuel"
              onChangeText={fuel => this.setState({fuel})}
            />
            
            <Text category="s2">Hours Per Day  *number</Text>
            <Input
              style={styles.input}
              value={hours}
              size="small"
              placeholder="Hours Per Day"
              onChangeText={hours => this.setState({hours})}
            />
            
            <Text category="s2">Max Capacity  *number</Text>
            <Input
              style={styles.input}
              value={maxCap}
              size="small"
              placeholder="Max Capacity"
              onChangeText={maxCap => this.setState({maxCap})}
            />
            
            <Text category="s2">Second Max Capacity   *number</Text>
            <Input
              style={styles.input}
              value={secMaxCap}
              size="small"
              placeholder="Second Max Capacity"
              onChangeText={secMaxCap => this.setState({secMaxCap})}
            />
            
            <Text category="s2">Toll&Parking</Text>
            <Input
              style={styles.input}
              value={toll}
              size="small"
              placeholder="Toll & Parking"
              onChangeText={toll => this.setState({toll})}
            />
            
            <Text category="s2">Deposit</Text>
            <Input
              style={styles.input}
              value={deposit}
              size="small"
              placeholder="Deposit"
              onChangeText={deposit => this.setState({deposit})}
            />
            
            <Text category="s2">Insurance</Text>
            <Input
              style={styles.input}
              value={insurance}
              size="small"
              placeholder="Insurance"
              onChangeText={insurance => this.setState({insurance})}
            
            />
            <Button onPress={()=>{this.submitProduct()
         }}>Submit</Button>
          </Layout>
          <Layout style={{height:30}}></Layout>
        </ScrollView>
      </Layout>
    );
  }
}
const styles = StyleSheet.create({
  input: {
    margin: 8,
  }
});
