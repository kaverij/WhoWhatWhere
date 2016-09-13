(function ($) {
    $.fn.overlaps = function (obj, percent) {
        var elems = {targets: [], hits: []};
        this.each(function () {
            var bounds = $(this).offset();
            var dropWidth = $(this).outerWidth() * stageScale;
            var dropHeight = $(this).outerHeight() * stageScale;
            bounds.right = bounds.left + (dropWidth - ((percent / 100) * dropWidth));
            bounds.bottom = bounds.top + (dropHeight - ((percent / 100) * dropHeight));

            boundsLeft = bounds.left + ((bounds.left * (percent / 2)) / 100);
            boundsTop = bounds.top + ((bounds.top * (percent / 2)) / 100);
            //console.log("overlaps: ", bounds.left , bounds.top, bounds.right, bounds.bottom, boundsLeft, boundsTop);

            var dragWidth = $(obj).outerWidth() * stageScale;
            var dragHeight = $(obj).outerHeight() * stageScale;
            var compare = $(obj).offset();
            compare.right = compare.left + dragWidth;
            compare.bottom = compare.top + dragHeight;

            if (!(compare.right < bounds.left || compare.left > bounds.right || compare.bottom < bounds.top || compare.top > bounds.bottom)) {
                //if (!(compare.right < boundsLeft || compare.left > bounds.right || compare.bottom < boundsTop || compare.top > bounds.bottom)) {
                elems.targets.push(this);
                elems.hits.push(obj);
            }
        });

        return elems;
    };
}(jQuery));