/*!
 * =====================================================
 * zs v1.0.0 ()
 * =====================================================
 */
!
function(mui, zs) {
	zs.AdsPage = zs.UserPage.extend({
		ads_url: 'http://api.borui-ad.com/getad?ads=bfibbdjfdgj60',
		initPage: function() {

		},
		initEvent: function() {
			var cls = this;
			mui.plusReady(function() {
				var i = 3,
					intervalid, login_page;
				login_page = plus.webview.create('login.html', 'login');
				intervalid = setInterval(time, 1000);
				var ads_url = cls.ads_url;
				$.ajax({
					url: ads_url,
					success: function(data) {
						$('#adsImg').attr('src', data.result.ad_pic_url);
						$('.ads_operation_footer').click('tap', function() {
							var ac_url = data.result.ad_url;
							zs.open(ac_url);
						})
					}
				});

				function time() {
					i--;
					document.getElementById("time").innerHTML = i;
					if(i == 1) {
						Location(i);
					}
					document.getElementById('item').addEventListener('tap', function() {
						Location(i);
					})
				}

				function Location(i) {
					if(i == 1) {
						if(zs.User.isLogin()) {
							plus.webview.create('index.html', 'index');
						} else {
							login_page.show();
						}
						setTimeout(function() {
							plus.webview.currentWebview().close();
							clearInterval(intervalid);
						}, 1000)
					}
				}
			})
		}
	});
}(mui, zs);