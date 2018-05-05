/*!
 * =====================================================
 * zs v1.0.0 ()
 * =====================================================
 */
!
function(mui, zs) {
	zs.FeedbackPage = zs.UserPage.extend({
		initPage: function() {

		},
		initEvent: function() {
			document.getElementById('submit').addEventListener('tap', function() {
				if(document.getElementById('feedback').value == ''){
					zs.toast('请输入反馈内容!')
					$('#feedback').focus();
					return false;
				}else{
					var msg = document.getElementById('feedback').value;
				}
				var parmas = {
					owner: zs.User.isLogin(),
					msg: msg
				}
				zs.Api.post('feedback', 'add', parmas, function() {
					zs.toast('意见反馈提交成功');
					mui.back();
					setTimeout(function() {
						plus.webview.currentWebview().close();
					}, 2000);
				});
			});
		},
	});
}(mui, zs)