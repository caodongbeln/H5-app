/*!
 * =====================================================
 * zs v1.0.0 ()
 * =====================================================
 */
!
function(mui, zs) {
	zs.SurroundingDynamicPage = zs.UserPage.extend({
		choosePoint: null,
		initPage: function() {
			//本页主要是用于创建两个子页面
			zs.template('nav', 'footer', {
				navs: zs.data.nav,
				active: 'discovery'
			});
		},
		initEvent: function() {
			var cls = this;
			mui.plusReady(function() {
				nav_resh();
				var mydate = new Date();
				var surrounding_dynamic_dynamic = plus.webview.create('surrounding_dynamic_dynamic.html', 'surrounding_dynamic_dynamic', {
					top: '44px',
					bottom: '50px'
				});
				var surrounding_dynamic_activity = plus.webview.create('surrounding_dynamic_activity.html', 'surrounding_dynamic_activity', {
					top: '44px',
					bottom: '50px'
				});
				plus.webview.currentWebview().append(surrounding_dynamic_dynamic);
				plus.webview.currentWebview().append(surrounding_dynamic_activity);
				surrounding_dynamic_dynamic.addEventListener('loaded',function(){
					plus.webview.show(surrounding_dynamic_dynamic);
					plus.webview.hide(surrounding_dynamic_activity);
				})
				
				document.getElementById('dynamic').addEventListener('tap', function() {
					plus.webview.show(surrounding_dynamic_dynamic);
					plus.webview.hide(surrounding_dynamic_activity);
				})
				document.getElementById('activity').addEventListener('tap', function() {
					plus.webview.hide(surrounding_dynamic_dynamic);
					plus.webview.show(surrounding_dynamic_activity);
				})
			
			window.addEventListener('changeNav',function(event){
				var ishidden = event.detail.ishidden;
				alert(ishidden);
				if(ishidden){
					$('#nav').removeClass('block').addClass('none');
				}else{
					$('#nav').removeClass('none').addClass('block');
				}
			})
			document.getElementById('fabu').addEventListener('tap',function(){
				var id = $('#slider').find('.mui-active').attr('id');
				if(id == 'activity'){
					zs.open('../tpl/post_activity.html','post_activity');
				}else{
					zs.open('release_the_dynamic.html','release_the_dynamic');
				}
			})
			window.addEventListener('resh', function(event) {
					nav_resh();
				});
				function nav_resh() {				
					if(zs.User.isLogin()){
						zs.Api.post('invite', 'unreadtotal', {
							uid: zs.User.isLogin()
						}, function(result) {
							if (result.status == 1) {
								zs.d(JSON.stringify(zs.data.nav));
								zs.template('nav', 'footer', {
									navs: zs.data.nav,
									active: 'discovery',
									total_unread: result.data
								});
							}					
						})
					} else {
						zs.template('nav', 'footer', {
							navs: zs.data.nav,
							active: 'discovery',
							total_unread: 0
						});
					}				
				}
			});
		}

	});
}(mui, zs)