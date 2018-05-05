/*!
 * =====================================================
 * zs v1.0.0 ()
 * =====================================================
 */
!
function(mui, zs) {
	zs.LoginPage = zs.UserPage.extend({
		initConfig: function() {
			mui.plusReady(function() {
				/*if(zs.User.isLogin()) {
					zs.open("index.html", 'index');
					setTimeout(function() {
						plus.webview.currentWebview().close();
					}, 2000);
				}*/

			});

		},
		initEvent: function() {
			var cls = this;
			mui(document.body).on("tap", '#login', function() {
				var mobile = cls.checkMobile();
				var password = cls.checkPass("password");
				return mobile && password && (zs.showWaiting(), zs.Login.login(mobile, password, function(ret) {
					loginCallback(ret);
				})), false

				function loginCallback(ret) {
					if(ret.status == 1) {
						var replace_cover = ret.data.cover;
						var final_cover = replace_cover.replace('http://s.zujimi.com', 'http://s.zujimi.com/');
						ret.data.cover = final_cover;
						zs.User.initUserinfo(ret.data);
						zs.open("index.html", 'index');
						setTimeout(function() {
							plus.webview.currentWebview().close();
						}, 2000);
						zs.closeWaiting()
					}else{
						zs.toast(ret.msg)
					}
				}
			})
			mui("#oauth_login").on("tap", "#wechat", function() {
					cls.loginByWechat();
				}),
				mui("#oauth_login").on("tap", "#sina", function() {
					cls.loginBySina()
				}),
				mui("#oauth_login").on("tap", "#QQ", function() {
					cls.loginByQq()
				})
		},
		checkMobile: function() {
			var a = document.getElementById("mobile"),
				c = a.value;
			return /^1[3|4|5|8|7][0-9]\d{8}$/.test(c) ? c : (zs.toast("手机号码不符合格式，请重新输入！"), setTimeout(function() {
				a.focus()
			}, 20), !1)
		},
		checkPass: function(item, msg) {
			item = typeof(item) == 'string' ? document.getElementById(item) : item;
			msg = msg || "用户密码为6-20位！";
			var val = item.value;
			return /^\w{6,20}$/.test(val) ? val : (zs.toast(msg), setTimeout(function() {
				item.focus()
			}, 20), false)
		},
		loginByWechat: function() {
			zs.Login.loginByWechat()
		},
		loginBySina: function() {
			zs.Login.loginBySina()
		},
		loginByQq: function() {
			zs.Login.loginByQq()
		},
		loginByQihoo: function() {
			zs.Login.loginByQihoo()
		}
	})
}(mui, zs),
function(a) {
	a.os.plus && (zs.LoginPage = zs.LoginPage.extend(a.extend(zs.AppObject, {
		oAuthLoginCallback: function(a, b) {
			a ? this.oAuthLoginSuccess(a.data, b) : this.oAuthLoginError()
		},
		oAuthLoginSuccess: function(a, b) {
			zs.User.init(a), zs.User.initUserinfo(b), zs.closeWaiting(), this.back()
		},
		oAuthLoginError: function() {
			zs.closeWaiting()
		},
		loginByWechat: function() {
			zs.showWaiting(), zs.Login.loginByWechat(this.oAuthLoginCallback.bind(this))
		},
		loginBySina: function() {
			zs.showWaiting(), zs.Login.loginBySina(this.oAuthLoginCallback.bind(this))
		},
		loginByQq: function() {
			zs.showWaiting(), zs.Login.loginByQq(this.oAuthLoginCallback.bind(this))
		},
		loginByQihoo: function() {
			zs.showWaiting(), zs.Login.loginByQihoo(this.oAuthLoginCallback.bind(this))
		},
		back: function() {
			a.each(plus.webview.all(), function(b, c) {
				zs.debug && zs.d(c.id), a.fire(c, "user_init")
			});
			var b = plus.webview.currentWebview().opener();
			b && a.fire(b, b.id), a.back()
		}
	})))
}(mui);