/*layui.use('form', function(){
  var form = layui.form;
  
  //各种基于事件的操作，下面会有进一步介绍
});*/

function getCookies(domain, name, callback) {
    chrome.cookies.get({"url": domain, "name": name}, function(cookie) {
        if(callback) {
            callback(cookie.value);
        }
    });
}
function GetQueryString(name) {var reg =new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i");var r =tablink.split("?")[1].match(reg);var context ="";if (r !=null) 
context =r[2];reg =null;r =null;return context ==null ||context =="" ||context =="undefined" ?"" :context;}

inRaffleTab=false;
chrome.tabs.getSelected(null,function(tab) {
    tablink = tab.url;
	console.log(tablink);
	//curlink=tablink;
	document.getElementById("link").innerHTML=tablink
curlink=document.getElementById("link").innerHTML;
var tlink2 = curlink.lastIndexOf("/");
var tlink3 = curlink.substring(tlink2 + 1, curlink.length);
if(tlink3.indexOf("?") != -1){
tlink = tlink3.split("?")[0];}
else{
tlink = tlink3;
}
//console.log(tlink);
if (curlink.indexOf(chrome.runtime.id+"/index.html") != -1 ){
document.getElementById("link").style="display:inline";
document.getElementById("link").innerHTML="<br>已在抽奖页面，可继续修改参数";//+tablink;
inRaffleTab=true;
dyid2=GetQueryString('dyid');
tlink=dyid2
document.getElementById("status").innerHTML="有效<br>动态ID："+dyid2;
typ=GetQueryString('type');
hjnumber=GetQueryString('hjnum');
level=GetQueryString('lvl');
chkCJH=GetQueryString('cjh');
TZF=false;TPL=false;TDZ=false;TGZ=false;
var typ=GetQueryString("type");
if (typ>=8 && typ<=15){TGZ=true};
if ((typ % 2) != 0 && typ<=15){TZF=true};
pltemp=[2,3,6,7,10,11,14,15];
//console.log(pltemp.find(ele => ele === 2));
if (pltemp.find(ele => ele == typ)){TPL=true};
dztemp=[4,5,6,7,12,13,14,15];
if (dztemp.find(ele => ele == typ)){TDZ=true};
document.getElementById("tzf").checked=TZF;
document.getElementById("tpl").checked=TPL;
document.getElementById("tdz").checked=TDZ;
document.getElementById("tgz").checked=TGZ;
document.getElementById('numb').value=hjnumber;
document.getElementById('lvl').value=level;
document.getElementById('cjh').valve=chkCJH;
document.getElementById("start").disabled=false;
}
if (!inRaffleTab && curlink.indexOf("t.bilibili.com") == -1 ){
document.getElementById("status").innerHTML="无效<br>请在动态页打开!";
}else{
document.getElementById("status").innerHTML="有效<br>动态ID："+tlink;
document.getElementById("start").disabled=false;
}
if (!inRaffleTab && tlink==""){
document.getElementById("status").innerHTML="无效<br>请在动态页打开!";
document.getElementById("start").disabled=true;
}});
$("#start").click(function(){
begin()
});
function begin(){
type=0
if(document.getElementById("tzf").checked){
type=type+1
}
if(document.getElementById("tpl").checked){
type=type+2
}
if(document.getElementById("tdz").checked){
type=type+4
}
if(document.getElementById("tgz").checked){
type=type+8
}
if (document.getElementById("numb").value<1){
	document.getElementById("numb").value='1';
}
if (inRaffleTab){
//window.location.href=
chrome.tabs.getSelected(null, function(tab){
    //console.log(tab);
chrome.tabs.update(tab.id, {
    url:"/index.html?type="+type+"&dyid="+dyid2+"&hjnum="+document.getElementById("numb").value+"&lvl="+document.getElementById("lvl").value+"&cjh="+document.getElementById("cjh").value
});});
}else{
window.open("/index.html?type="+type+"&dyid="+tlink+"&hjnum="+document.getElementById("numb").value+"&lvl="+document.getElementById("lvl").value+"&cjh="+document.getElementById("cjh").value)
}}