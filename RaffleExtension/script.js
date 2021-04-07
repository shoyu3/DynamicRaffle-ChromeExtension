/*$(function(){
var opts = {
min_unit: 'ms',
isDate: true,
isRound: false,
split_sign: ':'
};
$("//tiemrId").timer("2011-12-19 18:00", opts);   
});*/

function GetQueryString(name) {var reg =new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i");var r =window.location.search.substr(1).match(reg);var context ="";if (r !=null) 
context =r[2];reg =null;r =null;return context ==null ||context =="" ||context =="undefined" ?"" :context;}

function outrb(){
var output=document.getElementById("emut").innerHTML
var a=output.substr(output.lastIndexOf('\n', output.lastIndexOf('\n') - 1) + 1);
//console.log(name);
var b = output.substring(output.lastIndexOf(a));  //这样就获取到了最后的'ba'
var c = output.substring(0,output.lastIndexOf(a)); //这样就获取到了前面的字符串。就可以随意的字符串拼写了。
//output=output.replace(name,'');
document.getElementById("emut").innerHTML=c;
}

function outrb2(){
var output=document.getElementById("emut").innerHTML
var b = output.substring(output.lastIndexOf('\n'));
var c = output.substring(0,output.lastIndexOf('\n'));
//output=output.replace(name,'');
document.getElementById("emut").innerHTML=c;
}

function repBool(value){
    if (value){
        val=value.toString().replace('true','√');////✔
    }else{
        val=value.toString().replace('false','X');////❌
	}
    return val
}

function _get_offset(data_json){
    //获取转发列表用
    if ('offset' in data_json['data']){
        return data_json['data']['offset']
    }else{
	return ''}
}

function getZF(dyn_id){
	$.ajaxSettings.async = false;
    print('Loading...');
	//console.log(dyn_id);
	/*
    dynamic_api = "http://api.vc.bilibili.com/dynamic_repost/v1/dynamic_repost/repost_detail"
    info = {
        "time": now_time(),
        "dyn_id": dyn_id
    }
    header={
    "User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/88.0.4324.182 Safari/537.36",
    }
    //首次数据获取*/
    offset = "1:0"
	var url='http://api.vc.bilibili.com/dynamic_repost/v1/dynamic_repost/repost_detail?dynamic_id='+dyn_id+'&offset='+offset;
	$.get(url,function(data,status){
    data_json = data;
    total_num = data['data']['total'];
	total_num = JSON.stringify(data['data']['total'])
    //info['total'] = total_num;
	});
    // 获取全部数据
    uidall=[]
    now_num = 0
    count = 0
    //users = []
    while (now_num < total_num){  //循环获取页面
        //param = {'dynamic_id': dyn_id, 'offset': offset}
        //data = httpsession.get(dynamic_api, headers=header, params=param)
		var url='http://api.vc.bilibili.com/dynamic_repost/v1/dynamic_repost/repost_detail?dynamic_id='+dyn_id+'&offset='+offset;
		$.get(url,function(data,status){
        data_json = data;//json.loads(data.text);
        //print(len(str(data_json)))
        /*for (i=0;i<=20;i++){  //获取单页的所有用户（最多20条）
            if (count < total_num){
                count++;
				console.log(count)
                try{
                    uid = data_json['data']['items'][i]['desc']['uid'];
                    uidall.push(uid);
					console.log(count+','+uid)
                    //outrb2();
                    curusr=uidall.length;
                    percent=(curusr/total_num*100).toFixed(2);
					//console.log(percent)
                    //BarProgress(40+15*float(curusr/total_num))
                    //print(str(percent)+'% ('+curusr+'/'+total_num+')');
                }catch{}
            }else{  //最后一页数量少于20时
		break}}*/
		times4=0;
		while (times4<data_json['data']['items'].length){
			//alert(times4+'.'+data_json['data']['items'].length);
			uid = data_json['data']['items'][times4]['desc']['uid'];
			uidall.push(uid);
			times4++;
		}
        offset = _get_offset(data_json);
        //if (offset==undefined){break}
        now_num += 20;
        //time.sleep(0.5)
		});
	}
    uidall.sort()
    try{
        //uidall.remove(myuid)
		uidall = uidall.filter((item)=>{
    return item !== upuid
	});
    }catch{}
    outrb()
    /*curusr=len(uidall)
    print('100.00% ('+str(curusr)+'/'+str(curusr)+')')*/
    uidall=unique(uidall)
print('转发收集完成，共有 '+uidall.length+' 位用户')
$.ajaxSettings.async = true;
from1='ZF';
    return uidall
}

