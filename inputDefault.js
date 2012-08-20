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

        $.each(this, function(index, el) {
            var pass = (el.type === 'password');
            $(el).on('blur.inputDefault', function(ev) {
                var $el = $(this);
                if ($el.attr('value') == '') 
                    $el.attr('value', settings.value).css('color', settings.blurColor);
            }).on('focus.inputDefault', function(ev) {
                var $el = $(this);
                pass && (el.type = 'password');
                if ($el.attr('value') == settings.value) 
                    $(this).attr('value', '').css('color', settings.focusColor);
            });
            $(el).trigger('blur.inputDefault');
        });
        return this;
    };
})(jQuery);

$('input').inputDefault('proba', {
    focusColor: 'blue'
});
