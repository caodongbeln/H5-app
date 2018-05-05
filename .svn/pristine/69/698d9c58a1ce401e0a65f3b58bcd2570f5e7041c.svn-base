/*!
 * =====================================================
 * zs v1.0.0 ()
 * =====================================================
 */
!
function(mui, zs) {
	zs.ChatPage = zs.UserPage.extend({

		initPage: function() {
			var cls = this;
			mui.plusReady(function() {
				
				mui(document.body).on("swipedown", "#chat_list", fun_1);

				function fun_1() {
					$(window).scrollTop(1);
					$(window).scroll(function() {
						if ($(window).scrollTop() <= 0) {

							zs.showWaiting();
							mui.fire(rongrun, 'get_historymessages', {
								from_id: 'chat',
								conversationType: conversationType,
								targetId: targetId,
								page: 2
							});
							setTimeout(function() {
								zs.closeWaiting();
							}, 200);

						}
					});
				}
				var title = plus.webview.currentWebview().title;
				var conversationType = RongIMLib.ConversationType.PRIVATE; ///plus.webview.currentWebview().conversationType;
				var targetId = plus.webview.currentWebview().targetId;
				$('#title').html(title);
				var rongrun = plus.webview.getWebviewById('rongrun');
				mui.fire(rongrun, 'reg_page', { //注册页面
					page: 'chat',
				});
				mui.fire(rongrun, 'get_historymessages', {
					from_id: 'chat',
					conversationType: conversationType,
					targetId: targetId,
					page: 1
				});
				mui.fire(rongrun, 'get_emojis', {});
				window.addEventListener('resh', function(event) {
					var list = event.detail.list;
					var page = event.detail.page;
					var is_true = event.detail.is_true;
					if (list.length == 0) {
						zs.toast('加载完毕');
					} else {
						zs.template('chat_list', 'chat', {
							list: list,
							UserId: zs.User.isLogin()
						});
					}
					if (is_true == false) {
						mui(document.body).off("swipedown", "#chat_list", fun_1);
					}
					if (page == 1) {
						var h = $(document).height() - $(window).height();
						$(document).scrollTop(h);
					}
					mui.fire(rongrun, 'clearMessages', { //清除未读消息数
						conversationType: RongIMLib.ConversationType.PRIVATE,
						targetId: plus.webview.currentWebview().targetId
					});
				});
				window.addEventListener('add', function(event) {
					var list = event.detail.list;
					zs.template('chat_list', 'chat', {
						list: list,
						UserId: zs.User.isLogin()
					}, 'append');
					var h = $(document).height() - $(window).height();
					$(document).scrollTop($(document).height());
				});
				window.addEventListener('resh_emojis', function(event) {
					var list = event.detail.list;
					for (var i = 0; i < list.length; i++) {
						var html = '<li class="emojis">' + list[i] + '</li>';
						$('#dynamic-biaoqing-box').append(html);
					}

				});

				function inimage(text) {
					var obj = $("#msg-text");
					var range, node;
					if (!obj.hasfocus) {
						obj.focus();
					}
					if (window.getSelection && window.getSelection().getRangeAt) {
						range = window.getSelection().getRangeAt(0);
						range.collapse(false);
						node = range.createContextualFragment(text);
						var c = node.lastChild;
						range.insertNode(node);
						if (c) {
							range.setEndAfter(c);
							range.setStartAfter(c)
						}
						var j = window.getSelection();
						j.removeAllRanges();
						j.addRange(range);

					} else if (document.selection && document.selection.createRange) {
						document.selection.createRange().pasteHTML(text);
					}
				}
				mui(document.body).on("tap", ".emojis", function() {
					inimage($(this).text());

				});
				document.getElementById('send-chat').addEventListener('tap', function() {
					var content = $("#msg-text").text();
					if (content == '') {
						zs.toast('内容不能为空');
						return;
					}
					var content = content;
					var type = 'TxtMsg';
					var targetId = plus.webview.currentWebview().targetId;
					var duration = 3600;
					var imageUri = '';
					zs.Api.post('user', 'info', {
						uid: targetId
					}, function(result) {
						if (result.status == 1) {
							var extra = {
								username: zs.User.get_userinfo().username,
								cover: zs.User.get_userinfo().cover,
								fid_username: result.data.username,
								fid_cover: result.data.cover
							};
							$("#msg-text").text('');
							//触发customEvent事件
							mui.fire(rongrun, 'customEvent', {
								targetId: targetId,
								type: type,
								content: content,
								duration: duration,
								imageUri: imageUri,
								extra: extra,
								sourceUserId: zs.User.isLogin()
							});
						} else {
							zs.toast('没有网络');
						}

					})
				});
				document.getElementById('type_img').addEventListener('tap', function() {
					plus.gallery.pick(function(p) {
						zs.File.upload(p, function(url) {
							var content = url;
							var type = 'ImgMsg';
							var extra = {
								username: zs.User.get_userinfo().username,
								cover: zs.User.get_userinfo().cover
							};
							var targetId = plus.webview.currentWebview().targetId;
							var duration = 3600;
							var imageUri = url;
							//触发customEvent事件
							mui.fire(rongrun, 'customEvent', {
								targetId: targetId,
								type: type,
								content: content,
								duration: duration,
								imageUri: imageUri,
								extra: extra,
								sourceUserId: zs.User.isLogin()
							});
						})
					});
				});
				document.getElementById('type_loc').addEventListener('tap', function() {
					var content = zs.User.get_userinfo().username + "共享位置";
					var type = 'LBSMsg';
					var extra = {
						username: zs.User.get_userinfo().username,
						cover: zs.User.get_userinfo().cover
					};
					var latitude = "16.5555555";
					var longitude = "16.5555555";
					var targetId = plus.webview.currentWebview().targetId;
					var duration = 3600;
					var desc = "这是";
					//触发customEvent事件
					mui.fire(rongrun, 'customEvent', {
						targetId: targetId,
						type: type,
						content: content,
						duration: duration,
						latitude: latitude,
						longitude: longitude,
						extra: extra,
						sourceUserId: zs.User.isLogin(),
						desc: desc
					});
				});
				document.getElementById('type_card').addEventListener('tap', function() {

					var type = 'CardMsg';
					var extra = {
						username: zs.User.get_userinfo().username,
						cover: zs.User.get_userinfo().cover
					};
					var targetId = plus.webview.currentWebview().targetId;
					var duration = 3600;
					//触发customEvent事件
					mui.fire(rongrun, 'customEvent', {
						targetId: targetId,
						type: type,
						extra: extra,
						sourceUserId: zs.User.isLogin(),
					});
				});
				document.getElementById('jia').addEventListener('tap', function() {
					$('#jia_xuanxiang').toggleClass('none');
				});
				/*	//点击左侧键盘按钮时的逻辑
					document.getElementById('msg-jianpan').addEventListener('tap', function() {
						//$('#float-left').find('i').removeClass('block').addClass('none');
						$('#msg-yuyin').removeClass('none').addClass('block');
						$('#msg-jianpan').removeClass('block').addClass('none');
						$('#msg-sound').hide();
						$('#biaoqing').show();
						$('#msg-text').show().focus();
						$('#jia').removeClass('block').addClass('none');
						$('#send-chat').removeClass('none').addClass('block')
					});
					//点击左侧语音按钮的逻辑
					document.getElementById('msg-yuyin').addEventListener('tap', function() {
						$('#msg-yuyin').removeClass('block').addClass('none');
						$('#msg-jianpan').removeClass('none').addClass('block');
						//$('#msg-jianpan').addClass('block');
						$('#msg-sound').show();
						$('#msg-text').hide();
						$('#biaoqing').hide();
						$('#jia').removeClass('none').addClass('block');
						$('#send-chat').removeClass('block').addClass('none');
					});*/
				document.getElementById('biaoqing').addEventListener('tap', function() {

					$('#dynamic-biaoqing-box').toggleClass('none');
				});
			})
		},
		initEvent: function() {},
	});
}(mui, zs);