
function checkExistence(phonenumber)
{
    document.getElementById('btnDevam').disabled = true;
    var jet = ' ';
    try {
    jet = document.getElementById('jetonParam').value;}
    catch (err) {}
    if(phonenumber == "")
    {
        return;
    }

    if(phonenumber.charAt(0) == '+')
    {
        phonenumber = phonenumber.replace(phonenumber.charAt(0), "p");
    }
    var xmlhttp;
    document.getElementById('loading').style.visibility = 'visible';
    if (window.XMLHttpRequest) xmlhttp=new XMLHttpRequest();
    else xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");

    xmlhttp.onreadystatechange=function()
    {
        if(xmlhttp.readyState==4 && xmlhttp.status==200)
        {
            eval("var response = ("+xmlhttp.responseText+")");
                //alert(xmlhttp.responseText);
            if(response.isExists == 'y')
            {
                var a = gettext("An account associated with this phone number have been created.");
                a += gettext(" Do you want to delete this account and create new one?");
                var answer = confirm(a);
                if(answer == true)
                {
                    var xmlhttp2;
                    var xmlhttp3;
                    if (window.XMLHttpRequest) xmlhttp2=new XMLHttpRequest();
                    else xmlhttp2=new ActiveXObject("Microsoft.XMLHTTP");
                    xmlhttp2.onreadystatechange=function()
                    {
                        if(xmlhttp2.readyState==4 && xmlhttp2.status==200)
                        {
                            eval("var response2 = ("+xmlhttp2.responseText+")");
                            document.getElementById('loading').style.visibility = 'hidden';
                            document.getElementById('errAndSucc').innerHTML = response2.message;
                            document.getElementById('btnDevam').disabled = false;
                            $('#mobileSale').submit();
                            return true;
                            }
                        }
                    document.getElementById('btnDevam').disabled = false;
                    var dataString = '?answer=true&phonenumber='+phonenumber;
                    var url = location.protocol + '//' + window.location.host + '/checkUserExistence/' + dataString;
                    xmlhttp2.open("POST", url, false);
                    xmlhttp2.send();
                    }
                else window.location= location.protocol + '//' + window.location.host + '/login/';
                }
            else
            {
                document.getElementById('loading').style.visibility = 'hidden';
                var gsm = $('#id_phonenumber').val();
                var xmlhttp4;
                if (gsm != '5xxxxxxxxx') 
                {
                    $('#mobileSale').submit();
                    return true;
                    }
                else 
                {
                    $.modal(gettext('Please enter your cell phone number like this: 5xx1234567'));
                    document.getElementById('btnDevam').disabled = false;
                    return false;
                    }
                }
            }
        }
                
    if (jet == 'jet')
    {
        url = location.protocol + '//' + window.location.host + '/checkUserExistence/?phonenumber=' + phonenumber + '&jet=1';
        }
    else url = location.protocol + '//' + window.location.host + '/checkUserExistence/?phonenumber=' + phonenumber;
    xmlhttp.open("GET", url, false);
    xmlhttp.send();
    }
