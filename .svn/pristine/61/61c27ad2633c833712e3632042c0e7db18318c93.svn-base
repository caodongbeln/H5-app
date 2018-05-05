/*!
 * =====================================================
 * zs v1.0.0 ()
 * =====================================================
 */
!
function(mui, zs) {
	zs.InvitePage = zs.UserPage.extend({
		initPage: function() {
			mui.plusReady(function() {
				//zs.showWaiting();
				zs.execI18n();

				zs.Api.post('invitation', 'lists', {
					to_uid: 87
				}, function(r) {
					zs.template('invite_in', 'invite_in', {
						list: r.data
					}, 'append');
				})
				zs.Api.post('invitation', 'lists', {
					uid: 87
				}, function(r) {
					zs.template('invite_out', 'invite_out', {
						list: r.data
					}, 'append');
				})
			}.bind(this));
		},
		initEvent: function() {
			//切换发出的和收到的div
			document.getElementById('received').addEventListener('tap', function() {

				$(this).addClass('selected').parent().next().next().find('input').removeClass('selected');
				$('#invite_in').removeClass('none').next().addClass('none');
			});
			document.getElementById('issue').addEventListener('tap', function() {

				$(this).addClass('selected').parent().prev().prev().find('input').removeClass('selected');
				$('#invite_out').removeClass('none').prev().addClass('none');
			});
			//加点击事件
			document.getElementById('sure').addEventListener('tap', sure, false);
			document.getElementById('cancel').addEventListener('tap', cancel, false);

			mui(document.body).on('tap', '[data-choose]', function() {

				//显示弹框
				$('#Bomb_box').removeClass('none');
				$('#mask').removeClass('none');
				
				if ($(this).attr('data-choose')) {
					var params = {
						id: $(this).attr('data_id'),
						status: 1
					};
					//存缓存
					zs.setItem('invite_status', 1);

				} else {
					var params = {
						id: $(this).attr('data_id'),
						status: 2
					};
					zs.setItem('invite_status', 2);
				}
				zs.setItem('invite_params', JSON.stringify(params));
			});

			function cancel() {
				//关闭弹框
				$('#Bomb_box').addClass('none');
				$('#mask').addClass('none');
			}

			function sure() {

				var status = zs.getItem('invite_status');
				var params = JSON.parse(zs.getItem('invite_params'));
				if (status == 1) {
					zs.Api.post("invitation", "edit", params, function(r) {
						//关闭弹框			
						$('#Bomb_box').addClass('none');
						$('#mask').addClass('none');
						$('#unsettled').hide();
						$('#pass').show();
					});
				} else if (status == 2) {
					zs.Api.post("invitation", "edit", params, function(a) {
						//关闭弹框
						$('#Bomb_box').addClass('none');
						$('#mask').addClass('none');
						$('#unsettled').hide();
						$('#uppass').show();
					})
				}
			}

			//重写mui的back方法 清掉缓存
			var old_back = mui.back;
			mui.back = function() {
				zs.removeItem('invite_status');
				zs.removeItem('invite_params');
				old_back();
			}

		},
		/*//收到的邀请
		invite_in: function(){
			zs.Api.post('invitation','lists',{to_uid:zs.User.isLogin()},function(r){
				zs.template('invite_in','invite_in',r.data,'append');
			})
			
		},
		//发出的申请
		invite_out: function(){
			zs.Api.post('invitation','lists',{uid:zs.User.isLogin()},function(r){
				zs.template('invite_out','invite_out',r.data,'append');
			})
			
		},*/
		initBack: function() {
			var c = null;
			mui.back = function() {
				c ? (new Date).getTime() - c < 1e3 && plus.runtime.quit() : (c = (new Date).getTime(), zs.toast("再按一次退出应用"), setTimeout(function() {
					c = null
				}, 1e3))
			}
		},
	});
}(mui, zs);