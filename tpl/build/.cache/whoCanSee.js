/*TMODJS:{"version":1,"md5":"1691740d398e0d6147d44592c1666762"}*/
template('whoCanSee','<!DOCTYPE html> <html> <head> <meta charset="UTF-8"> <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" /> <title>谁可以看</title> <meta name="viewport" content="width=device-width, initial-scale=1,maximum-scale=1,user-scalable=no"> <meta name="apple-mobile-web-app-capable" content="yes"> <meta name="apple-mobile-web-app-status-bar-style" content="black"> <link href="../css/mui.min.css" rel="stylesheet" /> <link rel="stylesheet" href="../css/common.css" /> <link rel="stylesheet" href="../css/whoCanSee.css" /> <style type="text/css"> .mui-table-view-cell>a:not(.mui-btn){ padding: 6px 14px; } </style> </head> <body> <header class="mui-bar mui-bar-nav nav"> <span class="back mui-action-back background"></span> <h1 class="mui-title">谁可以看</h1> </header> <div class="mui-content"> <ul class="mui-table-view mui-table-view-radio mui-media"> <li class="mui-table-view-cell border-bottom"> <a class="mui-navigate-right"> <img class="mui-media-object mui-pull-left" src="../images/gongkai.png"> <div class="mui-media-body font_14"> 公开 <p class=\'mui-ellipsis\'>所有人可见</p> </div> </a> </li> <li class="mui-table-view-cell mui-selected border-bottom"> <a class="mui-navigate-right"> <img class="mui-media-object mui-pull-left" src="../images/friendCanSee.png"> <div class="mui-media-body"> 好友可见 <p class=\'mui-ellipsis\'>只有好友能看到</p> </div> </a> </li> <li class="mui-table-view-cell"> <a class="mui-navigate-right"> <img class="mui-media-object mui-pull-left" src="../images/simi.png" style="margin-right: 17px;display: inline-block;"> <div class="mui-media-body"> 私密 <p class=\'mui-ellipsis\'>只有自己可见</p> </div> </a> </li> </ul> </div> </body> <script src="../js/mui.min.js"></script> </html>');