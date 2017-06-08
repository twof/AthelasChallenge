/*jshint esversion: 6 */
'use strict';

import React, { Component } from 'react';
import {
  AppRegistry,
  NavigatorIOS,
  StyleSheet
} from 'react-native';

var MainPage = require('./Components/MainPage');

var styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

class AthelasApp extends React.Component {
    render() {
        return (
            <NavigatorIOS
            style={styles.container}
            initialRoute={{
              title: 'Athelas',
              component: MainPage,
            }}/>
        );
    }
}

AppRegistry.registerComponent('AthelasProject', function() {return AthelasApp});
