/*!
 * =====================================================
 * zs v1.0.0 ()
 * =====================================================
 */
!
function(mui, zs) {
	zs.ReleaseTheDynamicPage = zs.UserPage.extend({
		choosePoint: null,
		initPage: function() {
			//调用地图定位
			zs.Location.getCurrentPosition(function(r) {
				$('#location').html(r.addresses);
				$('#location').attr('lng', r.coords.longitude);
				$('#location').attr('lat', r.coords.latitude);
			})
		},
		initEvent: function() {
			var cls = this;

			mui.plusReady(function() {

				/**
				 * 添加图片
				 **/
				var lastButton = document.getElementById('last');
				//var index = 1;
				//var files = new Array();
				lastButton.addEventListener('tap', function(event) {
					plus.gallery.pick(function(p) {
						zs.showWaiting();
						zs.File.upload(p, function(url) {
							// 添加文件	
							p = p.replace(/\(\d+\)/g, "");
							zs.d(url);
							//var lastButton = $('#last');
							//							var html = "<li><div><img src=" + zs.imgUrl + url + " value=" + index + " href=" + url + "/></div></li>";
							var html = "<li><div><img src=" + zs.imgUrl + url + " href=" + url + "></div></li>";
							//取到回头第二个li进行追加；
							//var imgs = $('#General_lighting');
							$('#General_lighting li').eq(-1).before(html);
							//var index3 = index - 1;
							//							$(".house-add-img img:eq(" + index3 + ")").on('longtap', function(event) {
							//								var btn = ["确定", "取消"];
							//								mui.confirm('确认删除该图片？', '', btn, function(e) {
							//									if (e.index == 0) {
							//										$("#add_imgBox img:eq(" + index3 + ")").remove();
							//										//files.splice(index3,1);   //splice() 方法向/从数组中添加/删除项目，然后返回被删除的项目。该方法会改变原始数组。
							//										//http://www.w3school.com.cn/jsref/jsref_splice.asp
							//									}
							//								});
							//							});
							zs.closeWaiting();
						})

						//files.push({
						//	name: "uploadkey" + index,
						//	path: p
						//});
						//index++;
					});
				});

				//调用地图
				window.addEventListener('posSelected', function(event) {
					var pos = event.detail.pos;
					zs.d(JSON.stringify(pos));
					$('#location').html(pos.address);
					$('#location').attr('lng', pos.point.longitude);
					$('#location').attr('lat', pos.point.latitude);
				})

			});
			//谁可以看  选择
			window.addEventListener('changePrivacy', function(event) {
				var html = event.detail.text;
				$('#wocansee').html(event.detail.text).attr('data-privacy', event.detail.privacy);
				//alert($('#wocansee').attr('data-privacy'))
			});
			document.getElementById('send').addEventListener('tap', function() {
				var value = $('#msg-text').val();
				//				zs.d(value);
				var General_lightings = $('#General_lighting li').length;
				if(value == '' && General_lightings == 1) {
					zs.toast('动态不能为空哦');
					return;
				}
				var imgs = [];
				var imgsFather = $('#General_lighting li:not(#General_lighting li:last)');
				var len = imgsFather.length;
				for(var i = 0; i < len; i++) {
					imgs.push($('#General_lighting li:not(#General_lighting li:last)').eq(i).find('img').attr('href'));
				}
				var params = {
					uid: zs.User.isLogin(),
					msg: $('#msg-text').val(),
					imgs: imgs,
					lat: $('#location').attr('lat'),
					lng: $('#location').attr('lng'),
					accuracy: 0,
					addr: $('#location').html(),
					privacy: $('#wocansee').attr('data-privacy'),
				}
				zs.Api.post('say', 'add', params, function(r) {
					if(r.status) {
						zs.toast('发送动态成功');
						var opener = plus.webview.currentWebview().opener();
						if(opener.id =='my_dynamic'){
							opener = document.getWebviewById('my_dynamic_refresh');
							mui.fire(opener,'pulldownRefresh',{});
						}else{
							opener = document.getWebviewById('surrounding_dynamic_dynamic');
							mui.fire(opener,'pulldownRefresh',{});
						}
						opener && 										
						mui.back();				
					} else {
						zs.toast('发送动态失败');
					}

				})
			})
		},
	});
}(mui, zs)