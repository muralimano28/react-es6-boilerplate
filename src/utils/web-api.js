"use strict";

import URL from "../config/url.js";

//Dispatchers
import AppDispatcher from "../dispatchers/app-dispatchers.js";

//Constants
import * as AppConstants from "../constants/app-constants";

// This is used to keep track of all the request that is made to the server.
const _pendingRequest = {};

// Build URL path
function buildURL(baseUrl, params, ...paths) {
	// params - query string params as json object
	let p = "";

	if(params) {
		for(let key in params) {
			p += ('&' + encodeURIComponent(key) + '=' + encodeURIComponent(params[key]));
		}
		if(p.length > 2) {
			p[0] = '?';
		}
	}

	let url = [baseUrl, paths.join("/")].join("/");

	// Replace multiple occurrences of // appearing, and then add the double slash required for
	// the base
	url = url.replace(/([\/]+)/g, '/').replace(/\:\//, "://");
	// params are query string params, it's a json.
	return  url + p;
}

function _abortPendingRequest(key) {
	if(_pendingRequest[key]) {
		_pendingRequest[key].abort();
		delete _pendingRequest[key];
	}
}

function _callback(res, errorKey, successKey, apiKey) {
	let action = null,
	key = successKey;

	if(!res) {
		key = errorKey;
	} else if(res.status >= 400) {
		switch(res.status) {
			default:
				if(!res) {
					res = {};
					res.status = 500;
					res.error = "Unknown error. Try again after sometime.";
				}
		}
		key = errorKey;
	}
	AppDispatcher.handleServerAction({
		"actionType": key,
		"data": (res) ? res : {
			data: {
				error: "Network error occurred"
			}
		}
	});
	// Removing executed action from pending list
	delete _pendingRequest[apiKey];
}

function getXHR(method, url) {
	let xhr = new XMLHttpRequest();
	xhr.open(method, url, true);
	return xhr;
}

function uploadFile(url, method, formData, key) {
	_abortPendingRequest(key);
	let xhr = getXHR(method, url);
	xhr.onload = () => {
		let response = this.response,
		jsonResponse = null;
		try {
			jsonResponse = JSON.parse(response);
		} catch(err) {
			jsonResponse = { "data": null, "error": err, "status": 500 };
		}
		_callback(jsonResponse, key + "_E", key + "_S", key);
	};
	xhr.onerror = (err) => {
		let response = this.response;
		if(err) {
			console.log("XHR error occurred:", err, " response:", response);
		}
		_callback(response, key + "_E", key + "_S", key);
	};
	xhr.send(formData);
	return xhr;
}

function makeRequest(url, method, data, key) {
	_abortPendingRequest(key);
	let xhr = getXHR(method, url);
	//Send the proper header information along with the request
	xhr.setRequestHeader("Content-type", "application/json");
	xhr.onload = () => {
		let jsonResponse = null;
		try {
			jsonResponse = JSON.parse(this.response);
		} catch(err) {
			jsonResponse = { "data": null, "error": err, "status": 500 };
		}
		_callback(jsonResponse, key + "_E", key + "_S", key);
	};

	xhr.onerror = () => {
		let response = this.response;
		if(response === "") {
			response = {};
			response.status = 500;
			response.error = "Internal server error. Try again after sometime.";
		}
		_callback(response, key + "_E", key + "_S", key);
	};
	xhr.send(JSON.stringify(data));
	return xhr;
}
module.exports = {
	// This function will get all the data from server and this is GET request.
	getData: (actionType, data) => {
		let key = null,
		url = "",
		reqType = "GET";
		switch (actionType) {
			// Create different cases to handle different get data actions.
			default:
				// Do some actions and define url, reqType, data, key
		}
		_pendingRequest[key] = makeRequest(url, reqType, data, key);
	},
	// This function will set data in server and it handle POST and PUT request.
	setData: (actionType, data) => {
		let key = null,
		url = "",
		reqType = "POST";
		switch (actionType) {
			// Create different cases to handle different set data actions.
			default:
				// Do some actions and define url, reqType, data, key
		}
		_pendingRequest[key] = makeRequest(url, reqType, data, key);
	},
	// This function will delete data in server and it handle DELETE request.
	deleteData: (actionType, data) => {
		let key = null,
		url = "",
		reqType = "DELETE";
		switch (actionType) {
			// Create different cases to handle different delete data actions.
			default:
				// Do some actions and define url, reqType, data, key
		}
		_pendingRequest[key] = makeRequest(url, reqType, data, key);
	}
};
