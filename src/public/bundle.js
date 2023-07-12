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

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (() => {

eval("const socket = io(\"http://localhost:3000\");\r\nsocket.on(\"server-send-data\", (data) => {\r\n  document.getElementById(\"data\").innerHTML += data;\r\n});\r\n\r\nsocket.on(\"server-send-fail\", () => {\r\n  alert(\"User has existed\");\r\n});\r\n\r\nsocket.on(\"server-send-listUser\", (data) => {\r\n  document.getElementById(\"boxContent\").innerHTML = \"\";\r\n  data.forEach((index) => {\r\n    const userDiv = document.createElement(\"div\");\r\n    userDiv.classList.add(\"user\");\r\n    userDiv.innerHTML = index;\r\n    document.getElementById(\"boxContent\").appendChild(userDiv);\r\n  });\r\n});\r\n\r\nsocket.on(\"server-send-success\", (data) => {\r\n  document.getElementById(\"currentUser\").innerHTML = data;\r\n  document.getElementById(\"login\").style.display = \"none\";\r\n  document.getElementById(\"chat\").style.display = \"block\";\r\n});\r\n\r\nsocket.on(\"user-is-writing\", (data) => {\r\n  document.getElementById(\"noti\").innerHTML = data;\r\n});\r\n\r\nsocket.on(\"user-stop-writing\", () => {\r\n  document.getElementById(\"noti\").innerHTML = \"\";\r\n});\r\n\r\nsocket.on(\"server-send-message\", (data) => {\r\n  const messageDiv = document.createElement(\"div\");\r\n  messageDiv.classList.add(\"message\");\r\n  messageDiv.innerHTML = data.user + \":\" + data.content;\r\n  document.getElementById(\"listMessage\").appendChild(messageDiv);\r\n});\r\n\r\ndocument.addEventListener(\"DOMContentLoaded\", async () => {\r\n  document.getElementById(\"login\").style.display = \"block\";\r\n  document.getElementById(\"chat\").style.display = \"none\";\r\n\r\n  document.getElementById(\"btnRegister\").addEventListener(\"click\", () => {\r\n    socket.emit(\r\n      \"client-send-data\",\r\n      document.getElementById(\"txtUsername\").value\r\n    );\r\n  });\r\n\r\n  const video = document.getElementById(\"localVideo\");\r\n\r\n  try {\r\n    const stream = await navigator.mediaDevices.getUserMedia({\r\n      audio: true,\r\n      video: true,\r\n    });\r\n    video.srcObject = stream;\r\n\r\n    video.onloadedmetadata = () => {\r\n      video.play();\r\n    };\r\n  } catch (err) {\r\n    console.log(err);\r\n  }\r\n\r\n  document.getElementById(\"btnLogout\").addEventListener(\"click\", () => {\r\n    socket.emit(\"client-logout\");\r\n    document.getElementById(\"chat\").style.display = \"none\";\r\n    document.getElementById(\"login\").style.display = \"block\";\r\n  });\r\n\r\n  document.getElementById(\"btnSendMessage\").addEventListener(\"click\", () => {\r\n    socket.emit(\r\n      \"user-send-message\",\r\n      document.getElementById(\"txtMessage\").value\r\n    );\r\n  });\r\n\r\n  document.getElementById(\"txtMessage\").addEventListener(\"focusin\", () => {\r\n    socket.emit(\"user-focus-in\");\r\n  });\r\n\r\n  document.getElementById(\"txtMessage\").addEventListener(\"focusout\", () => {\r\n    socket.emit(\"user-focus-out\");\r\n  });\r\n});\r\n\n\n//# sourceURL=webpack://BLUE-SN/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.js"]();
/******/ 	
/******/ })()
;