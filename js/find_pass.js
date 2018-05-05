/*!
 * =====================================================
 * zs v1.0.0 ()
 * =====================================================
 */
!
function(mui, zs) {
	zs.FindPassPage = zs.UserPage.extend({
		initConfig: function() {
			zs.User.isLogin() && mui.back();
			zs.Login = new zs.LoginClass
		},
		initPage: function() {
			mui.plusReady(function() {
				plus.screen.lockOrientation("portrait-primary");
				var c = this;
				plus.navigator.closeSplashscreen();
			}.bind(this))
			zs.closeWaiting()
		},
		initEvent: function() {
			var c = this;
			document.getElementById("send_code").addEventListener("tap", function(a) {
				var d = this;
				if (!d.busying) {
					var e = c.checkMobile();
					e && (d.busying = !0, d.innerText = "正在发送中", zs.Api.get_sms(e, function(a) {
						c.countSms(d)
					}, function() {
						d.innerText = "获取验证码", d.busying = !1
					}))
				}
			})
			mui(document.body).on("tap", '#reg', function() {
				var mobile = c.checkMobile(),
					sms = c.checkSms(),
					password = c.checkPass("password");
				return mobile && sms && password && (zs.showWaiting(), zs.Login.repass(mobile, sms, password, function(ret) {
					regCallback(ret, mobile, password);
				})), false

				function regCallback(ret, mobile, password) {
					if (ret.status == 1) {
						zs.User.initUserinfo(ret.data);
						zs.toast('找回密码成功!');
						zs.Login.login(mobile, password, function(ret) {
							zs.User.initUserinfo(ret.data);
							setTimeout(function() {
								zs.open("index.html", 'index');
								plus.webview.currentWebview().close();
							}, 2000);
						})
					} else {
						zs.toast(ret.msg);
					}
					zs.closeWaiting()
				}
			});
		},
		checkMobile: function() {
			var a = document.getElementById("mobile"),
				c = a.value;
			return /^1[3|4|5|8|7][0-9]\d{8}$/.test(c) ? c : (zs.toast("手机号码不符合格式，请重新输入！"), setTimeout(function() {
				a.focus()
			}, 20), false)
		},
		checkPass: function(item, msg) {
			item = typeof(item) == 'string' ? document.getElementById(item) : item;
			msg = msg || "用户密码为6-20位！";
			var val = item.value;
			return /^\w{6,20}$/.test(val) ? val : (zs.toast(msg), setTimeout(function() {
				item.focus()
			}, 20), false)
		},
		checkSms: function() {
			var a = document.getElementById("sms_code"),
				c = a.value;
			return /[0-9]{6}$/.test(c) ? c : (zs.toast("验证码不符合格式，请重新输入！"), setTimeout(function() {
				a.focus()
			}, 20), false)
		},
		//验证码 倒计时逻辑
		countSms: function(a) {
			var b = 60,
				c = window.setInterval(function() {
					a.innerText = --b + "秒后重发", 0 >= b && (window.clearInterval(c), a.busying = !1, a.innerText = "获取验证码")
				}, 1e3)
		}
	})
}(mui, zs);