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
  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };
    return _setPrototypeOf(o, p);
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

  /*! shepherd.js 11.2.0 */

  var isMergeableObject = function isMergeableObject(value) {
    return isNonNullObject(value) && !isSpecial(value);
  };
  function isNonNullObject(value) {
    return !!value && typeof value === 'object';
  }
  function isSpecial(value) {
    var stringValue = Object.prototype.toString.call(value);
    return stringValue === '[object RegExp]' || stringValue === '[object Date]' || isReactElement(value);
  }

  // see https://github.com/facebook/react/blob/b5ac963fb791d1298e7f396236383bc955f916c1/src/isomorphic/classic/element/ReactElement.js#L21-L25
  var canUseSymbol = typeof Symbol === 'function' && Symbol.for;
  var REACT_ELEMENT_TYPE = canUseSymbol ? Symbol.for('react.element') : 0xeac7;
  function isReactElement(value) {
    return value.$$typeof === REACT_ELEMENT_TYPE;
  }
  function emptyTarget(val) {
    return Array.isArray(val) ? [] : {};
  }
  function cloneUnlessOtherwiseSpecified(value, options) {
    return options.clone !== false && options.isMergeableObject(value) ? deepmerge(emptyTarget(value), value, options) : value;
  }
  function defaultArrayMerge(target, source, options) {
    return target.concat(source).map(function (element) {
      return cloneUnlessOtherwiseSpecified(element, options);
    });
  }
  function getMergeFunction(key, options) {
    if (!options.customMerge) {
      return deepmerge;
    }
    var customMerge = options.customMerge(key);
    return typeof customMerge === 'function' ? customMerge : deepmerge;
  }
  function getEnumerableOwnPropertySymbols(target) {
    return Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(target).filter(function (symbol) {
      return Object.propertyIsEnumerable.call(target, symbol);
    }) : [];
  }
  function getKeys(target) {
    return Object.keys(target).concat(getEnumerableOwnPropertySymbols(target));
  }
  function propertyIsOnObject(object, property) {
    try {
      return property in object;
    } catch (_) {
      return false;
    }
  }

  // Protects from prototype poisoning and unexpected merging up the prototype chain.
  function propertyIsUnsafe(target, key) {
    return propertyIsOnObject(target, key) // Properties are safe to merge if they don't exist in the target yet,
    && !(Object.hasOwnProperty.call(target, key) // unsafe if they exist up the prototype chain,
    && Object.propertyIsEnumerable.call(target, key)); // and also unsafe if they're nonenumerable.
  }

  function mergeObject(target, source, options) {
    var destination = {};
    if (options.isMergeableObject(target)) {
      getKeys(target).forEach(function (key) {
        destination[key] = cloneUnlessOtherwiseSpecified(target[key], options);
      });
    }
    getKeys(source).forEach(function (key) {
      if (propertyIsUnsafe(target, key)) {
        return;
      }
      if (propertyIsOnObject(target, key) && options.isMergeableObject(source[key])) {
        destination[key] = getMergeFunction(key, options)(target[key], source[key], options);
      } else {
        destination[key] = cloneUnlessOtherwiseSpecified(source[key], options);
      }
    });
    return destination;
  }
  function deepmerge(target, source, options) {
    options = options || {};
    options.arrayMerge = options.arrayMerge || defaultArrayMerge;
    options.isMergeableObject = options.isMergeableObject || isMergeableObject;
    // cloneUnlessOtherwiseSpecified is added to `options` so that custom arrayMerge()
    // implementations can use it. The caller may not replace it.
    options.cloneUnlessOtherwiseSpecified = cloneUnlessOtherwiseSpecified;
    var sourceIsArray = Array.isArray(source);
    var targetIsArray = Array.isArray(target);
    var sourceAndTargetTypesMatch = sourceIsArray === targetIsArray;
    if (!sourceAndTargetTypesMatch) {
      return cloneUnlessOtherwiseSpecified(source, options);
    } else if (sourceIsArray) {
      return options.arrayMerge(target, source, options);
    } else {
      return mergeObject(target, source, options);
    }
  }
  deepmerge.all = function deepmergeAll(array, options) {
    if (!Array.isArray(array)) {
      throw new Error('first argument should be an array');
    }
    return array.reduce(function (prev, next) {
      return deepmerge(prev, next, options);
    }, {});
  };
  var deepmerge_1 = deepmerge;
  var cjs = deepmerge_1;

  /**
   * Checks if `value` is classified as an `Element`.
   * @param {*} value The param to check if it is an Element
   */
  function isElement$1(value) {
    return value instanceof Element;
  }

  /**
   * Checks if `value` is classified as an `HTMLElement`.
   * @param {*} value The param to check if it is an HTMLElement
   */
  function isHTMLElement$1(value) {
    return value instanceof HTMLElement;
  }

  /**
   * Checks if `value` is classified as a `Function` object.
   * @param {*} value The param to check if it is a function
   */
  function isFunction(value) {
    return typeof value === 'function';
  }

  /**
   * Checks if `value` is classified as a `String` object.
   * @param {*} value The param to check if it is a string
   */
  function isString(value) {
    return typeof value === 'string';
  }

  /**
   * Checks if `value` is undefined.
   * @param {*} value The param to check if it is undefined
   */
  function isUndefined(value) {
    return value === undefined;
  }
  var Evented = /*#__PURE__*/function () {
    function Evented() {}
    var _proto = Evented.prototype;
    _proto.on = function on(event, handler, ctx, once) {
      if (once === void 0) {
        once = false;
      }
      if (isUndefined(this.bindings)) {
        this.bindings = {};
      }
      if (isUndefined(this.bindings[event])) {
        this.bindings[event] = [];
      }
      this.bindings[event].push({
        handler: handler,
        ctx: ctx,
        once: once
      });
      return this;
    };
    _proto.once = function once(event, handler, ctx) {
      return this.on(event, handler, ctx, true);
    };
    _proto.off = function off(event, handler) {
      var _this = this;
      if (isUndefined(this.bindings) || isUndefined(this.bindings[event])) {
        return this;
      }
      if (isUndefined(handler)) {
        delete this.bindings[event];
      } else {
        this.bindings[event].forEach(function (binding, index) {
          if (binding.handler === handler) {
            _this.bindings[event].splice(index, 1);
          }
        });
      }
      return this;
    };
    _proto.trigger = function trigger(event) {
      var _this2 = this;
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }
      if (!isUndefined(this.bindings) && this.bindings[event]) {
        this.bindings[event].forEach(function (binding, index) {
          var ctx = binding.ctx,
            handler = binding.handler,
            once = binding.once;
          var context = ctx || _this2;
          handler.apply(context, args);
          if (once) {
            _this2.bindings[event].splice(index, 1);
          }
        });
      }
      return this;
    };
    return Evented;
  }();
  /**
   * Binds all the methods on a JS Class to the `this` context of the class.
   * Adapted from https://github.com/sindresorhus/auto-bind
   * @param {object} self The `this` context of the class
   * @return {object} The `this` context of the class
   */
  function autoBind(self) {
    var keys = Object.getOwnPropertyNames(self.constructor.prototype);
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      var val = self[key];
      if (key !== 'constructor' && typeof val === 'function') {
        self[key] = val.bind(self);
      }
    }
    return self;
  }

  /**
   * Sets up the handler to determine if we should advance the tour
   * @param {string} selector
   * @param {Step} step The step instance
   * @return {Function}
   * @private
   */
  function _setupAdvanceOnHandler(selector, step) {
    return function (event) {
      if (step.isOpen()) {
        var targetIsEl = step.el && event.currentTarget === step.el;
        var targetIsSelector = !isUndefined(selector) && event.currentTarget.matches(selector);
        if (targetIsSelector || targetIsEl) {
          step.tour.next();
        }
      }
    };
  }

  /**
   * Bind the event handler for advanceOn
   * @param {Step} step The step instance
   */
  function bindAdvance(step) {
    // An empty selector matches the step element
    var _ref2 = step.options.advanceOn || {},
      event = _ref2.event,
      selector = _ref2.selector;
    if (event) {
      var handler = _setupAdvanceOnHandler(selector, step);

      // TODO: this should also bind/unbind on show/hide
      var el;
      try {
        el = document.querySelector(selector);
      } catch (e) {
        // TODO
      }
      if (!isUndefined(selector) && !el) {
        return console.error("No element was found for the selector supplied to advanceOn: " + selector);
      } else if (el) {
        el.addEventListener(event, handler);
        step.on('destroy', function () {
          return el.removeEventListener(event, handler);
        });
      } else {
        document.body.addEventListener(event, handler, true);
        step.on('destroy', function () {
          return document.body.removeEventListener(event, handler, true);
        });
      }
    } else {
      return console.error('advanceOn was defined, but no event name was passed.');
    }
  }

  /**
   * Ensure class prefix ends in `-`
   * @param {string} prefix The prefix to prepend to the class names generated by nano-css
   * @return {string} The prefix ending in `-`
   */
  function normalizePrefix(prefix) {
    if (!isString(prefix) || prefix === '') {
      return '';
    }
    return prefix.charAt(prefix.length - 1) !== '-' ? prefix + "-" : prefix;
  }

  /**
   * Resolves attachTo options, converting element option value to a qualified HTMLElement.
   * @param {Step} step The step instance
   * @returns {{}|{element, on}}
   * `element` is a qualified HTML Element
   * `on` is a string position value
   */
  function parseAttachTo(step) {
    var options = step.options.attachTo || {};
    var returnOpts = Object.assign({}, options);
    if (isFunction(returnOpts.element)) {
      // Bind the callback to step so that it has access to the object, to enable running additional logic
      returnOpts.element = returnOpts.element.call(step);
    }
    if (isString(returnOpts.element)) {
      // Can't override the element in user opts reference because we can't
      // guarantee that the element will exist in the future.
      try {
        returnOpts.element = document.querySelector(returnOpts.element);
      } catch (e) {
        // TODO
      }
      if (!returnOpts.element) {
        console.error("The element for this Shepherd step was not found " + options.element);
      }
    }
    return returnOpts;
  }

  /**
   * Checks if the step should be centered or not. Does not trigger attachTo.element evaluation, making it a pure
   * alternative for the deprecated step.isCentered() method.
   * @param resolvedAttachToOptions
   * @returns {boolean}
   */
  function shouldCenterStep(resolvedAttachToOptions) {
    if (resolvedAttachToOptions === undefined || resolvedAttachToOptions === null) {
      return true;
    }
    return !resolvedAttachToOptions.element || !resolvedAttachToOptions.on;
  }

  /**
   * Create a unique id for steps, tours, modals, etc
   * @return {string}
   */
  function uuid() {
    var d = Date.now();
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c == 'x' ? r : r & 0x3 | 0x8).toString(16);
    });
  }
  function _extends() {
    _extends = Object.assign ? Object.assign.bind() : function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
    return _extends.apply(this, arguments);
  }
  function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;
    for (i = 0; i < sourceKeys.length; i++) {
      key = sourceKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }
    return target;
  }
  var min = Math.min;
  var max = Math.max;
  var round = Math.round;
  var floor = Math.floor;
  var createCoords = function createCoords(v) {
    return {
      x: v,
      y: v
    };
  };
  var oppositeSideMap = {
    left: 'right',
    right: 'left',
    bottom: 'top',
    top: 'bottom'
  };
  var oppositeAlignmentMap = {
    start: 'end',
    end: 'start'
  };
  function clamp(start, value, end) {
    return max(start, min(value, end));
  }
  function evaluate(value, param) {
    return typeof value === 'function' ? value(param) : value;
  }
  function getSide(placement) {
    return placement.split('-')[0];
  }
  function getAlignment(placement) {
    return placement.split('-')[1];
  }
  function getOppositeAxis(axis) {
    return axis === 'x' ? 'y' : 'x';
  }
  function getAxisLength(axis) {
    return axis === 'y' ? 'height' : 'width';
  }
  function getSideAxis(placement) {
    return ['top', 'bottom'].includes(getSide(placement)) ? 'y' : 'x';
  }
  function getAlignmentAxis(placement) {
    return getOppositeAxis(getSideAxis(placement));
  }
  function getAlignmentSides(placement, rects, rtl) {
    if (rtl === void 0) {
      rtl = false;
    }
    var alignment = getAlignment(placement);
    var alignmentAxis = getAlignmentAxis(placement);
    var length = getAxisLength(alignmentAxis);
    var mainAlignmentSide = alignmentAxis === 'x' ? alignment === (rtl ? 'end' : 'start') ? 'right' : 'left' : alignment === 'start' ? 'bottom' : 'top';
    if (rects.reference[length] > rects.floating[length]) {
      mainAlignmentSide = getOppositePlacement(mainAlignmentSide);
    }
    return [mainAlignmentSide, getOppositePlacement(mainAlignmentSide)];
  }
  function getExpandedPlacements(placement) {
    var oppositePlacement = getOppositePlacement(placement);
    return [getOppositeAlignmentPlacement(placement), oppositePlacement, getOppositeAlignmentPlacement(oppositePlacement)];
  }
  function getOppositeAlignmentPlacement(placement) {
    return placement.replace(/start|end/g, function (alignment) {
      return oppositeAlignmentMap[alignment];
    });
  }
  function getSideList(side, isStart, rtl) {
    var lr = ['left', 'right'];
    var rl = ['right', 'left'];
    var tb = ['top', 'bottom'];
    var bt = ['bottom', 'top'];
    switch (side) {
      case 'top':
      case 'bottom':
        if (rtl) return isStart ? rl : lr;
        return isStart ? lr : rl;
      case 'left':
      case 'right':
        return isStart ? tb : bt;
      default:
        return [];
    }
  }
  function getOppositeAxisPlacements(placement, flipAlignment, direction, rtl) {
    var alignment = getAlignment(placement);
    var list = getSideList(getSide(placement), direction === 'start', rtl);
    if (alignment) {
      list = list.map(function (side) {
        return side + "-" + alignment;
      });
      if (flipAlignment) {
        list = list.concat(list.map(getOppositeAlignmentPlacement));
      }
    }
    return list;
  }
  function getOppositePlacement(placement) {
    return placement.replace(/left|right|bottom|top/g, function (side) {
      return oppositeSideMap[side];
    });
  }
  function expandPaddingObject(padding) {
    return _extends({
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    }, padding);
  }
  function getPaddingObject(padding) {
    return typeof padding !== 'number' ? expandPaddingObject(padding) : {
      top: padding,
      right: padding,
      bottom: padding,
      left: padding
    };
  }
  function rectToClientRect(rect) {
    return _extends({}, rect, {
      top: rect.y,
      left: rect.x,
      right: rect.x + rect.width,
      bottom: rect.y + rect.height
    });
  }
  var _excluded2 = ["mainAxis", "crossAxis", "fallbackPlacements", "fallbackStrategy", "fallbackAxisSideDirection", "flipAlignment"],
    _excluded4 = ["mainAxis", "crossAxis", "limiter"];
  function computeCoordsFromPlacement(_ref, placement, rtl) {
    var reference = _ref.reference,
      floating = _ref.floating;
    var sideAxis = getSideAxis(placement);
    var alignmentAxis = getAlignmentAxis(placement);
    var alignLength = getAxisLength(alignmentAxis);
    var side = getSide(placement);
    var isVertical = sideAxis === 'y';
    var commonX = reference.x + reference.width / 2 - floating.width / 2;
    var commonY = reference.y + reference.height / 2 - floating.height / 2;
    var commonAlign = reference[alignLength] / 2 - floating[alignLength] / 2;
    var coords;
    switch (side) {
      case 'top':
        coords = {
          x: commonX,
          y: reference.y - floating.height
        };
        break;
      case 'bottom':
        coords = {
          x: commonX,
          y: reference.y + reference.height
        };
        break;
      case 'right':
        coords = {
          x: reference.x + reference.width,
          y: commonY
        };
        break;
      case 'left':
        coords = {
          x: reference.x - floating.width,
          y: commonY
        };
        break;
      default:
        coords = {
          x: reference.x,
          y: reference.y
        };
    }
    switch (getAlignment(placement)) {
      case 'start':
        coords[alignmentAxis] -= commonAlign * (rtl && isVertical ? -1 : 1);
        break;
      case 'end':
        coords[alignmentAxis] += commonAlign * (rtl && isVertical ? -1 : 1);
        break;
    }
    return coords;
  }

  /**
   * Computes the `x` and `y` coordinates that will place the floating element
   * next to a reference element when it is given a certain positioning strategy.
   *
   * This export does not have any `platform` interface logic. You will need to
   * write one for the platform you are using Floating UI with.
   */
  var computePosition$1 = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(reference, floating, config) {
      var _config$placement, placement, _config$strategy, strategy, _config$middleware, middleware, platform, validMiddleware, rtl, rects, _computeCoordsFromPla, x, y, statefulPlacement, middlewareData, resetCount, i, _extends2, _validMiddleware$i, name, fn, _yield$fn, nextX, nextY, data, reset, _computeCoordsFromPla2;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _config$placement = config.placement, placement = _config$placement === void 0 ? 'bottom' : _config$placement, _config$strategy = config.strategy, strategy = _config$strategy === void 0 ? 'absolute' : _config$strategy, _config$middleware = config.middleware, middleware = _config$middleware === void 0 ? [] : _config$middleware, platform = config.platform;
            validMiddleware = middleware.filter(Boolean);
            _context.next = 4;
            return platform.isRTL == null ? void 0 : platform.isRTL(floating);
          case 4:
            rtl = _context.sent;
            _context.next = 7;
            return platform.getElementRects({
              reference: reference,
              floating: floating,
              strategy: strategy
            });
          case 7:
            rects = _context.sent;
            _computeCoordsFromPla = computeCoordsFromPlacement(rects, placement, rtl), x = _computeCoordsFromPla.x, y = _computeCoordsFromPla.y;
            statefulPlacement = placement;
            middlewareData = {};
            resetCount = 0;
            i = 0;
          case 13:
            if (!(i < validMiddleware.length)) {
              _context.next = 46;
              break;
            }
            _validMiddleware$i = validMiddleware[i], name = _validMiddleware$i.name, fn = _validMiddleware$i.fn;
            _context.next = 17;
            return fn({
              x: x,
              y: y,
              initialPlacement: placement,
              placement: statefulPlacement,
              strategy: strategy,
              middlewareData: middlewareData,
              rects: rects,
              platform: platform,
              elements: {
                reference: reference,
                floating: floating
              }
            });
          case 17:
            _yield$fn = _context.sent;
            nextX = _yield$fn.x;
            nextY = _yield$fn.y;
            data = _yield$fn.data;
            reset = _yield$fn.reset;
            x = nextX != null ? nextX : x;
            y = nextY != null ? nextY : y;
            middlewareData = _extends({}, middlewareData, (_extends2 = {}, _extends2[name] = _extends({}, middlewareData[name], data), _extends2));
            if (!(reset && resetCount <= 50)) {
              _context.next = 43;
              break;
            }
            resetCount++;
            if (!(typeof reset === 'object')) {
              _context.next = 41;
              break;
            }
            if (reset.placement) {
              statefulPlacement = reset.placement;
            }
            if (!reset.rects) {
              _context.next = 38;
              break;
            }
            if (!(reset.rects === true)) {
              _context.next = 36;
              break;
            }
            _context.next = 33;
            return platform.getElementRects({
              reference: reference,
              floating: floating,
              strategy: strategy
            });
          case 33:
            _context.t0 = _context.sent;
            _context.next = 37;
            break;
          case 36:
            _context.t0 = reset.rects;
          case 37:
            rects = _context.t0;
          case 38:
            _computeCoordsFromPla2 = computeCoordsFromPlacement(rects, statefulPlacement, rtl);
            x = _computeCoordsFromPla2.x;
            y = _computeCoordsFromPla2.y;
          case 41:
            i = -1;
            return _context.abrupt("continue", 43);
          case 43:
            i++;
            _context.next = 13;
            break;
          case 46:
            return _context.abrupt("return", {
              x: x,
              y: y,
              placement: statefulPlacement,
              strategy: strategy,
              middlewareData: middlewareData
            });
          case 47:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return function computePosition$1(_x, _x2, _x3) {
      return _ref3.apply(this, arguments);
    };
  }();

  /**
   * Resolves with an object of overflow side offsets that determine how much the
   * element is overflowing a given clipping boundary on each side.
   * - positive = overflowing the boundary by that number of pixels
   * - negative = how many pixels left before it will overflow
   * - 0 = lies flush with the boundary
   * @see https://floating-ui.com/docs/detectOverflow
   */
  function detectOverflow(_x4, _x5) {
    return _detectOverflow.apply(this, arguments);
  }
  /**
   * Provides data to position an inner element of the floating element so that it
   * appears centered to the reference element.
   * @see https://floating-ui.com/docs/arrow
   */
  function _detectOverflow() {
    _detectOverflow = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(state, options) {
      var _await$platform$isEle, x, y, platform, rects, elements, strategy, _evaluate3, _evaluate3$boundary, boundary, _evaluate3$rootBounda, rootBoundary, _evaluate3$elementCon, elementContext, _evaluate3$altBoundar, altBoundary, _evaluate3$padding, padding, paddingObject, altContext, element, clippingClientRect, rect, offsetParent, offsetScale, elementClientRect;
      return _regeneratorRuntime().wrap(function _callee7$(_context7) {
        while (1) switch (_context7.prev = _context7.next) {
          case 0:
            if (options === void 0) {
              options = {};
            }
            x = state.x, y = state.y, platform = state.platform, rects = state.rects, elements = state.elements, strategy = state.strategy;
            _evaluate3 = evaluate(options, state), _evaluate3$boundary = _evaluate3.boundary, boundary = _evaluate3$boundary === void 0 ? 'clippingAncestors' : _evaluate3$boundary, _evaluate3$rootBounda = _evaluate3.rootBoundary, rootBoundary = _evaluate3$rootBounda === void 0 ? 'viewport' : _evaluate3$rootBounda, _evaluate3$elementCon = _evaluate3.elementContext, elementContext = _evaluate3$elementCon === void 0 ? 'floating' : _evaluate3$elementCon, _evaluate3$altBoundar = _evaluate3.altBoundary, altBoundary = _evaluate3$altBoundar === void 0 ? false : _evaluate3$altBoundar, _evaluate3$padding = _evaluate3.padding, padding = _evaluate3$padding === void 0 ? 0 : _evaluate3$padding;
            paddingObject = getPaddingObject(padding);
            altContext = elementContext === 'floating' ? 'reference' : 'floating';
            element = elements[altBoundary ? altContext : elementContext];
            _context7.t0 = rectToClientRect;
            _context7.t1 = platform;
            _context7.next = 10;
            return platform.isElement == null ? void 0 : platform.isElement(element);
          case 10:
            _context7.t2 = _await$platform$isEle = _context7.sent;
            if (!(_context7.t2 != null)) {
              _context7.next = 15;
              break;
            }
            _context7.t3 = _await$platform$isEle;
            _context7.next = 16;
            break;
          case 15:
            _context7.t3 = true;
          case 16:
            if (!_context7.t3) {
              _context7.next = 20;
              break;
            }
            _context7.t4 = element;
            _context7.next = 26;
            break;
          case 20:
            _context7.t5 = element.contextElement;
            if (_context7.t5) {
              _context7.next = 25;
              break;
            }
            _context7.next = 24;
            return platform.getDocumentElement == null ? void 0 : platform.getDocumentElement(elements.floating);
          case 24:
            _context7.t5 = _context7.sent;
          case 25:
            _context7.t4 = _context7.t5;
          case 26:
            _context7.t6 = _context7.t4;
            _context7.t7 = boundary;
            _context7.t8 = rootBoundary;
            _context7.t9 = strategy;
            _context7.t10 = {
              element: _context7.t6,
              boundary: _context7.t7,
              rootBoundary: _context7.t8,
              strategy: _context7.t9
            };
            _context7.next = 33;
            return _context7.t1.getClippingRect.call(_context7.t1, _context7.t10);
          case 33:
            _context7.t11 = _context7.sent;
            clippingClientRect = (0, _context7.t0)(_context7.t11);
            rect = elementContext === 'floating' ? _extends({}, rects.floating, {
              x: x,
              y: y
            }) : rects.reference;
            _context7.next = 38;
            return platform.getOffsetParent == null ? void 0 : platform.getOffsetParent(elements.floating);
          case 38:
            offsetParent = _context7.sent;
            _context7.next = 41;
            return platform.isElement == null ? void 0 : platform.isElement(offsetParent);
          case 41:
            if (!_context7.sent) {
              _context7.next = 50;
              break;
            }
            _context7.next = 44;
            return platform.getScale == null ? void 0 : platform.getScale(offsetParent);
          case 44:
            _context7.t13 = _context7.sent;
            if (_context7.t13) {
              _context7.next = 47;
              break;
            }
            _context7.t13 = {
              x: 1,
              y: 1
            };
          case 47:
            _context7.t12 = _context7.t13;
            _context7.next = 51;
            break;
          case 50:
            _context7.t12 = {
              x: 1,
              y: 1
            };
          case 51:
            offsetScale = _context7.t12;
            _context7.t14 = rectToClientRect;
            if (!platform.convertOffsetParentRelativeRectToViewportRelativeRect) {
              _context7.next = 59;
              break;
            }
            _context7.next = 56;
            return platform.convertOffsetParentRelativeRectToViewportRelativeRect({
              rect: rect,
              offsetParent: offsetParent,
              strategy: strategy
            });
          case 56:
            _context7.t15 = _context7.sent;
            _context7.next = 60;
            break;
          case 59:
            _context7.t15 = rect;
          case 60:
            _context7.t16 = _context7.t15;
            elementClientRect = (0, _context7.t14)(_context7.t16);
            return _context7.abrupt("return", {
              top: (clippingClientRect.top - elementClientRect.top + paddingObject.top) / offsetScale.y,
              bottom: (elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom) / offsetScale.y,
              left: (clippingClientRect.left - elementClientRect.left + paddingObject.left) / offsetScale.x,
              right: (elementClientRect.right - clippingClientRect.right + paddingObject.right) / offsetScale.x
            });
          case 63:
          case "end":
            return _context7.stop();
        }
      }, _callee7);
    }));
    return _detectOverflow.apply(this, arguments);
  }
  var arrow = function arrow(options) {
    return {
      name: 'arrow',
      options: options,
      fn: function fn(state) {
        return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
          var _data, _ref5;
          var x, y, placement, rects, platform, elements, _ref4, element, _ref4$padding, padding, paddingObject, coords, axis, length, arrowDimensions, isYAxis, minProp, maxProp, clientProp, endDiff, startDiff, arrowOffsetParent, clientSize, centerToReference, largestPossiblePadding, minPadding, maxPadding, min$1, max, center, offset, shouldAddOffset, alignmentOffset;
          return _regeneratorRuntime().wrap(function _callee2$(_context2) {
            while (1) switch (_context2.prev = _context2.next) {
              case 0:
                x = state.x, y = state.y, placement = state.placement, rects = state.rects, platform = state.platform, elements = state.elements; // Since `element` is required, we don't Partial<> the type.
                _ref4 = evaluate(options, state) || {}, element = _ref4.element, _ref4$padding = _ref4.padding, padding = _ref4$padding === void 0 ? 0 : _ref4$padding;
                if (!(element == null)) {
                  _context2.next = 4;
                  break;
                }
                return _context2.abrupt("return", {});
              case 4:
                paddingObject = getPaddingObject(padding);
                coords = {
                  x: x,
                  y: y
                };
                axis = getAlignmentAxis(placement);
                length = getAxisLength(axis);
                _context2.next = 10;
                return platform.getDimensions(element);
              case 10:
                arrowDimensions = _context2.sent;
                isYAxis = axis === 'y';
                minProp = isYAxis ? 'top' : 'left';
                maxProp = isYAxis ? 'bottom' : 'right';
                clientProp = isYAxis ? 'clientHeight' : 'clientWidth';
                endDiff = rects.reference[length] + rects.reference[axis] - coords[axis] - rects.floating[length];
                startDiff = coords[axis] - rects.reference[axis];
                _context2.next = 19;
                return platform.getOffsetParent == null ? void 0 : platform.getOffsetParent(element);
              case 19:
                arrowOffsetParent = _context2.sent;
                clientSize = arrowOffsetParent ? arrowOffsetParent[clientProp] : 0; // DOM platform can return `window` as the `offsetParent`.
                _context2.t0 = !clientSize;
                if (_context2.t0) {
                  _context2.next = 26;
                  break;
                }
                _context2.next = 25;
                return platform.isElement == null ? void 0 : platform.isElement(arrowOffsetParent);
              case 25:
                _context2.t0 = !_context2.sent;
              case 26:
                if (!_context2.t0) {
                  _context2.next = 28;
                  break;
                }
                clientSize = elements.floating[clientProp] || rects.floating[length];
              case 28:
                centerToReference = endDiff / 2 - startDiff / 2; // If the padding is large enough that it causes the arrow to no longer be
                // centered, modify the padding so that it is centered.
                largestPossiblePadding = clientSize / 2 - arrowDimensions[length] / 2 - 1;
                minPadding = min(paddingObject[minProp], largestPossiblePadding);
                maxPadding = min(paddingObject[maxProp], largestPossiblePadding); // Make sure the arrow doesn't overflow the floating element if the center
                // point is outside the floating element's bounds.
                min$1 = minPadding;
                max = clientSize - arrowDimensions[length] - maxPadding;
                center = clientSize / 2 - arrowDimensions[length] / 2 + centerToReference;
                offset = clamp(min$1, center, max); // If the reference is small enough that the arrow's padding causes it to
                // to point to nothing for an aligned placement, adjust the offset of the
                // floating element itself. This stops `shift()` from taking action, but can
                // be worked around by calling it again after the `arrow()` if desired.
                shouldAddOffset = getAlignment(placement) != null && center != offset && rects.reference[length] / 2 - (center < min$1 ? minPadding : maxPadding) - arrowDimensions[length] / 2 < 0;
                alignmentOffset = shouldAddOffset ? center < min$1 ? min$1 - center : max - center : 0;
                return _context2.abrupt("return", (_ref5 = {}, _ref5[axis] = coords[axis] - alignmentOffset, _ref5.data = (_data = {}, _data[axis] = offset, _data.centerOffset = center - offset + alignmentOffset, _data), _ref5));
              case 39:
              case "end":
                return _context2.stop();
            }
          }, _callee2);
        }))();
      }
    };
  };

  /**
   * Optimizes the visibility of the floating element by flipping the `placement`
   * in order to keep it in view when the preferred placement(s) will overflow the
   * clipping boundary. Alternative to `autoPlacement`.
   * @see https://floating-ui.com/docs/flip
   */
  var flip = function flip(options) {
    if (options === void 0) {
      options = {};
    }
    return {
      name: 'flip',
      options: options,
      fn: function fn(state) {
        return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
          var _middlewareData$flip, placement, middlewareData, rects, initialPlacement, platform, elements, _evaluate2, _evaluate2$mainAxis, checkMainAxis, _evaluate2$crossAxis, checkCrossAxis, specifiedFallbackPlacements, _evaluate2$fallbackSt, fallbackStrategy, _evaluate2$fallbackAx, fallbackAxisSideDirection, _evaluate2$flipAlignm, flipAlignment, detectOverflowOptions, side, isBasePlacement, rtl, fallbackPlacements, placements, overflow, overflows, overflowsData, sides, _middlewareData$flip2, _overflowsData$filter, nextIndex, nextPlacement, resetPlacement, _overflowsData$map$so, _placement;
          return _regeneratorRuntime().wrap(function _callee3$(_context3) {
            while (1) switch (_context3.prev = _context3.next) {
              case 0:
                placement = state.placement, middlewareData = state.middlewareData, rects = state.rects, initialPlacement = state.initialPlacement, platform = state.platform, elements = state.elements;
                _evaluate2 = evaluate(options, state), _evaluate2$mainAxis = _evaluate2.mainAxis, checkMainAxis = _evaluate2$mainAxis === void 0 ? true : _evaluate2$mainAxis, _evaluate2$crossAxis = _evaluate2.crossAxis, checkCrossAxis = _evaluate2$crossAxis === void 0 ? true : _evaluate2$crossAxis, specifiedFallbackPlacements = _evaluate2.fallbackPlacements, _evaluate2$fallbackSt = _evaluate2.fallbackStrategy, fallbackStrategy = _evaluate2$fallbackSt === void 0 ? 'bestFit' : _evaluate2$fallbackSt, _evaluate2$fallbackAx = _evaluate2.fallbackAxisSideDirection, fallbackAxisSideDirection = _evaluate2$fallbackAx === void 0 ? 'none' : _evaluate2$fallbackAx, _evaluate2$flipAlignm = _evaluate2.flipAlignment, flipAlignment = _evaluate2$flipAlignm === void 0 ? true : _evaluate2$flipAlignm, detectOverflowOptions = _objectWithoutPropertiesLoose(_evaluate2, _excluded2);
                side = getSide(placement);
                isBasePlacement = getSide(initialPlacement) === initialPlacement;
                _context3.next = 6;
                return platform.isRTL == null ? void 0 : platform.isRTL(elements.floating);
              case 6:
                rtl = _context3.sent;
                fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipAlignment ? [getOppositePlacement(initialPlacement)] : getExpandedPlacements(initialPlacement));
                if (!specifiedFallbackPlacements && fallbackAxisSideDirection !== 'none') {
                  fallbackPlacements.push.apply(fallbackPlacements, getOppositeAxisPlacements(initialPlacement, flipAlignment, fallbackAxisSideDirection, rtl));
                }
                placements = [initialPlacement].concat(fallbackPlacements);
                _context3.next = 12;
                return detectOverflow(state, detectOverflowOptions);
              case 12:
                overflow = _context3.sent;
                overflows = [];
                overflowsData = ((_middlewareData$flip = middlewareData.flip) == null ? void 0 : _middlewareData$flip.overflows) || [];
                if (checkMainAxis) {
                  overflows.push(overflow[side]);
                }
                if (checkCrossAxis) {
                  sides = getAlignmentSides(placement, rects, rtl);
                  overflows.push(overflow[sides[0]], overflow[sides[1]]);
                }
                overflowsData = [].concat(overflowsData, [{
                  placement: placement,
                  overflows: overflows
                }]);

                // One or more sides is overflowing.
                if (overflows.every(function (side) {
                  return side <= 0;
                })) {
                  _context3.next = 35;
                  break;
                }
                nextIndex = (((_middlewareData$flip2 = middlewareData.flip) == null ? void 0 : _middlewareData$flip2.index) || 0) + 1;
                nextPlacement = placements[nextIndex];
                if (!nextPlacement) {
                  _context3.next = 23;
                  break;
                }
                return _context3.abrupt("return", {
                  data: {
                    index: nextIndex,
                    overflows: overflowsData
                  },
                  reset: {
                    placement: nextPlacement
                  }
                });
              case 23:
                // First, find the candidates that fit on the mainAxis side of overflow,
                // then find the placement that fits the best on the main crossAxis side.
                resetPlacement = (_overflowsData$filter = overflowsData.filter(function (d) {
                  return d.overflows[0] <= 0;
                }).sort(function (a, b) {
                  return a.overflows[1] - b.overflows[1];
                })[0]) == null ? void 0 : _overflowsData$filter.placement; // Otherwise fallback.
                if (resetPlacement) {
                  _context3.next = 33;
                  break;
                }
                _context3.t0 = fallbackStrategy;
                _context3.next = _context3.t0 === 'bestFit' ? 28 : _context3.t0 === 'initialPlacement' ? 31 : 33;
                break;
              case 28:
                _placement = (_overflowsData$map$so = overflowsData.map(function (d) {
                  return [d.placement, d.overflows.filter(function (overflow) {
                    return overflow > 0;
                  }).reduce(function (acc, overflow) {
                    return acc + overflow;
                  }, 0)];
                }).sort(function (a, b) {
                  return a[1] - b[1];
                })[0]) == null ? void 0 : _overflowsData$map$so[0];
                if (_placement) {
                  resetPlacement = _placement;
                }
                return _context3.abrupt("break", 33);
              case 31:
                resetPlacement = initialPlacement;
                return _context3.abrupt("break", 33);
              case 33:
                if (!(placement !== resetPlacement)) {
                  _context3.next = 35;
                  break;
                }
                return _context3.abrupt("return", {
                  reset: {
                    placement: resetPlacement
                  }
                });
              case 35:
                return _context3.abrupt("return", {});
              case 36:
              case "end":
                return _context3.stop();
            }
          }, _callee3);
        }))();
      }
    };
  };

  /**
   * Optimizes the visibility of the floating element by shifting it in order to
   * keep it in view when it will overflow the clipping boundary.
   * @see https://floating-ui.com/docs/shift
   */
  var shift = function shift(options) {
    if (options === void 0) {
      options = {};
    }
    return {
      name: 'shift',
      options: options,
      fn: function fn(state) {
        return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
          var _extends3;
          var x, y, placement, _evaluate4, _evaluate4$mainAxis, checkMainAxis, _evaluate4$crossAxis, checkCrossAxis, _evaluate4$limiter, limiter, detectOverflowOptions, coords, overflow, crossAxis, mainAxis, mainAxisCoord, crossAxisCoord, minSide, maxSide, _min, _max, _minSide, _maxSide, _min2, _max2, limitedCoords;
          return _regeneratorRuntime().wrap(function _callee4$(_context4) {
            while (1) switch (_context4.prev = _context4.next) {
              case 0:
                x = state.x, y = state.y, placement = state.placement;
                _evaluate4 = evaluate(options, state), _evaluate4$mainAxis = _evaluate4.mainAxis, checkMainAxis = _evaluate4$mainAxis === void 0 ? true : _evaluate4$mainAxis, _evaluate4$crossAxis = _evaluate4.crossAxis, checkCrossAxis = _evaluate4$crossAxis === void 0 ? false : _evaluate4$crossAxis, _evaluate4$limiter = _evaluate4.limiter, limiter = _evaluate4$limiter === void 0 ? {
                  fn: function fn(_ref) {
                    var x = _ref.x,
                      y = _ref.y;
                    return {
                      x: x,
                      y: y
                    };
                  }
                } : _evaluate4$limiter, detectOverflowOptions = _objectWithoutPropertiesLoose(_evaluate4, _excluded4);
                coords = {
                  x: x,
                  y: y
                };
                _context4.next = 5;
                return detectOverflow(state, detectOverflowOptions);
              case 5:
                overflow = _context4.sent;
                crossAxis = getSideAxis(getSide(placement));
                mainAxis = getOppositeAxis(crossAxis);
                mainAxisCoord = coords[mainAxis];
                crossAxisCoord = coords[crossAxis];
                if (checkMainAxis) {
                  minSide = mainAxis === 'y' ? 'top' : 'left';
                  maxSide = mainAxis === 'y' ? 'bottom' : 'right';
                  _min = mainAxisCoord + overflow[minSide];
                  _max = mainAxisCoord - overflow[maxSide];
                  mainAxisCoord = clamp(_min, mainAxisCoord, _max);
                }
                if (checkCrossAxis) {
                  _minSide = crossAxis === 'y' ? 'top' : 'left';
                  _maxSide = crossAxis === 'y' ? 'bottom' : 'right';
                  _min2 = crossAxisCoord + overflow[_minSide];
                  _max2 = crossAxisCoord - overflow[_maxSide];
                  crossAxisCoord = clamp(_min2, crossAxisCoord, _max2);
                }
                limitedCoords = limiter.fn(_extends({}, state, (_extends3 = {}, _extends3[mainAxis] = mainAxisCoord, _extends3[crossAxis] = crossAxisCoord, _extends3)));
                return _context4.abrupt("return", _extends({}, limitedCoords, {
                  data: {
                    x: limitedCoords.x - x,
                    y: limitedCoords.y - y
                  }
                }));
              case 14:
              case "end":
                return _context4.stop();
            }
          }, _callee4);
        }))();
      }
    };
  };
  /**
   * Built-in `limiter` that will stop `shift()` at a certain point.
   */
  var limitShift = function limitShift(options) {
    if (options === void 0) {
      options = {};
    }
    return {
      options: options,
      fn: function fn(state) {
        var _ref6;
        var x = state.x,
          y = state.y,
          placement = state.placement,
          rects = state.rects,
          middlewareData = state.middlewareData;
        var _evaluate = evaluate(options, state),
          _evaluate$offset = _evaluate.offset,
          offset = _evaluate$offset === void 0 ? 0 : _evaluate$offset,
          _evaluate$mainAxis = _evaluate.mainAxis,
          checkMainAxis = _evaluate$mainAxis === void 0 ? true : _evaluate$mainAxis,
          _evaluate$crossAxis = _evaluate.crossAxis,
          checkCrossAxis = _evaluate$crossAxis === void 0 ? true : _evaluate$crossAxis;
        var coords = {
          x: x,
          y: y
        };
        var crossAxis = getSideAxis(placement);
        var mainAxis = getOppositeAxis(crossAxis);
        var mainAxisCoord = coords[mainAxis];
        var crossAxisCoord = coords[crossAxis];
        var rawOffset = evaluate(offset, state);
        var computedOffset = typeof rawOffset === 'number' ? {
          mainAxis: rawOffset,
          crossAxis: 0
        } : _extends({
          mainAxis: 0,
          crossAxis: 0
        }, rawOffset);
        if (checkMainAxis) {
          var len = mainAxis === 'y' ? 'height' : 'width';
          var limitMin = rects.reference[mainAxis] - rects.floating[len] + computedOffset.mainAxis;
          var limitMax = rects.reference[mainAxis] + rects.reference[len] - computedOffset.mainAxis;
          if (mainAxisCoord < limitMin) {
            mainAxisCoord = limitMin;
          } else if (mainAxisCoord > limitMax) {
            mainAxisCoord = limitMax;
          }
        }
        if (checkCrossAxis) {
          var _middlewareData$offse, _middlewareData$offse2;
          var _len2 = mainAxis === 'y' ? 'width' : 'height';
          var isOriginSide = ['top', 'left'].includes(getSide(placement));
          var _limitMin = rects.reference[crossAxis] - rects.floating[_len2] + (isOriginSide ? ((_middlewareData$offse = middlewareData.offset) == null ? void 0 : _middlewareData$offse[crossAxis]) || 0 : 0) + (isOriginSide ? 0 : computedOffset.crossAxis);
          var _limitMax = rects.reference[crossAxis] + rects.reference[_len2] + (isOriginSide ? 0 : ((_middlewareData$offse2 = middlewareData.offset) == null ? void 0 : _middlewareData$offse2[crossAxis]) || 0) - (isOriginSide ? computedOffset.crossAxis : 0);
          if (crossAxisCoord < _limitMin) {
            crossAxisCoord = _limitMin;
          } else if (crossAxisCoord > _limitMax) {
            crossAxisCoord = _limitMax;
          }
        }
        return _ref6 = {}, _ref6[mainAxis] = mainAxisCoord, _ref6[crossAxis] = crossAxisCoord, _ref6;
      }
    };
  };
  function getNodeName(node) {
    if (isNode(node)) {
      return (node.nodeName || '').toLowerCase();
    }
    // Mocked nodes in testing environments may not be instances of Node. By
    // returning `#document` an infinite loop won't occur.
    // https://github.com/floating-ui/floating-ui/issues/2317
    return '#document';
  }
  function getWindow(node) {
    var _node$ownerDocument;
    return (node == null ? void 0 : (_node$ownerDocument = node.ownerDocument) == null ? void 0 : _node$ownerDocument.defaultView) || window;
  }
  function getDocumentElement(node) {
    var _ref;
    return (_ref = (isNode(node) ? node.ownerDocument : node.document) || window.document) == null ? void 0 : _ref.documentElement;
  }
  function isNode(value) {
    return value instanceof Node || value instanceof getWindow(value).Node;
  }
  function isElement(value) {
    return value instanceof Element || value instanceof getWindow(value).Element;
  }
  function isHTMLElement(value) {
    return value instanceof HTMLElement || value instanceof getWindow(value).HTMLElement;
  }
  function isShadowRoot(value) {
    // Browsers without `ShadowRoot` support.
    if (typeof ShadowRoot === 'undefined') {
      return false;
    }
    return value instanceof ShadowRoot || value instanceof getWindow(value).ShadowRoot;
  }
  function isOverflowElement(element) {
    var _getComputedStyle = getComputedStyle(element),
      overflow = _getComputedStyle.overflow,
      overflowX = _getComputedStyle.overflowX,
      overflowY = _getComputedStyle.overflowY,
      display = _getComputedStyle.display;
    return /auto|scroll|overlay|hidden|clip/.test(overflow + overflowY + overflowX) && !['inline', 'contents'].includes(display);
  }
  function isTableElement(element) {
    return ['table', 'td', 'th'].includes(getNodeName(element));
  }
  function isContainingBlock(element) {
    var webkit = isWebKit();
    var css = getComputedStyle(element);

    // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block
    return css.transform !== 'none' || css.perspective !== 'none' || (css.containerType ? css.containerType !== 'normal' : false) || !webkit && (css.backdropFilter ? css.backdropFilter !== 'none' : false) || !webkit && (css.filter ? css.filter !== 'none' : false) || ['transform', 'perspective', 'filter'].some(function (value) {
      return (css.willChange || '').includes(value);
    }) || ['paint', 'layout', 'strict', 'content'].some(function (value) {
      return (css.contain || '').includes(value);
    });
  }
  function getContainingBlock(element) {
    var currentNode = getParentNode(element);
    while (isHTMLElement(currentNode) && !isLastTraversableNode(currentNode)) {
      if (isContainingBlock(currentNode)) {
        return currentNode;
      } else {
        currentNode = getParentNode(currentNode);
      }
    }
    return null;
  }
  function isWebKit() {
    if (typeof CSS === 'undefined' || !CSS.supports) return false;
    return CSS.supports('-webkit-backdrop-filter', 'none');
  }
  function isLastTraversableNode(node) {
    return ['html', 'body', '#document'].includes(getNodeName(node));
  }
  function getComputedStyle(element) {
    return getWindow(element).getComputedStyle(element);
  }
  function getNodeScroll(element) {
    if (isElement(element)) {
      return {
        scrollLeft: element.scrollLeft,
        scrollTop: element.scrollTop
      };
    }
    return {
      scrollLeft: element.pageXOffset,
      scrollTop: element.pageYOffset
    };
  }
  function getParentNode(node) {
    if (getNodeName(node) === 'html') {
      return node;
    }
    var result =
    // Step into the shadow DOM of the parent of a slotted node.
    node.assignedSlot ||
    // DOM Element detected.
    node.parentNode ||
    // ShadowRoot detected.
    isShadowRoot(node) && node.host ||
    // Fallback.
    getDocumentElement(node);
    return isShadowRoot(result) ? result.host : result;
  }
  function getNearestOverflowAncestor(node) {
    var parentNode = getParentNode(node);
    if (isLastTraversableNode(parentNode)) {
      return node.ownerDocument ? node.ownerDocument.body : node.body;
    }
    if (isHTMLElement(parentNode) && isOverflowElement(parentNode)) {
      return parentNode;
    }
    return getNearestOverflowAncestor(parentNode);
  }
  function getOverflowAncestors(node, list) {
    var _node$ownerDocument2;
    if (list === void 0) {
      list = [];
    }
    var scrollableAncestor = getNearestOverflowAncestor(node);
    var isBody = scrollableAncestor === ((_node$ownerDocument2 = node.ownerDocument) == null ? void 0 : _node$ownerDocument2.body);
    var win = getWindow(scrollableAncestor);
    if (isBody) {
      return list.concat(win, win.visualViewport || [], isOverflowElement(scrollableAncestor) ? scrollableAncestor : []);
    }
    return list.concat(scrollableAncestor, getOverflowAncestors(scrollableAncestor));
  }
  function getCssDimensions(element) {
    var css = getComputedStyle(element);
    // In testing environments, the `width` and `height` properties are empty
    // strings for SVG elements, returning NaN. Fallback to `0` in this case.
    var width = parseFloat(css.width) || 0;
    var height = parseFloat(css.height) || 0;
    var hasOffset = isHTMLElement(element);
    var offsetWidth = hasOffset ? element.offsetWidth : width;
    var offsetHeight = hasOffset ? element.offsetHeight : height;
    var shouldFallback = round(width) !== offsetWidth || round(height) !== offsetHeight;
    if (shouldFallback) {
      width = offsetWidth;
      height = offsetHeight;
    }
    return {
      width: width,
      height: height,
      $: shouldFallback
    };
  }
  function unwrapElement(element) {
    return !isElement(element) ? element.contextElement : element;
  }
  function getScale(element) {
    var domElement = unwrapElement(element);
    if (!isHTMLElement(domElement)) {
      return createCoords(1);
    }
    var rect = domElement.getBoundingClientRect();
    var _getCssDimensions = getCssDimensions(domElement),
      width = _getCssDimensions.width,
      height = _getCssDimensions.height,
      $ = _getCssDimensions.$;
    var x = ($ ? round(rect.width) : rect.width) / width;
    var y = ($ ? round(rect.height) : rect.height) / height;

    // 0, NaN, or Infinity should always fallback to 1.

    if (!x || !Number.isFinite(x)) {
      x = 1;
    }
    if (!y || !Number.isFinite(y)) {
      y = 1;
    }
    return {
      x: x,
      y: y
    };
  }
  var noOffsets = /*#__PURE__*/createCoords(0);
  function getVisualOffsets(element) {
    var win = getWindow(element);
    if (!isWebKit() || !win.visualViewport) {
      return noOffsets;
    }
    return {
      x: win.visualViewport.offsetLeft,
      y: win.visualViewport.offsetTop
    };
  }
  function shouldAddVisualOffsets(element, isFixed, floatingOffsetParent) {
    if (isFixed === void 0) {
      isFixed = false;
    }
    if (!floatingOffsetParent || isFixed && floatingOffsetParent !== getWindow(element)) {
      return false;
    }
    return isFixed;
  }
  function getBoundingClientRect(element, includeScale, isFixedStrategy, offsetParent) {
    if (includeScale === void 0) {
      includeScale = false;
    }
    if (isFixedStrategy === void 0) {
      isFixedStrategy = false;
    }
    var clientRect = element.getBoundingClientRect();
    var domElement = unwrapElement(element);
    var scale = createCoords(1);
    if (includeScale) {
      if (offsetParent) {
        if (isElement(offsetParent)) {
          scale = getScale(offsetParent);
        }
      } else {
        scale = getScale(element);
      }
    }
    var visualOffsets = shouldAddVisualOffsets(domElement, isFixedStrategy, offsetParent) ? getVisualOffsets(domElement) : createCoords(0);
    var x = (clientRect.left + visualOffsets.x) / scale.x;
    var y = (clientRect.top + visualOffsets.y) / scale.y;
    var width = clientRect.width / scale.x;
    var height = clientRect.height / scale.y;
    if (domElement) {
      var win = getWindow(domElement);
      var offsetWin = offsetParent && isElement(offsetParent) ? getWindow(offsetParent) : offsetParent;
      var currentIFrame = win.frameElement;
      while (currentIFrame && offsetParent && offsetWin !== win) {
        var iframeScale = getScale(currentIFrame);
        var iframeRect = currentIFrame.getBoundingClientRect();
        var css = getComputedStyle(currentIFrame);
        var left = iframeRect.left + (currentIFrame.clientLeft + parseFloat(css.paddingLeft)) * iframeScale.x;
        var top = iframeRect.top + (currentIFrame.clientTop + parseFloat(css.paddingTop)) * iframeScale.y;
        x *= iframeScale.x;
        y *= iframeScale.y;
        width *= iframeScale.x;
        height *= iframeScale.y;
        x += left;
        y += top;
        currentIFrame = getWindow(currentIFrame).frameElement;
      }
    }
    return rectToClientRect({
      width: width,
      height: height,
      x: x,
      y: y
    });
  }
  function convertOffsetParentRelativeRectToViewportRelativeRect(_ref) {
    var rect = _ref.rect,
      offsetParent = _ref.offsetParent,
      strategy = _ref.strategy;
    var isOffsetParentAnElement = isHTMLElement(offsetParent);
    var documentElement = getDocumentElement(offsetParent);
    if (offsetParent === documentElement) {
      return rect;
    }
    var scroll = {
      scrollLeft: 0,
      scrollTop: 0
    };
    var scale = createCoords(1);
    var offsets = createCoords(0);
    if (isOffsetParentAnElement || !isOffsetParentAnElement && strategy !== 'fixed') {
      if (getNodeName(offsetParent) !== 'body' || isOverflowElement(documentElement)) {
        scroll = getNodeScroll(offsetParent);
      }
      if (isHTMLElement(offsetParent)) {
        var offsetRect = getBoundingClientRect(offsetParent);
        scale = getScale(offsetParent);
        offsets.x = offsetRect.x + offsetParent.clientLeft;
        offsets.y = offsetRect.y + offsetParent.clientTop;
      }
    }
    return {
      width: rect.width * scale.x,
      height: rect.height * scale.y,
      x: rect.x * scale.x - scroll.scrollLeft * scale.x + offsets.x,
      y: rect.y * scale.y - scroll.scrollTop * scale.y + offsets.y
    };
  }
  function getClientRects(element) {
    return Array.from(element.getClientRects());
  }
  function getWindowScrollBarX(element) {
    // If <html> has a CSS width greater than the viewport, then this will be
    // incorrect for RTL.
    return getBoundingClientRect(getDocumentElement(element)).left + getNodeScroll(element).scrollLeft;
  }

  // Gets the entire size of the scrollable document area, even extending outside
  // of the `<html>` and `<body>` rect bounds if horizontally scrollable.
  function getDocumentRect(element) {
    var html = getDocumentElement(element);
    var scroll = getNodeScroll(element);
    var body = element.ownerDocument.body;
    var width = max(html.scrollWidth, html.clientWidth, body.scrollWidth, body.clientWidth);
    var height = max(html.scrollHeight, html.clientHeight, body.scrollHeight, body.clientHeight);
    var x = -scroll.scrollLeft + getWindowScrollBarX(element);
    var y = -scroll.scrollTop;
    if (getComputedStyle(body).direction === 'rtl') {
      x += max(html.clientWidth, body.clientWidth) - width;
    }
    return {
      width: width,
      height: height,
      x: x,
      y: y
    };
  }
  function getViewportRect(element, strategy) {
    var win = getWindow(element);
    var html = getDocumentElement(element);
    var visualViewport = win.visualViewport;
    var width = html.clientWidth;
    var height = html.clientHeight;
    var x = 0;
    var y = 0;
    if (visualViewport) {
      width = visualViewport.width;
      height = visualViewport.height;
      var visualViewportBased = isWebKit();
      if (!visualViewportBased || visualViewportBased && strategy === 'fixed') {
        x = visualViewport.offsetLeft;
        y = visualViewport.offsetTop;
      }
    }
    return {
      width: width,
      height: height,
      x: x,
      y: y
    };
  }

  // Returns the inner client rect, subtracting scrollbars if present.
  function getInnerBoundingClientRect(element, strategy) {
    var clientRect = getBoundingClientRect(element, true, strategy === 'fixed');
    var top = clientRect.top + element.clientTop;
    var left = clientRect.left + element.clientLeft;
    var scale = isHTMLElement(element) ? getScale(element) : createCoords(1);
    var width = element.clientWidth * scale.x;
    var height = element.clientHeight * scale.y;
    var x = left * scale.x;
    var y = top * scale.y;
    return {
      width: width,
      height: height,
      x: x,
      y: y
    };
  }
  function getClientRectFromClippingAncestor(element, clippingAncestor, strategy) {
    var rect;
    if (clippingAncestor === 'viewport') {
      rect = getViewportRect(element, strategy);
    } else if (clippingAncestor === 'document') {
      rect = getDocumentRect(getDocumentElement(element));
    } else if (isElement(clippingAncestor)) {
      rect = getInnerBoundingClientRect(clippingAncestor, strategy);
    } else {
      var visualOffsets = getVisualOffsets(element);
      rect = _extends({}, clippingAncestor, {
        x: clippingAncestor.x - visualOffsets.x,
        y: clippingAncestor.y - visualOffsets.y
      });
    }
    return rectToClientRect(rect);
  }
  function hasFixedPositionAncestor(element, stopNode) {
    var parentNode = getParentNode(element);
    if (parentNode === stopNode || !isElement(parentNode) || isLastTraversableNode(parentNode)) {
      return false;
    }
    return getComputedStyle(parentNode).position === 'fixed' || hasFixedPositionAncestor(parentNode, stopNode);
  }

  // A "clipping ancestor" is an `overflow` element with the characteristic of
  // clipping (or hiding) child elements. This returns all clipping ancestors
  // of the given element up the tree.
  function getClippingElementAncestors(element, cache) {
    var cachedResult = cache.get(element);
    if (cachedResult) {
      return cachedResult;
    }
    var result = getOverflowAncestors(element).filter(function (el) {
      return isElement(el) && getNodeName(el) !== 'body';
    });
    var currentContainingBlockComputedStyle = null;
    var elementIsFixed = getComputedStyle(element).position === 'fixed';
    var currentNode = elementIsFixed ? getParentNode(element) : element;

    // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block
    while (isElement(currentNode) && !isLastTraversableNode(currentNode)) {
      var computedStyle = getComputedStyle(currentNode);
      var currentNodeIsContaining = isContainingBlock(currentNode);
      if (!currentNodeIsContaining && computedStyle.position === 'fixed') {
        currentContainingBlockComputedStyle = null;
      }
      var shouldDropCurrentNode = elementIsFixed ? !currentNodeIsContaining && !currentContainingBlockComputedStyle : !currentNodeIsContaining && computedStyle.position === 'static' && !!currentContainingBlockComputedStyle && ['absolute', 'fixed'].includes(currentContainingBlockComputedStyle.position) || isOverflowElement(currentNode) && !currentNodeIsContaining && hasFixedPositionAncestor(element, currentNode);
      if (shouldDropCurrentNode) {
        // Drop non-containing blocks.
        result = result.filter(function (ancestor) {
          return ancestor !== currentNode;
        });
      } else {
        // Record last containing block for next iteration.
        currentContainingBlockComputedStyle = computedStyle;
      }
      currentNode = getParentNode(currentNode);
    }
    cache.set(element, result);
    return result;
  }

  // Gets the maximum area that the element is visible in due to any number of
  // clipping ancestors.
  function getClippingRect(_ref) {
    var element = _ref.element,
      boundary = _ref.boundary,
      rootBoundary = _ref.rootBoundary,
      strategy = _ref.strategy;
    var elementClippingAncestors = boundary === 'clippingAncestors' ? getClippingElementAncestors(element, this._c) : [].concat(boundary);
    var clippingAncestors = [].concat(elementClippingAncestors, [rootBoundary]);
    var firstClippingAncestor = clippingAncestors[0];
    var clippingRect = clippingAncestors.reduce(function (accRect, clippingAncestor) {
      var rect = getClientRectFromClippingAncestor(element, clippingAncestor, strategy);
      accRect.top = max(rect.top, accRect.top);
      accRect.right = min(rect.right, accRect.right);
      accRect.bottom = min(rect.bottom, accRect.bottom);
      accRect.left = max(rect.left, accRect.left);
      return accRect;
    }, getClientRectFromClippingAncestor(element, firstClippingAncestor, strategy));
    return {
      width: clippingRect.right - clippingRect.left,
      height: clippingRect.bottom - clippingRect.top,
      x: clippingRect.left,
      y: clippingRect.top
    };
  }
  function getDimensions(element) {
    return getCssDimensions(element);
  }
  function getRectRelativeToOffsetParent(element, offsetParent, strategy) {
    var isOffsetParentAnElement = isHTMLElement(offsetParent);
    var documentElement = getDocumentElement(offsetParent);
    var isFixed = strategy === 'fixed';
    var rect = getBoundingClientRect(element, true, isFixed, offsetParent);
    var scroll = {
      scrollLeft: 0,
      scrollTop: 0
    };
    var offsets = createCoords(0);
    if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
      if (getNodeName(offsetParent) !== 'body' || isOverflowElement(documentElement)) {
        scroll = getNodeScroll(offsetParent);
      }
      if (isOffsetParentAnElement) {
        var offsetRect = getBoundingClientRect(offsetParent, true, isFixed, offsetParent);
        offsets.x = offsetRect.x + offsetParent.clientLeft;
        offsets.y = offsetRect.y + offsetParent.clientTop;
      } else if (documentElement) {
        offsets.x = getWindowScrollBarX(documentElement);
      }
    }
    return {
      x: rect.left + scroll.scrollLeft - offsets.x,
      y: rect.top + scroll.scrollTop - offsets.y,
      width: rect.width,
      height: rect.height
    };
  }
  function getTrueOffsetParent(element, polyfill) {
    if (!isHTMLElement(element) || getComputedStyle(element).position === 'fixed') {
      return null;
    }
    if (polyfill) {
      return polyfill(element);
    }
    return element.offsetParent;
  }

  // Gets the closest ancestor positioned element. Handles some edge cases,
  // such as table ancestors and cross browser bugs.
  function getOffsetParent(element, polyfill) {
    var window = getWindow(element);
    if (!isHTMLElement(element)) {
      return window;
    }
    var offsetParent = getTrueOffsetParent(element, polyfill);
    while (offsetParent && isTableElement(offsetParent) && getComputedStyle(offsetParent).position === 'static') {
      offsetParent = getTrueOffsetParent(offsetParent, polyfill);
    }
    if (offsetParent && (getNodeName(offsetParent) === 'html' || getNodeName(offsetParent) === 'body' && getComputedStyle(offsetParent).position === 'static' && !isContainingBlock(offsetParent))) {
      return window;
    }
    return offsetParent || getContainingBlock(element) || window;
  }
  var getElementRects = /*#__PURE__*/function () {
    var _getElementRects = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(_ref) {
      var reference, floating, strategy, getOffsetParentFn, getDimensionsFn;
      return _regeneratorRuntime().wrap(function _callee5$(_context5) {
        while (1) switch (_context5.prev = _context5.next) {
          case 0:
            reference = _ref.reference, floating = _ref.floating, strategy = _ref.strategy;
            getOffsetParentFn = this.getOffsetParent || getOffsetParent;
            getDimensionsFn = this.getDimensions;
            _context5.t0 = getRectRelativeToOffsetParent;
            _context5.t1 = reference;
            _context5.next = 7;
            return getOffsetParentFn(floating);
          case 7:
            _context5.t2 = _context5.sent;
            _context5.t3 = strategy;
            _context5.t4 = (0, _context5.t0)(_context5.t1, _context5.t2, _context5.t3);
            _context5.t5 = _extends;
            _context5.t6 = {
              x: 0,
              y: 0
            };
            _context5.next = 14;
            return getDimensionsFn(floating);
          case 14:
            _context5.t7 = _context5.sent;
            _context5.t8 = (0, _context5.t5)(_context5.t6, _context5.t7);
            return _context5.abrupt("return", {
              reference: _context5.t4,
              floating: _context5.t8
            });
          case 17:
          case "end":
            return _context5.stop();
        }
      }, _callee5, this);
    }));
    function getElementRects(_x6) {
      return _getElementRects.apply(this, arguments);
    }
    return getElementRects;
  }();
  function isRTL(element) {
    return getComputedStyle(element).direction === 'rtl';
  }
  var platform = {
    convertOffsetParentRelativeRectToViewportRelativeRect: convertOffsetParentRelativeRectToViewportRelativeRect,
    getDocumentElement: getDocumentElement,
    getClippingRect: getClippingRect,
    getOffsetParent: getOffsetParent,
    getElementRects: getElementRects,
    getClientRects: getClientRects,
    getDimensions: getDimensions,
    getScale: getScale,
    isElement: isElement,
    isRTL: isRTL
  };

  // https://samthor.au/2021/observing-dom/
  function observeMove(element, onMove) {
    var io = null;
    var timeoutId;
    var root = getDocumentElement(element);
    function cleanup() {
      clearTimeout(timeoutId);
      io && io.disconnect();
      io = null;
    }
    function refresh(skip, threshold) {
      if (skip === void 0) {
        skip = false;
      }
      if (threshold === void 0) {
        threshold = 1;
      }
      cleanup();
      var _element$getBoundingC = element.getBoundingClientRect(),
        left = _element$getBoundingC.left,
        top = _element$getBoundingC.top,
        width = _element$getBoundingC.width,
        height = _element$getBoundingC.height;
      if (!skip) {
        onMove();
      }
      if (!width || !height) {
        return;
      }
      var insetTop = floor(top);
      var insetRight = floor(root.clientWidth - (left + width));
      var insetBottom = floor(root.clientHeight - (top + height));
      var insetLeft = floor(left);
      var rootMargin = -insetTop + "px " + -insetRight + "px " + -insetBottom + "px " + -insetLeft + "px";
      var options = {
        rootMargin: rootMargin,
        threshold: max(0, min(1, threshold)) || 1
      };
      var isFirstUpdate = true;
      function handleObserve(entries) {
        var ratio = entries[0].intersectionRatio;
        if (ratio !== threshold) {
          if (!isFirstUpdate) {
            return refresh();
          }
          if (!ratio) {
            timeoutId = setTimeout(function () {
              refresh(false, 1e-7);
            }, 100);
          } else {
            refresh(false, ratio);
          }
        }
        isFirstUpdate = false;
      }

      // Older browsers don't support a `document` as the root and will throw an
      // error.
      try {
        io = new IntersectionObserver(handleObserve, _extends({}, options, {
          // Handle <iframe>s
          root: root.ownerDocument
        }));
      } catch (e) {
        io = new IntersectionObserver(handleObserve, options);
      }
      io.observe(element);
    }
    refresh(true);
    return cleanup;
  }

  /**
   * Automatically updates the position of the floating element when necessary.
   * Should only be called when the floating element is mounted on the DOM or
   * visible on the screen.
   * @returns cleanup function that should be invoked when the floating element is
   * removed from the DOM or hidden from the screen.
   * @see https://floating-ui.com/docs/autoUpdate
   */
  function autoUpdate(reference, floating, update, options) {
    if (options === void 0) {
      options = {};
    }
    var _options = options,
      _options$ancestorScro = _options.ancestorScroll,
      ancestorScroll = _options$ancestorScro === void 0 ? true : _options$ancestorScro,
      _options$ancestorResi = _options.ancestorResize,
      ancestorResize = _options$ancestorResi === void 0 ? true : _options$ancestorResi,
      _options$elementResiz = _options.elementResize,
      elementResize = _options$elementResiz === void 0 ? typeof ResizeObserver === 'function' : _options$elementResiz,
      _options$layoutShift = _options.layoutShift,
      layoutShift = _options$layoutShift === void 0 ? typeof IntersectionObserver === 'function' : _options$layoutShift,
      _options$animationFra = _options.animationFrame,
      animationFrame = _options$animationFra === void 0 ? false : _options$animationFra;
    var referenceEl = unwrapElement(reference);
    var ancestors = ancestorScroll || ancestorResize ? [].concat(referenceEl ? getOverflowAncestors(referenceEl) : [], getOverflowAncestors(floating)) : [];
    ancestors.forEach(function (ancestor) {
      ancestorScroll && ancestor.addEventListener('scroll', update, {
        passive: true
      });
      ancestorResize && ancestor.addEventListener('resize', update);
    });
    var cleanupIo = referenceEl && layoutShift ? observeMove(referenceEl, update) : null;
    var reobserveFrame = -1;
    var resizeObserver = null;
    if (elementResize) {
      resizeObserver = new ResizeObserver(function (_ref) {
        var firstEntry = _ref[0];
        if (firstEntry && firstEntry.target === referenceEl && resizeObserver) {
          // Prevent update loops when using the `size` middleware.
          // https://github.com/floating-ui/floating-ui/issues/1740
          resizeObserver.unobserve(floating);
          cancelAnimationFrame(reobserveFrame);
          reobserveFrame = requestAnimationFrame(function () {
            resizeObserver && resizeObserver.observe(floating);
          });
        }
        update();
      });
      if (referenceEl && !animationFrame) {
        resizeObserver.observe(referenceEl);
      }
      resizeObserver.observe(floating);
    }
    var frameId;
    var prevRefRect = animationFrame ? getBoundingClientRect(reference) : null;
    if (animationFrame) {
      frameLoop();
    }
    function frameLoop() {
      var nextRefRect = getBoundingClientRect(reference);
      if (prevRefRect && (nextRefRect.x !== prevRefRect.x || nextRefRect.y !== prevRefRect.y || nextRefRect.width !== prevRefRect.width || nextRefRect.height !== prevRefRect.height)) {
        update();
      }
      prevRefRect = nextRefRect;
      frameId = requestAnimationFrame(frameLoop);
    }
    update();
    return function () {
      ancestors.forEach(function (ancestor) {
        ancestorScroll && ancestor.removeEventListener('scroll', update);
        ancestorResize && ancestor.removeEventListener('resize', update);
      });
      cleanupIo && cleanupIo();
      resizeObserver && resizeObserver.disconnect();
      resizeObserver = null;
      if (animationFrame) {
        cancelAnimationFrame(frameId);
      }
    };
  }

  /**
   * Computes the `x` and `y` coordinates that will place the floating element
   * next to a reference element when it is given a certain CSS positioning
   * strategy.
   */
  var computePosition = function computePosition(reference, floating, options) {
    // This caches the expensive `getClippingElementAncestors` function so that
    // multiple lifecycle resets re-use the same result. It only lives for a
    // single call. If other functions become expensive, we can add them as well.
    var cache = new Map();
    var mergedOptions = _extends({
      platform: platform
    }, options);
    var platformWithCache = _extends({}, mergedOptions.platform, {
      _c: cache
    });
    return computePosition$1(reference, floating, _extends({}, mergedOptions, {
      platform: platformWithCache
    }));
  };

  /**
   * Floating UI Options
   *
   * @typedef {object} FloatingUIOptions
   */

  /**
   * Determines options for the tooltip and initializes event listeners.
   *
   * @param {Step} step The step instance
   *
   * @return {FloatingUIOptions}
   */
  function setupTooltip(step) {
    if (step.cleanup) {
      step.cleanup();
    }
    var attachToOptions = step._getResolvedAttachToOptions();
    var target = attachToOptions.element;
    var floatingUIOptions = getFloatingUIOptions(attachToOptions, step);
    var shouldCenter = shouldCenterStep(attachToOptions);
    if (shouldCenter) {
      target = document.body;
      var content = step.shepherdElementComponent.getElement();
      content.classList.add('shepherd-centered');
    }
    step.cleanup = autoUpdate(target, step.el, function () {
      // The element might have already been removed by the end of the tour.
      if (!step.el) {
        step.cleanup();
        return;
      }
      setPosition(target, step, floatingUIOptions, shouldCenter);
    });
    step.target = attachToOptions.element;
    return floatingUIOptions;
  }

  /**
   * Merge tooltip options handling nested keys.
   *
   * @param tourOptions - The default tour options.
   * @param options - Step specific options.
   *
   * @return {floatingUIOptions: FloatingUIOptions}
   */
  function mergeTooltipConfig(tourOptions, options) {
    return {
      floatingUIOptions: cjs(tourOptions.floatingUIOptions || {}, options.floatingUIOptions || {})
    };
  }

  /**
   * Cleanup function called when the step is closed/destroyed.
   *
   * @param {Step} step
   */
  function destroyTooltip(step) {
    if (step.cleanup) {
      step.cleanup();
    }
    step.cleanup = null;
  }

  /**
   *
   * @return {Promise<*>}
   */
  function setPosition(target, step, floatingUIOptions, shouldCenter) {
    return computePosition(target, step.el, floatingUIOptions).then(floatingUIposition(step, shouldCenter))
    // Wait before forcing focus.
    .then(function (step) {
      return new Promise(function (resolve) {
        setTimeout(function () {
          return resolve(step);
        }, 300);
      });
    })
    // Replaces focusAfterRender modifier.
    .then(function (step) {
      if (step && step.el) {
        step.el.focus({
          preventScroll: true
        });
      }
    });
  }

  /**
   *
   * @param step
   * @param shouldCenter
   * @return {function({x: *, y: *, placement: *, middlewareData: *}): Promise<unknown>}
   */
  function floatingUIposition(step, shouldCenter) {
    return function (_ref7) {
      var x = _ref7.x,
        y = _ref7.y,
        placement = _ref7.placement,
        middlewareData = _ref7.middlewareData;
      if (!step.el) {
        return step;
      }
      if (shouldCenter) {
        Object.assign(step.el.style, {
          position: 'fixed',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)'
        });
      } else {
        Object.assign(step.el.style, {
          position: 'absolute',
          left: x + "px",
          top: y + "px"
        });
      }
      step.el.dataset.popperPlacement = placement;
      placeArrow(step.el, middlewareData);
      return step;
    };
  }

  /**
   *
   * @param el
   * @param middlewareData
   */
  function placeArrow(el, middlewareData) {
    var arrowEl = el.querySelector('.shepherd-arrow');
    if (arrowEl && middlewareData.arrow) {
      var _middlewareData$arrow = middlewareData.arrow,
        arrowX = _middlewareData$arrow.x,
        arrowY = _middlewareData$arrow.y;
      Object.assign(arrowEl.style, {
        left: arrowX != null ? arrowX + "px" : '',
        top: arrowY != null ? arrowY + "px" : ''
      });
    }
  }

  /**
   * Gets the `Floating UI` options from a set of base `attachTo` options
   * @param attachToOptions
   * @param {Step} step The step instance
   * @return {Object}
   * @private
   */
  function getFloatingUIOptions(attachToOptions, step) {
    var options = {
      strategy: 'absolute',
      middleware: []
    };
    var arrowEl = addArrow(step);
    var shouldCenter = shouldCenterStep(attachToOptions);
    if (!shouldCenter) {
      options.middleware.push(flip(),
      // Replicate PopperJS default behavior.
      shift({
        limiter: limitShift(),
        crossAxis: true
      }));
      if (arrowEl) {
        options.middleware.push(arrow({
          element: arrowEl
        }));
      }
      options.placement = attachToOptions.on;
    }
    return cjs(step.options.floatingUIOptions || {}, options);
  }

  /**
   * @param {Step} step
   * @return {HTMLElement|false|null}
   */
  function addArrow(step) {
    if (step.options.arrow && step.el) {
      return step.el.querySelector('.shepherd-arrow');
    }
    return false;
  }
  function noop() {}
  function assign(tar, src) {
    // @ts-ignore
    for (var k in src) tar[k] = src[k];
    return tar;
  }
  function run(fn) {
    return fn();
  }
  function blank_object() {
    return Object.create(null);
  }
  function run_all(fns) {
    fns.forEach(run);
  }
  function is_function(thing) {
    return typeof thing === 'function';
  }
  function safe_not_equal(a, b) {
    return a != a ? b == b : a !== b || a && typeof a === 'object' || typeof a === 'function';
  }
  function is_empty(obj) {
    return Object.keys(obj).length === 0;
  }
  function append(target, node) {
    target.appendChild(node);
  }
  function insert(target, node, anchor) {
    target.insertBefore(node, anchor || null);
  }
  function detach(node) {
    if (node.parentNode) {
      node.parentNode.removeChild(node);
    }
  }
  function destroy_each(iterations, detaching) {
    for (var i = 0; i < iterations.length; i += 1) {
      if (iterations[i]) iterations[i].d(detaching);
    }
  }
  function element(name) {
    return document.createElement(name);
  }
  function svg_element(name) {
    return document.createElementNS('http://www.w3.org/2000/svg', name);
  }
  function text(data) {
    return document.createTextNode(data);
  }
  function space() {
    return text(' ');
  }
  function empty() {
    return text('');
  }
  function listen(node, event, handler, options) {
    node.addEventListener(event, handler, options);
    return function () {
      return node.removeEventListener(event, handler, options);
    };
  }
  function attr(node, attribute, value) {
    if (value == null) node.removeAttribute(attribute);else if (node.getAttribute(attribute) !== value) node.setAttribute(attribute, value);
  }
  /**
   * List of attributes that should always be set through the attr method,
   * because updating them through the property setter doesn't work reliably.
   * In the example of `width`/`height`, the problem is that the setter only
   * accepts numeric values, but the attribute can also be set to a string like `50%`.
   * If this list becomes too big, rethink this approach.
   */
  var always_set_through_set_attribute = ['width', 'height'];
  function set_attributes(node, attributes) {
    // @ts-ignore
    var descriptors = Object.getOwnPropertyDescriptors(node.__proto__);
    for (var key in attributes) {
      if (attributes[key] == null) {
        node.removeAttribute(key);
      } else if (key === 'style') {
        node.style.cssText = attributes[key];
      } else if (key === '__value') {
        node.value = node[key] = attributes[key];
      } else if (descriptors[key] && descriptors[key].set && always_set_through_set_attribute.indexOf(key) === -1) {
        node[key] = attributes[key];
      } else {
        attr(node, key, attributes[key]);
      }
    }
  }
  function children(element) {
    return Array.from(element.childNodes);
  }
  function toggle_class(element, name, toggle) {
    element.classList[toggle ? 'add' : 'remove'](name);
  }
  var current_component;
  function set_current_component(component) {
    current_component = component;
  }
  function get_current_component() {
    if (!current_component) throw new Error('Function called outside component initialization');
    return current_component;
  }
  /**
   * The `onMount` function schedules a callback to run as soon as the component has been mounted to the DOM.
   * It must be called during the component's initialisation (but doesn't need to live *inside* the component;
   * it can be called from an external module).
   *
   * `onMount` does not run inside a [server-side component](/docs#run-time-server-side-component-api).
   *
   * https://svelte.dev/docs#run-time-svelte-onmount
   */
  function onMount(fn) {
    get_current_component().$$.on_mount.push(fn);
  }
  /**
   * Schedules a callback to run immediately after the component has been updated.
   *
   * The first time the callback runs will be after the initial `onMount`
   */
  function afterUpdate(fn) {
    get_current_component().$$.after_update.push(fn);
  }
  var dirty_components = [];
  var binding_callbacks = [];
  var render_callbacks = [];
  var flush_callbacks = [];
  var resolved_promise = /* @__PURE__ */Promise.resolve();
  var update_scheduled = false;
  function schedule_update() {
    if (!update_scheduled) {
      update_scheduled = true;
      resolved_promise.then(flush);
    }
  }
  function add_render_callback(fn) {
    render_callbacks.push(fn);
  }
  // flush() calls callbacks in this order:
  // 1. All beforeUpdate callbacks, in order: parents before children
  // 2. All bind:this callbacks, in reverse order: children before parents.
  // 3. All afterUpdate callbacks, in order: parents before children. EXCEPT
  //    for afterUpdates called during the initial onMount, which are called in
  //    reverse order: children before parents.
  // Since callbacks might update component values, which could trigger another
  // call to flush(), the following steps guard against this:
  // 1. During beforeUpdate, any updated components will be added to the
  //    dirty_components array and will cause a reentrant call to flush(). Because
  //    the flush index is kept outside the function, the reentrant call will pick
  //    up where the earlier call left off and go through all dirty components. The
  //    current_component value is saved and restored so that the reentrant call will
  //    not interfere with the "parent" flush() call.
  // 2. bind:this callbacks cannot trigger new flush() calls.
  // 3. During afterUpdate, any updated components will NOT have their afterUpdate
  //    callback called a second time; the seen_callbacks set, outside the flush()
  //    function, guarantees this behavior.
  var seen_callbacks = new Set();
  var flushidx = 0; // Do *not* move this inside the flush() function
  function flush() {
    // Do not reenter flush while dirty components are updated, as this can
    // result in an infinite loop. Instead, let the inner flush handle it.
    // Reentrancy is ok afterwards for bindings etc.
    if (flushidx !== 0) {
      return;
    }
    var saved_component = current_component;
    do {
      // first, call beforeUpdate functions
      // and update components
      try {
        while (flushidx < dirty_components.length) {
          var component = dirty_components[flushidx];
          flushidx++;
          set_current_component(component);
          update(component.$$);
        }
      } catch (e) {
        // reset dirty state to not end up in a deadlocked state and then rethrow
        dirty_components.length = 0;
        flushidx = 0;
        throw e;
      }
      set_current_component(null);
      dirty_components.length = 0;
      flushidx = 0;
      while (binding_callbacks.length) binding_callbacks.pop()();
      // then, once components are updated, call
      // afterUpdate functions. This may cause
      // subsequent updates...
      for (var i = 0; i < render_callbacks.length; i += 1) {
        var callback = render_callbacks[i];
        if (!seen_callbacks.has(callback)) {
          // ...so guard against infinite loops
          seen_callbacks.add(callback);
          callback();
        }
      }
      render_callbacks.length = 0;
    } while (dirty_components.length);
    while (flush_callbacks.length) {
      flush_callbacks.pop()();
    }
    update_scheduled = false;
    seen_callbacks.clear();
    set_current_component(saved_component);
  }
  function update($$) {
    if ($$.fragment !== null) {
      $$.update();
      run_all($$.before_update);
      var dirty = $$.dirty;
      $$.dirty = [-1];
      $$.fragment && $$.fragment.p($$.ctx, dirty);
      $$.after_update.forEach(add_render_callback);
    }
  }
  /**
   * Useful for example to execute remaining `afterUpdate` callbacks before executing `destroy`.
   */
  function flush_render_callbacks(fns) {
    var filtered = [];
    var targets = [];
    render_callbacks.forEach(function (c) {
      return fns.indexOf(c) === -1 ? filtered.push(c) : targets.push(c);
    });
    targets.forEach(function (c) {
      return c();
    });
    render_callbacks = filtered;
  }
  var outroing = new Set();
  var outros;
  function group_outros() {
    outros = {
      r: 0,
      c: [],
      p: outros // parent group
    };
  }

  function check_outros() {
    if (!outros.r) {
      run_all(outros.c);
    }
    outros = outros.p;
  }
  function transition_in(block, local) {
    if (block && block.i) {
      outroing.delete(block);
      block.i(local);
    }
  }
  function transition_out(block, local, detach, callback) {
    if (block && block.o) {
      if (outroing.has(block)) return;
      outroing.add(block);
      outros.c.push(function () {
        outroing.delete(block);
        if (callback) {
          if (detach) block.d(1);
          callback();
        }
      });
      block.o(local);
    } else if (callback) {
      callback();
    }
  }
  function get_spread_update(levels, updates) {
    var update = {};
    var to_null_out = {};
    var accounted_for = {
      $$scope: 1
    };
    var i = levels.length;
    while (i--) {
      var o = levels[i];
      var n = updates[i];
      if (n) {
        for (var key in o) {
          if (!(key in n)) to_null_out[key] = 1;
        }
        for (var _key2 in n) {
          if (!accounted_for[_key2]) {
            update[_key2] = n[_key2];
            accounted_for[_key2] = 1;
          }
        }
        levels[i] = n;
      } else {
        for (var _key3 in o) {
          accounted_for[_key3] = 1;
        }
      }
    }
    for (var _key4 in to_null_out) {
      if (!(_key4 in update)) update[_key4] = undefined;
    }
    return update;
  }
  function create_component(block) {
    block && block.c();
  }
  function mount_component(component, target, anchor, customElement) {
    var _component$$$ = component.$$,
      fragment = _component$$$.fragment,
      after_update = _component$$$.after_update;
    fragment && fragment.m(target, anchor);
    if (!customElement) {
      // onMount happens before the initial afterUpdate
      add_render_callback(function () {
        var new_on_destroy = component.$$.on_mount.map(run).filter(is_function);
        // if the component was destroyed immediately
        // it will update the `$$.on_destroy` reference to `null`.
        // the destructured on_destroy may still reference to the old array
        if (component.$$.on_destroy) {
          var _component$$$$on_dest;
          (_component$$$$on_dest = component.$$.on_destroy).push.apply(_component$$$$on_dest, new_on_destroy);
        } else {
          // Edge case - component was destroyed immediately,
          // most likely as a result of a binding initialising
          run_all(new_on_destroy);
        }
        component.$$.on_mount = [];
      });
    }
    after_update.forEach(add_render_callback);
  }
  function destroy_component(component, detaching) {
    var $$ = component.$$;
    if ($$.fragment !== null) {
      flush_render_callbacks($$.after_update);
      run_all($$.on_destroy);
      $$.fragment && $$.fragment.d(detaching);
      // TODO null out other refs, including component.$$ (but need to
      // preserve final state?)
      $$.on_destroy = $$.fragment = null;
      $$.ctx = [];
    }
  }
  function make_dirty(component, i) {
    if (component.$$.dirty[0] === -1) {
      dirty_components.push(component);
      schedule_update();
      component.$$.dirty.fill(0);
    }
    component.$$.dirty[i / 31 | 0] |= 1 << i % 31;
  }
  function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty) {
    if (dirty === void 0) {
      dirty = [-1];
    }
    var parent_component = current_component;
    set_current_component(component);
    var $$ = component.$$ = {
      fragment: null,
      ctx: [],
      // state
      props: props,
      update: noop,
      not_equal: not_equal,
      bound: blank_object(),
      // lifecycle
      on_mount: [],
      on_destroy: [],
      on_disconnect: [],
      before_update: [],
      after_update: [],
      context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
      // everything else
      callbacks: blank_object(),
      dirty: dirty,
      skip_bound: false,
      root: options.target || parent_component.$$.root
    };
    append_styles && append_styles($$.root);
    var ready = false;
    $$.ctx = instance ? instance(component, options.props || {}, function (i, ret) {
      var value = (arguments.length <= 2 ? 0 : arguments.length - 2) ? arguments.length <= 2 ? undefined : arguments[2] : ret;
      if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
        if (!$$.skip_bound && $$.bound[i]) $$.bound[i](value);
        if (ready) make_dirty(component, i);
      }
      return ret;
    }) : [];
    $$.update();
    ready = true;
    run_all($$.before_update);
    // `false` as a special case of no DOM component
    $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
    if (options.target) {
      if (options.hydrate) {
        var nodes = children(options.target);
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        $$.fragment && $$.fragment.l(nodes);
        nodes.forEach(detach);
      } else {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        $$.fragment && $$.fragment.c();
      }
      if (options.intro) transition_in(component.$$.fragment);
      mount_component(component, options.target, options.anchor, options.customElement);
      flush();
    }
    set_current_component(parent_component);
  }
  /**
   * Base class for Svelte components. Used when dev=false.
   */
  var SvelteComponent = /*#__PURE__*/function () {
    function SvelteComponent() {}
    var _proto2 = SvelteComponent.prototype;
    _proto2.$destroy = function $destroy() {
      destroy_component(this, 1);
      this.$destroy = noop;
    };
    _proto2.$on = function $on(type, callback) {
      if (!is_function(callback)) {
        return noop;
      }
      var callbacks = this.$$.callbacks[type] || (this.$$.callbacks[type] = []);
      callbacks.push(callback);
      return function () {
        var index = callbacks.indexOf(callback);
        if (index !== -1) callbacks.splice(index, 1);
      };
    };
    _proto2.$set = function $set($$props) {
      if (this.$$set && !is_empty($$props)) {
        this.$$.skip_bound = true;
        this.$$set($$props);
        this.$$.skip_bound = false;
      }
    };
    return SvelteComponent;
  }();
  /* src/js/components/shepherd-button.svelte generated by Svelte v3.59.2 */
  function create_fragment$8(ctx) {
    var button;
    var button_aria_label_value;
    var button_class_value;
    var mounted;
    var dispose;
    return {
      c: function c() {
        button = element("button");
        attr(button, "aria-label", button_aria_label_value = /*label*/ctx[3] ? /*label*/ctx[3] : null);
        attr(button, "class", button_class_value = ( /*classes*/ctx[1] || '') + " shepherd-button " + ( /*secondary*/ctx[4] ? 'shepherd-button-secondary' : ''));
        button.disabled = /*disabled*/ctx[2];
        attr(button, "tabindex", "0");
      },
      m: function m(target, anchor) {
        insert(target, button, anchor);
        button.innerHTML = /*text*/ctx[5];
        if (!mounted) {
          dispose = listen(button, "click", function () {
            if (is_function( /*action*/ctx[0])) /*action*/ctx[0].apply(this, arguments);
          });
          mounted = true;
        }
      },
      p: function p(new_ctx, _ref8) {
        var dirty = _ref8[0];
        ctx = new_ctx;
        if (dirty & /*text*/32) button.innerHTML = /*text*/ctx[5];
        if (dirty & /*label*/8 && button_aria_label_value !== (button_aria_label_value = /*label*/ctx[3] ? /*label*/ctx[3] : null)) {
          attr(button, "aria-label", button_aria_label_value);
        }
        if (dirty & /*classes, secondary*/18 && button_class_value !== (button_class_value = ( /*classes*/ctx[1] || '') + " shepherd-button " + ( /*secondary*/ctx[4] ? 'shepherd-button-secondary' : ''))) {
          attr(button, "class", button_class_value);
        }
        if (dirty & /*disabled*/4) {
          button.disabled = /*disabled*/ctx[2];
        }
      },
      i: noop,
      o: noop,
      d: function d(detaching) {
        if (detaching) detach(button);
        mounted = false;
        dispose();
      }
    };
  }
  function instance$8($$self, $$props, $$invalidate) {
    var config = $$props.config,
      step = $$props.step;
    var action, classes, disabled, label, secondary, text;
    function getConfigOption(option) {
      if (isFunction(option)) {
        return option = option.call(step);
      }
      return option;
    }
    $$self.$$set = function ($$props) {
      if ('config' in $$props) $$invalidate(6, config = $$props.config);
      if ('step' in $$props) $$invalidate(7, step = $$props.step);
    };
    $$self.$$.update = function () {
      if ($$self.$$.dirty & /*config, step*/192) {
        {
          $$invalidate(0, action = config.action ? config.action.bind(step.tour) : null);
          $$invalidate(1, classes = config.classes);
          $$invalidate(2, disabled = config.disabled ? getConfigOption(config.disabled) : false);
          $$invalidate(3, label = config.label ? getConfigOption(config.label) : null);
          $$invalidate(4, secondary = config.secondary);
          $$invalidate(5, text = config.text ? getConfigOption(config.text) : null);
        }
      }
    };
    return [action, classes, disabled, label, secondary, text, config, step];
  }
  var Shepherd_button = /*#__PURE__*/function (_SvelteComponent) {
    _inheritsLoose(Shepherd_button, _SvelteComponent);
    function Shepherd_button(options) {
      var _this3;
      _this3 = _SvelteComponent.call(this) || this;
      init(_assertThisInitialized(_this3), options, instance$8, create_fragment$8, safe_not_equal, {
        config: 6,
        step: 7
      });
      return _this3;
    }
    return Shepherd_button;
  }(SvelteComponent);
  /* src/js/components/shepherd-footer.svelte generated by Svelte v3.59.2 */
  function get_each_context(ctx, list, i) {
    var child_ctx = ctx.slice();
    child_ctx[2] = list[i];
    return child_ctx;
  }

  // (24:4) {#if buttons}
  function create_if_block$3(ctx) {
    var each_1_anchor;
    var current;
    var each_value = /*buttons*/ctx[1];
    var each_blocks = [];
    for (var i = 0; i < each_value.length; i += 1) {
      each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    }
    var out = function out(i) {
      return transition_out(each_blocks[i], 1, 1, function () {
        each_blocks[i] = null;
      });
    };
    return {
      c: function c() {
        for (var _i = 0; _i < each_blocks.length; _i += 1) {
          each_blocks[_i].c();
        }
        each_1_anchor = empty();
      },
      m: function m(target, anchor) {
        for (var _i2 = 0; _i2 < each_blocks.length; _i2 += 1) {
          if (each_blocks[_i2]) {
            each_blocks[_i2].m(target, anchor);
          }
        }
        insert(target, each_1_anchor, anchor);
        current = true;
      },
      p: function p(ctx, dirty) {
        if (dirty & /*buttons, step*/3) {
          each_value = /*buttons*/ctx[1];
          var _i3;
          for (_i3 = 0; _i3 < each_value.length; _i3 += 1) {
            var child_ctx = get_each_context(ctx, each_value, _i3);
            if (each_blocks[_i3]) {
              each_blocks[_i3].p(child_ctx, dirty);
              transition_in(each_blocks[_i3], 1);
            } else {
              each_blocks[_i3] = create_each_block(child_ctx);
              each_blocks[_i3].c();
              transition_in(each_blocks[_i3], 1);
              each_blocks[_i3].m(each_1_anchor.parentNode, each_1_anchor);
            }
          }
          group_outros();
          for (_i3 = each_value.length; _i3 < each_blocks.length; _i3 += 1) {
            out(_i3);
          }
          check_outros();
        }
      },
      i: function i(local) {
        if (current) return;
        for (var _i4 = 0; _i4 < each_value.length; _i4 += 1) {
          transition_in(each_blocks[_i4]);
        }
        current = true;
      },
      o: function o(local) {
        each_blocks = each_blocks.filter(Boolean);
        for (var _i5 = 0; _i5 < each_blocks.length; _i5 += 1) {
          transition_out(each_blocks[_i5]);
        }
        current = false;
      },
      d: function d(detaching) {
        destroy_each(each_blocks, detaching);
        if (detaching) detach(each_1_anchor);
      }
    };
  }

  // (25:8) {#each buttons as config}
  function create_each_block(ctx) {
    var shepherdbutton;
    var current;
    shepherdbutton = new Shepherd_button({
      props: {
        config: /*config*/ctx[2],
        step: /*step*/ctx[0]
      }
    });
    return {
      c: function c() {
        create_component(shepherdbutton.$$.fragment);
      },
      m: function m(target, anchor) {
        mount_component(shepherdbutton, target, anchor);
        current = true;
      },
      p: function p(ctx, dirty) {
        var shepherdbutton_changes = {};
        if (dirty & /*buttons*/2) shepherdbutton_changes.config = /*config*/ctx[2];
        if (dirty & /*step*/1) shepherdbutton_changes.step = /*step*/ctx[0];
        shepherdbutton.$set(shepherdbutton_changes);
      },
      i: function i(local) {
        if (current) return;
        transition_in(shepherdbutton.$$.fragment, local);
        current = true;
      },
      o: function o(local) {
        transition_out(shepherdbutton.$$.fragment, local);
        current = false;
      },
      d: function d(detaching) {
        destroy_component(shepherdbutton, detaching);
      }
    };
  }
  function create_fragment$7(ctx) {
    var footer;
    var current;
    var if_block = /*buttons*/ctx[1] && create_if_block$3(ctx);
    return {
      c: function c() {
        footer = element("footer");
        if (if_block) if_block.c();
        attr(footer, "class", "shepherd-footer");
      },
      m: function m(target, anchor) {
        insert(target, footer, anchor);
        if (if_block) if_block.m(footer, null);
        current = true;
      },
      p: function p(ctx, _ref9) {
        var dirty = _ref9[0];
        if ( /*buttons*/ctx[1]) {
          if (if_block) {
            if_block.p(ctx, dirty);
            if (dirty & /*buttons*/2) {
              transition_in(if_block, 1);
            }
          } else {
            if_block = create_if_block$3(ctx);
            if_block.c();
            transition_in(if_block, 1);
            if_block.m(footer, null);
          }
        } else if (if_block) {
          group_outros();
          transition_out(if_block, 1, 1, function () {
            if_block = null;
          });
          check_outros();
        }
      },
      i: function i(local) {
        if (current) return;
        transition_in(if_block);
        current = true;
      },
      o: function o(local) {
        transition_out(if_block);
        current = false;
      },
      d: function d(detaching) {
        if (detaching) detach(footer);
        if (if_block) if_block.d();
      }
    };
  }
  function instance$7($$self, $$props, $$invalidate) {
    var buttons;
    var step = $$props.step;
    $$self.$$set = function ($$props) {
      if ('step' in $$props) $$invalidate(0, step = $$props.step);
    };
    $$self.$$.update = function () {
      if ($$self.$$.dirty & /*step*/1) {
        $$invalidate(1, buttons = step.options.buttons);
      }
    };
    return [step, buttons];
  }
  var Shepherd_footer = /*#__PURE__*/function (_SvelteComponent2) {
    _inheritsLoose(Shepherd_footer, _SvelteComponent2);
    function Shepherd_footer(options) {
      var _this4;
      _this4 = _SvelteComponent2.call(this) || this;
      init(_assertThisInitialized(_this4), options, instance$7, create_fragment$7, safe_not_equal, {
        step: 0
      });
      return _this4;
    }
    return Shepherd_footer;
  }(SvelteComponent);
  /* src/js/components/shepherd-cancel-icon.svelte generated by Svelte v3.59.2 */
  function create_fragment$6(ctx) {
    var button;
    var span;
    var button_aria_label_value;
    var mounted;
    var dispose;
    return {
      c: function c() {
        button = element("button");
        span = element("span");
        span.textContent = "×";
        attr(span, "aria-hidden", "true");
        attr(button, "aria-label", button_aria_label_value = /*cancelIcon*/ctx[0].label ? /*cancelIcon*/ctx[0].label : 'Close Tour');
        attr(button, "class", "shepherd-cancel-icon");
        attr(button, "type", "button");
      },
      m: function m(target, anchor) {
        insert(target, button, anchor);
        append(button, span);
        if (!mounted) {
          dispose = listen(button, "click", /*handleCancelClick*/ctx[1]);
          mounted = true;
        }
      },
      p: function p(ctx, _ref10) {
        var dirty = _ref10[0];
        if (dirty & /*cancelIcon*/1 && button_aria_label_value !== (button_aria_label_value = /*cancelIcon*/ctx[0].label ? /*cancelIcon*/ctx[0].label : 'Close Tour')) {
          attr(button, "aria-label", button_aria_label_value);
        }
      },
      i: noop,
      o: noop,
      d: function d(detaching) {
        if (detaching) detach(button);
        mounted = false;
        dispose();
      }
    };
  }
  function instance$6($$self, $$props, $$invalidate) {
    var cancelIcon = $$props.cancelIcon,
      step = $$props.step;

    /**
    * Add a click listener to the cancel link that cancels the tour
    */
    var handleCancelClick = function handleCancelClick(e) {
      e.preventDefault();
      step.cancel();
    };
    $$self.$$set = function ($$props) {
      if ('cancelIcon' in $$props) $$invalidate(0, cancelIcon = $$props.cancelIcon);
      if ('step' in $$props) $$invalidate(2, step = $$props.step);
    };
    return [cancelIcon, handleCancelClick, step];
  }
  var Shepherd_cancel_icon = /*#__PURE__*/function (_SvelteComponent3) {
    _inheritsLoose(Shepherd_cancel_icon, _SvelteComponent3);
    function Shepherd_cancel_icon(options) {
      var _this5;
      _this5 = _SvelteComponent3.call(this) || this;
      init(_assertThisInitialized(_this5), options, instance$6, create_fragment$6, safe_not_equal, {
        cancelIcon: 0,
        step: 2
      });
      return _this5;
    }
    return Shepherd_cancel_icon;
  }(SvelteComponent);
  /* src/js/components/shepherd-title.svelte generated by Svelte v3.59.2 */
  function create_fragment$5(ctx) {
    var h3;
    return {
      c: function c() {
        h3 = element("h3");
        attr(h3, "id", /*labelId*/ctx[1]);
        attr(h3, "class", "shepherd-title");
      },
      m: function m(target, anchor) {
        insert(target, h3, anchor);
        /*h3_binding*/
        ctx[3](h3);
      },
      p: function p(ctx, _ref11) {
        var dirty = _ref11[0];
        if (dirty & /*labelId*/2) {
          attr(h3, "id", /*labelId*/ctx[1]);
        }
      },
      i: noop,
      o: noop,
      d: function d(detaching) {
        if (detaching) detach(h3);
        /*h3_binding*/
        ctx[3](null);
      }
    };
  }
  function instance$5($$self, $$props, $$invalidate) {
    var labelId = $$props.labelId,
      element = $$props.element,
      title = $$props.title;
    afterUpdate(function () {
      if (isFunction(title)) {
        $$invalidate(2, title = title());
      }
      $$invalidate(0, element.innerHTML = title, element);
    });
    function h3_binding($$value) {
      binding_callbacks[$$value ? 'unshift' : 'push'](function () {
        element = $$value;
        $$invalidate(0, element);
      });
    }
    $$self.$$set = function ($$props) {
      if ('labelId' in $$props) $$invalidate(1, labelId = $$props.labelId);
      if ('element' in $$props) $$invalidate(0, element = $$props.element);
      if ('title' in $$props) $$invalidate(2, title = $$props.title);
    };
    return [element, labelId, title, h3_binding];
  }
  var Shepherd_title = /*#__PURE__*/function (_SvelteComponent4) {
    _inheritsLoose(Shepherd_title, _SvelteComponent4);
    function Shepherd_title(options) {
      var _this6;
      _this6 = _SvelteComponent4.call(this) || this;
      init(_assertThisInitialized(_this6), options, instance$5, create_fragment$5, safe_not_equal, {
        labelId: 1,
        element: 0,
        title: 2
      });
      return _this6;
    }
    return Shepherd_title;
  }(SvelteComponent);
  /* src/js/components/shepherd-header.svelte generated by Svelte v3.59.2 */
  function create_if_block_1$1(ctx) {
    var shepherdtitle;
    var current;
    shepherdtitle = new Shepherd_title({
      props: {
        labelId: /*labelId*/ctx[0],
        title: /*title*/ctx[2]
      }
    });
    return {
      c: function c() {
        create_component(shepherdtitle.$$.fragment);
      },
      m: function m(target, anchor) {
        mount_component(shepherdtitle, target, anchor);
        current = true;
      },
      p: function p(ctx, dirty) {
        var shepherdtitle_changes = {};
        if (dirty & /*labelId*/1) shepherdtitle_changes.labelId = /*labelId*/ctx[0];
        if (dirty & /*title*/4) shepherdtitle_changes.title = /*title*/ctx[2];
        shepherdtitle.$set(shepherdtitle_changes);
      },
      i: function i(local) {
        if (current) return;
        transition_in(shepherdtitle.$$.fragment, local);
        current = true;
      },
      o: function o(local) {
        transition_out(shepherdtitle.$$.fragment, local);
        current = false;
      },
      d: function d(detaching) {
        destroy_component(shepherdtitle, detaching);
      }
    };
  }

  // (39:4) {#if cancelIcon && cancelIcon.enabled}
  function create_if_block$2(ctx) {
    var shepherdcancelicon;
    var current;
    shepherdcancelicon = new Shepherd_cancel_icon({
      props: {
        cancelIcon: /*cancelIcon*/ctx[3],
        step: /*step*/ctx[1]
      }
    });
    return {
      c: function c() {
        create_component(shepherdcancelicon.$$.fragment);
      },
      m: function m(target, anchor) {
        mount_component(shepherdcancelicon, target, anchor);
        current = true;
      },
      p: function p(ctx, dirty) {
        var shepherdcancelicon_changes = {};
        if (dirty & /*cancelIcon*/8) shepherdcancelicon_changes.cancelIcon = /*cancelIcon*/ctx[3];
        if (dirty & /*step*/2) shepherdcancelicon_changes.step = /*step*/ctx[1];
        shepherdcancelicon.$set(shepherdcancelicon_changes);
      },
      i: function i(local) {
        if (current) return;
        transition_in(shepherdcancelicon.$$.fragment, local);
        current = true;
      },
      o: function o(local) {
        transition_out(shepherdcancelicon.$$.fragment, local);
        current = false;
      },
      d: function d(detaching) {
        destroy_component(shepherdcancelicon, detaching);
      }
    };
  }
  function create_fragment$4(ctx) {
    var header;
    var t;
    var current;
    var if_block0 = /*title*/ctx[2] && create_if_block_1$1(ctx);
    var if_block1 = /*cancelIcon*/ctx[3] && /*cancelIcon*/ctx[3].enabled && create_if_block$2(ctx);
    return {
      c: function c() {
        header = element("header");
        if (if_block0) if_block0.c();
        t = space();
        if (if_block1) if_block1.c();
        attr(header, "class", "shepherd-header");
      },
      m: function m(target, anchor) {
        insert(target, header, anchor);
        if (if_block0) if_block0.m(header, null);
        append(header, t);
        if (if_block1) if_block1.m(header, null);
        current = true;
      },
      p: function p(ctx, _ref12) {
        var dirty = _ref12[0];
        if ( /*title*/ctx[2]) {
          if (if_block0) {
            if_block0.p(ctx, dirty);
            if (dirty & /*title*/4) {
              transition_in(if_block0, 1);
            }
          } else {
            if_block0 = create_if_block_1$1(ctx);
            if_block0.c();
            transition_in(if_block0, 1);
            if_block0.m(header, t);
          }
        } else if (if_block0) {
          group_outros();
          transition_out(if_block0, 1, 1, function () {
            if_block0 = null;
          });
          check_outros();
        }
        if ( /*cancelIcon*/ctx[3] && /*cancelIcon*/ctx[3].enabled) {
          if (if_block1) {
            if_block1.p(ctx, dirty);
            if (dirty & /*cancelIcon*/8) {
              transition_in(if_block1, 1);
            }
          } else {
            if_block1 = create_if_block$2(ctx);
            if_block1.c();
            transition_in(if_block1, 1);
            if_block1.m(header, null);
          }
        } else if (if_block1) {
          group_outros();
          transition_out(if_block1, 1, 1, function () {
            if_block1 = null;
          });
          check_outros();
        }
      },
      i: function i(local) {
        if (current) return;
        transition_in(if_block0);
        transition_in(if_block1);
        current = true;
      },
      o: function o(local) {
        transition_out(if_block0);
        transition_out(if_block1);
        current = false;
      },
      d: function d(detaching) {
        if (detaching) detach(header);
        if (if_block0) if_block0.d();
        if (if_block1) if_block1.d();
      }
    };
  }
  function instance$4($$self, $$props, $$invalidate) {
    var labelId = $$props.labelId,
      step = $$props.step;
    var title, cancelIcon;
    $$self.$$set = function ($$props) {
      if ('labelId' in $$props) $$invalidate(0, labelId = $$props.labelId);
      if ('step' in $$props) $$invalidate(1, step = $$props.step);
    };
    $$self.$$.update = function () {
      if ($$self.$$.dirty & /*step*/2) {
        {
          $$invalidate(2, title = step.options.title);
          $$invalidate(3, cancelIcon = step.options.cancelIcon);
        }
      }
    };
    return [labelId, step, title, cancelIcon];
  }
  var Shepherd_header = /*#__PURE__*/function (_SvelteComponent5) {
    _inheritsLoose(Shepherd_header, _SvelteComponent5);
    function Shepherd_header(options) {
      var _this7;
      _this7 = _SvelteComponent5.call(this) || this;
      init(_assertThisInitialized(_this7), options, instance$4, create_fragment$4, safe_not_equal, {
        labelId: 0,
        step: 1
      });
      return _this7;
    }
    return Shepherd_header;
  }(SvelteComponent);
  /* src/js/components/shepherd-text.svelte generated by Svelte v3.59.2 */
  function create_fragment$3(ctx) {
    var div;
    return {
      c: function c() {
        div = element("div");
        attr(div, "class", "shepherd-text");
        attr(div, "id", /*descriptionId*/ctx[1]);
      },
      m: function m(target, anchor) {
        insert(target, div, anchor);
        /*div_binding*/
        ctx[3](div);
      },
      p: function p(ctx, _ref13) {
        var dirty = _ref13[0];
        if (dirty & /*descriptionId*/2) {
          attr(div, "id", /*descriptionId*/ctx[1]);
        }
      },
      i: noop,
      o: noop,
      d: function d(detaching) {
        if (detaching) detach(div);
        /*div_binding*/
        ctx[3](null);
      }
    };
  }
  function instance$3($$self, $$props, $$invalidate) {
    var descriptionId = $$props.descriptionId,
      element = $$props.element,
      step = $$props.step;
    afterUpdate(function () {
      var text = step.options.text;
      if (isFunction(text)) {
        text = text.call(step);
      }
      if (isHTMLElement$1(text)) {
        element.appendChild(text);
      } else {
        $$invalidate(0, element.innerHTML = text, element);
      }
    });
    function div_binding($$value) {
      binding_callbacks[$$value ? 'unshift' : 'push'](function () {
        element = $$value;
        $$invalidate(0, element);
      });
    }
    $$self.$$set = function ($$props) {
      if ('descriptionId' in $$props) $$invalidate(1, descriptionId = $$props.descriptionId);
      if ('element' in $$props) $$invalidate(0, element = $$props.element);
      if ('step' in $$props) $$invalidate(2, step = $$props.step);
    };
    return [element, descriptionId, step, div_binding];
  }
  var Shepherd_text = /*#__PURE__*/function (_SvelteComponent6) {
    _inheritsLoose(Shepherd_text, _SvelteComponent6);
    function Shepherd_text(options) {
      var _this8;
      _this8 = _SvelteComponent6.call(this) || this;
      init(_assertThisInitialized(_this8), options, instance$3, create_fragment$3, safe_not_equal, {
        descriptionId: 1,
        element: 0,
        step: 2
      });
      return _this8;
    }
    return Shepherd_text;
  }(SvelteComponent);
  /* src/js/components/shepherd-content.svelte generated by Svelte v3.59.2 */
  function create_if_block_2(ctx) {
    var shepherdheader;
    var current;
    shepherdheader = new Shepherd_header({
      props: {
        labelId: /*labelId*/ctx[1],
        step: /*step*/ctx[2]
      }
    });
    return {
      c: function c() {
        create_component(shepherdheader.$$.fragment);
      },
      m: function m(target, anchor) {
        mount_component(shepherdheader, target, anchor);
        current = true;
      },
      p: function p(ctx, dirty) {
        var shepherdheader_changes = {};
        if (dirty & /*labelId*/2) shepherdheader_changes.labelId = /*labelId*/ctx[1];
        if (dirty & /*step*/4) shepherdheader_changes.step = /*step*/ctx[2];
        shepherdheader.$set(shepherdheader_changes);
      },
      i: function i(local) {
        if (current) return;
        transition_in(shepherdheader.$$.fragment, local);
        current = true;
      },
      o: function o(local) {
        transition_out(shepherdheader.$$.fragment, local);
        current = false;
      },
      d: function d(detaching) {
        destroy_component(shepherdheader, detaching);
      }
    };
  }

  // (28:2) {#if !isUndefined(step.options.text)}
  function create_if_block_1(ctx) {
    var shepherdtext;
    var current;
    shepherdtext = new Shepherd_text({
      props: {
        descriptionId: /*descriptionId*/ctx[0],
        step: /*step*/ctx[2]
      }
    });
    return {
      c: function c() {
        create_component(shepherdtext.$$.fragment);
      },
      m: function m(target, anchor) {
        mount_component(shepherdtext, target, anchor);
        current = true;
      },
      p: function p(ctx, dirty) {
        var shepherdtext_changes = {};
        if (dirty & /*descriptionId*/1) shepherdtext_changes.descriptionId = /*descriptionId*/ctx[0];
        if (dirty & /*step*/4) shepherdtext_changes.step = /*step*/ctx[2];
        shepherdtext.$set(shepherdtext_changes);
      },
      i: function i(local) {
        if (current) return;
        transition_in(shepherdtext.$$.fragment, local);
        current = true;
      },
      o: function o(local) {
        transition_out(shepherdtext.$$.fragment, local);
        current = false;
      },
      d: function d(detaching) {
        destroy_component(shepherdtext, detaching);
      }
    };
  }

  // (35:2) {#if Array.isArray(step.options.buttons) && step.options.buttons.length}
  function create_if_block$1(ctx) {
    var shepherdfooter;
    var current;
    shepherdfooter = new Shepherd_footer({
      props: {
        step: /*step*/ctx[2]
      }
    });
    return {
      c: function c() {
        create_component(shepherdfooter.$$.fragment);
      },
      m: function m(target, anchor) {
        mount_component(shepherdfooter, target, anchor);
        current = true;
      },
      p: function p(ctx, dirty) {
        var shepherdfooter_changes = {};
        if (dirty & /*step*/4) shepherdfooter_changes.step = /*step*/ctx[2];
        shepherdfooter.$set(shepherdfooter_changes);
      },
      i: function i(local) {
        if (current) return;
        transition_in(shepherdfooter.$$.fragment, local);
        current = true;
      },
      o: function o(local) {
        transition_out(shepherdfooter.$$.fragment, local);
        current = false;
      },
      d: function d(detaching) {
        destroy_component(shepherdfooter, detaching);
      }
    };
  }
  function create_fragment$2(ctx) {
    var div;
    var show_if_2 = !isUndefined( /*step*/ctx[2].options.title) || /*step*/ctx[2].options.cancelIcon && /*step*/ctx[2].options.cancelIcon.enabled;
    var t0;
    var show_if_1 = !isUndefined( /*step*/ctx[2].options.text);
    var t1;
    var show_if = Array.isArray( /*step*/ctx[2].options.buttons) && /*step*/ctx[2].options.buttons.length;
    var current;
    var if_block0 = show_if_2 && create_if_block_2(ctx);
    var if_block1 = show_if_1 && create_if_block_1(ctx);
    var if_block2 = show_if && create_if_block$1(ctx);
    return {
      c: function c() {
        div = element("div");
        if (if_block0) if_block0.c();
        t0 = space();
        if (if_block1) if_block1.c();
        t1 = space();
        if (if_block2) if_block2.c();
        attr(div, "class", "shepherd-content");
      },
      m: function m(target, anchor) {
        insert(target, div, anchor);
        if (if_block0) if_block0.m(div, null);
        append(div, t0);
        if (if_block1) if_block1.m(div, null);
        append(div, t1);
        if (if_block2) if_block2.m(div, null);
        current = true;
      },
      p: function p(ctx, _ref14) {
        var dirty = _ref14[0];
        if (dirty & /*step*/4) show_if_2 = !isUndefined( /*step*/ctx[2].options.title) || /*step*/ctx[2].options.cancelIcon && /*step*/ctx[2].options.cancelIcon.enabled;
        if (show_if_2) {
          if (if_block0) {
            if_block0.p(ctx, dirty);
            if (dirty & /*step*/4) {
              transition_in(if_block0, 1);
            }
          } else {
            if_block0 = create_if_block_2(ctx);
            if_block0.c();
            transition_in(if_block0, 1);
            if_block0.m(div, t0);
          }
        } else if (if_block0) {
          group_outros();
          transition_out(if_block0, 1, 1, function () {
            if_block0 = null;
          });
          check_outros();
        }
        if (dirty & /*step*/4) show_if_1 = !isUndefined( /*step*/ctx[2].options.text);
        if (show_if_1) {
          if (if_block1) {
            if_block1.p(ctx, dirty);
            if (dirty & /*step*/4) {
              transition_in(if_block1, 1);
            }
          } else {
            if_block1 = create_if_block_1(ctx);
            if_block1.c();
            transition_in(if_block1, 1);
            if_block1.m(div, t1);
          }
        } else if (if_block1) {
          group_outros();
          transition_out(if_block1, 1, 1, function () {
            if_block1 = null;
          });
          check_outros();
        }
        if (dirty & /*step*/4) show_if = Array.isArray( /*step*/ctx[2].options.buttons) && /*step*/ctx[2].options.buttons.length;
        if (show_if) {
          if (if_block2) {
            if_block2.p(ctx, dirty);
            if (dirty & /*step*/4) {
              transition_in(if_block2, 1);
            }
          } else {
            if_block2 = create_if_block$1(ctx);
            if_block2.c();
            transition_in(if_block2, 1);
            if_block2.m(div, null);
          }
        } else if (if_block2) {
          group_outros();
          transition_out(if_block2, 1, 1, function () {
            if_block2 = null;
          });
          check_outros();
        }
      },
      i: function i(local) {
        if (current) return;
        transition_in(if_block0);
        transition_in(if_block1);
        transition_in(if_block2);
        current = true;
      },
      o: function o(local) {
        transition_out(if_block0);
        transition_out(if_block1);
        transition_out(if_block2);
        current = false;
      },
      d: function d(detaching) {
        if (detaching) detach(div);
        if (if_block0) if_block0.d();
        if (if_block1) if_block1.d();
        if (if_block2) if_block2.d();
      }
    };
  }
  function instance$2($$self, $$props, $$invalidate) {
    var descriptionId = $$props.descriptionId,
      labelId = $$props.labelId,
      step = $$props.step;
    $$self.$$set = function ($$props) {
      if ('descriptionId' in $$props) $$invalidate(0, descriptionId = $$props.descriptionId);
      if ('labelId' in $$props) $$invalidate(1, labelId = $$props.labelId);
      if ('step' in $$props) $$invalidate(2, step = $$props.step);
    };
    return [descriptionId, labelId, step];
  }
  var Shepherd_content = /*#__PURE__*/function (_SvelteComponent7) {
    _inheritsLoose(Shepherd_content, _SvelteComponent7);
    function Shepherd_content(options) {
      var _this9;
      _this9 = _SvelteComponent7.call(this) || this;
      init(_assertThisInitialized(_this9), options, instance$2, create_fragment$2, safe_not_equal, {
        descriptionId: 0,
        labelId: 1,
        step: 2
      });
      return _this9;
    }
    return Shepherd_content;
  }(SvelteComponent);
  /* src/js/components/shepherd-element.svelte generated by Svelte v3.59.2 */
  function create_if_block(ctx) {
    var div;
    return {
      c: function c() {
        div = element("div");
        attr(div, "class", "shepherd-arrow");
        attr(div, "data-popper-arrow", "");
      },
      m: function m(target, anchor) {
        insert(target, div, anchor);
      },
      d: function d(detaching) {
        if (detaching) detach(div);
      }
    };
  }
  function create_fragment$1(ctx) {
    var div;
    var t;
    var shepherdcontent;
    var div_aria_describedby_value;
    var div_aria_labelledby_value;
    var current;
    var mounted;
    var dispose;
    var if_block = /*step*/ctx[4].options.arrow && /*step*/ctx[4].options.attachTo && /*step*/ctx[4].options.attachTo.element && /*step*/ctx[4].options.attachTo.on && create_if_block();
    shepherdcontent = new Shepherd_content({
      props: {
        descriptionId: /*descriptionId*/ctx[2],
        labelId: /*labelId*/ctx[3],
        step: /*step*/ctx[4]
      }
    });
    var div_levels = [{
      "aria-describedby": div_aria_describedby_value = !isUndefined( /*step*/ctx[4].options.text) ? /*descriptionId*/ctx[2] : null
    }, {
      "aria-labelledby": div_aria_labelledby_value = /*step*/ctx[4].options.title ? /*labelId*/ctx[3] : null
    }, /*dataStepId*/ctx[1], {
      role: "dialog"
    }, {
      tabindex: "0"
    }];
    var div_data = {};
    for (var i = 0; i < div_levels.length; i += 1) {
      div_data = assign(div_data, div_levels[i]);
    }
    return {
      c: function c() {
        div = element("div");
        if (if_block) if_block.c();
        t = space();
        create_component(shepherdcontent.$$.fragment);
        set_attributes(div, div_data);
        toggle_class(div, "shepherd-has-cancel-icon", /*hasCancelIcon*/ctx[5]);
        toggle_class(div, "shepherd-has-title", /*hasTitle*/ctx[6]);
        toggle_class(div, "shepherd-element", true);
      },
      m: function m(target, anchor) {
        insert(target, div, anchor);
        if (if_block) if_block.m(div, null);
        append(div, t);
        mount_component(shepherdcontent, div, null);
        /*div_binding*/
        ctx[13](div);
        current = true;
        if (!mounted) {
          dispose = listen(div, "keydown", /*handleKeyDown*/ctx[7]);
          mounted = true;
        }
      },
      p: function p(ctx, _ref15) {
        var dirty = _ref15[0];
        if ( /*step*/ctx[4].options.arrow && /*step*/ctx[4].options.attachTo && /*step*/ctx[4].options.attachTo.element && /*step*/ctx[4].options.attachTo.on) {
          if (if_block) ;else {
            if_block = create_if_block();
            if_block.c();
            if_block.m(div, t);
          }
        } else if (if_block) {
          if_block.d(1);
          if_block = null;
        }
        var shepherdcontent_changes = {};
        if (dirty & /*descriptionId*/4) shepherdcontent_changes.descriptionId = /*descriptionId*/ctx[2];
        if (dirty & /*labelId*/8) shepherdcontent_changes.labelId = /*labelId*/ctx[3];
        if (dirty & /*step*/16) shepherdcontent_changes.step = /*step*/ctx[4];
        shepherdcontent.$set(shepherdcontent_changes);
        set_attributes(div, div_data = get_spread_update(div_levels, [(!current || dirty & /*step, descriptionId*/20 && div_aria_describedby_value !== (div_aria_describedby_value = !isUndefined( /*step*/ctx[4].options.text) ? /*descriptionId*/ctx[2] : null)) && {
          "aria-describedby": div_aria_describedby_value
        }, (!current || dirty & /*step, labelId*/24 && div_aria_labelledby_value !== (div_aria_labelledby_value = /*step*/ctx[4].options.title ? /*labelId*/ctx[3] : null)) && {
          "aria-labelledby": div_aria_labelledby_value
        }, dirty & /*dataStepId*/2 && /*dataStepId*/ctx[1], {
          role: "dialog"
        }, {
          tabindex: "0"
        }]));
        toggle_class(div, "shepherd-has-cancel-icon", /*hasCancelIcon*/ctx[5]);
        toggle_class(div, "shepherd-has-title", /*hasTitle*/ctx[6]);
        toggle_class(div, "shepherd-element", true);
      },
      i: function i(local) {
        if (current) return;
        transition_in(shepherdcontent.$$.fragment, local);
        current = true;
      },
      o: function o(local) {
        transition_out(shepherdcontent.$$.fragment, local);
        current = false;
      },
      d: function d(detaching) {
        if (detaching) detach(div);
        if (if_block) if_block.d();
        destroy_component(shepherdcontent);
        /*div_binding*/
        ctx[13](null);
        mounted = false;
        dispose();
      }
    };
  }
  var KEY_TAB = 9;
  var KEY_ESC = 27;
  var LEFT_ARROW = 37;
  var RIGHT_ARROW = 39;
  function getClassesArray(classes) {
    return classes.split(' ').filter(function (className) {
      return !!className.length;
    });
  }
  function instance$1($$self, $$props, $$invalidate) {
    var classPrefix = $$props.classPrefix,
      element = $$props.element,
      descriptionId = $$props.descriptionId,
      firstFocusableElement = $$props.firstFocusableElement,
      focusableElements = $$props.focusableElements,
      labelId = $$props.labelId,
      lastFocusableElement = $$props.lastFocusableElement,
      step = $$props.step,
      dataStepId = $$props.dataStepId;
    var hasCancelIcon, hasTitle, classes;
    var getElement = function getElement() {
      return element;
    };
    onMount(function () {
      var _dataStepId;
      // Get all elements that are focusable
      $$invalidate(1, dataStepId = (_dataStepId = {}, _dataStepId["data-" + classPrefix + "shepherd-step-id"] = step.id, _dataStepId));
      $$invalidate(9, focusableElements = element.querySelectorAll('a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="0"]'));
      $$invalidate(8, firstFocusableElement = focusableElements[0]);
      $$invalidate(10, lastFocusableElement = focusableElements[focusableElements.length - 1]);
    });
    afterUpdate(function () {
      if (classes !== step.options.classes) {
        updateDynamicClasses();
      }
    });
    function updateDynamicClasses() {
      removeClasses(classes);
      classes = step.options.classes;
      addClasses(classes);
    }
    function removeClasses(classes) {
      if (isString(classes)) {
        var oldClasses = getClassesArray(classes);
        if (oldClasses.length) {
          var _element$classList;
          (_element$classList = element.classList).remove.apply(_element$classList, oldClasses);
        }
      }
    }
    function addClasses(classes) {
      if (isString(classes)) {
        var newClasses = getClassesArray(classes);
        if (newClasses.length) {
          var _element$classList2;
          (_element$classList2 = element.classList).add.apply(_element$classList2, newClasses);
        }
      }
    }

    /**
    * Setup keydown events to allow closing the modal with ESC
    *
    * Borrowed from this great post! https://bitsofco.de/accessible-modal-dialog/
    *
    * @private
    */
    var handleKeyDown = function handleKeyDown(e) {
      var _step = step,
        tour = _step.tour;
      switch (e.keyCode) {
        case KEY_TAB:
          if (focusableElements.length === 0) {
            e.preventDefault();
            break;
          }
          // Backward tab
          if (e.shiftKey) {
            if (document.activeElement === firstFocusableElement || document.activeElement.classList.contains('shepherd-element')) {
              e.preventDefault();
              lastFocusableElement.focus();
            }
          } else {
            if (document.activeElement === lastFocusableElement) {
              e.preventDefault();
              firstFocusableElement.focus();
            }
          }
          break;
        case KEY_ESC:
          if (tour.options.exitOnEsc) {
            e.stopPropagation();
            step.cancel();
          }
          break;
        case LEFT_ARROW:
          if (tour.options.keyboardNavigation) {
            e.stopPropagation();
            tour.back();
          }
          break;
        case RIGHT_ARROW:
          if (tour.options.keyboardNavigation) {
            e.stopPropagation();
            tour.next();
          }
          break;
      }
    };
    function div_binding($$value) {
      binding_callbacks[$$value ? 'unshift' : 'push'](function () {
        element = $$value;
        $$invalidate(0, element);
      });
    }
    $$self.$$set = function ($$props) {
      if ('classPrefix' in $$props) $$invalidate(11, classPrefix = $$props.classPrefix);
      if ('element' in $$props) $$invalidate(0, element = $$props.element);
      if ('descriptionId' in $$props) $$invalidate(2, descriptionId = $$props.descriptionId);
      if ('firstFocusableElement' in $$props) $$invalidate(8, firstFocusableElement = $$props.firstFocusableElement);
      if ('focusableElements' in $$props) $$invalidate(9, focusableElements = $$props.focusableElements);
      if ('labelId' in $$props) $$invalidate(3, labelId = $$props.labelId);
      if ('lastFocusableElement' in $$props) $$invalidate(10, lastFocusableElement = $$props.lastFocusableElement);
      if ('step' in $$props) $$invalidate(4, step = $$props.step);
      if ('dataStepId' in $$props) $$invalidate(1, dataStepId = $$props.dataStepId);
    };
    $$self.$$.update = function () {
      if ($$self.$$.dirty & /*step*/16) {
        {
          $$invalidate(5, hasCancelIcon = step.options && step.options.cancelIcon && step.options.cancelIcon.enabled);
          $$invalidate(6, hasTitle = step.options && step.options.title);
        }
      }
    };
    return [element, dataStepId, descriptionId, labelId, step, hasCancelIcon, hasTitle, handleKeyDown, firstFocusableElement, focusableElements, lastFocusableElement, classPrefix, getElement, div_binding];
  }
  var Shepherd_element = /*#__PURE__*/function (_SvelteComponent8) {
    _inheritsLoose(Shepherd_element, _SvelteComponent8);
    function Shepherd_element(options) {
      var _this10;
      _this10 = _SvelteComponent8.call(this) || this;
      init(_assertThisInitialized(_this10), options, instance$1, create_fragment$1, safe_not_equal, {
        classPrefix: 11,
        element: 0,
        descriptionId: 2,
        firstFocusableElement: 8,
        focusableElements: 9,
        labelId: 3,
        lastFocusableElement: 10,
        step: 4,
        dataStepId: 1,
        getElement: 12
      });
      return _this10;
    }
    _createClass(Shepherd_element, [{
      key: "getElement",
      get: function get() {
        return this.$$.ctx[12];
      }
    }]);
    return Shepherd_element;
  }(SvelteComponent);
  /**
   * A class representing steps to be added to a tour.
   * @extends {Evented}
   */
  var Step = /*#__PURE__*/function (_Evented) {
    _inheritsLoose(Step, _Evented);
    /**
     * Create a step
     * @param {Tour} tour The tour for the step
     * @param {object} options The options for the step
     * @param {boolean} options.arrow Whether to display the arrow for the tooltip or not. Defaults to `true`.
     * @param {object} options.attachTo The element the step should be attached to on the page.
     * An object with properties `element` and `on`.
     *
     * ```js
     * const step = new Step(tour, {
     *   attachTo: { element: '.some .selector-path', on: 'left' },
     *   ...moreOptions
     * });
     * ```
     *
     * If you don’t specify an `attachTo` the element will appear in the middle of the screen. The same will happen if your `attachTo.element` callback returns `null`, `undefined`, or a selector that does not exist in the DOM.
     * If you omit the `on` portion of `attachTo`, the element will still be highlighted, but the tooltip will appear
     * in the middle of the screen, without an arrow pointing to the target.
     * If the element to highlight does not yet exist while instantiating tour steps, you may use lazy evaluation by supplying a function to `attachTo.element`. The function will be called in the `before-show` phase.
     * @param {string|HTMLElement|function} options.attachTo.element An element selector string, DOM element, or a function (returning a selector, a DOM element, `null` or `undefined`).
     * @param {string} options.attachTo.on The optional direction to place the FloatingUI tooltip relative to the element.
     *   - Possible string values: 'top', 'top-start', 'top-end', 'bottom', 'bottom-start', 'bottom-end', 'right', 'right-start', 'right-end', 'left', 'left-start', 'left-end'
     * @param {Object} options.advanceOn An action on the page which should advance shepherd to the next step.
     * It should be an object with a string `selector` and an `event` name
     * ```js
     * const step = new Step(tour, {
     *   advanceOn: { selector: '.some .selector-path', event: 'click' },
     *   ...moreOptions
     * });
     * ```
     * `event` doesn’t have to be an event inside the tour, it can be any event fired on any element on the page.
     * You can also always manually advance the Tour by calling `myTour.next()`.
     * @param {function} options.beforeShowPromise A function that returns a promise.
     * When the promise resolves, the rest of the `show` code for the step will execute.
     * @param {Object[]} options.buttons An array of buttons to add to the step. These will be rendered in a
     * footer below the main body text.
     * @param {function} options.buttons.button.action A function executed when the button is clicked on.
     * It is automatically bound to the `tour` the step is associated with, so things like `this.next` will
     * work inside the action.
     * You can use action to skip steps or navigate to specific steps, with something like:
     * ```js
     * action() {
     *   return this.show('some_step_name');
     * }
     * ```
     * @param {string} options.buttons.button.classes Extra classes to apply to the `<a>`
     * @param {boolean} options.buttons.button.disabled Should the button be disabled?
     * @param {string} options.buttons.button.label The aria-label text of the button
     * @param {boolean} options.buttons.button.secondary If true, a shepherd-button-secondary class is applied to the button
     * @param {string} options.buttons.button.text The HTML text of the button
     * @param {boolean} options.canClickTarget A boolean, that when set to false, will set `pointer-events: none` on the target
     * @param {object} options.cancelIcon Options for the cancel icon
     * @param {boolean} options.cancelIcon.enabled Should a cancel “✕” be shown in the header of the step?
     * @param {string} options.cancelIcon.label The label to add for `aria-label`
     * @param {string} options.classes A string of extra classes to add to the step's content element.
     * @param {string} options.highlightClass An extra class to apply to the `attachTo` element when it is
     * highlighted (that is, when its step is active). You can then target that selector in your CSS.
     * @param {string} options.id The string to use as the `id` for the step.
     * @param {number} options.modalOverlayOpeningPadding An amount of padding to add around the modal overlay opening
     * @param {number | { topLeft: number, bottomLeft: number, bottomRight: number, topRight: number }} options.modalOverlayOpeningRadius An amount of border radius to add around the modal overlay opening
     * @param {object} options.floatingUIOptions Extra options to pass to FloatingUI
     * @param {boolean|Object} options.scrollTo Should the element be scrolled to when this step is shown? If true, uses the default `scrollIntoView`,
     * if an object, passes that object as the params to `scrollIntoView` i.e. `{behavior: 'smooth', block: 'center'}`
     * @param {function} options.scrollToHandler A function that lets you override the default scrollTo behavior and
     * define a custom action to do the scrolling, and possibly other logic.
     * @param {function} options.showOn A function that, when it returns `true`, will show the step.
     * If it returns false, the step will be skipped.
     * @param {string} options.text The text in the body of the step. It can be one of three types:
     * ```
     * - HTML string
     * - `HTMLElement` object
     * - `Function` to be executed when the step is built. It must return one the two options above.
     * ```
     * @param {string} options.title The step's title. It becomes an `h3` at the top of the step. It can be one of two types:
     * ```
     * - HTML string
     * - `Function` to be executed when the step is built. It must return HTML string.
     * ```
     * @param {object} options.when You can define `show`, `hide`, etc events inside `when`. For example:
     * ```js
     * when: {
     *   show: function() {
     *     window.scrollTo(0, 0);
     *   }
     * }
     * ```
     * @return {Step} The newly created Step instance
     */
    function Step(tour, options) {
      var _this11;
      if (options === void 0) {
        options = {};
      }
      _this11 = _Evented.call(this, tour, options) || this;
      _this11.tour = tour;
      _this11.classPrefix = _this11.tour.options ? normalizePrefix(_this11.tour.options.classPrefix) : '';
      _this11.styles = tour.styles;

      /**
       * Resolved attachTo options. Due to lazy evaluation, we only resolve the options during `before-show` phase.
       * Do not use this directly, use the _getResolvedAttachToOptions method instead.
       * @type {null|{}|{element, to}}
       * @private
       */
      _this11._resolvedAttachTo = null;
      autoBind(_assertThisInitialized(_this11));
      _this11._setOptions(options);
      return _assertThisInitialized(_this11) || _assertThisInitialized(_this11);
    }

    /**
     * Cancel the tour
     * Triggers the `cancel` event
     */
    var _proto3 = Step.prototype;
    _proto3.cancel = function cancel() {
      this.tour.cancel();
      this.trigger('cancel');
    }

    /**
     * Complete the tour
     * Triggers the `complete` event
     */;
    _proto3.complete = function complete() {
      this.tour.complete();
      this.trigger('complete');
    }

    /**
     * Remove the step, delete the step's element, and destroy the FloatingUI instance for the step.
     * Triggers `destroy` event
     */;
    _proto3.destroy = function destroy() {
      destroyTooltip(this);
      if (isHTMLElement$1(this.el)) {
        this.el.remove();
        this.el = null;
      }
      this._updateStepTargetOnHide();
      this.trigger('destroy');
    }

    /**
     * Returns the tour for the step
     * @return {Tour} The tour instance
     */;
    _proto3.getTour = function getTour() {
      return this.tour;
    }

    /**
     * Hide the step
     */;
    _proto3.hide = function hide() {
      this.tour.modal.hide();
      this.trigger('before-hide');
      if (this.el) {
        this.el.hidden = true;
      }
      this._updateStepTargetOnHide();
      this.trigger('hide');
    }

    /**
     * Resolves attachTo options.
     * @returns {{}|{element, on}}
     * @private
     */;
    _proto3._resolveAttachToOptions = function _resolveAttachToOptions() {
      this._resolvedAttachTo = parseAttachTo(this);
      return this._resolvedAttachTo;
    }

    /**
     * A selector for resolved attachTo options.
     * @returns {{}|{element, on}}
     * @private
     */;
    _proto3._getResolvedAttachToOptions = function _getResolvedAttachToOptions() {
      if (this._resolvedAttachTo === null) {
        return this._resolveAttachToOptions();
      }
      return this._resolvedAttachTo;
    }

    /**
     * Check if the step is open and visible
     * @return {boolean} True if the step is open and visible
     */;
    _proto3.isOpen = function isOpen() {
      return Boolean(this.el && !this.el.hidden);
    }

    /**
     * Wraps `_show` and ensures `beforeShowPromise` resolves before calling show
     * @return {*|Promise}
     */;
    _proto3.show = function show() {
      var _this12 = this;
      if (isFunction(this.options.beforeShowPromise)) {
        return Promise.resolve(this.options.beforeShowPromise()).then(function () {
          return _this12._show();
        });
      }
      return Promise.resolve(this._show());
    }

    /**
     * Updates the options of the step.
     *
     * @param {Object} options The options for the step
     */;
    _proto3.updateStepOptions = function updateStepOptions(options) {
      Object.assign(this.options, options);
      if (this.shepherdElementComponent) {
        this.shepherdElementComponent.$set({
          step: this
        });
      }
    }

    /**
     * Returns the element for the step
     * @return {HTMLElement|null|undefined} The element instance. undefined if it has never been shown, null if it has been destroyed
     */;
    _proto3.getElement = function getElement() {
      return this.el;
    }

    /**
     * Returns the target for the step
     * @return {HTMLElement|null|undefined} The element instance. undefined if it has never been shown, null if query string has not been found
     */;
    _proto3.getTarget = function getTarget() {
      return this.target;
    }

    /**
     * Creates Shepherd element for step based on options
     *
     * @return {Element} The DOM element for the step tooltip
     * @private
     */;
    _proto3._createTooltipContent = function _createTooltipContent() {
      var descriptionId = this.id + "-description";
      var labelId = this.id + "-label";
      this.shepherdElementComponent = new Shepherd_element({
        target: this.tour.options.stepsContainer || document.body,
        props: {
          classPrefix: this.classPrefix,
          descriptionId: descriptionId,
          labelId: labelId,
          step: this,
          styles: this.styles
        }
      });
      return this.shepherdElementComponent.getElement();
    }

    /**
     * If a custom scrollToHandler is defined, call that, otherwise do the generic
     * scrollIntoView call.
     *
     * @param {boolean|Object} scrollToOptions If true, uses the default `scrollIntoView`,
     * if an object, passes that object as the params to `scrollIntoView` i.e. `{ behavior: 'smooth', block: 'center' }`
     * @private
     */;
    _proto3._scrollTo = function _scrollTo(scrollToOptions) {
      var _this$_getResolvedAtt = this._getResolvedAttachToOptions(),
        element = _this$_getResolvedAtt.element;
      if (isFunction(this.options.scrollToHandler)) {
        this.options.scrollToHandler(element);
      } else if (isElement$1(element) && typeof element.scrollIntoView === 'function') {
        element.scrollIntoView(scrollToOptions);
      }
    }

    /**
     * _getClassOptions gets all possible classes for the step
     * @param {Object} stepOptions The step specific options
     * @returns {String} unique string from array of classes
     * @private
     */;
    _proto3._getClassOptions = function _getClassOptions(stepOptions) {
      var defaultStepOptions = this.tour && this.tour.options && this.tour.options.defaultStepOptions;
      var stepClasses = stepOptions.classes ? stepOptions.classes : '';
      var defaultStepOptionsClasses = defaultStepOptions && defaultStepOptions.classes ? defaultStepOptions.classes : '';
      var allClasses = [].concat(stepClasses.split(' '), defaultStepOptionsClasses.split(' '));
      var uniqClasses = new Set(allClasses);
      return Array.from(uniqClasses).join(' ').trim();
    }

    /**
     * Sets the options for the step, maps `when` to events, sets up buttons
     * @param {Object} options The options for the step
     * @private
     */;
    _proto3._setOptions = function _setOptions(options) {
      var _this13 = this;
      if (options === void 0) {
        options = {};
      }
      var tourOptions = this.tour && this.tour.options && this.tour.options.defaultStepOptions;
      tourOptions = cjs({}, tourOptions || {});
      this.options = Object.assign({
        arrow: true
      }, tourOptions, options, mergeTooltipConfig(tourOptions, options));
      var when = this.options.when;
      this.options.classes = this._getClassOptions(options);
      this.destroy();
      this.id = this.options.id || "step-" + uuid();
      if (when) {
        Object.keys(when).forEach(function (event) {
          _this13.on(event, when[event], _this13);
        });
      }
    }

    /**
     * Create the element and set up the FloatingUI instance
     * @private
     */;
    _proto3._setupElements = function _setupElements() {
      if (!isUndefined(this.el)) {
        this.destroy();
      }
      this.el = this._createTooltipContent();
      if (this.options.advanceOn) {
        bindAdvance(this);
      }

      // The tooltip implementation details are handled outside of the Step
      // object.
      setupTooltip(this);
    }

    /**
     * Triggers `before-show`, generates the tooltip DOM content,
     * sets up a FloatingUI instance for the tooltip, then triggers `show`.
     * @private
     */;
    _proto3._show = function _show() {
      var _this14 = this;
      this.trigger('before-show');

      // Force resolve to make sure the options are updated on subsequent shows.
      this._resolveAttachToOptions();
      this._setupElements();
      if (!this.tour.modal) {
        this.tour._setupModal();
      }
      this.tour.modal.setupForStep(this);
      this._styleTargetElementForStep(this);
      this.el.hidden = false;

      // start scrolling to target before showing the step
      if (this.options.scrollTo) {
        setTimeout(function () {
          _this14._scrollTo(_this14.options.scrollTo);
        });
      }
      this.el.hidden = false;
      var content = this.shepherdElementComponent.getElement();
      var target = this.target || document.body;
      target.classList.add(this.classPrefix + "shepherd-enabled");
      target.classList.add(this.classPrefix + "shepherd-target");
      content.classList.add('shepherd-enabled');
      this.trigger('show');
    }

    /**
     * Modulates the styles of the passed step's target element, based on the step's options and
     * the tour's `modal` option, to visually emphasize the element
     *
     * @param step The step object that attaches to the element
     * @private
     */;
    _proto3._styleTargetElementForStep = function _styleTargetElementForStep(step) {
      var targetElement = step.target;
      if (!targetElement) {
        return;
      }
      if (step.options.highlightClass) {
        targetElement.classList.add(step.options.highlightClass);
      }
      targetElement.classList.remove('shepherd-target-click-disabled');
      if (step.options.canClickTarget === false) {
        targetElement.classList.add('shepherd-target-click-disabled');
      }
    }

    /**
     * When a step is hidden, remove the highlightClass and 'shepherd-enabled'
     * and 'shepherd-target' classes
     * @private
     */;
    _proto3._updateStepTargetOnHide = function _updateStepTargetOnHide() {
      var target = this.target || document.body;
      if (this.options.highlightClass) {
        target.classList.remove(this.options.highlightClass);
      }
      target.classList.remove('shepherd-target-click-disabled', this.classPrefix + "shepherd-enabled", this.classPrefix + "shepherd-target");
    };
    return Step;
  }(Evented);
  /**
   * Cleanup the steps and set pointerEvents back to 'auto'
   * @param tour The tour object
   */
  function cleanupSteps(tour) {
    if (tour) {
      var steps = tour.steps;
      steps.forEach(function (step) {
        if (step.options && step.options.canClickTarget === false && step.options.attachTo) {
          if (step.target instanceof HTMLElement) {
            step.target.classList.remove('shepherd-target-click-disabled');
          }
        }
      });
    }
  }

  /**
   * Generates the svg path data for a rounded rectangle overlay
   * @param {Object} dimension - Dimensions of rectangle.
   * @param {number} width - Width.
   * @param {number} height - Height.
   * @param {number} [x=0] - Offset from top left corner in x axis. default 0.
   * @param {number} [y=0] - Offset from top left corner in y axis. default 0.
   * @param {number | { topLeft: number, topRight: number, bottomRight: number, bottomLeft: number }} [r=0] - Corner Radius. Keep this smaller than half of width or height.
   * @returns {string} - Rounded rectangle overlay path data.
   */
  function makeOverlayPath(_ref16) {
    var width = _ref16.width,
      height = _ref16.height,
      _ref16$x = _ref16.x,
      x = _ref16$x === void 0 ? 0 : _ref16$x,
      _ref16$y = _ref16.y,
      y = _ref16$y === void 0 ? 0 : _ref16$y,
      _ref16$r = _ref16.r,
      r = _ref16$r === void 0 ? 0 : _ref16$r;
    var _window = window,
      w = _window.innerWidth,
      h = _window.innerHeight;
    var _ref17 = typeof r === 'number' ? {
        topLeft: r,
        topRight: r,
        bottomRight: r,
        bottomLeft: r
      } : r,
      _ref17$topLeft = _ref17.topLeft,
      topLeft = _ref17$topLeft === void 0 ? 0 : _ref17$topLeft,
      _ref17$topRight = _ref17.topRight,
      topRight = _ref17$topRight === void 0 ? 0 : _ref17$topRight,
      _ref17$bottomRight = _ref17.bottomRight,
      bottomRight = _ref17$bottomRight === void 0 ? 0 : _ref17$bottomRight,
      _ref17$bottomLeft = _ref17.bottomLeft,
      bottomLeft = _ref17$bottomLeft === void 0 ? 0 : _ref17$bottomLeft;
    return "M" + w + "," + h + "H0V0H" + w + "V" + h + "ZM" + (x + topLeft) + "," + y + "a" + topLeft + "," + topLeft + ",0,0,0-" + topLeft + "," + topLeft + "V" + (height + y - bottomLeft) + "a" + bottomLeft + "," + bottomLeft + ",0,0,0," + bottomLeft + "," + bottomLeft + "H" + (width + x - bottomRight) + "a" + bottomRight + "," + bottomRight + ",0,0,0," + bottomRight + "-" + bottomRight + "V" + (y + topRight) + "a" + topRight + "," + topRight + ",0,0,0-" + topRight + "-" + topRight + "Z";
  }

  /* src/js/components/shepherd-modal.svelte generated by Svelte v3.59.2 */
  function create_fragment(ctx) {
    var svg;
    var path;
    var svg_class_value;
    var mounted;
    var dispose;
    return {
      c: function c() {
        svg = svg_element("svg");
        path = svg_element("path");
        attr(path, "d", /*pathDefinition*/ctx[2]);
        attr(svg, "class", svg_class_value = ( /*modalIsVisible*/ctx[1] ? 'shepherd-modal-is-visible' : '') + " shepherd-modal-overlay-container");
      },
      m: function m(target, anchor) {
        insert(target, svg, anchor);
        append(svg, path);
        /*svg_binding*/
        ctx[11](svg);
        if (!mounted) {
          dispose = listen(svg, "touchmove", /*_preventModalOverlayTouch*/ctx[3]);
          mounted = true;
        }
      },
      p: function p(ctx, _ref18) {
        var dirty = _ref18[0];
        if (dirty & /*pathDefinition*/4) {
          attr(path, "d", /*pathDefinition*/ctx[2]);
        }
        if (dirty & /*modalIsVisible*/2 && svg_class_value !== (svg_class_value = ( /*modalIsVisible*/ctx[1] ? 'shepherd-modal-is-visible' : '') + " shepherd-modal-overlay-container")) {
          attr(svg, "class", svg_class_value);
        }
      },
      i: noop,
      o: noop,
      d: function d(detaching) {
        if (detaching) detach(svg);
        /*svg_binding*/
        ctx[11](null);
        mounted = false;
        dispose();
      }
    };
  }
  function _getScrollParent(element) {
    if (!element) {
      return null;
    }
    var isHtmlElement = element instanceof HTMLElement;
    var overflowY = isHtmlElement && window.getComputedStyle(element).overflowY;
    var isScrollable = overflowY !== 'hidden' && overflowY !== 'visible';
    if (isScrollable && element.scrollHeight >= element.clientHeight) {
      return element;
    }
    return _getScrollParent(element.parentElement);
  }

  /**
   * Get the visible height of the target element relative to its scrollParent.
   * If there is no scroll parent, the height of the element is returned.
   *
   * @param {HTMLElement} element The target element
   * @param {HTMLElement} [scrollParent] The scrollable parent element
   * @returns {{y: number, height: number}}
   * @private
   */
  function _getVisibleHeight(element, scrollParent) {
    var elementRect = element.getBoundingClientRect();
    var top = elementRect.y || elementRect.top;
    var bottom = elementRect.bottom || top + elementRect.height;
    if (scrollParent) {
      var scrollRect = scrollParent.getBoundingClientRect();
      var scrollTop = scrollRect.y || scrollRect.top;
      var scrollBottom = scrollRect.bottom || scrollTop + scrollRect.height;
      top = Math.max(top, scrollTop);
      bottom = Math.min(bottom, scrollBottom);
    }
    var height = Math.max(bottom - top, 0); // Default to 0 if height is negative
    return {
      y: top,
      height: height
    };
  }
  function instance($$self, $$props, $$invalidate) {
    var element = $$props.element,
      openingProperties = $$props.openingProperties;
    uuid();
    var modalIsVisible = false;
    var rafId = undefined;
    var pathDefinition;
    closeModalOpening();
    var getElement = function getElement() {
      return element;
    };
    function closeModalOpening() {
      $$invalidate(4, openingProperties = {
        width: 0,
        height: 0,
        x: 0,
        y: 0,
        r: 0
      });
    }
    function hide() {
      $$invalidate(1, modalIsVisible = false);

      // Ensure we cleanup all event listeners when we hide the modal
      _cleanupStepEventListeners();
    }
    function positionModal(modalOverlayOpeningPadding, modalOverlayOpeningRadius, scrollParent, targetElement) {
      if (modalOverlayOpeningPadding === void 0) {
        modalOverlayOpeningPadding = 0;
      }
      if (modalOverlayOpeningRadius === void 0) {
        modalOverlayOpeningRadius = 0;
      }
      if (targetElement) {
        var _getVisibleHeight2 = _getVisibleHeight(targetElement, scrollParent),
          y = _getVisibleHeight2.y,
          height = _getVisibleHeight2.height;
        var _targetElement$getBou = targetElement.getBoundingClientRect(),
          x = _targetElement$getBou.x,
          width = _targetElement$getBou.width,
          left = _targetElement$getBou.left;

        // getBoundingClientRect is not consistent. Some browsers use x and y, while others use left and top
        $$invalidate(4, openingProperties = {
          width: width + modalOverlayOpeningPadding * 2,
          height: height + modalOverlayOpeningPadding * 2,
          x: (x || left) - modalOverlayOpeningPadding,
          y: y - modalOverlayOpeningPadding,
          r: modalOverlayOpeningRadius
        });
      } else {
        closeModalOpening();
      }
    }
    function setupForStep(step) {
      // Ensure we move listeners from the previous step, before we setup new ones
      _cleanupStepEventListeners();
      if (step.tour.options.useModalOverlay) {
        _styleForStep(step);
        show();
      } else {
        hide();
      }
    }
    function show() {
      $$invalidate(1, modalIsVisible = true);
    }
    var _preventModalBodyTouch = function _preventModalBodyTouch(e) {
      e.preventDefault();
    };
    var _preventModalOverlayTouch = function _preventModalOverlayTouch(e) {
      e.stopPropagation();
    };

    /**
    * Add touchmove event listener
    * @private
    */
    function _addStepEventListeners() {
      // Prevents window from moving on touch.
      window.addEventListener('touchmove', _preventModalBodyTouch, {
        passive: false
      });
    }

    /**
    * Cancel the requestAnimationFrame loop and remove touchmove event listeners
    * @private
    */
    function _cleanupStepEventListeners() {
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = undefined;
      }
      window.removeEventListener('touchmove', _preventModalBodyTouch, {
        passive: false
      });
    }

    /**
    * Style the modal for the step
    * @param {Step} step The step to style the opening for
    * @private
    */
    function _styleForStep(step) {
      var _step$options = step.options,
        modalOverlayOpeningPadding = _step$options.modalOverlayOpeningPadding,
        modalOverlayOpeningRadius = _step$options.modalOverlayOpeningRadius;
      var scrollParent = _getScrollParent(step.target);

      // Setup recursive function to call requestAnimationFrame to update the modal opening position
      var rafLoop = function rafLoop() {
        rafId = undefined;
        positionModal(modalOverlayOpeningPadding, modalOverlayOpeningRadius, scrollParent, step.target);
        rafId = requestAnimationFrame(rafLoop);
      };
      rafLoop();
      _addStepEventListeners();
    }
    function svg_binding($$value) {
      binding_callbacks[$$value ? 'unshift' : 'push'](function () {
        element = $$value;
        $$invalidate(0, element);
      });
    }
    $$self.$$set = function ($$props) {
      if ('element' in $$props) $$invalidate(0, element = $$props.element);
      if ('openingProperties' in $$props) $$invalidate(4, openingProperties = $$props.openingProperties);
    };
    $$self.$$.update = function () {
      if ($$self.$$.dirty & /*openingProperties*/16) {
        $$invalidate(2, pathDefinition = makeOverlayPath(openingProperties));
      }
    };
    return [element, modalIsVisible, pathDefinition, _preventModalOverlayTouch, openingProperties, getElement, closeModalOpening, hide, positionModal, setupForStep, show, svg_binding];
  }
  var Shepherd_modal = /*#__PURE__*/function (_SvelteComponent9) {
    _inheritsLoose(Shepherd_modal, _SvelteComponent9);
    function Shepherd_modal(options) {
      var _this15;
      _this15 = _SvelteComponent9.call(this) || this;
      init(_assertThisInitialized(_this15), options, instance, create_fragment, safe_not_equal, {
        element: 0,
        openingProperties: 4,
        getElement: 5,
        closeModalOpening: 6,
        hide: 7,
        positionModal: 8,
        setupForStep: 9,
        show: 10
      });
      return _this15;
    }
    _createClass(Shepherd_modal, [{
      key: "getElement",
      get: function get() {
        return this.$$.ctx[5];
      }
    }, {
      key: "closeModalOpening",
      get: function get() {
        return this.$$.ctx[6];
      }
    }, {
      key: "hide",
      get: function get() {
        return this.$$.ctx[7];
      }
    }, {
      key: "positionModal",
      get: function get() {
        return this.$$.ctx[8];
      }
    }, {
      key: "setupForStep",
      get: function get() {
        return this.$$.ctx[9];
      }
    }, {
      key: "show",
      get: function get() {
        return this.$$.ctx[10];
      }
    }]);
    return Shepherd_modal;
  }(SvelteComponent);
  var Shepherd = new Evented();

  /**
   * Class representing the site tour
   * @extends {Evented}
   */
  var Tour = /*#__PURE__*/function (_Evented2) {
    _inheritsLoose(Tour, _Evented2);
    /**
     * @param {Object} options The options for the tour
     * @param {boolean | function(): boolean | Promise<boolean> | function(): Promise<boolean>} options.confirmCancel If true, will issue a `window.confirm` before cancelling.
     * If it is a function(support Async Function), it will be called and wait for the return value, and will only be cancelled if the value returned is true
     * @param {string} options.confirmCancelMessage The message to display in the `window.confirm` dialog
     * @param {string} options.classPrefix The prefix to add to the `shepherd-enabled` and `shepherd-target` class names as well as the `data-shepherd-step-id`.
     * @param {Object} options.defaultStepOptions Default options for Steps ({@link Step#constructor}), created through `addStep`
     * @param {boolean} options.exitOnEsc Exiting the tour with the escape key will be enabled unless this is explicitly
     * set to false.
     * @param {boolean} options.keyboardNavigation Navigating the tour via left and right arrow keys will be enabled
     * unless this is explicitly set to false.
     * @param {HTMLElement} options.stepsContainer An optional container element for the steps.
     * If not set, the steps will be appended to `document.body`.
     * @param {HTMLElement} options.modalContainer An optional container element for the modal.
     * If not set, the modal will be appended to `document.body`.
     * @param {object[] | Step[]} options.steps An array of step options objects or Step instances to initialize the tour with
     * @param {string} options.tourName An optional "name" for the tour. This will be appended to the the tour's
     * dynamically generated `id` property.
     * @param {boolean} options.useModalOverlay Whether or not steps should be placed above a darkened
     * modal overlay. If true, the overlay will create an opening around the target element so that it
     * can remain interactive
     * @returns {Tour}
     */
    function Tour(options) {
      var _this16;
      if (options === void 0) {
        options = {};
      }
      _this16 = _Evented2.call(this, options) || this;
      autoBind(_assertThisInitialized(_this16));
      var defaultTourOptions = {
        exitOnEsc: true,
        keyboardNavigation: true
      };
      _this16.options = Object.assign({}, defaultTourOptions, options);
      _this16.classPrefix = normalizePrefix(_this16.options.classPrefix);
      _this16.steps = [];
      _this16.addSteps(_this16.options.steps);

      // Pass these events onto the global Shepherd object
      var events = ['active', 'cancel', 'complete', 'inactive', 'show', 'start'];
      events.map(function (event) {
        (function (e) {
          _this16.on(e, function (opts) {
            opts = opts || {};
            opts.tour = _assertThisInitialized(_this16);
            Shepherd.trigger(e, opts);
          });
        })(event);
      });
      _this16._setTourID();
      return _assertThisInitialized(_this16) || _assertThisInitialized(_this16);
    }

    /**
     * Adds a new step to the tour
     * @param {Object|Step} options An object containing step options or a Step instance
     * @param {number} index The optional index to insert the step at. If undefined, the step
     * is added to the end of the array.
     * @return {Step} The newly added step
     */
    var _proto4 = Tour.prototype;
    _proto4.addStep = function addStep(options, index) {
      var step = options;
      if (!(step instanceof Step)) {
        step = new Step(this, step);
      } else {
        step.tour = this;
      }
      if (!isUndefined(index)) {
        this.steps.splice(index, 0, step);
      } else {
        this.steps.push(step);
      }
      return step;
    }

    /**
     * Add multiple steps to the tour
     * @param {Array<object> | Array<Step>} steps The steps to add to the tour
     */;
    _proto4.addSteps = function addSteps(steps) {
      var _this17 = this;
      if (Array.isArray(steps)) {
        steps.forEach(function (step) {
          _this17.addStep(step);
        });
      }
      return this;
    }

    /**
     * Go to the previous step in the tour
     */;
    _proto4.back = function back() {
      var index = this.steps.indexOf(this.currentStep);
      this.show(index - 1, false);
    }

    /**
     * Calls _done() triggering the 'cancel' event
     * If `confirmCancel` is true, will show a window.confirm before cancelling
     * If `confirmCancel` is a function, will call it and wait for the return value,
     * and only cancel when the value returned is true
     */;
    _proto4.cancel =
    /*#__PURE__*/
    function () {
      var _cancel = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6() {
        var confirmCancelIsFunction, cancelMessage, stopTour;
        return _regeneratorRuntime().wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              if (!this.options.confirmCancel) {
                _context6.next = 14;
                break;
              }
              confirmCancelIsFunction = typeof this.options.confirmCancel === 'function';
              cancelMessage = this.options.confirmCancelMessage || 'Are you sure you want to stop the tour?';
              if (!confirmCancelIsFunction) {
                _context6.next = 9;
                break;
              }
              _context6.next = 6;
              return this.options.confirmCancel();
            case 6:
              _context6.t0 = _context6.sent;
              _context6.next = 10;
              break;
            case 9:
              _context6.t0 = window.confirm(cancelMessage);
            case 10:
              stopTour = _context6.t0;
              if (stopTour) {
                this._done('cancel');
              }
              _context6.next = 15;
              break;
            case 14:
              this._done('cancel');
            case 15:
            case "end":
              return _context6.stop();
          }
        }, _callee6, this);
      }));
      function cancel() {
        return _cancel.apply(this, arguments);
      }
      return cancel;
    }()
    /**
     * Calls _done() triggering the `complete` event
     */
    ;
    _proto4.complete = function complete() {
      this._done('complete');
    }

    /**
     * Gets the step from a given id
     * @param {Number|String} id The id of the step to retrieve
     * @return {Step} The step corresponding to the `id`
     */;
    _proto4.getById = function getById(id) {
      return this.steps.find(function (step) {
        return step.id === id;
      });
    }

    /**
     * Gets the current step
     * @returns {Step|null}
     */;
    _proto4.getCurrentStep = function getCurrentStep() {
      return this.currentStep;
    }

    /**
     * Hide the current step
     */;
    _proto4.hide = function hide() {
      var currentStep = this.getCurrentStep();
      if (currentStep) {
        return currentStep.hide();
      }
    }

    /**
     * Check if the tour is active
     * @return {boolean}
     */;
    _proto4.isActive = function isActive() {
      return Shepherd.activeTour === this;
    }

    /**
     * Go to the next step in the tour
     * If we are at the end, call `complete`
     */;
    _proto4.next = function next() {
      var index = this.steps.indexOf(this.currentStep);
      if (index === this.steps.length - 1) {
        this.complete();
      } else {
        this.show(index + 1, true);
      }
    }

    /**
     * Removes the step from the tour
     * @param {String} name The id for the step to remove
     */;
    _proto4.removeStep = function removeStep(name) {
      var _this18 = this;
      var current = this.getCurrentStep();

      // Find the step, destroy it and remove it from this.steps
      this.steps.some(function (step, i) {
        if (step.id === name) {
          if (step.isOpen()) {
            step.hide();
          }
          step.destroy();
          _this18.steps.splice(i, 1);
          return true;
        }
      });
      if (current && current.id === name) {
        this.currentStep = undefined;

        // If we have steps left, show the first one, otherwise just cancel the tour
        this.steps.length ? this.show(0) : this.cancel();
      }
    }

    /**
     * Show a specific step in the tour
     * @param {Number|String} key The key to look up the step by
     * @param {Boolean} forward True if we are going forward, false if backward
     */;
    _proto4.show = function show(key, forward) {
      if (key === void 0) {
        key = 0;
      }
      if (forward === void 0) {
        forward = true;
      }
      var step = isString(key) ? this.getById(key) : this.steps[key];
      if (step) {
        this._updateStateBeforeShow();
        var shouldSkipStep = isFunction(step.options.showOn) && !step.options.showOn();

        // If `showOn` returns false, we want to skip the step, otherwise, show the step like normal
        if (shouldSkipStep) {
          this._skipStep(step, forward);
        } else {
          this.trigger('show', {
            step: step,
            previous: this.currentStep
          });
          this.currentStep = step;
          step.show();
        }
      }
    }

    /**
     * Start the tour
     */;
    _proto4.start = function start() {
      this.trigger('start');

      // Save the focused element before the tour opens
      this.focusedElBeforeOpen = document.activeElement;
      this.currentStep = null;
      this._setupModal();
      this._setupActiveTour();
      this.next();
    }

    /**
     * Called whenever the tour is cancelled or completed, basically anytime we exit the tour
     * @param {String} event The event name to trigger
     * @private
     */;
    _proto4._done = function _done(event) {
      var index = this.steps.indexOf(this.currentStep);
      if (Array.isArray(this.steps)) {
        this.steps.forEach(function (step) {
          return step.destroy();
        });
      }
      cleanupSteps(this);
      this.trigger(event, {
        index: index
      });
      Shepherd.activeTour = null;
      this.trigger('inactive', {
        tour: this
      });
      if (this.modal) {
        this.modal.hide();
      }
      if (event === 'cancel' || event === 'complete') {
        if (this.modal) {
          var modalContainer = document.querySelector('.shepherd-modal-overlay-container');
          if (modalContainer) {
            modalContainer.remove();
          }
        }
      }

      // Focus the element that was focused before the tour started
      if (isHTMLElement$1(this.focusedElBeforeOpen)) {
        this.focusedElBeforeOpen.focus();
      }
    }

    /**
     * Make this tour "active"
     * @private
     */;
    _proto4._setupActiveTour = function _setupActiveTour() {
      this.trigger('active', {
        tour: this
      });
      Shepherd.activeTour = this;
    }

    /**
     * _setupModal create the modal container and instance
     * @private
     */;
    _proto4._setupModal = function _setupModal() {
      this.modal = new Shepherd_modal({
        target: this.options.modalContainer || document.body,
        props: {
          classPrefix: this.classPrefix,
          styles: this.styles
        }
      });
    }

    /**
     * Called when `showOn` evaluates to false, to skip the step or complete the tour if it's the last step
     * @param {Step} step The step to skip
     * @param {Boolean} forward True if we are going forward, false if backward
     * @private
     */;
    _proto4._skipStep = function _skipStep(step, forward) {
      var index = this.steps.indexOf(step);
      if (index === this.steps.length - 1) {
        this.complete();
      } else {
        var nextIndex = forward ? index + 1 : index - 1;
        this.show(nextIndex, forward);
      }
    }

    /**
     * Before showing, hide the current step and if the tour is not
     * already active, call `this._setupActiveTour`.
     * @private
     */;
    _proto4._updateStateBeforeShow = function _updateStateBeforeShow() {
      if (this.currentStep) {
        this.currentStep.hide();
      }
      if (!this.isActive()) {
        this._setupActiveTour();
      }
    }

    /**
     * Sets this.id to `${tourName}--${uuid}`
     * @private
     */;
    _proto4._setTourID = function _setTourID() {
      var tourName = this.options.tourName || 'tour';
      this.id = tourName + "--" + uuid();
    };
    return Tour;
  }(Evented);
  var isServerSide = typeof window === 'undefined';
  var NoOp = function NoOp() {};
  if (isServerSide) {
    Object.assign(Shepherd, {
      Tour: NoOp,
      Step: NoOp
    });
  } else {
    Object.assign(Shepherd, {
      Tour: Tour,
      Step: Step
    });
  }

  /**
   * @copyright   (C) 2023 Open Source Matters, Inc. <https://www.joomla.org>
   * @license     GNU General Public License version 2 or later; see LICENSE.txt
   */
  if (!Joomla) {
    throw new Error('Joomla API is not properly initialised');
  }
  function emptyStorage() {
    sessionStorage.removeItem('currentStepId');
    sessionStorage.removeItem('stepCount');
    sessionStorage.removeItem('tourId');
    sessionStorage.removeItem('tourToken');
    sessionStorage.removeItem('previousStepUrl');
  }
  function getTourInstance() {
    var tour = new Shepherd.Tour({
      defaultStepOptions: {
        cancelIcon: {
          enabled: true,
          label: Joomla.Text._('JCANCEL')
        },
        classes: 'shepherd-theme-arrows',
        scrollTo: {
          behavior: 'smooth',
          block: 'center'
        }
      },
      useModalOverlay: true,
      keyboardNavigation: true
    });
    tour.on('cancel', function () {
      emptyStorage();
      tour.steps = [];
    });
    return tour;
  }
  function addProgressIndicator(stepElement, index, total) {
    var header = stepElement.querySelector('.shepherd-header');
    var progress = document.createElement('div');
    progress.classList.add('shepherd-progress');
    progress.setAttribute('role', 'status');
    progress.setAttribute('aria-label', Joomla.Text._('PLG_SYSTEM_GUIDEDTOURS_STEP_NUMBER_OF').replace('{number}', index).replace('{total}', total));
    var progressText = document.createElement('span');
    progressText.setAttribute('aria-hidden', true);
    progressText.innerText = index + "/" + total;
    progress.appendChild(progressText);
    header.insertBefore(progress, stepElement.querySelector('.shepherd-cancel-icon'));
  }
  function setFocus(primaryButton, secondaryButton, cancelButton) {
    if (primaryButton && !primaryButton.disabled) {
      primaryButton.focus();
    } else if (secondaryButton && !secondaryButton.disabled) {
      secondaryButton.focus();
    } else {
      cancelButton.focus();
    }
  }
  function addStepToTourButton(tour, stepObj, buttons) {
    var step = new Shepherd.Step(tour, {
      title: stepObj.title,
      text: stepObj.description,
      classes: 'shepherd-theme-arrows',
      buttons: buttons,
      id: stepObj.id,
      arrow: true,
      beforeShowPromise: function beforeShowPromise() {
        return new Promise(function (resolve) {
          // Set graceful fallbacks in case there is an issue with the target.
          // Possibility to use comma-separated selectors.
          if (tour.currentStep.options.attachTo.element) {
            var targets = tour.currentStep.options.attachTo.element.split(',');
            var position = tour.currentStep.options.attachTo.on;
            tour.currentStep.options.attachTo.element = '';
            tour.currentStep.options.attachTo.on = 'center';
            for (var i = 0; i < targets.length; i += 1) {
              var t = document.querySelector(targets[i]);
              if (t != null) {
                if (!t.disabled && !t.readonly && t.style.display !== 'none') {
                  tour.currentStep.options.attachTo.element = targets[i];
                  tour.currentStep.options.attachTo.on = position;
                  break;
                }
              }
            }
          }
          if (tour.currentStep.options.attachTo.type === 'redirect') {
            var stepUrl = Joomla.getOptions('system.paths').rootFull + tour.currentStep.options.attachTo.url;
            if (window.location.href !== stepUrl) {
              sessionStorage.setItem('currentStepId', tour.currentStep.id);
              sessionStorage.setItem('previousStepUrl', window.location.href);
              window.location.href = stepUrl;
            } else {
              resolve();
            }
          } else {
            resolve();
          }
        }).catch(function () {
          // Ignore
        });
      },
      when: {
        show: function show() {
          var element = this.getElement();
          var target = this.getTarget();

          // Force the screen reader to only read the content of the popup after a refresh
          element.setAttribute('aria-live', 'assertive');
          sessionStorage.setItem('currentStepId', this.id);
          addProgressIndicator(element, this.id + 1, sessionStorage.getItem('stepCount'));
          if (target && this.options.attachTo.type === 'interactive') {
            var cancelButton = element.querySelector('.shepherd-cancel-icon');
            var primaryButton = element.querySelector('.shepherd-button-primary');
            var secondaryButton = element.querySelector('.shepherd-button-secondary');

            // The 'next' button should always be enabled if the target input field of type 'text' has a value
            if (target.tagName.toLowerCase() === 'input' && target.hasAttribute('required') && ['email', 'password', 'search', 'tel', 'text', 'url'].includes(target.type)) {
              if (target.value.trim().length) {
                primaryButton.removeAttribute('disabled');
                primaryButton.classList.remove('disabled');
              } else {
                primaryButton.setAttribute('disabled', 'disabled');
                primaryButton.classList.add('disabled');
              }
            }
            cancelButton.addEventListener('keydown', function (event) {
              if (event.key === 'Tab') {
                if (target.tagName.toLowerCase() === 'joomla-field-fancy-select') {
                  target.querySelector('.choices').click();
                  target.querySelector('.choices input').focus();
                } else if (target.parentElement.tagName.toLowerCase() === 'joomla-field-fancy-select') {
                  target.click();
                  target.querySelector('input').focus();
                } else {
                  target.focus();
                  event.preventDefault();
                }
              }
            });
            if (target.tagName.toLowerCase() === 'iframe') {
              // Give blur to the content of the iframe, as iframes don't have blur events
              target.contentWindow.document.body.addEventListener('blur', function (event) {
                if (!sessionStorage.getItem('tourId')) {
                  return;
                }
                setTimeout(function () {
                  setFocus(primaryButton, secondaryButton, cancelButton);
                }, 1);
                event.preventDefault();
              });
            } else if (target.tagName.toLowerCase() === 'joomla-field-fancy-select') {
              target.querySelector('.choices input').addEventListener('blur', function (event) {
                if (!sessionStorage.getItem('tourId')) {
                  return;
                }
                setFocus(primaryButton, secondaryButton, cancelButton);
                event.preventDefault();
              });
            } else if (target.parentElement.tagName.toLowerCase() === 'joomla-field-fancy-select') {
              target.querySelector('input').addEventListener('blur', function (event) {
                if (!sessionStorage.getItem('tourId')) {
                  return;
                }
                setFocus(primaryButton, secondaryButton, cancelButton);
                event.preventDefault();
              });
            } else {
              target.addEventListener('blur', function (event) {
                if (!sessionStorage.getItem('tourId')) {
                  return;
                }
                setFocus(primaryButton, secondaryButton, cancelButton);
                event.preventDefault();
              });
            }
          }
        }
      }
    });
    if (stepObj.target) {
      step.updateStepOptions({
        attachTo: {
          element: stepObj.target,
          on: stepObj.position,
          url: stepObj.url,
          type: stepObj.type,
          interactive_type: stepObj.interactive_type
        }
      });
    } else {
      step.updateStepOptions({
        attachTo: {
          url: stepObj.url,
          type: stepObj.type,
          interactive_type: stepObj.interactive_type
        }
      });
    }
    if (stepObj.type !== 'next') {
      // Remove stored key to prevent pages to open in the wrong tab
      var storageKey = Joomla.getOptions('system.paths').root + "/" + stepObj.url;
      if (sessionStorage.getItem(storageKey)) {
        sessionStorage.removeItem(storageKey);
      }
    }
    tour.addStep(step);
  }
  function showTourInfo(tour, stepObj) {
    tour.addStep({
      title: stepObj.title,
      text: stepObj.description,
      classes: 'shepherd-theme-arrows',
      buttons: [{
        classes: 'btn btn-primary shepherd-button-primary',
        action: function action() {
          return this.next();
        },
        text: Joomla.Text._('PLG_SYSTEM_GUIDEDTOURS_START')
      }],
      id: 'tourinfo',
      when: {
        show: function show() {
          sessionStorage.setItem('currentStepId', 'tourinfo');
          addProgressIndicator(this.getElement(), 1, sessionStorage.getItem('stepCount'));
        }
      }
    });
  }
  function pushCompleteButton(buttons) {
    buttons.push({
      text: Joomla.Text._('PLG_SYSTEM_GUIDEDTOURS_COMPLETE'),
      classes: 'btn btn-primary shepherd-button-primary',
      action: function action() {
        return this.cancel();
      }
    });
  }
  function pushNextButton(buttons, step, disabled, disabledClass) {
    if (disabled === void 0) {
      disabled = false;
    }
    if (disabledClass === void 0) {
      disabledClass = '';
    }
    buttons.push({
      text: Joomla.Text._('PLG_SYSTEM_GUIDEDTOURS_NEXT'),
      classes: "btn btn-primary shepherd-button-primary step-next-button-" + step.id + " " + disabledClass,
      action: function action() {
        return this.next();
      },
      disabled: disabled
    });
  }
  function addBackButton(buttons, step) {
    buttons.push({
      text: Joomla.Text._('PLG_SYSTEM_GUIDEDTOURS_BACK'),
      classes: 'btn btn-secondary shepherd-button-secondary',
      action: function action() {
        if (step.type === 'redirect') {
          sessionStorage.setItem('currentStepId', step.id - 1);
          var previousStepUrl = sessionStorage.getItem('previousStepUrl');
          if (previousStepUrl) {
            sessionStorage.removeItem('previousStepUrl');
            window.location.href = previousStepUrl;
          }
        }
        return this.back();
      }
    });
  }
  function enableButton(event) {
    var element = document.querySelector(".step-next-button-" + event.currentTarget.step_id);
    element.removeAttribute('disabled');
    element.classList.remove('disabled');
  }
  function disableButton(event) {
    var element = document.querySelector(".step-next-button-" + event.currentTarget.step_id);
    element.setAttribute('disabled', 'disabled');
    element.classList.add('disabled');
  }
  function startTour(obj) {
    // We store the tour id to restart on site refresh
    sessionStorage.setItem('tourId', obj.id);
    sessionStorage.setItem('stepCount', String(obj.steps.length));

    // Try to continue
    var currentStepId = sessionStorage.getItem('currentStepId');
    var prevStep = null;
    var ind = -1;
    if (currentStepId != null && Number(currentStepId) > -1) {
      ind = typeof obj.steps[currentStepId] !== 'undefined' ? Number(currentStepId) : -1;
      // When we have more than one step, we save the previous step
      if (ind > 0) {
        prevStep = obj.steps[ind - 1];
      }
    }

    // Start tour building
    var tour = getTourInstance();

    // No step found, let's start from the beginning
    if (ind < 0) {
      // First check for redirect
      var uri = Joomla.getOptions('system.paths').rootFull;
      var currentUrl = window.location.href;
      if (currentUrl !== uri + obj.steps[0].url) {
        window.location.href = uri + obj.steps[0].url;
        return;
      }

      // Show info
      showTourInfo(tour, obj.steps[0]);
      ind = 1;
    }

    // Now let's add all follow up steps
    var len = obj.steps.length;
    var buttons;
    var _loop = function _loop(index) {
      buttons = [];

      // If we have at least done one step, let's allow a back step
      // - if after the start step
      // - if not the first step after a form redirect
      // - if after a simple redirect
      if (prevStep === null || index > ind || obj.steps[index].type === 'redirect') {
        addBackButton(buttons, obj.steps[index]);
      }
      if (obj && obj.steps[index].target && obj.steps[index].type === 'interactive') {
        var ele = document.querySelector(obj.steps[index].target);
        if (ele) {
          if (obj && obj.steps && obj.steps[index] && obj.steps[index].interactive_type) {
            switch (obj.steps[index].interactive_type) {
              case 'submit':
                ele.addEventListener('click', function () {
                  if (!sessionStorage.getItem('tourId')) {
                    return;
                  }
                  sessionStorage.setItem('currentStepId', obj.steps[index].id + 1);
                });
                break;
              case 'text':
                ele.step_id = index;
                if (ele.hasAttribute('required') && ['email', 'password', 'search', 'tel', 'text', 'url'].includes(ele.type)) {
                  ['input', 'focus'].forEach(function (eventName) {
                    return ele.addEventListener(eventName, function (event) {
                      if (!sessionStorage.getItem('tourId')) {
                        return;
                      }
                      if (event.target.value.trim().length) {
                        enableButton(event);
                      } else {
                        disableButton(event);
                      }
                    });
                  });
                }
                break;
              case 'button':
                ele.addEventListener('click', function () {
                  // the button may submit a form so record the currentStepId in the session storage
                  sessionStorage.setItem('currentStepId', obj.steps[index].id + 1);
                  tour.next();
                });
                break;
            }
          }
        }
      }
      if (index < len - 1) {
        if (obj && obj.steps[index].type !== 'interactive' || obj && obj.steps[index].interactive_type === 'text' || obj && obj.steps[index].interactive_type === 'other') {
          pushNextButton(buttons, obj.steps[index]);
        }
      } else {
        pushCompleteButton(buttons);
      }
      addStepToTourButton(tour, obj.steps[index], buttons);
      prevStep = obj.steps[index];
    };
    for (var index = ind; index < len; index += 1) {
      _loop(index);
    }
    tour.start();
  }
  function loadTour(tourId) {
    if (tourId > 0) {
      var url = Joomla.getOptions('system.paths').rootFull + "administrator/index.php?option=com_ajax&plugin=guidedtours&group=system&format=json&id=" + tourId;
      fetch(url).then(function (response) {
        return response.json();
      }).then(function (result) {
        if (!result.success) {
          if (result.messages) {
            Joomla.renderMessages(result.messages);
          }

          // Kill all tours if we can't find it
          emptyStorage();
        }
        startTour(result.data);
      }).catch(function (error) {
        // Kill the tour if there is a problem with selector validation
        emptyStorage();
        var messages = {
          error: [Joomla.Text._('PLG_SYSTEM_GUIDEDTOURS_TOUR_ERROR')]
        };
        Joomla.renderMessages(messages);
        throw new Error(error);
      });
    }
  }

  // Opt-in Start buttons
  document.querySelector('body').addEventListener('click', function (event) {
    // Click somewhere else
    if (!event.target || !event.target.classList.contains('button-start-guidedtour')) {
      return;
    }

    // Click button but missing data-id
    if (typeof event.target.getAttribute('data-id') === 'undefined' || event.target.getAttribute('data-id') <= 0) {
      Joomla.renderMessages({
        error: [Joomla.Text._('PLG_SYSTEM_GUIDEDTOURS_COULD_NOT_LOAD_THE_TOUR')]
      });
      return;
    }
    sessionStorage.setItem('tourToken', String(Joomla.getOptions('com_guidedtours.token')));
    loadTour(event.target.getAttribute('data-id'));
  });

  // Start a given tour
  var tourId = sessionStorage.getItem('tourId');
  if (tourId > 0 && sessionStorage.getItem('tourToken') === String(Joomla.getOptions('com_guidedtours.token'))) {
    loadTour(tourId);
  } else {
    emptyStorage();
  }

})();
