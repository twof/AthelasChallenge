/*jshint esversion: 6 */
'use strict';

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    ActivityIndicator,
} from 'react-native';
import Config from 'react-native-config';

var ResultsPage = require('./ResultsPage');

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
    description: {
        marginBottom: 20,
        fontSize: 18,
        textAlign: 'center',
        color: '#656565'
    },
});

// The following two fuctions are set up for later extension
function urlForStartingJob(deviceID) {
    return 'https://api.athelas.com/devices/' + deviceID + '/start';
}

function urlForPollingJob(jobID) {
    return 'https://api.athelas.com/jobs/' + jobID + '/poll';
}

class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {isLoading: false, message: '', isPolling: false};
    }

    goToResultsPage(results) {
        console.log('At results page', results);
        // Send results to local storage before
        this.setState({isLoading: false, isPolling: false}, () => {
            this.props.navigator.push({
                title: 'Results',
                component: ResultsPage,
                passProps: {results: results}
            });
        });
    }

    _beginPolling(jobID) {
        var _this = this;
        this.setState({isLoading: true, isPolling: true}, () => {
            var query = urlForPollingJob(jobID);

            _this.pollingIntervalID = setInterval(() => {
                if(_this.state.isPolling === true) {
                    _this._pollJob(query);
                }
            }, 1000);
        });
    }

    _handleStartJobResponse(response) {
        console.log("resp", response);
        return new Promise((resolve, reject) => {
            if(response.status === 1) {
                this.setState({isLoading: false});
                resolve(response);
            }else{
                reject();
            }
        });
    }

    _pollJob(query) {
        fetch(query)
            .then(response => response.json())
            .then(json => this._handleStartJobResponse(json))
            .then(response => this.goToResultsPage(response),
             () => this.setState({message: 'Polling not over'}))
            .catch(error =>
                this.setState({
                    isLoading: false,
                    message: 'Something bad happened in polling ' + error
            }));
    }

    _startJob(query) {
        this.setState({isLoading: true}, () => {
            fetch(query)
                .then(response => {
                    return response;
                })
                .then(response => {
                    return response.json();
                })
                .then(json => {
                    return this._handleStartJobResponse(json);
                })
                .then(response => this._beginPolling(response.job_id),
                 () => this.setState({message: 'There was an error starting your job'}))
                .catch(error =>
                    this.setState({
                        isLoading: false,
                        message: 'Something bad happened in start job ' + error + error.lineNumber
                }));
        });
    }

    onGetDataButtonPressed() {
        var query = urlForStartingJob(Config.DEVICE_ID);
        this._startJob(query);
    }

    render() {
        // console.log(this.state.message);
        var spinner = this.state.isLoading ?
            (<ActivityIndicator size='large'/>) :
            (<View/>);

        return (
            <View style={styles.container}>
                <TouchableHighlight underlayColor='#99d9f4' style={styles.button} onPress={this.onGetDataButtonPressed.bind(this)}>
                    <Text style={styles.buttonText}>Get Test Data</Text>
                </TouchableHighlight>
                {spinner}
                <Text style={styles.description}>{this.state.message}</Text>
            </View>
        );
    }
}

module.exports = MainPage;
