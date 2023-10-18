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

  /**
   * @copyright  (C) 2018 Open Source Matters, Inc. <https://www.joomla.org>
   * @license    GNU General Public License version 2 or later; see LICENSE.txt
   */
  if (!Joomla) {
    throw new Error('Joomla API is not properly initialized');
  }
  Joomla.MediaManager = Joomla.MediaManager || {};
  var Edit = /*#__PURE__*/function () {
    function Edit() {
      var _this = this;
      // Get the options from Joomla.optionStorage
      this.options = Joomla.getOptions('com_media', {});
      if (!this.options) {
        throw new Error('Initialization error "edit-images.js"');
      }
      this.extension = this.options.uploadPath.split('.').pop();
      this.fileType = ['jpeg', 'jpg'].includes(this.extension) ? 'jpeg' : this.extension;
      this.options.currentUrl = new URL(window.location.href);

      // Initiate the registry
      this.original = {
        filename: this.options.uploadPath.split('/').pop(),
        extension: this.extension,
        contents: "data:image/" + this.fileType + ";base64," + this.options.contents
      };
      // eslint-disable-next-line no-promise-executor-return
      this.previousPluginDeactivated = new Promise(function (resolve) {
        return resolve;
      });
      this.history = {};
      this.current = this.original;
      this.plugins = {};
      this.baseContainer = document.getElementById('media-manager-edit-container');
      if (!this.baseContainer) {
        throw new Error('The image preview container is missing');
      }
      this.createImageContainer(this.original);
      Joomla.MediaManager.Edit = this;
      window.dispatchEvent(new CustomEvent('media-manager-edit-init'));

      // Once the DOM is ready, initialize everything
      customElements.whenDefined('joomla-tab').then( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var tabContainer, tabsUlElement, links;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              tabContainer = document.getElementById('myTab');
              tabsUlElement = tabContainer.firstElementChild;
              links = [].slice.call(tabsUlElement.querySelectorAll('button[aria-controls]')); // Couple the tabs with the plugin objects
              links.forEach(function (link, index) {
                var tab = document.getElementById(link.getAttribute('aria-controls'));
                if (index === 0) {
                  tab.insertAdjacentElement('beforeend', _this.baseContainer);
                }
                link.addEventListener('joomla.tab.hidden', function (_ref2) {
                  var target = _ref2.target;
                  if (!target) {
                    // eslint-disable-next-line no-promise-executor-return
                    _this.previousPluginDeactivated = new Promise(function (resolve) {
                      return resolve;
                    });
                    return;
                  }
                  _this.previousPluginDeactivated = new Promise(function (resolve, reject) {
                    _this.plugins[target.getAttribute('aria-controls').replace('attrib-', '')].Deactivate(_this.imagePreview).then(resolve).catch(function (e) {
                      // eslint-disable-next-line no-console
                      console.log(e);
                      reject();
                    });
                  });
                });
                link.addEventListener('joomla.tab.shown', function (_ref3) {
                  var target = _ref3.target;
                  // Move the image container to the correct tab
                  tab.insertAdjacentElement('beforeend', _this.baseContainer);
                  _this.previousPluginDeactivated.then(function () {
                    return _this.plugins[target.getAttribute('aria-controls').replace('attrib-', '')].Activate(_this.imagePreview);
                  }).catch(function (e) {
                    // eslint-disable-next-line no-console
                    console.log(e);
                  });
                });
              });
              tabContainer.activateTab(0, false);
            case 5:
            case "end":
              return _context.stop();
          }
        }, _callee);
      })));
      this.addHistoryPoint = this.addHistoryPoint.bind(this);
      this.createImageContainer = this.createImageContainer.bind(this);
      this.Reset = this.Reset.bind(this);
      this.Undo = this.Undo.bind(this);
      this.Redo = this.Redo.bind(this);
      this.createProgressBar = this.createProgressBar.bind(this);
      this.updateProgressBar = this.updateProgressBar.bind(this);
      this.removeProgressBar = this.removeProgressBar.bind(this);
      this.upload = this.upload.bind(this);

      // Create history entry
      window.addEventListener('mediaManager.history.point', this.addHistoryPoint.bind(this));
    }

    /**
     * Creates a history snapshot
     * PRIVATE
     */
    var _proto = Edit.prototype;
    _proto.addHistoryPoint = function addHistoryPoint() {
      if (this.original !== this.current) {
        var key = Object.keys(this.history).length;
        if (this.history[key] && this.history[key - 1] && this.history[key] === this.history[key - 1]) {
          return;
        }
        this.history[key + 1] = this.current;
      }
    }

    /**
     * Creates the images for edit and preview
     * PRIVATE
     */;
    _proto.createImageContainer = function createImageContainer(data) {
      if (!data.contents) {
        throw new Error('Initialization error "edit-images.js"');
      }
      this.imagePreview = document.createElement('img');
      this.imagePreview.src = data.contents;
      this.imagePreview.id = 'image-preview';
      this.imagePreview.style.height = 'auto';
      this.imagePreview.style.maxWidth = '100%';
      this.baseContainer.appendChild(this.imagePreview);
    }

    // Reset the image to the initial state
    ;
    _proto.Reset = function Reset( /* current */
    ) {
      var _this2 = this;
      this.current.contents = "data:image/" + this.fileType + ";base64," + this.options.contents;
      this.imagePreview.setAttribute('src', this.current.contents);
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          _this2.imagePreview.setAttribute('width', _this2.imagePreview.naturalWidth);
          _this2.imagePreview.setAttribute('height', _this2.imagePreview.naturalHeight);
        });
      });
    }

    // @TODO History
    // eslint-disable-next-line class-methods-use-this
    ;
    _proto.Undo = function Undo() {}

    // @TODO History
    // eslint-disable-next-line class-methods-use-this
    ;
    _proto.Redo = function Redo() {}

    // @TODO Create the progress bar
    // eslint-disable-next-line class-methods-use-this
    ;
    _proto.createProgressBar = function createProgressBar() {}

    // @TODO Update the progress bar
    // eslint-disable-next-line class-methods-use-this
    ;
    _proto.updateProgressBar = function updateProgressBar( /* position */) {}

    // @TODO Remove the progress bar
    // eslint-disable-next-line class-methods-use-this
    ;
    _proto.removeProgressBar = function removeProgressBar() {}

    /**
     * Uploads
     * Public
     */;
    _proto.upload = function upload(url, stateChangeCallback) {
      var _this3 = this,
        _JSON$stringify;
      var format = Joomla.MediaManager.Edit.original.extension === 'jpg' ? 'jpeg' : Joomla.MediaManager.Edit.original.extension;
      if (!format) {
        // eslint-disable-next-line prefer-destructuring
        format = /data:image\/(.+);/gm.exec(Joomla.MediaManager.Edit.original.contents)[1];
      }
      if (!format) {
        throw new Error('Unable to determine image format');
      }
      this.xhr = new XMLHttpRequest();
      if (typeof stateChangeCallback === 'function') {
        this.xhr.onreadystatechange = stateChangeCallback;
      }
      this.xhr.upload.onprogress = function (e) {
        _this3.updateProgressBar(e.loaded / e.total * 100);
      };
      this.xhr.onload = function () {
        var resp;
        try {
          resp = JSON.parse(_this3.xhr.responseText);
        } catch (er) {
          resp = null;
        }
        if (resp) {
          if (_this3.xhr.status === 200) {
            if (resp.success === true) {
              _this3.removeProgressBar();
            }
            if (resp.status === '1') {
              Joomla.renderMessages({
                success: [resp.message]
              }, 'true');
              _this3.removeProgressBar();
            }
          }
        } else {
          _this3.removeProgressBar();
        }
        _this3.xhr = null;
      };
      this.xhr.onerror = function () {
        _this3.removeProgressBar();
        _this3.xhr = null;
      };
      this.xhr.open('PUT', url, true);
      this.xhr.setRequestHeader('Content-Type', 'application/json');
      this.createProgressBar();
      this.xhr.send(JSON.stringify((_JSON$stringify = {
        name: Joomla.MediaManager.Edit.options.uploadPath.split('/').pop(),
        content: Joomla.MediaManager.Edit.current.contents.replace("data:image/" + format + ";base64,", '')
      }, _JSON$stringify[Joomla.MediaManager.Edit.options.csrfToken] = 1, _JSON$stringify)));
    };
    return Edit;
  }(); // Initiate the Editor API
  // eslint-disable-next-line no-new
  new Edit();

  /**
   * Compute the current URL
   *
   * @param {boolean} isModal is the URL for a modal window
   *
   * @return {{}} the URL object
   */
  var getUrl = function getUrl(isModal) {
    var newUrl = Joomla.MediaManager.Edit.options.currentUrl;
    var params = new URLSearchParams(newUrl.search);
    params.set('view', 'media');
    params.delete('path');
    params.delete('mediatypes');
    var uploadPath = Joomla.MediaManager.Edit.options.uploadPath;
    var fileDirectory = uploadPath.split('/');
    fileDirectory.pop();
    fileDirectory = fileDirectory.join('/');

    // If we are in root add a backslash
    if (fileDirectory.endsWith(':')) {
      fileDirectory = fileDirectory + "/";
    }
    params.set('path', fileDirectory);

    // Respect the images_only URI param
    var mediaTypes = document.querySelector('input[name="mediatypes"]');
    params.set('mediatypes', mediaTypes && mediaTypes.value ? mediaTypes.value : '0');
    if (isModal) {
      params.set('tmpl', 'component');
    }
    newUrl.search = params;
    return newUrl;
  };

  // Customize the Toolbar buttons behavior
  Joomla.submitbutton = function (task) {
    var url = new URL(Joomla.MediaManager.Edit.options.apiBaseUrl + "&task=api.files&path=" + Joomla.MediaManager.Edit.options.uploadPath);
    switch (task) {
      case 'apply':
        Joomla.MediaManager.Edit.upload(url, null);
        Joomla.MediaManager.Edit.imagePreview.src = Joomla.MediaManager.Edit.current.contents;
        Joomla.MediaManager.Edit.original = Joomla.MediaManager.Edit.current;
        Joomla.MediaManager.Edit.history = {};
        _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
          var activeTab;
          return _regeneratorRuntime().wrap(function _callee2$(_context2) {
            while (1) switch (_context2.prev = _context2.next) {
              case 0:
                activeTab = [].slice.call(document.querySelectorAll('joomla-tab-element')).filter(function (tab) {
                  return tab.hasAttribute('active');
                });
                _context2.prev = 1;
                _context2.next = 4;
                return Joomla.MediaManager.Edit.plugins[activeTab[0].id.replace('attrib-', '')].Deactivate(Joomla.MediaManager.Edit.imagePreview);
              case 4:
                _context2.next = 6;
                return Joomla.MediaManager.Edit.plugins[activeTab[0].id.replace('attrib-', '')].Activate(Joomla.MediaManager.Edit.imagePreview);
              case 6:
                _context2.next = 11;
                break;
              case 8:
                _context2.prev = 8;
                _context2.t0 = _context2["catch"](1);
                // eslint-disable-next-line no-console
                console.log(_context2.t0);
              case 11:
              case "end":
                return _context2.stop();
            }
          }, _callee2, null, [[1, 8]]);
        }))();
        break;
      case 'save':
        Joomla.MediaManager.Edit.upload(url, function () {
          if (Joomla.MediaManager.Edit.xhr.readyState === XMLHttpRequest.DONE) {
            if (window.self !== window.top) {
              window.location = getUrl(true);
            } else {
              window.location = getUrl();
            }
          }
        });
        break;
      case 'cancel':
        if (window.self !== window.top) {
          window.location = getUrl(true);
        } else {
          window.location = getUrl();
        }
        break;
      case 'reset':
        Joomla.MediaManager.Edit.Reset('initial');
        break;
    }
  };

})();
