webpackJsonp([1],[
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_router__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__views_Room__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__views_Room___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__views_Room__);




__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].use(__WEBPACK_IMPORTED_MODULE_1_vue_router__["a" /* default */]);

/* harmony default export */ __webpack_exports__["a"] = (new __WEBPACK_IMPORTED_MODULE_1_vue_router__["a" /* default */]({
  routes: [{
    path: '/',
    name: 'room',
    component: __WEBPACK_IMPORTED_MODULE_2__views_Room___default.a
  }]
}));

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(12)
}
var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(6),
  /* template */
  __webpack_require__(18),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 5 */
/***/ (function(module, exports) {

const API_PORT = '3000';

const API_ROOT = `http://localhost:${API_PORT}`;

const DEFAULT_ICE_SERVER = {
  url: 'turn:47.52.156.68:3478',
  credential: 'zmecust',
  username: 'zmecust',
};

module.exports = { API_PORT, API_ROOT, DEFAULT_ICE_SERVER };


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({ name: 'app' });

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__configure__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__configure___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__configure__);

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



navigator.getUserMedia = navigator.getUserMedia || navigator.mozGetUserMedia || navigator.webkitGetUserMedia;
window.RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
window.RTCIceCandidate = window.RTCIceCandidate || window.mozRTCIceCandidate || window.webkitRTCIceCandidate;
window.RTCSessionDescription = window.RTCSessionDescription || window.mozRTCSessionDescription || window.webkitRTCSessionDescription;

var socket = io.connect(__WEBPACK_IMPORTED_MODULE_1__configure__["API_ROOT"]);
var configuration = {
  iceServers: [__WEBPACK_IMPORTED_MODULE_1__configure__["DEFAULT_ICE_SERVER"]]
};

var localStream = void 0,
    peerConn = void 0;
var connectedUser = null;

/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      user_name: '',
      show: true,
      users: '',
      call_username: '',
      remote_video: '',
      accept_video: false
    };
  },
  mounted: function mounted() {
    socket.on('message', function (data) {
      console.log(data);
      switch (data.event) {
        case 'show':
          this.users = data.allUsers;
          break;
        case 'join':
          this.handleLogin(data);
          break;
        case 'call':
          this.handleCall(data);
          break;
        case 'accept':
          this.handleAccept(data);
          break;
        case 'offer':
          this.handleOffer(data);
          break;
        case 'candidate':
          this.handleCandidate(data);
          break;
        case 'msg':
          this.handleMsg(data);
          break;
        case 'answer':
          this.handleAnswer(data);
          break;
        case 'leave':
          this.handleLeave();
          break;
        default:
          break;
      }
    }.bind(this));
  },

  methods: {
    submit: function submit() {
      if (this.user_name !== '') {
        this.send({
          event: 'join',
          name: this.user_name
        });
      }
    },
    send: function send(message) {
      if (connectedUser !== null) {
        message.connectedUser = connectedUser;
      }
      socket.send(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify___default()(message));
    },
    handleLogin: function handleLogin(data) {
      if (data.success === false) {
        alert('Ooops...please try a different username');
      } else {
        this.show = false;
        this.users = data.allUsers;
        this.initCreate();
      }
    },
    addVideoURL: function addVideoURL(elementId, stream) {
      var video = document.getElementById(elementId);
      // Older brower may have no srcObject
      if ('srcObject' in video) {
        video.srcObject = stream;
      } else {
        // 防止在新的浏览器里使用它，应为它已经不再支持了
        video.src = window.URL.createObjectURL(stream);
      }
    },
    initCreate: function initCreate() {
      var self = this;
      navigator.mediaDevices.getUserMedia({ audio: true, video: true }).then(function (stream) {
        var video = document.getElementById('localVideo');
        self.addVideoURL('localVideo', stream);
        video.muted = true;
        localStream = stream;
      }).catch(function (err) {
        console.log(err.name + ': ' + err.message);
      });
    },
    call: function call() {
      if (this.call_username.length > 0) {
        if (this.users[this.call_username] === true) {
          connectedUser = this.call_username;
          this.createConnection();
          this.send({
            event: 'call'
          });
        } else {
          alert('The current user is calling, try another');
        }
      } else {
        alert('Ooops...this username cannot be empty, please try again');
      }
    },
    createConnection: function createConnection() {
      var _this = this;

      peerConn = new RTCPeerConnection(configuration);
      peerConn.addStream(localStream);
      peerConn.onaddstream = function (e) {
        _this.addVideoURL('remoteVideo', e.stream);
      };
      peerConn.onicecandidate = function (event) {
        setTimeout(function () {
          if (event.candidate) {
            _this.send({
              event: 'candidate',
              candidate: event.candidate
            });
          }
        });
      };
    },
    handleCall: function handleCall(data) {
      this.accept_video = true;
      connectedUser = data.name;
    },
    reject: function reject() {
      this.send({
        event: 'accept',
        accept: false
      });
      this.accept_video = false;
    },
    accept: function accept() {
      this.send({
        event: 'accept',
        accept: true
      });
      this.accept_video = false;
    },
    handleAccept: function handleAccept(data) {
      var _this2 = this;

      if (data.accept) {
        // Create an offer
        peerConn.createOffer(function (offer) {
          _this2.send({
            event: 'offer',
            offer: offer
          });
          peerConn.setLocalDescription(offer);
        }, function (error) {
          alert('Error when creating an offer');
        });
      } else {
        alert('对方已拒绝');
      }
    },
    handleOffer: function handleOffer(data) {
      var _this3 = this;

      connectedUser = data.name;
      this.createConnection();
      peerConn.setRemoteDescription(new RTCSessionDescription(data.offer));
      // Create an answer to an offer
      peerConn.createAnswer(function (answer) {
        peerConn.setLocalDescription(answer);
        _this3.send({
          event: 'answer',
          answer: answer
        });
      }, function (error) {
        alert('Error when creating an answer');
      });
    },
    handleMsg: function handleMsg(data) {
      console.log(data.message);
    },
    handleAnswer: function handleAnswer(data) {
      peerConn.setRemoteDescription(new RTCSessionDescription(data.answer));
    },
    handleCandidate: function handleCandidate(data) {
      // ClientB 通过 PeerConnection 的 AddIceCandidate 方法保存起来
      peerConn.addIceCandidate(new RTCIceCandidate(data.candidate));
    },
    hangUp: function hangUp() {
      this.send({
        event: 'leave'
      });
      this.handleLeave();
    },
    handleLeave: function handleLeave() {
      alert('通话已结束');
      connectedUser = null;
      this.remote_video = '';
      peerConn.close();
      peerConn.onicecandidate = null;
      peerConn.onaddstream = null;
      if (peerConn.signalingState === 'closed') {
        this.initCreate();
      }
    },
    closePreview: function closePreview() {
      this.accept_video = false;
    }
  }
});

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__App__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__App___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__App__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__router__ = __webpack_require__(3);
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.




