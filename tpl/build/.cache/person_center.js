/*TMODJS:{"version":1,"md5":"44a76aa4decd15e04c54567a5b4ce9e6"}*/
template('person_center','<!DOCTYPE html> <html> <head> <meta charset="UTF-8"> <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" /> <title class="i18n" name=\'title\'>个人中心</title> <meta id="i18n_pagename" content="index-common"> <script src="../js/mui.min.js"></script> <link href="../css/mui.min.css" rel="stylesheet" /> <link rel="stylesheet" href="../css/index.css" /> <link rel="stylesheet" type="text/css" href="../css/path.css"/> <link rel="stylesheet" type="text/css" href="../css/person-info.css" /> </head> <body> <header class="mui-bar mui-bar-nav" id="header"> <h1 class="mui-title">个人中心</h1> <a class="mui-icon mui-icon-gear mui-pull-right"></a> </header>  <div class="mui-content" style="" id="zhuti"></div> </body> <script src="../js/jquery-2.1.1.min.js"></script>  <script src="../js/jquery.i18n.properties-min-1.0.9.js"></script> <script src="../js/mui.min.js"></script> <script src="../js/cache.js"></script> <script src="../js/zs.js"></script> <script src="../template/person_center.min.js"></script> <script src="../js/PersonCenter.js" type="text/javascript" charset="utf-8"></script> <script type="text/javascript" charset="utf-8"> new zs.Init(\'PersonCenter\'); document.getElementById(\'header\').addEventListener(\'tap\',function(){ mui.openWindow({ url:\'account_set.html\', id: \'account_set\' }) }) </script> <script type="text/javascript" src="../js/path.js" ></script> </html>');