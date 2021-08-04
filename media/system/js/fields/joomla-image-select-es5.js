(function () {
  'use strict';

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
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;

    _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
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
      _construct = Reflect.construct;
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

  (function (customElements, Joomla) {
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
    /**
     * Event Listener that updates the Joomla.selectedMediaFile
     * to the selected file in the media manager
     */

    window.document.addEventListener('onMediaFileSelected', function (e) {
      Joomla.selectedMediaFile = e.detail;
      var currentModal = Joomla.Modal.getCurrent();
      var container = currentModal.querySelector('.modal-body');
      var optionsEl = container.querySelector('joomla-field-mediamore');

      if (optionsEl) {
        optionsEl.parentNode.removeChild(optionsEl);
      } // No extra attributes (lazy, alt) for fields


      if (container.closest('joomla-field-media')) {
        return;
      }

      if (Joomla.selectedMediaFile.path) {
        container.insertAdjacentHTML('afterbegin', "\n<joomla-field-mediamore\n  parent-id=\"" + currentModal.id + "\"\n  summary-label=\"" + Joomla.Text._('JFIELD_MEDIA_SUMMARY_LABEL') + "\"\n  lazy-label=\"" + Joomla.Text._('JFIELD_MEDIA_LAZY_LABEL') + "\"\n  alt-label=\"" + Joomla.Text._('JFIELD_MEDIA_ALT_LABEL') + "\"\n  alt-check-label=\"" + Joomla.Text._('JFIELD_MEDIA_ALT_CHECK_LABEL') + "\"\n  alt-check-desc-label=\"" + Joomla.Text._('JFIELD_MEDIA_ALT_CHECK_DESC_LABEL') + "\"\n  classes-label=\"" + Joomla.Text._('JFIELD_MEDIA_CLASS_LABEL') + "\"\n  figure-classes-label=\"" + Joomla.Text._('JFIELD_MEDIA_FIGURE_CLASS_LABEL') + "\"\n  figure-caption-label=\"" + Joomla.Text._('JFIELD_MEDIA_FIGURE_CAPTION_LABEL') + "\"\n></joomla-field-mediamore>\n");
      }
    });
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
    /**
     * Method to append the image in an editor or a field
     *
     * @param {{}} resp
     * @param {string|HTMLElement} editor
     * @param {string} fieldClass
     */


    var execTransform = /*#__PURE__*/function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(resp, editor, fieldClass) {
        var media, _Joomla$getOptions, rootFull, attribs, isLazy, alt, appendAlt, classes, figClasses, figCaption, imageElement, currentModal;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(resp.success === true)) {
                  _context.next = 49;
                  break;
                }

                media = resp.data[0];

                if (media.url) {
                  if (/local-/.test(media.adapter)) {
                    _Joomla$getOptions = Joomla.getOptions('system.paths'), rootFull = _Joomla$getOptions.rootFull; // eslint-disable-next-line prefer-destructuring

                    Joomla.selectedMediaFile.url = media.url.split(rootFull)[1];

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
                  _context.next = 49;
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
                  _context.next = 37;
                  break;
                }

                currentModal = fieldClass.closest('.modal-content');
                attribs = currentModal.querySelector('joomla-field-mediamore');

                if (!attribs) {
                  _context.next = 32;
                  break;
                }

                if (attribs.getAttribute('alt-check') === 'true') {
                  appendAlt = ' alt=""';
                }

                alt = attribs.getAttribute('alt-value') ? " alt=\"" + attribs.getAttribute('alt-value') + "\"" : appendAlt;
                classes = attribs.getAttribute('img-classes') ? " class=\"" + attribs.getAttribute('img-classes') + "\"" : '';
                figClasses = attribs.getAttribute('fig-classes') ? " class=\"" + attribs.getAttribute('fig-classes') + "\"" : '';
                figCaption = attribs.getAttribute('fig-caption') ? "" + attribs.getAttribute('fig-caption') : '';

                if (!(attribs.getAttribute('is-lazy') === 'true')) {
                  _context.next = 32;
                  break;
                }

                isLazy = " loading=\"lazy\" width=\"" + Joomla.selectedMediaFile.width + "\" height=\"" + Joomla.selectedMediaFile.height + "\"";

                if (!(Joomla.selectedMediaFile.width === 0 || Joomla.selectedMediaFile.height === 0)) {
                  _context.next = 32;
                  break;
                }

                _context.prev = 23;
                _context.next = 26;
                return getImageSize(Joomla.selectedMediaFile.url);

              case 26:
                isLazy = " loading=\"lazy\" width=\"" + Joomla.selectedMediaFile.width + "\" height=\"" + Joomla.selectedMediaFile.height + "\"";
                _context.next = 32;
                break;

              case 29:
                _context.prev = 29;
                _context.t0 = _context["catch"](23);
                isLazy = '';

              case 32:
                if (figCaption) {
                  imageElement = "<figure" + figClasses + "><img src=\"" + Joomla.selectedMediaFile.url + "\"" + classes + isLazy + alt + "/><figcaption>" + figCaption + "</figcaption></figure>";
                } else {
                  imageElement = "<img src=\"" + Joomla.selectedMediaFile.url + "\"" + classes + isLazy + alt + "/>";
                }

                if (attribs) {
                  attribs.parentNode.removeChild(attribs);
                }

                Joomla.editors.instances[editor].replaceSelection(imageElement);
                _context.next = 49;
                break;

              case 37:
                if (!(Joomla.selectedMediaFile.width === 0 || Joomla.selectedMediaFile.height === 0)) {
                  _context.next = 47;
                  break;
                }

                _context.prev = 38;
                _context.next = 41;
                return getImageSize(Joomla.selectedMediaFile.url);

              case 41:
                _context.next = 47;
                break;

              case 43:
                _context.prev = 43;
                _context.t1 = _context["catch"](38);
                Joomla.selectedMediaFile.height = 0;
                Joomla.selectedMediaFile.width = 0;

              case 47:
                editor.value = Joomla.selectedMediaFile.url + "#joomlaImage://" + media.path.replace(':', '') + "?width=" + Joomla.selectedMediaFile.width + "&height=" + Joomla.selectedMediaFile.height;
                fieldClass.updatePreview();

              case 49:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[23, 29], [38, 43]]);
      }));

      return function execTransform(_x, _x2, _x3) {
        return _ref.apply(this, arguments);
      };
    }();
    /**
     * Method that resolves the real url for the selected image
     *
     * @param data        {object}         The data for the detail
     * @param editor      {string|object}  The data for the detail
     * @param fieldClass  {HTMLElement}    The fieldClass for the detail
     *
     * @returns {void}
     */


    Joomla.getImage = function (data, editor, fieldClass) {
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

        var apiBaseUrl = Joomla.getOptions('system.paths').baseFull + "index.php?option=com_media";
        Joomla.request({
          url: apiBaseUrl + "&task=api.files&url=true&path=" + data.path + "&" + Joomla.getOptions('csrf.token') + "=1&format=json",
          method: 'GET',
          perform: true,
          headers: {
            'Content-Type': 'application/json'
          },
          onSuccess: function () {
            var _onSuccess = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(response) {
              var resp;
              return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      resp = JSON.parse(response);
                      _context2.t0 = resolve;
                      _context2.next = 4;
                      return execTransform(resp, editor, fieldClass);

                    case 4:
                      _context2.t1 = _context2.sent;
                      (0, _context2.t0)(_context2.t1);

                    case 6:
                    case "end":
                      return _context2.stop();
                  }
                }
              }, _callee2);
            }));

            function onSuccess(_x4) {
              return _onSuccess.apply(this, arguments);
            }

            return onSuccess;
          }(),
          onError: function onError(err) {
            reject(err);
          }
        });
      });
    };
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
        var _this;

        _this = _HTMLElement.call(this) || this;
        _this.lazyInputFn = _this.lazyInputFn.bind(_assertThisInitialized(_this));
        _this.altInputFn = _this.altInputFn.bind(_assertThisInitialized(_this));
        _this.altCheckFn = _this.altCheckFn.bind(_assertThisInitialized(_this));
        _this.imgClassesFn = _this.imgClassesFn.bind(_assertThisInitialized(_this));
        _this.figclassesFn = _this.figclassesFn.bind(_assertThisInitialized(_this));
        _this.figcaptionFn = _this.figcaptionFn.bind(_assertThisInitialized(_this));
        return _this;
      }

      var _proto = JoomlaFieldMediaOptions.prototype;

      _proto.connectedCallback = function connectedCallback() {
        this.innerHTML = "\n<details open>\n  <summary>" + this.summarytext + "</summary>\n  <div class=\"\">\n    <div class=\"form-group\">\n      <div class=\"input-group\">\n        <label class=\"input-group-text\" for=\"" + this.parentId + "-alt\">" + this.alttext + "</label>\n        <input class=\"form-control\" type=\"text\" id=\"" + this.parentId + "-alt\" />\n      </div>\n    </div>\n    <div class=\"form-group\">\n      <div class=\"form-check\">\n        <input class=\"form-check-input\" type=\"checkbox\" id=\"" + this.parentId + "-alt-check\">\n        <label class=\"form-check-label\" for=\"" + this.parentId + "-alt-check\">" + this.altchecktext + "</label>\n        <div><small class=\"form-text\">" + this.altcheckdesctext + "</small></div>\n      </div>\n    </div>\n    <div class=\"form-group\">\n      <div class=\"form-check\">\n        <input class=\"form-check-input\" type=\"checkbox\" id=\"" + this.parentId + "-lazy\" checked>\n        <label class=\"form-check-label\" for=\"" + this.parentId + "-lazy\">" + this.lazytext + "</label>\n      </div>\n    </div>\n    <div class=\"form-group\">\n      <div class=\"input-group\">\n        <label class=\"input-group-text\" for=\"" + this.parentId + "-classes\">" + this.classestext + "</label>\n        <input class=\"form-control\" type=\"text\" id=\"" + this.parentId + "-classes\" />\n      </div>\n    </div>\n    <div class=\"form-group\">\n      <div class=\"input-group\">\n        <label class=\"input-group-text\" for=\"" + this.parentId + "-figclasses\">" + this.figclassestext + "</label>\n        <input class=\"form-control\" type=\"text\" id=\"" + this.parentId + "-figclasses\" />\n      </div>\n    </div>\n    <div class=\"form-group\">\n      <div class=\"input-group\">\n        <label class=\"input-group-text\" for=\"" + this.parentId + "-figcaption\">" + this.figcaptiontext + "</label>\n        <input class=\"form-control\" type=\"text\" id=\"" + this.parentId + "-figcaption\" />\n      </div>\n    </div>\n  </div>\n</details>"; // Add event listeners

        this.lazyInput = this.querySelector("#" + this.parentId + "-lazy");
        this.lazyInput.addEventListener('change', this.lazyInputFn);
        this.altInput = this.querySelector("#" + this.parentId + "-alt");
        this.altInput.addEventListener('input', this.altInputFn);
        this.altCheck = this.querySelector("#" + this.parentId + "-alt-check");
        this.altCheck.addEventListener('input', this.altCheckFn);
        this.imgClasses = this.querySelector("#" + this.parentId + "-classes");
        this.imgClasses.addEventListener('input', this.imgClassesFn);
        this.figClasses = this.querySelector("#" + this.parentId + "-figclasses");
        this.figClasses.addEventListener('input', this.figclassesFn);
        this.figCaption = this.querySelector("#" + this.parentId + "-figcaption");
        this.figCaption.addEventListener('input', this.figcaptionFn); // Set initial values

        this.setAttribute('is-lazy', !!this.lazyInput.checked);
        this.setAttribute('alt-value', '');
        this.setAttribute('alt-check', false);
        this.setAttribute('img-classes', '');
        this.setAttribute('fig-classes', '');
        this.setAttribute('fig-caption', '');
      };

      _proto.disconnectedCallback = function disconnectedCallback() {
        this.lazyInput.removeEventListener('input', this.lazyInputFn);
        this.altInput.removeEventListener('input', this.altInputFn);
        this.altCheck.removeEventListener('input', this.altCheckFn);
        this.imgClasses.removeEventListener('input', this.imgClassesFn);
        this.figClasses.removeEventListener('input', this.figclassesFn);
        this.figCaption.removeEventListener('input', this.figcaptionFn);
        this.innerHTML = '';
      };

      _proto.lazyInputFn = function lazyInputFn(e) {
        this.setAttribute('is-lazy', !!e.target.checked);
      };

      _proto.altInputFn = function altInputFn(e) {
        this.setAttribute('alt-value', e.target.value.replace(/"/g, '&quot;'));
      };

      _proto.altCheckFn = function altCheckFn(e) {
        this.setAttribute('alt-check', !!e.target.checked);
      };

      _proto.imgClassesFn = function imgClassesFn(e) {
        this.setAttribute('img-classes', e.target.value);
      };

      _proto.figclassesFn = function figclassesFn(e) {
        this.setAttribute('fig-classes', e.target.value);
      };

      _proto.figcaptionFn = function figcaptionFn(e) {
        this.setAttribute('fig-caption', e.target.value);
      };

      _createClass(JoomlaFieldMediaOptions, [{
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
      }]);

      return JoomlaFieldMediaOptions;
    }( /*#__PURE__*/_wrapNativeSuper(HTMLElement));

    customElements.define('joomla-field-mediamore', JoomlaFieldMediaOptions);
  })(customElements, Joomla);

}());
