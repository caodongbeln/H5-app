/*!
 * =====================================================
 * zs v1.0.0 ()
 * =====================================================
 */
!
function(mui, zs) {
	zs.IdentityverifyPage = zs.UserPage.extend({
		initConfig: function() {},
		initPage: function() {

		},
		initEvent: function() {
			mui.plusReady(function() {
				$('.mui-active').css('transition-duration', '0.2s').find('div').css({
					'transition-duration': '0.2s',
					'transform': 'translate(17px, 0px)'
				});
				document.getElementById("switch").addEventListener('toggle', function() {
					//alert(11);
					if (event.detail.isActive) {
						$(this).attr('switch', 1);
						$('.mui-active').css('transition-duration', '0.2s').find('div').css({
							'transition-duration': '0.2s',
							'transform': 'translate(17px, 0px)'
						});
					} else {
						$(this).attr('switch', 0);
					}
				})
				document.getElementById('send-dynamic').addEventListener('tap', function() {
					zs.showWaiting();
					if (plus.webview.currentWebview().source == null) {
						var source = 2;
					} else {
						var source = plus.webview.currentWebview().source;
					}
				
					zs.Api.post('invite', 'add', {
						fid: plus.webview.currentWebview().data_id, //好友id
						uid: zs.User.isLogin(), //用户id
						source: source,
						relation: $('#switch').attr('switch'),
						request: plus.webview.currentWebview().content,
						username: $('#username').val()
					}, function(result) {						
						mui.openWindow({
							url: '../tpl/new_friend.html',
							id: 'new_friend',
							extras: {
								conversationType: 1,
								targetId: 20
							},
							createNew: true
						});
					})
				})

			});

		},
	});
}(mui, zs)