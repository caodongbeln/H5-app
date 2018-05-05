window.zs = {
		env: "development", //开发环境 production:生产环境  development:开发环境
		base: "https://test.zujimi.com/", //根访问目录
		rong_appId: "8luwapkvu36gl", //融云appid
		url: "http://test.zujimi.com/index.php?g=api", //根接口地址
		uploadUrl: "http://test.zujimi.com/index.php?g=api&m=user&a=ajax_upload_img",
		userLocationUrl: "http://test.zujimi.com/index.php?g=api&m=user_location&a=add",
		url: "http://test.zujimi.com/index.php?g=api",
		imgUrl: "http://s.zujimi.com/",
		backUrl: "index.html", //默认返回页																
		loginUrl: "login.html", //手机登录页面
		propUrl: "select_prop.html", //选择道具页面
		registerUrl: "register.html", //注册页面
		uploadbase: "http://i.test.zujimi.com/",
		centerUrl: "../tpl/index.html", //个人中心页面
		phone_login_Url: "phoneLogin.html", //增加手机登录界面    //"login.html", //手机登录页面  
		addressUrl: ~document.location.href.indexOf("/page/") ? "../sites/sites.html" : "page/sites/sites.html", //地址页面
		wgtUrl:'http://qiejia.oss-cn-beijing.aliyuncs.com/zujimi.wgt',
		perfectDatandIndex: "../tpl/perfect_data_index.html", //点击注册后跳转到完善资料页
		d: Function.prototype.bind.call(console.debug, console), //控制台输出
		d2: function(data) {
			zs.d(data);
		},
		a: document.createElement("a"), //创建一个a元素
		div: document.createElement("div"), //创建一个div元素
		decodeRegexp: /\+/g, //正则匹配
		paramRegexp: /([^&=]+)=?([^&]*)/g, //匹配get参数
		app_id: 20, //app_id
		app_secret: "f45571c676e1fbe7d065f26aced7d666", //app_secret
		app_version: "1.0", //app版本
		market: {
			ios: "https://itunes.apple.com/WebObjects/MZStore.woa/wa/viewContentsUserReviews?id=688185140&pageNumber=0&sortOrdering=2&type=&mt=8", //ios访问地址
			android: "market://details?id=com.internet.tiaoshi" //android应用下载地址
		},
		share: { //分享信息配置
				title: "我正在使用朋友定位移动应用，赶紧跟我一起来体验！",
				content: "我正在使用朋友定位移动应用，赶紧跟我一起来体验！",
				href: "http://test.zujimi.com/index.php?m=index&a=login"
		},
		map: "system", //地图类型
		baidu_ak: "xfGYVAIbHHQHXGusD2X31qMk", //地图访问密钥
		placeholder: { //提示图标
			banner: "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==",
			item: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAIAAAD/gAIDAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RDIxRjU5OUYzOThDMTFFNDhCOERFQkI3RjgzQUI1MUQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RDIxRjU5QTAzOThDMTFFNDhCOERFQkI3RjgzQUI1MUQiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpEMjFGNTk5RDM5OEMxMUU0OEI4REVCQjdGODNBQjUxRCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpEMjFGNTk5RTM5OEMxMUU0OEI4REVCQjdGODNBQjUxRCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PrjfiygAAAdBSURBVHja7Jz/MzJd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"
		},
		cache: {
			image: "_doc/image/", //图片是否缓存
			audio: "_doc/audio/", //图片是否缓存
		},
		aniShow: "", //页面跳转方式		
		cover: '0',
		//未读消息数
		totalunreadcount: 0,
		//消息历史
		conversationList: '',
		//消息历史
		historyMessagesCache: new Array(),
		pages: ['rongyun'],
		data: { //基础菜单配置
			nav: [{
				id: "index",
				title: "首页",
				icon: "index",
				url: "index.html"
			}, {
				id: "msg",
				title: "联系人",
				icon: "msg",
				url: "contacts.html"
			}, {
				id: "discovery",
				title: "发现",
				icon: "discovery",
				url: "surrounding_dynamic.html"
			}, {
				id: "my",
				title: "我的",
				icon: "index-my",
				url: "my.html"
			}],
			payment: mui.os.stream ? [{ //支付方式   ?????????????????????
				title: "支付宝支付"
			}] : [{
				title: "支付宝支付"
			}, {
				title: "微信支付"
			}],
			share: [{ //分享方式
				title: "分享到微信好友"
			}, {
				title: "分享到微信朋友圈"
			}, {
				title: "分享到QQ"
			}],
			invite: [{ //邀请方式
				title: "通过微信好友邀请"
			}, {
				title: "通过微信朋友圈邀请"
			}, {
				title: "通过微博邀请"
			}],
			defLoc: { //如系统无法定位，获取默认的坐标位置
				longitude: 116.3975,
				latitude:39.9074
			}
		},
	},
	function(mui, zs, win, doc) { //扩展
		zs.debug = "development" === zs.env,
			mui.extend(zs, {
				error: function(err) { //错误处理方式
					zs.alert(err)
				},
				decode: function(url) { //获取访问链接
					return decodeURIComponent(url.replace(this.decodeRegexp, " "))
				},
				//获取get访问的所有参数
				//以object方式返回
				parseParams: function(url) {
					var params = {};
					if(url = url && (0 === url.indexOf("?") ? url.replace("?", "") : url))
						for(var c; c = this.paramRegexp.exec(url);)
							params[this.decode(c[1])] = this.decode(c[2]);
					return params
				},
				/*  模板填充	
				 *	id:父节点的id
				 * 	tpl:模板id
				 *  data:要填充的数据
				 * 	type: 返回方式；return: 直接返回； append：增加到f内部末尾 prepend：添加到内部第一个
				 * */
				template: function(id, tpl, data, type) {
					var outter = typeof(id) == 'string' ? doc.getElementById(id) : id;
					if(outter) {
						var g, h = template(tpl, data);

						if("return" === type) return h;
						if("append" === type) {
							var i = doc.createDocumentFragment();
							for(this.div.innerHTML = h; g = this.div.firstElementChild;) i.appendChild(g);

							outter.appendChild(i)
						} else if("prepend" === type) {
							var i = doc.createDocumentFragment();
							for(this.div.innerHTML = h; g = this.div.firstElementChild;) i.appendChild(g);
							outter.insertBefore(i, outter.firstElementChild)
						} else outter.innerHTML = h
						this.renderImage(outter);
					}
				},
				handleOpen: function(data, func) {
					func()
				},
				/*
				 * 对象保存到本地缓存
				 * */
				setItem: function(key, value) {
					return win.localStorage.setItem(key, value)
				},
				/*
				 * 获取本地缓存
				 * */
				getItem: function(key) {
					return win.localStorage.getItem(key)
				},
				/*
				 * 缓存追加
				 * a 缓存名称命名
				 * b json字符串
				 * b存在追加，b不存在获取缓存数据
				 * */
				addcache: function(a, b) {
					var bb = zs.getItem(a);
					if(b) {
						var myobj = JSON.parse(bb);
						for(var i = 0, len = b.length; i < len; i++) {
							myobj.push(b[i]);
						}
						zs.setItem(a, JSON.stringify(myobj));
					} else {
						return bb;
					}

				},
				/*
				 * 移除本地缓存
				 * */
				removeItem: function(key) {
					return win.localStorage.removeItem(key)
				},
				/*生成Loading项
				 */
				createLoading: function() {
					return zs.loading = doc.getElementById("zs_LOADING"), zs.loading || (zs.loading = doc.createElement("div"), zs.loading.id = "zs_LOADING", zs.loading.className = "mui-backdrop", zs.loading.innerHTML = '<span class="mui-spinner mui-spinner-white"></span>'), zs.loading
				}(),
				/*显示Loading项
				 */
				showWaiting: function() {
					mui.plusReady(function() {
						plus.nativeUI.showWaiting("", {
							padlock: !0
						})
					})
				},
				/*关闭Loading项
				 */
				closeWaiting: function() {
					mui.plusReady(function() {
						plus.nativeUI.closeWaiting()
					})
				},
				/* 创建并显示系统样式提示对话框，可设置提示对话框的标题、内容、按钮文字等。 
				 * 弹出的提示对话框为非阻塞模式，用户点击提示对话框上的按钮后关闭，并通过alertCB回调函数通知对话框已关闭。
				 * message: ( String ) 必选 提示对话框上显示的内容
				 * alertCB: ( AlertCallback ) 可选 提示对话框上关闭后的回调函数
				 * title: ( String ) 可选 提示对话框上显示的标题
				 * buttonCapture: ( String ) 必选 提示对话框上按钮显示的内容
				 */
				alert: function(message, alertCB, title, buttonCapture) {
					mui.alert(message, alertCB || "提示", title, buttonCapture)
				},
				/* 创建并显示系统样式输入对话框，可设置输入对话框的标题、内容、提示输入信息、按钮数目及其文字。 
				 * 弹出的输入对话框为非阻塞模式，其中包含编辑框供用户输入内容，用户点击输入对话框上的按钮后自动关闭，并通过promptCB回调函数返回用户点击的按钮及输入的内容。
				 * message: ( String ) 必选 输入对话框上显示的内容
				 * promptCB: ( PromptCallback ) 可选 关闭输入对话框的回调函数
				 * 回调函数中包括Event参数，可通过其index属性（Number类型）获取用户点击按钮的索引值，通过其value属性（String类型）获取用户输入的内容。
				 * title: ( String ) 可选 输入对话框上显示的标题
				 * tip: ( String ) 可选 输入对话框上编辑框显示的提示文字
				 */
				prompt: function(message, promptCB, callback) {
					mui.prompt(message, promptCB, "提示", ["确定", "取消"], function(ret) {
						0 === ret.index ? callback && callback(ret.value) : callback && callback(ret.value)
					})
				},
				/* 创建并显示系统样式确认对话框，可设置确认对话框的标题、内容、按钮数目及其文字。
				 * 弹出的确认对话框为非阻塞模式，用户点击确认对话框上的按钮后关闭，并通过confirmCB回调函数通知用户点击的按钮索引值。
				 * message: ( String ) 必选 确认对话框上显示的内容
				 * title: ( ConfirmCallback ) 可选 确认对话框关闭后的回调函数
				 * callback: ( ConfirmCallback ) 可选 确认对话框关闭后的回调函数
				 * 回调函数中包括Event参数，可通过其index属性（Number类型）获取用户点击按钮的索引值。
				 * title: ( String ) 可选 确认对话框上显示的标题
				 * buttons: ( Array[ String ] ) 可选 确认对话框上显示的按钮
				 * 字符串数组，每项对应在确认对话框上显示一个按钮，用户点击后通过confirmCB返回用户点击按钮的在数组中的索引值。
				 */
				confirm: function(message, title, callback) {
					mui.isFunction(title) && (callback = title, title = "提示"), mui.confirm(message, title, ["确认", "取消"], function(ret) {
						callback(0 === ret.index ? true : false);
					})
				},
				toast: function(str) {
					mui.toast(str)
				},
				open: function(url, view, params, show) {
					zs.Init.open(url, view, params, show);
				},
				isStatusbarOffset: function() { //状态栏
					return mui.os.ios && parseFloat(mui.os.version) >= 7
				},
				getBitmapById: function(id) {
					return plus.nativeObj ? plus.nativeObj.Bitmap.getBitmapById(id) : (zs.debug && zs.d("plus.nativeObj is undefined"), !1)
				},

				renderImage: function(node) {
					node = node ? node : document;
					node = typeof(node) == 'string' ? document.getElementById(node) : node;
					mui.each(node.querySelectorAll("img[data-src]"), function(i, item) {
						var url = item.getAttribute('data-src');
						var css = item.getAttribute('data-css');
						css = css ? "@!" + css : "";
						zs.File.get(url, css, function(uri) {
							item.src = uri;
						});
					});
				},
			}),
			zs.Init = mui.Class.extend({
				/*初始化*/
				init: function(name) {
					zs.debug && zs.d("init:::page:" + name + "\n");
					zs.page = name,
						this.initConfig(),
						this.initEvent(),
						this.initOs(),
						name && new zs[name + "Page"]
				},
				/*初始化配置*/
				initConfig: function(conf) {
					zs.debug && (mui.ajaxSettings.beforeSend = function(mui, conf) {
							zs.d("beforeSend:::" + JSON.stringify(conf));
						}),
						zs.Init = this,
						zs.Api = new zs.ApiClass,
						zs.User = new zs.UserClass,
						zs.Friend = new zs.FriendClass(),
						zs.Invite = new zs.InviteClass(),
						zs.Conversation = new zs.ConversationClass(),
						zs.Location = new zs.LocationClass,
						zs.Login = new zs.LoginClass,
						zs.Audio = new zs.fileClass('audio'),
						zs.File = new zs.fileClass('image'),
						zs.Share = new zs.ShareClass(zs.data.share);
				},
				/*初始化事件*/
				initEvent: function() {
					var cls = this,
						back = mui.back;
					mui.back = function() {
							if(cls.backUrl) {
								zs.open('', cls.backUrl.substr(0, cls.backUrl.indexOf('.html')), {}, '');
							} else back()
						},
						document.addEventListener("reset", function() {
							cls.busying = !1
						}),
						mui(document.body).on("tap", "[data-share]", function() {
							event.stopPropagation();
							var title = this.getAttribute("data-share-title"),
								content = this.getAttribute("data-share-content"),
								href = this.getAttribute("data-share-href");
							zs.Share.shareAction({
								content: content || zs.share.content,
								title: title || zs.share.title,
								href: href ||  zs.share.href
							})
						}),
						//新页面的打开方式
						mui(document.body).on("tap", "[data-href]", function(node) {
							event.stopPropagation();
							var tagName = node.target.tagName;
							var view = this.getAttribute("data-view"),
								href = this.getAttribute("data-href"),
								show = this.getAttribute("data-show"),
								extras = this.getAttribute("data-extras"),
								needLogin = this.getAttribute("data-login"),
								id = this.getAttribute("data-id"),
								auth = this.getAttribute("data-auth"),
								tool = this.getAttribute("data-tools");
							view = view || href.substr(0, href.indexOf('.html'));
							//如果点的是当前页面，直接return；
							if(plus.webview.currentWebview().id == view) return;
							show = show || zs.aniShow;
							extras = extras ? JSON.parse(extras) : {};
							var params = {
								openerid: plus.webview.currentWebview().id,
								data_id: id,
								deatil_id: id, //兼容云飞写的不规范的页面
							};
							
							mui.extend(params, extras);
							//zs.d(JSON.stringify(params))
							var flag = true; //是否打开页面的标记
							/* 判定是否直接打开页面： 
							 * 多个条件顺序判定；如果发现有一个为false；则不再继续进行判定；
							 * 全部为true时，直接打开对应页面；
							 * 否则直接对应操作即可；
							 */

							/*判定是否需要公开位置*/
							if("true" == needLogin || needLogin) {
								var flag = zs.User.isLogin();
								if(!flag) {
									zs.confirm("您当前还未登录，请登录", function(ret) {
										ret && zs.open(zs.loginUrl);
									})
								}
							}
							/*判定是否需要公开位置*/
							if(flag && auth && id) {
								flag = zs.Friend.isAuthed(id);
								if(!flag) {
									zs.confirm("本功能需要对方公开位置，邀请对方公开位置？", function(ret) {
										ret && zs.Friend.requireAuth(zs.User.getUid(), id);
									})
								}
							}
							/*判定是否需要使用道具*/
							if(flag && tool && id) {
								var tid = this.getAttribute("data-tid");
								flag = zs.Friend.isUsedTool(id, tid);
								var user = zs.User.get_userinfo();								
								if(!user.update){
									if(!flag) {
									zs.confirm("本功能需要使用道具，是否继续？", function(ret) {
										ret && zs.Api.post('tools_sales', 'lists', {
											uid: zs.User.isLogin()
										}, function(list) {
											var list = list.data;
											for(var i = 0, count = 0; i < list.length + 1; i++) {
												if(list[i] != undefined) {
													if(list[i].tid == tid && list[i].usable != 0) {
														count++
													}
												}
											}
											if(list.length < 0 || count == 0) {
												zs.confirm("您沒有可使用的道具，去购买", function(ret) {
													ret && mui.openWindow({
														url: 'go_pay.html',
														extras: {
															data_id: tid
														},
													});
												})
											} else if(count > 0) {
												zs.open(zs.propUrl, 'select_prop', {
													tid: tid
												});
											}
										})
									})
								}
								}else{
									zs.open(href, view, params, show);
								}
							
							}
							if(flag) {
								zs.open(href, view, params, show);
							}
						});
				},
				/*打开页面
				 * href：页面地址
				 * view：打开的webview的id
				 * params：参数列表
				 * aniShow:打开动画
				 * */
				open: function(href, view, params, aniShow) {
					var webview = plus.webview.getWebviewById(view);					
					zs.setItem('open_webview', view);
					if(webview) {
						webview.show(); // 显示窗口
						return;
					}					
					var wvs = plus.webview.all();
					var leng = wvs.length;
					var open = ['index','contacts', 'surrounding_dynamic', 'my', 'friend_list', 'location_remind'];
					
				  /*	setTimeout(function() {
						if(leng > 5) {
							for(var i = 0; i < wvs.length; i++) {
								if((leng - i > 5) && (open.indexOf(wvs[i].id) == -1)) {
									var detailPage = plus.webview.getWebviewById(wvs[i].id);
									//alert(wvs[i].id);
									detailPage.close();
									zs.d(wvs[i].id);
								}
							}
						}	
					}, 1000)*/
					mui.isPlainObject(view) && (aniShow = params, params = view, view = ""),
						aniShow = aniShow || zs.aniShow,
						mui.openWindow({
							url: href,
							id: view,
							extras: params,
							show: {
								autoShow: true,
								aniShow: aniShow
							},
							createNew: true
						});
				},
				/*初始化系统
				 * 删除所有mui-plus-visible,mui-plus-hidden样式的节点
				 * */
				initOs: function() {
					mui.os.plus || mui.each(doc.querySelectorAll(".mui-plus-visible"), function(idx, node) {
						node.parentNode.removeChild(node)
					})
					mui.each(document.querySelectorAll(".mui-plus-hidden"), function(index, node) {
						node.parentNode.removeChild(node)
					})
				}
			})

		zs.LoginClass = mui.Class.extend({
				oauths: {},
				init: function(callback) {
					var cls = this; //LoginClass
					mui.plusReady(function() {
						plus.oauth.getServices(function(oauths) {
							mui.each(oauths, function(index, item) { //
								zs.debug && zs.d(item.id),
									cls.oauths[item.id] = item,
									callback && callback()
							})
						}, mui.noop)
					})
				},
				/* 登录接口，
				 * mobile：手机号
				 * sms_code:验证码
				 * callback:回调函数
				 * */
				login: function(mobile, sms_code, password, callback) {
					zs.Api.login(mobile, sms_code, password, function(ret) {
						//callback && callback(ret)
					}, function() {
						callback && callback(!1)
					})
				},
				/* reg，
				 * mobile：手机号
				 * sms_code:验证码
				 * callback:回调函数
				 * */
				reg: function(mobile, sms_code, password, callback) {
					zs.Api.reg(mobile, sms_code, password, function(ret) {
						callback && callback(ret)
					}, function() {
						callback && callback(!1)
					})
				},
				repass: function(mobile, sms_code, password, callback) { //注册接口
					zs.Api.repass(mobile, sms_code, password, function(ret) {
						callback && callback(ret)
					}, function() {
						callback && callback(!1)
					})
				},
				changePass: function(mobile, old_password, password, repassword, callback) { //注册接口
					zs.Api.changePass(mobile, old_password, password, repassword, function(ret) {
						callback && callback(ret)
					}, function() {
						callback && callback(!1)
					})
				},
				/* 登出接口，
				 * callback:回调函数
				 * */
				logout: function(callback) {
					zs.User.logout(callback)
				},
				loginByFacebook: function(a) {
					this.loginByOAuth("facebook", a)
				},
				loginByWechat: function(a) {
					this.loginByOAuth("weixin", a)
				},
				loginBySina: function(a) {
					this.loginByOAuth("sinaweibo", a)
				},
				loginByQq: function(a) {
					this.loginByOAuth("qq", a)
				},
				/*将各第三方用户信息转为系统自己的用户信息
				 * cate：登录类型
				 */
				userinfo: function(cate, srcInfo) {
					var info = {};
					return "weixin" === cate ? info = srcInfo : "sinaweibo" === cate ? info = {
						openid: srcInfo.idstr,
						nickname: srcInfo.screen_name,
						headimgurl: srcInfo.profile_image_url,
						unionid: ""
					} : "qq" === cate ? info = {
						openid: "",
						nickname: srcInfo.nickname,
						headimgurl: srcInfo.figureurl_qq_1,
						unionid: ""
					} : "facebook" === cate && (info = {
						openid: srcInfo.id,
						nickname: srcInfo.name,
						headingurl: srcInfo.avatar,
						unionid: ""
					}), info
				},
				/*第三方登录
				 * type：登录渠道 weixin、sinaweibo、facebook
				 * token:第三方登录的token信息
				 * userinfo:系统的用户信息
				 * callback:回调函数
				 */
				oauthLogin: function(type, token, userinfo, callback) {
					zs.debug && zs.d("oauthLogin:type:" + type + ",userinfo:" + JSON.stringify(userinfo));
					var cates = {
						weixin: 1,
						sinaweibo: 2,
						facebook: 3,
						qq: 4
					};
					var info = plus.push.getClientInfo();
					if(plus.os.name == 'iOS') {
						var getui_token = info.token;
					} else {
						var getui_token = '';
					}
					zs.Api.oauth_login({
						//imei: plus.device.imei,
						oauth_type: cates[type],
						oauth_uid: userinfo.openid,
						oauth_token: token.access_token,
						oauth_token_secret: "",
						refresh_token: "",
						screenname: userinfo.nickname,
						union_id: userinfo.unionid,
						avatar: userinfo.headimgurl,
						cid: info.clientid,
						getui_token: getui_token,
						sex: userinfo.sex

					}, function(ret) {
						zs.d(JSON.stringify(ret.data));
						zs.User.initUserinfo(ret.data);
						callback && callback(ret.data)
					}, function() {
						callback && callback(!1)
					})
				},
				/*第三方登录
				 * type：登录类型
				 * callback:回调函数
				 */
				loginByOAuth: function(type, callback) {
					var d = this,
						oauth = this.oauths[type];
					if(oauth) {
						var app = {};
						"facebook" === type && (app.appkey = zs.qihoo_app_key), oauth.login(function() {
							oauth.getUserInfo(function() {
								var userinfo = d.userinfo(type, oauth.userInfo);
								d.oauthLogin(type, oauth.authResult, userinfo, function(ret) {
									zs.User.initUserinfo(ret);
									zs.Init.open(zs.centerUrl);
									zs.closeWaiting();
									//callback && callback(ret, userinfo, oauth.authResult)
								})
							}, function(ret) {
								zs.debug && zs.d("getUserInfo error:" + ret.code + "," + ret.message),
									callback && callback(!1)
							})
						}, function(ret) {
							zs.debug && zs.d("oauth[" + type + "] login error:" + ret.code + "," + ret.message), callback && callback(!1)
						}, app)
					} else zs.error("暂不支持[" + type + "]登录")
				}
			})
			//文件扩展
		zs.fileClass = mui.Class.extend({
				init: function(type) {
					this.path = zs.cache[type] //存储路径
					zs.d("fileclass init");
				},
				/*获取文件
				 * 默认从缓存中获取
				 * uri：图片地址
				 * callback：回调函数
				 * isDownLoad:如果缓存没有该图片，是否下载；默认为下载；
				 */
				get: function(uri, css, callback, isDownLoad) {
					mui.isFunction(css) && (isDownLoad = callback, callback = css, css = "");
					if(this.getLocalUrl(uri) == "") {
						return;
					}
					uri += css;
					var cls = this;
					"undefined" == typeof isDownLoad && (isDownLoad = true),
						//zs.debug && zs.d("image:::" + uri),
						cache.getItem(uri, function(ret) {
							//zs.debug && zs.d("cache:::" + ret),
							0 !== ret.indexOf("_") ? callback(ret) :
								mui.plusReady(function() {
									plus.io.resolveLocalFileSystemURL(ret, function(ret2) {
										//zs.d(ret2.toLocalURL());
										callback(ret2.toLocalURL())
									}, function() {
										callback(!1)
									})
								});
						}, function() {
							zs.debug && zs.d("no cache"),
								isDownLoad ? cls.download(uri, function(ret) {
									plus.io.resolveLocalFileSystemURL(ret, function(ret2) {
										callback(ret2.toLocalURL())
									}, function() {
										callback(!1)
									})
								}, function() {
									callback(!1)
								}) : callback(!1)
						})
				},
				/* 下载图片
				 * 默认从缓存中获取
				 * uri：图片地址
				 * succ:下载成功回调函数
				 * err:下载失败回调函数
				 */
				download: function(uri, succ, err) {
					mui.plusReady(function() {
						this.addDownload(uri, succ, err).start();
						zs.d("download task added:" + uri);
					}.bind(this))
				},
				/* 添加下载图片任务
				 * 默认从缓存中获取
				 * uri：图片地址
				 * succ:下载成功回调函数
				 * err:下载失败回调函数
				 */
				addDownload: function(uri, succ, err) {
					var cls = this;
					//zs.d("path:"+cls.path + uri.substring(uri.lastIndexOf("/") + 1));
					//zs.d("url"+this.getUrl(uri));
					return zs.debug && zs.d("download:" + uri), plus.downloader.createDownload(this.getUrl(uri), {
						filename: cls.path + uri.substring(uri.lastIndexOf("/") + 1)
					}, function(file, status) {
						if(zs.debug && zs.d("download.status:" + status), 200 == status) {
							var filename = file.filename;
							//zs.d("download succ filename:" + filename);
							cache.setItem(uri, filename), succ(filename)
						} else {
							err && err(!1);
							zs.d("download failed: status" + status);
						}
					})
				},
				/* 上传文件
				 * file：文件
				 * succ:下载成功回调函数
				 * err:下载失败回调函数
				 */
				upload: function(file, succ, err) {
					mui.plusReady(function() {
						this.addUpload(file, succ, err).start();
						zs.d("download task added:" + file);
					}.bind(this))
				},
				/* 添加下载图片任务
				 * 默认从缓存中获取
				 * file：图片地址
				 * succ:下载成功回调函数
				 * err:下载失败回调函数
				 */
				addUpload: function(file, succ, err) {
					zs.debug && zs.d("upload:" + file);
					var cls = this;
					var task = plus.uploader.createUpload(zs.uploadUrl, {
						method: 'POST',
					}, function(ret, status) {
						if(zs.debug && zs.d("upload.status:" + status), 200 == status) {
							//反复json解析不成功，没找到原因，故用正则解决
							var res = ret.responseText.match(/\"status\":(\d+).*\"data\":\"([^\"]*)\"/);
							//zs.d(JSON.stringify(ret));
							if(res[1] == 1) {
								var url = cls.getLocalUrl(res[2].replace(/\\\//g, '/'));
								zs.d("url:" + url + "," + file);
								zs.setItem('video', url);
								cache.setItem(file, file); //保存自身的缓存，兼容本地播放本地地址
								cache.setItem(url, file), succ(url);
							}
						} else {
							err && err(!1)
						}
					});
					task.addFile(file, {
						key: "img"
					});
					return task;
				},
				getUrl: function(url) {
					if(url.indexOf("http") < 0) {
						//因为服务器返回地址错误，暂时方案
						url = zs.imgUrl + url;
					}
					return url;
				},
				getLocalUrl: function(url) {
					//因为服务器返回地址错误，暂时方案
					url = url.replace(/data\/upload\/user\//, '');
					if(url.indexOf("http") >= 0) {
						url = url.replace(zs.imgUrl, '');
					}
					return url;
				}
			})
			//分享扩展
		zs.ShareClass = mui.Class.extend({
				shares: {},
				/*初始化*/
				init: function(buttons) {
					var cls = this;
					cls.buttons = buttons, mui.plusReady(function() {
						cls.updateSerivces()
					})
				},
				shareAction: function(b) {
					var cls = this;
					plus.nativeUI.actionSheet({
						cancel: "取消",
						buttons: cls.buttons
					}, function(share) {
						var type = share.index;
						switch(type) {
							case 1:
								cls.share("weixin", mui.extend(!0, {}, b, {
									extra: {
										scene: "WXSceneSession"
									}
								}));
								break;
							case 2:
								zs.title = zs.content, cls.share("weixin", mui.extend(!0, {}, b, {
									extra: {
										scene: "WXSceneTimeline"
									}
								}));
								break;
							case 3:
								zs.content = zs.content + " " + zs.href, cls.share("qq", mui.extend(!0, {}, b))
						}
					})
				},
				share: function(type, c) {
					var cls = this,
						share = cls.shares[type];
					return share ? void(share.authenticated ? cls._share(share, c) : share.authorize(function() {
						cls._share(share, c)
					}, function(ret) {
						zs.error("认证授权失败")
					})) : void zs.error("无效的分享服务[" + type + "]")
				},
				_share: function(share, c) {
					share.send(c, function() {
						var detailPage = plus.webview.getWebviewById('task');
							mui.fire(detailPage, 'resh', {});
						zs.toast('分享到"' + share.description + '"成功！')
					}, function(c) {
						zs.toast('分享到"' + share.description + '"失败！')
					})
				},
				updateSerivces: function() {
					var cls = this;
					plus.share.getServices(function(shares) {
						cls.shares = {},
							mui.each(shares, function(index, share) {
								cls.shares[share.id] = share
							})
					}, function(ret) {
						zs.error("获取分享服务列表失败：" + ret.message)
					})
				}
			})
			//支付扩展
		zs.PaymentClass = mui.Class.extend({
				/*支付方式*/
				channels: {},
				init: function(buttons) {
					var cls = this;
					cls.buttons = buttons,
						mui.plusReady(function() {
							cls.updateChannels()
						})
				},
				/*付款动作*/
				payAction: function(callback) {
					var cls = this;
					plus.nativeUI.actionSheet({
						cancel: "取消",
						buttons: cls.buttons
					}, function(item) {
						var index = item.index,
							type = !1;
						switch(index) {
							case 0:
								a(!1);
								break;
							case 1:
								type = "alipay";
								break;
							case 2:
								type = "wxpay"
						}
						callback && callback(type)
					})
				},
				/*付款
				 * type:付款方式 alipay/wxpay
				 * order:订单情况
				 * callback:回调函数
				 */
				pay: function(type, order, callback) {
					var cls = this,
						channel = cls.channels[type];
					return channel ? void(cls.checkService(channel) && (zs.showWaiting(), cls.getStatement(type, order, function(ret) {
						ret ? (zs.debug && zs.d("[" + type + "] statement:::" + ret), plus.payment.request(channel, ret, function(ret2) {
							zs.closeWaiting(), zs.error("支付成功"), callback && callback(!0)
						}, function(ret) {
							zs.closeWaiting(), zs.error("支付失败：[" + ret.code + "]：" + ret.message), callback && callback(!1)
						})) : zs.closeWaiting()
					}))) : void zs.error("不支持此支付通道")
				},
				/*付款
				 * type:付款方式 alipay/wxpay
				 * params:参数表
				 * callback:回调函数
				 */
				_gezstatement: function(type, params, callback) {
					var uri = "http://demo.dcloud.net.cn/payment/" + type;
					mui.ajax({
						type: "get",
						url: uri,
						data: params,
						success: function(ret) {
							callback && callback(ret)
						},
						error: function() {
							callback && callback(!1)
						}
					})
				},
				/* 更新支付通道
				 * type:付款方式 alipay/wxpay
				 * params:参数表
				 * callback:回调函数
				 */
				updateChannels: function() {
					var cls = this;
					cls.channels = {},
						plus.payment.getChannels(function(channels) {
							mui.each(channels, function(idx, item) {
								//for (var e in channels) 
								cls.channels[item.id] = item
							})
						}, function(ret) {
							zs.error("获取支付通道失败：" + ret.code + "|" + ret.message)
						})
				},
				/* 检查是否支持该支付方式
				 */
				checkService: function(service) {
					if(!service.serviceReady) {
						var msg = null;
						switch(service.id) {
							case "alipay":
								msg = "检测到系统未安装“支付宝快捷支付服务”，无法完成支付操作，是否立即安装？";
								break;
							default:
								msg = "系统未安装“" + service.description + "”服务，无法完成支付，是否立即安装？"
						}
						return plus.nativeUI.confirm(msg, function(ret) {
							0 == ret.index && service.installService()
						}, service.description), !1
					}
					return !0
				}
			})
			//用户扩展
		zs.UserClass = mui.Class.extend({
			cache_key: "USER",
			info_cache_key: "USER_INFO",
			/* 初始化用户
			 * */
			init: function(user) {
				user && zs.setItem(this.cache_key, JSON.stringify(user))
			},
			initUserinfo: function(info) {
				info && zs.setItem(this.info_cache_key, JSON.stringify(info));
			},
			/* 用户登出，清除本地缓存
			 * */
			logout: function(callback) {
				zs.Friend.clear();
				zs.Conversation.clear();
				zs.removeItem(this.cache_key), zs.removeItem(this.info_cache_key), callback && callback()
			},
			/* 获取用户信息
			 * */
			get_userinfo: function() {
				var info = zs.getItem(this.info_cache_key);
				try {
					return JSON.parse(info)
				} catch(err) {
					return !1
				}
				return !1
			},
			/* 获取用户
			 * */
			get_user: function() {
				var user = zs.getItem(this.info_cache_key);
				if(user) try {
					var user = JSON.parse(user),
						info = this.get_userinfo();
					return info ? (user.userinfo = info, user.username = info.nickname || user.phone || "") : user.username = user.phone, user
				} catch(err) {
					return !1
				}
				return !1
			},
			/* 获取用户名
			 * */
			getUname: function() {
				var user = this.get_user();
				return user && user.username || ""
			},
			/* 初始化用户id
			 * */
			getUid: function() {
				var user = this.get_user();
				return user && user.id || ""
			},
			/* 初始化用户手机
			 * */
			get_phone: function() {
				var user = this.get_user();
				return user && user.phone || ""
			},
			/* 获取用户失效时间
			 * */
			get_expired: function() {
				var user = this.get_user();
				return user && user.expired || ""
			},
			/* 获取用户session
			 * */
			get_session: function() {
				var user = this.get_user();
				return user && user.session || ""
			},
			/* 判定用户是否登录
			 * */
			isLogin: function() {
				var user = this.get_user();
				//zs.d(user);
				return user && user ? user.id : !1
			},
			setUserInfo: function(icon) {
				var user = this.get_userinfo()
				user['ico'] = icon;
				this.initUserinfo(user);
			},
			/* 初始化用户信息
			 * */
			getNetInfo: function(info) {
				var cls = this;
				cls.initUserinfo(info);
			}
		})
		zs.AppObject = {
				init: function() {
					this.initConfig(), this.initPage(), this._init5plusEvent(), this.initEvent()
				},
				_init5plusEvent: function() {
					var cls = this;
					cls.init5plusEvent()
				},
				init5plusEvent: function() {}
			},
			//api接口扩展
			zs.ApiClass = mui.Class.extend({
				/*
				 * 初始化
				 * */
				init: function() {
					this.initConfig()
				},
				/*
				 * 初始化接口配置配置
				 * */
				initConfig: function() {
					this.url = zs.url, this.app_id = zs.app_id, this.app_secret = zs.app_secret, this.app_version = zs.app_version
				},
				/*
				 * 用户是否未登录；
				 * */
				getRequest: function(uri) {
					return !zs.User.isLogin() || ~["login", "oauth_login"].indexOf(uri) ? mui.now() : zs.User.get_session()
				},
				/*
				 * 获取签名
				 * uri：访问地址表示
				 * params:参数列表
				 * */
				getSign: function(uri, params) {
					return zs.debug && zs.d("sig:" + this.app_secret + "|" + (this.getRequest(uri) + "").trim() + "|" + params.trim()), "e9f22899fd16393ffac0a88f01eef690"
				},
				/*
				 * 获取参数：主要是增加appid参数；将参数转为字符串
				 * href：访问地址表示
				 * */
				getParams: function(params) {
					//return params.app_id = "get_banners" === uri && 360 === this.app_id ? 20 : this.app_id, params.app_version = this.app_version, JSON.stringify(params)
					return JSON.stringify(params)
				},
				/* ****使用中需要改造的位
				 * 默认的调用成功函数
				 * ret：返回数据
				 * callback：回调函数
				 * */
				success: function(ret, callback) {
					//return zs.debug && zs.d(JSON.stringify(ret)), ret.status != 1 ? (zs.error(ret.data), zs.closeWaiting(), callback && callback(), !1) : !0
					zs.closeWaiting();
					return !0;
				},
				/*
				 * 默认的访问失败函数
				 * ret：返回数据
				 * callback：回调函数
				 * */
				error: function(xhr, type, errorThrown, callback) {
					return zs.debug && zs.d(type + "|" + errorThrown + "|" + JSON.stringify(xhr)), callback && callback(ret, c, d), !0
				},
				/*
				 * post方式访问数据
				 * model:
				 * action:
				 * params：访问参数
				 * succ：访问成功时的回调
				 * err：访问失败是的回调
				 * */
				post: function(model, action, params, succ, err) {
					/*使用mui的ajax函数进行封装
					 */
					//var params = JSON.stringify(params);	
					//zs.d(params);
					var cls = this;
					mui.ajax({
						type: "post",
						url: cls.url + '&m=' + model + '&a=' + action,
						dataType: "json",
						crossDomain: false,
						data: params,
						/*成功函数*/
						success: function(data, status, xhr) {
							cls.success(data, err) && succ && succ(data)
						},
						error: function(xhr, type, errorThrown) {
							cls.error(xhr, type, errorThrown) && err && err(xhr, type, errorThrown);
							//zs.toast('没有网络');
						}
					})
				},
				login: function(mobile, password, succ, err) { //登录接口			
					var info = plus.push.getClientInfo();
					if(plus.os.name == 'iOS') {
						var getui_token = info.token;
					} else {
						var getui_token = '';
					}
					data = {
							mobile: mobile,
							password: password,
							cid: info.clientid,
							getui_token: getui_token
						},
						this.post("user", "login", data, succ, err)
				},
				reg: function(mobile, sms_code, password, succ, err) { //注册接口				
					var info = plus.push.getClientInfo();
					if(plus.os.name == 'iOS') {
						var getui_token = info.token;
					} else {
						var getui_token = '';
					}
					data = {
							mobile: mobile,
							sms: sms_code,
							cid: info.clientid,
							getui_token: getui_token,
							password: password
						},
						this.post("user", "register", data, succ, err)
				},
				repass: function(mobile, sms_code, password, succ, err) { //找回密码
					data = {
							type: 1,
							mobile: mobile,
							code: sms_code,
							password: password
						},
						this.post("user", "rpassword", data, succ, err)
				},
				changePass: function(mobile, old_password, password, repassword, succ, err) { //修改密码
					data = {
							type: 2,
							mobile: mobile,
							repassword: repassword,
							old_password: old_password,
							password: password
						},
						this.post("user", "rpassword", data, succ, err)
				},
				oauth_login: function(data, succ, err) { //第三方登录
					data = mui.extend({
							//imei: "",
							oauth_type: "",
							oauth_uid: "",
							oauth_token: "",
							oauth_token_secret: "",
							refresh_token: "",
							screenname: "",
							union_id: "",
							avatar: ""
						}, data),
						this.post("user", "oauth_login", data, succ, err)
				},
				get_sms: function(mobile, succ, err) { //获取验证码				
					var params = {
						//type: type,
						mobile: mobile
					};
					this.post("user", 'sms_code', params, succ, err)
				},
				get_nav: function(uid, succ, err) { //lanmu
					var params = {
						uid: uid

					};
					this.post("arctype", "index", params, succ, err)
				},
				get_arc: function(type_id, pagenum, succ, err) { //lanmu  在这些事app中作用为获取文章 
					var params = {
						typeid: type_id,
						pagenum: pagenum
					};
					this.post("arctype", "archives", params, succ, err)
				},
				//自定义首页的搜索框函数
				get_search: function(keywords, pagenum, pagesize, succ, err) {
					var params = {
						keywords: keywords,
						pagenum: pagenum, //页码
						pagesize: pagesize //每页有6个
					};
					this.post("arctype", "archives", params, succ, err)
				},
				//获取用户信息
				get_user_info: function(uid, succ, err) {
					var params = {
						uid: uid
					};
					this.post("user", "info", params, succ, err)
				},
				//获取群组信息
				get_group_info: function(group_id, succ, err) {
					var params = {
						id: group_id
					};
					this.post("group", "info", params, succ, err)
				}
			})
			//会话
		zs.ConversationClass = mui.Class.extend({
			cache_key: "CONVERSATION",
			cache_history: "HOSTORY", //消息缓存
			init: function() {},
			setConversations: function(conversations) {
				conversations && zs.setItem(this.cache_key, JSON.stringify(conversations))
			},
			setHistory: function(historys) {
				zs.setItem(this.cache_history, JSON.stringify(historys))
			},
			getHistory: function() {
				var cls = this;
				var items = zs.getItem(this.cache_history);
				if(items)
					try {
						return JSON.parse(items)
					} catch(err) {
						return !1
					}
				return !1
			},
			getConversations: function() {
				var cls = this;
				var items = zs.getItem(this.cache_key);
				if(items)
					try {
						return JSON.parse(items)
					} catch(err) {
						return !1
					}
				return !1
			},
			clear: function(succ) {
				zs.removeItem(this.cache_key), succ && succ()
			}
		});
		//申请
		zs.InviteClass = mui.Class.extend({
			cache_key: "INVITE",
			cache_count_key: "COUNT_INVITE",
			cache_unread: "UNREAD",
			init: function() {},
			setInvite: function(invite) {
				zs.setItem(this.cache_key, JSON.stringify(invite))
			},
			setInviteCount: function(count) {
				zs.setItem(this.cache_count_key, count)
			},
			setIUnread: function(total) {
				zs.setItem(this.cache_unread, JSON.stringify(total))
			},
			getInvite: function() {
				var cls = this;
				var items = zs.getItem(this.cache_key);
				if(items)
					try {
						return JSON.parse(items)
					} catch(err) {
						return !1
					}
				return !1
			},
			getInviteCount: function() {
				var cls = this;
				var items = zs.getItem(this.cache_count_key);

				return items
			},
			getUnread: function() {
				var cls = this;
				var items = zs.getItem(this.cache_unread);
				return items
			},
			clear: function(succ) {
				zs.removeItem(this.cache_key), zs.removeItem(this.cache_count_key), succ && succ()
			}
		});
		zs.FriendClass = mui.Class.extend({
			cache_key: "FRIEND",
			cache_list_key: "FRIEND_LIST",
			cache_location_key: 'FRIEND_LOCATION',
			cache_auth_key: 'AUTH_FRIENDS',
			init: function() {},
			setFriends: function(friends) {
				friends && zs.setItem(this.cache_key, JSON.stringify(friends))
			},
			getFriends: function() {
				var items = zs.getItem(this.cache_key);
				if(items)
					try {
						return JSON.parse(items)
					} catch(err) {
						return !1
					}
				return !1
			},
			/*本函数返回的数组key为好友uid，val为好友信息
			 */
			getFriendList: function() {
				var cls = this;
				var list = this.getFriends();
				var items = {};
				for(var i = 0; i < list.length; i++) {
					var fid = list[i]['fid'];
					items[fid] = list[i];
				}
				if(items) {
					return items;
				}
				return !1
			},
			getFromNet: function(succ, err) {
				var cls = this;
				zs.Api.post("friend", "lists", {
					uid: zs.User.getUid()
				}, function(ret) {
					if(ret.status == 1) {
						zs.setItem(cls.cache_key, JSON.stringify(ret.data))
						zs.d(JSON.stringify(ret.data));
						succ && succ(ret.data)
					} else {
						err && err(ret);
					}
				}, err);
			},
			getFriendsLocation: function(succ, err) {
				var cls = this;
				var friends = this.getFriends();
				var ids = '';
				for(var i in friends) {
					if(friends[i] && friends[i].relation == 1) {
						ids += ',' + friends[i]['fid'];
					}
				}
				zs.Api.post("user_location", "lists", {
					uid: ids
				}, function(ret) {
					if(ret.status == 1 && ret.data) {
						zs.setItem(cls.cache_location_key, JSON.stringify(ret.data))
						succ && succ(ret.data)
					} else {
						err && err(ret);
					}
				}, err);
			},
			getLocationFromNet: function(uid, succ, err) {
				var cls = this;
				zs.Api.post("user_location", "lists", {
					uid: uid
				}, function(ret) {
					if(ret.status == 1 && ret.data) {
						var locations = zs.getItem(cls.cache_location_key);
						if(locations) {
							locations = JSON.parse(locations);
							for(var i = 0; i < locations.length; i++) {
								if(locations[i]['id'] == uid) {
									locations[i] = ret.data[0];
									zs.setItem(cls.cache_location_key, JSON.stringify(locations))
								}
							}
						}
						succ && succ(ret.data)
					} else {
						err && err(ret);
					}
				}, err);
			},
			getLocation: function(uid) {
				var items = zs.getItem(this.cache_location_key);
				if(items) try {
					var locs = JSON.parse(items)
					for(var i in locs) {
						if(locs[i].uid == uid) return locs[i];
					}
				} catch(err) {
					return !1
				}
				return !1
			},
			get: function(uid) {
				var items = zs.getItem(this.cache_key);
				if(items) try {
					var friends = JSON.parse(items)
					for(var i in friends) {
						if(friends[i].fid * 1 == uid * 1) return friends[i];
					}
				} catch(err) {
					return !1
				}
				return !1
			},
			getAuthes: function() {
				var items = zs.getItem(this.cache_auth_key);
				if(items) try {
					return JSON.parse(items)
				} catch(err) {
					return !1
				}
				return !1
			},
			getAuthesFromNet: function(succ, err) {
				//if(this.getAuthes)return;
				var cls = this;
				zs.Api.post("friend", "getAuthes", {
					uid: zs.User.getUid()
				}, function(ret) {
					zs.d("fafafaf");
					if(ret.status == 1 && ret.data) {
						zs.setItem(cls.cache_auth_key, JSON.stringify(ret.data))
						succ && succ(ret.data)
					} else {
						err && err(ret);
					}
				}, err);
			},
			isAuthed: function(uid) {
				var friend = this.get(uid);
				if(friend) {
					return friend.relation == 1;
				}
				return false;
			},
			requireAuth: function(uid, fid) {
				zs.Api.post("friend", "requireAuth", {
					uid: uid,
					fid: fid
				}, function(ret) {
					if(ret.status == 1) {
						zs.toast('申请成功，等待对方同意！');
					} else {
						zs.toast(ret.msg);
					}
				});
			},
			allowAuth: function(uid, fid, succ) {
				var cls = this;
				zs.Api.post("friend", "allowAuth", {
					uid: fid,
					fid: uid
				}, function(ret) {
					if(ret.status == 1) {
						var items = cls.getAuthes();
						for(var i = 0; i < items.length; i++) {
							if(items[i].uid == fid && items[i].fid == uid) {
								items[i].relation = 1;
								zs.setItem(cls.cache_auth_key, JSON.stringify(ret.data));
								break;
							}
						}
						zs.toast('已同意对方看你的位置！');
						succ && succ();
					} else {
						zs.toast(ret.msg);
					}
				});
			},
			/* uid:好友id
			 * tid：道具id
			 */
			isUsedTool: function(uid, tid) {
				var friend = this.get(uid);
				if(friend && friend.tools) {
					for(var i = 0; i < friend.tools.length; i++) {
						if(friend.tools[i].tid == tid) return true;
					}
				}
				return false;
			},
			set: function(friend) {
				if(friend) {
					var items = zs.getItem(this.cache_key);
					if(items) try {
						var friends = JSON.parse(items)
						for(var i in friends) {
							if(friends[i].fid == friend.fid) friends[i] = friend;
						}
						zs.setItem(this.cache_key, JSON.stringify(friends))
					} catch(err) {
						return !1
					}
					return !1
				}
			},
			clear: function(succ) {
				zs.removeItem(this.cache_key), zs.removeItem(this.cache_auth_key), zs.removeItem(this.cache_location_key), succ && succ();
			},
			clearGet: function(uid) {
				var cls = this;
				zs.removeItem(this.cache_key);
				zs.removeItem(this.cache_location_key);
				cls.getFromNet();
			}
		});
		/*zs.Location第一次定义*/
		zs.LocationClass = mui.Class.extend({
			cache_key: "ADDRESS",
			station_cache_key: "STATION",
			city_cache_key: "CITY",
			latitude: 0,
			longitude: 0,
			station_id: 2,
			wid: null, //watch ID
			last: null,
			loc_type: 0, // 1 为本地js定位，0为原生定位；
			options: {
				geocode: false,
				maximumAge: 10000,
				//timeout: 1e4,
				provider: 'baidu', //mui.os.plus && mui.os.ios ? "system" : zs.map
				geocode: true
			},
			init: function() {
				this.initConfig()
			},
			initConfig: function() {},
			watch: function(succ, err, opt) {
				return this.loc_type ? this.watchByWEB(succ, err, opt) : this.watchByOS(succ, err, opt);
			},
			getCurrentPosition: function(succ, err) {
				return this.loc_type ? this.getCurrentPositionByWEB(succ, err) : this.getCurrentPositionByOS(succ, err);
			},
			clear: function() {
				return this.loc_type ? this.clearByWEB(succ, err, opt) : this.clearByOS(succ, err, opt);
			},

			/*获取当前位置
			 * succ:定位成功回调函数
			 * err：定位失败回调函数
			 */
			watchByOS: function(succ, err, opt) {
				var cls = this;
				mui.plusReady(function() {
					plus.zloc.init(zs.User.getUid(), zs.userLocationUrl);
					plus.zloc.watch(function(pos) {
						if(cls.last) {
							var coords = cls.last;
							if(coords.latitude == pos.coords.latitude && coords.longitude == pos.coords.longitude) {
								return;
							}
						}
						zs.setItem(zs.Location.cache_key, JSON.stringify(pos));
						succ && succ(pos);
						zs.debug && zs.d("定位成功：" + JSON.stringify(pos));
						cls.last = pos.coords;
					}, function(e) {
						zs.d("监听位置变化信息失败：" + e.message);
						err && err(e);
					}, cls.options);
				});
				return true;
			},
			getCurrentPositionByOS: function(succ, err) {
				var cls = this;
				mui.plusReady(function() {
					plus.zloc.get(function(ll) {
						zs.setItem(zs.Location.cache_key, JSON.stringify(ll));
						succ && succ(ll);
						zs.debug && zs.d("定位成功：" + JSON.stringify(ll));
					}, function(ll) {
						zs.debug && zs.d("定位失败：" + ll.code + "," + ll.message), err && err(ll)
					}, cls.options)
				})
			},
			clearByOS: function() {
				if(this.wid) {
					zs.d("停止监听位置变化信息");
					plus.zloc.stop();
				}
			},
			/*获取当前位置
			 * succ:定位成功回调函数
			 * err：定位失败回调函数
			 */
			watchByWEB: function(succ, err, opt) {
				var cls = this;
				mui.plusReady(function() {
					if(cls.wid) {
						return false;
					}
					for(var i in opt) { //合并选项
						cls.options[i] = opt[i];
					}
					cls.wid = plus.geolocation.watchPosition(function(pos) {
					
						if(cls.last) {
							var coords = cls.last;
							if(coords.latitude == pos.coords.latitude && coords.longitude == pos.coords.longitude) {
								return;
							}
						}
						zs.setItem(zs.Location.cache_key, JSON.stringify(pos));
						if(Math.random() * 100 < 10) {
							var params = pos.coords;
							params['uid'] = zs.User.getUid();
							params['address'] = pos.addresses;
							zs.Api.post('user_location', 'add', params, function() {
								zs.d('提交成功');
							});
							zs.debug && zs.d("定位成功：" + JSON.stringify(pos));
						}

						succ && succ(pos);
						cls.last = pos.coords;
						
					}, function(e) {
						zs.d("监听位置变化信息失败：" + e.message);
						err && err(e);
					}, cls.options);
				});
				return true;
			},
			getCurrentPositionByWEB: function(succ, err) {
				var cls = this;
				mui.plusReady(function() {
					plus.geolocation.getCurrentPosition(function(ll) {
						
						zs.setItem(zs.Location.cache_key, JSON.stringify(ll));
						succ && succ(ll);
						zs.debug && zs.d("定位成功：" + JSON.stringify(ll));
						
					}, function(ll) {
						zs.debug && zs.d("定位失败：" + ll.code + "," + ll.message), err && err(ll)
					}, cls.options)
				})
			},
			clearByWEB: function() {
				if(this.wid) {
					zs.d("停止监听位置变化信息");
					plus.geolocation.clearWatch(this.wid);
					this.wid = null;
				}
			},
			distance: function(x, y, succ, err) {
				var cls = this;
				mui.plusReady(function() {
					var loc = cls.getLocation();
					if(loc) {
						var point = new plus.maps.Point(loc.coords.longitude, loc.coords.latitude);
						var point2 = new plus.maps.Point(x, y)
						plus.maps.Map.calculateDistance(point, point2, function(event) {
								var distance = event.distance; // 转换后的距离值
								succ && succ(distance);
							},
							function(e) {
								err && err(e);
							}
						);
					}
				});
			},
			monitorNetwork: function() {
				var cls = this;
				mui.plusReady(function() {
					document.addEventListener('netchange', function() {
						var nt = plus.networkinfo.getCurrentType();
						switch(nt) {
							case plus.networkinfo.CONNECTION_ETHERNET:
							case plus.networkinfo.CONNECTION_WIFI:
								//alert("Switch to Wifi networks!");
								//break;
							case plus.networkinfo.CONNECTION_CELL2G:
							case plus.networkinfo.CONNECTION_CELL3G:
							case plus.networkinfo.CONNECTION_CELL4G:
								cls.clearWatch();
								cls.watchPos();
								zs.d("reset watchPos");
								break;
							default:
								zs.d("Not networks!");
								break;
						}
					})

				});
			},
			getLocation: function() {
				var item = zs.getItem(this.cache_key);
				if(item) try {
					return JSON.parse(item)
				} catch(err) {
					return !1
				}
				return !1
			},
			/* 设置位置信息
			 * ll：位置对象
			 * callback:获取地址后回调函数；成功、失败均为同一回调函数；
			 * */
			setLocation: function(ll, callback) {
				if(mui.isPlainObject(ll)) //如果ll是地址对象
					zs.setItem(this.cache_key, JSON.stringify(ll)),
					ll.address ? zs.Api.get_nearest_station(ll.address, function(ret) {
						ret.data ? (this.set_station(ret.data), callback && callback(!0)) : callback && callback(!1)
					}, function() {
						this.set_station(), callback && callback(!1)
					}) : callback && callback(!1);
				else { //如果ll为字符串
					var ll2 = this.get_location();
					ll2 ? (ll2.address = ll, this.set_location(ll2, callback)) : this.set_location({
						address: ll
					}, callback)
				}
			},
			/* 获取缓存中的station信息
			 * */
			get_station: function() {
				var item = zs.getItem(this.station_cache_key);
				if(item) try {
					return JSON.parse(item)
				} catch(err) {
					return !1
				}
				return !1
			},
			/* 将station信息放入缓存
			 * */
			set_station: function(item) {
				item && zs.setItem(this.station_cache_key, JSON.stringify(item))
			},
			/* 计算距离
			 * */
			get_distance_rank: function() {
				return 0
			},
			/* 从缓存中获取城市标识为id的城市信息，如无标识，返回所有城市信息；
			 * id: 城市id
			 * */
			get_city: function() {
				var item = zs.getItem(this.city_cache_key);
				if(item) try {
					return JSON.parse(item)
				} catch(err) {
					return !1
				}
				return !1
			},
			/* 从缓存中获取城市标识为id的城市信息，如无标识，返回所有城市信息；
			 * id: 城市id
			 * */
			set_city: function(item) {
				item && zs.setItem(this.city_cache_key, JSON.stringify(item))
			},
			/* 获取缓存中省id
			 * */
			get_station_id: function() {
				var item = zs.getItem(this.station_cache_key);
				if(item) try {
					item = JSON.parse(item)
				} catch(err) {
					item = {
						station_id: this.station_id
					}
				}
				return item && item.station_id || this.station_id
			},
			/* 搜索周边的poi
			 * pt：中心点
			 * key：关键字
			 */
			poiSearchNearBy: function(pt, key) {
				//以Geocoding服务为例，地理编码的请求url，参数待填
				url = "http://api.map.baidu.com/geocoder/v2/?address=%s&output=%s&ak=%s&sn=%s";
				url = "http://api.map.baidu.com/place/v2/search?query=酒店$银行&scope=2&output=json&location=39.915,116.404&radius=2000&filter=sort_name:distance|sort_rule:1&ak={您的密钥}";
				//get请求uri前缀
				sn = caculateAKSN(ak, sk, key,x,y, radius);
				url = "http://api.map.baidu.com/place/v2/search?query="+key+ "&scope=2&output=json&location="+x+","+y+"&radius="+radius+"&filter=sort_name:distance|sort_rule:1&ak="+ak+"&sn="+sn;
				zs.Api.get();
				function caculateAKSN(ak, sk, key,x,y, radius) {
					querystring = "/place/v2/search?query="+encodeURIComponent(key)+ "&scope=2&output=json&location="+x+","+y+"&radius="+radius+"&filter=sort_name:distance|sort_rule:1&ak="+ak+sk;
					return $.md5(querystring);
				}
			}
		})

	}(mui, zs, window, document),
	/*
	 * UserPage相关扩展
	 * 该扩展未完成
	 */
	function(mui, zs) {
		zs.UserPage = mui.Class.extend({
			/*初始化*/
			init: function() {
				this.initConfig(),
					this.initPage(),
					this.initEvent()
			},
			/*初始化*/
			initConfig: function() {},
			/*初始化页面，如果未登录，则直接跳转到登录页面*/
			initPage: function() {},
			initEvent: function() {},
			close: function() {
				plus.webview.currentWebview().hide();
				setTimeout(function() {
					plus.webview.currentWebview().close();
				}, 2000);
			},
			fire: function(func, params, view) {
				view = view ? view : plus.webview.currentWebview().opener();
				view = typeof(view) == 'string' ? plus.webview.getWebviewById(view) : view;
				view && mui.fire(view, func, params);
			}
		})
	}(mui, zs);