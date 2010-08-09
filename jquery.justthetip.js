/*
 * jQuery "JustTheTip" Tool Tip plug-in 0.1
 *
 * http://blog.justprofessionals.com/THIS_IS_WHERE_MY_POST_WILL_GO
 * Copyright (c) 2010 Jeremy Woertink
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 */
(function($) {
	$.extend($.fn, {
		justtip: function() {
			var tipper = this;
			var options = arguments[0] || {};
			tipper.enabled = (options != null) ? true : false;
			tipper.log = function(msg) {
				if('console' in window) window.console.log(msg);
			}
			
			if(tipper.enabled) {
				var tipbox;
				if(typeof options == 'string') {
					tipbox = options;
				} else if(typeof options == 'object') {
					tipbox = options['tip'];
				}
				if($(tipbox).length > 0) {
					var tipstyles = options['styles'] || {};
					xOffset = options['x'] || 25; //up & down
					yOffset = options['y'] || 15; //left & right

					$(tipbox).css({
						'position': 'absolute',
						'z-index': 100,
						'display': 'none',
						'left': ($(tipper).position().left + $(tipper).width()),
						'top': $(tipper).position().top
					}).css(tipstyles);

			    $(tipper).live("mouseenter", function() {
						$(this).css('z-index', 2);
						$(tipbox).fadeIn('fast', function() {
							$(tipper).mousemove(function(e) {
								$(tipbox)
									.css('top', (e.pageY - xOffset) + 'px')
									.css('left', (e.pageX + yOffset) + 'px');
							});
						});
			    });
			    $(tipper).bind("mouseleave", function() {
			      $(tipper).css('z-index', 1);
						$(tipbox).fadeOut('fast', function() {
							//tooltip is now hidden
						});
			    });
				} else {
					tipper.log('Could not find a tooltip');
				}
			} else {
				tipper.log('You must provide the tip selector');
			}
		}
	});
})(jQuery);