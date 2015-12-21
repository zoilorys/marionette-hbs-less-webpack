import template from '../hbs/hello-item.hbs';
import '../less/hello-item.less';

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
	template: template,
	
	events: {
		'click button.reload-button': 'snap'
	},
	
	snap: function() {
		App.footerRegion.show(
			new App.Box({
				model: new Backbone.Model({
					name: 'NzzzSzI'
				})
			})
		);
	}
});