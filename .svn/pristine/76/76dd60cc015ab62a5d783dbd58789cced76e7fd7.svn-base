/*!
 * =====================================================
 * zs v1.0.0 ()
 * =====================================================
 */
!
function(mui, zs) {
	zs.PropPage = zs.UserPage.extend({
		initPage: function() {
			var cls = this;
			var user = zs.User.get_userinfo();
			
			var parmas = {
				uid:zs.User.isLogin()
			}
			zs.Api.post('tools_sales', 'lists',parmas, function(gold) {
				if(user.update){
					if(gold.dialog  == 0){
						var noResults = '<div class="no-result">您没有可以使用的道具,快去购买吧~</div>';
						$('#propContent').append(noResults);
					}
				}
				
				zs.template('propContent', 'prop_content', {
					list:gold.data
				}, 'append');
			});
		},
		initEvent: function() {},
	});
}(mui, zs);