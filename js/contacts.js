/*!
 * =====================================================
 * zs v1.0.0 ()
 * =====================================================
 */
!
function(mui, zs) {
	zs.ContactsPage = zs.UserPage.extend({
		initConfig: function() {},
		initPage: function() {
			zs.template('nav', 'footer', {
				navs: zs.data.nav,
				active: 'contacts'
			});
		},
		initEvent: function() {

			mui.plusReady(function() {
				nav_resh();
				window.addEventListener('resh', function(event) {
					get_invite_list();
					get_friend_list();
					nav_resh();
				})
				get_invite_list();
				get_friend_list();

				function get_friend_list() { //获取好友列表
					var friend_list = zs.Friend.getFriends();
					if(friend_list) {
						friend_list.shift();
						var friend_list = get_time(friend_list);
						zs.template('friend_list', 'friend_list', {
							list: friend_list
						});
						get_distance(friend_list);
					}
					zs.Friend.getFromNet(function(result) {
						result.shift();
						var friend_list = get_time(result);
						zs.template('friend_list', 'friend_list', {
							list: friend_list
						});
						get_distance(friend_list);
					});
				}

				function get_invite_list() { //获取好友申请等待通过数
					zs.Api.post('invite', 'total', {
						fid: zs.User.isLogin(),
						status: 0
					}, function(result) {
						if(result.status == 1) {
							if(result.data[1].unread > 0) {
								$('#remind_unread').html(result.data[1].unread);
								$('#remind_unread').show();
							} else {
								$('#remind_unread').hide();
							}
							if(result.data[0].unread > 0) {
								$('#weizhi_unread').html(result.data[0].unread);
								$('#weizhi_unread').show();
							} else {
								$('#weizhi_unread').hide();
							}
							if(result.data[2].unread > 0) {
								$('#new_friend_unread').html(result.data[2].unread);
								$('#new_friend_unread').show();
							} else {
								$('#new_friend_unread').hide();
							}
							$('#weizhi_content').html(result.data[0].count);
							$('#remind_content').html(result.data[1].content);
							$('#new_friend_count').html(result.data[2].count);
						}
					})
				}

				function get_time(list) {
					if(list || list.length) {
						for(var i = 0; i < list.length; i++) {
							if(list[i].user_location == null) {
								list.splice(i, 1);
							} else {
								list[i].atime = getShortTime(list[i].user_location.atime);
							};
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

				function nav_resh() {
					if(zs.User.isLogin()) {
						zs.Api.post('invite', 'unreadtotal', {
							uid: zs.User.isLogin()
						}, function(result) {
							if(result.status == 1) {
								zs.template('nav', 'footer', {
									navs: zs.data.nav,
									active: 'msg',
									total_unread: result.data
								});
							}
						})
					} else {
						zs.template('nav', 'footer', {
							navs: zs.data.nav,
							active: 'msg',
							total_unread: 0
						});
					}

				}
				mui(document.body).on("tap", "[hrefs]", function() {
					var data_href = $(this).attr('hrefs');
					var view = data_href.substr(0, data_href.indexOf('.html'));					
					if(data_href == 'new_friend.html') {
						$('#new_friend_unread').hide();
					}
					if(data_href == 'location_remind.html') {
						$('#remind_unread').hide();
					}
					if(data_href == 'position_open.html') {
						$('#weizhi_unread').hide();
					}
					zs.open(data_href, view, {}, '');
				})
			});
		},
	});
}(mui, zs)