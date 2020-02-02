import { ApplicationProvider, Layout, Text } from '@ui-kitten/components';
import { mapping, light as lightTheme } from '@eva-design/eva';
import React,{Component} from 'react';
import {createAppContainer,createSwitchNavigator} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Home from './Screens/Home'
import History from './Screens/History'
import Detail from './Screens/Detail'
import AddProduct from './Screens/addProduct'
import EditProduct from './Screens/editProduct'
import Register from './Screens/Register'
import Login from './Screens/Login'
import SplashScreen from './Screens/SplashScreen'
const UserNavigator = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
     
      tabBarVisible: false,
      headerShown: false,
    },
  },
  Register: {
    screen: Register,
    navigationOptions: {
      tabBarVisible: false,
      headerShown: false,

    },
  },
})

const AppStack= createStackNavigator({
  Home :{
    screen:Home,
    navigationOptions: {
      headerShown: false
    }},
    Detail:{
      screen:Detail,
      
    },
    EditProduct:{
      screen:EditProduct,
      
    }
  
  
})
const HistoryStack= createStackNavigator({
  History :{
    screen:History,
    navigationOptions: {
      headerShown: false
    }
  }

})
const productStack= createStackNavigator({
  AddProduct :{
    screen:AddProduct,
    navigationOptions: {
      headerShown: false
    }
  }

})


const BottomNavigator = createBottomTabNavigator(
  {
    AppStack: {
      screen: AppStack,
      navigationOptions: {
        tabBarLabel: 'Home',
        tabBarIcon: ({tintColor}) => (
          <Icon
           
            name="home"
            style={{color: tintColor, fontSize: 30}}
          />
        ),
      },
    },
        History: {
      screen: HistoryStack,
      navigationOptions: {
        tabBarLabel: 'History',
        tabBarIcon: ({tintColor}) => (
          <Icon
           
            name="history"
            style={{color: tintColor, fontSize: 30}}
          />
        ),
      },
    },
    AddProduct: {
    screen: productStack,
    navigationOptions: {
      tabBarLabel: 'addProduct',
      tabBarIcon: ({tintColor}) => (
        <Icon
         
          name="cart-arrow-up"
          style={{color: tintColor, fontSize: 30}}
        />
      ),
    },
  }
},
  {
    tabBarOptions: {
      activeTintColor: '#059dab',
      inactiveTintColor: '#757575',
      style: {
        backgroundColor: 'white',
        borderTopWidth: 0,
        shadowOffset: {width: 5, height: 3},
        shadowColor: 'black',
        shadowOpacity: 1,
        elevation: 5,
      },
    },
  },
)



const switchScreen = createSwitchNavigator({
  Splash: SplashScreen,
  AuthScreen: UserNavigator,
  App: BottomNavigator,
});


const SwitchScreen = createAppContainer(switchScreen)

class App extends Component{
  render(){
    return(
      <ApplicationProvider
      mapping={mapping}
      theme={lightTheme}>
 <SwitchScreen/>
     </ApplicationProvider>
     
    
    )
  }
}
export default App

// const DetailStack=createStackNavigator({
//   Detail:{
//     screen:Detail,
    
//   },
//   EditProduct:{
//     screen:EditProduct,
    
//   }
// })