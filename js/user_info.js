/*!
 * =====================================================
 * zs v1.0.0 ()
 * =====================================================
 */
!
function(mui, zs) {
	zs.InfoPage = zs.UserPage.extend({
		/*初始化*/

		initPage: function() {},
		//获取位置和道具数据信息
		locationInfo: function(id, tpl) {
			mui.plusReady(function() {
				var self = plus.webview.currentWebview();
				var userID = self.data_id,
					firend_list_id = self.dynamicid,
					firend_name = self.dynamicname;
				contentResh();
				//用于使用道具事件
				window.addEventListener('go_loc', function(event) {
					zs.Api.post('tools_sales_log', 'add', {
						uid: zs.User.isLogin(),
						fid: userID,
						tid: event.detail.tid,
						type: event.detail.type,
						sid: event.detail.sid
					}, function() {
						$('#detailContent').empty();
						contentResh();
						zs.toast('处理完成，您可以正常使用！');
					})
				});
				//用于开启和关闭位置事件
				window.addEventListener('resh', function(event) {
					$('#detailContent').empty();
					contentResh();
				})

				function contentResh() {
					zs.Friend.getFromNet(function(fInfo) {
						var fInfo = zs.Friend.get(userID);
						zs.template(id, tpl, fInfo);
						mui('.mui-content .mui-switch')['switch']();
						if(fInfo.is_show == '1') {
							$('.mui-active').css('transition-duration', '0.2s').find('div').css({
								'transition-duration': '0.2s',
								'transform': 'translate(17px, 0px)'
							});
						}
						if(fInfo.relation == '0') {
							$('#location').attr('src', '../images/jinzhi.png');
							$('#location_see').text('开启位置');
						} else {
							$('#location').attr('src', '../images/no-jinzhi.png').addClass('no-jinzhi');
							$('#location_see').text('关闭位置');
						}
					});
				}
			})
		},
		//		获取详情页好友信息
		userInfo: function(id, tpl) {
			var cls = this;
			mui.plusReady(function() {
				var self = plus.webview.currentWebview();
				var userID = self.data_id,
					firend_list_id = self.dynamicid,
					firend_name = self.dynamicname;
				temResh();
				mui.previewImage();
				mui('.mui-content .mui-switch')['switch']();

				function temResh(fInfo) {
					//用于处理开关的样式显示
					zs.Api.post('user', 'info', {
						uid: userID
					}, function(info) {
						var data = info.data;
						var data = {
								uInfo: data
							}
							//设置头部用户名显示
						$('#username').html(firend_name);
						zs.template(id, tpl, data);
						mui.previewImage();
						$("#uName").html(firend_name);
						$('#stranger_title').text(info.data.username);
						mui('.mui-content .mui-switch')['switch']();
						cls.friendClick(firend_list_id, userID);
					});
					cls.strangeerClick();
				}
			});
		},
		otherInfo: function(id, tpl) {
			var cls = this;
			mui.plusReady(function() {
				var self = plus.webview.currentWebview();
				var userID = self.data_id;
				zs.Api.post('user', 'info', {
					uid: userID
				}, function(info) {
					var data = info.data;
					var data = {
						uInfo: data
					}
					zs.template(id, tpl, data);
				})
			})
		},
		initEvent: function() {},
		//		好友详情点击修改备注弹出框及提交
		friendClick: function(fid, userID) {
			mui.plusReady(function() {
				var old_back = mui.back;
				var cata = plus.webview.currentWebview().opener().id;
				mui.back = function() {
					plus.webview.currentWebview().close();
				}
				mui('.mui-content .mui-switch').each(function() { //循环所有toggle
					this.addEventListener('toggle', function(event) {
						////可直接获取当前状态
						if(event.detail.isActive) {
							isShow = 1;
							var pams = {
								is_show: isShow,
								id: fid
							}
							$('#seLshow').addClass('mui-active')
						} else {
							isShow = 0;
							var pams = {
								is_show: isShow,
								id: fid
							}
						}
						zs.Api.post('friend', 'edit', pams, function() {
							zs.closeWaiting();
							if(pams.is_show == 1) {
								zs.toast('已开启！');
							} else {
								zs.toast('已关闭！');
							}
							var detailPage = plus.webview.getWebviewById('tip');
							mui.fire(detailPage, 'change_list', {});
							var indexPage = plus.webview.getWebviewById('friend_list');
							mui.fire(indexPage, 'change_gold', {});
						});
					});
				});
				if($('#changeName').size() > 0) {
					document.getElementById('changeName').addEventListener('tap', function(e) {
						e.detail.gesture.preventDefault();
						var btnArray = ['取消', '确定'];
						mui.prompt('修改备注', '', '', btnArray, function(e) {
							if(e.index == 1 && e.value != '') {
								uName.innerText = e.value;
								var parmas = {
									id: fid,
									username: e.value
								}
								zs.Api.post('friend', 'edit', parmas, function() {
									zs.toast('修改备注成功！');
									var detailPage = plus.webview.getWebviewById('contacts');
									mui.fire(detailPage, 'resh', {});
									var detailPage = plus.webview.getWebviewById('friend_list');
									mui.fire(detailPage, 'refesh', {});
								})
							}
						})
					});
				}
				var uid = zs.User.isLogin();
				if($('#tousu').size() > 0) {
					document.getElementById('tousu').addEventListener('tap', function() {
						zs.open('../tpl/tousu.html', 'tousu', {
							uid: uid,
							to_uid: userID
						});
						$('#right-icon-friend-detail-div').removeClass('block');
					})
				}
				if($('#delete').size() > 0) {
					document.getElementById('delete').addEventListener('tap', function() {
						var parmas = {
							request: 3,
							fid: userID,
							uid: uid
						};
						zs.Api.post('friend', 'edit_friend_request', parmas, function() {
							zs.toast('删除好友成功!');
							var detailPage = plus.webview.getWebviewById('contacts');
							mui.fire(detailPage, 'resh', {});
							var indexPage = plus.webview.getWebviewById('index');
							mui.fire(indexPage, 'resh', {});
							setTimeout(function() {
								zs.open('../tpl/contacts.html', 'contacts', {}, '');
								plus.webview.currentWebview().close();
							}, 1000)
						})
					})
				}

				if($('#confirmBtn').size() > 0) {
					document.getElementById('confirmBtn').addEventListener('tap', function() {
						zs.open('../tpl/setting_location_relationship.html', 'setting_location_relationship', {
							fid: userID,
							friend_id: fid
						});

						$('#right-icon-friend-detail-div').removeClass('block');
					})
				}
			})
		},
		//陌生人详情
		strangeerClick: function() {
			mui.plusReady(function() {
				//alert($('#button').size());
				//if($('#button').size() > 0) {
					mui(document.body).on("tap", "#button", function() {
						zs.open('../tpl/addstranger.html', 'addstranger', {
							data_id: plus.webview.currentWebview().data_id,
							source: plus.webview.currentWebview().source
						});
					})
				//}
			})
		}
	});
}(mui, zs);