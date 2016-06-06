"use strict";

import {Dispatcher} from "flux";

// App-constants
import * as AppConstants from "../constants/app-constants.js";

class DispatcherClass extends Dispatcher {
    handleServerAction (action) {
        let payload = {
            source: AppConstants.PayloadSources.SERVER_ACTION,
            action: action
        }
        this.dispatch(payload);
    }
    handleViewAction (action) {
        let payload = {
            source: AppConstants.PayloadSources.VIEW_ACTION,
            action: action
        }
        this.dispatch(payload);
    }
}

const AppDispatcher = new DispatcherClass;

export default AppDispatcher;
