$(document).ready(function(){

	var listo = [];

	$('#newTaskForm').hide();
	

	var Task = function(task) {
		//Task constructor to be stored in listo
	    this.task = task;
	    this.id = 'new';
	}
	var save = function() {
		localStorage.listo = JSON.stringify(listo);
	};
	//loads the array back into listo from localStorage. Then adds the tasks on the page.
	var load = function(){
		listo = JSON.parse(localStorage['listo'])

		for(var i=0; i < listo.length; i++){
			if(listo[i].id === 'new'){
				$('#newList').append('<a href="#finish" id="item"><li class="list-group-item">' + listo[i].task + '<span class="icon-arrow-right"></span></li></a>');
			}
			else if(listo[i].id === 'inProgress') {
				$('#currentList').append('<a href="#finish" id="inProgress"><li class="list-group-item">' + listo[i].task + '<span class="icon-box-remove"></span></li></a>');
			}
			else if(listo[i].id === 'archived'){
				$('#archivedList').append('<a href="#finish" id="archived"><li class="list-group-item">' + listo[i].task + '<span class="icon-remove"></span></li></a>');
			}
		}
	}

	if(localStorage.listo){
		load();
	}

	var addTask = function(task) {
		if(task){
			var taskToAdd = new Task(task);
			listo.push(taskToAdd);
			save();

			$('#newItemInput').val('');
        	$('#newList').append('<a href="#finish" id="item"><li class="list-group-item">' + taskToAdd.task + '<span class="icon-arrow-right"></span></li></a>');

		}
		$('#newTaskForm').hide();
		$('#newListItem').show();
		$('.title-new > div').first().show()
	};

	var advanceTask = function(task){
		var modified = task.innerText.trim()
		for (var i=0; i < listo.length; i++){
			if(listo[i].task === modified){
				if(listo[i].id === 'new'){
					listo[i].id ='inProgress';
				}else if (listo[i].id === 'inProgress'){
					listo[i].id = 'archived';
				}else {
					listo.splice(i,1);
				}
				save();
				break;
			}
		}
		task.remove();
	};
	//Saves the array list
	
	
	//listener events

	$('#saveNewItem').on('click', function (e) {
    	e.preventDefault();
    	var task = $('#newItemInput').val().trim();
    	addTask(task);
	});
		//opens form
	$('#newListItem').on('click', function () {
    	$('.title-new > div').first().hide();
    	$('#newListItem').hide();
    	$('#newTaskForm').show();

    	
	});
		//closes form
	$('#cancel').on('click', function (e) {
    	e.preventDefault();
    	$('#newTaskForm').hide();
    	$('#newListItem').show();
    	$('.title-new > div').first().show();
	});


	$(document).on('click', '#item', function(e) {
    	e.preventDefault();
    	var task = this;
    	task.id = 'inProgress'       
    	advanceTask(task);
    	var changeIcon = task.outerHTML.replace('icon-arrow-right', 'icon-box-remove');
    	
    	$('#currentList').append(changeIcon);
    	

	});
	$(document).on('click', '#inProgress', function (e) {
    	e.preventDefault();
    	var task = this;
    	task.id = "archived";
   		advanceTask(task);
   		var changeIcon = task.outerHTML.replace('icon-box-remove', 'icon-remove');
    	$('#archivedList').append(changeIcon);
    	
	});
	$(document).on('click', '#archived', function (e) {
    	e.preventDefault();
    	var task = this;
    	advanceTask(task);
    	
	});


});