__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].config.productionTip = false;

/* eslint-disable no-new */
new __WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */]({
  el: '#app',
  router: __WEBPACK_IMPORTED_MODULE_2__router__["a" /* default */],
  template: '<App/>',
  components: { App: __WEBPACK_IMPORTED_MODULE_1__App___default.a }
});

/***/ }),
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 13 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(13)
}
var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(7),
  /* template */
  __webpack_require__(19),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "app"
    }
  }, [_c('router-view')], 1)
},staticRenderFns: []}

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.show),
      expression: "show"
    }],
    staticClass: "container text-center"
  }, [_c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-md-4 col-md-offset-4"
  }, [_c('form', {
    staticClass: "form",
    attrs: {
      "action": ""
    },
    on: {
      "submit": function($event) {
        $event.preventDefault();
        return _vm.submit()
      }
    }
  }, [_c('h2', [_vm._v("WebRTC Video Demo. Please Sign In")]), _vm._v(" "), _c('br'), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.user_name),
      expression: "user_name"
    }],
    staticClass: "form-control",
    attrs: {
      "type": "text",
      "placeholder": "请输入您的昵称",
      "required": "",
      "autofocus": ""
    },
    domProps: {
      "value": (_vm.user_name)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.user_name = $event.target.value
      }
    }
  }), _vm._v(" "), _c('br'), _vm._v(" "), _c('button', {
    staticClass: "btn btn-primary btn-block",
    attrs: {
      "type": "submit"
    }
  }, [_vm._v("创建昵称")])])])])]), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (!_vm.show),
      expression: "!show"
    }],
    staticClass: "container text-center"
  }, [_c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-md-3",
    staticStyle: {
      "height": "50%"
    }
  }, [_c('ul', {
    staticClass: "list-group"
  }, [_c('li', {
    staticClass: "list-group-item"
  }, [_vm._v("昵称: " + _vm._s(_vm.user_name))]), _vm._v(" "), _c('li', {
    staticClass: "list-group-item"
  }, [_vm._v("当前在线人数: " + _vm._s(Object.getOwnPropertyNames(_vm.users).length - 1))]), _vm._v(" "), _c('li', {
    staticClass: "list-group-item"
  }, [_vm._v("\n            在线用户:\n            "), _vm._l((_vm.users), function(user, index) {
    return _c('div', {
      key: index
    }, [_c('br'), _vm._v(" "), _c('span', [_vm._v(_vm._s(index))]), _vm._v(" "), _c('span', {
      class: [user ? 'green_color' : 'red_color']
    }, [_vm._v(_vm._s(user ? '(在线)' : '(正在通话)'))])])
  })], 2)]), _vm._v(" "), _c('div', {
    staticClass: "row text-center"
  }, [_c('div', {
    staticClass: "col-md-12"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.call_username),
      expression: "call_username"
    }],
    staticClass: "form-control",
    attrs: {
      "type": "text",
      "placeholder": "username to call"
    },
    domProps: {
      "value": (_vm.call_username)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.call_username = $event.target.value
      }
    }
  }), _vm._v(" "), _c('br'), _vm._v(" "), _c('button', {
    staticClass: "btn-success btn",
    attrs: {
      "disabled": !_vm.users[_vm.user_name]
    },
    on: {
      "click": _vm.call
    }
  }, [_vm._v("Call")]), _vm._v(" "), _c('button', {
    staticClass: "btn-danger btn",
    attrs: {
      "disabled": _vm.users[_vm.user_name]
    },
    on: {
      "click": _vm.hangUp
    }
  }, [_vm._v("Hang Up")])])])]), _vm._v(" "), _c('div', {
    staticClass: "col-md-9"
  }, [_c('video', {
    attrs: {
      "id": "localVideo",
      "autoplay": ""
    }
  }), _vm._v(" "), _c('video', {
    attrs: {
      "id": "remoteVideo",
      "src": _vm.remote_video,
      "autoplay": ""
    }
  })])])]), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.accept_video),
      expression: "accept_video"
    }],
    staticClass: "preview"
  }, [_c('div', {
    staticClass: "preview-wrapper"
  }, [_c('div', {
    staticClass: "preview-container"
  }, [_c('div', {
    staticClass: "preview-body"
  }, [_c('h4', [_vm._v("您有视频邀请，是否接受?")]), _vm._v(" "), _c('button', {
    staticClass: "btn-success btn",
    on: {
      "click": _vm.accept
    }
  }, [_vm._v("接受")]), _vm._v(" "), _c('button', {
    staticClass: "btn-danger btn",
    staticStyle: {
      "margin-right": "70px"
    },
    on: {
      "click": _vm.reject
    }
  }, [_vm._v("拒绝")])]), _vm._v(" "), _c('div', {
    staticClass: "confirm",
    on: {
      "click": _vm.closePreview
    }
  }, [_vm._v("×")])])])])])
},staticRenderFns: []}

/***/ })
],[8]);
//# sourceMappingURL=app.9238f1dbfdeff878dd49.js.map