/*!
 * =====================================================
 * zs v1.0.0 ()
 * =====================================================
 */
!
function(mui, zs) {
	zs.MessageSetPage = zs.UserPage.extend({
		initPage: function() {
			var cls = this;
			mui.plusReady(function() {
				if (zs.User.get_userinfo()) {
					var info = zs.User.get_userinfo();
					zs.template('messageSet', 'message_content', {
						info: info
					}, 'append');
					mui('.mui-content .mui-switch')['switch']();
					$('.mui-active').css('transition-duration', '0.2s').find('div').css({
						'transition-duration': '0.2s',
						'transform': 'translate(17px, 0px)'
					});
					zs.Api.post('user', 'get_notices', {}, function(list) {
						zs.template('messageFooter', 'message_footer', {
							list: list.data
						}, 'append');
						mui('.mui-content .mui-switch')['switch']();
//						待优化@Tocheck
						if (info.notices.isnotice == 1) {
							$('#isnotice').addClass('mui-active').css('transition-duration', '0.2s').find('div').css({
								'transition-duration': '0.2s',
								'transform': 'translate(17px, 0px)'
							});;
						}
						if (info.notices.isremind == 1) {
							$('#isremind').addClass('mui-active').css('transition-duration', '0.2s').find('div').css({
								'transition-duration': '0.2s',
								'transform': 'translate(17px, 0px)'
							});;
						}
						if (info.notices.issay == 1) {
							$('#issay').addClass('mui-active').css('transition-duration', '0.2s').find('div').css({
								'transition-duration': '0.2s',
								'transform': 'translate(17px, 0px)'
							});;
						}
						if (info.notices.isstrategy == 1) {
							$('#isstrategy').addClass('mui-active').css('transition-duration', '0.2s').find('div').css({
								'transition-duration': '0.2s',
								'transform': 'translate(17px, 0px)'
							});;
						}
					})
				};
			})
		},
		initEvent: function() {
			mui.plusReady(function() {
				var old_back = mui.back;
				var switchs = $('.mui-switch');
				mui.back = function() {
					var params = {
						id: zs.User.isLogin(),
					}
					$('.mui-switch').each(function(i) {
						if ($(this).hasClass('mui-active')) {
							params[this.id] = "1"
						} else {
							params[this.id] = "0"
						}
					})
					zs.Api.post('user', 'edit', params, function(a) {
						zs.User.initUserinfo(a.data);
						zs.toast('设置成功!');
					});
				}
			})
		}
	});
}(mui, zs);