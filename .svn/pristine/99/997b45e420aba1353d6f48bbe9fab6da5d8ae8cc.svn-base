/*!
 * =====================================================
 * zs v1.0.0 ()
 * =====================================================
 */
!
function(mui, zs) {
	zs.CityPage = zs.UserPage.extend({
		historys: null,
		initConfig: function() {
			var Jhistorys = zs.getItem('history_citys');
			//zs.removeItem('history_citys');
			if (Jhistorys) {
				this.historys = JSON.parse(Jhistorys);
			}
		},
		initPage: function() {
			var cls = this;
			//处理历史搜索
			this.historys && renderHis(this.historys);
			$(".index_listWhiteColor.big_font").bind("input propertychange", function() {
				$('#hostroy').css('display', 'none');
				if ($(this).val() == '') return false;
				var params = {
					name: $(this).val()
				};
				zs.Location.get_city_list(params, function(list) {
					$('#dang_city').hide();
					$('#search_list').css('display', 'block');
					$('#search_list').html('');
					zs.d(JSON.stringify(list));
					for (var i in list) {
						list[i]['data'] = JSON.stringify(list[i]);
					}
					zs.template('search_list', 'city1', {
						list: list
					}, 'append');
					mui(document.body).on("tap", "li", function(node) {
						var data = this.getAttribute("data-city");
						var cid = this.getAttribute('data-cid');
						if (data) {
							var city_info = JSON.parse(data);
							cls.saveCity(city_info);
							cls.selectCity(city_info);
						}
					});
				})
			})
			$('#dang_city').hide();
			var city = zs.getItem(zs.Location.cache_key);
			city = JSON.parse(city);
			$('#city').html(city.address.city);
			$('#country').html(city.address.country);
			$('#dang_city').show();

			zs.closeWaiting()

			function renderHis(list) {
				for (var i in list) {
					list[i]['data'] = JSON.stringify(list[i]);
				}
				zs.template('historys', 'city2', {
					list: list
				}, 'append');
			}
		},
		initEvent: function() {
			var cls = this;
			$('input').focus(function() {
				$('#search_list').css('display', 'block');
			})
			mui("#historys").on("tap", "li", function(node) {
				var data = this.getAttribute("data-city");
				var cid = this.getAttribute('data-cid');
				if (data) {
					cls.selectCity(JSON.parse(data));
				}
			});
		},
		selectCity: function(city_info) {
			var refer = plus.webview.currentWebview().opener();
			refer && mui.fire(refer, 'citySelected', city_info);
			mui.back();
			plus.webview.currentWebview().close();
		},
		saveCity: function(city_info) {
			if (!city_info) return;
			if (!this.in_array(city_info, this.historys)) {
				if (!this.historys) this.historys = [];
				this.historys.push(city_info);
				zs.setItem("history_citys", JSON.stringify(this.historys));
			}
		},
		in_array: function(search, array, key) {
			key = key ? key : "id";
			for (var i in array) {
				if (array[i][key] == search[key]) {
					return true;
				}
			}
			return false;
		}
	})
}(mui, zs)