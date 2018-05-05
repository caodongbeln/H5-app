/*!
 * =====================================================
 * zs v1.0.0 ()
 * =====================================================
 */
!
function(mui, zs) {
	zs.SurroundingDynamicActivityPage = zs.UserPage.extend({
		//标记是否已经绑定事件  解决事件重复绑定的问题
		isevent: false,
		//标记用户当前点击的是哪条活动
		activityid: false,
		//当前活动缓存
		thisActivity: null,
		//当前活动在列表页的i值
		acticityIndex: null,
		//经纬度
		surroundLng: null,
		surroundLat: null,
		//页码
		pagenum: 1,
		initPage: function() {
			var cls = this;
			mui.plusReady(function() {
				zs.Location.getCurrentPosition(function(r) {
					cls.surroundLng = r.coords.longitude;
					cls.surroundLat = r.coords.latitude;					
				});
				//从本机取动态缓存
				var surroundingDynamicActivity = zs.getItem('surroundingDynamicActivity');
				try{
					surroundingDynamicActivity = JSON.parse(surroundingDynamicActivity);
				}catch(e){
					//TODO handle the exception
					surroundingDynamicActivity = false;
				}
				surroundingDynamicActivity && cls.renderDynamic(surroundingDynamicActivity, 1);
				pulldownRefresh();
				mui.init({
					pullRefresh: {
						container: '#pullrefresh',
						down: {
							contentdown: "下拉可以刷新", //可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
							contentover: "释放立即刷新", //可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
							contentrefresh: "正在刷新...", //可选，正在刷新状态时，下拉刷新控件上显示的标题内容
							callback: pulldownRefresh
						},
						up: {
							contentrefresh: '正在加载...',
							callback: pullupRefresh
						}
					}
				});
				/**
				 * 下拉刷新具体业务实现
				 */
				function pulldownRefresh() {
					setTimeout(function() {
						var params = {};
						params.uid = zs.User.isLogin();
						params.type = 'other';
						params.lng = cls.surroundLng;
						params.lat = cls.surroundLat;
						params.pagesize = 10;
						params.pagenum = 1;
						zs.Api.post('strategy', 'lists', params, function(surroundingDynamicActivity) {
							//处理返回值 de 时间格式 图片地址  距离 另外处理
							var data = surroundingDynamicActivity.data;
							if(data == null || data == '') {
								return;
							}
							for(var i = 0; i < data.length; i++) {
								data[i].val = 0;
								data[i].pagenum = 1;
								//修改时间
								data[i].deal_time = getShortTime(data[i].starttime);
								//增加一段数据，用来往发送动态位置页传值
								data[i].releasePosition = {
									lng: data[i].lng,
									lat: data[i].lat,
									address: data[i].addr
								};
								data[i].releasePosition = JSON.stringify(data[i].releasePosition);
							}

							//先更新缓存，再调用填充函数
							zs.setItem('surroundingDynamicActivity', JSON.stringify(surroundingDynamicActivity));
							$('#mui-content').empty();
							cls.renderDynamic(surroundingDynamicActivity, 1);
							zs.closeWaiting();
						});
						mui('#pullrefresh').pullRefresh().endPulldownToRefresh(); //refresh completed

					}, 1500);

				}
				/**
				 * 上拉加载具体业务实现
				 */
				function pullupRefresh() {
					setTimeout(function() {
						cls.pagenum += 1;
						var params = {};
						params.uid = zs.User.isLogin();
						params.type = 'other';
						params.lng = cls.surroundLng;
						params.lat = cls.surroundLat;
						params.pagesize = 10;
						params.pagenum = cls.pagenum;
						zs.Api.post('strategy', 'lists', params, function(surroundingDynamicActivity) {
							//处理返回值 de 时间格式 图片地址  距离 另外处理
							var data = surroundingDynamicActivity.data;
							zs.d(JSON.stringify(data));
							if(!data) {
								mui('#pullrefresh').pullRefresh().endPullupToRefresh((true)); //参数为true代表没有更多数据了。
								return
							}
							
							var len = $('.activity-list').length;
							
							for(var i = 0; i < data.length; i++) {
								if(len) {
									data[i].val = len;
								} else {
									data[i].value = 0;
								}
								//拼接图片
								data[i].pagenum = cls.pagenum;
								if($.isArray(data[i].imgs)) {
									data[i].isarray = data[i].imgs.length;
								} else {
									data[i].isarray = 0;
								}
								//修改时间
								data[i].deal_time = getShortTime(data[i].atime);
								//增加一段数据，用来往发送动态位置页传值
								data[i].releasePosition = {
									lng: data[i].lng,
									lat: data[i].lat,
									address: data[i].addr
								};
								data[i].releasePosition = JSON.stringify(data[i].releasePosition);
							}
							
							//从本机取动态缓存
							var oldsurroundingDynamicActivity = zs.getItem('surroundingDynamicActivity');
							try {
								oldsurroundingDynamicActivity = JSON.parse(oldsurroundingDynamicActivity);
								var olddata = oldsurroundingDynamicActivity.data;
								for (i=0;i<data.length;i++){
									olddata.push(data[i]);								
								}	
								zs.setItem('surroundingDynamicActivity', JSON.stringify(oldsurroundingDynamicActivity));
							} catch(e) {
								//TODO handle the exception
								zs.setItem('surroundingDynamicActivity', JSON.stringify(surroundingDynamicActivity));
							}
							
							
							cls.renderDynamic(surroundingDynamicActivity, 0);
							mui('#pullrefresh').pullRefresh().endPullupToRefresh((false)); //参数为true代表没有更多数据了。
							//							cls.clickEvent()
						});

					}, 1500);
				}

			})

		},
		initEvent: function() {
			var cls = this;
			cls.clickEvent();
			window.addEventListener('isDianzanlist', function(event) {
				//取到判断是取消还是增加点赞的字段
				var isdianzan = event.detail.isdianzan;
				//取到该评论对应的活动的id
				var id = '#dianzan-dianji' + event.detail.activityid;
				if(isdianzan) {
					$(id).addClass('dianzan-active');
				} else {
					$(id).removeClass('dianzan-active');
				}
			})
		},
		//动态的填充函数
		renderDynamic: function(surroundingDynamicActivity, type) {
			var cls = this;
			data = surroundingDynamicActivity.data;
			zs.template('mui-content', 'surrounding_dynamic_activity', {
				list: data
			}, 'append');
			//填充完后开始处理距离并补充到页面中distance-release
			get_distance(data, type);
			//cls.clickEvent();
			function get_distance(data, type) {
				if(type == 1) {
					//说明是下拉刷新调用
					var id = ".juli1";
				} else {
					//上拉加载调用
					var id = ".juli" + cls.pagenum;
				}
				$(id).each(function(i, domEle) {
					zs.Location.distance(data[i].lng, data[i].lat, function(dis) {
						$(domEle).html('距离' + getShortDis(dis));
					});
				});
			}

		},
		//填充距离

		clickEvent: function() {
			var cls = this;
			mui.plusReady(function() {
				//该方法包含了页面中所有的点击事件

				//点赞与取消点赞逻辑
				var isbusy = true;
				mui(document.body).on('tap', 'i[data-dianzan]', function(event) {
					var _this = this;
					var index = $(_this).attr('data-index');
					var activityid =  $(_this).attr('data-dianzan');
					var val = $(_this).attr('data-val');
						index = parseInt(index) + parseInt(val);
					event.stopPropagation();
					if(isbusy) {
						if($(_this).hasClass('dianzan-active')) {
							isbusy = false;
							var params = {};
							//动态的id
							params.sid = $(_this).attr('data-dianzan');
							//点赞者的id
							params.uid = zs.User.isLogin();
							zs.Api.post('strategy_like', 'delete', params, function(r) {
								$(_this).removeClass('dianzan-active'); 
								cls.removeDianzan(activityid,index);
								isbusy = true;
							}, function(e) {
								isbusy = true;
							})

						} else {
							isbusy = false;
							var params = {};
							params.sid = $(_this).attr('data-dianzan');
							params.uid = zs.User.isLogin();
							zs.Api.post('strategy_like', 'add', params, function(r) {
								$(_this).addClass('dianzan-active');
								cls.addDianzan(activityid,index);
								isbusy = true;
							}, function(e) {
								isbusy = true;
							})
						}
					}

				});

				mui(document.body).on('tap', '.header', function() {
					var uid = $(this).attr('data-uid');
					var username = $(this).attr('data-username');
					var isfriend = zs.Friend.get(uid);
					if(uid == zs.User.isLogin()) {
						zs.open('personal.html', 'personal')
					} else if(isfriend) {
						zs.open('friend_detail.html', 'friend_detail', {
							data_id: uid,
							dynamicname: username
						});
					} else {
						zs.open('stranger_default.html', 'stranger_default', {
							data_id: uid
						});
					}
				})

			})

		},
		addDianzan: function(activityid, index) {
			var cls = this;
			var id = '#dianzan-dianji' + activityid;
			//取本机的头像
			var cover = {};
			cover.cover = zs.User.get_userinfo().cover;
			cover.uid = zs.User.get_userinfo().id;
			cover.username = zs.User.get_userinfo().username;
			cover.sid = activityid;
			//取该条活动的缓存
			var surroundingDynamicActivity = JSON.parse(zs.getItem('surroundingDynamicActivity'));
			cls.thisActivity = surroundingDynamicActivity.data[index];
			//修改标记是否有人点赞的字段
			cls.thisActivity.is_trategy_likeInfo = true;
			//增加数据，分两种情况，一种本来就有点赞，那么该字段就是数组，若本来没有，默认的传过来的该字段为null，需要变成空数组
			if(isArray(cls.thisActivity.strategy_likeInfo)) {

			} else {
				cls.thisActivity.strategy_likeInfo = [];
			}

			cls.thisActivity.strategy_likeInfo.unshift(cover);
			//修改标记本机用户点赞的字段
			cls.thisActivity.is_like = 1;
			//给点赞图标增加选中效果
			$(id).addClass('dianzan-active');
			//存缓存
			surroundingDynamicActivity.data[index] = cls.thisActivity;
			var cache = JSON.stringify(surroundingDynamicActivity);
			zs.setItem('surroundingDynamicActivity', cache);
		},
		removeDianzan: function(activityid, index) {
			var cls = this;
			var id = '#dianzan-dianji' + activityid;

			//取该条活动的缓存
			var surroundingDynamicActivity = JSON.parse(zs.getItem('surroundingDynamicActivity'));
			cls.thisActivity = surroundingDynamicActivity.data[index];

			for(var i = 0; i < cls.thisActivity.strategy_likeInfo.length; i++) {
				if(cls.thisActivity.strategy_likeInfo[i].uid == zs.User.isLogin()) {
					cls.thisActivity.strategy_likeInfo.del(i);
					if(!cls.thisActivity.strategy_likeInfo.length) {
						cls.thisActivity.is_trategy_likeInfo = false;
					}
					break;
				}
			}
			cls.thisActivity.is_like = 0;
			$(id).removeClass('dianzan-active');
			//存缓存
			surroundingDynamicActivity.data[index] = cls.thisActivity;
			var cache = JSON.stringify(surroundingDynamicActivity);
			zs.setItem('surroundingDynamicActivity', cache);
		}
	});
}(mui, zs)