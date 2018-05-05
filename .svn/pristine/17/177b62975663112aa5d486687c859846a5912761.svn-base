/*!
 * =====================================================
 * zs v1.0.0 ()
 * =====================================================
 */
!
function(mui, zs) {
	zs.EditNoticePage = zs.UserPage.extend({
		users: null,
		item: null,
		rid: null,
		cate: '',
		initConfig: function() {
			if (!zs.Notice) zs.Notice = new zs.NoticeClass;
			var cls = this;
			mui.plusReady(function() {
				cls.rid = plus.webview.currentWebview().data_id;
				var title = '添加通知';
				if (cls.rid) {
					cls.item = zs.Notice.get(cls.rid);
					cls.users = Array();
					if (cls.item.receiver) {
						var users = cls.item.receiver.split(',');
						for (var i = 0; i < users.length; i++) {
							cls.users.push(zs.Friend.get(users[i]));
						}
					}
					title = '编辑通知';
				} else {
					cls.item = {
						uid: zs.User.getUid()
					};
				}
				$('#pageTitile').text(title);
				zs.template('content', 'add_content', {
					item: cls.item,
					users:cls.users
				});
				cls.setSelected(cls.item.receiver);
			});
		},
		setSelected: function(trigger) {
			var triggers = [];
			if(trigger) {
				triggers = trigger.split(',');
			}
			$("#select_uid").attr('data-extras', JSON.stringify({
				isradio: false,
				selected: triggers
			}));
		},
		initPage: function() {
		},
		initEvent: function() {
			var cls = this;
			mui.plusReady(function() {
				document.getElementById("send").addEventListener('tap', function() {
					if (cls.users == false || cls.users == null || cls.users.length == 0) {
						zs.toast("还没有选择接收通知的好友！");
						return;
					}
					if (cls.item.lat == null || cls.item.lng == null) {
						zs.toast("还没有选择触发通知的位置！");
						return;
					}
					cls.item.status = document.getElementById("switch2").classList.contains("mui-active");
					cls.item.title=$('#title').val();
					zs.Api.post('notice', cls.rid ? 'edit' : 'add', cls.item, function(result) {
						if (result.status == 1) {
							zs.toast((cls.rid ? '编辑' : '添加') + "通知成功");
							var opener = plus.webview.currentWebview().opener();
							opener && opener.reload();
							mui.back();
						} else {
							zs.toast((cls.rid ? '编辑' : '添加') + "失败");
						}
					})
				});
				window.addEventListener('resh', function(event) {
					var list = event.detail.list;
					var friends = zs.Friend.getFriendList();
					cls.users = Array();
					for (var i in list) {
						cls.users[i] = friends[list[i]];
					}
					cls.item.receiver = implode(cls.users, 'fid', ',');
					zs.d(JSON.stringify(cls.users));
					if (cls.users && cls.users.length > 0) {
						zs.template('users', 'users', {
							list: cls.users
						});
					}
					cls.setSelected(cls.item.receiver);
				});
				window.addEventListener('posSelected', function(event) {
					var pos = event.detail.pos;
					zs.d(JSON.stringify(pos));

					cls.item.addr = pos.name;
					cls.item.lat = pos.point.latitude;
					cls.item.lng = pos.point.longitude;
					cls.item.type = 0; //event.detail.type;
					var type = cls.item.type != 0 ? cls.item.type == 1 ? '到达' : '离开' : '到达/离开';
					$('#addr').text(type + pos.name);
					if ($('#title').val() == '') {
						var title = "我" + $('#addr').text() + "触发的通知";
						$('#title').val(title);
						cls.item.title = title;
					}
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