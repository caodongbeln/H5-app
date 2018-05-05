/*!
 * =====================================================
 * zs v1.0.0 ()
 * =====================================================
 */
!
function(mui, zs) {
	zs.ChangePassPage = zs.UserPage.extend({
		initEvent: function() {
			var cls = this;
			mui.plusReady(function() {
				mui(document.body).on("tap", '#sure', function() {
					var checkForm = cls.checkForm();
					if (checkForm) {
						var mobile = zs.User.get_userinfo().mobile;
						var old_password = cls.checkPass("old_password");
						var password = cls.checkPass("password");
						var repassword = cls.checkPass("re_password");
					}
					return mobile && old_password && password && repassword & (zs.showWaiting(), zs.Login.changePass(mobile, old_password, password, repassword, function(ret) {
						loginCallback(ret);
					})), false

					function loginCallback(ret) {
						if (ret.status == 1) {
							zs.toast('修改密码成功!');
							zs.User.initUserinfo(ret.data);
							setTimeout(function() {
								zs.open("index.html", 'index');
								plus.webview.currentWebview().close();
							}, 1000);
						} else {
							zs.toast('旧密码输入有误!')
						}
						zs.closeWaiting()
					}
				})
			})
		},
		//		checkMobile: function() {
		//			var a = document.getElementById("mobile"),
		//				c = a.value;
		//			return /^1[3|4|5|8|7][0-9]\d{8}$/.test(c) ? c : (zs.toast("手机号码不符合格式，请重新输入！"), setTimeout(function() {
		//				a.focus()
		//			}, 20), false)
		//		},
		checkPass: function(item, msg) {
			item = typeof(item) == 'string' ? document.getElementById(item) : item;
			msg = msg || "用户密码为6-20位！";
			var val = item.value;
			return /^\w{6,20}$/.test(val) ? val : (zs.toast(msg), setTimeout(function() {
				item.focus()
			}, 20), false)
		},
		checkForm: function() {
			var old_pass = document.getElementById('old_password');
			var pass = document.getElementById('password');
			var re_pass = document.getElementById('re_password');
			if (old_pass.value == '') {
				zs.toast('旧密码不能为空!');
				old_pass.focus();
				return false;
			} else if (pass.value == '') {
				zs.toast('新密码不能为空!')
				pass.focus();
				return false;
			} else if (re_pass.value == '') {
				zs.toast('确认密码不能为空!')
				re_pass.focus();
				return false;
			}else if(pass.value != re_pass.value){
				zs.toast('新密码和确认密码不一致!');
				return false;
			}else if(pass.value == re_pass.value == old_pass.value){
				zs.toast('旧密码和新密码不可一致!');
				return false;
			}else{
				return true;
			}
		}
	})
}(mui, zs)