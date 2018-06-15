import React from 'react';
import List from './src/components/List';
import { StyleSheet, Text, View, Animated } from 'react-native';
import {
  PanGestureHandler,
  ScrollView,
  State
} from 'react-native-gesture-handler';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
// import Config from './config.json';

// const url = `${Config.baseUrl}/spaces/${Config.spaceId}/environments/${
//   Config.environmentId
// }/entries?access_token=${Config.accessToken}&content_type=recipe`;

class SneakySquare extends React.Component {
  translateX = new Animated.Value(0);
  translateY = new Animated.Value(0);
  lastOffset = { x: 0, y: 0 };
  onGestureEvent = Animated.event(
    [
      {
        nativeEvent: {
          translationX: this.translateX,
          translationY: this.translateY
        }
      }
    ],
    { useNativeDriver: true }
  );

  onHandlerStateChange = event => {
    if ((event.nativeEvent.oldState = State.ACTIVE)) {
      this.lastOffset.x += event.nativeEvent.translationX;
      this.lastOffset.y += event.nativeEvent.translationY;
      this.translateX.setOffset(this.lastOffset.x);
      this.translateX.setValue(0);
      this.translateY.setOffset(this.lastOffset.y);
      this.translateY.setValue(0);
    }
  };

  render() {
    return (
      <PanGestureHandler
        {...this.props}
        onGestureEvent={this.onGestureEvent}
        onHandlerStateChange={this.onHandlerStateChange}
        id="dragbox"
      >
        <Animated.View
          style={[
            { backgroundColor: 'red', height: 50, width: 50 },
            {
              transform: [
                { translateX: this.translateX },
                { translateY: this.translateY }
              ]
            }
          ]}
        />
      </PanGestureHandler>
    );
  }
}
export default class App extends React.Component {
  state = {
    items: []
  };

  componentDidMount() {
    //   return fetch(url)
    //     .then(response => response.json())
    //     .then(responseJson => {
    //       this.setState(
    //         {
    //           isLoading: false,
    //           items: responseJson.items
    //         },
    //         function() {}
    //       );
    //     })
    //     .catch(error => {
    //       console.error(error);
    //     });
  }

  render() {
    return (
      <View style={styles.container}>
        <SneakySquare minDist={30} />
        <List items={this.state.items} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
