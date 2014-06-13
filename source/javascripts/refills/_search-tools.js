var FeatureFilter;

FeatureFilter = (function() {
  FeatureFilter.selector = '.feature.filter';

  FeatureFilter.optionsContainerSelector = '> div';

  FeatureFilter.enhancedClass = 'js-feature-filter';

  FeatureFilter.hideOptionsClass = 'hide-options';

  FeatureFilter.enhance = function() {
    var klass;
    klass = this;
    return $(this.selector).each(function() {
      return new klass(this).enhance();
    });
  };

  function FeatureFilter(element) {
    this._element = $(element);
    this._optionsContainer = this._element.find(this.constructor.optionsContainerSelector);
  }

  FeatureFilter.prototype.enhance = function() {
    this._element.addClass(this.constructor.enhancedClass);
    this._buildUI();
    return this._bindEvents();
  };

  FeatureFilter.prototype._buildUI = function() {
    this._summaryElement = $('<label></label>').addClass('summary').attr('data-role', 'summary').prependTo(this._optionsContainer);
    this._clearSelectionButton = $('<button></button>').text('Clear').attr('type', 'button').insertAfter(this._summaryElement);
    this._optionsContainer.addClass(this.constructor.hideOptionsClass);
    return this._updateSummary();
  };

  FeatureFilter.prototype._bindEvents = function() {
    this._summaryElement.click((function(_this) {
      return function() {
        return _this._toggleOptions();
      };
    })(this));
    this._clearSelectionButton.click((function(_this) {
      return function() {
        return _this._clearSelection();
      };
    })(this));
    this._checkboxes().change((function(_this) {
      return function() {
        return _this._updateSummary();
      };
    })(this));
    return $('body').click((function(_this) {
      return function(e) {
        var inFilter;
        inFilter = $(e.target).closest(_this.constructor.selector).length > 0;
        if (!inFilter) {
          return _this._allOptionsContainers().addClass(_this.constructor.hideOptionsClass);
        }
      };
    })(this));
  };

  FeatureFilter.prototype._toggleOptions = function() {
    this._allOptionsContainers().not(this._optionsContainer).addClass(this.constructor.hideOptionsClass);
    return this._optionsContainer.toggleClass(this.constructor.hideOptionsClass);
  };

  FeatureFilter.prototype._updateSummary = function() {
    var checked, summary;
    checked = this._checkboxes().filter(':checked');
    if (checked.length === 0) {
      summary = 'All filters';
    } else {
      summary = 'Selected option';
    }
    return this._summaryElement.text(summary);
  };

  FeatureFilter.prototype._clearSelection = function() {
    this._checkboxes().each(function() {
      return $(this).prop('checked', false);
    });
    return this._updateSummary();
  };

  FeatureFilter.prototype._checkboxes = function() {
    return this._element.find(':checkbox');
  };

  FeatureFilter.prototype._labelsFor = function(inputs) {
    return inputs.map(function() {
      var id;
      id = $(this).attr('id');
      return $("label[for='" + id + "']").text();
    }).get();
  };

  FeatureFilter.prototype._allOptionsContainers = function() {
    return $("" + this.constructor.selector + " " + this.constructor.optionsContainerSelector);
  };

  return FeatureFilter;

})();

$(function() {
  return FeatureFilter.enhance();
});
