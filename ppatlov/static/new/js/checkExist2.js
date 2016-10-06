function checkExistence(phonenumber) {
    phonenumber = phonenumber.trim();
    var reg_phone = /^\d{10}$/;
    var reg_phone_1 = /^\+\d{12}$/;
    if (!(reg_phone.test(phonenumber) || reg_phone_1.test(phonenumber))) {
        alert(gettext("Please make sure that phone number format is correct"));
        return false;
    }
    $("#btnDevam").attr("disabled", "disabled");
    var jet = $("#jetonParam").val();
    if(phonenumber.charAt(0) == '+') {
        phonenumber = phonenumber.replace(phonenumber.charAt(0), "p");
    }
    var req_url = location.protocol + "//" + window.location.host + "/checkUserExistence/";
    var req_data = {
      "phonenumber": phonenumber,
    };
    if (jet) {
        req_data["jet"] = 1;
    }
    $.ajax({
      url: req_url,
      data: req_data,
      type: "POST"
    }).done(function(resp) {
        var resp_json = $.parseJSON(resp);
        if (resp_json["isExists"] === "y") {
            var a = gettext("An account associated with this phone number have been created.");
            a += gettext(" Do you want to delete this account and create new one?");
            if(confirm(a)) {
                var req_data = {
                  "phonenumber": phonenumber,
                  "answer": true
                };
                $.ajax({
                  url: req_url,
                  data: req_data,
                  type: "POST"
                }).done(function() {
                    $('#mobileSale').submit();
                });
            } else {
                window.location= location.protocol + '//' + window.location.host + '/login/';
            }
        } else {
            $('#mobileSale').submit();
        }
    });
}
