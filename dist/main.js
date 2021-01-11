/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/axios/index.js":
/*!*************************************!*\
  !*** ./node_modules/axios/index.js ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__(/*! ./lib/axios */ \"./node_modules/axios/lib/axios.js\");\n\n//# sourceURL=webpack://covid-ext/./node_modules/axios/index.js?");

/***/ }),

/***/ "./node_modules/axios/lib/adapters/xhr.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/adapters/xhr.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\r\n\r\nvar utils = __webpack_require__(/*! ./../utils */ \"./node_modules/axios/lib/utils.js\");\r\nvar settle = __webpack_require__(/*! ./../core/settle */ \"./node_modules/axios/lib/core/settle.js\");\r\nvar cookies = __webpack_require__(/*! ./../helpers/cookies */ \"./node_modules/axios/lib/helpers/cookies.js\");\r\nvar buildURL = __webpack_require__(/*! ./../helpers/buildURL */ \"./node_modules/axios/lib/helpers/buildURL.js\");\r\nvar buildFullPath = __webpack_require__(/*! ../core/buildFullPath */ \"./node_modules/axios/lib/core/buildFullPath.js\");\r\nvar parseHeaders = __webpack_require__(/*! ./../helpers/parseHeaders */ \"./node_modules/axios/lib/helpers/parseHeaders.js\");\r\nvar isURLSameOrigin = __webpack_require__(/*! ./../helpers/isURLSameOrigin */ \"./node_modules/axios/lib/helpers/isURLSameOrigin.js\");\r\nvar createError = __webpack_require__(/*! ../core/createError */ \"./node_modules/axios/lib/core/createError.js\");\r\n\r\nmodule.exports = function xhrAdapter(config) {\r\n  return new Promise(function dispatchXhrRequest(resolve, reject) {\r\n    var requestData = config.data;\r\n    var requestHeaders = config.headers;\r\n\r\n    if (utils.isFormData(requestData)) {\r\n      delete requestHeaders['Content-Type']; // Let the browser set it\r\n    }\r\n\r\n    var request = new XMLHttpRequest();\r\n\r\n    // HTTP basic authentication\r\n    if (config.auth) {\r\n      var username = config.auth.username || '';\r\n      var password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : '';\r\n      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);\r\n    }\r\n\r\n    var fullPath = buildFullPath(config.baseURL, config.url);\r\n    request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);\r\n\r\n    // Set the request timeout in MS\r\n    request.timeout = config.timeout;\r\n\r\n    // Listen for ready state\r\n    request.onreadystatechange = function handleLoad() {\r\n      if (!request || request.readyState !== 4) {\r\n        return;\r\n      }\r\n\r\n      // The request errored out and we didn't get a response, this will be\r\n      // handled by onerror instead\r\n      // With one exception: request that using file: protocol, most browsers\r\n      // will return status as 0 even though it's a successful request\r\n      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {\r\n        return;\r\n      }\r\n\r\n      // Prepare the response\r\n      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;\r\n      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;\r\n      var response = {\r\n        data: responseData,\r\n        status: request.status,\r\n        statusText: request.statusText,\r\n        headers: responseHeaders,\r\n        config: config,\r\n        request: request\r\n      };\r\n\r\n      settle(resolve, reject, response);\r\n\r\n      // Clean up request\r\n      request = null;\r\n    };\r\n\r\n    // Handle browser request cancellation (as opposed to a manual cancellation)\r\n    request.onabort = function handleAbort() {\r\n      if (!request) {\r\n        return;\r\n      }\r\n\r\n      reject(createError('Request aborted', config, 'ECONNABORTED', request));\r\n\r\n      // Clean up request\r\n      request = null;\r\n    };\r\n\r\n    // Handle low level network errors\r\n    request.onerror = function handleError() {\r\n      // Real errors are hidden from us by the browser\r\n      // onerror should only fire if it's a network error\r\n      reject(createError('Network Error', config, null, request));\r\n\r\n      // Clean up request\r\n      request = null;\r\n    };\r\n\r\n    // Handle timeout\r\n    request.ontimeout = function handleTimeout() {\r\n      var timeoutErrorMessage = 'timeout of ' + config.timeout + 'ms exceeded';\r\n      if (config.timeoutErrorMessage) {\r\n        timeoutErrorMessage = config.timeoutErrorMessage;\r\n      }\r\n      reject(createError(timeoutErrorMessage, config, 'ECONNABORTED',\r\n        request));\r\n\r\n      // Clean up request\r\n      request = null;\r\n    };\r\n\r\n    // Add xsrf header\r\n    // This is only done if running in a standard browser environment.\r\n    // Specifically not if we're in a web worker, or react-native.\r\n    if (utils.isStandardBrowserEnv()) {\r\n      // Add xsrf header\r\n      var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ?\r\n        cookies.read(config.xsrfCookieName) :\r\n        undefined;\r\n\r\n      if (xsrfValue) {\r\n        requestHeaders[config.xsrfHeaderName] = xsrfValue;\r\n      }\r\n    }\r\n\r\n    // Add headers to the request\r\n    if ('setRequestHeader' in request) {\r\n      utils.forEach(requestHeaders, function setRequestHeader(val, key) {\r\n        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {\r\n          // Remove Content-Type if data is undefined\r\n          delete requestHeaders[key];\r\n        } else {\r\n          // Otherwise add header to the request\r\n          request.setRequestHeader(key, val);\r\n        }\r\n      });\r\n    }\r\n\r\n    // Add withCredentials to request if needed\r\n    if (!utils.isUndefined(config.withCredentials)) {\r\n      request.withCredentials = !!config.withCredentials;\r\n    }\r\n\r\n    // Add responseType to request if needed\r\n    if (config.responseType) {\r\n      try {\r\n        request.responseType = config.responseType;\r\n      } catch (e) {\r\n        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.\r\n        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.\r\n        if (config.responseType !== 'json') {\r\n          throw e;\r\n        }\r\n      }\r\n    }\r\n\r\n    // Handle progress if needed\r\n    if (typeof config.onDownloadProgress === 'function') {\r\n      request.addEventListener('progress', config.onDownloadProgress);\r\n    }\r\n\r\n    // Not all browsers support upload events\r\n    if (typeof config.onUploadProgress === 'function' && request.upload) {\r\n      request.upload.addEventListener('progress', config.onUploadProgress);\r\n    }\r\n\r\n    if (config.cancelToken) {\r\n      // Handle cancellation\r\n      config.cancelToken.promise.then(function onCanceled(cancel) {\r\n        if (!request) {\r\n          return;\r\n        }\r\n\r\n        request.abort();\r\n        reject(cancel);\r\n        // Clean up request\r\n        request = null;\r\n      });\r\n    }\r\n\r\n    if (!requestData) {\r\n      requestData = null;\r\n    }\r\n\r\n    // Send the request\r\n    request.send(requestData);\r\n  });\r\n};\r\n\n\n//# sourceURL=webpack://covid-ext/./node_modules/axios/lib/adapters/xhr.js?");

/***/ }),

