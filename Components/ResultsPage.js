/*jshint esversion: 6 */
'use strict';

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
} from 'react-native';

var styles = StyleSheet.create({
    container: {
        padding: 30,
        marginTop: 65,
        alignItems: 'center'
    },
    description: {
        marginBottom: 20,
        fontSize: 18,
        textAlign: 'center',
        color: '#656565'
    },
});


class ResultsPage extends Component {
    render() {
        return (
            <Text style={styles.description}>{this.props.results}</Text>
        );
    }
}


module.exports = ResultsPage;
