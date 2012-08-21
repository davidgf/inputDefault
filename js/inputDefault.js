;
(function($) {
    $.fn.inputDefault = function(value, options) {
        if (typeof value !== 'string') return this;
        var settings = $.extend({
            value: '',
            focusColor: 'black',
            blurColor: '#CCC'
        }, options);
        settings.value = value;

				var placeholderAttr = (function(){
					var i = document.createElement('input');
					return ('placeholder' in i);
				})();

				if(!placeholderAttr){
					$.valHooks.input = {
						get: function(el) {
									return ($(el).data('inputDefault') ? '' : el.value);
								 },
						set: function(el, val) {
									var $el = $(el);
									el.value = val;
									$el.data('inputDefault', false);
									return $el;
								 }
					}
				}
        $.each(this, function(index, el) {
						if(placeholderAttr){
							el.placeholder = settings.value;
							return true;
						}
            var $el = $(el);
						var pass = (el.type === 'password');
						console.log('pass is '+pass);
            $el.on('blur.inputDefault', function(ev) {
                if ($el.attr('value') == ''){
                	$el.attr('value', settings.value).css('color', settings.blurColor).data('inputDefault', true);
                	pass && (el.type = 'text');
								}
            }).on('focus.inputDefault', function(ev) {
                pass && (el.type = 'password');
                if (($el.attr('value') == settings.value) && $el.data('inputDefault'))
                    $el.attr('value', '').css('color', settings.focusColor).data('inputDefault', false);
            });
            $el.trigger('blur.inputDefault');
        });
        return this;
    };
})(jQuery);