function getPL(dyn_id){
	$.ajaxSettings.async = false;
    current_page = 1
    /*header={
    "User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/86.0.4324.182 Safari/537.36",
    }*/
    rid = dyinfo['card']['desc']['rid']
    link1 = 'http://api.bilibili.com/x/v2/reply?&jsonp=json&pn='
    link2 = '&type=11&oid='
    link3 = '&sort=2'//&_=1570498003332'
    //comment_list = []
    userlist_1=[]
    //pool = {}
    //r = gethtml(link1 + str(current_page) + link2 + str(rid) + link3, header)
	var url=link1 + current_page + link2 + rid + link3;
$.get(url,function(data,status){json_data = data;});
    //print(json_data)
    if (json_data['code']==-404){
        //outrb2()
        print('(评论获取切换模式二)')
        rid=dyn_id
        //print(rid)
        link2 = '&type=17&oid='
		var url=link1 + current_page + link2 + rid + link3;
		$.get(url,function(data,status){json_data = data;});
        //r = gethtml(link1 + current_page + link2 + str(rid) + link3, header)
        //json_data = json.loads(r)
        //print(json_data)
        if (json_data['code']==-404){
            print('获取评论失败,可能因为此动态没有除UP主自己的评论以外的评论呢')
	return false}
    if (json_data['code']==-412){
        print('获取评论失败，调取间隔过短，请过一段时间再试吧~')
	return false}}
    comments_num = json_data['data']['page']['count']
    pages_num = comments_num / 20 + 1
    print('Loading...')
    while (true){
        //r = gethtml(link1 + str(current_page) + link2 + str(rid) + link3, header)
        //json_data1 = json.loads(r)
			var url=link1 + current_page + link2 + rid + link3;
$.get(url,function(data,status){json_data1 = data;});
        //print(len(str(json_data1)))
        if (json_data1['data']['replies']){
            json_data1['data']['replies'].forEach(function (reply) {
				//console.log(reply);
                userlist_1.push(reply['member']['mid'])
                //outrb()
                curusr=userlist_1.length
                percent=(curusr/comments_num*100).toFixed(2);
                //BarProgress(55+15*float(curusr/comments_num))
			//print(str(percent)+'% ('+str(curusr)+'/'+str(comments_num)+')'
			});
        }
		current_page += 1
		//console.log(userlist_1.length)
        if (current_page > pages_num){
	break}}
    userlist_1.sort()
    try{
        //uidall.remove(myuid)
		userlist_1 = userlist_1.filter((item)=>{
    return item !== upuid
	});
    }catch{}
    outrb()
    /*curusr=len(userlist_1)
    print('100.00% ('+str(curusr)+'/'+str(curusr)+')')*/
    //RZOFF=false
    if (userlist_1.length==0){
        print('获取评论为空,可能因为此动态没有除UP主自己的评论以外的评论呢');
	return false}
	userlist_1=unique(userlist_1)
    print('评论收集完成，共有 '+userlist_1.length+' 位用户')
	$.ajaxSettings.async = true;
	from2='PL';
    return userlist_1.map(i => i / 1)
}

function likelisturl(page){
    return 'http://api.vc.bilibili.com/dynamic_like/v1/dynamic_like/spec_item_likes?dynamic_id='+dyid+'&pn='+page
}

function str(text){return ''+text}

