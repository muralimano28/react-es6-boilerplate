"use strict";

import {Dispatcher} from "flux";

// App-constants
import { PayloadSources } from "../constants/app-constants.js";

class DispatcherClass extends Dispatcher {
    handleServerAction (action) {
        let payload = {
            source: PayloadSources.SERVER_ACTION,
            action: action
        }
        this.dispatch(payload);
    }
    handleViewAction (action) {
        let payload = {
            source: PayloadSources.VIEW_ACTION,
            action: action
        }
        this.dispatch(payload);
    }
}

const AppDispatcher = new DispatcherClass;

export default AppDispatcher;
