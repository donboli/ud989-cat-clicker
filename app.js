$(function() {

	var model = {
		init: function() {
			this.cats = {};

			for (var i = 1; i < 6; i++) {
				this.cats['cat' + i] = {
					src: 'cat_picture' + i + '.jpg',
					counter: 0
				};
			}
		},

		getAll: function() {
			return this.cats;
		},

		get: function(id) {
			return this.cats[id];
		},

		incrementCounter(id) {
			this.cats[id].counter++;
		}
	};

	var octopus = {
		init: function() {
			model.init();
			listView.init();
			listView.render();
			catView.init();
		},

		getCats: function() {
			return model.getAll();
		},

		getCat: function(id) {
			return model.get(id);
		},

		incrementCounter: function(id) {
			model.incrementCounter(id);
		}
	};

	var listView = {
		init: function() {
			this.buttons = [];
			this.$catList = $('#catList');
		},

		render: function() {
			var cats =  octopus.getCats();

			// set button list
			for (var cat in cats) {
				if (cats.hasOwnProperty(cat)) {
					this.buttons.push("<button data-id='" + cat + "'>" + cat + "</button>");
				}
			}

			this.$catList.append(this.buttons.join(''));

			// add event listener for cat buttons
			this.$catList.on('click', 'button', function() {
				catView.render($(this).data('id'));
			});
		}
	};

	var catView = {
		init: function() {
			this.$catView = $('#catView');

			// add event listener for cat images
			this.$catView.on('click', 'img', function() {
				var id = $(this).parent('.cat').data('id');
				octopus.incrementCounter(id);
				catView.render(id);
			});
		},

		render: function(id) {
			cat = octopus.getCat(id);

			this.$catView.empty();
			this.$catView.append("<div class='cat' data-id='" + id +
				"'><span class='counter'>" + cat.counter +
				"</span> clicks<br><img class='clicker' src='" + cat.src +
				"'></div>");
		}
	};

	octopus.init();
});