/***/ "./node_modules/axios/lib/axios.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/axios.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\r\n\r\nvar utils = __webpack_require__(/*! ./utils */ \"./node_modules/axios/lib/utils.js\");\r\nvar bind = __webpack_require__(/*! ./helpers/bind */ \"./node_modules/axios/lib/helpers/bind.js\");\r\nvar Axios = __webpack_require__(/*! ./core/Axios */ \"./node_modules/axios/lib/core/Axios.js\");\r\nvar mergeConfig = __webpack_require__(/*! ./core/mergeConfig */ \"./node_modules/axios/lib/core/mergeConfig.js\");\r\nvar defaults = __webpack_require__(/*! ./defaults */ \"./node_modules/axios/lib/defaults.js\");\r\n\r\n/**\r\n * Create an instance of Axios\r\n *\r\n * @param {Object} defaultConfig The default config for the instance\r\n * @return {Axios} A new instance of Axios\r\n */\r\nfunction createInstance(defaultConfig) {\r\n  var context = new Axios(defaultConfig);\r\n  var instance = bind(Axios.prototype.request, context);\r\n\r\n  // Copy axios.prototype to instance\r\n  utils.extend(instance, Axios.prototype, context);\r\n\r\n  // Copy context to instance\r\n  utils.extend(instance, context);\r\n\r\n  return instance;\r\n}\r\n\r\n// Create the default instance to be exported\r\nvar axios = createInstance(defaults);\r\n\r\n// Expose Axios class to allow class inheritance\r\naxios.Axios = Axios;\r\n\r\n// Factory for creating new instances\r\naxios.create = function create(instanceConfig) {\r\n  return createInstance(mergeConfig(axios.defaults, instanceConfig));\r\n};\r\n\r\n// Expose Cancel & CancelToken\r\naxios.Cancel = __webpack_require__(/*! ./cancel/Cancel */ \"./node_modules/axios/lib/cancel/Cancel.js\");\r\naxios.CancelToken = __webpack_require__(/*! ./cancel/CancelToken */ \"./node_modules/axios/lib/cancel/CancelToken.js\");\r\naxios.isCancel = __webpack_require__(/*! ./cancel/isCancel */ \"./node_modules/axios/lib/cancel/isCancel.js\");\r\n\r\n// Expose all/spread\r\naxios.all = function all(promises) {\r\n  return Promise.all(promises);\r\n};\r\naxios.spread = __webpack_require__(/*! ./helpers/spread */ \"./node_modules/axios/lib/helpers/spread.js\");\r\n\r\n// Expose isAxiosError\r\naxios.isAxiosError = __webpack_require__(/*! ./helpers/isAxiosError */ \"./node_modules/axios/lib/helpers/isAxiosError.js\");\r\n\r\nmodule.exports = axios;\r\n\r\n// Allow use of default import syntax in TypeScript\r\nmodule.exports.default = axios;\r\n\n\n//# sourceURL=webpack://covid-ext/./node_modules/axios/lib/axios.js?");

/***/ }),

/***/ "./node_modules/axios/lib/cancel/Cancel.js":
/*!*************************************************!*\
  !*** ./node_modules/axios/lib/cancel/Cancel.js ***!
  \*************************************************/
/***/ ((module) => {

"use strict";
eval("\r\n\r\n/**\r\n * A `Cancel` is an object that is thrown when an operation is canceled.\r\n *\r\n * @class\r\n * @param {string=} message The message.\r\n */\r\nfunction Cancel(message) {\r\n  this.message = message;\r\n}\r\n\r\nCancel.prototype.toString = function toString() {\r\n  return 'Cancel' + (this.message ? ': ' + this.message : '');\r\n};\r\n\r\nCancel.prototype.__CANCEL__ = true;\r\n\r\nmodule.exports = Cancel;\r\n\n\n//# sourceURL=webpack://covid-ext/./node_modules/axios/lib/cancel/Cancel.js?");

/***/ }),

/***/ "./node_modules/axios/lib/cancel/CancelToken.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/cancel/CancelToken.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\r\n\r\nvar Cancel = __webpack_require__(/*! ./Cancel */ \"./node_modules/axios/lib/cancel/Cancel.js\");\r\n\r\n/**\r\n * A `CancelToken` is an object that can be used to request cancellation of an operation.\r\n *\r\n * @class\r\n * @param {Function} executor The executor function.\r\n */\r\nfunction CancelToken(executor) {\r\n  if (typeof executor !== 'function') {\r\n    throw new TypeError('executor must be a function.');\r\n  }\r\n\r\n  var resolvePromise;\r\n  this.promise = new Promise(function promiseExecutor(resolve) {\r\n    resolvePromise = resolve;\r\n  });\r\n\r\n  var token = this;\r\n  executor(function cancel(message) {\r\n    if (token.reason) {\r\n      // Cancellation has already been requested\r\n      return;\r\n    }\r\n\r\n    token.reason = new Cancel(message);\r\n    resolvePromise(token.reason);\r\n  });\r\n}\r\n\r\n/**\r\n * Throws a `Cancel` if cancellation has been requested.\r\n */\r\nCancelToken.prototype.throwIfRequested = function throwIfRequested() {\r\n  if (this.reason) {\r\n    throw this.reason;\r\n  }\r\n};\r\n\r\n/**\r\n * Returns an object that contains a new `CancelToken` and a function that, when called,\r\n * cancels the `CancelToken`.\r\n */\r\nCancelToken.source = function source() {\r\n  var cancel;\r\n  var token = new CancelToken(function executor(c) {\r\n    cancel = c;\r\n  });\r\n  return {\r\n    token: token,\r\n    cancel: cancel\r\n  };\r\n};\r\n\r\nmodule.exports = CancelToken;\r\n\n\n//# sourceURL=webpack://covid-ext/./node_modules/axios/lib/cancel/CancelToken.js?");

/***/ }),

/***/ "./node_modules/axios/lib/cancel/isCancel.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/cancel/isCancel.js ***!
  \***************************************************/
/***/ ((module) => {

"use strict";
eval("\r\n\r\nmodule.exports = function isCancel(value) {\r\n  return !!(value && value.__CANCEL__);\r\n};\r\n\n\n//# sourceURL=webpack://covid-ext/./node_modules/axios/lib/cancel/isCancel.js?");

/***/ }),

/***/ "./node_modules/axios/lib/core/Axios.js":
/*!**********************************************!*\
  !*** ./node_modules/axios/lib/core/Axios.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\r\n\r\nvar utils = __webpack_require__(/*! ./../utils */ \"./node_modules/axios/lib/utils.js\");\r\nvar buildURL = __webpack_require__(/*! ../helpers/buildURL */ \"./node_modules/axios/lib/helpers/buildURL.js\");\r\nvar InterceptorManager = __webpack_require__(/*! ./InterceptorManager */ \"./node_modules/axios/lib/core/InterceptorManager.js\");\r\nvar dispatchRequest = __webpack_require__(/*! ./dispatchRequest */ \"./node_modules/axios/lib/core/dispatchRequest.js\");\r\nvar mergeConfig = __webpack_require__(/*! ./mergeConfig */ \"./node_modules/axios/lib/core/mergeConfig.js\");\r\n\r\n/**\r\n * Create a new instance of Axios\r\n *\r\n * @param {Object} instanceConfig The default config for the instance\r\n */\r\nfunction Axios(instanceConfig) {\r\n  this.defaults = instanceConfig;\r\n  this.interceptors = {\r\n    request: new InterceptorManager(),\r\n    response: new InterceptorManager()\r\n  };\r\n}\r\n\r\n/**\r\n * Dispatch a request\r\n *\r\n * @param {Object} config The config specific for this request (merged with this.defaults)\r\n */\r\nAxios.prototype.request = function request(config) {\r\n  /*eslint no-param-reassign:0*/\r\n  // Allow for axios('example/url'[, config]) a la fetch API\r\n  if (typeof config === 'string') {\r\n    config = arguments[1] || {};\r\n    config.url = arguments[0];\r\n  } else {\r\n    config = config || {};\r\n  }\r\n\r\n  config = mergeConfig(this.defaults, config);\r\n\r\n  // Set config.method\r\n  if (config.method) {\r\n    config.method = config.method.toLowerCase();\r\n  } else if (this.defaults.method) {\r\n    config.method = this.defaults.method.toLowerCase();\r\n  } else {\r\n    config.method = 'get';\r\n  }\r\n\r\n  // Hook up interceptors middleware\r\n  var chain = [dispatchRequest, undefined];\r\n  var promise = Promise.resolve(config);\r\n\r\n  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {\r\n    chain.unshift(interceptor.fulfilled, interceptor.rejected);\r\n  });\r\n\r\n  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {\r\n    chain.push(interceptor.fulfilled, interceptor.rejected);\r\n  });\r\n\r\n  while (chain.length) {\r\n    promise = promise.then(chain.shift(), chain.shift());\r\n  }\r\n\r\n  return promise;\r\n};\r\n\r\nAxios.prototype.getUri = function getUri(config) {\r\n  config = mergeConfig(this.defaults, config);\r\n  return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\\?/, '');\r\n};\r\n\r\n// Provide aliases for supported request methods\r\nutils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {\r\n  /*eslint func-names:0*/\r\n  Axios.prototype[method] = function(url, config) {\r\n    return this.request(mergeConfig(config || {}, {\r\n      method: method,\r\n      url: url,\r\n      data: (config || {}).data\r\n    }));\r\n  };\r\n});\r\n\r\nutils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {\r\n  /*eslint func-names:0*/\r\n  Axios.prototype[method] = function(url, data, config) {\r\n    return this.request(mergeConfig(config || {}, {\r\n      method: method,\r\n      url: url,\r\n      data: data\r\n    }));\r\n  };\r\n});\r\n\r\nmodule.exports = Axios;\r\n\n\n//# sourceURL=webpack://covid-ext/./node_modules/axios/lib/core/Axios.js?");

