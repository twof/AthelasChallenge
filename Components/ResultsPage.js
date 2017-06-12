/*jshint esversion: 6 */
'use strict';

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
} from 'react-native';
import Chart from 'react-native-chart';

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
    chart: {
		width: 200,
		height: 200,
	},
});


class ResultsPage extends Component {
    render() {
        var results = this.props.results;
        var firstResult = results[results.length-1];

        var wbcFeeling = (firstResult.wbc_range === "Normal Range") ? "😁" : "😧";

        return (
            <View style={styles.container}>
                <Text style={styles.description}>White Blood Cell Count: {firstResult.wbc_count}</Text>
                <Text style={styles.description}>Range: {wbcFeeling}</Text>
            </View>
        );
    }
}

// Sample
// {
//   "blur": 0,
//   "created_at": "Fri, 09 Jun 2017 03:08:09 GMT",
//   "dark": 0,
//   "lymphocytes": "0%",
//   "neutrophils": "0%",
//   "platelet_count": 0,
//   "platelet_range": "Normal Range",
//   "status": 1,
//   "updated_at": "Fri, 09 Jun 2017 03:13:01 GMT",
//   "wbc_count": 4,
//   "wbc_range": "Normal Range"
// }


module.exports = ResultsPage;
