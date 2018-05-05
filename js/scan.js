/*!
 * =====================================================
 * zs v1.0.0 ()
 * =====================================================
 */
!
function(mui, zs) {
	zs.ScanPage = zs.UserPage.extend({
		tag: '_scan', //页面缓存标记
		initPage: function() {},
		initEvent: function() {
			var ws = null,
				wo = null;
			var scan = null,
				domready = false;
			// H5 plus事件处理
			function plusReady() {
				if (ws || !window.plus || !domready) {
					return;
				}
				// 获取窗口对象
				ws = plus.webview.currentWebview();
				wo = ws.opener();
				scan = new plus.barcode.Barcode('bcid');
					scan.onmarked = onmarked;
					scan.start({
						conserve: true,
						filename: "_doc/barcode/"
					});
				/*// 开始扫描
				ws.addEventListener('show', function() {
					alert(11);
					scan = new plus.barcode.Barcode('bcid');
					scan.onmarked = onmarked;
					scan.start({
						conserve: true,
						filename: "_doc/barcode/"
					});
				});*/
				// 显示页面并关闭等待框
				ws.show("pop-in");
				//wo.evalJS("closeWaiting()");
			}
			if (window.plus) {
				plusReady();
			} else {
				document.addEventListener("plusready", plusReady, false);
			}
			// 监听DOMContentLoaded事件
			document.addEventListener("DOMContentLoaded", function() {
				domready = true;
				plusReady();
			}, false);
			// 二维码扫描成功
			function onmarked(type, result, file) {
				switch (type) {
					case plus.barcode.QR:
						type = "QR";
						break;
					case plus.barcode.EAN13:
						type = "EAN13";
						break;
					case plus.barcode.EAN8:
						type = "EAN8";
						break;
					default:
						type = "其它" + type;
						break;
				}
				
				var result = getJsUrl(result);
				var params = {
					data_id: result["id"],
					type: result["type"],
					source:2
				};
			mui.plusReady(function() {
				if(result["type"] == 'user'){
					if(result['id'] == zs.User.isLogin()){
						zs.toast( "你不能加自己为好友");
						return;
					}
					zs.Api.post('friend', 'is_friend', {
						fid: result['id'],
						uid: zs.User.isLogin()
					}, function(result) {
						if (result.data == 1) {
							zs.toast( "已是好友");
						}else{
							var urls ='../tpl/stranger_default.html';
							var id='stranger_default';
							setTimeout(function() {
								var ws = plus.webview.currentWebview();
								plus.webview.close(ws);
							}, 1500);
							mui.openWindow({
								url: urls,
								id: id,
								extras: params,
								createNew: true
							});	
						}
					})					
				}					
			});
			}
			//解析url
			function getJsUrl(url) {

				var array = []

				var str = url;				
				var parastr = str.split("?")[1];

				var arr = parastr.split("&");

				for (var i = 0; i < arr.length; i++) {

					array[arr[i].split("=")[0]] = arr[i].split("=")[1];

				}
			
				return array;

			}
			// 从相册中选择二维码图片 
			function scanPicture() {
				plus.gallery.pick(function(path) {
					plus.barcode.scan(path, onmarked, function(error) {
						plus.nativeUI.alert("无法识别此图片");
					});
				}, function(err) {
					plus.nativeUI.alert("Failed: " + err.message);
				});
			}
			document.getElementById('back').addEventListener('tap', function() {
				back();
			})
			document.getElementById('scan').addEventListener('tap', function() {
				scanPicture();
			})
		},
		initBack: function() {},
	});
}(mui, zs);