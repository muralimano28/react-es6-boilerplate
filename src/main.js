"use strict";

const React = require("react"),
      ReactDom = require("react-dom");

const AppRoutes = require("./routes/routes.js");

ReactDom.render(<AppRoutes/>, document.getElementById("content"));
