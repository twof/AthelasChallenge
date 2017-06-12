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
var Storage = require('../Helpers/Storage');

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

    _goToResultsPage(results) {
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

    _addResultToLocalStorage(result) {
        const _this = this;
        return new Promise((resolve, reject) => {
            _this.resultStore.appendResult(result, (error, allResults) => {
                if(error){
                    reject(error);
                }else{
                    resolve(allResults);
                }
            });
        });
    }

    _beginPolling(jobID) {
        var _this = this;
        jobID = 2521;

        this.setState({isLoading: true, isPolling: true}, () => {
            var query = urlForPollingJob(jobID);

            _this.pollingIntervalID = setInterval(() => {
                if(_this.state.isPolling === true) {
                    _this._pollJob(query);
                }else{
                    clearInterval(_this.pollingIntervalID);
                }
            }, 1000);
        });
    }

    _handleStartJobResponse(response) {
        console.log("resp", response);
        return new Promise((resolve, reject) => {
            if(response.status === 1) {
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
            .then(response => this._addResultToLocalStorage(response),
                () => Promise.reject())
            .then(allResults => this._goToResultsPage(allResults),
                (error) => this.setState({message: 'Polling not over ' + error}))
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
                    console.log(response);
                    return response.json();
                })
                .then(json => {
                    console.log(json);
                    return this._handleStartJobResponse(json);
                })
                .catch(err => {console.log(error);})
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
        // don't start polling a job again if we already are
        if(!this.state.isLoading) {
            var query = urlForStartingJob(Config.DEVICE_ID);

            // Init storage for later use
            this.resultStore = new Storage((error) => {
                if(error) {
                    console.log(error);
                }else{
                    this._startJob(query);
                }
            });
        }
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
