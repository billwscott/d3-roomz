/* global define:true */

/**
 * Abstract view which enables rendering contents with a template.
 */
define([
	'nougat',
	'underscore',
	'backbone'
],
function (nougat, _, Backbone) {

	'use strict';


	var BaseView = Backbone.View.extend({

		/**
		 * The name of the template that represents this view.
		 * Must be defined for render to succeed.
		 */
		template: null,

		/**
		 * A default implementation of the standard Backbone render method.
		 * Handles rendering a template with the current view model.
		 * @returns the current view instance
		 */
		render: function () {
			var renderer = nougat.viewRenderer,
				template = this.template,
				data = this.serialize();

			_.bindAll(this, '_doRender', 'renderError', 'afterRender');

			this.beforeRender();

			renderer.render(template, data)
				.done(this._doRender)
				.fail(this.renderError)
				.always(this.afterRender);

			return this;
		},

		/**
		 * 'Protected' imlementation of what to do with template render result.
		 * Override to get access to raw content string.
		 * @param {String} content the rendered template string
		 * @param {String} template the name of this template
		 */
		_doRender: function (content, template) {
			this.$el.html(content);
		},

		/**
		 * A handler to be invoked prior to a template being rendered
		 * @optional
		 */
		beforeRender: function () {
			// TODO: [optional] override
		},

		/**
		 * A handler to be invoked once template rendering is complete.
		 */
		afterRender: function () {
			// TODO: [optional] override
		},

		/**
		 * The error handler for template rendering
		 * @param {Error} err the error that occurred
		 */
		renderError: function (err) {
			// TODO: [optional] override
		},

		/**
		 * Gets the current model or collection in JSON form.
		 * @returns
		 */
		serialize: function () {
			var data = this.model || this.collection;
			if (data && data.toJSON) {
				return data.toJSON();
			}
			return {};
		}
	});

	return BaseView;
});
