"use strict";

// This file is the main layout for this app. And this is the starting point for the app. Most of the changes will be listened in this file and data's are sent as props to children components.

import React from "react"

import Navbar from "../components/navbar.jsx";
import Footer from "../components/footer.jsx";

class MainLayout extends React.Component {
    constructor (props) {
        super(props);
    }
    render () {
        return (<section className="main-layout">
                    <Navbar />
                    <div className="content">
                        {this.props.children}
                    </div>
                    <Footer />
                </section>);
    }
}

export default MainLayout;
