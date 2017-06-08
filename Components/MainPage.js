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
    buttonText: {
        fontSize: 18,
        color: 'white',
        alignSelf: 'center'
    },
});

// The following two fuctions are set up for later extension
function urlForStartingJob(deviceID) {
    return 'http://api.athelas.com/devices/' + deviceID + '/start';
}

function urlForPollingJob(jobID) {
    return 'http://api.athelas.com/jobs/' + jobID + '/poll';
}

class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {isLoading: false};
    }

    _handleResponse(response) {
        this.setState({isLoading: false});

        if(response.application_response_code.substr(0, 1) == '1') {
            this.props.navigator.push({
                title: 'Results',
                component: SearchResults,
                passProps: {listings: response.listings}
            });
        }else{
            this.setState({message: 'Location not recongnized; please try again'});
        }
    }

    _executeQuery(query) {
        this.setState({isLoading: true}, () => {
            fetch(query)
                .then(response => response.json())
                .then(json => this._handleResponse(json.response))
                .catch(error =>
                    this.setState({
                        isLoading: false,
                        message: 'Something bad happened ' + error
                }));
        });
    }

    onGetDataButtonPressed() {

    }

    render() {
        var spinner = this.state.isLoading ?
            (<ActivityIndicator size='large'/>) :
            (<View/>);

        return (
            <View style={styles.container}>
                <TouchableHighlight underlayColor='#99d9f4' style={styles.button} onPress={this.onGetDataButtonPressed.bind(this)}>
                    <Text style={styles.buttonText}>Get Test Data</Text>
                </TouchableHighlight>
                {spinner}
            </View>
        );
    }
}

module.exports = MainPage;
