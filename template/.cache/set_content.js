/*TMODJS:{"version":1,"md5":"043d0bfa52528ae01f626ffb45ecb05c"}*/
template('set_content',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,user=$data.user,$out='';$out+='<ul class="mui-table-view padding-content"> <li class="mui-table-view-cell mui-media">  <img class="mui-media-object mui-pull-left" data-src=\'';
$out+=$escape(user.cover);
$out+='\' data-css=\'a50\' src="../images/wanghongmei.png"> <div class="mui-media-body"> <span>';
$out+=$escape(user.username);
$out+='</span> <p class=\'mui-ellipsis\'>手机：';
$out+=$escape(user.mobile);
$out+='</p> <a href="#topPopover" class="mui-content-padded"> <img src="../images/benrenerweima.png" class="benrenerweima" /> </a> </div>  </li> </ul>  <ul class="mui-table-view setting-caifu"> <li class="mui-table-view-cell caifufenlei"> <div class="border-right"> <span class="jinbi background"></span> <span>';
$out+=$escape(user.gold);
$out+='</span> </div> </li> <li class="mui-table-view-cell caifufenlei"> <div class="border-right"> <span class="lingsheng background"></span> <span>0</span> </div> </li> <li class="mui-table-view-cell caifufenlei"> <div class="border-right"> <span class="youhuiquan background"></span> <span>0</span> </div> </li> <li class="mui-table-view-cell caifufenlei"> <div> <span class="yangshengqi background"></span> <span>0</span> </div> </li> </ul>';
return new String($out);
});