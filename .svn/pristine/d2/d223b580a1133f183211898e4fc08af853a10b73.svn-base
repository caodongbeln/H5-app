/*!
 * =====================================================
 * zs v1.0.0 ()
 * =====================================================
 */
!
function(mui, zs) {
	zs.Location_NoticePage = zs.UserPage.extend({
		initConfig: function() {
			if (!zs.Notice) zs.Notice = new zs.NoticeClass;
		},
		initPage: function() {
			var cls = this;
			mui.plusReady(function() {
				var list = zs.Notice.gets_log();				
				list && cls.renderList(list);
				zs.Notice.gets_logFromNet(function(list) {
					cls.renderList(list.data);
				}, function() {
					cls.renderList(null);
				});
			})
		},
		initEvent: function() {},
		renderList: function(list) {
			if (list != null && list != undefined && list != '') {
				alert(1);
				for (var i = 0; i < list.length; i++) {
					list[i].ctime = getShortTime(list[i].atime);
				}
				
			}else{
				var noResults = '<div class="no-result">暂无通知~</div>';
				$('#notice_content').append(noResults);
			}			
			zs.template('location_notice', 'notice_content', {
				list:list
			}, 'append');
		},
	});
}(mui, zs);