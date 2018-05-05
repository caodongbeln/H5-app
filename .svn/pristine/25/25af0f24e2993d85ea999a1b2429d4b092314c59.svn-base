/*!
 * =====================================================
 * zs v1.0.0 ()
 * =====================================================
 */
!
function(mui, zs) {
	zs.StrangerrefreshPage = zs.UserPage.extend({
		initPage: function() {
			var cls = this;
			mui.plusReady(function() {
				//下拉刷新和上拉加载实现  初始化过程
				mui.init({
					pullRefresh: {
						container: '#pullrefresh',
						down: {
							callback: pulldownRefresh
						},
						up: {
							contentrefresh: '正在加载...',
							callback: pullupRefresh
						}
					}
				});
				var count = 1;
				var bool = false;
				get_stranger_list();
				/**
				 * 下拉刷新具体业务实现
				 */
				function pulldownRefresh() {
					setTimeout(function() {
						count = 1;
						bool = false;
						$('#stranger_list').empty();
						get_stranger_list();
						mui('#pullrefresh').pullRefresh().endPulldownToRefresh(); //refresh completed
					}, 1500);
				}

				/**
				 * 上拉加载具体业务实现
				 */
				function pullupRefresh() {
					++count;
					setTimeout(function() {
						if(bool) {
							mui('#pullrefresh').pullRefresh().endPullupToRefresh(bool); //参数为true代表没有更多数据了。
						} else {
							get_stranger_list();
							mui('#pullrefresh').pullRefresh().endPullupToRefresh(bool); //参数为true代表没有更多数据了。
						}
					}, 1500);
				}

				function get_stranger_list() {
					zs.Api.post('user', 'lists', {
						uid: zs.User.isLogin(),
						pagenum: count,
						pagesize: 20
					}, function(result) {
						var len = result.data.length;
						for(var i = 0; i < len; i++) {
							//字符串转化为浮点数,四舍五入保留一个小数点
							if(result.data[i].distance != null || result.data[i].distance != undefined) {
								var new_distance = parseFloat(result.data[i].distance)
								result.data[i].distance = new_distance.toFixed(1);
							}
						}
						if(len) {
							for(var i = 0; i < len; i++) {
								result.data[i].atime = getShortTime(result.data[i].atime);
								result.data[i].address = result.data[i].address;

							}
							zs.template('stranger_list', 'stranger_list', {
								list: result.data
							}, 'append');
							get_distance(result.data);
						} else {
							bool = true;
						}

					})
				}

				function get_distance(list) {
					mui(".distance").each(function(i, element) {
						if(list[i].user_location) {
							zs.Location.distance(list[i].user_location.longitude, list[i].user_location.latitude, function(dis) {
								$("#distance_" + list[i].id).text('距离' + getShortDis(dis).toFixed(1));
							});
						}

					});
				}
			});
		},
		initEvent: function() {

		},
		initBack: function() {

		},
	});
}(mui, zs);