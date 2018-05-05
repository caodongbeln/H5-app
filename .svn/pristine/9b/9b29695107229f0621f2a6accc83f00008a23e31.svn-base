/*!
 * =====================================================
 * zs v1.0.0 ()
 * =====================================================
 */
!
function(mui, zs) {
	zs.StrangerlistPage = zs.UserPage.extend({
		initConfig: function() {},
		initPage: function() {
			
		},
		initEvent: function() {
			mui.plusReady(function() {				
				var coolLimitView = plus.webview.create('stranger_refresh.html', 'stragner_refresh', {
					top: '50px',
					bottom: '0px'
				});
				plus.webview.currentWebview().append(coolLimitView);
				plus.webview.show(coolLimitView);
				
			});
		},
	});
}(mui, zs)