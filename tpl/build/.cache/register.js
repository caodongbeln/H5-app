/*TMODJS:{"version":1,"md5":"99170ff805fd539ab85903fd628e3ab6"}*/
template('register','<!DOCTYPE html> <html> <head> <meta charset="UTF-8"> <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" /> <title class="i18n" name=\'title\'>注册</title> <link href="../css/mui.min.css" rel="stylesheet" /> <meta id="i18n_pagename" content="index-common"> <link rel="stylesheet" type="text/css" href="../css/common.css" /> <link rel="stylesheet" type="text/css" href="../css/auth.css" /> <style type="text/css"> @media only screen and (min-width: 323px) and (max-width: 373px) { .login-selected-country div { margin-right: 0; height: 52px; line-height: 52px; margin-top: 0; min-width: 58px; } } </style> </head> <body> <div class="mui-content"> <div class="login-welcome"> 我在等你 <p>拥抱世界各国与您语言相通的向导+游客+活动</p> </div> <ul id=\'op_type\' class="mui-table-view mui-grid-view mui-grid-9 login-type"> <li class="mui-table-view-cell mui-media mui-col-xs-6"> <input type="button" name="come" id="mobile_type" value="手机号注册" class="selected" /> </li> <span></span> <li class="mui-table-view-cell mui-media mui-col-xs-6"> <input type="button" name="go" id="mail_type" value="邮箱注册" /> </li> </ul>  <div class="login-input mui-hidden" id=\'mail_area\'> <input id= \'mail\' type="text" placeholder="邮箱" /> </div>  <div id=\'mobile_area\'> <div class="login-selected-country margin" id="countryList" data-href=\'chooseCountry.html\' data-view=\'chooseCountry\'> 国家/地区 <div class="mui-pull-right"><span id="country">中国</span> <a class="mui-icon mui-icon-arrowright"></a> </div> </div> <div class="login-phone-number margin"> <span id=\'prefix\'>+86</span><input type="number" placeholder="输入手机号" id="mobile" /> </div> <div class="register-phone-number margin"> <input type="number" placeholder="输入验证码" id="sms_input" /><span id="sms_code">发送验证码</span> </div> </div> <div class="login-phone-number margin"> <input type="password" placeholder="密码" class="phone-password" id="password" /> </div> <input type="button" value="注 册" class="login-btn" id="reg" /> <div class="register-account-password"> <span>注册即代表认可<a>协议</a></span> <span id="login" data-href=\'login.html\' data-view=\'login\'>登&nbsp;录</span> </div> <div class="Third-party-login margin"> <input type="button" value="微信登录" /> <input type="button" value="Facebook登录" /> </div> </div> </body> <script src="../js/jquery-2.1.1.min.js"></script>  <script src="../js/jquery.i18n.properties-min-1.0.9.js"></script> <script src="../js/mui.min.js"></script> <script src="../js/cache.js"></script> <script src="../js/zs.js"></script> <script src="../js/register.js"></script> <script type="text/javascript" charset="utf-8"> new zs.Init(\'Register\'); </script> </html>');