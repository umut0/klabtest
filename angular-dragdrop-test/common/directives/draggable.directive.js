(function(){
  	'use strict';
  	/* @ngInject */
	function draggable() {
		return function(scope, element) {
		    element.attr("draggable", true);  
		    element.bind('dragstart', function(e) {
		        e.originalEvent.dataTransfer.setData('id', this.id);
		        e.originalEvent.dataTransfer.effectAllowed = 'copy';
		        this.classList.add('drag');
		    });    

		    element.bind('dragend', function(e) {
		    	if (e.preventDefault) e.preventDefault();
		        this.classList.remove('drag');
		        return false;
		    });

		    element.bind('dragover', function(e) {
		    	if (e.preventDefault) e.preventDefault();
		    });

		    element.bind('drop', function(e) {
		    	if (e.preventDefault) e.preventDefault();
		        this.classList.remove('drag');
		        return false;
		    });
		}
	};
	draggable.$inject = [];
	angular.module("home").directive('draggable', draggable);
}());