/*!
 * =====================================================
 * zs v1.0.0 ()
 * =====================================================
 */
!
function(mui, zs) {
	zs.ListpagePage = zs.UserPage.extend({
		initPage: function() {
		},
		initEvent: function() {
			mui.plusReady(function() {
				var logo = '_listpage';
				//如果搜索过城市就按搜索的城市往后台传值，该缓存在上一页面有存
				if (zs.getItem('search_callback')) {
					var a = zs.getItem('search_callback');
					var city_id = JSON.parse(a).id;
				} else {
					var city_id = JSON.parse(zs.getItem(zs.Location.city_cache_key)).id;
				}
				var num = false; //默认上拉加载时用一次
				//先渲染页面   最后在渲染一次
				//免费向导
				var list = zs.Guide.getItem(logo);
				list && renderGuide(JSON.parse(list));
				//游客列表
				list = zs.Tourist.getItem(logo);
				list && renderTourist(JSON.parse(list));
				//本地活动列表
				list = zs.LocalActivities.getItem(logo);
				list && renderLocalActivities(JSON.parse(list));
				//判断刷新和上拉加载要加载哪个选项的数据
				var c_id = zs.getItem('c_id');
				//显示div以及修改3个标题栏的选中样式
				if (c_id == 'guide_list') {
					$('#guide_list_box').css('display', 'block');
				} else if (c_id == 'visitor_list') {
					$('#tourist_list_box').css('display', 'block');
				} else if (c_id == 'local_activity') {
					$('#local_activity_box').css('display', 'block');
				}
				window.addEventListener('changeDiv', function(event) {
					var ID = event.detail;
					id = ID.id;
					$('#guide_list_box').css('display', 'none').next().css('display', 'none').next().css('display', 'none');
					$(id).css('display', 'block');
				})

				var guide_count = 1,
					tourist_count = 1,
					continued_guide = false,
					continued_tourist = false,
					continued_local = false,
					local_count = 1;
				if (guide_count || tourist_count || local_count) {
					pullupRefresh();
					//下拉刷新和上拉加载部分
					mui.init({
						pullRefresh: {
							container: '#pullrefresh',
							down: {
								callback: pulldownRefresh
							},
							up: {
								auto: false,
								contentrefresh: '正在加载...',
								callback: pullupRefresh
							}
						}
					});
				}
				/*
				 *如果用户从搜索页返回来的  那么再次下拉刷新就刷的是搜索到的内容，即ajax往后台发送的条件得改
				 * 取两个缓存search_guide和search_tourist若有，则刷新这里面的内容
				 * 
				 * */

				/**
				 * 下拉刷新具体业务实现
				 */
				function pulldownRefresh() {
					alert('进入下拉刷新');
					setTimeout(function() {
						if (zs.getItem('c_id') == 'guide_list') {
							//向导页刷新
							var params = {
								pagenum: 1,
								pagesize: 2,
								is_free_guide: 1,
								city: city_id
							};
							if (zs.getItem('search_guide')) {
								var params = JSON.parse(zs.getItem('search_guide'));
								params.is_free_guide = 1;
								params.city = city_id;
								zs.d(JSON.stringify(params));
							};
							zs.Guide.get_guide(logo, params, function(list) {
								$('#guide_list').html('');
								zs.template('guide_list', 'guide_list_refresh', {
									list: list
								}, 'prepend');
							});
						} else if (zs.getItem('c_id') == 'visitor_list') {
							//游客页刷新
							params = {
								pagenum: 1,
								pagesize: 2,
								city: city_id 
							};
							//如果用户有高级搜索内容，那么上拉加载和下拉刷新就是高级搜索内容
							if (zs.getItem('search_tourist')) {
								var params = JSON.parse(zs.getItem('search_tourist'));
							}
							zs.Tourist.get_tourist(logo, params, function(list) {
								$('#tourist_list').html('');
								zs.template('tourist_list', 'tourist_list_refresh', {
									list: list
								}, 'prepend');
								//下拉刷新完了重置变量
							});
						} else {
							//本地活动页刷新
							var params = {
								pagenum: 1,
								pagesize: 2,
								city: city_id
							};
							zs.LocalActivities.get_local_activities(logo, params, function(list) {
								$('#tourist_list').html('');
								zs.template('activity_list', 'local_refresh', {
									list: list
								}, 'prepend');
							});
						}
						mui('#pullrefresh').pullRefresh().endPulldownToRefresh(); //refresh completed
					}, 1500);
				}
				/**
				 * 上拉加载具体业务实现
				 */
				function pullupRefresh() {

					setTimeout(function() {
						if (!num) {
							if (!(zs.getItem('c_id') == 'guide_list')) {
								//向导页刷新
								var params = {
									pagenum: guide_count,
									pagesize: 2,
									is_free_guide: 1,
									city: city_id
								};

								zs.Guide.get_guide(logo, params, renderGuide);
								guide_count++;
								num = true;
								//mui('#pullrefresh').pullRefresh().endPullupToRefresh((continued_guide)); //参数为true代表没有更多数据了。
							};
							if (!(zs.getItem('c_id') == 'visitor_list')) {
								//游客页刷新
								params = {
									pagenum: tourist_count,
									pagesize: 2,
									city: city_id
								};

								zs.Tourist.get_tourist(logo, params, renderTourist);
								tourist_count++;
								num = true;
								///mui('#pullrefresh').pullRefresh().endPullupToRefresh((continued_tourist)); //参数为true代表没有更多数据了。
							};
							if (!(zs.getItem('c_id') == 'local_activity')) {
								//本地活动页刷新
								var params = {
									pagenum: local_count,
									pagesize: 2,
									city: city_id
								};
								zs.LocalActivities.get_local_activities(logo, params, renderLocalActivities);
								local_count++;
								num = true;
								//mui('#pullrefresh').pullRefresh().endPullupToRefresh((continued_local)); //参数为true代表没有更多数据了。
							}

						};
						zs.closeWaiting();
						if (zs.getItem('c_id') == 'guide_list') {
							//向导页刷新
							var params = {
								pagenum: guide_count,
								pagesize: 2,
								is_free_guide: 1,
								city: city_id
							};
							if (zs.getItem('search_guide')) {
								var params = JSON.parse(zs.getItem('search_guide'));
								params.pagenum++;
								params.is_free_guide = 1;
								params.city = city_id;
								zs.setItem('search_guide', JSON.stringify(params));
							};
							zs.Guide.get_guide(logo, params, renderGuide);
							guide_count++;
							mui('#pullrefresh').pullRefresh().endPullupToRefresh((continued_guide)); //参数为true代表没有更多数据了。
						} else if (zs.getItem('c_id') == 'visitor_list') {
							//游客页刷新
							params = {
								pagenum: tourist_count,
								pagesize: 2,
								city: city_id
							};
							alert('进入游客页');
							//如果用户有高级搜索内容，那么上拉加载和下拉刷新就是高级搜索内容
							if (zs.getItem('search_travel')) {
								alert('进入游客页高级刷新');
								//zs.d(zs.getItem('search_travel'));
								var params = JSON.parse(zs.getItem('search_travel'));
								params.pagenum++;
								zs.setItem('search_travel', JSON.stringify(params));
							};
							zs.Tourist.get_tourist(logo, params, renderTourist);
							tourist_count++;

							mui('#pullrefresh').pullRefresh().endPullupToRefresh((continued_tourist)); //参数为true代表没有更多数据了。
						} else {
							//本地活动页刷新
							var params = {
								pagenum: local_count,
								pagesize: 2,
								city: city_id
							};
							if (zs.getItem('search_local_activity')) {
								alert('进入本地活动页高级搜索');
								var params = JSON.parse(zs.getItem('search_local_activity'));
								params.pagenum++;
								zs.setItem('search_local_activity', JSON.stringify(params));
							}
							zs.LocalActivities.get_local_activities(logo, params, renderLocalActivities);
							local_count++;
							mui('#pullrefresh').pullRefresh().endPullupToRefresh((continued_local)); //参数为true代表没有更多数据了。
						}

					}, 1500);
				}
				if (mui.os.plus) {
					mui.plusReady(function() {
						setTimeout(function() {
							//mui('#pullrefresh').pullRefresh().pullupLoading();
						}, 1000);
					});
				} else {
					mui.ready(function() {
						//mui('#pullrefresh').pullRefresh().pullupLoading();
					});
				};
				//渲染函数
				function renderGuide(list) {
					zs.d(JSON.stringify(list));
					if (list) {
						zs.template('guide_list', 'guide_list_refresh', {
							list: list
						}, 'append');
					} else {
						continued_guide = true;
					}
				}

				function renderTourist(list) {
					if (list) {
						zs.template('tourist_list', 'tourist_list_refresh', {
							list: list
						}, 'append');
					} else {
						continued_tourist = true;
					}
				}

				function renderLocalActivities(list) {
					//zs.d(JSON.stringify(list));
					if (list) {
						zs.template('activity_list', 'local_refresh', {
							list: list
						}, 'append');
					} else {
						continued_local = true;
					}
					zs.closeWaiting();
				}

				//高级筛选事件
				/*
				 *免费向导和游客是跳页面，本地活动是显示div
				 */
				$('span[data-name]').on('click', function() {
					zs.showWaiting();
					var url = $(this).attr('data-name');
					var id = $(this).attr('data-id');
					plus.webview.create(url, id);
					plus.webview.show(id);
				});

				//下面是本地活动搜索

				//本地活动高级筛选显示隐藏
				$('#Advanced_screening').on('click', function() {
					if ($('#activity_type').hasClass('activity_type_hide')) {
						$('#activity_type').removeClass('activity_type_hide');
						$('#Advanced_screening').html('全部');
					} else {
						$('#activity_type').addClass('activity_type_hide');
						$('#Advanced_screening').html('高级搜索');
					}
				});
				$('#activity_type').find('input').on('click', function() {
					zs.showWaiting();
					$('#activity_type').find('input').removeClass('selected');
					var cate = $(this).addClass('selected').attr('name');
					//
					local_count = 1;
					var params = {
						pagenum: local_count,
						pagesize: 2,
						city: city_id,
						cate: cate
					};
					//隐藏搜索无结果框
					$('#no_result_local').css('display','none');
					//清空上次的数据
					$('#activity_list').empty();
					zs.LocalActivities.get_local_activities(logo, params, function(r){
						//zs.d(r);
						//zs.d(JSON.stringify(r));
						if(r){
							//启用上拉加载和下拉刷新
						mui('#pullrefresh').pullRefresh().enablePullupToRefresh();
						zs.template('activity_list', 'local_refresh', {
							list: r
						}, 'append');
						//显示搜到的结果
						$('#activity_list').css('display','block');
					} else {
						//禁用上拉加载和下拉刷新
						mui('#pullrefresh').pullRefresh().disablePullupToRefresh();
						$('#activity_list').css('display','none')
						$('#no_result_local').css('display','block');
						
						
					}
					zs.closeWaiting();
					});
					//
					zs.setItem('search_local_activity', JSON.stringify(params));
				});

			})

		},
	});
}(mui, zs);