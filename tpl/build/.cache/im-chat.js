/*TMODJS:{"version":1,"md5":"79bab74c6a6e6f144d7f4cccfd46898a"}*/
template('im-chat','<!DOCTYPE html> <html> <head> <meta charset="utf-8"> <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" /> <title></title> <link href="../css/mui.min.css" rel="stylesheet" /> <link rel="stylesheet" type="text/css" href="../css/common.css" /> <link href="../css/mui.imageviewer.css" rel="stylesheet" /> <link rel="stylesheet" href="../css/im-chat.css" /> <style type="text/css"> </style> </head> <body contextmenu="return false;"> <header class="mui-bar mui-bar-nav"> <a class="mui-icon-left houtui_white mui-action-back"></a> <h1 class="mui-title" id=\'conversationTitle\'>chat (聊天窗口)</h1> </header> <div class="activity_num" style="position:absolute;top: 0px;width: 100%;background-color: #fff;"> <img class="user-img" src="../images/logo.png" alt="" /> <div class="activity-title"> <lable id=\'conversationTitles\'></lable> <a class="mui-icon mui-icon-arrowright mui-pull-right" style="color: #666;margin-top: 8px;margin-right: 3px;"></a> </div>  </div> <pre id=\'h\'></pre> <script id=\'msg-template\' type="text/template"> <% for(var i in record){ var item=record[i]; %> <div class="msg-item <%= (item.sender==\'self\'?\' msg-item-self\':\'\') %>" msg-type=\'<%=(item.type)%>\' msg-content=\'<%=(item.content)%>\'> <% if(item.sender==\'self\' ) { %>  <img class="user-img user-self" src="../images/logo.png"/> <% } else { %>  <img class="user-img" src="../images/logo.png" alt="" /> <% } %>  <div class="msg-content" style="margin-left: 0px;border: none;" > <div class="msg-content-inner" > <% if(item.type==\'text\' ) { %> <%=( item.content|| \'&nbsp;&nbsp;\') %> <% } else if(item.type==\'image\' ) { %> <img class="msg-content-image" src="<%=(item.content)%>" style="max-width: 100px;" /> <% } else if(item.type==\'sound\' ) { %> <span class="mui-icon mui-icon-mic" style="font-size: 18px;font-weight: bold;"></span> <span class="play-state">点击播放</span> <% } %> </div> <div class="msg-content-arrow" style="border: none;"></div> </div> <div class="mui-item-clear"></div> </div> <% } %> </script> <div class="mui-content" style="padding-top: 98px;"> <div id=\'msg-list\'> </div> </div> <footer> <div class="footer-left"> <i id=\'msg-image\' class="im-camera"></i> </div> <div class="footer-center"> <textarea id=\'msg-text\' type="text" class=\'input-text\'></textarea> <button id=\'msg-sound\' type="button" class=\'input-sound\' style="display: none;">按住说话</button> </div> <label for="" class="footer-right"> <i id=\'msg-type\' class="im-Microphone mui-icon-mic"></i> </label> </footer> <div id=\'sound-alert\' class="rprogress"> <div class="rschedule"></div> <div class="r-sigh">!</div> <div id="audio_tips" class="rsalert">手指上滑，取消发送</div> </div> <script src="../js/mui.min.js"></script> <script src=\'../js/jquery-2.1.1.min.js\'></script> <script src="../js/mui.imageViewer.js"></script> <script src="../js/arttmpl.js"></script> <script src="http://res.websdk.rongcloud.cn/RongIMClient-0.9.11.min.js"></script> <script src="http://res.websdk.rongcloud.cn/RongIMClient.voice-0.9.1.min.js"></script> <script src="http://res.websdk.rongcloud.cn/RongIMClient.emoji-0.9.2.min.js"></script> <script src="../js/jquery.i18n.properties-min-1.0.9.js"></script> <script src="../js/cache.js"></script> <script src="../js/zs.js"></script> <script src="../js/in_chat.js"></script> <script type="text/javascript" charset="utf-8"> new zs.Init(\'Inchat\'); </script> </body> </html>');