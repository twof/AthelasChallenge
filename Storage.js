/*jshint esversion: 6 */
'use strict';

import {AsyncStorage} from 'react-native';

class Storage {

    // Completion returns after resultsCache is updated
    // completion(error)
    // Holding a cache so we don't have to go through the trouble of getting from
    //      AsyncStorage every time we want to append a new result
    // In an ideal world, we'd store this data locally, but also keep it in the
    //      cloud under the user's account or something. Don't want all the
    //      user's medical reccords lost if something happens to their phone
    constructor(completion) {
        this._RESULTS_KEY = 'RESULTS';
        this._resultsCache = [];
        const _this = this;

        AsyncStorage.getItem(this._RESULTS_KEY, (error, currentResult) =>  {
            if(error) {
                completion(error);
            }else{
                // If this the first access to local storage, start with an empty array
                // This array will be filled with a results list
                _this.resultsCache = (currentResult === null) ? [] : JSON.parse(currentResult);
                completion(null);
            }
        });
    }

    appendResult(resultToAppend, completion) {
        const _this = this;
        var newResult = this._resultsCache;

        newResult.push(resultToAppend);
        this._resultsCache = newResult;

        AsyncStorage.setItem(this._RESULTS_KEY, JSON.stringify(newResult), (error) => {
            if(error) {
                _this.console.log(error);
                completion(error, null);
            }else{
                completion(null, newResult);
            }
        });
    }

    getResultList() {
        return this._resultsCache;
    }

    clearResultsStore(completion) {
        const _this = this;
        this._resultsCache = [];

        AsyncStorage.setItem(this._RESULTS_KEY, JSON.stringify(this._resultsCache), (error) => {
            if(error) {
                _this.console.log(error);
                completion(error, null);
            }else{
                completion(null, _this._resultsCache);
            }
        });
    }
}

module.exports = Storage;
