"use strict";

import AppDispatcher from "../dispatchers/app-dispatchers.js";
import AppConstants from "../constants/app-constants";
import Assign from "object-assign";
import { EventEmitter } from "events";

/* Local data store */

// Change types
const ERROR_CHANGE = "error_change",
      SUCCESS_CHANGE = "change",
      DELETE_CHANGE = "delete";

/* Register all stores to the dispatcher */
const AppStore = Assign({}, EventEmitter.prototype, {
    emitChange: (changeType) => {
        this.emit(changeType);
    },
    addChangeListener: (changeType, callback) => {
        this.on(changeType, callback);
    },
    removeChangeListener: (changeType, callback) => {
        this.removeListener(changeType, callback);
    },
    getData: (type) => {
        switch (type) {
            default:
                // Do nothing.
        }
    },
    setData: (type, data) => {
        switch (type) {
            default:
                // Do nothing.
        }
    }
});

AppStore.dispatchIndex = AppDispatcher.register(function(payload) {
	let action = payload.action,
		actionType = action.actionType;

	switch (actionType) {
		default:
			//Do nothing
	}
	return true;
});

export default AppStore;
