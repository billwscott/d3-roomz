/*
 * nougat.js v0.0.1 - Application Mediator/Sandbox Library
 * This module performs the function of mediator/sandbox.
 * 
 * @author Erik Toth <ertoth@paypal.com>
 */

/*global define:false, requirejs:true */
/*jslint plusplus:true, nomen:true */

define(['jquery', 'dust','dust-helpers-supplement'], function ($, dust) {
	'use strict';

	var ViewRenderer = null,
		DustRenderer = null,
		Nougat = null;

	/**
	 * Creates a new array with all elements that pass the test implemented by the provided function.
	 * The filter callback receives three arguments: the value of the element, the index of the element,
	 * and the Array object being traversed.
	 * @param {Array} arr the array to filter
	 * @param {Function} fn the function defining the filter test, returning true to keep and false to discard.
	 * @param {Object} [context] Object to use as this when executing callback.
	 */
	function filter(arr, fn, context) {
		if (Array.prototype.filter) {
			return arr.filter(fn);
		}

		var result = [],
			length = arr.length - 1,
			value = null;

		while (length > -1) {
			value = arr[length];
			if (fn.call(context, value, length, arr)) {
				result.unshift(value);
			}
			length--;
		}

		return result;
	}


	/**
	 * Executes a provided function once per array element or object property.
	 * Based on http://es5.github.com/#x15.4.4.18
	 * @param {Object} obj the array or object to enumerate
	 * @param {Function} fn the function to invoke on each element
	 * @param {Object} [context] Object to use as this when executing callback.
	 */
	function forEach(obj, fn, context) {
		if (obj instanceof Array && Array.prototype.forEach) {
			return obj.forEach(fn, context);
		}

		var object = Object(obj),
			prop = null,
			result = null;

		for (prop in object) {
			if (object.hasOwnProperty(prop)) {
				result = fn.call(context, object[prop], prop, object);
				// Provide the ability to short circuit and fail-fast
				if (result === false) {
					break;
				}
			}
		}
	}

	/**
	 * A basic object mixin implementation. Copies the properties from the source
	 * object to the destination object.
	 * @param {Object} src the object containing the properties to be copied
	 * @param {Object} dest the object to which the properties should be copied
	 */
	function mixin(src, dest) {
		var prop = null;
		for (prop in src) {
			if (src.hasOwnProperty(prop)) {
				dest[prop] = src[prop];
			}
		}
		return dest;
	}

	/**
	 * A simple object extend implementation that copies properties from several
	 * source objects into the destination object.
	 * @param {Object} dest the object to which the properties should be copied
	 * @param {Object...} sources the objects from which the properties should be copied
	 */
	function extend(dest) {
		forEach(Array.prototype.slice.call(arguments, 1), function (src) {
			mixin(src, dest);
		});
		return dest;
	}


	/**
	 * An abstract view renderer implementation that"s based on Promises
	 * @constructor
	 */
	ViewRenderer = function () {
		// Intentionally left blank
	};

	ViewRenderer.prototype = {

		/**
		 * The main public API for rendering a template
		 * @param template the name of the template to render
		 * @param context the context to pass to the renderer
		 * @returns a Promise
		 */
		render: function (template, context) {
			var deferred = new $.Deferred();
			this._doRender(template, context, function (err, out) {
				if (err) { return deferred.reject(err); }
				deferred.resolve(out, template);
			});
			return deferred.promise();
		},

		/**
		 * The method to override to provide the view rendering implementation
		 * @private
		 * @param template the name of the template to render
		 * @param context the content to pass to the renderer
		 * @param callback the callback invoked when rendering is complete
		 */
		_doRender: function (template, context, callback) {
			// TODO: Implement
		}
	};



	/**
	 * A Dust view rendering implementation
	 * @constructor
	 */
	DustRenderer = function (nougat) {
		var DEFAULT_PATH = '/templates/%s.js';

		dust.onLoad = function (name, callback) {
			var path = nougat.getContext().templatePath || DEFAULT_PATH,
				template = path.replace('%s', name);

			require([template], function () {
				// Merely using requireJs to the load compiled template so undefining
				// it as soon as it's loaded so doesn't sit in the requireJs *and* dust.js
				// caches. Also, we know it's JS, thus doesn't need to be compiled so
				// callback has no arguments.
				requirejs.undef(template);
				setTimeout(callback, 0);
			});
		};
	};

	DustRenderer.prototype = extend(ViewRenderer.prototype, {
		_doRender: function (template, context, callback) {
			var base = {};
			context = context || {};

			// Ugh.
			if (context.content) {
				base.cn = context.content;
				delete context.content;
			}

			context = dust.makeBase(base).push(context);
			dust.render(template, context, callback);
		}
	});



	Nougat = function () {
		this._context = {};
		this._eventCache = {};
		this.viewRenderer = new DustRenderer(this);
	};

	Nougat.prototype = {

		/**
		 * Register an event listener with the provided callback and optional context.
		 * @param {String} event a space separated list of events to bind
		 * @param {Function} callback the method to be invoked when an event is dispatched
		 * @param {Object} [context] the context the callback should have (value of "this") when the callback is invoked
		 */
		on : function (event, callback, context) {
			var cache = this._eventCache;

			forEach(event.split(/\s+/), function (event) {
				var descriptors = cache[event] || (cache[event] = []);
				descriptors.push({
					name: event,
					callback: callback,
					context: context
				});
			});
		},

		/**
		 * Stops listening for events that meet the provided criteria
		 * @param {String} [event] a list of events to bind separated by whitespace
		 * @param {Function} [callback] the method to be invoked when an event is dispatched
		 * @param {Object} [context] the context the callback should have (value of "this") when the callback is invoked
		 */
		off : function (event, callback, context) {
			var cache = this._eventCache,
				events = event ? Object(event.split(/\s+/)) : null,
				matcher = null;

			// Optimization for event-name only calls
			if (events && !callback && !context) {
				forEach(events, function (evt) {
					delete cache[evt];
				});
				return;
			}

			matcher = {
				callback: callback,
				context: context
			};

			// Scan the cache looking for events that meet the criteria to remove listeners
			forEach(cache, function (descriptors, name) {
				if (!events || events.hasOwnProperty(name)) {
					cache[name] = filter(descriptors, function (descriptor) {
						var keep = false;
						forEach(matcher, function (value, key) {
							if (value && value !== descriptor[key]) {
								// If a value is defined but doesn't match, flag the event descriptor
								// as 'keep'.
								keep = true;
							}
							return !keep;
						});
						return keep;
					});
				}
			});
		},

		/**
		 * Publish the given event, invoking callback with the optionally provided data
		 * @param {String} event the name of the event to dispatch
		 * @param {Object} [args...] any values that should be passed to listeners as arguments
		 */
		trigger : function (event) {
			var cache = this._eventCache,
				data = Array.prototype.slice.call(arguments, 1),
				descriptors = null;

			forEach(event.split(/\s+/), function (event) {
				descriptors = cache[event];
				if (descriptors) {
					forEach(descriptors, function (descriptor) {
						descriptor.callback.apply(descriptor.context, data);
					});
				}
			});
		},

		/**
		 * 
		 * @param context
		 * @returns
		 */
		setContext : function (context) {
			return mixin(context, this._context);
		},

		/**
		 * 
		 * @returns the current context object
		 */
		getContext : function () {
			return this._context;
		}

	};

	return new Nougat();

});
