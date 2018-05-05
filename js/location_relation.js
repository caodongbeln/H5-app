/*!
 * =====================================================
 * zs v1.0.0 ()
 * =====================================================
 */
!
function(mui, zs) {
	zs.RelationPage = zs.UserPage.extend({
		backUrl: 'friend_detail.html',
		initPage: function() {
			mui.plusReady(function() {
				var cls = plus.webview.currentWebview();
				var fid = cls.fid;
				var friend_id = cls.friend_id;
				mui.back = function() {
					plus.webview.currentWebview().close();
				}
				zs.Api.post('friend', 'info', {
					id: friend_id
				}, function(info) {
					if(info.data.friend_relation == 0 || info.data.friend_relation == 2) {
						$('#mySwitch').addClass('mui-active').css('transition-duration', '0.2s').find('div').css({
							'transition-duration': '0.2s',
							'transform': 'translate(17px, 0px)'
						});
					}
				})
			})
		},
		initEvent: function() {
			mui.plusReady(function() {
				var cls = plus.webview.currentWebview();
				var fid = cls.fid;
				var friend_id = cls.friend_id;
				document.getElementsByClassName('mui-switch')[0].addEventListener('toggle', function(event) {
					if(event.detail.isActive) {
						mui("#mySwitch").switch().toggle();
						mui('#picture').popover('toggle');
					} else {
						zs.Api.post('friend', 'edit_friend_relation', {
							uid: fid,
							fid: zs.User.isLogin(),
							relation: 1
						}, function() {
							zs.Friend.clearGet();
							var detailPage = plus.webview.getWebviewById('friend_detail');
							mui.fire(detailPage, 'resh', {
								relation:1
							});
						})
					}
				});

				function selSwitch() {
					$("#mySwitch").addClass('mui-active').css('transition-duration', '0.2s').find('div').css({
						'transition-duration': '0.2s',
						'transform': 'translate(17px, 0px)'
					});
				}

				function changeStatus() {

				}
				document.getElementById('sure').addEventListener('tap', function() {
					mui('#picture').popover('toggle');
					selSwitch();
					zs.d(fid);
					zs.d(zs.User.isLogin());
					zs.Api.post('friend', 'edit_friend_relation', {
						uid: fid,
						fid: zs.User.isLogin(),
						relation: 0
					}, function() {
						zs.toast('设置成功,位置已关闭!');
						zs.Friend.clearGet();
						var detailPage = plus.webview.getWebviewById('friend_detail');
						mui.fire(detailPage, 'resh', {
							relation:0
						});
					})
				});
				window.addEventListener('go_loc', function(event) {
					zs.Api.post('tools_sales_log', 'add', {
						uid: zs.User.isLogin(),
						fid: event.detail.fid,
						tid: event.detail.tid,
						type: event.detail.type,
						sid: event.detail.sid
					}, function(ret) {
						selSwitch();
						zs.Api.post('friend', 'edit_friend_relation', {
							uid: fid,
							fid: zs.User.isLogin(),
							relation: 0
						}, function() {
							zs.toast('设置成功,位置已关闭!');
							zs.Friend.clearGet();
							var detailPage = plus.webview.getWebviewById('friend_detail');
							mui.fire(detailPage, 'resh', {
								relation:0
							});
						})
					})
				})
				document.getElementById('userProp').addEventListener('tap', function() {
					zs.Api.post('tools_sales', 'lists', {
						uid: zs.User.isLogin()
					}, function(list) {
						for(var i = 0, count = 0; i <= list.data.length; i++) {
							if(list.data[i] != undefined) {
								if(list.data[i].tid == 5 && list.data[i].usable != 0) {
									count++
								}
							}
						}
						if(list.data.length < 0 || count == 0) {
							zs.confirm("您沒有可使用的道具，去购买", function(ret) {
								ret && mui.openWindow({
									url: 'go_pay.html',
									extras: {
										data_id: 5
									},
								});
							})
						} else if(count > 0) {
							zs.open('../tpl/select_prop.html', 'select_prop', {
								fid: fid,
								tid: 5
							});
						}
					})
					mui('#picture').popover('toggle');
				});
			})
		},
	});
}(mui, zs)