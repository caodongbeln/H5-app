/*!
 * =====================================================
 * zs v1.0.0 ()
 * =====================================================
 */
!
function(mui, zs) {
	zs.TaskPage = zs.UserPage.extend({
		initConfig: function() {

		},
		initPage: function() {
			var cls = this;
		},
		initEvent: function() {
			mui.plusReady(function() {				
				get_task();
				window.addEventListener('resh', function(event) {
					task_add(2);
				})
				function get_task() {
					zs.Api.post('task', 'lists', {
						uid: zs.User.isLogin(),
					}, function(result) {
						if(result.status == 1) {
							$('#total').html(result.data[0].gold);
							zs.template('task', 'task_content', {
								list: result.data,
							});
						}

					})
				}
				function task_add(tid) {
					zs.Api.post('task_log', 'add', {
						uid: zs.User.isLogin(),
						tid: tid
					}, function(result) {
						if(result.status == 1) {
							get_task();
						}
					})
				}
				mui(document.body).on("tap", "#qiandao", function() {
					var tid = $('#qiandao').attr('data-id');
					task_add(tid);
				})				
			})
		}
	});
}(mui, zs);