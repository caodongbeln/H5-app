/*!
 * =====================================================
 * zs v1.0.0 ()
 * =====================================================
 */
!
function(mui, zs) {
	//	个人资料
	zs.PersonPage = zs.InfoPage.extend({
		initConfig: function() {
			zs.User.isLogin() && mui.back();
			zs.Login = new zs.LoginClass
		},
		initPage: function() {
			var cls = this;
			mui.plusReady(function() {
				if(zs.User.get_userinfo()) {
					var user = zs.User.get_userinfo()
					zs.template('personInfo', 'person_info', {
						user: user
					}, 'append');
					mui.previewImage();
				}
				cls.clickEvent();
			})
		},
		initEvent: function() {
			mui.plusReady(function() {

				document.getElementById("save").addEventListener('tap', function() {
					var gender = $("#gender  option:selected").text();
					if(gender == '男') {
						var sex = 1
					} else {
						var sex = 0
					}
					var imgs = [];
					var imgsFather = $('#General_lighting li:not(#General_lighting li:last)');
					var len = imgsFather.length;
					for(var i = 0; i < len; i++) {
						imgs.push($('#General_lighting li:not(#General_lighting li:last)').eq(i).find('img').attr('href'));
					}
					var parm = {
						id: zs.User.isLogin(),
						username: $('#nick').html(),
						back_cover: imgs,
						work_unit: $('#job').html(),
						birth: $('#data').text(),
						mobile: $('#tel').val(),
						mood: $('#mood').val(),
						movie: $('#movie').val(),
						book: $('#book').val(),
						music: $('#music').val(),
						gender: sex,
						work_addr: $('#job_addr').html(),
						living_addr: $('#live').html(),
						often_addr: $('#see').html(),
						is_show: window.isShow
					}
					zs.Api.post('user', 'edit', parm, function(a) {
						zs.User.initUserinfo(a.data);
						zs.toast('保存成功!');
						var detailPage = plus.webview.getWebviewById('my');
						mui.fire(detailPage, 'change_gold', {
							userInfo:a.data
						});
						var listPage = plus.webview.getWebviewById('friend_list');
						mui.fire(listPage, 'change_gold', {
							userInfo:a.data
						});
						//						plus.webview.currentWebview().close();
						zs.closeWaiting();
					})
				})
				mui('.mui-content .mui-switch').each(function() { //循环所有toggle
					this.addEventListener('toggle', function(event) {
						//可直接获取当前状态
						if(event.detail.isActive) {
							window.isShow = 1;
							//@Tocheck 解决默认打开页面开关位置问题
							document.getElementById('seLshow').className = 'mui-switch mui-switch-blue mui-pull-right mui-active';
							zs.toast('已开启');
						} else {
							window.isShow = 0;
							//@Tocheck 解决默认打开页面开关位置问题
							document.getElementById('seLshow').className = 'mui-switch mui-switch-blue mui-pull-right';
							zs.toast('已关闭');
						}
					});
				});
			})
		},
		clickEvent: function() {
			mui.plusReady(function() {
				var lastButton = document.getElementById('last');
				lastButton.addEventListener('tap', function(event) {
					plus.gallery.pick(function(p) {
						zs.showWaiting();
						zs.File.upload(p, function(url) {
							p = p.replace(/\(\d+\)/g, "");
							var html = "<li><div><img src=" + zs.imgUrl + url + " href=" + url + "></div></li>";
							$('#General_lighting li').eq(-1).before(html);
							zs.closeWaiting();
						})
					});
				});
				popover('promptBtn', '修改昵称', nick);
				popover('seLjob', '工作单位', job);
				popover('seLaddr', '工作地点', job_addr);
				popover('seLlive', '生活地点', live);
				popover('seLsee', '常出没地', see);

				function popover(cata, title, catdId) {
					document.getElementById(cata).addEventListener('tap', function(e) {
						e.detail.gesture.preventDefault(); //修复iOS 8.x平台存在的bug，使用plus.nativeUI.prompt会造成输入法闪一下又没了
						var btnArray = ['取消', '确定'];
						mui.prompt(title, '', '', btnArray, function(e) {
							if(e.index == 1 && e.value != '') {
								if(catdId == nick) {
									var elength = e.value.length;
									if(elength > 10) {
										zs.toast('昵称不得大于10个字符');
										return;
									}
								}
								catdId.innerText = e.value;

							}
						})
					});
				}
				document.getElementById("pickDateBtn").addEventListener('tap', function() {
					var dDate = new Date();
					dDate.setFullYear(2014, 7, 16);
					var minDate = new Date();
					minDate.setFullYear(2010, 0, 1);
					var maxDate = new Date();
					maxDate.setFullYear(2016, 11, 31);
					plus.nativeUI.pickDate(function(e) {
						var d = e.date;
						data.innerText = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
					}, function(e) {
						data.innerText = "您没有选择日期";
					}, {
						title: "请选择日期",
						date: dDate,
						minDate: minDate,
						maxDate: maxDate
					});
				})
			})
		},
	});
	//	好友资料
	zs.FriendPage = zs.InfoPage.extend({
		initPage: function() {
			var cls = this;
			cls.userInfo('detailHeader', 'detail_header');
			cls.locationInfo('detailContent','detail_content');
			cls.otherInfo('detailFooter','detail_footer');
		},
		initEvent: function() {},
	});
	//陌生人资料
	zs.StrangerPage = zs.InfoPage.extend({
		initPage: function() {
			var cls = this;
			cls.userInfo('strangerDetail', 'stranger_detail_content');

		},
		initEvent: function() {

		},
	});
}(mui, zs);