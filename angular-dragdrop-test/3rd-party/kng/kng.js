/*! kng - v0.5.0 - 2015-10-19
 * Copyright (c) 2015 - K.lab educmedia GmbH
 */angular.module('kng', [
  'kngConfig',
  
  // services
  'services.apiClient',
  'services.app',
  'services.authentication',
  'services.authorization',
  'services.breakpoints',
  'services.currentUser',
  'services.documents',
  'services.documentsCache',
  'services.documentsStats',
  'services.downloadIframe',
  'services.feedback',
  'services.linkGroups',
  'services.links',
  'services.notifications',
  'services.playlists',
  'services.router',
  'services.scrollPosition',
  'services.search',
  'services.tracking',
  'services.users',
  'services.utils',
  'services.validator',
  'services.windowResize',

  // directives
  'directives.kngAutofocus',
  'directives.kngCollapse',
  'directives.kngDateSelect',
  'directives.kngDeleteDialog',
  'directives.kngDialog',
  'directives.kngDropdown',
  'directives.kngFilterTabs',
  'directives.kngFocus',
  'directives.kngForm',
  'directives.kngListTable',
  'directives.kngLoadDirective',
  'directives.kngLogin',
  'directives.kngNestedStates',
  'directives.kngNotifications',
  'directives.kngSearchFilter',
  'directives.kngSearchInput',
  'directives.kngSearchResultList',
  'directives.kngSideNavigation',
  'directives.kngStateHistory',
  'directives.kngSubmitButton',
  'directives.kngTabs',
  'directives.kngTooltip',
  'directives.kngValidator',

  // filters
  'filters.kngCapitalize',
  'filters.kngClassYearBlocks',
  'filters.kngFilterObjectByAttr',
  'filters.kngFirst',
  'filters.kngGroup',
  'filters.kngJoin',
  'filters.kngMapSchooltypes',
  'filters.kngMapTo',
  'filters.kngNumberBlocks',
  'filters.kngNumberSeparator',
  'filters.kngRoundToKilo',
  'filters.kngSearchProperty',

  // templates
  
]);


angular.module('kng').config(['$translateProvider', function($translateProvider) {
  $translateProvider.translations('en', {
    KNG_ALL: 'Alle',
    KNG_CANCEL: 'Cancel',
    KNG_EMAIL_ADDRESS: 'E-Mail Address',
    KNG_LOGIN: 'Login',
    KNG_LOGIN_ERROR_NOT_REGISTERED: 'E-Mail address is not registered',
    KNG_LOGIN_ERROR_PASSWORD_INCORRECT: 'Password is incorrect',
    KNG_NO_DATA: 'No Data',
    KNG_OK: 'Ok',
    KNG_PASSWORD: 'Password',
    KNG_SEARCH: 'Search'
  });
}]);

angular.module('kngConfig', []);


angular.module('kngConfig').constant('KNG_CONFIG', {
  version: '0.5.0',

  authentication: {
    loadLinkGroups: false
  },

  collapseCollapsedClass: 'collapse__content--is-collapsed',

  dialogClass: 'dialog',
  dialogBackdropClass: 'dialog-backdrop',
  dialogWrapperClass: 'dialog-wrapper',

  dropdownOpenClass: 'open',

  filterTabActiveClass: 'filter-tab--is-active',
  filterTabAllObject: {value: 'all', text: 'KNG_ALL'},

  searchInputPlaceholderClass: 'placeholder',
  searchInputPlaceholderHiddenClass: 'placeholder--is-hidden',

  searchFilter: [],

  sideNavigationStates: {
    OPEN: 'open',
    CLOSED: 'closed',
    OVERLAY: 'overlay',
    HIDDEN: 'hidden'
  },

  tabsActiveClass: 'active',

  tooltipClass: 'tooltip',
  tooltipBodyClass: 'tooltip__body',
  tooltipPositionPrefixClass: 'tooltip--',
  tooltipLabelClass: 'tooltip__label',
  tooltipPointerClass: 'tooltip__pointer',
  tooltipActiveClass: 'tooltip--is-active'
});

/**
 * the HTML5 autofocus property can be finicky when it comes to dynamically loaded
 * templates and such with AngularJS. Use this simple directive to
 * tame this beast once and for all.
 *
 * Usage:
 * <input type="text" autofocus>
 */
angular.module('directives.kngAutofocus', []);


angular.module('directives.kngAutofocus').directive('autofocus', ['$timeout', function($timeout) {
  return {
    restrict: 'A',
    link : function($scope, $element) {
      $timeout(function() {
        $element[0].focus();
      }, 0, false);
    }
  };
}]);

angular.module('directives.kngCollapse', []);


angular.module('directives.kngCollapse').controller('KngCollapseController', ['KNG_CONFIG', function(KNG_CONFIG) {
  this.collapse = function(element) {
    element.addClass(KNG_CONFIG.collapseCollapsedClass);
  };
  
  this.expand = function(element) {
    element.removeClass(KNG_CONFIG.collapseCollapsedClass);
  };
}]);


angular.module('directives.kngCollapse').directive('kngCollapse', function() {
  return {
    controller: 'KngCollapseController',
    restrict: 'A',
    link: function(scope, element, attr, ctrl) {
      scope.$watch(attr.kngCollapse, function(shouldCollapse) {
        if (shouldCollapse) {
          ctrl.collapse(element);
        } else {
          ctrl.expand(element);
        }
      });
    }
  };
});

angular.module('directives.kngDateSelect', []);

angular.module('directives.kngDateSelect').directive('kngDateSelect', [function () {
  return {
    restrict: 'E',
    scope: {
      timestamp: '=kngTimestamp'
    },
    templateUrl: 'directives/kngDateSelect/kngDateSelect.tpl.html',
    controller: 'KngDateSelectController'
  };
}]);


angular.module('directives.kngDateSelect').controller('KngDateSelectController', ['$scope', '$filter',
  function($scope, $filter) {

  // TODO: check for non-existing dates

  var min = 1900;
  var max = new Date().getFullYear();

  $scope.years = [];
  for (var i = max; i >= min; i--) {
    $scope.years.push(i);
  }
  $scope.months = [
    {value: 0, text: $filter('translate')('MONTH_0')},
    {value: 1, text: $filter('translate')('MONTH_1')},
    {value: 2, text: $filter('translate')('MONTH_2')},
    {value: 3, text: $filter('translate')('MONTH_3')},
    {value: 4, text: $filter('translate')('MONTH_4')},
    {value: 5, text: $filter('translate')('MONTH_5')},
    {value: 6, text: $filter('translate')('MONTH_6')},
    {value: 7, text: $filter('translate')('MONTH_7')},
    {value: 8, text: $filter('translate')('MONTH_8')},
    {value: 9, text: $filter('translate')('MONTH_9')},
    {value: 10, text: $filter('translate')('MONTH_10')},
    {value: 11, text: $filter('translate')('MONTH_11')}
  ];
  $scope.days = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];

  var translateDate2Timestamp = function translateDate2Timestamp(date) {
    var timestampTmp = new Date();
    timestampTmp.setDate(date.day);
    timestampTmp.setMonth(date.month ? date.month.value : null);
    timestampTmp.setFullYear(date.year);
    $scope.timestamp = timestampTmp.getTime();
  };

  var translateTimestamp2Date = function translateTimestamp2Date(timestamp) {
    if (timestamp === -1)  {
      $scope.date.day = null;
      $scope.date.month = null;
      $scope.date.year = null;
    } else {
      var timestampTmp = new Date(timestamp);
      $scope.date.day = timestampTmp.getDate();
      $scope.date.month = $scope.months[timestampTmp.getMonth()];
      $scope.date.year = timestampTmp.getFullYear();
    }
  };

  $scope.date = {};
  translateTimestamp2Date($scope.timestamp);

  $scope.$watchCollection('date', function (newVal) {
    translateDate2Timestamp(newVal);
  });
}]);
angular.module('directives.kngDeleteDialog', []);


angular.module('directives.kngDeleteDialog').controller('DeleteDialogController', ['$scope', '$modalInstance',
  '$translate', 'header', 'body',
  function($scope, $modalInstance, $translate, header, body) {
    $translate(header.text, header.values).then(function(text) {
      $scope.header = text;
    }, function(text) {
      $scope.header = text;
    });
    
    $translate(body.text, body.values).then(function(text) {
      $scope.body = text;
    }, function(text) {
      $scope.body = text;
    });
    
    $scope.ok = function() {
      $modalInstance.close();
    };
    
    $scope.cancel = function() {
      $modalInstance.dismiss();
    };
  }
]);

// Note: parts taken from https://github.com/likeastore/ngDialog/blob/master/js/ngDialog.js
angular.module('directives.kngDialog', []);


angular.module('directives.kngDialog').service('KngDialog', ['$rootScope', '$templateCache', '$controller', '$compile',
  'KNG_CONFIG',
  function($rootScope, $templateCache, $controller, $compile, KNG_CONFIG) {
    var activeDialogs = {},
      globalId = 0;
    
    
    var service = {
      open: function(options) {
        globalId += 1;
        var dialogId = 'kngDialog' + globalId;
        
        var scope;
        if (angular.isObject(options.scope)) {
          scope = options.scope.$new();
        } else {
          scope = $rootScope.$new();
        }
        
        if (options.data && angular.isObject(options.data)) {
          scope.kngDialogData = options.data;
        }
        
        scope.kngDialogClose = function() {
          service.close(dialogId);
        };
        
        var templateString = $templateCache.get(options.templateUrl);
        
        var dialog = angular.element(
          '<div kng-dialog-id="' + dialogId + '" class="' + KNG_CONFIG.dialogWrapperClass + '"></div>');
        dialog.html(['<div class="' + KNG_CONFIG.dialogBackdropClass + '"></div>',
          '<div class="' + KNG_CONFIG.dialogClass + '">' + templateString +'</div>'].join(''));
        
        // close dialog on backdrop clicks
        dialog.bind('click', function(event) {
          if (angular.element(event.target).hasClass(KNG_CONFIG.dialogBackdropClass)) {
            service.close(dialogId);
          }
        });
        
        // close dialog on '$locationChangeStart' events
        var locationChangeStartDeregistration = $rootScope.$on('$locationChangeStart', function () {
          service.close(dialogId);
        });
        
        // instantiating a controller
        $controller(options.controller, {$scope: scope, $element: dialog});
        
        // Compiles an HTML string or DOM into a template and produces a template function, which can then be used to
        // link scope and the template together
        $compile(dialog)(scope);
        
        // TODO: close active dialogs
        activeDialogs[dialogId] = {
          element: dialog,
          locationChangeStartDeregistration: locationChangeStartDeregistration,
          scope: scope,
        };
        
        dialog.appendTo('body');
      },
      
      close: function(dialogId) {
        if (angular.isDefined(activeDialogs[dialogId])) {
          activeDialogs[dialogId].scope.$destroy();
          activeDialogs[dialogId].locationChangeStartDeregistration();
          activeDialogs[dialogId].element.unbind('click');
          activeDialogs[dialogId].element.remove();
          delete activeDialogs[dialogId];
        }
      }
    };
  
    return service;
  }
]);


angular.module('directives.kngDialog').directive('kngDialogClose', ['KNG_CONFIG', 'KngDialog',
  function(KNG_CONFIG, KngDialog) {
    return {
      restrict: 'A',
      link: function(scope, element) {
        element.bind('click', function() {
          KngDialog.close(element.parents('.' + KNG_CONFIG.dialogWrapperClass).attr('kng-dialog-id'));
        });
      }
    };
  }
]);

angular.module('directives.kngDropdown', []);


angular.module('directives.kngDropdown').service('KngDropdownService', ['$document', function($document) {
  var openScope = null;
  
  var service = {
    open: function(scope) {
      if (!openScope) {
        $document.bind('click', closeDropdown);
      }
      
      if (openScope && openScope !== scope) {
        openScope.isOpen = false;
      }
      
      openScope = scope;
    },
    
    close: function(scope) {
      if (openScope === scope) {
        openScope = null;
        $document.unbind('click', closeDropdown);
      }
    }
  };
  
  function closeDropdown(event) {
    if (!openScope) {
      return;
    }
    
    var dropdown = openScope.getDropdown();
    if (event && dropdown && dropdown[0].contains(event.target)) {
      return;
    }
    
    openScope.$apply(function() {
      openScope.isOpen = false;
    });
  }
  
  
  return service;
}]);


angular.module('directives.kngDropdown').controller('KngDropdownController', ['$scope', 'KNG_CONFIG',
  'KngDropdownService',
  function($scope, KNG_CONFIG, KngDropdownService) {
    var dropdown,
      dropdownMenu,
      scope = $scope.$new();
    
    scope.isOpen = false;
    
    this.registerDropdown = function(element) {
      dropdown = element;
    };
    
    this.registerDropdownMenu = function(element) {
      dropdownMenu = element;
    };
    
    this.toggle = function() {
      scope.isOpen = !scope.isOpen;
    };
    
    scope.getDropdown = function() {
      return dropdown;
    };
    
    scope.$watch('isOpen', function(isOpen, wasOpen) {
      if (isOpen) {
        dropdownMenu.addClass(KNG_CONFIG.dropdownOpenClass);
        KngDropdownService.open(scope);
      } else if (wasOpen) {
        dropdownMenu.removeClass(KNG_CONFIG.dropdownOpenClass);
        KngDropdownService.close(scope);
      }
    });
  }
]);


angular.module('directives.kngDropdown').directive('kngDropdown', function() {
  return {
    restrict: 'E',
    controller: 'KngDropdownController',
    replace: true,
    templateUrl: 'directives/kngDropdown/kngDropdown.tpl.html',
    transclude: true,
    link: function(scope, element, attrs, ctrl) {
      ctrl.registerDropdown(element);
    }
  };
});


angular.module('directives.kngDropdown').directive('kngDropdownToggle', function() {
  return {
    restrict: 'A',
    require: '^kngDropdown',
    replace: true,
    link: function(scope, element, attrs, ctrl) {
      element.bind('click', function(event) {
        event.preventDefault();
        
        scope.$apply(function() {
          ctrl.toggle();
        });
      });
    }
  };
});


angular.module('directives.kngDropdown').directive('kngDropdownMenu', function() {
  return {
    restrict: 'E',
    require: '^kngDropdown',
    replace: true,
    templateUrl: 'directives/kngDropdown/kngDropdownMenu.tpl.html',
    transclude: true,
    link: function(scope, element, attrs, ctrl) {
      ctrl.registerDropdownMenu(element);
    }
  };
});

angular.module('directives.kngFilterTabs', []);


angular.module('directives.kngFilterTabs').controller('KngFilterTabsController', ['$scope', 'KNG_CONFIG',
  function($scope, KNG_CONFIG) {
    var _this = this;
    var tabs = [];
    
    $scope.activeFilter = KNG_CONFIG.filterTabAllObject.value;
    $scope.activeClass = KNG_CONFIG.filterTabActiveClass;
    
    
    _this.addTab = function(scope) {
      if (angular.isDefined(scope.value)) {
        tabs.push(scope);
      }
    };
    
    _this.addAllFilter = function() {
      if (angular.isArray($scope.filter)) {
        var addAll = true;
        for (var i = 0; i < $scope.filter.length; i++) {
          if ($scope.filter[i].value === KNG_CONFIG.filterTabAllObject.value) {
            addAll = false;
            break;
          }
        }
        if (addAll) {
          $scope.filter.unshift(KNG_CONFIG.filterTabAllObject);
        }
      }
    };
    
    
    $scope.filterByValue = function(value) {
      if ($scope.activeFilter !== value) {
        $scope.activeFilter = value;
        for (var i = 0; i < tabs.length; i++) {
          if (value === KNG_CONFIG.filterTabAllObject.value || tabs[i].value === value) {
            tabs[i].visible = true;
          } else {
            tabs[i].visible = false;
          }
        }
      }
    };

    $scope.openAddFilterDialog = function openAddFilterDialog () {
      $scope.open();
    };
    
    $scope.$watch('filter', function() {
      _this.addAllFilter();
    });
  }
]);


angular.module('directives.kngFilterTabs').directive('kngFilterTabs', [function() {
  return {
    controller: 'KngFilterTabsController',
    replace: true,
    restrict: 'E',
    scope: {
      filter: '=kngFilter',
      open: '&kngOpen'
    },
    templateUrl: 'directives/kngFilterTabs/kngFilterTabs.tpl.html',
    transclude: true
  };
}]);


angular.module('directives.kngFilterTabs').directive('kngFilterTab', function() {
  return {
    replace: true,
    require: '^kngFilterTabs',
    restrict: 'E',
    scope: {
      value: '=kngValue'
    },
    templateUrl: 'directives/kngFilterTabs/kngFilterTab.tpl.html',
    transclude: true,
    link: function(scope, element, attrs, ctrl) {
      scope.visible = true;
      ctrl.addTab(scope);
    }
  };
});
angular.module('directives.kngFocus', []);


angular.module('directives.kngFocus').directive('kngFocus', ['$timeout', '$parse', function($timeout, $parse) {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      var model = $parse(attrs.kngFocus);
      scope.$watch(model, function(value) {
        if (value === true) { 
          $timeout(function() {
            element[0].focus(); 
          }, 0, false);
        }
      });
      // on blur event:
      element.bind('blur', function() {
         scope.$apply(model.assign(scope, false));
      });
    }
  };
}]);

angular.module('directives.kngForm', []);


angular.module('directives.kngForm').directive('kngForm', function() {
  return {
    restrict: 'A',
    require: '?form',
    scope: {
      data: '=kngForm',
      dataBackup: '=kngFormBackup',
      disabled: '=kngDisabled',
      onClose: '&kngOnClose',
      isDirty: '=kngIsDirty',
      submit: '&kngSubmit'
    },
    templateUrl: 'directives/kngForm/kngForm.tpl.html',
    controller: 'KngFormController'
  };
});


