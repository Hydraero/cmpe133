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

class App extends Component {

  state = {
    points: [],
    loading: true
  }

  render() {
    
    this.getData();
    const {points, loading} = this.state;
    console.log(points)
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 37.3337,
            longitude: -121.8907,
            latitudeDelta: 0.09,
            longitudeDelta: 0.0121
          }}
        >
        <MapView.Heatmap 
            points={points}
            opacity={1}
            radius={50}
            maxIntensity={100}
            gradientSmoothing={10}
            heatmapMode={"POINTS_DENSITY"}/> 
        </MapView>
      </View>
      );
  }
  async getData()
  {
    const response = await fetch('http://10.250.27.147:3000/CrimeData');  //change this IP to your internal IP address
    const crimeData =  await response.json();
    this.setState({points: crimeData, loading: false});
    console.log("loading set to false");
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

export default App;
