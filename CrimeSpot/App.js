import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  ActivityIndicator,
  PermissionsAndroid,
} from 'react-native';

import MapView from 'react-native-maps';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import BottomNavigation, {
  FullTab,
} from 'react-native-material-bottom-navigation';
import Geolocation from '@react-native-community/geolocation';
import {SearchBar} from 'react-native-elements';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

class MapScreen extends Component {
  state = {
    dangerPoints: [],
    theftPoints: [],
    parkingPoints: [],
    trafficPoints: [],
    userLatitude: '-37.3337',
    userLongitude: '-121.8907',
    userLocationFound: false,
    loading: true,
    activeTab: 'Danger',
    gotDanger: false,
    gotTheft: false,
    gotParking: false,
    gotTraffic: false,
    search: '',
  };

  updateSearch = search => {
    this.setState({search});
    RNGooglePlaces.openAutocompleteModal().then(place => {
      console.log(place);
    });
  };

  async requestUserLocation() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        Geolocation.getCurrentPosition(position => {
          const latitude = JSON.stringify(position.coords.latitude);
          const longitude = JSON.stringify(position.coords.longitude);
          this.setState({
            userLatitude: latitude,
            userLongitude: longitude,
            userLocationFound: true,
          });
          console.log(latitude);
          console.log(longitude);
        });
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn('jdlkafs');
    }
  }

  render() {
    console.disableYellowBox = true;
    const {search} = this.state;
    if (!this.state.userLocationFound) {
      this.requestUserLocation();
    }
    if (!this.state.gotDanger) {
      this.state.gotDanger = true;
      this.getDangerData();
    }
    if (this.state.loading) {
      return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (!this.state.userLocationFound) {
      // console.log("fdsl");
      return <ActivityIndicator size="large" color="#0000ff" />;
    }

    var points;

    if (this.state.activeTab == 'Danger') {
      points = this.state.dangerPoints;
    }
    if (this.state.activeTab == 'Theft') {
      points = this.state.theftPoints;
    }
    if (this.state.activeTab == 'Parking') {
      points = this.state.parkingPoints;
    }
    if (this.state.activeTab == 'Traffic') {
      points = this.state.trafficPoints;
    }

    return (
      <View style={styles.container}>
        <View style={styles.autoComplete}>
          <GooglePlacesAutocomplete
            placeholder="Search"
            minLength={2} // minimum length of text to search
            autoFocus={false}
            returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
            fetchDetails={true}
            listViewDisplayed="auto"
            onPress={(data, details = null) => {
              // 'details' is provided when fetchDetails = true
              console.log(data, details);
            }}
            getDefaultValue={() => {
              return '';
            }}
            query={{
              // available options: https://developers.google.com/places/web-service/autocomplete
              key: 'AIzaSyBso3KXLVMEbvaZXTUv8zwcSiqwNbSJpks',
              language: 'en', // language of the results
              types: '(cities)', // default: 'geocode'
            }}
            styles={{
              description: {
                fontWeight: 'bold',
              },
              textInputContainer: {
                width: '100%',
              },
            }}
            nearbyPlacesAPI="GooglePlacesSearch" // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
            GoogleReverseGeocodingQuery={
              {
                // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
              }
            }
            GooglePlacesSearchQuery={{
              // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
              rankby: 'distance',
              types: 'food',
            }}
            filterReverseGeocodingByTypes={[
              'locality',
              'administrative_area_level_3',
            ]} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
            enablePoweredByContainer={false}
            debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
          />
        </View>
        <MapView
          style={styles.container}
          initialRegion={{
            // 37.3337, -121.8907
            latitude: parseFloat(this.state.userLatitude),
            longitude: parseFloat(this.state.userLongitude),
            latitudeDelta: 0.19,
            longitudeDelta: 0.1121,
          }}>
          <MapView.Heatmap
            points={points}
            opacity={0.6}
            radius={15}
            maxIntensity={50}
            gradientSmoothing={15}
            heatmapMode={'POINTS_DENSITY'}
          />
        </MapView>
        <BottomNavigation
          onTabPress={this.handleTabPress}
          renderTab={this.renderTab}
          tabs={this.tabs}
          activeTab={this.state.activeTab}
        />
      </View>
    );
  }
  async getDangerData() {
    try {
      this.setState({loading: true});
      const response = await fetch('https://crimespot.herokuapp.com/danger');
      const crimeData = await response.json();
      this.setState({dangerPoints: crimeData, loading: false, gotDanger: true});
      console.log('got danger');
    } catch (e) {
      console.log('Error', e.message);
    }
  }
  async getTheftData() {
    try {
      this.setState({loading: true});
      const response = await fetch('https://crimespot.herokuapp.com/theft');
      const crimeData = await response.json();
      this.setState({theftPoints: crimeData, loading: false, gotTheft: true});
      console.log('loaded theft data');
    } catch (e) {
      console.log('Error', e.message);
    }
  }
  async getParkingData() {
    try {
      this.setState({loading: true});
      const response = await fetch(
        'https://crimespot.herokuapp.com/parkingviolations',
      );
      const crimeData = await response.json();
      this.setState({
        parkingPoints: crimeData,
        loading: false,
        gotParking: true,
      });
      console.log('loaded parking data');
    } catch (e) {
      console.log('Error', e.message);
    }
  }
  async getTrafficData() {
    try {
      this.setState({loading: true});
      const response = await fetch('https://crimespot.herokuapp.com/traffic');
      const crimeData = await response.json();
      this.setState({
        trafficPoints: crimeData,
        loading: false,
        gotTraffic: true,
      });
      console.log('loaded traffic data');
    } catch (e) {
      console.log('Error', e.message);
    }
  }

  handleTabPress = (newTab, oldTab) => {
    this.setState({activeTab: newTab.key});
    if (newTab.key == 'Theft' && !this.state.gotTheft) {
      this.getTheftData();
    }
    if (newTab.key == 'Parking' && !this.state.gotParking) {
      this.getParkingData();
    }
    if (newTab.key == 'Traffic' && !this.state.gotTraffic) {
      this.getTrafficData();
    }
  };

  tabs = [
    {
      key: 'Danger',
      icon: 'exclamation',
      label: 'Danger',
      barColor: '#B71C1C',
      pressColor: 'rgba(255, 255, 255, 0.16)',
    },
    {
      key: 'Theft',
      icon: 'wallet',
      label: 'Theft',
      barColor: '#E64A19',
      pressColor: 'rgba(255, 255, 255, 0.16)',
    },
    {
      key: 'Traffic',
      icon: 'car',
      label: 'Traffic Tickets',
      barColor: '#218fde',
      pressColor: 'rgba(255, 255, 255, 0.16)',
    },
    {
      key: 'Parking',
      icon: 'parking',
      label: 'Parking Tickets',
      barColor: '#388E3C',
      pressColor: 'rgba(255, 255, 255, 0.16)',
    },
  ];

  renderIcon = icon => ({isActive}) => (
    <FontAwesome5 size={24} color="white" name={icon} />
  );

  renderTab = ({tab, isActive}) => (
    <FullTab
      isActive={isActive}
      key={tab.key}
      label={tab.label}
      renderIcon={this.renderIcon(tab.icon)}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  autoComplete: {
    flex: 1,
  },
});
export default MapScreen;