angular.module('directives.kngForm').controller('KngFormController', ['$scope', function($scope) {

  $scope.isNotHidden = function(value) {
    return (typeof value.hidden === 'undefined' || !value.hidden);
  };

  $scope.hasLabel = function(value) {
    return (typeof value.input === 'undefined' || typeof value.input.label === 'undefined' || value.input.label);
  };

  $scope.hasControl = function(data) {
    return (typeof data.control !== 'undefined');
  };

  $scope.hasClose = function(data) {
    return (typeof data.control !== 'undefined' && typeof data.control.close !== 'undefined');
  };

  $scope.hasReset = function(data) {
    return (typeof data.control !== 'undefined' && typeof data.control.reset !== 'undefined');
  };

  $scope.hasSave = function(data) {
    return (typeof data.control !== 'undefined' && typeof data.control.save !== 'undefined');
  };

  $scope.isTextInput = function(value) {
    return ((typeof value.input === 'undefined' && typeof value.type === 'undefined') ||
      (typeof value.input !== 'undefined' && value.input.type === 'text'));
  };

  $scope.isNumberInput = function(value) {
    return (typeof value.input !== 'undefined' && value.input.type === 'number');
  };
  
  $scope.isSelect = function(value) {
    return (typeof value.input !== 'undefined' && value.input.type === 'select');
  };
  
  $scope.isRadio = function(value) {
    return (typeof value.input !== 'undefined' && value.input.type === 'radio');
  };

  $scope.isMultiSelect = function(value) {
    return (typeof value.input !== 'undefined' && value.input.type === 'multiselect' && !value.input.uiSelect);
  };
  
  $scope.isUiMultiSelect = function(value) {
    return (typeof value.input !== 'undefined' && value.input.type === 'multiselect' && value.input.uiSelect);
  };
  
  $scope.isCheckbox = function(value) {
    return (typeof value.input !== 'undefined' && value.input.type === 'checkbox');
  };
  
  $scope.isStatic = function(value) {
    return (typeof value.input !== 'undefined' && value.input.type === 'static');
  };
  
  $scope.isList = function(value) {
    return (typeof value.input !== 'undefined' && value.input.type === 'list');
  };

  $scope.isDateSelect = function(value) {
    return (typeof value.input !== 'undefined' && value.input.type === 'date-select');
  };

  $scope.isGroup = function(value) {
    return (typeof value.type !== 'undefined' && value.type === 'group');
  };

  $scope.removeItem = function(list, index) {
    list.splice(index, 1);
  };
  
  $scope.addItem = function(list, input) {
    if (input.item.indexOf(',') !== -1) {
      Array.prototype.push.apply(list, input.item.split(','));
    } else {
      list.push(input.item);
    }
    input.item = input.defaultItem;
  };
  
  $scope.onClick = function(data) {
    if (typeof $scope.data.control !== 'undefined' && typeof $scope.data.control.save !== 'undefined' &&
      typeof $scope.data.control.save.isSubmitting !== 'undefined') {
      $scope.data.control.save.isSubmitting = true;
    }
    $scope.submit({data: data});
  };

  $scope.reset = function reset() {
    if (angular.isDefined($scope.dataBackup)) {
      $scope.data = angular.copy($scope.dataBackup);
    }
  };

  $scope.close = function close() {
    $scope.reset();
    if (angular.isFunction($scope.onClose)) {
      $scope.onClose();
    }
  };
}]);

angular.module('directives.kngListTable', []);


angular.module('directives.kngListTable').directive('kngListTable', function() {
  return {
    controller: 'KngListTableController',
    restrict: 'E',
    scope: {
      list: '=',
      fields: '='
    },
    templateUrl: 'directives/kngListTable/kngListTable.tpl.html'
  };
});


angular.module('directives.kngListTable').controller('KngListTableController', ['$scope',
  function($scope) {
    $scope.isDefined = angular.isDefined;
  }
]);
angular.module('directives.kngLoadDirective', []);


angular.module('directives.kngLoadDirective').directive('kngLoadDirective', ['$compile', function($compile) {
  return {
    link: function(scope, element) {
      var directiveString = '<' + scope.directive + '></' + scope.directive + '>';

      $compile(directiveString)(scope, function(cloned) {
        scope.data = scope.directiveData;
        element.append(cloned);
      });
    },
    replace: true,
    restrict: 'E',
    scope: {
      directive: '@kngDirective',
      directiveData: '=?kngDirectiveData'
    }
  };
}]);

angular.module('directives.kngLogin', ['services.authentication']);


angular.module('directives.kngLogin').directive('kngLogin', function() {
  return {
    controller: 'KngLoginController',
    restrict: 'E',
    scope: {
      onLoginSuccess: '&kngOnLoginSuccess'
    },
    templateUrl: 'directives/kngLogin/kngLogin.tpl.html',
  };
});


angular.module('directives.kngLogin').controller('KngLoginController', ['$scope', 'Authentication',
  function($scope, Authentication) {
    $scope.credentials = {
      username: '',
      password: ''
    };
    
    $scope.isSubmitting = false;
    
    $scope.login = function(form, credentials) {
      form.email.$setValidity('OAUTH_USER_ERROR', true);
      form.password.$setValidity('OAUTH_PASSWORD_ERROR', true);
      
      if (form.$dirty && form.$valid) {
        $scope.isSubmitting = true;
        
        Authentication.login(credentials).then(function() {
          if (angular.isFunction($scope.onLoginSuccess)) {
            $scope.onLoginSuccess();
          }
        }, function(errors) {
          var error = errors[0];
          if (error.errorCode === 'OAUTH_USER_ERROR') {
            form.email.$setValidity('OAUTH_USER_ERROR', false);
          } else if (error.errorCode === 'OAUTH_PASSWORD_ERROR') {
            form.password.$setValidity('OAUTH_PASSWORD_ERROR', false);
          }
        }).finally(function() {
          $scope.isSubmitting = false;
        });
      }
    };
  }
]);

angular.module('directives.kngNestedStates', []);


angular.module('directives.kngNestedStates').directive('kngNestedStates', ['$compile', function($compile) {
  return {
    link: function(scope, element) {
      // saves the previous states
      var stateHistory = [];
      
      // defines a change state helper that is available in every state directive
      scope.changeState = function(state, saveState) {
        if (angular.isUndefined(saveState) || saveState) {
          stateHistory.push(scope.currentState);
        }
        
        scope.currentState = state;
      };
      
      // defines a previous state helper
      scope.previousState = function() {
        if (stateHistory.length > 0) {
          var state = stateHistory.pop();
          scope.changeState(state, false);
        }
      };
      
      // compile state directives
      var stateDirectives = [];
      for (var i in scope.states) {
        stateDirectives.push(
          '<div ng-switch-when="' + scope.states[i].value + '" ' + scope.states[i].directive +'></div>');
      }
      $compile(stateDirectives.join(''))(scope, function(cloned) {
        element.append(cloned);
      });
    },
    replace: true,
    restrict: 'E',
    scope: {
      currentState: '=kngCurrentState',
      data: '=kngData',
      states: '=kngStates'
    },
    templateUrl: 'directives/kngNestedStates/kngNestedStates.tpl.html'
  };
}]);
angular.module('directives.kngNotifications', ['services.notifications']);


angular.module('directives.kngNotifications').directive('kngNotifications', function() {
  return {
    restrict: 'E',
    templateUrl: 'directives/kngNotifications/kngNotifications.tpl.html',
    controller: 'KngNotificationsController'
  };
});


angular.module('directives.kngNotifications').controller('KngNotificationsController', ['$scope', 'Notifications',
 function($scope, Notifications) {
    $scope.notifications = Notifications;
  }
]);

angular.module('directives.kngSearchFilter', ['services.search']);


angular.module('directives.kngSearchFilter').directive('kngSearchFilter', function() {
  return {
    restrict: 'E',
    scope: {
      filterList: '=kngFilterList'
    },
    templateUrl: 'directives/kngSearchFilter/kngSearchFilter.tpl.html',
    controller: 'KngSearchFilterController'
  };
});


angular.module('directives.kngSearchFilter').controller('KngSearchFilterController', ['$scope', 'Search',
  function($scope, Search) {
    $scope.currentSearchFilter = Search.getCurrentSearchFilter();
    
    $scope.filterChange = function(facet, value) {
      Search.filter(facet, value).then(function() {
        // do something
      }, function(error) {
        console.error(error);
      });
    };
  }
]);

angular.module('directives.kngSearchInput', ['services.search']);


angular.module('directives.kngSearchInput').directive('kngSearchInput', ['KNG_CONFIG', function(KNG_CONFIG) {
  return {
    controller: 'KngSearchInputController',
    replace: true,
    restrict: 'E',
    scope: {
      onSearchEnd: '&kngOnSearchEnd'
    },
    templateUrl: 'directives/kngSearchInput/kngSearchInput.tpl.html',
    link: function(scope, element, attrs, ctrl) {
      ctrl.registerInput(element.find('input[type=search]'));
      ctrl.registerPlaceholder(element.find('.' + KNG_CONFIG.searchInputPlaceholderClass));
    }
  };
}]);


angular.module('directives.kngSearchInput').controller('KngSearchInputController', ['$scope', 'KNG_CONFIG', 'Search',
  function($scope, KNG_CONFIG, Search) {
    var _this = this;
    var input;
    var placeholder;
    
    this.registerInput = function(element) {
      input = element;
      
      input.bind('focus', function() {
        _this.hidePlaceholder();
      });
      
      input.bind('blur', function() {
        _this.showOrHidePlaceholder();
      });
    };
    
    this.registerPlaceholder = function(element) {
      placeholder = element;
    };
    
    this.hidePlaceholder = function() {
      if (angular.isDefined(placeholder)) {
        placeholder.addClass(KNG_CONFIG.searchInputPlaceholderHiddenClass);
      }
    };
    
    this.showPlaceholder = function() {
      if (angular.isDefined(placeholder)) {
        placeholder.removeClass(KNG_CONFIG.searchInputPlaceholderHiddenClass);
      }
    };
    
    this.showOrHidePlaceholder = function() {
      if (_this.inputHasValue()) {
        _this.hidePlaceholder();
      } else {
        _this.showPlaceholder();
      }
    };
    
    this.inputHasValue = function() {
      if (angular.isDefined(input)) {
        return (input.val() !== '');
      }
      return false;
    };
    
    
    $scope.queryString = Search.getCurrentQueryObject().query;
    
    $scope.$watch('queryString', function(queryString) {
      if (queryString !== '') {
        _this.hidePlaceholder();
      }
    });
    
    
    $scope.isSearching = false;
    
    $scope.search = function() {
      $scope.isSearching = true;
      Search.query($scope.queryString).then(function(result) {
        if (angular.isFunction($scope.onSearchEnd)) {
          $scope.onSearchEnd({result: result});
        }
      }, function(error) {
        console.error(error);
      }).finally(function() {
        $scope.isSearching = false;
      });
    };
  }
]);

angular.module('directives.kngSearchResultList', []);


angular.module('directives.kngSearchResultList').directive('kngSearchResultList', function() {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      results: '=kngResults'
    },
    templateUrl: 'directives/kngSearchResultList/kngSearchResultList.tpl.html'
  };
});

angular.module('directives.kngSideNavigation', ['services.authentication']);


angular.module('directives.kngSideNavigation').directive('kngSideNavigation', function() {
  return {
    controller: 'KngSideNavigationController',
    restrict: 'E',
    templateUrl: 'directives/kngSideNavigation/kngSideNavigation.tpl.html',
    scope: {
      data: '=kngData',
      items: '=kngItems',
      functions: '=kngFunctions',
      state: '=kngState'
    }
  };
});


angular.module('directives.kngSideNavigation').controller('KngSideNavigationController',
  ['$rootScope', '$scope', 'KNG_CONFIG',
  function($rootScope, $scope, KNG_CONFIG) {
    $scope.sideNavigationStates = KNG_CONFIG.sideNavigationStates;

    $scope.execute = function(name, args) {
      if (angular.isDefined($scope.functions[name])) {
        $scope.functions[name].apply($scope, args);
      }
    };
    
    $scope.toggleSideNavigation = function toggleSideNavigation() {
      if ($rootScope.sideNavigationState === KNG_CONFIG.sideNavigationStates.OVERLAY) {
        $rootScope.sideNavigationState = KNG_CONFIG.sideNavigationStates.CLOSED;
      } else if ($rootScope.sideNavigationState === KNG_CONFIG.sideNavigationStates.CLOSED) {
        $rootScope.sideNavigationState = KNG_CONFIG.sideNavigationStates.OVERLAY;
      }
    };
  
    $scope.closeSideNavigation = function closeSideNavigation() {
      $rootScope.sideNavigationState = KNG_CONFIG.sideNavigationStates.CLOSED;
    };
  }
]);

angular.module('directives.kngStateHistory', []);


angular.module('directives.kngStateHistory').directive('kngStateHistoryBack', ['StateHistory', function(StateHistory) {
  return {
    restrict: 'A',
    link: function(scope, element, attr) {
      var defaultState = attr.kngStateHistoryDefault;
      element.bind('click', function() {
        StateHistory.back(defaultState);
      });
    }
  };
}]);


angular.module('directives.kngStateHistory').factory('StateHistory', ['$rootScope', '$state',
  function($rootScope, $state) {
    var Stack = function(maxSize) {
      if (angular.isUndefined(maxSize)) {
        maxSize = 100;
      }

      this.items = [];
      this.maxSize = maxSize;
    };

    Stack.prototype.push = function(item) {
      this.items.push(item);
      if (this.items.length > this.maxSize) {
        this.items.splice(0, this.items.length - this.maxSize);
      }
    };

    Stack.prototype.pop = function() {
      return this.items.pop();
    };

    Stack.prototype.isEmpty = function() {
      return this.items.length === 0;
    };

    Stack.prototype.clear = function() {
      this.items = [];
    };


    var stateHistory = new Stack();
    var doNotSaveState = false;


    function init(config) {
      if (angular.isUndefined(config)) {
        config = {
          clearOnStates: {},
          ignoreStates: {}
        };
      }

      if (angular.isUndefined(config.clearOnStates)) {
        config.clearOnStates = {};
      }
      if (angular.isUndefined(config.ignoreStates)) {
        config.ignoreStates = {};
      }

      $rootScope.$on('$stateChangeSuccess',  function(event, toState, toParams, fromState, fromParams) {
        if (angular.isDefined(config.clearOnStates[toState.name]) && config.clearOnStates[toState.name]) {
          stateHistory.clear();
        }

        if (doNotSaveState) {
          doNotSaveState = false;
        } else if (fromState.name !== '' &&
                   (angular.isUndefined(config.ignoreStates[fromState.name]) || !config.ignoreStates[fromState.name])) {
          stateHistory.push({state: fromState, params: fromParams});
        }
      });
    }

    function back(defaultState) {
      var isEmpty = stateHistory.isEmpty();
      if (isEmpty && angular.isDefined(defaultState) && defaultState !== '') {
        doNotSaveState = true;
        $state.go(defaultState);
      } else if (!isEmpty) {
        var previousState = stateHistory.pop();
        doNotSaveState = true;
        $state.go(previousState.state, previousState.params);
      }
    }


    var service = {
      init: function(config) {
        init(config);
      },
      back: function(defaultState) {
        back(defaultState);
      }
    };
    return service;
  }
]);

angular.module('directives.kngSubmitButton', []);


angular.module('directives.kngSubmitButton').directive('kngSubmitButton', function() {
  return {
    restrict: 'E',
    scope: {
      buttonClass: '@kngButtonClass',
      disabled: '=kngDisabled',
      isSubmitting: '=kngIsSubmitting',
      submit: '&kngSubmit'
    },
    transclude: true,
    templateUrl: 'directives/kngSubmitButton/kngSubmitButton.tpl.html',
  };
});

angular.module('directives.kngTabs', []);


angular.module('directives.kngTabs').controller('KngTabsController', ['$scope', 'KNG_CONFIG',
  function($scope, KNG_CONFIG) {
    var tabs = [];
    
    $scope.activeTab = 0;
    $scope.activeClass = KNG_CONFIG.tabsActiveClass;
    
    this.addTab = function(scope) {
      tabs.push(scope);
      return (tabs.length - 1);
    };
    
    this.getScope = function() {
      return $scope;
    };
    
    
    $scope.getTabs = function() {
      return tabs;
    };
    
    $scope.setActiveTab = function(index) {
      if ($scope.activeTab !== index) {
        $scope.activeTab = index;
      }
    };
  }
]);


angular.module('directives.kngTabs').directive('kngTabs', function() {
  return {
    controller: 'KngTabsController',
    replace: true,
    restrict: 'E',
    scope: {},
    templateUrl: 'directives/kngTabs/kngTabs.tpl.html',
    transclude: true
  };
});


angular.module('directives.kngTabs').directive('kngTab', function() {
  return {
    replace: true,
    require: '^kngTabs',
    restrict: 'E',
    scope: {
      heading: '@kngHeading'
    },
    templateUrl: 'directives/kngTabs/kngTab.tpl.html',
    transclude: true,
    link: function(scope, element, attrs, ctrl) {
      scope.data = ctrl.getScope();
      scope.index = ctrl.addTab(scope);
    }
  };
});

// parts taken from https://github.com/lumapps/lumX/blob/master/js/tooltip/lumx.tooltip_directive.js
angular.module('directives.kngTooltip', []);


