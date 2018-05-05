/*!
 * =====================================================
 * zs v1.0.0 ()
 * =====================================================
 */
!
function(mui, zs) {
	zs.ShopPage = zs.UserPage.extend({
		w: null,
		pays: {},
		PAYSERVER: 'http://test.zujimi.com/index.php?g=api&m=pay&a=add',
		ALIPAYPSERVER: 'http://test.zujimi.com/index.php?g=api&m=alipay&a=app_pay',
		initPage: function() {
			var cls = this;
			zs.Api.post('tools', 'lists', {}, function(tool) {
				zs.template('item1mobile', 'prop_content', {
					list: tool.data
				}, 'append');
			});
			zs.Api.post('gold', 'lists', {}, function(gold) {
				zs.template('item2mobile', 'gold_content', {
					list: gold.data
				}, 'append');
				var info = document.getElementById("price");
				document.querySelector('.mui-table-view.mui-table-view-radio').addEventListener('selected', function(e) {
//					alert(e.detail.el.value);
					info.innerHTML = e.detail.el.value;
				});
				cls.clickEvent();
			});
		},
		initEvent: function() {

		},
		clickEvent: function() {
			var cls = this;
			mui.plusReady(function() {
				cls.updateChannels();
				document.getElementById('go_pay').addEventListener('tap', function() {
					var origial_price = $('#price').html();
					if (origial_price == '0') {
						zs.toast('请选择购买金币的类型!')
					} else {
						var type = $('#pay .mui-selected').attr('id');
						cls.pay(type);
					}
				})
			})
		},
		updateChannels: function() {
			var cls = this;
			plus.payment.getChannels(function(channels) {
				for (var i in channels) {
					var channel = channels[i];
					cls.pays[channel.id] = channel;
					if (channel.id == 'wxpay') {
						cls.checkService(channel);
					};
				}
			}, function(ret) {
				zs.error("获取支付通道失败：" + ret.code + "|" + ret.message)
			})
		},
		/* 检查是否支持该支付方式
		 */
		checkService: function(pc) {
			if (!pc.serviceReady) {
				var txt = null;
				switch (pc.id) {
					case "alipay":
						txt = "检测到系统未安装“支付宝快捷支付服务”，无法完成支付操作，是否立即安装？";
						break;
					default:
						txt = "系统未安装“" + pc.description + "”服务，无法完成支付，是否立即安装？";
						break;
				}
				plus.nativeUI.confirm(txt, function(e) {
					if (e.index == 0) {
						pc.installService();
					}
				}, pc.description);
			}

		},
		// 支付
		pay: function(id) {
			var user_id = zs.User.isLogin();
			var cls = this;
			if (cls.w) { //检查是否请求订单中
				zs.d(cls.PAYSERVER);
				return;
			}
			zs.d("----- 请求支付 -----");
			zs.d(cls.PAYSERVER);
			var url = cls.PAYSERVER;
			if (id == 'wxpay') {
				var url = cls.PAYSERVER;
			} else {
				var url = cls.ALIPAYPSERVER;
			}
			if (id == 'alipay' || id == 'wxpay') {
				//url+=id;
				url += '&type=' + id;
			} else {
				zs.toast('当前环境不支持此支付通道');

				return;
			}
			var appid = plus.runtime.appid;
			if (navigator.userAgent.indexOf('StreamApp') >= 0) {
				appid = 'Stream';
			}
			//新增
			var amount = $('#price').html();
			var gid = $('#gold_len .mui-selected').attr('id');
			var origial_cost = $('#gold_len .mui-selected #origial_price').text();
			var gold_num = $('#gold_len .mui-selected #num').text();
			url += '&uid=' + user_id + '&price=' + amount + '&mark=' + 1 + '&gid=' + gid;
			w = plus.nativeUI.showWaiting();
			// 请求支付订单
			var xhr = new XMLHttpRequest();
			//改成
			xhr.onreadystatechange = function() {
					switch (xhr.readyState) {
						case 4:
							w.close();
							w = null;
							if (xhr.status == 200) {
								zs.d("----- 请求订单成功 -----");
								zs.d(xhr.responseText);
								var order = xhr.responseText;
								var obj = JSON.parse(order);
								if (mui.os.ios) {
									var sh = setInterval(show, 5000);

									function show() {
										if (obj.dialog.transaction_id) {
											var data = {
												transaction_id: obj.dialog.transaction_id //订单生成id
											};
											zs.Api.post('weipay', 'orderquery', data, function(r) {
												clearInterval(sh);
												zs.confirm("是否完成支付？", function(ret) {
													setTimeout(function() {
														var ws = plus.webview.currentWebview();
														plus.webview.close(ws);
													}, 1000);
												})

											})
										}
									}
								}
								plus.payment.request(cls.pays[id], obj.data, function(result) {
									zs.d("----- 支付成功 -----");
									zs.d(JSON.stringify(result));
									var parmas = {
										uid: zs.User.isLogin(),
										gid: gid,
										price: amount,
										original_cost: origial_cost,
										cid: 0,
										num: gold_num
									}
									zs.Api.post('gold_sales_log', 'add', parmas, function() {
										zs.toast('购买金币成功!');
										var detailPage = plus.webview.getWebviewById('my');
										mui.fire(detailPage, 'change_gold', {
											
										});
									})
									plus.nativeUI.alert("支付成功：感谢你的支持，我们会继续努力完善产品。", function() {
										var show = show || zs.aniShow;
										var data = {
											id: obj.dialog.id,
											status: 0 //订单支付状态
										};
									}, "捐赠");
								}, function(e) {

									zs.d("----- 支付失败 -----");
									//zs.d("[" + e.code + "]：" + e.message);
									plus.nativeUI.alert("支付失败");
								});
							} else {
								zs.d("----- 请求订单失败 -----");
								zs.d(xhr.status);
								plus.nativeUI.alert("获取订单信息失败！", null, "捐赠");
							}
							break;
						default:
							break;
					}
				},
				xhr.open('GET', url);
			zs.d("请求支付订单：" + url);
			xhr.send();
		},
	});
}(mui, zs);