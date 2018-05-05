/*!
 * =====================================================
 * zs v1.0.0 ()
 * =====================================================
 */
!
function(mui, zs) {
	zs.MyDynamicPage = zs.UserPage.extend({
		initPage: function() {
			//本页主要是用于创建两个子页面
		},
		initEvent: function() {
			var cls = this;
			mui.plusReady(function() {
				var my_dynamic_refresh = plus.webview.create('my_dynamic_refresh.html', 'my_dynamic_refresh', {
					top: '44px',
					bottom: '0px' 
				});
				plus.webview.currentWebview().append(my_dynamic_refresh);
				plus.webview.show(my_dynamic_refresh);
			
			});
		}

	});
}(mui, zs)