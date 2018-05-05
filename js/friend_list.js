/*!
 * =====================================================
 * zs v1.0.0 ()
 * =====================================================
 */
!
function(mui, zs) {
	zs.friend_listPage = zs.UserPage.extend({
		opener: null,
		initConfig: function() {
			var cls = this;
			mui.plusReady(function() {
				cls.opener = plus.webview.currentWebview().opener()
			}).bind(this)
		},
		initPage: function() {
			var cls = this;
			window.addEventListener('change_gold', function(event) {
				var info = event.detail.userinfo;
				zs.User.getNetInfo(info);
				location.reload();
			});
			window.addEventListener('refesh', function(event) {
				zs.Friend.clearGet();
				location.reload();
			});
			var friends = zs.Friend.getFriends();
			friends && renderFirends(friends);
			zs.Friend.getFromNet(renderFirends);
			zs.Friend.getFriendsLocation(function(locations) {
				var opener = cls.opener;
				opener && mui.fire(opener, 'drawFriends', {
					locations: locations
				})
			});

			function renderFirends(friends) {
				zs.template('content', 'friends', {
					friends: friends,
					user: zs.User.get_userinfo()
				});
				var bodyWidth = document.body.clientWidth;
				bodyWidth += 'px';
				$('#friend-list-box').css({
					'width': bodyWidth
				});
			}
		},
		initEvent: function() {
			var cls = this;
			mui(document.body).on('tap', 'ul>li[data-id]', function() {
				var opener = cls.opener;
				var uid = this.getAttribute('data-id');
				if(uid != zs.User.getUid()) {
					var friend = zs.Friend.get(uid);
					if(friend && friend.relation == 1) {
						zs.Friend.getLocationFromNet(uid, function(locations) {
							opener && mui.fire(opener, 'drawFriends', {
								locations: locations
							})
						});
					}
				}
				opener && mui.fire(opener, 'moveTo', {
					uid: uid
				});
			});
		},

	});
}(mui, zs);