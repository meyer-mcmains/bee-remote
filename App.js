import React from 'react';
import { Image, View, YellowBox } from 'react-native';
import { AppLoading, SplashScreen } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import Main from './src';

YellowBox.ignoreWarnings(['Expected style']);

export default class App extends React.Component {
  state = {
    isAppReady: false,
    isSplashReady: false
  };

  async componentDidMount() {
    await Font.loadAsync({
      lobster: require('./assets/fonts/Lobster-Regular.ttf'),
      'roboto-black': require('./assets/fonts/Roboto-Black.ttf')
    });
  }

  render() {
    if (!this.state.isSplashReady) {
      return (
        <AppLoading
          startAsync={this._cacheSplashResourcesAsync}
          onFinish={() => this.setState({ isSplashReady: true })}
          onError={console.warn}
          autoHideSplash={false}
        />
      );
    }

    if (!this.state.isAppReady) {
      return (
        <View style={{ flex: 1 }}>
          <Image
            source={require('./assets/splash.png')}
            onLoad={this._cacheResourcesAsync}
          />
        </View>
      );
    }

    return <Main />;
  }

  _cacheSplashResourcesAsync = async () => {
    const gif = require('./assets/splash.png');
    return Asset.fromModule(gif).downloadAsync();
  };

  _cacheResourcesAsync = async () => {
    SplashScreen.hide();
    const images = [require('./assets/icon.png'), require('./assets/icon.png')];

    const cacheImages = images.map(image => {
      return Asset.fromModule(image).downloadAsync();
    });

    await Promise.all(cacheImages);
    this.setState({ isAppReady: true });
  };
}
