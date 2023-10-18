var bootstrap = (function (exports) {
	'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	var check = function (it) {
	  return it && it.Math === Math && it;
	};

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global$s =
	  // eslint-disable-next-line es/no-global-this -- safe
	  check(typeof globalThis == 'object' && globalThis) ||
	  check(typeof window == 'object' && window) ||
	  // eslint-disable-next-line no-restricted-globals -- safe
	  check(typeof self == 'object' && self) ||
	  check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
	  // eslint-disable-next-line no-new-func -- fallback
	  (function () { return this; })() || commonjsGlobal || Function('return this')();

	var shared$4 = {exports: {}};

	var isPure = false;

	var global$r = global$s;

	// eslint-disable-next-line es/no-object-defineproperty -- safe
	var defineProperty$9 = Object.defineProperty;

	var defineGlobalProperty$3 = function (key, value) {
	  try {
	    defineProperty$9(global$r, key, { value: value, configurable: true, writable: true });
	  } catch (error) {
	    global$r[key] = value;
	  } return value;
	};

	var global$q = global$s;
	var defineGlobalProperty$2 = defineGlobalProperty$3;

	var SHARED = '__core-js_shared__';
	var store$3 = global$q[SHARED] || defineGlobalProperty$2(SHARED, {});

	var sharedStore = store$3;

	var store$2 = sharedStore;

	(shared$4.exports = function (key, value) {
	  return store$2[key] || (store$2[key] = value !== undefined ? value : {});
	})('versions', []).push({
	  version: '3.32.2',
	  mode: 'global',
	  copyright: '© 2014-2023 Denis Pushkarev (zloirock.ru)',
	  license: 'https://github.com/zloirock/core-js/blob/v3.32.2/LICENSE',
	  source: 'https://github.com/zloirock/core-js'
	});

	var fails$A = function (exec) {
	  try {
	    return !!exec();
	  } catch (error) {
	    return true;
	  }
	};

	var fails$z = fails$A;

	var functionBindNative = !fails$z(function () {
	  // eslint-disable-next-line es/no-function-prototype-bind -- safe
	  var test = (function () { /* empty */ }).bind();
	  // eslint-disable-next-line no-prototype-builtins -- safe
	  return typeof test != 'function' || test.hasOwnProperty('prototype');
	});

	var NATIVE_BIND$3 = functionBindNative;

	var FunctionPrototype$3 = Function.prototype;
	var call$l = FunctionPrototype$3.call;
	var uncurryThisWithBind = NATIVE_BIND$3 && FunctionPrototype$3.bind.bind(call$l, call$l);

	var functionUncurryThis = NATIVE_BIND$3 ? uncurryThisWithBind : function (fn) {
	  return function () {
	    return call$l.apply(fn, arguments);
	  };
	};

	// we can't use just `it == null` since of `document.all` special case
	// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot-aec
	var isNullOrUndefined$8 = function (it) {
	  return it === null || it === undefined;
	};

	var isNullOrUndefined$7 = isNullOrUndefined$8;

	var $TypeError$i = TypeError;

	// `RequireObjectCoercible` abstract operation
	// https://tc39.es/ecma262/#sec-requireobjectcoercible
	var requireObjectCoercible$8 = function (it) {
	  if (isNullOrUndefined$7(it)) throw $TypeError$i("Can't call method on " + it);
	  return it;
	};

	var requireObjectCoercible$7 = requireObjectCoercible$8;

	var $Object$4 = Object;

	// `ToObject` abstract operation
	// https://tc39.es/ecma262/#sec-toobject
	var toObject$a = function (argument) {
	  return $Object$4(requireObjectCoercible$7(argument));
	};

	var uncurryThis$y = functionUncurryThis;
	var toObject$9 = toObject$a;

	var hasOwnProperty = uncurryThis$y({}.hasOwnProperty);

	// `HasOwnProperty` abstract operation
	// https://tc39.es/ecma262/#sec-hasownproperty
	// eslint-disable-next-line es/no-object-hasown -- safe
	var hasOwnProperty_1 = Object.hasOwn || function hasOwn(it, key) {
	  return hasOwnProperty(toObject$9(it), key);
	};

	var uncurryThis$x = functionUncurryThis;

	var id$1 = 0;
	var postfix = Math.random();
	var toString$g = uncurryThis$x(1.0.toString);

	var uid$3 = function (key) {
	  return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString$g(++id$1 + postfix, 36);
	};

	var engineUserAgent = typeof navigator != 'undefined' && String(navigator.userAgent) || '';

	var global$p = global$s;
	var userAgent$5 = engineUserAgent;

	var process$3 = global$p.process;
	var Deno$1 = global$p.Deno;
	var versions = process$3 && process$3.versions || Deno$1 && Deno$1.version;
	var v8 = versions && versions.v8;
	var match, version;

	if (v8) {
	  match = v8.split('.');
	  // in old Chrome, versions of V8 isn't V8 = Chrome / 10
	  // but their correct versions are not interesting for us
	  version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
	}

	// BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`
	// so check `userAgent` even if `.v8` exists, but 0
	if (!version && userAgent$5) {
	  match = userAgent$5.match(/Edge\/(\d+)/);
	  if (!match || match[1] >= 74) {
	    match = userAgent$5.match(/Chrome\/(\d+)/);
	    if (match) version = +match[1];
	  }
	}

	var engineV8Version = version;

	/* eslint-disable es/no-symbol -- required for testing */
	var V8_VERSION$3 = engineV8Version;
	var fails$y = fails$A;
	var global$o = global$s;

	var $String$5 = global$o.String;

	// eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
	var symbolConstructorDetection = !!Object.getOwnPropertySymbols && !fails$y(function () {
	  var symbol = Symbol('symbol detection');
	  // Chrome 38 Symbol has incorrect toString conversion
	  // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
	  // nb: Do not call `String` directly to avoid this being optimized out to `symbol+''` which will,
	  // of course, fail.
	  return !$String$5(symbol) || !(Object(symbol) instanceof Symbol) ||
	    // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
	    !Symbol.sham && V8_VERSION$3 && V8_VERSION$3 < 41;
	});

	/* eslint-disable es/no-symbol -- required for testing */
	var NATIVE_SYMBOL$1 = symbolConstructorDetection;

	var useSymbolAsUid = NATIVE_SYMBOL$1
	  && !Symbol.sham
	  && typeof Symbol.iterator == 'symbol';

	var global$n = global$s;
	var shared$3 = shared$4.exports;
	var hasOwn$d = hasOwnProperty_1;
	var uid$2 = uid$3;
	var NATIVE_SYMBOL = symbolConstructorDetection;
	var USE_SYMBOL_AS_UID$1 = useSymbolAsUid;

	var Symbol$3 = global$n.Symbol;
	var WellKnownSymbolsStore = shared$3('wks');
	var createWellKnownSymbol = USE_SYMBOL_AS_UID$1 ? Symbol$3['for'] || Symbol$3 : Symbol$3 && Symbol$3.withoutSetter || uid$2;

	var wellKnownSymbol$n = function (name) {
	  if (!hasOwn$d(WellKnownSymbolsStore, name)) {
	    WellKnownSymbolsStore[name] = NATIVE_SYMBOL && hasOwn$d(Symbol$3, name)
	      ? Symbol$3[name]
	      : createWellKnownSymbol('Symbol.' + name);
	  } return WellKnownSymbolsStore[name];
	};

	var wellKnownSymbol$m = wellKnownSymbol$n;

	var TO_STRING_TAG$3 = wellKnownSymbol$m('toStringTag');
	var test$1 = {};

	test$1[TO_STRING_TAG$3] = 'z';

	var toStringTagSupport = String(test$1) === '[object z]';

	var documentAll$2 = typeof document == 'object' && document.all;

	// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot
	// eslint-disable-next-line unicorn/no-typeof-undefined -- required for testing
	var IS_HTMLDDA = typeof documentAll$2 == 'undefined' && documentAll$2 !== undefined;

	var documentAll_1 = {
	  all: documentAll$2,
	  IS_HTMLDDA: IS_HTMLDDA
	};

	var $documentAll$1 = documentAll_1;

	var documentAll$1 = $documentAll$1.all;

	// `IsCallable` abstract operation
	// https://tc39.es/ecma262/#sec-iscallable
	var isCallable$p = $documentAll$1.IS_HTMLDDA ? function (argument) {
	  return typeof argument == 'function' || argument === documentAll$1;
	} : function (argument) {
	  return typeof argument == 'function';
	};

	var objectDefineProperty = {};

	var fails$x = fails$A;

	// Detect IE8's incomplete defineProperty implementation
	var descriptors = !fails$x(function () {
	  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
	  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] !== 7;
	});

	var isCallable$o = isCallable$p;
	var $documentAll = documentAll_1;

	var documentAll = $documentAll.all;

	var isObject$g = $documentAll.IS_HTMLDDA ? function (it) {
	  return typeof it == 'object' ? it !== null : isCallable$o(it) || it === documentAll;
	} : function (it) {
	  return typeof it == 'object' ? it !== null : isCallable$o(it);
	};

	var global$m = global$s;
	var isObject$f = isObject$g;

	var document$3 = global$m.document;
	// typeof document.createElement is 'object' in old IE
	var EXISTS$1 = isObject$f(document$3) && isObject$f(document$3.createElement);

	var documentCreateElement$2 = function (it) {
	  return EXISTS$1 ? document$3.createElement(it) : {};
	};

	var DESCRIPTORS$g = descriptors;
	var fails$w = fails$A;
	var createElement$1 = documentCreateElement$2;

	// Thanks to IE8 for its funny defineProperty
	var ie8DomDefine = !DESCRIPTORS$g && !fails$w(function () {
	  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
	  return Object.defineProperty(createElement$1('div'), 'a', {
	    get: function () { return 7; }
	  }).a !== 7;
	});

	var DESCRIPTORS$f = descriptors;
	var fails$v = fails$A;

	// V8 ~ Chrome 36-
	// https://bugs.chromium.org/p/v8/issues/detail?id=3334
	var v8PrototypeDefineBug = DESCRIPTORS$f && fails$v(function () {
	  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
	  return Object.defineProperty(function () { /* empty */ }, 'prototype', {
	    value: 42,
	    writable: false
	  }).prototype !== 42;
	});

	var isObject$e = isObject$g;

	var $String$4 = String;
	var $TypeError$h = TypeError;

	// `Assert: Type(argument) is Object`
	var anObject$h = function (argument) {
	  if (isObject$e(argument)) return argument;
	  throw $TypeError$h($String$4(argument) + ' is not an object');
	};

	var NATIVE_BIND$2 = functionBindNative;

	var call$k = Function.prototype.call;

	var functionCall = NATIVE_BIND$2 ? call$k.bind(call$k) : function () {
	  return call$k.apply(call$k, arguments);
	};

	var global$l = global$s;
	var isCallable$n = isCallable$p;

	var aFunction = function (argument) {
	  return isCallable$n(argument) ? argument : undefined;
	};

	var getBuiltIn$7 = function (namespace, method) {
	  return arguments.length < 2 ? aFunction(global$l[namespace]) : global$l[namespace] && global$l[namespace][method];
	};

	var uncurryThis$w = functionUncurryThis;

	var objectIsPrototypeOf = uncurryThis$w({}.isPrototypeOf);

	var getBuiltIn$6 = getBuiltIn$7;
	var isCallable$m = isCallable$p;
	var isPrototypeOf$5 = objectIsPrototypeOf;
	var USE_SYMBOL_AS_UID = useSymbolAsUid;

	var $Object$3 = Object;

	var isSymbol$3 = USE_SYMBOL_AS_UID ? function (it) {
	  return typeof it == 'symbol';
	} : function (it) {
	  var $Symbol = getBuiltIn$6('Symbol');
	  return isCallable$m($Symbol) && isPrototypeOf$5($Symbol.prototype, $Object$3(it));
	};

	var $String$3 = String;

	var tryToString$5 = function (argument) {
	  try {
	    return $String$3(argument);
	  } catch (error) {
	    return 'Object';
	  }
	};

	var isCallable$l = isCallable$p;
	var tryToString$4 = tryToString$5;

	var $TypeError$g = TypeError;

	// `Assert: IsCallable(argument) is true`
	var aCallable$a = function (argument) {
	  if (isCallable$l(argument)) return argument;
	  throw $TypeError$g(tryToString$4(argument) + ' is not a function');
	};

	var aCallable$9 = aCallable$a;
	var isNullOrUndefined$6 = isNullOrUndefined$8;

	// `GetMethod` abstract operation
	// https://tc39.es/ecma262/#sec-getmethod
	var getMethod$5 = function (V, P) {
	  var func = V[P];
	  return isNullOrUndefined$6(func) ? undefined : aCallable$9(func);
	};

	var call$j = functionCall;
	var isCallable$k = isCallable$p;
	var isObject$d = isObject$g;

	var $TypeError$f = TypeError;

	// `OrdinaryToPrimitive` abstract operation
	// https://tc39.es/ecma262/#sec-ordinarytoprimitive
	var ordinaryToPrimitive$1 = function (input, pref) {
	  var fn, val;
	  if (pref === 'string' && isCallable$k(fn = input.toString) && !isObject$d(val = call$j(fn, input))) return val;
	  if (isCallable$k(fn = input.valueOf) && !isObject$d(val = call$j(fn, input))) return val;
	  if (pref !== 'string' && isCallable$k(fn = input.toString) && !isObject$d(val = call$j(fn, input))) return val;
	  throw $TypeError$f("Can't convert object to primitive value");
	};

	var call$i = functionCall;
	var isObject$c = isObject$g;
	var isSymbol$2 = isSymbol$3;
	var getMethod$4 = getMethod$5;
	var ordinaryToPrimitive = ordinaryToPrimitive$1;
	var wellKnownSymbol$l = wellKnownSymbol$n;

	var $TypeError$e = TypeError;
	var TO_PRIMITIVE = wellKnownSymbol$l('toPrimitive');

	// `ToPrimitive` abstract operation
	// https://tc39.es/ecma262/#sec-toprimitive
	var toPrimitive$2 = function (input, pref) {
	  if (!isObject$c(input) || isSymbol$2(input)) return input;
	  var exoticToPrim = getMethod$4(input, TO_PRIMITIVE);
	  var result;
	  if (exoticToPrim) {
	    if (pref === undefined) pref = 'default';
	    result = call$i(exoticToPrim, input, pref);
	    if (!isObject$c(result) || isSymbol$2(result)) return result;
	    throw $TypeError$e("Can't convert object to primitive value");
	  }
	  if (pref === undefined) pref = 'number';
	  return ordinaryToPrimitive(input, pref);
	};

	var toPrimitive$1 = toPrimitive$2;
	var isSymbol$1 = isSymbol$3;

	// `ToPropertyKey` abstract operation
	// https://tc39.es/ecma262/#sec-topropertykey
	var toPropertyKey$3 = function (argument) {
	  var key = toPrimitive$1(argument, 'string');
	  return isSymbol$1(key) ? key : key + '';
	};

	var DESCRIPTORS$e = descriptors;
	var IE8_DOM_DEFINE$1 = ie8DomDefine;
	var V8_PROTOTYPE_DEFINE_BUG$1 = v8PrototypeDefineBug;
	var anObject$g = anObject$h;
	var toPropertyKey$2 = toPropertyKey$3;

	var $TypeError$d = TypeError;
	// eslint-disable-next-line es/no-object-defineproperty -- safe
	var $defineProperty = Object.defineProperty;
	// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	var $getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;
	var ENUMERABLE = 'enumerable';
	var CONFIGURABLE$1 = 'configurable';
	var WRITABLE = 'writable';

	// `Object.defineProperty` method
	// https://tc39.es/ecma262/#sec-object.defineproperty
	objectDefineProperty.f = DESCRIPTORS$e ? V8_PROTOTYPE_DEFINE_BUG$1 ? function defineProperty(O, P, Attributes) {
	  anObject$g(O);
	  P = toPropertyKey$2(P);
	  anObject$g(Attributes);
	  if (typeof O === 'function' && P === 'prototype' && 'value' in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {
	    var current = $getOwnPropertyDescriptor$1(O, P);
	    if (current && current[WRITABLE]) {
	      O[P] = Attributes.value;
	      Attributes = {
	        configurable: CONFIGURABLE$1 in Attributes ? Attributes[CONFIGURABLE$1] : current[CONFIGURABLE$1],
	        enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],
	        writable: false
	      };
	    }
	  } return $defineProperty(O, P, Attributes);
	} : $defineProperty : function defineProperty(O, P, Attributes) {
	  anObject$g(O);
	  P = toPropertyKey$2(P);
	  anObject$g(Attributes);
	  if (IE8_DOM_DEFINE$1) try {
	    return $defineProperty(O, P, Attributes);
	  } catch (error) { /* empty */ }
	  if ('get' in Attributes || 'set' in Attributes) throw $TypeError$d('Accessors not supported');
	  if ('value' in Attributes) O[P] = Attributes.value;
	  return O;
	};

	var makeBuiltIn$3 = {exports: {}};

	var DESCRIPTORS$d = descriptors;
	var hasOwn$c = hasOwnProperty_1;

	var FunctionPrototype$2 = Function.prototype;
	// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	var getDescriptor = DESCRIPTORS$d && Object.getOwnPropertyDescriptor;

	var EXISTS = hasOwn$c(FunctionPrototype$2, 'name');
	// additional protection from minified / mangled / dropped function names
	var PROPER = EXISTS && (function something() { /* empty */ }).name === 'something';
	var CONFIGURABLE = EXISTS && (!DESCRIPTORS$d || (DESCRIPTORS$d && getDescriptor(FunctionPrototype$2, 'name').configurable));

	var functionName = {
	  EXISTS: EXISTS,
	  PROPER: PROPER,
	  CONFIGURABLE: CONFIGURABLE
	};

	var uncurryThis$v = functionUncurryThis;
	var isCallable$j = isCallable$p;
	var store$1 = sharedStore;

	var functionToString$1 = uncurryThis$v(Function.toString);

	// this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
	if (!isCallable$j(store$1.inspectSource)) {
	  store$1.inspectSource = function (it) {
	    return functionToString$1(it);
	  };
	}

	var inspectSource$3 = store$1.inspectSource;

	var global$k = global$s;
	var isCallable$i = isCallable$p;

	var WeakMap$1 = global$k.WeakMap;

	var weakMapBasicDetection = isCallable$i(WeakMap$1) && /native code/.test(String(WeakMap$1));

	var createPropertyDescriptor$4 = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};

	var DESCRIPTORS$c = descriptors;
	var definePropertyModule$4 = objectDefineProperty;
	var createPropertyDescriptor$3 = createPropertyDescriptor$4;

	var createNonEnumerableProperty$7 = DESCRIPTORS$c ? function (object, key, value) {
	  return definePropertyModule$4.f(object, key, createPropertyDescriptor$3(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};

	var shared$2 = shared$4.exports;
	var uid$1 = uid$3;

	var keys$1 = shared$2('keys');

	var sharedKey$3 = function (key) {
	  return keys$1[key] || (keys$1[key] = uid$1(key));
	};

	var hiddenKeys$5 = {};

	var NATIVE_WEAK_MAP = weakMapBasicDetection;
	var global$j = global$s;
	var isObject$b = isObject$g;
	var createNonEnumerableProperty$6 = createNonEnumerableProperty$7;
	var hasOwn$b = hasOwnProperty_1;
	var shared$1 = sharedStore;
	var sharedKey$2 = sharedKey$3;
	var hiddenKeys$4 = hiddenKeys$5;

	var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
	var TypeError$3 = global$j.TypeError;
	var WeakMap = global$j.WeakMap;
	var set$1, get, has;

	var enforce = function (it) {
	  return has(it) ? get(it) : set$1(it, {});
	};

	var getterFor = function (TYPE) {
	  return function (it) {
	    var state;
	    if (!isObject$b(it) || (state = get(it)).type !== TYPE) {
	      throw TypeError$3('Incompatible receiver, ' + TYPE + ' required');
	    } return state;
	  };
	};

	if (NATIVE_WEAK_MAP || shared$1.state) {
	  var store = shared$1.state || (shared$1.state = new WeakMap());
	  /* eslint-disable no-self-assign -- prototype methods protection */
	  store.get = store.get;
	  store.has = store.has;
	  store.set = store.set;
	  /* eslint-enable no-self-assign -- prototype methods protection */
	  set$1 = function (it, metadata) {
	    if (store.has(it)) throw TypeError$3(OBJECT_ALREADY_INITIALIZED);
	    metadata.facade = it;
	    store.set(it, metadata);
	    return metadata;
	  };
	  get = function (it) {
	    return store.get(it) || {};
	  };
	  has = function (it) {
	    return store.has(it);
	  };
	} else {
	  var STATE = sharedKey$2('state');
	  hiddenKeys$4[STATE] = true;
	  set$1 = function (it, metadata) {
	    if (hasOwn$b(it, STATE)) throw TypeError$3(OBJECT_ALREADY_INITIALIZED);
	    metadata.facade = it;
	    createNonEnumerableProperty$6(it, STATE, metadata);
	    return metadata;
	  };
	  get = function (it) {
	    return hasOwn$b(it, STATE) ? it[STATE] : {};
	  };
	  has = function (it) {
	    return hasOwn$b(it, STATE);
	  };
	}

	var internalState = {
	  set: set$1,
	  get: get,
	  has: has,
	  enforce: enforce,
	  getterFor: getterFor
	};

	var uncurryThis$u = functionUncurryThis;
	var fails$u = fails$A;
	var isCallable$h = isCallable$p;
	var hasOwn$a = hasOwnProperty_1;
	var DESCRIPTORS$b = descriptors;
	var CONFIGURABLE_FUNCTION_NAME$1 = functionName.CONFIGURABLE;
	var inspectSource$2 = inspectSource$3;
	var InternalStateModule$4 = internalState;

	var enforceInternalState$1 = InternalStateModule$4.enforce;
	var getInternalState$4 = InternalStateModule$4.get;
	var $String$2 = String;
	// eslint-disable-next-line es/no-object-defineproperty -- safe
	var defineProperty$8 = Object.defineProperty;
	var stringSlice$8 = uncurryThis$u(''.slice);
	var replace$4 = uncurryThis$u(''.replace);
	var join = uncurryThis$u([].join);

	var CONFIGURABLE_LENGTH = DESCRIPTORS$b && !fails$u(function () {
	  return defineProperty$8(function () { /* empty */ }, 'length', { value: 8 }).length !== 8;
	});

	var TEMPLATE = String(String).split('String');

	var makeBuiltIn$2 = makeBuiltIn$3.exports = function (value, name, options) {
	  if (stringSlice$8($String$2(name), 0, 7) === 'Symbol(') {
	    name = '[' + replace$4($String$2(name), /^Symbol\(([^)]*)\)/, '$1') + ']';
	  }
	  if (options && options.getter) name = 'get ' + name;
	  if (options && options.setter) name = 'set ' + name;
	  if (!hasOwn$a(value, 'name') || (CONFIGURABLE_FUNCTION_NAME$1 && value.name !== name)) {
	    if (DESCRIPTORS$b) defineProperty$8(value, 'name', { value: name, configurable: true });
	    else value.name = name;
	  }
	  if (CONFIGURABLE_LENGTH && options && hasOwn$a(options, 'arity') && value.length !== options.arity) {
	    defineProperty$8(value, 'length', { value: options.arity });
	  }
	  try {
	    if (options && hasOwn$a(options, 'constructor') && options.constructor) {
	      if (DESCRIPTORS$b) defineProperty$8(value, 'prototype', { writable: false });
	    // in V8 ~ Chrome 53, prototypes of some methods, like `Array.prototype.values`, are non-writable
	    } else if (value.prototype) value.prototype = undefined;
	  } catch (error) { /* empty */ }
	  var state = enforceInternalState$1(value);
	  if (!hasOwn$a(state, 'source')) {
	    state.source = join(TEMPLATE, typeof name == 'string' ? name : '');
	  } return value;
	};

	// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
	// eslint-disable-next-line no-extend-native -- required
	Function.prototype.toString = makeBuiltIn$2(function toString() {
	  return isCallable$h(this) && getInternalState$4(this).source || inspectSource$2(this);
	}, 'toString');

	var isCallable$g = isCallable$p;
	var definePropertyModule$3 = objectDefineProperty;
	var makeBuiltIn$1 = makeBuiltIn$3.exports;
	var defineGlobalProperty$1 = defineGlobalProperty$3;

	var defineBuiltIn$b = function (O, key, value, options) {
	  if (!options) options = {};
	  var simple = options.enumerable;
	  var name = options.name !== undefined ? options.name : key;
	  if (isCallable$g(value)) makeBuiltIn$1(value, name, options);
	  if (options.global) {
	    if (simple) O[key] = value;
	    else defineGlobalProperty$1(key, value);
	  } else {
	    try {
	      if (!options.unsafe) delete O[key];
	      else if (O[key]) simple = true;
	    } catch (error) { /* empty */ }
	    if (simple) O[key] = value;
	    else definePropertyModule$3.f(O, key, {
	      value: value,
	      enumerable: false,
	      configurable: !options.nonConfigurable,
	      writable: !options.nonWritable
	    });
	  } return O;
	};

	var uncurryThis$t = functionUncurryThis;

	var toString$f = uncurryThis$t({}.toString);
	var stringSlice$7 = uncurryThis$t(''.slice);

	var classofRaw$2 = function (it) {
	  return stringSlice$7(toString$f(it), 8, -1);
	};

	var TO_STRING_TAG_SUPPORT$2 = toStringTagSupport;
	var isCallable$f = isCallable$p;
	var classofRaw$1 = classofRaw$2;
	var wellKnownSymbol$k = wellKnownSymbol$n;

	var TO_STRING_TAG$2 = wellKnownSymbol$k('toStringTag');
	var $Object$2 = Object;

	// ES3 wrong here
	var CORRECT_ARGUMENTS = classofRaw$1(function () { return arguments; }()) === 'Arguments';

	// fallback for IE11 Script Access Denied error
	var tryGet = function (it, key) {
	  try {
	    return it[key];
	  } catch (error) { /* empty */ }
	};

	// getting tag from ES6+ `Object.prototype.toString`
	var classof$c = TO_STRING_TAG_SUPPORT$2 ? classofRaw$1 : function (it) {
	  var O, tag, result;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (tag = tryGet(O = $Object$2(it), TO_STRING_TAG$2)) == 'string' ? tag
	    // builtinTag case
	    : CORRECT_ARGUMENTS ? classofRaw$1(O)
	    // ES3 arguments fallback
	    : (result = classofRaw$1(O)) === 'Object' && isCallable$f(O.callee) ? 'Arguments' : result;
	};

	var TO_STRING_TAG_SUPPORT$1 = toStringTagSupport;
	var classof$b = classof$c;

	// `Object.prototype.toString` method implementation
	// https://tc39.es/ecma262/#sec-object.prototype.tostring
	var objectToString = TO_STRING_TAG_SUPPORT$1 ? {}.toString : function toString() {
	  return '[object ' + classof$b(this) + ']';
	};

	var TO_STRING_TAG_SUPPORT = toStringTagSupport;
	var defineBuiltIn$a = defineBuiltIn$b;
	var toString$e = objectToString;

	// `Object.prototype.toString` method
	// https://tc39.es/ecma262/#sec-object.prototype.tostring
	if (!TO_STRING_TAG_SUPPORT) {
	  defineBuiltIn$a(Object.prototype, 'toString', toString$e, { unsafe: true });
	}

	// iterable DOM collections
	// flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
	var domIterables = {
	  CSSRuleList: 0,
	  CSSStyleDeclaration: 0,
	  CSSValueList: 0,
	  ClientRectList: 0,
	  DOMRectList: 0,
	  DOMStringList: 0,
	  DOMTokenList: 1,
	  DataTransferItemList: 0,
	  FileList: 0,
	  HTMLAllCollection: 0,
	  HTMLCollection: 0,
	  HTMLFormElement: 0,
	  HTMLSelectElement: 0,
	  MediaList: 0,
	  MimeTypeArray: 0,
	  NamedNodeMap: 0,
	  NodeList: 1,
	  PaintRequestList: 0,
	  Plugin: 0,
	  PluginArray: 0,
	  SVGLengthList: 0,
	  SVGNumberList: 0,
	  SVGPathSegList: 0,
	  SVGPointList: 0,
	  SVGStringList: 0,
	  SVGTransformList: 0,
	  SourceBufferList: 0,
	  StyleSheetList: 0,
	  TextTrackCueList: 0,
	  TextTrackList: 0,
	  TouchList: 0
	};

	// in old WebKit versions, `element.classList` is not an instance of global `DOMTokenList`
	var documentCreateElement$1 = documentCreateElement$2;

	var classList = documentCreateElement$1('span').classList;
	var DOMTokenListPrototype$2 = classList && classList.constructor && classList.constructor.prototype;

	var domTokenListPrototype = DOMTokenListPrototype$2 === Object.prototype ? undefined : DOMTokenListPrototype$2;

	var classofRaw = classofRaw$2;
	var uncurryThis$s = functionUncurryThis;

	var functionUncurryThisClause = function (fn) {
	  // Nashorn bug:
	  //   https://github.com/zloirock/core-js/issues/1128
	  //   https://github.com/zloirock/core-js/issues/1130
	  if (classofRaw(fn) === 'Function') return uncurryThis$s(fn);
	};

	var uncurryThis$r = functionUncurryThisClause;
	var aCallable$8 = aCallable$a;
	var NATIVE_BIND$1 = functionBindNative;

	var bind$7 = uncurryThis$r(uncurryThis$r.bind);

	// optional / simple context binding
	var functionBindContext = function (fn, that) {
	  aCallable$8(fn);
	  return that === undefined ? fn : NATIVE_BIND$1 ? bind$7(fn, that) : function (/* ...args */) {
	    return fn.apply(that, arguments);
	  };
	};

	var uncurryThis$q = functionUncurryThis;
	var fails$t = fails$A;
	var classof$a = classofRaw$2;

	var $Object$1 = Object;
	var split = uncurryThis$q(''.split);

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var indexedObject = fails$t(function () {
	  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
	  // eslint-disable-next-line no-prototype-builtins -- safe
	  return !$Object$1('z').propertyIsEnumerable(0);
	}) ? function (it) {
	  return classof$a(it) === 'String' ? split(it, '') : $Object$1(it);
	} : $Object$1;

	var ceil = Math.ceil;
	var floor$2 = Math.floor;

	// `Math.trunc` method
	// https://tc39.es/ecma262/#sec-math.trunc
	// eslint-disable-next-line es/no-math-trunc -- safe
	var mathTrunc = Math.trunc || function trunc(x) {
	  var n = +x;
	  return (n > 0 ? floor$2 : ceil)(n);
	};

	var trunc = mathTrunc;

	// `ToIntegerOrInfinity` abstract operation
	// https://tc39.es/ecma262/#sec-tointegerorinfinity
	var toIntegerOrInfinity$4 = function (argument) {
	  var number = +argument;
	  // eslint-disable-next-line no-self-compare -- NaN check
	  return number !== number || number === 0 ? 0 : trunc(number);
	};

	var toIntegerOrInfinity$3 = toIntegerOrInfinity$4;

	var min$4 = Math.min;

	// `ToLength` abstract operation
	// https://tc39.es/ecma262/#sec-tolength
	var toLength$4 = function (argument) {
	  return argument > 0 ? min$4(toIntegerOrInfinity$3(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
	};

	var toLength$3 = toLength$4;

	// `LengthOfArrayLike` abstract operation
	// https://tc39.es/ecma262/#sec-lengthofarraylike
	var lengthOfArrayLike$9 = function (obj) {
	  return toLength$3(obj.length);
	};

	var classof$9 = classofRaw$2;

	// `IsArray` abstract operation
	// https://tc39.es/ecma262/#sec-isarray
	// eslint-disable-next-line es/no-array-isarray -- safe
	var isArray$3 = Array.isArray || function isArray(argument) {
	  return classof$9(argument) === 'Array';
	};

	var uncurryThis$p = functionUncurryThis;
	var fails$s = fails$A;
	var isCallable$e = isCallable$p;
	var classof$8 = classof$c;
	var getBuiltIn$5 = getBuiltIn$7;
	var inspectSource$1 = inspectSource$3;

	var noop$1 = function () { /* empty */ };
	var empty = [];
	var construct = getBuiltIn$5('Reflect', 'construct');
	var constructorRegExp = /^\s*(?:class|function)\b/;
	var exec$3 = uncurryThis$p(constructorRegExp.exec);
	var INCORRECT_TO_STRING = !constructorRegExp.exec(noop$1);

	var isConstructorModern = function isConstructor(argument) {
	  if (!isCallable$e(argument)) return false;
	  try {
	    construct(noop$1, empty, argument);
	    return true;
	  } catch (error) {
	    return false;
	  }
	};

	var isConstructorLegacy = function isConstructor(argument) {
	  if (!isCallable$e(argument)) return false;
	  switch (classof$8(argument)) {
	    case 'AsyncFunction':
	    case 'GeneratorFunction':
	    case 'AsyncGeneratorFunction': return false;
	  }
	  try {
	    // we can't check .prototype since constructors produced by .bind haven't it
	    // `Function#toString` throws on some built-it function in some legacy engines
	    // (for example, `DOMQuad` and similar in FF41-)
	    return INCORRECT_TO_STRING || !!exec$3(constructorRegExp, inspectSource$1(argument));
	  } catch (error) {
	    return true;
	  }
	};

	isConstructorLegacy.sham = true;

	// `IsConstructor` abstract operation
	// https://tc39.es/ecma262/#sec-isconstructor
	var isConstructor$4 = !construct || fails$s(function () {
	  var called;
	  return isConstructorModern(isConstructorModern.call)
	    || !isConstructorModern(Object)
	    || !isConstructorModern(function () { called = true; })
	    || called;
	}) ? isConstructorLegacy : isConstructorModern;

	var isArray$2 = isArray$3;
	var isConstructor$3 = isConstructor$4;
	var isObject$a = isObject$g;
	var wellKnownSymbol$j = wellKnownSymbol$n;

	var SPECIES$6 = wellKnownSymbol$j('species');
	var $Array$3 = Array;

	// a part of `ArraySpeciesCreate` abstract operation
	// https://tc39.es/ecma262/#sec-arrayspeciescreate
	var arraySpeciesConstructor$1 = function (originalArray) {
	  var C;
	  if (isArray$2(originalArray)) {
	    C = originalArray.constructor;
	    // cross-realm fallback
	    if (isConstructor$3(C) && (C === $Array$3 || isArray$2(C.prototype))) C = undefined;
	    else if (isObject$a(C)) {
	      C = C[SPECIES$6];
	      if (C === null) C = undefined;
	    }
	  } return C === undefined ? $Array$3 : C;
	};

	var arraySpeciesConstructor = arraySpeciesConstructor$1;

	// `ArraySpeciesCreate` abstract operation
	// https://tc39.es/ecma262/#sec-arrayspeciescreate
	var arraySpeciesCreate$2 = function (originalArray, length) {
	  return new (arraySpeciesConstructor(originalArray))(length === 0 ? 0 : length);
	};

	var bind$6 = functionBindContext;
	var uncurryThis$o = functionUncurryThis;
	var IndexedObject$4 = indexedObject;
	var toObject$8 = toObject$a;
	var lengthOfArrayLike$8 = lengthOfArrayLike$9;
	var arraySpeciesCreate$1 = arraySpeciesCreate$2;

	var push$4 = uncurryThis$o([].push);

	// `Array.prototype.{ forEach, map, filter, some, every, find, findIndex, filterReject }` methods implementation
	var createMethod$5 = function (TYPE) {
	  var IS_MAP = TYPE === 1;
	  var IS_FILTER = TYPE === 2;
	  var IS_SOME = TYPE === 3;
	  var IS_EVERY = TYPE === 4;
	  var IS_FIND_INDEX = TYPE === 6;
	  var IS_FILTER_REJECT = TYPE === 7;
	  var NO_HOLES = TYPE === 5 || IS_FIND_INDEX;
	  return function ($this, callbackfn, that, specificCreate) {
	    var O = toObject$8($this);
	    var self = IndexedObject$4(O);
	    var boundFunction = bind$6(callbackfn, that);
	    var length = lengthOfArrayLike$8(self);
	    var index = 0;
	    var create = specificCreate || arraySpeciesCreate$1;
	    var target = IS_MAP ? create($this, length) : IS_FILTER || IS_FILTER_REJECT ? create($this, 0) : undefined;
	    var value, result;
	    for (;length > index; index++) if (NO_HOLES || index in self) {
	      value = self[index];
	      result = boundFunction(value, index, O);
	      if (TYPE) {
	        if (IS_MAP) target[index] = result; // map
	        else if (result) switch (TYPE) {
	          case 3: return true;              // some
	          case 5: return value;             // find
	          case 6: return index;             // findIndex
	          case 2: push$4(target, value);      // filter
	        } else switch (TYPE) {
	          case 4: return false;             // every
	          case 7: push$4(target, value);      // filterReject
	        }
	      }
	    }
	    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
	  };
	};

	var arrayIteration = {
	  // `Array.prototype.forEach` method
	  // https://tc39.es/ecma262/#sec-array.prototype.foreach
	  forEach: createMethod$5(0),
	  // `Array.prototype.map` method
	  // https://tc39.es/ecma262/#sec-array.prototype.map
	  map: createMethod$5(1),
	  // `Array.prototype.filter` method
	  // https://tc39.es/ecma262/#sec-array.prototype.filter
	  filter: createMethod$5(2),
	  // `Array.prototype.some` method
	  // https://tc39.es/ecma262/#sec-array.prototype.some
	  some: createMethod$5(3),
	  // `Array.prototype.every` method
	  // https://tc39.es/ecma262/#sec-array.prototype.every
	  every: createMethod$5(4),
	  // `Array.prototype.find` method
	  // https://tc39.es/ecma262/#sec-array.prototype.find
	  find: createMethod$5(5),
	  // `Array.prototype.findIndex` method
	  // https://tc39.es/ecma262/#sec-array.prototype.findIndex
	  findIndex: createMethod$5(6),
	  // `Array.prototype.filterReject` method
	  // https://github.com/tc39/proposal-array-filtering
	  filterReject: createMethod$5(7)
	};

	var fails$r = fails$A;

	var arrayMethodIsStrict$4 = function (METHOD_NAME, argument) {
	  var method = [][METHOD_NAME];
	  return !!method && fails$r(function () {
	    // eslint-disable-next-line no-useless-call -- required for testing
	    method.call(null, argument || function () { return 1; }, 1);
	  });
	};

	var $forEach = arrayIteration.forEach;
	var arrayMethodIsStrict$3 = arrayMethodIsStrict$4;

	var STRICT_METHOD$1 = arrayMethodIsStrict$3('forEach');

	// `Array.prototype.forEach` method implementation
	// https://tc39.es/ecma262/#sec-array.prototype.foreach
	var arrayForEach = !STRICT_METHOD$1 ? function forEach(callbackfn /* , thisArg */) {
	  return $forEach(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	// eslint-disable-next-line es/no-array-prototype-foreach -- safe
	} : [].forEach;

	var global$i = global$s;
	var DOMIterables$1 = domIterables;
	var DOMTokenListPrototype$1 = domTokenListPrototype;
	var forEach = arrayForEach;
	var createNonEnumerableProperty$5 = createNonEnumerableProperty$7;

	var handlePrototype$1 = function (CollectionPrototype) {
	  // some Chrome versions have non-configurable methods on DOMTokenList
	  if (CollectionPrototype && CollectionPrototype.forEach !== forEach) try {
	    createNonEnumerableProperty$5(CollectionPrototype, 'forEach', forEach);
	  } catch (error) {
	    CollectionPrototype.forEach = forEach;
	  }
	};

	for (var COLLECTION_NAME$1 in DOMIterables$1) {
	  if (DOMIterables$1[COLLECTION_NAME$1]) {
	    handlePrototype$1(global$i[COLLECTION_NAME$1] && global$i[COLLECTION_NAME$1].prototype);
	  }
	}

	handlePrototype$1(DOMTokenListPrototype$1);

	var objectGetOwnPropertyDescriptor = {};

	var objectPropertyIsEnumerable = {};

	var $propertyIsEnumerable$1 = {}.propertyIsEnumerable;
	// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	var getOwnPropertyDescriptor$4 = Object.getOwnPropertyDescriptor;

	// Nashorn ~ JDK8 bug
	var NASHORN_BUG = getOwnPropertyDescriptor$4 && !$propertyIsEnumerable$1.call({ 1: 2 }, 1);

	// `Object.prototype.propertyIsEnumerable` method implementation
	// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
	objectPropertyIsEnumerable.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
	  var descriptor = getOwnPropertyDescriptor$4(this, V);
	  return !!descriptor && descriptor.enumerable;
	} : $propertyIsEnumerable$1;

	// toObject with fallback for non-array-like ES3 strings
	var IndexedObject$3 = indexedObject;
	var requireObjectCoercible$6 = requireObjectCoercible$8;

	var toIndexedObject$9 = function (it) {
	  return IndexedObject$3(requireObjectCoercible$6(it));
	};

	var DESCRIPTORS$a = descriptors;
	var call$h = functionCall;
	var propertyIsEnumerableModule$1 = objectPropertyIsEnumerable;
	var createPropertyDescriptor$2 = createPropertyDescriptor$4;
	var toIndexedObject$8 = toIndexedObject$9;
	var toPropertyKey$1 = toPropertyKey$3;
	var hasOwn$9 = hasOwnProperty_1;
	var IE8_DOM_DEFINE = ie8DomDefine;

	// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

	// `Object.getOwnPropertyDescriptor` method
	// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
	objectGetOwnPropertyDescriptor.f = DESCRIPTORS$a ? $getOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
	  O = toIndexedObject$8(O);
	  P = toPropertyKey$1(P);
	  if (IE8_DOM_DEFINE) try {
	    return $getOwnPropertyDescriptor(O, P);
	  } catch (error) { /* empty */ }
	  if (hasOwn$9(O, P)) return createPropertyDescriptor$2(!call$h(propertyIsEnumerableModule$1.f, O, P), O[P]);
	};

	var objectGetOwnPropertyNames = {};

	var toIntegerOrInfinity$2 = toIntegerOrInfinity$4;

	var max$4 = Math.max;
	var min$3 = Math.min;

	// Helper for a popular repeating case of the spec:
	// Let integer be ? ToInteger(index).
	// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
	var toAbsoluteIndex$3 = function (index, length) {
	  var integer = toIntegerOrInfinity$2(index);
	  return integer < 0 ? max$4(integer + length, 0) : min$3(integer, length);
	};

	var toIndexedObject$7 = toIndexedObject$9;
	var toAbsoluteIndex$2 = toAbsoluteIndex$3;
	var lengthOfArrayLike$7 = lengthOfArrayLike$9;

	// `Array.prototype.{ indexOf, includes }` methods implementation
	var createMethod$4 = function (IS_INCLUDES) {
	  return function ($this, el, fromIndex) {
	    var O = toIndexedObject$7($this);
	    var length = lengthOfArrayLike$7(O);
	    var index = toAbsoluteIndex$2(fromIndex, length);
	    var value;
	    // Array#includes uses SameValueZero equality algorithm
	    // eslint-disable-next-line no-self-compare -- NaN check
	    if (IS_INCLUDES && el !== el) while (length > index) {
	      value = O[index++];
	      // eslint-disable-next-line no-self-compare -- NaN check
	      if (value !== value) return true;
	    // Array#indexOf ignores holes, Array#includes - not
	    } else for (;length > index; index++) {
	      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

	var arrayIncludes = {
	  // `Array.prototype.includes` method
	  // https://tc39.es/ecma262/#sec-array.prototype.includes
	  includes: createMethod$4(true),
	  // `Array.prototype.indexOf` method
	  // https://tc39.es/ecma262/#sec-array.prototype.indexof
	  indexOf: createMethod$4(false)
	};

	var uncurryThis$n = functionUncurryThis;
	var hasOwn$8 = hasOwnProperty_1;
	var toIndexedObject$6 = toIndexedObject$9;
	var indexOf$1 = arrayIncludes.indexOf;
	var hiddenKeys$3 = hiddenKeys$5;

	var push$3 = uncurryThis$n([].push);

	var objectKeysInternal = function (object, names) {
	  var O = toIndexedObject$6(object);
	  var i = 0;
	  var result = [];
	  var key;
	  for (key in O) !hasOwn$8(hiddenKeys$3, key) && hasOwn$8(O, key) && push$3(result, key);
	  // Don't enum bug & hidden keys
	  while (names.length > i) if (hasOwn$8(O, key = names[i++])) {
	    ~indexOf$1(result, key) || push$3(result, key);
	  }
	  return result;
	};

	// IE8- don't enum bug keys
	var enumBugKeys$3 = [
	  'constructor',
	  'hasOwnProperty',
	  'isPrototypeOf',
	  'propertyIsEnumerable',
	  'toLocaleString',
	  'toString',
	  'valueOf'
	];

	var internalObjectKeys$1 = objectKeysInternal;
	var enumBugKeys$2 = enumBugKeys$3;

	var hiddenKeys$2 = enumBugKeys$2.concat('length', 'prototype');

	// `Object.getOwnPropertyNames` method
	// https://tc39.es/ecma262/#sec-object.getownpropertynames
	// eslint-disable-next-line es/no-object-getownpropertynames -- safe
	objectGetOwnPropertyNames.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
	  return internalObjectKeys$1(O, hiddenKeys$2);
	};

	var objectGetOwnPropertySymbols = {};

	// eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
	objectGetOwnPropertySymbols.f = Object.getOwnPropertySymbols;

	var getBuiltIn$4 = getBuiltIn$7;
	var uncurryThis$m = functionUncurryThis;
	var getOwnPropertyNamesModule$1 = objectGetOwnPropertyNames;
	var getOwnPropertySymbolsModule$1 = objectGetOwnPropertySymbols;
	var anObject$f = anObject$h;

	var concat$2 = uncurryThis$m([].concat);

	// all object keys, includes non-enumerable and symbols
	var ownKeys$1 = getBuiltIn$4('Reflect', 'ownKeys') || function ownKeys(it) {
	  var keys = getOwnPropertyNamesModule$1.f(anObject$f(it));
	  var getOwnPropertySymbols = getOwnPropertySymbolsModule$1.f;
	  return getOwnPropertySymbols ? concat$2(keys, getOwnPropertySymbols(it)) : keys;
	};

	var hasOwn$7 = hasOwnProperty_1;
	var ownKeys = ownKeys$1;
	var getOwnPropertyDescriptorModule = objectGetOwnPropertyDescriptor;
	var definePropertyModule$2 = objectDefineProperty;

	var copyConstructorProperties$2 = function (target, source, exceptions) {
	  var keys = ownKeys(source);
	  var defineProperty = definePropertyModule$2.f;
	  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
	  for (var i = 0; i < keys.length; i++) {
	    var key = keys[i];
	    if (!hasOwn$7(target, key) && !(exceptions && hasOwn$7(exceptions, key))) {
	      defineProperty(target, key, getOwnPropertyDescriptor(source, key));
	    }
	  }
	};

	var fails$q = fails$A;
	var isCallable$d = isCallable$p;

	var replacement = /#|\.prototype\./;

	var isForced$5 = function (feature, detection) {
	  var value = data[normalize(feature)];
	  return value === POLYFILL ? true
	    : value === NATIVE ? false
	    : isCallable$d(detection) ? fails$q(detection)
	    : !!detection;
	};

	var normalize = isForced$5.normalize = function (string) {
	  return String(string).replace(replacement, '.').toLowerCase();
	};

	var data = isForced$5.data = {};
	var NATIVE = isForced$5.NATIVE = 'N';
	var POLYFILL = isForced$5.POLYFILL = 'P';

	var isForced_1 = isForced$5;

	var global$h = global$s;
	var getOwnPropertyDescriptor$3 = objectGetOwnPropertyDescriptor.f;
	var createNonEnumerableProperty$4 = createNonEnumerableProperty$7;
	var defineBuiltIn$9 = defineBuiltIn$b;
	var defineGlobalProperty = defineGlobalProperty$3;
	var copyConstructorProperties$1 = copyConstructorProperties$2;
	var isForced$4 = isForced_1;

	/*
	  options.target         - name of the target object
	  options.global         - target is the global object
	  options.stat           - export as static methods of target
	  options.proto          - export as prototype methods of target
	  options.real           - real prototype method for the `pure` version
	  options.forced         - export even if the native feature is available
	  options.bind           - bind methods to the target, required for the `pure` version
	  options.wrap           - wrap constructors to preventing global pollution, required for the `pure` version
	  options.unsafe         - use the simple assignment of property instead of delete + defineProperty
	  options.sham           - add a flag to not completely full polyfills
	  options.enumerable     - export as enumerable property
	  options.dontCallGetSet - prevent calling a getter on target
	  options.name           - the .name of the function if it does not match the key
	*/
	var _export = function (options, source) {
	  var TARGET = options.target;
	  var GLOBAL = options.global;
	  var STATIC = options.stat;
	  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
	  if (GLOBAL) {
	    target = global$h;
	  } else if (STATIC) {
	    target = global$h[TARGET] || defineGlobalProperty(TARGET, {});
	  } else {
	    target = (global$h[TARGET] || {}).prototype;
	  }
	  if (target) for (key in source) {
	    sourceProperty = source[key];
	    if (options.dontCallGetSet) {
	      descriptor = getOwnPropertyDescriptor$3(target, key);
	      targetProperty = descriptor && descriptor.value;
	    } else targetProperty = target[key];
	    FORCED = isForced$4(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
	    // contained in target
	    if (!FORCED && targetProperty !== undefined) {
	      if (typeof sourceProperty == typeof targetProperty) continue;
	      copyConstructorProperties$1(sourceProperty, targetProperty);
	    }
	    // add a flag to not completely full polyfills
	    if (options.sham || (targetProperty && targetProperty.sham)) {
	      createNonEnumerableProperty$4(sourceProperty, 'sham', true);
	    }
	    defineBuiltIn$9(target, key, sourceProperty, options);
	  }
	};

	var fails$p = fails$A;
	var wellKnownSymbol$i = wellKnownSymbol$n;
	var V8_VERSION$2 = engineV8Version;

	var SPECIES$5 = wellKnownSymbol$i('species');

	var arrayMethodHasSpeciesSupport$4 = function (METHOD_NAME) {
	  // We can't use this feature detection in V8 since it causes
	  // deoptimization and serious performance degradation
	  // https://github.com/zloirock/core-js/issues/677
	  return V8_VERSION$2 >= 51 || !fails$p(function () {
	    var array = [];
	    var constructor = array.constructor = {};
	    constructor[SPECIES$5] = function () {
	      return { foo: 1 };
	    };
	    return array[METHOD_NAME](Boolean).foo !== 1;
	  });
	};

	var $$v = _export;
	var $map = arrayIteration.map;
	var arrayMethodHasSpeciesSupport$3 = arrayMethodHasSpeciesSupport$4;

	var HAS_SPECIES_SUPPORT$2 = arrayMethodHasSpeciesSupport$3('map');

	// `Array.prototype.map` method
	// https://tc39.es/ecma262/#sec-array.prototype.map
	// with adding support of @@species
	$$v({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$2 }, {
	  map: function map(callbackfn /* , thisArg */) {
	    return $map(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	var call$g = functionCall;
	var anObject$e = anObject$h;
	var getMethod$3 = getMethod$5;

	var iteratorClose$2 = function (iterator, kind, value) {
	  var innerResult, innerError;
	  anObject$e(iterator);
	  try {
	    innerResult = getMethod$3(iterator, 'return');
	    if (!innerResult) {
	      if (kind === 'throw') throw value;
	      return value;
	    }
	    innerResult = call$g(innerResult, iterator);
	  } catch (error) {
	    innerError = true;
	    innerResult = error;
	  }
	  if (kind === 'throw') throw value;
	  if (innerError) throw innerResult;
	  anObject$e(innerResult);
	  return value;
	};

	var anObject$d = anObject$h;
	var iteratorClose$1 = iteratorClose$2;

	// call something on iterator step with safe closing on error
	var callWithSafeIterationClosing$1 = function (iterator, fn, value, ENTRIES) {
	  try {
	    return ENTRIES ? fn(anObject$d(value)[0], value[1]) : fn(value);
	  } catch (error) {
	    iteratorClose$1(iterator, 'throw', error);
	  }
	};

	var iterators = {};

	var wellKnownSymbol$h = wellKnownSymbol$n;
	var Iterators$4 = iterators;

	var ITERATOR$7 = wellKnownSymbol$h('iterator');
	var ArrayPrototype$1 = Array.prototype;

	// check on default Array iterator
	var isArrayIteratorMethod$2 = function (it) {
	  return it !== undefined && (Iterators$4.Array === it || ArrayPrototype$1[ITERATOR$7] === it);
	};

	var toPropertyKey = toPropertyKey$3;
	var definePropertyModule$1 = objectDefineProperty;
	var createPropertyDescriptor$1 = createPropertyDescriptor$4;

	var createProperty$4 = function (object, key, value) {
	  var propertyKey = toPropertyKey(key);
	  if (propertyKey in object) definePropertyModule$1.f(object, propertyKey, createPropertyDescriptor$1(0, value));
	  else object[propertyKey] = value;
	};

	var classof$7 = classof$c;
	var getMethod$2 = getMethod$5;
	var isNullOrUndefined$5 = isNullOrUndefined$8;
	var Iterators$3 = iterators;
	var wellKnownSymbol$g = wellKnownSymbol$n;

	var ITERATOR$6 = wellKnownSymbol$g('iterator');

	var getIteratorMethod$3 = function (it) {
	  if (!isNullOrUndefined$5(it)) return getMethod$2(it, ITERATOR$6)
	    || getMethod$2(it, '@@iterator')
	    || Iterators$3[classof$7(it)];
	};

	var call$f = functionCall;
	var aCallable$7 = aCallable$a;
	var anObject$c = anObject$h;
	var tryToString$3 = tryToString$5;
	var getIteratorMethod$2 = getIteratorMethod$3;

	var $TypeError$c = TypeError;

	var getIterator$2 = function (argument, usingIterator) {
	  var iteratorMethod = arguments.length < 2 ? getIteratorMethod$2(argument) : usingIterator;
	  if (aCallable$7(iteratorMethod)) return anObject$c(call$f(iteratorMethod, argument));
	  throw $TypeError$c(tryToString$3(argument) + ' is not iterable');
	};

	var bind$5 = functionBindContext;
	var call$e = functionCall;
	var toObject$7 = toObject$a;
	var callWithSafeIterationClosing = callWithSafeIterationClosing$1;
	var isArrayIteratorMethod$1 = isArrayIteratorMethod$2;
	var isConstructor$2 = isConstructor$4;
	var lengthOfArrayLike$6 = lengthOfArrayLike$9;
	var createProperty$3 = createProperty$4;
	var getIterator$1 = getIterator$2;
	var getIteratorMethod$1 = getIteratorMethod$3;

	var $Array$2 = Array;

	// `Array.from` method implementation
	// https://tc39.es/ecma262/#sec-array.from
	var arrayFrom = function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
	  var O = toObject$7(arrayLike);
	  var IS_CONSTRUCTOR = isConstructor$2(this);
	  var argumentsLength = arguments.length;
	  var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
	  var mapping = mapfn !== undefined;
	  if (mapping) mapfn = bind$5(mapfn, argumentsLength > 2 ? arguments[2] : undefined);
	  var iteratorMethod = getIteratorMethod$1(O);
	  var index = 0;
	  var length, result, step, iterator, next, value;
	  // if the target is not iterable or it's an array with the default iterator - use a simple case
	  if (iteratorMethod && !(this === $Array$2 && isArrayIteratorMethod$1(iteratorMethod))) {
	    iterator = getIterator$1(O, iteratorMethod);
	    next = iterator.next;
	    result = IS_CONSTRUCTOR ? new this() : [];
	    for (;!(step = call$e(next, iterator)).done; index++) {
	      value = mapping ? callWithSafeIterationClosing(iterator, mapfn, [step.value, index], true) : step.value;
	      createProperty$3(result, index, value);
	    }
	  } else {
	    length = lengthOfArrayLike$6(O);
	    result = IS_CONSTRUCTOR ? new this(length) : $Array$2(length);
	    for (;length > index; index++) {
	      value = mapping ? mapfn(O[index], index) : O[index];
	      createProperty$3(result, index, value);
	    }
	  }
	  result.length = index;
	  return result;
	};

	var wellKnownSymbol$f = wellKnownSymbol$n;

	var ITERATOR$5 = wellKnownSymbol$f('iterator');
	var SAFE_CLOSING = false;

	try {
	  var called = 0;
	  var iteratorWithReturn = {
	    next: function () {
	      return { done: !!called++ };
	    },
	    'return': function () {
	      SAFE_CLOSING = true;
	    }
	  };
	  iteratorWithReturn[ITERATOR$5] = function () {
	    return this;
	  };
	  // eslint-disable-next-line es/no-array-from, no-throw-literal -- required for testing
	  Array.from(iteratorWithReturn, function () { throw 2; });
	} catch (error) { /* empty */ }

	var checkCorrectnessOfIteration$3 = function (exec, SKIP_CLOSING) {
	  try {
	    if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
	  } catch (error) { return false; } // workaround of old WebKit + `eval` bug
	  var ITERATION_SUPPORT = false;
	  try {
	    var object = {};
	    object[ITERATOR$5] = function () {
	      return {
	        next: function () {
	          return { done: ITERATION_SUPPORT = true };
	        }
	      };
	    };
	    exec(object);
	  } catch (error) { /* empty */ }
	  return ITERATION_SUPPORT;
	};

	var $$u = _export;
	var from = arrayFrom;
	var checkCorrectnessOfIteration$2 = checkCorrectnessOfIteration$3;

	var INCORRECT_ITERATION = !checkCorrectnessOfIteration$2(function (iterable) {
	  // eslint-disable-next-line es/no-array-from -- required for testing
	  Array.from(iterable);
	});

	// `Array.from` method
	// https://tc39.es/ecma262/#sec-array.from
	$$u({ target: 'Array', stat: true, forced: INCORRECT_ITERATION }, {
	  from: from
	});

	var classof$6 = classof$c;

	var $String$1 = String;

	var toString$d = function (argument) {
	  if (classof$6(argument) === 'Symbol') throw TypeError('Cannot convert a Symbol value to a string');
	  return $String$1(argument);
	};

	var uncurryThis$l = functionUncurryThis;
	var toIntegerOrInfinity$1 = toIntegerOrInfinity$4;
	var toString$c = toString$d;
	var requireObjectCoercible$5 = requireObjectCoercible$8;

	var charAt$6 = uncurryThis$l(''.charAt);
	var charCodeAt$1 = uncurryThis$l(''.charCodeAt);
	var stringSlice$6 = uncurryThis$l(''.slice);

	var createMethod$3 = function (CONVERT_TO_STRING) {
	  return function ($this, pos) {
	    var S = toString$c(requireObjectCoercible$5($this));
	    var position = toIntegerOrInfinity$1(pos);
	    var size = S.length;
	    var first, second;
	    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
	    first = charCodeAt$1(S, position);
	    return first < 0xD800 || first > 0xDBFF || position + 1 === size
	      || (second = charCodeAt$1(S, position + 1)) < 0xDC00 || second > 0xDFFF
	        ? CONVERT_TO_STRING
	          ? charAt$6(S, position)
	          : first
	        : CONVERT_TO_STRING
	          ? stringSlice$6(S, position, position + 2)
	          : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
	  };
	};

	var stringMultibyte = {
	  // `String.prototype.codePointAt` method
	  // https://tc39.es/ecma262/#sec-string.prototype.codepointat
	  codeAt: createMethod$3(false),
	  // `String.prototype.at` method
	  // https://github.com/mathiasbynens/String.prototype.at
	  charAt: createMethod$3(true)
	};

	var objectDefineProperties = {};

	var internalObjectKeys = objectKeysInternal;
	var enumBugKeys$1 = enumBugKeys$3;

	// `Object.keys` method
	// https://tc39.es/ecma262/#sec-object.keys
	// eslint-disable-next-line es/no-object-keys -- safe
	var objectKeys$3 = Object.keys || function keys(O) {
	  return internalObjectKeys(O, enumBugKeys$1);
	};

	var DESCRIPTORS$9 = descriptors;
	var V8_PROTOTYPE_DEFINE_BUG = v8PrototypeDefineBug;
	var definePropertyModule = objectDefineProperty;
	var anObject$b = anObject$h;
	var toIndexedObject$5 = toIndexedObject$9;
	var objectKeys$2 = objectKeys$3;

	// `Object.defineProperties` method
	// https://tc39.es/ecma262/#sec-object.defineproperties
	// eslint-disable-next-line es/no-object-defineproperties -- safe
	objectDefineProperties.f = DESCRIPTORS$9 && !V8_PROTOTYPE_DEFINE_BUG ? Object.defineProperties : function defineProperties(O, Properties) {
	  anObject$b(O);
	  var props = toIndexedObject$5(Properties);
	  var keys = objectKeys$2(Properties);
	  var length = keys.length;
	  var index = 0;
	  var key;
	  while (length > index) definePropertyModule.f(O, key = keys[index++], props[key]);
	  return O;
	};

	var getBuiltIn$3 = getBuiltIn$7;

	var html$2 = getBuiltIn$3('document', 'documentElement');

	/* global ActiveXObject -- old IE, WSH */
	var anObject$a = anObject$h;
	var definePropertiesModule = objectDefineProperties;
	var enumBugKeys = enumBugKeys$3;
	var hiddenKeys$1 = hiddenKeys$5;
	var html$1 = html$2;
	var documentCreateElement = documentCreateElement$2;
	var sharedKey$1 = sharedKey$3;

	var GT = '>';
	var LT = '<';
	var PROTOTYPE = 'prototype';
	var SCRIPT = 'script';
	var IE_PROTO$1 = sharedKey$1('IE_PROTO');

	var EmptyConstructor = function () { /* empty */ };

	var scriptTag = function (content) {
	  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
	};

	// Create object with fake `null` prototype: use ActiveX Object with cleared prototype
	var NullProtoObjectViaActiveX = function (activeXDocument) {
	  activeXDocument.write(scriptTag(''));
	  activeXDocument.close();
	  var temp = activeXDocument.parentWindow.Object;
	  activeXDocument = null; // avoid memory leak
	  return temp;
	};

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var NullProtoObjectViaIFrame = function () {
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = documentCreateElement('iframe');
	  var JS = 'java' + SCRIPT + ':';
	  var iframeDocument;
	  iframe.style.display = 'none';
	  html$1.appendChild(iframe);
	  // https://github.com/zloirock/core-js/issues/475
	  iframe.src = String(JS);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(scriptTag('document.F=Object'));
	  iframeDocument.close();
	  return iframeDocument.F;
	};

	// Check for document.domain and active x support
	// No need to use active x approach when document.domain is not set
	// see https://github.com/es-shims/es5-shim/issues/150
	// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
	// avoid IE GC bug
	var activeXDocument;
	var NullProtoObject = function () {
	  try {
	    activeXDocument = new ActiveXObject('htmlfile');
	  } catch (error) { /* ignore */ }
	  NullProtoObject = typeof document != 'undefined'
	    ? document.domain && activeXDocument
	      ? NullProtoObjectViaActiveX(activeXDocument) // old IE
	      : NullProtoObjectViaIFrame()
	    : NullProtoObjectViaActiveX(activeXDocument); // WSH
	  var length = enumBugKeys.length;
	  while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
	  return NullProtoObject();
	};

	hiddenKeys$1[IE_PROTO$1] = true;

	// `Object.create` method
	// https://tc39.es/ecma262/#sec-object.create
	// eslint-disable-next-line es/no-object-create -- safe
	var objectCreate = Object.create || function create(O, Properties) {
	  var result;
	  if (O !== null) {
	    EmptyConstructor[PROTOTYPE] = anObject$a(O);
	    result = new EmptyConstructor();
	    EmptyConstructor[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO$1] = O;
	  } else result = NullProtoObject();
	  return Properties === undefined ? result : definePropertiesModule.f(result, Properties);
	};

	var fails$o = fails$A;

	var correctPrototypeGetter = !fails$o(function () {
	  function F() { /* empty */ }
	  F.prototype.constructor = null;
	  // eslint-disable-next-line es/no-object-getprototypeof -- required for testing
	  return Object.getPrototypeOf(new F()) !== F.prototype;
	});

	var hasOwn$6 = hasOwnProperty_1;
	var isCallable$c = isCallable$p;
	var toObject$6 = toObject$a;
	var sharedKey = sharedKey$3;
	var CORRECT_PROTOTYPE_GETTER = correctPrototypeGetter;

	var IE_PROTO = sharedKey('IE_PROTO');
	var $Object = Object;
	var ObjectPrototype = $Object.prototype;

	// `Object.getPrototypeOf` method
	// https://tc39.es/ecma262/#sec-object.getprototypeof
	// eslint-disable-next-line es/no-object-getprototypeof -- safe
	var objectGetPrototypeOf$1 = CORRECT_PROTOTYPE_GETTER ? $Object.getPrototypeOf : function (O) {
	  var object = toObject$6(O);
	  if (hasOwn$6(object, IE_PROTO)) return object[IE_PROTO];
	  var constructor = object.constructor;
	  if (isCallable$c(constructor) && object instanceof constructor) {
	    return constructor.prototype;
	  } return object instanceof $Object ? ObjectPrototype : null;
	};

	var fails$n = fails$A;
	var isCallable$b = isCallable$p;
	var isObject$9 = isObject$g;
	var getPrototypeOf$1 = objectGetPrototypeOf$1;
	var defineBuiltIn$8 = defineBuiltIn$b;
	var wellKnownSymbol$e = wellKnownSymbol$n;

	var ITERATOR$4 = wellKnownSymbol$e('iterator');
	var BUGGY_SAFARI_ITERATORS$1 = false;

	// `%IteratorPrototype%` object
	// https://tc39.es/ecma262/#sec-%iteratorprototype%-object
	var IteratorPrototype$2, PrototypeOfArrayIteratorPrototype, arrayIterator;

	/* eslint-disable es/no-array-prototype-keys -- safe */
	if ([].keys) {
	  arrayIterator = [].keys();
	  // Safari 8 has buggy iterators w/o `next`
	  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS$1 = true;
	  else {
	    PrototypeOfArrayIteratorPrototype = getPrototypeOf$1(getPrototypeOf$1(arrayIterator));
	    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype$2 = PrototypeOfArrayIteratorPrototype;
	  }
	}

	var NEW_ITERATOR_PROTOTYPE = !isObject$9(IteratorPrototype$2) || fails$n(function () {
	  var test = {};
	  // FF44- legacy iterators case
	  return IteratorPrototype$2[ITERATOR$4].call(test) !== test;
	});

	if (NEW_ITERATOR_PROTOTYPE) IteratorPrototype$2 = {};

	// `%IteratorPrototype%[@@iterator]()` method
	// https://tc39.es/ecma262/#sec-%iteratorprototype%-@@iterator
	if (!isCallable$b(IteratorPrototype$2[ITERATOR$4])) {
	  defineBuiltIn$8(IteratorPrototype$2, ITERATOR$4, function () {
	    return this;
	  });
	}

	var iteratorsCore = {
	  IteratorPrototype: IteratorPrototype$2,
	  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS$1
	};

	var defineProperty$7 = objectDefineProperty.f;
	var hasOwn$5 = hasOwnProperty_1;
	var wellKnownSymbol$d = wellKnownSymbol$n;

	var TO_STRING_TAG$1 = wellKnownSymbol$d('toStringTag');

	var setToStringTag$4 = function (target, TAG, STATIC) {
	  if (target && !STATIC) target = target.prototype;
	  if (target && !hasOwn$5(target, TO_STRING_TAG$1)) {
	    defineProperty$7(target, TO_STRING_TAG$1, { configurable: true, value: TAG });
	  }
	};

	var IteratorPrototype$1 = iteratorsCore.IteratorPrototype;
	var create$3 = objectCreate;
	var createPropertyDescriptor = createPropertyDescriptor$4;
	var setToStringTag$3 = setToStringTag$4;
	var Iterators$2 = iterators;

	var returnThis$1 = function () { return this; };

	var iteratorCreateConstructor = function (IteratorConstructor, NAME, next, ENUMERABLE_NEXT) {
	  var TO_STRING_TAG = NAME + ' Iterator';
	  IteratorConstructor.prototype = create$3(IteratorPrototype$1, { next: createPropertyDescriptor(+!ENUMERABLE_NEXT, next) });
	  setToStringTag$3(IteratorConstructor, TO_STRING_TAG, false);
	  Iterators$2[TO_STRING_TAG] = returnThis$1;
	  return IteratorConstructor;
	};

	var uncurryThis$k = functionUncurryThis;
	var aCallable$6 = aCallable$a;

	var functionUncurryThisAccessor = function (object, key, method) {
	  try {
	    // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	    return uncurryThis$k(aCallable$6(Object.getOwnPropertyDescriptor(object, key)[method]));
	  } catch (error) { /* empty */ }
	};

	var isCallable$a = isCallable$p;

	var $String = String;
	var $TypeError$b = TypeError;

	var aPossiblePrototype$1 = function (argument) {
	  if (typeof argument == 'object' || isCallable$a(argument)) return argument;
	  throw $TypeError$b("Can't set " + $String(argument) + ' as a prototype');
	};

	/* eslint-disable no-proto -- safe */
	var uncurryThisAccessor = functionUncurryThisAccessor;
	var anObject$9 = anObject$h;
	var aPossiblePrototype = aPossiblePrototype$1;

	// `Object.setPrototypeOf` method
	// https://tc39.es/ecma262/#sec-object.setprototypeof
	// Works with __proto__ only. Old v8 can't work with null proto objects.
	// eslint-disable-next-line es/no-object-setprototypeof -- safe
	var objectSetPrototypeOf = Object.setPrototypeOf || ('__proto__' in {} ? function () {
	  var CORRECT_SETTER = false;
	  var test = {};
	  var setter;
	  try {
	    setter = uncurryThisAccessor(Object.prototype, '__proto__', 'set');
	    setter(test, []);
	    CORRECT_SETTER = test instanceof Array;
	  } catch (error) { /* empty */ }
	  return function setPrototypeOf(O, proto) {
	    anObject$9(O);
	    aPossiblePrototype(proto);
	    if (CORRECT_SETTER) setter(O, proto);
	    else O.__proto__ = proto;
	    return O;
	  };
	}() : undefined);

	var $$t = _export;
	var call$d = functionCall;
	var FunctionName = functionName;
	var isCallable$9 = isCallable$p;
	var createIteratorConstructor = iteratorCreateConstructor;
	var getPrototypeOf = objectGetPrototypeOf$1;
	var setPrototypeOf$2 = objectSetPrototypeOf;
	var setToStringTag$2 = setToStringTag$4;
	var createNonEnumerableProperty$3 = createNonEnumerableProperty$7;
	var defineBuiltIn$7 = defineBuiltIn$b;
	var wellKnownSymbol$c = wellKnownSymbol$n;
	var Iterators$1 = iterators;
	var IteratorsCore = iteratorsCore;

	var PROPER_FUNCTION_NAME$2 = FunctionName.PROPER;
	var CONFIGURABLE_FUNCTION_NAME = FunctionName.CONFIGURABLE;
	var IteratorPrototype = IteratorsCore.IteratorPrototype;
	var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;
	var ITERATOR$3 = wellKnownSymbol$c('iterator');
	var KEYS = 'keys';
	var VALUES = 'values';
	var ENTRIES = 'entries';

	var returnThis = function () { return this; };

	var iteratorDefine = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
	  createIteratorConstructor(IteratorConstructor, NAME, next);

	  var getIterationMethod = function (KIND) {
	    if (KIND === DEFAULT && defaultIterator) return defaultIterator;
	    if (!BUGGY_SAFARI_ITERATORS && KIND && KIND in IterablePrototype) return IterablePrototype[KIND];

	    switch (KIND) {
	      case KEYS: return function keys() { return new IteratorConstructor(this, KIND); };
	      case VALUES: return function values() { return new IteratorConstructor(this, KIND); };
	      case ENTRIES: return function entries() { return new IteratorConstructor(this, KIND); };
	    }

	    return function () { return new IteratorConstructor(this); };
	  };

	  var TO_STRING_TAG = NAME + ' Iterator';
	  var INCORRECT_VALUES_NAME = false;
	  var IterablePrototype = Iterable.prototype;
	  var nativeIterator = IterablePrototype[ITERATOR$3]
	    || IterablePrototype['@@iterator']
	    || DEFAULT && IterablePrototype[DEFAULT];
	  var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);
	  var anyNativeIterator = NAME === 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
	  var CurrentIteratorPrototype, methods, KEY;

	  // fix native
	  if (anyNativeIterator) {
	    CurrentIteratorPrototype = getPrototypeOf(anyNativeIterator.call(new Iterable()));
	    if (CurrentIteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
	      if (getPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype) {
	        if (setPrototypeOf$2) {
	          setPrototypeOf$2(CurrentIteratorPrototype, IteratorPrototype);
	        } else if (!isCallable$9(CurrentIteratorPrototype[ITERATOR$3])) {
	          defineBuiltIn$7(CurrentIteratorPrototype, ITERATOR$3, returnThis);
	        }
	      }
	      // Set @@toStringTag to native iterators
	      setToStringTag$2(CurrentIteratorPrototype, TO_STRING_TAG, true);
	    }
	  }

	  // fix Array.prototype.{ values, @@iterator }.name in V8 / FF
	  if (PROPER_FUNCTION_NAME$2 && DEFAULT === VALUES && nativeIterator && nativeIterator.name !== VALUES) {
	    if (CONFIGURABLE_FUNCTION_NAME) {
	      createNonEnumerableProperty$3(IterablePrototype, 'name', VALUES);
	    } else {
	      INCORRECT_VALUES_NAME = true;
	      defaultIterator = function values() { return call$d(nativeIterator, this); };
	    }
	  }

	  // export additional methods
	  if (DEFAULT) {
	    methods = {
	      values: getIterationMethod(VALUES),
	      keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
	      entries: getIterationMethod(ENTRIES)
	    };
	    if (FORCED) for (KEY in methods) {
	      if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
	        defineBuiltIn$7(IterablePrototype, KEY, methods[KEY]);
	      }
	    } else $$t({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME }, methods);
	  }

	  // define iterator
	  if (IterablePrototype[ITERATOR$3] !== defaultIterator) {
	    defineBuiltIn$7(IterablePrototype, ITERATOR$3, defaultIterator, { name: DEFAULT });
	  }
	  Iterators$1[NAME] = defaultIterator;

	  return methods;
	};

	// `CreateIterResultObject` abstract operation
	// https://tc39.es/ecma262/#sec-createiterresultobject
	var createIterResultObject$3 = function (value, done) {
	  return { value: value, done: done };
	};

	var charAt$5 = stringMultibyte.charAt;
	var toString$b = toString$d;
	var InternalStateModule$3 = internalState;
	var defineIterator$2 = iteratorDefine;
	var createIterResultObject$2 = createIterResultObject$3;

	var STRING_ITERATOR = 'String Iterator';
	var setInternalState$3 = InternalStateModule$3.set;
	var getInternalState$3 = InternalStateModule$3.getterFor(STRING_ITERATOR);

	// `String.prototype[@@iterator]` method
	// https://tc39.es/ecma262/#sec-string.prototype-@@iterator
	defineIterator$2(String, 'String', function (iterated) {
	  setInternalState$3(this, {
	    type: STRING_ITERATOR,
	    string: toString$b(iterated),
	    index: 0
	  });
	// `%StringIteratorPrototype%.next` method
	// https://tc39.es/ecma262/#sec-%stringiteratorprototype%.next
	}, function next() {
	  var state = getInternalState$3(this);
	  var string = state.string;
	  var index = state.index;
	  var point;
	  if (index >= string.length) return createIterResultObject$2(undefined, true);
	  point = charAt$5(string, index);
	  state.index += point.length;
	  return createIterResultObject$2(point, false);
	});

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
	function _unsupportedIterableToArray(o, minLen) {
	  if (!o) return;
	  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
	  var n = Object.prototype.toString.call(o).slice(8, -1);
	  if (n === "Object" && o.constructor) n = o.constructor.name;
	  if (n === "Map" || n === "Set") return Array.from(o);
	  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
	}
	function _arrayLikeToArray(arr, len) {
	  if (len == null || len > arr.length) len = arr.length;
	  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
	  return arr2;
	}
	function _createForOfIteratorHelperLoose(o, allowArrayLike) {
	  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
	  if (it) return (it = it.call(o)).next.bind(it);
	  if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
	    if (it) o = it;
	    var i = 0;
	    return function () {
	      if (i >= o.length) return {
	        done: true
	      };
	      return {
	        done: false,
	        value: o[i++]
	      };
	    };
	  }
	  throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
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

	var isObject$8 = isObject$g;
	var classof$5 = classofRaw$2;
	var wellKnownSymbol$b = wellKnownSymbol$n;

	var MATCH$2 = wellKnownSymbol$b('match');

	// `IsRegExp` abstract operation
	// https://tc39.es/ecma262/#sec-isregexp
	var isRegexp = function (it) {
	  var isRegExp;
	  return isObject$8(it) && ((isRegExp = it[MATCH$2]) !== undefined ? !!isRegExp : classof$5(it) === 'RegExp');
	};

	var isRegExp$1 = isRegexp;

	var $TypeError$a = TypeError;

	var notARegexp = function (it) {
	  if (isRegExp$1(it)) {
	    throw $TypeError$a("The method doesn't accept regular expressions");
	  } return it;
	};

	var wellKnownSymbol$a = wellKnownSymbol$n;

	var MATCH$1 = wellKnownSymbol$a('match');

	var correctIsRegexpLogic = function (METHOD_NAME) {
	  var regexp = /./;
	  try {
	    '/./'[METHOD_NAME](regexp);
	  } catch (error1) {
	    try {
	      regexp[MATCH$1] = false;
	      return '/./'[METHOD_NAME](regexp);
	    } catch (error2) { /* empty */ }
	  } return false;
	};

	var $$s = _export;
	var uncurryThis$j = functionUncurryThisClause;
	var getOwnPropertyDescriptor$2 = objectGetOwnPropertyDescriptor.f;
	var toLength$2 = toLength$4;
	var toString$a = toString$d;
	var notARegExp$1 = notARegexp;
	var requireObjectCoercible$4 = requireObjectCoercible$8;
	var correctIsRegExpLogic$1 = correctIsRegexpLogic;

	// eslint-disable-next-line es/no-string-prototype-startswith -- safe
	var nativeStartsWith = uncurryThis$j(''.startsWith);
	var stringSlice$5 = uncurryThis$j(''.slice);
	var min$2 = Math.min;

	var CORRECT_IS_REGEXP_LOGIC = correctIsRegExpLogic$1('startsWith');
	// https://github.com/zloirock/core-js/pull/702
	var MDN_POLYFILL_BUG = !CORRECT_IS_REGEXP_LOGIC && !!function () {
	  var descriptor = getOwnPropertyDescriptor$2(String.prototype, 'startsWith');
	  return descriptor && !descriptor.writable;
	}();

	// `String.prototype.startsWith` method
	// https://tc39.es/ecma262/#sec-string.prototype.startswith
	$$s({ target: 'String', proto: true, forced: !MDN_POLYFILL_BUG && !CORRECT_IS_REGEXP_LOGIC }, {
	  startsWith: function startsWith(searchString /* , position = 0 */) {
	    var that = toString$a(requireObjectCoercible$4(this));
	    notARegExp$1(searchString);
	    var index = toLength$2(min$2(arguments.length > 1 ? arguments[1] : undefined, that.length));
	    var search = toString$a(searchString);
	    return nativeStartsWith
	      ? nativeStartsWith(that, search, index)
	      : stringSlice$5(that, index, index + search.length) === search;
	  }
	});

	var objectGetOwnPropertyNamesExternal = {};

	var toAbsoluteIndex$1 = toAbsoluteIndex$3;
	var lengthOfArrayLike$5 = lengthOfArrayLike$9;
	var createProperty$2 = createProperty$4;

	var $Array$1 = Array;
	var max$3 = Math.max;

	var arraySliceSimple = function (O, start, end) {
	  var length = lengthOfArrayLike$5(O);
	  var k = toAbsoluteIndex$1(start, length);
	  var fin = toAbsoluteIndex$1(end === undefined ? length : end, length);
	  var result = $Array$1(max$3(fin - k, 0));
	  var n = 0;
	  for (; k < fin; k++, n++) createProperty$2(result, n, O[k]);
	  result.length = n;
	  return result;
	};

	/* eslint-disable es/no-object-getownpropertynames -- safe */
	var classof$4 = classofRaw$2;
	var toIndexedObject$4 = toIndexedObject$9;
	var $getOwnPropertyNames = objectGetOwnPropertyNames.f;
	var arraySlice$3 = arraySliceSimple;

	var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];

	var getWindowNames = function (it) {
	  try {
	    return $getOwnPropertyNames(it);
	  } catch (error) {
	    return arraySlice$3(windowNames);
	  }
	};

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	objectGetOwnPropertyNamesExternal.f = function getOwnPropertyNames(it) {
	  return windowNames && classof$4(it) === 'Window'
	    ? getWindowNames(it)
	    : $getOwnPropertyNames(toIndexedObject$4(it));
	};

	var $$r = _export;
	var fails$m = fails$A;
	var getOwnPropertyNames$2 = objectGetOwnPropertyNamesExternal.f;

	// eslint-disable-next-line es/no-object-getownpropertynames -- required for testing
	var FAILS_ON_PRIMITIVES$2 = fails$m(function () { return !Object.getOwnPropertyNames(1); });

	// `Object.getOwnPropertyNames` method
	// https://tc39.es/ecma262/#sec-object.getownpropertynames
	$$r({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES$2 }, {
	  getOwnPropertyNames: getOwnPropertyNames$2
	});

	var wellKnownSymbol$9 = wellKnownSymbol$n;
	var create$2 = objectCreate;
	var defineProperty$6 = objectDefineProperty.f;

	var UNSCOPABLES = wellKnownSymbol$9('unscopables');
	var ArrayPrototype = Array.prototype;

	// Array.prototype[@@unscopables]
	// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
	if (ArrayPrototype[UNSCOPABLES] === undefined) {
	  defineProperty$6(ArrayPrototype, UNSCOPABLES, {
	    configurable: true,
	    value: create$2(null)
	  });
	}

	// add a key to Array.prototype[@@unscopables]
	var addToUnscopables$3 = function (key) {
	  ArrayPrototype[UNSCOPABLES][key] = true;
	};

	var toIndexedObject$3 = toIndexedObject$9;
	var addToUnscopables$2 = addToUnscopables$3;
	var Iterators = iterators;
	var InternalStateModule$2 = internalState;
	var defineProperty$5 = objectDefineProperty.f;
	var defineIterator$1 = iteratorDefine;
	var createIterResultObject$1 = createIterResultObject$3;
	var DESCRIPTORS$8 = descriptors;

	var ARRAY_ITERATOR = 'Array Iterator';
	var setInternalState$2 = InternalStateModule$2.set;
	var getInternalState$2 = InternalStateModule$2.getterFor(ARRAY_ITERATOR);

	// `Array.prototype.entries` method
	// https://tc39.es/ecma262/#sec-array.prototype.entries
	// `Array.prototype.keys` method
	// https://tc39.es/ecma262/#sec-array.prototype.keys
	// `Array.prototype.values` method
	// https://tc39.es/ecma262/#sec-array.prototype.values
	// `Array.prototype[@@iterator]` method
	// https://tc39.es/ecma262/#sec-array.prototype-@@iterator
	// `CreateArrayIterator` internal method
	// https://tc39.es/ecma262/#sec-createarrayiterator
	var es_array_iterator = defineIterator$1(Array, 'Array', function (iterated, kind) {
	  setInternalState$2(this, {
	    type: ARRAY_ITERATOR,
	    target: toIndexedObject$3(iterated), // target
	    index: 0,                          // next index
	    kind: kind                         // kind
	  });
	// `%ArrayIteratorPrototype%.next` method
	// https://tc39.es/ecma262/#sec-%arrayiteratorprototype%.next
	}, function () {
	  var state = getInternalState$2(this);
	  var target = state.target;
	  var kind = state.kind;
	  var index = state.index++;
	  if (!target || index >= target.length) {
	    state.target = undefined;
	    return createIterResultObject$1(undefined, true);
	  }
	  switch (kind) {
	    case 'keys': return createIterResultObject$1(index, false);
	    case 'values': return createIterResultObject$1(target[index], false);
	  } return createIterResultObject$1([index, target[index]], false);
	}, 'values');

	// argumentsList[@@iterator] is %ArrayProto_values%
	// https://tc39.es/ecma262/#sec-createunmappedargumentsobject
	// https://tc39.es/ecma262/#sec-createmappedargumentsobject
	var values = Iterators.Arguments = Iterators.Array;

	// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
	addToUnscopables$2('keys');
	addToUnscopables$2('values');
	addToUnscopables$2('entries');

	// V8 ~ Chrome 45- bug
	if (DESCRIPTORS$8 && values.name !== 'values') try {
	  defineProperty$5(values, 'name', { value: 'values' });
	} catch (error) { /* empty */ }

	var internalMetadata = {exports: {}};

	// FF26- bug: ArrayBuffers are non-extensible, but Object.isExtensible does not report it
	var fails$l = fails$A;

	var arrayBufferNonExtensible = fails$l(function () {
	  if (typeof ArrayBuffer == 'function') {
	    var buffer = new ArrayBuffer(8);
	    // eslint-disable-next-line es/no-object-isextensible, es/no-object-defineproperty -- safe
	    if (Object.isExtensible(buffer)) Object.defineProperty(buffer, 'a', { value: 8 });
	  }
	});

	var fails$k = fails$A;
	var isObject$7 = isObject$g;
	var classof$3 = classofRaw$2;
	var ARRAY_BUFFER_NON_EXTENSIBLE = arrayBufferNonExtensible;

	// eslint-disable-next-line es/no-object-isextensible -- safe
	var $isExtensible = Object.isExtensible;
	var FAILS_ON_PRIMITIVES$1 = fails$k(function () { $isExtensible(1); });

	// `Object.isExtensible` method
	// https://tc39.es/ecma262/#sec-object.isextensible
	var objectIsExtensible = (FAILS_ON_PRIMITIVES$1 || ARRAY_BUFFER_NON_EXTENSIBLE) ? function isExtensible(it) {
	  if (!isObject$7(it)) return false;
	  if (ARRAY_BUFFER_NON_EXTENSIBLE && classof$3(it) === 'ArrayBuffer') return false;
	  return $isExtensible ? $isExtensible(it) : true;
	} : $isExtensible;

	var fails$j = fails$A;

	var freezing = !fails$j(function () {
	  // eslint-disable-next-line es/no-object-isextensible, es/no-object-preventextensions -- required for testing
	  return Object.isExtensible(Object.preventExtensions({}));
	});

	var $$q = _export;
	var uncurryThis$i = functionUncurryThis;
	var hiddenKeys = hiddenKeys$5;
	var isObject$6 = isObject$g;
	var hasOwn$4 = hasOwnProperty_1;
	var defineProperty$4 = objectDefineProperty.f;
	var getOwnPropertyNamesModule = objectGetOwnPropertyNames;
	var getOwnPropertyNamesExternalModule = objectGetOwnPropertyNamesExternal;
	var isExtensible = objectIsExtensible;
	var uid = uid$3;
	var FREEZING = freezing;

	var REQUIRED = false;
	var METADATA = uid('meta');
	var id = 0;

	var setMetadata = function (it) {
	  defineProperty$4(it, METADATA, { value: {
	    objectID: 'O' + id++, // object ID
	    weakData: {}          // weak collections IDs
	  } });
	};

	var fastKey$1 = function (it, create) {
	  // return a primitive with prefix
	  if (!isObject$6(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
	  if (!hasOwn$4(it, METADATA)) {
	    // can't set metadata to uncaught frozen object
	    if (!isExtensible(it)) return 'F';
	    // not necessary to add metadata
	    if (!create) return 'E';
	    // add missing metadata
	    setMetadata(it);
	  // return object ID
	  } return it[METADATA].objectID;
	};

	var getWeakData = function (it, create) {
	  if (!hasOwn$4(it, METADATA)) {
	    // can't set metadata to uncaught frozen object
	    if (!isExtensible(it)) return true;
	    // not necessary to add metadata
	    if (!create) return false;
	    // add missing metadata
	    setMetadata(it);
	  // return the store of weak collections IDs
	  } return it[METADATA].weakData;
	};

	// add metadata on freeze-family methods calling
	var onFreeze = function (it) {
	  if (FREEZING && REQUIRED && isExtensible(it) && !hasOwn$4(it, METADATA)) setMetadata(it);
	  return it;
	};

	var enable = function () {
	  meta.enable = function () { /* empty */ };
	  REQUIRED = true;
	  var getOwnPropertyNames = getOwnPropertyNamesModule.f;
	  var splice = uncurryThis$i([].splice);
	  var test = {};
	  test[METADATA] = 1;

	  // prevent exposing of metadata key
	  if (getOwnPropertyNames(test).length) {
	    getOwnPropertyNamesModule.f = function (it) {
	      var result = getOwnPropertyNames(it);
	      for (var i = 0, length = result.length; i < length; i++) {
	        if (result[i] === METADATA) {
	          splice(result, i, 1);
	          break;
	        }
	      } return result;
	    };

	    $$q({ target: 'Object', stat: true, forced: true }, {
	      getOwnPropertyNames: getOwnPropertyNamesExternalModule.f
	    });
	  }
	};

	var meta = internalMetadata.exports = {
	  enable: enable,
	  fastKey: fastKey$1,
	  getWeakData: getWeakData,
	  onFreeze: onFreeze
	};

	hiddenKeys[METADATA] = true;

	var bind$4 = functionBindContext;
	var call$c = functionCall;
	var anObject$8 = anObject$h;
	var tryToString$2 = tryToString$5;
	var isArrayIteratorMethod = isArrayIteratorMethod$2;
	var lengthOfArrayLike$4 = lengthOfArrayLike$9;
	var isPrototypeOf$4 = objectIsPrototypeOf;
	var getIterator = getIterator$2;
	var getIteratorMethod = getIteratorMethod$3;
	var iteratorClose = iteratorClose$2;

	var $TypeError$9 = TypeError;

	var Result = function (stopped, result) {
	  this.stopped = stopped;
	  this.result = result;
	};

	var ResultPrototype = Result.prototype;

	var iterate$4 = function (iterable, unboundFunction, options) {
	  var that = options && options.that;
	  var AS_ENTRIES = !!(options && options.AS_ENTRIES);
	  var IS_RECORD = !!(options && options.IS_RECORD);
	  var IS_ITERATOR = !!(options && options.IS_ITERATOR);
	  var INTERRUPTED = !!(options && options.INTERRUPTED);
	  var fn = bind$4(unboundFunction, that);
	  var iterator, iterFn, index, length, result, next, step;

	  var stop = function (condition) {
	    if (iterator) iteratorClose(iterator, 'normal', condition);
	    return new Result(true, condition);
	  };

	  var callFn = function (value) {
	    if (AS_ENTRIES) {
	      anObject$8(value);
	      return INTERRUPTED ? fn(value[0], value[1], stop) : fn(value[0], value[1]);
	    } return INTERRUPTED ? fn(value, stop) : fn(value);
	  };

	  if (IS_RECORD) {
	    iterator = iterable.iterator;
	  } else if (IS_ITERATOR) {
	    iterator = iterable;
	  } else {
	    iterFn = getIteratorMethod(iterable);
	    if (!iterFn) throw $TypeError$9(tryToString$2(iterable) + ' is not iterable');
	    // optimisation for array iterators
	    if (isArrayIteratorMethod(iterFn)) {
	      for (index = 0, length = lengthOfArrayLike$4(iterable); length > index; index++) {
	        result = callFn(iterable[index]);
	        if (result && isPrototypeOf$4(ResultPrototype, result)) return result;
	      } return new Result(false);
	    }
	    iterator = getIterator(iterable, iterFn);
	  }

	  next = IS_RECORD ? iterable.next : iterator.next;
	  while (!(step = call$c(next, iterator)).done) {
	    try {
	      result = callFn(step.value);
	    } catch (error) {
	      iteratorClose(iterator, 'throw', error);
	    }
	    if (typeof result == 'object' && result && isPrototypeOf$4(ResultPrototype, result)) return result;
	  } return new Result(false);
	};

	var isPrototypeOf$3 = objectIsPrototypeOf;

	var $TypeError$8 = TypeError;

	var anInstance$3 = function (it, Prototype) {
	  if (isPrototypeOf$3(Prototype, it)) return it;
	  throw $TypeError$8('Incorrect invocation');
	};

	var isCallable$8 = isCallable$p;
	var isObject$5 = isObject$g;
	var setPrototypeOf$1 = objectSetPrototypeOf;

	// makes subclassing work correct for wrapped built-ins
	var inheritIfRequired$3 = function ($this, dummy, Wrapper) {
	  var NewTarget, NewTargetPrototype;
	  if (
	    // it can work only with native `setPrototypeOf`
	    setPrototypeOf$1 &&
	    // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
	    isCallable$8(NewTarget = dummy.constructor) &&
	    NewTarget !== Wrapper &&
	    isObject$5(NewTargetPrototype = NewTarget.prototype) &&
	    NewTargetPrototype !== Wrapper.prototype
	  ) setPrototypeOf$1($this, NewTargetPrototype);
	  return $this;
	};

	var $$p = _export;
	var global$g = global$s;
	var uncurryThis$h = functionUncurryThis;
	var isForced$3 = isForced_1;
	var defineBuiltIn$6 = defineBuiltIn$b;
	var InternalMetadataModule = internalMetadata.exports;
	var iterate$3 = iterate$4;
	var anInstance$2 = anInstance$3;
	var isCallable$7 = isCallable$p;
	var isNullOrUndefined$4 = isNullOrUndefined$8;
	var isObject$4 = isObject$g;
	var fails$i = fails$A;
	var checkCorrectnessOfIteration$1 = checkCorrectnessOfIteration$3;
	var setToStringTag$1 = setToStringTag$4;
	var inheritIfRequired$2 = inheritIfRequired$3;

	var collection$2 = function (CONSTRUCTOR_NAME, wrapper, common) {
	  var IS_MAP = CONSTRUCTOR_NAME.indexOf('Map') !== -1;
	  var IS_WEAK = CONSTRUCTOR_NAME.indexOf('Weak') !== -1;
	  var ADDER = IS_MAP ? 'set' : 'add';
	  var NativeConstructor = global$g[CONSTRUCTOR_NAME];
	  var NativePrototype = NativeConstructor && NativeConstructor.prototype;
	  var Constructor = NativeConstructor;
	  var exported = {};

	  var fixMethod = function (KEY) {
	    var uncurriedNativeMethod = uncurryThis$h(NativePrototype[KEY]);
	    defineBuiltIn$6(NativePrototype, KEY,
	      KEY === 'add' ? function add(value) {
	        uncurriedNativeMethod(this, value === 0 ? 0 : value);
	        return this;
	      } : KEY === 'delete' ? function (key) {
	        return IS_WEAK && !isObject$4(key) ? false : uncurriedNativeMethod(this, key === 0 ? 0 : key);
	      } : KEY === 'get' ? function get(key) {
	        return IS_WEAK && !isObject$4(key) ? undefined : uncurriedNativeMethod(this, key === 0 ? 0 : key);
	      } : KEY === 'has' ? function has(key) {
	        return IS_WEAK && !isObject$4(key) ? false : uncurriedNativeMethod(this, key === 0 ? 0 : key);
	      } : function set(key, value) {
	        uncurriedNativeMethod(this, key === 0 ? 0 : key, value);
	        return this;
	      }
	    );
	  };

	  var REPLACE = isForced$3(
	    CONSTRUCTOR_NAME,
	    !isCallable$7(NativeConstructor) || !(IS_WEAK || NativePrototype.forEach && !fails$i(function () {
	      new NativeConstructor().entries().next();
	    }))
	  );

	  if (REPLACE) {
	    // create collection constructor
	    Constructor = common.getConstructor(wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER);
	    InternalMetadataModule.enable();
	  } else if (isForced$3(CONSTRUCTOR_NAME, true)) {
	    var instance = new Constructor();
	    // early implementations not supports chaining
	    var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) !== instance;
	    // V8 ~ Chromium 40- weak-collections throws on primitives, but should return false
	    var THROWS_ON_PRIMITIVES = fails$i(function () { instance.has(1); });
	    // most early implementations doesn't supports iterables, most modern - not close it correctly
	    // eslint-disable-next-line no-new -- required for testing
	    var ACCEPT_ITERABLES = checkCorrectnessOfIteration$1(function (iterable) { new NativeConstructor(iterable); });
	    // for early implementations -0 and +0 not the same
	    var BUGGY_ZERO = !IS_WEAK && fails$i(function () {
	      // V8 ~ Chromium 42- fails only with 5+ elements
	      var $instance = new NativeConstructor();
	      var index = 5;
	      while (index--) $instance[ADDER](index, index);
	      return !$instance.has(-0);
	    });

	    if (!ACCEPT_ITERABLES) {
	      Constructor = wrapper(function (dummy, iterable) {
	        anInstance$2(dummy, NativePrototype);
	        var that = inheritIfRequired$2(new NativeConstructor(), dummy, Constructor);
	        if (!isNullOrUndefined$4(iterable)) iterate$3(iterable, that[ADDER], { that: that, AS_ENTRIES: IS_MAP });
	        return that;
	      });
	      Constructor.prototype = NativePrototype;
	      NativePrototype.constructor = Constructor;
	    }

	    if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
	      fixMethod('delete');
	      fixMethod('has');
	      IS_MAP && fixMethod('get');
	    }

	    if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER);

	    // weak collections should not contains .clear method
	    if (IS_WEAK && NativePrototype.clear) delete NativePrototype.clear;
	  }

	  exported[CONSTRUCTOR_NAME] = Constructor;
	  $$p({ global: true, constructor: true, forced: Constructor !== NativeConstructor }, exported);

	  setToStringTag$1(Constructor, CONSTRUCTOR_NAME);

	  if (!IS_WEAK) common.setStrong(Constructor, CONSTRUCTOR_NAME, IS_MAP);

	  return Constructor;
	};

	var makeBuiltIn = makeBuiltIn$3.exports;
	var defineProperty$3 = objectDefineProperty;

	var defineBuiltInAccessor$4 = function (target, name, descriptor) {
	  if (descriptor.get) makeBuiltIn(descriptor.get, name, { getter: true });
	  if (descriptor.set) makeBuiltIn(descriptor.set, name, { setter: true });
	  return defineProperty$3.f(target, name, descriptor);
	};

	var defineBuiltIn$5 = defineBuiltIn$b;

	var defineBuiltIns$1 = function (target, src, options) {
	  for (var key in src) defineBuiltIn$5(target, key, src[key], options);
	  return target;
	};

	var getBuiltIn$2 = getBuiltIn$7;
	var defineBuiltInAccessor$3 = defineBuiltInAccessor$4;
	var wellKnownSymbol$8 = wellKnownSymbol$n;
	var DESCRIPTORS$7 = descriptors;

	var SPECIES$4 = wellKnownSymbol$8('species');

	var setSpecies$3 = function (CONSTRUCTOR_NAME) {
	  var Constructor = getBuiltIn$2(CONSTRUCTOR_NAME);

	  if (DESCRIPTORS$7 && Constructor && !Constructor[SPECIES$4]) {
	    defineBuiltInAccessor$3(Constructor, SPECIES$4, {
	      configurable: true,
	      get: function () { return this; }
	    });
	  }
	};

	var create$1 = objectCreate;
	var defineBuiltInAccessor$2 = defineBuiltInAccessor$4;
	var defineBuiltIns = defineBuiltIns$1;
	var bind$3 = functionBindContext;
	var anInstance$1 = anInstance$3;
	var isNullOrUndefined$3 = isNullOrUndefined$8;
	var iterate$2 = iterate$4;
	var defineIterator = iteratorDefine;
	var createIterResultObject = createIterResultObject$3;
	var setSpecies$2 = setSpecies$3;
	var DESCRIPTORS$6 = descriptors;
	var fastKey = internalMetadata.exports.fastKey;
	var InternalStateModule$1 = internalState;

	var setInternalState$1 = InternalStateModule$1.set;
	var internalStateGetterFor = InternalStateModule$1.getterFor;

	var collectionStrong$2 = {
	  getConstructor: function (wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER) {
	    var Constructor = wrapper(function (that, iterable) {
	      anInstance$1(that, Prototype);
	      setInternalState$1(that, {
	        type: CONSTRUCTOR_NAME,
	        index: create$1(null),
	        first: undefined,
	        last: undefined,
	        size: 0
	      });
	      if (!DESCRIPTORS$6) that.size = 0;
	      if (!isNullOrUndefined$3(iterable)) iterate$2(iterable, that[ADDER], { that: that, AS_ENTRIES: IS_MAP });
	    });

	    var Prototype = Constructor.prototype;

	    var getInternalState = internalStateGetterFor(CONSTRUCTOR_NAME);

	    var define = function (that, key, value) {
	      var state = getInternalState(that);
	      var entry = getEntry(that, key);
	      var previous, index;
	      // change existing entry
	      if (entry) {
	        entry.value = value;
	      // create new entry
	      } else {
	        state.last = entry = {
	          index: index = fastKey(key, true),
	          key: key,
	          value: value,
	          previous: previous = state.last,
	          next: undefined,
	          removed: false
	        };
	        if (!state.first) state.first = entry;
	        if (previous) previous.next = entry;
	        if (DESCRIPTORS$6) state.size++;
	        else that.size++;
	        // add to index
	        if (index !== 'F') state.index[index] = entry;
	      } return that;
	    };

	    var getEntry = function (that, key) {
	      var state = getInternalState(that);
	      // fast case
	      var index = fastKey(key);
	      var entry;
	      if (index !== 'F') return state.index[index];
	      // frozen object case
	      for (entry = state.first; entry; entry = entry.next) {
	        if (entry.key === key) return entry;
	      }
	    };

	    defineBuiltIns(Prototype, {
	      // `{ Map, Set }.prototype.clear()` methods
	      // https://tc39.es/ecma262/#sec-map.prototype.clear
	      // https://tc39.es/ecma262/#sec-set.prototype.clear
	      clear: function clear() {
	        var that = this;
	        var state = getInternalState(that);
	        var data = state.index;
	        var entry = state.first;
	        while (entry) {
	          entry.removed = true;
	          if (entry.previous) entry.previous = entry.previous.next = undefined;
	          delete data[entry.index];
	          entry = entry.next;
	        }
	        state.first = state.last = undefined;
	        if (DESCRIPTORS$6) state.size = 0;
	        else that.size = 0;
	      },
	      // `{ Map, Set }.prototype.delete(key)` methods
	      // https://tc39.es/ecma262/#sec-map.prototype.delete
	      // https://tc39.es/ecma262/#sec-set.prototype.delete
	      'delete': function (key) {
	        var that = this;
	        var state = getInternalState(that);
	        var entry = getEntry(that, key);
	        if (entry) {
	          var next = entry.next;
	          var prev = entry.previous;
	          delete state.index[entry.index];
	          entry.removed = true;
	          if (prev) prev.next = next;
	          if (next) next.previous = prev;
	          if (state.first === entry) state.first = next;
	          if (state.last === entry) state.last = prev;
	          if (DESCRIPTORS$6) state.size--;
	          else that.size--;
	        } return !!entry;
	      },
	      // `{ Map, Set }.prototype.forEach(callbackfn, thisArg = undefined)` methods
	      // https://tc39.es/ecma262/#sec-map.prototype.foreach
	      // https://tc39.es/ecma262/#sec-set.prototype.foreach
	      forEach: function forEach(callbackfn /* , that = undefined */) {
	        var state = getInternalState(this);
	        var boundFunction = bind$3(callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	        var entry;
	        while (entry = entry ? entry.next : state.first) {
	          boundFunction(entry.value, entry.key, this);
	          // revert to the last existing entry
	          while (entry && entry.removed) entry = entry.previous;
	        }
	      },
	      // `{ Map, Set}.prototype.has(key)` methods
	      // https://tc39.es/ecma262/#sec-map.prototype.has
	      // https://tc39.es/ecma262/#sec-set.prototype.has
	      has: function has(key) {
	        return !!getEntry(this, key);
	      }
	    });

	    defineBuiltIns(Prototype, IS_MAP ? {
	      // `Map.prototype.get(key)` method
	      // https://tc39.es/ecma262/#sec-map.prototype.get
	      get: function get(key) {
	        var entry = getEntry(this, key);
	        return entry && entry.value;
	      },
	      // `Map.prototype.set(key, value)` method
	      // https://tc39.es/ecma262/#sec-map.prototype.set
	      set: function set(key, value) {
	        return define(this, key === 0 ? 0 : key, value);
	      }
	    } : {
	      // `Set.prototype.add(value)` method
	      // https://tc39.es/ecma262/#sec-set.prototype.add
	      add: function add(value) {
	        return define(this, value = value === 0 ? 0 : value, value);
	      }
	    });
	    if (DESCRIPTORS$6) defineBuiltInAccessor$2(Prototype, 'size', {
	      configurable: true,
	      get: function () {
	        return getInternalState(this).size;
	      }
	    });
	    return Constructor;
	  },
	  setStrong: function (Constructor, CONSTRUCTOR_NAME, IS_MAP) {
	    var ITERATOR_NAME = CONSTRUCTOR_NAME + ' Iterator';
	    var getInternalCollectionState = internalStateGetterFor(CONSTRUCTOR_NAME);
	    var getInternalIteratorState = internalStateGetterFor(ITERATOR_NAME);
	    // `{ Map, Set }.prototype.{ keys, values, entries, @@iterator }()` methods
	    // https://tc39.es/ecma262/#sec-map.prototype.entries
	    // https://tc39.es/ecma262/#sec-map.prototype.keys
	    // https://tc39.es/ecma262/#sec-map.prototype.values
	    // https://tc39.es/ecma262/#sec-map.prototype-@@iterator
	    // https://tc39.es/ecma262/#sec-set.prototype.entries
	    // https://tc39.es/ecma262/#sec-set.prototype.keys
	    // https://tc39.es/ecma262/#sec-set.prototype.values
	    // https://tc39.es/ecma262/#sec-set.prototype-@@iterator
	    defineIterator(Constructor, CONSTRUCTOR_NAME, function (iterated, kind) {
	      setInternalState$1(this, {
	        type: ITERATOR_NAME,
	        target: iterated,
	        state: getInternalCollectionState(iterated),
	        kind: kind,
	        last: undefined
	      });
	    }, function () {
	      var state = getInternalIteratorState(this);
	      var kind = state.kind;
	      var entry = state.last;
	      // revert to the last existing entry
	      while (entry && entry.removed) entry = entry.previous;
	      // get next entry
	      if (!state.target || !(state.last = entry = entry ? entry.next : state.state.first)) {
	        // or finish the iteration
	        state.target = undefined;
	        return createIterResultObject(undefined, true);
	      }
	      // return step by kind
	      if (kind === 'keys') return createIterResultObject(entry.key, false);
	      if (kind === 'values') return createIterResultObject(entry.value, false);
	      return createIterResultObject([entry.key, entry.value], false);
	    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

	    // `{ Map, Set }.prototype[@@species]` accessors
	    // https://tc39.es/ecma262/#sec-get-map-@@species
	    // https://tc39.es/ecma262/#sec-get-set-@@species
	    setSpecies$2(CONSTRUCTOR_NAME);
	  }
	};

	var collection$1 = collection$2;
	var collectionStrong$1 = collectionStrong$2;

	// `Map` constructor
	// https://tc39.es/ecma262/#sec-map-objects
	collection$1('Map', function (init) {
	  return function Map() { return init(this, arguments.length ? arguments[0] : undefined); };
	}, collectionStrong$1);

	var global$f = global$s;
	var DOMIterables = domIterables;
	var DOMTokenListPrototype = domTokenListPrototype;
	var ArrayIteratorMethods = es_array_iterator;
	var createNonEnumerableProperty$2 = createNonEnumerableProperty$7;
	var wellKnownSymbol$7 = wellKnownSymbol$n;

	var ITERATOR$2 = wellKnownSymbol$7('iterator');
	var TO_STRING_TAG = wellKnownSymbol$7('toStringTag');
	var ArrayValues = ArrayIteratorMethods.values;

	var handlePrototype = function (CollectionPrototype, COLLECTION_NAME) {
	  if (CollectionPrototype) {
	    // some Chrome versions have non-configurable methods on DOMTokenList
	    if (CollectionPrototype[ITERATOR$2] !== ArrayValues) try {
	      createNonEnumerableProperty$2(CollectionPrototype, ITERATOR$2, ArrayValues);
	    } catch (error) {
	      CollectionPrototype[ITERATOR$2] = ArrayValues;
	    }
	    if (!CollectionPrototype[TO_STRING_TAG]) {
	      createNonEnumerableProperty$2(CollectionPrototype, TO_STRING_TAG, COLLECTION_NAME);
	    }
	    if (DOMIterables[COLLECTION_NAME]) for (var METHOD_NAME in ArrayIteratorMethods) {
	      // some Chrome versions have non-configurable methods on DOMTokenList
	      if (CollectionPrototype[METHOD_NAME] !== ArrayIteratorMethods[METHOD_NAME]) try {
	        createNonEnumerableProperty$2(CollectionPrototype, METHOD_NAME, ArrayIteratorMethods[METHOD_NAME]);
	      } catch (error) {
	        CollectionPrototype[METHOD_NAME] = ArrayIteratorMethods[METHOD_NAME];
	      }
	    }
	  }
	};

	for (var COLLECTION_NAME in DOMIterables) {
	  handlePrototype(global$f[COLLECTION_NAME] && global$f[COLLECTION_NAME].prototype, COLLECTION_NAME);
	}

	handlePrototype(DOMTokenListPrototype, 'DOMTokenList');

	/**
	 * --------------------------------------------------------------------------
	 * Bootstrap dom/data.js
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	 * --------------------------------------------------------------------------
	 */

	/**
	 * Constants
	 */

	var elementMap = new Map();
	var Data = {
	  set: function set(element, key, instance) {
	    if (!elementMap.has(element)) {
	      elementMap.set(element, new Map());
	    }
	    var instanceMap = elementMap.get(element);

	    // make it clear we only want one instance per element
	    // can be removed later when multiple key/instances are fine to be used
	    if (!instanceMap.has(key) && instanceMap.size !== 0) {
	      // eslint-disable-next-line no-console
	      console.error("Bootstrap doesn't allow more than one instance per element. Bound instance: " + Array.from(instanceMap.keys())[0] + ".");
	      return;
	    }
	    instanceMap.set(key, instance);
	  },
	  get: function get(element, key) {
	    if (elementMap.has(element)) {
	      return elementMap.get(element).get(key) || null;
	    }
	    return null;
	  },
	  remove: function remove(element, key) {
	    if (!elementMap.has(element)) {
	      return;
	    }
	    var instanceMap = elementMap.get(element);
	    instanceMap.delete(key);

	    // free up element references if there are no instances left for an element
	    if (instanceMap.size === 0) {
	      elementMap.delete(element);
	    }
	  }
	};

	var collection = collection$2;
	var collectionStrong = collectionStrong$2;

	// `Set` constructor
	// https://tc39.es/ecma262/#sec-set-objects
	collection('Set', function (init) {
	  return function Set() { return init(this, arguments.length ? arguments[0] : undefined); };
	}, collectionStrong);

	var $$o = _export;
	var $find = arrayIteration.find;
	var addToUnscopables$1 = addToUnscopables$3;

	var FIND = 'find';
	var SKIPS_HOLES = true;

	// Shouldn't skip holes
	// eslint-disable-next-line es/no-array-prototype-find -- testing
	if (FIND in []) Array(1)[FIND](function () { SKIPS_HOLES = false; });

	// `Array.prototype.find` method
	// https://tc39.es/ecma262/#sec-array.prototype.find
	$$o({ target: 'Array', proto: true, forced: SKIPS_HOLES }, {
	  find: function find(callbackfn /* , that = undefined */) {
	    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
	addToUnscopables$1(FIND);

	var DESCRIPTORS$5 = descriptors;
	var fails$h = fails$A;
	var uncurryThis$g = functionUncurryThis;
	var objectGetPrototypeOf = objectGetPrototypeOf$1;
	var objectKeys$1 = objectKeys$3;
	var toIndexedObject$2 = toIndexedObject$9;
	var $propertyIsEnumerable = objectPropertyIsEnumerable.f;

	var propertyIsEnumerable = uncurryThis$g($propertyIsEnumerable);
	var push$2 = uncurryThis$g([].push);

	// in some IE versions, `propertyIsEnumerable` returns incorrect result on integer keys
	// of `null` prototype objects
	var IE_BUG = DESCRIPTORS$5 && fails$h(function () {
	  // eslint-disable-next-line es/no-object-create -- safe
	  var O = Object.create(null);
	  O[2] = 2;
	  return !propertyIsEnumerable(O, 2);
	});

	// `Object.{ entries, values }` methods implementation
	var createMethod$2 = function (TO_ENTRIES) {
	  return function (it) {
	    var O = toIndexedObject$2(it);
	    var keys = objectKeys$1(O);
	    var IE_WORKAROUND = IE_BUG && objectGetPrototypeOf(O) === null;
	    var length = keys.length;
	    var i = 0;
	    var result = [];
	    var key;
	    while (length > i) {
	      key = keys[i++];
	      if (!DESCRIPTORS$5 || (IE_WORKAROUND ? key in O : propertyIsEnumerable(O, key))) {
	        push$2(result, TO_ENTRIES ? [key, O[key]] : O[key]);
	      }
	    }
	    return result;
	  };
	};

	var objectToArray = {
	  // `Object.entries` method
	  // https://tc39.es/ecma262/#sec-object.entries
	  entries: createMethod$2(true),
	  // `Object.values` method
	  // https://tc39.es/ecma262/#sec-object.values
	  values: createMethod$2(false)
	};

	var $$n = _export;
	var $values = objectToArray.values;

	// `Object.values` method
	// https://tc39.es/ecma262/#sec-object.values
	$$n({ target: 'Object', stat: true }, {
	  values: function values(O) {
	    return $values(O);
	  }
	});

	var anObject$7 = anObject$h;

	// `RegExp.prototype.flags` getter implementation
	// https://tc39.es/ecma262/#sec-get-regexp.prototype.flags
	var regexpFlags$1 = function () {
	  var that = anObject$7(this);
	  var result = '';
	  if (that.hasIndices) result += 'd';
	  if (that.global) result += 'g';
	  if (that.ignoreCase) result += 'i';
	  if (that.multiline) result += 'm';
	  if (that.dotAll) result += 's';
	  if (that.unicode) result += 'u';
	  if (that.unicodeSets) result += 'v';
	  if (that.sticky) result += 'y';
	  return result;
	};

	var fails$g = fails$A;
	var global$e = global$s;

	// babel-minify and Closure Compiler transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError
	var $RegExp$2 = global$e.RegExp;

	var UNSUPPORTED_Y$2 = fails$g(function () {
	  var re = $RegExp$2('a', 'y');
	  re.lastIndex = 2;
	  return re.exec('abcd') !== null;
	});

	// UC Browser bug
	// https://github.com/zloirock/core-js/issues/1008
	var MISSED_STICKY$2 = UNSUPPORTED_Y$2 || fails$g(function () {
	  return !$RegExp$2('a', 'y').sticky;
	});

	var BROKEN_CARET = UNSUPPORTED_Y$2 || fails$g(function () {
	  // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
	  var re = $RegExp$2('^r', 'gy');
	  re.lastIndex = 2;
	  return re.exec('str') !== null;
	});

	var regexpStickyHelpers = {
	  BROKEN_CARET: BROKEN_CARET,
	  MISSED_STICKY: MISSED_STICKY$2,
	  UNSUPPORTED_Y: UNSUPPORTED_Y$2
	};

	var fails$f = fails$A;
	var global$d = global$s;

	// babel-minify and Closure Compiler transpiles RegExp('.', 's') -> /./s and it causes SyntaxError
	var $RegExp$1 = global$d.RegExp;

	var regexpUnsupportedDotAll = fails$f(function () {
	  var re = $RegExp$1('.', 's');
	  return !(re.dotAll && re.exec('\n') && re.flags === 's');
	});

	var fails$e = fails$A;
	var global$c = global$s;

	// babel-minify and Closure Compiler transpiles RegExp('(?<a>b)', 'g') -> /(?<a>b)/g and it causes SyntaxError
	var $RegExp = global$c.RegExp;

	var regexpUnsupportedNcg = fails$e(function () {
	  var re = $RegExp('(?<a>b)', 'g');
	  return re.exec('b').groups.a !== 'b' ||
	    'b'.replace(re, '$<a>c') !== 'bc';
	});

	/* eslint-disable regexp/no-empty-capturing-group, regexp/no-empty-group, regexp/no-lazy-ends -- testing */
	/* eslint-disable regexp/no-useless-quantifier -- testing */
	var call$b = functionCall;
	var uncurryThis$f = functionUncurryThis;
	var toString$9 = toString$d;
	var regexpFlags = regexpFlags$1;
	var stickyHelpers$1 = regexpStickyHelpers;
	var shared = shared$4.exports;
	var create = objectCreate;
	var getInternalState$1 = internalState.get;
	var UNSUPPORTED_DOT_ALL$1 = regexpUnsupportedDotAll;
	var UNSUPPORTED_NCG$1 = regexpUnsupportedNcg;

	var nativeReplace = shared('native-string-replace', String.prototype.replace);
	var nativeExec = RegExp.prototype.exec;
	var patchedExec = nativeExec;
	var charAt$4 = uncurryThis$f(''.charAt);
	var indexOf = uncurryThis$f(''.indexOf);
	var replace$3 = uncurryThis$f(''.replace);
	var stringSlice$4 = uncurryThis$f(''.slice);

	var UPDATES_LAST_INDEX_WRONG = (function () {
	  var re1 = /a/;
	  var re2 = /b*/g;
	  call$b(nativeExec, re1, 'a');
	  call$b(nativeExec, re2, 'a');
	  return re1.lastIndex !== 0 || re2.lastIndex !== 0;
	})();

	var UNSUPPORTED_Y$1 = stickyHelpers$1.BROKEN_CARET;

	// nonparticipating capturing group, copied from es5-shim's String#split patch.
	var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

	var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y$1 || UNSUPPORTED_DOT_ALL$1 || UNSUPPORTED_NCG$1;

	if (PATCH) {
	  patchedExec = function exec(string) {
	    var re = this;
	    var state = getInternalState$1(re);
	    var str = toString$9(string);
	    var raw = state.raw;
	    var result, reCopy, lastIndex, match, i, object, group;

	    if (raw) {
	      raw.lastIndex = re.lastIndex;
	      result = call$b(patchedExec, raw, str);
	      re.lastIndex = raw.lastIndex;
	      return result;
	    }

	    var groups = state.groups;
	    var sticky = UNSUPPORTED_Y$1 && re.sticky;
	    var flags = call$b(regexpFlags, re);
	    var source = re.source;
	    var charsAdded = 0;
	    var strCopy = str;

	    if (sticky) {
	      flags = replace$3(flags, 'y', '');
	      if (indexOf(flags, 'g') === -1) {
	        flags += 'g';
	      }

	      strCopy = stringSlice$4(str, re.lastIndex);
	      // Support anchored sticky behavior.
	      if (re.lastIndex > 0 && (!re.multiline || re.multiline && charAt$4(str, re.lastIndex - 1) !== '\n')) {
	        source = '(?: ' + source + ')';
	        strCopy = ' ' + strCopy;
	        charsAdded++;
	      }
	      // ^(? + rx + ) is needed, in combination with some str slicing, to
	      // simulate the 'y' flag.
	      reCopy = new RegExp('^(?:' + source + ')', flags);
	    }

	    if (NPCG_INCLUDED) {
	      reCopy = new RegExp('^' + source + '$(?!\\s)', flags);
	    }
	    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;

	    match = call$b(nativeExec, sticky ? reCopy : re, strCopy);

	    if (sticky) {
	      if (match) {
	        match.input = stringSlice$4(match.input, charsAdded);
	        match[0] = stringSlice$4(match[0], charsAdded);
	        match.index = re.lastIndex;
	        re.lastIndex += match[0].length;
	      } else re.lastIndex = 0;
	    } else if (UPDATES_LAST_INDEX_WRONG && match) {
	      re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
	    }
	    if (NPCG_INCLUDED && match && match.length > 1) {
	      // Fix browsers whose `exec` methods don't consistently return `undefined`
	      // for NPCG, like IE8. NOTE: This doesn't work for /(.?)?/
	      call$b(nativeReplace, match[0], reCopy, function () {
	        for (i = 1; i < arguments.length - 2; i++) {
	          if (arguments[i] === undefined) match[i] = undefined;
	        }
	      });
	    }

	    if (match && groups) {
	      match.groups = object = create(null);
	      for (i = 0; i < groups.length; i++) {
	        group = groups[i];
	        object[group[0]] = match[group[1]];
	      }
	    }

	    return match;
	  };
	}

	var regexpExec$2 = patchedExec;

	var $$m = _export;
	var exec$2 = regexpExec$2;

	// `RegExp.prototype.exec` method
	// https://tc39.es/ecma262/#sec-regexp.prototype.exec
	$$m({ target: 'RegExp', proto: true, forced: /./.exec !== exec$2 }, {
	  exec: exec$2
	});

	var NATIVE_BIND = functionBindNative;

	var FunctionPrototype$1 = Function.prototype;
	var apply$2 = FunctionPrototype$1.apply;
	var call$a = FunctionPrototype$1.call;

	// eslint-disable-next-line es/no-reflect -- safe
	var functionApply = typeof Reflect == 'object' && Reflect.apply || (NATIVE_BIND ? call$a.bind(apply$2) : function () {
	  return call$a.apply(apply$2, arguments);
	});

	// TODO: Remove from `core-js@4` since it's moved to entry points

	var uncurryThis$e = functionUncurryThisClause;
	var defineBuiltIn$4 = defineBuiltIn$b;
	var regexpExec$1 = regexpExec$2;
	var fails$d = fails$A;
	var wellKnownSymbol$6 = wellKnownSymbol$n;
	var createNonEnumerableProperty$1 = createNonEnumerableProperty$7;

	var SPECIES$3 = wellKnownSymbol$6('species');
	var RegExpPrototype$4 = RegExp.prototype;

	var fixRegexpWellKnownSymbolLogic = function (KEY, exec, FORCED, SHAM) {
	  var SYMBOL = wellKnownSymbol$6(KEY);

	  var DELEGATES_TO_SYMBOL = !fails$d(function () {
	    // String methods call symbol-named RegEp methods
	    var O = {};
	    O[SYMBOL] = function () { return 7; };
	    return ''[KEY](O) !== 7;
	  });

	  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails$d(function () {
	    // Symbol-named RegExp methods call .exec
	    var execCalled = false;
	    var re = /a/;

	    if (KEY === 'split') {
	      // We can't use real regex here since it causes deoptimization
	      // and serious performance degradation in V8
	      // https://github.com/zloirock/core-js/issues/306
	      re = {};
	      // RegExp[@@split] doesn't call the regex's exec method, but first creates
	      // a new one. We need to return the patched regex when creating the new one.
	      re.constructor = {};
	      re.constructor[SPECIES$3] = function () { return re; };
	      re.flags = '';
	      re[SYMBOL] = /./[SYMBOL];
	    }

	    re.exec = function () {
	      execCalled = true;
	      return null;
	    };

	    re[SYMBOL]('');
	    return !execCalled;
	  });

	  if (
	    !DELEGATES_TO_SYMBOL ||
	    !DELEGATES_TO_EXEC ||
	    FORCED
	  ) {
	    var uncurriedNativeRegExpMethod = uncurryThis$e(/./[SYMBOL]);
	    var methods = exec(SYMBOL, ''[KEY], function (nativeMethod, regexp, str, arg2, forceStringMethod) {
	      var uncurriedNativeMethod = uncurryThis$e(nativeMethod);
	      var $exec = regexp.exec;
	      if ($exec === regexpExec$1 || $exec === RegExpPrototype$4.exec) {
	        if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
	          // The native String method already delegates to @@method (this
	          // polyfilled function), leasing to infinite recursion.
	          // We avoid it by directly calling the native @@method method.
	          return { done: true, value: uncurriedNativeRegExpMethod(regexp, str, arg2) };
	        }
	        return { done: true, value: uncurriedNativeMethod(str, regexp, arg2) };
	      }
	      return { done: false };
	    });

	    defineBuiltIn$4(String.prototype, KEY, methods[0]);
	    defineBuiltIn$4(RegExpPrototype$4, SYMBOL, methods[1]);
	  }

	  if (SHAM) createNonEnumerableProperty$1(RegExpPrototype$4[SYMBOL], 'sham', true);
	};

	var charAt$3 = stringMultibyte.charAt;

	// `AdvanceStringIndex` abstract operation
	// https://tc39.es/ecma262/#sec-advancestringindex
	var advanceStringIndex$2 = function (S, index, unicode) {
	  return index + (unicode ? charAt$3(S, index).length : 1);
	};

	var uncurryThis$d = functionUncurryThis;
	var toObject$5 = toObject$a;

	var floor$1 = Math.floor;
	var charAt$2 = uncurryThis$d(''.charAt);
	var replace$2 = uncurryThis$d(''.replace);
	var stringSlice$3 = uncurryThis$d(''.slice);
	// eslint-disable-next-line redos/no-vulnerable -- safe
	var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d{1,2}|<[^>]*>)/g;
	var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d{1,2})/g;

	// `GetSubstitution` abstract operation
	// https://tc39.es/ecma262/#sec-getsubstitution
	var getSubstitution$1 = function (matched, str, position, captures, namedCaptures, replacement) {
	  var tailPos = position + matched.length;
	  var m = captures.length;
	  var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
	  if (namedCaptures !== undefined) {
	    namedCaptures = toObject$5(namedCaptures);
	    symbols = SUBSTITUTION_SYMBOLS;
	  }
	  return replace$2(replacement, symbols, function (match, ch) {
	    var capture;
	    switch (charAt$2(ch, 0)) {
	      case '$': return '$';
	      case '&': return matched;
	      case '`': return stringSlice$3(str, 0, position);
	      case "'": return stringSlice$3(str, tailPos);
	      case '<':
	        capture = namedCaptures[stringSlice$3(ch, 1, -1)];
	        break;
	      default: // \d\d?
	        var n = +ch;
	        if (n === 0) return match;
	        if (n > m) {
	          var f = floor$1(n / 10);
	          if (f === 0) return match;
	          if (f <= m) return captures[f - 1] === undefined ? charAt$2(ch, 1) : captures[f - 1] + charAt$2(ch, 1);
	          return match;
	        }
	        capture = captures[n - 1];
	    }
	    return capture === undefined ? '' : capture;
	  });
	};

	var call$9 = functionCall;
	var anObject$6 = anObject$h;
	var isCallable$6 = isCallable$p;
	var classof$2 = classofRaw$2;
	var regexpExec = regexpExec$2;

	var $TypeError$7 = TypeError;

	// `RegExpExec` abstract operation
	// https://tc39.es/ecma262/#sec-regexpexec
	var regexpExecAbstract = function (R, S) {
	  var exec = R.exec;
	  if (isCallable$6(exec)) {
	    var result = call$9(exec, R, S);
	    if (result !== null) anObject$6(result);
	    return result;
	  }
	  if (classof$2(R) === 'RegExp') return call$9(regexpExec, R, S);
	  throw $TypeError$7('RegExp#exec called on incompatible receiver');
	};

	var apply$1 = functionApply;
	var call$8 = functionCall;
	var uncurryThis$c = functionUncurryThis;
	var fixRegExpWellKnownSymbolLogic$1 = fixRegexpWellKnownSymbolLogic;
	var fails$c = fails$A;
	var anObject$5 = anObject$h;
	var isCallable$5 = isCallable$p;
	var isNullOrUndefined$2 = isNullOrUndefined$8;
	var toIntegerOrInfinity = toIntegerOrInfinity$4;
	var toLength$1 = toLength$4;
	var toString$8 = toString$d;
	var requireObjectCoercible$3 = requireObjectCoercible$8;
	var advanceStringIndex$1 = advanceStringIndex$2;
	var getMethod$1 = getMethod$5;
	var getSubstitution = getSubstitution$1;
	var regExpExec$2 = regexpExecAbstract;
	var wellKnownSymbol$5 = wellKnownSymbol$n;

	var REPLACE = wellKnownSymbol$5('replace');
	var max$2 = Math.max;
	var min$1 = Math.min;
	var concat$1 = uncurryThis$c([].concat);
	var push$1 = uncurryThis$c([].push);
	var stringIndexOf$2 = uncurryThis$c(''.indexOf);
	var stringSlice$2 = uncurryThis$c(''.slice);

	var maybeToString = function (it) {
	  return it === undefined ? it : String(it);
	};

	// IE <= 11 replaces $0 with the whole match, as if it was $&
	// https://stackoverflow.com/questions/6024666/getting-ie-to-replace-a-regex-with-the-literal-string-0
	var REPLACE_KEEPS_$0 = (function () {
	  // eslint-disable-next-line regexp/prefer-escape-replacement-dollar-char -- required for testing
	  return 'a'.replace(/./, '$0') === '$0';
	})();

	// Safari <= 13.0.3(?) substitutes nth capture where n>m with an empty string
	var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = (function () {
	  if (/./[REPLACE]) {
	    return /./[REPLACE]('a', '$0') === '';
	  }
	  return false;
	})();

	var REPLACE_SUPPORTS_NAMED_GROUPS = !fails$c(function () {
	  var re = /./;
	  re.exec = function () {
	    var result = [];
	    result.groups = { a: '7' };
	    return result;
	  };
	  // eslint-disable-next-line regexp/no-useless-dollar-replacements -- false positive
	  return ''.replace(re, '$<a>') !== '7';
	});

	// @@replace logic
	fixRegExpWellKnownSymbolLogic$1('replace', function (_, nativeReplace, maybeCallNative) {
	  var UNSAFE_SUBSTITUTE = REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE ? '$' : '$0';

	  return [
	    // `String.prototype.replace` method
	    // https://tc39.es/ecma262/#sec-string.prototype.replace
	    function replace(searchValue, replaceValue) {
	      var O = requireObjectCoercible$3(this);
	      var replacer = isNullOrUndefined$2(searchValue) ? undefined : getMethod$1(searchValue, REPLACE);
	      return replacer
	        ? call$8(replacer, searchValue, O, replaceValue)
	        : call$8(nativeReplace, toString$8(O), searchValue, replaceValue);
	    },
	    // `RegExp.prototype[@@replace]` method
	    // https://tc39.es/ecma262/#sec-regexp.prototype-@@replace
	    function (string, replaceValue) {
	      var rx = anObject$5(this);
	      var S = toString$8(string);

	      if (
	        typeof replaceValue == 'string' &&
	        stringIndexOf$2(replaceValue, UNSAFE_SUBSTITUTE) === -1 &&
	        stringIndexOf$2(replaceValue, '$<') === -1
	      ) {
	        var res = maybeCallNative(nativeReplace, rx, S, replaceValue);
	        if (res.done) return res.value;
	      }

	      var functionalReplace = isCallable$5(replaceValue);
	      if (!functionalReplace) replaceValue = toString$8(replaceValue);

	      var global = rx.global;
	      var fullUnicode;
	      if (global) {
	        fullUnicode = rx.unicode;
	        rx.lastIndex = 0;
	      }

	      var results = [];
	      var result;
	      while (true) {
	        result = regExpExec$2(rx, S);
	        if (result === null) break;

	        push$1(results, result);
	        if (!global) break;

	        var matchStr = toString$8(result[0]);
	        if (matchStr === '') rx.lastIndex = advanceStringIndex$1(S, toLength$1(rx.lastIndex), fullUnicode);
	      }

	      var accumulatedResult = '';
	      var nextSourcePosition = 0;
	      for (var i = 0; i < results.length; i++) {
	        result = results[i];

	        var matched = toString$8(result[0]);
	        var position = max$2(min$1(toIntegerOrInfinity(result.index), S.length), 0);
	        var captures = [];
	        var replacement;
	        // NOTE: This is equivalent to
	        //   captures = result.slice(1).map(maybeToString)
	        // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
	        // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
	        // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
	        for (var j = 1; j < result.length; j++) push$1(captures, maybeToString(result[j]));
	        var namedCaptures = result.groups;
	        if (functionalReplace) {
	          var replacerArgs = concat$1([matched], captures, position, S);
	          if (namedCaptures !== undefined) push$1(replacerArgs, namedCaptures);
	          replacement = toString$8(apply$1(replaceValue, undefined, replacerArgs));
	        } else {
	          replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
	        }
	        if (position >= nextSourcePosition) {
	          accumulatedResult += stringSlice$2(S, nextSourcePosition, position) + replacement;
	          nextSourcePosition = position + matched.length;
	        }
	      }

	      return accumulatedResult + stringSlice$2(S, nextSourcePosition);
	    }
	  ];
	}, !REPLACE_SUPPORTS_NAMED_GROUPS || !REPLACE_KEEPS_$0 || REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE);

	var $$l = _export;
	var $entries = objectToArray.entries;

	// `Object.entries` method
	// https://tc39.es/ecma262/#sec-object.entries
	$$l({ target: 'Object', stat: true }, {
	  entries: function entries(O) {
	    return $entries(O);
	  }
	});

	var $$k = _export;
	var $includes = arrayIncludes.includes;
	var fails$b = fails$A;
	var addToUnscopables = addToUnscopables$3;

	// FF99+ bug
	var BROKEN_ON_SPARSE = fails$b(function () {
	  // eslint-disable-next-line es/no-array-prototype-includes -- detection
	  return !Array(1).includes();
	});

	// `Array.prototype.includes` method
	// https://tc39.es/ecma262/#sec-array.prototype.includes
	$$k({ target: 'Array', proto: true, forced: BROKEN_ON_SPARSE }, {
	  includes: function includes(el /* , fromIndex = 0 */) {
	    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
	addToUnscopables('includes');

	var $$j = _export;
	var uncurryThis$b = functionUncurryThis;
	var notARegExp = notARegexp;
	var requireObjectCoercible$2 = requireObjectCoercible$8;
	var toString$7 = toString$d;
	var correctIsRegExpLogic = correctIsRegexpLogic;

	var stringIndexOf$1 = uncurryThis$b(''.indexOf);

	// `String.prototype.includes` method
	// https://tc39.es/ecma262/#sec-string.prototype.includes
	$$j({ target: 'String', proto: true, forced: !correctIsRegExpLogic('includes') }, {
	  includes: function includes(searchString /* , position = 0 */) {
	    return !!~stringIndexOf$1(
	      toString$7(requireObjectCoercible$2(this)),
	      toString$7(notARegExp(searchString)),
	      arguments.length > 1 ? arguments[1] : undefined
	    );
	  }
	});

	var $$i = _export;
	var toObject$4 = toObject$a;
	var nativeKeys = objectKeys$3;
	var fails$a = fails$A;

	var FAILS_ON_PRIMITIVES = fails$a(function () { nativeKeys(1); });

	// `Object.keys` method
	// https://tc39.es/ecma262/#sec-object.keys
	$$i({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES }, {
	  keys: function keys(it) {
	    return nativeKeys(toObject$4(it));
	  }
	});

	var uncurryThis$a = functionUncurryThis;

	var arraySlice$2 = uncurryThis$a([].slice);

	var $$h = _export;
	var isArray$1 = isArray$3;
	var isConstructor$1 = isConstructor$4;
	var isObject$3 = isObject$g;
	var toAbsoluteIndex = toAbsoluteIndex$3;
	var lengthOfArrayLike$3 = lengthOfArrayLike$9;
	var toIndexedObject$1 = toIndexedObject$9;
	var createProperty$1 = createProperty$4;
	var wellKnownSymbol$4 = wellKnownSymbol$n;
	var arrayMethodHasSpeciesSupport$2 = arrayMethodHasSpeciesSupport$4;
	var nativeSlice = arraySlice$2;

	var HAS_SPECIES_SUPPORT$1 = arrayMethodHasSpeciesSupport$2('slice');

	var SPECIES$2 = wellKnownSymbol$4('species');
	var $Array = Array;
	var max$1 = Math.max;

	// `Array.prototype.slice` method
	// https://tc39.es/ecma262/#sec-array.prototype.slice
	// fallback for not array-like ES3 strings and DOM objects
	$$h({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$1 }, {
	  slice: function slice(start, end) {
	    var O = toIndexedObject$1(this);
	    var length = lengthOfArrayLike$3(O);
	    var k = toAbsoluteIndex(start, length);
	    var fin = toAbsoluteIndex(end === undefined ? length : end, length);
	    // inline `ArraySpeciesCreate` for usage native `Array#slice` where it's possible
	    var Constructor, result, n;
	    if (isArray$1(O)) {
	      Constructor = O.constructor;
	      // cross-realm fallback
	      if (isConstructor$1(Constructor) && (Constructor === $Array || isArray$1(Constructor.prototype))) {
	        Constructor = undefined;
	      } else if (isObject$3(Constructor)) {
	        Constructor = Constructor[SPECIES$2];
	        if (Constructor === null) Constructor = undefined;
	      }
	      if (Constructor === $Array || Constructor === undefined) {
	        return nativeSlice(O, k, fin);
	      }
	    }
	    result = new (Constructor === undefined ? $Array : Constructor)(max$1(fin - k, 0));
	    for (n = 0; k < fin; k++, n++) if (k in O) createProperty$1(result, n, O[k]);
	    result.length = n;
	    return result;
	  }
	});

	var call$7 = functionCall;
	var fixRegExpWellKnownSymbolLogic = fixRegexpWellKnownSymbolLogic;
	var anObject$4 = anObject$h;
	var isNullOrUndefined$1 = isNullOrUndefined$8;
	var toLength = toLength$4;
	var toString$6 = toString$d;
	var requireObjectCoercible$1 = requireObjectCoercible$8;
	var getMethod = getMethod$5;
	var advanceStringIndex = advanceStringIndex$2;
	var regExpExec$1 = regexpExecAbstract;

	// @@match logic
	fixRegExpWellKnownSymbolLogic('match', function (MATCH, nativeMatch, maybeCallNative) {
	  return [
	    // `String.prototype.match` method
	    // https://tc39.es/ecma262/#sec-string.prototype.match
	    function match(regexp) {
	      var O = requireObjectCoercible$1(this);
	      var matcher = isNullOrUndefined$1(regexp) ? undefined : getMethod(regexp, MATCH);
	      return matcher ? call$7(matcher, regexp, O) : new RegExp(regexp)[MATCH](toString$6(O));
	    },
	    // `RegExp.prototype[@@match]` method
	    // https://tc39.es/ecma262/#sec-regexp.prototype-@@match
	    function (string) {
	      var rx = anObject$4(this);
	      var S = toString$6(string);
	      var res = maybeCallNative(nativeMatch, rx, S);

	      if (res.done) return res.value;

	      if (!rx.global) return regExpExec$1(rx, S);

	      var fullUnicode = rx.unicode;
	      rx.lastIndex = 0;
	      var A = [];
	      var n = 0;
	      var result;
	      while ((result = regExpExec$1(rx, S)) !== null) {
	        var matchStr = toString$6(result[0]);
	        A[n] = matchStr;
	        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
	        n++;
	      }
	      return n === 0 ? null : A;
	    }
	  ];
	});

	var call$6 = functionCall;
	var hasOwn$3 = hasOwnProperty_1;
	var isPrototypeOf$2 = objectIsPrototypeOf;
	var regExpFlags = regexpFlags$1;

	var RegExpPrototype$3 = RegExp.prototype;

	var regexpGetFlags = function (R) {
	  var flags = R.flags;
	  return flags === undefined && !('flags' in RegExpPrototype$3) && !hasOwn$3(R, 'flags') && isPrototypeOf$2(RegExpPrototype$3, R)
	    ? call$6(regExpFlags, R) : flags;
	};

	var PROPER_FUNCTION_NAME$1 = functionName.PROPER;
	var defineBuiltIn$3 = defineBuiltIn$b;
	var anObject$3 = anObject$h;
	var $toString = toString$d;
	var fails$9 = fails$A;
	var getRegExpFlags$1 = regexpGetFlags;

	var TO_STRING = 'toString';
	var RegExpPrototype$2 = RegExp.prototype;
	var nativeToString = RegExpPrototype$2[TO_STRING];

	var NOT_GENERIC = fails$9(function () { return nativeToString.call({ source: 'a', flags: 'b' }) !== '/a/b'; });
	// FF44- RegExp#toString has a wrong name
	var INCORRECT_NAME = PROPER_FUNCTION_NAME$1 && nativeToString.name !== TO_STRING;

	// `RegExp.prototype.toString` method
	// https://tc39.es/ecma262/#sec-regexp.prototype.tostring
	if (NOT_GENERIC || INCORRECT_NAME) {
	  defineBuiltIn$3(RegExp.prototype, TO_STRING, function toString() {
	    var R = anObject$3(this);
	    var pattern = $toString(R.source);
	    var flags = $toString(getRegExpFlags$1(R));
	    return '/' + pattern + '/' + flags;
	  }, { unsafe: true });
	}

	// a string of all valid unicode whitespaces
	var whitespaces$4 = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002' +
	  '\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

	var uncurryThis$9 = functionUncurryThis;
	var requireObjectCoercible = requireObjectCoercible$8;
	var toString$5 = toString$d;
	var whitespaces$3 = whitespaces$4;

	var replace$1 = uncurryThis$9(''.replace);
	var ltrim = RegExp('^[' + whitespaces$3 + ']+');
	var rtrim = RegExp('(^|[^' + whitespaces$3 + '])[' + whitespaces$3 + ']+$');

	// `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation
	var createMethod$1 = function (TYPE) {
	  return function ($this) {
	    var string = toString$5(requireObjectCoercible($this));
	    if (TYPE & 1) string = replace$1(string, ltrim, '');
	    if (TYPE & 2) string = replace$1(string, rtrim, '$1');
	    return string;
	  };
	};

	var stringTrim = {
	  // `String.prototype.{ trimLeft, trimStart }` methods
	  // https://tc39.es/ecma262/#sec-string.prototype.trimstart
	  start: createMethod$1(1),
	  // `String.prototype.{ trimRight, trimEnd }` methods
	  // https://tc39.es/ecma262/#sec-string.prototype.trimend
	  end: createMethod$1(2),
	  // `String.prototype.trim` method
	  // https://tc39.es/ecma262/#sec-string.prototype.trim
	  trim: createMethod$1(3)
	};

	var global$b = global$s;
	var fails$8 = fails$A;
	var uncurryThis$8 = functionUncurryThis;
	var toString$4 = toString$d;
	var trim$2 = stringTrim.trim;
	var whitespaces$2 = whitespaces$4;

	var charAt$1 = uncurryThis$8(''.charAt);
	var $parseFloat = global$b.parseFloat;
	var Symbol$2 = global$b.Symbol;
	var ITERATOR$1 = Symbol$2 && Symbol$2.iterator;
	var FORCED$6 = 1 / $parseFloat(whitespaces$2 + '-0') !== -Infinity
	  // MS Edge 18- broken with boxed symbols
	  || (ITERATOR$1 && !fails$8(function () { $parseFloat(Object(ITERATOR$1)); }));

	// `parseFloat` method
	// https://tc39.es/ecma262/#sec-parsefloat-string
	var numberParseFloat = FORCED$6 ? function parseFloat(string) {
	  var trimmedString = trim$2(toString$4(string));
	  var result = $parseFloat(trimmedString);
	  return result === 0 && charAt$1(trimmedString, 0) === '-' ? -0 : result;
	} : $parseFloat;

	var $$g = _export;
	var parseFloat$1 = numberParseFloat;

	// `Number.parseFloat` method
	// https://tc39.es/ecma262/#sec-number.parseFloat
	// eslint-disable-next-line es/no-number-parsefloat -- required for testing
	$$g({ target: 'Number', stat: true, forced: Number.parseFloat !== parseFloat$1 }, {
	  parseFloat: parseFloat$1
	});

	var global$a = global$s;

	var path$1 = global$a;

	var uncurryThis$7 = functionUncurryThis;

	// `thisNumberValue` abstract operation
	// https://tc39.es/ecma262/#sec-thisnumbervalue
	var thisNumberValue$1 = uncurryThis$7(1.0.valueOf);

	var $$f = _export;
	var IS_PURE = isPure;
	var DESCRIPTORS$4 = descriptors;
	var global$9 = global$s;
	var path = path$1;
	var uncurryThis$6 = functionUncurryThis;
	var isForced$2 = isForced_1;
	var hasOwn$2 = hasOwnProperty_1;
	var inheritIfRequired$1 = inheritIfRequired$3;
	var isPrototypeOf$1 = objectIsPrototypeOf;
	var isSymbol = isSymbol$3;
	var toPrimitive = toPrimitive$2;
	var fails$7 = fails$A;
	var getOwnPropertyNames$1 = objectGetOwnPropertyNames.f;
	var getOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;
	var defineProperty$2 = objectDefineProperty.f;
	var thisNumberValue = thisNumberValue$1;
	var trim$1 = stringTrim.trim;

	var NUMBER = 'Number';
	var NativeNumber = global$9[NUMBER];
	path[NUMBER];
	var NumberPrototype = NativeNumber.prototype;
	var TypeError$2 = global$9.TypeError;
	var stringSlice$1 = uncurryThis$6(''.slice);
	var charCodeAt = uncurryThis$6(''.charCodeAt);

	// `ToNumeric` abstract operation
	// https://tc39.es/ecma262/#sec-tonumeric
	var toNumeric = function (value) {
	  var primValue = toPrimitive(value, 'number');
	  return typeof primValue == 'bigint' ? primValue : toNumber(primValue);
	};

	// `ToNumber` abstract operation
	// https://tc39.es/ecma262/#sec-tonumber
	var toNumber = function (argument) {
	  var it = toPrimitive(argument, 'number');
	  var first, third, radix, maxCode, digits, length, index, code;
	  if (isSymbol(it)) throw TypeError$2('Cannot convert a Symbol value to a number');
	  if (typeof it == 'string' && it.length > 2) {
	    it = trim$1(it);
	    first = charCodeAt(it, 0);
	    if (first === 43 || first === 45) {
	      third = charCodeAt(it, 2);
	      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
	    } else if (first === 48) {
	      switch (charCodeAt(it, 1)) {
	        // fast equal of /^0b[01]+$/i
	        case 66:
	        case 98:
	          radix = 2;
	          maxCode = 49;
	          break;
	        // fast equal of /^0o[0-7]+$/i
	        case 79:
	        case 111:
	          radix = 8;
	          maxCode = 55;
	          break;
	        default:
	          return +it;
	      }
	      digits = stringSlice$1(it, 2);
	      length = digits.length;
	      for (index = 0; index < length; index++) {
	        code = charCodeAt(digits, index);
	        // parseInt parses a string to a first unavailable symbol
	        // but ToNumber should return NaN if a string contains unavailable symbols
	        if (code < 48 || code > maxCode) return NaN;
	      } return parseInt(digits, radix);
	    }
	  } return +it;
	};

	var FORCED$5 = isForced$2(NUMBER, !NativeNumber(' 0o1') || !NativeNumber('0b1') || NativeNumber('+0x1'));

	var calledWithNew = function (dummy) {
	  // includes check on 1..constructor(foo) case
	  return isPrototypeOf$1(NumberPrototype, dummy) && fails$7(function () { thisNumberValue(dummy); });
	};

	// `Number` constructor
	// https://tc39.es/ecma262/#sec-number-constructor
	var NumberWrapper = function Number(value) {
	  var n = arguments.length < 1 ? 0 : NativeNumber(toNumeric(value));
	  return calledWithNew(this) ? inheritIfRequired$1(Object(n), this, NumberWrapper) : n;
	};

	NumberWrapper.prototype = NumberPrototype;
	if (FORCED$5 && !IS_PURE) NumberPrototype.constructor = NumberWrapper;

	$$f({ global: true, constructor: true, wrap: true, forced: FORCED$5 }, {
	  Number: NumberWrapper
	});

	// Use `internal/copy-constructor-properties` helper in `core-js@4`
	var copyConstructorProperties = function (target, source) {
	  for (var keys = DESCRIPTORS$4 ? getOwnPropertyNames$1(source) : (
	    // ES3:
	    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
	    // ES2015 (in case, if modules with ES2015 Number statics required before):
	    'EPSILON,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,isFinite,isInteger,isNaN,isSafeInteger,parseFloat,parseInt,' +
	    // ESNext
	    'fromString,range'
	  ).split(','), j = 0, key; keys.length > j; j++) {
	    if (hasOwn$2(source, key = keys[j]) && !hasOwn$2(target, key)) {
	      defineProperty$2(target, key, getOwnPropertyDescriptor$1(source, key));
	    }
	  }
	};
	if (FORCED$5 || IS_PURE) copyConstructorProperties(path[NUMBER], NativeNumber);

	/**
	 * --------------------------------------------------------------------------
	 * Bootstrap util/index.js
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	 * --------------------------------------------------------------------------
	 */

	var MAX_UID = 1000000;
	var MILLISECONDS_MULTIPLIER = 1000;
	var TRANSITION_END = 'transitionend';

	/**
	 * Properly escape IDs selectors to handle weird IDs
	 * @param {string} selector
	 * @returns {string}
	 */
	var parseSelector = function parseSelector(selector) {
	  if (selector && window.CSS && window.CSS.escape) {
	    // document.querySelector needs escaping to handle IDs (html5+) containing for instance /
	    selector = selector.replace(/#([^\s"#']+)/g, function (match, id) {
	      return "#" + CSS.escape(id);
	    });
	  }
	  return selector;
	};

	// Shout-out Angus Croll (https://goo.gl/pxwQGp)
	var toType = function toType(object) {
	  if (object === null || object === undefined) {
	    return "" + object;
	  }
	  return Object.prototype.toString.call(object).match(/\s([a-z]+)/i)[1].toLowerCase();
	};

	/**
	 * Public Util API
	 */

	var getUID = function getUID(prefix) {
	  do {
	    prefix += Math.floor(Math.random() * MAX_UID);
	  } while (document.getElementById(prefix));
	  return prefix;
	};
	var getTransitionDurationFromElement = function getTransitionDurationFromElement(element) {
	  if (!element) {
	    return 0;
	  }

	  // Get transition-duration of the element
	  var _window$getComputedSt = window.getComputedStyle(element),
	    transitionDuration = _window$getComputedSt.transitionDuration,
	    transitionDelay = _window$getComputedSt.transitionDelay;
	  var floatTransitionDuration = Number.parseFloat(transitionDuration);
	  var floatTransitionDelay = Number.parseFloat(transitionDelay);

	  // Return 0 if element or transition duration is not found
	  if (!floatTransitionDuration && !floatTransitionDelay) {
	    return 0;
	  }

	  // If multiple durations are defined, take the first
	  transitionDuration = transitionDuration.split(',')[0];
	  transitionDelay = transitionDelay.split(',')[0];
	  return (Number.parseFloat(transitionDuration) + Number.parseFloat(transitionDelay)) * MILLISECONDS_MULTIPLIER;
	};
	var triggerTransitionEnd = function triggerTransitionEnd(element) {
	  element.dispatchEvent(new Event(TRANSITION_END));
	};
	var isElement$1 = function isElement(object) {
	  if (!object || typeof object !== 'object') {
	    return false;
	  }
	  if (typeof object.jquery !== 'undefined') {
	    object = object[0];
	  }
	  return typeof object.nodeType !== 'undefined';
	};
	var getElement = function getElement(object) {
	  // it's a jQuery object or a node element
	  if (isElement$1(object)) {
	    return object.jquery ? object[0] : object;
	  }
	  if (typeof object === 'string' && object.length > 0) {
	    return document.querySelector(parseSelector(object));
	  }
	  return null;
	};
	var isVisible = function isVisible(element) {
	  if (!isElement$1(element) || element.getClientRects().length === 0) {
	    return false;
	  }
	  var elementIsVisible = getComputedStyle(element).getPropertyValue('visibility') === 'visible';
	  // Handle `details` element as its content may falsie appear visible when it is closed
	  var closedDetails = element.closest('details:not([open])');
	  if (!closedDetails) {
	    return elementIsVisible;
	  }
	  if (closedDetails !== element) {
	    var summary = element.closest('summary');
	    if (summary && summary.parentNode !== closedDetails) {
	      return false;
	    }
	    if (summary === null) {
	      return false;
	    }
	  }
	  return elementIsVisible;
	};
	var isDisabled = function isDisabled(element) {
	  if (!element || element.nodeType !== Node.ELEMENT_NODE) {
	    return true;
	  }
	  if (element.classList.contains('disabled')) {
	    return true;
	  }
	  if (typeof element.disabled !== 'undefined') {
	    return element.disabled;
	  }
	  return element.hasAttribute('disabled') && element.getAttribute('disabled') !== 'false';
	};
	var findShadowRoot = function findShadowRoot(element) {
	  if (!document.documentElement.attachShadow) {
	    return null;
	  }

	  // Can find the shadow root otherwise it'll return the document
	  if (typeof element.getRootNode === 'function') {
	    var root = element.getRootNode();
	    return root instanceof ShadowRoot ? root : null;
	  }
	  if (element instanceof ShadowRoot) {
	    return element;
	  }

	  // when we don't find a shadow root
	  if (!element.parentNode) {
	    return null;
	  }
	  return findShadowRoot(element.parentNode);
	};
	var noop = function noop() {};

	/**
	 * Trick to restart an element's animation
	 *
	 * @param {HTMLElement} element
	 * @return void
	 *
	 * @see https://www.charistheo.io/blog/2021/02/restart-a-css-animation-with-javascript/#restarting-a-css-animation
	 */
	var reflow = function reflow(element) {
	  element.offsetHeight; // eslint-disable-line no-unused-expressions
	};

	var getjQuery = function getjQuery() {
	  if (window.jQuery && !document.body.hasAttribute('data-bs-no-jquery')) {
	    return window.jQuery;
	  }
	  return null;
	};
	var DOMContentLoadedCallbacks = [];
	var onDOMContentLoaded = function onDOMContentLoaded(callback) {
	  if (document.readyState === 'loading') {
	    // add listener on the first call when the document is in loading state
	    if (!DOMContentLoadedCallbacks.length) {
	      document.addEventListener('DOMContentLoaded', function () {
	        for (var _i = 0, _DOMContentLoadedCall = DOMContentLoadedCallbacks; _i < _DOMContentLoadedCall.length; _i++) {
	          var _callback = _DOMContentLoadedCall[_i];
	          _callback();
	        }
	      });
	    }
	    DOMContentLoadedCallbacks.push(callback);
	  } else {
	    callback();
	  }
	};
	var isRTL = function isRTL() {
	  return document.documentElement.dir === 'rtl';
	};
	var defineJQueryPlugin = function defineJQueryPlugin(plugin) {
	  onDOMContentLoaded(function () {
	    var $ = getjQuery();
	    /* istanbul ignore if */
	    if ($) {
	      var name = plugin.NAME;
	      var JQUERY_NO_CONFLICT = $.fn[name];
	      $.fn[name] = plugin.jQueryInterface;
	      $.fn[name].Constructor = plugin;
	      $.fn[name].noConflict = function () {
	        $.fn[name] = JQUERY_NO_CONFLICT;
	        return plugin.jQueryInterface;
	      };
	    }
	  });
	};
	var execute = function execute(possibleCallback, args, defaultValue) {
	  if (args === void 0) {
	    args = [];
	  }
	  if (defaultValue === void 0) {
	    defaultValue = possibleCallback;
	  }
	  return typeof possibleCallback === 'function' ? possibleCallback.apply(void 0, args) : defaultValue;
	};
	var executeAfterTransition = function executeAfterTransition(callback, transitionElement, waitForTransition) {
	  if (waitForTransition === void 0) {
	    waitForTransition = true;
	  }
	  if (!waitForTransition) {
	    execute(callback);
	    return;
	  }
	  var durationPadding = 5;
	  var emulatedDuration = getTransitionDurationFromElement(transitionElement) + durationPadding;
	  var called = false;
	  var handler = function handler(_ref) {
	    var target = _ref.target;
	    if (target !== transitionElement) {
	      return;
	    }
	    called = true;
	    transitionElement.removeEventListener(TRANSITION_END, handler);
	    execute(callback);
	  };
	  transitionElement.addEventListener(TRANSITION_END, handler);
	  setTimeout(function () {
	    if (!called) {
	      triggerTransitionEnd(transitionElement);
	    }
	  }, emulatedDuration);
	};

	/**
	 * Return the previous/next element of a list.
	 *
	 * @param {array} list    The list of elements
	 * @param activeElement   The active element
	 * @param shouldGetNext   Choose to get next or previous element
	 * @param isCycleAllowed
	 * @return {Element|elem} The proper element
	 */
	var getNextActiveElement = function getNextActiveElement(list, activeElement, shouldGetNext, isCycleAllowed) {
	  var listLength = list.length;
	  var index = list.indexOf(activeElement);

	  // if the element does not exist in the list return an element
	  // depending on the direction and if cycle is allowed
	  if (index === -1) {
	    return !shouldGetNext && isCycleAllowed ? list[listLength - 1] : list[0];
	  }
	  index += shouldGetNext ? 1 : -1;
	  if (isCycleAllowed) {
	    index = (index + listLength) % listLength;
	  }
	  return list[Math.max(0, Math.min(index, listLength - 1))];
	};

	/**
	 * Constants
	 */

	var namespaceRegex = /[^.]*(?=\..*)\.|.*/;
	var stripNameRegex = /\..*/;
	var stripUidRegex = /::\d+$/;
	var eventRegistry = {}; // Events storage
	var uidEvent = 1;
	var customEvents = {
	  mouseenter: 'mouseover',
	  mouseleave: 'mouseout'
	};
	var nativeEvents = new Set(['click', 'dblclick', 'mouseup', 'mousedown', 'contextmenu', 'mousewheel', 'DOMMouseScroll', 'mouseover', 'mouseout', 'mousemove', 'selectstart', 'selectend', 'keydown', 'keypress', 'keyup', 'orientationchange', 'touchstart', 'touchmove', 'touchend', 'touchcancel', 'pointerdown', 'pointermove', 'pointerup', 'pointerleave', 'pointercancel', 'gesturestart', 'gesturechange', 'gestureend', 'focus', 'blur', 'change', 'reset', 'select', 'submit', 'focusin', 'focusout', 'load', 'unload', 'beforeunload', 'resize', 'move', 'DOMContentLoaded', 'readystatechange', 'error', 'abort', 'scroll']);

	/**
	 * Private methods
	 */

	function makeEventUid(element, uid) {
	  return uid && uid + "::" + uidEvent++ || element.uidEvent || uidEvent++;
	}
	function getElementEvents(element) {
	  var uid = makeEventUid(element);
	  element.uidEvent = uid;
	  eventRegistry[uid] = eventRegistry[uid] || {};
	  return eventRegistry[uid];
	}
	function bootstrapHandler(element, fn) {
	  return function handler(event) {
	    hydrateObj(event, {
	      delegateTarget: element
	    });
	    if (handler.oneOff) {
	      EventHandler.off(element, event.type, fn);
	    }
	    return fn.apply(element, [event]);
	  };
	}
	function bootstrapDelegationHandler(element, selector, fn) {
	  return function handler(event) {
	    var domElements = element.querySelectorAll(selector);
	    for (var target = event.target; target && target !== this; target = target.parentNode) {
	      for (var _iterator = _createForOfIteratorHelperLoose(domElements), _step; !(_step = _iterator()).done;) {
	        var domElement = _step.value;
	        if (domElement !== target) {
	          continue;
	        }
	        hydrateObj(event, {
	          delegateTarget: target
	        });
	        if (handler.oneOff) {
	          EventHandler.off(element, event.type, selector, fn);
	        }
	        return fn.apply(target, [event]);
	      }
	    }
	  };
	}
	function findHandler(events, callable, delegationSelector) {
	  if (delegationSelector === void 0) {
	    delegationSelector = null;
	  }
	  return Object.values(events).find(function (event) {
	    return event.callable === callable && event.delegationSelector === delegationSelector;
	  });
	}
	function normalizeParameters(originalTypeEvent, handler, delegationFunction) {
	  var isDelegated = typeof handler === 'string';
	  // TODO: tooltip passes `false` instead of selector, so we need to check
	  var callable = isDelegated ? delegationFunction : handler || delegationFunction;
	  var typeEvent = getTypeEvent(originalTypeEvent);
	  if (!nativeEvents.has(typeEvent)) {
	    typeEvent = originalTypeEvent;
	  }
	  return [isDelegated, callable, typeEvent];
	}
	function addHandler(element, originalTypeEvent, handler, delegationFunction, oneOff) {
	  if (typeof originalTypeEvent !== 'string' || !element) {
	    return;
	  }
	  var _normalizeParameters = normalizeParameters(originalTypeEvent, handler, delegationFunction),
	    isDelegated = _normalizeParameters[0],
	    callable = _normalizeParameters[1],
	    typeEvent = _normalizeParameters[2];

	  // in case of mouseenter or mouseleave wrap the handler within a function that checks for its DOM position
	  // this prevents the handler from being dispatched the same way as mouseover or mouseout does
	  if (originalTypeEvent in customEvents) {
	    var wrapFunction = function wrapFunction(fn) {
	      return function (event) {
	        if (!event.relatedTarget || event.relatedTarget !== event.delegateTarget && !event.delegateTarget.contains(event.relatedTarget)) {
	          return fn.call(this, event);
	        }
	      };
	    };
	    callable = wrapFunction(callable);
	  }
	  var events = getElementEvents(element);
	  var handlers = events[typeEvent] || (events[typeEvent] = {});
	  var previousFunction = findHandler(handlers, callable, isDelegated ? handler : null);
	  if (previousFunction) {
	    previousFunction.oneOff = previousFunction.oneOff && oneOff;
	    return;
	  }
	  var uid = makeEventUid(callable, originalTypeEvent.replace(namespaceRegex, ''));
	  var fn = isDelegated ? bootstrapDelegationHandler(element, handler, callable) : bootstrapHandler(element, callable);
	  fn.delegationSelector = isDelegated ? handler : null;
	  fn.callable = callable;
	  fn.oneOff = oneOff;
	  fn.uidEvent = uid;
	  handlers[uid] = fn;
	  element.addEventListener(typeEvent, fn, isDelegated);
	}
	function removeHandler(element, events, typeEvent, handler, delegationSelector) {
	  var fn = findHandler(events[typeEvent], handler, delegationSelector);
	  if (!fn) {
	    return;
	  }
	  element.removeEventListener(typeEvent, fn, Boolean(delegationSelector));
	  delete events[typeEvent][fn.uidEvent];
	}
	function removeNamespacedHandlers(element, events, typeEvent, namespace) {
	  var storeElementEvent = events[typeEvent] || {};
	  for (var _i = 0, _Object$entries = Object.entries(storeElementEvent); _i < _Object$entries.length; _i++) {
	    var _Object$entries$_i = _Object$entries[_i],
	      handlerKey = _Object$entries$_i[0],
	      event = _Object$entries$_i[1];
	    if (handlerKey.includes(namespace)) {
	      removeHandler(element, events, typeEvent, event.callable, event.delegationSelector);
	    }
	  }
	}
	function getTypeEvent(event) {
	  // allow to get the native events from namespaced events ('click.bs.button' --> 'click')
	  event = event.replace(stripNameRegex, '');
	  return customEvents[event] || event;
	}
	var EventHandler = {
	  on: function on(element, event, handler, delegationFunction) {
	    addHandler(element, event, handler, delegationFunction, false);
	  },
	  one: function one(element, event, handler, delegationFunction) {
	    addHandler(element, event, handler, delegationFunction, true);
	  },
	  off: function off(element, originalTypeEvent, handler, delegationFunction) {
	    if (typeof originalTypeEvent !== 'string' || !element) {
	      return;
	    }
	    var _normalizeParameters2 = normalizeParameters(originalTypeEvent, handler, delegationFunction),
	      isDelegated = _normalizeParameters2[0],
	      callable = _normalizeParameters2[1],
	      typeEvent = _normalizeParameters2[2];
	    var inNamespace = typeEvent !== originalTypeEvent;
	    var events = getElementEvents(element);
	    var storeElementEvent = events[typeEvent] || {};
	    var isNamespace = originalTypeEvent.startsWith('.');
	    if (typeof callable !== 'undefined') {
	      // Simplest case: handler is passed, remove that listener ONLY.
	      if (!Object.keys(storeElementEvent).length) {
	        return;
	      }
	      removeHandler(element, events, typeEvent, callable, isDelegated ? handler : null);
	      return;
	    }
	    if (isNamespace) {
	      for (var _i2 = 0, _Object$keys = Object.keys(events); _i2 < _Object$keys.length; _i2++) {
	        var elementEvent = _Object$keys[_i2];
	        removeNamespacedHandlers(element, events, elementEvent, originalTypeEvent.slice(1));
	      }
	    }
	    for (var _i3 = 0, _Object$entries2 = Object.entries(storeElementEvent); _i3 < _Object$entries2.length; _i3++) {
	      var _Object$entries2$_i = _Object$entries2[_i3],
	        keyHandlers = _Object$entries2$_i[0],
	        event = _Object$entries2$_i[1];
	      var handlerKey = keyHandlers.replace(stripUidRegex, '');
	      if (!inNamespace || originalTypeEvent.includes(handlerKey)) {
	        removeHandler(element, events, typeEvent, event.callable, event.delegationSelector);
	      }
	    }
	  },
	  trigger: function trigger(element, event, args) {
	    if (typeof event !== 'string' || !element) {
	      return null;
	    }
	    var $ = getjQuery();
	    var typeEvent = getTypeEvent(event);
	    var inNamespace = event !== typeEvent;
	    var jQueryEvent = null;
	    var bubbles = true;
	    var nativeDispatch = true;
	    var defaultPrevented = false;
	    if (inNamespace && $) {
	      jQueryEvent = $.Event(event, args);
	      $(element).trigger(jQueryEvent);
	      bubbles = !jQueryEvent.isPropagationStopped();
	      nativeDispatch = !jQueryEvent.isImmediatePropagationStopped();
	      defaultPrevented = jQueryEvent.isDefaultPrevented();
	    }
	    var evt = hydrateObj(new Event(event, {
	      bubbles: bubbles,
	      cancelable: true
	    }), args);
	    if (defaultPrevented) {
	      evt.preventDefault();
	    }
	    if (nativeDispatch) {
	      element.dispatchEvent(evt);
	    }
	    if (evt.defaultPrevented && jQueryEvent) {
	      jQueryEvent.preventDefault();
	    }
	    return evt;
	  }
	};
	function hydrateObj(obj, meta) {
	  if (meta === void 0) {
	    meta = {};
	  }
	  var _loop = function _loop() {
	    var _Object$entries3$_i = _Object$entries3[_i4],
	      key = _Object$entries3$_i[0],
	      value = _Object$entries3$_i[1];
	    try {
	      obj[key] = value;
	    } catch (_unused) {
	      Object.defineProperty(obj, key, {
	        configurable: true,
	        get: function get() {
	          return value;
	        }
	      });
	    }
	  };
	  for (var _i4 = 0, _Object$entries3 = Object.entries(meta); _i4 < _Object$entries3.length; _i4++) {
	    _loop();
	  }
	  return obj;
	}

	var DESCRIPTORS$3 = descriptors;
	var uncurryThis$5 = functionUncurryThis;
	var call$5 = functionCall;
	var fails$6 = fails$A;
	var objectKeys = objectKeys$3;
	var getOwnPropertySymbolsModule = objectGetOwnPropertySymbols;
	var propertyIsEnumerableModule = objectPropertyIsEnumerable;
	var toObject$3 = toObject$a;
	var IndexedObject$2 = indexedObject;

	// eslint-disable-next-line es/no-object-assign -- safe
	var $assign = Object.assign;
	// eslint-disable-next-line es/no-object-defineproperty -- required for testing
	var defineProperty$1 = Object.defineProperty;
	var concat = uncurryThis$5([].concat);

	// `Object.assign` method
	// https://tc39.es/ecma262/#sec-object.assign
	var objectAssign = !$assign || fails$6(function () {
	  // should have correct order of operations (Edge bug)
	  if (DESCRIPTORS$3 && $assign({ b: 1 }, $assign(defineProperty$1({}, 'a', {
	    enumerable: true,
	    get: function () {
	      defineProperty$1(this, 'b', {
	        value: 3,
	        enumerable: false
	      });
	    }
	  }), { b: 2 })).b !== 1) return true;
	  // should work with symbols and should have deterministic property order (V8 bug)
	  var A = {};
	  var B = {};
	  // eslint-disable-next-line es/no-symbol -- safe
	  var symbol = Symbol('assign detection');
	  var alphabet = 'abcdefghijklmnopqrst';
	  A[symbol] = 7;
	  alphabet.split('').forEach(function (chr) { B[chr] = chr; });
	  return $assign({}, A)[symbol] !== 7 || objectKeys($assign({}, B)).join('') !== alphabet;
	}) ? function assign(target, source) { // eslint-disable-line no-unused-vars -- required for `.length`
	  var T = toObject$3(target);
	  var argumentsLength = arguments.length;
	  var index = 1;
	  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
	  var propertyIsEnumerable = propertyIsEnumerableModule.f;
	  while (argumentsLength > index) {
	    var S = IndexedObject$2(arguments[index++]);
	    var keys = getOwnPropertySymbols ? concat(objectKeys(S), getOwnPropertySymbols(S)) : objectKeys(S);
	    var length = keys.length;
	    var j = 0;
	    var key;
	    while (length > j) {
	      key = keys[j++];
	      if (!DESCRIPTORS$3 || call$5(propertyIsEnumerable, S, key)) T[key] = S[key];
	    }
	  } return T;
	} : $assign;

	var $$e = _export;
	var assign = objectAssign;

	// `Object.assign` method
	// https://tc39.es/ecma262/#sec-object.assign
	// eslint-disable-next-line es/no-object-assign -- required for testing
	$$e({ target: 'Object', stat: true, arity: 2, forced: Object.assign !== assign }, {
	  assign: assign
	});

	// TODO: Remove from `core-js@4` since it's moved to entry points

	var $$d = _export;
	var call$4 = functionCall;
	var isCallable$4 = isCallable$p;
	var anObject$2 = anObject$h;
	var toString$3 = toString$d;

	var DELEGATES_TO_EXEC = function () {
	  var execCalled = false;
	  var re = /[ac]/;
	  re.exec = function () {
	    execCalled = true;
	    return /./.exec.apply(this, arguments);
	  };
	  return re.test('abc') === true && execCalled;
	}();

	var nativeTest = /./.test;

	// `RegExp.prototype.test` method
	// https://tc39.es/ecma262/#sec-regexp.prototype.test
	$$d({ target: 'RegExp', proto: true, forced: !DELEGATES_TO_EXEC }, {
	  test: function (S) {
	    var R = anObject$2(this);
	    var string = toString$3(S);
	    var exec = R.exec;
	    if (!isCallable$4(exec)) return call$4(nativeTest, R, string);
	    var result = call$4(exec, R, string);
	    if (result === null) return false;
	    anObject$2(result);
	    return true;
	  }
	});

	var defineProperty = objectDefineProperty.f;

	var proxyAccessor$1 = function (Target, Source, key) {
	  key in Target || defineProperty(Target, key, {
	    configurable: true,
	    get: function () { return Source[key]; },
	    set: function (it) { Source[key] = it; }
	  });
	};

	var DESCRIPTORS$2 = descriptors;
	var global$8 = global$s;
	var uncurryThis$4 = functionUncurryThis;
	var isForced$1 = isForced_1;
	var inheritIfRequired = inheritIfRequired$3;
	var createNonEnumerableProperty = createNonEnumerableProperty$7;
	var getOwnPropertyNames = objectGetOwnPropertyNames.f;
	var isPrototypeOf = objectIsPrototypeOf;
	var isRegExp = isRegexp;
	var toString$2 = toString$d;
	var getRegExpFlags = regexpGetFlags;
	var stickyHelpers = regexpStickyHelpers;
	var proxyAccessor = proxyAccessor$1;
	var defineBuiltIn$2 = defineBuiltIn$b;
	var fails$5 = fails$A;
	var hasOwn$1 = hasOwnProperty_1;
	var enforceInternalState = internalState.enforce;
	var setSpecies$1 = setSpecies$3;
	var wellKnownSymbol$3 = wellKnownSymbol$n;
	var UNSUPPORTED_DOT_ALL = regexpUnsupportedDotAll;
	var UNSUPPORTED_NCG = regexpUnsupportedNcg;

	var MATCH = wellKnownSymbol$3('match');
	var NativeRegExp = global$8.RegExp;
	var RegExpPrototype$1 = NativeRegExp.prototype;
	var SyntaxError = global$8.SyntaxError;
	var exec$1 = uncurryThis$4(RegExpPrototype$1.exec);
	var charAt = uncurryThis$4(''.charAt);
	var replace = uncurryThis$4(''.replace);
	var stringIndexOf = uncurryThis$4(''.indexOf);
	var stringSlice = uncurryThis$4(''.slice);
	// TODO: Use only proper RegExpIdentifierName
	var IS_NCG = /^\?<[^\s\d!#%&*+<=>@^][^\s!#%&*+<=>@^]*>/;
	var re1 = /a/g;
	var re2 = /a/g;

	// "new" should create a new object, old webkit bug
	var CORRECT_NEW = new NativeRegExp(re1) !== re1;

	var MISSED_STICKY$1 = stickyHelpers.MISSED_STICKY;
	var UNSUPPORTED_Y = stickyHelpers.UNSUPPORTED_Y;

	var BASE_FORCED = DESCRIPTORS$2 &&
	  (!CORRECT_NEW || MISSED_STICKY$1 || UNSUPPORTED_DOT_ALL || UNSUPPORTED_NCG || fails$5(function () {
	    re2[MATCH] = false;
	    // RegExp constructor can alter flags and IsRegExp works correct with @@match
	    return NativeRegExp(re1) !== re1 || NativeRegExp(re2) === re2 || String(NativeRegExp(re1, 'i')) !== '/a/i';
	  }));

	var handleDotAll = function (string) {
	  var length = string.length;
	  var index = 0;
	  var result = '';
	  var brackets = false;
	  var chr;
	  for (; index <= length; index++) {
	    chr = charAt(string, index);
	    if (chr === '\\') {
	      result += chr + charAt(string, ++index);
	      continue;
	    }
	    if (!brackets && chr === '.') {
	      result += '[\\s\\S]';
	    } else {
	      if (chr === '[') {
	        brackets = true;
	      } else if (chr === ']') {
	        brackets = false;
	      } result += chr;
	    }
	  } return result;
	};

	var handleNCG = function (string) {
	  var length = string.length;
	  var index = 0;
	  var result = '';
	  var named = [];
	  var names = {};
	  var brackets = false;
	  var ncg = false;
	  var groupid = 0;
	  var groupname = '';
	  var chr;
	  for (; index <= length; index++) {
	    chr = charAt(string, index);
	    if (chr === '\\') {
	      chr += charAt(string, ++index);
	    } else if (chr === ']') {
	      brackets = false;
	    } else if (!brackets) switch (true) {
	      case chr === '[':
	        brackets = true;
	        break;
	      case chr === '(':
	        if (exec$1(IS_NCG, stringSlice(string, index + 1))) {
	          index += 2;
	          ncg = true;
	        }
	        result += chr;
	        groupid++;
	        continue;
	      case chr === '>' && ncg:
	        if (groupname === '' || hasOwn$1(names, groupname)) {
	          throw new SyntaxError('Invalid capture group name');
	        }
	        names[groupname] = true;
	        named[named.length] = [groupname, groupid];
	        ncg = false;
	        groupname = '';
	        continue;
	    }
	    if (ncg) groupname += chr;
	    else result += chr;
	  } return [result, named];
	};

	// `RegExp` constructor
	// https://tc39.es/ecma262/#sec-regexp-constructor
	if (isForced$1('RegExp', BASE_FORCED)) {
	  var RegExpWrapper = function RegExp(pattern, flags) {
	    var thisIsRegExp = isPrototypeOf(RegExpPrototype$1, this);
	    var patternIsRegExp = isRegExp(pattern);
	    var flagsAreUndefined = flags === undefined;
	    var groups = [];
	    var rawPattern = pattern;
	    var rawFlags, dotAll, sticky, handled, result, state;

	    if (!thisIsRegExp && patternIsRegExp && flagsAreUndefined && pattern.constructor === RegExpWrapper) {
	      return pattern;
	    }

	    if (patternIsRegExp || isPrototypeOf(RegExpPrototype$1, pattern)) {
	      pattern = pattern.source;
	      if (flagsAreUndefined) flags = getRegExpFlags(rawPattern);
	    }

	    pattern = pattern === undefined ? '' : toString$2(pattern);
	    flags = flags === undefined ? '' : toString$2(flags);
	    rawPattern = pattern;

	    if (UNSUPPORTED_DOT_ALL && 'dotAll' in re1) {
	      dotAll = !!flags && stringIndexOf(flags, 's') > -1;
	      if (dotAll) flags = replace(flags, /s/g, '');
	    }

	    rawFlags = flags;

	    if (MISSED_STICKY$1 && 'sticky' in re1) {
	      sticky = !!flags && stringIndexOf(flags, 'y') > -1;
	      if (sticky && UNSUPPORTED_Y) flags = replace(flags, /y/g, '');
	    }

	    if (UNSUPPORTED_NCG) {
	      handled = handleNCG(pattern);
	      pattern = handled[0];
	      groups = handled[1];
	    }

	    result = inheritIfRequired(NativeRegExp(pattern, flags), thisIsRegExp ? this : RegExpPrototype$1, RegExpWrapper);

	    if (dotAll || sticky || groups.length) {
	      state = enforceInternalState(result);
	      if (dotAll) {
	        state.dotAll = true;
	        state.raw = RegExpWrapper(handleDotAll(pattern), rawFlags);
	      }
	      if (sticky) state.sticky = true;
	      if (groups.length) state.groups = groups;
	    }

	    if (pattern !== rawPattern) try {
	      // fails in old engines, but we have no alternatives for unsupported regex syntax
	      createNonEnumerableProperty(result, 'source', rawPattern === '' ? '(?:)' : rawPattern);
	    } catch (error) { /* empty */ }

	    return result;
	  };

	  for (var keys = getOwnPropertyNames(NativeRegExp), index = 0; keys.length > index;) {
	    proxyAccessor(RegExpWrapper, NativeRegExp, keys[index++]);
	  }

	  RegExpPrototype$1.constructor = RegExpWrapper;
	  RegExpWrapper.prototype = RegExpPrototype$1;
	  defineBuiltIn$2(global$8, 'RegExp', RegExpWrapper, { constructor: true });
	}

	// https://tc39.es/ecma262/#sec-get-regexp-@@species
	setSpecies$1('RegExp');

	var DESCRIPTORS$1 = descriptors;
	var MISSED_STICKY = regexpStickyHelpers.MISSED_STICKY;
	var classof$1 = classofRaw$2;
	var defineBuiltInAccessor$1 = defineBuiltInAccessor$4;
	var getInternalState = internalState.get;

	var RegExpPrototype = RegExp.prototype;
	var $TypeError$6 = TypeError;

	// `RegExp.prototype.sticky` getter
	// https://tc39.es/ecma262/#sec-get-regexp.prototype.sticky
	if (DESCRIPTORS$1 && MISSED_STICKY) {
	  defineBuiltInAccessor$1(RegExpPrototype, 'sticky', {
	    configurable: true,
	    get: function sticky() {
	      if (this === RegExpPrototype) return;
	      // We can't use InternalStateModule.getterFor because
	      // we don't add metadata for regexps created by a literal.
	      if (classof$1(this) === 'RegExp') {
	        return !!getInternalState(this).sticky;
	      }
	      throw $TypeError$6('Incompatible receiver, RegExp required');
	    }
	  });
	}

	var $$c = _export;
	var $filter = arrayIteration.filter;
	var arrayMethodHasSpeciesSupport$1 = arrayMethodHasSpeciesSupport$4;

	var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport$1('filter');

	// `Array.prototype.filter` method
	// https://tc39.es/ecma262/#sec-array.prototype.filter
	// with adding support of @@species
	$$c({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT }, {
	  filter: function filter(callbackfn /* , thisArg */) {
	    return $filter(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	/**
	 * --------------------------------------------------------------------------
	 * Bootstrap dom/manipulator.js
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	 * --------------------------------------------------------------------------
	 */

	function normalizeData(value) {
	  if (value === 'true') {
	    return true;
	  }
	  if (value === 'false') {
	    return false;
	  }
	  if (value === Number(value).toString()) {
	    return Number(value);
	  }
	  if (value === '' || value === 'null') {
	    return null;
	  }
	  if (typeof value !== 'string') {
	    return value;
	  }
	  try {
	    return JSON.parse(decodeURIComponent(value));
	  } catch (_unused) {
	    return value;
	  }
	}
	function normalizeDataKey(key) {
	  return key.replace(/[A-Z]/g, function (chr) {
	    return "-" + chr.toLowerCase();
	  });
	}
	var Manipulator = {
	  setDataAttribute: function setDataAttribute(element, key, value) {
	    element.setAttribute("data-bs-" + normalizeDataKey(key), value);
	  },
	  removeDataAttribute: function removeDataAttribute(element, key) {
	    element.removeAttribute("data-bs-" + normalizeDataKey(key));
	  },
	  getDataAttributes: function getDataAttributes(element) {
	    if (!element) {
	      return {};
	    }
	    var attributes = {};
	    var bsKeys = Object.keys(element.dataset).filter(function (key) {
	      return key.startsWith('bs') && !key.startsWith('bsConfig');
	    });
	    for (var _iterator = _createForOfIteratorHelperLoose(bsKeys), _step; !(_step = _iterator()).done;) {
	      var key = _step.value;
	      var pureKey = key.replace(/^bs/, '');
	      pureKey = pureKey.charAt(0).toLowerCase() + pureKey.slice(1, pureKey.length);
	      attributes[pureKey] = normalizeData(element.dataset[key]);
	    }
	    return attributes;
	  },
	  getDataAttribute: function getDataAttribute(element, key) {
	    return normalizeData(element.getAttribute("data-bs-" + normalizeDataKey(key)));
	  }
	};

	/**
	 * Class definition
	 */
	var Config = /*#__PURE__*/function () {
	  function Config() {}
	  var _proto = Config.prototype;
	  _proto._getConfig = function _getConfig(config) {
	    config = this._mergeConfigObj(config);
	    config = this._configAfterMerge(config);
	    this._typeCheckConfig(config);
	    return config;
	  };
	  _proto._configAfterMerge = function _configAfterMerge(config) {
	    return config;
	  };
	  _proto._mergeConfigObj = function _mergeConfigObj(config, element) {
	    var jsonConfig = isElement$1(element) ? Manipulator.getDataAttribute(element, 'config') : {}; // try to parse

	    return Object.assign({}, this.constructor.Default, typeof jsonConfig === 'object' ? jsonConfig : {}, isElement$1(element) ? Manipulator.getDataAttributes(element) : {}, typeof config === 'object' ? config : {});
	  };
	  _proto._typeCheckConfig = function _typeCheckConfig(config, configTypes) {
	    if (configTypes === void 0) {
	      configTypes = this.constructor.DefaultType;
	    }
	    for (var _i = 0, _Object$entries = Object.entries(configTypes); _i < _Object$entries.length; _i++) {
	      var _Object$entries$_i = _Object$entries[_i],
	        property = _Object$entries$_i[0],
	        expectedTypes = _Object$entries$_i[1];
	      var value = config[property];
	      var valueType = isElement$1(value) ? 'element' : toType(value);
	      if (!new RegExp(expectedTypes).test(valueType)) {
	        throw new TypeError(this.constructor.NAME.toUpperCase() + ": Option \"" + property + "\" provided type \"" + valueType + "\" but expected type \"" + expectedTypes + "\".");
	      }
	    }
	  };
	  _createClass(Config, null, [{
	    key: "Default",
	    get:
	    // Getters
	    function get() {
	      return {};
	    }
	  }, {
	    key: "DefaultType",
	    get: function get() {
	      return {};
	    }
	  }, {
	    key: "NAME",
	    get: function get() {
	      throw new Error('You have to implement the static method "NAME", for each component!');
	    }
	  }]);
	  return Config;
	}();

	/**
	 * Constants
	 */

	var VERSION = '5.3.2';

	/**
	 * Class definition
	 */
	var BaseComponent = /*#__PURE__*/function (_Config) {
	  _inheritsLoose(BaseComponent, _Config);
	  function BaseComponent(element, config) {
	    var _this;
	    _this = _Config.call(this) || this;
	    element = getElement(element);
	    if (!element) {
	      return _assertThisInitialized(_this);
	    }
	    _this._element = element;
	    _this._config = _this._getConfig(config);
	    Data.set(_this._element, _this.constructor.DATA_KEY, _assertThisInitialized(_this));
	    return _this;
	  }

	  // Public
	  var _proto = BaseComponent.prototype;
	  _proto.dispose = function dispose() {
	    Data.remove(this._element, this.constructor.DATA_KEY);
	    EventHandler.off(this._element, this.constructor.EVENT_KEY);
	    for (var _iterator = _createForOfIteratorHelperLoose(Object.getOwnPropertyNames(this)), _step; !(_step = _iterator()).done;) {
	      var propertyName = _step.value;
	      this[propertyName] = null;
	    }
	  };
	  _proto._queueCallback = function _queueCallback(callback, element, isAnimated) {
	    if (isAnimated === void 0) {
	      isAnimated = true;
	    }
	    executeAfterTransition(callback, element, isAnimated);
	  };
	  _proto._getConfig = function _getConfig(config) {
	    config = this._mergeConfigObj(config, this._element);
	    config = this._configAfterMerge(config);
	    this._typeCheckConfig(config);
	    return config;
	  }

	  // Static
	  ;
	  BaseComponent.getInstance = function getInstance(element) {
	    return Data.get(getElement(element), this.DATA_KEY);
	  };
	  BaseComponent.getOrCreateInstance = function getOrCreateInstance(element, config) {
	    if (config === void 0) {
	      config = {};
	    }
	    return this.getInstance(element) || new this(element, typeof config === 'object' ? config : null);
	  };
	  BaseComponent.eventName = function eventName(name) {
	    return "" + name + this.EVENT_KEY;
	  };
	  _createClass(BaseComponent, null, [{
	    key: "VERSION",
	    get: function get() {
	      return VERSION;
	    }
	  }, {
	    key: "DATA_KEY",
	    get: function get() {
	      return "bs." + this.NAME;
	    }
	  }, {
	    key: "EVENT_KEY",
	    get: function get() {
	      return "." + this.DATA_KEY;
	    }
	  }]);
	  return BaseComponent;
	}(Config);

	var PROPER_FUNCTION_NAME = functionName.PROPER;
	var fails$4 = fails$A;
	var whitespaces$1 = whitespaces$4;

	var non = '\u200B\u0085\u180E';

	// check that a method works with the correct list
	// of whitespaces and has a correct name
	var stringTrimForced = function (METHOD_NAME) {
	  return fails$4(function () {
	    return !!whitespaces$1[METHOD_NAME]()
	      || non[METHOD_NAME]() !== non
	      || (PROPER_FUNCTION_NAME && whitespaces$1[METHOD_NAME].name !== METHOD_NAME);
	  });
	};

	var $$b = _export;
	var $trim = stringTrim.trim;
	var forcedStringTrimMethod = stringTrimForced;

	// `String.prototype.trim` method
	// https://tc39.es/ecma262/#sec-string.prototype.trim
	$$b({ target: 'String', proto: true, forced: forcedStringTrimMethod('trim') }, {
	  trim: function trim() {
	    return $trim(this);
	  }
	});

	var $TypeError$5 = TypeError;
	var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF; // 2 ** 53 - 1 == 9007199254740991

	var doesNotExceedSafeInteger$1 = function (it) {
	  if (it > MAX_SAFE_INTEGER) throw $TypeError$5('Maximum allowed index exceeded');
	  return it;
	};

	var $$a = _export;
	var fails$3 = fails$A;
	var isArray = isArray$3;
	var isObject$2 = isObject$g;
	var toObject$2 = toObject$a;
	var lengthOfArrayLike$2 = lengthOfArrayLike$9;
	var doesNotExceedSafeInteger = doesNotExceedSafeInteger$1;
	var createProperty = createProperty$4;
	var arraySpeciesCreate = arraySpeciesCreate$2;
	var arrayMethodHasSpeciesSupport = arrayMethodHasSpeciesSupport$4;
	var wellKnownSymbol$2 = wellKnownSymbol$n;
	var V8_VERSION$1 = engineV8Version;

	var IS_CONCAT_SPREADABLE = wellKnownSymbol$2('isConcatSpreadable');

	// We can't use this feature detection in V8 since it causes
	// deoptimization and serious performance degradation
	// https://github.com/zloirock/core-js/issues/679
	var IS_CONCAT_SPREADABLE_SUPPORT = V8_VERSION$1 >= 51 || !fails$3(function () {
	  var array = [];
	  array[IS_CONCAT_SPREADABLE] = false;
	  return array.concat()[0] !== array;
	});

	var isConcatSpreadable = function (O) {
	  if (!isObject$2(O)) return false;
	  var spreadable = O[IS_CONCAT_SPREADABLE];
	  return spreadable !== undefined ? !!spreadable : isArray(O);
	};

	var FORCED$4 = !IS_CONCAT_SPREADABLE_SUPPORT || !arrayMethodHasSpeciesSupport('concat');

	// `Array.prototype.concat` method
	// https://tc39.es/ecma262/#sec-array.prototype.concat
	// with adding support of @@isConcatSpreadable and @@species
	$$a({ target: 'Array', proto: true, arity: 1, forced: FORCED$4 }, {
	  // eslint-disable-next-line no-unused-vars -- required for `.length`
	  concat: function concat(arg) {
	    var O = toObject$2(this);
	    var A = arraySpeciesCreate(O, 0);
	    var n = 0;
	    var i, k, length, len, E;
	    for (i = -1, length = arguments.length; i < length; i++) {
	      E = i === -1 ? O : arguments[i];
	      if (isConcatSpreadable(E)) {
	        len = lengthOfArrayLike$2(E);
	        doesNotExceedSafeInteger(n + len);
	        for (k = 0; k < len; k++, n++) if (k in E) createProperty(A, n, E[k]);
	      } else {
	        doesNotExceedSafeInteger(n + 1);
	        createProperty(A, n++, E);
	      }
	    }
	    A.length = n;
	    return A;
	  }
	});

	var $$9 = _export;
	var uncurryThis$3 = functionUncurryThis;
	var IndexedObject$1 = indexedObject;
	var toIndexedObject = toIndexedObject$9;
	var arrayMethodIsStrict$2 = arrayMethodIsStrict$4;

	var nativeJoin = uncurryThis$3([].join);

	var ES3_STRINGS = IndexedObject$1 !== Object;
	var FORCED$3 = ES3_STRINGS || !arrayMethodIsStrict$2('join', ',');

	// `Array.prototype.join` method
	// https://tc39.es/ecma262/#sec-array.prototype.join
	$$9({ target: 'Array', proto: true, forced: FORCED$3 }, {
	  join: function join(separator) {
	    return nativeJoin(toIndexedObject(this), separator === undefined ? ',' : separator);
	  }
	});

	var getSelector = function getSelector(element) {
	  var selector = element.getAttribute('data-bs-target');
	  if (!selector || selector === '#') {
	    var hrefAttribute = element.getAttribute('href');

	    // The only valid content that could double as a selector are IDs or classes,
	    // so everything starting with `#` or `.`. If a "real" URL is used as the selector,
	    // `document.querySelector` will rightfully complain it is invalid.
	    // See https://github.com/twbs/bootstrap/issues/32273
	    if (!hrefAttribute || !hrefAttribute.includes('#') && !hrefAttribute.startsWith('.')) {
	      return null;
	    }

	    // Just in case some CMS puts out a full URL with the anchor appended
	    if (hrefAttribute.includes('#') && !hrefAttribute.startsWith('#')) {
	      hrefAttribute = "#" + hrefAttribute.split('#')[1];
	    }
	    selector = hrefAttribute && hrefAttribute !== '#' ? parseSelector(hrefAttribute.trim()) : null;
	  }
	  return selector;
	};
	var SelectorEngine = {
	  find: function find(selector, element) {
	    var _ref;
	    if (element === void 0) {
	      element = document.documentElement;
	    }
	    return (_ref = []).concat.apply(_ref, Element.prototype.querySelectorAll.call(element, selector));
	  },
	  findOne: function findOne(selector, element) {
	    if (element === void 0) {
	      element = document.documentElement;
	    }
	    return Element.prototype.querySelector.call(element, selector);
	  },
	  children: function children(element, selector) {
	    var _ref2;
	    return (_ref2 = []).concat.apply(_ref2, element.children).filter(function (child) {
	      return child.matches(selector);
	    });
	  },
	  parents: function parents(element, selector) {
	    var parents = [];
	    var ancestor = element.parentNode.closest(selector);
	    while (ancestor) {
	      parents.push(ancestor);
	      ancestor = ancestor.parentNode.closest(selector);
	    }
	    return parents;
	  },
	  prev: function prev(element, selector) {
	    var previous = element.previousElementSibling;
	    while (previous) {
	      if (previous.matches(selector)) {
	        return [previous];
	      }
	      previous = previous.previousElementSibling;
	    }
	    return [];
	  },
	  // TODO: this is now unused; remove later along with prev()
	  next: function next(element, selector) {
	    var next = element.nextElementSibling;
	    while (next) {
	      if (next.matches(selector)) {
	        return [next];
	      }
	      next = next.nextElementSibling;
	    }
	    return [];
	  },
	  focusableChildren: function focusableChildren(element) {
	    var focusables = ['a', 'button', 'input', 'textarea', 'select', 'details', '[tabindex]', '[contenteditable="true"]'].map(function (selector) {
	      return selector + ":not([tabindex^=\"-\"])";
	    }).join(',');
	    return this.find(focusables, element).filter(function (el) {
	      return !isDisabled(el) && isVisible(el);
	    });
	  },
	  getSelectorFromElement: function getSelectorFromElement(element) {
	    var selector = getSelector(element);
	    if (selector) {
	      return SelectorEngine.findOne(selector) ? selector : null;
	    }
	    return null;
	  },
	  getElementFromSelector: function getElementFromSelector(element) {
	    var selector = getSelector(element);
	    return selector ? SelectorEngine.findOne(selector) : null;
	  },
	  getMultipleElementsFromSelector: function getMultipleElementsFromSelector(element) {
	    var selector = getSelector(element);
	    return selector ? SelectorEngine.find(selector) : [];
	  }
	};

	var enableDismissTrigger = function enableDismissTrigger(component, method) {
	  if (method === void 0) {
	    method = 'hide';
	  }
	  var clickEvent = "click.dismiss" + component.EVENT_KEY;
	  var name = component.NAME;
	  EventHandler.on(document, clickEvent, "[data-bs-dismiss=\"" + name + "\"]", function (event) {
	    if (['A', 'AREA'].includes(this.tagName)) {
	      event.preventDefault();
	    }
	    if (isDisabled(this)) {
	      return;
	    }
	    var target = SelectorEngine.getElementFromSelector(this) || this.closest("." + name);
	    var instance = component.getOrCreateInstance(target);

	    // Method argument is left, for Alert and only, as it doesn't implement the 'hide' method
	    instance[method]();
	  });
	};

	/**
	 * Constants
	 */

	var NAME$g = 'alert';
	var DATA_KEY$a = 'bs.alert';
	var EVENT_KEY$b = "." + DATA_KEY$a;
	var EVENT_CLOSE = "close" + EVENT_KEY$b;
	var EVENT_CLOSED = "closed" + EVENT_KEY$b;
	var CLASS_NAME_FADE$5 = 'fade';
	var CLASS_NAME_SHOW$8 = 'show';

	/**
	 * Class definition
	 */
	var Alert = /*#__PURE__*/function (_BaseComponent) {
	  _inheritsLoose(Alert, _BaseComponent);
	  function Alert() {
	    return _BaseComponent.apply(this, arguments) || this;
	  }
	  var _proto = Alert.prototype;
	  // Public
	  _proto.close = function close() {
	    var _this = this;
	    var closeEvent = EventHandler.trigger(this._element, EVENT_CLOSE);
	    if (closeEvent.defaultPrevented) {
	      return;
	    }
	    this._element.classList.remove(CLASS_NAME_SHOW$8);
	    var isAnimated = this._element.classList.contains(CLASS_NAME_FADE$5);
	    this._queueCallback(function () {
	      return _this._destroyElement();
	    }, this._element, isAnimated);
	  }

	  // Private
	  ;
	  _proto._destroyElement = function _destroyElement() {
	    this._element.remove();
	    EventHandler.trigger(this._element, EVENT_CLOSED);
	    this.dispose();
	  }

	  // Static
	  ;
	  Alert.jQueryInterface = function jQueryInterface(config) {
	    return this.each(function () {
	      var data = Alert.getOrCreateInstance(this);
	      if (typeof config !== 'string') {
	        return;
	      }
	      if (data[config] === undefined || config.startsWith('_') || config === 'constructor') {
	        throw new TypeError("No method named \"" + config + "\"");
	      }
	      data[config](this);
	    });
	  };
	  _createClass(Alert, null, [{
	    key: "NAME",
	    get:
	    // Getters
	    function get() {
	      return NAME$g;
	    }
	  }]);
	  return Alert;
	}(BaseComponent);
	/**
	 * Data API implementation
	 */
	enableDismissTrigger(Alert, 'close');

	/**
	 * jQuery
	 */

	defineJQueryPlugin(Alert);

	window.bootstrap = window.bootstrap || {};
	window.bootstrap.Alert = Alert;
	if (Joomla && Joomla.getOptions) {
	  // Get the elements/configurations from the PHP
	  var alerts = Joomla.getOptions('bootstrap.alert');
	  // Initialise the elements
	  if (alerts && alerts.length) {
	    alerts.forEach(function (selector) {
	      Array.from(document.querySelectorAll(selector)).map(function (el) {
	        return new window.bootstrap.Alert(el);
	      });
	    });
	  }
	}

	/**
	 * Constants
	 */

	var NAME$f = 'button';
	var DATA_KEY$9 = 'bs.button';
	var EVENT_KEY$a = "." + DATA_KEY$9;
	var DATA_API_KEY$6 = '.data-api';
	var CLASS_NAME_ACTIVE$3 = 'active';
	var SELECTOR_DATA_TOGGLE$5 = '[data-bs-toggle="button"]';
	var EVENT_CLICK_DATA_API$6 = "click" + EVENT_KEY$a + DATA_API_KEY$6;

	/**
	 * Class definition
	 */
	var Button = /*#__PURE__*/function (_BaseComponent) {
	  _inheritsLoose(Button, _BaseComponent);
	  function Button() {
	    return _BaseComponent.apply(this, arguments) || this;
	  }
	  var _proto = Button.prototype;
	  // Public
	  _proto.toggle = function toggle() {
	    // Toggle class and sync the `aria-pressed` attribute with the return value of the `.toggle()` method
	    this._element.setAttribute('aria-pressed', this._element.classList.toggle(CLASS_NAME_ACTIVE$3));
	  }

	  // Static
	  ;
	  Button.jQueryInterface = function jQueryInterface(config) {
	    return this.each(function () {
	      var data = Button.getOrCreateInstance(this);
	      if (config === 'toggle') {
	        data[config]();
	      }
	    });
	  };
	  _createClass(Button, null, [{
	    key: "NAME",
	    get:
	    // Getters
	    function get() {
	      return NAME$f;
	    }
	  }]);
	  return Button;
	}(BaseComponent);
	/**
	 * Data API implementation
	 */
	EventHandler.on(document, EVENT_CLICK_DATA_API$6, SELECTOR_DATA_TOGGLE$5, function (event) {
	  event.preventDefault();
	  var button = event.target.closest(SELECTOR_DATA_TOGGLE$5);
	  var data = Button.getOrCreateInstance(button);
	  data.toggle();
	});

	/**
	 * jQuery
	 */

	defineJQueryPlugin(Button);

	window.bootstrap = window.bootstrap || {};
	window.bootstrap.Button = Button;
	if (Joomla && Joomla.getOptions) {
	  // Get the elements/configurations from the PHP
	  var buttons = Joomla.getOptions('bootstrap.button');
	  // Initialise the elements
	  if (buttons && buttons.length) {
	    buttons.forEach(function (selector) {
	      Array.from(document.querySelectorAll(selector)).map(function (el) {
	        return new window.bootstrap.Button(el);
	      });
	    });
	  }
	}

	/**
	 * Constants
	 */

	var NAME$e = 'collapse';
	var DATA_KEY$8 = 'bs.collapse';
	var EVENT_KEY$9 = "." + DATA_KEY$8;
	var DATA_API_KEY$5 = '.data-api';
	var EVENT_SHOW$6 = "show" + EVENT_KEY$9;
	var EVENT_SHOWN$6 = "shown" + EVENT_KEY$9;
	var EVENT_HIDE$6 = "hide" + EVENT_KEY$9;
	var EVENT_HIDDEN$6 = "hidden" + EVENT_KEY$9;
	var EVENT_CLICK_DATA_API$5 = "click" + EVENT_KEY$9 + DATA_API_KEY$5;
	var CLASS_NAME_SHOW$7 = 'show';
	var CLASS_NAME_COLLAPSE = 'collapse';
	var CLASS_NAME_COLLAPSING = 'collapsing';
	var CLASS_NAME_COLLAPSED = 'collapsed';
	var CLASS_NAME_DEEPER_CHILDREN = ":scope ." + CLASS_NAME_COLLAPSE + " ." + CLASS_NAME_COLLAPSE;
	var CLASS_NAME_HORIZONTAL = 'collapse-horizontal';
	var WIDTH = 'width';
	var HEIGHT = 'height';
	var SELECTOR_ACTIVES = '.collapse.show, .collapse.collapsing';
	var SELECTOR_DATA_TOGGLE$4 = '[data-bs-toggle="collapse"]';
	var Default$c = {
	  parent: null,
	  toggle: true
	};
	var DefaultType$c = {
	  parent: '(null|element)',
	  toggle: 'boolean'
	};

	/**
	 * Class definition
	 */
	var Collapse = /*#__PURE__*/function (_BaseComponent) {
	  _inheritsLoose(Collapse, _BaseComponent);
	  function Collapse(element, config) {
	    var _this;
	    _this = _BaseComponent.call(this, element, config) || this;
	    _this._isTransitioning = false;
	    _this._triggerArray = [];
	    var toggleList = SelectorEngine.find(SELECTOR_DATA_TOGGLE$4);
	    for (var _iterator = _createForOfIteratorHelperLoose(toggleList), _step; !(_step = _iterator()).done;) {
	      var elem = _step.value;
	      var selector = SelectorEngine.getSelectorFromElement(elem);
	      var filterElement = SelectorEngine.find(selector).filter(function (foundElement) {
	        return foundElement === _this._element;
	      });
	      if (selector !== null && filterElement.length) {
	        _this._triggerArray.push(elem);
	      }
	    }
	    _this._initializeChildren();
	    if (!_this._config.parent) {
	      _this._addAriaAndCollapsedClass(_this._triggerArray, _this._isShown());
	    }
	    if (_this._config.toggle) {
	      _this.toggle();
	    }
	    return _this;
	  }

	  // Getters
	  var _proto = Collapse.prototype;
	  // Public
	  _proto.toggle = function toggle() {
	    if (this._isShown()) {
	      this.hide();
	    } else {
	      this.show();
	    }
	  };
	  _proto.show = function show() {
	    var _this2 = this;
	    if (this._isTransitioning || this._isShown()) {
	      return;
	    }
	    var activeChildren = [];

	    // find active children
	    if (this._config.parent) {
	      activeChildren = this._getFirstLevelChildren(SELECTOR_ACTIVES).filter(function (element) {
	        return element !== _this2._element;
	      }).map(function (element) {
	        return Collapse.getOrCreateInstance(element, {
	          toggle: false
	        });
	      });
	    }
	    if (activeChildren.length && activeChildren[0]._isTransitioning) {
	      return;
	    }
	    var startEvent = EventHandler.trigger(this._element, EVENT_SHOW$6);
	    if (startEvent.defaultPrevented) {
	      return;
	    }
	    for (var _iterator2 = _createForOfIteratorHelperLoose(activeChildren), _step2; !(_step2 = _iterator2()).done;) {
	      var activeInstance = _step2.value;
	      activeInstance.hide();
	    }
	    var dimension = this._getDimension();
	    this._element.classList.remove(CLASS_NAME_COLLAPSE);
	    this._element.classList.add(CLASS_NAME_COLLAPSING);
	    this._element.style[dimension] = 0;
	    this._addAriaAndCollapsedClass(this._triggerArray, true);
	    this._isTransitioning = true;
	    var complete = function complete() {
	      _this2._isTransitioning = false;
	      _this2._element.classList.remove(CLASS_NAME_COLLAPSING);
	      _this2._element.classList.add(CLASS_NAME_COLLAPSE, CLASS_NAME_SHOW$7);
	      _this2._element.style[dimension] = '';
	      EventHandler.trigger(_this2._element, EVENT_SHOWN$6);
	    };
	    var capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1);
	    var scrollSize = "scroll" + capitalizedDimension;
	    this._queueCallback(complete, this._element, true);
	    this._element.style[dimension] = this._element[scrollSize] + "px";
	  };
	  _proto.hide = function hide() {
	    var _this3 = this;
	    if (this._isTransitioning || !this._isShown()) {
	      return;
	    }
	    var startEvent = EventHandler.trigger(this._element, EVENT_HIDE$6);
	    if (startEvent.defaultPrevented) {
	      return;
	    }
	    var dimension = this._getDimension();
	    this._element.style[dimension] = this._element.getBoundingClientRect()[dimension] + "px";
	    reflow(this._element);
	    this._element.classList.add(CLASS_NAME_COLLAPSING);
	    this._element.classList.remove(CLASS_NAME_COLLAPSE, CLASS_NAME_SHOW$7);
	    for (var _iterator3 = _createForOfIteratorHelperLoose(this._triggerArray), _step3; !(_step3 = _iterator3()).done;) {
	      var trigger = _step3.value;
	      var element = SelectorEngine.getElementFromSelector(trigger);
	      if (element && !this._isShown(element)) {
	        this._addAriaAndCollapsedClass([trigger], false);
	      }
	    }
	    this._isTransitioning = true;
	    var complete = function complete() {
	      _this3._isTransitioning = false;
	      _this3._element.classList.remove(CLASS_NAME_COLLAPSING);
	      _this3._element.classList.add(CLASS_NAME_COLLAPSE);
	      EventHandler.trigger(_this3._element, EVENT_HIDDEN$6);
	    };
	    this._element.style[dimension] = '';
	    this._queueCallback(complete, this._element, true);
	  };
	  _proto._isShown = function _isShown(element) {
	    if (element === void 0) {
	      element = this._element;
	    }
	    return element.classList.contains(CLASS_NAME_SHOW$7);
	  }

	  // Private
	  ;
	  _proto._configAfterMerge = function _configAfterMerge(config) {
	    config.toggle = Boolean(config.toggle); // Coerce string values
	    config.parent = getElement(config.parent);
	    return config;
	  };
	  _proto._getDimension = function _getDimension() {
	    return this._element.classList.contains(CLASS_NAME_HORIZONTAL) ? WIDTH : HEIGHT;
	  };
	  _proto._initializeChildren = function _initializeChildren() {
	    if (!this._config.parent) {
	      return;
	    }
	    var children = this._getFirstLevelChildren(SELECTOR_DATA_TOGGLE$4);
	    for (var _iterator4 = _createForOfIteratorHelperLoose(children), _step4; !(_step4 = _iterator4()).done;) {
	      var element = _step4.value;
	      var selected = SelectorEngine.getElementFromSelector(element);
	      if (selected) {
	        this._addAriaAndCollapsedClass([element], this._isShown(selected));
	      }
	    }
	  };
	  _proto._getFirstLevelChildren = function _getFirstLevelChildren(selector) {
	    var children = SelectorEngine.find(CLASS_NAME_DEEPER_CHILDREN, this._config.parent);
	    // remove children if greater depth
	    return SelectorEngine.find(selector, this._config.parent).filter(function (element) {
	      return !children.includes(element);
	    });
	  };
	  _proto._addAriaAndCollapsedClass = function _addAriaAndCollapsedClass(triggerArray, isOpen) {
	    if (!triggerArray.length) {
	      return;
	    }
	    for (var _iterator5 = _createForOfIteratorHelperLoose(triggerArray), _step5; !(_step5 = _iterator5()).done;) {
	      var element = _step5.value;
	      element.classList.toggle(CLASS_NAME_COLLAPSED, !isOpen);
	      element.setAttribute('aria-expanded', isOpen);
	    }
	  }

	  // Static
	  ;
	  Collapse.jQueryInterface = function jQueryInterface(config) {
	    var _config = {};
	    if (typeof config === 'string' && /show|hide/.test(config)) {
	      _config.toggle = false;
	    }
	    return this.each(function () {
	      var data = Collapse.getOrCreateInstance(this, _config);
	      if (typeof config === 'string') {
	        if (typeof data[config] === 'undefined') {
	          throw new TypeError("No method named \"" + config + "\"");
	        }
	        data[config]();
	      }
	    });
	  };
	  _createClass(Collapse, null, [{
	    key: "Default",
	    get: function get() {
	      return Default$c;
	    }
	  }, {
	    key: "DefaultType",
	    get: function get() {
	      return DefaultType$c;
	    }
	  }, {
	    key: "NAME",
	    get: function get() {
	      return NAME$e;
	    }
	  }]);
	  return Collapse;
	}(BaseComponent);
	/**
	 * Data API implementation
	 */
	EventHandler.on(document, EVENT_CLICK_DATA_API$5, SELECTOR_DATA_TOGGLE$4, function (event) {
	  // preventDefault only for <a> elements (which change the URL) not inside the collapsible element
	  if (event.target.tagName === 'A' || event.delegateTarget && event.delegateTarget.tagName === 'A') {
	    event.preventDefault();
	  }
	  for (var _iterator6 = _createForOfIteratorHelperLoose(SelectorEngine.getMultipleElementsFromSelector(this)), _step6; !(_step6 = _iterator6()).done;) {
	    var element = _step6.value;
	    Collapse.getOrCreateInstance(element, {
	      toggle: false
	    }).toggle();
	  }
	});

	/**
	 * jQuery
	 */

	defineJQueryPlugin(Collapse);

	window.bootstrap = window.bootstrap || {};
	window.bootstrap.Collapse = Collapse;
	if (Joomla && Joomla.getOptions) {
	  // Get the elements/configurations from the PHP
	  var collapses = Object.assign({}, Joomla.getOptions('bootstrap.collapse'), Joomla.getOptions('bootstrap.accordion'));
	  // Initialise the elements
	  Object.keys(collapses).forEach(function (collapse) {
	    var opt = collapses[collapse];
	    var options = {
	      toggle: opt.toggle ? opt.toggle : true
	    };
	    if (opt.parent) {
	      options.parent = opt.parent;
	    }
	    var elements = Array.from(document.querySelectorAll(collapse));
	    if (elements.length) {
	      elements.map(function (el) {
	        return new window.bootstrap.Collapse(el, options);
	      });
	    }
	  });
	}

	var global$7 = global$s;
	var fails$2 = fails$A;
	var uncurryThis$2 = functionUncurryThis;
	var toString$1 = toString$d;
	var trim = stringTrim.trim;
	var whitespaces = whitespaces$4;

	var $parseInt = global$7.parseInt;
	var Symbol$1 = global$7.Symbol;
	var ITERATOR = Symbol$1 && Symbol$1.iterator;
	var hex = /^[+-]?0x/i;
	var exec = uncurryThis$2(hex.exec);
	var FORCED$2 = $parseInt(whitespaces + '08') !== 8 || $parseInt(whitespaces + '0x16') !== 22
	  // MS Edge 18- broken with boxed symbols
	  || (ITERATOR && !fails$2(function () { $parseInt(Object(ITERATOR)); }));

	// `parseInt` method
	// https://tc39.es/ecma262/#sec-parseint-string-radix
	var numberParseInt = FORCED$2 ? function parseInt(string, radix) {
	  var S = trim(toString$1(string));
	  return $parseInt(S, (radix >>> 0) || (exec(hex, S) ? 16 : 10));
	} : $parseInt;

	var $$8 = _export;
	var parseInt$1 = numberParseInt;

	// `Number.parseInt` method
	// https://tc39.es/ecma262/#sec-number.parseint
	// eslint-disable-next-line es/no-number-parseint -- required for testing
	$$8({ target: 'Number', stat: true, forced: Number.parseInt !== parseInt$1 }, {
	  parseInt: parseInt$1
	});

	/**
	 * Constants
	 */

	var NAME$d = 'swipe';
	var EVENT_KEY$8 = '.bs.swipe';
	var EVENT_TOUCHSTART = "touchstart" + EVENT_KEY$8;
	var EVENT_TOUCHMOVE = "touchmove" + EVENT_KEY$8;
	var EVENT_TOUCHEND = "touchend" + EVENT_KEY$8;
	var EVENT_POINTERDOWN = "pointerdown" + EVENT_KEY$8;
	var EVENT_POINTERUP = "pointerup" + EVENT_KEY$8;
	var POINTER_TYPE_TOUCH = 'touch';
	var POINTER_TYPE_PEN = 'pen';
	var CLASS_NAME_POINTER_EVENT = 'pointer-event';
	var SWIPE_THRESHOLD = 40;
	var Default$b = {
	  endCallback: null,
	  leftCallback: null,
	  rightCallback: null
	};
	var DefaultType$b = {
	  endCallback: '(function|null)',
	  leftCallback: '(function|null)',
	  rightCallback: '(function|null)'
	};

	/**
	 * Class definition
	 */
	var Swipe = /*#__PURE__*/function (_Config) {
	  _inheritsLoose(Swipe, _Config);
	  function Swipe(element, config) {
	    var _this;
	    _this = _Config.call(this) || this;
	    _this._element = element;
	    if (!element || !Swipe.isSupported()) {
	      return _assertThisInitialized(_this);
	    }
	    _this._config = _this._getConfig(config);
	    _this._deltaX = 0;
	    _this._supportPointerEvents = Boolean(window.PointerEvent);
	    _this._initEvents();
	    return _this;
	  }

	  // Getters
	  var _proto = Swipe.prototype;
	  // Public
	  _proto.dispose = function dispose() {
	    EventHandler.off(this._element, EVENT_KEY$8);
	  }

	  // Private
	  ;
	  _proto._start = function _start(event) {
	    if (!this._supportPointerEvents) {
	      this._deltaX = event.touches[0].clientX;
	      return;
	    }
	    if (this._eventIsPointerPenTouch(event)) {
	      this._deltaX = event.clientX;
	    }
	  };
	  _proto._end = function _end(event) {
	    if (this._eventIsPointerPenTouch(event)) {
	      this._deltaX = event.clientX - this._deltaX;
	    }
	    this._handleSwipe();
	    execute(this._config.endCallback);
	  };
	  _proto._move = function _move(event) {
	    this._deltaX = event.touches && event.touches.length > 1 ? 0 : event.touches[0].clientX - this._deltaX;
	  };
	  _proto._handleSwipe = function _handleSwipe() {
	    var absDeltaX = Math.abs(this._deltaX);
	    if (absDeltaX <= SWIPE_THRESHOLD) {
	      return;
	    }
	    var direction = absDeltaX / this._deltaX;
	    this._deltaX = 0;
	    if (!direction) {
	      return;
	    }
	    execute(direction > 0 ? this._config.rightCallback : this._config.leftCallback);
	  };
	  _proto._initEvents = function _initEvents() {
	    var _this2 = this;
	    if (this._supportPointerEvents) {
	      EventHandler.on(this._element, EVENT_POINTERDOWN, function (event) {
	        return _this2._start(event);
	      });
	      EventHandler.on(this._element, EVENT_POINTERUP, function (event) {
	        return _this2._end(event);
	      });
	      this._element.classList.add(CLASS_NAME_POINTER_EVENT);
	    } else {
	      EventHandler.on(this._element, EVENT_TOUCHSTART, function (event) {
	        return _this2._start(event);
	      });
	      EventHandler.on(this._element, EVENT_TOUCHMOVE, function (event) {
	        return _this2._move(event);
	      });
	      EventHandler.on(this._element, EVENT_TOUCHEND, function (event) {
	        return _this2._end(event);
	      });
	    }
	  };
	  _proto._eventIsPointerPenTouch = function _eventIsPointerPenTouch(event) {
	    return this._supportPointerEvents && (event.pointerType === POINTER_TYPE_PEN || event.pointerType === POINTER_TYPE_TOUCH);
	  }

	  // Static
	  ;
	  Swipe.isSupported = function isSupported() {
	    return 'ontouchstart' in document.documentElement || navigator.maxTouchPoints > 0;
	  };
	  _createClass(Swipe, null, [{
	    key: "Default",
	    get: function get() {
	      return Default$b;
	    }
	  }, {
	    key: "DefaultType",
	    get: function get() {
	      return DefaultType$b;
	    }
	  }, {
	    key: "NAME",
	    get: function get() {
	      return NAME$d;
	    }
	  }]);
	  return Swipe;
	}(Config);

	var _KEY_TO_DIRECTION;

	/**
	 * Constants
	 */

	var NAME$c = 'carousel';
	var DATA_KEY$7 = 'bs.carousel';
	var EVENT_KEY$7 = "." + DATA_KEY$7;
	var DATA_API_KEY$4 = '.data-api';
	var ARROW_LEFT_KEY$1 = 'ArrowLeft';
	var ARROW_RIGHT_KEY$1 = 'ArrowRight';
	var TOUCHEVENT_COMPAT_WAIT = 500; // Time for mouse compat events to fire after touch

	var ORDER_NEXT = 'next';
	var ORDER_PREV = 'prev';
	var DIRECTION_LEFT = 'left';
	var DIRECTION_RIGHT = 'right';
	var EVENT_SLIDE = "slide" + EVENT_KEY$7;
	var EVENT_SLID = "slid" + EVENT_KEY$7;
	var EVENT_KEYDOWN$1 = "keydown" + EVENT_KEY$7;
	var EVENT_MOUSEENTER$1 = "mouseenter" + EVENT_KEY$7;
	var EVENT_MOUSELEAVE$1 = "mouseleave" + EVENT_KEY$7;
	var EVENT_DRAG_START = "dragstart" + EVENT_KEY$7;
	var EVENT_LOAD_DATA_API$3 = "load" + EVENT_KEY$7 + DATA_API_KEY$4;
	var EVENT_CLICK_DATA_API$4 = "click" + EVENT_KEY$7 + DATA_API_KEY$4;
	var CLASS_NAME_CAROUSEL = 'carousel';
	var CLASS_NAME_ACTIVE$2 = 'active';
	var CLASS_NAME_SLIDE = 'slide';
	var CLASS_NAME_END = 'carousel-item-end';
	var CLASS_NAME_START = 'carousel-item-start';
	var CLASS_NAME_NEXT = 'carousel-item-next';
	var CLASS_NAME_PREV = 'carousel-item-prev';
	var SELECTOR_ACTIVE = '.active';
	var SELECTOR_ITEM = '.carousel-item';
	var SELECTOR_ACTIVE_ITEM = SELECTOR_ACTIVE + SELECTOR_ITEM;
	var SELECTOR_ITEM_IMG = '.carousel-item img';
	var SELECTOR_INDICATORS = '.carousel-indicators';
	var SELECTOR_DATA_SLIDE = '[data-bs-slide], [data-bs-slide-to]';
	var SELECTOR_DATA_RIDE = '[data-bs-ride="carousel"]';
	var KEY_TO_DIRECTION = (_KEY_TO_DIRECTION = {}, _KEY_TO_DIRECTION[ARROW_LEFT_KEY$1] = DIRECTION_RIGHT, _KEY_TO_DIRECTION[ARROW_RIGHT_KEY$1] = DIRECTION_LEFT, _KEY_TO_DIRECTION);
	var Default$a = {
	  interval: 5000,
	  keyboard: true,
	  pause: 'hover',
	  ride: false,
	  touch: true,
	  wrap: true
	};
	var DefaultType$a = {
	  interval: '(number|boolean)',
	  // TODO:v6 remove boolean support
	  keyboard: 'boolean',
	  pause: '(string|boolean)',
	  ride: '(boolean|string)',
	  touch: 'boolean',
	  wrap: 'boolean'
	};

	/**
	 * Class definition
	 */
	var Carousel = /*#__PURE__*/function (_BaseComponent) {
	  _inheritsLoose(Carousel, _BaseComponent);
	  function Carousel(element, config) {
	    var _this;
	    _this = _BaseComponent.call(this, element, config) || this;
	    _this._interval = null;
	    _this._activeElement = null;
	    _this._isSliding = false;
	    _this.touchTimeout = null;
	    _this._swipeHelper = null;
	    _this._indicatorsElement = SelectorEngine.findOne(SELECTOR_INDICATORS, _this._element);
	    _this._addEventListeners();
	    if (_this._config.ride === CLASS_NAME_CAROUSEL) {
	      _this.cycle();
	    }
	    return _this;
	  }

	  // Getters
	  var _proto = Carousel.prototype;
	  // Public
	  _proto.next = function next() {
	    this._slide(ORDER_NEXT);
	  };
	  _proto.nextWhenVisible = function nextWhenVisible() {
	    // FIXME TODO use `document.visibilityState`
	    // Don't call next when the page isn't visible
	    // or the carousel or its parent isn't visible
	    if (!document.hidden && isVisible(this._element)) {
	      this.next();
	    }
	  };
	  _proto.prev = function prev() {
	    this._slide(ORDER_PREV);
	  };
	  _proto.pause = function pause() {
	    if (this._isSliding) {
	      triggerTransitionEnd(this._element);
	    }
	    this._clearInterval();
	  };
	  _proto.cycle = function cycle() {
	    var _this2 = this;
	    this._clearInterval();
	    this._updateInterval();
	    this._interval = setInterval(function () {
	      return _this2.nextWhenVisible();
	    }, this._config.interval);
	  };
	  _proto._maybeEnableCycle = function _maybeEnableCycle() {
	    var _this3 = this;
	    if (!this._config.ride) {
	      return;
	    }
	    if (this._isSliding) {
	      EventHandler.one(this._element, EVENT_SLID, function () {
	        return _this3.cycle();
	      });
	      return;
	    }
	    this.cycle();
	  };
	  _proto.to = function to(index) {
	    var _this4 = this;
	    var items = this._getItems();
	    if (index > items.length - 1 || index < 0) {
	      return;
	    }
	    if (this._isSliding) {
	      EventHandler.one(this._element, EVENT_SLID, function () {
	        return _this4.to(index);
	      });
	      return;
	    }
	    var activeIndex = this._getItemIndex(this._getActive());
	    if (activeIndex === index) {
	      return;
	    }
	    var order = index > activeIndex ? ORDER_NEXT : ORDER_PREV;
	    this._slide(order, items[index]);
	  };
	  _proto.dispose = function dispose() {
	    if (this._swipeHelper) {
	      this._swipeHelper.dispose();
	    }
	    _BaseComponent.prototype.dispose.call(this);
	  }

	  // Private
	  ;
	  _proto._configAfterMerge = function _configAfterMerge(config) {
	    config.defaultInterval = config.interval;
	    return config;
	  };
	  _proto._addEventListeners = function _addEventListeners() {
	    var _this5 = this;
	    if (this._config.keyboard) {
	      EventHandler.on(this._element, EVENT_KEYDOWN$1, function (event) {
	        return _this5._keydown(event);
	      });
	    }
	    if (this._config.pause === 'hover') {
	      EventHandler.on(this._element, EVENT_MOUSEENTER$1, function () {
	        return _this5.pause();
	      });
	      EventHandler.on(this._element, EVENT_MOUSELEAVE$1, function () {
	        return _this5._maybeEnableCycle();
	      });
	    }
	    if (this._config.touch && Swipe.isSupported()) {
	      this._addTouchEventListeners();
	    }
	  };
	  _proto._addTouchEventListeners = function _addTouchEventListeners() {
	    var _this6 = this;
	    for (var _iterator = _createForOfIteratorHelperLoose(SelectorEngine.find(SELECTOR_ITEM_IMG, this._element)), _step; !(_step = _iterator()).done;) {
	      var img = _step.value;
	      EventHandler.on(img, EVENT_DRAG_START, function (event) {
	        return event.preventDefault();
	      });
	    }
	    var endCallBack = function endCallBack() {
	      if (_this6._config.pause !== 'hover') {
	        return;
	      }

	      // If it's a touch-enabled device, mouseenter/leave are fired as
	      // part of the mouse compatibility events on first tap - the carousel
	      // would stop cycling until user tapped out of it;
	      // here, we listen for touchend, explicitly pause the carousel
	      // (as if it's the second time we tap on it, mouseenter compat event
	      // is NOT fired) and after a timeout (to allow for mouse compatibility
	      // events to fire) we explicitly restart cycling

	      _this6.pause();
	      if (_this6.touchTimeout) {
	        clearTimeout(_this6.touchTimeout);
	      }
	      _this6.touchTimeout = setTimeout(function () {
	        return _this6._maybeEnableCycle();
	      }, TOUCHEVENT_COMPAT_WAIT + _this6._config.interval);
	    };
	    var swipeConfig = {
	      leftCallback: function leftCallback() {
	        return _this6._slide(_this6._directionToOrder(DIRECTION_LEFT));
	      },
	      rightCallback: function rightCallback() {
	        return _this6._slide(_this6._directionToOrder(DIRECTION_RIGHT));
	      },
	      endCallback: endCallBack
	    };
	    this._swipeHelper = new Swipe(this._element, swipeConfig);
	  };
	  _proto._keydown = function _keydown(event) {
	    if (/input|textarea/i.test(event.target.tagName)) {
	      return;
	    }
	    var direction = KEY_TO_DIRECTION[event.key];
	    if (direction) {
	      event.preventDefault();
	      this._slide(this._directionToOrder(direction));
	    }
	  };
	  _proto._getItemIndex = function _getItemIndex(element) {
	    return this._getItems().indexOf(element);
	  };
	  _proto._setActiveIndicatorElement = function _setActiveIndicatorElement(index) {
	    if (!this._indicatorsElement) {
	      return;
	    }
	    var activeIndicator = SelectorEngine.findOne(SELECTOR_ACTIVE, this._indicatorsElement);
	    activeIndicator.classList.remove(CLASS_NAME_ACTIVE$2);
	    activeIndicator.removeAttribute('aria-current');
	    var newActiveIndicator = SelectorEngine.findOne("[data-bs-slide-to=\"" + index + "\"]", this._indicatorsElement);
	    if (newActiveIndicator) {
	      newActiveIndicator.classList.add(CLASS_NAME_ACTIVE$2);
	      newActiveIndicator.setAttribute('aria-current', 'true');
	    }
	  };
	  _proto._updateInterval = function _updateInterval() {
	    var element = this._activeElement || this._getActive();
	    if (!element) {
	      return;
	    }
	    var elementInterval = Number.parseInt(element.getAttribute('data-bs-interval'), 10);
	    this._config.interval = elementInterval || this._config.defaultInterval;
	  };
	  _proto._slide = function _slide(order, element) {
	    var _this7 = this;
	    if (element === void 0) {
	      element = null;
	    }
	    if (this._isSliding) {
	      return;
	    }
	    var activeElement = this._getActive();
	    var isNext = order === ORDER_NEXT;
	    var nextElement = element || getNextActiveElement(this._getItems(), activeElement, isNext, this._config.wrap);
	    if (nextElement === activeElement) {
	      return;
	    }
	    var nextElementIndex = this._getItemIndex(nextElement);
	    var triggerEvent = function triggerEvent(eventName) {
	      return EventHandler.trigger(_this7._element, eventName, {
	        relatedTarget: nextElement,
	        direction: _this7._orderToDirection(order),
	        from: _this7._getItemIndex(activeElement),
	        to: nextElementIndex
	      });
	    };
	    var slideEvent = triggerEvent(EVENT_SLIDE);
	    if (slideEvent.defaultPrevented) {
	      return;
	    }
	    if (!activeElement || !nextElement) {
	      // Some weirdness is happening, so we bail
	      // TODO: change tests that use empty divs to avoid this check
	      return;
	    }
	    var isCycling = Boolean(this._interval);
	    this.pause();
	    this._isSliding = true;
	    this._setActiveIndicatorElement(nextElementIndex);
	    this._activeElement = nextElement;
	    var directionalClassName = isNext ? CLASS_NAME_START : CLASS_NAME_END;
	    var orderClassName = isNext ? CLASS_NAME_NEXT : CLASS_NAME_PREV;
	    nextElement.classList.add(orderClassName);
	    reflow(nextElement);
	    activeElement.classList.add(directionalClassName);
	    nextElement.classList.add(directionalClassName);
	    var completeCallBack = function completeCallBack() {
	      nextElement.classList.remove(directionalClassName, orderClassName);
	      nextElement.classList.add(CLASS_NAME_ACTIVE$2);
	      activeElement.classList.remove(CLASS_NAME_ACTIVE$2, orderClassName, directionalClassName);
	      _this7._isSliding = false;
	      triggerEvent(EVENT_SLID);
	    };
	    this._queueCallback(completeCallBack, activeElement, this._isAnimated());
	    if (isCycling) {
	      this.cycle();
	    }
	  };
	  _proto._isAnimated = function _isAnimated() {
	    return this._element.classList.contains(CLASS_NAME_SLIDE);
	  };
	  _proto._getActive = function _getActive() {
	    return SelectorEngine.findOne(SELECTOR_ACTIVE_ITEM, this._element);
	  };
	  _proto._getItems = function _getItems() {
	    return SelectorEngine.find(SELECTOR_ITEM, this._element);
	  };
	  _proto._clearInterval = function _clearInterval() {
	    if (this._interval) {
	      clearInterval(this._interval);
	      this._interval = null;
	    }
	  };
	  _proto._directionToOrder = function _directionToOrder(direction) {
	    if (isRTL()) {
	      return direction === DIRECTION_LEFT ? ORDER_PREV : ORDER_NEXT;
	    }
	    return direction === DIRECTION_LEFT ? ORDER_NEXT : ORDER_PREV;
	  };
	  _proto._orderToDirection = function _orderToDirection(order) {
	    if (isRTL()) {
	      return order === ORDER_PREV ? DIRECTION_LEFT : DIRECTION_RIGHT;
	    }
	    return order === ORDER_PREV ? DIRECTION_RIGHT : DIRECTION_LEFT;
	  }

	  // Static
	  ;
	  Carousel.jQueryInterface = function jQueryInterface(config) {
	    return this.each(function () {
	      var data = Carousel.getOrCreateInstance(this, config);
	      if (typeof config === 'number') {
	        data.to(config);
	        return;
	      }
	      if (typeof config === 'string') {
	        if (data[config] === undefined || config.startsWith('_') || config === 'constructor') {
	          throw new TypeError("No method named \"" + config + "\"");
	        }
	        data[config]();
	      }
	    });
	  };
	  _createClass(Carousel, null, [{
	    key: "Default",
	    get: function get() {
	      return Default$a;
	    }
	  }, {
	    key: "DefaultType",
	    get: function get() {
	      return DefaultType$a;
	    }
	  }, {
	    key: "NAME",
	    get: function get() {
	      return NAME$c;
	    }
	  }]);
	  return Carousel;
	}(BaseComponent);
	/**
	 * Data API implementation
	 */
	EventHandler.on(document, EVENT_CLICK_DATA_API$4, SELECTOR_DATA_SLIDE, function (event) {
	  var target = SelectorEngine.getElementFromSelector(this);
	  if (!target || !target.classList.contains(CLASS_NAME_CAROUSEL)) {
	    return;
	  }
	  event.preventDefault();
	  var carousel = Carousel.getOrCreateInstance(target);
	  var slideIndex = this.getAttribute('data-bs-slide-to');
	  if (slideIndex) {
	    carousel.to(slideIndex);
	    carousel._maybeEnableCycle();
	    return;
	  }
	  if (Manipulator.getDataAttribute(this, 'slide') === 'next') {
	    carousel.next();
	    carousel._maybeEnableCycle();
	    return;
	  }
	  carousel.prev();
	  carousel._maybeEnableCycle();
	});
	EventHandler.on(window, EVENT_LOAD_DATA_API$3, function () {
	  var carousels = SelectorEngine.find(SELECTOR_DATA_RIDE);
	  for (var _iterator2 = _createForOfIteratorHelperLoose(carousels), _step2; !(_step2 = _iterator2()).done;) {
	    var carousel = _step2.value;
	    Carousel.getOrCreateInstance(carousel);
	  }
	});

	/**
	 * jQuery
	 */

	defineJQueryPlugin(Carousel);

	window.bootstrap = window.bootstrap || {};
	window.bootstrap.Carousel = Carousel;
	if (Joomla && Joomla.getOptions) {
	  // Get the elements/configurations from the PHP
	  var carousels = Joomla.getOptions('bootstrap.carousel');
	  // Initialise the elements
	  if (typeof carousels === 'object' && carousels !== null) {
	    Object.keys(carousels).forEach(function (carousel) {
	      var opt = carousels[carousel];
	      var options = {
	        interval: opt.interval ? opt.interval : 5000,
	        keyboard: opt.keyboard ? opt.keyboard : true,
	        pause: opt.pause ? opt.pause : 'hover',
	        slide: opt.slide ? opt.slide : false,
	        wrap: opt.wrap ? opt.wrap : true,
	        touch: opt.touch ? opt.touch : true
	      };
	      var elements = Array.from(document.querySelectorAll(carousel));
	      if (elements.length) {
	        elements.map(function (el) {
	          return new window.bootstrap.Carousel(el, options);
	        });
	      }
	    });
	  }
	}

	var aCallable$5 = aCallable$a;
	var toObject$1 = toObject$a;
	var IndexedObject = indexedObject;
	var lengthOfArrayLike$1 = lengthOfArrayLike$9;

	var $TypeError$4 = TypeError;

	// `Array.prototype.{ reduce, reduceRight }` methods implementation
	var createMethod = function (IS_RIGHT) {
	  return function (that, callbackfn, argumentsLength, memo) {
	    aCallable$5(callbackfn);
	    var O = toObject$1(that);
	    var self = IndexedObject(O);
	    var length = lengthOfArrayLike$1(O);
	    var index = IS_RIGHT ? length - 1 : 0;
	    var i = IS_RIGHT ? -1 : 1;
	    if (argumentsLength < 2) while (true) {
	      if (index in self) {
	        memo = self[index];
	        index += i;
	        break;
	      }
	      index += i;
	      if (IS_RIGHT ? index < 0 : length <= index) {
	        throw $TypeError$4('Reduce of empty array with no initial value');
	      }
	    }
	    for (;IS_RIGHT ? index >= 0 : length > index; index += i) if (index in self) {
	      memo = callbackfn(memo, self[index], index, O);
	    }
	    return memo;
	  };
	};

	var arrayReduce = {
	  // `Array.prototype.reduce` method
	  // https://tc39.es/ecma262/#sec-array.prototype.reduce
	  left: createMethod(false),
	  // `Array.prototype.reduceRight` method
	  // https://tc39.es/ecma262/#sec-array.prototype.reduceright
	  right: createMethod(true)
	};

	var global$6 = global$s;
	var classof = classofRaw$2;

	var engineIsNode = classof(global$6.process) === 'process';

	var $$7 = _export;
	var $reduce = arrayReduce.left;
	var arrayMethodIsStrict$1 = arrayMethodIsStrict$4;
	var CHROME_VERSION = engineV8Version;
	var IS_NODE$4 = engineIsNode;

	// Chrome 80-82 has a critical bug
	// https://bugs.chromium.org/p/chromium/issues/detail?id=1049982
	var CHROME_BUG = !IS_NODE$4 && CHROME_VERSION > 79 && CHROME_VERSION < 83;
	var FORCED$1 = CHROME_BUG || !arrayMethodIsStrict$1('reduce');

	// `Array.prototype.reduce` method
	// https://tc39.es/ecma262/#sec-array.prototype.reduce
	$$7({ target: 'Array', proto: true, forced: FORCED$1 }, {
	  reduce: function reduce(callbackfn /* , initialValue */) {
	    var length = arguments.length;
	    return $reduce(this, callbackfn, length, length > 1 ? arguments[1] : undefined);
	  }
	});

	var top = 'top';
	var bottom = 'bottom';
	var right = 'right';
	var left = 'left';
	var auto = 'auto';
	var basePlacements = [top, bottom, right, left];
	var start = 'start';
	var end = 'end';
	var clippingParents = 'clippingParents';
	var viewport = 'viewport';
	var popper = 'popper';
	var reference = 'reference';
	var variationPlacements = /*#__PURE__*/basePlacements.reduce(function (acc, placement) {
	  return acc.concat([placement + "-" + start, placement + "-" + end]);
	}, []);
	var placements = /*#__PURE__*/[].concat(basePlacements, [auto]).reduce(function (acc, placement) {
	  return acc.concat([placement, placement + "-" + start, placement + "-" + end]);
	}, []); // modifiers that need to read the DOM

	var beforeRead = 'beforeRead';
	var read = 'read';
	var afterRead = 'afterRead'; // pure-logic modifiers

	var beforeMain = 'beforeMain';
	var main = 'main';
	var afterMain = 'afterMain'; // modifier with the purpose to write to the DOM (or write into a framework state)

	var beforeWrite = 'beforeWrite';
	var write = 'write';
	var afterWrite = 'afterWrite';
	var modifierPhases = [beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite];

	function getNodeName(element) {
	  return element ? (element.nodeName || '').toLowerCase() : null;
	}

	function getWindow(node) {
	  if (node == null) {
	    return window;
	  }
	  if (node.toString() !== '[object Window]') {
	    var ownerDocument = node.ownerDocument;
	    return ownerDocument ? ownerDocument.defaultView || window : window;
	  }
	  return node;
	}

	function isElement(node) {
	  var OwnElement = getWindow(node).Element;
	  return node instanceof OwnElement || node instanceof Element;
	}
	function isHTMLElement(node) {
	  var OwnElement = getWindow(node).HTMLElement;
	  return node instanceof OwnElement || node instanceof HTMLElement;
	}
	function isShadowRoot(node) {
	  // IE 11 has no ShadowRoot
	  if (typeof ShadowRoot === 'undefined') {
	    return false;
	  }
	  var OwnElement = getWindow(node).ShadowRoot;
	  return node instanceof OwnElement || node instanceof ShadowRoot;
	}

	// and applies them to the HTMLElements such as popper and arrow

	function applyStyles(_ref) {
	  var state = _ref.state;
	  Object.keys(state.elements).forEach(function (name) {
	    var style = state.styles[name] || {};
	    var attributes = state.attributes[name] || {};
	    var element = state.elements[name]; // arrow is optional + virtual elements

	    if (!isHTMLElement(element) || !getNodeName(element)) {
	      return;
	    } // Flow doesn't support to extend this property, but it's the most
	    // effective way to apply styles to an HTMLElement
	    // $FlowFixMe[cannot-write]

	    Object.assign(element.style, style);
	    Object.keys(attributes).forEach(function (name) {
	      var value = attributes[name];
	      if (value === false) {
	        element.removeAttribute(name);
	      } else {
	        element.setAttribute(name, value === true ? '' : value);
	      }
	    });
	  });
	}
	function effect$2(_ref2) {
	  var state = _ref2.state;
	  var initialStyles = {
	    popper: {
	      position: state.options.strategy,
	      left: '0',
	      top: '0',
	      margin: '0'
	    },
	    arrow: {
	      position: 'absolute'
	    },
	    reference: {}
	  };
	  Object.assign(state.elements.popper.style, initialStyles.popper);
	  state.styles = initialStyles;
	  if (state.elements.arrow) {
	    Object.assign(state.elements.arrow.style, initialStyles.arrow);
	  }
	  return function () {
	    Object.keys(state.elements).forEach(function (name) {
	      var element = state.elements[name];
	      var attributes = state.attributes[name] || {};
	      var styleProperties = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]); // Set all values to an empty string to unset them

	      var style = styleProperties.reduce(function (style, property) {
	        style[property] = '';
	        return style;
	      }, {}); // arrow is optional + virtual elements

	      if (!isHTMLElement(element) || !getNodeName(element)) {
	        return;
	      }
	      Object.assign(element.style, style);
	      Object.keys(attributes).forEach(function (attribute) {
	        element.removeAttribute(attribute);
	      });
	    });
	  };
	} // eslint-disable-next-line import/no-unused-modules

	var applyStyles$1 = {
	  name: 'applyStyles',
	  enabled: true,
	  phase: 'write',
	  fn: applyStyles,
	  effect: effect$2,
	  requires: ['computeStyles']
	};

	var DESCRIPTORS = descriptors;
	var FUNCTION_NAME_EXISTS = functionName.EXISTS;
	var uncurryThis$1 = functionUncurryThis;
	var defineBuiltInAccessor = defineBuiltInAccessor$4;

	var FunctionPrototype = Function.prototype;
	var functionToString = uncurryThis$1(FunctionPrototype.toString);
	var nameRE = /function\b(?:\s|\/\*[\S\s]*?\*\/|\/\/[^\n\r]*[\n\r]+)*([^\s(/]*)/;
	var regExpExec = uncurryThis$1(nameRE.exec);
	var NAME$b = 'name';

	// Function instances `.name` property
	// https://tc39.es/ecma262/#sec-function-instances-name
	if (DESCRIPTORS && !FUNCTION_NAME_EXISTS) {
	  defineBuiltInAccessor(FunctionPrototype, NAME$b, {
	    configurable: true,
	    get: function () {
	      try {
	        return regExpExec(nameRE, functionToString(this))[1];
	      } catch (error) {
	        return '';
	      }
	    }
	  });
	}

	function getBasePlacement(placement) {
	  return placement.split('-')[0];
	}

	var max = Math.max;
	var min = Math.min;
	var round = Math.round;

	function getUAString() {
	  var uaData = navigator.userAgentData;
	  if (uaData != null && uaData.brands && Array.isArray(uaData.brands)) {
	    return uaData.brands.map(function (item) {
	      return item.brand + "/" + item.version;
	    }).join(' ');
	  }
	  return navigator.userAgent;
	}

	function isLayoutViewport() {
	  return !/^((?!chrome|android).)*safari/i.test(getUAString());
	}

	function getBoundingClientRect(element, includeScale, isFixedStrategy) {
	  if (includeScale === void 0) {
	    includeScale = false;
	  }
	  if (isFixedStrategy === void 0) {
	    isFixedStrategy = false;
	  }
	  var clientRect = element.getBoundingClientRect();
	  var scaleX = 1;
	  var scaleY = 1;
	  if (includeScale && isHTMLElement(element)) {
	    scaleX = element.offsetWidth > 0 ? round(clientRect.width) / element.offsetWidth || 1 : 1;
	    scaleY = element.offsetHeight > 0 ? round(clientRect.height) / element.offsetHeight || 1 : 1;
	  }
	  var _ref = isElement(element) ? getWindow(element) : window,
	    visualViewport = _ref.visualViewport;
	  var addVisualOffsets = !isLayoutViewport() && isFixedStrategy;
	  var x = (clientRect.left + (addVisualOffsets && visualViewport ? visualViewport.offsetLeft : 0)) / scaleX;
	  var y = (clientRect.top + (addVisualOffsets && visualViewport ? visualViewport.offsetTop : 0)) / scaleY;
	  var width = clientRect.width / scaleX;
	  var height = clientRect.height / scaleY;
	  return {
	    width: width,
	    height: height,
	    top: y,
	    right: x + width,
	    bottom: y + height,
	    left: x,
	    x: x,
	    y: y
	  };
	}

	// means it doesn't take into account transforms.

	function getLayoutRect(element) {
	  var clientRect = getBoundingClientRect(element); // Use the clientRect sizes if it's not been transformed.
	  // Fixes https://github.com/popperjs/popper-core/issues/1223

	  var width = element.offsetWidth;
	  var height = element.offsetHeight;
	  if (Math.abs(clientRect.width - width) <= 1) {
	    width = clientRect.width;
	  }
	  if (Math.abs(clientRect.height - height) <= 1) {
	    height = clientRect.height;
	  }
	  return {
	    x: element.offsetLeft,
	    y: element.offsetTop,
	    width: width,
	    height: height
	  };
	}

	function contains(parent, child) {
	  var rootNode = child.getRootNode && child.getRootNode(); // First, attempt with faster native method

	  if (parent.contains(child)) {
	    return true;
	  } // then fallback to custom implementation with Shadow DOM support
	  else if (rootNode && isShadowRoot(rootNode)) {
	    var next = child;
	    do {
	      if (next && parent.isSameNode(next)) {
	        return true;
	      } // $FlowFixMe[prop-missing]: need a better way to handle this...

	      next = next.parentNode || next.host;
	    } while (next);
	  } // Give up, the result is false

	  return false;
	}

	function getComputedStyle$1(element) {
	  return getWindow(element).getComputedStyle(element);
	}

	function isTableElement(element) {
	  return ['table', 'td', 'th'].indexOf(getNodeName(element)) >= 0;
	}

	function getDocumentElement(element) {
	  // $FlowFixMe[incompatible-return]: assume body is always available
	  return ((isElement(element) ? element.ownerDocument :
	  // $FlowFixMe[prop-missing]
	  element.document) || window.document).documentElement;
	}

	function getParentNode(element) {
	  if (getNodeName(element) === 'html') {
	    return element;
	  }
	  return (
	    // this is a quicker (but less type safe) way to save quite some bytes from the bundle
	    // $FlowFixMe[incompatible-return]
	    // $FlowFixMe[prop-missing]
	    element.assignedSlot ||
	    // step into the shadow DOM of the parent of a slotted node
	    element.parentNode || (
	    // DOM Element detected
	    isShadowRoot(element) ? element.host : null) ||
	    // ShadowRoot detected
	    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
	    getDocumentElement(element) // fallback
	  );
	}

	function getTrueOffsetParent(element) {
	  if (!isHTMLElement(element) ||
	  // https://github.com/popperjs/popper-core/issues/837
	  getComputedStyle$1(element).position === 'fixed') {
	    return null;
	  }
	  return element.offsetParent;
	} // `.offsetParent` reports `null` for fixed elements, while absolute elements
	// return the containing block

	function getContainingBlock(element) {
	  var isFirefox = /firefox/i.test(getUAString());
	  var isIE = /Trident/i.test(getUAString());
	  if (isIE && isHTMLElement(element)) {
	    // In IE 9, 10 and 11 fixed elements containing block is always established by the viewport
	    var elementCss = getComputedStyle$1(element);
	    if (elementCss.position === 'fixed') {
	      return null;
	    }
	  }
	  var currentNode = getParentNode(element);
	  if (isShadowRoot(currentNode)) {
	    currentNode = currentNode.host;
	  }
	  while (isHTMLElement(currentNode) && ['html', 'body'].indexOf(getNodeName(currentNode)) < 0) {
	    var css = getComputedStyle$1(currentNode); // This is non-exhaustive but covers the most common CSS properties that
	    // create a containing block.
	    // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block

	    if (css.transform !== 'none' || css.perspective !== 'none' || css.contain === 'paint' || ['transform', 'perspective'].indexOf(css.willChange) !== -1 || isFirefox && css.willChange === 'filter' || isFirefox && css.filter && css.filter !== 'none') {
	      return currentNode;
	    } else {
	      currentNode = currentNode.parentNode;
	    }
	  }
	  return null;
	} // Gets the closest ancestor positioned element. Handles some edge cases,
	// such as table ancestors and cross browser bugs.

	function getOffsetParent(element) {
	  var window = getWindow(element);
	  var offsetParent = getTrueOffsetParent(element);
	  while (offsetParent && isTableElement(offsetParent) && getComputedStyle$1(offsetParent).position === 'static') {
	    offsetParent = getTrueOffsetParent(offsetParent);
	  }
	  if (offsetParent && (getNodeName(offsetParent) === 'html' || getNodeName(offsetParent) === 'body' && getComputedStyle$1(offsetParent).position === 'static')) {
	    return window;
	  }
	  return offsetParent || getContainingBlock(element) || window;
	}

	function getMainAxisFromPlacement(placement) {
	  return ['top', 'bottom'].indexOf(placement) >= 0 ? 'x' : 'y';
	}

	function within(min$1, value, max$1) {
	  return max(min$1, min(value, max$1));
	}
	function withinMaxClamp(min, value, max) {
	  var v = within(min, value, max);
	  return v > max ? max : v;
	}

	function getFreshSideObject() {
	  return {
	    top: 0,
	    right: 0,
	    bottom: 0,
	    left: 0
	  };
	}

	function mergePaddingObject(paddingObject) {
	  return Object.assign({}, getFreshSideObject(), paddingObject);
	}

	function expandToHashMap(value, keys) {
	  return keys.reduce(function (hashMap, key) {
	    hashMap[key] = value;
	    return hashMap;
	  }, {});
	}

	var toPaddingObject = function toPaddingObject(padding, state) {
	  padding = typeof padding === 'function' ? padding(Object.assign({}, state.rects, {
	    placement: state.placement
	  })) : padding;
	  return mergePaddingObject(typeof padding !== 'number' ? padding : expandToHashMap(padding, basePlacements));
	};
	function arrow(_ref) {
	  var _state$modifiersData$;
	  var state = _ref.state,
	    name = _ref.name,
	    options = _ref.options;
	  var arrowElement = state.elements.arrow;
	  var popperOffsets = state.modifiersData.popperOffsets;
	  var basePlacement = getBasePlacement(state.placement);
	  var axis = getMainAxisFromPlacement(basePlacement);
	  var isVertical = [left, right].indexOf(basePlacement) >= 0;
	  var len = isVertical ? 'height' : 'width';
	  if (!arrowElement || !popperOffsets) {
	    return;
	  }
	  var paddingObject = toPaddingObject(options.padding, state);
	  var arrowRect = getLayoutRect(arrowElement);
	  var minProp = axis === 'y' ? top : left;
	  var maxProp = axis === 'y' ? bottom : right;
	  var endDiff = state.rects.reference[len] + state.rects.reference[axis] - popperOffsets[axis] - state.rects.popper[len];
	  var startDiff = popperOffsets[axis] - state.rects.reference[axis];
	  var arrowOffsetParent = getOffsetParent(arrowElement);
	  var clientSize = arrowOffsetParent ? axis === 'y' ? arrowOffsetParent.clientHeight || 0 : arrowOffsetParent.clientWidth || 0 : 0;
	  var centerToReference = endDiff / 2 - startDiff / 2; // Make sure the arrow doesn't overflow the popper if the center point is
	  // outside of the popper bounds

	  var min = paddingObject[minProp];
	  var max = clientSize - arrowRect[len] - paddingObject[maxProp];
	  var center = clientSize / 2 - arrowRect[len] / 2 + centerToReference;
	  var offset = within(min, center, max); // Prevents breaking syntax highlighting...

	  var axisProp = axis;
	  state.modifiersData[name] = (_state$modifiersData$ = {}, _state$modifiersData$[axisProp] = offset, _state$modifiersData$.centerOffset = offset - center, _state$modifiersData$);
	}
	function effect$1(_ref2) {
	  var state = _ref2.state,
	    options = _ref2.options;
	  var _options$element = options.element,
	    arrowElement = _options$element === void 0 ? '[data-popper-arrow]' : _options$element;
	  if (arrowElement == null) {
	    return;
	  } // CSS selector

	  if (typeof arrowElement === 'string') {
	    arrowElement = state.elements.popper.querySelector(arrowElement);
	    if (!arrowElement) {
	      return;
	    }
	  }
	  if (!contains(state.elements.popper, arrowElement)) {
	    return;
	  }
	  state.elements.arrow = arrowElement;
	} // eslint-disable-next-line import/no-unused-modules

	var arrow$1 = {
	  name: 'arrow',
	  enabled: true,
	  phase: 'main',
	  fn: arrow,
	  effect: effect$1,
	  requires: ['popperOffsets'],
	  requiresIfExists: ['preventOverflow']
	};

	function getVariation(placement) {
	  return placement.split('-')[1];
	}

	var unsetSides = {
	  top: 'auto',
	  right: 'auto',
	  bottom: 'auto',
	  left: 'auto'
	}; // Round the offsets to the nearest suitable subpixel based on the DPR.
	// Zooming can change the DPR, but it seems to report a value that will
	// cleanly divide the values into the appropriate subpixels.

	function roundOffsetsByDPR(_ref, win) {
	  var x = _ref.x,
	    y = _ref.y;
	  var dpr = win.devicePixelRatio || 1;
	  return {
	    x: round(x * dpr) / dpr || 0,
	    y: round(y * dpr) / dpr || 0
	  };
	}
	function mapToStyles(_ref2) {
	  var _Object$assign2;
	  var popper = _ref2.popper,
	    popperRect = _ref2.popperRect,
	    placement = _ref2.placement,
	    variation = _ref2.variation,
	    offsets = _ref2.offsets,
	    position = _ref2.position,
	    gpuAcceleration = _ref2.gpuAcceleration,
	    adaptive = _ref2.adaptive,
	    roundOffsets = _ref2.roundOffsets,
	    isFixed = _ref2.isFixed;
	  var _offsets$x = offsets.x,
	    x = _offsets$x === void 0 ? 0 : _offsets$x,
	    _offsets$y = offsets.y,
	    y = _offsets$y === void 0 ? 0 : _offsets$y;
	  var _ref3 = typeof roundOffsets === 'function' ? roundOffsets({
	    x: x,
	    y: y
	  }) : {
	    x: x,
	    y: y
	  };
	  x = _ref3.x;
	  y = _ref3.y;
	  var hasX = offsets.hasOwnProperty('x');
	  var hasY = offsets.hasOwnProperty('y');
	  var sideX = left;
	  var sideY = top;
	  var win = window;
	  if (adaptive) {
	    var offsetParent = getOffsetParent(popper);
	    var heightProp = 'clientHeight';
	    var widthProp = 'clientWidth';
	    if (offsetParent === getWindow(popper)) {
	      offsetParent = getDocumentElement(popper);
	      if (getComputedStyle$1(offsetParent).position !== 'static' && position === 'absolute') {
	        heightProp = 'scrollHeight';
	        widthProp = 'scrollWidth';
	      }
	    } // $FlowFixMe[incompatible-cast]: force type refinement, we compare offsetParent with window above, but Flow doesn't detect it

	    offsetParent = offsetParent;
	    if (placement === top || (placement === left || placement === right) && variation === end) {
	      sideY = bottom;
	      var offsetY = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.height :
	      // $FlowFixMe[prop-missing]
	      offsetParent[heightProp];
	      y -= offsetY - popperRect.height;
	      y *= gpuAcceleration ? 1 : -1;
	    }
	    if (placement === left || (placement === top || placement === bottom) && variation === end) {
	      sideX = right;
	      var offsetX = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.width :
	      // $FlowFixMe[prop-missing]
	      offsetParent[widthProp];
	      x -= offsetX - popperRect.width;
	      x *= gpuAcceleration ? 1 : -1;
	    }
	  }
	  var commonStyles = Object.assign({
	    position: position
	  }, adaptive && unsetSides);
	  var _ref4 = roundOffsets === true ? roundOffsetsByDPR({
	    x: x,
	    y: y
	  }, getWindow(popper)) : {
	    x: x,
	    y: y
	  };
	  x = _ref4.x;
	  y = _ref4.y;
	  if (gpuAcceleration) {
	    var _Object$assign;
	    return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? '0' : '', _Object$assign[sideX] = hasX ? '0' : '', _Object$assign.transform = (win.devicePixelRatio || 1) <= 1 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", _Object$assign));
	  }
	  return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y + "px" : '', _Object$assign2[sideX] = hasX ? x + "px" : '', _Object$assign2.transform = '', _Object$assign2));
	}
	function computeStyles(_ref5) {
	  var state = _ref5.state,
	    options = _ref5.options;
	  var _options$gpuAccelerat = options.gpuAcceleration,
	    gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat,
	    _options$adaptive = options.adaptive,
	    adaptive = _options$adaptive === void 0 ? true : _options$adaptive,
	    _options$roundOffsets = options.roundOffsets,
	    roundOffsets = _options$roundOffsets === void 0 ? true : _options$roundOffsets;
	  var commonStyles = {
	    placement: getBasePlacement(state.placement),
	    variation: getVariation(state.placement),
	    popper: state.elements.popper,
	    popperRect: state.rects.popper,
	    gpuAcceleration: gpuAcceleration,
	    isFixed: state.options.strategy === 'fixed'
	  };
	  if (state.modifiersData.popperOffsets != null) {
	    state.styles.popper = Object.assign({}, state.styles.popper, mapToStyles(Object.assign({}, commonStyles, {
	      offsets: state.modifiersData.popperOffsets,
	      position: state.options.strategy,
	      adaptive: adaptive,
	      roundOffsets: roundOffsets
	    })));
	  }
	  if (state.modifiersData.arrow != null) {
	    state.styles.arrow = Object.assign({}, state.styles.arrow, mapToStyles(Object.assign({}, commonStyles, {
	      offsets: state.modifiersData.arrow,
	      position: 'absolute',
	      adaptive: false,
	      roundOffsets: roundOffsets
	    })));
	  }
	  state.attributes.popper = Object.assign({}, state.attributes.popper, {
	    'data-popper-placement': state.placement
	  });
	} // eslint-disable-next-line import/no-unused-modules

	var computeStyles$1 = {
	  name: 'computeStyles',
	  enabled: true,
	  phase: 'beforeWrite',
	  fn: computeStyles,
	  data: {}
	};

	var passive = {
	  passive: true
	};
	function effect(_ref) {
	  var state = _ref.state,
	    instance = _ref.instance,
	    options = _ref.options;
	  var _options$scroll = options.scroll,
	    scroll = _options$scroll === void 0 ? true : _options$scroll,
	    _options$resize = options.resize,
	    resize = _options$resize === void 0 ? true : _options$resize;
	  var window = getWindow(state.elements.popper);
	  var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);
	  if (scroll) {
	    scrollParents.forEach(function (scrollParent) {
	      scrollParent.addEventListener('scroll', instance.update, passive);
	    });
	  }
	  if (resize) {
	    window.addEventListener('resize', instance.update, passive);
	  }
	  return function () {
	    if (scroll) {
	      scrollParents.forEach(function (scrollParent) {
	        scrollParent.removeEventListener('scroll', instance.update, passive);
	      });
	    }
	    if (resize) {
	      window.removeEventListener('resize', instance.update, passive);
	    }
	  };
	} // eslint-disable-next-line import/no-unused-modules

	var eventListeners = {
	  name: 'eventListeners',
	  enabled: true,
	  phase: 'write',
	  fn: function fn() {},
	  effect: effect,
	  data: {}
	};

	var hash$1 = {
	  left: 'right',
	  right: 'left',
	  bottom: 'top',
	  top: 'bottom'
	};
	function getOppositePlacement(placement) {
	  return placement.replace(/left|right|bottom|top/g, function (matched) {
	    return hash$1[matched];
	  });
	}

	var hash = {
	  start: 'end',
	  end: 'start'
	};
	function getOppositeVariationPlacement(placement) {
	  return placement.replace(/start|end/g, function (matched) {
	    return hash[matched];
	  });
	}

	function getWindowScroll(node) {
	  var win = getWindow(node);
	  var scrollLeft = win.pageXOffset;
	  var scrollTop = win.pageYOffset;
	  return {
	    scrollLeft: scrollLeft,
	    scrollTop: scrollTop
	  };
	}

	function getWindowScrollBarX(element) {
	  // If <html> has a CSS width greater than the viewport, then this will be
	  // incorrect for RTL.
	  // Popper 1 is broken in this case and never had a bug report so let's assume
	  // it's not an issue. I don't think anyone ever specifies width on <html>
	  // anyway.
	  // Browsers where the left scrollbar doesn't cause an issue report `0` for
	  // this (e.g. Edge 2019, IE11, Safari)
	  return getBoundingClientRect(getDocumentElement(element)).left + getWindowScroll(element).scrollLeft;
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
	    var layoutViewport = isLayoutViewport();
	    if (layoutViewport || !layoutViewport && strategy === 'fixed') {
	      x = visualViewport.offsetLeft;
	      y = visualViewport.offsetTop;
	    }
	  }
	  return {
	    width: width,
	    height: height,
	    x: x + getWindowScrollBarX(element),
	    y: y
	  };
	}

	// of the `<html>` and `<body>` rect bounds if horizontally scrollable

	function getDocumentRect(element) {
	  var _element$ownerDocumen;
	  var html = getDocumentElement(element);
	  var winScroll = getWindowScroll(element);
	  var body = (_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body;
	  var width = max(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
	  var height = max(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
	  var x = -winScroll.scrollLeft + getWindowScrollBarX(element);
	  var y = -winScroll.scrollTop;
	  if (getComputedStyle$1(body || html).direction === 'rtl') {
	    x += max(html.clientWidth, body ? body.clientWidth : 0) - width;
	  }
	  return {
	    width: width,
	    height: height,
	    x: x,
	    y: y
	  };
	}

	function isScrollParent(element) {
	  // Firefox wants us to check `-x` and `-y` variations as well
	  var _getComputedStyle = getComputedStyle$1(element),
	    overflow = _getComputedStyle.overflow,
	    overflowX = _getComputedStyle.overflowX,
	    overflowY = _getComputedStyle.overflowY;
	  return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
	}

	function getScrollParent(node) {
	  if (['html', 'body', '#document'].indexOf(getNodeName(node)) >= 0) {
	    // $FlowFixMe[incompatible-return]: assume body is always available
	    return node.ownerDocument.body;
	  }
	  if (isHTMLElement(node) && isScrollParent(node)) {
	    return node;
	  }
	  return getScrollParent(getParentNode(node));
	}

	/*
	given a DOM element, return the list of all scroll parents, up the list of ancesors
	until we get to the top window object. This list is what we attach scroll listeners
	to, because if any of these parent elements scroll, we'll need to re-calculate the
	reference element's position.
	*/

	function listScrollParents(element, list) {
	  var _element$ownerDocumen;
	  if (list === void 0) {
	    list = [];
	  }
	  var scrollParent = getScrollParent(element);
	  var isBody = scrollParent === ((_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body);
	  var win = getWindow(scrollParent);
	  var target = isBody ? [win].concat(win.visualViewport || [], isScrollParent(scrollParent) ? scrollParent : []) : scrollParent;
	  var updatedList = list.concat(target);
	  return isBody ? updatedList :
	  // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
	  updatedList.concat(listScrollParents(getParentNode(target)));
	}

	function rectToClientRect(rect) {
	  return Object.assign({}, rect, {
	    left: rect.x,
	    top: rect.y,
	    right: rect.x + rect.width,
	    bottom: rect.y + rect.height
	  });
	}

	function getInnerBoundingClientRect(element, strategy) {
	  var rect = getBoundingClientRect(element, false, strategy === 'fixed');
	  rect.top = rect.top + element.clientTop;
	  rect.left = rect.left + element.clientLeft;
	  rect.bottom = rect.top + element.clientHeight;
	  rect.right = rect.left + element.clientWidth;
	  rect.width = element.clientWidth;
	  rect.height = element.clientHeight;
	  rect.x = rect.left;
	  rect.y = rect.top;
	  return rect;
	}
	function getClientRectFromMixedType(element, clippingParent, strategy) {
	  return clippingParent === viewport ? rectToClientRect(getViewportRect(element, strategy)) : isElement(clippingParent) ? getInnerBoundingClientRect(clippingParent, strategy) : rectToClientRect(getDocumentRect(getDocumentElement(element)));
	} // A "clipping parent" is an overflowable container with the characteristic of
	// clipping (or hiding) overflowing elements with a position different from
	// `initial`

	function getClippingParents(element) {
	  var clippingParents = listScrollParents(getParentNode(element));
	  var canEscapeClipping = ['absolute', 'fixed'].indexOf(getComputedStyle$1(element).position) >= 0;
	  var clipperElement = canEscapeClipping && isHTMLElement(element) ? getOffsetParent(element) : element;
	  if (!isElement(clipperElement)) {
	    return [];
	  } // $FlowFixMe[incompatible-return]: https://github.com/facebook/flow/issues/1414

	  return clippingParents.filter(function (clippingParent) {
	    return isElement(clippingParent) && contains(clippingParent, clipperElement) && getNodeName(clippingParent) !== 'body';
	  });
	} // Gets the maximum area that the element is visible in due to any number of
	// clipping parents

	function getClippingRect(element, boundary, rootBoundary, strategy) {
	  var mainClippingParents = boundary === 'clippingParents' ? getClippingParents(element) : [].concat(boundary);
	  var clippingParents = [].concat(mainClippingParents, [rootBoundary]);
	  var firstClippingParent = clippingParents[0];
	  var clippingRect = clippingParents.reduce(function (accRect, clippingParent) {
	    var rect = getClientRectFromMixedType(element, clippingParent, strategy);
	    accRect.top = max(rect.top, accRect.top);
	    accRect.right = min(rect.right, accRect.right);
	    accRect.bottom = min(rect.bottom, accRect.bottom);
	    accRect.left = max(rect.left, accRect.left);
	    return accRect;
	  }, getClientRectFromMixedType(element, firstClippingParent, strategy));
	  clippingRect.width = clippingRect.right - clippingRect.left;
	  clippingRect.height = clippingRect.bottom - clippingRect.top;
	  clippingRect.x = clippingRect.left;
	  clippingRect.y = clippingRect.top;
	  return clippingRect;
	}

	function computeOffsets(_ref) {
	  var reference = _ref.reference,
	    element = _ref.element,
	    placement = _ref.placement;
	  var basePlacement = placement ? getBasePlacement(placement) : null;
	  var variation = placement ? getVariation(placement) : null;
	  var commonX = reference.x + reference.width / 2 - element.width / 2;
	  var commonY = reference.y + reference.height / 2 - element.height / 2;
	  var offsets;
	  switch (basePlacement) {
	    case top:
	      offsets = {
	        x: commonX,
	        y: reference.y - element.height
	      };
	      break;
	    case bottom:
	      offsets = {
	        x: commonX,
	        y: reference.y + reference.height
	      };
	      break;
	    case right:
	      offsets = {
	        x: reference.x + reference.width,
	        y: commonY
	      };
	      break;
	    case left:
	      offsets = {
	        x: reference.x - element.width,
	        y: commonY
	      };
	      break;
	    default:
	      offsets = {
	        x: reference.x,
	        y: reference.y
	      };
	  }
	  var mainAxis = basePlacement ? getMainAxisFromPlacement(basePlacement) : null;
	  if (mainAxis != null) {
	    var len = mainAxis === 'y' ? 'height' : 'width';
	    switch (variation) {
	      case start:
	        offsets[mainAxis] = offsets[mainAxis] - (reference[len] / 2 - element[len] / 2);
	        break;
	      case end:
	        offsets[mainAxis] = offsets[mainAxis] + (reference[len] / 2 - element[len] / 2);
	        break;
	    }
	  }
	  return offsets;
	}

	function detectOverflow(state, options) {
	  if (options === void 0) {
	    options = {};
	  }
	  var _options = options,
	    _options$placement = _options.placement,
	    placement = _options$placement === void 0 ? state.placement : _options$placement,
	    _options$strategy = _options.strategy,
	    strategy = _options$strategy === void 0 ? state.strategy : _options$strategy,
	    _options$boundary = _options.boundary,
	    boundary = _options$boundary === void 0 ? clippingParents : _options$boundary,
	    _options$rootBoundary = _options.rootBoundary,
	    rootBoundary = _options$rootBoundary === void 0 ? viewport : _options$rootBoundary,
	    _options$elementConte = _options.elementContext,
	    elementContext = _options$elementConte === void 0 ? popper : _options$elementConte,
	    _options$altBoundary = _options.altBoundary,
	    altBoundary = _options$altBoundary === void 0 ? false : _options$altBoundary,
	    _options$padding = _options.padding,
	    padding = _options$padding === void 0 ? 0 : _options$padding;
	  var paddingObject = mergePaddingObject(typeof padding !== 'number' ? padding : expandToHashMap(padding, basePlacements));
	  var altContext = elementContext === popper ? reference : popper;
	  var popperRect = state.rects.popper;
	  var element = state.elements[altBoundary ? altContext : elementContext];
	  var clippingClientRect = getClippingRect(isElement(element) ? element : element.contextElement || getDocumentElement(state.elements.popper), boundary, rootBoundary, strategy);
	  var referenceClientRect = getBoundingClientRect(state.elements.reference);
	  var popperOffsets = computeOffsets({
	    reference: referenceClientRect,
	    element: popperRect,
	    strategy: 'absolute',
	    placement: placement
	  });
	  var popperClientRect = rectToClientRect(Object.assign({}, popperRect, popperOffsets));
	  var elementClientRect = elementContext === popper ? popperClientRect : referenceClientRect; // positive = overflowing the clipping rect
	  // 0 or negative = within the clipping rect

	  var overflowOffsets = {
	    top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
	    bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
	    left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
	    right: elementClientRect.right - clippingClientRect.right + paddingObject.right
	  };
	  var offsetData = state.modifiersData.offset; // Offsets can be applied only to the popper element

	  if (elementContext === popper && offsetData) {
	    var offset = offsetData[placement];
	    Object.keys(overflowOffsets).forEach(function (key) {
	      var multiply = [right, bottom].indexOf(key) >= 0 ? 1 : -1;
	      var axis = [top, bottom].indexOf(key) >= 0 ? 'y' : 'x';
	      overflowOffsets[key] += offset[axis] * multiply;
	    });
	  }
	  return overflowOffsets;
	}

	var tryToString$1 = tryToString$5;

	var $TypeError$3 = TypeError;

	var deletePropertyOrThrow$1 = function (O, P) {
	  if (!delete O[P]) throw $TypeError$3('Cannot delete property ' + tryToString$1(P) + ' of ' + tryToString$1(O));
	};

	var arraySlice$1 = arraySliceSimple;

	var floor = Math.floor;

	var mergeSort = function (array, comparefn) {
	  var length = array.length;
	  var middle = floor(length / 2);
	  return length < 8 ? insertionSort(array, comparefn) : merge(
	    array,
	    mergeSort(arraySlice$1(array, 0, middle), comparefn),
	    mergeSort(arraySlice$1(array, middle), comparefn),
	    comparefn
	  );
	};

	var insertionSort = function (array, comparefn) {
	  var length = array.length;
	  var i = 1;
	  var element, j;

	  while (i < length) {
	    j = i;
	    element = array[i];
	    while (j && comparefn(array[j - 1], element) > 0) {
	      array[j] = array[--j];
	    }
	    if (j !== i++) array[j] = element;
	  } return array;
	};

	var merge = function (array, left, right, comparefn) {
	  var llength = left.length;
	  var rlength = right.length;
	  var lindex = 0;
	  var rindex = 0;

	  while (lindex < llength || rindex < rlength) {
	    array[lindex + rindex] = (lindex < llength && rindex < rlength)
	      ? comparefn(left[lindex], right[rindex]) <= 0 ? left[lindex++] : right[rindex++]
	      : lindex < llength ? left[lindex++] : right[rindex++];
	  } return array;
	};

	var arraySort = mergeSort;

	var userAgent$4 = engineUserAgent;

	var firefox = userAgent$4.match(/firefox\/(\d+)/i);

	var engineFfVersion = !!firefox && +firefox[1];

	var UA = engineUserAgent;

	var engineIsIeOrEdge = /MSIE|Trident/.test(UA);

	var userAgent$3 = engineUserAgent;

	var webkit = userAgent$3.match(/AppleWebKit\/(\d+)\./);

	var engineWebkitVersion = !!webkit && +webkit[1];

	var $$6 = _export;
	var uncurryThis = functionUncurryThis;
	var aCallable$4 = aCallable$a;
	var toObject = toObject$a;
	var lengthOfArrayLike = lengthOfArrayLike$9;
	var deletePropertyOrThrow = deletePropertyOrThrow$1;
	var toString = toString$d;
	var fails$1 = fails$A;
	var internalSort = arraySort;
	var arrayMethodIsStrict = arrayMethodIsStrict$4;
	var FF = engineFfVersion;
	var IE_OR_EDGE = engineIsIeOrEdge;
	var V8 = engineV8Version;
	var WEBKIT = engineWebkitVersion;

	var test = [];
	var nativeSort = uncurryThis(test.sort);
	var push = uncurryThis(test.push);

	// IE8-
	var FAILS_ON_UNDEFINED = fails$1(function () {
	  test.sort(undefined);
	});
	// V8 bug
	var FAILS_ON_NULL = fails$1(function () {
	  test.sort(null);
	});
	// Old WebKit
	var STRICT_METHOD = arrayMethodIsStrict('sort');

	var STABLE_SORT = !fails$1(function () {
	  // feature detection can be too slow, so check engines versions
	  if (V8) return V8 < 70;
	  if (FF && FF > 3) return;
	  if (IE_OR_EDGE) return true;
	  if (WEBKIT) return WEBKIT < 603;

	  var result = '';
	  var code, chr, value, index;

	  // generate an array with more 512 elements (Chakra and old V8 fails only in this case)
	  for (code = 65; code < 76; code++) {
	    chr = String.fromCharCode(code);

	    switch (code) {
	      case 66: case 69: case 70: case 72: value = 3; break;
	      case 68: case 71: value = 4; break;
	      default: value = 2;
	    }

	    for (index = 0; index < 47; index++) {
	      test.push({ k: chr + index, v: value });
	    }
	  }

	  test.sort(function (a, b) { return b.v - a.v; });

	  for (index = 0; index < test.length; index++) {
	    chr = test[index].k.charAt(0);
	    if (result.charAt(result.length - 1) !== chr) result += chr;
	  }

	  return result !== 'DGBEFHACIJK';
	});

	var FORCED = FAILS_ON_UNDEFINED || !FAILS_ON_NULL || !STRICT_METHOD || !STABLE_SORT;

	var getSortCompare = function (comparefn) {
	  return function (x, y) {
	    if (y === undefined) return -1;
	    if (x === undefined) return 1;
	    if (comparefn !== undefined) return +comparefn(x, y) || 0;
	    return toString(x) > toString(y) ? 1 : -1;
	  };
	};

	// `Array.prototype.sort` method
	// https://tc39.es/ecma262/#sec-array.prototype.sort
	$$6({ target: 'Array', proto: true, forced: FORCED }, {
	  sort: function sort(comparefn) {
	    if (comparefn !== undefined) aCallable$4(comparefn);

	    var array = toObject(this);

	    if (STABLE_SORT) return comparefn === undefined ? nativeSort(array) : nativeSort(array, comparefn);

	    var items = [];
	    var arrayLength = lengthOfArrayLike(array);
	    var itemsLength, index;

	    for (index = 0; index < arrayLength; index++) {
	      if (index in array) push(items, array[index]);
	    }

	    internalSort(items, getSortCompare(comparefn));

	    itemsLength = lengthOfArrayLike(items);
	    index = 0;

	    while (index < itemsLength) array[index] = items[index++];
	    while (index < arrayLength) deletePropertyOrThrow(array, index++);

	    return array;
	  }
	});

	function computeAutoPlacement(state, options) {
	  if (options === void 0) {
	    options = {};
	  }
	  var _options = options,
	    placement = _options.placement,
	    boundary = _options.boundary,
	    rootBoundary = _options.rootBoundary,
	    padding = _options.padding,
	    flipVariations = _options.flipVariations,
	    _options$allowedAutoP = _options.allowedAutoPlacements,
	    allowedAutoPlacements = _options$allowedAutoP === void 0 ? placements : _options$allowedAutoP;
	  var variation = getVariation(placement);
	  var placements$1 = variation ? flipVariations ? variationPlacements : variationPlacements.filter(function (placement) {
	    return getVariation(placement) === variation;
	  }) : basePlacements;
	  var allowedPlacements = placements$1.filter(function (placement) {
	    return allowedAutoPlacements.indexOf(placement) >= 0;
	  });
	  if (allowedPlacements.length === 0) {
	    allowedPlacements = placements$1;
	  } // $FlowFixMe[incompatible-type]: Flow seems to have problems with two array unions...

	  var overflows = allowedPlacements.reduce(function (acc, placement) {
	    acc[placement] = detectOverflow(state, {
	      placement: placement,
	      boundary: boundary,
	      rootBoundary: rootBoundary,
	      padding: padding
	    })[getBasePlacement(placement)];
	    return acc;
	  }, {});
	  return Object.keys(overflows).sort(function (a, b) {
	    return overflows[a] - overflows[b];
	  });
	}

	function getExpandedFallbackPlacements(placement) {
	  if (getBasePlacement(placement) === auto) {
	    return [];
	  }
	  var oppositePlacement = getOppositePlacement(placement);
	  return [getOppositeVariationPlacement(placement), oppositePlacement, getOppositeVariationPlacement(oppositePlacement)];
	}
	function flip(_ref) {
	  var state = _ref.state,
	    options = _ref.options,
	    name = _ref.name;
	  if (state.modifiersData[name]._skip) {
	    return;
	  }
	  var _options$mainAxis = options.mainAxis,
	    checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
	    _options$altAxis = options.altAxis,
	    checkAltAxis = _options$altAxis === void 0 ? true : _options$altAxis,
	    specifiedFallbackPlacements = options.fallbackPlacements,
	    padding = options.padding,
	    boundary = options.boundary,
	    rootBoundary = options.rootBoundary,
	    altBoundary = options.altBoundary,
	    _options$flipVariatio = options.flipVariations,
	    flipVariations = _options$flipVariatio === void 0 ? true : _options$flipVariatio,
	    allowedAutoPlacements = options.allowedAutoPlacements;
	  var preferredPlacement = state.options.placement;
	  var basePlacement = getBasePlacement(preferredPlacement);
	  var isBasePlacement = basePlacement === preferredPlacement;
	  var fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipVariations ? [getOppositePlacement(preferredPlacement)] : getExpandedFallbackPlacements(preferredPlacement));
	  var placements = [preferredPlacement].concat(fallbackPlacements).reduce(function (acc, placement) {
	    return acc.concat(getBasePlacement(placement) === auto ? computeAutoPlacement(state, {
	      placement: placement,
	      boundary: boundary,
	      rootBoundary: rootBoundary,
	      padding: padding,
	      flipVariations: flipVariations,
	      allowedAutoPlacements: allowedAutoPlacements
	    }) : placement);
	  }, []);
	  var referenceRect = state.rects.reference;
	  var popperRect = state.rects.popper;
	  var checksMap = new Map();
	  var makeFallbackChecks = true;
	  var firstFittingPlacement = placements[0];
	  for (var i = 0; i < placements.length; i++) {
	    var placement = placements[i];
	    var _basePlacement = getBasePlacement(placement);
	    var isStartVariation = getVariation(placement) === start;
	    var isVertical = [top, bottom].indexOf(_basePlacement) >= 0;
	    var len = isVertical ? 'width' : 'height';
	    var overflow = detectOverflow(state, {
	      placement: placement,
	      boundary: boundary,
	      rootBoundary: rootBoundary,
	      altBoundary: altBoundary,
	      padding: padding
	    });
	    var mainVariationSide = isVertical ? isStartVariation ? right : left : isStartVariation ? bottom : top;
	    if (referenceRect[len] > popperRect[len]) {
	      mainVariationSide = getOppositePlacement(mainVariationSide);
	    }
	    var altVariationSide = getOppositePlacement(mainVariationSide);
	    var checks = [];
	    if (checkMainAxis) {
	      checks.push(overflow[_basePlacement] <= 0);
	    }
	    if (checkAltAxis) {
	      checks.push(overflow[mainVariationSide] <= 0, overflow[altVariationSide] <= 0);
	    }
	    if (checks.every(function (check) {
	      return check;
	    })) {
	      firstFittingPlacement = placement;
	      makeFallbackChecks = false;
	      break;
	    }
	    checksMap.set(placement, checks);
	  }
	  if (makeFallbackChecks) {
	    // `2` may be desired in some cases – research later
	    var numberOfChecks = flipVariations ? 3 : 1;
	    var _loop = function _loop(_i) {
	      var fittingPlacement = placements.find(function (placement) {
	        var checks = checksMap.get(placement);
	        if (checks) {
	          return checks.slice(0, _i).every(function (check) {
	            return check;
	          });
	        }
	      });
	      if (fittingPlacement) {
	        firstFittingPlacement = fittingPlacement;
	        return "break";
	      }
	    };
	    for (var _i = numberOfChecks; _i > 0; _i--) {
	      var _ret = _loop(_i);
	      if (_ret === "break") break;
	    }
	  }
	  if (state.placement !== firstFittingPlacement) {
	    state.modifiersData[name]._skip = true;
	    state.placement = firstFittingPlacement;
	    state.reset = true;
	  }
	} // eslint-disable-next-line import/no-unused-modules

	var flip$1 = {
	  name: 'flip',
	  enabled: true,
	  phase: 'main',
	  fn: flip,
	  requiresIfExists: ['offset'],
	  data: {
	    _skip: false
	  }
	};

	function getSideOffsets(overflow, rect, preventedOffsets) {
	  if (preventedOffsets === void 0) {
	    preventedOffsets = {
	      x: 0,
	      y: 0
	    };
	  }
	  return {
	    top: overflow.top - rect.height - preventedOffsets.y,
	    right: overflow.right - rect.width + preventedOffsets.x,
	    bottom: overflow.bottom - rect.height + preventedOffsets.y,
	    left: overflow.left - rect.width - preventedOffsets.x
	  };
	}
	function isAnySideFullyClipped(overflow) {
	  return [top, right, bottom, left].some(function (side) {
	    return overflow[side] >= 0;
	  });
	}
	function hide(_ref) {
	  var state = _ref.state,
	    name = _ref.name;
	  var referenceRect = state.rects.reference;
	  var popperRect = state.rects.popper;
	  var preventedOffsets = state.modifiersData.preventOverflow;
	  var referenceOverflow = detectOverflow(state, {
	    elementContext: 'reference'
	  });
	  var popperAltOverflow = detectOverflow(state, {
	    altBoundary: true
	  });
	  var referenceClippingOffsets = getSideOffsets(referenceOverflow, referenceRect);
	  var popperEscapeOffsets = getSideOffsets(popperAltOverflow, popperRect, preventedOffsets);
	  var isReferenceHidden = isAnySideFullyClipped(referenceClippingOffsets);
	  var hasPopperEscaped = isAnySideFullyClipped(popperEscapeOffsets);
	  state.modifiersData[name] = {
	    referenceClippingOffsets: referenceClippingOffsets,
	    popperEscapeOffsets: popperEscapeOffsets,
	    isReferenceHidden: isReferenceHidden,
	    hasPopperEscaped: hasPopperEscaped
	  };
	  state.attributes.popper = Object.assign({}, state.attributes.popper, {
	    'data-popper-reference-hidden': isReferenceHidden,
	    'data-popper-escaped': hasPopperEscaped
	  });
	} // eslint-disable-next-line import/no-unused-modules

	var hide$1 = {
	  name: 'hide',
	  enabled: true,
	  phase: 'main',
	  requiresIfExists: ['preventOverflow'],
	  fn: hide
	};

	function distanceAndSkiddingToXY(placement, rects, offset) {
	  var basePlacement = getBasePlacement(placement);
	  var invertDistance = [left, top].indexOf(basePlacement) >= 0 ? -1 : 1;
	  var _ref = typeof offset === 'function' ? offset(Object.assign({}, rects, {
	      placement: placement
	    })) : offset,
	    skidding = _ref[0],
	    distance = _ref[1];
	  skidding = skidding || 0;
	  distance = (distance || 0) * invertDistance;
	  return [left, right].indexOf(basePlacement) >= 0 ? {
	    x: distance,
	    y: skidding
	  } : {
	    x: skidding,
	    y: distance
	  };
	}
	function offset(_ref2) {
	  var state = _ref2.state,
	    options = _ref2.options,
	    name = _ref2.name;
	  var _options$offset = options.offset,
	    offset = _options$offset === void 0 ? [0, 0] : _options$offset;
	  var data = placements.reduce(function (acc, placement) {
	    acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset);
	    return acc;
	  }, {});
	  var _data$state$placement = data[state.placement],
	    x = _data$state$placement.x,
	    y = _data$state$placement.y;
	  if (state.modifiersData.popperOffsets != null) {
	    state.modifiersData.popperOffsets.x += x;
	    state.modifiersData.popperOffsets.y += y;
	  }
	  state.modifiersData[name] = data;
	} // eslint-disable-next-line import/no-unused-modules

	var offset$1 = {
	  name: 'offset',
	  enabled: true,
	  phase: 'main',
	  requires: ['popperOffsets'],
	  fn: offset
	};

	function popperOffsets(_ref) {
	  var state = _ref.state,
	    name = _ref.name;
	  // Offsets are the actual position the popper needs to have to be
	  // properly positioned near its reference element
	  // This is the most basic placement, and will be adjusted by
	  // the modifiers in the next step
	  state.modifiersData[name] = computeOffsets({
	    reference: state.rects.reference,
	    element: state.rects.popper,
	    strategy: 'absolute',
	    placement: state.placement
	  });
	} // eslint-disable-next-line import/no-unused-modules

	var popperOffsets$1 = {
	  name: 'popperOffsets',
	  enabled: true,
	  phase: 'read',
	  fn: popperOffsets,
	  data: {}
	};

	function getAltAxis(axis) {
	  return axis === 'x' ? 'y' : 'x';
	}

	function preventOverflow(_ref) {
	  var state = _ref.state,
	    options = _ref.options,
	    name = _ref.name;
	  var _options$mainAxis = options.mainAxis,
	    checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
	    _options$altAxis = options.altAxis,
	    checkAltAxis = _options$altAxis === void 0 ? false : _options$altAxis,
	    boundary = options.boundary,
	    rootBoundary = options.rootBoundary,
	    altBoundary = options.altBoundary,
	    padding = options.padding,
	    _options$tether = options.tether,
	    tether = _options$tether === void 0 ? true : _options$tether,
	    _options$tetherOffset = options.tetherOffset,
	    tetherOffset = _options$tetherOffset === void 0 ? 0 : _options$tetherOffset;
	  var overflow = detectOverflow(state, {
	    boundary: boundary,
	    rootBoundary: rootBoundary,
	    padding: padding,
	    altBoundary: altBoundary
	  });
	  var basePlacement = getBasePlacement(state.placement);
	  var variation = getVariation(state.placement);
	  var isBasePlacement = !variation;
	  var mainAxis = getMainAxisFromPlacement(basePlacement);
	  var altAxis = getAltAxis(mainAxis);
	  var popperOffsets = state.modifiersData.popperOffsets;
	  var referenceRect = state.rects.reference;
	  var popperRect = state.rects.popper;
	  var tetherOffsetValue = typeof tetherOffset === 'function' ? tetherOffset(Object.assign({}, state.rects, {
	    placement: state.placement
	  })) : tetherOffset;
	  var normalizedTetherOffsetValue = typeof tetherOffsetValue === 'number' ? {
	    mainAxis: tetherOffsetValue,
	    altAxis: tetherOffsetValue
	  } : Object.assign({
	    mainAxis: 0,
	    altAxis: 0
	  }, tetherOffsetValue);
	  var offsetModifierState = state.modifiersData.offset ? state.modifiersData.offset[state.placement] : null;
	  var data = {
	    x: 0,
	    y: 0
	  };
	  if (!popperOffsets) {
	    return;
	  }
	  if (checkMainAxis) {
	    var _offsetModifierState$;
	    var mainSide = mainAxis === 'y' ? top : left;
	    var altSide = mainAxis === 'y' ? bottom : right;
	    var len = mainAxis === 'y' ? 'height' : 'width';
	    var offset = popperOffsets[mainAxis];
	    var min$1 = offset + overflow[mainSide];
	    var max$1 = offset - overflow[altSide];
	    var additive = tether ? -popperRect[len] / 2 : 0;
	    var minLen = variation === start ? referenceRect[len] : popperRect[len];
	    var maxLen = variation === start ? -popperRect[len] : -referenceRect[len]; // We need to include the arrow in the calculation so the arrow doesn't go
	    // outside the reference bounds

	    var arrowElement = state.elements.arrow;
	    var arrowRect = tether && arrowElement ? getLayoutRect(arrowElement) : {
	      width: 0,
	      height: 0
	    };
	    var arrowPaddingObject = state.modifiersData['arrow#persistent'] ? state.modifiersData['arrow#persistent'].padding : getFreshSideObject();
	    var arrowPaddingMin = arrowPaddingObject[mainSide];
	    var arrowPaddingMax = arrowPaddingObject[altSide]; // If the reference length is smaller than the arrow length, we don't want
	    // to include its full size in the calculation. If the reference is small
	    // and near the edge of a boundary, the popper can overflow even if the
	    // reference is not overflowing as well (e.g. virtual elements with no
	    // width or height)

	    var arrowLen = within(0, referenceRect[len], arrowRect[len]);
	    var minOffset = isBasePlacement ? referenceRect[len] / 2 - additive - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis : minLen - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis;
	    var maxOffset = isBasePlacement ? -referenceRect[len] / 2 + additive + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis : maxLen + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis;
	    var arrowOffsetParent = state.elements.arrow && getOffsetParent(state.elements.arrow);
	    var clientOffset = arrowOffsetParent ? mainAxis === 'y' ? arrowOffsetParent.clientTop || 0 : arrowOffsetParent.clientLeft || 0 : 0;
	    var offsetModifierValue = (_offsetModifierState$ = offsetModifierState == null ? void 0 : offsetModifierState[mainAxis]) != null ? _offsetModifierState$ : 0;
	    var tetherMin = offset + minOffset - offsetModifierValue - clientOffset;
	    var tetherMax = offset + maxOffset - offsetModifierValue;
	    var preventedOffset = within(tether ? min(min$1, tetherMin) : min$1, offset, tether ? max(max$1, tetherMax) : max$1);
	    popperOffsets[mainAxis] = preventedOffset;
	    data[mainAxis] = preventedOffset - offset;
	  }
	  if (checkAltAxis) {
	    var _offsetModifierState$2;
	    var _mainSide = mainAxis === 'x' ? top : left;
	    var _altSide = mainAxis === 'x' ? bottom : right;
	    var _offset = popperOffsets[altAxis];
	    var _len = altAxis === 'y' ? 'height' : 'width';
	    var _min = _offset + overflow[_mainSide];
	    var _max = _offset - overflow[_altSide];
	    var isOriginSide = [top, left].indexOf(basePlacement) !== -1;
	    var _offsetModifierValue = (_offsetModifierState$2 = offsetModifierState == null ? void 0 : offsetModifierState[altAxis]) != null ? _offsetModifierState$2 : 0;
	    var _tetherMin = isOriginSide ? _min : _offset - referenceRect[_len] - popperRect[_len] - _offsetModifierValue + normalizedTetherOffsetValue.altAxis;
	    var _tetherMax = isOriginSide ? _offset + referenceRect[_len] + popperRect[_len] - _offsetModifierValue - normalizedTetherOffsetValue.altAxis : _max;
	    var _preventedOffset = tether && isOriginSide ? withinMaxClamp(_tetherMin, _offset, _tetherMax) : within(tether ? _tetherMin : _min, _offset, tether ? _tetherMax : _max);
	    popperOffsets[altAxis] = _preventedOffset;
	    data[altAxis] = _preventedOffset - _offset;
	  }
	  state.modifiersData[name] = data;
	} // eslint-disable-next-line import/no-unused-modules

	var preventOverflow$1 = {
	  name: 'preventOverflow',
	  enabled: true,
	  phase: 'main',
	  fn: preventOverflow,
	  requiresIfExists: ['offset']
	};

	var isConstructor = isConstructor$4;
	var tryToString = tryToString$5;

	var $TypeError$2 = TypeError;

	// `Assert: IsConstructor(argument) is true`
	var aConstructor$1 = function (argument) {
	  if (isConstructor(argument)) return argument;
	  throw $TypeError$2(tryToString(argument) + ' is not a constructor');
	};

	var anObject$1 = anObject$h;
	var aConstructor = aConstructor$1;
	var isNullOrUndefined = isNullOrUndefined$8;
	var wellKnownSymbol$1 = wellKnownSymbol$n;

	var SPECIES$1 = wellKnownSymbol$1('species');

	// `SpeciesConstructor` abstract operation
	// https://tc39.es/ecma262/#sec-speciesconstructor
	var speciesConstructor$1 = function (O, defaultConstructor) {
	  var C = anObject$1(O).constructor;
	  var S;
	  return C === undefined || isNullOrUndefined(S = anObject$1(C)[SPECIES$1]) ? defaultConstructor : aConstructor(S);
	};

	var $TypeError$1 = TypeError;

	var validateArgumentsLength$1 = function (passed, required) {
	  if (passed < required) throw $TypeError$1('Not enough arguments');
	  return passed;
	};

	var userAgent$2 = engineUserAgent;

	// eslint-disable-next-line redos/no-vulnerable -- safe
	var engineIsIos = /(?:ipad|iphone|ipod).*applewebkit/i.test(userAgent$2);

	var global$5 = global$s;
	var apply = functionApply;
	var bind$2 = functionBindContext;
	var isCallable$3 = isCallable$p;
	var hasOwn = hasOwnProperty_1;
	var fails = fails$A;
	var html = html$2;
	var arraySlice = arraySlice$2;
	var createElement = documentCreateElement$2;
	var validateArgumentsLength = validateArgumentsLength$1;
	var IS_IOS$1 = engineIsIos;
	var IS_NODE$3 = engineIsNode;

	var set = global$5.setImmediate;
	var clear = global$5.clearImmediate;
	var process$2 = global$5.process;
	var Dispatch = global$5.Dispatch;
	var Function$1 = global$5.Function;
	var MessageChannel = global$5.MessageChannel;
	var String$1 = global$5.String;
	var counter = 0;
	var queue$2 = {};
	var ONREADYSTATECHANGE = 'onreadystatechange';
	var $location, defer, channel, port;

	fails(function () {
	  // Deno throws a ReferenceError on `location` access without `--location` flag
	  $location = global$5.location;
	});

	var run = function (id) {
	  if (hasOwn(queue$2, id)) {
	    var fn = queue$2[id];
	    delete queue$2[id];
	    fn();
	  }
	};

	var runner = function (id) {
	  return function () {
	    run(id);
	  };
	};

	var eventListener = function (event) {
	  run(event.data);
	};

	var globalPostMessageDefer = function (id) {
	  // old engines have not location.origin
	  global$5.postMessage(String$1(id), $location.protocol + '//' + $location.host);
	};

	// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
	if (!set || !clear) {
	  set = function setImmediate(handler) {
	    validateArgumentsLength(arguments.length, 1);
	    var fn = isCallable$3(handler) ? handler : Function$1(handler);
	    var args = arraySlice(arguments, 1);
	    queue$2[++counter] = function () {
	      apply(fn, undefined, args);
	    };
	    defer(counter);
	    return counter;
	  };
	  clear = function clearImmediate(id) {
	    delete queue$2[id];
	  };
	  // Node.js 0.8-
	  if (IS_NODE$3) {
	    defer = function (id) {
	      process$2.nextTick(runner(id));
	    };
	  // Sphere (JS game engine) Dispatch API
	  } else if (Dispatch && Dispatch.now) {
	    defer = function (id) {
	      Dispatch.now(runner(id));
	    };
	  // Browsers with MessageChannel, includes WebWorkers
	  // except iOS - https://github.com/zloirock/core-js/issues/624
	  } else if (MessageChannel && !IS_IOS$1) {
	    channel = new MessageChannel();
	    port = channel.port2;
	    channel.port1.onmessage = eventListener;
	    defer = bind$2(port.postMessage, port);
	  // Browsers with postMessage, skip WebWorkers
	  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
	  } else if (
	    global$5.addEventListener &&
	    isCallable$3(global$5.postMessage) &&
	    !global$5.importScripts &&
	    $location && $location.protocol !== 'file:' &&
	    !fails(globalPostMessageDefer)
	  ) {
	    defer = globalPostMessageDefer;
	    global$5.addEventListener('message', eventListener, false);
	  // IE8-
	  } else if (ONREADYSTATECHANGE in createElement('script')) {
	    defer = function (id) {
	      html.appendChild(createElement('script'))[ONREADYSTATECHANGE] = function () {
	        html.removeChild(this);
	        run(id);
	      };
	    };
	  // Rest old browsers
	  } else {
	    defer = function (id) {
	      setTimeout(runner(id), 0);
	    };
	  }
	}

	var task$1 = {
	  set: set,
	  clear: clear
	};

	var Queue$2 = function () {
	  this.head = null;
	  this.tail = null;
	};

	Queue$2.prototype = {
	  add: function (item) {
	    var entry = { item: item, next: null };
	    var tail = this.tail;
	    if (tail) tail.next = entry;
	    else this.head = entry;
	    this.tail = entry;
	  },
	  get: function () {
	    var entry = this.head;
	    if (entry) {
	      var next = this.head = entry.next;
	      if (next === null) this.tail = null;
	      return entry.item;
	    }
	  }
	};

	var queue$1 = Queue$2;

	var userAgent$1 = engineUserAgent;

	var engineIsIosPebble = /ipad|iphone|ipod/i.test(userAgent$1) && typeof Pebble != 'undefined';

	var userAgent = engineUserAgent;

	var engineIsWebosWebkit = /web0s(?!.*chrome)/i.test(userAgent);

	var global$4 = global$s;
	var bind$1 = functionBindContext;
	var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
	var macrotask = task$1.set;
	var Queue$1 = queue$1;
	var IS_IOS = engineIsIos;
	var IS_IOS_PEBBLE = engineIsIosPebble;
	var IS_WEBOS_WEBKIT = engineIsWebosWebkit;
	var IS_NODE$2 = engineIsNode;

	var MutationObserver = global$4.MutationObserver || global$4.WebKitMutationObserver;
	var document$2 = global$4.document;
	var process$1 = global$4.process;
	var Promise$1 = global$4.Promise;
	// Node.js 11 shows ExperimentalWarning on getting `queueMicrotask`
	var queueMicrotaskDescriptor = getOwnPropertyDescriptor(global$4, 'queueMicrotask');
	var microtask$1 = queueMicrotaskDescriptor && queueMicrotaskDescriptor.value;
	var notify$1, toggle, node, promise, then;

	// modern engines have queueMicrotask method
	if (!microtask$1) {
	  var queue = new Queue$1();

	  var flush = function () {
	    var parent, fn;
	    if (IS_NODE$2 && (parent = process$1.domain)) parent.exit();
	    while (fn = queue.get()) try {
	      fn();
	    } catch (error) {
	      if (queue.head) notify$1();
	      throw error;
	    }
	    if (parent) parent.enter();
	  };

	  // browsers with MutationObserver, except iOS - https://github.com/zloirock/core-js/issues/339
	  // also except WebOS Webkit https://github.com/zloirock/core-js/issues/898
	  if (!IS_IOS && !IS_NODE$2 && !IS_WEBOS_WEBKIT && MutationObserver && document$2) {
	    toggle = true;
	    node = document$2.createTextNode('');
	    new MutationObserver(flush).observe(node, { characterData: true });
	    notify$1 = function () {
	      node.data = toggle = !toggle;
	    };
	  // environments with maybe non-completely correct, but existent Promise
	  } else if (!IS_IOS_PEBBLE && Promise$1 && Promise$1.resolve) {
	    // Promise.resolve without an argument throws an error in LG WebOS 2
	    promise = Promise$1.resolve(undefined);
	    // workaround of WebKit ~ iOS Safari 10.1 bug
	    promise.constructor = Promise$1;
	    then = bind$1(promise.then, promise);
	    notify$1 = function () {
	      then(flush);
	    };
	  // Node.js without promises
	  } else if (IS_NODE$2) {
	    notify$1 = function () {
	      process$1.nextTick(flush);
	    };
	  // for other environments - macrotask based on:
	  // - setImmediate
	  // - MessageChannel
	  // - window.postMessage
	  // - onreadystatechange
	  // - setTimeout
	  } else {
	    // `webpack` dev server bug on IE global methods - use bind(fn, global)
	    macrotask = bind$1(macrotask, global$4);
	    notify$1 = function () {
	      macrotask(flush);
	    };
	  }

	  microtask$1 = function (fn) {
	    if (!queue.head) notify$1();
	    queue.add(fn);
	  };
	}

	var microtask_1 = microtask$1;

	var hostReportErrors$1 = function (a, b) {
	  try {
	    // eslint-disable-next-line no-console -- safe
	    arguments.length === 1 ? console.error(a) : console.error(a, b);
	  } catch (error) { /* empty */ }
	};

	var perform$3 = function (exec) {
	  try {
	    return { error: false, value: exec() };
	  } catch (error) {
	    return { error: true, value: error };
	  }
	};

	var global$3 = global$s;

	var promiseNativeConstructor = global$3.Promise;

	/* global Deno -- Deno case */
	var engineIsDeno = typeof Deno == 'object' && Deno && typeof Deno.version == 'object';

	var IS_DENO$1 = engineIsDeno;
	var IS_NODE$1 = engineIsNode;

	var engineIsBrowser = !IS_DENO$1 && !IS_NODE$1
	  && typeof window == 'object'
	  && typeof document == 'object';

	var global$2 = global$s;
	var NativePromiseConstructor$3 = promiseNativeConstructor;
	var isCallable$2 = isCallable$p;
	var isForced = isForced_1;
	var inspectSource = inspectSource$3;
	var wellKnownSymbol = wellKnownSymbol$n;
	var IS_BROWSER = engineIsBrowser;
	var IS_DENO = engineIsDeno;
	var V8_VERSION = engineV8Version;

	NativePromiseConstructor$3 && NativePromiseConstructor$3.prototype;
	var SPECIES = wellKnownSymbol('species');
	var SUBCLASSING = false;
	var NATIVE_PROMISE_REJECTION_EVENT$1 = isCallable$2(global$2.PromiseRejectionEvent);

	var FORCED_PROMISE_CONSTRUCTOR$5 = isForced('Promise', function () {
	  var PROMISE_CONSTRUCTOR_SOURCE = inspectSource(NativePromiseConstructor$3);
	  var GLOBAL_CORE_JS_PROMISE = PROMISE_CONSTRUCTOR_SOURCE !== String(NativePromiseConstructor$3);
	  // V8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
	  // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
	  // We can't detect it synchronously, so just check versions
	  if (!GLOBAL_CORE_JS_PROMISE && V8_VERSION === 66) return true;
	  // We can't use @@species feature detection in V8 since it causes
	  // deoptimization and performance degradation
	  // https://github.com/zloirock/core-js/issues/679
	  if (!V8_VERSION || V8_VERSION < 51 || !/native code/.test(PROMISE_CONSTRUCTOR_SOURCE)) {
	    // Detect correctness of subclassing with @@species support
	    var promise = new NativePromiseConstructor$3(function (resolve) { resolve(1); });
	    var FakePromise = function (exec) {
	      exec(function () { /* empty */ }, function () { /* empty */ });
	    };
	    var constructor = promise.constructor = {};
	    constructor[SPECIES] = FakePromise;
	    SUBCLASSING = promise.then(function () { /* empty */ }) instanceof FakePromise;
	    if (!SUBCLASSING) return true;
	  // Unhandled rejections tracking support, NodeJS Promise without it fails @@species test
	  } return !GLOBAL_CORE_JS_PROMISE && (IS_BROWSER || IS_DENO) && !NATIVE_PROMISE_REJECTION_EVENT$1;
	});

	var promiseConstructorDetection = {
	  CONSTRUCTOR: FORCED_PROMISE_CONSTRUCTOR$5,
	  REJECTION_EVENT: NATIVE_PROMISE_REJECTION_EVENT$1,
	  SUBCLASSING: SUBCLASSING
	};

	var newPromiseCapability$2 = {};

	var aCallable$3 = aCallable$a;

	var $TypeError = TypeError;

	var PromiseCapability = function (C) {
	  var resolve, reject;
	  this.promise = new C(function ($$resolve, $$reject) {
	    if (resolve !== undefined || reject !== undefined) throw $TypeError('Bad Promise constructor');
	    resolve = $$resolve;
	    reject = $$reject;
	  });
	  this.resolve = aCallable$3(resolve);
	  this.reject = aCallable$3(reject);
	};

	// `NewPromiseCapability` abstract operation
	// https://tc39.es/ecma262/#sec-newpromisecapability
	newPromiseCapability$2.f = function (C) {
	  return new PromiseCapability(C);
	};

	var $$5 = _export;
	var IS_NODE = engineIsNode;
	var global$1 = global$s;
	var call$3 = functionCall;
	var defineBuiltIn$1 = defineBuiltIn$b;
	var setPrototypeOf = objectSetPrototypeOf;
	var setToStringTag = setToStringTag$4;
	var setSpecies = setSpecies$3;
	var aCallable$2 = aCallable$a;
	var isCallable$1 = isCallable$p;
	var isObject$1 = isObject$g;
	var anInstance = anInstance$3;
	var speciesConstructor = speciesConstructor$1;
	var task = task$1.set;
	var microtask = microtask_1;
	var hostReportErrors = hostReportErrors$1;
	var perform$2 = perform$3;
	var Queue = queue$1;
	var InternalStateModule = internalState;
	var NativePromiseConstructor$2 = promiseNativeConstructor;
	var PromiseConstructorDetection = promiseConstructorDetection;
	var newPromiseCapabilityModule$3 = newPromiseCapability$2;

	var PROMISE = 'Promise';
	var FORCED_PROMISE_CONSTRUCTOR$4 = PromiseConstructorDetection.CONSTRUCTOR;
	var NATIVE_PROMISE_REJECTION_EVENT = PromiseConstructorDetection.REJECTION_EVENT;
	var NATIVE_PROMISE_SUBCLASSING = PromiseConstructorDetection.SUBCLASSING;
	var getInternalPromiseState = InternalStateModule.getterFor(PROMISE);
	var setInternalState = InternalStateModule.set;
	var NativePromisePrototype$1 = NativePromiseConstructor$2 && NativePromiseConstructor$2.prototype;
	var PromiseConstructor = NativePromiseConstructor$2;
	var PromisePrototype = NativePromisePrototype$1;
	var TypeError$1 = global$1.TypeError;
	var document$1 = global$1.document;
	var process = global$1.process;
	var newPromiseCapability$1 = newPromiseCapabilityModule$3.f;
	var newGenericPromiseCapability = newPromiseCapability$1;

	var DISPATCH_EVENT = !!(document$1 && document$1.createEvent && global$1.dispatchEvent);
	var UNHANDLED_REJECTION = 'unhandledrejection';
	var REJECTION_HANDLED = 'rejectionhandled';
	var PENDING = 0;
	var FULFILLED = 1;
	var REJECTED = 2;
	var HANDLED = 1;
	var UNHANDLED = 2;

	var Internal, OwnPromiseCapability, PromiseWrapper, nativeThen;

	// helpers
	var isThenable = function (it) {
	  var then;
	  return isObject$1(it) && isCallable$1(then = it.then) ? then : false;
	};

	var callReaction = function (reaction, state) {
	  var value = state.value;
	  var ok = state.state === FULFILLED;
	  var handler = ok ? reaction.ok : reaction.fail;
	  var resolve = reaction.resolve;
	  var reject = reaction.reject;
	  var domain = reaction.domain;
	  var result, then, exited;
	  try {
	    if (handler) {
	      if (!ok) {
	        if (state.rejection === UNHANDLED) onHandleUnhandled(state);
	        state.rejection = HANDLED;
	      }
	      if (handler === true) result = value;
	      else {
	        if (domain) domain.enter();
	        result = handler(value); // can throw
	        if (domain) {
	          domain.exit();
	          exited = true;
	        }
	      }
	      if (result === reaction.promise) {
	        reject(TypeError$1('Promise-chain cycle'));
	      } else if (then = isThenable(result)) {
	        call$3(then, result, resolve, reject);
	      } else resolve(result);
	    } else reject(value);
	  } catch (error) {
	    if (domain && !exited) domain.exit();
	    reject(error);
	  }
	};

	var notify = function (state, isReject) {
	  if (state.notified) return;
	  state.notified = true;
	  microtask(function () {
	    var reactions = state.reactions;
	    var reaction;
	    while (reaction = reactions.get()) {
	      callReaction(reaction, state);
	    }
	    state.notified = false;
	    if (isReject && !state.rejection) onUnhandled(state);
	  });
	};

	var dispatchEvent = function (name, promise, reason) {
	  var event, handler;
	  if (DISPATCH_EVENT) {
	    event = document$1.createEvent('Event');
	    event.promise = promise;
	    event.reason = reason;
	    event.initEvent(name, false, true);
	    global$1.dispatchEvent(event);
	  } else event = { promise: promise, reason: reason };
	  if (!NATIVE_PROMISE_REJECTION_EVENT && (handler = global$1['on' + name])) handler(event);
	  else if (name === UNHANDLED_REJECTION) hostReportErrors('Unhandled promise rejection', reason);
	};

	var onUnhandled = function (state) {
	  call$3(task, global$1, function () {
	    var promise = state.facade;
	    var value = state.value;
	    var IS_UNHANDLED = isUnhandled(state);
	    var result;
	    if (IS_UNHANDLED) {
	      result = perform$2(function () {
	        if (IS_NODE) {
	          process.emit('unhandledRejection', value, promise);
	        } else dispatchEvent(UNHANDLED_REJECTION, promise, value);
	      });
	      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
	      state.rejection = IS_NODE || isUnhandled(state) ? UNHANDLED : HANDLED;
	      if (result.error) throw result.value;
	    }
	  });
	};

	var isUnhandled = function (state) {
	  return state.rejection !== HANDLED && !state.parent;
	};

	var onHandleUnhandled = function (state) {
	  call$3(task, global$1, function () {
	    var promise = state.facade;
	    if (IS_NODE) {
	      process.emit('rejectionHandled', promise);
	    } else dispatchEvent(REJECTION_HANDLED, promise, state.value);
	  });
	};

	var bind = function (fn, state, unwrap) {
	  return function (value) {
	    fn(state, value, unwrap);
	  };
	};

	var internalReject = function (state, value, unwrap) {
	  if (state.done) return;
	  state.done = true;
	  if (unwrap) state = unwrap;
	  state.value = value;
	  state.state = REJECTED;
	  notify(state, true);
	};

	var internalResolve = function (state, value, unwrap) {
	  if (state.done) return;
	  state.done = true;
	  if (unwrap) state = unwrap;
	  try {
	    if (state.facade === value) throw TypeError$1("Promise can't be resolved itself");
	    var then = isThenable(value);
	    if (then) {
	      microtask(function () {
	        var wrapper = { done: false };
	        try {
	          call$3(then, value,
	            bind(internalResolve, wrapper, state),
	            bind(internalReject, wrapper, state)
	          );
	        } catch (error) {
	          internalReject(wrapper, error, state);
	        }
	      });
	    } else {
	      state.value = value;
	      state.state = FULFILLED;
	      notify(state, false);
	    }
	  } catch (error) {
	    internalReject({ done: false }, error, state);
	  }
	};

	// constructor polyfill
	if (FORCED_PROMISE_CONSTRUCTOR$4) {
	  // 25.4.3.1 Promise(executor)
	  PromiseConstructor = function Promise(executor) {
	    anInstance(this, PromisePrototype);
	    aCallable$2(executor);
	    call$3(Internal, this);
	    var state = getInternalPromiseState(this);
	    try {
	      executor(bind(internalResolve, state), bind(internalReject, state));
	    } catch (error) {
	      internalReject(state, error);
	    }
	  };

	  PromisePrototype = PromiseConstructor.prototype;

	  // eslint-disable-next-line no-unused-vars -- required for `.length`
	  Internal = function Promise(executor) {
	    setInternalState(this, {
	      type: PROMISE,
	      done: false,
	      notified: false,
	      parent: false,
	      reactions: new Queue(),
	      rejection: false,
	      state: PENDING,
	      value: undefined
	    });
	  };

	  // `Promise.prototype.then` method
	  // https://tc39.es/ecma262/#sec-promise.prototype.then
	  Internal.prototype = defineBuiltIn$1(PromisePrototype, 'then', function then(onFulfilled, onRejected) {
	    var state = getInternalPromiseState(this);
	    var reaction = newPromiseCapability$1(speciesConstructor(this, PromiseConstructor));
	    state.parent = true;
	    reaction.ok = isCallable$1(onFulfilled) ? onFulfilled : true;
	    reaction.fail = isCallable$1(onRejected) && onRejected;
	    reaction.domain = IS_NODE ? process.domain : undefined;
	    if (state.state === PENDING) state.reactions.add(reaction);
	    else microtask(function () {
	      callReaction(reaction, state);
	    });
	    return reaction.promise;
	  });

	  OwnPromiseCapability = function () {
	    var promise = new Internal();
	    var state = getInternalPromiseState(promise);
	    this.promise = promise;
	    this.resolve = bind(internalResolve, state);
	    this.reject = bind(internalReject, state);
	  };

	  newPromiseCapabilityModule$3.f = newPromiseCapability$1 = function (C) {
	    return C === PromiseConstructor || C === PromiseWrapper
	      ? new OwnPromiseCapability(C)
	      : newGenericPromiseCapability(C);
	  };

	  if (isCallable$1(NativePromiseConstructor$2) && NativePromisePrototype$1 !== Object.prototype) {
	    nativeThen = NativePromisePrototype$1.then;

	    if (!NATIVE_PROMISE_SUBCLASSING) {
	      // make `Promise#then` return a polyfilled `Promise` for native promise-based APIs
	      defineBuiltIn$1(NativePromisePrototype$1, 'then', function then(onFulfilled, onRejected) {
	        var that = this;
	        return new PromiseConstructor(function (resolve, reject) {
	          call$3(nativeThen, that, resolve, reject);
	        }).then(onFulfilled, onRejected);
	      // https://github.com/zloirock/core-js/issues/640
	      }, { unsafe: true });
	    }

	    // make `.constructor === Promise` work for native promise-based APIs
	    try {
	      delete NativePromisePrototype$1.constructor;
	    } catch (error) { /* empty */ }

	    // make `instanceof Promise` work for native promise-based APIs
	    if (setPrototypeOf) {
	      setPrototypeOf(NativePromisePrototype$1, PromisePrototype);
	    }
	  }
	}

	$$5({ global: true, constructor: true, wrap: true, forced: FORCED_PROMISE_CONSTRUCTOR$4 }, {
	  Promise: PromiseConstructor
	});

	setToStringTag(PromiseConstructor, PROMISE, false);
	setSpecies(PROMISE);

	var NativePromiseConstructor$1 = promiseNativeConstructor;
	var checkCorrectnessOfIteration = checkCorrectnessOfIteration$3;
	var FORCED_PROMISE_CONSTRUCTOR$3 = promiseConstructorDetection.CONSTRUCTOR;

	var promiseStaticsIncorrectIteration = FORCED_PROMISE_CONSTRUCTOR$3 || !checkCorrectnessOfIteration(function (iterable) {
	  NativePromiseConstructor$1.all(iterable).then(undefined, function () { /* empty */ });
	});

	var $$4 = _export;
	var call$2 = functionCall;
	var aCallable$1 = aCallable$a;
	var newPromiseCapabilityModule$2 = newPromiseCapability$2;
	var perform$1 = perform$3;
	var iterate$1 = iterate$4;
	var PROMISE_STATICS_INCORRECT_ITERATION$1 = promiseStaticsIncorrectIteration;

	// `Promise.all` method
	// https://tc39.es/ecma262/#sec-promise.all
	$$4({ target: 'Promise', stat: true, forced: PROMISE_STATICS_INCORRECT_ITERATION$1 }, {
	  all: function all(iterable) {
	    var C = this;
	    var capability = newPromiseCapabilityModule$2.f(C);
	    var resolve = capability.resolve;
	    var reject = capability.reject;
	    var result = perform$1(function () {
	      var $promiseResolve = aCallable$1(C.resolve);
	      var values = [];
	      var counter = 0;
	      var remaining = 1;
	      iterate$1(iterable, function (promise) {
	        var index = counter++;
	        var alreadyCalled = false;
	        remaining++;
	        call$2($promiseResolve, C, promise).then(function (value) {
	          if (alreadyCalled) return;
	          alreadyCalled = true;
	          values[index] = value;
	          --remaining || resolve(values);
	        }, reject);
	      });
	      --remaining || resolve(values);
	    });
	    if (result.error) reject(result.value);
	    return capability.promise;
	  }
	});

	var $$3 = _export;
	var FORCED_PROMISE_CONSTRUCTOR$2 = promiseConstructorDetection.CONSTRUCTOR;
	var NativePromiseConstructor = promiseNativeConstructor;
	var getBuiltIn$1 = getBuiltIn$7;
	var isCallable = isCallable$p;
	var defineBuiltIn = defineBuiltIn$b;

	var NativePromisePrototype = NativePromiseConstructor && NativePromiseConstructor.prototype;

	// `Promise.prototype.catch` method
	// https://tc39.es/ecma262/#sec-promise.prototype.catch
	$$3({ target: 'Promise', proto: true, forced: FORCED_PROMISE_CONSTRUCTOR$2, real: true }, {
	  'catch': function (onRejected) {
	    return this.then(undefined, onRejected);
	  }
	});

	// makes sure that native promise-based APIs `Promise#catch` properly works with patched `Promise#then`
	if (isCallable(NativePromiseConstructor)) {
	  var method = getBuiltIn$1('Promise').prototype['catch'];
	  if (NativePromisePrototype['catch'] !== method) {
	    defineBuiltIn(NativePromisePrototype, 'catch', method, { unsafe: true });
	  }
	}

	var $$2 = _export;
	var call$1 = functionCall;
	var aCallable = aCallable$a;
	var newPromiseCapabilityModule$1 = newPromiseCapability$2;
	var perform = perform$3;
	var iterate = iterate$4;
	var PROMISE_STATICS_INCORRECT_ITERATION = promiseStaticsIncorrectIteration;

	// `Promise.race` method
	// https://tc39.es/ecma262/#sec-promise.race
	$$2({ target: 'Promise', stat: true, forced: PROMISE_STATICS_INCORRECT_ITERATION }, {
	  race: function race(iterable) {
	    var C = this;
	    var capability = newPromiseCapabilityModule$1.f(C);
	    var reject = capability.reject;
	    var result = perform(function () {
	      var $promiseResolve = aCallable(C.resolve);
	      iterate(iterable, function (promise) {
	        call$1($promiseResolve, C, promise).then(capability.resolve, reject);
	      });
	    });
	    if (result.error) reject(result.value);
	    return capability.promise;
	  }
	});

	var $$1 = _export;
	var call = functionCall;
	var newPromiseCapabilityModule = newPromiseCapability$2;
	var FORCED_PROMISE_CONSTRUCTOR$1 = promiseConstructorDetection.CONSTRUCTOR;

	// `Promise.reject` method
	// https://tc39.es/ecma262/#sec-promise.reject
	$$1({ target: 'Promise', stat: true, forced: FORCED_PROMISE_CONSTRUCTOR$1 }, {
	  reject: function reject(r) {
	    var capability = newPromiseCapabilityModule.f(this);
	    call(capability.reject, undefined, r);
	    return capability.promise;
	  }
	});

	var anObject = anObject$h;
	var isObject = isObject$g;
	var newPromiseCapability = newPromiseCapability$2;

	var promiseResolve$1 = function (C, x) {
	  anObject(C);
	  if (isObject(x) && x.constructor === C) return x;
	  var promiseCapability = newPromiseCapability.f(C);
	  var resolve = promiseCapability.resolve;
	  resolve(x);
	  return promiseCapability.promise;
	};

	var $ = _export;
	var getBuiltIn = getBuiltIn$7;
	var FORCED_PROMISE_CONSTRUCTOR = promiseConstructorDetection.CONSTRUCTOR;
	var promiseResolve = promiseResolve$1;

	getBuiltIn('Promise');

	// `Promise.resolve` method
	// https://tc39.es/ecma262/#sec-promise.resolve
	$({ target: 'Promise', stat: true, forced: FORCED_PROMISE_CONSTRUCTOR }, {
	  resolve: function resolve(x) {
	    return promiseResolve(this, x);
	  }
	});

	function getHTMLElementScroll(element) {
	  return {
	    scrollLeft: element.scrollLeft,
	    scrollTop: element.scrollTop
	  };
	}

	function getNodeScroll(node) {
	  if (node === getWindow(node) || !isHTMLElement(node)) {
	    return getWindowScroll(node);
	  } else {
	    return getHTMLElementScroll(node);
	  }
	}

	function isElementScaled(element) {
	  var rect = element.getBoundingClientRect();
	  var scaleX = round(rect.width) / element.offsetWidth || 1;
	  var scaleY = round(rect.height) / element.offsetHeight || 1;
	  return scaleX !== 1 || scaleY !== 1;
	} // Returns the composite rect of an element relative to its offsetParent.
	// Composite means it takes into account transforms as well as layout.

	function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
	  if (isFixed === void 0) {
	    isFixed = false;
	  }
	  var isOffsetParentAnElement = isHTMLElement(offsetParent);
	  var offsetParentIsScaled = isHTMLElement(offsetParent) && isElementScaled(offsetParent);
	  var documentElement = getDocumentElement(offsetParent);
	  var rect = getBoundingClientRect(elementOrVirtualElement, offsetParentIsScaled, isFixed);
	  var scroll = {
	    scrollLeft: 0,
	    scrollTop: 0
	  };
	  var offsets = {
	    x: 0,
	    y: 0
	  };
	  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
	    if (getNodeName(offsetParent) !== 'body' ||
	    // https://github.com/popperjs/popper-core/issues/1078
	    isScrollParent(documentElement)) {
	      scroll = getNodeScroll(offsetParent);
	    }
	    if (isHTMLElement(offsetParent)) {
	      offsets = getBoundingClientRect(offsetParent, true);
	      offsets.x += offsetParent.clientLeft;
	      offsets.y += offsetParent.clientTop;
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

	function order(modifiers) {
	  var map = new Map();
	  var visited = new Set();
	  var result = [];
	  modifiers.forEach(function (modifier) {
	    map.set(modifier.name, modifier);
	  }); // On visiting object, check for its dependencies and visit them recursively

	  function sort(modifier) {
	    visited.add(modifier.name);
	    var requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
	    requires.forEach(function (dep) {
	      if (!visited.has(dep)) {
	        var depModifier = map.get(dep);
	        if (depModifier) {
	          sort(depModifier);
	        }
	      }
	    });
	    result.push(modifier);
	  }
	  modifiers.forEach(function (modifier) {
	    if (!visited.has(modifier.name)) {
	      // check for visited object
	      sort(modifier);
	    }
	  });
	  return result;
	}
	function orderModifiers(modifiers) {
	  // order based on dependencies
	  var orderedModifiers = order(modifiers); // order based on phase

	  return modifierPhases.reduce(function (acc, phase) {
	    return acc.concat(orderedModifiers.filter(function (modifier) {
	      return modifier.phase === phase;
	    }));
	  }, []);
	}

	function debounce(fn) {
	  var pending;
	  return function () {
	    if (!pending) {
	      pending = new Promise(function (resolve) {
	        Promise.resolve().then(function () {
	          pending = undefined;
	          resolve(fn());
	        });
	      });
	    }
	    return pending;
	  };
	}

	function mergeByName(modifiers) {
	  var merged = modifiers.reduce(function (merged, current) {
	    var existing = merged[current.name];
	    merged[current.name] = existing ? Object.assign({}, existing, current, {
	      options: Object.assign({}, existing.options, current.options),
	      data: Object.assign({}, existing.data, current.data)
	    }) : current;
	    return merged;
	  }, {}); // IE11 does not support Object.values

	  return Object.keys(merged).map(function (key) {
	    return merged[key];
	  });
	}

	var DEFAULT_OPTIONS = {
	  placement: 'bottom',
	  modifiers: [],
	  strategy: 'absolute'
	};
	function areValidElements() {
	  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
	    args[_key] = arguments[_key];
	  }
	  return !args.some(function (element) {
	    return !(element && typeof element.getBoundingClientRect === 'function');
	  });
	}
	function popperGenerator(generatorOptions) {
	  if (generatorOptions === void 0) {
	    generatorOptions = {};
	  }
	  var _generatorOptions = generatorOptions,
	    _generatorOptions$def = _generatorOptions.defaultModifiers,
	    defaultModifiers = _generatorOptions$def === void 0 ? [] : _generatorOptions$def,
	    _generatorOptions$def2 = _generatorOptions.defaultOptions,
	    defaultOptions = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
	  return function createPopper(reference, popper, options) {
	    if (options === void 0) {
	      options = defaultOptions;
	    }
	    var state = {
	      placement: 'bottom',
	      orderedModifiers: [],
	      options: Object.assign({}, DEFAULT_OPTIONS, defaultOptions),
	      modifiersData: {},
	      elements: {
	        reference: reference,
	        popper: popper
	      },
	      attributes: {},
	      styles: {}
	    };
	    var effectCleanupFns = [];
	    var isDestroyed = false;
	    var instance = {
	      state: state,
	      setOptions: function setOptions(setOptionsAction) {
	        var options = typeof setOptionsAction === 'function' ? setOptionsAction(state.options) : setOptionsAction;
	        cleanupModifierEffects();
	        state.options = Object.assign({}, defaultOptions, state.options, options);
	        state.scrollParents = {
	          reference: isElement(reference) ? listScrollParents(reference) : reference.contextElement ? listScrollParents(reference.contextElement) : [],
	          popper: listScrollParents(popper)
	        }; // Orders the modifiers based on their dependencies and `phase`
	        // properties

	        var orderedModifiers = orderModifiers(mergeByName([].concat(defaultModifiers, state.options.modifiers))); // Strip out disabled modifiers

	        state.orderedModifiers = orderedModifiers.filter(function (m) {
	          return m.enabled;
	        });
	        runModifierEffects();
	        return instance.update();
	      },
	      // Sync update – it will always be executed, even if not necessary. This
	      // is useful for low frequency updates where sync behavior simplifies the
	      // logic.
	      // For high frequency updates (e.g. `resize` and `scroll` events), always
	      // prefer the async Popper#update method
	      forceUpdate: function forceUpdate() {
	        if (isDestroyed) {
	          return;
	        }
	        var _state$elements = state.elements,
	          reference = _state$elements.reference,
	          popper = _state$elements.popper; // Don't proceed if `reference` or `popper` are not valid elements
	        // anymore

	        if (!areValidElements(reference, popper)) {
	          return;
	        } // Store the reference and popper rects to be read by modifiers

	        state.rects = {
	          reference: getCompositeRect(reference, getOffsetParent(popper), state.options.strategy === 'fixed'),
	          popper: getLayoutRect(popper)
	        }; // Modifiers have the ability to reset the current update cycle. The
	        // most common use case for this is the `flip` modifier changing the
	        // placement, which then needs to re-run all the modifiers, because the
	        // logic was previously ran for the previous placement and is therefore
	        // stale/incorrect

	        state.reset = false;
	        state.placement = state.options.placement; // On each update cycle, the `modifiersData` property for each modifier
	        // is filled with the initial data specified by the modifier. This means
	        // it doesn't persist and is fresh on each update.
	        // To ensure persistent data, use `${name}#persistent`

	        state.orderedModifiers.forEach(function (modifier) {
	          return state.modifiersData[modifier.name] = Object.assign({}, modifier.data);
	        });
	        for (var index = 0; index < state.orderedModifiers.length; index++) {
	          if (state.reset === true) {
	            state.reset = false;
	            index = -1;
	            continue;
	          }
	          var _state$orderedModifie = state.orderedModifiers[index],
	            fn = _state$orderedModifie.fn,
	            _state$orderedModifie2 = _state$orderedModifie.options,
	            _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2,
	            name = _state$orderedModifie.name;
	          if (typeof fn === 'function') {
	            state = fn({
	              state: state,
	              options: _options,
	              name: name,
	              instance: instance
	            }) || state;
	          }
	        }
	      },
	      // Async and optimistically optimized update – it will not be executed if
	      // not necessary (debounced to run at most once-per-tick)
	      update: debounce(function () {
	        return new Promise(function (resolve) {
	          instance.forceUpdate();
	          resolve(state);
	        });
	      }),
	      destroy: function destroy() {
	        cleanupModifierEffects();
	        isDestroyed = true;
	      }
	    };
	    if (!areValidElements(reference, popper)) {
	      return instance;
	    }
	    instance.setOptions(options).then(function (state) {
	      if (!isDestroyed && options.onFirstUpdate) {
	        options.onFirstUpdate(state);
	      }
	    }); // Modifiers have the ability to execute arbitrary code before the first
	    // update cycle runs. They will be executed in the same order as the update
	    // cycle. This is useful when a modifier adds some persistent data that
	    // other modifiers need to use, but the modifier is run after the dependent
	    // one.

	    function runModifierEffects() {
	      state.orderedModifiers.forEach(function (_ref) {
	        var name = _ref.name,
	          _ref$options = _ref.options,
	          options = _ref$options === void 0 ? {} : _ref$options,
	          effect = _ref.effect;
	        if (typeof effect === 'function') {
	          var cleanupFn = effect({
	            state: state,
	            name: name,
	            instance: instance,
	            options: options
	          });
	          var noopFn = function noopFn() {};
	          effectCleanupFns.push(cleanupFn || noopFn);
	        }
	      });
	    }
	    function cleanupModifierEffects() {
	      effectCleanupFns.forEach(function (fn) {
	        return fn();
	      });
	      effectCleanupFns = [];
	    }
	    return instance;
	  };
	}
	var createPopper$2 = /*#__PURE__*/popperGenerator(); // eslint-disable-next-line import/no-unused-modules

	var defaultModifiers$1 = [eventListeners, popperOffsets$1, computeStyles$1, applyStyles$1];
	var createPopper$1 = /*#__PURE__*/popperGenerator({
	  defaultModifiers: defaultModifiers$1
	}); // eslint-disable-next-line import/no-unused-modules

	var defaultModifiers = [eventListeners, popperOffsets$1, computeStyles$1, applyStyles$1, offset$1, flip$1, preventOverflow$1, arrow$1, hide$1];
	var createPopper = /*#__PURE__*/popperGenerator({
	  defaultModifiers: defaultModifiers
	}); // eslint-disable-next-line import/no-unused-modules

	var Popper = /*#__PURE__*/Object.freeze({
		__proto__: null,
		popperGenerator: popperGenerator,
		detectOverflow: detectOverflow,
		createPopperBase: createPopper$2,
		createPopper: createPopper,
		createPopperLite: createPopper$1,
		top: top,
		bottom: bottom,
		right: right,
		left: left,
		auto: auto,
		basePlacements: basePlacements,
		start: start,
		end: end,
		clippingParents: clippingParents,
		viewport: viewport,
		popper: popper,
		reference: reference,
		variationPlacements: variationPlacements,
		placements: placements,
		beforeRead: beforeRead,
		read: read,
		afterRead: afterRead,
		beforeMain: beforeMain,
		main: main,
		afterMain: afterMain,
		beforeWrite: beforeWrite,
		write: write,
		afterWrite: afterWrite,
		modifierPhases: modifierPhases,
		applyStyles: applyStyles$1,
		arrow: arrow$1,
		computeStyles: computeStyles$1,
		eventListeners: eventListeners,
		flip: flip$1,
		hide: hide$1,
		offset: offset$1,
		popperOffsets: popperOffsets$1,
		preventOverflow: preventOverflow$1
	});

	/**
	 * Constants
	 */

	var NAME$a = 'dropdown';
	var DATA_KEY$6 = 'bs.dropdown';
	var EVENT_KEY$6 = "." + DATA_KEY$6;
	var DATA_API_KEY$3 = '.data-api';
	var ESCAPE_KEY$2 = 'Escape';
	var TAB_KEY$1 = 'Tab';
	var ARROW_UP_KEY$1 = 'ArrowUp';
	var ARROW_DOWN_KEY$1 = 'ArrowDown';
	var RIGHT_MOUSE_BUTTON = 2; // MouseEvent.button value for the secondary button, usually the right button

	var EVENT_HIDE$5 = "hide" + EVENT_KEY$6;
	var EVENT_HIDDEN$5 = "hidden" + EVENT_KEY$6;
	var EVENT_SHOW$5 = "show" + EVENT_KEY$6;
	var EVENT_SHOWN$5 = "shown" + EVENT_KEY$6;
	var EVENT_CLICK_DATA_API$3 = "click" + EVENT_KEY$6 + DATA_API_KEY$3;
	var EVENT_KEYDOWN_DATA_API = "keydown" + EVENT_KEY$6 + DATA_API_KEY$3;
	var EVENT_KEYUP_DATA_API = "keyup" + EVENT_KEY$6 + DATA_API_KEY$3;
	var CLASS_NAME_SHOW$6 = 'show';
	var CLASS_NAME_DROPUP = 'dropup';
	var CLASS_NAME_DROPEND = 'dropend';
	var CLASS_NAME_DROPSTART = 'dropstart';
	var CLASS_NAME_DROPUP_CENTER = 'dropup-center';
	var CLASS_NAME_DROPDOWN_CENTER = 'dropdown-center';
	var SELECTOR_DATA_TOGGLE$3 = '[data-bs-toggle="dropdown"]:not(.disabled):not(:disabled)';
	var SELECTOR_DATA_TOGGLE_SHOWN = SELECTOR_DATA_TOGGLE$3 + "." + CLASS_NAME_SHOW$6;
	var SELECTOR_MENU = '.dropdown-menu';
	var SELECTOR_NAVBAR = '.navbar';
	var SELECTOR_NAVBAR_NAV = '.navbar-nav';
	var SELECTOR_VISIBLE_ITEMS = '.dropdown-menu .dropdown-item:not(.disabled):not(:disabled)';
	var PLACEMENT_TOP = isRTL() ? 'top-end' : 'top-start';
	var PLACEMENT_TOPEND = isRTL() ? 'top-start' : 'top-end';
	var PLACEMENT_BOTTOM = isRTL() ? 'bottom-end' : 'bottom-start';
	var PLACEMENT_BOTTOMEND = isRTL() ? 'bottom-start' : 'bottom-end';
	var PLACEMENT_RIGHT = isRTL() ? 'left-start' : 'right-start';
	var PLACEMENT_LEFT = isRTL() ? 'right-start' : 'left-start';
	var PLACEMENT_TOPCENTER = 'top';
	var PLACEMENT_BOTTOMCENTER = 'bottom';
	var Default$9 = {
	  autoClose: true,
	  boundary: 'clippingParents',
	  display: 'dynamic',
	  offset: [0, 2],
	  popperConfig: null,
	  reference: 'toggle'
	};
	var DefaultType$9 = {
	  autoClose: '(boolean|string)',
	  boundary: '(string|element)',
	  display: 'string',
	  offset: '(array|string|function)',
	  popperConfig: '(null|object|function)',
	  reference: '(string|element|object)'
	};

	/**
	 * Class definition
	 */
	var Dropdown = /*#__PURE__*/function (_BaseComponent) {
	  _inheritsLoose(Dropdown, _BaseComponent);
	  function Dropdown(element, config) {
	    var _this;
	    _this = _BaseComponent.call(this, element, config) || this;
	    _this._popper = null;
	    _this._parent = _this._element.parentNode; // dropdown wrapper
	    // TODO: v6 revert #37011 & change markup https://getbootstrap.com/docs/5.3/forms/input-group/
	    _this._menu = SelectorEngine.next(_this._element, SELECTOR_MENU)[0] || SelectorEngine.prev(_this._element, SELECTOR_MENU)[0] || SelectorEngine.findOne(SELECTOR_MENU, _this._parent);
	    _this._inNavbar = _this._detectNavbar();
	    return _this;
	  }

	  // Getters
	  var _proto = Dropdown.prototype;
	  // Public
	  _proto.toggle = function toggle() {
	    return this._isShown() ? this.hide() : this.show();
	  };
	  _proto.show = function show() {
	    if (isDisabled(this._element) || this._isShown()) {
	      return;
	    }
	    var relatedTarget = {
	      relatedTarget: this._element
	    };
	    var showEvent = EventHandler.trigger(this._element, EVENT_SHOW$5, relatedTarget);
	    if (showEvent.defaultPrevented) {
	      return;
	    }
	    this._createPopper();

	    // If this is a touch-enabled device we add extra
	    // empty mouseover listeners to the body's immediate children;
	    // only needed because of broken event delegation on iOS
	    // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html
	    if ('ontouchstart' in document.documentElement && !this._parent.closest(SELECTOR_NAVBAR_NAV)) {
	      for (var _iterator = _createForOfIteratorHelperLoose((_ref = []).concat.apply(_ref, document.body.children)), _step; !(_step = _iterator()).done;) {
	        var _ref;
	        var element = _step.value;
	        EventHandler.on(element, 'mouseover', noop);
	      }
	    }
	    this._element.focus();
	    this._element.setAttribute('aria-expanded', true);
	    this._menu.classList.add(CLASS_NAME_SHOW$6);
	    this._element.classList.add(CLASS_NAME_SHOW$6);
	    EventHandler.trigger(this._element, EVENT_SHOWN$5, relatedTarget);
	  };
	  _proto.hide = function hide() {
	    if (isDisabled(this._element) || !this._isShown()) {
	      return;
	    }
	    var relatedTarget = {
	      relatedTarget: this._element
	    };
	    this._completeHide(relatedTarget);
	  };
	  _proto.dispose = function dispose() {
	    if (this._popper) {
	      this._popper.destroy();
	    }
	    _BaseComponent.prototype.dispose.call(this);
	  };
	  _proto.update = function update() {
	    this._inNavbar = this._detectNavbar();
	    if (this._popper) {
	      this._popper.update();
	    }
	  }

	  // Private
	  ;
	  _proto._completeHide = function _completeHide(relatedTarget) {
	    var hideEvent = EventHandler.trigger(this._element, EVENT_HIDE$5, relatedTarget);
	    if (hideEvent.defaultPrevented) {
	      return;
	    }

	    // If this is a touch-enabled device we remove the extra
	    // empty mouseover listeners we added for iOS support
	    if ('ontouchstart' in document.documentElement) {
	      for (var _iterator2 = _createForOfIteratorHelperLoose((_ref2 = []).concat.apply(_ref2, document.body.children)), _step2; !(_step2 = _iterator2()).done;) {
	        var _ref2;
	        var element = _step2.value;
	        EventHandler.off(element, 'mouseover', noop);
	      }
	    }
	    if (this._popper) {
	      this._popper.destroy();
	    }
	    this._menu.classList.remove(CLASS_NAME_SHOW$6);
	    this._element.classList.remove(CLASS_NAME_SHOW$6);
	    this._element.setAttribute('aria-expanded', 'false');
	    Manipulator.removeDataAttribute(this._menu, 'popper');
	    EventHandler.trigger(this._element, EVENT_HIDDEN$5, relatedTarget);
	  };
	  _proto._getConfig = function _getConfig(config) {
	    config = _BaseComponent.prototype._getConfig.call(this, config);
	    if (typeof config.reference === 'object' && !isElement$1(config.reference) && typeof config.reference.getBoundingClientRect !== 'function') {
	      // Popper virtual elements require a getBoundingClientRect method
	      throw new TypeError(NAME$a.toUpperCase() + ": Option \"reference\" provided type \"object\" without a required \"getBoundingClientRect\" method.");
	    }
	    return config;
	  };
	  _proto._createPopper = function _createPopper() {
	    if (typeof Popper === 'undefined') {
	      throw new TypeError('Bootstrap\'s dropdowns require Popper (https://popper.js.org)');
	    }
	    var referenceElement = this._element;
	    if (this._config.reference === 'parent') {
	      referenceElement = this._parent;
	    } else if (isElement$1(this._config.reference)) {
	      referenceElement = getElement(this._config.reference);
	    } else if (typeof this._config.reference === 'object') {
	      referenceElement = this._config.reference;
	    }
	    var popperConfig = this._getPopperConfig();
	    this._popper = createPopper(referenceElement, this._menu, popperConfig);
	  };
	  _proto._isShown = function _isShown() {
	    return this._menu.classList.contains(CLASS_NAME_SHOW$6);
	  };
	  _proto._getPlacement = function _getPlacement() {
	    var parentDropdown = this._parent;
	    if (parentDropdown.classList.contains(CLASS_NAME_DROPEND)) {
	      return PLACEMENT_RIGHT;
	    }
	    if (parentDropdown.classList.contains(CLASS_NAME_DROPSTART)) {
	      return PLACEMENT_LEFT;
	    }
	    if (parentDropdown.classList.contains(CLASS_NAME_DROPUP_CENTER)) {
	      return PLACEMENT_TOPCENTER;
	    }
	    if (parentDropdown.classList.contains(CLASS_NAME_DROPDOWN_CENTER)) {
	      return PLACEMENT_BOTTOMCENTER;
	    }

	    // We need to trim the value because custom properties can also include spaces
	    var isEnd = getComputedStyle(this._menu).getPropertyValue('--bs-position').trim() === 'end';
	    if (parentDropdown.classList.contains(CLASS_NAME_DROPUP)) {
	      return isEnd ? PLACEMENT_TOPEND : PLACEMENT_TOP;
	    }
	    return isEnd ? PLACEMENT_BOTTOMEND : PLACEMENT_BOTTOM;
	  };
	  _proto._detectNavbar = function _detectNavbar() {
	    return this._element.closest(SELECTOR_NAVBAR) !== null;
	  };
	  _proto._getOffset = function _getOffset() {
	    var _this2 = this;
	    var offset = this._config.offset;
	    if (typeof offset === 'string') {
	      return offset.split(',').map(function (value) {
	        return Number.parseInt(value, 10);
	      });
	    }
	    if (typeof offset === 'function') {
	      return function (popperData) {
	        return offset(popperData, _this2._element);
	      };
	    }
	    return offset;
	  };
	  _proto._getPopperConfig = function _getPopperConfig() {
	    var defaultBsPopperConfig = {
	      placement: this._getPlacement(),
	      modifiers: [{
	        name: 'preventOverflow',
	        options: {
	          boundary: this._config.boundary
	        }
	      }, {
	        name: 'offset',
	        options: {
	          offset: this._getOffset()
	        }
	      }]
	    };

	    // Disable Popper if we have a static display or Dropdown is in Navbar
	    if (this._inNavbar || this._config.display === 'static') {
	      Manipulator.setDataAttribute(this._menu, 'popper', 'static'); // TODO: v6 remove
	      defaultBsPopperConfig.modifiers = [{
	        name: 'applyStyles',
	        enabled: false
	      }];
	    }
	    return Object.assign({}, defaultBsPopperConfig, execute(this._config.popperConfig, [defaultBsPopperConfig]));
	  };
	  _proto._selectMenuItem = function _selectMenuItem(_ref3) {
	    var key = _ref3.key,
	      target = _ref3.target;
	    var items = SelectorEngine.find(SELECTOR_VISIBLE_ITEMS, this._menu).filter(function (element) {
	      return isVisible(element);
	    });
	    if (!items.length) {
	      return;
	    }

	    // if target isn't included in items (e.g. when expanding the dropdown)
	    // allow cycling to get the last item in case key equals ARROW_UP_KEY
	    getNextActiveElement(items, target, key === ARROW_DOWN_KEY$1, !items.includes(target)).focus();
	  }

	  // Static
	  ;
	  Dropdown.jQueryInterface = function jQueryInterface(config) {
	    return this.each(function () {
	      var data = Dropdown.getOrCreateInstance(this, config);
	      if (typeof config !== 'string') {
	        return;
	      }
	      if (typeof data[config] === 'undefined') {
	        throw new TypeError("No method named \"" + config + "\"");
	      }
	      data[config]();
	    });
	  };
	  Dropdown.clearMenus = function clearMenus(event) {
	    if (event.button === RIGHT_MOUSE_BUTTON || event.type === 'keyup' && event.key !== TAB_KEY$1) {
	      return;
	    }
	    var openToggles = SelectorEngine.find(SELECTOR_DATA_TOGGLE_SHOWN);
	    for (var _iterator3 = _createForOfIteratorHelperLoose(openToggles), _step3; !(_step3 = _iterator3()).done;) {
	      var toggle = _step3.value;
	      var context = Dropdown.getInstance(toggle);
	      if (!context || context._config.autoClose === false) {
	        continue;
	      }
	      var composedPath = event.composedPath();
	      var isMenuTarget = composedPath.includes(context._menu);
	      if (composedPath.includes(context._element) || context._config.autoClose === 'inside' && !isMenuTarget || context._config.autoClose === 'outside' && isMenuTarget) {
	        continue;
	      }

	      // Tab navigation through the dropdown menu or events from contained inputs shouldn't close the menu
	      if (context._menu.contains(event.target) && (event.type === 'keyup' && event.key === TAB_KEY$1 || /input|select|option|textarea|form/i.test(event.target.tagName))) {
	        continue;
	      }
	      var relatedTarget = {
	        relatedTarget: context._element
	      };
	      if (event.type === 'click') {
	        relatedTarget.clickEvent = event;
	      }
	      context._completeHide(relatedTarget);
	    }
	  };
	  Dropdown.dataApiKeydownHandler = function dataApiKeydownHandler(event) {
	    // If not an UP | DOWN | ESCAPE key => not a dropdown command
	    // If input/textarea && if key is other than ESCAPE => not a dropdown command

	    var isInput = /input|textarea/i.test(event.target.tagName);
	    var isEscapeEvent = event.key === ESCAPE_KEY$2;
	    var isUpOrDownEvent = [ARROW_UP_KEY$1, ARROW_DOWN_KEY$1].includes(event.key);
	    if (!isUpOrDownEvent && !isEscapeEvent) {
	      return;
	    }
	    if (isInput && !isEscapeEvent) {
	      return;
	    }
	    event.preventDefault();

	    // TODO: v6 revert #37011 & change markup https://getbootstrap.com/docs/5.3/forms/input-group/
	    var getToggleButton = this.matches(SELECTOR_DATA_TOGGLE$3) ? this : SelectorEngine.prev(this, SELECTOR_DATA_TOGGLE$3)[0] || SelectorEngine.next(this, SELECTOR_DATA_TOGGLE$3)[0] || SelectorEngine.findOne(SELECTOR_DATA_TOGGLE$3, event.delegateTarget.parentNode);
	    var instance = Dropdown.getOrCreateInstance(getToggleButton);
	    if (isUpOrDownEvent) {
	      event.stopPropagation();
	      instance.show();
	      instance._selectMenuItem(event);
	      return;
	    }
	    if (instance._isShown()) {
	      // else is escape and we check if it is shown
	      event.stopPropagation();
	      instance.hide();
	      getToggleButton.focus();
	    }
	  };
	  _createClass(Dropdown, null, [{
	    key: "Default",
	    get: function get() {
	      return Default$9;
	    }
	  }, {
	    key: "DefaultType",
	    get: function get() {
	      return DefaultType$9;
	    }
	  }, {
	    key: "NAME",
	    get: function get() {
	      return NAME$a;
	    }
	  }]);
	  return Dropdown;
	}(BaseComponent);
	/**
	 * Data API implementation
	 */
	EventHandler.on(document, EVENT_KEYDOWN_DATA_API, SELECTOR_DATA_TOGGLE$3, Dropdown.dataApiKeydownHandler);
	EventHandler.on(document, EVENT_KEYDOWN_DATA_API, SELECTOR_MENU, Dropdown.dataApiKeydownHandler);
	EventHandler.on(document, EVENT_CLICK_DATA_API$3, Dropdown.clearMenus);
	EventHandler.on(document, EVENT_KEYUP_DATA_API, Dropdown.clearMenus);
	EventHandler.on(document, EVENT_CLICK_DATA_API$3, SELECTOR_DATA_TOGGLE$3, function (event) {
	  event.preventDefault();
	  Dropdown.getOrCreateInstance(this).toggle();
	});

	/**
	 * jQuery
	 */

	defineJQueryPlugin(Dropdown);

	window.bootstrap = window.bootstrap || {};
	window.bootstrap.Dropdown = Dropdown;
	if (Joomla && Joomla.getOptions) {
	  // Get the elements/configurations from the PHP
	  var dropdowns = Joomla.getOptions('bootstrap.dropdown');
	  // Initialise the elements
	  if (typeof dropdowns === 'object' && dropdowns !== null) {
	    Object.keys(dropdowns).forEach(function (dropdown) {
	      var opt = dropdowns[dropdown];
	      var options = {
	        interval: opt.interval ? opt.interval : 5000,
	        pause: opt.pause ? opt.pause : 'hover'
	      };
	      var elements = Array.from(document.querySelectorAll(dropdown));
	      if (elements.length) {
	        elements.map(function (el) {
	          return new window.bootstrap.Dropdown(el, options);
	        });
	      }
	    });
	  }
	}

	/**
	 * Constants
	 */

	var NAME$9 = 'backdrop';
	var CLASS_NAME_FADE$4 = 'fade';
	var CLASS_NAME_SHOW$5 = 'show';
	var EVENT_MOUSEDOWN = "mousedown.bs." + NAME$9;
	var Default$8 = {
	  className: 'modal-backdrop',
	  clickCallback: null,
	  isAnimated: false,
	  isVisible: true,
	  // if false, we use the backdrop helper without adding any element to the dom
	  rootElement: 'body' // give the choice to place backdrop under different elements
	};

	var DefaultType$8 = {
	  className: 'string',
	  clickCallback: '(function|null)',
	  isAnimated: 'boolean',
	  isVisible: 'boolean',
	  rootElement: '(element|string)'
	};

	/**
	 * Class definition
	 */
	var Backdrop = /*#__PURE__*/function (_Config) {
	  _inheritsLoose(Backdrop, _Config);
	  function Backdrop(config) {
	    var _this;
	    _this = _Config.call(this) || this;
	    _this._config = _this._getConfig(config);
	    _this._isAppended = false;
	    _this._element = null;
	    return _this;
	  }

	  // Getters
	  var _proto = Backdrop.prototype;
	  // Public
	  _proto.show = function show(callback) {
	    if (!this._config.isVisible) {
	      execute(callback);
	      return;
	    }
	    this._append();
	    var element = this._getElement();
	    if (this._config.isAnimated) {
	      reflow(element);
	    }
	    element.classList.add(CLASS_NAME_SHOW$5);
	    this._emulateAnimation(function () {
	      execute(callback);
	    });
	  };
	  _proto.hide = function hide(callback) {
	    var _this2 = this;
	    if (!this._config.isVisible) {
	      execute(callback);
	      return;
	    }
	    this._getElement().classList.remove(CLASS_NAME_SHOW$5);
	    this._emulateAnimation(function () {
	      _this2.dispose();
	      execute(callback);
	    });
	  };
	  _proto.dispose = function dispose() {
	    if (!this._isAppended) {
	      return;
	    }
	    EventHandler.off(this._element, EVENT_MOUSEDOWN);
	    this._element.remove();
	    this._isAppended = false;
	  }

	  // Private
	  ;
	  _proto._getElement = function _getElement() {
	    if (!this._element) {
	      var backdrop = document.createElement('div');
	      backdrop.className = this._config.className;
	      if (this._config.isAnimated) {
	        backdrop.classList.add(CLASS_NAME_FADE$4);
	      }
	      this._element = backdrop;
	    }
	    return this._element;
	  };
	  _proto._configAfterMerge = function _configAfterMerge(config) {
	    // use getElement() with the default "body" to get a fresh Element on each instantiation
	    config.rootElement = getElement(config.rootElement);
	    return config;
	  };
	  _proto._append = function _append() {
	    var _this3 = this;
	    if (this._isAppended) {
	      return;
	    }
	    var element = this._getElement();
	    this._config.rootElement.append(element);
	    EventHandler.on(element, EVENT_MOUSEDOWN, function () {
	      execute(_this3._config.clickCallback);
	    });
	    this._isAppended = true;
	  };
	  _proto._emulateAnimation = function _emulateAnimation(callback) {
	    executeAfterTransition(callback, this._getElement(), this._config.isAnimated);
	  };
	  _createClass(Backdrop, null, [{
	    key: "Default",
	    get: function get() {
	      return Default$8;
	    }
	  }, {
	    key: "DefaultType",
	    get: function get() {
	      return DefaultType$8;
	    }
	  }, {
	    key: "NAME",
	    get: function get() {
	      return NAME$9;
	    }
	  }]);
	  return Backdrop;
	}(Config);

	/**
	 * Constants
	 */

	var NAME$8 = 'focustrap';
	var DATA_KEY$5 = 'bs.focustrap';
	var EVENT_KEY$5 = "." + DATA_KEY$5;
	var EVENT_FOCUSIN$2 = "focusin" + EVENT_KEY$5;
	var EVENT_KEYDOWN_TAB = "keydown.tab" + EVENT_KEY$5;
	var TAB_KEY = 'Tab';
	var TAB_NAV_FORWARD = 'forward';
	var TAB_NAV_BACKWARD = 'backward';
	var Default$7 = {
	  autofocus: true,
	  trapElement: null // The element to trap focus inside of
	};

	var DefaultType$7 = {
	  autofocus: 'boolean',
	  trapElement: 'element'
	};

	/**
	 * Class definition
	 */
	var FocusTrap = /*#__PURE__*/function (_Config) {
	  _inheritsLoose(FocusTrap, _Config);
	  function FocusTrap(config) {
	    var _this;
	    _this = _Config.call(this) || this;
	    _this._config = _this._getConfig(config);
	    _this._isActive = false;
	    _this._lastTabNavDirection = null;
	    return _this;
	  }

	  // Getters
	  var _proto = FocusTrap.prototype;
	  // Public
	  _proto.activate = function activate() {
	    var _this2 = this;
	    if (this._isActive) {
	      return;
	    }
	    if (this._config.autofocus) {
	      this._config.trapElement.focus();
	    }
	    EventHandler.off(document, EVENT_KEY$5); // guard against infinite focus loop
	    EventHandler.on(document, EVENT_FOCUSIN$2, function (event) {
	      return _this2._handleFocusin(event);
	    });
	    EventHandler.on(document, EVENT_KEYDOWN_TAB, function (event) {
	      return _this2._handleKeydown(event);
	    });
	    this._isActive = true;
	  };
	  _proto.deactivate = function deactivate() {
	    if (!this._isActive) {
	      return;
	    }
	    this._isActive = false;
	    EventHandler.off(document, EVENT_KEY$5);
	  }

	  // Private
	  ;
	  _proto._handleFocusin = function _handleFocusin(event) {
	    var trapElement = this._config.trapElement;
	    if (event.target === document || event.target === trapElement || trapElement.contains(event.target)) {
	      return;
	    }
	    var elements = SelectorEngine.focusableChildren(trapElement);
	    if (elements.length === 0) {
	      trapElement.focus();
	    } else if (this._lastTabNavDirection === TAB_NAV_BACKWARD) {
	      elements[elements.length - 1].focus();
	    } else {
	      elements[0].focus();
	    }
	  };
	  _proto._handleKeydown = function _handleKeydown(event) {
	    if (event.key !== TAB_KEY) {
	      return;
	    }
	    this._lastTabNavDirection = event.shiftKey ? TAB_NAV_BACKWARD : TAB_NAV_FORWARD;
	  };
	  _createClass(FocusTrap, null, [{
	    key: "Default",
	    get: function get() {
	      return Default$7;
	    }
	  }, {
	    key: "DefaultType",
	    get: function get() {
	      return DefaultType$7;
	    }
	  }, {
	    key: "NAME",
	    get: function get() {
	      return NAME$8;
	    }
	  }]);
	  return FocusTrap;
	}(Config);

	/**
	 * Constants
	 */

	var SELECTOR_FIXED_CONTENT = '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top';
	var SELECTOR_STICKY_CONTENT = '.sticky-top';
	var PROPERTY_PADDING = 'padding-right';
	var PROPERTY_MARGIN = 'margin-right';

	/**
	 * Class definition
	 */
	var ScrollBarHelper = /*#__PURE__*/function () {
	  function ScrollBarHelper() {
	    this._element = document.body;
	  }

	  // Public
	  var _proto = ScrollBarHelper.prototype;
	  _proto.getWidth = function getWidth() {
	    // https://developer.mozilla.org/en-US/docs/Web/API/Window/innerWidth#usage_notes
	    var documentWidth = document.documentElement.clientWidth;
	    return Math.abs(window.innerWidth - documentWidth);
	  };
	  _proto.hide = function hide() {
	    var width = this.getWidth();
	    this._disableOverFlow();
	    // give padding to element to balance the hidden scrollbar width
	    this._setElementAttributes(this._element, PROPERTY_PADDING, function (calculatedValue) {
	      return calculatedValue + width;
	    });
	    // trick: We adjust positive paddingRight and negative marginRight to sticky-top elements to keep showing fullwidth
	    this._setElementAttributes(SELECTOR_FIXED_CONTENT, PROPERTY_PADDING, function (calculatedValue) {
	      return calculatedValue + width;
	    });
	    this._setElementAttributes(SELECTOR_STICKY_CONTENT, PROPERTY_MARGIN, function (calculatedValue) {
	      return calculatedValue - width;
	    });
	  };
	  _proto.reset = function reset() {
	    this._resetElementAttributes(this._element, 'overflow');
	    this._resetElementAttributes(this._element, PROPERTY_PADDING);
	    this._resetElementAttributes(SELECTOR_FIXED_CONTENT, PROPERTY_PADDING);
	    this._resetElementAttributes(SELECTOR_STICKY_CONTENT, PROPERTY_MARGIN);
	  };
	  _proto.isOverflowing = function isOverflowing() {
	    return this.getWidth() > 0;
	  }

	  // Private
	  ;
	  _proto._disableOverFlow = function _disableOverFlow() {
	    this._saveInitialAttribute(this._element, 'overflow');
	    this._element.style.overflow = 'hidden';
	  };
	  _proto._setElementAttributes = function _setElementAttributes(selector, styleProperty, callback) {
	    var _this = this;
	    var scrollbarWidth = this.getWidth();
	    var manipulationCallBack = function manipulationCallBack(element) {
	      if (element !== _this._element && window.innerWidth > element.clientWidth + scrollbarWidth) {
	        return;
	      }
	      _this._saveInitialAttribute(element, styleProperty);
	      var calculatedValue = window.getComputedStyle(element).getPropertyValue(styleProperty);
	      element.style.setProperty(styleProperty, callback(Number.parseFloat(calculatedValue)) + "px");
	    };
	    this._applyManipulationCallback(selector, manipulationCallBack);
	  };
	  _proto._saveInitialAttribute = function _saveInitialAttribute(element, styleProperty) {
	    var actualValue = element.style.getPropertyValue(styleProperty);
	    if (actualValue) {
	      Manipulator.setDataAttribute(element, styleProperty, actualValue);
	    }
	  };
	  _proto._resetElementAttributes = function _resetElementAttributes(selector, styleProperty) {
	    var manipulationCallBack = function manipulationCallBack(element) {
	      var value = Manipulator.getDataAttribute(element, styleProperty);
	      // We only want to remove the property if the value is `null`; the value can also be zero
	      if (value === null) {
	        element.style.removeProperty(styleProperty);
	        return;
	      }
	      Manipulator.removeDataAttribute(element, styleProperty);
	      element.style.setProperty(styleProperty, value);
	    };
	    this._applyManipulationCallback(selector, manipulationCallBack);
	  };
	  _proto._applyManipulationCallback = function _applyManipulationCallback(selector, callBack) {
	    if (isElement$1(selector)) {
	      callBack(selector);
	      return;
	    }
	    for (var _iterator = _createForOfIteratorHelperLoose(SelectorEngine.find(selector, this._element)), _step; !(_step = _iterator()).done;) {
	      var sel = _step.value;
	      callBack(sel);
	    }
	  };
	  return ScrollBarHelper;
	}();

	/**
	 * Constants
	 */

	var NAME$7 = 'modal';
	var DATA_KEY$4 = 'bs.modal';
	var EVENT_KEY$4 = "." + DATA_KEY$4;
	var DATA_API_KEY$2 = '.data-api';
	var ESCAPE_KEY$1 = 'Escape';
	var EVENT_HIDE$4 = "hide" + EVENT_KEY$4;
	var EVENT_HIDE_PREVENTED$1 = "hidePrevented" + EVENT_KEY$4;
	var EVENT_HIDDEN$4 = "hidden" + EVENT_KEY$4;
	var EVENT_SHOW$4 = "show" + EVENT_KEY$4;
	var EVENT_SHOWN$4 = "shown" + EVENT_KEY$4;
	var EVENT_RESIZE$1 = "resize" + EVENT_KEY$4;
	var EVENT_CLICK_DISMISS = "click.dismiss" + EVENT_KEY$4;
	var EVENT_MOUSEDOWN_DISMISS = "mousedown.dismiss" + EVENT_KEY$4;
	var EVENT_KEYDOWN_DISMISS$1 = "keydown.dismiss" + EVENT_KEY$4;
	var EVENT_CLICK_DATA_API$2 = "click" + EVENT_KEY$4 + DATA_API_KEY$2;
	var CLASS_NAME_OPEN = 'modal-open';
	var CLASS_NAME_FADE$3 = 'fade';
	var CLASS_NAME_SHOW$4 = 'show';
	var CLASS_NAME_STATIC = 'modal-static';
	var OPEN_SELECTOR$1 = '.modal.show';
	var SELECTOR_DIALOG = '.modal-dialog';
	var SELECTOR_MODAL_BODY = '.modal-body';
	var SELECTOR_DATA_TOGGLE$2 = '[data-bs-toggle="modal"]';
	var Default$6 = {
	  backdrop: true,
	  focus: true,
	  keyboard: true
	};
	var DefaultType$6 = {
	  backdrop: '(boolean|string)',
	  focus: 'boolean',
	  keyboard: 'boolean'
	};

	/**
	 * Class definition
	 */
	var Modal = /*#__PURE__*/function (_BaseComponent) {
	  _inheritsLoose(Modal, _BaseComponent);
	  function Modal(element, config) {
	    var _this;
	    _this = _BaseComponent.call(this, element, config) || this;
	    _this._dialog = SelectorEngine.findOne(SELECTOR_DIALOG, _this._element);
	    _this._backdrop = _this._initializeBackDrop();
	    _this._focustrap = _this._initializeFocusTrap();
	    _this._isShown = false;
	    _this._isTransitioning = false;
	    _this._scrollBar = new ScrollBarHelper();
	    _this._addEventListeners();
	    return _this;
	  }

	  // Getters
	  var _proto = Modal.prototype;
	  // Public
	  _proto.toggle = function toggle(relatedTarget) {
	    return this._isShown ? this.hide() : this.show(relatedTarget);
	  };
	  _proto.show = function show(relatedTarget) {
	    var _this2 = this;
	    if (this._isShown || this._isTransitioning) {
	      return;
	    }
	    var showEvent = EventHandler.trigger(this._element, EVENT_SHOW$4, {
	      relatedTarget: relatedTarget
	    });
	    if (showEvent.defaultPrevented) {
	      return;
	    }
	    this._isShown = true;
	    this._isTransitioning = true;
	    this._scrollBar.hide();
	    document.body.classList.add(CLASS_NAME_OPEN);
	    this._adjustDialog();
	    this._backdrop.show(function () {
	      return _this2._showElement(relatedTarget);
	    });
	  };
	  _proto.hide = function hide() {
	    var _this3 = this;
	    if (!this._isShown || this._isTransitioning) {
	      return;
	    }
	    var hideEvent = EventHandler.trigger(this._element, EVENT_HIDE$4);
	    if (hideEvent.defaultPrevented) {
	      return;
	    }
	    this._isShown = false;
	    this._isTransitioning = true;
	    this._focustrap.deactivate();
	    this._element.classList.remove(CLASS_NAME_SHOW$4);
	    this._queueCallback(function () {
	      return _this3._hideModal();
	    }, this._element, this._isAnimated());
	  };
	  _proto.dispose = function dispose() {
	    EventHandler.off(window, EVENT_KEY$4);
	    EventHandler.off(this._dialog, EVENT_KEY$4);
	    this._backdrop.dispose();
	    this._focustrap.deactivate();
	    _BaseComponent.prototype.dispose.call(this);
	  };
	  _proto.handleUpdate = function handleUpdate() {
	    this._adjustDialog();
	  }

	  // Private
	  ;
	  _proto._initializeBackDrop = function _initializeBackDrop() {
	    return new Backdrop({
	      isVisible: Boolean(this._config.backdrop),
	      // 'static' option will be translated to true, and booleans will keep their value,
	      isAnimated: this._isAnimated()
	    });
	  };
	  _proto._initializeFocusTrap = function _initializeFocusTrap() {
	    return new FocusTrap({
	      trapElement: this._element
	    });
	  };
	  _proto._showElement = function _showElement(relatedTarget) {
	    var _this4 = this;
	    // try to append dynamic modal
	    if (!document.body.contains(this._element)) {
	      document.body.append(this._element);
	    }
	    this._element.style.display = 'block';
	    this._element.removeAttribute('aria-hidden');
	    this._element.setAttribute('aria-modal', true);
	    this._element.setAttribute('role', 'dialog');
	    this._element.scrollTop = 0;
	    var modalBody = SelectorEngine.findOne(SELECTOR_MODAL_BODY, this._dialog);
	    if (modalBody) {
	      modalBody.scrollTop = 0;
	    }
	    reflow(this._element);
	    this._element.classList.add(CLASS_NAME_SHOW$4);
	    var transitionComplete = function transitionComplete() {
	      if (_this4._config.focus) {
	        _this4._focustrap.activate();
	      }
	      _this4._isTransitioning = false;
	      EventHandler.trigger(_this4._element, EVENT_SHOWN$4, {
	        relatedTarget: relatedTarget
	      });
	    };
	    this._queueCallback(transitionComplete, this._dialog, this._isAnimated());
	  };
	  _proto._addEventListeners = function _addEventListeners() {
	    var _this5 = this;
	    EventHandler.on(this._element, EVENT_KEYDOWN_DISMISS$1, function (event) {
	      if (event.key !== ESCAPE_KEY$1) {
	        return;
	      }
	      if (_this5._config.keyboard) {
	        _this5.hide();
	        return;
	      }
	      _this5._triggerBackdropTransition();
	    });
	    EventHandler.on(window, EVENT_RESIZE$1, function () {
	      if (_this5._isShown && !_this5._isTransitioning) {
	        _this5._adjustDialog();
	      }
	    });
	    EventHandler.on(this._element, EVENT_MOUSEDOWN_DISMISS, function (event) {
	      // a bad trick to segregate clicks that may start inside dialog but end outside, and avoid listen to scrollbar clicks
	      EventHandler.one(_this5._element, EVENT_CLICK_DISMISS, function (event2) {
	        if (_this5._element !== event.target || _this5._element !== event2.target) {
	          return;
	        }
	        if (_this5._config.backdrop === 'static') {
	          _this5._triggerBackdropTransition();
	          return;
	        }
	        if (_this5._config.backdrop) {
	          _this5.hide();
	        }
	      });
	    });
	  };
	  _proto._hideModal = function _hideModal() {
	    var _this6 = this;
	    this._element.style.display = 'none';
	    this._element.setAttribute('aria-hidden', true);
	    this._element.removeAttribute('aria-modal');
	    this._element.removeAttribute('role');
	    this._isTransitioning = false;
	    this._backdrop.hide(function () {
	      document.body.classList.remove(CLASS_NAME_OPEN);
	      _this6._resetAdjustments();
	      _this6._scrollBar.reset();
	      EventHandler.trigger(_this6._element, EVENT_HIDDEN$4);
	    });
	  };
	  _proto._isAnimated = function _isAnimated() {
	    return this._element.classList.contains(CLASS_NAME_FADE$3);
	  };
	  _proto._triggerBackdropTransition = function _triggerBackdropTransition() {
	    var _this7 = this;
	    var hideEvent = EventHandler.trigger(this._element, EVENT_HIDE_PREVENTED$1);
	    if (hideEvent.defaultPrevented) {
	      return;
	    }
	    var isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;
	    var initialOverflowY = this._element.style.overflowY;
	    // return if the following background transition hasn't yet completed
	    if (initialOverflowY === 'hidden' || this._element.classList.contains(CLASS_NAME_STATIC)) {
	      return;
	    }
	    if (!isModalOverflowing) {
	      this._element.style.overflowY = 'hidden';
	    }
	    this._element.classList.add(CLASS_NAME_STATIC);
	    this._queueCallback(function () {
	      _this7._element.classList.remove(CLASS_NAME_STATIC);
	      _this7._queueCallback(function () {
	        _this7._element.style.overflowY = initialOverflowY;
	      }, _this7._dialog);
	    }, this._dialog);
	    this._element.focus();
	  }

	  /**
	   * The following methods are used to handle overflowing modals
	   */;
	  _proto._adjustDialog = function _adjustDialog() {
	    var isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;
	    var scrollbarWidth = this._scrollBar.getWidth();
	    var isBodyOverflowing = scrollbarWidth > 0;
	    if (isBodyOverflowing && !isModalOverflowing) {
	      var property = isRTL() ? 'paddingLeft' : 'paddingRight';
	      this._element.style[property] = scrollbarWidth + "px";
	    }
	    if (!isBodyOverflowing && isModalOverflowing) {
	      var _property = isRTL() ? 'paddingRight' : 'paddingLeft';
	      this._element.style[_property] = scrollbarWidth + "px";
	    }
	  };
	  _proto._resetAdjustments = function _resetAdjustments() {
	    this._element.style.paddingLeft = '';
	    this._element.style.paddingRight = '';
	  }

	  // Static
	  ;
	  Modal.jQueryInterface = function jQueryInterface(config, relatedTarget) {
	    return this.each(function () {
	      var data = Modal.getOrCreateInstance(this, config);
	      if (typeof config !== 'string') {
	        return;
	      }
	      if (typeof data[config] === 'undefined') {
	        throw new TypeError("No method named \"" + config + "\"");
	      }
	      data[config](relatedTarget);
	    });
	  };
	  _createClass(Modal, null, [{
	    key: "Default",
	    get: function get() {
	      return Default$6;
	    }
	  }, {
	    key: "DefaultType",
	    get: function get() {
	      return DefaultType$6;
	    }
	  }, {
	    key: "NAME",
	    get: function get() {
	      return NAME$7;
	    }
	  }]);
	  return Modal;
	}(BaseComponent);
	/**
	 * Data API implementation
	 */
	EventHandler.on(document, EVENT_CLICK_DATA_API$2, SELECTOR_DATA_TOGGLE$2, function (event) {
	  var _this8 = this;
	  var target = SelectorEngine.getElementFromSelector(this);
	  if (['A', 'AREA'].includes(this.tagName)) {
	    event.preventDefault();
	  }
	  EventHandler.one(target, EVENT_SHOW$4, function (showEvent) {
	    if (showEvent.defaultPrevented) {
	      // only register focus restorer if modal will actually get shown
	      return;
	    }
	    EventHandler.one(target, EVENT_HIDDEN$4, function () {
	      if (isVisible(_this8)) {
	        _this8.focus();
	      }
	    });
	  });

	  // avoid conflict when clicking modal toggler while another one is open
	  var alreadyOpen = SelectorEngine.findOne(OPEN_SELECTOR$1);
	  if (alreadyOpen) {
	    Modal.getInstance(alreadyOpen).hide();
	  }
	  var data = Modal.getOrCreateInstance(target);
	  data.toggle(this);
	});
	enableDismissTrigger(Modal);

	/**
	 * jQuery
	 */

	defineJQueryPlugin(Modal);

	Joomla = Joomla || {};
	Joomla.Modal = Joomla.Modal || {};
	window.bootstrap = window.bootstrap || {};
	window.bootstrap.Modal = Modal;
	var allowed = {
	  iframe: ['src', 'name', 'width', 'height']
	};
	Joomla.initialiseModal = function (modal, options) {
	  if (!(modal instanceof Element)) {
	    return;
	  }

	  // eslint-disable-next-line no-new
	  new window.bootstrap.Modal(modal, options);

	  // Comply with the Joomla API - Bound element.open/close
	  modal.open = function () {
	    window.bootstrap.Modal.getInstance(modal).show(modal);
	  };
	  modal.close = function () {
	    window.bootstrap.Modal.getInstance(modal).hide();
	  };

	  // Do some Joomla specific changes
	  modal.addEventListener('show.bs.modal', function () {
	    // Comply with the Joomla API - Set the current Modal ID
	    Joomla.Modal.setCurrent(modal);
	    if (modal.dataset.url) {
	      var modalBody = modal.querySelector('.modal-body');
	      var iframe = modalBody.querySelector('iframe');
	      if (iframe) {
	        var addData = modal.querySelector('joomla-field-mediamore');
	        if (addData) {
	          addData.parentNode.removeChild(addData);
	        }
	        iframe.parentNode.removeChild(iframe);
	      }

	      // @todo merge https://github.com/joomla/joomla-cms/pull/20788
	      // Hacks because com_associations and field modals use pure javascript in the url!
	      if (modal.dataset.iframe.indexOf('document.getElementById') > 0) {
	        var iframeTextArr = modal.dataset.iframe.split('+');
	        var idFieldArr = iframeTextArr[1].split('"');
	        var el;
	        idFieldArr[0] = idFieldArr[0].replace(/&quot;/g, '"');
	        if (!document.getElementById(idFieldArr[1])) {
	          // eslint-disable-next-line no-new-func
	          var fn = new Function("return " + idFieldArr[0]); // This is UNSAFE!!!!
	          el = fn.call(null);
	        } else {
	          el = document.getElementById(idFieldArr[1]).value;
	        }
	        modalBody.insertAdjacentHTML('afterbegin', Joomla.sanitizeHtml("" + iframeTextArr[0] + el + iframeTextArr[2], allowed));
	      } else {
	        modalBody.insertAdjacentHTML('afterbegin', Joomla.sanitizeHtml(modal.dataset.iframe, allowed));
	      }
	    }
	  });
	  modal.addEventListener('shown.bs.modal', function () {
	    var modalBody = modal.querySelector('.modal-body');
	    var modalHeader = modal.querySelector('.modal-header');
	    var modalFooter = modal.querySelector('.modal-footer');
	    var modalHeaderHeight = 0;
	    var modalFooterHeight = 0;
	    var maxModalBodyHeight = 0;
	    var modalBodyPadding = 0;
	    var modalBodyHeightOuter = 0;
	    if (modalBody) {
	      if (modalHeader) {
	        var modalHeaderRects = modalHeader.getBoundingClientRect();
	        modalHeaderHeight = modalHeaderRects.height;
	        modalBodyHeightOuter = modalBody.offsetHeight;
	      }
	      if (modalFooter) {
	        modalFooterHeight = parseFloat(getComputedStyle(modalFooter, null).height.replace('px', ''));
	      }
	      var modalBodyHeight = parseFloat(getComputedStyle(modalBody, null).height.replace('px', ''));
	      var padding = modalBody.offsetTop;
	      var maxModalHeight = parseFloat(getComputedStyle(document.body, null).height.replace('px', '')) - padding * 2;
	      modalBodyPadding = modalBodyHeightOuter - modalBodyHeight;
	      maxModalBodyHeight = maxModalHeight - (modalHeaderHeight + modalFooterHeight + modalBodyPadding);
	    }
	    if (modal.dataset.url) {
	      var iframeEl = modal.querySelector('iframe');
	      var iframeHeight = parseFloat(getComputedStyle(iframeEl, null).height.replace('px', ''));
	      if (iframeHeight > maxModalBodyHeight) {
	        modalBody.style.maxHeight = maxModalBodyHeight;
	        modalBody.style.overflowY = 'auto';
	        iframeEl.style.maxHeight = maxModalBodyHeight - modalBodyPadding;
	      }
	    }
	  });
	  modal.addEventListener('hide.bs.modal', function () {
	    var modalBody = modal.querySelector('.modal-body');
	    modalBody.style.maxHeight = 'initial';
	  });
	  modal.addEventListener('hidden.bs.modal', function () {
	    // Comply with the Joomla API - Remove the current Modal ID
	    Joomla.Modal.setCurrent('');
	  });
	};

	/**
	 * Method to invoke a click on button inside an iframe
	 *
	 * @param   {object}  options  Object with the css selector for the parent element of an iframe
	 *                             and the selector of the button in the iframe that will be clicked
	 *                             { iframeSelector: '', buttonSelector: '' }
	 * @returns {boolean}
	 *
	 * @since   4.0.0
	 */
	Joomla.iframeButtonClick = function (options) {
	  if (!options.iframeSelector || !options.buttonSelector) {
	    throw new Error('Selector is missing');
	  }
	  var iframe = document.querySelector(options.iframeSelector + " iframe");
	  if (iframe) {
	    var button = iframe.contentWindow.document.querySelector(options.buttonSelector);
	    if (button) {
	      button.click();
	    }
	  }
	};
	if (Joomla && Joomla.getOptions) {
	  // Get the elements/configurations from the PHP
	  var modals = Joomla.getOptions('bootstrap.modal');
	  // Initialise the elements
	  if (typeof modals === 'object' && modals !== null) {
	    Object.keys(modals).forEach(function (modal) {
	      var opt = modals[modal];
	      var options = {
	        backdrop: opt.backdrop ? opt.backdrop : true,
	        keyboard: opt.keyboard ? opt.keyboard : true,
	        focus: opt.focus ? opt.focus : true
	      };
	      Array.from(document.querySelectorAll(modal)).map(function (modalEl) {
	        return Joomla.initialiseModal(modalEl, options);
	      });
	    });
	  }
	}

	/**
	 * Constants
	 */

	var NAME$6 = 'offcanvas';
	var DATA_KEY$3 = 'bs.offcanvas';
	var EVENT_KEY$3 = "." + DATA_KEY$3;
	var DATA_API_KEY$1 = '.data-api';
	var EVENT_LOAD_DATA_API$2 = "load" + EVENT_KEY$3 + DATA_API_KEY$1;
	var ESCAPE_KEY = 'Escape';
	var CLASS_NAME_SHOW$3 = 'show';
	var CLASS_NAME_SHOWING$1 = 'showing';
	var CLASS_NAME_HIDING = 'hiding';
	var CLASS_NAME_BACKDROP = 'offcanvas-backdrop';
	var OPEN_SELECTOR = '.offcanvas.show';
	var EVENT_SHOW$3 = "show" + EVENT_KEY$3;
	var EVENT_SHOWN$3 = "shown" + EVENT_KEY$3;
	var EVENT_HIDE$3 = "hide" + EVENT_KEY$3;
	var EVENT_HIDE_PREVENTED = "hidePrevented" + EVENT_KEY$3;
	var EVENT_HIDDEN$3 = "hidden" + EVENT_KEY$3;
	var EVENT_RESIZE = "resize" + EVENT_KEY$3;
	var EVENT_CLICK_DATA_API$1 = "click" + EVENT_KEY$3 + DATA_API_KEY$1;
	var EVENT_KEYDOWN_DISMISS = "keydown.dismiss" + EVENT_KEY$3;
	var SELECTOR_DATA_TOGGLE$1 = '[data-bs-toggle="offcanvas"]';
	var Default$5 = {
	  backdrop: true,
	  keyboard: true,
	  scroll: false
	};
	var DefaultType$5 = {
	  backdrop: '(boolean|string)',
	  keyboard: 'boolean',
	  scroll: 'boolean'
	};

	/**
	 * Class definition
	 */
	var Offcanvas = /*#__PURE__*/function (_BaseComponent) {
	  _inheritsLoose(Offcanvas, _BaseComponent);
	  function Offcanvas(element, config) {
	    var _this;
	    _this = _BaseComponent.call(this, element, config) || this;
	    _this._isShown = false;
	    _this._backdrop = _this._initializeBackDrop();
	    _this._focustrap = _this._initializeFocusTrap();
	    _this._addEventListeners();
	    return _this;
	  }

	  // Getters
	  var _proto = Offcanvas.prototype;
	  // Public
	  _proto.toggle = function toggle(relatedTarget) {
	    return this._isShown ? this.hide() : this.show(relatedTarget);
	  };
	  _proto.show = function show(relatedTarget) {
	    var _this2 = this;
	    if (this._isShown) {
	      return;
	    }
	    var showEvent = EventHandler.trigger(this._element, EVENT_SHOW$3, {
	      relatedTarget: relatedTarget
	    });
	    if (showEvent.defaultPrevented) {
	      return;
	    }
	    this._isShown = true;
	    this._backdrop.show();
	    if (!this._config.scroll) {
	      new ScrollBarHelper().hide();
	    }
	    this._element.setAttribute('aria-modal', true);
	    this._element.setAttribute('role', 'dialog');
	    this._element.classList.add(CLASS_NAME_SHOWING$1);
	    var completeCallBack = function completeCallBack() {
	      if (!_this2._config.scroll || _this2._config.backdrop) {
	        _this2._focustrap.activate();
	      }
	      _this2._element.classList.add(CLASS_NAME_SHOW$3);
	      _this2._element.classList.remove(CLASS_NAME_SHOWING$1);
	      EventHandler.trigger(_this2._element, EVENT_SHOWN$3, {
	        relatedTarget: relatedTarget
	      });
	    };
	    this._queueCallback(completeCallBack, this._element, true);
	  };
	  _proto.hide = function hide() {
	    var _this3 = this;
	    if (!this._isShown) {
	      return;
	    }
	    var hideEvent = EventHandler.trigger(this._element, EVENT_HIDE$3);
	    if (hideEvent.defaultPrevented) {
	      return;
	    }
	    this._focustrap.deactivate();
	    this._element.blur();
	    this._isShown = false;
	    this._element.classList.add(CLASS_NAME_HIDING);
	    this._backdrop.hide();
	    var completeCallback = function completeCallback() {
	      _this3._element.classList.remove(CLASS_NAME_SHOW$3, CLASS_NAME_HIDING);
	      _this3._element.removeAttribute('aria-modal');
	      _this3._element.removeAttribute('role');
	      if (!_this3._config.scroll) {
	        new ScrollBarHelper().reset();
	      }
	      EventHandler.trigger(_this3._element, EVENT_HIDDEN$3);
	    };
	    this._queueCallback(completeCallback, this._element, true);
	  };
	  _proto.dispose = function dispose() {
	    this._backdrop.dispose();
	    this._focustrap.deactivate();
	    _BaseComponent.prototype.dispose.call(this);
	  }

	  // Private
	  ;
	  _proto._initializeBackDrop = function _initializeBackDrop() {
	    var _this4 = this;
	    var clickCallback = function clickCallback() {
	      if (_this4._config.backdrop === 'static') {
	        EventHandler.trigger(_this4._element, EVENT_HIDE_PREVENTED);
	        return;
	      }
	      _this4.hide();
	    };

	    // 'static' option will be translated to true, and booleans will keep their value
	    var isVisible = Boolean(this._config.backdrop);
	    return new Backdrop({
	      className: CLASS_NAME_BACKDROP,
	      isVisible: isVisible,
	      isAnimated: true,
	      rootElement: this._element.parentNode,
	      clickCallback: isVisible ? clickCallback : null
	    });
	  };
	  _proto._initializeFocusTrap = function _initializeFocusTrap() {
	    return new FocusTrap({
	      trapElement: this._element
	    });
	  };
	  _proto._addEventListeners = function _addEventListeners() {
	    var _this5 = this;
	    EventHandler.on(this._element, EVENT_KEYDOWN_DISMISS, function (event) {
	      if (event.key !== ESCAPE_KEY) {
	        return;
	      }
	      if (_this5._config.keyboard) {
	        _this5.hide();
	        return;
	      }
	      EventHandler.trigger(_this5._element, EVENT_HIDE_PREVENTED);
	    });
	  }

	  // Static
	  ;
	  Offcanvas.jQueryInterface = function jQueryInterface(config) {
	    return this.each(function () {
	      var data = Offcanvas.getOrCreateInstance(this, config);
	      if (typeof config !== 'string') {
	        return;
	      }
	      if (data[config] === undefined || config.startsWith('_') || config === 'constructor') {
	        throw new TypeError("No method named \"" + config + "\"");
	      }
	      data[config](this);
	    });
	  };
	  _createClass(Offcanvas, null, [{
	    key: "Default",
	    get: function get() {
	      return Default$5;
	    }
	  }, {
	    key: "DefaultType",
	    get: function get() {
	      return DefaultType$5;
	    }
	  }, {
	    key: "NAME",
	    get: function get() {
	      return NAME$6;
	    }
	  }]);
	  return Offcanvas;
	}(BaseComponent);
	/**
	 * Data API implementation
	 */
	EventHandler.on(document, EVENT_CLICK_DATA_API$1, SELECTOR_DATA_TOGGLE$1, function (event) {
	  var _this6 = this;
	  var target = SelectorEngine.getElementFromSelector(this);
	  if (['A', 'AREA'].includes(this.tagName)) {
	    event.preventDefault();
	  }
	  if (isDisabled(this)) {
	    return;
	  }
	  EventHandler.one(target, EVENT_HIDDEN$3, function () {
	    // focus on trigger when it is closed
	    if (isVisible(_this6)) {
	      _this6.focus();
	    }
	  });

	  // avoid conflict when clicking a toggler of an offcanvas, while another is open
	  var alreadyOpen = SelectorEngine.findOne(OPEN_SELECTOR);
	  if (alreadyOpen && alreadyOpen !== target) {
	    Offcanvas.getInstance(alreadyOpen).hide();
	  }
	  var data = Offcanvas.getOrCreateInstance(target);
	  data.toggle(this);
	});
	EventHandler.on(window, EVENT_LOAD_DATA_API$2, function () {
	  for (var _iterator = _createForOfIteratorHelperLoose(SelectorEngine.find(OPEN_SELECTOR)), _step; !(_step = _iterator()).done;) {
	    var selector = _step.value;
	    Offcanvas.getOrCreateInstance(selector).show();
	  }
	});
	EventHandler.on(window, EVENT_RESIZE, function () {
	  for (var _iterator2 = _createForOfIteratorHelperLoose(SelectorEngine.find('[aria-modal][class*=show][class*=offcanvas-]')), _step2; !(_step2 = _iterator2()).done;) {
	    var element = _step2.value;
	    if (getComputedStyle(element).position !== 'fixed') {
	      Offcanvas.getOrCreateInstance(element).hide();
	    }
	  }
	});
	enableDismissTrigger(Offcanvas);

	/**
	 * jQuery
	 */

	defineJQueryPlugin(Offcanvas);

	window.bootstrap = window.bootstrap || {};
	window.bootstrap.Offcanvas = Offcanvas;
	if (Joomla && Joomla.getOptions) {
	  // Get the elements/configurations from the PHP
	  var offcanvases = Joomla.getOptions('bootstrap.offcanvas');
	  // Initialise the elements
	  if (typeof offcanvases === 'object' && offcanvases !== null) {
	    Object.keys(offcanvases).forEach(function (offcanvas) {
	      var opt = offcanvases[offcanvas];
	      var options = {
	        backdrop: opt.backdrop ? opt.backdrop : true,
	        keyboard: opt.keyboard ? opt.keyboard : true,
	        scroll: opt.scroll ? opt.scroll : true
	      };
	      var elements = Array.from(document.querySelectorAll(offcanvas));
	      if (elements.length) {
	        elements.map(function (el) {
	          return new window.bootstrap.Offcanvas(el, options);
	        });
	      }
	    });
	  }
	}

	/**
	 * --------------------------------------------------------------------------
	 * Bootstrap util/sanitizer.js
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	 * --------------------------------------------------------------------------
	 */

	// js-docs-start allow-list
	var ARIA_ATTRIBUTE_PATTERN = /^aria-[\w-]*$/i;
	var DefaultAllowlist = {
	  // Global attributes allowed on any supplied element below.
	  '*': ['class', 'dir', 'id', 'lang', 'role', ARIA_ATTRIBUTE_PATTERN],
	  a: ['target', 'href', 'title', 'rel'],
	  area: [],
	  b: [],
	  br: [],
	  col: [],
	  code: [],
	  div: [],
	  em: [],
	  hr: [],
	  h1: [],
	  h2: [],
	  h3: [],
	  h4: [],
	  h5: [],
	  h6: [],
	  i: [],
	  img: ['src', 'srcset', 'alt', 'title', 'width', 'height'],
	  li: [],
	  ol: [],
	  p: [],
	  pre: [],
	  s: [],
	  small: [],
	  span: [],
	  sub: [],
	  sup: [],
	  strong: [],
	  u: [],
	  ul: []
	};
	// js-docs-end allow-list

	var uriAttributes = new Set(['background', 'cite', 'href', 'itemtype', 'longdesc', 'poster', 'src', 'xlink:href']);

	/**
	 * A pattern that recognizes URLs that are safe wrt. XSS in URL navigation
	 * contexts.
	 *
	 * Shout-out to Angular https://github.com/angular/angular/blob/15.2.8/packages/core/src/sanitization/url_sanitizer.ts#L38
	 */
	// eslint-disable-next-line unicorn/better-regex
	var SAFE_URL_PATTERN = /^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:/?#]*(?:[/?#]|$))/i;
	var allowedAttribute = function allowedAttribute(attribute, allowedAttributeList) {
	  var attributeName = attribute.nodeName.toLowerCase();
	  if (allowedAttributeList.includes(attributeName)) {
	    if (uriAttributes.has(attributeName)) {
	      return Boolean(SAFE_URL_PATTERN.test(attribute.nodeValue));
	    }
	    return true;
	  }

	  // Check if a regular expression validates the attribute.
	  return allowedAttributeList.filter(function (attributeRegex) {
	    return attributeRegex instanceof RegExp;
	  }).some(function (regex) {
	    return regex.test(attributeName);
	  });
	};
	function sanitizeHtml(unsafeHtml, allowList, sanitizeFunction) {
	  var _ref;
	  if (!unsafeHtml.length) {
	    return unsafeHtml;
	  }
	  if (sanitizeFunction && typeof sanitizeFunction === 'function') {
	    return sanitizeFunction(unsafeHtml);
	  }
	  var domParser = new window.DOMParser();
	  var createdDocument = domParser.parseFromString(unsafeHtml, 'text/html');
	  var elements = (_ref = []).concat.apply(_ref, createdDocument.body.querySelectorAll('*'));
	  for (var _iterator = _createForOfIteratorHelperLoose(elements), _step; !(_step = _iterator()).done;) {
	    var _ref2;
	    var element = _step.value;
	    var elementName = element.nodeName.toLowerCase();
	    if (!Object.keys(allowList).includes(elementName)) {
	      element.remove();
	      continue;
	    }
	    var attributeList = (_ref2 = []).concat.apply(_ref2, element.attributes);
	    var allowedAttributes = [].concat(allowList['*'] || [], allowList[elementName] || []);
	    for (var _iterator2 = _createForOfIteratorHelperLoose(attributeList), _step2; !(_step2 = _iterator2()).done;) {
	      var attribute = _step2.value;
	      if (!allowedAttribute(attribute, allowedAttributes)) {
	        element.removeAttribute(attribute.nodeName);
	      }
	    }
	  }
	  return createdDocument.body.innerHTML;
	}

	/**
	 * Constants
	 */

	var NAME$5 = 'TemplateFactory';
	var Default$4 = {
	  allowList: DefaultAllowlist,
	  content: {},
	  // { selector : text ,  selector2 : text2 , }
	  extraClass: '',
	  html: false,
	  sanitize: true,
	  sanitizeFn: null,
	  template: '<div></div>'
	};
	var DefaultType$4 = {
	  allowList: 'object',
	  content: 'object',
	  extraClass: '(string|function)',
	  html: 'boolean',
	  sanitize: 'boolean',
	  sanitizeFn: '(null|function)',
	  template: 'string'
	};
	var DefaultContentType = {
	  entry: '(string|element|function|null)',
	  selector: '(string|element)'
	};

	/**
	 * Class definition
	 */
	var TemplateFactory = /*#__PURE__*/function (_Config) {
	  _inheritsLoose(TemplateFactory, _Config);
	  function TemplateFactory(config) {
	    var _this;
	    _this = _Config.call(this) || this;
	    _this._config = _this._getConfig(config);
	    return _this;
	  }

	  // Getters
	  var _proto = TemplateFactory.prototype;
	  // Public
	  _proto.getContent = function getContent() {
	    var _this2 = this;
	    return Object.values(this._config.content).map(function (config) {
	      return _this2._resolvePossibleFunction(config);
	    }).filter(Boolean);
	  };
	  _proto.hasContent = function hasContent() {
	    return this.getContent().length > 0;
	  };
	  _proto.changeContent = function changeContent(content) {
	    this._checkContent(content);
	    this._config.content = Object.assign({}, this._config.content, content);
	    return this;
	  };
	  _proto.toHtml = function toHtml() {
	    var templateWrapper = document.createElement('div');
	    templateWrapper.innerHTML = this._maybeSanitize(this._config.template);
	    for (var _i = 0, _Object$entries = Object.entries(this._config.content); _i < _Object$entries.length; _i++) {
	      var _Object$entries$_i = _Object$entries[_i],
	        selector = _Object$entries$_i[0],
	        text = _Object$entries$_i[1];
	      this._setContent(templateWrapper, text, selector);
	    }
	    var template = templateWrapper.children[0];
	    var extraClass = this._resolvePossibleFunction(this._config.extraClass);
	    if (extraClass) {
	      var _template$classList;
	      (_template$classList = template.classList).add.apply(_template$classList, extraClass.split(' '));
	    }
	    return template;
	  }

	  // Private
	  ;
	  _proto._typeCheckConfig = function _typeCheckConfig(config) {
	    _Config.prototype._typeCheckConfig.call(this, config);
	    this._checkContent(config.content);
	  };
	  _proto._checkContent = function _checkContent(arg) {
	    for (var _i2 = 0, _Object$entries2 = Object.entries(arg); _i2 < _Object$entries2.length; _i2++) {
	      var _Object$entries2$_i = _Object$entries2[_i2],
	        selector = _Object$entries2$_i[0],
	        content = _Object$entries2$_i[1];
	      _Config.prototype._typeCheckConfig.call(this, {
	        selector: selector,
	        entry: content
	      }, DefaultContentType);
	    }
	  };
	  _proto._setContent = function _setContent(template, content, selector) {
	    var templateElement = SelectorEngine.findOne(selector, template);
	    if (!templateElement) {
	      return;
	    }
	    content = this._resolvePossibleFunction(content);
	    if (!content) {
	      templateElement.remove();
	      return;
	    }
	    if (isElement$1(content)) {
	      this._putElementInTemplate(getElement(content), templateElement);
	      return;
	    }
	    if (this._config.html) {
	      templateElement.innerHTML = this._maybeSanitize(content);
	      return;
	    }
	    templateElement.textContent = content;
	  };
	  _proto._maybeSanitize = function _maybeSanitize(arg) {
	    return this._config.sanitize ? sanitizeHtml(arg, this._config.allowList, this._config.sanitizeFn) : arg;
	  };
	  _proto._resolvePossibleFunction = function _resolvePossibleFunction(arg) {
	    return execute(arg, [this]);
	  };
	  _proto._putElementInTemplate = function _putElementInTemplate(element, templateElement) {
	    if (this._config.html) {
	      templateElement.innerHTML = '';
	      templateElement.append(element);
	      return;
	    }
	    templateElement.textContent = element.textContent;
	  };
	  _createClass(TemplateFactory, null, [{
	    key: "Default",
	    get: function get() {
	      return Default$4;
	    }
	  }, {
	    key: "DefaultType",
	    get: function get() {
	      return DefaultType$4;
	    }
	  }, {
	    key: "NAME",
	    get: function get() {
	      return NAME$5;
	    }
	  }]);
	  return TemplateFactory;
	}(Config);

	/**
	 * Constants
	 */

	var NAME$4 = 'tooltip';
	var DISALLOWED_ATTRIBUTES = new Set(['sanitize', 'allowList', 'sanitizeFn']);
	var CLASS_NAME_FADE$2 = 'fade';
	var CLASS_NAME_MODAL = 'modal';
	var CLASS_NAME_SHOW$2 = 'show';
	var SELECTOR_TOOLTIP_INNER = '.tooltip-inner';
	var SELECTOR_MODAL = "." + CLASS_NAME_MODAL;
	var EVENT_MODAL_HIDE = 'hide.bs.modal';
	var TRIGGER_HOVER = 'hover';
	var TRIGGER_FOCUS = 'focus';
	var TRIGGER_CLICK = 'click';
	var TRIGGER_MANUAL = 'manual';
	var EVENT_HIDE$2 = 'hide';
	var EVENT_HIDDEN$2 = 'hidden';
	var EVENT_SHOW$2 = 'show';
	var EVENT_SHOWN$2 = 'shown';
	var EVENT_INSERTED = 'inserted';
	var EVENT_CLICK$1 = 'click';
	var EVENT_FOCUSIN$1 = 'focusin';
	var EVENT_FOCUSOUT$1 = 'focusout';
	var EVENT_MOUSEENTER = 'mouseenter';
	var EVENT_MOUSELEAVE = 'mouseleave';
	var AttachmentMap = {
	  AUTO: 'auto',
	  TOP: 'top',
	  RIGHT: isRTL() ? 'left' : 'right',
	  BOTTOM: 'bottom',
	  LEFT: isRTL() ? 'right' : 'left'
	};
	var Default$3 = {
	  allowList: DefaultAllowlist,
	  animation: true,
	  boundary: 'clippingParents',
	  container: false,
	  customClass: '',
	  delay: 0,
	  fallbackPlacements: ['top', 'right', 'bottom', 'left'],
	  html: false,
	  offset: [0, 6],
	  placement: 'top',
	  popperConfig: null,
	  sanitize: true,
	  sanitizeFn: null,
	  selector: false,
	  template: '<div class="tooltip" role="tooltip">' + '<div class="tooltip-arrow"></div>' + '<div class="tooltip-inner"></div>' + '</div>',
	  title: '',
	  trigger: 'hover focus'
	};
	var DefaultType$3 = {
	  allowList: 'object',
	  animation: 'boolean',
	  boundary: '(string|element)',
	  container: '(string|element|boolean)',
	  customClass: '(string|function)',
	  delay: '(number|object)',
	  fallbackPlacements: 'array',
	  html: 'boolean',
	  offset: '(array|string|function)',
	  placement: '(string|function)',
	  popperConfig: '(null|object|function)',
	  sanitize: 'boolean',
	  sanitizeFn: '(null|function)',
	  selector: '(string|boolean)',
	  template: 'string',
	  title: '(string|element|function)',
	  trigger: 'string'
	};

	/**
	 * Class definition
	 */
	var Tooltip = /*#__PURE__*/function (_BaseComponent) {
	  _inheritsLoose(Tooltip, _BaseComponent);
	  function Tooltip(element, config) {
	    var _this;
	    if (typeof Popper === 'undefined') {
	      throw new TypeError('Bootstrap\'s tooltips require Popper (https://popper.js.org)');
	    }
	    _this = _BaseComponent.call(this, element, config) || this;

	    // Private
	    _this._isEnabled = true;
	    _this._timeout = 0;
	    _this._isHovered = null;
	    _this._activeTrigger = {};
	    _this._popper = null;
	    _this._templateFactory = null;
	    _this._newContent = null;

	    // Protected
	    _this.tip = null;
	    _this._setListeners();
	    if (!_this._config.selector) {
	      _this._fixTitle();
	    }
	    return _this;
	  }

	  // Getters
	  var _proto = Tooltip.prototype;
	  // Public
	  _proto.enable = function enable() {
	    this._isEnabled = true;
	  };
	  _proto.disable = function disable() {
	    this._isEnabled = false;
	  };
	  _proto.toggleEnabled = function toggleEnabled() {
	    this._isEnabled = !this._isEnabled;
	  };
	  _proto.toggle = function toggle() {
	    if (!this._isEnabled) {
	      return;
	    }
	    this._activeTrigger.click = !this._activeTrigger.click;
	    if (this._isShown()) {
	      this._leave();
	      return;
	    }
	    this._enter();
	  };
	  _proto.dispose = function dispose() {
	    clearTimeout(this._timeout);
	    EventHandler.off(this._element.closest(SELECTOR_MODAL), EVENT_MODAL_HIDE, this._hideModalHandler);
	    if (this._element.getAttribute('data-bs-original-title')) {
	      this._element.setAttribute('title', this._element.getAttribute('data-bs-original-title'));
	    }
	    this._disposePopper();
	    _BaseComponent.prototype.dispose.call(this);
	  };
	  _proto.show = function show() {
	    var _this2 = this;
	    if (this._element.style.display === 'none') {
	      throw new Error('Please use show on visible elements');
	    }
	    if (!(this._isWithContent() && this._isEnabled)) {
	      return;
	    }
	    var showEvent = EventHandler.trigger(this._element, this.constructor.eventName(EVENT_SHOW$2));
	    var shadowRoot = findShadowRoot(this._element);
	    var isInTheDom = (shadowRoot || this._element.ownerDocument.documentElement).contains(this._element);
	    if (showEvent.defaultPrevented || !isInTheDom) {
	      return;
	    }

	    // TODO: v6 remove this or make it optional
	    this._disposePopper();
	    var tip = this._getTipElement();
	    this._element.setAttribute('aria-describedby', tip.getAttribute('id'));
	    var container = this._config.container;
	    if (!this._element.ownerDocument.documentElement.contains(this.tip)) {
	      container.append(tip);
	      EventHandler.trigger(this._element, this.constructor.eventName(EVENT_INSERTED));
	    }
	    this._popper = this._createPopper(tip);
	    tip.classList.add(CLASS_NAME_SHOW$2);

	    // If this is a touch-enabled device we add extra
	    // empty mouseover listeners to the body's immediate children;
	    // only needed because of broken event delegation on iOS
	    // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html
	    if ('ontouchstart' in document.documentElement) {
	      for (var _iterator = _createForOfIteratorHelperLoose((_ref = []).concat.apply(_ref, document.body.children)), _step; !(_step = _iterator()).done;) {
	        var _ref;
	        var element = _step.value;
	        EventHandler.on(element, 'mouseover', noop);
	      }
	    }
	    var complete = function complete() {
	      EventHandler.trigger(_this2._element, _this2.constructor.eventName(EVENT_SHOWN$2));
	      if (_this2._isHovered === false) {
	        _this2._leave();
	      }
	      _this2._isHovered = false;
	    };
	    this._queueCallback(complete, this.tip, this._isAnimated());
	  };
	  _proto.hide = function hide() {
	    var _this3 = this;
	    if (!this._isShown()) {
	      return;
	    }
	    var hideEvent = EventHandler.trigger(this._element, this.constructor.eventName(EVENT_HIDE$2));
	    if (hideEvent.defaultPrevented) {
	      return;
	    }
	    var tip = this._getTipElement();
	    tip.classList.remove(CLASS_NAME_SHOW$2);

	    // If this is a touch-enabled device we remove the extra
	    // empty mouseover listeners we added for iOS support
	    if ('ontouchstart' in document.documentElement) {
	      for (var _iterator2 = _createForOfIteratorHelperLoose((_ref2 = []).concat.apply(_ref2, document.body.children)), _step2; !(_step2 = _iterator2()).done;) {
	        var _ref2;
	        var element = _step2.value;
	        EventHandler.off(element, 'mouseover', noop);
	      }
	    }
	    this._activeTrigger[TRIGGER_CLICK] = false;
	    this._activeTrigger[TRIGGER_FOCUS] = false;
	    this._activeTrigger[TRIGGER_HOVER] = false;
	    this._isHovered = null; // it is a trick to support manual triggering

	    var complete = function complete() {
	      if (_this3._isWithActiveTrigger()) {
	        return;
	      }
	      if (!_this3._isHovered) {
	        _this3._disposePopper();
	      }
	      _this3._element.removeAttribute('aria-describedby');
	      EventHandler.trigger(_this3._element, _this3.constructor.eventName(EVENT_HIDDEN$2));
	    };
	    this._queueCallback(complete, this.tip, this._isAnimated());
	  };
	  _proto.update = function update() {
	    if (this._popper) {
	      this._popper.update();
	    }
	  }

	  // Protected
	  ;
	  _proto._isWithContent = function _isWithContent() {
	    return Boolean(this._getTitle());
	  };
	  _proto._getTipElement = function _getTipElement() {
	    if (!this.tip) {
	      this.tip = this._createTipElement(this._newContent || this._getContentForTemplate());
	    }
	    return this.tip;
	  };
	  _proto._createTipElement = function _createTipElement(content) {
	    var tip = this._getTemplateFactory(content).toHtml();

	    // TODO: remove this check in v6
	    if (!tip) {
	      return null;
	    }
	    tip.classList.remove(CLASS_NAME_FADE$2, CLASS_NAME_SHOW$2);
	    // TODO: v6 the following can be achieved with CSS only
	    tip.classList.add("bs-" + this.constructor.NAME + "-auto");
	    var tipId = getUID(this.constructor.NAME).toString();
	    tip.setAttribute('id', tipId);
	    if (this._isAnimated()) {
	      tip.classList.add(CLASS_NAME_FADE$2);
	    }
	    return tip;
	  };
	  _proto.setContent = function setContent(content) {
	    this._newContent = content;
	    if (this._isShown()) {
	      this._disposePopper();
	      this.show();
	    }
	  };
	  _proto._getTemplateFactory = function _getTemplateFactory(content) {
	    if (this._templateFactory) {
	      this._templateFactory.changeContent(content);
	    } else {
	      this._templateFactory = new TemplateFactory(Object.assign({}, this._config, {
	        // the `content` var has to be after `this._config`
	        // to override config.content in case of popover
	        content: content,
	        extraClass: this._resolvePossibleFunction(this._config.customClass)
	      }));
	    }
	    return this._templateFactory;
	  };
	  _proto._getContentForTemplate = function _getContentForTemplate() {
	    var _ref3;
	    return _ref3 = {}, _ref3[SELECTOR_TOOLTIP_INNER] = this._getTitle(), _ref3;
	  };
	  _proto._getTitle = function _getTitle() {
	    return this._resolvePossibleFunction(this._config.title) || this._element.getAttribute('data-bs-original-title');
	  }

	  // Private
	  ;
	  _proto._initializeOnDelegatedTarget = function _initializeOnDelegatedTarget(event) {
	    return this.constructor.getOrCreateInstance(event.delegateTarget, this._getDelegateConfig());
	  };
	  _proto._isAnimated = function _isAnimated() {
	    return this._config.animation || this.tip && this.tip.classList.contains(CLASS_NAME_FADE$2);
	  };
	  _proto._isShown = function _isShown() {
	    return this.tip && this.tip.classList.contains(CLASS_NAME_SHOW$2);
	  };
	  _proto._createPopper = function _createPopper(tip) {
	    var placement = execute(this._config.placement, [this, tip, this._element]);
	    var attachment = AttachmentMap[placement.toUpperCase()];
	    return createPopper(this._element, tip, this._getPopperConfig(attachment));
	  };
	  _proto._getOffset = function _getOffset() {
	    var _this4 = this;
	    var offset = this._config.offset;
	    if (typeof offset === 'string') {
	      return offset.split(',').map(function (value) {
	        return Number.parseInt(value, 10);
	      });
	    }
	    if (typeof offset === 'function') {
	      return function (popperData) {
	        return offset(popperData, _this4._element);
	      };
	    }
	    return offset;
	  };
	  _proto._resolvePossibleFunction = function _resolvePossibleFunction(arg) {
	    return execute(arg, [this._element]);
	  };
	  _proto._getPopperConfig = function _getPopperConfig(attachment) {
	    var _this5 = this;
	    var defaultBsPopperConfig = {
	      placement: attachment,
	      modifiers: [{
	        name: 'flip',
	        options: {
	          fallbackPlacements: this._config.fallbackPlacements
	        }
	      }, {
	        name: 'offset',
	        options: {
	          offset: this._getOffset()
	        }
	      }, {
	        name: 'preventOverflow',
	        options: {
	          boundary: this._config.boundary
	        }
	      }, {
	        name: 'arrow',
	        options: {
	          element: "." + this.constructor.NAME + "-arrow"
	        }
	      }, {
	        name: 'preSetPlacement',
	        enabled: true,
	        phase: 'beforeMain',
	        fn: function fn(data) {
	          // Pre-set Popper's placement attribute in order to read the arrow sizes properly.
	          // Otherwise, Popper mixes up the width and height dimensions since the initial arrow style is for top placement
	          _this5._getTipElement().setAttribute('data-popper-placement', data.state.placement);
	        }
	      }]
	    };
	    return Object.assign({}, defaultBsPopperConfig, execute(this._config.popperConfig, [defaultBsPopperConfig]));
	  };
	  _proto._setListeners = function _setListeners() {
	    var _this6 = this;
	    var triggers = this._config.trigger.split(' ');
	    for (var _iterator3 = _createForOfIteratorHelperLoose(triggers), _step3; !(_step3 = _iterator3()).done;) {
	      var trigger = _step3.value;
	      if (trigger === 'click') {
	        EventHandler.on(this._element, this.constructor.eventName(EVENT_CLICK$1), this._config.selector, function (event) {
	          var context = _this6._initializeOnDelegatedTarget(event);
	          context.toggle();
	        });
	      } else if (trigger !== TRIGGER_MANUAL) {
	        var eventIn = trigger === TRIGGER_HOVER ? this.constructor.eventName(EVENT_MOUSEENTER) : this.constructor.eventName(EVENT_FOCUSIN$1);
	        var eventOut = trigger === TRIGGER_HOVER ? this.constructor.eventName(EVENT_MOUSELEAVE) : this.constructor.eventName(EVENT_FOCUSOUT$1);
	        EventHandler.on(this._element, eventIn, this._config.selector, function (event) {
	          var context = _this6._initializeOnDelegatedTarget(event);
	          context._activeTrigger[event.type === 'focusin' ? TRIGGER_FOCUS : TRIGGER_HOVER] = true;
	          context._enter();
	        });
	        EventHandler.on(this._element, eventOut, this._config.selector, function (event) {
	          var context = _this6._initializeOnDelegatedTarget(event);
	          context._activeTrigger[event.type === 'focusout' ? TRIGGER_FOCUS : TRIGGER_HOVER] = context._element.contains(event.relatedTarget);
	          context._leave();
	        });
	      }
	    }
	    this._hideModalHandler = function () {
	      if (_this6._element) {
	        _this6.hide();
	      }
	    };
	    EventHandler.on(this._element.closest(SELECTOR_MODAL), EVENT_MODAL_HIDE, this._hideModalHandler);
	  };
	  _proto._fixTitle = function _fixTitle() {
	    var title = this._element.getAttribute('title');
	    if (!title) {
	      return;
	    }
	    if (!this._element.getAttribute('aria-label') && !this._element.textContent.trim()) {
	      this._element.setAttribute('aria-label', title);
	    }
	    this._element.setAttribute('data-bs-original-title', title); // DO NOT USE IT. Is only for backwards compatibility
	    this._element.removeAttribute('title');
	  };
	  _proto._enter = function _enter() {
	    var _this7 = this;
	    if (this._isShown() || this._isHovered) {
	      this._isHovered = true;
	      return;
	    }
	    this._isHovered = true;
	    this._setTimeout(function () {
	      if (_this7._isHovered) {
	        _this7.show();
	      }
	    }, this._config.delay.show);
	  };
	  _proto._leave = function _leave() {
	    var _this8 = this;
	    if (this._isWithActiveTrigger()) {
	      return;
	    }
	    this._isHovered = false;
	    this._setTimeout(function () {
	      if (!_this8._isHovered) {
	        _this8.hide();
	      }
	    }, this._config.delay.hide);
	  };
	  _proto._setTimeout = function _setTimeout(handler, timeout) {
	    clearTimeout(this._timeout);
	    this._timeout = setTimeout(handler, timeout);
	  };
	  _proto._isWithActiveTrigger = function _isWithActiveTrigger() {
	    return Object.values(this._activeTrigger).includes(true);
	  };
	  _proto._getConfig = function _getConfig(config) {
	    var dataAttributes = Manipulator.getDataAttributes(this._element);
	    for (var _i = 0, _Object$keys = Object.keys(dataAttributes); _i < _Object$keys.length; _i++) {
	      var dataAttribute = _Object$keys[_i];
	      if (DISALLOWED_ATTRIBUTES.has(dataAttribute)) {
	        delete dataAttributes[dataAttribute];
	      }
	    }
	    config = Object.assign({}, dataAttributes, typeof config === 'object' && config ? config : {});
	    config = this._mergeConfigObj(config);
	    config = this._configAfterMerge(config);
	    this._typeCheckConfig(config);
	    return config;
	  };
	  _proto._configAfterMerge = function _configAfterMerge(config) {
	    config.container = config.container === false ? document.body : getElement(config.container);
	    if (typeof config.delay === 'number') {
	      config.delay = {
	        show: config.delay,
	        hide: config.delay
	      };
	    }
	    if (typeof config.title === 'number') {
	      config.title = config.title.toString();
	    }
	    if (typeof config.content === 'number') {
	      config.content = config.content.toString();
	    }
	    return config;
	  };
	  _proto._getDelegateConfig = function _getDelegateConfig() {
	    var config = {};
	    for (var _i2 = 0, _Object$entries = Object.entries(this._config); _i2 < _Object$entries.length; _i2++) {
	      var _Object$entries$_i = _Object$entries[_i2],
	        key = _Object$entries$_i[0],
	        value = _Object$entries$_i[1];
	      if (this.constructor.Default[key] !== value) {
	        config[key] = value;
	      }
	    }
	    config.selector = false;
	    config.trigger = 'manual';

	    // In the future can be replaced with:
	    // const keysWithDifferentValues = Object.entries(this._config).filter(entry => this.constructor.Default[entry[0]] !== this._config[entry[0]])
	    // `Object.fromEntries(keysWithDifferentValues)`
	    return config;
	  };
	  _proto._disposePopper = function _disposePopper() {
	    if (this._popper) {
	      this._popper.destroy();
	      this._popper = null;
	    }
	    if (this.tip) {
	      this.tip.remove();
	      this.tip = null;
	    }
	  }

	  // Static
	  ;
	  Tooltip.jQueryInterface = function jQueryInterface(config) {
	    return this.each(function () {
	      var data = Tooltip.getOrCreateInstance(this, config);
	      if (typeof config !== 'string') {
	        return;
	      }
	      if (typeof data[config] === 'undefined') {
	        throw new TypeError("No method named \"" + config + "\"");
	      }
	      data[config]();
	    });
	  };
	  _createClass(Tooltip, null, [{
	    key: "Default",
	    get: function get() {
	      return Default$3;
	    }
	  }, {
	    key: "DefaultType",
	    get: function get() {
	      return DefaultType$3;
	    }
	  }, {
	    key: "NAME",
	    get: function get() {
	      return NAME$4;
	    }
	  }]);
	  return Tooltip;
	}(BaseComponent);
	/**
	 * jQuery
	 */
	defineJQueryPlugin(Tooltip);

	/**
	 * Constants
	 */

	var NAME$3 = 'popover';
	var SELECTOR_TITLE = '.popover-header';
	var SELECTOR_CONTENT = '.popover-body';
	var Default$2 = Object.assign({}, Tooltip.Default, {
	  content: '',
	  offset: [0, 8],
	  placement: 'right',
	  template: '<div class="popover" role="tooltip">' + '<div class="popover-arrow"></div>' + '<h3 class="popover-header"></h3>' + '<div class="popover-body"></div>' + '</div>',
	  trigger: 'click'
	});
	var DefaultType$2 = Object.assign({}, Tooltip.DefaultType, {
	  content: '(null|string|element|function)'
	});

	/**
	 * Class definition
	 */
	var Popover = /*#__PURE__*/function (_Tooltip) {
	  _inheritsLoose(Popover, _Tooltip);
	  function Popover() {
	    return _Tooltip.apply(this, arguments) || this;
	  }
	  var _proto = Popover.prototype;
	  // Overrides
	  _proto._isWithContent = function _isWithContent() {
	    return this._getTitle() || this._getContent();
	  }

	  // Private
	  ;
	  _proto._getContentForTemplate = function _getContentForTemplate() {
	    var _ref;
	    return _ref = {}, _ref[SELECTOR_TITLE] = this._getTitle(), _ref[SELECTOR_CONTENT] = this._getContent(), _ref;
	  };
	  _proto._getContent = function _getContent() {
	    return this._resolvePossibleFunction(this._config.content);
	  }

	  // Static
	  ;
	  Popover.jQueryInterface = function jQueryInterface(config) {
	    return this.each(function () {
	      var data = Popover.getOrCreateInstance(this, config);
	      if (typeof config !== 'string') {
	        return;
	      }
	      if (typeof data[config] === 'undefined') {
	        throw new TypeError("No method named \"" + config + "\"");
	      }
	      data[config]();
	    });
	  };
	  _createClass(Popover, null, [{
	    key: "Default",
	    get:
	    // Getters
	    function get() {
	      return Default$2;
	    }
	  }, {
	    key: "DefaultType",
	    get: function get() {
	      return DefaultType$2;
	    }
	  }, {
	    key: "NAME",
	    get: function get() {
	      return NAME$3;
	    }
	  }]);
	  return Popover;
	}(Tooltip);
	/**
	 * jQuery
	 */
	defineJQueryPlugin(Popover);

	window.bootstrap = window.bootstrap || {};
	window.bootstrap.Popover = Popover;
	window.bootstrap.Tooltip = Tooltip;
	if (Joomla && Joomla.getOptions) {
	  // Get the elements/configurations from the PHP
	  var tooltips = Joomla.getOptions('bootstrap.tooltip');
	  var popovers = Joomla.getOptions('bootstrap.popover');
	  // Initialise the elements
	  if (typeof popovers === 'object' && popovers !== null) {
	    Object.keys(popovers).forEach(function (popover) {
	      var opt = popovers[popover];
	      var options = {
	        animation: opt.animation ? opt.animation : true,
	        container: opt.container ? opt.container : false,
	        delay: opt.delay ? opt.delay : 0,
	        html: opt.html ? opt.html : false,
	        placement: opt.placement ? opt.placement : 'top',
	        selector: opt.selector ? opt.selector : false,
	        title: opt.title ? opt.title : '',
	        trigger: opt.trigger ? opt.trigger : 'click',
	        offset: opt.offset ? opt.offset : 0,
	        fallbackPlacement: opt.fallbackPlacement ? opt.fallbackPlacement : 'flip',
	        boundary: opt.boundary ? opt.boundary : 'scrollParent',
	        customClass: opt.customClass ? opt.customClass : '',
	        sanitize: opt.sanitize ? opt.sanitize : true,
	        sanitizeFn: opt.sanitizeFn ? opt.sanitizeFn : null,
	        popperConfig: opt.popperConfig ? opt.popperConfig : null
	      };
	      if (opt.content) {
	        options.content = opt.content;
	      }
	      if (opt.template) {
	        options.template = opt.template;
	      }
	      if (opt.allowList) {
	        options.allowList = opt.allowList;
	      }
	      var elements = Array.from(document.querySelectorAll(popover));
	      if (elements.length) {
	        elements.map(function (el) {
	          return new window.bootstrap.Popover(el, options);
	        });
	      }
	    });
	  }
	  // Initialise the elements
	  if (typeof tooltips === 'object' && tooltips !== null) {
	    Object.keys(tooltips).forEach(function (tooltip) {
	      var opt = tooltips[tooltip];
	      var options = {
	        animation: opt.animation ? opt.animation : true,
	        container: opt.container ? opt.container : false,
	        delay: opt.delay ? opt.delay : 0,
	        html: opt.html ? opt.html : false,
	        selector: opt.selector ? opt.selector : false,
	        trigger: opt.trigger ? opt.trigger : 'hover focus',
	        fallbackPlacement: opt.fallbackPlacement ? opt.fallbackPlacement : null,
	        boundary: opt.boundary ? opt.boundary : 'clippingParents',
	        title: opt.title ? opt.title : '',
	        customClass: opt.customClass ? opt.customClass : '',
	        sanitize: opt.sanitize ? opt.sanitize : true,
	        sanitizeFn: opt.sanitizeFn ? opt.sanitizeFn : null,
	        popperConfig: opt.popperConfig ? opt.popperConfig : null
	      };
	      if (opt.placement) {
	        options.placement = opt.placement;
	      }
	      if (opt.template) {
	        options.template = opt.template;
	      }
	      if (opt.allowList) {
	        options.allowList = opt.allowList;
	      }
	      var elements = Array.from(document.querySelectorAll(tooltip));
	      if (elements.length) {
	        elements.map(function (el) {
	          return new window.bootstrap.Tooltip(el, options);
	        });
	      }
	    });
	  }
	}

	/**
	 * Constants
	 */

	var NAME$2 = 'scrollspy';
	var DATA_KEY$2 = 'bs.scrollspy';
	var EVENT_KEY$2 = "." + DATA_KEY$2;
	var DATA_API_KEY = '.data-api';
	var EVENT_ACTIVATE = "activate" + EVENT_KEY$2;
	var EVENT_CLICK = "click" + EVENT_KEY$2;
	var EVENT_LOAD_DATA_API$1 = "load" + EVENT_KEY$2 + DATA_API_KEY;
	var CLASS_NAME_DROPDOWN_ITEM = 'dropdown-item';
	var CLASS_NAME_ACTIVE$1 = 'active';
	var SELECTOR_DATA_SPY = '[data-bs-spy="scroll"]';
	var SELECTOR_TARGET_LINKS = '[href]';
	var SELECTOR_NAV_LIST_GROUP = '.nav, .list-group';
	var SELECTOR_NAV_LINKS = '.nav-link';
	var SELECTOR_NAV_ITEMS = '.nav-item';
	var SELECTOR_LIST_ITEMS = '.list-group-item';
	var SELECTOR_LINK_ITEMS = SELECTOR_NAV_LINKS + ", " + SELECTOR_NAV_ITEMS + " > " + SELECTOR_NAV_LINKS + ", " + SELECTOR_LIST_ITEMS;
	var SELECTOR_DROPDOWN = '.dropdown';
	var SELECTOR_DROPDOWN_TOGGLE$1 = '.dropdown-toggle';
	var Default$1 = {
	  offset: null,
	  // TODO: v6 @deprecated, keep it for backwards compatibility reasons
	  rootMargin: '0px 0px -25%',
	  smoothScroll: false,
	  target: null,
	  threshold: [0.1, 0.5, 1]
	};
	var DefaultType$1 = {
	  offset: '(number|null)',
	  // TODO v6 @deprecated, keep it for backwards compatibility reasons
	  rootMargin: 'string',
	  smoothScroll: 'boolean',
	  target: 'element',
	  threshold: 'array'
	};

	/**
	 * Class definition
	 */
	var ScrollSpy = /*#__PURE__*/function (_BaseComponent) {
	  _inheritsLoose(ScrollSpy, _BaseComponent);
	  function ScrollSpy(element, config) {
	    var _this;
	    _this = _BaseComponent.call(this, element, config) || this;

	    // this._element is the observablesContainer and config.target the menu links wrapper
	    _this._targetLinks = new Map();
	    _this._observableSections = new Map();
	    _this._rootElement = getComputedStyle(_this._element).overflowY === 'visible' ? null : _this._element;
	    _this._activeTarget = null;
	    _this._observer = null;
	    _this._previousScrollData = {
	      visibleEntryTop: 0,
	      parentScrollTop: 0
	    };
	    _this.refresh(); // initialize
	    return _this;
	  }

	  // Getters
	  var _proto = ScrollSpy.prototype;
	  // Public
	  _proto.refresh = function refresh() {
	    this._initializeTargetsAndObservables();
	    this._maybeEnableSmoothScroll();
	    if (this._observer) {
	      this._observer.disconnect();
	    } else {
	      this._observer = this._getNewObserver();
	    }
	    for (var _iterator = _createForOfIteratorHelperLoose(this._observableSections.values()), _step; !(_step = _iterator()).done;) {
	      var section = _step.value;
	      this._observer.observe(section);
	    }
	  };
	  _proto.dispose = function dispose() {
	    this._observer.disconnect();
	    _BaseComponent.prototype.dispose.call(this);
	  }

	  // Private
	  ;
	  _proto._configAfterMerge = function _configAfterMerge(config) {
	    // TODO: on v6 target should be given explicitly & remove the {target: 'ss-target'} case
	    config.target = getElement(config.target) || document.body;

	    // TODO: v6 Only for backwards compatibility reasons. Use rootMargin only
	    config.rootMargin = config.offset ? config.offset + "px 0px -30%" : config.rootMargin;
	    if (typeof config.threshold === 'string') {
	      config.threshold = config.threshold.split(',').map(function (value) {
	        return Number.parseFloat(value);
	      });
	    }
	    return config;
	  };
	  _proto._maybeEnableSmoothScroll = function _maybeEnableSmoothScroll() {
	    var _this2 = this;
	    if (!this._config.smoothScroll) {
	      return;
	    }

	    // unregister any previous listeners
	    EventHandler.off(this._config.target, EVENT_CLICK);
	    EventHandler.on(this._config.target, EVENT_CLICK, SELECTOR_TARGET_LINKS, function (event) {
	      var observableSection = _this2._observableSections.get(event.target.hash);
	      if (observableSection) {
	        event.preventDefault();
	        var root = _this2._rootElement || window;
	        var height = observableSection.offsetTop - _this2._element.offsetTop;
	        if (root.scrollTo) {
	          root.scrollTo({
	            top: height,
	            behavior: 'smooth'
	          });
	          return;
	        }

	        // Chrome 60 doesn't support `scrollTo`
	        root.scrollTop = height;
	      }
	    });
	  };
	  _proto._getNewObserver = function _getNewObserver() {
	    var _this3 = this;
	    var options = {
	      root: this._rootElement,
	      threshold: this._config.threshold,
	      rootMargin: this._config.rootMargin
	    };
	    return new IntersectionObserver(function (entries) {
	      return _this3._observerCallback(entries);
	    }, options);
	  }

	  // The logic of selection
	  ;
	  _proto._observerCallback = function _observerCallback(entries) {
	    var _this4 = this;
	    var targetElement = function targetElement(entry) {
	      return _this4._targetLinks.get("#" + entry.target.id);
	    };
	    var activate = function activate(entry) {
	      _this4._previousScrollData.visibleEntryTop = entry.target.offsetTop;
	      _this4._process(targetElement(entry));
	    };
	    var parentScrollTop = (this._rootElement || document.documentElement).scrollTop;
	    var userScrollsDown = parentScrollTop >= this._previousScrollData.parentScrollTop;
	    this._previousScrollData.parentScrollTop = parentScrollTop;
	    for (var _iterator2 = _createForOfIteratorHelperLoose(entries), _step2; !(_step2 = _iterator2()).done;) {
	      var entry = _step2.value;
	      if (!entry.isIntersecting) {
	        this._activeTarget = null;
	        this._clearActiveClass(targetElement(entry));
	        continue;
	      }
	      var entryIsLowerThanPrevious = entry.target.offsetTop >= this._previousScrollData.visibleEntryTop;
	      // if we are scrolling down, pick the bigger offsetTop
	      if (userScrollsDown && entryIsLowerThanPrevious) {
	        activate(entry);
	        // if parent isn't scrolled, let's keep the first visible item, breaking the iteration
	        if (!parentScrollTop) {
	          return;
	        }
	        continue;
	      }

	      // if we are scrolling up, pick the smallest offsetTop
	      if (!userScrollsDown && !entryIsLowerThanPrevious) {
	        activate(entry);
	      }
	    }
	  };
	  _proto._initializeTargetsAndObservables = function _initializeTargetsAndObservables() {
	    this._targetLinks = new Map();
	    this._observableSections = new Map();
	    var targetLinks = SelectorEngine.find(SELECTOR_TARGET_LINKS, this._config.target);
	    for (var _iterator3 = _createForOfIteratorHelperLoose(targetLinks), _step3; !(_step3 = _iterator3()).done;) {
	      var anchor = _step3.value;
	      // ensure that the anchor has an id and is not disabled
	      if (!anchor.hash || isDisabled(anchor)) {
	        continue;
	      }
	      var observableSection = SelectorEngine.findOne(decodeURI(anchor.hash), this._element);

	      // ensure that the observableSection exists & is visible
	      if (isVisible(observableSection)) {
	        this._targetLinks.set(decodeURI(anchor.hash), anchor);
	        this._observableSections.set(anchor.hash, observableSection);
	      }
	    }
	  };
	  _proto._process = function _process(target) {
	    if (this._activeTarget === target) {
	      return;
	    }
	    this._clearActiveClass(this._config.target);
	    this._activeTarget = target;
	    target.classList.add(CLASS_NAME_ACTIVE$1);
	    this._activateParents(target);
	    EventHandler.trigger(this._element, EVENT_ACTIVATE, {
	      relatedTarget: target
	    });
	  };
	  _proto._activateParents = function _activateParents(target) {
	    // Activate dropdown parents
	    if (target.classList.contains(CLASS_NAME_DROPDOWN_ITEM)) {
	      SelectorEngine.findOne(SELECTOR_DROPDOWN_TOGGLE$1, target.closest(SELECTOR_DROPDOWN)).classList.add(CLASS_NAME_ACTIVE$1);
	      return;
	    }
	    for (var _iterator4 = _createForOfIteratorHelperLoose(SelectorEngine.parents(target, SELECTOR_NAV_LIST_GROUP)), _step4; !(_step4 = _iterator4()).done;) {
	      var listGroup = _step4.value;
	      // Set triggered links parents as active
	      // With both <ul> and <nav> markup a parent is the previous sibling of any nav ancestor
	      for (var _iterator5 = _createForOfIteratorHelperLoose(SelectorEngine.prev(listGroup, SELECTOR_LINK_ITEMS)), _step5; !(_step5 = _iterator5()).done;) {
	        var item = _step5.value;
	        item.classList.add(CLASS_NAME_ACTIVE$1);
	      }
	    }
	  };
	  _proto._clearActiveClass = function _clearActiveClass(parent) {
	    parent.classList.remove(CLASS_NAME_ACTIVE$1);
	    var activeNodes = SelectorEngine.find(SELECTOR_TARGET_LINKS + "." + CLASS_NAME_ACTIVE$1, parent);
	    for (var _iterator6 = _createForOfIteratorHelperLoose(activeNodes), _step6; !(_step6 = _iterator6()).done;) {
	      var node = _step6.value;
	      node.classList.remove(CLASS_NAME_ACTIVE$1);
	    }
	  }

	  // Static
	  ;
	  ScrollSpy.jQueryInterface = function jQueryInterface(config) {
	    return this.each(function () {
	      var data = ScrollSpy.getOrCreateInstance(this, config);
	      if (typeof config !== 'string') {
	        return;
	      }
	      if (data[config] === undefined || config.startsWith('_') || config === 'constructor') {
	        throw new TypeError("No method named \"" + config + "\"");
	      }
	      data[config]();
	    });
	  };
	  _createClass(ScrollSpy, null, [{
	    key: "Default",
	    get: function get() {
	      return Default$1;
	    }
	  }, {
	    key: "DefaultType",
	    get: function get() {
	      return DefaultType$1;
	    }
	  }, {
	    key: "NAME",
	    get: function get() {
	      return NAME$2;
	    }
	  }]);
	  return ScrollSpy;
	}(BaseComponent);
	/**
	 * Data API implementation
	 */
	EventHandler.on(window, EVENT_LOAD_DATA_API$1, function () {
	  for (var _iterator7 = _createForOfIteratorHelperLoose(SelectorEngine.find(SELECTOR_DATA_SPY)), _step7; !(_step7 = _iterator7()).done;) {
	    var spy = _step7.value;
	    ScrollSpy.getOrCreateInstance(spy);
	  }
	});

	/**
	 * jQuery
	 */

	defineJQueryPlugin(ScrollSpy);

	window.bootstrap = window.bootstrap || {};
	window.bootstrap.Scrollspy = ScrollSpy;
	if (Joomla && Joomla.getOptions) {
	  // Get the elements/configurations from the PHP
	  var scrollspys = Joomla.getOptions('bootstrap.scrollspy');
	  // Initialise the elements
	  if (typeof scrollspys === 'object' && scrollspys !== null) {
	    Object.keys(scrollspys).forEach(function (scrollspy) {
	      var opt = scrollspys[scrollspy];
	      var options = {
	        offset: opt.offset ? opt.offset : 10,
	        method: opt.method ? opt.method : 'auto'
	      };
	      if (opt.target) {
	        options.target = opt.target;
	      }
	      var elements = Array.from(document.querySelectorAll(scrollspy));
	      if (elements.length) {
	        elements.map(function (el) {
	          return new window.bootstrap.Scrollspy(el, options);
	        });
	      }
	    });
	  }
	}

	/**
	 * Constants
	 */

	var NAME$1 = 'tab';
	var DATA_KEY$1 = 'bs.tab';
	var EVENT_KEY$1 = "." + DATA_KEY$1;
	var EVENT_HIDE$1 = "hide" + EVENT_KEY$1;
	var EVENT_HIDDEN$1 = "hidden" + EVENT_KEY$1;
	var EVENT_SHOW$1 = "show" + EVENT_KEY$1;
	var EVENT_SHOWN$1 = "shown" + EVENT_KEY$1;
	var EVENT_CLICK_DATA_API = "click" + EVENT_KEY$1;
	var EVENT_KEYDOWN = "keydown" + EVENT_KEY$1;
	var EVENT_LOAD_DATA_API = "load" + EVENT_KEY$1;
	var ARROW_LEFT_KEY = 'ArrowLeft';
	var ARROW_RIGHT_KEY = 'ArrowRight';
	var ARROW_UP_KEY = 'ArrowUp';
	var ARROW_DOWN_KEY = 'ArrowDown';
	var HOME_KEY = 'Home';
	var END_KEY = 'End';
	var CLASS_NAME_ACTIVE = 'active';
	var CLASS_NAME_FADE$1 = 'fade';
	var CLASS_NAME_SHOW$1 = 'show';
	var CLASS_DROPDOWN = 'dropdown';
	var SELECTOR_DROPDOWN_TOGGLE = '.dropdown-toggle';
	var SELECTOR_DROPDOWN_MENU = '.dropdown-menu';
	var NOT_SELECTOR_DROPDOWN_TOGGLE = ":not(" + SELECTOR_DROPDOWN_TOGGLE + ")";
	var SELECTOR_TAB_PANEL = '.list-group, .nav, [role="tablist"]';
	var SELECTOR_OUTER = '.nav-item, .list-group-item';
	var SELECTOR_INNER = ".nav-link" + NOT_SELECTOR_DROPDOWN_TOGGLE + ", .list-group-item" + NOT_SELECTOR_DROPDOWN_TOGGLE + ", [role=\"tab\"]" + NOT_SELECTOR_DROPDOWN_TOGGLE;
	var SELECTOR_DATA_TOGGLE = '[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]'; // TODO: could only be `tab` in v6
	var SELECTOR_INNER_ELEM = SELECTOR_INNER + ", " + SELECTOR_DATA_TOGGLE;
	var SELECTOR_DATA_TOGGLE_ACTIVE = "." + CLASS_NAME_ACTIVE + "[data-bs-toggle=\"tab\"], ." + CLASS_NAME_ACTIVE + "[data-bs-toggle=\"pill\"], ." + CLASS_NAME_ACTIVE + "[data-bs-toggle=\"list\"]";

	/**
	 * Class definition
	 */
	var Tab = /*#__PURE__*/function (_BaseComponent) {
	  _inheritsLoose(Tab, _BaseComponent);
	  function Tab(element) {
	    var _this;
	    _this = _BaseComponent.call(this, element) || this;
	    _this._parent = _this._element.closest(SELECTOR_TAB_PANEL);
	    if (!_this._parent) {
	      return _assertThisInitialized(_this);
	      // TODO: should throw exception in v6
	      // throw new TypeError(`${element.outerHTML} has not a valid parent ${SELECTOR_INNER_ELEM}`)
	    }

	    // Set up initial aria attributes
	    _this._setInitialAttributes(_this._parent, _this._getChildren());
	    EventHandler.on(_this._element, EVENT_KEYDOWN, function (event) {
	      return _this._keydown(event);
	    });
	    return _this;
	  }

	  // Getters
	  var _proto = Tab.prototype;
	  // Public
	  _proto.show = function show() {
	    // Shows this elem and deactivate the active sibling if exists
	    var innerElem = this._element;
	    if (this._elemIsActive(innerElem)) {
	      return;
	    }

	    // Search for active tab on same parent to deactivate it
	    var active = this._getActiveElem();
	    var hideEvent = active ? EventHandler.trigger(active, EVENT_HIDE$1, {
	      relatedTarget: innerElem
	    }) : null;
	    var showEvent = EventHandler.trigger(innerElem, EVENT_SHOW$1, {
	      relatedTarget: active
	    });
	    if (showEvent.defaultPrevented || hideEvent && hideEvent.defaultPrevented) {
	      return;
	    }
	    this._deactivate(active, innerElem);
	    this._activate(innerElem, active);
	  }

	  // Private
	  ;
	  _proto._activate = function _activate(element, relatedElem) {
	    var _this2 = this;
	    if (!element) {
	      return;
	    }
	    element.classList.add(CLASS_NAME_ACTIVE);
	    this._activate(SelectorEngine.getElementFromSelector(element)); // Search and activate/show the proper section

	    var complete = function complete() {
	      if (element.getAttribute('role') !== 'tab') {
	        element.classList.add(CLASS_NAME_SHOW$1);
	        return;
	      }
	      element.removeAttribute('tabindex');
	      element.setAttribute('aria-selected', true);
	      _this2._toggleDropDown(element, true);
	      EventHandler.trigger(element, EVENT_SHOWN$1, {
	        relatedTarget: relatedElem
	      });
	    };
	    this._queueCallback(complete, element, element.classList.contains(CLASS_NAME_FADE$1));
	  };
	  _proto._deactivate = function _deactivate(element, relatedElem) {
	    var _this3 = this;
	    if (!element) {
	      return;
	    }
	    element.classList.remove(CLASS_NAME_ACTIVE);
	    element.blur();
	    this._deactivate(SelectorEngine.getElementFromSelector(element)); // Search and deactivate the shown section too

	    var complete = function complete() {
	      if (element.getAttribute('role') !== 'tab') {
	        element.classList.remove(CLASS_NAME_SHOW$1);
	        return;
	      }
	      element.setAttribute('aria-selected', false);
	      element.setAttribute('tabindex', '-1');
	      _this3._toggleDropDown(element, false);
	      EventHandler.trigger(element, EVENT_HIDDEN$1, {
	        relatedTarget: relatedElem
	      });
	    };
	    this._queueCallback(complete, element, element.classList.contains(CLASS_NAME_FADE$1));
	  };
	  _proto._keydown = function _keydown(event) {
	    if (![ARROW_LEFT_KEY, ARROW_RIGHT_KEY, ARROW_UP_KEY, ARROW_DOWN_KEY, HOME_KEY, END_KEY].includes(event.key)) {
	      return;
	    }
	    event.stopPropagation(); // stopPropagation/preventDefault both added to support up/down keys without scrolling the page
	    event.preventDefault();
	    var children = this._getChildren().filter(function (element) {
	      return !isDisabled(element);
	    });
	    var nextActiveElement;
	    if ([HOME_KEY, END_KEY].includes(event.key)) {
	      nextActiveElement = children[event.key === HOME_KEY ? 0 : children.length - 1];
	    } else {
	      var isNext = [ARROW_RIGHT_KEY, ARROW_DOWN_KEY].includes(event.key);
	      nextActiveElement = getNextActiveElement(children, event.target, isNext, true);
	    }
	    if (nextActiveElement) {
	      nextActiveElement.focus({
	        preventScroll: true
	      });
	      Tab.getOrCreateInstance(nextActiveElement).show();
	    }
	  };
	  _proto._getChildren = function _getChildren() {
	    // collection of inner elements
	    return SelectorEngine.find(SELECTOR_INNER_ELEM, this._parent);
	  };
	  _proto._getActiveElem = function _getActiveElem() {
	    var _this4 = this;
	    return this._getChildren().find(function (child) {
	      return _this4._elemIsActive(child);
	    }) || null;
	  };
	  _proto._setInitialAttributes = function _setInitialAttributes(parent, children) {
	    this._setAttributeIfNotExists(parent, 'role', 'tablist');
	    for (var _iterator = _createForOfIteratorHelperLoose(children), _step; !(_step = _iterator()).done;) {
	      var child = _step.value;
	      this._setInitialAttributesOnChild(child);
	    }
	  };
	  _proto._setInitialAttributesOnChild = function _setInitialAttributesOnChild(child) {
	    child = this._getInnerElement(child);
	    var isActive = this._elemIsActive(child);
	    var outerElem = this._getOuterElement(child);
	    child.setAttribute('aria-selected', isActive);
	    if (outerElem !== child) {
	      this._setAttributeIfNotExists(outerElem, 'role', 'presentation');
	    }
	    if (!isActive) {
	      child.setAttribute('tabindex', '-1');
	    }
	    this._setAttributeIfNotExists(child, 'role', 'tab');

	    // set attributes to the related panel too
	    this._setInitialAttributesOnTargetPanel(child);
	  };
	  _proto._setInitialAttributesOnTargetPanel = function _setInitialAttributesOnTargetPanel(child) {
	    var target = SelectorEngine.getElementFromSelector(child);
	    if (!target) {
	      return;
	    }
	    this._setAttributeIfNotExists(target, 'role', 'tabpanel');
	    if (child.id) {
	      this._setAttributeIfNotExists(target, 'aria-labelledby', "" + child.id);
	    }
	  };
	  _proto._toggleDropDown = function _toggleDropDown(element, open) {
	    var outerElem = this._getOuterElement(element);
	    if (!outerElem.classList.contains(CLASS_DROPDOWN)) {
	      return;
	    }
	    var toggle = function toggle(selector, className) {
	      var element = SelectorEngine.findOne(selector, outerElem);
	      if (element) {
	        element.classList.toggle(className, open);
	      }
	    };
	    toggle(SELECTOR_DROPDOWN_TOGGLE, CLASS_NAME_ACTIVE);
	    toggle(SELECTOR_DROPDOWN_MENU, CLASS_NAME_SHOW$1);
	    outerElem.setAttribute('aria-expanded', open);
	  };
	  _proto._setAttributeIfNotExists = function _setAttributeIfNotExists(element, attribute, value) {
	    if (!element.hasAttribute(attribute)) {
	      element.setAttribute(attribute, value);
	    }
	  };
	  _proto._elemIsActive = function _elemIsActive(elem) {
	    return elem.classList.contains(CLASS_NAME_ACTIVE);
	  }

	  // Try to get the inner element (usually the .nav-link)
	  ;
	  _proto._getInnerElement = function _getInnerElement(elem) {
	    return elem.matches(SELECTOR_INNER_ELEM) ? elem : SelectorEngine.findOne(SELECTOR_INNER_ELEM, elem);
	  }

	  // Try to get the outer element (usually the .nav-item)
	  ;
	  _proto._getOuterElement = function _getOuterElement(elem) {
	    return elem.closest(SELECTOR_OUTER) || elem;
	  }

	  // Static
	  ;
	  Tab.jQueryInterface = function jQueryInterface(config) {
	    return this.each(function () {
	      var data = Tab.getOrCreateInstance(this);
	      if (typeof config !== 'string') {
	        return;
	      }
	      if (data[config] === undefined || config.startsWith('_') || config === 'constructor') {
	        throw new TypeError("No method named \"" + config + "\"");
	      }
	      data[config]();
	    });
	  };
	  _createClass(Tab, null, [{
	    key: "NAME",
	    get: function get() {
	      return NAME$1;
	    }
	  }]);
	  return Tab;
	}(BaseComponent);
	/**
	 * Data API implementation
	 */
	EventHandler.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function (event) {
	  if (['A', 'AREA'].includes(this.tagName)) {
	    event.preventDefault();
	  }
	  if (isDisabled(this)) {
	    return;
	  }
	  Tab.getOrCreateInstance(this).show();
	});

	/**
	 * Initialize on focus
	 */
	EventHandler.on(window, EVENT_LOAD_DATA_API, function () {
	  for (var _iterator2 = _createForOfIteratorHelperLoose(SelectorEngine.find(SELECTOR_DATA_TOGGLE_ACTIVE)), _step2; !(_step2 = _iterator2()).done;) {
	    var element = _step2.value;
	    Tab.getOrCreateInstance(element);
	  }
	});
	/**
	 * jQuery
	 */

	defineJQueryPlugin(Tab);

	window.Joomla = window.Joomla || {};
	window.bootstrap = window.bootstrap || {};
	window.bootstrap.Tab = Tab;

	/**
	 * Initialise the Tabs interactivity
	 *
	 * @param {HTMLElement} el The element that will become a collapse
	 * @param {object} options The options for this collapse
	 */
	Joomla.initialiseTabs = function (el, options) {
	  if (!(el instanceof Element) && options.isJoomla) {
	    var tab = document.querySelector(el + "Content");
	    if (tab) {
	      var related = Array.from(tab.children);

	      // Build the navigation
	      if (related.length) {
	        related.forEach(function (element) {
	          if (!element.classList.contains('tab-pane')) {
	            return;
	          }
	          var isActive = element.dataset.active !== '';
	          var ul = document.querySelector(el + "Tabs");
	          if (ul) {
	            var link = document.createElement('a');
	            link.href = "#" + element.dataset.id;
	            link.classList.add('nav-link');
	            if (isActive) {
	              link.classList.add('active');
	            }
	            link.dataset.bsToggle = 'tab';
	            link.setAttribute('role', 'tab');
	            link.setAttribute('aria-controls', element.dataset.id);
	            link.setAttribute('aria-selected', element.dataset.id);
	            link.innerHTML = Joomla.sanitizeHtml(element.dataset.title);
	            var li = document.createElement('li');
	            li.classList.add('nav-item');
	            li.setAttribute('role', 'presentation');
	            li.appendChild(link);
	            ul.appendChild(li);

	            // eslint-disable-next-line no-new
	            new window.bootstrap.Tab(li);
	          }
	        });
	      }
	    }
	  } else {
	    Array.from(document.querySelectorAll(el + " a")).map(function (tab) {
	      return new window.bootstrap.Tab(tab, options);
	    });
	  }
	};
	if (Joomla && Joomla.getOptions) {
	  // Get the elements/configurations from the PHP
	  var tabs = Joomla.getOptions('bootstrap.tabs');
	  // Initialise the elements
	  if (typeof tabs === 'object' && tabs !== null) {
	    Object.keys(tabs).map(function (tab) {
	      return Joomla.initialiseTabs(tab, tabs[tab]);
	    });
	  }
	}

	/**
	 * Constants
	 */

	var NAME = 'toast';
	var DATA_KEY = 'bs.toast';
	var EVENT_KEY = "." + DATA_KEY;
	var EVENT_MOUSEOVER = "mouseover" + EVENT_KEY;
	var EVENT_MOUSEOUT = "mouseout" + EVENT_KEY;
	var EVENT_FOCUSIN = "focusin" + EVENT_KEY;
	var EVENT_FOCUSOUT = "focusout" + EVENT_KEY;
	var EVENT_HIDE = "hide" + EVENT_KEY;
	var EVENT_HIDDEN = "hidden" + EVENT_KEY;
	var EVENT_SHOW = "show" + EVENT_KEY;
	var EVENT_SHOWN = "shown" + EVENT_KEY;
	var CLASS_NAME_FADE = 'fade';
	var CLASS_NAME_HIDE = 'hide'; // @deprecated - kept here only for backwards compatibility
	var CLASS_NAME_SHOW = 'show';
	var CLASS_NAME_SHOWING = 'showing';
	var DefaultType = {
	  animation: 'boolean',
	  autohide: 'boolean',
	  delay: 'number'
	};
	var Default = {
	  animation: true,
	  autohide: true,
	  delay: 5000
	};

	/**
	 * Class definition
	 */
	var Toast = /*#__PURE__*/function (_BaseComponent) {
	  _inheritsLoose(Toast, _BaseComponent);
	  function Toast(element, config) {
	    var _this;
	    _this = _BaseComponent.call(this, element, config) || this;
	    _this._timeout = null;
	    _this._hasMouseInteraction = false;
	    _this._hasKeyboardInteraction = false;
	    _this._setListeners();
	    return _this;
	  }

	  // Getters
	  var _proto = Toast.prototype;
	  // Public
	  _proto.show = function show() {
	    var _this2 = this;
	    var showEvent = EventHandler.trigger(this._element, EVENT_SHOW);
	    if (showEvent.defaultPrevented) {
	      return;
	    }
	    this._clearTimeout();
	    if (this._config.animation) {
	      this._element.classList.add(CLASS_NAME_FADE);
	    }
	    var complete = function complete() {
	      _this2._element.classList.remove(CLASS_NAME_SHOWING);
	      EventHandler.trigger(_this2._element, EVENT_SHOWN);
	      _this2._maybeScheduleHide();
	    };
	    this._element.classList.remove(CLASS_NAME_HIDE); // @deprecated
	    reflow(this._element);
	    this._element.classList.add(CLASS_NAME_SHOW, CLASS_NAME_SHOWING);
	    this._queueCallback(complete, this._element, this._config.animation);
	  };
	  _proto.hide = function hide() {
	    var _this3 = this;
	    if (!this.isShown()) {
	      return;
	    }
	    var hideEvent = EventHandler.trigger(this._element, EVENT_HIDE);
	    if (hideEvent.defaultPrevented) {
	      return;
	    }
	    var complete = function complete() {
	      _this3._element.classList.add(CLASS_NAME_HIDE); // @deprecated
	      _this3._element.classList.remove(CLASS_NAME_SHOWING, CLASS_NAME_SHOW);
	      EventHandler.trigger(_this3._element, EVENT_HIDDEN);
	    };
	    this._element.classList.add(CLASS_NAME_SHOWING);
	    this._queueCallback(complete, this._element, this._config.animation);
	  };
	  _proto.dispose = function dispose() {
	    this._clearTimeout();
	    if (this.isShown()) {
	      this._element.classList.remove(CLASS_NAME_SHOW);
	    }
	    _BaseComponent.prototype.dispose.call(this);
	  };
	  _proto.isShown = function isShown() {
	    return this._element.classList.contains(CLASS_NAME_SHOW);
	  }

	  // Private
	  ;
	  _proto._maybeScheduleHide = function _maybeScheduleHide() {
	    var _this4 = this;
	    if (!this._config.autohide) {
	      return;
	    }
	    if (this._hasMouseInteraction || this._hasKeyboardInteraction) {
	      return;
	    }
	    this._timeout = setTimeout(function () {
	      _this4.hide();
	    }, this._config.delay);
	  };
	  _proto._onInteraction = function _onInteraction(event, isInteracting) {
	    switch (event.type) {
	      case 'mouseover':
	      case 'mouseout':
	        {
	          this._hasMouseInteraction = isInteracting;
	          break;
	        }
	      case 'focusin':
	      case 'focusout':
	        {
	          this._hasKeyboardInteraction = isInteracting;
	          break;
	        }
	    }
	    if (isInteracting) {
	      this._clearTimeout();
	      return;
	    }
	    var nextElement = event.relatedTarget;
	    if (this._element === nextElement || this._element.contains(nextElement)) {
	      return;
	    }
	    this._maybeScheduleHide();
	  };
	  _proto._setListeners = function _setListeners() {
	    var _this5 = this;
	    EventHandler.on(this._element, EVENT_MOUSEOVER, function (event) {
	      return _this5._onInteraction(event, true);
	    });
	    EventHandler.on(this._element, EVENT_MOUSEOUT, function (event) {
	      return _this5._onInteraction(event, false);
	    });
	    EventHandler.on(this._element, EVENT_FOCUSIN, function (event) {
	      return _this5._onInteraction(event, true);
	    });
	    EventHandler.on(this._element, EVENT_FOCUSOUT, function (event) {
	      return _this5._onInteraction(event, false);
	    });
	  };
	  _proto._clearTimeout = function _clearTimeout() {
	    clearTimeout(this._timeout);
	    this._timeout = null;
	  }

	  // Static
	  ;
	  Toast.jQueryInterface = function jQueryInterface(config) {
	    return this.each(function () {
	      var data = Toast.getOrCreateInstance(this, config);
	      if (typeof config === 'string') {
	        if (typeof data[config] === 'undefined') {
	          throw new TypeError("No method named \"" + config + "\"");
	        }
	        data[config](this);
	      }
	    });
	  };
	  _createClass(Toast, null, [{
	    key: "Default",
	    get: function get() {
	      return Default;
	    }
	  }, {
	    key: "DefaultType",
	    get: function get() {
	      return DefaultType;
	    }
	  }, {
	    key: "NAME",
	    get: function get() {
	      return NAME;
	    }
	  }]);
	  return Toast;
	}(BaseComponent);
	/**
	 * Data API implementation
	 */
	enableDismissTrigger(Toast);

	/**
	 * jQuery
	 */

	defineJQueryPlugin(Toast);

	window.bootstrap = window.bootstrap || {};
	window.bootstrap.Toast = Toast;
	if (Joomla && Joomla.getOptions) {
	  // Get the elements/configurations from the PHP
	  var toasts = Joomla.getOptions('bootstrap.toast');
	  // Initialise the elements
	  if (typeof toasts === 'object' && toasts !== null) {
	    Object.keys(toasts).forEach(function (toast) {
	      var opt = toasts[toast];
	      var options = {
	        animation: opt.animation ? opt.animation : true,
	        autohide: opt.autohide ? opt.autohide : true,
	        delay: opt.delay ? opt.delay : 5000
	      };
	      var elements = Array.from(document.querySelectorAll(toast));
	      if (elements.length) {
	        elements.map(function (el) {
	          return new window.bootstrap.Toast(el, options);
	        });
	      }
	    });
	  }
	}

	exports.Alert = Alert;
	exports.Button = Button;
	exports.Carousel = Carousel;
	exports.Collapse = Collapse;
	exports.Dropdown = Dropdown;
	exports.Modal = Modal;
	exports.Offcanvas = Offcanvas;
	exports.Popover = Popover;
	exports.Scrollspy = ScrollSpy;
	exports.Tab = Tab;
	exports.Toast = Toast;

	Object.defineProperty(exports, '__esModule', { value: true });

	return exports;

})({});
