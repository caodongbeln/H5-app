/*!
 * =====================================================
 * zs v1.0.0 ()
 * =====================================================
 */
!
function(mui, zs) {
	zs.MyActivityPage = zs.UserPage.extend({
		initPage: function() {
			//本页主要是用于创建两个子页面
		},
		initEvent: function() {
			var cls = this;
			mui.plusReady(function() {
				var my_activity_refresh = plus.webview.create('my_activity_refresh.html', 'my_activity_refresh', {
					top: '44px',
					bottom: '0px' 
				});
				plus.webview.currentWebview().append(my_activity_refresh);
				plus.webview.show(my_activity_refresh);
			
			});
		}

	});
}(mui, zs)