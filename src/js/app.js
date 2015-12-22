export const App = new Marionette.Application();

App.addRegions({
		headerRegion: '#header',
		mainRegion: '#main-app',
		footerRegion: '#footer'
});

App.on('before:start', () => {
});

App.on('start', () => {	
	App.mainRegion.show(
		new App.Box({
			model: new Backbone.Model({
				name: 'Joe'
			})
		})
	);
});

App.Box = Marionette.ItemView.extend({
	className: 'hello-item',
	template: Hub.templates.helloItem,
	
	events: {
		'click button.reload-button': 'snap'
	},
	
	snap: function() {
		App.footerRegion.show(
			new App.Box({
				model: new Backbone.Model({
					name: 'NIGH'
				})
			})
		);
	}
});