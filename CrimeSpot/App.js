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
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';  
import BottomNavigation, {
  FullTab
} from 'react-native-material-bottom-navigation'


class MapScreen extends Component {

  state = {
    dangerPoints: [],
    theftPoints:[],
    parkingPoints: [],
    loading: true,
    activeTab: 'Danger',
    gotDanger: false,
    gotTheft: false,
    gotParking: false
  }

  render() {
    if(!this.state.gotDanger)
    {
      this.state.gotDanger = true;
      this.getDangerData();
    }
    if(this.state.loading)
    {
      return (<ActivityIndicator size="large" color="#0000ff" />)
    }

    var points;
    if(this.state.activeTab == 'Danger')
    {
      points = this.state.dangerPoints;
    }
    if(this.state.activeTab == 'Theft')
    {
      points = this.state.theftPoints;
    }
    if(this.state.activeTab == 'Parking')
    {
      points = this.state.parkingPoints;
    }
    
    // console.log(points)
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
        <BottomNavigation
          onTabPress={this.handleTabPress}
          renderTab={this.renderTab}
          tabs={this.tabs}
          activeTab = {this.state.activeTab}
        />
      </View>
      );
  }
  async getDangerData()
  {
    try
    {
      this.setState({loading: true});
      const response = await fetch('https://crimespot.herokuapp.com/danger');
      const crimeData =  await response.json();
      this.setState({dangerPoints: crimeData, loading: false, gotDanger: true});
      console.log("got danger");
    }
    catch(e) {
      console.log('Error', e.message);  
    } 
  }
  async getTheftData()
  {
    try
    {
      this.setState({loading: true});
      const response = await fetch('https://crimespot.herokuapp.com/theft');
      const crimeData =  await response.json();
      this.setState({theftPoints: crimeData, loading: false, gotTheft: true});
      console.log("loaded theft data");
      
    }
    catch(e) {
      console.log('Error', e.message);  
    } 
  }
  async getParkingData()
  {
    try
    {
      this.setState({loading: true});
      const response = await fetch('https://crimespot.herokuapp.com/parkingviolations');
      const crimeData =  await response.json();
      this.setState({parkingPoints: crimeData, loading: false, gotParking: true});
      console.log("loaded parking data");
      
    }
    catch(e) {
      console.log('Error', e.message);  
    } 
  }


  handleTabPress = (newTab, oldTab) => {
    this.setState({activeTab: newTab.key})
    if(newTab.key == 'Theft' && !this.state.gotTheft)
    {
      this.getTheftData();
    }
    if(newTab.key == 'Parking' && !this.state.gotParking)
    {
      this.getParkingData();
    }
  }

  tabs = [
    {
      key: 'Danger',
      icon: 'exclamation',
      label: 'Danger',
      barColor: '#388E3C',
      pressColor: 'rgba(255, 255, 255, 0.16)'
    },
    {
      key: 'Theft',
      icon: 'wallet',
      label: 'Theft',
      barColor: '#B71C1C',
      pressColor: 'rgba(255, 255, 255, 0.16)'
    },
    {
      key: 'Parking',
      icon: 'parking',
      label: 'Parking Violations',
      barColor: '#E64A19',
      pressColor: 'rgba(255, 255, 255, 0.16)'
    }
  ]

  renderIcon = icon => ({ isActive }) => (
    <FontAwesome5 size={24} color="white" name={icon} />
  )

  renderTab = ({ tab, isActive }) => (
    <FullTab
      isActive={isActive}
      key={tab.key}
      label={tab.label}
      renderIcon={this.renderIcon(tab.icon)}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});
export default MapScreen;  

