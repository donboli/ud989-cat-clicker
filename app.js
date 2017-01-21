$(function() {

	var model = {
		init: function() {
			this.adminVisible = false;
			this.cats = {};

			for (var i = 1; i < 6; i++) {
				this.cats['cat' + i] = {
					name: 'Cat ' + i,
					imgURL: 'cat_picture' + i + '.jpg',
					clicks: 0
				};
			}
		},

		getAll: function() {
			return this.cats;
		},

		getCurrentCat: function() {
			return this.currentCat;
		},

		setCurrentCat: function(id) {
			this.currentCat = this.cats[id];
		},

		updateCurrentCat: function(name, imgURL, clicks) {
			this.currentCat.name = name;
			this.currentCat.imgURL = imgURL;
			this.currentCat.clicks = clicks;
		},

		incrementClicks: function() {
			this.currentCat.clicks++;
		},

		showAdmin: function() {
			this.adminVisible = true;
		},

		hideAdmin: function() {
			this.adminVisible = false;
		}
	};

	var octopus = {
		init: function() {
			model.init();
			listView.init();
			catView.init();
			adminView.init();
		},

		getCats: function() {
			return model.getAll();
		},

		getCurrentCat: function() {
			return model.getCurrentCat();
		},

		incrementClicks: function() {
			model.incrementClicks();
			octopus.hideAdmin();
			catView.render();
		},

		setCurrentCat: function(id) {
			model.setCurrentCat(id);
		},

		showAdmin: function() {
			model.showAdmin();
			adminView.render();
		},

		hideAdmin: function() {
			model.hideAdmin();
			adminView.render();
		},

		getAdminVisible: function() {
			return model.adminVisible;
		},

		updateCurrentCat: function(name, imgURL, clicks) {
			model.updateCurrentCat(name, imgURL, clicks);
			octopus.hideAdmin();
			listView.render();
			catView.render();
		}
	};

	var listView = {
		init: function() {
			this.$catList = $('#catList');
			this.render();
		},

		render: function() {
			this.buttons = [];
			var cats =  octopus.getCats();
			this.$catList.empty();

			// set button list
			for (var cat in cats) {
				if (cats.hasOwnProperty(cat)) {
					this.buttons.push("<button data-id='" + cat + "'>" + cats[cat].name + "</button>");
				}
			}

			this.$catList.append(this.buttons.join(''));

			// add event listener for cat buttons
			this.$catList.on('click', 'button', function() {
				octopus.hideAdmin();
				octopus.setCurrentCat($(this).data('id'));
				catView.render();
			});
		}
	};

	var catView = {
		init: function() {
			this.$catView = $('#catView');

			// add event listener for cat images
			this.$catView.on('click', 'img', function() {
				var id = $(this).parent('.cat').data('id');
				octopus.incrementClicks();
			});
		},

		render: function(id) {
			cat = octopus.getCurrentCat();

			this.$catView.empty();
			this.$catView.append("<div class='cat' data-id='" + id +
				"'><span class='clicks'>" + cat.clicks +
				"</span> clicks<br><img class='clicker' src='" + cat.imgURL +
				"'></div>");
		}
	};

	var adminView = {
		init: function() {
			this.$adminForm = $('#adminForm');

			// buttons
			this.$adminButton = $('#adminButton');
			this.$cancelButton = $('#cancelButton');

			// form fields
			this.$name = $('#name');
			this.$imgURL = $('#imgURL');
			this.$clicks = $('#clicks');

			// event handlers
			this.$adminForm.on('submit', function(e) {
				e.preventDefault();
				var name = adminView.$name.val();
				var imgURL = adminView.$imgURL.val();
				var clicks = adminView.$clicks.val();

				octopus.updateCurrentCat(name, imgURL, clicks);
			});

			this.$cancelButton.on('click', function() {
				octopus.hideAdmin();
			});

			this.$adminButton.on('click', function() {
				octopus.showAdmin();
			});

			this.render();
		},

		render: function() {
			if(octopus.getAdminVisible()) {
				cat = octopus.getCurrentCat();

				this.$name.val(cat.name);
				this.$imgURL.val(cat.imgURL);
				this.$clicks.val(cat.clicks);

				this.$adminForm.show();
			} else {
				this.$adminForm.hide();
			}
		}
	};

	octopus.init();
});