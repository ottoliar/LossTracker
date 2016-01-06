// site.js
(function () {
    var $side_wrapper = $("#sidebar,#wrapper");
    var $icon = $("#sidebar_toggle i");

    $("#sidebar_toggle").on("click", function () {
        $side_wrapper.toggleClass("hide-sidebar");
        if ($side_wrapper.hasClass("hide-sidebar")) {
            $icon.removeClass("fa fa-angle-left");
            $icon.addClass("fa fa-angle-right");
        } else {
            $icon.removeClass("fa fa-angle-right");
            $icon.addClass("fa fa-angle-left");
        }
    });
})();