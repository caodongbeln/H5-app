/*!
 * =====================================================
 * zs v1.0.0 ()
 * =====================================================
 */
!
function(mui, zs) {
	zs.WhoCanSeePage = zs.UserPage.extend({
		initConfig: function() {},
		initPage: function() {},
		initEvent: function() {
			mui.plusReady(function() {
				var opener = plus.webview.currentWebview().opener();
				mui('.mui-table-view-radio').on('tap', '.mui-table-view-cell', function() {
					zs.toast('设置成功');
					setTimeout(function() {
						var privacy = $('.mui-selected').eq(0).attr('data-privacy');
						var text = $('.mui-selected').eq(0).find('span').html();
						mui.fire(opener, 'changePrivacy', {
							privacy: privacy,
							text: text
						});
						mui.back();
					}, 100)

				});
			});

		}
	});
}(mui, zs)