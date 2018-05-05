/*!
 * =====================================================
 * zs v1.0.0 ()
 * =====================================================
 */
!
function(mui, zs) {
	zs.FrienddetailPage = zs.UserPage.extend({
		initConfig: function() {},
		initPage: function() {
			
		},
		initEvent: function() {
			mui.plusReady(function() {
				document.getElementById("confirmBtn").addEventListener('tap', function() {
					var btnArray = ['取消', '确定'];
					mui.confirm('对方也可以看到你的位置,是否继续？', '要求好友公开位置', btnArray, function(e) {
						if (e.index == 1) {	
							zs.Api.post('invite_loaction', 'add', {
								fid:plus.webview.currentWebview().data_id,
								uid: zs.User.isLogin()
							}, function(result) {
								if(result.status==1){
									mui.alert('对方同意公开位置后,你可以查看它的位置', '申请成功', function() {
						
									});
								}else{
									mui.alert('网络错误', '申请失败', function() {
						
									});
								}
							})
							
						} else {
							mui.alert('网络错误', '申请失败', function() {
						
									});
						}
					})
				});
				document.getElementById('right-icon-friend-detail').addEventListener('tap',function(){
					$('#right-icon-friend-detail-div').toggleClass('block');
				})
				

			});
			
		}
	});
}(mui, zs)