/*TMODJS:{"version":1,"md5":"583638eb23a2b0badd6e40f872f87b2f"}*/
template('person_home','<!DOCTYPE html> <html> <head> <meta charset="UTF-8"> <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" /> <title class="i18n" name=\'title\'>个人主页</title> <meta id="i18n_pagename" content="index-common"> <link href="../css/mui.min.css" rel="stylesheet" />  <link rel="stylesheet" type="text/css" href="../css/person_home.css" /> <link rel="stylesheet" type="text/css" href="../css/voice.css" /> <link href="../css/mui.picker.css" rel="stylesheet" /> <link href="../css/mui.poppicker.css" rel="stylesheet" /> <style type="text/css"> .mui-poppicker { background-color: #EEEEEE !important; } #topPopover { position: fixed; top: 16px; right: 6px; } #topPopover .mui-popover-arrow { left: auto; right: 6px; } .mui-popover { height: 30px; width: 70px; background-color: #fff !important; } .mui-popover p{ margin-top: 5px; text-align: center; background-color: rgba(255,255,255,0); } .mui-popover .mui-popover-arrow:after{ width: 14px; height: 14px; background-color: #fff !important; } </style> </head> <body> <header class="mui-bar mui-bar-nav" id="header"></header> <div id="topPopover" class="mui-popover">      <p>举报</p>     </div> <div class="mui-content" style="position: relative;">  <div id="mui-content" style="margin-bottom: 0;"></div> <div id="comment_one" style="margin-bottom: 60px;"></div> <div id="comment_tan_box" style="position: fixed;bottom: 0px;width: 100%;display: none;z-index: 300;"></div> <div style="width: 100%;height: 100%;position: fixed;top:0;z-index: 100;background-color: rgba(0,0,0,0.5);display: none;" id="mask_comment"></div> </div> </body> <script src="../js/jquery-2.1.1.min.js"></script>  <script src="../js/jquery.i18n.properties-min-1.0.9.js"></script> <script src="../js/mui.min.js"></script> <script src="../js/audio.js"></script> <script src="../js/mui.picker.min.js"></script> <script src="../js/mui.poppicker.js"></script> <script src="../js/cache.js"></script> <script src="../js/zs.js"></script> <script src="../template/person_home.min.js"></script> <script src="../js/person_home.js"></script> <script type="text/javascript" charset="utf-8"> new zs.Init(\'PersonHome\'); </script> </html>');