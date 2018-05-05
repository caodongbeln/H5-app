/*!
 * =====================================================
 * zs v1.0.0 ()
 * =====================================================
 */
!
function(mui, zs) {
	zs.TousuPage = zs.UserPage.extend({
		initPage: function() {

		},
		initEvent: function() {
			mui.plusReady(function() {
				var uId = plus.webview.currentWebview().uid;
					to_uId = plus.webview.currentWebview().to_uid;
				$('.mui-table-view-radio').find('li').click('tap',function(){
					var type = $(this).find('a').text(),
					params = {
						msg:type,
						uid:uId,
						to_uid:to_uId
					}
					zs.Api.post('report', 'add', params, function() {
						zs.toast('投诉成功!');
						mui.back();
						plus.webview.currentWebview().close();
					});
				});
			})
		},
	});
}(mui, zs)