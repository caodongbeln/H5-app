/*!
 * =====================================================
 * zs v1.0.0 ()
 * =====================================================
 */
!
function(mui, zs) {
	zs.SendDynamicPositionPage = zs.UserPage.extend({
		map: null,
		cx: 116.3975,
		cy: 39.9074,
		choosePoint: null,
		initPage: function() {
			var cls = this;
			var ws = null
				// H5 plus事件处理
			mui.plusReady(function() {
				if (!document.getElementById("map") || ws) {
					return
				};
				// 获取窗口对象
				ws = plus.webview.currentWebview();
				//高德地图坐标为(116.3974357341,39.9085574220), 百度地图坐标为(116.3975,39.9074)
				var center = new plus.maps.Point(cls.cx, cls.cy);
				setTimeout(function() {
					cls.map = new plus.maps.Map("map");
					cls.map.centerAndZoom(center, 12);
					cls.moveToUser();
					cls.clickEvent();
				}, 300);
				// 显示页面并关闭等待框
				ws.show("pop-in");

			});
		},
		initEvent: function() {
			var cls = this;
			//点击确定的逻辑
			document.getElementById('sure').addEventListener('tap', function() {
				var opener = plus.webview.currentWebview().opener();
				if (cls.choosePoint) {
					mui.fire(opener, 'choosePoint', cls.choosePoint);
				}
				mui.back();
			})

		},
		initBack: function() {
			var c = null;
			mui.back = function() {
				c ? (new Date).getTime() - c < 1e3 && plus.runtime.quit() : (c = (new Date).getTime(), zs.toast("再按一次退出应用"), setTimeout(function() {
					c = null
				}, 1e3))
			}
		},
		/*显示定位图标，并根据定位移动地图
		 */
		moveToUser: function() {
			var cls = this;
			this.map.showUserLocation(true);
			this.map.getUserLocation(function(state, pos) {
				if (0 == state) {
					cls.map.setCenter(pos);
				}
			});
		},
		/*创建一个地图上的图标
		 */
		createMarker: function(x, y, img, label, info, click) {
			img = img ? img : "../images/current-location.png";
			//高德地图坐标为(116.3406445236,39.9630878208), 百度地图坐标为(116.347292,39.968716
			var marker = new plus.maps.Marker(new plus.maps.Point(x, y));
			marker.setIcon(img);
			if (label) {
				marker.setLabel(label);
			}
			if (info) {
				var bubble = new plus.maps.Bubble(info);
				marker.setBubble(bubble, true);
			}
			this.map.addOverlay(marker);
			if (click && typeof(click) == 'function') {
				marker.onclick = click;
			}
			return marker;
		},
		//用户点击地图选点
		clickEvent: function() {
			var cls = this;
			cls.map.onclick = function(point) {
				zs.d(JSON.stringify(point));
				plus.maps.Map.reverseGeocode(point, '', function(event) {
					alert(JSON.stringify(event));
					cls.choosePoint = event;
					var address = event.address; // 转换后的地理位置
					zs.d(address);
					cls.map.clearOverlays();
					cls.createMarker(point.longitude, point.latitude, null, '', address, function() {})
				});
				//
			}
		}

	});
}(mui, zs);