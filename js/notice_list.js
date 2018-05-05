/*!
 * =====================================================
 * zs v1.0.0 ()
 * =====================================================
 */
!
function(mui, zs) {
	zs.Notice_listPage = zs.UserPage.extend({
		initConfig: function() {
			if (!zs.Notice) zs.Notice = new zs.NoticeClass;
		},
		initPage: function() {
			var cls = this;
			mui.plusReady(function() {
				var list = zs.Notice.gets();
				list && cls.renderList(list);
				zs.Notice.getsFromNet(function(list) {
					cls.renderList(list);
				}, function() {
					cls.renderList(null);
				});
			})
		},
		initEvent: function() {},
		renderList: function(list) {
			if (list != null) {
				for (var i = 0; i < list.length; i++) {
					list[i].receiverCount = list[i].receiver.split(',').length;
				}
				
			}else{
				list == null
			}
			zs.template('noticeContent', 'notice_content', {
				list: list
			});
		},
	});
}(mui, zs);