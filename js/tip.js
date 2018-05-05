/*!
 * =====================================================
 * zs v1.0.0 ()
 * =====================================================
 */
!
function(mui, zs) {
	zs.TipPage = zs.UserPage.extend({
		isUser: false,
		initPage: function() {
			var cls = this;
			mui.plusReady(function() {
				var self = plus.webview.currentWebview();
				var uid = self.uid;
				cls.renderInfo(uid);
				window.addEventListener('change_list', function(event) {
					zs.Friend.clearGet();
					cls.renderInfo();
					cls.renderFriend();
					location.reload();
				})
				window.addEventListener('go_loc', function(event) {
					zs.Api.post('tools_sales_log', 'add', {
						uid: zs.User.isLogin(),
						fid: uid,
						tid: event.detail.tid,
						type: event.detail.type,
						sid: event.detail.sid
					}, function() {
						$('.self_friend').empty();
						cls.renderSelf();
						zs.Friend.clearGet();
						mui.fire('index', 'resh', {});
						setTimeout(function(){
							zs.toast('处理完成，您可以正常使用！');							
						},1000)
					})
				});
			});
		},
		initEvent: function() {
			var cls = this;
			mui(document.body).on('tap', '#close_btn', function() {
				plus.webview.currentWebview().close();
			})
			window.addEventListener('renderUser', function() {
				var uid = event.detail;
				cls.renderInfo(uid);
			})
		},
		renderInfo: function(uid) {
			uid == zs.User.getUid() ? this.renderSelf(uid) : this.renderFriend(uid);
		},
		renderFriend: function(uid, sales) {
			if (zs.Friend.get(uid)) {
				var friend = zs.Friend.get(uid),
					loc = zs.Friend.getLocation(uid);
				if (!friend.username) friend.username = friend.user.username;
				if (loc.atime) loc.atime = getShortTime(loc.atime);
				zs.template('body', 'friend', {
					friend: friend,
					chat_seting: JSON.stringify({
						conversationType: 1,
						targetId: friend.fid,
						title: friend.username
					}),
					loc: loc,
					log: sales
				});
				if (loc) {
					zs.Location.distance(loc.longitude, loc.latitude, function(dis) {
						$('#distance').text('距离' + getShortDis(dis));
					});
				}
			} else {
				alert('false');
			}
		},
		renderSelf: function(uid) {
			var user = zs.User.get_userinfo(),
				loc = zs.Location.getLocation();
			if (loc && loc.coords) {
				loc.coords.accuracy= loc.coords.accuracy *1;
				loc.coords.accuracy = loc.coords.accuracy.toFixed(0);
			}
			zs.template('body', 'self', {
				user: user,
				loc: loc
			});
		}
	});
}(mui, zs);