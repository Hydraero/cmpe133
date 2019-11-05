/**
 * @format
 */

import {AppRegistry} from 'react-native';
import createAppContainer from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => createAppContainer);
