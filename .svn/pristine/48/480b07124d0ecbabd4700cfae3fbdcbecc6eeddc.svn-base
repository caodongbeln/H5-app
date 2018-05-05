/*!
 * =====================================================
 * zs v1.0.0 ()
 * =====================================================
 */
!
function(mui, zs) {
	zs.Remind_listPage = zs.UserPage.extend({
		initConfig: function() {
			if (!zs.Remind) zs.Remind = new zs.RemindClass;
		},
		initPage: function() {
			var cls = this;
			mui.plusReady(function() {
				var list = zs.Remind.gets();
				list && cls.renderList(list);
				zs.Remind.getsFromNet(function(list) {
					cls.renderList(list);
				}, function() {
					cls.renderList(null);
				});
				window.addEventListener('resh', function(event) {
					zs.Remind.getsFromNet(function(list) {
						cls.renderList(list);
					}, function() {
						cls.renderList(null);
					});
				})
			})
		},
		initEvent: function() {},
		renderList: function(list) {
			if (list != null && list != undefined && list != '') {
				zs.d();
				
			}else{
				list = null
			}
			zs.template('remindContent', 'remind_content', {
				list: list
			});
		},
	});
}(mui, zs);