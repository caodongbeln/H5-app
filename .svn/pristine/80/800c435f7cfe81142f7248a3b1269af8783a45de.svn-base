/*!
 * =====================================================
 * zs v1.0.0 ()
 * =====================================================
 */
!
function(mui, zs) {
	zs.DynamicDetailPage = zs.UserPage.extend({
		//标记活动id
		isdynamic: false,
		//当前活动所有数据
		thisDynamic: null,
		//当前活动在列表页的i值
		dynamicIndex: null,
		//父页面的所有缓存
		openerCache: null,
		index:null,
		opener: null,
		initPage: function() {
			var cls = this;
			mui.plusReady(function() {
				var params = {};
				cls.opener = plus.webview.currentWebview().opener();
				cls.isdynamic = plus.webview.currentWebview().dynamicid;
				cls.dynamicIndex = plus.webview.currentWebview().dynamicIndex;
				cls.index = plus.webview.currentWebview().index;
				cls.dynamicIndex = parseInt(cls.dynamicIndex) + parseInt(cls.index);
				if(cls.opener.id == 'surrounding_dynamic_dynamic') {
					cls.openerCache = JSON.parse(zs.getItem('surroundingDynamicDynamic'));
				} else {
					cls.openerCache = JSON.parse(zs.getItem('myDynamic'));
				}
				cls.thisDynamic = cls.openerCache.data[cls.dynamicIndex];
				cls.renderDynamic(cls.thisDynamic);
			})

		},
		initEvent: function() {
			window.addEventListener('textareaFocus', function(event) {
				$('.textarea').focus();

			})
		},
		renderDynamic: function(myDynamicList) {
			var cls = this;
			//console.log(JSON.stringify(myDynamicList))
			zs.template('mui-content', 'dynamic_detail',
				myDynamicList, 'append');
			//填充完后开始处理距离并补充到页面中distance-release
			get_distance(myDynamicList);
			mui.previewImage();

			function get_distance(myDynamicList) {
				$(".distance-release").each(function(i, domEle) {
					zs.Location.distance(myDynamicList.lng, myDynamicList.lat, function(dis) {
						$(domEle).html('距离' + getShortDis(dis));
					});
				});
			}
			cls.clickEvent();

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
					//$('.textarea').append(img);
				});
				document.getElementById('send-msg').addEventListener('tap', function() {
					if(!$('.textarea').html()) {
						zs.toast('评论不能为空');
						return;
					}
					var text = $('.textarea').html();
					    text = cls.reversal_em(text);
					var params = {
						sid: cls.isdynamic,
						uid: zs.User.isLogin(),
						msg: text
					}
					
					zs.Api.post('say_comment', 'add', params, function(r) {
						zs.toast('评论发表成功');
						$('#footer .textarea').blur().html('');
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
						if(cls.thisDynamic.say_commentInfo) {

						} else {
							cls.thisDynamic.say_commentInfo = [];
						}
						cls.thisDynamic.say_commentInfo.unshift(pinlun);
						cls.thisDynamic.commentscount++;
						//重新填充评论部分
						cls.renderpinlun(cls.thisDynamic);
						cls.openerCache.data[cls.dynamicIndex] = cls.thisDynamic;
						if(cls.opener.id == 'surrounding_dynamic_dynamic') {
							zs.setItem('surroundingDynamicDynamic', JSON.stringify(cls.openerCache));
						} else {
							zs.setItem('myDynamic', JSON.stringify(cls.openerCache));
						}
						mui.fire(cls.opener, 'addPinglun', {
							dynamicid: cls.isdynamic,
							dynamicIndex:cls.dynamicIndex
						})
					})
				});

				//防止重复点击
				var isbusy = true;
				//点赞与取消点赞逻辑
				mui('.dianzan-talk-share').on('tap', 'i[data-dianzan]', function() {
					zs.showWaiting();
					var _this = this;
					event.stopPropagation();
					if(isbusy) {
						isbusy = false;

						//取到当前评论的id
						var sid = $(_this).attr('data-dianzan');
						//点赞者或者取消点赞者的id
						var uid = zs.User.isLogin();

						var params = {};
						params.sid = sid;
						params.uid = uid;
						if($(_this).hasClass('dianzan-dianji-icon-active')) {
							zs.Api.post('say_like', 'delete', params, function(r) {
								$(_this).removeClass('dianzan-dianji-icon-active').addClass('dianzan-dianji-icon');

								for(var i = 0; i < cls.thisDynamic.say_likeInfo.length; i++) {
									if(cls.thisDynamic.say_likeInfo[i].uid == zs.User.isLogin()) {
										cls.thisDynamic.say_likeInfo.del(i);
										if(!cls.thisDynamic.say_likeInfo.length) {
											cls.thisDynamic.say_likeInfo = null;
										}
										break;
									}
								}
								cls.thisDynamic.is_like = 0;

								cls.renderdianzan(cls.thisDynamic);
								cls.openerCache.data[cls.dynamicIndex] = cls.thisDynamic;
								var cache = JSON.stringify(cls.openerCache);
								if(cls.opener.id == 'surrounding_dynamic_dynamic') {
									zs.setItem('surroundingDynamicDynamic', cache);
								} else{
									zs.setItem('myDynamic', cache);
								}

								//把列表页的点赞也移除掉
								mui.fire(cls.opener, 'isDianzan', {
									isdianzan: false,
									dynamicid: sid,
									dynamicIndex:cls.dynamicIndex
								});
								isbusy = true;
								zs.closeWaiting();
							})

						} else {
							zs.Api.post('say_like', 'add', params, function(r) {
								$(_this).removeClass('dianzan-dianji-icon').addClass('dianzan-dianji-icon-active');
								//取本机的头像
								var cover = {};
								cover.cover = zs.User.get_userinfo().cover;
								cover.uid = zs.User.get_userinfo().id;
								cover.username = zs.User.get_userinfo().username;
								cover.sid = sid;
								//增加数据，分两种情况，一种本来就有点赞，那么该字段就是数组，若本来没有，默认的传过来的该字段为null，需要变成空数组
								if(isArray(cls.thisDynamic.say_likeInfo)) {

								} else {
									cls.thisDynamic.say_likeInfo = [];
								}

								cls.thisDynamic.say_likeInfo.unshift(cover);
								//修改标记本机用户点赞的字段
								cls.thisDynamic.is_like = 1;
								//重新填充点赞区
								cls.renderdianzan(cls.thisDynamic);
								cls.openerCache.data[cls.dynamicIndex] = cls.thisDynamic;
								var cache = JSON.stringify(cls.openerCache);
								//判断应该存哪个页面的缓存   能进活动详情的只有两个页面，一个是我的活动列表页，一个是周边活动列表页
								if(cls.opener.id == 'surrounding_dynamic_dynamic') {
									zs.setItem('surroundingDynamicDynamic', cache);
								} else{
									zs.setItem('myDynamic', cache);
								}

								//把列表页也加上点赞
								mui.fire(cls.opener, 'isDianzan', {
									isdianzan: true,
									dynamicid: sid,
									dynamicIndex:cls.dynamicIndex

								});
								isbusy = true;
								zs.closeWaiting();
							})
						}
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
		//填充点赞的部分
		renderdianzan: function(headerPortrait) {
			var cls = this;
			var id = 'dianzanqu'
			iid = '#' + id;
			$(iid).empty();
			zs.template(id, 'headerPortrait', headerPortrait, 'append');
		},
		//填充评论部分
		renderpinlun: function(pinlunqu) { 
			var cls = this;
			$('#pinlunqu').empty();
			zs.template('pinlunqu', 'pinlunqu', pinlunqu, 'append');
		},
		//反向转义评论中的img等标签
		reversal_em:function (str) {
			str = str.replace(/&lt;/g, '\<');
			str = str.replace(/&gt;/g, '\>');
			str = str.replace(/<br\/>/g, '\n');
			str =  str.replace(/<img\ssrc=[\'"](.+?)[\'"]\>/gi, '[em_$1]');
			str =  str.replace(/..\/arclist\//gi, '');
			str = str.replace(/\.gif/gi, '');
			return str;
		}
	});
}(mui, zs)