angular.module('directives.kngTooltip').controller('KngTooltipController',
  ['$scope', '$window', '$document', '$timeout', '$compile', 'KNG_CONFIG',
  function($scope, $window, $document, $timeout, $compile, KNG_CONFIG) {
    var self = this,
      tooltip,
      tooltipHeight,
      tooltipWidth,
      tooltipLabel,
      tooltipPointer,
      tooltipPosition,
      tooltipPositionCSS,
      tooltipPositionTmp,
      tooltipOffset,
      tooltipTrigger,
      tooltipPointerHeight,
      tooltipPointerWidth,
      tooltipPointerPositionCSS;
    var hideTooltipTimeout;
    var distanceToBrowserEdge = 1;
    var width, height, top, left;

    var getTooltipPointerSize = function getTooltipPointerSize() {
      var computedStyle = $window.getComputedStyle(tooltipPointer[0]);
      if (tooltipPosition === 'top') {
        tooltipPointerHeight = parseInt(computedStyle.borderLeftWidth.slice(0, -2));
        tooltipPointerWidth = parseInt(computedStyle.borderTopWidth.slice(0, -2));
      } else if (tooltipPosition === 'bottom') {
        tooltipPointerHeight = parseInt(computedStyle.borderLeftWidth.slice(0, -2));
        tooltipPointerWidth = parseInt(computedStyle.borderBottomWidth.slice(0, -2));
      } else if (tooltipPosition === 'left') {
        tooltipPointerHeight = parseInt(computedStyle.borderLeftWidth.slice(0, - 2));
        tooltipPointerWidth = parseInt(computedStyle.borderBottomWidth.slice(0, - 2));
      } else if (tooltipPosition === 'right') {
        tooltipPointerHeight = parseInt(computedStyle.borderRightWidth.slice(0, - 2));
        tooltipPointerWidth = parseInt(computedStyle.borderBottomWidth.slice(0, - 2));
      }
    };

    var getTooltipPositionCSS = function getTooltipPositionCSS() {
      var documentWidth = $document[0].body.clientWidth;
      var finalLeft = left - (tooltipWidth/ 2) + (width / 2);
      if (finalLeft < distanceToBrowserEdge) {
        finalLeft = distanceToBrowserEdge;
      } else if (finalLeft > documentWidth - tooltipWidth - distanceToBrowserEdge) {
        finalLeft = documentWidth - tooltipWidth - distanceToBrowserEdge;
      }

      var tooltipPositionLeft,
        tooltipPositionTop,
        tooltipPointerPositionLeft,
        tooltipPointerPositionTop;

      if (tooltipPositionTmp === 'top') {
          tooltipPositionLeft = finalLeft;
          tooltipPositionTop = top - tooltipHeight - tooltipOffset;
          tooltipPointerPositionLeft = left + (width / 2) - (tooltipPointerWidth / 2);
          tooltipPointerPositionTop = top - tooltipPointerHeight - tooltipOffset - 2;
      } else if (tooltipPositionTmp === 'bottom') {
          tooltipPositionLeft = finalLeft;
          tooltipPositionTop = top + height + tooltipOffset;
          tooltipPointerPositionLeft = left + (width / 2) - (tooltipPointerWidth / 2);
          tooltipPointerPositionTop = top + height + tooltipOffset + 2;
      } else if (tooltipPositionTmp === 'left') {
          tooltipPositionLeft = Math.max(left - tooltipWidth - tooltipOffset, distanceToBrowserEdge);
          tooltipPositionTop = top + (height / 2) - (tooltipHeight / 2);
          tooltipPointerPositionLeft = left - tooltipPointerWidth - tooltipOffset - 2;
          tooltipPointerPositionTop = top + (height / 2) - (tooltipPointerHeight / 2);
      } else if (tooltipPositionTmp === 'right') {
          tooltipPositionLeft =
            Math.min(left + width + tooltipOffset, documentWidth - tooltipWidth - distanceToBrowserEdge);
          tooltipPositionTop = top + (height / 2) - (tooltipHeight/ 2);
          tooltipPointerPositionLeft = left + width + tooltipOffset + 2;
          tooltipPointerPositionTop = top + (height / 2) - (tooltipPointerHeight / 2);
      }
      tooltipPositionCSS = {
        left: tooltipPositionLeft,
        top: tooltipPositionTop
      };
      tooltipPointerPositionCSS = {
        left: tooltipPointerPositionLeft,
        top: tooltipPointerPositionTop
      };
    };

    var switchPosition = function switchPosition() {
      tooltip.removeClass('tooltip--' + tooltipPosition);
      tooltip.addClass('tooltip--' + tooltipPositionTmp);
      tooltipPointer.removeClass('tooltip__pointer--' + tooltipPosition);
      tooltipPointer.addClass('tooltip__pointer--' + tooltipPositionTmp);
    };

    var resetTooltip = function resetTooltip() {
      if (tooltipPositionTmp !== tooltipPosition) {
        tooltip.removeClass('tooltip--' + tooltipPositionTmp);
        tooltip.addClass('tooltip--' + tooltipPosition);
        tooltipPointer.removeClass('tooltip__pointer--' + tooltipPositionTmp);
        tooltipPointer.addClass('tooltip__pointer--' + tooltipPosition);
        tooltipPositionTmp = angular.copy(tooltipPosition);
      }
    };

    this.init = function(element, attr) {
      tooltipTrigger = element;
      tooltipPosition = angular.isDefined(attr.kngTooltipPosition) ? attr.kngTooltipPosition : 'top';
      tooltipPositionTmp = angular.copy(tooltipPosition);
      tooltipOffset = angular.isDefined(attr.kngTooltipOffset) ? parseInt(attr.kngTooltipOffset) : 0;
      
      tooltip = angular.element('<div/>', {
        class: KNG_CONFIG.tooltipClass + ' ' + KNG_CONFIG.tooltipBodyClass + ' ' +
          KNG_CONFIG.tooltipPositionPrefixClass + tooltipPosition});
      tooltipLabel = angular.element('<span class="' + KNG_CONFIG.tooltipLabelClass + '" translate>' +
        attr.kngTooltip + '</span>');
      tooltipPointer = angular.element('<div class="' + KNG_CONFIG.tooltipClass + ' ' +
        KNG_CONFIG.tooltipPointerClass + '--'+ tooltipPosition +'"></div>');
      $compile(tooltipLabel)($scope);
      tooltip = tooltip.append(tooltipLabel);

      tooltipTrigger.bind('mouseenter', self.showTooltip);
    };

    this.showTooltip = function() {
      if (angular.isDefined(hideTooltipTimeout)) {
        $timeout.cancel(hideTooltipTimeout);
      }

      tooltip.appendTo('body');
      tooltipPointer.appendTo('body');

      width = tooltipTrigger.outerWidth();
      height = tooltipTrigger.outerHeight();
      top = tooltipTrigger.offset().top;
      left = tooltipTrigger.offset().left;
      tooltipHeight = tooltip.outerHeight();
      tooltipWidth = tooltip.outerWidth();

      getTooltipPointerSize();

      if (tooltipPosition === 'top' &&
        (top - $document.scrollTop() <
          tooltipHeight+ tooltipPointerHeight + tooltipOffset + distanceToBrowserEdge)) {
        tooltipPositionTmp = 'bottom';
        switchPosition();
      } else if (tooltipPosition === 'bottom' &&
        ($window.innerHeight + $document.scrollTop() - top - height <
          tooltipHeight + tooltipPointerHeight + tooltipOffset + distanceToBrowserEdge)) {
        tooltipPositionTmp = 'top';
        switchPosition();
      } else if (tooltipPosition === 'left' &&
        (left <
          tooltipWidth + tooltipPointerWidth + tooltipOffset + distanceToBrowserEdge)) {
        tooltipPositionTmp = 'right';
        switchPosition();
      } else if (tooltipPosition === 'right' &&
        ($window.innerWidth - left - width <
          tooltipWidth + tooltipPointerWidth + tooltipOffset + distanceToBrowserEdge)) {
        tooltipPositionTmp = 'left';
        switchPosition();
      }

      getTooltipPositionCSS();
      tooltip.css(tooltipPositionCSS);
      tooltipPointer.css(tooltipPointerPositionCSS);

      tooltip.addClass(KNG_CONFIG.tooltipActiveClass);
      tooltipPointer.addClass(KNG_CONFIG.tooltipActiveClass);
      $document.bind('scroll', self.hideTooltip);
      tooltipTrigger.bind('mouseleave', self.fadeOutTooltip);
    };

    this.hideTooltip = function() {
      $document.unbind('scroll', self.hideTooltip);
      tooltipTrigger.unbind('mouseleave', self.fadeOutTooltip);
      tooltip.removeClass(KNG_CONFIG.tooltipActiveClass);
      tooltipPointer.removeClass(KNG_CONFIG.tooltipActiveClass);
      tooltip.remove();
      tooltipPointer.remove();
      resetTooltip();
    };

    this.fadeOutTooltip = function() {
      $document.unbind('scroll', self.hideTooltip);
      tooltipTrigger.unbind('mouseleave', self.fadeOutTooltip);
      tooltip.removeClass(KNG_CONFIG.tooltipActiveClass);
      tooltipPointer.removeClass(KNG_CONFIG.tooltipActiveClass);
      hideTooltipTimeout = $timeout(function() {
        tooltip.remove();
        tooltipPointer.remove();
        resetTooltip();
      }, 400);
    };
    
    $scope.$on('$destroy', function() {
      tooltip.remove();
      tooltipPointer.remove();
      resetTooltip();
    });
}]);


angular.module('directives.kngTooltip').directive('kngTooltip', function() {
  return {
    restrict: 'A', 
    controller: 'KngTooltipController',
    link: function(scope, element, attr, ctrl) {
      attr.$observe('kngTooltip', function() {
        if (attr.kngTooltip) {
          ctrl.init(element, attr);
        }
      });
    }
  };
});

angular.module('directives.kngValidator', []);


angular.module('directives.kngValidator').directive('kngValidator', ['$timeout', 'Validator',
  function($timeout, Validator) {

  return {
    restrict: 'A',
    require: 'ngModel',
    link: function(scope, element, attr, ngModelCtrl) {
      $timeout(function() {
        if (angular.isDefined(attr.kngValidator) && attr.kngValidator !== '') {
          Validator.setController(ngModelCtrl, attr.kngValidator);
          if (angular.isDefined(attr.kngValidatorDependency) && attr.kngValidatorDependency !== '') {
            if (angular.isDefined(ngModelCtrl.$$parentForm[attr.kngValidatorDependency])) {
              Validator.setDependency(ngModelCtrl.$$parentForm[attr.kngValidatorDependency].$viewValue,
                attr.kngValidator);
            }
          }
        }
      }, 0);
    }
  };
}]);

angular.module('filters.kngCapitalize', []);


angular.module('filters.kngCapitalize').filter('capitalize', function() {
  return function(input) {
    if (angular.isUndefined(input) || !angular.isString(input)) {
      return input;
    }
    if (input.length > 0) {
      return input.charAt(0).toUpperCase() + input.substring(1);
    }
    return input;
  };
});

angular.module('filters.kngClassYearBlocks', []);


angular.module('filters.kngClassYearBlocks').filter('mapClassYearBlocks', [function() {
  var map = function(classYears, classYearBlocks) {
    var result = {};

    if (angular.isArray(classYears) && classYears.length !== 0 && angular.isArray(classYearBlocks)) {
      for (var i = 0; i < classYears.length; i++) {
        for (var j = 0; j < classYearBlocks.length; j++) {
          if (classYearBlocks[j].indexOf(classYears[i]) !== -1) {
            result[classYearBlocks[j]] = 1;
            break;
          }
        }
      }
    }

    return Object.keys(result);
  };

  return map;
}]);

angular.module('filters.kngFilterObjectByAttr', []);


angular.module('filters.kngFilterObjectByAttr').filter('filterObjectByAttr', ['Utils', function(Utils) {
  return function (input, attrName, expected) {
    if (expected === '') {
      return input;
    }

    var temp = [];
    var attr;
    for (var i = 0; i < input.length; i++) {
      attr = Utils.getObjectAttrByString(input[i], attrName);
      if ((angular.isArray(attr) || angular.isString(attr)) && attr.indexOf(expected) !== -1) {
        temp.push(input[i]);
      }
    }

    return temp;
  };
}]);
angular.module('filters.kngFirst', []);


angular.module('filters.kngFirst').filter('first', function() {
  return function(input) {
    if (angular.isUndefined(input) || !angular.isArray(input)) {
      return input;
    }
    if (input.length > 0) {
      return input[0];
    }
    return input;
  };
});

angular.module('filters.kngGroup', []);


angular.module('filters.kngGroup').filter('group', function(){
  var hasher = function hasher(value, size) {
    var valueHash = 0;
    var sizeHash = 0;
    
    if (angular.isArray(value)) {
      valueHash = value.length;
    }
    
    if (angular.isDefined(size)) {
      sizeHash = size;
    }
    
    return valueHash + '_' + sizeHash;
  };

  var memoize = function memoize(func, hasher) {
    var buildCache = function buildCache(key) {
      var cache = buildCache.cache;
      var address = '' + (hasher ? hasher.apply(this, arguments) : key);
      if (!(cache != null && cache.hasOwnProperty(address))) {
        cache[address] = func.apply(this, arguments);
      }
      return cache[address];
    };
    buildCache.cache = {};
    return buildCache;
  };

  var groupFilter = memoize(function(items, groupSize){
    var groups = [];
    var inner;
    if (items && groupSize) {
      for(var i = 0; i < items.length; i++) {
        if (i % groupSize === 0) {
          inner = [];
          groups.push(inner);
        }
        inner.push(items[i]);
      }
    }
    return groups;
  }, hasher);

  return groupFilter;
});
angular.module('filters.kngJoin', []);


// taken from https://github.com/a8m/angular-filter/blob/master/src/_filter/collection/join.js
angular.module('filters.kngJoin').filter('join', function() {
  return function (input, delimiter) {
    if (angular.isUndefined(input) || !angular.isArray(input)) {
      return input;
    }
    if (angular.isUndefined(delimiter)) {
      delimiter = ' ';
    }

    return input.join(delimiter);
  };
});

angular.module('filters.kngMapTo', []);


angular.module('filters.kngMapTo').filter('mapTo', [function() {
  function mapTo(id, mapping, attrName) {
    for (var i = 0; i < mapping.length; i ++) {
      if (mapping[i].id === id) {
        return mapping[i][attrName];
      }
    }
    return null;
  }

  var map = function(ids, mapping, attrName) {
    var mappedValues = [],
      mappedValue;
    if (angular.isArray(ids)) {
      for (var i = 0; i < ids.length; i++) {
        mappedValue = mapTo(ids[i], mapping, attrName);
        if (mappedValue !== null) {
          mappedValues.push(mappedValue);
        }
      }
      if (mappedValues.length !== 0) {
        return mappedValues;
      }
    } else if (angular.isString(ids)) {
      mappedValue = mapTo(ids, mapping, attrName);
      if (mappedValue !== null) {
        return mappedValue;
      }
    }
    return ids;
  };

  return map;
}]);
angular.module('filters.kngNumberBlocks', []);


angular.module('filters.kngNumberBlocks').filter('numberBlocks', function() {
  function addBlock(start, end) {
    var separator = '-';
    if (start === (end - 1)) {
      separator = '/';
    }
    return start === end ? start : (start + separator + end);
  }

  function mapToInt(input) {
    var temp = [];
    for (var i = 0; i < input.length; i++) {
      temp.push(parseInt(input[i]));
    }
    return temp;
  }


  return function (input) {
    if (angular.isUndefined(input) || !angular.isArray(input)) {
      return input;
    }

    input = mapToInt(input);

    var blocks = [];
    var first = input[0];
    for (var i = 0; i < input.length; i ++) {
      if (i < input.length - 1) {
        if (input[i+1] - input[i] > 1) {
          blocks.push(addBlock(first, input[i]));
          first = input[i+1];
        }
      } else {
        blocks.push(addBlock(first, input[i]));
      }
    }
    return blocks;
  };
});

angular.module('filters.kngNumberSeparator', []);


angular.module('filters.kngNumberSeparator').filter('numberSeparator', function() {
  return function(num, separator) {
    if (angular.isUndefined(separator)) {
      separator = '.';
    }

    if (angular.isDefined(num) && num !== null) {
      return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1' + separator);
    }
  };
});

angular.module('filters.kngRoundToKilo', []);


angular.module('filters.kngRoundToKilo').filter('roundToKilo', function() {
  return function (input) {

    if (angular.isUndefined(input)) {
      return input;
    }

    var formatted = input;
    if (formatted >= 1000) {
      formatted = Math.floor(formatted/100);
      formatted = formatted/10;
      formatted = formatted + 'K';
    }

    return formatted;
  };
});

angular.module('filters.kngMapSchooltypes', ['kngConfig']);


angular.module('filters.kngMapSchooltypes').filter('mapSchoolTypes', ['KNG_CONFIG', function(KNG_CONFIG) {
  var all = KNG_CONFIG.schoolTypeMapper.all;
  var mapping = KNG_CONFIG.schoolTypeMapper.mapping;
  var types = KNG_CONFIG.schoolTypeMapper.types;

  var hasher = function hasher(schoolTypes, classYears, mapToAll) {
    var schoolTypesHash = '';
    var classYearsHash = '';
    var mapToAllHash = 'true';

    if (angular.isArray(schoolTypes)) {
      schoolTypesHash = schoolTypes.toString();
    }

    if (angular.isArray(classYears)) {
      classYearsHash = classYears.toString();
    }

    if (angular.isDefined(mapToAll)) {
      mapToAllHash = mapToAll.toString();
    }

    return schoolTypesHash + '_' + classYearsHash + '_' + mapToAllHash;
  };

  var memoize = function memoize(func, hasher) {
    var buildCache = function buildCache(key) {
      var cache = buildCache.cache;
      var address = '' + (hasher ? hasher.apply(this, arguments) : key);
      if (!(cache != null && cache.hasOwnProperty(address))) {
        cache[address] = func.apply(this, arguments);
      }
      return cache[address];
    };
    buildCache.cache = {};
    return buildCache;
  };

  var testClassYears = function testClassYears(itemClassYears, classYears) {
    if (angular.isUndefined(itemClassYears) || itemClassYears.length === 0) {
      return true;
    } else {
      for (var i = 0; i < itemClassYears.length; i++) {
        if (classYears.indexOf(itemClassYears[i].toString()) !== -1) {
          return true;
        }
      }
      return false;
    }
  };

  var map = memoize(function(itemSchoolTypes, classYears, mapToAll) {
    if (angular.isUndefined(mapToAll)) {
      mapToAll = true;
    }

    var result = {};
    var schoolType;
    for (var j = 0; j < itemSchoolTypes.length; j++) {
      schoolType = itemSchoolTypes[j];
      if (angular.isDefined(mapping[schoolType])) {
        for (var k = 0; k < types.length; k++) {
          if (mapping[schoolType] & types[k].flag) {
            if (angular.isUndefined(types[k].classYears)) {
              result[types[k].text] = 1;
            } else if (testClassYears(classYears, types[k].classYears)) {
              result[types[k].text] = 1;
            }
          }
        }
      }
    }

    result = Object.keys(result);
    if (mapToAll && result.length === types.length) {
      result = all;
    }
    return result;
  }, hasher);

  return map;
}]);
angular.module('filters.kngSearchProperty', []);