function getDZ(dyid){
	$.ajaxSettings.async = false;
    print('Loading...')
    /*header={
    "User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/88.0.4324.182 Safari/537.36",
    }
    r=gethtml(likelisturl(1),header)*/
				var url=likelisturl(1);
$.get(url,function(data,status){userlist_dict=data;});
    jdata=userlist_dict['data']
    jlist=jdata['item_likes']
    totalfans=jdata['total_count']
    math2=Math.ceil(jdata['total_count']/20)*20-totalfans
    pages=Math.ceil(totalfans/20)
	times=1
    userlist_1=[]
    //notime=true
    likes=dyinfo['card']['desc']['like']
    while (times < pages+1){
        errortime=times
        /*r=gethtml(likelisturl(times), header)
        userlist_dict=json.loads(r)*/
		var url=likelisturl(times);
		$.get(url,function(data,status){userlist_dict=data;});
        jdata=userlist_dict['data']
        jlist=jdata['item_likes']
        times2=0
        //if (times != pages){
            while (times2<jlist.length){
				//try{
				//console.log(JSON.stringify(jlist[times2]));
				//console.log(pages+'|'+times+'|'+times2+'|'+math2);
                userlist_1.push(jlist[times2]['uid'])
				console.log(userlist_1.length+' '+jlist[times2]['uid']);
                times2=times2+1
                //outrb()
                //curusr=userlist_1.length
                //percent=(curusr/likes*100).toFixed(2);
                //print(str(percent)+'% ('+str(curusr)+'/'+str(likes)+')')
				//}catch{}
			}
        /*}else{
            while (times2<20-math2){
				//console.log(jlist[times2]+'--2')
                userlist_1.push(jlist[times2]['uid'])
                times2=times2+1
                //outrb()
                curusr=userlist_1.length
                percent=(curusr/likes*100).toFixed(2);
                //print(str(percent)+'% ('+str(curusr)+'/'+str(likes)+')')}
		}}*/
        times=times+1
	}
    userlist_1.sort()
    try{
        //uidall.remove(myuid)
		userlist_1 = userlist_1.filter((item)=>{
    return item !== upuid
	});
    }catch{}
    //notime=false
    outrb()
    //RZOFF=false
	userlist_1=unique(userlist_1)
    print('点赞收集完成，共有 '+userlist_1.length+' 位用户')
$.ajaxSettings.async = true;
from3="DZ";
    return userlist_1
}

function getRandomArrayElements(arr, count) {
    var shuffled = arr.slice(0), i = arr.length, min = i - count, temp, index;
    while (i-- > min) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
    }
    return shuffled.slice(min);
}

Array.intersect = function(arr1, arr2) {
  if(Object.prototype.toString.call(arr1) === "[object Array]" && Object.prototype.toString.call(arr2) === "[object Array]") {
    return arr1.filter(function(v){ 
     return arr2.indexOf(v)!==-1 
    }) 
  }
}

Array.prototype.remove = function(val) { 
var index = this.indexOf(val); 
if (index > -1) { 
this.splice(index, 1); 
} 
};

function checkGZ(mid){
    $.ajaxSettings.async = false;
	if (TGZ){
        url='http://api.bilibili.com/x/space/acc/relation?mid='+mid
        /*header={
        "User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/88.0.4324.182 Safari/537.36",
        "Cookie":cookie,
        }
        res = requests.get(url=url,headers=header)
        resback=json.loads(res.text)*/
		$.get(url,function(data,status){resback=data;
        usrinfo=resback['data'];})
        rinfo=resback['data']
        be_relation=rinfo['be_relation']['attribute']
        if (be_relation!=2 && be_relation!=6){
            if (noDisplayUser1){
                asterisknum=mid.length-3
                asterisks=''
                for (i;i<asterisknum;i++){
				asterisks=asterisks+'*'}
			mid=mid.substr(0,1)+asterisks+mid.substr(-2)}
            print('[UID:'+str(mid)+' 未关注('+str(be_relation)+')，无效]')
		return false}
		else{
		return true}
    }else{
return true}}

