/*!
 * =====================================================
 * zs v1.0.0 ()
 * =====================================================
 */
!
function(mui, zs) {
	zs.MessagePage = zs.UserPage.extend({
		initPage: function() {		
			zs.template(document.body, 'footer', {nav: 'msg'}, 'append');
			if (zs.User.isLogin()) {
				zs.connect_rongyun(zs.rong_appId,zs.User.get_userinfo().data.token);
			}
			zs.d(zs.getItem('ConversationList_html'));
			$("#conversationlist").html(zs.getItem('ConversationList_html'));
			$("#conversationlist").delegate('li', 'click', function() {					
				zs.setItem('discussion_id', this.getAttribute("targetId")),
				zs.setItem('discussion_name',this.getAttribute("targetName")),
				zs.setItem('type',this.getAttribute("targetType")),				
				mui.openWindow({
					url:'im-chat.html',
					id :'im-chat.html',
					createNew:true
				});
				//zs.getHistory(this.getAttribute("targetId"), this.getAttribute("targetName"), this.getAttribute("targetType"));
			});	
			zs.closeWaiting();
		}
	});
}(mui, zs);