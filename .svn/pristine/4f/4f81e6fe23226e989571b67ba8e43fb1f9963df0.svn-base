/*!
 * =====================================================
 * zs v1.0.0 ()
 * =====================================================
 */
!
function(mui, zs) {
	zs.ContactsrefreshPage = zs.UserPage.extend({
		initPage: function() {
			var cls = this;	
			mui.plusReady(function() {
					//下拉刷新和上拉加载实现  初始化过程
					mui.init({
						pullRefresh: {
							container: '#pullrefresh',
							down: {
								callback: pulldownRefresh
							},
							up: {
								contentrefresh: '正在加载...',
								callback: pullupRefresh
							}
						}
					});
					var count =1;
					var bool = false;	
					get_friend_list();
					get_invite_list();
					var wvs = plus.webview.all();				
					var rongrun = plus.webview.getWebviewById('rongrun');
					mui.fire(rongrun, 'get_conversationList', {
						from_id: 'contacts',
					});
					mui.fire(rongrun, 'reg_page', {  //	注册页面
						page: 'contacts',
					});
					window.addEventListener('resh', function(event) {
						var list = event.detail.list;
						zs.d("Send Successfully" + JSON.stringify(list));				
							zs.template('contacts1', 'contacts', {
								list: list
							});
									
						get_invite_list();
						
					})			
					function new_friend() {
						document.getElementById('new_friend_list').addEventListener('tap', function() {
							var conversationType = $(this).attr('conversationType');
							var targetId = $(this).attr('targetId');
							var params = {
								conversationType: parseInt(conversationType),
								targetId: targetId
							}
							mui.openWindow({
								url: '../tpl/new_friend.html',
								id: 'new_friend',
								extras: params,
								createNew: true
							});
						})
					}
					function get_invite_list() {  //获取好友申请等待通过数
						zs.Api.post('invite', 'total', {
							fid: zs.User.isLogin(),
							status:0
						}, function(result) {
							zs.d(result.data);
							zs.template('new_friend', 'new_friend', {
								conversationType: 1,
								targetId: 20,
								unreadMessageCount: result.data
							});					
							new_friend();
						})				
					}
					/**
					 * 下拉刷新具体业务实现
					 */
					function pulldownRefresh() {
						setTimeout(function() {
							count =1;
							bool = false;						
							$('#stranger_list').empty();
							get_friend_list();
							mui('#pullrefresh').pullRefresh().endPulldownToRefresh(); //refresh completed
						}, 1500);
					}
	
					/**
					 * 上拉加载具体业务实现
					 */
					function pullupRefresh() {
						++count;
						setTimeout(function() {
							if(bool){
								mui('#pullrefresh').pullRefresh().endPullupToRefresh(bool); //参数为true代表没有更多数据了。
							}else{
								get_stranger_list();
								mui('#pullrefresh').pullRefresh().endPullupToRefresh(bool); //参数为true代表没有更多数据了。
							}																		
						}, 1500);
					}
					function get_friend_list() {						
						zs.Api.post('friend', 'lists', {
							pagenum: count,
							pagesize: 10,
							uid: zs.User.isLogin()
						}, function(result) {
							var len = result.data.length;							
							if (len) {
								zs.template('friend_list', 'friend_list', {
									list: result.data
								}, 'append');									
							}else{
								bool = true;
							}
							
						})
					}	
							
				});
		},
		initEvent: function() {
	

		},
		initBack: function() {
			
		},
	});
}(mui, zs);