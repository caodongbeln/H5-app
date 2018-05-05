/*!
 * =====================================================
 * zs v1.0.0 ()
 * =====================================================
 */
!
function(mui, zs) {
	zs.ActivityDetailPage = zs.UserPage.extend({
		//标记活动id
		isactivity: false,
		//当前活动所有数据
		thisActivity: null,
		//当前活动在列表页的i值
		acticityIndex: null,
		//父页面的所有缓存
		openerCache: null,
		index:null,
		opener: null,
		initPage: function() {
			var cls = this;
			mui.plusReady(function() {
				cls.opener = plus.webview.currentWebview().opener();
				var params = {};
				cls.isactivity = plus.webview.currentWebview().activityid;
				cls.acticityIndex = plus.webview.currentWebview().acticityIndex;
				cls.index = plus.webview.currentWebview().index;
				cls.acticityIndex = parseInt(cls.acticityIndex) + parseInt(cls.index);
				if(cls.opener.id == 'surrounding_dynamic_activity') {
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
				console.log(data.firstImg);
				console.log(data.lastImg);
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
				//增加该条活动在对应的列表页是第几个的字段
				data.acticityIndex = cls.acticityIndex;
				//增加页面是从哪个列表页来的，为活动评论页修改哪个缓存的数据提供参照
				data.activitySource = cls.opener.id;
				//增加 活动简介输入内容有多长的字段
				data.desclength = data.desc.length;
				//判断是否有人参加该活动
				if(data.strategy_peopleInfo) {
					//增加有多少个人参加活动的字段
					data.strategy_peopleInfo_num = data.strategy_peopleInfo.length;

				}else{
					data.strategy_peopleInfo_num = 0
				}
				cls.thisActivity = data;
				cls.sid = data.id;
				//填充上半部分
				cls.renderupbody(cls.thisActivity);
				//填充点赞
				cls.renderdianzan(cls.thisActivity);
				//填充评论部分
				cls.renderpinlun(cls.thisActivity);
				//填充地址和参加人头像部分
				cls.renderlocation(cls.thisActivity);
				//填充参加活动人头像部分
				cls.renderactivitypeople(cls.thisActivity);
				//添加活动描述部分
				cls.renderactivitymiaoshu(cls.thisActivity);
				var params = {};
				params.uid = zs.User.isLogin();
				params.sid = cls.isactivity;
				//检查 本人是否参加该活动
				zs.Api.post('strategy_people', 'check', params, function(r) {
					//console.log(JSON.stringify(r))
					if(r.status){
						$('#addactivity').addClass('none');
					}else if(r.status == 0){
						$('#addactivity').removeClass('none');
					}
				}, function(e) {
					//console.log(JSON.stringify(e))
					//$('#addactivity').removeClass('none');
				})
			})

		},
		initEvent: function() {
			var cls = this;
			//参加活动逻辑
			document.getElementById('addactivity').addEventListener('tap', function() {
				var params = {};
				params.sid = cls.isactivity;
				params.uid = zs.User.isLogin();
				zs.Api.post('strategy_people', 'add', params, function(r) {
					//console.log(JSON.stringify(r));
					zs.toast('您已参加活动');
					$('#addactivity').addClass('none');
					//处理页面逻辑 更改缓存
					if(!cls.thisActivity.strategy_peopleInfo){
						cls.thisActivity.strategy_peopleInfo = []
					}
					cls.thisActivity.strategy_peopleInfo_num++;
					var acticitypeople = {};
					acticitypeople.uid = zs.User.isLogin();
					acticitypeople.cover = zs.User.get_userinfo().cover;
					acticitypeople.username = zs.User.get_userinfo().username;
					cls.thisActivity.strategy_peopleInfo.unshift(acticitypeople);
					//填充参加活动人头像部分
					cls.renderactivitypeople(cls.thisActivity);
					cls.openerCache.data[cls.acticityIndex] = cls.thisActivity;
					if(cls.opener.id == 'surrounding_dynamic_activity') {
						zs.setItem('surroundingDynamicActivity',JSON.stringify(cls.openerCache));
					}else{
						zs.setItem('myActivity',JSON.stringify(cls.openerCache));
					}
				})
			});
			window.addEventListener('addPinglun', function(event) {
				//填充评论部分
				cls.thisActivity = JSON.parse(zs.getItem('surroundingDynamicActivity')).data[cls.acticityIndex];
				cls.renderpinlun(cls.thisActivity);
			});
			window.addEventListener('isDianzandetail', function(event) {
				//取到判断是取消还是增加点赞的字段
				var isdianzan = event.detail.isdianzan;
				if(isdianzan) {
					cls.addDianzan();
				} else {
					cls.removeDianzan();
				}
			})

		},
		renderupbody: function(activityinfo) {
			var cls = this;
			activityinfo = activityinfo;
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
			$('#dianzanqu').empty();
			zs.template('dianzanqu', 'dianzan', dianzan, 'append');
		},
		//填充评论部分
		renderpinlun: function(pinlun) {
			var cls = this;
			$('#pinlunqu').empty();
			zs.template('pinlunqu', 'pinlun', pinlun, 'append');
		},
		//填充地址部分
		renderlocation: function(locationn) {
			var cls = this;
			zs.template('location', 'location',
				locationn, 'append');
		},
		//填充活动参加人员部分
		renderactivitypeople:function(activitypeople){
			var cls = this;
			$('#activity_people_num').empty();
			zs.template('activity_people_num', 'activity_people_num',
				activitypeople, 'append');
		},
		//填充活动描述部分
		renderactivitymiaoshu: function(activitymiaoshu) {
			var cls = this;
			activitymiaoshu = activitymiaoshu;
			zs.template('activitymiaoshu', 'activity_miaoshu',
				activitymiaoshu, 'append');
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
								//console.log(JSON.stringify(r));
								cls.removeDianzan();
								isbusy = true;
								zs.closeWaiting();
							}, function(e) {
								isbusy = true;
								zs.closeWaiting();
							})

						} else {
							zs.Api.post('strategy_like', 'add', params, function(r) {

								cls.addDianzan();
								isbusy = true;
								zs.closeWaiting();
							}, function(e) {
								isbusy = true;
								zs.closeWaiting();
							})
						}
					}

				})

				mui(document.body).on('tap', '[data-username]', function() {
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
			if(isArray(cls.thisActivity.strategy_likeInfo)){
				
			}else{
				cls.thisActivity.strategy_likeInfo = [];	
			}
			
			cls.thisActivity.strategy_likeInfo.unshift(cover);
			//修改标记本机用户点赞的字段
			cls.thisActivity.is_like = 1;
			//给点赞图标增加选中效果
			$(id).addClass('dianzan-active');
			//重新填充点赞区
			cls.renderdianzan(cls.thisActivity);
			cls.openerCache.data[cls.acticityIndex] = cls.thisActivity;
			var cache = JSON.stringify(cls.openerCache);
			//判断应该存哪个页面的缓存   能进活动详情的只有两个页面，一个是我的活动列表页，一个是周边活动列表页
			if(cls.opener.id == 'surrounding_dynamic_activity') {
				zs.setItem('surroundingDynamicActivity', cache);
			} else if(cls.opener.id == 'my_activity_refresh') {
				zs.setItem('myActivity', cache);
			}
			//修改上个页面的点赞状态
			mui.fire(cls.opener, 'isDianzanlist', {
				isdianzan: true,
				activityid: cls.isactivity
			});
		},
		removeDianzan: function() {
			var cls = this;
			var id = '#dianzan-dianji' + cls.isactivity;
			for(var i = 0; i < cls.thisActivity.strategy_likeInfo.length; i++) {
				if(cls.thisActivity.strategy_likeInfo[i].uid == zs.User.isLogin()){
					cls.thisActivity.strategy_likeInfo.del(i);
					if(!cls.thisActivity.strategy_likeInfo.length){
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
			if(cls.opener.id == 'surrounding_dynamic_activity') {	
				zs.setItem('surroundingDynamicActivity', cache);
			} else if(cls.opener.id == 'my_activity_refresh') {
				zs.setItem('myActivity', cache);
			}
			//把列表页的点赞也移除掉
			mui.fire(cls.opener, 'isDianzanlist', {
				isdianzan: false,
				activityid: cls.isactivity
			});
		}
	});
}(mui, zs)