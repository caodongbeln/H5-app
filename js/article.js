/*!
 * =====================================================
 * zs v1.0.0 ()
 * =====================================================
 */
!
function(mui, zs) {
	zs.ArticlePage = zs.UserPage.extend({
		initPage: function() {
			mui.plusReady(function() {
				var aid = plus.webview.currentWebview().data_id;
				zs.Api.post('article', 'info', {id:aid}, function(info) {
					$('#articleContent').html(info.data.info);
					$('#article_title').text(info.data.title);
				})
			})
		},
		initEvent: function() {

		},
	});
}(mui, zs);