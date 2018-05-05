/*!
 * =====================================================
 * zs v1.0.0 ()
 * =====================================================
 */
!
function(mui, zs) {
	zs.perfectDataIndexPage = zs.UserPage.extend({
		userPicker: new mui.PopPicker(),
		language_level: new mui.PopPicker(),
		ss: this,
		initPage: function() {
			//实例化语种和口语水平对象
			window.userPicker = new mui.PopPicker();
			window.language_level = new mui.PopPicker();
			//取缓存数据填充
			var info = zs.User.get_userinfo().data;
			zs.d(JSON.stringify(info));
			var id = info.id;
			if (info.is_free_guide == 1) {
				$('#freeGuide').addClass('mui-active');
			};
			if (info.is_free_house == 1) {
				$('#freeHouse').addClass('mui-active');
			};
			zs.template('perfect_data', 'perfect_data_index', info, 'prepend');
			//更新缓存
			zs.Api.post('user', 'info', {
				uid: id
			}, function(r) {
				zs.d(JSON.stringify(r));
				zs.setItem(zs.User.info_cache_key, JSON.stringify(r));
				$('#perfect_data').css('display', 'block');
				zs.closeWaiting();
			});
			//填充日期
			(function($) {
				var result = $('#result')[0];
				var btns = $('.btn');
				btns.each(function(i, btn) {
					btn.addEventListener('tap', function() {
						var optionsJson = this.getAttribute('data-options') || '{}';
						var options = JSON.parse(optionsJson);
						var id = this.getAttribute('id');
						var picker = new $.DtPicker(options);
						picker.show(function(rs) {
							result.innerText = rs.text;
							picker.dispose();
						});
					}, false);
				});
			})(mui);
			//填充语言和口语水平部分
			cls.renderLanguage();
		},
		initEvent: function() {
			var cls = this;
			mui.plusReady(function() {
				//性别部分的点击事件
				$('#person-sex').find('input').click(function() {
					$(this).addClass('select-person-sex').siblings('input').removeClass('select-person-sex');
				});
				//点击添加语种部分
				var addLanguage = document.getElementById('guide');
				//每点击一次就追加一次模板并且给新追加的绑定事件
				addLanguage.addEventListener('tap', function() {
					//填充
					zs.template('languageCount', 'language', {}, 'prepend');
					//调用绑定事件函数
					cls.clickLanguage();
				}, false);
				/**
				 * 添加头像
				 **/
				var head_portrait = $('#head_portrait');
				var index = 1;
				head_portrait.bind('click', function(event) {
					plus.gallery.pick(function(p) {
						zs.d(p);
						head_portrait.attr('src', p);
						zs.showWaiting();

						zs.File.upload(p, function(url) {
							// 添加文件	
							//p = p.replace(/\(\d+\)/g, "");
							//var lastButton = $('#add_img');
							head_portrait.attr('data-src', url);
							zs.d(url);
							zs.closeWaiting();
						})
					});
				});

				$('#submit').click(function() {
					//判断点击的是哪个按钮
					var ID = event.target.id;
					//zs.d(ID);
					//判断必选项
					//性别
					var gender_s = $('.select-person-sex').attr('class');
					if (gender_s) {
						var gender = $('.select-person-sex').attr('data-value');
					} else {
						zs.toast('请选择您的性别');
						return;
					}
					//昵称
					var username = $('.nickname').val();
					if (!username) {
						zs.toast('请选择您的昵称');
						return;
					}
					//出生日期
					var birthday = $('#result').html();
					if (!birthday) {
						zs.toast('请选择您的出身日期');
						return;
					}
					//国籍
					var country = $('#country').html();
					if (!country) {
						zs.toast('请选择您的国籍');
						return;
					}
					//语言
					var language = $('#languageCount ul li:first-child input');
					var language_level = $('#languageCount ul li:nth-child(2) input');
					//拼接往后台传的语言数据
					var cate_z = '';
					//当只会一种语言时
					if (language.length == 1 && language[0].value == '外语种类') {
						zs.toast('请选择您使用的语言');
						return;
					} else if (language_level.length == 1 && language_level[0].value == '口语水平') {
						zs.toast('请选择您的口语水平');
						return;
					} else {
						//当会多种语言时
						var languageCount = language.length;
						for (var i = 0; i < languageCount; i++) {
							var cate = language[i].id;
							if (!cate) {
								zs.toast('您有尚未选择的语种选项，请选择');
								return;
							}
							cate = cate.split('"')[1];
							for (var j = 0; j < languageCount; j++) {
								var le = language_level[i].id;
								if (!le) {
									zs.toast('您有尚未选择的口语水平选项，请选择');
									return;
								}

								cate_z += cate + ',' + le + ';';

							}

						}
					}
					//运行到这步说明符合提交条件，显示loading
					zs.showWaiting();

					//是否是免费向导
					if ($('#freeGuide').hasClass('mui-active')) {
						is_free_guide = 1;
					} else {
						is_free_guide = 0;
					}
					//是否是免费住宿
					if ($('#freeGuide').hasClass('mui-active')) {
						is_free_house = 1;
					} else {
						is_free_house = 0;
					}
					var data = {
						id: zs.User.isLogin(),
						gender: gender,
						brith: birthday,
						country: $('#country').attr('data-uid'),
						language: cate_z,
						is_free_house: is_free_house,
						is_free_guide: is_free_guide,
					};
					zs.d(JSON.stringify(data));
					//alert(data.brith);
					//判断是否上传头像
					if ($('#head_portrait').attr('data-src')) {
						data.cover = zs.imgUrl + $('#head_portrait').attr('data-src');
						zs.d(data.cover);
					}

					zs.Api.post('user', 'edit', data, function(r) {
						zs.setItem(zs.User.info_cache_key, JSON.stringify(r));
						zs.d(zs.getItem(zs.User.info_cache_key));
						zs.d(JSON.stringify(r));
						//						if(ID=='save'){
						//							plus.webview.show(plus.webview.currentWebview().opener());
						//						}else{
						//							plus.webview.open('../tpl/perfect_data_optional.html','perfect_data_optional')
						//						}
						zs.closeWaiting();
					})
				});
				window.addEventListener('chooseCountry', function(event) {
					var country = event.detail;
					$('#country').html(country.name);
					$('#country').attr('data-uid', country.id);

				})

			});
		},
		//口语水平填充函数
		renderLanguage: function() {
			zs.Api.post('lang', 'lists', {}, function(r) {
				zs.setItem('languageCount', JSON.stringify(r.data));
				userPicker.setData(r.data);
				var showUserPickerButton = document.getElementById('showUserPicker');
				//var userResult = doc.getElementById('userResult');
				showUserPickerButton.addEventListener('tap', function(event) {
					userPicker.show(function(items) {
						showUserPickerButton.value = JSON.stringify(items[0].text).split('"')[1];
						//给当前选中项添加id  便于以后选择   以此类推
						showUserPickerButton.setAttribute('id', JSON.stringify(items[0].id));
						//zs.d(JSON.stringify(items[0].id));
						//返回 false 可以阻止选择框的关闭
						//return false;
					});
				}, false);

			});
			language_level.setData([{
				id: 0,
				text: '母语'
			}, {
				id: 1,
				text: '流利'
			}, {
				id: 2,
				text: '熟悉'
			}, {
				id: 3,
				text: '中等'
			}, {
				id: 4,
				text: '一般'
			}]);

			//口语水平
			var LanguageLevel = document.getElementById('LanguageLevel');
			LanguageLevel.addEventListener('tap', function(event) {
				language_level.show(function(items) {
					LanguageLevel.value = JSON.stringify(items[0].text).split('"')[1];
					LanguageLevel.setAttribute('id', JSON.stringify(items[0].id));
					LanguageLevel.setAttribute('id', JSON.stringify(items[0].id));
					//zs.d(JSON.stringify(items[0].id));
				});
			}, false);
		},
		//追加的口语水平绑定事件
		clickLanguage: function() {
			var language = document.querySelector('#languageCount ul:first-child li:first-child input');
			language.addEventListener('tap', function(event) {
				userPicker.show(function(items) {
					language.value = JSON.stringify(items[0].text).split('"')[1];
					language.setAttribute('id', JSON.stringify(items[0].id));
					//zs.d(JSON.stringify(items[0].id));
				});
			}, false);
			//口语水平
			var level = document.querySelector('#languageCount ul:first-child li:last-child input');
			level.addEventListener('tap', function(event) {
				language_level.show(function(items) {
					level.value = JSON.stringify(items[0].text).split('"')[1];
					level.setAttribute('id', JSON.stringify(items[0].id));
					//zs.d(JSON.stringify(items[0].id));
				});
			}, false);
		}

	});
}(mui, zs);