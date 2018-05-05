/*!
 * =====================================================
 * zs v1.0.0 ()
 * =====================================================
 */
!
function(mui, zs) {
	zs.Choose_positionPage = zs.UserPage.extend({
		map: null, //地图
		marker: null, //地图上标记
		center: null,
		pois: null,
		current: null,
		selected_id:null,
		initConfig: function() {},
		initPage: function() {
			var cls = this;
			// H5 plus事件处理
			mui.plusReady(function() {
				cls.createDirection();
				cls.createDistance();
				//高德地图坐标为(116.3974357341,39.9085574220), 百度地图坐标为(116.3975,39.9074)
				var pos = zs.Location.getLocation();
				//alert(pos);
				/*if(pos && pos.coords){
					
					cls.center = new plus.maps.Point(pos.coords.longitude, pos.coords.latitude);
				}else{
					alert(zs.data.defLoc.longitude);
					alert(zs.data.defLoc.latitude);
					cls.center = new plus.maps.Point(zs.data.defLoc.longitude, zs.data.defLoc.latitude);
				}*/

				setTimeout(function() {
					cls.map = new plus.maps.Map("map3");
					cls.map.showUserLocation(true);
					cls.map.getUserLocation(function(state, point) {
						if(0 == state) {
							cls.map.setCenter(point);
							cls.map.centerAndZoom(point, 12);
							zs.d(JSON.stringify(point));
							cls.poiSearchNearBy(point);
							cls.map.onclick = function(point) {
								zs.d(JSON.stringify(point));
								cls.poiSearchNearBy(point);
							};

						}
					});

				}, 300);
				/*创建提示框
				 */
			});
		},
		//创建离开/进入触发按钮页面
		createDirection: function() {
			var direction = plus.webview.getWebviewById('direction');
			//					tip && tip.close();
			direction = plus.webview.create('direction.html', 'direction', {
				top: '270px',
				left: '22%',
				width: '55%',
				height: '30px',
				position: 'absolute',
				scrollIndicator: 'none',
				background: 'transparent',
				zindex: 10000
			});
			plus.webview.currentWebview().append(direction);
		},
		//创建范围尺标页面
		createDistance: function() {
			var distance = plus.webview.getWebviewById('distance');
			//					tip && tip.close();
			direction = plus.webview.create('distance.html', 'distance', {
				top: '90px',
				right: '10px',
				width: '200',
				height: '24px',
				position: 'absolute',
				scrollIndicator: 'none',
				background: 'transparent',
				zindex: 10000
			});
			plus.webview.currentWebview().append(direction);
		},
		initEvent: function() {
			var cls = this;
			mui('#body').on('tap', '#search', function() {
				var key = $('#key').val();
				cls.map.getUserLocation(function(state, point) {
					if(0 == state) {
						cls.poiSearchNearBy(point, key);
					}
				});
			});
			mui('#pois').on('tap', 'li', function() {
				var extras = this.getAttribute("data-extras");
				for(var i = 0; i < cls.pois.length; i++) {
					if(cls.pois[i].name == extras) {
						cls.map.clearOverlays();
						cls.current = cls.pois[i];
						var marker = new plus.maps.Marker(new plus.maps.Point(cls.current.location.lng, cls.current.location.lat));
						marker.setLabel(cls.current.name);
						var bubble = new plus.maps.Bubble(cls.current.address);
						marker.setBubble(bubble);
						cls.map.addOverlay(marker);
						zs.d(JSON.stringify(cls.current));
						break;
					}
				}
			});
			window.addEventListener('selStatus',function(event){
				cls.selected_id = event.detail.selected_id;
			});
			mui(document.body).on('tap', '#ok', function() {
				if(cls.selected_id == null){
					zs.toast('请选择触发类型!');
					return false;
				}
				var opener = plus.webview.currentWebview().opener();
				opener && mui.fire(opener, 'posSelected', {
					pos: cls.current,
					sel_id: cls.selected_id
				});
				setTimeout(function() {
					plus.webview.currentWebview().close();
				}, 1000);
			});
		},
		createMarker: function(x, y, img, label, info, click) {
			img = img ? img : "../images/current-location.png";
			//高德地图坐标为(116.3406445236,39.9630878208), 百度地图坐标为(116.347292,39.968716
			var point = new plus.maps.Point(x, y);
			var marker = new plus.maps.Marker(point);
			marker.setIcon(img);
			if(label) {
				marker.setLabel(label);
			}
			if(info) {
				var bubble = new plus.maps.Bubble(info);
				marker.setBubble(bubble, true);
			}
			this.map.addOverlay(marker);
			this.map.setCenter()
			if(click && typeof(click) == 'function') {
				marker.onclick = click;
			}
			return marker;
		},
		poiSearchNearBy: function(pt, key) {
			key = key ? key : "市$区$县$镇$街";
			var cls = this;
			zs.Api.post('user_location', 'baidu_url', {
				query: key,
				page_size: 10,
				page_num: 0,
				scope: 1,
				radius: 200,
				location: pt.latitude + ',' + pt.longitude,
				output: 'json'
			}, function(ret) {
				if(ret.status == 1 && ret.data) {
					zs.d(JSON.stringify(ret.data.results));
					cls.pois = ret.data.results;
					zs.template('pois', 'pois', {
						list: ret.data.results
					});
				} else {
					err && err();
				}
			}, function() {
				err && err();
			});

			/*// 在天安门周围1千米内对关键字“肯德基”进行检索
			var searchObj = new plus.maps.Search(cls.map);
			//searchObj.poiSearchInbounds("区", pt, 500);
			//alert( JSON.stringify(cls.map.getBounds()) );
			
			zs.d(JSON.stringify(pt));
			//searchObj. poiSearchNearBy( "肯德基", pt, 1000 );
			searchObj.poiSearchNearBy(key, pt, 100,0);
			searchObj.onPoiSearchComplete = function(state, result) {
				zs.d("onPoiSearchComplete: " + state + " , " + result.currentNumber);
				if(state == 0) {
					if(result.currentNumber <= 0) {
						alert("没有检索到结果");
					}
					//marker.setLabel("HBuilder");
					//var bubble = new plus.maps.Bubble("打造最好的HTML5移动开发工具");
					//marker.setBubble(bubble);
					//map.addOverlay(marker);
					//cls.current = result.getPosition(0);
					//var marker = cls.createMarker(cls.current.longitude, cls.current.latitude);
					cls.pois = result.poiList;
					zs.d(JSON.stringify(cls.pois));
					zs.template('pois', 'pois', {
						list: cls.pois
					});
				} else {
					alert("检索失败");
				}
			}*/
		}
	});
}(mui, zs);