/*!
 * =====================================================
 * zs v1.0.0 ()
 * =====================================================
 */
!
function(mui, zs) {
	zs.TaskPage = zs.UserPage.extend({
		initPage: function() {
			var cls = this;
			var parmas = {
				Uid:zs.User.isLogin()
			}
			zs.Api.post('tools_sales', 'lists',parmas, function(gold) {
				zs.template('propContent', 'prop_content', {
					list:gold.data
				}, 'append');
//				alert(JSON.stringify(tool.data));
			});
		},
		initEvent: function() {},
	});
}(mui, zs);