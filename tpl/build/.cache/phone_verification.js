/*TMODJS:{"version":1,"md5":"de81f870406b2546b783a8a2c8abeaf7"}*/
template('phone_verification','<!DOCTYPE html> <html> <head> <meta charset="UTF-8"> <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" /> <title>手机验证</title> <link href="../css/mui.min.css" rel="stylesheet" /> <link rel="stylesheet" href="../css/common.css" /> <link rel="stylesheet" type="text/css" href="../css/header_dark.css" /> <link rel="stylesheet" type="text/css" href="../css/identity_authentication.css" /> <link rel="stylesheet" href="../css/btn_bottom.css" /> <link rel="stylesheet" href="../css/phone_verification.css" /> <style type="text/css"> input::-webkit-input-placeholder { /* WebKit browsers */ font-size: 14px; } :-moz-placeholder { /* Mozilla Firefox 4 to 18 */ font-size: 14px; } input::-moz-placeholder { /* Mozilla Firefox 19+ */ font-size: 14px; } :-ms-input-placeholder { /* Internet Explorer 10+ */ font-size: 14px; } </style> </head> <body> <header class="mui-bar mui-bar-nav"> <h1 class="mui-title index_listWhiteColor font_17">手机验证</h1> <a class="mui-pull-left houtui_white mui-action-back"></a> </header> <div class="mui-content"> <ul class="mui-table-view"> <li class="mui-table-view-cell"> <a class="mui-navigate-right"> 国家/地区 <span>中国</span> </a> </li> <li class="mui-table-view-cell"> <label for="">+86</label> <input type="text" placeholder=" 输入手机号" class="font_14 phone" id=\'mobile\'/> </li> <li class="mui-table-view-cell"> <input type="text" placeholder="输入验证码" class="font_14 codes" id=\'code\'/> <span id=\'sms_code\'>获取验证码</span> </li> </ul> </div> <div class="btnBox"><div class="mui-btn mui-btn-block" id="renz">提交验证</div></div> </body> <script src="../js/jquery-2.1.1.min.js" type="text/javascript" charset="utf-8"></script> <script src="../js/mui.min.js"></script> <script src="../js/mui.picker.min.js"></script> <script src="../js/mui.poppicker.min.js"></script> <script src="../js/city.data.js" type="text/javascript" charset="utf-8"></script>  <script src="../js/jquery.i18n.properties-min-1.0.9.js"></script> <script src="../js/cache.js"></script> <script src="../js/zs.js"></script> <script src="../js/phone_identity.js" type="text/javascript" charset="utf-8"></script> <script type="text/javascript" charset="utf-8"> new zs.Init(\'Phoneidentity\'); </script> </html>');