/***/ }),

/***/ "./node_modules/axios/lib/core/InterceptorManager.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/core/InterceptorManager.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\r\n\r\nvar utils = __webpack_require__(/*! ./../utils */ \"./node_modules/axios/lib/utils.js\");\r\n\r\nfunction InterceptorManager() {\r\n  this.handlers = [];\r\n}\r\n\r\n/**\r\n * Add a new interceptor to the stack\r\n *\r\n * @param {Function} fulfilled The function to handle `then` for a `Promise`\r\n * @param {Function} rejected The function to handle `reject` for a `Promise`\r\n *\r\n * @return {Number} An ID used to remove interceptor later\r\n */\r\nInterceptorManager.prototype.use = function use(fulfilled, rejected) {\r\n  this.handlers.push({\r\n    fulfilled: fulfilled,\r\n    rejected: rejected\r\n  });\r\n  return this.handlers.length - 1;\r\n};\r\n\r\n/**\r\n * Remove an interceptor from the stack\r\n *\r\n * @param {Number} id The ID that was returned by `use`\r\n */\r\nInterceptorManager.prototype.eject = function eject(id) {\r\n  if (this.handlers[id]) {\r\n    this.handlers[id] = null;\r\n  }\r\n};\r\n\r\n/**\r\n * Iterate over all the registered interceptors\r\n *\r\n * This method is particularly useful for skipping over any\r\n * interceptors that may have become `null` calling `eject`.\r\n *\r\n * @param {Function} fn The function to call for each interceptor\r\n */\r\nInterceptorManager.prototype.forEach = function forEach(fn) {\r\n  utils.forEach(this.handlers, function forEachHandler(h) {\r\n    if (h !== null) {\r\n      fn(h);\r\n    }\r\n  });\r\n};\r\n\r\nmodule.exports = InterceptorManager;\r\n\n\n//# sourceURL=webpack://covid-ext/./node_modules/axios/lib/core/InterceptorManager.js?");

/***/ }),

/***/ "./node_modules/axios/lib/core/buildFullPath.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/buildFullPath.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\r\n\r\nvar isAbsoluteURL = __webpack_require__(/*! ../helpers/isAbsoluteURL */ \"./node_modules/axios/lib/helpers/isAbsoluteURL.js\");\r\nvar combineURLs = __webpack_require__(/*! ../helpers/combineURLs */ \"./node_modules/axios/lib/helpers/combineURLs.js\");\r\n\r\n/**\r\n * Creates a new URL by combining the baseURL with the requestedURL,\r\n * only when the requestedURL is not already an absolute URL.\r\n * If the requestURL is absolute, this function returns the requestedURL untouched.\r\n *\r\n * @param {string} baseURL The base URL\r\n * @param {string} requestedURL Absolute or relative URL to combine\r\n * @returns {string} The combined full path\r\n */\r\nmodule.exports = function buildFullPath(baseURL, requestedURL) {\r\n  if (baseURL && !isAbsoluteURL(requestedURL)) {\r\n    return combineURLs(baseURL, requestedURL);\r\n  }\r\n  return requestedURL;\r\n};\r\n\n\n//# sourceURL=webpack://covid-ext/./node_modules/axios/lib/core/buildFullPath.js?");

/***/ }),

/***/ "./node_modules/axios/lib/core/createError.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/createError.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\r\n\r\nvar enhanceError = __webpack_require__(/*! ./enhanceError */ \"./node_modules/axios/lib/core/enhanceError.js\");\r\n\r\n/**\r\n * Create an Error with the specified message, config, error code, request and response.\r\n *\r\n * @param {string} message The error message.\r\n * @param {Object} config The config.\r\n * @param {string} [code] The error code (for example, 'ECONNABORTED').\r\n * @param {Object} [request] The request.\r\n * @param {Object} [response] The response.\r\n * @returns {Error} The created error.\r\n */\r\nmodule.exports = function createError(message, config, code, request, response) {\r\n  var error = new Error(message);\r\n  return enhanceError(error, config, code, request, response);\r\n};\r\n\n\n//# sourceURL=webpack://covid-ext/./node_modules/axios/lib/core/createError.js?");

/***/ }),

/***/ "./node_modules/axios/lib/core/dispatchRequest.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/core/dispatchRequest.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\r\n\r\nvar utils = __webpack_require__(/*! ./../utils */ \"./node_modules/axios/lib/utils.js\");\r\nvar transformData = __webpack_require__(/*! ./transformData */ \"./node_modules/axios/lib/core/transformData.js\");\r\nvar isCancel = __webpack_require__(/*! ../cancel/isCancel */ \"./node_modules/axios/lib/cancel/isCancel.js\");\r\nvar defaults = __webpack_require__(/*! ../defaults */ \"./node_modules/axios/lib/defaults.js\");\r\n\r\n/**\r\n * Throws a `Cancel` if cancellation has been requested.\r\n */\r\nfunction throwIfCancellationRequested(config) {\r\n  if (config.cancelToken) {\r\n    config.cancelToken.throwIfRequested();\r\n  }\r\n}\r\n\r\n/**\r\n * Dispatch a request to the server using the configured adapter.\r\n *\r\n * @param {object} config The config that is to be used for the request\r\n * @returns {Promise} The Promise to be fulfilled\r\n */\r\nmodule.exports = function dispatchRequest(config) {\r\n  throwIfCancellationRequested(config);\r\n\r\n  // Ensure headers exist\r\n  config.headers = config.headers || {};\r\n\r\n  // Transform request data\r\n  config.data = transformData(\r\n    config.data,\r\n    config.headers,\r\n    config.transformRequest\r\n  );\r\n\r\n  // Flatten headers\r\n  config.headers = utils.merge(\r\n    config.headers.common || {},\r\n    config.headers[config.method] || {},\r\n    config.headers\r\n  );\r\n\r\n  utils.forEach(\r\n    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],\r\n    function cleanHeaderConfig(method) {\r\n      delete config.headers[method];\r\n    }\r\n  );\r\n\r\n  var adapter = config.adapter || defaults.adapter;\r\n\r\n  return adapter(config).then(function onAdapterResolution(response) {\r\n    throwIfCancellationRequested(config);\r\n\r\n    // Transform response data\r\n    response.data = transformData(\r\n      response.data,\r\n      response.headers,\r\n      config.transformResponse\r\n    );\r\n\r\n    return response;\r\n  }, function onAdapterRejection(reason) {\r\n    if (!isCancel(reason)) {\r\n      throwIfCancellationRequested(config);\r\n\r\n      // Transform response data\r\n      if (reason && reason.response) {\r\n        reason.response.data = transformData(\r\n          reason.response.data,\r\n          reason.response.headers,\r\n          config.transformResponse\r\n        );\r\n      }\r\n    }\r\n\r\n    return Promise.reject(reason);\r\n  });\r\n};\r\n\n\n//# sourceURL=webpack://covid-ext/./node_modules/axios/lib/core/dispatchRequest.js?");

