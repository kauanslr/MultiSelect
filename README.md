# MultiSelect
MultiSelect jQuery Plugin. [Search] [Checkbox] [Public Methods]

The basic structure is on ``index.html``

## Getting Start
With the demo structure, you can simply add this to your script:

``new multiSelect($('.dropdown-container')).init();``

## Configurations
The basic options object has:

Search input: ``searcher: $('.dropdown-search')``

The dropdown button: ``dropButton: $('.dropdown-button')``

The dropdown list: ``dropList: $('.dropdown-list')``

The counter element: ``counter: $('.quantity')``

The checkall input: ``checkAll: $('#check-all')``

### Below attributes is to generated input, that present in data object

The generated input name attribute from data object: ``inputName: 'multiselect'``

The generated input value attribute from data object: ``inputValue: 'id'``

The generated label text attribute from data object: ``inputText: 'name'``

The max value length on dropdown: ``countMax: 3``

Data example: ``[
    {id: 1,name: 'Demo data 1'},
    {id: 2,name: 'Demo data 2'}
    ]``

### Default options

All default options is the exemple above.

## Methods

First of all, to use public metods, this plugin return a instance of it self, so you need to assign to a variable, i recoment to make this:

``const myVariable = new multiSelect($('.dropdown-container')).init();```

With above code, you can access public methods like ``myVariable.reset()``, ``myVariable.check(3)``, or what you want.

#### This methods are available:

``reset()``: Reset all options of plugin. Uncheck all, remove filters and hide dropdown list. Is userfull when you have multiple instances in your page.

``recount()``: Recount checked inputs and change counter element with the information;

``check(id)``: Receive a element value attribute and check that element.

``uncheck(id)``: Receive a element value attribute and uncheck that element.

``checkAll()``: Check all elements.

``uncheckAll()``: Uncheck all elements.

``getCheckeds()``: It takes all checkeds elements and return.

``getChecks()``: Takes all elements and return.

``getCheckedsAsArray()``: It takes the value of all checked elements and returns as array.

## TODO:

- [ ] Remove jQuery dependency.
- [ ] Pass CSS to javascript module.
- [ ] Minify JS.
- [ ] Convert to TDD.
- [ ] Create default html structure inside JS module.