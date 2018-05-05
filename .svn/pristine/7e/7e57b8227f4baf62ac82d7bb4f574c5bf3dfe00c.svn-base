/*!
 * =====================================================
 * zs v1.0.0 ()
 * =====================================================
 */
!
function(mui, zs) {
	zs.ActivityPinlunPage = zs.UserPage.extend({
		//标记活动id
		isactivity: false,
		//标记是哪个活动列表页
		activitySource: null,
		//当前活动所有数据
		thisActivity: null,
		//当前活动在列表页的i值
		acticityIndex: null,
		//列表页面的所有缓存
		openerCache: null,
		opener: null,
		index:null,
		initPage: function() {
			var cls = this;
			mui.plusReady(function() {
				cls.opener = plus.webview.currentWebview().opener();
				var params = {};
				cls.isactivity = plus.webview.currentWebview().activityid;
				cls.acticityIndex = plus.webview.currentWebview().acticityIndex;
				cls.activitySource = plus.webview.currentWebview().activitySource;
				cls.index = plus.webview.currentWebview().index;
				//alert(cls.index);
				//cls.acticityIndex = parseInt(cls.acticityIndex) + parseInt(cls.index);
				if(cls.activitySource == 'surrounding_dynamic_activity') {
					cls.openerCache = JSON.parse(zs.getItem('surroundingDynamicActivity'));

				} else {
					cls.openerCache = JSON.parse(zs.getItem('myActivity'));
				}

				var activity = cls.openerCache.data;
				var data = activity[cls.acticityIndex];
				//适配轮播增加第一张图片的字段
				data.firstImg = data.imgs[0];
				//适配轮播增加最后一张图片的字段
				data.lastImg = data.imgs[data.imgs.length - 1];
				//标记有没有dianzan
				if(data.strategy_likeInfo) {
					data.is_trategy_likeInfo = true;
				} else {
					data.is_trategy_likeInfo = false;
				}
				//增加显示评论有几条的属性  commentscount
				if(data.strategy_commentInfo) {
					data.commentscount = data.strategy_commentInfo.length;
					//循环修改每条评论的时间
					for(i = 0; i < data.commentscount; i++) {
						data.strategy_commentInfo[i].releaseTime = getShortTime(data.strategy_commentInfo[i].atime);
					}
				} else {
					data.commentscount = 0;
				}
				cls.thisActivity = data;
				//填充上半部分
				cls.renderupbody(cls.thisActivity);
				//填充头像
				cls.renderdianzan(cls.thisActivity);
				//填充评论部分
				cls.renderpinlun(cls.thisActivity);
				var params = {};
				params.uid = zs.User.isLogin();
				params.sid = cls.isactivity;
				//检查 本人是否参加该活动
				zs.Api.post('strategy_people', 'check', params, function(r) {}, function(e) {
					$('#addactivity').removeClass('none');
				})
			})

		},
		initEvent: function() {
			var cls = this;
			document.getElementById('send-msg').addEventListener('tap', function() {
				var params = {
					sid: cls.isactivity,
					uid: zs.User.isLogin(),
					msg: $('.textarea').text()
				}

				zs.Api.post('say_comment', 'add', params, function(r) {
					zs.d(JSON.stringify(r));
					zs.toast('评论发表成功');
					$('#footer .textarea').blur().html('');
					//准备填充页面
					var pinlun = {};
					//添加用户名
					pinlun.username = zs.User.get_userinfo().username;
					//转换时间
					pinlun.releaseTime = getShortTime(r.data.atime);
					//评论内容
					pinlun.msg = r.data.msg;
					//该条活动的id
					pinlun.sid = r.data.sid;
					//评论者的id
					pinlun.uid = r.data.uid;
					//评论者的头像
					pinlun.cover = zs.User.get_userinfo().cover;
					if(cls.thisActivity.strategy_commentInfo) {

					} else {
						cls.thisActivity.strategy_commentInfo = [];
					}
					cls.thisActivity.strategy_commentInfo.unshift(pinlun);
					cls.thisActivity.commentscount++;
					//重新填充评论部分
					cls.renderpinlun(cls.thisActivity);
					cls.openerCache.data[cls.acticityIndex] = cls.thisActivity;
					if(cls.activitySource == 'surrounding_dynamic_activity') {
						zs.setItem('surroundingDynamicActivity', JSON.stringify(cls.openerCache));
						var a = JSON.parse(zs.getItem('surroundingDynamicActivity'));
						zs.d('---' + JSON.stringify(a.data[cls.acticityIndex].strategy_commentInfo));
						zs.d('+++' + JSON.stringify(cls.thisActivity.strategy_commentInfo));
					} else {
						zs.setItem('myActivity', JSON.stringify(cls.openerCache));
					}
					//这里需要判断，如果是从列表页直接进来详情评论页，则不需要fire，否则则需要fire详情页，此时需要用到activitySource字段
					if(cls.opener.id != cls.activitySource) {
						//说明是从详情页页进入到了评论页
						mui.fire(cls.opener, 'addPinglun', {})
					}
				})
			});
		},
		renderupbody: function(activityinfo) {
			var cls = this;
			activityinfo = activityinfo;
			zs.d(JSON.stringify(activityinfo));
			zs.template('upbody', 'lunbobufen', activityinfo, 'append');
			//填充完后开始处理距离并补充到页面中distance-release
			get_distance(activityinfo);

			function get_distance(activityinfo) {
				$(".distance-release").each(function(i, domEle) {
					zs.Location.distance(activityinfo.lng, activityinfo.lat, function(dis) {
						$(domEle).html('距离' + getShortDis(dis));
					});
				});
			}
			cls.clickEvent();
			//给第一个原点加active
			$('.mui-indicator').eq(0).addClass('mui-active');
			var slider = mui("#slider");
			slider.slider({
				interval: 1000
			});

		},
		//填充点赞头像部分
		renderdianzan: function(dianzan) {
			var cls = this;
			//var id = '#pinlundianzanqu'
			$('#dianzanqu').empty();
			zs.template('dianzanqu', 'dianzan', dianzan, 'append');
		},
		//填充评论部分
		renderpinlun: function(pinlun) {
			var cls = this;
			$('#pinlunqu').empty();
			zs.template('pinlunqu', 'pinlun', pinlun, 'append');
		},
		clickEvent: function() {
			var cls = this;
			mui.plusReady(function() {
				//该方法包含了页面中所有的点击事件
				//评论点击弹框
				mui('.dianzan-talk-share').on('tap', '.pinglun-dianji-icon', function() {
					event.stopPropagation();
					$('#footer').find('.textarea').focus();
					cls.isdynamic = $(this).attr('data-pinlun');
				});
				mui('#footer').on('tap', '#biaoqing-icon', function() {
					$('#dynamic-biaoqing-box').toggleClass('none');
				});
				mui('#footer').on('tap', '.biaoqing-li', function() {
					var img = $(this).find('i').html();
					$('.textarea').append(img);
				});

				//防止重复点击
				var isbusy = true;
				//点赞与取消点赞逻辑
				mui('.activity-person').on('tap', 'i[data-dianzan]', function() {
					zs.showWaiting();
					var _this = this;
					event.stopPropagation();
					if(isbusy) {
						isbusy = false;

						//取到当前评论的id
						var sid = $(_this).attr('data-dianzan');
						//点赞者或者取消点赞者的id
						var uid = zs.User.isLogin();
						//点赞图标的id
						//var dianzanicon = $(_this).attr('id');
						//页面创建者
						//var opener = plus.webview.currentWebview().opener();
						var params = {};
						params.sid = sid;
						params.uid = uid;
						if($(_this).hasClass('dianzan-active')) {
							//取到当前点赞的对应的li的id 该uid指的是评论者；
							zs.Api.post('strategy_like', 'delete', params, function(r) {
								zs.d(JSON.stringify(r));
								cls.removeDianzan();
								isbusy = true;
								zs.closeWaiting();
							}, function(e) {
								alert('取消点赞失败');
								isbusy = true;
								zs.closeWaiting();
							})

						} else {
							zs.Api.post('strategy_like', 'add', params, function(r) {

								cls.addDianzan();
								isbusy = true;
								zs.closeWaiting();
							}, function(e) {
								alert('取消点赞失败');
								isbusy = true;
								zs.closeWaiting();
							})
						}
					}

				})

				mui(document.body).on('tap', '.header', function() {
					var uid = $(this).attr('data-uid');
					var isfriend = zs.Friend.get(uid);
					if(uid == zs.User.isLogin()) {
						zs.open('personal.html', 'personal')
					} else if(isfriend) {
						zs.open('friend_detail.html', 'friend_detail', {
							dynamicid: uid,
							dynamicname: isfriend.username
						});
					} else {
						zs.open('stranger_default.html', 'stranger_default', {
							data_id: uid
						});
					}
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
		addDianzan: function() {
			var cls = this;
			var id = '#dianzan-dianji' + cls.isactivity;
			//取本机的头像
			var cover = {};
			cover.cover = zs.User.get_userinfo().cover;
			cover.uid = zs.User.get_userinfo().id;
			cover.username = zs.User.get_userinfo().username;
			//修改标记是否有人点赞的字段
			cls.thisActivity.is_trategy_likeInfo = true;
			//增加数据，分两种情况，一种本来就有点赞，那么该字段就是数组，若本来没有，默认的传过来的该字段为null，需要变成空数组
			if(isArray(cls.thisActivity.strategy_likeInfo)) {

			} else {
				cls.thisActivity.strategy_likeInfo = [];
			}
			cls.thisActivity.strategy_likeInfo.push(cover);
			//修改标记本机用户点赞的字段
			cls.thisActivity.is_like = 1;
			//给点赞图标增加选中效果
			$(id).addClass('dianzan-active');
			//重新填充点赞区
			cls.renderdianzan(cls.thisActivity);
			cls.openerCache.data[cls.acticityIndex] = cls.thisActivity;
			var cache = JSON.stringify(cls.openerCache);
			//判断应该存哪个页面的缓存   能进活动详情的只有两个页面，一个是我的活动列表页，一个是周边活动列表页
			if(cls.activitySource == 'surrounding_dynamic_activity') {	
				zs.setItem('surroundingDynamicActivity', cache);
			} else {
				zs.setItem('myActivity', cache);
			}
			/*修改上个页面的点赞状态
			 *这里需要判断，如果是从列表页直接进来详情评论页，则不需要fire，否则则需要fire详情页，此时需要用到activitySource字段、*/
			if(cls.opener.id != cls.activitySource) {
				//说明是从详情页页进入到了评论页
				mui.fire(cls.opener, 'isDianzandetail', {
					isdianzan: true
				})
			} else {
				//说明是从列表页进入到了评论页
				mui.fire(cls.opener, 'isDianzanlist', {
					isdianzan: true,
					activityid: cls.isactivity
				})
			}
		},
		removeDianzan: function() {
			var cls = this;
			var id = '#dianzan-dianji' + cls.isactivity;
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
			cls.renderdianzan(cls.thisActivity);
			cls.openerCache.data[cls.acticityIndex] = cls.thisActivity;
			var cache = JSON.stringify(cls.openerCache);
			if(cls.activitySource == 'surrounding_dynamic_activity') {
				zs.setItem('surroundingDynamicActivity', cache);
			} else{
				zs.setItem('myActivity', cache);
			}
			/*修改上个页面的点赞状态
			 *这里需要判断，如果是从列表页直接进来详情评论页，则不需要fire，否则则需要fire详情页，此时需要用到activitySource字段、*/
			if(cls.opener.id != cls.activitySource) {
				//说明是从详情页页进入到了评论页
				mui.fire(cls.opener, 'isDianzandetail', {
					isdianzan: false
				})
			} else {
				//说明是从列表页进入到了评论页
				mui.fire(cls.opener, 'isDianzanlist', {
					isdianzan: false,
					activityid: cls.isactivity
				})
			}
		}
	});
}(mui, zs)