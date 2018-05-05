/*!
 * =====================================================
 * zs v1.0.0 ()
 * =====================================================
 */
!
function(mui, zs) {
	zs.Position_helperPage = zs.UserPage.extend({
		title: '',
		conversationType:-1,
		targetId:-1,
		initConfig: function() {},
		initPage: function() {
			var cls = this;
			mui.plusReady(function() {
				var self=plus.webview.currentWebview();
				/*this.title = self.title;
				this.conversationType = self.conversationType;
				this.targetId = self.targetId;*/
				/*var rongrun = plus.webview.getWebviewById('rongrun');
				rongrun && mui.fire(rongrun, 'reg_page', { //	注册页面
					page: 'contacts_msg',
				});
				rongrun && mui.fire(rongrun, 'readed', { //	注册页面
					targetId: self.targetId,		//会话ID
					ConversationType: self.conversationType //会话类型
				});*/

				var friends = null;//zs.Friend.getAuthes();
				friends && cls.renderList(friends);
				if (!friends) {
					zs.Friend.getAuthesFromNet(function(list) {
						cls.renderList(list);
						mui('.tongyiandjujue').on('tap','i',function(){
							alert(1);
						})
					});
				}
			})
		},
		initEvent: function() {
			mui('#friends').on('tap', '.tongyiandjujue-backgroud-color028ce6', function() {
				var uid = zs.User.getUid();
				var fid = this.getAttribute('data-id');
				var cls = this;
				zs.Friend.allowAuth(uid, fid, function() {
					zs.template(cls.parentNode, 'allow', {});
				});
			});

			window.addEventListener('resh', function() {
				cls.renderList(friends);
			});
		},
		renderList: function(list) {
			var uid = zs.User.getUid();
			var friends = zs.Friend.getFriends();
			var sfriends = Array();
			for (var i = 0; i < friends.length; i++) {
				sfriends[friends[i]['fid']] = friends[i];
			}
			for (var i = 0; i < list.length; i++) {
				if (list[i]['fid'] == uid) {
					list[i]['user'] = sfriends[list[i]['uid']]['user'];
				}
			}
			zs.template('friends', 'friends', {
				list: list,
				uid: uid
			});
		}
	});
}(mui, zs)