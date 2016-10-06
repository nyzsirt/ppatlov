function ActivityControl() {
    if ($.cookie("token")) {
        var token = $.cookie("token");
    } else {
        var token = false;
    }
    var url = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port: '') + "/activityControl2/";
    $.get(url, {"token": token}, function(data) {
        if (data === null || data === undefined)
            return 0;
        if(data.success) {
            $.cookie("token", data.token, {path: "/"});
        }
    });
}

setInterval("ActivityControl()", 30*1000);
