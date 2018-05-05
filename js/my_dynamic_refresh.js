/*!
 * =====================================================
 * zs v1.0.0 ()
 * =====================================================
 */
!
function(mui, zs) {
	zs.MyDynamicRefreshPage = zs.UserPage.extend({
		//标记是否已经绑定事件  解决事件重复绑定的问题
		isevent: false,
		//标记用户当前点击的是哪条动态
		isdynamic: false,
		//当前动态缓存
		thisDynamic: null,
		//当前动态在列表页的i值
		dynamicIndex: null,
		//经纬度
		surroundLng: null,
		surroundLat: null,
		//页码
		pagenum: 1,
		initPage: function() {
			var cls = this;
			mui.plusReady(function() {
				zs.showWaiting();
				//从本机取动态缓存
				var myDynamic = zs.getItem('myDynamic');
				try {
					myDynamic = JSON.parse(myDynamic);
				} catch(e) {
					//TODO handle the exception
					myDynamic = false;
				}
				myDynamic && cls.renderDynamic(myDynamic, 1);
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
						params.pagesize = 10;
						params.pagenum = 1;
						zs.Api.post('say', 'lists', params, function(myDynamic) {
							//处理返回值 de 时间格式 图片地址  距离 另外处理
							var data = myDynamic.data;
							if(data == undefined || data == ''){
								if(data == null || data == '') {
								var no_results = "<div>您还没有发布任何动态信息</div>"
									$('#no-result-content').append(no_results);
								}
							}
							for(var i = 0; i < data.length; i++) {
								data[i].pagenum = 1;
								//增加表示有几张图片的字段
								if($.isArray(data[i].imgs)) {
									data[i].isarray = data[i].imgs.length;
								} else {
									data[i].isarray = 0;
								}
								//修改时间
								data[i].deal_time = getShortTime(data[i].atime);
								//增加显示评论有几条的属性  commentscount
								if(data[i].say_commentInfo) {
									data[i].commentscount = data[i].say_commentInfo.length;
								} else {
									data[i].commentscount = 0;
								}
								//增加一段数据，用来往发送动态位置页传值
								data[i].releasePosition = {
									lng: data[i].lng,
									lat: data[i].lat,
									address: data[i].addr
								};
								data[i].releasePosition = JSON.stringify(data[i].releasePosition);
							}

							//先更新缓存，再调用填充函数
							zs.setItem('myDynamic', JSON.stringify(myDynamic));
							$('#mui-content').empty();
							cls.renderDynamic(myDynamic, 1);
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
						params.pagesize = 10;
						params.pagenum = cls.pagenum;
						zs.Api.post('say', 'lists', params, function(myDynamic) {
							//处理返回值 de 时间格式 图片地址  距离 另外处理
							var data = myDynamic.data;
							zs.d(JSON.stringify(data));
							if(!data) {
								mui('#pullrefresh').pullRefresh().endPullupToRefresh((true)); //参数为true代表没有更多数据了。
								return
							}

							for(var i = 0; i < data.length; i++) {
								//拼接图片
								data[i].pagenum = cls.pagenum;
								if($.isArray(data[i].imgs)) {
									data[i].isarray = data[i].imgs.length;
								} else {
									data[i].isarray = 0;
								}
								//修改时间
								data[i].deal_time = getShortTime(data[i].atime);
								//增加显示评论有几条的属性  commentscount
								if(data[i].say_commentInfo) {
									data[i].commentscount = data[i].say_commentInfo.length;
								} else {
									data[i].commentscount = 0;
								}
								//增加一段数据，用来往发送动态位置页传值
								data[i].releasePosition = {
									lng: data[i].lng,
									lat: data[i].lat,
									address: data[i].addr
								};
								data[i].releasePosition = JSON.stringify(data[i].releasePosition);
							}
							cls.renderDynamic(myDynamic, 0);
							mui('#pullrefresh').pullRefresh().endPullupToRefresh((false)); //参数为true代表没有更多数据了。
							//							cls.clickEvent()
						});

					}, 1500);
				}
				window.addEventListener('pulldownRefresh', function(event) {
					pulldownRefresh();
				})

			})

		},
		initEvent: function() {
			var cls = this;
			cls.clickEvent();
			window.addEventListener('addPinglun', function(event) {
				//取到该评论对应的动态的id
				var dynamicid = event.detail.dynamicid;
				var	dynamicIndex = event.detail.dynamicIndex; 
				var myDynamic = JSON.parse(zs.getItem('myDynamic'));
				var thisDynamic = myDynamic.data[dynamicIndex];
					zs.d(JSON.stringify(thisDynamic));
					cls.renderpinlun(thisDynamic, dynamicid);
			});
			window.addEventListener('isDianzan', function(event) {
				//取到判断是取消还是增加点赞的字段
				var isdianzan = event.detail.isdianzan;
					zs.d(isdianzan);
				var params = {};
				//取到该评论对应的动态的id
				var dynamicid = event.detail.dynamicid;
				
				var id = '#dianzan-dianji' + dynamicid;
				var	dynamicIndex = event.detail.dynamicIndex;
				if(isdianzan) {
					//增加点赞
					$(id).addClass('dianzan-dianji-icon-active').removeClass('dianzan-dianji-icon');
				} else {
					//取消点赞
					$(id).removeClass('dianzan-dianji-icon-active').addClass('dianzan-dianji-icon');
				}
				var myDynamic = JSON.parse(zs.getItem('myDynamic'));
				var thisDynamic = myDynamic.data[dynamicIndex];
					zs.d(JSON.stringify(thisDynamic));
					cls.renderdianzan(thisDynamic, dynamicid);
			})
		},
		//动态的填充函数
		renderDynamic: function(myDynamic, type) {
			var cls = this;
			data = myDynamic.data;
			zs.template('mui-content', 'my_dynamic_refresh', {
				list: data
			}, 'append');
			//填充完后开始处理距离并补充到页面中distance-release
			get_distance(data, type);
			//mui.previewImage();
			//cls.clickEvent();
			function get_distance(data, type) {
				if(type == 1) {
					//说明是下拉刷新调用
					var id = ".distance-release1";
				} else {
					//上拉加载调用
					var id = ".distance-release" + cls.pagenum;
				}
				$(id).each(function(i, domEle) {
					zs.Location.distance(data[i].lng, data[i].lat, function(dis) {
						$(domEle).html('距离' + getShortDis(dis));
					});
				});
				zs.closeWaiting();
			}

		},
		//填充距离

		clickEvent: function() {
			var cls = this;
			mui.plusReady(function() {
				//该方法包含了页面中所有的点击事件
				//大于5条的点击切换事件
				mui(document.body).on('tap', '.all-pinglun-zhankai', function() {
					event.stopPropagation();
					$(this).addClass('none').siblings('p').removeClass('none');
					$(this).next().removeClass('none');
				});
				mui(document.body).on('tap', '.all-pinglun-shouqi', function() {
					event.stopPropagation();
					$(this).addClass('none').siblings('p[data-hidden=""]').addClass('none');
					$(this).prev().removeClass('none');
				});
				//点赞与取消点赞逻辑
				var isbusy = true;
				mui(document.body).on('tap', 'i[data-dianzan]', function(event) {
						
						var _this = this;
						event.stopPropagation();
						zs.showWaiting();

						var params = {};
						var myDynamic = JSON.parse(zs.getItem('myDynamic'));
						//动态的id
						params.sid = $(_this).attr('data-dianzan');
						//点赞者的id
						params.uid = zs.User.isLogin();
						//取该动态的序号
						cls.dynamicIndex = $(_this).attr('data-index');

						cls.thisDynamic = myDynamic.data[cls.dynamicIndex];

						if(isbusy) {
							isbusy = false;
							if($(_this).hasClass('dianzan-dianji-icon-active')) {
								zs.Api.post('say_like', 'delete', params, function(r) {
									var id = '#dianzan-dianji' + $(_this).attr('data-dianzan');

									//操作缓存数据
									for(var i = 0; i < cls.thisDynamic.say_likeInfo.length; i++) {
										if(params.uid == cls.thisDynamic.say_likeInfo[i].uid) {
											cls.thisDynamic.say_likeInfo.del(i);
											zs.d(JSON.stringify(cls.thisDynamic.say_likeInfo));
											if(!cls.thisDynamic.say_likeInfo.length) {
												cls.thisDynamic.say_likeInfo = null;
											}
											break;
										}
									}
									cls.thisDynamic.is_like = 0;
									cls.renderdianzan(cls.thisDynamic, params.sid);
									//修改并保存缓存
									myDynamic.data[cls.dynamicIndex] = cls.thisDynamic;
									zs.setItem('myDynamic', JSON.stringify(myDynamic));
									$(_this).removeClass('dianzan-dianji-icon-active').addClass('dianzan-dianji-icon');
									isbusy = true;
									zs.closeWaiting();
								}, function(e) {
									zs.toast('取消点赞失败');
									isbusy = true;
									zs.closeWaiting();
								})

							} else {
								isbusy = false;
								zs.Api.post('say_like', 'add', params, function(r) {
									//取本机的头像
									var cover = {};
									cover.cover = zs.User.get_userinfo().cover;
									cover.uid = zs.User.get_userinfo().id;
									cover.username = zs.User.get_userinfo().username;
									cover.sid = params.sid;
									//增加数据，分两种情况，一种本来就有点赞，那么该字段就是数组，若本来没有，默认的传过来的该字段为null，需要变成空数组
									if(isArray(cls.thisDynamic.say_likeInfo)) {
									} else {
										cls.thisDynamic.say_likeInfo = [];
									}

									cls.thisDynamic.say_likeInfo.unshift(cover);
									//修改标记本机用户点赞的字段
									cls.thisDynamic.is_like = 1;
									//给点赞图标增加选中效果
									$(_this).removeClass('dianzan-dianji-icon').addClass('dianzan-dianji-icon-active');
									cls.renderdianzan(cls.thisDynamic, params.sid);
									//存缓存
									myDynamic.data[cls.dynamicIndex] = cls.thisDynamic;
									var cache = JSON.stringify(myDynamic);
									zs.setItem('myDynamic', cache);
									isbusy = true;
									zs.closeWaiting();
								}, function(e) {
									zs.toast('点赞失败');
									isbusy = true;
									zs.closeWaiting();
								})
							}
						}

					})
					//点击头像的事件
				mui(document.body).on('tap', '.Head-portrait', function(event) {
					event.stopPropagation();
					var uid = $(this).attr('data-uid');
					var isfriend = zs.Friend.get(uid);
					if(uid == zs.User.isLogin()) {
						zs.open('personal.html', 'personal')
					} else if(isfriend) {
						zs.open('friend_detail.html', 'friend_detail', {
							data_id: uid
								//dynamicname: isfriend.username
						});
					} else {
						zs.open('stranger_default.html', 'stranger_default', {
							data_id: uid
						});
					}
				})
				mui(document.body).on('tap', 'i[data-pinlun]', function(event) {
					setTimeout(function() {
						var dynamic_detail = plus.webview.getWebviewById('dynamic_detail');
						zs.d(JSON.stringify(dynamic_detail));
						dynamic_detail.addEventListener('loaded', function() {
							mui.fire(dynamic_detail, 'textareaFocus', {});
						})
					}, 100);

				});
				mui(document.body).on('tap', '[data-username]', function() {
					event.stopPropagation();
					var uid = $(this).attr('data-uid');
					var isfriend = zs.Friend.get(uid);
					if(uid == zs.User.isLogin()) {
						zs.open('personal.html', 'personal')
					} else if(isfriend) {
						zs.open('friend_detail.html', 'friend_detail', {
							data_id: uid,
							dynamicname: isfriend.username
						});
					} else {
						zs.open('stranger_default.html', 'stranger_default', {
							data_id: uid
						});
					}
				})
			})
		},
		//填充点赞的部分
		renderdianzan: function(headerPortrait, sid) {
			var cls = this;
			var id = 'dianzanqu' + sid;
			iid = '#' + id;
			$(iid).empty();
			zs.template(id, 'headerPortrait', headerPortrait, 'append');
		},
		//填充评论部分
		renderpinlun: function(pinlunqu,sid) { 
			var cls = this;
			var id = 'pinlunqu' + sid;
			iid = '#' + id;
			$(iid).empty();
			zs.template(id, 'pinlunqu', pinlunqu, 'append');
		}
	});
}(mui, zs)