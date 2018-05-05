/*!
 * =====================================================
 * zs v1.0.0 ()
 * =====================================================
 */
!
function(mui, zs) {
	zs.ContactsmsgPage = zs.UserPage.extend({
		initConfig: function() {},
		initPage: function() {},
		initEvent: function() {
			mui.plusReady(function() {
				var rongrun = plus.webview.getWebviewById('rongrun');
				mui.fire(rongrun, 'reg_page', { //	注册页面
					page: 'contacts_msg',
				});
				mui.fire(rongrun, 'get_conversationList', {
					from_id: 'contacts_msg',					
				});			
			});
			var cls = this;
			window.addEventListener('resh', function(event) {
				var list = zs.Conversation.getConversations();				
				zs.template('conversation_list', 'contacts', {
					list: list			
				});
			})
			mui(document.body).on("tap", "[href]", function() {
				var title = this.getAttribute("title"),
					targetId = this.getAttribute("targetId"),
					conversationType = this.getAttribute("conversationType"),
					href = this.getAttribute("href"),
					view = this.getAttribute("data-view");
				mui.openWindow({
					url: href,
					id: view,
					extras: {
						title: title,
						targetId: targetId,
						conversationType: conversationType
					},
					createNew: true 
				});
			})
		}
	});
}(mui, zs)