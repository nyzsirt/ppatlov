function ready(){ // onload
    TargetDate = new Date({{user.expiration_period.year}},{{user.expiration_period.month}}-1,{{user.expiration_period.day}},{{user.expiration_period.hour}},{{user.expiration_period.minute}},{{user.expiration_period.second}});
    FromDate = new Date("{% now "m/j/Y H:i" %}"); //server time
    DisplayFormat = "%%D%% ";
	DisplayFormat += gettext('Days');
	DisplayFormat += ", %%H%% ";
	DisplayFormat += gettext('Hours');
	DisplayFormat += ", %%M%% ";
	DisplayFormat += gettext('Minutes');
	DisplayFormat += ", %%S%% ";
	DisplayFormat += gettext('Seconds');
	DisplayFormat += ".";
    FinishMessage = gettext("Your account expired");
    
    baslat();
}


/*
Author: Robert Hashemian
http://www.hashemian.com/

You can use this code in any manner so long as the author's
name, Web address and this disclaimer is kept intact.
********************************************************
Usage Sample:

<script language="JavaScript">
TargetDate = "12/31/2020 5:00 AM";
BackColor = "palegreen";
ForeColor = "navy";
CountActive = true;
CountStepper = -1;
LeadingZero = true;
DisplayFormat = "%%D%% Days, %%H%% Hours, %%M%% Minutes, %%S%% Seconds.";
FinishMessage = "It is finally here!";
</script>
<script language="JavaScript" src="http://scripts.hashemian.com/js/countdown.js"></script>
*/
var SetTimeOutPeriod =0

function calcage(secs, num1, num2) {
  s = ((Math.floor(secs/num1))%num2).toString();
  if (LeadingZero && s.length < 2)
    s = "0" + s;
  return "<b>" + s + "</b>";
}

function CountBack(secs) {
  if (secs < 0) {
    document.getElementById("cntdwn").innerHTML = FinishMessage;
    return;
  }
  DisplayStr = DisplayFormat.replace(/%%D%%/g, calcage(secs,86400,100000));
  DisplayStr = DisplayStr.replace(/%%H%%/g, calcage(secs,3600,24));
  DisplayStr = DisplayStr.replace(/%%M%%/g, calcage(secs,60,60));
  DisplayStr = DisplayStr.replace(/%%S%%/g, calcage(secs,1,60));

  document.getElementById("cntdwn").innerHTML = DisplayStr;
  if (CountActive)
    setTimeout("CountBack(" + (secs+CountStepper) + ")", SetTimeOutPeriod);
}

function putspan(backcolor, forecolor) {
 document.write("<span id='cntdwn' style='background-color:" + backcolor + 
                "; color:" + forecolor + "'></span>");
}

function baslat(){

if (typeof(BackColor)=="undefined")
  BackColor = "white";
if (typeof(ForeColor)=="undefined")
  ForeColor= "black";
if (typeof(TargetDate)=="undefined")
  TargetDate = "12/31/2020 5:00 AM";
if (typeof(FromDate)=="undefined")
  FromDate = new Date();
if (typeof(DisplayFormat)=="undefined")
  DisplayFormat = "%%D%% Days, %%H%% Hours, %%M%% Minutes, %%S%% Seconds.";
if (typeof(CountActive)=="undefined")
  CountActive = true;
if (typeof(FinishMessage)=="undefined")
  FinishMessage = "";
if (typeof(CountStepper)!="number")
  CountStepper = -1;
if (typeof(LeadingZero)=="undefined")
  LeadingZero = true;



CountStepper = Math.ceil(CountStepper);
if (CountStepper == 0)
  CountActive = false;
SetTimeOutPeriod = (Math.abs(CountStepper)-1)*1000 + 990;
//putspan(BackColor, ForeColor);
var dthen = TargetDate;
var dnow = FromDate;
if(CountStepper>0)
  ddiff = new Date(dnow-dthen);
else
  ddiff = new Date(dthen-dnow);
gsecs = Math.floor(ddiff.valueOf()/1000);
CountBack(gsecs);

}