angular.module('filters.kngSearchProperty').filter('searchProperties', function() {
  return function(items, props) {
    var output = [];
    if (angular.isArray(items)) {
      items.forEach(function(item) {
        for (var prop in props) {
          if (angular.isDefined(item[prop]) &&
            item[prop].toString().toLowerCase().indexOf(props[prop].toLowerCase()) !== -1) {
            output.push(item[prop]);
            break;
          }
        }
      });
    }
    return output;
  };
});
angular.module('services.apiClient', ['services.errors']);


angular.module('services.apiClient').factory('ApiClientChannel', ['$rootScope', function($rootScope) {
  var API_CLIENT_IS_ONLINE = 'apiClientIsOnline';
  var API_CLIENT_IS_OFFLINE = 'apiClientIsOffline';

  var apiClientChannel = {
    apiClientIsOnline: function() {
      $rootScope.$broadcast(API_CLIENT_IS_ONLINE, {});
    },
    apiClientIsOffline: function() {
      $rootScope.$broadcast(API_CLIENT_IS_OFFLINE, {});
    },
    onApiClientIsOnline: function(scope, handler) {
      scope.$on(API_CLIENT_IS_ONLINE, function(event, message) {
        handler(message);
      });
    },
    onApiClientIsOffline: function(scope, handler) {
      scope.$on(API_CLIENT_IS_OFFLINE, function(event, message) {
        handler(message);
      });
    }
  };
  return apiClientChannel;
}]);


angular.module('services.apiClient').factory('ApiClient', ['$q', 'ENV_CONFIG', 'ApiClientChannel', 'Errors',
  function($q, ENV_CONFIG, ApiClientChannel, Errors) {
    var createAsyncApiCall = function(q, func) {
      return function() {
        var deferred = q.defer();

        [].push.call(arguments, function(errors, results) {
          if (errors !== null && errors.length > 0) {
            Errors.trackApiError(errors);
            deferred.reject(errors);
          } else {
            deferred.resolve(results.data);
          }
        });

        func.apply(this, arguments);

        return deferred.promise;
      };
    };


    var mujsClient = mujs.createApiClient(ENV_CONFIG.apiClient);


    var supportedMethods = {
      DELETE: true,
      GET: true,
      POST: true,
      PUT: true,
      WIPE: true
    };
    var supportedResources = {};
    for (var res in mujs.resources) {
      if (res !== 'BaseResource') {
        supportedResources[res.charAt(0).toLowerCase() + res.slice(1)] = true;
      }
    }


    // create a promise interface for mujs client library
    var service = {};
    var storeAsyncApiCall = function(resource, method, specifier) {
      service[resource][method][specifier] = createAsyncApiCall($q, function() {
        mujsClient[resource][method][specifier].apply(null, arguments);
      });
    };

    for (var resource in mujsClient) {
      if (typeof supportedResources[resource] !== 'undefined' && supportedResources[resource]) {
        if (typeof service[resource] === 'undefined') {
          service[resource] = {};
        }
        for (var method in mujsClient[resource]) {
          if (typeof supportedMethods[method] !== 'undefined' && supportedMethods[method]) {
            if (typeof service[resource][method] === 'undefined') {
              service[resource][method] = {};
            }
            for (var specifier in mujsClient[resource][method]) {
              storeAsyncApiCall(resource, method, specifier);
            }
          }
        }
      }
    }


    // create a helper function for login
    var asyncLogin = createAsyncApiCall($q, function(credentials, callback) {
      mujsClient.users.login(credentials.username, credentials.password, true, callback);
    });
    service.login = function(credentials) {
      return asyncLogin(credentials).then(function(tokenData) {
        return service.users.GET.byOauthToken({oauthToken: tokenData[0].access_token}); // jshint ignore:line
      });
    };

    // create a helper function for logout
    service.logout = createAsyncApiCall($q, function(userId, callback) {
      mujsClient.users.logout(userId, callback);
    });

    // create a helper function to get the current user
    var asyncGetTokenData = function() {
      var deferred = $q.defer();
      mujsClient.getTokenData(function(errors, results) {
        if ((errors !== null && errors.length > 0) || results === null) {
          deferred.reject(errors);
        } else {
          deferred.resolve(results);
        }
      });
      return deferred.promise;
    };
    service.getCurrentUser = function() {
      return asyncGetTokenData().then(function(tokenData) {
        return service.users.GET.byOauthToken({oauthToken: tokenData.access_token}); // jshint ignore:line
      });
    };

    // create a helper function to get the current access token
    service.getAccessToken = function() {
      return asyncGetTokenData().then(function(tokenData) {
        return tokenData.access_token; // jshint ignore:line
      });
    };

    // create a helper function to remove the current token data, properly invalid
    service.removeTokenData = function () {
      var deferred = $q.defer();
      mujsClient.removeTokenData(function(errors, results) {
        if ((errors !== null && errors.length > 0) || results === null) {
          deferred.reject(errors);
        } else {
          deferred.resolve(results);
        }
      });
      return deferred.promise;
    };

    // create a reconnect helper function
    service.reconnect = function(hostname, port, events) {
      var rv = mujsClient.reconnect(hostname, port, events);
      return $q.when(rv);
    };


    // register online/offline event handler
    mujsClient.on('online', function() {
      ApiClientChannel.apiClientIsOnline();
    });

    mujsClient.on('offline', function() {
      ApiClientChannel.apiClientIsOffline();
    });


    return service;
  }
]);

angular.module('services.app', ['services.apiClient']);


angular.module('services.app').factory('App', ['$urlRouter', 'APP_CONFIG', 'ApiClient',
  function($urlRouter, APP_CONFIG, ApiClient) {
    var addOptions = function addOptions(textObject) {
      var optionsName = textObject.name + 'Options';
      APP_CONFIG[optionsName] = [];
      for (var i = 0; i < textObject.data.length; i++) {
        APP_CONFIG[optionsName].push({value: textObject.data[i].de, text: textObject.data[i].de});
      }
    };

    var addList = function addList(textObject) {
      var optionsName = textObject.name;
      APP_CONFIG[optionsName] = [];
      for (var i = 0; i < textObject.data.length; i++) {
        APP_CONFIG[optionsName].push(textObject.data[i].de);
      }
    };


    var loadingDone = false;

    var service = {
      addOptions: addOptions,
      addList: addList,

      isLoaded: function() {
        return loadingDone;
      },
      load: function(promise) {
        return promise.finally(function() {
          loadingDone = true;
          $urlRouter.sync();
        });
      },
      loadTexts: function(names, config) {
        return ApiClient.texts.GET.byNameList(
          {names: names}
        ).then(function(texts) {
          if (angular.isArray(texts)) {
            for (var i = 0; i < texts.length; i++) {
              var textName = texts[i].name;
              if (angular.isDefined(config[textName])) {
                for (var j = 0; j < config[textName].length; j++) {
                  config[textName][j].call(null, texts[i]);
                }
              }
            }
          }
          return texts;
        });
      }
      // TODO: implement a loadConfig function, e.g. for search filter
    };
    return service;
  }
]);

angular.module('services.authentication', ['services.apiClient', 'services.currentUser', 'services.users']);


angular.module('services.authentication').factory('Authentication',
  ['$q', 'ApiClient', 'CurrentUser', 'Users',
  function($q, ApiClient, CurrentUser, Users) {
    var service = {
      login: function(credentials) {
        return ApiClient.login(credentials).then(function(user) {
          return CurrentUser.setUser(Users.create(user[0]));
        });
      },

      logout: function() {
        return ApiClient.logout(CurrentUser.getUser().getId()).then(function() {
          CurrentUser.resetUser();
        });
      },

      requestCurrentUser: function() {
        if (service.isAuthenticated()) {
          return $q.when(CurrentUser.getUser());
        } else {
          return ApiClient.getCurrentUser().then(function(user) {
            if (!angular.isArray(user) || (angular.isArray(user) && user.length === 0)) {
              return ApiClient.removeTokenData().then(function() {
                return null;
              });
            }
            return CurrentUser.setUser(Users.create(user[0]));
          });
        }
      },

      isAuthenticated: function() {
        return !!CurrentUser.getUser();
      },
    };

    return service;
  }
]);

angular.module('services.authorization', ['services.authentication', 'services.currentUser']);


angular.module('services.authorization').factory('Authorization', ['Authentication', 'CurrentUser',
  function(Authentication, CurrentUser) {
    var service = {
      canAccess: function() {
        var currentUser = CurrentUser.getUser();
        if (currentUser !== null) {
          return true;
        }
        return false;
      },
      isAdmin: function() {
        var currentUser = CurrentUser.getUser();
        if (currentUser !== null) {
          if (currentUser.isAdmin()) {
            return true;
          }
        }
        return false;
      },
      isPremium: function() {
        var currentUser = CurrentUser.getUser();
        if (currentUser !== null) {
          if (currentUser.isPremium()) {
            return true;
          }
        }
        return false;
      }
    };

    return service;
  }
]);

angular.module('services.breakpoints', ['services.windowResize']);


angular.module('services.breakpoints').factory('BreakpointsChannel', ['$rootScope', function($rootScope) {
  var BREAKPOINTS_CHANGED = 'breakpointsChanged';

  var breakpointsChannel = {
    breakpointsChanged: function() {
      $rootScope.$broadcast(BREAKPOINTS_CHANGED, {});
    },
    onBreakpointsChanged: function(scope, handler) {
      scope.$on(BREAKPOINTS_CHANGED, function(event, message) {
        handler(message);
      });
    }
  };
  return breakpointsChannel;
}]);


angular.module('services.breakpoints').factory('Breakpoints', ['$rootScope', '$window', 'BreakpointsChannel',
  'WindowResize', 'WindowResizeChannel',
  function($rootScope, $window, BreakpointsChannel, WindowResize, WindowResizeChannel) {
    var breakpoints = [];
    var currentBreakpoint = {
      name: '',
      columns: null
    };


    var checkBreakpoints = function checkBreakpoints() {
      var windowWidth = $window.innerWidth;

      var breakpoint = null;
      for (var i = 0; i < breakpoints.length; i++) {
        if (breakpoints[i].width < windowWidth) {
          breakpoint = breakpoints[i];
        }
      }

      if (breakpoint !== null && currentBreakpoint.name !== breakpoint.name) {
        currentBreakpoint.name = breakpoint.name;
        currentBreakpoint.columns = breakpoint.columns;

        BreakpointsChannel.breakpointsChanged();
      }
    };


    WindowResizeChannel.onWindowResized($rootScope, function() {
      checkBreakpoints();
    });


    var service = {
      init: function(config) {
        breakpoints = config;
        checkBreakpoints();

        // initialize window resize service to listen for window resize events
        WindowResize.init();
      },
      getBreakpoint: function() {
        return currentBreakpoint;
      }
    };
    return service;
  }
]);

angular.module('services.currentUser', []);


angular.module('services.currentUser').factory('CurrentUser', ['KNG_CONFIG', 'UsersChannel',
  function(KNG_CONFIG, UsersChannel) {
    var service = {

      user: null,

      getUser: function() {
        return service.user;
      },

      resetUser: function() {
        UsersChannel.usersReset();
        service.user = null;
      },

      setUser: function(user) {
        if (angular.isDefined(user)) {
          service.user = user;
          if (angular.isDefined(KNG_CONFIG.authentication) &&
              angular.isDefined(KNG_CONFIG.authentication.loadLinkGroups) &&
              KNG_CONFIG.authentication.loadLinkGroups) {
            return service.user.loadLinkGroups().then(function() {
              UsersChannel.usersSet();
              return service.user;
            });
          } else {
            UsersChannel.usersSet();
            return service.user;
          }
        }
      }
    };

    return service;
  }
]);

angular.module('services.documents', ['services.apiClient', 'services.currentUser', 'services.documentsCache']);


