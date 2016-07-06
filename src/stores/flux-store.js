"use strict";

import AppDispatcher from "../dispatchers/app-dispatchers.js";
import { ActionConstants } from "../constants/app-constants";
import EventEmitter from "events";

class FluxStore extends EventEmitter {

    constructor () {
        super();
    }

    emitChange (changeType) {
        this.emit(changeType);
    }
    
    addChangeListener (changeType, callback) {
        this.on(changeType, callback);
    }

    removeChangeListener (changeType, callback) {
        this.removeListener(changeType, callback);
    }

}

FluxStore.dispatchToken = null;

export default FluxStore;
