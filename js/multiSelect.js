/*!
 * jQuery multiSelect
 * Original author: @kauanslr - D1UP Web
 * Licensed under the MIT license
 */
/* eslint-disable func-names */
(function ($, window, document) {
  // window and document are passed through as local variables rather than global
  // as this (slightly) quickens the resolution process and can be more efficiently
  // minified (especially when both are regularly referenced in your multiSelect).

  /**
     * Plugin Defaults
     * @type {
     *        searcher: (jQuery|HTMLElement),
     *        dropButton: (jQuery|HTMLElement),
     *        dropList: (jQuery|HTMLElement),
     *        counter: (jQuery|HTMLElement),
     *        checkAll: (jQuery|HTMLElement),
     *        inputName: string,
     *        inputValue: string,
     *        inputText: string,
     *        ountMax: number,
     *        data: *[]
     *        }
     */
  const defaults = {
    searcher: $('.dropdown-search'),
    dropButton: $('.dropdown-button'),
    dropList: $('.dropdown-list'),
    counter: $('.quantity'),
    checkAll: $('#check-all'),
    inputName: 'multiselect',
    inputValue: 'id',
    inputText: 'name',
    countMax: 3,
    data: [{
      id: 1,
      name: 'Demo data 1',
    }, {
      id: 2,
      name: 'Demo data 2',
    }],
  };

    /**
     * Plugin constructor
     * @param element
     * @param options
     */
  function multiSelect(element, options) {
    this.element = element;

    this.options = $.extend({}, defaults, options);
    this.defaults = defaults;
    this.name = 'multiSelect';

    /**
     * Public Functions
     */

    /**
     * check element in the list
     * @param value
     */
    this.check = function (value) {
      $.map(this.getChecks(), (ele) => {
        if (parseInt(ele.getAttribute('value'), 10) === value) {
          ele.checked = true;
          return ele;
        }
      });
      this.options.checkAll.checked = false;
      this.recount();
    };
    /**
     * uncheck element from list
     * @param value
     */
    this.uncheck = function (value) {
      $.map(this.options.checks, (ele) => {
        if ($(ele).val() === value) {
          const s = ele;
          s.checked = false;
          return s;
        }
      });
      this.recount();
    };
    /**
     * Check All inputs
     */
    this.checkAll = function () {
      $(this.options.checks).prop('checked', true);
      this.options.checkAll.prop('checked', true);
      this.recount();
    };
    /**
     * uncheck all elements from list
     */
    this.uncheckAll = function () {
      $(this.options.checks).prop('checked', false);
      $(this.options.checkAll).prop('checked', false);
      this.recount();
    };
    /**
     * get all checked elements
     * @returns {*}
     */
    this.getCheckeds = function () {
      const c = $.map(this.options.checks, (e) => {
        if (e.checked) {
          return e;
        }
      });
      return c;
    };
    /**
     * get all checks elements
     * @returns {*}
     */
    this.getChecks = function () {
      return this.options.checks;
    };
    /**
     * recount checked elements
     */
    this.recount = function () {
      const checked = this.getCheckeds();
      const che = $.map(checked, e => e.getAttribute('data-text'));
      let txt =
                che.length < this.options.countMax ?
                  che.toString().replace(',', ', ') :
                  che.length;
      if (che.length < 1) {
        txt = 'None';
      } else if (txt.length > 60) {
        if (che[0].length > 40) {
          txt = `${che[0].toString().substring(0, 40)}...`;
          txt += che.length > 1 ? `+ ${che.length - 1}` : '';
        } else {
          txt = `${che[0].toString()} + ${che.length - 1}`;
        }
      }
      if (checked.length === this.getChecks().length) {
        txt = 'All';
        $(this.options.checkAll).prop('checked', true);
      }
      $(this.options.counter).text(txt);
    };
    /**
     * get all checked inputs as array of values
     * @returns {*}
     */
    this.getCheckedsAsArray = function () {
      const c = $.map(this.options.checks, (e) => {
        if (e.checked) {
          return e.value;
        }
      });
      return c;
    };
    /**
     * Reset checkeds and search input
     */
    this.reset = function () {
      this.uncheckAll();
      this.options.searcher.value = '';
      $(this.options.searcher).keyup();
      $(this.options.dropList).hide();
    };
  }

  /**
   * Plugin prototype
   * @type {{init(): *}}
   */
  multiSelect.prototype = {
    /**
         * Init method.
         * setup data content, create and bind events to elements
         * @returns {multiSelect}
         */
    init() {
      // Place initialization logic here
      // You already have access to the DOM element and
      // the options via the instance, e.g. this.element
      // and this.options
      // you can add more functions like the one below and
      // call them

      // Setup data
      // <li> template
      function template(obj) {
        const li = document.createElement('li');
        const input = document.createElement('input');
        const label = document.createElement('label');

        input.setAttribute('name', obj.inputName);
        input.setAttribute('id', `${obj.inputName}[]`);
        input.setAttribute('data-text', obj.text);
        input.setAttribute('value', obj.id);
        input.setAttribute('type', 'checkbox');

        label.setAttribute('for', `${obj.inputName}-${obj.id}`);
        label.innerHTML = obj.text;

        li.appendChild(input);
        li.appendChild(label);

        return li;
      }

      // Populate list with data
      this.options.data.forEach((s, i) => {
        const obj = {
          inputName: this.options.inputName,
          value: s[this.options.inputValue],
          text: s[this.options.inputText],
          id: s.id || i,
        };
        $(this.element)
          .find('ul')
          .append(template(obj));
      });

      // get all inputs that are not checkAll element
      this.options.checks = $(this.element)
        .find('[type="checkbox"]')
        .not(this.options.checkAll);

      // Binding
      this.check = this.check.bind(this);
      this.uncheck = this.uncheck.bind(this);
      this.getCheckeds = this.getCheckeds.bind(this);
      this.getChecks = this.getChecks.bind(this);
      this.checkAll = this.checkAll.bind(this);
      this.uncheckAll = this.uncheckAll.bind(this);
      this.recount = this.recount.bind(this);
      this.reset = this.reset.bind(this);

      // Events
      /**
       * Search input event handler
       * @param e
       * @returns {boolean}
       */
      const searchInput = function (e) {
        const target = $(e.target);
        const search = target.val().toLowerCase();

        if (!search) {
          $(this.element)
            .find('li')
            .show();
          return false;
        }

        $(this.options.dropList)
          .find('li')
          .each((i, el) => {
            const text = $(el)
              .text()
              .toLowerCase();
            const match = text.indexOf(search) > -1;
            $(el).toggle(match);
          });
      };
      /**
       * Drop Button event handler
       */
      const dropButton = function () {
        $(this.options.dropList).toggle();
      };
      /**
       * Check all event handler
       * @param e HTMLElementEventMap
       */
      const checkAllInput = function (e) {
        const c = e.target;
        if (c.checked) {
          $(this.getChecks()).prop('checked', true);
          $(this.options.counter).text('All');
        } else {
          $(this.options.counter).text('None');
          $(this.getChecks()).prop('checked', false);
        }
      };
      /**
       * Simple check handler
       */
      const checkInput = function () {
        this.recount();
      };

      // Assign Events
      $(this.options.dropButton).on('click', dropButton.bind(this));
      $(this.options.searcher).on('keyup', searchInput.bind(this));
      $(this.options.checks).on('change', checkInput.bind(this));
      $(this.options.checkAll).on('change', checkAllInput.bind(this));
      return this;
    },
  };

  window.multiSelect = multiSelect;
}(jQuery, window, document));
