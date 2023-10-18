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
   * @copyright   (C) 2021 Open Source Matters, Inc. <https://www.joomla.org>
   * @license     GNU General Public License version 2 or later; see LICENSE.txt
   */
  if (!Joomla) {
    throw new Error('Joomla API is not properly initiated');
  }

  /**
   * An object holding all the information of the selected image in media manager
   * eg:
   * {
   *   extension: "png"
   *   fileType: "image/png"
   *   height: 44
   *   path: "local-images:/powered_by.png"
   *   thumb: undefined
   *   width: 294
   * }
   */
  Joomla.selectedMediaFile = {};
  var supportedExtensions = Joomla.getOptions('media-picker', {});
  if (!Object.keys(supportedExtensions).length) {
    throw new Error('No supported extensions provided');
  }

  /**
   * Event Listener that updates the Joomla.selectedMediaFile
   * to the selected file in the media manager
   */
  document.addEventListener('onMediaFileSelected', /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(e) {
      var currentModal, container, optionsEl, images, audios, videos, documents, type;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            Joomla.selectedMediaFile = e.detail;
            currentModal = Joomla.Modal.getCurrent();
            container = currentModal.querySelector('.modal-body');
            if (container) {
              _context.next = 5;
              break;
            }
            return _context.abrupt("return");
          case 5:
            optionsEl = container.querySelector('joomla-field-mediamore');
            if (optionsEl) {
              optionsEl.parentNode.removeChild(optionsEl);
            }

            // No extra attributes (lazy, alt) for fields
            if (!container.closest('joomla-field-media')) {
              _context.next = 9;
              break;
            }
            return _context.abrupt("return");
          case 9:
            images = supportedExtensions.images, audios = supportedExtensions.audios, videos = supportedExtensions.videos, documents = supportedExtensions.documents;
            if (Joomla.selectedMediaFile.path) {
              if (images.includes(Joomla.selectedMediaFile.extension.toLowerCase())) {
                type = 'images';
              } else if (audios.includes(Joomla.selectedMediaFile.extension.toLowerCase())) {
                type = 'audios';
              } else if (videos.includes(Joomla.selectedMediaFile.extension.toLowerCase())) {
                type = 'videos';
              } else if (documents.includes(Joomla.selectedMediaFile.extension.toLowerCase())) {
                type = 'documents';
              }
              if (type) {
                container.insertAdjacentHTML('afterbegin', "<joomla-field-mediamore\n  parent-id=\"" + currentModal.id + "\"\n  type=\"" + type + "\"\n  summary-label=\"" + Joomla.Text._('JFIELD_MEDIA_SUMMARY_LABEL') + "\"\n  lazy-label=\"" + Joomla.Text._('JFIELD_MEDIA_LAZY_LABEL') + "\"\n  alt-label=\"" + Joomla.Text._('JFIELD_MEDIA_ALT_LABEL') + "\"\n  alt-check-label=\"" + Joomla.Text._('JFIELD_MEDIA_ALT_CHECK_LABEL') + "\"\n  alt-check-desc-label=\"" + Joomla.Text._('JFIELD_MEDIA_ALT_CHECK_DESC_LABEL') + "\"\n  classes-label=\"" + Joomla.Text._('JFIELD_MEDIA_CLASS_LABEL') + "\"\n  figure-classes-label=\"" + Joomla.Text._('JFIELD_MEDIA_FIGURE_CLASS_LABEL') + "\"\n  figure-caption-label=\"" + Joomla.Text._('JFIELD_MEDIA_FIGURE_CAPTION_LABEL') + "\"\n  embed-check-label=\"" + Joomla.Text._('JFIELD_MEDIA_EMBED_CHECK_LABEL') + "\"\n  embed-check-desc-label=\"" + Joomla.Text._('JFIELD_MEDIA_EMBED_CHECK_DESC_LABEL') + "\"\n  download-check-label=\"" + Joomla.Text._('JFIELD_MEDIA_DOWNLOAD_CHECK_LABEL') + "\"\n  download-check-desc-label=\"" + Joomla.Text._('JFIELD_MEDIA_DOWNLOAD_CHECK_DESC_LABEL') + "\"\n  title-label=\"" + Joomla.Text._('JFIELD_MEDIA_TITLE_LABEL') + "\"\n  width-label=\"" + Joomla.Text._('JFIELD_MEDIA_WIDTH_LABEL') + "\"\n  height-label=\"" + Joomla.Text._('JFIELD_MEDIA_HEIGHT_LABEL') + "\"\n></joomla-field-mediamore>\n");
              }
            }
          case 11:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }());

  /**
   * Method to check if passed param is HTMLElement
   *
   * @param o {string|HTMLElement}  Element to be checked
   *
   * @returns {boolean}
   */
  var isElement = function isElement(o) {
    return typeof HTMLElement === 'object' ? o instanceof HTMLElement : o && typeof o === 'object' && o.nodeType === 1 && typeof o.nodeName === 'string';
  };

  /**
   * Method to return the image size
   *
   * @param url {string}
   *
   * @returns {bool}
   */
  var getImageSize = function getImageSize(url) {
    return new Promise(function (resolve, reject) {
      var img = new Image();
      img.src = url;
      img.onload = function () {
        Joomla.selectedMediaFile.width = img.width;
        Joomla.selectedMediaFile.height = img.height;
        resolve(true);
      };
      img.onerror = function () {
        // eslint-disable-next-line prefer-promise-reject-errors
        reject(false);
      };
    });
  };
  var insertAsImage = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(media, editor, fieldClass) {
      var _Joomla$getOptions, rootFull, parts, attribs, isLazy, alt, appendAlt, classes, figClasses, figCaption, imageElement, currentModal;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            if (media.url) {
              _Joomla$getOptions = Joomla.getOptions('system.paths'), rootFull = _Joomla$getOptions.rootFull;
              parts = media.url.split(rootFull);
              if (parts.length > 1) {
                // eslint-disable-next-line prefer-destructuring
                Joomla.selectedMediaFile.url = parts[1];
                if (media.thumb_path) {
                  Joomla.selectedMediaFile.thumb = media.thumb_path;
                } else {
                  Joomla.selectedMediaFile.thumb = false;
                }
              } else if (media.thumb_path) {
                Joomla.selectedMediaFile.url = media.url;
                Joomla.selectedMediaFile.thumb = media.thumb_path;
              }
            } else {
              Joomla.selectedMediaFile.url = false;
            }
            if (!Joomla.selectedMediaFile.url) {
              _context2.next = 47;
              break;
            }
            isLazy = '';
            alt = '';
            appendAlt = '';
            classes = '';
            figClasses = '';
            figCaption = '';
            imageElement = '';
            if (isElement(editor)) {
              _context2.next = 35;
              break;
            }
            currentModal = fieldClass.closest('.modal-content');
            attribs = currentModal.querySelector('joomla-field-mediamore');
            if (!attribs) {
              _context2.next = 30;
              break;
            }
            if (attribs.getAttribute('alt-check') === 'true') {
              appendAlt = ' alt=""';
            }
            alt = attribs.getAttribute('alt-value') ? " alt=\"" + attribs.getAttribute('alt-value') + "\"" : appendAlt;
            classes = attribs.getAttribute('img-classes') ? " class=\"" + attribs.getAttribute('img-classes') + "\"" : '';
            figClasses = attribs.getAttribute('fig-classes') ? " class=\"image " + attribs.getAttribute('fig-classes') + "\"" : ' class="image"';
            figCaption = attribs.getAttribute('fig-caption') ? "" + attribs.getAttribute('fig-caption') : '';
            if (!(attribs.getAttribute('is-lazy') === 'true')) {
              _context2.next = 30;
              break;
            }
            isLazy = " loading=\"lazy\" width=\"" + Joomla.selectedMediaFile.width + "\" height=\"" + Joomla.selectedMediaFile.height + "\"";
            if (!(Joomla.selectedMediaFile.width === 0 || Joomla.selectedMediaFile.height === 0)) {
              _context2.next = 30;
              break;
            }
            _context2.prev = 21;
            _context2.next = 24;
            return getImageSize(Joomla.selectedMediaFile.url);
          case 24:
            isLazy = " loading=\"lazy\" width=\"" + Joomla.selectedMediaFile.width + "\" height=\"" + Joomla.selectedMediaFile.height + "\"";
            _context2.next = 30;
            break;
          case 27:
            _context2.prev = 27;
            _context2.t0 = _context2["catch"](21);
            isLazy = '';
          case 30:
            if (figCaption) {
              imageElement = "<figure" + figClasses + "><img src=\"" + Joomla.selectedMediaFile.url + "\"" + classes + isLazy + alt + " data-path=\"" + Joomla.selectedMediaFile.path + "\"/><figcaption>" + figCaption + "</figcaption></figure>";
            } else {
              imageElement = "<img src=\"" + Joomla.selectedMediaFile.url + "\"" + classes + isLazy + alt + " data-path=\"" + Joomla.selectedMediaFile.path + "\"/>";
            }
            if (attribs) {
              attribs.parentNode.removeChild(attribs);
            }
            Joomla.editors.instances[editor].replaceSelection(imageElement);
            _context2.next = 47;
            break;
          case 35:
            if (!(Joomla.selectedMediaFile.width === 0 || Joomla.selectedMediaFile.height === 0)) {
              _context2.next = 45;
              break;
            }
            _context2.prev = 36;
            _context2.next = 39;
            return getImageSize(Joomla.selectedMediaFile.url);
          case 39:
            _context2.next = 45;
            break;
          case 41:
            _context2.prev = 41;
            _context2.t1 = _context2["catch"](36);
            Joomla.selectedMediaFile.height = 0;
            Joomla.selectedMediaFile.width = 0;
          case 45:
            fieldClass.markValid();
            fieldClass.setValue(Joomla.selectedMediaFile.url + "#joomlaImage://" + media.path.replace(':', '') + "?width=" + Joomla.selectedMediaFile.width + "&height=" + Joomla.selectedMediaFile.height);
          case 47:
          case "end":
            return _context2.stop();
        }
      }, _callee2, null, [[21, 27], [36, 41]]);
    }));
    return function insertAsImage(_x2, _x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }();
  var insertAsOther = function insertAsOther(media, editor, fieldClass, type) {
    if (media.url) {
      var _Joomla$getOptions2 = Joomla.getOptions('system.paths'),
        rootFull = _Joomla$getOptions2.rootFull;
      var parts = media.url.split(rootFull);
      if (parts.length > 1) {
        // eslint-disable-next-line prefer-destructuring
        Joomla.selectedMediaFile.url = parts[1];
      } else {
        Joomla.selectedMediaFile.url = media.url;
      }
    } else {
      Joomla.selectedMediaFile.url = false;
    }
    var attribs;
    if (Joomla.selectedMediaFile.url) {
      // Available Only inside an editor
      if (!isElement(editor)) {
        var outputText;
        var currentModal = fieldClass.closest('.modal-content');
        attribs = currentModal.querySelector('joomla-field-mediamore');
        if (attribs) {
          var embedable = attribs.getAttribute('embed-it');
          if (embedable && embedable === 'true') {
            if (type === 'audios') {
              outputText = "<audio controls src=\"" + Joomla.selectedMediaFile.url + "\"></audio>";
            }
            if (type === 'documents') {
              // @todo use ${Joomla.selectedMediaFile.filetype} in type
              var title = attribs.getAttribute('title');
              outputText = "<object type=\"application/" + Joomla.selectedMediaFile.extension + "\" data=\"" + Joomla.selectedMediaFile.url + "\" " + (title ? "title=\"" + title + "\"" : '') + " width=\"" + attribs.getAttribute('width') + "\" height=\"" + attribs.getAttribute('height') + "\">\n  " + Joomla.Text._('JFIELD_MEDIA_UNSUPPORTED').replace('{tag}', "<a download href=\"" + Joomla.selectedMediaFile.url + "\">").replace(/{extension}/g, Joomla.selectedMediaFile.extension) + "\n</object>";
            }
            if (type === 'videos') {
              outputText = "<video controls width=\"" + attribs.getAttribute('width') + "\" height=\"" + attribs.getAttribute('height') + "\">\n  <source src=\"" + Joomla.selectedMediaFile.url + "\" type=\"" + Joomla.selectedMediaFile.fileType + "\">\n</video>";
            }
          } else if (Joomla.editors.instances[editor].getSelection() !== '') {
            outputText = "<a download href=\"" + Joomla.selectedMediaFile.url + "\">" + Joomla.editors.instances[editor].getSelection() + "</a>";
          } else {
            var name = /([\w-]+)\./.exec(Joomla.selectedMediaFile.url);
            outputText = "<a download href=\"" + Joomla.selectedMediaFile.url + "\">" + Joomla.Text._('JFIELD_MEDIA_DOWNLOAD_FILE').replace('{file}', name[1]) + "</a>";
          }
        }
        if (attribs) {
          attribs.parentNode.removeChild(attribs);
        }
        Joomla.editors.instances[editor].replaceSelection(outputText);
      } else {
        fieldClass.markValid();
        fieldClass.givenType = type;
        fieldClass.setValue(Joomla.selectedMediaFile.url);
      }
    }
  };

  /**
   * Method to append the image in an editor or a field
   *
   * @param {{}} resp
   * @param {string|HTMLElement} editor
   * @param {string} fieldClass
   */
  var execTransform = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(resp, editor, fieldClass) {
      var media, images, audios, videos, documents;
      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            if (!(resp.success === true)) {
              _context3.next = 12;
              break;
            }
            media = resp.data[0];
            images = supportedExtensions.images, audios = supportedExtensions.audios, videos = supportedExtensions.videos, documents = supportedExtensions.documents;
            if (!(Joomla.selectedMediaFile.extension && images.includes(media.extension.toLowerCase()))) {
              _context3.next = 5;
              break;
            }
            return _context3.abrupt("return", insertAsImage(media, editor, fieldClass));
          case 5:
            if (!(Joomla.selectedMediaFile.extension && audios.includes(media.extension.toLowerCase()))) {
              _context3.next = 7;
              break;
            }
            return _context3.abrupt("return", insertAsOther(media, editor, fieldClass, 'audios'));
          case 7:
            if (!(Joomla.selectedMediaFile.extension && documents.includes(media.extension.toLowerCase()))) {
              _context3.next = 9;
              break;
            }
            return _context3.abrupt("return", insertAsOther(media, editor, fieldClass, 'documents'));
          case 9:
            if (!(Joomla.selectedMediaFile.extension && videos.includes(media.extension.toLowerCase()))) {
              _context3.next = 11;
              break;
            }
            return _context3.abrupt("return", insertAsOther(media, editor, fieldClass, 'videos'));
          case 11:
            return _context3.abrupt("return", '');
          case 12:
            return _context3.abrupt("return", '');
          case 13:
          case "end":
            return _context3.stop();
        }
      }, _callee3);
    }));
    return function execTransform(_x5, _x6, _x7) {
      return _ref3.apply(this, arguments);
    };
  }();

  /**
   * Method that resolves the real url for the selected media file
   *
   * @param data        {object}         The data for the detail
   * @param editor      {string|object}  The data for the detail
   * @param fieldClass  {HTMLElement}    The fieldClass for the detail
   *
   * @returns {void}
   */
  Joomla.getMedia = function (data, editor, fieldClass) {
    return new Promise(function (resolve, reject) {
      if (!data || typeof data === 'object' && (!data.path || data.path === '')) {
        Joomla.selectedMediaFile = {};
        resolve({
          resp: {
            success: false
          }
        });
        return;
      }

      // Compile the url
      var url = new URL(Joomla.getOptions('media-picker-api').apiBaseUrl ? Joomla.getOptions('media-picker-api').apiBaseUrl : Joomla.getOptions('system.paths').baseFull + "index.php?option=com_media&format=json");
      url.searchParams.append('task', 'api.files');
      url.searchParams.append('url', true);
      url.searchParams.append('path', data.path);
      url.searchParams.append('mediatypes', '0,1,2,3');
      url.searchParams.append(Joomla.getOptions('csrf.token'), 1);
      fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(function (response) {
        return response.json();
      }).then( /*#__PURE__*/function () {
        var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(response) {
          return _regeneratorRuntime().wrap(function _callee4$(_context4) {
            while (1) switch (_context4.prev = _context4.next) {
              case 0:
                _context4.t0 = resolve;
                _context4.next = 3;
                return execTransform(response, editor, fieldClass);
              case 3:
                _context4.t1 = _context4.sent;
                return _context4.abrupt("return", (0, _context4.t0)(_context4.t1));
              case 5:
              case "end":
                return _context4.stop();
            }
          }, _callee4);
        }));
        return function (_x8) {
          return _ref4.apply(this, arguments);
        };
      }()).catch(function (error) {
        return reject(error);
      });
    });
  };

  // For B/C purposes
  Joomla.getImage = Joomla.getMedia;

  /**
   * A simple Custom Element for adding alt text and controlling
   * the lazy loading on a selected image
   *
   * Will be rendered only for editor content images
   * Attributes:
   * - parent-id: the id of the parent media field {string}
   * - lazy-label: The text for the checkbox label {string}
   * - alt-label: The text for the alt label {string}
   * - is-lazy: The value for the lazyloading (calculated, defaults to 'true') {string}
   * - alt-value: The value for the alt text (calculated, defaults to '') {string}
   */
  var JoomlaFieldMediaOptions = /*#__PURE__*/function (_HTMLElement) {
    _inheritsLoose(JoomlaFieldMediaOptions, _HTMLElement);
    function JoomlaFieldMediaOptions() {
      return _HTMLElement.apply(this, arguments) || this;
    }
    var _proto = JoomlaFieldMediaOptions.prototype;
    _proto.connectedCallback = function connectedCallback() {
      var _this = this;
      if (this.type === 'images') {
        this.innerHTML = "<details open>\n<summary>" + this.summarytext + "</summary>\n<div class=\"\">\n  <div class=\"form-group\">\n    <div class=\"input-group\">\n      <label class=\"input-group-text\" for=\"" + this.parentId + "-alt\">" + this.alttext + "</label>\n      <input class=\"form-control\" type=\"text\" id=\"" + this.parentId + "-alt\" data-is=\"alt-value\" />\n    </div>\n  </div>\n  <div class=\"form-group\">\n    <div class=\"form-check\">\n      <input class=\"form-check-input\" type=\"checkbox\" id=\"" + this.parentId + "-alt-check\">\n      <label class=\"form-check-label\" for=\"" + this.parentId + "-alt-check\">" + this.altchecktext + "</label>\n      <div><small class=\"form-text\">" + this.altcheckdesctext + "</small></div>\n    </div>\n  </div>\n  <div class=\"form-group\">\n    <div class=\"form-check\">\n      <input class=\"form-check-input\" type=\"checkbox\" id=\"" + this.parentId + "-lazy\" checked>\n      <label class=\"form-check-label\" for=\"" + this.parentId + "-lazy\">" + this.lazytext + "</label>\n    </div>\n  </div>\n  <div class=\"form-group\">\n    <div class=\"input-group\">\n      <label class=\"input-group-text\" for=\"" + this.parentId + "-classes\">" + this.classestext + "</label>\n      <input class=\"form-control\" type=\"text\" id=\"" + this.parentId + "-classes\" data-is=\"img-classes\"/>\n    </div>\n  </div>\n  <div class=\"form-group\">\n    <div class=\"input-group\">\n      <label class=\"input-group-text\" for=\"" + this.parentId + "-figclasses\">" + this.figclassestext + "</label>\n      <input class=\"form-control\" type=\"text\" id=\"" + this.parentId + "-figclasses\" data-is=\"fig-classes\"/>\n    </div>\n  </div>\n  <div class=\"form-group\">\n    <div class=\"input-group\">\n      <label class=\"input-group-text\" for=\"" + this.parentId + "-figcaption\">" + this.figcaptiontext + "</label>\n      <input class=\"form-control\" type=\"text\" id=\"" + this.parentId + "-figcaption\" data-is=\"fig-caption\"/>\n    </div>\n  </div>\n</div>\n</details>";
        this.lazyInputFn = this.lazyInputFn.bind(this);
        this.altCheckFn = this.altCheckFn.bind(this);
        this.inputFn = this.inputFn.bind(this);

        // Add event listeners
        this.lazyInput = this.querySelector("#" + this.parentId + "-lazy");
        this.lazyInput.addEventListener('change', this.lazyInputFn);
        this.altCheck = this.querySelector("#" + this.parentId + "-alt-check");
        this.altCheck.addEventListener('input', this.altCheckFn);
        [].slice.call(this.querySelectorAll('input[type="text"]')).map(function (el) {
          el.addEventListener('input', _this.inputFn);
          var is = el.dataset.is;
          if (is) {
            _this.setAttribute(is, el.value.replace(/"/g, '&quot;'));
          }
          return el;
        });

        // Set initial values
        this.setAttribute('is-lazy', !!this.lazyInput.checked);
        this.setAttribute('alt-check', false);
      } else if (['audios', 'videos', 'documents'].includes(this.type)) {
        this.innerHTML = "<details open>\n<summary>" + this.summarytext + "</summary>\n<div class=\"\">\n  <div class=\"form-group\">\n    <div class=\"form-check\">\n      <input class=\"form-check-input radio\" type=\"radio\" name=\"flexRadioDefault\" id=\"" + this.parentId + "-embed-check-2\" value=\"0\" checked>\n      <label class=\"form-check-label\" for=\"" + this.parentId + "-embed-check-2\">\n        " + this.downloadchecktext + "\n        <div><small class=\"form-text\">" + this.downloadcheckdesctext + "</small></div>\n      </label>\n    </div>\n    <div class=\"form-check\">\n      <input class=\"form-check-input radio\" type=\"radio\" name=\"flexRadioDefault\" id=\"" + this.parentId + "-embed-check-1\" value=\"1\">\n      <label class=\"form-check-label\" for=\"" + this.parentId + "-embed-check-1\">\n        " + this.embedchecktext + "\n        <div><small class=\"form-text\">" + this.embedcheckdesctext + "</small></div>\n      </label>\n    </div>\n  </div>\n  <div class=\"toggable-parts\" style=\"display: none\">\n    <div style=\"display: " + (this.type === 'audios' ? 'none' : 'block') + "\">\n      <div class=\"form-group\">\n        <div class=\"input-group\">\n          <label class=\"input-group-text\" for=\"" + this.parentId + "-width\">" + this.widthtext + "</label>\n          <input class=\"form-control\" type=\"text\" id=\"" + this.parentId + "-width\" value=\"800\" data-is=\"width\"/>\n        </div>\n      </div>\n      <div class=\"form-group\">\n        <div class=\"input-group\">\n          <label class=\"input-group-text\" for=\"" + this.parentId + "-height\">" + this.heighttext + "</label>\n          <input class=\"form-control\" type=\"text\" id=\"" + this.parentId + "-height\" value=\"600\" data-is=\"height\"/>\n        </div>\n      </div>\n      <div style=\"display: " + (this.type === 'document' ? 'block' : 'none') + "\">\n        <div class=\"form-group\">\n          <div class=\"input-group\">\n            <label class=\"input-group-text\" for=\"" + this.parentId + "-title\">" + this.titletext + "</label>\n            <input class=\"form-control\" type=\"text\" id=\"" + this.parentId + "-title\" value=\"\" data-is=\"title\"/>\n          </div>\n        </div>\n    </div>\n  </div>\n</div>\n</details>";
        this.embedInputFn = this.embedInputFn.bind(this);
        this.inputFn = this.inputFn.bind(this);
        [].slice.call(this.querySelectorAll('.form-check-input.radio')).map(function (el) {
          return el.addEventListener('input', _this.embedInputFn);
        });
        this.setAttribute('embed-it', false);
        [].slice.call(this.querySelectorAll('input[type="text"]')).map(function (el) {
          el.addEventListener('input', _this.inputFn);
          var is = el.dataset.is;
          if (is) {
            _this.setAttribute(is, el.value.replace(/"/g, '&quot;'));
          }
          return el;
        });
      }
    };
    _proto.disconnectedCallback = function disconnectedCallback() {
      var _this2 = this;
      if (this.type === 'image') {
        this.lazyInput.removeEventListener('input', this.lazyInputFn);
        this.altInput.removeEventListener('input', this.inputFn);
        this.altCheck.removeEventListener('input', this.altCheckFn);
      }
      if (['audio', 'video', 'document'].includes(this.type)) {
        [].slice.call(this.querySelectorAll('.form-check-input.radio')).map(function (el) {
          return el.removeEventListener('input', _this2.embedInputFn);
        });
        [].slice.call(this.querySelectorAll('input[type="text"]')).map(function (el) {
          return el.removeEventListener('input', _this2.embedInputFn);
        });
      }
      this.innerHTML = '';
    };
    _proto.lazyInputFn = function lazyInputFn(e) {
      this.setAttribute('is-lazy', !!e.target.checked);
    };
    _proto.altCheckFn = function altCheckFn(e) {
      this.setAttribute('alt-check', !!e.target.checked);
    };
    _proto.inputFn = function inputFn(e) {
      var is = e.target.dataset.is;
      if (is) {
        this.setAttribute(is, e.target.value.replace(/"/g, '&quot;'));
      }
    };
    _proto.embedInputFn = function embedInputFn(e) {
      var value = e.target.value;
      this.setAttribute('embed-it', value !== '0');
      var toggable = this.querySelector('.toggable-parts');
      if (toggable) {
        if (toggable.style.display !== 'block') {
          toggable.style.display = 'block';
        } else {
          toggable.style.display = 'none';
        }
      }
    };
    _createClass(JoomlaFieldMediaOptions, [{
      key: "type",
      get: function get() {
        return this.getAttribute('type');
      }
    }, {
      key: "parentId",
      get: function get() {
        return this.getAttribute('parent-id');
      }
    }, {
      key: "lazytext",
      get: function get() {
        return this.getAttribute('lazy-label');
      }
    }, {
      key: "alttext",
      get: function get() {
        return this.getAttribute('alt-label');
      }
    }, {
      key: "altchecktext",
      get: function get() {
        return this.getAttribute('alt-check-label');
      }
    }, {
      key: "altcheckdesctext",
      get: function get() {
        return this.getAttribute('alt-check-desc-label');
      }
    }, {
      key: "embedchecktext",
      get: function get() {
        return this.getAttribute('embed-check-label');
      }
    }, {
      key: "embedcheckdesctext",
      get: function get() {
        return this.getAttribute('embed-check-desc-label');
      }
    }, {
      key: "downloadchecktext",
      get: function get() {
        return this.getAttribute('download-check-label');
      }
    }, {
      key: "downloadcheckdesctext",
      get: function get() {
        return this.getAttribute('download-check-desc-label');
      }
    }, {
      key: "classestext",
      get: function get() {
        return this.getAttribute('classes-label');
      }
    }, {
      key: "figclassestext",
      get: function get() {
        return this.getAttribute('figure-classes-label');
      }
    }, {
      key: "figcaptiontext",
      get: function get() {
        return this.getAttribute('figure-caption-label');
      }
    }, {
      key: "summarytext",
      get: function get() {
        return this.getAttribute('summary-label');
      }
    }, {
      key: "widthtext",
      get: function get() {
        return this.getAttribute('width-label');
      }
    }, {
      key: "heighttext",
      get: function get() {
        return this.getAttribute('height-label');
      }
    }, {
      key: "titletext",
      get: function get() {
        return this.getAttribute('title-label');
      }
    }]);
    return JoomlaFieldMediaOptions;
  }( /*#__PURE__*/_wrapNativeSuper(HTMLElement));
  customElements.define('joomla-field-mediamore', JoomlaFieldMediaOptions);

})();
