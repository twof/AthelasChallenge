/*jshint esversion: 6 */
'use strict';

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    processColor,
} from 'react-native';
import {LineChart} from 'react-native-charts-wrapper';

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

        const wbcCounts = results.map((res, index) => [index, res.wbc_count]);
        var firstResult = results[results.length-1];

        var wbcFeeling = (firstResult.wbc_range === "Normal Range") ? "😁" : "😧";

        var data = {
            dataSets: [{
                values: [{y: 100}, {y: 110}, {y: 105}, {y: 115}],
                label: 'Company X',
                config: {
                    lineWidth: 2,
                    drawCircles: false,
                    highlightColor: processColor('red'),
                    color: processColor('red'),
                    drawFilled: true,
                    fillColor: processColor('red'),
                    fillAlpha: 60,
                    valueTextSize: 15,
                    valueFormatter: "##.000",
                    dashedLine: {
                        lineLength: 20,
                        spaceLength: 20
                    }
                }
            }, {
                values: [{y: 90}, {y: 130}, {y: 100}, {y: 105}],
                label: 'Company Y',
                config: {
                    lineWidth: 1,
                    drawCubicIntensity: 0.4,
                    circleRadius: 5,
                    drawHighlightIndicators: false,
                    color: processColor('blue'),
                    drawFilled: true,
                    fillColor: processColor('blue'),
                    fillAlpha: 45,
                    circleColor: processColor('blue')
                }
            }, {
                values: [{y: 110}, {y: 105}, {y: 115}, {y: 110}],
                label: 'Company Dashed',
                config: {
                    color: processColor('green'),
                    drawFilled: true,
                    fillColor: processColor('green'),
                    fillAlpha: 50
                }
            }],
        };

        var xAxis = {
            valueFormatter: ['Q1', 'Q2', 'Q3', 'Q4']
        };

        var legend = {
            enabled: true,
            textColor: processColor('blue'),
            textSize: 12,
            position: 'BELOW_CHART_RIGHT',
            form: 'SQUARE',
            formSize: 14,
            xEntrySpace: 10,
            yEntrySpace: 5,
            formToTextSpace: 5,
            wordWrapEnabled: true,
            maxSizePercent: 0.5,
            custom: {
                colors: [processColor('red'), processColor('blue'), processColor('green')],
                labels: ['Company X', 'Company Y', 'Company Dashed']
            }
        };

        var marker = {
            enabled: true,
            backgroundTint: processColor('teal'),
            markerColor: processColor('#F0C0FF8C'),
            textColor: processColor('white'),
        };

        return (
            <View style={styles.container}>
                <LineChart
                    style={styles.chart}
                    data={data}
                    description={{text: ''}}
                    legend={legend}
                    marker={marker}
                    xAxis={xAxis}
                    drawGridBackground={false}
                    borderColor={processColor('teal')}
                    borderWidth={1}
                    drawBorders={true}

                    touchEnabled={true}
                    dragEnabled={true}
                    scaleEnabled={true}
                    scaleXEnabled={true}
                    scaleYEnabled={true}
                    pinchZoom={true}
                    doubleTapToZoomEnabled={true}

                    dragDecelerationEnabled={true}
                    dragDecelerationFrictionCoef={0.99}

                    keepPositionOnRotation={false}
                />
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