/***/ }),

/***/ "./node_modules/axios/lib/core/enhanceError.js":
/*!*****************************************************!*\
  !*** ./node_modules/axios/lib/core/enhanceError.js ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";
eval("\r\n\r\n/**\r\n * Update an Error with the specified config, error code, and response.\r\n *\r\n * @param {Error} error The error to update.\r\n * @param {Object} config The config.\r\n * @param {string} [code] The error code (for example, 'ECONNABORTED').\r\n * @param {Object} [request] The request.\r\n * @param {Object} [response] The response.\r\n * @returns {Error} The error.\r\n */\r\nmodule.exports = function enhanceError(error, config, code, request, response) {\r\n  error.config = config;\r\n  if (code) {\r\n    error.code = code;\r\n  }\r\n\r\n  error.request = request;\r\n  error.response = response;\r\n  error.isAxiosError = true;\r\n\r\n  error.toJSON = function toJSON() {\r\n    return {\r\n      // Standard\r\n      message: this.message,\r\n      name: this.name,\r\n      // Microsoft\r\n      description: this.description,\r\n      number: this.number,\r\n      // Mozilla\r\n      fileName: this.fileName,\r\n      lineNumber: this.lineNumber,\r\n      columnNumber: this.columnNumber,\r\n      stack: this.stack,\r\n      // Axios\r\n      config: this.config,\r\n      code: this.code\r\n    };\r\n  };\r\n  return error;\r\n};\r\n\n\n//# sourceURL=webpack://covid-ext/./node_modules/axios/lib/core/enhanceError.js?");

/***/ }),

/***/ "./node_modules/axios/lib/core/mergeConfig.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/mergeConfig.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\r\n\r\nvar utils = __webpack_require__(/*! ../utils */ \"./node_modules/axios/lib/utils.js\");\r\n\r\n/**\r\n * Config-specific merge-function which creates a new config-object\r\n * by merging two configuration objects together.\r\n *\r\n * @param {Object} config1\r\n * @param {Object} config2\r\n * @returns {Object} New object resulting from merging config2 to config1\r\n */\r\nmodule.exports = function mergeConfig(config1, config2) {\r\n  // eslint-disable-next-line no-param-reassign\r\n  config2 = config2 || {};\r\n  var config = {};\r\n\r\n  var valueFromConfig2Keys = ['url', 'method', 'data'];\r\n  var mergeDeepPropertiesKeys = ['headers', 'auth', 'proxy', 'params'];\r\n  var defaultToConfig2Keys = [\r\n    'baseURL', 'transformRequest', 'transformResponse', 'paramsSerializer',\r\n    'timeout', 'timeoutMessage', 'withCredentials', 'adapter', 'responseType', 'xsrfCookieName',\r\n    'xsrfHeaderName', 'onUploadProgress', 'onDownloadProgress', 'decompress',\r\n    'maxContentLength', 'maxBodyLength', 'maxRedirects', 'transport', 'httpAgent',\r\n    'httpsAgent', 'cancelToken', 'socketPath', 'responseEncoding'\r\n  ];\r\n  var directMergeKeys = ['validateStatus'];\r\n\r\n  function getMergedValue(target, source) {\r\n    if (utils.isPlainObject(target) && utils.isPlainObject(source)) {\r\n      return utils.merge(target, source);\r\n    } else if (utils.isPlainObject(source)) {\r\n      return utils.merge({}, source);\r\n    } else if (utils.isArray(source)) {\r\n      return source.slice();\r\n    }\r\n    return source;\r\n  }\r\n\r\n  function mergeDeepProperties(prop) {\r\n    if (!utils.isUndefined(config2[prop])) {\r\n      config[prop] = getMergedValue(config1[prop], config2[prop]);\r\n    } else if (!utils.isUndefined(config1[prop])) {\r\n      config[prop] = getMergedValue(undefined, config1[prop]);\r\n    }\r\n  }\r\n\r\n  utils.forEach(valueFromConfig2Keys, function valueFromConfig2(prop) {\r\n    if (!utils.isUndefined(config2[prop])) {\r\n      config[prop] = getMergedValue(undefined, config2[prop]);\r\n    }\r\n  });\r\n\r\n  utils.forEach(mergeDeepPropertiesKeys, mergeDeepProperties);\r\n\r\n  utils.forEach(defaultToConfig2Keys, function defaultToConfig2(prop) {\r\n    if (!utils.isUndefined(config2[prop])) {\r\n      config[prop] = getMergedValue(undefined, config2[prop]);\r\n    } else if (!utils.isUndefined(config1[prop])) {\r\n      config[prop] = getMergedValue(undefined, config1[prop]);\r\n    }\r\n  });\r\n\r\n  utils.forEach(directMergeKeys, function merge(prop) {\r\n    if (prop in config2) {\r\n      config[prop] = getMergedValue(config1[prop], config2[prop]);\r\n    } else if (prop in config1) {\r\n      config[prop] = getMergedValue(undefined, config1[prop]);\r\n    }\r\n  });\r\n\r\n  var axiosKeys = valueFromConfig2Keys\r\n    .concat(mergeDeepPropertiesKeys)\r\n    .concat(defaultToConfig2Keys)\r\n    .concat(directMergeKeys);\r\n\r\n  var otherKeys = Object\r\n    .keys(config1)\r\n    .concat(Object.keys(config2))\r\n    .filter(function filterAxiosKeys(key) {\r\n      return axiosKeys.indexOf(key) === -1;\r\n    });\r\n\r\n  utils.forEach(otherKeys, mergeDeepProperties);\r\n\r\n  return config;\r\n};\r\n\n\n//# sourceURL=webpack://covid-ext/./node_modules/axios/lib/core/mergeConfig.js?");

/***/ }),

/***/ "./node_modules/axios/lib/core/settle.js":
/*!***********************************************!*\
  !*** ./node_modules/axios/lib/core/settle.js ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\r\n\r\nvar createError = __webpack_require__(/*! ./createError */ \"./node_modules/axios/lib/core/createError.js\");\r\n\r\n/**\r\n * Resolve or reject a Promise based on response status.\r\n *\r\n * @param {Function} resolve A function that resolves the promise.\r\n * @param {Function} reject A function that rejects the promise.\r\n * @param {object} response The response.\r\n */\r\nmodule.exports = function settle(resolve, reject, response) {\r\n  var validateStatus = response.config.validateStatus;\r\n  if (!response.status || !validateStatus || validateStatus(response.status)) {\r\n    resolve(response);\r\n  } else {\r\n    reject(createError(\r\n      'Request failed with status code ' + response.status,\r\n      response.config,\r\n      null,\r\n      response.request,\r\n      response\r\n    ));\r\n  }\r\n};\r\n\n\n//# sourceURL=webpack://covid-ext/./node_modules/axios/lib/core/settle.js?");

/***/ }),

