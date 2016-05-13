(function(){
    'use strict';
    /* @ngInject */
     function droppable() {
        return {
            scope: {
                onDrop: '&',
            },
            link: function(scope, element) {
                var el = element[0];
                el.addEventListener('dragover', function(e) {
                    e.dataTransfer.dropEffect = 'copy';
                    if (e.preventDefault) e.preventDefault();
                    this.classList.add('over');
                    return false;
                });
                el.addEventListener('dragenter', function(e) {
                    if (e.preventDefault) e.preventDefault();
                    this.classList.add('over');
                    return false;
                });
                el.addEventListener('dragleave', function(e) {
                    this.classList.remove('over');
                    return false;
                });
                el.addEventListener('drop', function(e) {
                    if (e.preventDefault) e.preventDefault();
                    if (e.stopPropagation) e.stopPropagation();
                   
                    this.classList.remove('over');
                    var item = document.getElementById(e.dataTransfer.getData('id'));
                    

                    var cloned_item = item.cloneNode(true);
                    cloned_item.classList.remove('drag');
                    cloned_item.id = cloned_item.id + '-clone';

                    //mark already added elements
                    item.classList.add('added');

                    if(document.getElementById(cloned_item.id)){
                        alert('Already selected this item');
                    }
                    else {
                        this.appendChild(cloned_item);
                        scope.$parent.onDrop(item, this);
                    }

                    return false;
                });
            }
        }
    };
    droppable.$inject = [];
    angular.module("home").directive('droppable', droppable);
}());