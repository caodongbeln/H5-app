/*!
 * =====================================================
 * zs v1.0.0 ()
 * =====================================================
 */
!
function(mui, zs) {
	zs.SelPropPage = zs.UserPage.extend({
		initPage: function() {
			mui.plusReady(function() {
				var cls = this;
				var tid = plus.webview.currentWebview().tid;
				zs.Api.post('tools_sales', 'lists', {
					uid:zs.User.isLogin()
				}, function(gold) {
					var n = 0;
					for(var i = 0;i<gold.data.length;i++){
						if(gold.data[i].tid == tid){
							n++
						}
					}
					if(n == 0){
						$('#submit').css('display','none');
					}
					if(gold.data.dialog  == 0 || n==0){
						var noResults = '<div class="no-result">您没有可以使用的道具,快去购买吧~</div>';
						$('#propContent').append(noResults);
					}
					zs.template('propContent', 'sel_prop_content', {
						list: gold.data,
						get_tid:tid
					}, 'append');
				});
			})
		},
		initEvent: function() {
			mui.plusReady(function() {
				var fid = plus.webview.currentWebview().fid;
				var cata = plus.webview.currentWebview().opener().id;
				var tid = plus.webview.currentWebview().tid;
				mui(document.body).on('tap', '#submit', function() {
					var type = $('.mui-selected').find('.riqibiaoshi').attr('type');
					if ($('.mui-selected').attr('data_tid') == tid) {
						if (cata == 'friend_detail') {
							var detailPage = plus.webview.getWebviewById('friend_detail');
							mFire(detailPage)
						} else if (cata == 'tip') {
							var detailPage = plus.webview.getWebviewById('tip');
							mFire(detailPage)
						} else if (cata == 'setting_location_relationship') {
							var detailPage = plus.webview.getWebviewById('setting_location_relationship');
							mFire(detailPage)
						}else if(cata == '../tpl/privacy'){
							var detailPage = plus.webview.getWebviewById('../tpl/privacy');
							Privacy(detailPage)
						}
						mui.back();
					} else if ($('.mui-selected').attr('data_tid') == 18085) {
						var detailPage = plus.webview.getWebviewById('privacy');
						mui.fire(detailPage, 'go_loc', {
							type: type,
							tid: $('.mui-selected').attr('data_tid'),
							sid: $('.mui-selected').attr('data_id')
						});
					}

					function mFire(detail) {
						mui.fire(detail, 'go_loc', {
							type: type,
							tid: $('.mui-selected').attr('data_tid'),
							sid: $('.mui-selected').attr('data_id'),
							fid: fid
						});
					}
					function Privacy(detail) {
						mui.fire(detail, 'privacy', {
							type: type,
							tid: $('.mui-selected').attr('data_tid'),
							sid: $('.mui-selected').attr('data_id')
						});
					}
				})
			})
		},
	});
}(mui, zs);