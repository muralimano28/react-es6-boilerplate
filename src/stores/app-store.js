"use strict";

import FluxStore from "./flux-store.js";
import AppDispatcher from "../dispatchers/app-dispatchers.js";

/* Local data store */

/* Register all stores to the dispatcher */
class AppStore extends FluxStore {
    constructor () {
        super();
    }
    getData (type, data) {
		// Return required data from store.
    }
    setData (type, data) {
		// Set data in store.
    }
    clearData (type, data) {
		// Clear store data.
    }
}

let appStoreInstance = new AppStore();

appStoreInstance.dispatchToken = AppDispatcher.register(payload => {
    let action = payload.action,
        actionType = action.actionType;

    switch (actionType) {
		// Different cases to handle actions
		default:
	}
    appStoreInstance.emitChange(actionType);
});

export default appStoreInstance;
