function doSubmit() {
    checkExistence($('#id_phonenumber').val());
    return false;
}


function openWarningDialog() {
    var warning_dialog = "#warning-dialog";
    $(warning_dialog).modal();
}

function continueButtonHandler(event) {
    event.preventDefault();
    var companyDoesNotPayDivId = "#company-does-not-pay",
        tosCheckBoxId = "#price-checkbox";
    if ( $(companyDoesNotPayDivId).length == 1 ) {
        // User is required to accept terms. Check if accepted.
        if ( $(tosCheckBoxId).is(':checked') ) {
            // User accept terms. Begin submit operation
            doSubmit();
        } else {
            openWarningDialog();
        }
    } else {
        // User pays nothing. Nothing to accept. Submit.
        doSubmit();
    }
}

function fireEvents() {
    $("#btnDevam").on("click", continueButtonHandler);
}