function checkCJH(mid,condition){
	$.ajaxSettings.async = false;
	if (GLCJH){
        //false为不通过
        raffle_count=0
        condition=condition
        url='http://api.vc.bilibili.com/dynamic_svr/v1/dynamic_svr/space_history?visitor_uid=0&host_uid='+str(mid)+'&offset_dynamic_id=0'
        /*header={
        "User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/88.0.4324.182 Safari/537.36",
        }
        res = requests.get(url=url,headers=header)
        res.encoding='utf-8'
        resback=json.loads(res.text)*/
		$.get(url,function(data,status){resback=data;
        usrinfo=resback['data'];})
        if (resback['code']==0){
            rinfo=resback['data']
            if (resback['code']!=0){
                print('检测抽奖号'+mid+'时出错，返回值为:'+resback['code'])
				return true}
            try{
                check_count=rinfo['cards'].length
            }catch{
                print('检测抽奖号'+mid+'时出错，无法获取到动态信息')
			return true}
            if (check_count>10){
			check_count=10}
            var times5=0
            while (times5<check_count){
                //print(rinfo['cards'][times5]['card'])
                dycont2=rinfo['cards'][times5]['card']
				try{
				//try{
					dycont3=JSON.parse(JSON.parse(dycont2)['origin'])['item']['description']
				//if (dycont3==undefined)
				//catch
				if (dycont3==undefined){
					dycont3=JSON.parse(JSON.parse(dycont2)['origin'])['item']['content']
				}}catch{dycont3='（获取失败）';}
				if (dycont3==undefined){dycont3='（获取失败）';}
				console.log(dycont3)
				//console.log(dycont2)
                if (CHKCJDT(dycont3)){
					raffle_count=raffle_count+1}
                var times5=times5+1
			}
        if (raffle_count > condition){
            if (noDisplayUser1){
                asterisknum=mid.length-3
                asterisks=''
                for (i;i<asterisknum;i++){
					asterisks=asterisks+'*'}
			mid=mid.substr(0,1)+asterisks+mid.substr(-2)}
            print('[UID:'+str(mid)+' 判定为抽奖号('+str(raffle_count)+'/'+str(condition)+')，无效]')
            return false
		}else{return true}}else{
		print('检测抽奖号'+mid+'时出错，获取动态信息时出现问题');return true}
    }else{
return true}}

function checklvl(mid, HJlvl){
 	$.ajaxSettings.async = false;
    if (GLlvl){
        url='http://api.bilibili.com/x/space/acc/info?mid='+str(mid)
        /*header={
        "User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/75.0.4324.182 Safari/537.36",
        }
        res = requests.get(url=url,headers=header)
        resback=json.loads(res.text)*/
		$.get(url,function(data,status){resback=data;
        usrinfo=resback['data'];})
        //usrinfo=resback.get('data')
        try{
            usrlvl=usrinfo['level']
        }catch{
            //print(res.text)
            print('获取UID:'+mid+'的等级信息出错，请自行查看!')
		return true}
        if (usrlvl<HJlvl){
            if (noDisplayUser1){
                asterisknum=mid.length-3
                asterisks=''
                for (i;i<asterisknum;i++){
					asterisks=asterisks+'*'}
			mid=mid.substr(0,1)+asterisks+mid.substr(-2)}
            print('[UID:'+mid+' 等级过低('+usrlvl+'/'+HJlvl+')，无效]')
            return false
        }else{
            return true
    }}else{
        return true
}}

function checkTJ(dycont){
 	$.ajaxSettings.async = false;
	//dycont=JSON.stringify(dycont).split("");
	//console.log(dycont)
	ZF=''
    PL=''
    DZ=''
    GZ=''
    if (dycont.indexOf('转')!= -1 || dycont.indexOf('转发')!=-1){
	ZF='转'}
    if (dycont.indexOf('评')!=-1 || dycont.indexOf('评论')!=-1 || dycont.indexOf('留言')!=-1){
	PL='评'}
    if (dycont.indexOf('赞')!=-1 || dycont.indexOf('点赞')!=-1){
	DZ='赞'}
    if (dycont.indexOf('关')!=-1 || dycont.indexOf('关注')!=-1){
        //if not '关于') && '关注'):
	GZ='关'}
    TJ=ZF+PL+DZ+GZ;
    if (CHKCJDT(dycont)!=false){
		console.log('这是抽奖动态');
        if (TJ!=''){
		return '参与条件：'+TJ+'(可能)'}
        else if(TJ='参与条件：关'){
		return '参与条件：未知'}else{
		return '参与条件：未知'}
    }else{
		console.log('这可能不是抽奖动态');
        return '(可能不是抽奖动态)'
	}
}

