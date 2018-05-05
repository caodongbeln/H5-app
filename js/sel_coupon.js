/*!
 * =====================================================
 * zs v1.0.0 ()
 * =====================================================
 */
!
function(mui, zs) {
	zs.sel_CouponPage = zs.UserPage.extend({
		initPage: function() {
			document.querySelector('.mui-table-view.mui-table-view-radio').addEventListener('selected', function(e) {
				var coupon_id = $('.mui-selected').attr('data-id'),
					cid = $('.mui-selected').attr('data-cid'),
					couponInfo_id = $('.mui-selected').attr('data-gid'),
					coupon_name = $('.mui-selected').find('#coupon_name').text(),
					detailPage = plus.webview.getWebviewById('pay');
					if($('.mui-selected').find('#coupon_name').hasClass('num')){
						var coupons_name = parseInt(coupon_name);
					}else{
						var coupons_name = coupon_name.toString();
					}
				mui.fire(detailPage, 'get_coupon', {
					id: coupon_id,
					cid:cid,
					coupon_name: coupons_name,
					couponInfo_id:couponInfo_id
				});
				plus.webview.currentWebview().close();
			});
		},
		initEvent: function() {
			mui.plusReady(function() {
				var tools_id = plus.webview.currentWebview().data_id;
				var cate_type = plus.webview.currentWebview().cate_type;
				var status = $('.menu-selected').attr('value');
				parmas = {
					uid: zs.User.isLogin(),
					status: 1
				}
				zs.Api.post('coupon_user', 'lists', parmas, function(coupon) {
					renderCoupon(coupon.data,tools_id,cate_type);
				})
				function renderCoupon(coupon,tools_id,cate_type) {
					if (coupon != null) {
						var len = coupon.length;
						for (var i = 0; i < len; i++) {
							var starttime = new Date(parseInt(coupon[i].starttime) * 1000);
							var btime = formatDate(starttime);
							coupon[i].couponInfo.btime = btime;
							var endtime = new Date(parseInt(coupon[i].endtime) * 1000);
							var etime = formatDate(endtime);
							coupon[i].couponInfo.etime = etime
						};

					} else {
						coupon = null
					}
					zs.template('couponContent', 'sel_coupon_content', {
						list: coupon,
						toolsId:tools_id,
						cate_type:cate_type
					}, 'append');
				}

				function formatDate(now) {
					var year = now.getFullYear();
					var month = now.getMonth();
					var date = now.getDate();
					return year + '-' + month + "-" + date;
				};
			})
		},
	});
}(mui, zs);