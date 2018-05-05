/*!
 * =====================================================
 * zs v1.0.0 ()
 * =====================================================
 */
!
function(mui, zs) {
	zs.EditRemindPage = zs.UserPage.extend({
		users: null,
		item: null,
		rid: null,
		cate: '',
		initConfig: function() {
			if(!zs.Remind) zs.Remind = new zs.RemindClass;
			var cls = this;
			mui.plusReady(function() {				
				cls.rid = plus.webview.currentWebview().data_id;				
				var title = '添加提醒';
				if(cls.rid) {
					title = '编辑提醒';
					zs.Api.post('remind', 'info', {
						id: cls.rid
					}, function(ret) {
						if (ret.status == 1 && ret.data) {
							cls.item = ret.data;
							zs.template('content', 'add_content', {
								item: cls.item
							});
							cls.setSelected(cls.item.trigger,cls.item.triggered);
						} else {
							err && err();
						}
					}, function() {
						err && err();
					});					
				} else {
					cls.item = {
						uid: zs.User.getUid()
					};
					zs.template('content', 'add_content', {
						item: cls.item
					});
					cls.setSelected(cls.item.trigger,cls.item.triggered);
				}				
				$('#pageTitile').text(title);
				
			});
		},
		initPage: function() {
			var cls = this;
			mui.plusReady(function() {
				/*zs.template('content', 'add_content', {
					item: cls.item
				});*/
				//cls.setSelected(cls.item.trigger,cls.item.triggered);
			});
		},
		setSelected: function(trigger,triggered) {
			var cls = this;
			var triggers = [];
			var triggereds = [];
			if(trigger) {
				triggers = trigger.split(',');
			}
			if(triggered) {
				triggereds = triggered.split(',');
			}
			$("#select_uid").attr('data-extras', JSON.stringify({
				isradio: true,
				selected: triggereds,
				from_id:'select_uid',
				user_show:false
			}));
			$("#select_sid").attr('data-extras', JSON.stringify({
				isradio: false,
				selected: triggers,
				from_id:'select_sid',
				user_show:true
			}));
			mui('.mui-content .mui-switch')['switch']();
			if(cls.item.status = 1){
				$('.mui-active').css('transition-duration', '0.2s').find('div').css({
				'transition-duration': '0.2s',
				'transform': 'translate(17px, 0px)'
				});	
			};
			
			mui('.mui-content .mui-switch').each(function() { //循环所有toggle
					this.addEventListener('toggle', function(event) {
						//可直接获取当前状态
						if(event.detail.isActive) {
							cls.item.status = 1;													
						} else {
							cls.item.status = 0;
						}						
					});
				});
		},
		initEvent: function() {
			var cls = this;
			mui.plusReady(function() {
				
				mui(document.body).on("tap", "#select_uid", function(node) {
					var extras = this.getAttribute("data-extras");
					extras = extras ? JSON.parse(extras) : {};
					var params = {};					
					mui.extend(params, extras);
					zs.d(JSON.stringify(params))
					 mui.openWindow({
						url: 'friend_choose_list.html',
						id: 'friend_choose_list',
						extras: params
					});					
				});
				mui(document.body).on("tap", "#select_sid", function(node) {
							var user = zs.User.get_userinfo();
							var extras = this.getAttribute("data-extras");
							var trigger_extras = $('#select_uid').attr('data-extras');
							trigger_extras = JSON.parse(trigger_extras);
							extras = extras ? JSON.parse(extras) : {};							
							var params = {};
							mui.extend(params, extras);
							zs.d(JSON.stringify(extras));						
							if(trigger_extras.selected.indexOf(user.id) == -1){
								return;
							}else{
								mui.openWindow({
									url: 'friend_choose_list.html',
									id: 'friend_choose_list',
									extras: params
								});	
							}														 				
				});
				document.getElementById("send").addEventListener('tap', function() {
					if(cls.item.triggered == null || cls.item.triggered.length == 0) {
						zs.toast("请选择触发人！");
						return;
					}
					if(cls.item.trigger == null || cls.item.trigger.length == 0) {
						zs.toast("请选择接收人！");
						return;
					}
					if(cls.item.lat == null || cls.item.lng == null) {
						zs.toast("还没有选择触发提醒的位置！");
						return;
					}
					cls.item.title = $('#title').val();
					//cls.item.status = document.getElementById("switch2").classList.contains("mui-active");
					//alert(cls.item.status);
					zs.d(JSON.stringify(cls.item));
					zs.Api.post('remind', cls.rid ? 'edit' : 'add', cls.item, function(result) {
						if(result.status == 1) {
							zs.toast((cls.rid ? '编辑' : '添加') + "提醒成功");
							var detailPage = plus.webview.getWebviewById('remind_list');
							mui.fire(detailPage, 'resh', {});
							setTimeout(function() {
								mui.back();
							}, 1000)
							
						} else {
							zs.toast((cls.rid ? '编辑' : '添加') + "失败");
						}
					})
					
				});
				window.addEventListener('resh', function(event) {
					var user = zs.User.get_userinfo();
					var list = event.detail.list;
					var from_id = event.detail.from_id;
					var friends = zs.Friend.getFriendList();
					cls.users = Array();
					for(var i in list) {
						cls.users[i] = friends[list[i]];
					}
					if($('#title').val() == '') {
						var title = implode(cls.users, 'username', '/') + "触发的提醒";
						$('#title').val(title);
						cls.item.title = title;
					}
					zs.d(JSON.stringify(cls.users));
					if(cls.users && cls.users.length > 0) {						
						if(from_id =='select_uid'){
							cls.item.triggered = list.join(","); //字符分割 //implode(cls.users, 'fid', ',');
							zs.template('remind_uid', 'remind_pic', {
								list: cls.users
							});
							if(list.indexOf(user.id) == -1){
								zs.template('remind_sid', 'remind_pic', {
									list: [{user:{cover:user.cover}}]
								});
								cls.item.trigger = user.id;								
							}else{
								$("#remind_sid").html('');
								$("#select_sid").attr('data-extras', JSON.stringify({
									isradio: false,
									selected: list,
									from_id:'select_sid',
									user_show:true
								}));
							}
						}else{
							
							if(list.length > 0){
								cls.item.trigger = list.join(","); //字符分割 //implode(cls.users, 'fid', ',');
								zs.template('remind_sid', 'remind_pic', {
									list: cls.users
								});
							}else{
								$("#remind_sid").html('');
							}
							
						}
						
					}else{
						$("#remind_sid").html('');
					}
					cls.setSelected(cls.item.trigger,cls.item.triggered);
				});
				window.addEventListener('posSelected', function(event) {
					var pos = event.detail.pos;
					var sel_id = event.detail.sel_id;
					zs.d(JSON.stringify(pos));
					cls.item.addr = pos.name;
					cls.item.lat = pos.location.lat;
					cls.item.lng = pos.location.lng;
					cls.item.type = 0; //event.detail.type;
					var type = cls.item.type != 0 ? cls.item.type == 1 ? '到达' : '离开' : '到达/离开';
					$('#addr').text(sel_id + pos.name);
					//if($('#title').val() == '') {
						var title = implode(cls.users, 'username', '/') + "在" + pos.name + "触发的提醒";
						$('#title').val(title);
						cls.item.title = title;
					//}
				});
				var result = mui('#demo1')[0];
				var btns = mui('.anytime-jieshao');
				btns.each(function(i, btn) {
					btn.addEventListener('tap', function() {
						var optionsJson = this.getAttribute('data-options') || '{}';
						var options = JSON.parse(optionsJson);
						var id = this.getAttribute('id');
						/*
						 * 首次显示时实例化组件
						 * 示例为了简洁，将 options 放在了按钮的 dom 上
						 * 也可以直接通过代码声明 optinos 用于实例化 DtPicker
						 */
						var picker = new mui.DtPicker(options);
						picker.show(function(rs) {
							/*
							 * rs.value 拼合后的 value
							 * rs.text 拼合后的 text
							 * rs.y 年，可以通过 rs.y.vaue 和 rs.y.text 获取值和文本
							 * rs.m 月，用法同年
							 * rs.d 日，用法同年
							 * rs.h 时，用法同年
							 * rs.i 分（minutes 的第二个字母），用法同年
							 */
							result.innerHTML = rs.text;
							/* 
							 * 返回 false 可以阻止选择框的关闭
							 * return false;
							 */
							/*
							 * 释放组件资源，释放后将将不能再操作组件
							 * 通常情况下，不需要示放组件，new DtPicker(options) 后，可以一直使用。
							 * 当前示例，因为内容较多，如不进行资原释放，在某些设备上会较慢。
							 * 所以每次用完便立即调用 dispose 进行释放，下次用时再创建新实例。
							 */
							picker.dispose();
						});
					}, false);
				});
			});
		},
	});
}(mui, zs)