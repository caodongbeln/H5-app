/*!
 * =====================================================
 * zs v1.0.0 ()
 * =====================================================
 */
!
function(mui, zs) {
	zs.CouponPage = zs.UserPage.extend({
		initPage: function() {
		},
		initEvent: function() {
			mui.plusReady(function() {
				var status = $('.menu-selected').attr('value');
				parmas = {
					uid: zs.User.isLogin(),
					status: status
				}
				zs.Api.post('coupon_user', 'lists', parmas, function(coupon) {
					renderCoupon(coupon.data);
				})
				$('.menu').find('li').click('tap', function() {
					zs.showWaiting();
					$('#couponContent').empty();
					$(this).addClass('menu-selected').siblings().removeClass('menu-selected');
					var status = $(this).attr('value');
					parmas = {
						uid: zs.User.isLogin(),
						status: status
					}
					zs.Api.post('coupon_user', 'lists', parmas, function(coupon) {
						zs.closeWaiting();
						renderCoupon(coupon.data);
					})
				})

				function renderCoupon(coupon) {
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
					zs.template('couponContent', 'coupon_content', {
						list: coupon
					}, 'append');
				}

				function formatDate(now) {
					var year = now.getFullYear();
					var month = now.getMonth();
					var date = now.getDate();
					return year + '-' + month + "-" + date;
				}
			})
		},
	});
}(mui, zs);