
$(document).ready(function(){
    window.id_agreement_modal = $("#id_agreement_modal");
    var buttons_trans = {};

    var but_name_close = gettext("Close");
    buttons_trans[but_name_close] = function() {
        $(this).dialog("close");
        window.opened = false;
    };
    
    window.id_agreement_modal.dialog({
        resizable: true,
        width: 700,
        height: 500,
        modal: true,
        open: function(){
            $.ajax({
                type: "POST",
                url: "/get_agreement/",
                data: {lang: $("#id_browser_lang").val()},
                dataType: "html",
                success: function(result, textStatus, jqXHR){
                    window.id_agreement_modal.html(result.replace(/\n/g,"<br/>"));
                    window.id_agreement_modal.attr("disabled", "disabled");
                },
                error: function(xhr, ajaxOptions, thrownError){
                    console.log(thrownError);
                },
            });
            /*window.id_agreement_modal.load("/get_agreement/", {lang: $("#id_browser_lang").val()});*/
        },
        close: function(){
            window.opened = false;
        },
        buttons: buttons_trans,
        autoOpen: false,
    }); 

    
window.opened = false;
$("#id_show_hide_agreement").click(function(){
    if (! window.opened)
    {
        window.id_agreement_modal.dialog('open');
        window.opened = true;
        $("#id_agreement").removeAttr("disabled");
        }
    else
    {
        window.id_agreement_modal.dialog('close');
        window.opened = false;
        }
    });
}); 

