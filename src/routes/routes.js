"use strict";

// This is the routes file. I have defined default routes alone. You can add your own routes for later purpose.

import React from "react";
import { Router, Route, IndexRoute } from "react-router";
import { createHashHistory } from "history";

//Layouts
import MainLayout from "../layouts/main.jsx";

//Components
import Dashboard from "../components/dashboard.jsx";
import ErrorPage from "../components/error-page.jsx";

const AppRoutes = React.createClass({
    render: function() {
        return (<Router history={createHashHistory({ "queryKey": false })}>
                    <Route path="/" component={MainLayout}>
                        <IndexRoute component={Dashboard} />
                    </Route>
                    <Route path="*" component={ErrorPage}/>
                </Router>);
    }
});

module.exports = AppRoutes;
