import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  ActivityIndicator
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import MapView from 'react-native-maps';
import { createBottomTabNavigator, createAppContainer} from 'react-navigation';  
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';  
import Icon from 'react-native-vector-icons/FontAwesome5';  


class Danger extends Component {

  state = {
    points: [],
    loading: true,
    gettingData: false
  }

  render() {
    if(!this.state.gettingData)
    {
      this.getData();
    }
    if(this.state.loading)
    {
      return (<ActivityIndicator size="large" color="#0000ff" />)
    }
    const {points, loading} = this.state;
    console.log(points)
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 37.3337,
            longitude: -121.8907,
            latitudeDelta: 0.19,
            longitudeDelta: 0.1121
          }}
        >
        <MapView.Heatmap 
            points={points}
            opacity={0.6}
            radius={15}
            maxIntensity={50}
            gradientSmoothing={15}
            heatmapMode={"POINTS_DENSITY"}/> 
        </MapView>
      </View>
      );
  }
  async getData()
  {
    try
    {
      const response = await fetch('https://crimespot.herokuapp.com/danger');
      const crimeData =  await response.json();
      this.setState({points: crimeData, loading: false, gettingData: true});
      console.log("loading set to false");
      
    }
    catch(e) {
      console.log('Error', e.message);  
    } 
  }
}

class Theft extends Component {

  state = {
    points: [],
    loading: true,
    gettingData: false
  }

  render() {
    if(!this.state.gettingData)
    {
      this.getData();
    }
    if(this.state.loading)
    {
      return (<ActivityIndicator size="large" color="#0000ff" />)
    }
    const {points, loading} = this.state;
    console.log(points)
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 37.3337,
            longitude: -121.8907,
            latitudeDelta: 0.19,
            longitudeDelta: 0.1121
          }}
        >
        <MapView.Heatmap 
            points={points}
            opacity={0.6}
            radius={15}
            maxIntensity={50}
            gradientSmoothing={15}
            heatmapMode={"POINTS_DENSITY"}/> 
        </MapView>
      </View>
      );
  }
  async getData()
  {
    try
    {
      const response = await fetch('https://crimespot.herokuapp.com/theft');
      const crimeData =  await response.json();
      this.setState({points: crimeData, loading: false, gettingData: true});
      console.log("loading set to false");
      
    }
    catch(e) {
      console.log('Error', e.message);  
    } 
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

const TabNavigator = createMaterialBottomTabNavigator(  
  {  
      Home: { screen: Danger,  
          navigationOptions:{  
              tabBarLabel:'Danger',  
              tabBarIcon: ({ tintColor }) => (  
                  <View>  
                      <Icon style={[{color: tintColor}]} size={25} name={'exclamation'}/>  
                  </View>),  
          }  
      },  
      Profile: { screen: Theft,  
          navigationOptions:{  
              tabBarLabel:'Theft',  
              tabBarIcon: ({ tintColor }) => (  
                  <View>  
                      <Icon style={[{color: tintColor}]} size={25} name={'exclamation'}/>  
                  </View>),  
              activeColor: '#f60c0d',  
              inactiveColor: '#f65a22',  
              barStyle: { backgroundColor: '#f69b31' },  
          }  
      },  
      Image: { screen: Danger,  
          navigationOptions:{  
              tabBarLabel:'Traffic Tickets',  
              tabBarIcon: ({ tintColor }) => (  
                  <View>  
                      <Icon style={[{color: tintColor}]} size={25} name={'exclamation'}/>  
                  </View>),  
              activeColor: '#615af6',  
              inactiveColor: '#46f6d7',  
              barStyle: { backgroundColor: '#67baf6' },  
          }  
      },  
      Cart: {  
          screen: Danger,  
          navigationOptions:{  
              tabBarLabel:'Parking Violations',  
              tabBarIcon: ({ tintColor }) => (  
                  <View>  
                      <Icon style={[{color: tintColor}]} size={25} name={'exclamation'}/>  
                  </View>),  
          }  
      },  
  },  
  {  
    initialRouteName: "Home",  
    activeColor: '#f0edf6',  
    inactiveColor: '#226557',  
    barStyle: { backgroundColor: '#3BAD87' },  
  },  
);  

export default createAppContainer(TabNavigator);  

