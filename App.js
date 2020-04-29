import 'react-native-gesture-handler';

import React, { Component } from 'react';
import { StatusBar, Platform, View } from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Constants  from 'expo-constants'


import DeckList from './components/DeckList'
import { white, purple } from './utils/colors'
import middleware from './middleware'
import reducer from './reducers'
import NewDeck from './components/NewDeck'
import DeckView from './components/DeckView'
import AddCard from './components/AddCard'
import Quiz from './components/Quiz'
import { setLocalNotification } from './utils/helper'


function FlashcardStatusBar ({backgroundColor, ...props}){
  return (
    <View style={{backgroundColor, height: Constants.statusBarHeight}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

// Config for TabNav
const RouteConfigs = {
  DeckList:{
    name: "Decks",
    component: DeckList,
    options: {tabBarIcon: ({tintColor}) => <Ionicons name='ios-bookmarks' size={30} color={tintColor} />, title: 'Decks'}
  }, 
  NewDeck:{
    component: NewDeck,
    name: "New Deck",
    options: {tabBarIcon: ({tintColor}) => <FontAwesome name='plus-square' size={30} color={tintColor} />, title: 'New Deck'}
  }
}

const TabNavigatorConfig = {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === "ios" ? purple : white,
    style: {
      height: 56,
      backgroundColor: Platform.OS === "ios" ? white : purple,
      shadowColor: "rgba(0, 0, 0, 0.24)",
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
  };

const Tab = Platform.OS === 'ios'
  ? createBottomTabNavigator() 
  : createMaterialTopTabNavigator()

const TabNav = () =>(
  <Tab.Navigator {...TabNavigatorConfig}>
    <Tab.Screen {...RouteConfigs['DeckList']} />
    <Tab.Screen {...RouteConfigs['NewDeck']} />
  </Tab.Navigator>
)

// Config for StackNav
const StackNavigatorConfig = {
  headerMode: "screen"
}
const StackConfig = {
  TabNav:{
    name: "Home",
    component: TabNav,
    options: {headerShown: false}
  }, 
  DeckView:{
    name: "DeckView",
    component: DeckView,
    options: {
      headerTintColor: white,
      headerStyle:{
        backgroundColor: purple
      },
      //headerTitleAlign: 'center',
      title: 'Deck View'
    }
  },
  AddCard:{
    name: "AddCard",
    component: AddCard,
    options: {
      headerTintColor: white,
      headerStyle:{
        backgroundColor: purple
      }
    }
  },
  Quiz:{
    name: "Quiz",
    component: Quiz,
    options: {
      headerTintColor: white,
      headerStyle:{
        backgroundColor: purple
      }
    }
  }
}
const Stack = createStackNavigator();
const MainNav = () =>(
  <Stack.Navigator {...StackNavigatorConfig}>
    <Stack.Screen {...StackConfig['TabNav']} />
    <Stack.Screen {...StackConfig['DeckView']} />
    <Stack.Screen {...StackConfig['AddCard']} />
    <Stack.Screen {...StackConfig['Quiz']} />
  </Stack.Navigator>
)


// App
export default class App extends Component {
  componentDidMount(){
    setLocalNotification()
  }
  render(){
    const store = createStore(reducer, middleware)

    return (
      <Provider store = {store}>
        <View style={{flex: 1}}>
        <FlashcardStatusBar backgroundColor={purple} barStyle='light-content' />
        <NavigationContainer>
          <MainNav />
        </NavigationContainer>
        </View>
      </Provider>
    );
  }
}
