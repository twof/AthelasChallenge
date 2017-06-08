/*jshint esversion: 6 */
'use strict';

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableHighlight,
    ActivityIndicator,
    Image
} from 'react-native';

var styles = StyleSheet.create({
    container: {
        padding: 30,
        marginTop: 65,
        alignItems: 'center'
    },
    button: {
        height: 36,
        flexDirection: 'row',
        backgroundColor: '#48BBEC',
        borderColor: '#48BBEC',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        alignSelf: 'stretch',
        justifyContent: 'center'
    },
});


class PollingPage extends Component {
    constructor(props) {
        super(props);
        this.state = {isLoading: false};
    }

    render() {
        var spinner = this.state.isLoading ?
            (<ActivityIndicator size='large'/>) :
            (<View/>);

        return (
            <TouchableHighlight underlayColor='#99d9f4' style={styles.locationButton}>
                <Text style={styles.buttonText}>Location</Text>
            </TouchableHighlight>
        );
    }
}

module.exports = PollingPage;
