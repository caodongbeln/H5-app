/*!
 * =====================================================
 * zs v1.0.0 ()
 * =====================================================
 */
!
function(mui, zs) {
	zs.perfectDataOptionalPage = zs.UserPage.extend({
		initPage: function() {
			var cls = this;
			mui.plusReady(function() {
				zs.execI18n();
				var list = zs.getItem('JobCount');
				list && cls.renderJobList(JSON.parse(list));
				var list = zs.getItem('EmotionalCount');
				list && cls.renderEmotionalList(JSON.parse(list));
				var list = zs.getItem('BeliefCount');
				list && cls.renderBeliefList(JSON.parse(list));
				var list = zs.getItem('EducationCount');
				list && cls.renderEducationList(JSON.parse(list));
//				var list = zs.getItem('EducationCount');
//				list && cls.renderEducationList(JSON.parse(list));
				var list = zs.getItem('EnjoyCount');
				list && cls.renderEnjoyList(JSON.parse(list));
				zs.closeWaiting();
				//job列表
				zs.Api.post('job', 'lists', {}, function(r) {
					zs.setItem('JobCount', JSON.stringify(r.data));

				});
				//情感列表
				zs.Api.post('marital', 'lists', {}, function(r) {
					zs.setItem('EmotionalCount', JSON.stringify(r.data));

				});
				//填充信仰列表
				zs.Api.post('belief', 'lists', {}, function(r) {
					zs.setItem('BeliefCount', JSON.stringify(r.data));
				});
				//更新学历列表
				zs.Api.post('education', 'lists', {}, function(r) {
					zs.setItem('EducationCount', JSON.stringify(r.data));
				});
				//更新兴趣列表
				zs.Api.post('hobby', 'lists', {}, function(r) {
					zs.setItem('EnjoyCount', JSON.stringify(r.data));
				});
			}.bind(this));
		},
		//填充身份列表即职业列表
		renderJobList: function(list) {
			var JobListPciker = new mui.PopPicker();
			JobListPciker.setData(list);
			var JobListButton = document.getElementById('JobList');
			var JobButton = document.getElementById('Job');
			JobListButton.addEventListener('tap', function(event) {
				JobListPciker.show(function(items) {
					JobButton.innerHTML = JSON.stringify(items[0].text).split('"')[1];
					//给当前选中项添加id  便于以后选择   以此类推
					JobButton.setAttribute('data-uid', JSON.stringify(items[0].id));
					//zs.d(JSON.stringify(items[0].id));
					//返回 false 可以阻止选择框的关闭
					//return false;
				});
			}, false);
		},
		//填充情感列表
		renderEmotionalList: function(list) {
			var EmotionalPicker = new mui.PopPicker();
			EmotionalPicker.setData(list);
			var emotionalListButton = document.getElementById('emotionalList');
			var emotionalButton = document.getElementById('emotional');
			emotionalListButton.addEventListener('tap', function(event) {
				EmotionalPicker.show(function(items) {
					emotionalButton.innerHTML = JSON.stringify(items[0].text).split('"')[1];
					//给当前选中项添加id  便于以后选择   以此类推
					emotionalButton.setAttribute('data-uid', JSON.stringify(items[0].id));
					//zs.d(JSON.stringify(items[0].id));
					//返回 false 可以阻止选择框的关闭
					//return false;
				});
			}, false);
		},
		//填充信仰列表
		renderBeliefList: function(list) {
			var BeliefPicker = new mui.PopPicker();
			BeliefPicker.setData(list);
			var beliefListButton = document.getElementById('beliefList');
			var beliefButton = document.getElementById('belief');
			beliefListButton.addEventListener('tap', function(event) {
				//alert(1);
				BeliefPicker.show(function(items) {
					beliefButton.innerHTML = JSON.stringify(items[0].text).split('"')[1];
					//给当前选中项添加id  便于以后选择   以此类推
					beliefButton.setAttribute('data-uid', JSON.stringify(items[0].id));
					//zs.d(JSON.stringify(items[0].id));
					//返回 false 可以阻止选择框的关闭
					//return false;
				});
			}, false);
		},
		//填充学历列表
		renderEducationList: function(list) {
			//alert(2);
			var EducationPicker = new mui.PopPicker();
			EducationPicker.setData(list);
			var educationListButton = document.getElementById('educationList');
			var educationButton = document.getElementById('education');
			educationListButton.addEventListener('tap', function(event) {
				//alert(1);
				EducationPicker.show(function(items) {
					educationButton.innerHTML = JSON.stringify(items[0].text).split('"')[1];
					//给当前选中项添加id  便于以后选择   以此类推
					educationButton.setAttribute('data-uid', JSON.stringify(items[0].id));
					//zs.d(JSON.stringify(items[0].id));
					//返回 false 可以阻止选择框的关闭
					//return false;
				});
			}, false);
		},
		//填充兴趣列表
		renderEnjoyList: function(list) {
			zs.template('enjoy', 'perfect_data_optional', {
				list: list
			}, 'append')
		},
		initEvent: function() {
			mui.plusReady(function() {
				//兴趣列表的绑定事件
				$('#sport').find('li').click(function() {
					$(this).addClass('selected');
				});

				/**
				 * 添加图片
				 **/
				var lastButton = document.getElementById('last');
				var index = 1;
				var files = new Array();
				lastButton.addEventListener('tap', function(event) {
					plus.gallery.pick(function(p) {
						zs.showWaiting();
						zs.File.upload(p, function(url) {
							// 添加文件	
							p = p.replace(/\(\d+\)/g, "");
							var lastButton = $('#add_img');
							var html = "<img src=" + zs.uploadbase + url + " value=" + index + " href=" + url + "/>";
							lastButton.before(html);
							var index3 = index - 1;
							$("#add_imgBox img:eq(" + index3 + ")").on('longtap', function(event) {
								var btn = ["确定", "取消"];
								mui.confirm('确认删除该图片？', '', btn, function(e) {
									if (e.index == 0) {
										$("#add_imgBox img:eq(" + index3 + ")").remove();
										//files.splice(index3,1);   //splice() 方法向/从数组中添加/删除项目，然后返回被删除的项目。该方法会改变原始数组。
										//http://www.w3school.com.cn/jsref/jsref_splice.asp
									}
								});
							});
							zs.closeWaiting();
						})

						//files.push({
						//	name: "uploadkey" + index,
						//	path: p
						//});
						index++;
					});
				});

				//提交按钮的点击事件
				document.getElementById('submit').addEventListener('tap', function(event) {
					zs.showWaiting();
					var targetID = event.target.id;

					var info, job, marital, faith, img_urls = [];
					if ($("#add_img >img")) {
						$("#add_img >img").each(function() {
							img_urls.push($(this).attr("href"));
						});
						img_urls = img_urls.join("#");
					}
					if ($('#Job').attr('data-uid')) {
						job = $('#Job').attr('data-uid');
					}
					if ($('#emotional').attr('data-uid')) {
						marital = $('#emotional').attr('data-uid');
					}
					if ($('#belief').attr('data-uid')) {
						faith = $('#Job').attr('data-uid');
					}
					if ($('#textarea').val()) {
						info = $('#textarea').val();
					}
					var params = {
						id: zs.User.isLogin(),
						job: job,
						marital: marital,
						info: info,
						imgs: img_urls,
						faith: faith
					}
					if (targetID == 'save') {
						var opener = plus.webview.currentWebview().opener().opener();
						zs.d(opener);
						//plus.webview.show()
					} else {
						var Verified = plus.webview.create('../tpl/Verified.html', 'Verified');
						plus.webview.show(Verified);
					}
				})
			})

		},
	});
}(mui, zs);