function CHKCJDT(dycont0){
	dycont0=dycont0.replace('\n','');
	//dycont0=JSON.stringify(dycont0).split("");
    /*cjkw1=dycont0.search(/[抽|奖]/g)
    cjkw2=dycont0.indexOf('抽') && dycont0.indexOf('送')
    cjkw3=dycont0.indexOf('关') && dycont0.indexOf('转')
    cjkw4=dycont0.indexOf('转') && dycont0.indexOf('评')
    cjkw5=dycont0.indexOf('转') && dycont0.indexOf('留言')
    cjkw6=dycont0.indexOf('转') && dycont0.indexOf('抽')
    cjkw7=dycont0.indexOf('评') && dycont0.indexOf('抽')
    cjkw8=dycont0.indexOf('赞') && dycont0.indexOf('抽')
    cjkw9=dycont0.indexOf('转') && dycont0.indexOf('送')
    cjkw10=dycont0.indexOf('评') && dycont0.indexOf('送')
    cjkw11=dycont0.indexOf('赞') && dycont0.indexOf('送')
    cjkwall=cjkw1 || cjkw2 || cjkw3 || cjkw4 || cjkw5 || cjkw6 || cjkw7 || cjkw8 || cjkw9 || cjkw10 || cjkw11*/
	cjkwall=dycont0.search(/(?=.*抽)(?=.*奖)^.*|(?=.*抽)(?=.*送)^.*|(?=.*关)(?=.*转)^.*|(?=.*转)(?=.*评)^.*|(?=.*转)(?=.*抽)^.*|(?=.*转)(?=.*留言)^.*|(?=.*转)(?=.*抽)^.*|(?=.*评)(?=.*抽)^.*|(?=.*赞)(?=.*抽)^.*|(?=.*转)(?=.*送)^.*|(?=.*评)(?=.*送)^.*|(?=.*赞)(?=.*送)^.*/g)
    //console.log(cjkwall);
	if (cjkwall==-1){cjkwall=false}else{cjkwall=true}
	console.log(cjkwall)
	return cjkwall
}

function unique(arr) {
    if (!Array.isArray(arr)) {
        console.log('type error!')
        return
    }
    var array =[];
    for(var i = 0; i < arr.length; i++) {
            if( !array.includes( arr[i]) ) {//includes 检测数组是否有某个值
                    array.push(arr[i]);
              }
    }
    return array
}

function print(text){
document.getElementById("emut").innerHTML=document.getElementById("emut").innerHTML+text+'\n';
document.getElementById("emut").scrollTop=document.getElementById("emut").scrollHeight;
}

function printh(text){
text='-----------------------------------\n'
document.getElementById("emut").innerHTML=document.getElementById("emut").innerHTML+text;
document.getElementById("emut").scrollTop=document.getElementById("emut").scrollHeight;
}

function getname(users){
 	$.ajaxSettings.async = false;
	var times3=0
    while (times3<users.length){
        var url='http://api.bilibili.com/x/space/acc/info?mid='+users[times3]
        /*header={
        "User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/75.0.4324.182 Safari/537.36",
        }
        res = requests.get(url=url,headers=header)
        resback=json.loads(res.text)*/
		$.get(url,function(data,status){resback=data;
        usrinfo=resback['data'];})
		//alert(times3);
        try{
            mid=usrinfo['mid']
            uname=usrinfo['name']
        }catch{
            //print(res.text)
            mid=(users[times3])
            uname='[获取失败]'
		}
        print((times3+1)+' '+uname+' (UID:'+mid+')')
		times3++;
	}
}

