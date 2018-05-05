/*!
 * =====================================================
 * zs v1.0.0 ()
 * =====================================================
 */
!
function(mui, zs) {
	zs.Message_notificationPage = zs.UserPage.extend({
		initPage: function() {
			zs.template(document.body, 'footer', {nav: 'msg'}, 'append');		
		},
		initEvent: function() {

		},
	});
}(mui, zs);