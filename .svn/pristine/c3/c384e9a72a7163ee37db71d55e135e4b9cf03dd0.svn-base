/*!
 * =====================================================
 * zs v1.0.0 ()
 * =====================================================
 */
!
function(mui, zs) {
	zs.DirectionPage = zs.UserPage.extend({
		initPage: function() {
			var cls = this;
			// H5 plus事件处理
			mui.plusReady(function() {
			

			});
		},
		initEvent: function() {
		$('.selected-cata').find('span').click('tap',function(){
			var selected_id = $(this).attr('id');
			$(this).addClass('selected').siblings().removeClass('selected');
			var detailPage = plus.webview.getWebviewById('choose_position');
			mui.fire(detailPage, 'selStatus', {
				selected_id:selected_id
			});
		})
		},
	});
}(mui, zs);