function rafflebegin(){
print('B站动态抽奖扩展 Beta0.3');
//print('测试2');
TZF=false;TPL=false;TDZ=false;TGZ=false;noDisplayUser1=false;
var typ=GetQueryString("type");
if (typ>=8 && typ<=15){TGZ=true};
if ((typ % 2) != 0 && typ<=15){TZF=true};
pltemp=[2,3,6,7,10,11,14,15];
//console.log(pltemp.find(ele => ele === 2));
if (pltemp.find(ele => ele == typ)){TPL=true};
dztemp=[4,5,6,7,12,13,14,15];
if (dztemp.find(ele => ele == typ)){TDZ=true};
TZF2=repBool(TZF)
TPL2=repBool(TPL)
TDZ2=repBool(TDZ)
TGZ2=repBool(TGZ)
from1='';from2='';from3='';
print('转发：'+TZF2+' 评论：'+TPL2+' 点赞：'+TDZ2+' 关注：'+TGZ2);//+'\n最低等级：'+str(HJlvl)+' 抽奖号阈值：'+str(CJHnum))
CJHnum=GetQueryString("cjh");
HJlvl=GetQueryString("lvl");
print('最低等级：'+HJlvl+' 抽奖号阈值：'+CJHnum);
if (CJHnum!=-1){
GLCJH=true
}else{
GLCJH=false}
if (HJlvl!=0){
GLlvl=true
}else{
GLlvl=false}
$.ajaxSettings.async = false;
//printh('<hr>')
myuid='';
if (TGZ){
		var url='http://api.bilibili.com/x/space/myinfo';
		$.get(url,function(data,status){resback=data;
        jdata=resback['data']})
        //print(r)
        try{
            myuid=jdata['mid']
            name=jdata['name']
            level=jdata['level']
            //coins=jdata['coins']
            //needexp=jdata['level_exp']['next_exp']-jdata['level_exp']['current_exp']
            //outrb()
            /*if DisplayLogInfo:
                print('模拟登录成功，UID:'+str(myuid)+'，详情如下\n'+name+'，Lv'+str(level)+'，粉丝数 '+str(jdata['follower'])+'，拥有 '+str(coins)+' 枚硬币')//用户名：'+name+'，等级 '+str(level)+'，拥有 '+str(coins)+' 枚硬币')
                //print('模拟登录成功：'+name+'(UID:'+str(myuid)+')，详情如下\n'+'Lv'+str(level)+'(还需'+needexp+')，粉丝数 '+str(jdata['follower'])+'，拥有 '+str(coins)+' 枚硬币')//用户名：'+name+'，等级 '+str(level)+'，拥有 '+str(coins)+' 枚硬币')
            else:*/
            print('已登录为：'+name+'(UID:'+myuid+')')//，用户名：')                
            isLogin=true
        }catch{
            try{
                if (userinfo_dict['code']==-412){
                    print('登录失败，请求间隔过短，请过一段时间后重试!')
				return false}
			}catch{}
            print('检测到未登录，请先在网页打开哔哩哔哩并登录!')
            return false
}}
printh()
$.ajaxSettings.async = true;
dyid=GetQueryString("dyid");
var url='https://api.vc.bilibili.com/dynamic_svr/v1/dynamic_svr/get_dynamic_detail?dynamic_id='+dyid;
$.get(url,function(data,status){
console.log(data);
obj=data;
//var obj = JSON.parse(data);
if (obj.code==0){
dyinfo=obj['data']
try{
var desc=dyinfo['card']['desc'];
}catch{
print("动态信息为空或不存在!");
return false
}
var unixTimestamp = new Date(dyinfo['card']['desc']['timestamp']*1000);sendTime = unixTimestamp.toLocaleString();
try{
dycont=JSON.parse(dyinfo['card']['card'])['item']['description'];
if (dycont==undefined){
	dycont=JSON.parse(dyinfo['card']['card'])['item']['content']
}}catch{dycont='(获取失败)'}
upuid=dyinfo['card']['desc']['user_profile']['info']['uid'];
//print(JSON.stringify(obj['data']))
print('动态ID：'+dyid+'\n'+checkTJ(dycont));
print('动态发送者：'+dyinfo['card']['desc']['user_profile']['info']['uname']);
print('浏览：'+dyinfo['card']['desc']['view']+'，转发：'+dyinfo['card']['desc']['repost']+'，评论：'+dyinfo['card']['desc']['comment']+'，点赞：'+dyinfo['card']['desc']['like']);       
print(dycont);//'正文：'+
print('发送时间：'+sendTime)
}
else if(obj.code==500207){
print("这条动态已不存在!");
return false
}
else{
print("运行出错，可能是输入的值有误!");
print("详细报错信息："+obj['message']);
return false
}
$.ajaxSettings.async = true;
printh('<hr>')

if (!TGZ && !TZF && !TPL && !TDZ){
print('需要至少选中一个获奖条件呢!');
return false
}
if (TGZ && !TZF && !TPL && !TDZ){
print('还需要选择除关注外的任一获奖条件呢!');
return false;
}
LBZF=[];
LBPL=[];
LBDZ=[];
Error=false;
try{
	lottdata=JSON.parse(dyinfo['card']['extension']['lott'])
	print('此动态已经存在官方抽奖功能!抽奖ID:'+lottdata['lottery_id'])
return false}catch{}
if (TGZ && upuid!=myuid){
	print('动态发送者('+dyinfo['card']['desc']['user_profile']['info']['uname']+')和当前已登录用户不一致!');
	return false;
}
print('<开始收集用户列表>\n<需要获取较多数据时可能会卡住，稍安勿躁>');
print('')
if (TZF){
if (dyinfo['card']['desc']['repost']==0){
print('这条动态没有任何用户转发!')
Error=true}
if (dyinfo['card']['desc']['repost']>600){
print('转发限制在600次以内!')
Error=true}
if (HJNUM>dyinfo['card']['desc']['repost']){
print('设置的获奖者总数大于这条动态的转发数!')
Error=true}}
if (TPL){
if (dyinfo['card']['desc']['comment']==0){
print('这条动态没有任何用户评论!')
Error=true}
if (dyinfo['card']['desc']['comment']>1000){
print('评论限制在1000条以内!')
Error=true}
if (HJNUM>dyinfo['card']['desc']['comment']){
print('设置的获奖者总数大于这条动态的评论数!')
Error=true}}
if (TDZ){
if (dyinfo['card']['desc']['like']==0){
print('这条动态没有任何用户点赞!')
Error=true}
if (dyinfo['card']['desc']['like']>2000){
print('点赞限制在2000个以内!')
Error=true}
if (HJNUM>dyinfo['card']['desc']['like']){
print('设置的获奖者总数大于这条动态的点赞数!')
Error=true}}
if (Error){
return false}

async function step2(dyid){
if (TZF){
print('正在获取完整转发列表……');//getZF(dyid);
$('body').oneTime('0.1s',function(){LBZF=getZF(dyid)});}
if (TPL){
print('正在获取完整评论列表……');//getPL(dyid);
$('body').oneTime('0.1s',function(){LBPL=getPL(dyid)});}
if (TDZ){
print('正在获取完整点赞列表……');//getDZ(dyid);
$('body').oneTime('0.1s',function(){LBDZ=getDZ(dyid)});}
}

$('body').oneTime('0.1s',function(){step2(dyid)});

console.log('1');
});
//rafflebegin();
FirstRun=true;
LB1ok=false;
LB2ok=false;
LB3ok=false;
from=''
if (TZF){
$('body').everyTime('1s','checkZF',function(){
	//console.log('ZF'+from)
if (from1=='ZF'){
	//console.log('转发获取好了'+LBZF);
	LB1ok=true;
	$('body').stopTime('checkZF');
	conti_1(1,0,0);
}
});
}
if (TPL){
$('body').everyTime('1s','checkPL',function(){
	//console.log('PL'+from)
if (from2=='PL'){
	//console.log('评论获取好了'+LBPL);
	LB2ok=true;
	$('body').stopTime('checkPL');
	conti_1(0,1,0);
}
});
}
if (TDZ){
$('body').everyTime('1s','checkDZ',function(){
	//console.log('DZ'+from)
if (from3=='DZ'){
	//.log('点赞获取好了'+LBDZ);
	LB3ok=true;
	$('body').stopTime('checkDZ');
	conti_1(0,0,1);
}
});
}
HJNUM=GetQueryString("hjnum");
/*
function conti_0(){
FirstRun=true;
}
conti_0();*/

LBALL=[]
HJMD=[]
function conti_1(A,B,C){
if (FirstRun){
	FirstRun=false;
	//lba=len(LBALL)
	//print('已获取到符合要求的参与者数量为：'+LBALL.length)
}

if (A==1){
	try{
		if (!LBZF){
		return false}
	}
	catch{}
	if (LBALL.length!=0){
		LBALL=Array.intersect(LBALL,LBZF)
	}else{
	LBALL=LBZF}
	LB1ok=true;
	}

if (B==1){
	try{
		if (!LBPL){
		return false}
	}
	catch{}
	if (LBALL.length!=0){
		LBALL=Array.intersect(LBALL,LBPL)
	}else{
	LBALL=LBPL}
	LB2ok=true;
	}

if (C==1){
	try{
		if (!LBDZ){
		return false}
	}
	catch{}
	if (LBALL.length!=0){
		LBALL=Array.intersect(LBALL,LBDZ)
	}else{
	LBALL=LBDZ}
	LB3ok=true;
	}

/*if (LB1ok && TZF){
	if (LB2ok && TPL){
		if (LB3ok && TDZ){
			conti_0();
			}
		}
	}else if (LB2ok && TPL){
		if (LB3ok && TDZ){
			conti_0();
			}
	}else if (LB3ok && TDZ){
		conti_0();
		}
	else*/
if (LB1ok && TZF && !TPL && !TDZ){conti_0();}
if (LB2ok && TPL && !TZF && !TDZ){conti_0();}
if (LB3ok && TDZ && !TZF && !TPL){conti_0();}
if (LB1ok && LB2ok && TZF && TPL && !TDZ){conti_0();}
if (LB2ok && LB3ok && TPL && TDZ && !TZF){conti_0();}
if (LB1ok && LB3ok && TZF && TDZ && !TPL){conti_0();}
if (LB1ok && LB2ok && LB3ok && TZF && TPL && TDZ){conti_0();}
}
}

