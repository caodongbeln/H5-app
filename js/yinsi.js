/*!
 * =====================================================
 * zs v1.0.0 ()
 * =====================================================
 */
!
function(mui, zs) {
	zs.YinsiPage = zs.UserPage.extend({
		initPage: function() {
			var cls = this;
			mui.plusReady(function() {
				type = zs.User.get_userinfo().privacy;
				var selLi = $('.mui-table-view-radio').find('li')
				var len = selLi.length;
				for (var i = 0; i < len; i++) {
					if (selLi[i].value == type) {
						selLi[i].className += '' + mui - selected;
					}
				}
			})
		},
		initEvent: function() {
//			document.getElementById('all').addEventListener('tap',function(){
//				alert('dfgdfgdfg');
//			})
			document.querySelector('.mui-table-view.mui-table-view-radio').addEventListener('selected', function(e) {
				selVal = e.detail.el.value;
//				if(selVal == '3'){
//					alert('ghgfhfgh');
//				}
				document.getElementById("back").addEventListener("tap", function() {
//					parmas = {
//						id: zs.User.isLogin(),
//						privacy: selVal
//					}
//					zs.Api.post('user', 'edit', parmas, function() {
//						zs.toast('设置成功')
//					})
					alert('ghgfhfghgf');
				})
			});
		},
	});
}(mui, zs);