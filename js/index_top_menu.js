/*!
 * =====================================================
 * zs v1.0.0 ()
 * =====================================================
 */
!
function(mui, zs) {
	zs.IndexTopMenuPage = zs.UserPage.extend({
		initEvent: function() {
			mui(document.body).on('tap', 'ul>li', function() {
				setTimeout(function() {
					plus.webview.currentWebview().hide()
				}, 1000);
			});
		}
	})
}(mui, zs);