/***/ "./node_modules/axios/lib/core/transformData.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/transformData.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\r\n\r\nvar utils = __webpack_require__(/*! ./../utils */ \"./node_modules/axios/lib/utils.js\");\r\n\r\n/**\r\n * Transform the data for a request or a response\r\n *\r\n * @param {Object|String} data The data to be transformed\r\n * @param {Array} headers The headers for the request or response\r\n * @param {Array|Function} fns A single function or Array of functions\r\n * @returns {*} The resulting transformed data\r\n */\r\nmodule.exports = function transformData(data, headers, fns) {\r\n  /*eslint no-param-reassign:0*/\r\n  utils.forEach(fns, function transform(fn) {\r\n    data = fn(data, headers);\r\n  });\r\n\r\n  return data;\r\n};\r\n\n\n//# sourceURL=webpack://covid-ext/./node_modules/axios/lib/core/transformData.js?");

/***/ }),

/***/ "./node_modules/axios/lib/defaults.js":
/*!********************************************!*\
  !*** ./node_modules/axios/lib/defaults.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\r\n\r\nvar utils = __webpack_require__(/*! ./utils */ \"./node_modules/axios/lib/utils.js\");\r\nvar normalizeHeaderName = __webpack_require__(/*! ./helpers/normalizeHeaderName */ \"./node_modules/axios/lib/helpers/normalizeHeaderName.js\");\r\n\r\nvar DEFAULT_CONTENT_TYPE = {\r\n  'Content-Type': 'application/x-www-form-urlencoded'\r\n};\r\n\r\nfunction setContentTypeIfUnset(headers, value) {\r\n  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {\r\n    headers['Content-Type'] = value;\r\n  }\r\n}\r\n\r\nfunction getDefaultAdapter() {\r\n  var adapter;\r\n  if (typeof XMLHttpRequest !== 'undefined') {\r\n    // For browsers use XHR adapter\r\n    adapter = __webpack_require__(/*! ./adapters/xhr */ \"./node_modules/axios/lib/adapters/xhr.js\");\r\n  } else if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {\r\n    // For node use HTTP adapter\r\n    adapter = __webpack_require__(/*! ./adapters/http */ \"./node_modules/axios/lib/adapters/xhr.js\");\r\n  }\r\n  return adapter;\r\n}\r\n\r\nvar defaults = {\r\n  adapter: getDefaultAdapter(),\r\n\r\n  transformRequest: [function transformRequest(data, headers) {\r\n    normalizeHeaderName(headers, 'Accept');\r\n    normalizeHeaderName(headers, 'Content-Type');\r\n    if (utils.isFormData(data) ||\r\n      utils.isArrayBuffer(data) ||\r\n      utils.isBuffer(data) ||\r\n      utils.isStream(data) ||\r\n      utils.isFile(data) ||\r\n      utils.isBlob(data)\r\n    ) {\r\n      return data;\r\n    }\r\n    if (utils.isArrayBufferView(data)) {\r\n      return data.buffer;\r\n    }\r\n    if (utils.isURLSearchParams(data)) {\r\n      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');\r\n      return data.toString();\r\n    }\r\n    if (utils.isObject(data)) {\r\n      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');\r\n      return JSON.stringify(data);\r\n    }\r\n    return data;\r\n  }],\r\n\r\n  transformResponse: [function transformResponse(data) {\r\n    /*eslint no-param-reassign:0*/\r\n    if (typeof data === 'string') {\r\n      try {\r\n        data = JSON.parse(data);\r\n      } catch (e) { /* Ignore */ }\r\n    }\r\n    return data;\r\n  }],\r\n\r\n  /**\r\n   * A timeout in milliseconds to abort a request. If set to 0 (default) a\r\n   * timeout is not created.\r\n   */\r\n  timeout: 0,\r\n\r\n  xsrfCookieName: 'XSRF-TOKEN',\r\n  xsrfHeaderName: 'X-XSRF-TOKEN',\r\n\r\n  maxContentLength: -1,\r\n  maxBodyLength: -1,\r\n\r\n  validateStatus: function validateStatus(status) {\r\n    return status >= 200 && status < 300;\r\n  }\r\n};\r\n\r\ndefaults.headers = {\r\n  common: {\r\n    'Accept': 'application/json, text/plain, */*'\r\n  }\r\n};\r\n\r\nutils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {\r\n  defaults.headers[method] = {};\r\n});\r\n\r\nutils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {\r\n  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);\r\n});\r\n\r\nmodule.exports = defaults;\r\n\n\n//# sourceURL=webpack://covid-ext/./node_modules/axios/lib/defaults.js?");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/bind.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/helpers/bind.js ***!
  \************************************************/