function delOne(str, arr){
	var index = arr.indexOf(str);
	arr.splice(index,1)
return arr}

//$('body').oneTime('0.1s',function(){});
tm=1;
function getRaffle(){
	console.log('应该只有一次')
	var times=1;
	while (true){
		var zzz=LBALL.length < HJNUM
		if (!zzz){
			HJuser=getRandomArrayElements(LBALL, 1).toString()//这句是核心功能之一，随机从参与者数组里抽一位
			//alert/*(HJMD.length+HJNUM+times+*/(HJMD.length==HJNUM)
			if ($.inArray(HJuser,HJMD)==-1){
				//if (checkGZ(HJuser) && checkCJH(HJuser,CJHnum) && checklvl(HJuser,HJlvl)){
				$.ajaxSettings.async = true;
				if (checkGZ(HJuser) && checkCJH(HJuser,CJHnum) && checklvl(HJuser,HJlvl)){
					HJMD.push(HJuser)
					//LBALL.remove(HJuser)
					//print('[抽到UID:'+str(HJuser)+']')
					times++;
				}else{
				LBALL = delOne(HJuser,LBALL);
				//alert(LBALL.length)
				}
				console.log('调用第'+tm+'次：'+HJuser);
				tm=tm+1
				//alert('will break');
				return
			}
		}else{
			print('')
			print('警告：参与者列表人数已小于设定的获奖者数量!\n建议：修改或取消抽奖号过滤值，取消部分获奖条件')
			SHEXIT=true;
			break
			//alert(LBALL.length+HJNUM+times+SHEXIT)
}
	}}

