/*!
 * =====================================================
 * zs v1.0.0 ()
 * =====================================================
 */
!
function(mui, zs) {
	zs.FriendChooseListPage = zs.UserPage.extend({
		isradio: false,
		selected:false,
		initConfig: function() {},
		initPage: function() {},
		initEvent: function() {
			var cls = this;
			mui.plusReady(function() {
				var count = 1;
				var bool = true;
				get_list();

				function get_list() {
						var friends= zs.Friend.getFriends();
						var friend_list = get_time(friends);
							
							cls.isradio = plus.webview.currentWebview().isradio;
							cls.selected = plus.webview.currentWebview().selected;
							cls.user_show = plus.webview.currentWebview().user_show;
							if(cls.user_show == true){
								friend_list.shift();
							}
							zs.template('friend_choose_list', 'friend_choose_list', {
								list: friend_list,
							});
							
							if(cls.selected && cls.selected.length>0){
								for (var i=0;i<cls.selected.length;i++) {															
									var id = '#checkbox-mask' + cls.selected[i];									
									$(id).addClass('checkbox-mask-checked');
									$(id).next().attr("checked",'true');
								}
							}
							mui('.mui-table-view-cell').on('tap', 'label', function() {
								if(cls.isradio) {
									$('input[type=checkbox]').attr('type', 'radio');
									$('.checkbox-mask').removeClass('checkbox-mask-checked');
									$(this).next('.checkbox-mask').addClass('checkbox-mask-checked');
								} else {
									$(this).next('.checkbox-mask').toggleClass('checkbox-mask-checked');
									var hasChk = $(this).next('.checkbox-mask').next('.absolute checkbox none').is(':checked');
									if(hasChk){
										$(this).next('.checkbox-mask').next('.absolute checkbox none').attr("checked",'false');
									}else{
										$(this).next('.checkbox-mask').next('.absolute checkbox none').attr("checked",'true');
									}	
								}

							});
							get_distance(friend_list);
				}

				function get_time(list) {
					for(var i = 0; i < list.length; i++) {
						if(list[i].user_location == null) {
							list.splice(i);
							continue;
						};
						list[i].atime = getShortTime(list[i].user_location.atime);
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
				document.getElementById("send-dynamic").addEventListener('tap', function() {
					var chk_value = [];
					var chk_title = [];
					$('input[name="user_id"]:checked').each(function() {
						chk_value.push($(this).val());
						chk_title.push($(this).attr('username'));
					});
					if(plus.webview.currentWebview().data_from == 'friend_choose_list') {

						zs.open('chat.html', 'chat', {
							title: chk_title[0],
							targetId: chk_value[0]
						}, '');
						return;
					}
					var opener = plus.webview.currentWebview().opener();
					opener && mui.fire(opener, 'resh', {
						list: chk_value,
						from_id :plus.webview.currentWebview().from_id
					});
					mui.back(); // 显示窗口
				})
			});
		},
	});
}(mui, zs)