angular.module('services.documents').factory('Documents',
  ['$q', 'APP_CONFIG', 'ApiClient', 'CurrentUser', 'DocumentsCache', 'DocumentsStats', 'UsersChannel',
  function($q, APP_CONFIG, ApiClient, CurrentUser, DocumentsCache, DocumentsStats, UsersChannel) {
    /**
     *  Creates a document with the given attributes.
     *
     *  @param {Object} attr The attributes of the document.
     *  @returns {Object} document object.
     */
    function createDoc(attr) {
      var id = attr.id;
      if (angular.isDefined(attr._id)) {
        id = attr._id;
      }

      var doc = DocumentsCache.get(id);
      if (angular.isDefined(doc)) {
        return doc;
      }
      return new Doc(attr);
    }

    /**
     *  Returns a document depending on the given ID, either from the server or the document cache. If there is no
     *    document with the given ID then 'null' is returned.
     *
     *  @param {String} id The document ID.
     *  @returns {Object} document object.
     */
    function getDocument(id) {
      var doc = DocumentsCache.get(id);
      if (angular.isDefined(doc)) {
        return $q.when(doc);
      } else {
        return ApiClient.documents.GET.byId({_id: id}).then(function(doc) {
          if (angular.isArray(doc) && doc.length === 1) {
            return new Doc(doc[0]);
          } else {
            return null;
          }
        });
      }
    }


    /**
     *  The document provides a layer to access certain attributes as well as to download and report a document.
     *    Every document is also stored in a document cache.
     *
     *  @constructor
     *
     *  @param {Object} attr The attributes for the document.
     *  @returns {Object} The document object for chaining.
     */
    var Doc = function(attr) {
      this.attr = angular.extend({}, this._defaultAttr());
      this._extendAttributes(attr);

      this.relatedDocuments = null;
      this.type = 'document';

      this.stats = {
        downVotes: 0,
        upVotes: 0,
        userVote: 0,
        views: 0
      };


      DocumentsCache.put(this.getId(), this);

      // loading document stats
      DocumentsStats.load(this.getId(), this);

      return this;
    };


    /**
     *  Unifies the attributes of documents and search documents.
     *
     *  @param {Object} attr The attributes to unify.
     */
    Doc.prototype._extendAttributes = function(attr) {
      // flatten qualifications
      if (angular.isDefined(attr.qualifications)) {
        attr.author = attr.qualifications.author;
        attr.classYears = attr.qualifications.classYears;
        attr.issue = attr.qualifications.issue;
        attr.learningFormat = attr.qualifications.structurTags.learningFormat;
        attr.publishingHouse = attr.qualifications.publishingHouse;
        attr.schoolType = attr.qualifications.schoolType;
        attr.subject = attr.qualifications.subject;
        attr.tags = attr.qualifications.tags;
        attr.parentTitle = attr.qualifications.title;
        attr.parentSubTitle = attr.qualifications.subtitle;
      }

      // map id attribute
      if (angular.isDefined(attr._id)) {
        attr.id = attr._id;
      }

      // convert attribute values
      var convertFunctions = {
        created: function(value) {
          if (angular.isString(value)) {
            return Date.parse(value);
          }
          return value;
        },
        files: function(value) {
          // NOTE: this is a workaround for the return value of 'ApiClient.documents.GET.partsById'
          if (angular.isDefined(value.registed) && angular.isDefined(value.unregisted)) {
            var currentUser = CurrentUser.getUser();
            if (currentUser !== null && currentUser.isBasis()) {
              return {imagePath: value.unregisted.imagePath, images: value.unregisted.images};
            } else if (currentUser !== null && currentUser.isPremium()) {
              return {imagePath: value.registed.imagePath, images: value.registed.images};
            }
          }
          return value;
        },
        issue: function(value) {
          if (angular.isArray(value)) {
            return value.join(' ');
          }
          return value;
        },
        publishingHouse: function(value) {
          if (angular.isDefined(value) && !angular.isArray(value)) {
            return [value];
          }
          return value;
        },
        tags: function(value) {
          if (angular.isArray(value)) {
            for (var i = 0; i < value.length; i++) {
              if (angular.isDefined(value[i].tag)) {
                value[i].name = value[i].tag;
                delete value[i].tag;
              }
              if (angular.isDefined(value[i].topicId)) {
                value[i].id = value[i].topicId;
                delete value[i].topicId;
              }
            }
          }
          return value;
        }
      };

      // extend attributes with parent title and sub title
      if (angular.isUndefined(this.attr.parentTitle)) {
        this.attr.parentTitle = null;
      }
      if (angular.isUndefined(this.attr.parentSubTitle)) {
        this.attr.parentSubTitle = null;
      }

      // extend and convert attributes
      for (var key in attr) {
        if (angular.isDefined(this.attr[key])) {
          this.attr[key] = attr[key];
        }
        if (angular.isDefined(convertFunctions[key])) {
          this.attr[key] = convertFunctions[key](this.attr[key]);
        }
      }
    };

    /**
     *  Returns an object with default attributes.
     *
     *  @returns {Object} default attributes.
     */
    Doc.prototype._defaultAttr = function() {
      return {
        id: '',
        author: [],
        classYears: [],
        created: null,
        files: {},
        issue: '',
        learningFormat: [],
        publishingHouse: [],
        schoolType: [],
        subject: [],
        tags: [
          /* {id: '', name: ''} */
        ],
        title: ''
      };
    };


    /**
     *  Returns the attributes object.
     *
     *  @returns {Object} attributes object.
     */
    Doc.prototype.getAttr = function() {
      return this.attr;
    };

    /**
     *  Returns the document ID.
     *
     *  @returns {String} document ID.
     */
    Doc.prototype.getId = function() {
      return this.attr.id;
    };

    /**
     *  Returns the authors of the document.
     *
     *  @returns {Array} authors of the document.
     */
    Doc.prototype.getAuthor = function() {
      return this.attr.author;
    };

    /**
     *  Returns the class years of the document.
     *
     *  @returns {Array} class years of the document.
     */
    Doc.prototype.getClassYears = function() {
      return this.attr.classYears;
    };

    /**
     *  Returns a creative commons object if the document is licenced under a creative commons licence. Null otherwise.
     *
     *  @returns {Boolean} creative commons licence if the document is licenced under a creative commons licence.
     *    Null otherwise.
     */
    Doc.prototype.getCreativeCommons = function() {
      // Note: this is a workaround until the document has a licence
      if (angular.isObject(APP_CONFIG.creativeCommons) && angular.isArray(APP_CONFIG.publisher) &&
          angular.isArray(this.attr.publishingHouse) && this.attr.publishingHouse.length === 1) {
        for (var i = 0; i < APP_CONFIG.publisher.length; i++) {
          if (APP_CONFIG.publisher[i].id === this.attr.publishingHouse[0] &&
              angular.isDefined(APP_CONFIG.publisher[i].creativeCommons) &&
              angular.isDefined(APP_CONFIG.creativeCommons[APP_CONFIG.publisher[i].creativeCommons])) {
            return APP_CONFIG.creativeCommons[APP_CONFIG.publisher[i].creativeCommons];
          }
        }
      }
      return null;
    };

    /**
     *  Returns the abstract of the document.
     *
     *  @returns {String} abstract of the document.
     */
    Doc.prototype.getIssue = function() {
      return this.attr.issue;
    };

    /**
     *  Returns the title of the parent document.
     *
     *  @returns {String} parent title of the document.
     */
    Doc.prototype.getParentTitle = function() {
      return this.attr.parentTitle;
    };

    /**
     *  Returns the sub title of the parent document.
     *
     *  @returns {String} parent sub title of the document.
     */
    Doc.prototype.getParentSubTitle = function() {
      return this.attr.parentSubTitle;
    };

    /**
     *  Returns the publishing house of the document.
     *
     *  @returns {Array} publishing house of the document.
     */
    Doc.prototype.getPublishingHouse = function() {
      return this.attr.publishingHouse;
    };

    /**
     *  Returns the school type of the document.
     *
     *  @returns {Array} school type of the document.
     */
    Doc.prototype.getSchoolType = function() {
      return this.attr.schoolType;
    };

    /**
     *  Returns the subject of the document.
     *
     *  @returns {Array} subject of the document.
     */
    Doc.prototype.getSubject = function() {
      return this.attr.subject;
    };

    /**
     *  Returns the tags of the document.
     *
     *  @returns {Array} tags of the document.
     */
    Doc.prototype.getTags = function() {
      return this.attr.tags;
    };

    /**
     *  Returns the title of the document.
     *
     *  @returns {String} title of the document.
     */
    Doc.prototype.getTitle = function() {
      return this.attr.title;
    };

    /**
     *  Returns the image path depending on the given image index and size. Otherwise an empty string.
     *
     *  @param {Number} index The image index.
     *  @param {String} size The image size.
     *  @returns {String} image path.
     */
    Doc.prototype.getImagePath = function(index, size) {
      if (angular.isDefined(this.attr.files.imagePath) && angular.isArray(this.attr.files.images) &&
          angular.isDefined(this.attr.files.images[index]) && angular.isDefined(this.attr.files.images[index][size])) {
        return APP_CONFIG.fileServerUrl + this.attr.files.imagePath + '/' + this.attr.files.images[index][size];
      }
      // TODO: return a default document URL
      return '';
    };

    /**
     *  Returns the image paths depending on the given size. Otherwise an empty array.
     *
     *  @param {String} size The image size.
     *  @returns {Array} image paths.
     */
    Doc.prototype.getImagePaths = function(size) {
      var paths = [];
      if (angular.isDefined(this.attr.files) && angular.isArray(this.attr.files.images)) {
        for (var p = 0; p < this.attr.files.images.length; p++) {
          paths.push(this.getImagePath(p, size));
        }
      }
      return paths;
    };

    /**
     *  Returns the images of the document. Otherwise an empty array.
     *
     *  @returns {Array} images of the document.
     */
    Doc.prototype.getImages = function() {
      if (angular.isDefined(this.attr.files) && angular.isArray(this.attr.files.images)) {
        return this.attr.files.images;
      }
      return [];
    };

    /**
     *  Returns the number of pages of the document.
     *
     *  @returns {Number} number of pages of the document.
     */
    Doc.prototype.getNumberOfPages = function() {
      if (angular.isDefined(this.attr.files) && angular.isArray(this.attr.files.images)) {
        return this.attr.files.images.length;
      }
      return 0;
    };

    /**
     *  Returns the type of the document.
     *
     *  @returns {String} type of the document.
     */
    Doc.prototype.getType = function() {
      return this.type;
    };

    /**
     *  Returns the URL for the thumbnail preview of the document.
     *
     *  @param {String} size The size of the thumbnail preview.
     *  @returns {String} URL for the thumbnail preview of the document.
     */
    Doc.prototype.getThumbnailPreviewUrl = function(size) {
      return this.getImagePath(0, size);
    };

    /**
     *  Returns a document stats object, with downVotes, upVotes, userVote and views.
     *
     *  @returns {Object} a document stats object.
     */
    Doc.prototype.getStats = function() {
      return this.stats;
    };

    /**
     *  Stores the given stats and converting them to int.
     *
     *  @param {Object} stats The stats object to store.
     */
    Doc.prototype.setStats = function(stats) {
      for (var attrName in stats) {
        if (angular.isDefined(this.stats[attrName])) {
          this.stats[attrName] = parseInt(stats[attrName]);
        }
      }
    };

    /**
     *  Upvote the document.
     *
     *  @returns {Object} upVote promise.
     */
    Doc.prototype.upVote = function() {
      var _this = this;
      return ApiClient.docstats.POST.upVote({_id: _this.getId()}).then(function(updatedStats) {
        if (angular.isArray(updatedStats) && updatedStats.length === 1) {
          updatedStats[0].userVote = 1;
          _this.setStats(updatedStats[0]);
        }
      });
    };

    /**
     *  Downvote the document.
     *
     *  @returns {Object} downVote promise.
     */
    Doc.prototype.downVote = function() {
      var _this = this;
      return ApiClient.docstats.POST.downVote({_id: _this.getId()}).then(function(updatedStats) {
        if (angular.isArray(updatedStats) && updatedStats.length === 1) {
          updatedStats[0].userVote = -1;
          _this.setStats(updatedStats[0]);
        }
      });
    };

    /**
     *  Add a view count for the document.
     *
     *  @returns {Object} addView promise.
     */
    Doc.prototype.addView = function() {
      var _this = this;
      return ApiClient.docstats.POST.addView({_id: _this.getId()}).then(function(updatedView) {
        if (angular.isArray(updatedView) && updatedView.length === 1) {
          _this.setStats({views: updatedView[0]});
        }
      });
    };

    /**
     *  Returns true if the document is free of charge. False otherwise.
     *
     *  @returns {Boolean} true if the document is free of charge. False otherwise.
     */
    Doc.prototype.isFreeContent = function() {
      // Note: this is a workaround until the document is marked as 'free content'
      if (angular.isArray(APP_CONFIG.publisher) && angular.isArray(this.attr.publishingHouse) &&
          this.attr.publishingHouse.length === 1) {
        for (var i = 0; i < APP_CONFIG.publisher.length; i++) {
          if (APP_CONFIG.publisher[i].id === this.attr.publishingHouse[0] &&
              angular.isDefined(APP_CONFIG.publisher[i].freeContent) && APP_CONFIG.publisher[i].freeContent) {
            return true;
          }
        }
      }
      return false;
    };


    /**
     *  Returns a download link promise. The link object contains a URL and a one-time URL.
     *
     *  @returns {Object} download link promise.
     */
    Doc.prototype.downloadLink = function() {
      var data = {_id: this.getId()};
      return ApiClient.getAccessToken().then(function(accessToken) {
        data.auth = {id: accessToken};
        return ApiClient.documents.GET.downloadlinkById(data).then(function(results) {
          var link = null;
          if (angular.isArray(results) && results.length === 1) {
            var result = results[0];
            var title = encodeURIComponent(result.title);

            link = {
              url: 'https://' + result.path + '/' + title + '.pdf',
              oneTimeUrl: 'https://' + result.alternativeOneTimeLink + '/' + title + '.pdf'
            };

            UsersChannel.usersDataChanged();
          }
          return link;
        });
      });
    };

    /**
     *  Reports the document with the given message.
     *
     *  @param {String} message The message for the reported document.
     *  @returns {Object} report document promise.
     */
    Doc.prototype.report = function(message) {
      // TODO: implement this for the new api call, docfeedback.POST.sendFeedback
      var data = {
        documentId: this.attr.id,
        msg: message
      };
      return ApiClient.reportDocuments.POST.one(data);
    };


    /**
     *  Returns a list of related documents.
     *
     *  @returns {Array} list of related documents.
     */
    Doc.prototype.getRelatedDocuments = function() {
      var _this = this;
      if (_this.relatedDocuments !== null) {
        return $q.when(_this.relatedDocuments);
      } else {
        return ApiClient.documents.GET.partsById({_id: _this.getId()}).then(function(relatedDocuments) {
          var temp = [],
            doc;
          if (angular.isArray(relatedDocuments)) {
            // NOTE: not the best solution, it creates circular links
            for (var i = 0; i < relatedDocuments.length; i++) {
              doc = createDoc(relatedDocuments[i]);
              doc.relatedDocuments = temp;
              temp.push(doc);
            }
          }
          _this.relatedDocuments = temp;
          return _this.relatedDocuments;
        });
      }
    };



    var service = {
      create: createDoc,
      getDocument: getDocument
    };
    return service;
  }
]);

angular.module('services.documentsCache', []);


angular.module('services.documentsCache').factory('DocumentsCache', ['$cacheFactory', function($cacheFactory) {
  var documentsCache = $cacheFactory('kng.documentsCache', {capacity: 1000});
  return documentsCache;
}]);

angular.module('services.documentsStats', []);


angular.module('services.documentsStats').factory('DocumentsStats', ['$timeout', 'ApiClient',
  function($timeout, ApiClient) {
    var DocStatsBatcher = function() {
      this.docs = {};
      this.timeout = null;
    };

    DocStatsBatcher.prototype.load = function(id, doc) {
      this.docs[id] = doc;
      this.startTimeout();
    };

    DocStatsBatcher.prototype.startTimeout = function() {
      var _this = this;
      if (_this.timeout === null) {
        _this.timeout = $timeout(function() {
          var docs = _this.docs;
          var ids = Object.keys(_this.docs);
          _this.docs = {};

          ApiClient.docstats.GET.statsByIds({ids: ids}).then(function(stats) {
            if (angular.isArray(stats) && stats.length === 1) {
              stats = stats[0];
              for (var id in stats) {
                if (angular.isDefined(docs[id])) {
                  docs[id].setStats(stats[id]);
                }
              }
            }
          });

          _this.timeout = null;
        }, 10);
      }
    };

    var documentsStats = new DocStatsBatcher();
    return documentsStats;
  }
]);

angular.module('services.downloadIframe', []);


angular.module('services.downloadIframe').factory('DownloadIframe', ['$document',
  function($document) {
    var iframe = null;
    
    var service = {
      start: function(url) {
        if (iframe === null) {
          iframe = angular.element('<iframe style="position:fixed;display:none;top:-1px;left:-1px;"/>');
          var body = $document.find('body').eq(0);
          body.append(iframe);
        }
        iframe.attr('src', url);
      }
    };
    return service;
  }
]);

angular.module('services.errors', []);


angular.module('services.errors').factory('Errors', ['$window', 'ENV_CONFIG',
  function($window, ENV_CONFIG) {
    function trackApiError(error) {
      var category = 'API Error';
      var label = ENV_CONFIG.debug ? 'development' : 'live';

      var errorString = '';
      if (angular.isArray(error)) {
        for (var i = 0; i < error.length; i++) {
          errorString += ' ' + i + '. ' + JSON.stringify(error[i]);
        }
      }

      if (angular.isDefined($window.ga) && errorString !== '') {
        $window.ga('send', 'event', category, errorString, label);
      }
    }

    var service = {
      trackApiError: trackApiError
    };
    return service;
  }
]);

angular.module('services.feedback', ['services.currentUser']);

angular.module('services.feedback').factory('Feedback',
  ['$document', '$interval', 'CurrentUser', function($document, $interval, CurrentUser) {
    var feedbackData = {
      given: false,
      intervalCounter: 0
    };

    var feedbackInterval,
      oneMinutesInMs = 1000 * 60 * 1;


    var resetFeebackInterval = function resetFeebackInterval() {
      if (angular.isDefined(feedbackInterval)) {
        $interval.cancel(feedbackInterval);
      }
      feedbackData.given = false;
      feedbackData.intervalCounter = 0;
    };

    var startFeedbackInterval = function startFeedbackInterval() {
      resetFeebackInterval();
      feedbackInterval = $interval(function() {
        feedbackData.intervalCounter++;
      }, oneMinutesInMs, 4);
    };


    var init = function init(options) {
      if (angular.isObject(options)) {
        UserVoice.push(['set', options]); // jshint ignore:line
      }

      var currentUser = CurrentUser.getUser();
      if (currentUser !== null) {
        /* jshint ignore:start */
        UserVoice.push(['identify', {
          id: currentUser.getId(),
          created_at: currentUser.getCreatedAt(),
          email: currentUser.getEmail(),
          name: currentUser.getFirstName() + ' ' + currentUser.getLastName(),
          type: currentUser.getType(),
        }]);
        /* jshint ignore:end */
      }

      startFeedbackInterval();
    };

    var getData = function getData() {
      return feedbackData;
    };

    var showPopup = function showPopup() {
      /* jshint ignore:start */
      UserVoice.push(['show', {
        mode: 'contact',
        target: 'self',
        position: 'bottom-right',
        menu_enabled: true
      }]);
      /* jshint ignore:end */
      $document.find('.uv-scale-bottom-right').addClass('kng-uv-is-transitioning');

      feedbackData.given = true;
    };


    var service = {
      getData: getData,
      init: init,
      showPopup: showPopup
    };
    return service;
  }
]);

angular.module('services.linkGroups', ['services.apiClient', 'services.links', 'services.search']);


