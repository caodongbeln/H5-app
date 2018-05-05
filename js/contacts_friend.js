/*!
 * =====================================================
 * zs v1.0.0 ()
 * =====================================================
 */
!
function(mui, zs) {
	zs.ContactsfriendPage = zs.UserPage.extend({
		initConfig: function() {},
		initPage: function() {},
		initEvent: function() {
			mui.plusReady(function() {
				//下拉刷新和上拉加载实现  初始化过程
				mui.init({
					pullRefresh: {
						container: '#pullrefresh',
						down: {
							callback: pulldownRefresh
						}						
					}
				});
					// 监听点击消息事件
				plus.push.addEventListener("click", function(msg) {
					// 判断是从本地创建还是离线推送的消息
					switch (msg.payload) {
						case "LocalMSG":
							plus.nativeUI.alert("点击本地创建消息启动：");
							break;
						default:
							plus.nativeUI.alert("点击离线推送消息启动：");
							break;
					}
					// 提示点击的内容
					plus.nativeUI.alert(msg.content);
				}, false);
				// 监听在线消息事件
				plus.push.addEventListener("receive", function(msg) {
						var wvs=plus.webview.all();						

						var date2=new Date();    //接收时间
						var date3=(date2.getTime()-date1.getTime())/1000;   //相差秒数 
						if(date3 > 5){							
							plus.device.beep(1);							
							date1 = new Date();//重置起始时间
							for(var i=0;i<wvs.length;i++){
								var detailPage = plus.webview.getWebviewById(wvs[i].id);
								mui.fire(detailPage, 'resh', {});
								zs.d("webview"+i+": "+wvs[i].id);
							}
						}
					if (msg.aps) { // Apple APNS message
						plus.nativeUI.alert("接收到在线APNS消息：");
					} else {
						plus.nativeUI.alert("接收到在线透传消息：");
					}
					//zs.Rongyun.reconnect(function() {
						//alert(222);
					//});
				}, false);
				var rongrun = plus.webview.getWebviewById('rongrun');
				mui.fire(rongrun, 'reg_page', { //	注册页面
					page: 'contacts_friend',
				});
				window.addEventListener('resh', function(event) {
					get_invite_count();
					get_friend_list();
					
					
				})
				var count = 1;
				var bool = true;
				get_invite_count();
				get_friend_list();
				/**
				 * 下拉刷新具体业务实现
				 */
				function pulldownRefresh() {
					setTimeout(function() {
						count = 1;
						bool = false;
						$('#stranger_list').empty();
						get_invite_list();
						mui('#pullrefresh').pullRefresh().endPulldownToRefresh(); //refresh completed
					}, 1500);
				}
				var cls = this;
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
				function get_friend_list() { //获取好友列表
					var friend_list = zs.Friend.getFriends();					
					if (friend_list) {
						var friend_list = get_time(friend_list);
							//zs.d(JSON.stringify(friend_list));
						zs.template('friend_list', 'friend_list', {
							list: friend_list
						});
						get_distance(friend_list);
					}						
					zs.Friend.getFromNet(function(result) {						  	
							var	friend_list = get_time(result);
							//zs.d(JSON.stringify(friend_list));
							zs.template('friend_list', 'friend_list', {
								list: friend_list
							});							
							get_distance(friend_list);
					});	
				
				}				
				function get_invite_count() {
					var count = zs.Invite.getInviteCount();
					if (count) {
						zs.template('new_friend', 'new_friend', {
							conversationType: 1,
							targetId: 20,
							unreadMessageCount: count
						});
					}
					get_invite_list();
					
				}

				function get_invite_list() { //获取好友申请等待通过数
					zs.Api.post('invite', 'total', {
						fid: zs.User.isLogin(),
						status: 0
					}, function(result) {
						if (result.data == null || result.status == 1) {
							zs.Invite.setInviteCount(parseInt(result.data));
							var count = zs.Invite.getInviteCount();
							zs.template('new_friend', 'new_friend', {
								conversationType: 1,
								targetId: 20,
								unreadMessageCount: count
							});
						}
						new_friend();
					})
				}

				function get_time(list) {
					
					if(list || list.length){
						for (var i = 0; i < list.length; i++) {
							if (list[i].user_location == null) {
								list.splice(i,1);								
							}else{
								list[i].atime = getShortTime(list[i].user_location.atime);
								
							};
							//zs.d(list[i].atime);
						}
					}
					
					return list
				}

				function get_distance(list) {
					mui(".distance").each(function(i, element) {
						zs.Location.distance(list[i].user_location.longitude, list[i].user_location.latitude, function(dis) {
							$("#distance_" + i).html('距离' + getShortDis(dis));

						});
					});
				}
			});
		},
	});
}(mui, zs)