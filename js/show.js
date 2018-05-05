/*!
 * =====================================================
 * zs v1.0.0 ()
 * =====================================================
 */
!
function(mui, zs) {

	zs.ShowPage = zs.UserPage.extend({
		tag: '_index', //页面缓存标记
		initPage: function() {
			var cls = this;
			zs.template(document.body, 'footer', {
				nav: 'index'
			}, 'append');
			//先渲染页面   最后在渲染一次
			//免费向导
			var list = zs.Guide.getItem(this.tag);
			list && renderGuide(JSON.parse(list));
			//免费住宿
			list = zs.Stay.getItem(this.tag);
			list && renderStay(JSON.parse(list));
			//游客列表
			list = zs.Tourist.getItem(this.tag);
			list && renderTourist(JSON.parse(list));
			//本地活动列表
			list = zs.LocalActivities.getItem(this.tag);
			list && renderLocalActivities(JSON.parse(list));

			//魅力城市页面
			//zs.removeItem(zs.Location.city_cache_key);
			var cache_city = zs.Location.get_city();
			if (cache_city) {
				this.renderCity(cache_city);
				this.renderActivitiesByNet(cache_city.id);
			}
			//执行再次渲染
			//免费向导参数
			var params = {
				pagenum: 1,
				pagesize: 2,
				focus: 1,
				is_free_guide: 1
			};
			zs.Guide.get_guide(this.tag, params, renderGuide);

			//免费住宿参数
			var params = {
				pagenum: 1,
				pagesize: 2,
				focus: 1,
				is_free_house: 1
			};
			zs.Stay.get_stay(this.tag, params, renderStay);
			//游客列表
			params = {
				pagenum: 1,
				pagesize: 2,
				focus: 1
			}
			zs.Tourist.get_tourist(this.tag, params, renderTourist);

			function renderGuide(list) {
				zs.template('guide_list', 'show_guide_list', {
					list: list
				}, 'append');
			}

			function renderStay(list) {
				zs.template('stayList', 'show_stay_template', {
					list: list
				}, 'append')
			}

			function renderTourist(list) {
				zs.template('touristList', 'tourist_template', {
					list: list
				}, 'append');
			}

			mui.plusReady(function() {
				plus.screen.lockOrientation("portrait-primary");
				var id = plus.webview.currentWebview().id;
				zs.setItem('language', 'en');
				zs.execI18n();				
				if (zs.User.isLogin()) {
					zs.connect_rongyun(zs.rong_appId,zs.User.get_userinfo().data.token);
					var val = RongIMClient.getInstance().getTotalUnreadCount(); 
					//alert(val);//未读消息数量
				}		
							
			}.bind(this));
			mui.plusReady(function() {
				//首页魅力城市
				zs.Location.getCurrentPosition(function(position) {
					zs.d("city:" + JSON.stringify(position));
					zs.Location.get_city_info({
						name: position,
					}, function(data) {
						zs.d(JSON.stringify(data));
						if (!cache_city) {
							cls.renderCity(data);
						} else {
							if (data.id != cache_city.id) {
								var message = '检测到当前城市为' + data.name + ',是否切换?';
								zs.confirm(message, function(status) {
									if (status) { 
										zs.Location.set_city(data);
										cls.renderCity(data);
										cls.renderActivitiesByNet(data.id);
									}
								})
							}
						}

					})
				},function(error){
					//定位失败 又没有缓存时
					if(!cache_city){
						zs.toast(error.message);
					zs.Location.get_city_info({id:1101},function(r){
						cls.renderCity(r);
					})
					}else{
						zs.toast(error.message);
					}
					
				});

			})
		},
		initEvent: function() {
			var cls = this;
			window.addEventListener('citySelected', function(event) {
				alert();
				//通过event.detail可获得传递过来的参数内容				
				var selected = event.detail;
				var cache_city = zs.Location.get_city();
				if (selected && (selected.id != cache_city.id)) {
					zs.Location.set_city(selected);
					zs.d(JSON.stringify(selected));
					cls.renderCity(selected);
					cls.renderActivitiesByNet(selected.id);
					//plus.webview.open('guide_list.html','local_activity',selected);
				}
			});
		},
		initBack: function() {
			var c = null;
			mui.back = function() {
				c ? (new Date).getTime() - c < 1e3 && plus.runtime.quit() : (c = (new Date).getTime(), zs.toast("再按一次退出应用"), setTimeout(function() {
					c = null
				}, 1e3))
			}
		},
		renderCity: function(city) {
			zs.template('CharmCity', 'CharmCity_template', city);
		},
		renderLocalActivities: function(list) {
			zs.template('localactivities', 'localactivities_template', {
				list: list
			});
		},
		renderActivitiesByNet: function(city_id) {
			var cls = this;
			//本地活动
			var params = {
				pagenum: 1,
				pagesize: 2,
				focus: 1,
				city: city_id
			};
			zs.LocalActivities.get_local_activities(this.tag, params, function(list) {
				list && cls.renderLocalActivities(list);
			}); //渲染函数
		}
	});
}(mui, zs);