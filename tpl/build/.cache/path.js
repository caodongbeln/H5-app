/*TMODJS:{"version":1,"md5":"25807a4ac3e37f21c384697c1753c03e"}*/
template('path','<!DOCTYPE html> <html> <head> <meta charset="UTF-8"> <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" /> <title></title> <link rel="stylesheet" type="text/css" href="../css/path.css" /> </head> <body bgcolor="#007AFF"> <a class="flyout-btn" href="#" title="Toggle"><span>Toggle</span></a> <div class="flyout-content"> <div class="flyout-wrap"> <ul class="flyout flyout-init"> <li><a href="#"><span>找免费向导</span></a></li> <li><a href="#"><span>找免费住宿</span></a></li> <li><a href="#"><span>找结伴</span></a></li>  </ul> </div> </div> </body> <script src="../js/jquery-2.1.1.min.js"></script> <script src="../js/path2.js"></script> <script src="../js/mui.min.js"></script> <script src="../js/cache.min.js"></script> <script src="../js/zs.js"></script> <script> mui.plusReady(function() { mui.each(document.querySelectorAll("img"), function(i, item) { var url=item.getAttribute(\'data\'); if(!zs.File)zs.File = new zs.fileClass(\'image\'); zs.File.get(url,function(uri){ item.src=uri; }); }); }); </script>  </html>');