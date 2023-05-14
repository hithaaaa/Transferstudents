define(['views/index'], function(indexView) {
	var initialize = function() {
		console.log('TRACK APP');
		var indexPage = new indexView();
		indexPage.render();
		
	}
	return {
		initialize: initialize
	};
});