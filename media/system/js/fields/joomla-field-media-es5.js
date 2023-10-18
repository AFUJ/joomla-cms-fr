(function () {
  'use strict';

  function _regeneratorRuntime() {
    _regeneratorRuntime = function () {
      return e;
    };
    var t,
      e = {},
      r = Object.prototype,
      n = r.hasOwnProperty,
      o = Object.defineProperty || function (t, e, r) {
        t[e] = r.value;
      },
      i = "function" == typeof Symbol ? Symbol : {},
      a = i.iterator || "@@iterator",
      c = i.asyncIterator || "@@asyncIterator",
      u = i.toStringTag || "@@toStringTag";
    function define(t, e, r) {
      return Object.defineProperty(t, e, {
        value: r,
        enumerable: !0,
        configurable: !0,
        writable: !0
      }), t[e];
    }
    try {
      define({}, "");
    } catch (t) {
      define = function (t, e, r) {
        return t[e] = r;
      };
    }
    function wrap(t, e, r, n) {
      var i = e && e.prototype instanceof Generator ? e : Generator,
        a = Object.create(i.prototype),
        c = new Context(n || []);
      return o(a, "_invoke", {
        value: makeInvokeMethod(t, r, c)
      }), a;
    }
    function tryCatch(t, e, r) {
      try {
        return {
          type: "normal",
          arg: t.call(e, r)
        };
      } catch (t) {
        return {
          type: "throw",
          arg: t
        };
      }
    }
    e.wrap = wrap;
    var h = "suspendedStart",
      l = "suspendedYield",
      f = "executing",
      s = "completed",
      y = {};
    function Generator() {}
    function GeneratorFunction() {}
    function GeneratorFunctionPrototype() {}
    var p = {};
    define(p, a, function () {
      return this;
    });
    var d = Object.getPrototypeOf,
      v = d && d(d(values([])));
    v && v !== r && n.call(v, a) && (p = v);
    var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p);
    function defineIteratorMethods(t) {
      ["next", "throw", "return"].forEach(function (e) {
        define(t, e, function (t) {
          return this._invoke(e, t);
        });
      });
    }
    function AsyncIterator(t, e) {
      function invoke(r, o, i, a) {
        var c = tryCatch(t[r], t, o);
        if ("throw" !== c.type) {
          var u = c.arg,
            h = u.value;
          return h && "object" == typeof h && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) {
            invoke("next", t, i, a);
          }, function (t) {
            invoke("throw", t, i, a);
          }) : e.resolve(h).then(function (t) {
            u.value = t, i(u);
          }, function (t) {
            return invoke("throw", t, i, a);
          });
        }
        a(c.arg);
      }
      var r;
      o(this, "_invoke", {
        value: function (t, n) {
          function callInvokeWithMethodAndArg() {
            return new e(function (e, r) {
              invoke(t, n, e, r);
            });
          }
          return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
        }
      });
    }
    function makeInvokeMethod(e, r, n) {
      var o = h;
      return function (i, a) {
        if (o === f) throw new Error("Generator is already running");
        if (o === s) {
          if ("throw" === i) throw a;
          return {
            value: t,
            done: !0
          };
        }
        for (n.method = i, n.arg = a;;) {
          var c = n.delegate;
          if (c) {
            var u = maybeInvokeDelegate(c, n);
            if (u) {
              if (u === y) continue;
              return u;
            }
          }
          if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) {
            if (o === h) throw o = s, n.arg;
            n.dispatchException(n.arg);
          } else "return" === n.method && n.abrupt("return", n.arg);
          o = f;
          var p = tryCatch(e, r, n);
          if ("normal" === p.type) {
            if (o = n.done ? s : l, p.arg === y) continue;
            return {
              value: p.arg,
              done: n.done
            };
          }
          "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg);
        }
      };
    }
    function maybeInvokeDelegate(e, r) {
      var n = r.method,
        o = e.iterator[n];
      if (o === t) return r.delegate = null, "throw" === n && e.iterator.return && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y;
      var i = tryCatch(o, e.iterator, r.arg);
      if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y;
      var a = i.arg;
      return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y);
    }
    function pushTryEntry(t) {
      var e = {
        tryLoc: t[0]
      };
      1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e);
    }
    function resetTryEntry(t) {
      var e = t.completion || {};
      e.type = "normal", delete e.arg, t.completion = e;
    }
    function Context(t) {
      this.tryEntries = [{
        tryLoc: "root"
      }], t.forEach(pushTryEntry, this), this.reset(!0);
    }
    function values(e) {
      if (e || "" === e) {
        var r = e[a];
        if (r) return r.call(e);
        if ("function" == typeof e.next) return e;
        if (!isNaN(e.length)) {
          var o = -1,
            i = function next() {
              for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next;
              return next.value = t, next.done = !0, next;
            };
          return i.next = i;
        }
      }
      throw new TypeError(typeof e + " is not iterable");
    }
    return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", {
      value: GeneratorFunctionPrototype,
      configurable: !0
    }), o(GeneratorFunctionPrototype, "constructor", {
      value: GeneratorFunction,
      configurable: !0
    }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) {
      var e = "function" == typeof t && t.constructor;
      return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name));
    }, e.mark = function (t) {
      return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t;
    }, e.awrap = function (t) {
      return {
        __await: t
      };
    }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () {
      return this;
    }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) {
      void 0 === i && (i = Promise);
      var a = new AsyncIterator(wrap(t, r, n, o), i);
      return e.isGeneratorFunction(r) ? a : a.next().then(function (t) {
        return t.done ? t.value : a.next();
      });
    }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () {
      return this;
    }), define(g, "toString", function () {
      return "[object Generator]";
    }), e.keys = function (t) {
      var e = Object(t),
        r = [];
      for (var n in e) r.push(n);
      return r.reverse(), function next() {
        for (; r.length;) {
          var t = r.pop();
          if (t in e) return next.value = t, next.done = !1, next;
        }
        return next.done = !0, next;
      };
    }, e.values = values, Context.prototype = {
      constructor: Context,
      reset: function (e) {
        if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t);
      },
      stop: function () {
        this.done = !0;
        var t = this.tryEntries[0].completion;
        if ("throw" === t.type) throw t.arg;
        return this.rval;
      },
      dispatchException: function (e) {
        if (this.done) throw e;
        var r = this;
        function handle(n, o) {
          return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o;
        }
        for (var o = this.tryEntries.length - 1; o >= 0; --o) {
          var i = this.tryEntries[o],
            a = i.completion;
          if ("root" === i.tryLoc) return handle("end");
          if (i.tryLoc <= this.prev) {
            var c = n.call(i, "catchLoc"),
              u = n.call(i, "finallyLoc");
            if (c && u) {
              if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
              if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
            } else if (c) {
              if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
            } else {
              if (!u) throw new Error("try statement without catch or finally");
              if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
            }
          }
        }
      },
      abrupt: function (t, e) {
        for (var r = this.tryEntries.length - 1; r >= 0; --r) {
          var o = this.tryEntries[r];
          if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) {
            var i = o;
            break;
          }
        }
        i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null);
        var a = i ? i.completion : {};
        return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a);
      },
      complete: function (t, e) {
        if ("throw" === t.type) throw t.arg;
        return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y;
      },
      finish: function (t) {
        for (var e = this.tryEntries.length - 1; e >= 0; --e) {
          var r = this.tryEntries[e];
          if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y;
        }
      },
      catch: function (t) {
        for (var e = this.tryEntries.length - 1; e >= 0; --e) {
          var r = this.tryEntries[e];
          if (r.tryLoc === t) {
            var n = r.completion;
            if ("throw" === n.type) {
              var o = n.arg;
              resetTryEntry(r);
            }
            return o;
          }
        }
        throw new Error("illegal catch attempt");
      },
      delegateYield: function (e, r, n) {
        return this.delegate = {
          iterator: values(e),
          resultName: r,
          nextLoc: n
        }, "next" === this.method && (this.arg = t), y;
      }
    }, e;
  }
  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
      var info = gen[key](arg);
      var value = info.value;
    } catch (error) {
      reject(error);
      return;
    }
    if (info.done) {
      resolve(value);
    } else {
      Promise.resolve(value).then(_next, _throw);
    }
  }
  function _asyncToGenerator(fn) {
    return function () {
      var self = this,
        args = arguments;
      return new Promise(function (resolve, reject) {
        var gen = fn.apply(self, args);
        function _next(value) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
        }
        function _throw(err) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
        }
        _next(undefined);
      });
    };
  }
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }
  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    _setPrototypeOf(subClass, superClass);
  }
  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }
  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };
    return _setPrototypeOf(o, p);
  }
  function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;
    try {
      Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }
  function _construct(Parent, args, Class) {
    if (_isNativeReflectConstruct()) {
      _construct = Reflect.construct.bind();
    } else {
      _construct = function _construct(Parent, args, Class) {
        var a = [null];
        a.push.apply(a, args);
        var Constructor = Function.bind.apply(Parent, a);
        var instance = new Constructor();
        if (Class) _setPrototypeOf(instance, Class.prototype);
        return instance;
      };
    }
    return _construct.apply(null, arguments);
  }
  function _isNativeFunction(fn) {
    return Function.toString.call(fn).indexOf("[native code]") !== -1;
  }
  function _wrapNativeSuper(Class) {
    var _cache = typeof Map === "function" ? new Map() : undefined;
    _wrapNativeSuper = function _wrapNativeSuper(Class) {
      if (Class === null || !_isNativeFunction(Class)) return Class;
      if (typeof Class !== "function") {
        throw new TypeError("Super expression must either be null or a function");
      }
      if (typeof _cache !== "undefined") {
        if (_cache.has(Class)) return _cache.get(Class);
        _cache.set(Class, Wrapper);
      }
      function Wrapper() {
        return _construct(Class, arguments, _getPrototypeOf(this).constructor);
      }
      Wrapper.prototype = Object.create(Class.prototype, {
        constructor: {
          value: Wrapper,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
      return _setPrototypeOf(Wrapper, Class);
    };
    return _wrapNativeSuper(Class);
  }
  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
  }
  function _toPrimitive(input, hint) {
    if (typeof input !== "object" || input === null) return input;
    var prim = input[Symbol.toPrimitive];
    if (prim !== undefined) {
      var res = prim.call(input, hint || "default");
      if (typeof res !== "object") return res;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (hint === "string" ? String : Number)(input);
  }
  function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");
    return typeof key === "symbol" ? key : String(key);
  }

  /**
   * @copyright  (C) 2018 Open Source Matters, Inc. <https://www.joomla.org>
   * @license    GNU General Public License version 2 or later; see LICENSE.txt
   */
  if (!Joomla) {
    throw new Error('Joomla API is not properly initiated');
  }

  /**
   * Extract the extensions
   *
   * @param {*} path
   * @returns {string}
   */
  var getExtension = function getExtension(path) {
    var parts = path.split(/[#]/);
    if (parts.length > 1) {
      return parts[1].split(/[?]/)[0].split('.').pop().trim();
    }
    return path.split(/[#?]/)[0].split('.').pop().trim();
  };
  var JoomlaFieldMedia = /*#__PURE__*/function (_HTMLElement) {
    _inheritsLoose(JoomlaFieldMedia, _HTMLElement);
    function JoomlaFieldMedia() {
      var _this;
      _this = _HTMLElement.call(this) || this;
      _this.onSelected = _this.onSelected.bind(_assertThisInitialized(_this));
      _this.show = _this.show.bind(_assertThisInitialized(_this));
      _this.clearValue = _this.clearValue.bind(_assertThisInitialized(_this));
      _this.modalClose = _this.modalClose.bind(_assertThisInitialized(_this));
      _this.setValue = _this.setValue.bind(_assertThisInitialized(_this));
      _this.updatePreview = _this.updatePreview.bind(_assertThisInitialized(_this));
      _this.validateValue = _this.validateValue.bind(_assertThisInitialized(_this));
      _this.markValid = _this.markValid.bind(_assertThisInitialized(_this));
      _this.markInvalid = _this.markInvalid.bind(_assertThisInitialized(_this));
      _this.mimeType = '';
      return _this;
    }
    var _proto = JoomlaFieldMedia.prototype;
    // attributeChangedCallback(attr, oldValue, newValue) {}
    _proto.connectedCallback = function connectedCallback() {
      this.button = this.querySelector(this.buttonSelect);
      this.inputElement = this.querySelector(this.input);
      this.buttonClearEl = this.querySelector(this.buttonClear);
      this.modalElement = this.querySelector('.joomla-modal');
      this.buttonSaveSelectedElement = this.querySelector(this.buttonSaveSelected);
      this.previewElement = this.querySelector('.field-media-preview');
      if (!this.button || !this.inputElement || !this.buttonClearEl || !this.modalElement || !this.buttonSaveSelectedElement) {
        throw new Error('Misconfiguaration...');
      }
      this.button.addEventListener('click', this.show);

      // Bootstrap modal init
      if (this.modalElement && window.bootstrap && window.bootstrap.Modal && !window.bootstrap.Modal.getInstance(this.modalElement)) {
        Joomla.initialiseModal(this.modalElement, {
          isJoomla: true
        });
      }
      if (this.buttonClearEl) {
        this.buttonClearEl.addEventListener('click', this.clearValue);
      }
      this.supportedExtensions = Joomla.getOptions('media-picker', {});
      if (!Object.keys(this.supportedExtensions).length) {
        throw new Error('Joomla API is not properly initiated');
      }
      this.inputElement.removeAttribute('readonly');
      this.inputElement.addEventListener('change', this.validateValue);
      this.updatePreview();
    };
    _proto.disconnectedCallback = function disconnectedCallback() {
      if (this.button) {
        this.button.removeEventListener('click', this.show);
      }
      if (this.buttonClearEl) {
        this.buttonClearEl.removeEventListener('click', this.clearValue);
      }
      if (this.inputElement) {
        this.inputElement.removeEventListener('change', this.validateValue);
      }
    };
    _proto.onSelected = function onSelected(event) {
      event.preventDefault();
      event.stopPropagation();
      this.modalClose();
      return false;
    };
    _proto.show = function show() {
      this.modalElement.open();
      Joomla.selectedMediaFile = {};
      this.buttonSaveSelectedElement.addEventListener('click', this.onSelected);
    };
    _proto.modalClose = /*#__PURE__*/function () {
      var _modalClose = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return Joomla.getMedia(Joomla.selectedMediaFile, this.inputElement, this);
            case 3:
              _context.next = 8;
              break;
            case 5:
              _context.prev = 5;
              _context.t0 = _context["catch"](0);
              Joomla.renderMessages({
                error: [Joomla.Text._('JLIB_APPLICATION_ERROR_SERVER')]
              });
            case 8:
              Joomla.selectedMediaFile = {};
              Joomla.Modal.getCurrent().close();
            case 10:
            case "end":
              return _context.stop();
          }
        }, _callee, this, [[0, 5]]);
      }));
      function modalClose() {
        return _modalClose.apply(this, arguments);
      }
      return modalClose;
    }();
    _proto.setValue = function setValue(value) {
      this.inputElement.value = value;
      this.validatedUrl = value;
      this.mimeType = Joomla.selectedMediaFile.fileType;
      this.updatePreview();

      // trigger change event both on the input and on the custom element
      this.inputElement.dispatchEvent(new Event('change'));
      this.dispatchEvent(new CustomEvent('change', {
        detail: {
          value: value
        },
        bubbles: true
      }));
    };
    _proto.validateValue = /*#__PURE__*/function () {
      var _validateValue = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(event) {
        var _this2 = this;
        var value, hashedUrl, urlParts, rest;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              value = event.target.value;
              if (!(this.validatedUrl === value || value === '')) {
                _context2.next = 3;
                break;
              }
              return _context2.abrupt("return");
            case 3:
              if (/^(http(s)?:\/\/).+$/.test(value)) {
                try {
                  fetch(value).then(function (response) {
                    if (response.status === 200) {
                      _this2.validatedUrl = value;
                      _this2.markValid();
                    } else {
                      _this2.validatedUrl = value;
                      _this2.markInvalid();
                    }
                  });
                } catch (err) {
                  this.validatedUrl = value;
                  this.markInvalid();
                }
              } else {
                if (/^\//.test(value)) {
                  value = value.substring(1);
                }
                hashedUrl = value.split('#');
                urlParts = hashedUrl[0].split('/');
                rest = urlParts.slice(1);
                fetch(Joomla.getOptions('system.paths').rootFull + "/" + value).then(function (response) {
                  return response.blob();
                }).then(function (blob) {
                  if (blob.type.includes('image')) {
                    var img = new Image();
                    img.src = URL.createObjectURL(blob);
                    img.onload = function () {
                      _this2.inputElement.value = urlParts[0] + "/" + rest.join('/') + "#joomlaImage://local-" + urlParts[0] + "/" + rest.join('/') + "?width=" + img.width + "&height=" + img.height;
                      _this2.validatedUrl = urlParts[0] + "/" + rest.join('/') + "#joomlaImage://local-" + urlParts[0] + "/" + rest.join('/') + "?width=" + img.width + "&height=" + img.height;
                      _this2.markValid();
                    };
                  } else if (blob.type.includes('audio')) {
                    _this2.mimeType = blob.type;
                    _this2.inputElement.value = value;
                    _this2.validatedUrl = value;
                    _this2.markValid();
                  } else if (blob.type.includes('video')) {
                    _this2.mimeType = blob.type;
                    _this2.inputElement.value = value;
                    _this2.validatedUrl = value;
                    _this2.markValid();
                  } else if (blob.type.includes('application/pdf')) {
                    _this2.mimeType = blob.type;
                    _this2.inputElement.value = value;
                    _this2.validatedUrl = value;
                    _this2.markValid();
                  } else {
                    _this2.validatedUrl = value;
                    _this2.markInvalid();
                  }
                }).catch(function () {
                  _this2.setValue(value);
                  _this2.validatedUrl = value;
                  _this2.markInvalid();
                });
              }
            case 4:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function validateValue(_x) {
        return _validateValue.apply(this, arguments);
      }
      return validateValue;
    }();
    _proto.markValid = function markValid() {
      this.inputElement.removeAttribute('required');
      this.inputElement.removeAttribute('pattern');
      if (document.formvalidator) {
        document.formvalidator.validate(this.inputElement);
      }
    };
    _proto.markInvalid = function markInvalid() {
      this.inputElement.setAttribute('required', '');
      this.inputElement.setAttribute('pattern', '/^(http://INVALID/).+$/');
      if (document.formvalidator) {
        document.formvalidator.validate(this.inputElement);
      }
    };
    _proto.clearValue = function clearValue() {
      this.setValue('');
      this.validatedUrl = '';
      this.inputElement.removeAttribute('required');
      this.inputElement.removeAttribute('pattern');
      if (document.formvalidator) {
        document.formvalidator.validate(this.inputElement);
      }
    };
    _proto.updatePreview = function updatePreview() {
      var _this3 = this;
      if (['true', 'static'].indexOf(this.preview) === -1 || this.preview === 'false' || !this.previewElement) {
        return;
      }

      // Reset preview
      if (this.preview) {
        var value = this.inputElement.value;
        var supportedExtensions = this.supportedExtensions;
        if (!value) {
          this.buttonClearEl.style.display = 'none';
          this.previewElement.innerHTML = Joomla.sanitizeHtml('<span class="field-media-preview-icon"></span>');
        } else {
          var type;
          this.buttonClearEl.style.display = '';
          this.previewElement.innerHTML = '';
          var ext = getExtension(value).toLowerCase();
          if (supportedExtensions.images.includes(ext)) type = 'images';
          if (supportedExtensions.audios.includes(ext)) type = 'audios';
          if (supportedExtensions.videos.includes(ext)) type = 'videos';
          if (supportedExtensions.documents.includes(ext)) type = 'documents';
          var previewElement;
          var mediaType = {
            images: function images() {
              if (supportedExtensions.images.includes(ext)) {
                previewElement = new Image();
                previewElement.src = /http/.test(value) ? value : Joomla.getOptions('system.paths').rootFull + value;
                previewElement.setAttribute('alt', '');
              }
            },
            audios: function audios() {
              if (supportedExtensions.audios.includes(ext)) {
                previewElement = document.createElement('audio');
                previewElement.src = /http/.test(value) ? value : Joomla.getOptions('system.paths').rootFull + value;
                previewElement.setAttribute('controls', '');
              }
            },
            videos: function videos() {
              if (supportedExtensions.videos.includes(ext)) {
                previewElement = document.createElement('video');
                var previewElementSource = document.createElement('source');
                previewElementSource.src = /http/.test(value) ? value : Joomla.getOptions('system.paths').rootFull + value;
                previewElementSource.type = _this3.mimeType;
                previewElement.setAttribute('controls', '');
                previewElement.setAttribute('width', _this3.previewWidth);
                previewElement.setAttribute('height', _this3.previewHeight);
                previewElement.appendChild(previewElementSource);
              }
            },
            documents: function documents() {
              if (supportedExtensions.documents.includes(ext)) {
                previewElement = document.createElement('object');
                previewElement.data = /http/.test(value) ? value : Joomla.getOptions('system.paths').rootFull + value;
                previewElement.type = _this3.mimeType;
                previewElement.setAttribute('width', _this3.previewWidth);
                previewElement.setAttribute('height', _this3.previewHeight);
              }
            }
          };

          // @todo more checks
          if (this.givenType && ['images', 'audios', 'videos', 'documents'].includes(this.givenType)) {
            mediaType[this.givenType]();
          } else if (type && ['images', 'audios', 'videos', 'documents'].includes(type)) {
            mediaType[type]();
          } else {
            return;
          }
          this.previewElement.style.width = this.previewWidth;
          this.previewElement.appendChild(previewElement);
        }
      }
    };
    _createClass(JoomlaFieldMedia, [{
      key: "type",
      get: function get() {
        return this.getAttribute('type');
      },
      set: function set(value) {
        this.setAttribute('type', value);
      }
    }, {
      key: "basePath",
      get: function get() {
        return this.getAttribute('base-path');
      },
      set: function set(value) {
        this.setAttribute('base-path', value);
      }
    }, {
      key: "rootFolder",
      get: function get() {
        return this.getAttribute('root-folder');
      },
      set: function set(value) {
        this.setAttribute('root-folder', value);
      }
    }, {
      key: "url",
      get: function get() {
        return this.getAttribute('url');
      },
      set: function set(value) {
        this.setAttribute('url', value);
      }
    }, {
      key: "modalContainer",
      get: function get() {
        return this.getAttribute('modal-container');
      },
      set: function set(value) {
        this.setAttribute('modal-container', value);
      }
    }, {
      key: "input",
      get: function get() {
        return this.getAttribute('input');
      },
      set: function set(value) {
        this.setAttribute('input', value);
      }
    }, {
      key: "buttonSelect",
      get: function get() {
        return this.getAttribute('button-select');
      },
      set: function set(value) {
        this.setAttribute('button-select', value);
      }
    }, {
      key: "buttonClear",
      get: function get() {
        return this.getAttribute('button-clear');
      },
      set: function set(value) {
        this.setAttribute('button-clear', value);
      }
    }, {
      key: "buttonSaveSelected",
      get: function get() {
        return this.getAttribute('button-save-selected');
      },
      set: function set(value) {
        this.setAttribute('button-save-selected', value);
      }
    }, {
      key: "modalWidth",
      get: function get() {
        return parseInt(this.getAttribute('modal-width'), 10);
      },
      set: function set(value) {
        this.setAttribute('modal-width', value);
      }
    }, {
      key: "modalHeight",
      get: function get() {
        return parseInt(this.getAttribute('modal-height'), 10);
      },
      set: function set(value) {
        this.setAttribute('modal-height', value);
      }
    }, {
      key: "previewWidth",
      get: function get() {
        return parseInt(this.getAttribute('preview-width'), 10);
      },
      set: function set(value) {
        this.setAttribute('preview-width', value);
      }
    }, {
      key: "previewHeight",
      get: function get() {
        return parseInt(this.getAttribute('preview-height'), 10);
      },
      set: function set(value) {
        this.setAttribute('preview-height', value);
      }
    }, {
      key: "preview",
      get: function get() {
        return this.getAttribute('preview');
      },
      set: function set(value) {
        this.setAttribute('preview', value);
      }
    }, {
      key: "previewContainer",
      get: function get() {
        return this.getAttribute('preview-container');
      }
    }], [{
      key: "observedAttributes",
      get: function get() {
        return ['type', 'base-path', 'root-folder', 'url', 'modal-container', 'modal-width', 'modal-height', 'input', 'button-select', 'button-clear', 'button-save-selected', 'preview', 'preview-width', 'preview-height'];
      }
    }]);
    return JoomlaFieldMedia;
  }( /*#__PURE__*/_wrapNativeSuper(HTMLElement));
  customElements.define('joomla-field-media', JoomlaFieldMedia);

})();
