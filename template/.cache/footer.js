/*TMODJS:{"version":1,"md5":"ee87e95c6ce32ba4ce841491f49fcb78"}*/
template('footer',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,navs=$data.navs,$value=$data.$value,$index=$data.$index,active=$data.active,$escape=$utils.$escape,total_unread=$data.total_unread,$out='';$each(navs,function($value,$index){
$out+=' <a class="mui-tab-item ';
if(active==$value.id){
$out+=' mui-active ';
}
$out+='" data-href="';
$out+=$escape($value.url);
$out+='" data-login="true"> <span class="';
$out+=$escape($value.icon);
$out+=' background releative"> ';
if($value.id == 'msg' && total_unread > 0){
$out+=' <i class="weidu-hongdian weidu-hongdian-index absolute color-fff" id=\'';
$out+=$escape($value.id);
$out+='\'>';
$out+=$escape(total_unread);
$out+='</i> ';
}
$out+=' </span> <span class="mui-tab-label">';
$out+=$escape($value.title);
$out+='</span> </a> ';
});
return new String($out);
});