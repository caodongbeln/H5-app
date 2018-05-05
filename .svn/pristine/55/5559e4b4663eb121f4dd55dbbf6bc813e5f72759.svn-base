/*!
 * =====================================================
 * zs v1.0.0 ()
 * =====================================================
 */
!
function(mui, zs) {
	zs.Position_openPage = zs.UserPage.extend({
		initConfig: function() {},
		initPage: function() {
			var cls = this;
			mui.plusReady(function() {
				var open = ['index', 'contacts', 'surrounding_dynamic', 'my'];
					setTimeout(function() {						
						for(var i = 0; i < open.length; i++) {
						
							var detailPage = plus.webview.getWebviewById(open[i]);
							mui.fire(detailPage, 'resh', {});
						}						
					}, 200);
				var self=plus.webview.currentWebview();
				var friends = null;//zs.Friend.getAuthes();
				friends && cls.renderList(friends);
				if (!friends) {
					zs.Friend.getAuthesFromNet(function(list) {
						cls.renderList(list);
					},function(list){
						//var list = list.data;
						cls.renderList(list);
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
					var detailPage = plus.webview.getWebviewById('contacts');
						mui.fire(detailPage, 'resh', {});
				});
			});
			window.addEventListener('resh', function() {
				cls.renderList(friends);
			});
		},
		renderList: function(list) {
			if (list != null && list !=undefined && list !='') {
			var uid = zs.User.getUid();
			var friends = zs.Friend.getFriends();
			var sfriends = Array();
			/*for (var i = 0; i < friends.length; i++) {
				sfriends[friends[i]['fid']] = friends[i];
			}
			for (var i = 0; i < list.length; i++) {
				if (list[i]['fid'] == uid) {
					
					list[i]['user'] = sfriends[list[i]['uid']]['user'];
				}
			}*/
			}else{
				list = null;
			}
			
			zs.template('friends', 'friends', {
				list: list,
				uid: uid
			},'append');
			//alert(tt);
		}
		
	});
}(mui, zs)