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
    console.log("getting data");
    try
    {
      const response = await fetch('https://crimespot.herokuapp.com/parkingviolations');
      const crimeData =  await response.json();
      this.setState({points: crimeData, loading: false, gettingData: true});
      console.log("loading set to false");
      return(response);
    }
    catch(e) {
      console.error('Error', e.message);
      return res.render('error_message');
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

export default App;