/***/ ((module) => {

"use strict";
eval("\r\n\r\nmodule.exports = function bind(fn, thisArg) {\r\n  return function wrap() {\r\n    var args = new Array(arguments.length);\r\n    for (var i = 0; i < args.length; i++) {\r\n      args[i] = arguments[i];\r\n    }\r\n    return fn.apply(thisArg, args);\r\n  };\r\n};\r\n\n\n//# sourceURL=webpack://covid-ext/./node_modules/axios/lib/helpers/bind.js?");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/buildURL.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/helpers/buildURL.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\r\n\r\nvar utils = __webpack_require__(/*! ./../utils */ \"./node_modules/axios/lib/utils.js\");\r\n\r\nfunction encode(val) {\r\n  return encodeURIComponent(val).\r\n    replace(/%3A/gi, ':').\r\n    replace(/%24/g, '$').\r\n    replace(/%2C/gi, ',').\r\n    replace(/%20/g, '+').\r\n    replace(/%5B/gi, '[').\r\n    replace(/%5D/gi, ']');\r\n}\r\n\r\n/**\r\n * Build a URL by appending params to the end\r\n *\r\n * @param {string} url The base of the url (e.g., http://www.google.com)\r\n * @param {object} [params] The params to be appended\r\n * @returns {string} The formatted url\r\n */\r\nmodule.exports = function buildURL(url, params, paramsSerializer) {\r\n  /*eslint no-param-reassign:0*/\r\n  if (!params) {\r\n    return url;\r\n  }\r\n\r\n  var serializedParams;\r\n  if (paramsSerializer) {\r\n    serializedParams = paramsSerializer(params);\r\n  } else if (utils.isURLSearchParams(params)) {\r\n    serializedParams = params.toString();\r\n  } else {\r\n    var parts = [];\r\n\r\n    utils.forEach(params, function serialize(val, key) {\r\n      if (val === null || typeof val === 'undefined') {\r\n        return;\r\n      }\r\n\r\n      if (utils.isArray(val)) {\r\n        key = key + '[]';\r\n      } else {\r\n        val = [val];\r\n      }\r\n\r\n      utils.forEach(val, function parseValue(v) {\r\n        if (utils.isDate(v)) {\r\n          v = v.toISOString();\r\n        } else if (utils.isObject(v)) {\r\n          v = JSON.stringify(v);\r\n        }\r\n        parts.push(encode(key) + '=' + encode(v));\r\n      });\r\n    });\r\n\r\n    serializedParams = parts.join('&');\r\n  }\r\n\r\n  if (serializedParams) {\r\n    var hashmarkIndex = url.indexOf('#');\r\n    if (hashmarkIndex !== -1) {\r\n      url = url.slice(0, hashmarkIndex);\r\n    }\r\n\r\n    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;\r\n  }\r\n\r\n  return url;\r\n};\r\n\n\n//# sourceURL=webpack://covid-ext/./node_modules/axios/lib/helpers/buildURL.js?");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/combineURLs.js":
/*!*******************************************************!*\
  !*** ./node_modules/axios/lib/helpers/combineURLs.js ***!
  \*******************************************************/
/***/ ((module) => {

"use strict";
eval("\r\n\r\n/**\r\n * Creates a new URL by combining the specified URLs\r\n *\r\n * @param {string} baseURL The base URL\r\n * @param {string} relativeURL The relative URL\r\n * @returns {string} The combined URL\r\n */\r\nmodule.exports = function combineURLs(baseURL, relativeURL) {\r\n  return relativeURL\r\n    ? baseURL.replace(/\\/+$/, '') + '/' + relativeURL.replace(/^\\/+/, '')\r\n    : baseURL;\r\n};\r\n\n\n//# sourceURL=webpack://covid-ext/./node_modules/axios/lib/helpers/combineURLs.js?");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/cookies.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/helpers/cookies.js ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\r\n\r\nvar utils = __webpack_require__(/*! ./../utils */ \"./node_modules/axios/lib/utils.js\");\r\n\r\nmodule.exports = (\r\n  utils.isStandardBrowserEnv() ?\r\n\r\n  // Standard browser envs support document.cookie\r\n    (function standardBrowserEnv() {\r\n      return {\r\n        write: function write(name, value, expires, path, domain, secure) {\r\n          var cookie = [];\r\n          cookie.push(name + '=' + encodeURIComponent(value));\r\n\r\n          if (utils.isNumber(expires)) {\r\n            cookie.push('expires=' + new Date(expires).toGMTString());\r\n          }\r\n\r\n          if (utils.isString(path)) {\r\n            cookie.push('path=' + path);\r\n          }\r\n\r\n          if (utils.isString(domain)) {\r\n            cookie.push('domain=' + domain);\r\n          }\r\n\r\n          if (secure === true) {\r\n            cookie.push('secure');\r\n          }\r\n\r\n          document.cookie = cookie.join('; ');\r\n        },\r\n\r\n        read: function read(name) {\r\n          var match = document.cookie.match(new RegExp('(^|;\\\\s*)(' + name + ')=([^;]*)'));\r\n          return (match ? decodeURIComponent(match[3]) : null);\r\n        },\r\n\r\n        remove: function remove(name) {\r\n          this.write(name, '', Date.now() - 86400000);\r\n        }\r\n      };\r\n    })() :\r\n\r\n  // Non standard browser env (web workers, react-native) lack needed support.\r\n    (function nonStandardBrowserEnv() {\r\n      return {\r\n        write: function write() {},\r\n        read: function read() { return null; },\r\n        remove: function remove() {}\r\n      };\r\n    })()\r\n);\r\n\n\n//# sourceURL=webpack://covid-ext/./node_modules/axios/lib/helpers/cookies.js?");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/isAbsoluteURL.js":
/*!*********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isAbsoluteURL.js ***!
  \*********************************************************/
/***/ ((module) => {

"use strict";
eval("\r\n\r\n/**\r\n * Determines whether the specified URL is absolute\r\n *\r\n * @param {string} url The URL to test\r\n * @returns {boolean} True if the specified URL is absolute, otherwise false\r\n */\r\nmodule.exports = function isAbsoluteURL(url) {\r\n  // A URL is considered absolute if it begins with \"<scheme>://\" or \"//\" (protocol-relative URL).\r\n  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed\r\n  // by any combination of letters, digits, plus, period, or hyphen.\r\n  return /^([a-z][a-z\\d\\+\\-\\.]*:)?\\/\\//i.test(url);\r\n};\r\n\n\n//# sourceURL=webpack://covid-ext/./node_modules/axios/lib/helpers/isAbsoluteURL.js?");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/isAxiosError.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isAxiosError.js ***!
  \********************************************************/
/***/ ((module) => {

"use strict";
eval("\r\n\r\n/**\r\n * Determines whether the payload is an error thrown by Axios\r\n *\r\n * @param {*} payload The value to test\r\n * @returns {boolean} True if the payload is an error thrown by Axios, otherwise false\r\n */\r\nmodule.exports = function isAxiosError(payload) {\r\n  return (typeof payload === 'object') && (payload.isAxiosError === true);\r\n};\r\n\n\n//# sourceURL=webpack://covid-ext/./node_modules/axios/lib/helpers/isAxiosError.js?");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/isURLSameOrigin.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isURLSameOrigin.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\r\n\r\nvar utils = __webpack_require__(/*! ./../utils */ \"./node_modules/axios/lib/utils.js\");\r\n\r\nmodule.exports = (\r\n  utils.isStandardBrowserEnv() ?\r\n\r\n  // Standard browser envs have full support of the APIs needed to test\r\n  // whether the request URL is of the same origin as current location.\r\n    (function standardBrowserEnv() {\r\n      var msie = /(msie|trident)/i.test(navigator.userAgent);\r\n      var urlParsingNode = document.createElement('a');\r\n      var originURL;\r\n\r\n      /**\r\n    * Parse a URL to discover it's components\r\n    *\r\n    * @param {String} url The URL to be parsed\r\n    * @returns {Object}\r\n    */\r\n      function resolveURL(url) {\r\n        var href = url;\r\n\r\n        if (msie) {\r\n        // IE needs attribute set twice to normalize properties\r\n          urlParsingNode.setAttribute('href', href);\r\n          href = urlParsingNode.href;\r\n        }\r\n\r\n        urlParsingNode.setAttribute('href', href);\r\n\r\n        // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils\r\n        return {\r\n          href: urlParsingNode.href,\r\n          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',\r\n          host: urlParsingNode.host,\r\n          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\\?/, '') : '',\r\n          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',\r\n          hostname: urlParsingNode.hostname,\r\n          port: urlParsingNode.port,\r\n          pathname: (urlParsingNode.pathname.charAt(0) === '/') ?\r\n            urlParsingNode.pathname :\r\n            '/' + urlParsingNode.pathname\r\n        };\r\n      }\r\n\r\n      originURL = resolveURL(window.location.href);\r\n\r\n      /**\r\n    * Determine if a URL shares the same origin as the current location\r\n    *\r\n    * @param {String} requestURL The URL to test\r\n    * @returns {boolean} True if URL shares the same origin, otherwise false\r\n    */\r\n      return function isURLSameOrigin(requestURL) {\r\n        var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;\r\n        return (parsed.protocol === originURL.protocol &&\r\n            parsed.host === originURL.host);\r\n      };\r\n    })() :\r\n\r\n  // Non standard browser envs (web workers, react-native) lack needed support.\r\n    (function nonStandardBrowserEnv() {\r\n      return function isURLSameOrigin() {\r\n        return true;\r\n      };\r\n    })()\r\n);\r\n\n\n//# sourceURL=webpack://covid-ext/./node_modules/axios/lib/helpers/isURLSameOrigin.js?");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/normalizeHeaderName.js":
/*!***************************************************************!*\
  !*** ./node_modules/axios/lib/helpers/normalizeHeaderName.js ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\r\n\r\nvar utils = __webpack_require__(/*! ../utils */ \"./node_modules/axios/lib/utils.js\");\r\n\r\nmodule.exports = function normalizeHeaderName(headers, normalizedName) {\r\n  utils.forEach(headers, function processHeader(value, name) {\r\n    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {\r\n      headers[normalizedName] = value;\r\n      delete headers[name];\r\n    }\r\n  });\r\n};\r\n\n\n//# sourceURL=webpack://covid-ext/./node_modules/axios/lib/helpers/normalizeHeaderName.js?");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/parseHeaders.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/parseHeaders.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\r\n\r\nvar utils = __webpack_require__(/*! ./../utils */ \"./node_modules/axios/lib/utils.js\");\r\n\r\n// Headers whose duplicates are ignored by node\r\n// c.f. https://nodejs.org/api/http.html#http_message_headers\r\nvar ignoreDuplicateOf = [\r\n  'age', 'authorization', 'content-length', 'content-type', 'etag',\r\n  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',\r\n  'last-modified', 'location', 'max-forwards', 'proxy-authorization',\r\n  'referer', 'retry-after', 'user-agent'\r\n];\r\n\r\n/**\r\n * Parse headers into an object\r\n *\r\n * ```\r\n * Date: Wed, 27 Aug 2014 08:58:49 GMT\r\n * Content-Type: application/json\r\n * Connection: keep-alive\r\n * Transfer-Encoding: chunked\r\n * ```\r\n *\r\n * @param {String} headers Headers needing to be parsed\r\n * @returns {Object} Headers parsed into an object\r\n */\r\nmodule.exports = function parseHeaders(headers) {\r\n  var parsed = {};\r\n  var key;\r\n  var val;\r\n  var i;\r\n\r\n  if (!headers) { return parsed; }\r\n\r\n  utils.forEach(headers.split('\\n'), function parser(line) {\r\n    i = line.indexOf(':');\r\n    key = utils.trim(line.substr(0, i)).toLowerCase();\r\n    val = utils.trim(line.substr(i + 1));\r\n\r\n    if (key) {\r\n      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {\r\n        return;\r\n      }\r\n      if (key === 'set-cookie') {\r\n        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);\r\n      } else {\r\n        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;\r\n      }\r\n    }\r\n  });\r\n\r\n  return parsed;\r\n};\r\n\n\n//# sourceURL=webpack://covid-ext/./node_modules/axios/lib/helpers/parseHeaders.js?");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/spread.js":
/*!**************************************************!*\
  !*** ./node_modules/axios/lib/helpers/spread.js ***!
  \**************************************************/
/***/ ((module) => {

"use strict";
eval("\r\n\r\n/**\r\n * Syntactic sugar for invoking a function and expanding an array for arguments.\r\n *\r\n * Common use case would be to use `Function.prototype.apply`.\r\n *\r\n *  ```js\r\n *  function f(x, y, z) {}\r\n *  var args = [1, 2, 3];\r\n *  f.apply(null, args);\r\n *  ```\r\n *\r\n * With `spread` this example can be re-written.\r\n *\r\n *  ```js\r\n *  spread(function(x, y, z) {})([1, 2, 3]);\r\n *  ```\r\n *\r\n * @param {Function} callback\r\n * @returns {Function}\r\n */\r\nmodule.exports = function spread(callback) {\r\n  return function wrap(arr) {\r\n    return callback.apply(null, arr);\r\n  };\r\n};\r\n\n\n//# sourceURL=webpack://covid-ext/./node_modules/axios/lib/helpers/spread.js?");

/***/ }),

/***/ "./node_modules/axios/lib/utils.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/utils.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\r\n\r\nvar bind = __webpack_require__(/*! ./helpers/bind */ \"./node_modules/axios/lib/helpers/bind.js\");\r\n\r\n/*global toString:true*/\r\n\r\n// utils is a library of generic helper functions non-specific to axios\r\n\r\nvar toString = Object.prototype.toString;\r\n\r\n/**\r\n * Determine if a value is an Array\r\n *\r\n * @param {Object} val The value to test\r\n * @returns {boolean} True if value is an Array, otherwise false\r\n */\r\nfunction isArray(val) {\r\n  return toString.call(val) === '[object Array]';\r\n}\r\n\r\n/**\r\n * Determine if a value is undefined\r\n *\r\n * @param {Object} val The value to test\r\n * @returns {boolean} True if the value is undefined, otherwise false\r\n */\r\nfunction isUndefined(val) {\r\n  return typeof val === 'undefined';\r\n}\r\n\r\n/**\r\n * Determine if a value is a Buffer\r\n *\r\n * @param {Object} val The value to test\r\n * @returns {boolean} True if value is a Buffer, otherwise false\r\n */\r\nfunction isBuffer(val) {\r\n  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor)\r\n    && typeof val.constructor.isBuffer === 'function' && val.constructor.isBuffer(val);\r\n}\r\n\r\n/**\r\n * Determine if a value is an ArrayBuffer\r\n *\r\n * @param {Object} val The value to test\r\n * @returns {boolean} True if value is an ArrayBuffer, otherwise false\r\n */\r\nfunction isArrayBuffer(val) {\r\n  return toString.call(val) === '[object ArrayBuffer]';\r\n}\r\n\r\n/**\r\n * Determine if a value is a FormData\r\n *\r\n * @param {Object} val The value to test\r\n * @returns {boolean} True if value is an FormData, otherwise false\r\n */\r\nfunction isFormData(val) {\r\n  return (typeof FormData !== 'undefined') && (val instanceof FormData);\r\n}\r\n\r\n/**\r\n * Determine if a value is a view on an ArrayBuffer\r\n *\r\n * @param {Object} val The value to test\r\n * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false\r\n */\r\nfunction isArrayBufferView(val) {\r\n  var result;\r\n  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {\r\n    result = ArrayBuffer.isView(val);\r\n  } else {\r\n    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);\r\n  }\r\n  return result;\r\n}\r\n\r\n/**\r\n * Determine if a value is a String\r\n *\r\n * @param {Object} val The value to test\r\n * @returns {boolean} True if value is a String, otherwise false\r\n */\r\nfunction isString(val) {\r\n  return typeof val === 'string';\r\n}\r\n\r\n/**\r\n * Determine if a value is a Number\r\n *\r\n * @param {Object} val The value to test\r\n * @returns {boolean} True if value is a Number, otherwise false\r\n */\r\nfunction isNumber(val) {\r\n  return typeof val === 'number';\r\n}\r\n\r\n/**\r\n * Determine if a value is an Object\r\n *\r\n * @param {Object} val The value to test\r\n * @returns {boolean} True if value is an Object, otherwise false\r\n */\r\nfunction isObject(val) {\r\n  return val !== null && typeof val === 'object';\r\n}\r\n\r\n/**\r\n * Determine if a value is a plain Object\r\n *\r\n * @param {Object} val The value to test\r\n * @return {boolean} True if value is a plain Object, otherwise false\r\n */\r\nfunction isPlainObject(val) {\r\n  if (toString.call(val) !== '[object Object]') {\r\n    return false;\r\n  }\r\n\r\n  var prototype = Object.getPrototypeOf(val);\r\n  return prototype === null || prototype === Object.prototype;\r\n}\r\n\r\n/**\r\n * Determine if a value is a Date\r\n *\r\n * @param {Object} val The value to test\r\n * @returns {boolean} True if value is a Date, otherwise false\r\n */\r\nfunction isDate(val) {\r\n  return toString.call(val) === '[object Date]';\r\n}\r\n\r\n/**\r\n * Determine if a value is a File\r\n *\r\n * @param {Object} val The value to test\r\n * @returns {boolean} True if value is a File, otherwise false\r\n */\r\nfunction isFile(val) {\r\n  return toString.call(val) === '[object File]';\r\n}\r\n\r\n/**\r\n * Determine if a value is a Blob\r\n *\r\n * @param {Object} val The value to test\r\n * @returns {boolean} True if value is a Blob, otherwise false\r\n */\r\nfunction isBlob(val) {\r\n  return toString.call(val) === '[object Blob]';\r\n}\r\n\r\n/**\r\n * Determine if a value is a Function\r\n *\r\n * @param {Object} val The value to test\r\n * @returns {boolean} True if value is a Function, otherwise false\r\n */\r\nfunction isFunction(val) {\r\n  return toString.call(val) === '[object Function]';\r\n}\r\n\r\n/**\r\n * Determine if a value is a Stream\r\n *\r\n * @param {Object} val The value to test\r\n * @returns {boolean} True if value is a Stream, otherwise false\r\n */\r\nfunction isStream(val) {\r\n  return isObject(val) && isFunction(val.pipe);\r\n}\r\n\r\n/**\r\n * Determine if a value is a URLSearchParams object\r\n *\r\n * @param {Object} val The value to test\r\n * @returns {boolean} True if value is a URLSearchParams object, otherwise false\r\n */\r\nfunction isURLSearchParams(val) {\r\n  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;\r\n}\r\n\r\n/**\r\n * Trim excess whitespace off the beginning and end of a string\r\n *\r\n * @param {String} str The String to trim\r\n * @returns {String} The String freed of excess whitespace\r\n */\r\nfunction trim(str) {\r\n  return str.replace(/^\\s*/, '').replace(/\\s*$/, '');\r\n}\r\n\r\n/**\r\n * Determine if we're running in a standard browser environment\r\n *\r\n * This allows axios to run in a web worker, and react-native.\r\n * Both environments support XMLHttpRequest, but not fully standard globals.\r\n *\r\n * web workers:\r\n *  typeof window -> undefined\r\n *  typeof document -> undefined\r\n *\r\n * react-native:\r\n *  navigator.product -> 'ReactNative'\r\n * nativescript\r\n *  navigator.product -> 'NativeScript' or 'NS'\r\n */\r\nfunction isStandardBrowserEnv() {\r\n  if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' ||\r\n                                           navigator.product === 'NativeScript' ||\r\n                                           navigator.product === 'NS')) {\r\n    return false;\r\n  }\r\n  return (\r\n    typeof window !== 'undefined' &&\r\n    typeof document !== 'undefined'\r\n  );\r\n}\r\n\r\n/**\r\n * Iterate over an Array or an Object invoking a function for each item.\r\n *\r\n * If `obj` is an Array callback will be called passing\r\n * the value, index, and complete array for each item.\r\n *\r\n * If 'obj' is an Object callback will be called passing\r\n * the value, key, and complete object for each property.\r\n *\r\n * @param {Object|Array} obj The object to iterate\r\n * @param {Function} fn The callback to invoke for each item\r\n */\r\nfunction forEach(obj, fn) {\r\n  // Don't bother if no value provided\r\n  if (obj === null || typeof obj === 'undefined') {\r\n    return;\r\n  }\r\n\r\n  // Force an array if not already something iterable\r\n  if (typeof obj !== 'object') {\r\n    /*eslint no-param-reassign:0*/\r\n    obj = [obj];\r\n  }\r\n\r\n  if (isArray(obj)) {\r\n    // Iterate over array values\r\n    for (var i = 0, l = obj.length; i < l; i++) {\r\n      fn.call(null, obj[i], i, obj);\r\n    }\r\n  } else {\r\n    // Iterate over object keys\r\n    for (var key in obj) {\r\n      if (Object.prototype.hasOwnProperty.call(obj, key)) {\r\n        fn.call(null, obj[key], key, obj);\r\n      }\r\n    }\r\n  }\r\n}\r\n\r\n/**\r\n * Accepts varargs expecting each argument to be an object, then\r\n * immutably merges the properties of each object and returns result.\r\n *\r\n * When multiple objects contain the same key the later object in\r\n * the arguments list will take precedence.\r\n *\r\n * Example:\r\n *\r\n * ```js\r\n * var result = merge({foo: 123}, {foo: 456});\r\n * console.log(result.foo); // outputs 456\r\n * ```\r\n *\r\n * @param {Object} obj1 Object to merge\r\n * @returns {Object} Result of all merge properties\r\n */\r\nfunction merge(/* obj1, obj2, obj3, ... */) {\r\n  var result = {};\r\n  function assignValue(val, key) {\r\n    if (isPlainObject(result[key]) && isPlainObject(val)) {\r\n      result[key] = merge(result[key], val);\r\n    } else if (isPlainObject(val)) {\r\n      result[key] = merge({}, val);\r\n    } else if (isArray(val)) {\r\n      result[key] = val.slice();\r\n    } else {\r\n      result[key] = val;\r\n    }\r\n  }\r\n\r\n  for (var i = 0, l = arguments.length; i < l; i++) {\r\n    forEach(arguments[i], assignValue);\r\n  }\r\n  return result;\r\n}\r\n\r\n/**\r\n * Extends object a by mutably adding to it the properties of object b.\r\n *\r\n * @param {Object} a The object to be extended\r\n * @param {Object} b The object to copy properties from\r\n * @param {Object} thisArg The object to bind function to\r\n * @return {Object} The resulting value of object a\r\n */\r\nfunction extend(a, b, thisArg) {\r\n  forEach(b, function assignValue(val, key) {\r\n    if (thisArg && typeof val === 'function') {\r\n      a[key] = bind(val, thisArg);\r\n    } else {\r\n      a[key] = val;\r\n    }\r\n  });\r\n  return a;\r\n}\r\n\r\n/**\r\n * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)\r\n *\r\n * @param {string} content with BOM\r\n * @return {string} content value without BOM\r\n */\r\nfunction stripBOM(content) {\r\n  if (content.charCodeAt(0) === 0xFEFF) {\r\n    content = content.slice(1);\r\n  }\r\n  return content;\r\n}\r\n\r\nmodule.exports = {\r\n  isArray: isArray,\r\n  isArrayBuffer: isArrayBuffer,\r\n  isBuffer: isBuffer,\r\n  isFormData: isFormData,\r\n  isArrayBufferView: isArrayBufferView,\r\n  isString: isString,\r\n  isNumber: isNumber,\r\n  isObject: isObject,\r\n  isPlainObject: isPlainObject,\r\n  isUndefined: isUndefined,\r\n  isDate: isDate,\r\n  isFile: isFile,\r\n  isBlob: isBlob,\r\n  isFunction: isFunction,\r\n  isStream: isStream,\r\n  isURLSearchParams: isURLSearchParams,\r\n  isStandardBrowserEnv: isStandardBrowserEnv,\r\n  forEach: forEach,\r\n  merge: merge,\r\n  extend: extend,\r\n  trim: trim,\r\n  stripBOM: stripBOM\r\n};\r\n\n\n//# sourceURL=webpack://covid-ext/./node_modules/axios/lib/utils.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ \"./node_modules/axios/index.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);\n\r\nconst api = 'https://covid19.mathdro.id/api/countries';\r\nconst errors = document.querySelector('.errors');\r\nconst loading = document.querySelector('.loading');\r\nconst cases = document.querySelector('.cases');\r\nconst recovered = document.querySelector('.recovered');\r\nconst deaths = document.querySelector('.deaths');\r\nconst results = document.querySelector('.output-container');\r\nconst search = document.querySelector('.country-search');\r\n\r\nconst countryData = document.querySelector('.country-data');\r\nconst country = document.querySelector('.country-input');\r\n\r\nconst getCountry = async (countryName) => {\r\n\tloading.style.display = 'block';\r\n\ttry {\r\n\t\tconst res = await axios__WEBPACK_IMPORTED_MODULE_0___default().get(`${api}/${countryName}`);\r\n\t\tloading.style.display = 'none';\r\n\t\tcases.textContent = res.data.confirmed.value;\r\n\t\trecovered.textContent = res.data.recovered.value;\r\n\t\tdeaths.textContent = res.data.deaths.value;\r\n\t\tresults.style.display = 'block';\r\n\t\terrors.textContent = '';\r\n\t} catch (error) {\r\n\t\terrors.textContent = 'No available data.';\r\n\t\tloading.style.display = 'none';\r\n\t\tresults.style.display = 'none';\r\n\t}\r\n};\r\n\r\nconst handleSubmit = (e) => {\r\n\te.preventDefault();\r\n\tgetCountry(country.value);\r\n\tconsole.log(country.value);\r\n};\r\n\r\ncountryData.addEventListener('submit', (e) => handleSubmit(e));\r\nsearch.addEventListener('click', (e) => handleSubmit(e));\r\n\n\n//# sourceURL=webpack://covid-ext/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => module['default'] :
/******/ 				() => module;
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./src/index.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;