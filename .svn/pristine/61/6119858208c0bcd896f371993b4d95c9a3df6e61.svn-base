/*!
 * =====================================================
 * zs v1.0.0 ()
 * =====================================================
 */
!
function(mui, zs) {
	zs.StrangerdefaultPage = zs.UserPage.extend({
		initConfig: function() {},
		initPage: function() {
			
		},
		initEvent: function() {
			mui.plusReady(function() {
				zs.Api.post('user', 'info', {
						uid:plus.webview.currentWebview().data_id				
					}, function(result) {
						if(result.status ==1){
							
						}
					})
				
				mui(document.body).on("tap", "#button", function() {
				//document.getElementById('button').addEventListener('tap', function() {
					alert(111);
					mui.openWindow({
						url: '../tpl/addstranger.html',
						id: 'addstranger',
						extras: {
							data_id:plus.webview.currentWebview().data_id,
							source:plus.webview.currentWebview().source
						},
						createNew: true
					});
				})		
			});
			
		},
	});
}(mui, zs)