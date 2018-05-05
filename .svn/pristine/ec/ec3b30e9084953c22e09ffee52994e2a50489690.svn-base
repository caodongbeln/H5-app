/*!
 * =====================================================
 * zs v1.0.0 ()
 * =====================================================
 */
!
function(mui, zs) {
	zs.AddstrangerPage = zs.UserPage.extend({
		initConfig: function() {},
		initPage: function() {

		},
		initEvent: function() {
			mui.plusReady(function() {
				document.getElementById('send-dynamic').addEventListener('tap', function() {
					zs.showWaiting();
					var content = $('.personal-margin-top').val();
					var params = {
						content:content,
						data_id:plus.webview.currentWebview().data_id,
						source:plus.webview.currentWebview().source						
					}
					mui.openWindow({
						url: '../tpl/identity_verify.html',
						id: 'identity_verify',
						extras: params,
						createNew: true
					});
				})
				//alert(plus.webview.currentWebview().data_id);
				zs.Api.post('user', 'info', {
						uid: plus.webview.currentWebview().data_id
					}, function(result) {
						if (result.status == 1) {							
							$('.mui-title').html(result.data.username);
							$('#desc').html('我是'+zs.User.get_userinfo().username);
							//zs.changeImg(result.data);
							zs.template('back_cover', 'back_cover', {
								list: result.data.back_cover
							});
						} else {}
				})
			});

		},
	});
}(mui, zs)