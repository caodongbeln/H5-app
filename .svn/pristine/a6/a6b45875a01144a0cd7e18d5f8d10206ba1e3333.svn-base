/*!
 * =====================================================
 * zs v1.0.0 ()
 * =====================================================
 */
!
function(mui, zs) {
	zs.SawMePage = zs.UserPage.extend({
		initPage: function() {
			var cls = this;
			mui.plusReady(function() {
				var params = {
					viewed: zs.User.isLogin()
				}
				zs.Api.post('view_log', 'lists',params, function(me) {
					if(me.data == '' || me.data == undefined){
						var noResults = '<div class="no-result">还没有人看过您哦~</div>';
						$('#sawContent').append(noResults);
					}
					zs.template('sawContent', 'saw_me_content', {
						list: me.data
					}, 'append');
				})
			})
		},
		initEvent: function() {},
	});
}(mui, zs);