/*!
 * =====================================================
 * zs v1.0.0 ()
 * =====================================================
 */
!
function(mui, zs) {
	zs.FootprintPage = zs.UserPage.extend({
		map: null, //地图
		uid: -1, //该用户的uid
		num: 1, //访问的页码
		locations: null, //足迹数据
		timer: null, //用于循环的计时器
		marker: null, //地图上标记
		hasMore: true, //是否还有跟多的足迹数据
		interval: 1000, // 播放时间间隔默认为1000ms
		start: 0, //播放开始日期的时间戳，0时；
		playing: 0, //正在播放的日期的0点的时间戳
		tools: null,
		initConfig: function() {
			var cls = this;
			mui.plusReady(function() {
				cls.uid = plus.webview.currentWebview().data_id;
			});
			var now = new Date().getTime() / 1000;
			this.start = Math.floor(now / 24 / 3600) * 24 * 3600; //取得今天0点的时间戳；
		},
		initPage: function() {
			var cls = this;
			// H5 plus事件处理
			mui.plusReady(function() {
				var ws = null;
				if (!document.getElementById("map2") || ws) {
					return
				};
				// 获取窗口对象
				ws = plus.webview.currentWebview();
				cls.uid = ws.data_id;
				//高德地图坐标为(116.3974357341,39.9085574220), 百度地图坐标为(116.3975,39.9074)
				var center = new plus.maps.Point(cls.cx, cls.cy);
				setTimeout(function() {
					cls.map = new plus.maps.Map("map2");
					cls.map.centerAndZoom(center, 12);
					cls.createTools(cls.uid);
					cls.getTrack(true);
				}, 300);
				// 显示页面并关闭等待框
				ws.show("pop-in");
			});

		},
		initEvent: function() {
			var cls = this;
			window.addEventListener("play", function() {
				cls.playTrack();
			});
			window.addEventListener("stop", function() {
				cls.stopTrack();
			});
			window.addEventListener("slowDown", function() {
				cls.slowDown();
			});
			window.addEventListener("speedUp", function() {
				cls.speedUp();
			});
			window.addEventListener("reTrack", function(event) {
				var params = event.detail;
				cls.stopTrack();
				cls.num = 1;
				cls.start = params['start'] * 1;
				cls.hasMore = true;
				cls.locations = null;
				cls.getTrack(true);
			});
		},
		createTools: function(uid) {
			// 创建加载内容窗口
			var fpage = plus.webview.create('print_tools.html', 'print_tools', {
				bottom: '5px',
				height: '155px',
				position: 'absolute',
				scrollIndicator: 'none',
				background: 'transparent'
			}, {
				uid: uid
			});
			plus.webview.currentWebview().append(fpage);
			this.tools = plus.webview.getWebviewById('print_tools');
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
				marker.setBubble(bubble,true);
			}
			this.map.addOverlay(marker);
			if(click && typeof(click) == 'function') {
				marker.onclick = click;
			}
			return marker;
		},
		
		/* start：足迹的开始时间，默认为0 
		 * autoStart:：取完数据之后是否自动开始播放；默认为true；
		 */
		getTrack: function(autoStart) {
			if (!this.hasMore) return;
			autoStart = autoStart ? autoStart : false;
			var cls = this;
			zs.Api.post('loc_track', 'lists', {
				owner: zs.User.getUid(),
				uid: cls.uid,
				start: cls.start,
				pagesize: 50,
				pagenum: cls.num++,
				order: 'ASC',
				sort: 'atime'
			}, function(ret) {
				if (ret.status == 1) {
					if (ret.data == null||ret.data.length==0) {
						zs.toast("没有足迹数据了！");
						cls.hasMore = false;
					} else {
						if (!cls.locations) {
							cls.locations = ret.data
						} else {
							var len = cls.locations.length;
							for (var i = 0; i < ret.data.length; i++) {
								cls.locations[len + i] = ret.data[i];
							}
						}
						autoStart && cls.playTrack();
					}
				}
			});
		},
		playTrack: function() {
			var cls = this;
			this.timer = setInterval(function() {
				if (!cls.locations || cls.locations.length == 0 || cls.locations[0] == null) {
					return;
				}
				var loc = cls.locations[0];
				if (cls.marker) {
					cls.map.removeOverlay(cls.marker);
				}
				cls.marker = cls.createMarker(loc.longitude * 1, loc.latitude * 1, null, '', loc.address, function(target) {
					cls.map.setCenter(target.getPoint());
				});
				var point = new plus.maps.Point(loc.longitude * 1, loc.latitude * 1);
				cls.map.setCenter(point);
				cls.tools && mui.fire(cls.tools, "play", loc)
				if (cls.locations&&cls.locations.length >= 1) {
					cls.locations.splice(0, 1);
				} else {
					cls.tools && mui.fire(cls.tools, 'stop');
					cls.stopTrack();
				}
				if (!cls.locations || cls.locations.length < 10) {
					cls.getTrack(false);
				}
			}, this.interval);
		},
		stopTrack: function() {
			clearInterval(this.timer);
			this.timer = null;
		},
		speedUp: function() {
			if (this.interval < 100) return;
			this.interval /= 2;
			this.stopTrack()
			this.playTrack()
		},
		slowDown: function() {
			if (this.interval > 5000) return;
			this.interval *= 2;
			this.stopTrack()
			this.playTrack()
		}

	});
}(mui, zs);