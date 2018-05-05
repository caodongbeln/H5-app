/*!
 * =====================================================
 * zs v1.0.0 ()
 * =====================================================
 */
!
function(mui, zs) {
	zs.NewfriendPage = zs.UserPage.extend({
		backUrl: 'contacts.html',
		initConfig: function() {},
		initPage: function() {
			var open = ['index', 'contacts', 'surrounding_dynamic', 'my'];
			setTimeout(function() {
				for(var i = 0; i < open.length; i++) {
					var detailPage = plus.webview.getWebviewById(open[i]);
					mui.fire(detailPage, 'resh', {});
				}
			}, 200);
		},
		initEvent: function() {
			var cls = this,
				back = mui.back;
			mui.back = function() {
					plus.webview.currentWebview().close();
					zs.open('../tpl/contacts.html', 'contacts', {}, '');

				},
			
			
			mui(document.body).on("tap", "[data-id]", function() {
				zs.showWaiting();
				var messageId = $(this).attr('data-id');
				var source = $(this).attr('data-source');
				var params = {
					id: messageId,
					status: 1,
					source: source
				}
				zs.Api.post('invite', 'edit_status', params, function(result) {
					//get_invite_list();
					var wvs = plus.webview.all();
					for(var i = 0; i < wvs.length; i++) {
						var detailPage = plus.webview.getWebviewById(wvs[i].id);
						mui.fire(detailPage, 'resh', {});
						zs.d("webview" + i + ": " + wvs[i].id);
					}
					zs.closeWaiting();
				}, function(result) {
					//get_invite_list();
					var wvs = plus.webview.all();
					for(var i = 0; i < wvs.length; i++) {
						var detailPage = plus.webview.getWebviewById(wvs[i].id);
						mui.fire(detailPage, 'resh', {});
						zs.d("webview" + i + ": " + wvs[i].id);
					}
					zs.closeWaiting();
				})
			})
			mui.plusReady(function() {
				$("#search").bind("input propertychange", function() {
						zs.Api.post('invite', 'lists', {
							mobile: $(this).val(),
							fid: zs.User.isLogin()
						}, function(result) {
							if(result.status == 1) {
								zs.template('new_friend_list', 'new_friend_list', {
									list: result.data
								});
							}
						})
					})
					//var rongrun = plus.webview.getWebviewById('rongrun');
					//mui.fire(rongrun, 'reg_page', {  //	注册页面
					//	page: 'new_friend',
					//});
				get_invite_list();

				function get_invite_list() {
					var list = zs.Invite.getInvite();
					if(list != null && list != '' && list != undefined) {

					} else {
						list = null
					}
					zs.template('new_friend_list', 'new_friend_list', {
						list: list
					});
					get_invite();

				}

				function get_invite() {
					var params = {
						//fid: zs.User.isLogin(),
						uid: zs.User.isLogin()
					}
					zs.Api.post('invite', 'lists', params, function(result) {
						if(result.data == null || result.status == 1) {
							zs.Invite.setInvite(result.data);
							var list = zs.Invite.getInvite();
							if(list != null && list != '' && list != undefined) {} else {
								list = null
							}
							zs.template('new_friend_list', 'new_friend_list', {
								list: list
							});
						}
					})
				}
				window.addEventListener('resh', function(event) {
					get_invite_list();
				})
			});

		},
	});
}(mui, zs)