/*!
 * =====================================================
 * zs v1.0.0 ()
 * =====================================================
 */
!
function(mui, zs) {
	zs.IndexPage = zs.UserPage.extend({
		map: null,
		cx: 116.3975,
		cy: 39.9074,
		friends: new Array(),
		zsImage: null,
		isMenuOpen: false,
		initConfig: function() {},
		initPage: function() {
			zs.template('nav', 'footer', {
				navs: zs.data.nav,
				active: 'index',
				total_unread: 0
			});
			var cls = this;
			mui.plusReady(function() {												
				setTimeout(function() {					
					//预加载发现页面					
					plus.webview.create("surrounding_dynamic.html",'surrounding_dynamic');					
					var nt = plus.networkinfo.getCurrentType();					
					switch(nt) {
						case plus.networkinfo.CONNECTION_WIFI:
							var user = zs.User.get_userinfo();
							if(user.mobile !='18618171831'){
								var detailPage = plus.webview.getWebviewById('settings');								
								if(!detailPage){
									detailPage= plus.webview.create( 'settings.html', 'settings');								
								}
								setTimeout(function() {
									mui.fire(detailPage, 'resh', {from:'index'});	
								}, 3000)	
							}							
							break;
					}						
				}, 1000)				
				nav_resh();
				plus.push.setAutoNotification(false);
				if(zs.User.isLogin()) {
					// 监听点击消息事件
					plus.push.addEventListener("click", function(msg) {
						var open_webview = zs.getItem('open_webview');
						var open = ['index', 'contacts', 'surrounding_dynamic', 'my'];
						if(open.indexOf(open_webview) == -1) {
							var detailPage = plus.webview.getWebviewById(open_webview);
							mui.fire(detailPage, 'resh', {});
						}
						for(var i = 0; i < open.length; i++) {
							var detailPage = plus.webview.getWebviewById(open[i]);
							mui.fire(detailPage, 'resh', {});
						}
						//zs.toast('正在刷新');
					}, false);
					document.addEventListener("resume", function() {
						var open_webview = zs.getItem('open_webview');
						var open = ['index', 'contacts', 'surrounding_dynamic', 'my'];
						if(open.indexOf(open_webview) == -1) {
							var detailPage = plus.webview.getWebviewById(open_webview);
							mui.fire(detailPage, 'resh', {});
						}
						for(var i = 0; i < open.length; i++) {
							var detailPage = plus.webview.getWebviewById(open[i]);
							mui.fire(detailPage, 'resh', {});
						}
						//zs.toast('正在刷新');
					}, false);
					// 监听在线消息事件
					var date1 = new Date(); //开始时间					
					plus.push.addEventListener("receive", function(msg) {
						var date2 = new Date(); //接收时间
						var date3 = (date2.getTime() - date1.getTime()) / 1000; //相差秒数 
						var open = ['index', 'contacts', 'surrounding_dynamic', 'my', 'friend_list'];
						if(date3 > 5) {
							plus.push.clear();
							var open_webview = zs.getItem('open_webview');
							var wvs = plus.webview.all();
							if(open_webview == 'contacts') {
								plus.push.setAutoNotification(false);
								var user = zs.User.get_userinfo();
								if(user.talkvibrate ==1){
									plus.device.vibrate();
								}
								if(user.talksound ==1){
									plus.device.beep(1);
								}								
							} else {
								plus.push.createMessage(msg.content, '', '');
							}
							if(open.indexOf(open_webview) == -1) {
								var detailPage = plus.webview.getWebviewById(open_webview);
								mui.fire(detailPage, 'resh', {});
							}
							for(var i = 0; i < open.length; i++) {
								var detailPage = plus.webview.getWebviewById(open[i]);
								mui.fire(detailPage, 'resh', {});
							}
							date1 = new Date(); //重置起始时间						
						}

					}, false);
				}
				cls.initBack()
			});
			var ws = null
				// H5 plus事件处理
			mui.plusReady(function() {
				if(!document.getElementById("map") || ws) {
					return
				};
				// 获取窗口对象
				ws = plus.webview.currentWebview();
				//高德地图坐标为(116.3974357341,39.9085574220), 百度地图坐标为(116.3975,39.9074)
				var center = new plus.maps.Point(cls.cx, cls.cy);
				setTimeout(function() {
					cls.map = new plus.maps.Map("map");
					cls.map.centerAndZoom(center, 12);
					cls.createFriendview();
					cls.moveToUser()
				}, 300);
				// 显示页面并关闭等待框
				ws.show("pop-in");
				window.addEventListener('resh', function(event) {
					cls.createFriendview();
					cls.drawFriends();
					nav_resh();
				})
			});

			function nav_resh() {
				if(zs.User.isLogin()) {
					zs.Api.post('invite', 'unreadtotal', {
						uid: zs.User.isLogin()
					}, function(result) {
						if(result.status == 1) {
							zs.template('nav', 'footer', {
								navs: zs.data.nav,
								active: 'index',
								total_unread: result.data
							});
						}
					})
				} else {
					zs.template('nav', 'footer', {
						navs: zs.data.nav,
						active: 'index',
						total_unread: 0
					});
				}
			}
		},
		initEvent: function() {
			var cls = this;
			/*右上角菜单*/
			mui(document.body).on('tap', '#right-icon', function() {
				cls.isMenuOpen ? cls.closeTopMenu() : cls.createTopMenu();
			});
			/*监控下方好友列表头像点击事件*/
			window.addEventListener('moveTo', function(event) {
				var params = event.detail;
				var uid = params['uid'] ? params['uid'] : zs.User.getUid();
				var marker = cls.friends[uid];
				if(marker) {
					marker.bringToTop();
					var point = marker.getPoint();
					point && cls.map.setCenter(point);
				}
				uid && cls.createTip(uid);
			});
			/*绘制地图上的好友*/
			window.addEventListener('drawFriends', function(event) {
				var params = event.detail;
				cls.drawFriends(params.locations);
			});
			if(zs.User.isLogin()) {
				zs.Location.watch(function(pos) {

				})
			}
		},
		initBack: function() {
			var c = null;
			mui.back = function() {
				 plus.runtime.quit();  
				var main = plus.android.runtimeMainActivity();
				main.moveTaskToBack(false);
				/*c ? (new Date).getTime() - c < 1e3 && plus.runtime.quit() : (c = (new Date).getTime(), zs.toast("再按一次退出应用"), setTimeout(function() {
					c = null
				}, 1e3))*/
			}
		},
		/*创建下方好友列表
		 */

		createFriendview: function() {
			var fpage = plus.webview.getWebviewById('friend_list');
			if(fpage) {
				fpage.close();
			}
			// 创建加载内容窗口
			var fpage = plus.webview.create('friend_list.html', 'friend_list', {
				bottom: '50px',
				height: '60px',
				position: 'absolute',
				scrollIndicator: 'none',
				background: 'transparent'
			});
			plus.webview.currentWebview().append(fpage);
		},
		/*创建右上角的菜单
		 */
		createTopMenu: function() {
			var menu = plus.webview.getWebviewById('index_top_menu');
			this.isMenuOpen = true;
			if(menu) {
				menu.show();
				return;
			}
			// 创建加载内容窗口
			var topoffset = '44px';
			if(plus.navigator.isImmersedStatusbar()) { // 兼容immersed状态栏模式
				topoffset = (Math.round(plus.navigator.getStatusbarHeight()) + 44) + 'px';
			}
			menu = plus.webview.create('index_top_menu.html', 'index_top_menu', {
				top: topoffset,
				right: '15px',
				width: '130px',
				height: '135px',
				position: 'absolute',
				scrollIndicator: 'none',
				background: 'transparent'
			});
			plus.webview.currentWebview().append(menu);
		},
		/*创建关闭右上角菜单
		 */
		closeTopMenu: function() {
			var menu = plus.webview.getWebviewById('index_top_menu');
			menu && menu.hide();
			this.isMenuOpen = false;
		},
		/*创建提示框
		 */
		createTip: function(uid) {
			/*因为页面多次打开后，会遮盖提示框；导致提示框无法显示；*/
			var tip = plus.webview.getWebviewById('tip');
			tip && tip.close();
			tip = plus.webview.create('tip.html', 'tip', {
				bottom: '110px',
				right: '0px',
				width: '100%',
				height: '119px',
				position: 'absolute',
				scrollIndicator: 'none',
				background: 'transparent',
				zindex: 10000
			}, {
				uid: uid
			});
			plus.webview.currentWebview().append(tip);
		},
		/*绘制地图上头像
		 */
		drawFriends: function(locations) {
			var cls = this;
			for(var i in locations) {
				var item = locations[i];
				var friend = this.friends[item.uid];
				var info = zs.Friend.get(item.uid);
				if(friend) {
					friend.setPoint(new plus.maps.Point(item.longitude * 1, item.latitude * 1));
				} else {
					friend = this.createMarker(item.longitude * 1, item.latitude * 1, info.user.cover, '', '', function(target) {
						cls.map.setCenter(target.getPoint());
						target.bringToTop();
					});
					this.friends[item.uid] = friend;
				}
			}
			if(locations && locations.length == 1) {
				var item = locations[0];
				var friend = this.friends[item.uid];
				cls.map.setCenter(friend.getPoint());
			}
		},
		/*显示定位图标，并根据定位移动地图
		 */
		moveToUser: function() {
			var cls = this;
			this.map.showUserLocation(true);
			this.map.getUserLocation(function(state, pos) {
				if(0 == state) {
					cls.map.setCenter(pos);
				}
			});
		},
		/*创建一个地图上的图标
		 */
		createMarker: function(x, y, img, label, info, click) {
			//高德地图坐标为(116.3406445236,39.9630878208), 百度地图坐标为(116.347292,39.968716
			var marker = new plus.maps.Marker(new plus.maps.Point(x, y));
			var icon = mui.os.plus && mui.os.ios ? '/images/bgi.png' : '/images/bg.png';
			var css = mui.os.plus && mui.os.ios ? 'X1' : 'X2';
			marker.setIcon(icon);
			zs.File.get("http://test.zujimi.com/index.php?g=api&m=user&a=avatar2&img=" + img + "&css=" + css, "", function(uri) {
				marker.setIcon(uri);
			});
			if(label) {
				marker.setLabel(label);
			}
			if(info) {
				var bubble = new plus.maps.Bubble(info);
				marker.setBubble(bubble);
			}
			this.map.addOverlay(marker);
			if(click && typeof(click) == 'function') {
				marker.onclick = click;
			}
			return marker;
		}

	});
}(mui, zs);