angular.module('services.linkGroups').factory('LinkGroups', ['$q', 'APP_CONFIG', 'ApiClient', 'Links', 'Search',
  function($q, APP_CONFIG, ApiClient, Links, Search) {
    // link group pub types constants
    var PUB_TYPES = {
      DYNAMIC: 'dynamic',
      FEATURED: 'featured',
      NORMAL: 'normal'
    };


    /**
     *  The link group is collection of link objects that provides a layer to access certain attributes as well as to
     *    add/remove links, save, update and remove link groups.
     *
     *  @constructor
     *
     *  @param {Object} attr The attributes for the link group.
     *  @returns {Object} The link group object for chaining.
     */
    var LinkGroup = function(attr) {
      this.attr = angular.extend({}, this._defaultAttr(), attr);

      this.type = 'linkGroup';
      this.links = [];
      this.documentIds = [];

      this.linksLoaded = false;

      return this;
    };


    /**
     *  Returns an object with default attributes.
     *
     *  @returns {Object} default attributes.
     */
    LinkGroup.prototype._defaultAttr = function() {
      return {
        active: true,
        allowCopy: false,
        background: {
          color: '#000000',
          mode: 0,
          image: ''
        },
        children: {},
        deskType: '',
        droppable: true,
        image: '',
        path: '',
        pubType: '',
        sortIndex: -1,
        subject: '',
        tags: [],
        targetClientList: [],
        title: '',
        xsTypeRead: '',
        xsTypeWrite: ''
      };
    };


    /**
     *  Returns the attributes object.
     *
     *  @returns {Object} attributes object.
     */
    LinkGroup.prototype.getAttr = function() {
      return this.attr;
    };

    /**
     *  Returns the link group ID.
     *
     *  @returns {String} link group ID.
     */
    LinkGroup.prototype.getId = function() {
      return this.attr._id;
    };

    /**
     *  Returns the pub type of the link group.
     *
     *  @returns {String} pub type of the link group.
     */
    LinkGroup.prototype.getPubType = function() {
      return this.attr.pubType;
    };

    /**
     *  Returns the the title of link group.
     *
     *  @returns {String} title of the link group.
     */
    LinkGroup.prototype.getTitle = function() {
      return this.attr.title;
    };

    /**
     *  Returns the subject of the link group.
     *
     *  @returns {String} subject of the link group.
     */
    LinkGroup.prototype.getSubject = function() {
      var subject = '';
      if (angular.isDefined(APP_CONFIG.subjects)) {
        var subjects = this.getTagsIntersection(APP_CONFIG.subjects);
        if (angular.isArray(subjects) && subjects.length > 0) {
          subject = subjects[0];
        }
      }
      return subject;
    };

    /**
     *  Returns the school types of the link group.
     *
     *  @returns {Array} school types of the link group.
     */
    LinkGroup.prototype.getSchoolType = function() {
      var schoolTypes = [];
      if (angular.isDefined(APP_CONFIG.schoolTypes)) {
        schoolTypes = this.getTagsIntersection(APP_CONFIG.schoolTypes);
      }
      return schoolTypes;
    };

    /**
     *  Returns the intersection between the given tags and the tags of the link group.
     *
     *  @param {Array} tags The tags we want to check for intersection.
     *  @returns {Array} intersection of tags.
     */
    LinkGroup.prototype.getTagsIntersection = function(tags) {
      var temp = [];
      var tag;
      for (var i = 0; i < this.attr.tags.length; i++) {
        tag = this.attr.tags[i];
        if (tags.indexOf(tag) !== -1) {
          temp.push(tag);
        }
      }
      return temp;
    };

    /**
     *  Returns the read access type of the link group.
     *
     *  @returns {String} read access type of the link group.
     */
    LinkGroup.prototype.getXsTypeRead = function() {
      return this.attr.xsTypeRead;
    };

    /**
     *  Returns the write access type of the link group
     *
     *  @returns {String} write access type of the link group.
     */
    LinkGroup.prototype.getXsTypeWrite = function() {
      return this.attr.xsTypeWrite;
    };

    /**
     *  Returns an array of document IDs. The document IDs are IDs from targets of links.
     *
     *  @returns {Array} document IDs.
     */
    LinkGroup.prototype.getDocumentIds = function() {
      return this.documentIds;
    };

    /**
     *  Returns the children of the link group.
     *
     *  @returns {Object} children of the link group.
     */
    LinkGroup.prototype.getChildren = function() {
      return this.attr.children;
    };

    /**
     *  Set a child with the given link ID.
     *
     *  @param {String} linkId The link ID of the child.
     */
    LinkGroup.prototype.setChild = function(linkId) {
      this.attr.children[linkId] = linkId;
    };

    /**
     *  Remove a child with the given link ID.
     *
     *  @param {String} linkId The link ID of the child.
     */
    LinkGroup.prototype.removeChild = function(linkId) {
      delete this.attr.children[linkId];
    };


    /**
     *  Load links of the link group from the server.
     *
     *  @returns {Object} a load links promise.
     */
    LinkGroup.prototype.loadLinks = function() {
      var _this = this;
      var linkIds = Object.keys(this.attr.children);
      if (linkIds.length === 0) {
        return $q.when(this.links);
      } else {
        return ApiClient.links.GET.byIdList({idList: linkIds}).then(function(links) {
          _this.links = [];
          _this.documentIds = [];
          if (angular.isArray(links)) {
            var link;
            for (var i = 0; i < links.length; i++) {
              link = Links.create(links[i]);
              _this.links.push(link);
              if (link.isLinkToDocument()) {
                _this.documentIds.push(link.getTarget().getId());
              }
            }
          }
          _this.linksLoaded = true;
        });
      }
    };


    /**
     *  Add a link with the given document ID to the link group.
     *
     *  @param {String} documentId The document ID.
     *  @returns {Object} save link promise.
     */
    LinkGroup.prototype.addLinkToDocument = function(documentId) {
      var _this = this;
      var attr = {
        xsTypeRead: this.getXsTypeRead(),
        xsTypeWrite: this.getXsTypeWrite()
      };
      return Links.saveLinkToDocument(attr, documentId).then(function(link) {
        _this.links.push(link);
        _this.documentIds.push(documentId);
        _this.setChild(link.getId());
      });
    };

    /**
     *  Add links with the given document IDs to the link group.
     *
     *  @param {Array} documentIds The document IDs.
     *  @returns {Object} save links promise.
     */
    LinkGroup.prototype.addLinksToDocuments = function(documentIds) {
      if (angular.isArray(documentIds)) {
        var addLinkToDocumentPromises = [];
        for (var i = 0; i < documentIds.length; i++) {
          addLinkToDocumentPromises.push(this.addLinkToDocument(documentIds[i]));
        }
        return $q.all(addLinkToDocumentPromises);
      } else {
        return $q.when(this);
      }
    };

    /**
     *  Remove a link to a document with the given document ID.
     *
     *  @param {String} documentId The document ID.
     *  @returns {Object} remove link promise.
     */
    LinkGroup.prototype.removeLinkToDocument = function(documentId) {
      var _this = this;
      var link = null;
      var linkIndex = -1;
      for (var i = 0; i < _this.links.length; i++) {
        if (documentId === _this.links[i].getTarget().getId()) {
          link = _this.links[i];
          linkIndex = i;
          break;
        }
      }

      if (link !== null) {
        return link.remove().then(function() {
          if (linkIndex !== -1) {
            _this.links.splice(linkIndex, 1);
          }

          var documentIdIndex = _this.documentIds.indexOf(documentId);
          if (documentIdIndex !== -1) {
            _this.documentIds.splice(documentIdIndex, 1);
          }

          _this.removeChild(link.getId());
        });
      }
    };

    /**
     *  Remove links to a document with the given document IDs.
     *
     *  @param {Array} documentIds The document IDs.
     *  @returns {Object} remove links promise.
     */
    LinkGroup.prototype.removeLinksToDocuments = function(documentIds) {
      if (angular.isArray(documentIds)) {
        var removeLinkToDocumentPromises = [];
        for (var i = 0; i < documentIds.length; i++) {
          removeLinkToDocumentPromises.push(this.removeLinkToDocument(documentIds[i]));
        }
        return $q.all(removeLinkToDocumentPromises);
      } else {
        return $q.when(this);
      }
    };

    /**
     *  Save a link group by creating a link group on the server.
     *
     *  @returns {Object} save link group promise.
     */
    LinkGroup.prototype.save = function() {
      var _this = this;
      return ApiClient.desktops.POST.one(_this.getAttr()).then(function(linkGroup) {
        angular.extend(_this.getAttr(), linkGroup[0]);
        return _this;
      });
    };

    /**
     *  Update a link group with the given attributes.
     *
     *  @param {Object} attr Link group attributes.
     *  @returns {Object} update link group promise.
     */
    LinkGroup.prototype.update = function(attr) {
      var _this = this;
      attr.children = _this.getChildren();
      return ApiClient.desktops.PUT.list(attr).then(function(linkGroup) {
        angular.extend(_this.getAttr(), linkGroup[0]);
        return linkGroup[0];
      });
    };

    /**
     *  Remove a link group by removing a link group on the server. Also removing links.
     *
     *  @returns {Object} remove link group promise.
     */
    LinkGroup.prototype.remove = function() {
      var _this = this;
      var linkIds = [];
      for (var i = 0; i < _this.links.length; i++) {
        linkIds.push(_this.links[i].getId());
      }

      if (linkIds.length === 0) {
        return ApiClient.desktops.DELETE.byId({_id: _this.getId()});
      } else {
        return Links.removeByIdList(linkIds).then(function() {
          return ApiClient.desktops.DELETE.byId({_id: _this.getId()});
        });
      }
    };



    /**
     *  The playlist extends the link group and provides a layer to access and load playlist items.
     *
     *  @constructor
     *
     *  @param {Object} attr The attributes for the playlist.
     */
    var Playlist = function(attr) {
      LinkGroup.call(this, attr);

      this.type = 'playlist';
      this.items = [];

      return this;
    };
    Playlist.prototype = Object.create(LinkGroup.prototype);


    /**
     *  Returns the number of playlist items.
     *
     *  @returns {Number} number of playlist items.
     */
    Playlist.prototype.getNumberOfItems = function() {
      return this.items.length;
    };


    /**
     *  Load playlist items.
     *
     *  @returns {Object} load items promise.
     */
    Playlist.prototype.load = function() {
      var _this = this;
      var items = [];
      if (_this.getPubType() === PUB_TYPES.DYNAMIC) {
        return Search.perform(_this.attr.queryObject, {
          concatSearchResult: false, extendDefaultQueryObject: true, storeSearchResult: false}).then(function(results) {
          _this.items = results;
        });
      } else {
        return _this.loadLinks().then(function() {
          for (var i = 0; i < _this.links.length; i++) {
            items.push(_this.links[i].getTarget());
          }
          _this.items = items;
        });
      }
    };


    var linkGroups = {
      /**
       *  Creates a link group with the given attributes.
       *
       *  @param {Object} attr The attributes of the link group.
       *  @returns {Object} link group object.
       */
      create: function(attr) {
        return new LinkGroup(attr);
      },

      /**
       *  Creates a playlist with the given attributes.
       *
       *  @param {Object} attr The attributes of the playlist.
       *  @returns {Object} playlist object.
       */
      createPlaylist: function(attr) {
        return new Playlist(attr);
      },

      /**
       *  Returns link groups depending on the given user ID.
       *
       *  @param {String} id The user ID.
       *  @returns {Array} link groups of the user.
       */
      getLinkGroupsByUserId: function(userId) {
        return ApiClient.desktops.GET.byUserId({userId: userId}).then(function(linkGroups) {
          var temp = [];
          if (angular.isArray(linkGroups)) {
            for (var i = 0; i < linkGroups.length; i++) {
              temp.push(new LinkGroup(linkGroups[i]));
            }
          }
          return temp;
        });
      },
    };
    return linkGroups;
  }
]);

angular.module('services.links', ['services.apiClient', 'services.documents']);


angular.module('services.links').factory('Links', ['$q', 'ApiClient', 'Documents',
function($q, ApiClient, Documents) {
    // link type constants
    var LINK_TYPES = {
      DOCUMENT: 'link2document',
      EDITOR: 'link2editorDocument',
      GROUP: 'group',
      NOTE: 'note',
      SNIPPET: 'link2documentSnippet',
      UPLOAD: 'link2upload'
    };


    /**
     *  The 'link' provides a layer to access certain attributes, as well as to save and remove them.
     *
     *  @constructor
     *
     *  @param {Object} attr The attributes for the link.
     *  @returns {Object} The link object for chaining.
     */
    var Link = function(attr) {
      this.attr = angular.extend({}, this._defaultAttr(), attr);

      // create a target object depending on the targetType
      this.target = null;
      this._initTarget();

      return this;
    };


    /**
     *  Returns an object with default attributes.
     *
     *  @returns {Object} default attributes.
     */
    Link.prototype._defaultAttr = function() {
      return {
        active: true,
        background: {
          color: 'transparent',
          image: '',
          mode: 0
        },
        position: {
          x: 0,
          y: 0,
          z: 100
        },
        size: {
          x: 210,
          y: 297,
          z: 1
        },
        tags: [],
        target: {},
        targetType: '',
        xsTypeRead: '',
        xsTypeWrite: ''
      };
    };

    /**
     *  Initializes a target object depending on the link type.
     */
    Link.prototype._initTarget = function() {
      var targetType = this.getTargetType();
      if (targetType === LINK_TYPES.DOCUMENT) {
        this.target = Documents.create(this.attr.target);
      }
      // TODO: check for different target types
    };

    /**
     *  Returns true if the link is not saved on the server. False otherwise.
     *
     *  @returns {Boolean} True if the link is not saved on the server. False otherwise.
     */
    Link.prototype._isNotSavedOnServer = function() {
      return angular.isUndefined(this.getId());
    };


    /**
     *  Returns the attributes object.
     *
     *  @returns {Object} attributes object.
     */
    Link.prototype.getAttr = function() {
      return this.attr;
    };

    /**
     *  Returns the link ID.
     *
     *  @returns {String} link ID.
     */
    Link.prototype.getId = function() {
      return this.attr._id;
    };

    /**
     *  Returns the target of the link.
     *
     *  @returns {Object} target of the link.
     */
    Link.prototype.getTarget = function() {
      return this.target;
    };

    /**
     *  Returns the target type of the link.
     *
     *  @returns {String} target type of the link.
     */
    Link.prototype.getTargetType = function() {
      return this.attr.targetType;
    };

    /**
     *  Returns true if the link is a link to a document. False otherwise.
     *
     *  @returns {Boolean} True if the link is a link to a document. False otherwise.
     */
    Link.prototype.isLinkToDocument = function() {
      return this.getTargetType() === LINK_TYPES.DOCUMENT;
    };

    /**
     *  Returns true if the link is active. False otherwise.
     *
     *  @returns {Boolean} True if the link is active. False otherwise.
     */
    Link.prototype.isActive = function() {
      return this.attr.active;
    };


    /**
     *  Save a link on the server.
     *
     *  @returns {Object} save link promise.
     */
    Link.prototype.save = function() {
      var _this = this;
      if (_this._isNotSavedOnServer()) {
        return ApiClient.links.POST.one(this.getAttr()).then(function(link) {
          angular.extend(_this.getAttr(), link[0]);
          return _this;
        });
      } else {
        return $q.when(_this);
      }
    };

    /**
     *  Remove a link from the server.
     *
     *  @returns {Object} remove link promise.
     */
    Link.prototype.remove = function() {
      return ApiClient.links.DELETE.byId({_id: this.getId()});
    };


    var links = {
      /**
       *  Creates a link with the given attributes.
       *
       *  @param {Object} attr The attributes of the link.
       *  @returns {Object} link group.
       */
      create: function(attr) {
        return new Link(attr);
      },

      /**
       *  Save a link with the given attributes to a document with the given document ID.
       *
       *  @param {Object} attr The attributes of the link.
       *  @param {Object} documentId The document ID.
       *  @returns {Object} save link promise.
       */
      saveLinkToDocument: function(attr, documentId) {
        var link;
        if (angular.isUndefined(documentId) && documentId !== '') {
          link = new Link(attr);
          return link.save();
        } else {
          return Documents.getDocument(documentId).then(function(doc) {
            angular.extend(attr, {
              targetType: LINK_TYPES.DOCUMENT,
              target: doc.getAttr(),
              title: doc.getTitle()
            });
            link = new Link(attr);
            return link.save();
          });
        }
      },

      /**
       *  Remove links depending on the given id list.
       *
       *  @param {Object} idList A list of link IDs.
       *  @returns {Object} remove links promise.
       */
      removeByIdList: function(idList) {
        if (idList.length === 0) {
          return $q.when([]);
        } else {
          return ApiClient.links.DELETE.byIdList({idList: idList});
        }
      }
    };
    return links;
  }
]);

angular.module('services.notifications', ['services.utils']);


angular.module('services.notifications').factory('Notifications', ['$timeout', '$translate', 'Utils',
  function($timeout, $translate, Utils) {
    var notifications = [];

    var addNotification = function(notification) {
      $translate(notification.message).then(function(message) {
        return message;
      }, function(message) {
        return message;
      }).then(function(message) {
        notification.message = message;
        notification.id = Utils.randomString(16, true, true, true, true);

        notification.timeout = $timeout(function() {
          service.remove(notification.id);
        }, 10000);

        notifications.push(notification);
        return notification;
      });
    };

    var service = {
      addInfo: function(msg) {
        addNotification({type: 'NOTIFICATION_INFO', message: msg});
      },

      addError: function(msg) {
        addNotification({type: 'NOTIFICATION_ERROR', message: msg});
      },

      remove: function(id) {
        for (var i = 0; i < notifications.length; i++) {
          if (notifications[i].id === id) {
            $timeout.cancel(notifications[i].timeout);
            notifications.splice(i, 1);
            break;
          }
        }
      },

      getCurrent: function() {
        return notifications;
      }
    };

    return service;
  }
]);

angular.module('services.playlists', ['services.apiClient', 'services.linkGroups']);


angular.module('services.playlists').factory('Playlists', ['$q', '$timeout', 'ApiClient', 'CurrentUser', 'LinkGroups',
  function($q, $timeout, ApiClient, CurrentUser, LinkGroups) {
    // TODO: add documentation
    var Playlists = function() {
      this.playlists = {};

      this.displayedPlaylists = {};

      this.syncShowKeys = [];
      this.syncItemsPerTimeout = 10;

      this.isLoaded = false;
      this.isLoading = false;
    };

    Playlists.prototype.getPlaylistConstraints = function() {
      var playlistConstraints = {
        client: 'web',
        schoolTypes: [],
        subjects: []
      };

      var currentUser = CurrentUser.getUser();
      if (currentUser !== null) {
        var schoolType = currentUser.getSchoolType();
        if (schoolType !== '') {
          playlistConstraints.schoolTypes = [schoolType];
        }
        playlistConstraints.subjects = currentUser.getSubjects();
      }
      return playlistConstraints;
    };

    // TODO: add documentation
    Playlists.prototype.addPlaylist = function(playlist) {
      this.playlists[playlist.getId()] = playlist;
    };

    // TODO: add documentation
    Playlists.prototype.exists = function(id) {
      return angular.isDefined(this.playlists[id]);
    };

    Playlists.prototype.startSyncShow = function() {
      this.displayedPlaylists = {};
      this.syncShowKeys = Object.keys(this.playlists);
      this.syncShow();
    };

    Playlists.prototype.syncShow = function() {
      var _this = this;
      $timeout(function() {
        var key;
        for (var i = 0; i < _this.syncItemsPerTimeout; i++) {
          if (_this.syncShowKeys.length === 0) {
            break;
          } else {
            key = _this.syncShowKeys.pop();
            if (angular.isDefined(_this.playlists[key])) {
              _this.displayedPlaylists[key] = _this.playlists[key];
              if (!_this.playlists[key].linksLoaded) {
                _this.playlists[key].load();
              }
            }
          }
        }

        if (_this.syncShowKeys.length !== 0) {
          _this.syncShow();
        }
      }, 0);

    };


    Playlists.prototype.handlePlaylists = function() {
      var _this = this;
      return function(lists) {
        if (angular.isArray(lists)) {
          var playlist;
          for (var i = 0; i < lists.length; i++) {
            playlist = LinkGroups.createPlaylist(lists[i]);
            _this.addPlaylist(playlist);
          }
          _this.startSyncShow();
          _this.isLoaded = true;
          _this.isLoading = false;
        }
        return _this.displayedPlaylists;
      };
    };

    Playlists.prototype.getPlaylists = function(userSpecific) {
      if (this.isLoaded || this.isLoading) {
        this.startSyncShow();
        return $q.when(this.displayedPlaylists);
      } else {
        this.isLoading = true;
        if (userSpecific) {
          var playlistConstraints = this.getPlaylistConstraints();
          return ApiClient.personalizer.GET.playlists(playlistConstraints).then(this.handlePlaylists());
        } else {
          return ApiClient.desktops.GET.publicPlaylistsByClient({client: 'web'}).then(this.handlePlaylists());
        }
      }
    };

    // TODO: add documentation
    Playlists.prototype.loadPlaylist = function(id) {
      var _this = this;
      return ApiClient.desktops.GET.byId({_id: id}).then(function(list) {
        if (angular.isArray(list) && list.length === 1) {
          var playlist = LinkGroups.createPlaylist(list[0]);
          _this.addPlaylist(playlist);
          return playlist.load().then(function() {
            return playlist;
          });
        } else {
          return null;
        }
      });
    };

    // TODO: add documentation.
    Playlists.prototype.getPlaylist = function(id) {
      if (this.isLoaded && this.exists(id)) {
        return $q.when(this.playlists[id]);
      } else {
        return this.loadPlaylist(id);
      }
    };

    Playlists.prototype.flush = function() {
      this.playlists = {};
      this.isLoaded = false;
      this.isLoading = false;
    };

    // TODO: add documentation
    Playlists.prototype.updatePlaylists = function() {
      this.isLoaded = false;
      return this.getPlaylists();
    };


    var playlists = new Playlists();

    var service = {
      getPlaylists: function() {
        return playlists.getPlaylists(false);
      },
      getUserPlaylists: function() {
        return playlists.getPlaylists(true);
      },
      getPlaylist: function(id) {
        return playlists.getPlaylist(id);
      },
      flush: function() {
        playlists.flush();
      },
      updatePlaylists: function() {
        return playlists.updatePlaylists();
      }
    };
    return service;
  }]
);
angular.module('services.router', ['services.app', 'services.authentication', 'services.authorization']);


