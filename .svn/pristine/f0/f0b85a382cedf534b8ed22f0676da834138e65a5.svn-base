/*!
 * =====================================================
 * zs v1.0.0 ()
 * =====================================================
 */
!
function(mui, zs) {
	zs.DynamicPositionMapPage = zs.UserPage.extend({
		map: null,
		releasePosition:null,
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
				cls.releasePosition = ws.releasePosition;
				zs.d(JSON.stringify(cls.releasePosition));
				//高德地图坐标为(116.3974357341,39.9085574220), 百度地图坐标为(116.3975,39.9074)
				var center = new plus.maps.Point(cls.releasePosition.lng, cls.releasePosition.lat);
				setTimeout(function() {
					cls.map = new plus.maps.Map("map");
					cls.map.centerAndZoom(center, 12);
					cls.moveToUser()
				}, 300);
				// 显示页面并关闭等待框
				ws.show("pop-in");

			});
		},
		initEvent: function() {
			var cls = this;
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
			cls.createMarker(cls.releasePosition.lng,cls.releasePosition.lat,null,'',cls.releasePosition.address,function(){})
		},
		/*创建一个地图上的图标
		 */
		createMarker:function(x, y, img, label, info, click) {
			img = img ? img : "../images/current-location.png";
			
			//高德地图坐标为(116.3406445236,39.9630878208), 百度地图坐标为(116.347292,39.968716
			var marker = new plus.maps.Marker(new plus.maps.Point(x, y));
			marker.setIcon(img);
			if (label) {
				marker.setLabel(label);
			}
			if (info) {
				var bubble = new plus.maps.Bubble(info);
				marker.setBubble(bubble,true);
			}
			this.map.addOverlay(marker);
			if (click && typeof(click) == 'function') {
				marker.onclick = click;
			}
			return marker;
		}

	});
}(mui, zs);