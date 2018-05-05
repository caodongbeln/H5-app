/*!
 * =====================================================
 * zs v1.0.0 ()
 * =====================================================
 */
!
function(mui, zs) {
	zs.AddfriendPage = zs.UserPage.extend({
		initConfig: function() {},
		initPage: function() {
			
		},
		initEvent: function() {
			mui.plusReady(function() {
			/*	document.getElementById('contacts').addEventListener('tap', function() {
					plus.contacts.getAddressBook( plus.contacts.ADDRESSBOOK_PHONE, function( addressbook ) {
						addressbook.find(null,function(contacts){
							alert(contacts.length);
						}, function () {
							alert("error");
						},{multiple:true});
					}, function ( e ) {
						alert( "Get address book failed: " + e.message );
					} );
				})*/
				document.getElementById('search').addEventListener('tap', function() {
					var user = zs.User.get_userinfo();
					var mobile = $('.mui-input-clear').val();					
					if(mobile == user.mobile){
						zs.toast( "不能加自己为好友");
						return;
					}
					if(mobile == ''){
						zs.toast("不能为空！");
						return;
					}
					/*var phone = /^1[3|4|5|8|7][0-9]\d{8}$/;
					
					if(!phone.test(mobile)){						
						zs.toast("手机号码不符合格式");
						return;
					}*/
					zs.showWaiting();
					zs.Api.post('friend', 'is_friend', {
						mobile:mobile,
						uid: zs.User.isLogin()
					}, function(result) {
						if (result.data == 1) {
							zs.toast( "已是好友或没有此用户");
						}else{
							if(result.dialog){
								var params = {
									data_id: result.dialog,
									type: 'user',
									source:2
									};
								setTimeout(function() {
									var ws = plus.webview.currentWebview();
									plus.webview.close(ws);
								}, 1500);
								zs.open('../tpl/stranger_default.html','stranger_default',params,'');
							}else{
								zs.toast( "没有此用户");								
							}							
						}
					},function(result) {										
						zs.toast( "没有此用户");						
					})					
				})				
			});
			
		},
	});
}(mui, zs)