angular.module('services.router').factory('RouterChannel', ['$rootScope', function($rootScope) {
  var ROUTER_REQUIRE_PREMIUM = 'routerRequirePremium';

  var routerChannel = {
    routerRequirePremium: function() {
      $rootScope.$broadcast(ROUTER_REQUIRE_PREMIUM, {});
    },
    onRouterRequirePremium: function(scope, handler) {
      scope.$on(ROUTER_REQUIRE_PREMIUM, function(event, message) {
        handler(message);
      });
    }
  };
  return routerChannel;
}]);


angular.module('services.router').factory('Router', ['$rootScope', '$state', '$timeout', 'App', 'Authentication',
  'Authorization', 'RouterChannel', 'ScrollPosition',
  function($rootScope, $state, $timeout, App, Authentication, Authorization, RouterChannel, ScrollPosition) {
    var defaultPageTitle = '';
    var defaultState = '';
    var defaultSideNavigationState = '';
    var setBackgroundClass = false;

    var saveInitialRoute = true;
    var initialRoute = null;

    var init = function init(config) {
      if (angular.isDefined(config.defaultPageTitle)) {
        defaultPageTitle = config.defaultPageTitle;
      }

      if (angular.isDefined(config.defaultState)) {
        defaultState = config.defaultState;
      }

      if (angular.isDefined(config.defaultSideNavigationState)) {
        defaultSideNavigationState = config.defaultSideNavigationState;
      }

      if (angular.isDefined(config.setBackgroundClass)) {
        setBackgroundClass = config.setBackgroundClass;
      }

      $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState) {
        // prevent URL routing until the app is fully loaded
        if (!App.isLoaded()) {
          return event.preventDefault();
        }

        // save the initial route so that we can route the saved route after login
        if (saveInitialRoute) {
          initialRoute = {state: toState, params: toParams};
          saveInitialRoute = false;
        }

        var requireLogin;
        if (angular.isDefined(toState.data) && angular.isDefined(toState.data.requireLogin)) {
          requireLogin = toState.data.requireLogin;
        }

        var requireAdmin;
        if (angular.isDefined(toState.data) && angular.isDefined(toState.data.requireAdmin)) {
          requireAdmin = toState.data.requireAdmin;
        }

        var requirePremium;
        if (angular.isDefined(toState.data) && angular.isDefined(toState.data.requirePremium)) {
          requirePremium = toState.data.requirePremium;
        }

        var globalModal;
        if (angular.isDefined(toState.data) && angular.isDefined(toState.data.globalModal)) {
          globalModal = toState.data.globalModal;
        }

        // view needs a login
        if (angular.isDefined(requireLogin) && requireLogin && !Authentication.isAuthenticated()) {
          event.preventDefault();
          $state.go('login');
        // view needs an admin
        } else if (angular.isDefined(requireAdmin) && requireAdmin && !Authorization.isAdmin()) {
          event.preventDefault();
          Authentication.logout().then(function() {
            $state.go('login');
          });
        // view needs premium user
        } else if (angular.isDefined(requirePremium) && requirePremium && !Authorization.isPremium()) {
          event.preventDefault();
          Authentication.logout().then(function() {
            $state.go('login').then(function() {
              RouterChannel.routerRequirePremium();
            });
          });
        // view is a global model
        } else if ((fromState.name === 'login' || fromState.name === '') &&
          angular.isDefined(globalModal) && globalModal) {
          event.preventDefault();
          $state.go(defaultState).then(function() {
            $state.go(toState, toParams);
          });
        // view is login, but we are already authenticated
        } else if (Authentication.isAuthenticated() && toState.name === 'login') {
          event.preventDefault();
          $state.go(defaultState);
        }

        ScrollPosition.setScrollPosition(toState, fromState);
        ScrollPosition.setPreviousState(toState, fromState);
      });

      $rootScope.$on('$stateChangeSuccess',  function(event, toState) {
        if (angular.isDefined(toState.data) && angular.isDefined(toState.data.pageTitle)) {
          $timeout(function() {
            $rootScope.pageTitle = defaultPageTitle + ' - ' + toState.data.pageTitle;
          });
        } else {
          $timeout(function() {
            $rootScope.pageTitle = defaultPageTitle;
          });
        }

        if (angular.isDefined(toState.data) && angular.isDefined(toState.data.sideNavigationState)) {
          $rootScope.sideNavigationState = toState.data.sideNavigationState;
        } else {
          $rootScope.sideNavigationState = defaultSideNavigationState;
        }

        if (setBackgroundClass) {
          $rootScope.backgroundClass = toState.name.replace(/\./g, '-') + '-background ' +
            'svg-' + toState.name.replace(/\./g, '-');
        }
      });

      ScrollPosition.init();
    };

    var service = {
      init: function(config) {
        return init(config);
      },
      getDefaultState: function() {
        return defaultState;
      },
      getInitialRoute: function() {
        var initialRouteCopy = initialRoute;
        // reset initialRoute on get
        initialRoute = null;
        return initialRouteCopy;
      }
    };
    return service;
  }
]);

angular.module('services.scrollPosition', ['services.app', 'services.authentication', 'services.authorization']);


angular.module('services.scrollPosition').factory('ScrollPosition', ['$rootScope', '$state', '$timeout', '$document',
  '$window',
  function($rootScope, $state, $timeout, $document, $window) {

    var previousState = {
      name: '',
      scrollPosition: 0
    };
    var scrollPosition = 0;

    var init = function init() {
      $rootScope.$on('$viewContentLoaded',  function() {
        var ignoreScrollEvents = function ignoreScrollEvents() {
          if ($document[0].body.scrollTop !== scrollPosition) {
            $window.scrollTo(0, scrollPosition);
          }
        };
        $timeout(function() {
          $window.scrollTo(0, scrollPosition);
          $document.bind('scroll', ignoreScrollEvents);
          $timeout(function() {
            $document.unbind('scroll', ignoreScrollEvents);
          }, 750);
        }, 0);
      });
    };

    var service = {
      setPreviousState: function(toState, fromState) {
        if (angular.isDefined(fromState.data) && angular.isDefined(fromState.data.saveScrollPosition) &&
          fromState.name !== toState.name) {
          previousState.name = fromState.name;
          previousState.scrollPosition = $document.scrollTop();
        }
      },
      setScrollPosition: function(toState, fromState) {
        scrollPosition = 0;
        if (angular.isDefined(toState.data) && angular.isDefined(toState.data.saveScrollPosition) &&
            toState.name === previousState.name && toState.name !== fromState.name) {
          scrollPosition = previousState.scrollPosition;
        }
      },
      init: function() {
        return init();
      }
    };
    return service;
  }
]);

angular.module('services.search', ['services.apiClient', 'services.documents', 'services.utils']);


