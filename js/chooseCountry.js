/*!
 * =====================================================
 * zs v1.0.0 ()
 * =====================================================
 */
!
function(mui, zs) {
	zs.ChooseCountryPage = zs.UserPage.extend({
		initConfig: function() {},
		initPage: function() {		
			zs.removeItem('COUNTRY_LIST');
			var list = zs.getItem('COUNTRY_LIST');
			if (list) {
				renderList(JSON.parse(list));
			} else {
				zs.Api.post('country', 'lists', {}, function(ret) {
					zs.d(JSON.stringify(ret));
					if (ret && ret.status == 1) {
						zs.setItem('COUNTRY_LIST', JSON.stringify(ret.data));
						renderList(ret.data);
					}
					zs.closeWaiting();
				});
			}

			function renderList(list) {
				for (var i in list) {
					list[i]['detail'] = JSON.stringify(list[i]);
					zs.d(list[i]['detail']);
				}
				zs.template('container', 'chooseCountry', {
					list: list
				}, 'append');
			}
		},
		initEvent: function() {
			mui('#container').on('tap', 'li', function(node) {
				var detail = this.getAttribute('data-detail');
				if (detail) {
					var country = JSON.parse(detail);
					var opener = plus.webview.currentWebview().opener();
					opener && mui.fire(opener, 'chooseCountry', country);
					mui.back();
				}
			});
		},
	});
}(mui, zs);