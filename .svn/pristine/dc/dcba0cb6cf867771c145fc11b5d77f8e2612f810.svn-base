/*!
 * =====================================================
 * zs v1.0.0 ()
 * =====================================================
 */
!
function(mui, zs) {
	zs.PrivacyPage = zs.UserPage.extend({
		tool_time: null,
		initPage: function() {
			var cls = this;
			mui.plusReady(function() {
				parma = {
					uid: zs.User.isLogin()
				}
				zs.Api.post('user', 'info', parma, function(user) {
					var type = user.data.privacy;
					var selLi = $('.mui-table-view-radio').find('li')
					var len = selLi.length;
					for(var i = 0; i < len; i++) {
						if(selLi[i].value == type) {
							selLi[i].className = 'mui-table-view-cell border-bottom mui-selected';
						}
					}
				});
				if(cls.tool_time == null) {
					window.addEventListener('privacy', function(event) {
						zs.Api.post('tools_sales_log', 'add', {
							uid: zs.User.isLogin(),
							tid: event.detail.tid,
							type: event.detail.type,
							sid: event.detail.sid
						}, function(ret) {
							parmas = {
								id: zs.User.isLogin(),
								privacy: 3
							}
							zs.Api.post('user', 'edit', parmas, function() {
								zs.toast('设置成功');
								setTimeout(function() {
									plus.webview.currentWebview().close();
								}, 1000)
							})
						})
					});
				};
				document.querySelector('.mui-table-view.mui-table-view-radio').addEventListener('selected', function(e) {
					selVal = e.detail.el.value;
					if(selVal == 3) {
						zs.confirm("本功能需要使用道具，是否继续？", function(ret) {
							ret && zs.open(zs.propUrl, 'select_prop', {
								tid: 3
							});
						});
						return false;
					};
					parmas = {
						id: zs.User.isLogin(),
						privacy: selVal
					}
					zs.Api.post('user', 'edit', parmas, function() {
						zs.toast('设置成功');
						setTimeout(function() {
							plus.webview.currentWebview().close();
						}, 1000)
					})
				});
			})
		},
		initEvent: function() {},
	});
}(mui, zs);