function conti_0(){
print('\n已获取到符合要求的参与者数量为：'+LBALL.length)
if (HJNUM>LBALL.length || HJNUM<1){
	print('输入的获奖者数量('+HJNUM+')超出范围!')
	return false
}
//console.log(getRandomArrayElements(LBALL, HJNUM).toString());
SHEXIT=false;
console.log(LBALL);
while (true){
    	var times=1;
	while (true){
		var zzz=LBALL.length < HJNUM
		if (!zzz){
			HJuser=getRandomArrayElements(LBALL, 1).toString()//这句是核心功能之一，随机从参与者数组里抽一位
			//alert/*(HJMD.length+HJNUM+times+*/(HJMD.length==HJNUM)
			if ($.inArray(HJuser,HJMD)==-1){
				//if (checkGZ(HJuser) && checkCJH(HJuser,CJHnum) && checklvl(HJuser,HJlvl)){
				$.ajaxSettings.async = true;
				TA=checkGZ(HJuser)
				TB=checkCJH(HJuser,CJHnum)
				TC=checklvl(HJuser,HJlvl)
				if (TA && TB && TC){
					HJMD.push(HJuser)
					//LBALL.remove(HJuser)
					//print('[抽到UID:'+str(HJuser)+']')
					times++;
				}else{
				//LBALL = 
				LBALL.remove(Number(HJuser));
				//alert(LBALL.length)
				}
				console.log('调用第'+tm+'次：'+HJuser+'['+LBALL+']['+HJMD+']');
				tm=tm+1
				//alert('will break');
				//SHEXIT=true;
				break

			}
		}else{
			print('')
			print('警告：参与者列表人数已小于设定的获奖者数量!\n建议：修改或取消抽奖号过滤值，取消部分获奖条件')
			SHEXIT=true;
			break
			//alert(LBALL.length+HJNUM+times+SHEXIT)
}
	}
	//alert('once');
	if (SHEXIT==true){
		//alert('exit');
	return}
	//alert('pause'+HJMD.length+HJNUM)
	if (HJMD.length==HJNUM || HJMD.length>HJNUM){break;}
}
//HJMD.sort()
//random.shuffle(HJMD)
print('抽取完成!')
print('获奖名单：(以UID为准)')
//BarProgress(90)
printh('<hr>')
getname(HJMD)
printh('<hr>')
}
rafflebegin();