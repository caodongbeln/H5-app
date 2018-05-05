/*!
 * =====================================================
 * zs v1.0.0 ()
 * =====================================================
 */
!
function(mui, zs) {
	zs.PostActivityPage = zs.UserPage.extend({
		choosePoint: null,
		initPage: function() {
			mui.plusReady(function() {
				//调用地图定位
				zs.Location.getCurrentPosition(function(r) {
					$('#location').html(r.addresses);
					$('#location').attr('lng', r.coords.longitude);
					$('#location').attr('lat', r.coords.latitude);
				});

				//请求活动类型

				zs.Api.post('strategy_type', 'lists', {}, function(r) {
					var userPicker = new mui.PopPicker();
					userPicker.setData(r.data);
					var showUserPickerButton = document.getElementById('showUserPicker');
					var userResult = document.getElementById('userResult');
					showUserPickerButton.addEventListener('tap', function(event) {
						userPicker.show(function(items) {
								var result =  JSON.stringify(items[0].text);
									result = result.split('');
									result.pop();
									result.shift();
									result = result.join('');
									userResult.innerText = 	result;
									userResult.setAttribute('data-id',JSON.stringify(items[0].id));
							//返回 false 可以阻止选择框的关闭
							//return false;
						});
					}, false);
				});
			})

		},
		initEvent: function() {
			var cls = this;

			mui.plusReady(function() {

				/**
				 * 添加图片
				 **/
				var lastButton = document.getElementById('last');
				//var index = 1;
				//var files = new Array();
				lastButton.addEventListener('tap', function(event) {
					plus.gallery.pick(function(p) {
						zs.showWaiting();
						zs.File.upload(p, function(url) {
							// 添加文件	
							p = p.replace(/\(\d+\)/g, "");
							zs.d(url);
							//var lastButton = $('#last');
							//							var html = "<li><div><img src=" + zs.imgUrl + url + " value=" + index + " href=" + url + "/></div></li>";
							var html = "<li><div><img src=" + zs.imgUrl + url + " href=" + url + "></div></li>";
							//取到回头第二个li进行追加；
							//var imgs = $('#General_lighting');
							$('#General_lighting li').eq(-1).before(html);
							//var index3 = index - 1;
							//							$(".house-add-img img:eq(" + index3 + ")").on('longtap', function(event) {
							//								var btn = ["确定", "取消"];
							//								mui.confirm('确认删除该图片？', '', btn, function(e) {
							//									if (e.index == 0) {
							//										$("#add_imgBox img:eq(" + index3 + ")").remove();
							//										//files.splice(index3,1);   //splice() 方法向/从数组中添加/删除项目，然后返回被删除的项目。该方法会改变原始数组。
							//										//http://www.w3school.com.cn/jsref/jsref_splice.asp
							//									}
							//								});
							//							});
							zs.closeWaiting();
						})

						//files.push({
						//	name: "uploadkey" + index,
						//	path: p
						//});
						//index++;
					});
				});

				//调用地图
				window.addEventListener('posSelected', function(event) {
						var pos = event.detail.pos;
						zs.d(JSON.stringify(pos));
						$('#location').html(pos.name);
						$('#location').attr('lng', pos.point.longitude);
						$('#location').attr('lat', pos.point.latitude);
					})
					//谁可以看  选择
				window.addEventListener('changePrivacy', function(event) {
					var html = event.detail.text;
					$('#wocansee').html(event.detail.text).attr('data-privacy', event.detail.privacy);
					//alert($('#wocansee').attr('data-privacy'))
				})

				document.getElementById('activity-title-box').addEventListener('tap', function(e) {
					e.detail.gesture.preventDefault(); //修复iOS 8.x平台存在的bug，使用plus.nativeUI.prompt会造成输入法闪一下又没了
					var btnArray = ['确定', '取消'];
					mui.prompt('请输入活动标题：', '', '', btnArray, function(e) {
						if (e.index == 0) {
							if(e.value.length>15){
								zs.toast('活动标题不得超过15个字');
								return;
							}
							$('#activity-title').html(e.value);
						} else {

						}
					})
				});
				$(document).ready(function() {
					$(document).keyup(function() {
						var count = $("#activity_detail").val();
						var countLength = count.length;
						$("#count").text(countLength);
						if (countLength > 200) {
							alert('只限制200字~')
						}
					});
				});
				//日期
				(function(mui) {
					//var result = $('#result')[0];
					var btns = mui('.riqixingming-span-time');
					btns.each(function(i, btn) {
						btn.addEventListener('tap', function() {
							var cls = this;
							var optionsJson = this.getAttribute('data-options') || '{}';
							var options = JSON.parse(optionsJson);
							/*
							 * 首次显示时实例化组件
							 * 示例为了简洁，将 options 放在了按钮的 dom 上
							 * 也可以直接通过代码声明 optinos 用于实例化 DtPicker
							 */
							var picker = new mui.DtPicker(options);
							picker.show(function(rs) {
								/*
								 * rs.value 拼合后的 value
								 * rs.text 拼合后的 text
								 * rs.y 年，可以通过 rs.y.vaue 和 rs.y.text 获取值和文本
								 * rs.m 月，用法同年
								 * rs.d 日，用法同年
								 * rs.h 时，用法同年
								 * rs.i 分（minutes 的第二个字母），用法同年
								 */
								//result.innerText = '选择结果: ' + rs.text;
								$(cls).html(rs.text);
								/* 
								 * 返回 false 可以阻止选择框的关闭
								 * return false;
								 */
								/*
								 * 释放组件资源，释放后将将不能再操作组件
								 * 通常情况下，不需要示放组件，new DtPicker(options) 后，可以一直使用。
								 * 当前示例，因为内容较多，如不进行资原释放，在某些设备上会较慢。
								 * 所以每次用完便立即调用 dispose 进行释放，下次用时再创建新实例。
								 */
								picker.dispose();
							});
						}, false);
					});
				})(mui);

				//活动类型

			});
			
			// 获取某个时间格式的时间戳
			//var stringTime = "2014-07-10 10:21:12";
			//var timestamp2 = Date.parse(new Date(stringTime));
			//timestamp2 = timestamp2 / 1000;
			//2014-07-10 10:21:12的时间戳为：1404958872 
			//zs.d(stringTime + "的时间戳为：" + timestamp2);
			
			
			document.getElementById('send').addEventListener('tap', function() {
				//alert(1);
				
				var type = $('#userResult').attr('data-id');//.split('');
					type && (type = type.split(''));
				var title = $('#activity-title').html();
				var starttime = $('.riqixingming-span-time').eq(0).html();
					starttime = Date.parse(new Date(starttime))/1000;
				var endtime = $('.riqixingming-span-time').eq(1).html();
					endtime = Date.parse(new Date(endtime))/1000;
				var nowtime = Date.parse(new Date())/1000;
				var General_lightings = $('#General_lighting li').length;
				
				if (General_lightings == 1) {
					zs.toast('活动图片不能为空哦');
					return;
				} else if (!title) {
					zs.toast('活动标题不能为空哦');
					return;
				} else if (!starttime) {
					zs.toast('活动起始时间不能为空哦');
					return;
				} else if (!endtime) {
					zs.toast('活动结束时间不能为空哦');
					return;
				}else if (starttime>endtime) {
					zs.toast('活动结束时间不能早于起始时间');
					return;
				}else if (nowtime>endtime) {
					zs.toast('活动结束时间不能早于当前时间');
					return;
				}else if (!type) {
					zs.toast('活动类型不能为空哦');
					return;
				}else if(!$('#activity_detail').val()){
					zs.toast('活动描述不能为空哦');
					return;
				}
				var imgs = [];
				var imgsFather = $('#General_lighting li:not(#General_lighting li:last)');
				var len = imgsFather.length;
				for (var i = 0; i < len; i++) {
					imgs.push($('#General_lighting li:not(#General_lighting li:last)').eq(i).find('img').attr('href'));
				}
				//alert(2);
					zs.d( $('#wocansee').attr('data-privacy'));
				var params = {
					uid: zs.User.isLogin(),
					title:title,
					desc: $('#activity_detail').val(),
					imgs: imgs,
					lat: $('#location').attr('lat'),
					lng: $('#location').attr('lng'),
					type: type[1],
					starttime: starttime,
					endtime: endtime,
					addr: $('#location').html(),
					privacy: $('#wocansee').attr('data-privacy')
				};
			
				//alert(3);
				
				zs.Api.post('strategy', 'add', params, function(r) {
					//alert(4);
					if (r.status) {
						zs.toast('发布活动成功');
						mui.back();
					} else {
						zs.toast('发布活动失败');
					}

				})
			})
		},
		
	});
}(mui, zs)