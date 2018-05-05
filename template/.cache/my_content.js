/*TMODJS:{"version":2,"md5":"bc61855afb62fd893ca5821edc07174f"}*/
template('my_content',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,user=$data.user,$out='';$out+='<style type="text/css"> </style> <ul class="mui-table-view padding-content"> <li class="mui-table-view-cell mui-media">  <img class="mui-media-object mui-pull-left qqImg" src="../images/cover.png" data-src=\'';
$out+=$escape(user.cover);
$out+='\' data-css=\'a50\' data-href="../tpl/personal.html"> <div class="mui-media-body" data-href="../tpl/personal.html"> <span>';
$out+=$escape(user.username);
$out+='</span> <p class=\'mui-ellipsis\'>手机：';
$out+=$escape(user.mobile);
$out+='</p> </div> <a href="#topPopover" class="mui-content-padded topPopover"> <img src="../images/benrenerweima.png" class="benrenerweima" /> </a>  </li> </ul>  <ul class="mui-table-view setting-caifu"> <li class="mui-table-view-cell caifufenlei"> <div class="border-right"> <span class="jinbi background"></span> <span>';
$out+=$escape(user.gold);
$out+='</span> </div> </li> <li class="mui-table-view-cell caifufenlei" data-href="../tpl/remind_list.html"> <div class="border-right"> <span class="lingsheng background"></span> <span id="remind">';
$out+=$escape(user.remind_count);
$out+='</span> </div> </li> <li class="mui-table-view-cell caifufenlei" data-href="../tpl/coupon.html"> <div class="border-right"> <span class="youhuiquan background"></span> <span>优惠券</span> </div> </li> </ul> <div id="topPopover" class="mui-popover" style="height: 379px;width: 100% !important;border-radius: 2px !important;background-color:transparent !important;"> <div class="mui-scroll-wrapper" style="margin-top: 0px; width: 255px;background: #FFFFFF;"> <div class="qrcode mui-scroll"> <div class="info" style="margin-top: 10px;"> <img src="../images/cover.png" data-src="';
$out+=$escape(user.cover);
$out+='" /> <div style="width: 125px !important;"> <span id="username" style="float: left;">';
$out+=$escape(user.username);
$out+='</span> ';
if(user.gender == '0'){
$out+=' <img src="../images/female.png" style="width: 13px !important;height: 14px !important;margin-top: 5px !important;" /> ';
}else{
$out+=' <img src="../images/male.png" style="width: 13px !important;height: 14px !important;margin-top: 5px !important;" /> ';
}
$out+=' <br /> <i id="address">北京&nbsp;朝阳<i> </div> </div> <!--http://test.zujimi.com/index.php?g=api&m=user&a=qrcode&type=user&id=';
$out+=$escape(user.id);
$out+='--> <img src="http://test.zujimi.com/index.php?g=api&m=user&a=qrcode&type=user&id=';
$out+=$escape(user.id);
$out+='" style="margin-top: 14px;"/> <p style="font-size: 14px;margin-top: 10px;">扫一扫上面的二维码图案,加我微信</p> </div> </div> </div> <div class="xiabanbufen-box"> <ul class="mui-table-view setting-caifu xiabanbufen"> <li class="mui-table-view-cell" data-href="../tpl/my_dynamic.html"> <a href="#" class="mui-navigate-right releative"> <span class="dongtai background"></span> <span>我的动态</span> <span class="zuixindongtai mui-pull-right releative">   </span> </a> </li> <li class="mui-table-view-cell" data-href="../tpl/my_activity.html"> <a class="mui-navigate-right"> <span class="huodong background"></span> <span>我的活动</span> </a> </li> </ul> <ul class="mui-table-view setting-caifu xiabanbufen"> ';
if(user.update != 1){
$out+=' <li class="mui-table-view-cell" data-href="../tpl/my_prop.html"> <a class="mui-navigate-right" id="my_prop" href="my_prop.html"> <span class="daoju background"></span> <span>我的道具</span> </a> </li> <li class="mui-table-view-cell" data-href="../tpl/shop.html"> <a class="mui-navigate-right"> <span class="shangdian background"></span> <span>商店</span> </a> </li> ';
}
$out+=' </ul> <ul class="mui-table-view setting-caifu xiabanbufen"> <li class="mui-table-view-cell" data-href="../tpl/saw_me.html"> <a class="mui-navigate-right"> <span class="shuikanguowo background"></span> <span>谁看过我</span> </a> </li> <li class="mui-table-view-cell" data-href="../tpl/privacy.html"> <a class="mui-navigate-right"> <span class="yinsishezhi background"></span> <span>隐私设置</span> </a> </li> </ul> <ul class="mui-table-view setting-caifu xiabanbufen"> <li class="mui-table-view-cell" data-href="../tpl/today_task.html"> <a class="mui-navigate-right"> <span class="jinrirenwu background"></span> <span>今日任务</span> </a> </li> </ul> </div>';
return new String($out);
});