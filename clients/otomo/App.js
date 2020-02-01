import { ApplicationProvider, Layout, Text } from '@ui-kitten/components';
import { mapping, light as lightTheme } from '@eva-design/eva';
import React,{Component} from 'react';
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Home from './Screens/Home'
import History from './Screens/History'
import Detail from './Screens/Detail'


const AppStack= createStackNavigator({
  Home :{
    screen:Home,
    navigationOptions: {
      headerShown: false
    }},
    Detail:{
      screen:Detail,
      
    }
  
  
})
const HistoryStack= createStackNavigator({
  Maps :{
    screen:History,
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




const SwitchScreen = createAppContainer(BottomNavigator)

class App extends Component{
  render(){
    return(
      <ApplicationProvider
      mapping={mapping}
      theme={lightTheme}>
 < SwitchScreen />
     </ApplicationProvider>
     
    
    )
  }
}
export default App