angular.module('services.search').factory('Search', ['$q', 'KNG_CONFIG', 'ApiClient', 'Documents', 'Utils',
  function($q, KNG_CONFIG, ApiClient, Documents, Utils) {
    /**
     *  TODO: add documentation.
     */
    function createCurrentSearchFilter(filter) {
      var searchFilter = {};
      if (angular.isDefined(filter)) {
        var entries,
          facets;

        for (var i = 0; i < filter.length; i++) {
          facets = filter[i];
          if (angular.isUndefined(searchFilter[facets.facet])) {
            searchFilter[facets.facet] = {};
          }
          for (var j = 0; j < facets.entries.length; j++) {
            entries = facets.entries[j];
            searchFilter[facets.facet][entries.value] = {
              selected: false,
              number: 0
            };
          }
        }
      }
      return searchFilter;
    }


    /**
     *  TODO: add documentation.
     */
    function createFilterFacets(filter) {
      var filterFacets = [];
      if (angular.isDefined(filter)) {
        for (var i = 0; i < filter.length; i++) {
          filterFacets.push(filter[i].facet);
        }
      }
      return filterFacets;
    }


    /**
     *  TODO: add documentation.
     */
    function updateFilterCount(facets) {
      if (angular.isDefined(facets) && angular.isArray(facets.fields)) {
        var facetIndex,
          entryIndex;
        for (var facet in currentSearchFilter) {
          facetIndex = Utils.indexOfAttributeValue('name', facet, facets.fields);
          for (var entry in currentSearchFilter[facet]) {
            if (facetIndex === -1) {
              currentSearchFilter[facet][entry].number = 0;
            } else {
              if (angular.isUndefined(facets.fields[facetIndex].facet)) {
                currentSearchFilter[facet][entry].number = 0;
              } else {
                entryIndex = Utils.indexOfAttributeValue('name', entry, facets.fields[facetIndex].facet);
                if (entryIndex === -1) {
                  currentSearchFilter[facet][entry].number = 0;
                } else {
                  currentSearchFilter[facet][entry].number = facets.fields[facetIndex].facet[entryIndex].number;
                }
              }
            }
          }
        }
      }
    }


    /**
     *  TODO: add documentation
     */
    function updateCurrentSearchFilter(constraint) {
      if (angular.isUndefined(constraint)) {
        constraint = {};
      }

      for (var facet in currentSearchFilter) {
        for (var entry in currentSearchFilter[facet]) {
          if (angular.isDefined(constraint[facet])) {
            var terms;
            if (angular.isArray(constraint[facet])) {
              terms = constraint[facet];
            } else if (angular.isDefined(constraint[facet].$and)) {
              terms = constraint[facet].$and;
            } else if (angular.isDefined(constraint[facet].$or)) {
              terms = constraint[facet].$or;
            }

            if (terms.indexOf(entry) !== -1) {
              currentSearchFilter[facet][entry].selected = true;
            } else {
              currentSearchFilter[facet][entry].selected = false;
            }
          } else {
            currentSearchFilter[facet][entry].selected = false;
          }
        }
      }
    }


    function addSearchFilter(constraint, filter) {
      if (angular.isUndefined(constraint[filter.facet])) {
        constraint[filter.facet] = {$or: []};
      }

      // set operator
      var operator;
      if (angular.isDefined(constraint[filter.facet].$or)) {
        operator = '$or';
      } else if (angular.isDefined(constraint[filter.facet].$and)) {
        operator = '$and';
      } else {
        operator = '$or';
        constraint[filter.facet].$or = [];
      }

      Array.prototype.push.apply(constraint[filter.facet][operator], filter.values);
      constraint[filter.facet][operator] = Utils.uniqueArrayElements(constraint[filter.facet][operator]);
    }

    function mapSearchFilter(constraint) {
      for (var facet in searchFilterMapping) {
        if (angular.isDefined(constraint[facet])) {
          var operator,
            terms;
          if (angular.isDefined(constraint[facet].$and)) {
            operator = '$and';
            terms = constraint[facet].$and;
          } else if (angular.isDefined(constraint[facet].$or)) {
            operator = '$or';
            terms = constraint[facet].$or;
          }

          // add mapped search filter
          if (angular.isDefined(terms)) {
            var removeTerms = false;
            var removeTermsMap = {};
            for (var i = 0; i < terms.length; i++) {
              if (angular.isDefined(searchFilterMapping[facet][terms[i]])) {
                addSearchFilter(constraint, searchFilterMapping[facet][terms[i]]);
                removeTerms = true;
                removeTermsMap[terms[i]] = true;
              }
            }

            // remove mapped search filter
            if (removeTerms) {
              var temp = [];
              for (var j = 0; j < constraint[facet][operator].length; j++) {
                if (angular.isUndefined(removeTermsMap[constraint[facet][operator][j]])) {
                  temp.push(constraint[facet][operator][j]);
                }
              }
              if (temp.length === 0) {
                delete constraint[facet];
              } else {
                constraint[facet][operator] = temp;
              }
            }
          }
        }
      }
    }

    function escapeLuceneSpecialCharacters(text) {
      if (!angular.isString(text)) {
        return text;
      }
      return text.replace(/(\+|\-|\&\&|\|\||\!|\(|\)|\{|\}|\[|\]|\^|\"|\~|\*|\?|\:|\\)/g, '\\$&');
    }


    var SEARCH_SEPARATOR = {
      AND: 'AND',
      OR: 'OR'
    };


    /**
     *  TODO: add documentation
     */
    var defaultQueryObject = {
      command: 'searchDocs',
      constraint: {},
      length: 10,
      facet: {
        field: createFilterFacets(KNG_CONFIG.searchFilter)
      },
      query: '',
      start: 0,
      tagCloud: true
    };

    var defaultSearchOptions = {
      concatSearchResult: false,
      extendDefaultQueryObject: false,
      storeSearchResult: true
    };

    var currentQueryObject = angular.extend({}, defaultQueryObject);
    var currentSearchFilter = createCurrentSearchFilter(KNG_CONFIG.searchFilter);
    var searchFilterMapping = {};
    var searchResult = {
      items: [],
      length: 0,
      number: null,
      page: 1,
      query: '',
      start: 0,
      tagCloud: null
    };
    var isSearching = false;

    var previousSearchParams = {};


    var search = {
      // Example:
      // 'subject:DeutschANDsubject:MathematikANDschoolType:Grundschule'
      // ->
      // {
      //   subject: {$and: ['Deutsch', 'Mathematik']},
      //   schoolType: {$and: ['Grundschule']}
      // }
      //
      // 'subject:DeutschORsubject:MathematikORschoolType:Grundschule'
      // ->
      // {
      //   subject: {$or: ['Deutsch', 'Mathematik']},
      //   schoolType: {$or: ['Grundschule']}
      // }
      parseConstraintQuery: function(constraintQuery) {
        var constraint = {},
          separator = SEARCH_SEPARATOR.OR,
          operator = '$or';
        if (constraintQuery.indexOf(SEARCH_SEPARATOR.AND) !== -1) {
          separator = SEARCH_SEPARATOR.AND;
          operator = '$and';
        }

        if (angular.isDefined(separator) && angular.isDefined(operator)) {
          var terms = constraintQuery.split(separator),
            term;
          for (var i = 0; i < terms.length; i++) {
            term = terms[i].split(':');
            if (term.length === 2) {
              if (angular.isUndefined(constraint[term[0]])) {
                constraint[term[0]] = {};
                constraint[term[0]][operator] = [];
              }
              constraint[term[0]][operator].push(term[1]);
            }
          }
        }
        return constraint;
      },

      // Example:
      //  getConstraintQuery({
      //      subject: ['Deutsch', 'Mathematik'],
      //      schoolType: ['Grundschule']
      //    }, 'AND');
      // ->
      // 'subject:DeutschANDsubject:MathematikANDschoolType:Grundschule'
      getConstraintQuery: function(constraint, separator) {
        if (angular.isUndefined(separator) || angular.isUndefined(SEARCH_SEPARATOR[separator])) {
          separator = SEARCH_SEPARATOR.OR;
        }

        var terms = [];
        for (var field in constraint) {
          if (angular.isArray(constraint[field])) {
            for (var i = 0; i < constraint[field].length; i++) {
              terms.push(field + ':' + constraint[field][i]);
            }
          } else {
            terms.push(field + ':' + constraint[field]);
          }
        }
        return terms.join(separator);
      },

      getConstraintQueryFromCurrentSearchFilter: function(separator) {
        if (angular.isUndefined(separator) || angular.isUndefined(SEARCH_SEPARATOR[separator])) {
          separator = SEARCH_SEPARATOR.OR;
        }

        var terms = [];
        for (var facet in currentSearchFilter) {
          for (var entry in currentSearchFilter[facet]) {
            if (currentSearchFilter[facet][entry].selected) {
              terms.push(facet + ':' + entry);
            }
          }
        }
        return terms.join(separator);
      },

      getCurrentQueryObject: function() {
        return currentQueryObject;
      },

      getCurrentSearchFilter: function() {
        return currentSearchFilter;
      },

      getSearchResult: function() {
        return searchResult;
      },

      getPreviousSearchParams: function() {
        return previousSearchParams;
      },

      isSearching: function() {
        return isSearching;
      },

      setSearchFilterMapping: function(mapping) {
        searchFilterMapping = mapping;
      },

      setPreviousSearchParams: function(params) {
        for (var key in params) {
          previousSearchParams[key] = params[key];
        }
      },


      resetCurrentSearchFilter: function() {
        for (var facet in currentSearchFilter) {
          for (var entry in currentSearchFilter[facet]) {
            if (currentSearchFilter[facet][entry].selected) {
              currentSearchFilter[facet][entry].selected = false;
            }
          }
        }
      },

      query: function(queryString, length) {
        if (angular.isUndefined(length)) {
          length = defaultQueryObject.length;
        }
        var queryObject = {start: 0, query: queryString, length: length};
        return this.perform(queryObject);
      },

      filter: function() {
        var constraintQuery = this.getConstraintQueryFromCurrentSearchFilter();
        var queryObject = {start: 0, constraint: this.parseConstraintQuery(constraintQuery)};
        return this.perform(queryObject);
      },

      loadMore: function() {
        var queryObject = {start: currentQueryObject.start + currentQueryObject.length};
        return this.perform(queryObject, {concatSearchResult: true, storeSearchResult: true});
      },

      perform: function(queryObject, options) {
        if (angular.isUndefined(options)) {
          options = {};
        }
        options = angular.extend({}, defaultSearchOptions, options);

        if (angular.isUndefined(queryObject)) {
          queryObject = {};
        }

        // calculate start position from a given 'page' attribute
        if (angular.isDefined(queryObject.page)) {
          queryObject.page = queryObject.page - 1;
          if (queryObject.page < 0) {
            queryObject.page = 0;
          }

          if (options.extendDefaultQueryObject) {
            queryObject.start = queryObject.page * defaultQueryObject.length;
          } else {
            queryObject.start = queryObject.page * currentQueryObject.length;
          }
          delete queryObject.page;
        }

        // extend query object
        var inputData;
        if (options.extendDefaultQueryObject) {
          inputData = angular.extend({}, defaultQueryObject, queryObject);
        } else {
          if (angular.isUndefined(queryObject.constraint)) {
            queryObject.constraint = defaultQueryObject.constraint;
          }
          if (angular.isUndefined(queryObject.query)) {
            queryObject.query = defaultQueryObject.query;
          }
          // prevent a new search if we have the same query object as before
          // NOTE: not the most efficient way - find a better way
          if (angular.toJson(currentQueryObject.constraint) === angular.toJson(queryObject.constraint) &&
             ((angular.isDefined(queryObject.length) && currentQueryObject.length === queryObject.length) ||
                angular.isUndefined(queryObject.length)) &&
              currentQueryObject.query === queryObject.query &&
              currentQueryObject.start === queryObject.start &&
              searchResult.number !== null) {
            return $q.when(searchResult.items);
          }

          inputData = angular.extend(currentQueryObject, queryObject);
        }

        // update the current search filter
        if (options.storeSearchResult) {
          updateCurrentSearchFilter(inputData.constraint);
        }

        var modifiedInputData = angular.copy(inputData);
        // map search filter
        mapSearchFilter(modifiedInputData.constraint);
        // escape lucene special characters
        modifiedInputData.query = escapeLuceneSpecialCharacters(modifiedInputData.query);

        isSearching = true;
        return ApiClient.documents.GET.searchDocs(modifiedInputData).then(function(result) {
          var rv = [];
          if (angular.isArray(result) && result.length === 1) {
            for (var i = 0; i < result[0].document.length; i++) {
              rv.push(Documents.create(result[0].document[i]));
            }
            updateFilterCount(result[0].facets);
          }

          if (angular.isArray(result) && result.length === 1 && options.storeSearchResult) {
            if (options.concatSearchResult) {
              searchResult.items = searchResult.items.concat(rv);
            } else {
              searchResult.items = rv;
            }

            searchResult.length = result[0].length;
            searchResult.number = result[0].number;
            searchResult.query = inputData.query;
            searchResult.start = result[0].start;
            searchResult.tagCloud = result[0].tagCloud;

            if (result[0].length > 0) {
              searchResult.page = Math.floor(result[0].start / result[0].length) + 1;
            } else {
              searchResult.page = 1;
            }
          }

          return rv;
        }).finally(function() {
          isSearching = false;
        });
      },

      autocomplete: function(queryString) {
        // TODO: add suggestion cache
        var queryObject = {query: queryString};
        return ApiClient.documents.GET.suggestions(queryObject).then(function(result) {
          var suggestions = [];
          if (angular.isArray(result) && result.length === 1) {
            suggestions = result[0].suggestion;
          }
          return suggestions;
        });
      },
    };
    return search;
  }
]);

angular.module('services.tracking', ['services.apiClient']);


angular.module('services.tracking').factory('Tracking', ['$document', 'ApiTracking', 'GaTracking',
  function($document, ApiTracking, GaTracking) {
    function createMessage(event) {
      var message = {
        type: event.type,
        target: event.target,
        timestamp: Date.now()
      };
      return message;
    }

    var targets = {};
    var service = {
      init: function() {
        // TODO: allow to configure what we want to track

        $document.on('click', this.track);
      },

      registerTarget: function(target) {
        targets[target.name] = target;
      },

      track: function(event) {
        var message = createMessage(event);
        for (var target in targets) {
          targets[target].track(message);
        }
        return true;
      }
    };


    service.registerTarget(ApiTracking);
    service.registerTarget(GaTracking);


    return service;
  }]
);


angular.module('services.tracking').factory('ApiTracking', ['ApiClient', function(ApiClient) {
  var service = {
    name: 'ApiTracking',
    track: function(message) {
      var data = {
        'client:eventType': message.type,
        'client:targetId': message.target.id,
        '$user': true
      };

      var trackData = {
        tracks: [data]
      };
      console.error(this.name, trackData);

      ApiClient.tracking.POST.clienttracks(trackData).then(function() {
      }, function(error) {
        console.error(error);
      });
    }
  };

  return service;
}]);


angular.module('services.tracking').factory('GaTracking', [function() {
  var service = {
    name: 'GaTracking',
    track: function(message) {
      console.error(this.name, message);
    }
  };

  return service;
}]);

angular.module('services.users', ['services.apiClient', 'services.linkGroups']);


angular.module('services.users').factory('UsersChannel', ['$rootScope', function($rootScope) {
  var USERS_DATA_CHANGED = 'usersDataChanged';
  var USERS_PROFILE_UPDATED = 'usersProfileUpdated';
  var USERS_SET = 'usersSet';
  var USERS_RESET = 'usersReset';

  var usersChannel = {
    usersDataChanged: function() {
      $rootScope.$broadcast(USERS_DATA_CHANGED, {});
    },
    usersProfileUpdated: function() {
      $rootScope.$broadcast(USERS_PROFILE_UPDATED, {});
    },
    usersSet: function() {
      $rootScope.$broadcast(USERS_SET, {});
    },
    usersReset: function() {
      $rootScope.$broadcast(USERS_RESET, {});
    },
    onUsersDataChanged: function(scope, handler) {
      scope.$on(USERS_DATA_CHANGED, function(event, message) {
        handler(message);
      });
    },
    onUsersProfileUpdated: function(scope, handler) {
      scope.$on(USERS_PROFILE_UPDATED, function(event, message) {
        handler(message);
      });
    },
    onUsersSet: function(scope, handler) {
      scope.$on(USERS_SET, function(event, message) {
        handler(message);
      });
    },
    onUsersReset: function(scope, handler) {
      scope.$on(USERS_RESET, function(event, message) {
        handler(message);
      });
    }
  };
  return usersChannel;
}]);


angular.module('services.users').factory('Users', ['$q', 'ApiClient', 'LinkGroups', 'UsersChannel',
  function($q, ApiClient, LinkGroups, UsersChannel) {
    var User = function(attr) {
      this.attr = angular.extend({}, {}, attr);

      this.linkGroups = [];

      return this;
    };


    User.prototype._extendAttributes = function(attributes, updatedData) {
      for (var i in attributes) {
        this.attr[i] = updatedData[i];
      }
    };

    User.prototype.set = function(data) {
      this.attr = angular.extend(this.attr, data);
    };

    User.prototype.getId = function() {
      return this.attr._id;
    };

    User.prototype.getAvailableDownloads = function() {
      return this.attr.downloads.max - this.attr.downloads.counter;
    };

    User.prototype.getCreatedAt = function() {
      return this.attr.created.timestamp;
    };

    User.prototype.getEmail = function() {
      return this.attr.email;
    };

    User.prototype.getFirstName = function() {
      return this.attr.firstName;
    };

    User.prototype.getLastName = function() {
      return this.attr.lastName;
    };

    User.prototype.getGender = function() {
      return this.attr.gender;
    };

    User.prototype.getNumberOfDownloads = function() {
      return this.attr.downloads.counter;
    };

    User.prototype.getSubjects = function() {
      return this.attr.subjects;
    };

    User.prototype.getSchoolType = function() {
      var schoolType = '';
      if (angular.isDefined(this.attr.schools) && angular.isDefined(this.attr.schools[0]) &&
          angular.isDefined(this.attr.schools[0].type)) {
        schoolType = this.attr.schools[0].type;
      }
      return schoolType;
    };

    User.prototype.getType = function() {
      return parseInt(this.attr.type);
    };

    User.prototype.isAdmin = function() {
      return this.attr.rights.admin;
    };

    User.prototype.isBasis = function() {
      return parseInt(this.attr.type) === 1;
    };

    User.prototype.isPremium = function() {
      return parseInt(this.attr.type) === 2;
    };

    User.prototype.hasType = function(type) {
      return parseInt(this.attr.type) === type;
    };

    User.prototype.getLicence = function() {
      if(
        angular.isObject(this.attr.payment) &&
        angular.isObject(this.attr.payment.licences)
      ) {
        var licences = this.attr.payment.licences;
        var keys = Object.keys(licences);
        var index = 0;
        while(index < keys.length) {
          var licence = licences[keys[index]];
          if(angular.isObject(licence)) {
            return licence;
          }

          index++;
        }

        return null;
      }
    };

    User.prototype.getUpdates = function(type) {
      if(
        angular.isObject(this.attr.tracking) &&
        angular.isArray(this.attr.tracking.updates)
      ) {
        return this.attr.tracking.updates
          .filter(function(update) {
            var passes = angular.isObject(update);
            if(passes && angular.isString(type)) {
              passes = update.action === type;
            }
            return passes;
          });
      } else {
        return [];
      }
    };

    User.prototype.getLastUpdate = function(type) {
      return this.getUpdates(type).pop() || null;
    };

    User.prototype.loadLinkGroups = function() {
      var _this = this;
      return LinkGroups.getLinkGroupsByUserId(_this.getId()).then(function(linkGroups) {
        _this.linkGroups = linkGroups;
      });
    };

    User.prototype.updateProfile = function(data) {
      var _this = this;
      var parameter = {
          _id: _this.getId()
      };

      for (var i in data) {
        parameter[i] = data[i];
      }

      return ApiClient.users.PUT.profile(parameter).then(function(updatedData) {
        if (angular.isArray(updatedData) && updatedData.length === 1) {
          _this._extendAttributes(data, updatedData[0]);
          UsersChannel.usersProfileUpdated();
        }
      });
    };

    User.prototype.reload = function() {
      var _this = this;
      return ApiClient.users.GET.byId({_id: this.getId()}).then(function(updatedData) {
        if (angular.isArray(updatedData) && updatedData.length === 1) {
          angular.extend(_this.attr, updatedData[0]);
        }
      });
    };


    var users = {
      create: function(attr) {
        return new User(attr);
      }
    };
    return users;
  }
]);

angular.module('services.utils', []);


angular.module('services.utils').factory('Utils', ['$filter', '$window', function($filter, $window) {
  var utils = {
    setObjectAttrByString: function(obj, keyString, val) {
      for (var keys = keyString.split('.'), i = 0, l = keys.length; i < l - 1; i++) {
        if (typeof obj[keys[i]] === 'undefined') {
          obj[keys[i]] = {};
        }
        obj = obj[keys[i]];
      }
      obj[keys[l - 1]] = val;
      return val;
    },

    setObjectAttr: function(obj, attr, val) {
      obj[attr] = val;
    },

    getObjectAttrByString: function(obj, keyString) {
      for (var keys = keyString.split('.'), i = 0, l = keys.length; i < l; i++) {
        obj = obj[keys[i]];
        if (typeof obj === 'undefined') {
          return void 0;
        }
      }
      obj = angular.copy(obj);
      return obj;
    },

    modifyControllerData: function(controllerData, obj) {
      if (!angular.isArray(controllerData)) {
        controllerData = [controllerData];
      }

      var data;
      for (var i = 0; i < controllerData.length; i++) {
        if (angular.isUndefined(controllerData[i].attr) && angular.isDefined(controllerData[i].type) &&
            (controllerData[i].type === 'group' || controllerData[i].type === 'row')) {
          utils.modifyControllerData(controllerData[i].fields, obj);
        } else {
          data = this.getObjectAttrByString(obj, controllerData[i].attr);
          if (angular.isDefined(data)) {
            if (typeof controllerData[i].format !== 'undefined') {
              controllerData[i].data = controllerData[i].format(data);
            } else {
              controllerData[i].data = data;
            }
          }
        }
      }
    },

    setFormData: function(form, attr, data) {
      for (var i = 0; i < form.fields.length; i++) {
        if (form.fields[i].attr === attr) {
          form.fields[i].data = data;
          break;
        }
      }
    },

    getFormData: function(form, attr) {
      for (var i = 0; i < form.fields.length; i++) {
        if (form.fields[i].attr === attr) {
          return form.fields[i].data;
        }
      }
    },

    setFormOptions: function(form, attr, options) {
      for (var i = 0; i < form.fields.length; i++) {
        if (form.fields[i].attr === attr && typeof form.fields[i].input !== 'undefined' &&
            typeof form.fields[i].input.options !== 'undefined') {
          form.fields[i].input.options = options;
          break;
        }
      }
    },

    generateUpdateObject: function(controllerData, defaultValue, copy, obj) {
      if (!angular.isArray(controllerData)) {
        controllerData = [controllerData];
      }

      var setFunc = this.setObjectAttrByString;
      if (typeof copy !== 'undefined' && copy) {
        setFunc = this.setObjectAttr;
      }

      if (typeof obj === 'undefined') {
        obj = {};
      }
      for (var i = 0; i < controllerData.length; i++) {
        if (angular.isUndefined(controllerData[i].attr) && angular.isDefined(controllerData[i].type) &&
            (controllerData[i].type === 'group' || controllerData[i].type === 'row')) {
          utils.generateUpdateObject(controllerData[i].fields, defaultValue, copy, obj);
        } else {
          if (typeof controllerData[i].data !== 'undefined') {
            setFunc(obj, controllerData[i].attr, controllerData[i].data);
          } else {
            setFunc(obj, controllerData[i].attr, defaultValue);
          }
        }
      }
      return obj;
    },

    formatTimestamp: function(timestamp) {
      return $filter('date')(timestamp, 'dd.MM.yyyy - HH:mm:ss');
    },

    formatDateLocalized: function(date) {
      if (date === -1) {
        return '';
      }

      if (angular.isString(date)) {
        date = new Date(date.split(' ')[0]);
      } else if (angular.isNumber(date)) {
        date = new Date(date);
      }

      if (isNaN(date.getTime())) {
        return '';
      }

      return '' + date.getDate() + '. ' + $filter('translate')('MONTH_' + date.getMonth()) + ' ' + date.getFullYear();
    },

    formatBoolean: function(bool) {
      return '' + bool;
    },

    formatObjectKeys: function(object) {
      return Object.keys(object);
    },

    formatInvoiceType: function(type) {
      return (type === '1' || type === 1) ? 'LS' : 'RE';
    },

    formatGender: function(gender, options) {
      for (var i = 0; i < options.length; i++) {
        if (gender === options[i].value) {
          return $filter('translate')(options[i].text);
        }
      }
      return '';
    },

    randomString: function(length, numbers, alphabetLowerCase, alphabetUpperCase, timestamp) {
      var id = '';

      if (typeof numbers !== 'boolean') {
        numbers = true;
      }

      if (typeof alphabetLowerCase !== 'boolean') {
        alphabetLowerCase = false;
      }

      if (typeof alphabetUpperCase !== 'boolean') {
        alphabetUpperCase = false;
      }

      if (typeof timestamp !== 'boolean') {
        timestamp = false;
      }


      if (timestamp === true) {
        id += new Date().getTime();
      }

      if (timestamp === true && alphabetLowerCase === false && numbers === false && alphabetUpperCase === false) {
        return id;
      }

      var charsNumbers = new Array('1','2','3','4','5','6','7','8','9','0');
      var charsAlphabet = new Array(
        'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z');
      var charsUpperCase = new Array(
        'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z');

      var idchars = new Array(0);
      if (numbers === true) {
        idchars = idchars.concat(charsNumbers);
      }

      if (alphabetLowerCase === true) {
        idchars = idchars.concat(charsAlphabet);
      }

      if (alphabetUpperCase === true) {
        idchars = idchars.concat(charsUpperCase);
      }

      var lengthIdChars = idchars.length;
      for (var i = 0; i < length; i++) {
        id += idchars[Math.floor(Math.random() * lengthIdChars)];
      }

      return id;
    },

    indexOfAttributeValue: function(attr, value, array) {
      for (var i = 0; i < array.length; i++) {
        if (array[i][attr] === value) {
          return i;
        }
      }
      return -1;
    },

    uniqueArrayElements: function(arr) {
      var hash = {},
        len = arr.length,
        result = [];
      for (var i = 0; i < len; i++) {
        if (!hash.hasOwnProperty(arr[i])) {
          hash[arr[i]] = true;
          result.push(arr[i]);
        }
      }
      return result;
    },

    isMobileBrowser: function() {
      return /(Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune)/i // jshint ignore:line
        .test($window.navigator.userAgent);
    }
  };

  return utils;
}]);

angular.module('services.validator', []);



angular.module('services.validator').factory('Validator', ['APP_CONFIG', function(APP_CONFIG) {

    var controllers = {};
    var dependencies = {};
    var validators = {
      areaCodeValidator: function(areaCodeModel, areaCodeView) {
        if (angular.isUndefined(APP_CONFIG.areaCodes[dependencies.areaCode]) ||
          APP_CONFIG.areaCodes[dependencies.areaCode] === '') {
          return true;
        } else {
          return APP_CONFIG.areaCodes[dependencies.areaCode].test(areaCodeView);
        }
      }
    };

    var setController = function setController(ctrl, name) {
      controllers[name] = ctrl;
      controllers[name].$validators[name + 'Validator'] = validators[name + 'Validator'];
    };

    var setDependency = function setDependency(dep, name) {
      dependencies[name] = dep;
    };

    var rerunValidators = function rerunValidators(name) {
      controllers[name].$validate();
    };

    return {
      areaCodeValidator: validators.areaCodeValidator,
      setController: setController,
      setDependency: setDependency,
      rerunValidators: rerunValidators
    };
  }
]);

angular.module('services.windowResize', []);


angular.module('services.windowResize').factory('WindowResizeChannel', ['$rootScope', function($rootScope) {
  var WINDOW_RESIZED = 'windowResized';

  var windowResizeChannel = {
    windowResized: function() {
      $rootScope.$broadcast(WINDOW_RESIZED, {});
    },
    onWindowResized: function(scope, handler) {
      scope.$on(WINDOW_RESIZED, function(event, message) {
        handler(message);
      });
    }
  };
  return windowResizeChannel;
}]);


angular.module('services.windowResize').factory('WindowResize', ['$window', '$timeout', 'WindowResizeChannel',
  function($window, $timeout, WindowResizeChannel) {
    var timeout;
    var debounce = function debounce(func, wait) {
      return function debounced() {
        var _this = this;
        var args = arguments;

        function delayed() {
          timeout = null;
          func.apply(_this, args);
        }

        if (timeout) {
          $timeout.cancel(timeout);
        }
        timeout = $timeout(delayed, wait);
      };
    };

    var boundWindowResize = false;
    var bindWindowResize = function bindWindowResize() {
      if (!boundWindowResize) {
        boundWindowResize = true;
        var debouncedWindowResized = debounce(WindowResizeChannel.windowResized, 200);
        angular.element($window).bind('resize', debouncedWindowResized);
      }
    };


    return {
      init: function() {
        bindWindowResize();
      }
    };
  }
]);
