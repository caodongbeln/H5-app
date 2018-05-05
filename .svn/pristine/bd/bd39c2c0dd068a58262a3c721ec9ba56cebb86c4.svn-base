/*!
 * =====================================================
 * zs v1.0.0 ()
 * =====================================================
 */
!
function(mui, zs) {
	zs.MyPage = zs.UserPage.extend({
		initPage: function() {
			var cls = this;
			zs.template('nav', 'footer', {
				navs: zs.data.nav,
				active: 'my'
			});
			mui.plusReady(function() {
				nav_resh();

				function nav_resh() {
					if(zs.User.isLogin()) {
						zs.Api.post('invite', 'unreadtotal', {
							uid: zs.User.isLogin()
						}, function(result) {
							if(result.status == 1) {
								zs.template('nav', 'footer', {
									navs: zs.data.nav,
									active: 'my',
									total_unread: result.data
								});
							}
						})
					} else {
						zs.template('nav', 'footer', {
							navs: zs.data.nav,
							active: 'my',
							total_unread: 0
						});
					}
				}
				window.addEventListener('change_gold', function(event) {
					$('#myContent').empty();
					zs.Api.post('user', 'info', {uid:zs.User.isLogin()}, function(ret) {
						zs.User.initUserinfo(ret.data);
						get_userInfo();
					})
				});
				window.addEventListener('resh', function(event) {
					nav_resh();
				});
				get_userInfo();

				function get_userInfo() {
					if(zs.User.get_userinfo()) {
						var user = zs.User.get_userinfo();
						var threeCover = user.cover;
						if(threeCover.indexOf('zujimi') == -1) {
							$(".qqImg").attr("src", "threeCover");
						}
						zs.template('myContent', 'my_content', {
							user: user
						}, 'append');
					}
				}
			})
		},
		initEvent: function() {},
	});
}(mui, zs);