/*!
 * =====================================================
 * zs v1.0.0 ()
 * =====================================================
 */
!
function(mui, zs) {
	zs.GopayPage = zs.UserPage.extend({
		w: null,
		cata_type: null,
		pays: {},
		cid: null,
		price: null,
		PAYSERVER: 'http://test.zujimi.com/index.php?g=api&m=pay&a=add',
		ALIPAYPSERVER: 'http://test.zujimi.com/index.php?g=api&m=alipay&a=app_pay',
		coupon_name: 0, //	优惠券名称
		coupon_id: 0, //优惠券ID(道具)
		couponInfo_id: 0,
		initPage: function() {
			var cls = this;
			mui.plusReady(function() {
				zs.showWaiting();
				cls.toolsInfo();
				var toolId = plus.webview.currentWebview().data_id,
					parmas = {
						id: toolId
					}
				zs.Api.post('tools', 'info', parmas, function(tool) {
					//显示默认周价格,及微信和支付宝的显示
					var gold_num = zs.User.get_userinfo().gold;
					var week_price = tool.data.week_price;
					$('#toolName').html(tool.data.name);
					//默认显示应付金币和人民币
					zs.template('payContent', 'pay_content', {
						info: tool.data
					}, 'append');
					cls.changeStatus(tool, gold_num, week_price, toolId);
					//监听选择优惠券
					window.addEventListener('get_coupon', function(event) {
						cls.coupon_name = event.detail.coupon_name;
						cls.coupon_id = event.detail.id;
						cls.cid = event.detail.cid;
						cls.couponInfo_id = event.detail.couponInfo_id;
						var coupon_name = cls.coupon_name
						cls.toolsInfo(coupon_name);
						cls.changeStatus(tool, gold_num, week_price);
					});
					cls.payClickEvent();
				})
			});
		},
		//判断是否存在可用的优惠券及优惠券类型
		toolsInfo: function(coupon_name, coupon_id) {
			var cls = this;
			mui.plusReady(function() {
				if(cls.cata_type == null) {
					cls.cata_type = 1
				} else {
					cls.cata_type = parseInt(cls.cata_type) + 1
				}
				var toolId = plus.webview.currentWebview().data_id;
				zs.Api.post('coupon_user', 'lists', {
					uid: zs.User.isLogin(),
					status: 1
				}, function(coupon) {
				$('#canUser').hide();
					var coupons = coupon.data,
						len = coupons.length;
					if(len > 0) {
						var count = 0;
						for(var i = 0; i < len; i++) {
							if(coupons[i].toolsInfo == null || coupons[i].toolsInfo.id == toolId && coupons[i].tools_type == cls.cata_type) {
								count++
							}
						}
						if(coupon_name != undefined) {
							$('#canUser').show();
							$('#canUser').text(count + '张可用');
							if(cls.coupon_id != undefined) {
								$('#userContent').text('-' + coupon_name).css('color', '#f59901');
							} else {
								$('#userContent').text('-' + coupon_name + '金币 ').css('color', '#f59901');
							}
						} else {
							$('#canUser').show();
							$('#canUser').text(count + '张可用');
							$('#userContent').text('未使用').css('color', '#999999');
						}
					} else {
						$('#canUser').hide();
						$('#userContent').text('无可用道具').css('color', '#999999');
						$('.pay_coupon').find('li').removeAttr('data-href');
					}
				})
				zs.closeWaiting();
			})
		},
		changeStatus: function(tool, gold_num, week_price, toolId) {
			var cls = this;
			var couponInfo_id = cls.couponInfo_id;
			var coupon_name = cls.coupon_name;
			cata_status();
			var up_cata_num = $('#toolNum').val();
			var up_cata_price = $('#total').text();
			cate_detail_price(up_cata_num, up_cata_price);
			//初始化输入框
			mui('.mui-numbox').numbox();
			//点击选择购买的类型：0周  1月  2季  3年
			$('.date').find('span').click('tap', function() {
				$(this).addClass('selected').siblings().removeClass('selected');
				var cata = this.id
				cls.cata_type = $(this).attr('type');
				var type = '.' + cata;
				$(type).removeClass('none').siblings().addClass('none');
				cls.price = $(type).find('i').text();
				cls.coupon_id = 0;
				var num = $('#toolNum').val();
				plus(cls.price);
				reduce(cls.price);
				defail(num, cls.price);
				cls.toolsInfo();
				cata_status(cls.cata_type);
				cate_detail_price(cls.price);
				reload_price(num, cls.price);
				var new_price = num * cls.price;
				other_method(new_price);
			});
			//	默认选择'周'类型后
			if($('#week_price').hasClass('selected')) {
				var num = $('#toolNum').val();
				if(coupon_name != 0) {
					$('#coupon_discount').html(coupon_name);
					if(parseInt(coupon_name) > parseInt(week_price)) {
						$('#gold_discount').html(0);
						$('#pay').addClass('none');
					} else {
						$('#gold_discount').html(week_price - coupon_name);
						$('#coupon_discount').html(coupon_name);
					}
				}
				//判断点击数量后点击选择优惠券价格变化
				if(couponInfo_id != 0 && couponInfo_id != undefined && num == 1) {
					$('#gold_discount').html(0);
					$('#coupon_discount').html(week_price);
					$('#money').html(0);
				} else if(couponInfo_id != 0 && couponInfo_id != undefined && gold_num != 0) {
					var up_total = $('#total').text();
					var up_total = parseInt(up_total);
					$('#gold_discount').html(up_total - week_price);
					$('#coupon_discount').html(week_price);
					$('#pay_count').html(up_total - week_price);
				}
				if(couponInfo_id != 0 && couponInfo_id != undefined && gold_num == 0) {
					var up_total = $('#total').text();
					var up_total = parseInt(up_total);
					$('#coupon_discount').html(week_price);
					$('#payable').html(parseInt(up_total) - parseInt(week_price));
					$('#pay_count').html(parseInt(up_total) - parseInt(week_price));
					$('#gold_discount').html(0);
					$('#money').html((up_total - week_price) / 10);
				}
				$('#btnPlus').click('tap', function() {
					var num = $('#toolNum').val();
					if(couponInfo_id != 0 && couponInfo_id != undefined) {
						origial_p(num, week_price);
					}
					defail(num, week_price, coupon_name);
				});
				$('#btnReduce').click('tap', function() {
					var num = $('#toolNum').val();
					defail(num, week_price, coupon_name);
				});

				function origial_p(num, price) {
					var num = num - 1;
					var all_gold = price * num;
					var origial_week_price = price;
					other_method(all_gold, origial_week_price);
				}
			}
			//点击选择优惠券,跳转到优惠券选择页面
			function cata_status(cate_type) {
				if(cate_type == undefined) {
					up_cate = 1
				} else {
					up_cate = parseInt(cate_type) + 1
				}
				$('#sel_coupon').click('tap', function() {
					zs.open('sel_coupon.html', 'el_coupon', {
						data_id: toolId,
						cate_type: up_cate
					})
				})
			}
			//			 data-href="sel_coupon.html" data-id="{{info.id}}" 
			//点击添加数量
			function plus(price) {
				$('#btnPlus').click('tap', function() {
					var num = $('#toolNum').val();
					defail(num, price);
				})
			}
			//点击减少数量
			function reduce(price) {
				$('#btnReduce').click('tap', function() {
					var num = $('#toolNum').val();
					defail(num, price);
				})
			}

			function reload_price(num, p) {
				var cls = this;
				var all_gold = num * p;
				if(parseInt(gold_num) + 0.001 >= parseInt(all_gold)) {
					$('#gold_discount').html(all_gold);
					$('#money').html(0);
					$('#pay_count').html(0);
				} else {
					$('#pay').removeClass('none');
					$('#gold_discount').html(0);
					$('#pay_count').html(0);
					$('#money').html((parseInt(all_gold) - parseInt(gold_num)) / 10);
				}
			}
			//@Tocheck获取数量进行数据的替换
			var default_p = $('#total').html();
			method(default_p);
			//默认选择道具类型，抵扣金币、人民币、应付等显示
			function cate_detail_price(num, p) {
				var cls_price = cls.price;
				$('#coupon_discount').html(cls_price);
				if(cls.coupon_id != 0 && cls.coupon_id != undefined) {
					if(num == 1) {
						$('#gold_discount').html(0);
						$('#money').html(0);
						$('#payable').html(0);
						$('#pay').addClass('none');
					} else {
						var c_price = parseInt(p) - parseInt(cls_price);
						$('#gold_discount').html(c_price);
						$('#money').html(0);
						$('#pay_count').html(0);
						$('#coupon_discount').html(cls_price);
						if(gold_num == 0) {
							$('#gold_discount').html(0);
						}
						if($('#payable').html() != 0) {
							var new_payable_p = $('#payable').html();
							$('#payable').html(new_payable_p - cls_price);
							$('#pay_count').html(new_payable_p - cls_price);
							$('#money').html((new_payable_p - cls_price) / 10);
							if(new_payable_p - cls_price <= 0) {
								$('#payable').html(0);
								$('#pay_count').html(0);
								$('#money').html(0);
							}
						}
					}
				}
				if(cls.coupon_id == undefined && cls.coupon_name != 0) {
					if(parseInt(coupon_name) >= parseInt($('#total').html())) {
						$('#payable').html(0);
						$('#pay_count').html(0);
						$('#money').html(0);
					} else {
						var new_coupon_p = parseInt($('#total').html()) - parseInt(coupon_name) - gold_num;
						$('#payable').html(new_coupon_p);
						$('#pay_count').html(new_coupon_p);
						$('#money').html(new_coupon_p / 10);
					}
				}
			}
			//计算价格的变动
			function defail(num, p) {
				var all_gold = num * p;
				$('#total').html(all_gold);
				//$('#payable').html(get_finall_price);
				if(coupon_name != 0 && cls.coupon_id == 0 || cls.coupon_id == undefined) {
					method(all_gold, p);
				} else if(cls.coupon_id != 0 && cls.coupon_id != undefined) {
					up_method(all_gold, p)
				} else {
					other_method(all_gold, p);
				};
			}
			//如果不存在优惠券的计算结果
			function other_method(all_gold, origial_week_price) {
				$('#coupon_discount').html(0);
				if(parseInt(gold_num) + 0.001 >= parseInt(all_gold)) {
					var get_finall_price = parseInt(all_gold) - parseInt(all_gold);
					$('#gold_discount').html(all_gold);
					$('#pay_count').html(0);
					$('#money').html(0);
					$('#payable').html(0);
					$('#pay').addClass('none');
				} else {
					$('#pay').removeClass('none');
					$('#gold_discount').html(gold_num);
					$('#payable').html(all_gold - gold_num);
					$('#pay_count').html(all_gold - gold_num);
					$('#money').html((parseInt(all_gold) - parseInt(gold_num)) / 10);
				}
			}
			//如果存在优惠券,并且优惠券类型为金币计算结果
			function method(all_gold) {
				var coupon_name = cls.coupon_name;
				if(typeof(coupon_name) == 'number') {
					$('#coupon_discount').html(coupon_name);
					//如果道具的金币大于总金额
					if(parseInt(coupon_name) > parseInt(all_gold)) {
						$('#gold_discount').html(0);
						$('#money').html(0);
						$('#pay_count').html(0);
						$('#payable').html(0);
						$('#pay').addClass('none');
					} else {
						var new_cate_p = parseInt(all_gold) - parseInt(coupon_name)
						if(new_cate_p >= parseInt(gold_num)) {
							$('#gold_discount').html(gold_num);
							$('#money').html((parseInt(new_cate_p) - parseInt(gold_num)) / 10);
							$('#pay_count').html((parseInt(new_cate_p) - parseInt(gold_num)));
							$('#payable').html((parseInt(new_cate_p) - parseInt(gold_num)));
							$('#pay').removeClass('none');
						} else {
							$('#gold_discount').html(new_cate_p);
							$('#money').html(0);
							$('#pay_count').html(0);
							$('#payable').html(0);
						}
					}
				}
				if(coupon_name == 0 && num == 1) {
					var new_total_price = $('#total').html();
					$('#payable').html(new_total_price);
					$('#money').html(new_total_price / 10);
					$('#pay_count').html(new_total_price);
					if(parseInt(new_total_price) > gold_num) {
						$('#payable').html(new_total_price - gold_num);
						$('#money').html((new_total_price - gold_num) / 10);
						$('#pay_count').html(new_total_price - gold_num);
						$('#pay').removeClass('none');
					} else {
						$('#payable').html(0);
						$('#money').html(0);
						$('#pay_count').html(0);
					}
					if(cls.coupon_id != 0 && cls.coupon_id != undefined) {
						$('#money').html(0);
					}
				}

			}
			//如果存在优惠券，并且优惠券为道具
			function up_method(all_gold, p) {
				$('#coupon_discount').html(p);
				var up_coupon_p = all_gold - p; //总金额减去一个道具抵用的金额
				//var up_coupon_m  = parseInt(all_gold)- parseInt(up_coupon_p); // 总金额减去抵用道具价格后的金额
				$('#pay_count').html(up_coupon_p); //应付为默认总金额
				if(parseInt(up_coupon_p) > parseInt(gold_num)) { //如果抵用道具价格后的金额大于我的金币数
					$('#money').html((parseInt(up_coupon_p) - parseInt(gold_num)) / 10);
					// 支付人民币为最终价格减去我的金币数
					$('#gold_discount').html(gold_num); //抵扣为我的金币数
					$('#pay_count').html(parseInt(up_coupon_p) - parseInt(gold_num));
					$('#payable').html(parseInt(up_coupon_p) - parseInt(gold_num));
					$('#pay').removeClass('none');
				} else {
					$('#money').html(0); //如果抵用道具价格后的金额小于我的金币数
					$('#gold_discount').html(up_coupon_p); //抵扣为总金额减去一个道具抵用的金额
					$('#pay').addClass('none');
					$('#pay_count').html(0);
				}
			}
		},
		initEvent: function() {

		},
		//		支付
		payClickEvent: function() {
			var cls = this;
			mui.plusReady(function() {
				cls.updateChannels();
				var toolId = plus.webview.currentWebview().data_id;
				document.getElementById('go_pay').addEventListener('tap', function() {
					if($('#money').html() <= 0) {
						var type = $('.selected').attr('type');
						var cost = $('#cost').text();
						var final_count = $('#gold_discount').text();
						var tools_num = $('#toolNum').val();
						var up_cid = cls.cid;
						if(up_cid != null) {
							final_cid = up_cid
						} else {
							final_cid = 0;
						}
						var parmas = {
							uid: zs.User.isLogin(),
							tid: toolId,
							price: final_count,
							original_cost: cost,
							cid: final_cid,
							num: tools_num,
							type: type,
							mark: 1
						}
						zs.Api.post('tools_sales', 'add', parmas, function() {
							zs.toast('购买道具成功!');
							var detailPage = plus.webview.getWebviewById('my');
							mui.fire(detailPage, 'change_gold', {

							});
							setTimeout(function() {
								mui.openWindow({
									url: '../tpl/my_prop.html'
								});
							}, 1000)
						})
					} else {
						var type = $('.mui-selected').attr('id');
						cls.pay(type);
					}
				})
			})
		},
		updateChannels: function() {
			var cls = this;
			plus.payment.getChannels(function(channels) {
				for(var i in channels) {
					var channel = channels[i];
					cls.pays[channel.id] = channel;
					if(channel.id == 'wxpay') {
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
			if(!pc.serviceReady) {
				var txt = null;
				switch(pc.id) {
					case "alipay":
						txt = "检测到系统未安装“支付宝快捷支付服务”，无法完成支付操作， 是否立即安装？ ";
						break;
					default:
						txt = "系统未安装“" + pc.description + "”服务，无法完成支付，是否立即安装？ ";
						break;
				}
				plus.nativeUI.confirm(txt, function(e) {
					if(e.index == 0) {
						pc.installService();
					}
				}, pc.description);
			}

		},
		// 支付
		pay: function(id) {
			var toolId = plus.webview.currentWebview().data_id;
			var user_id = zs.User.isLogin();
			var cls = this;
			if(cls.w) { //检查是否请求订单中
				zs.d(cls.PAYSERVER);
				return;
			}
			zs.d("----- 请求支付 -----");
			zs.d(cls.PAYSERVER);
			if(id == 'wxpay') {
				var url = cls.PAYSERVER;
			} else {
				var url = cls.ALIPAYPSERVER;
			}

			if(id == 'alipay' || id == 'wxpay') {
				//url+=id;
				url += '&type=' + id;
			} else {
				zs.toast('当前环境不支持此支付通道');

				return;
			}
			var appid = plus.runtime.appid;
			if(navigator.userAgent.indexOf('StreamApp') >= 0) {
				appid = 'Stream';
			}
			//新增
			var amount = document.getElementById('money').innerHTML;
			var pay_count = document.getElementById('pay_count').innerHTML;
			url += '&uid=' + user_id + '&price=' + amount + '&mark=' + 2 + '&tid=' + toolId;
			w = plus.nativeUI.showWaiting();
			// 请求支付订单
			var xhr = new XMLHttpRequest();
			xhr.onreadystatechange = function() {
					switch(xhr.readyState) {
						case 4:
							w.close();
							w = null;
							if(xhr.status == 200) {
								zs.d("----- 请求订单成功 -----");
								zs.d('xxxxxxx' + xhr.responseText);
								var order = xhr.responseText;
								var obj = JSON.parse(order);
								if(mui.os.ios) {
									var sh = setInterval(show, 5000);
									if(id == 'wxpay') {
										function show() {
											if(obj.dialog.transaction_id) {
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

								}
								zs.d(JSON.stringify(cls.pays[id]));
								zs.d(JSON.stringify(obj.data));
								plus.payment.request(cls.pays[id], obj.data, function(result) {
										zs.d("----- 支付成功 -----");
										zs.d(JSON.stringify(result));
										var up_cid = cls.cid;
										var dialog = obj.dialog;
										if(up_cid != null) {
											final_cid = up_cid
										} else {
											final_cid = 0;
										}
										var parmas = {
											pid:dialog,
											money:amount,
											uid: zs.User.isLogin(),
											tid: toolId,
											price: $('#gold_discount').text(),
											original_cost: $('#cost').text(),
											cid: final_cid,
											num: $('#toolNum').val(),
											type: $('.selected').attr('type'),
											mark: 2
										}
										zs.Api.post('tools_sales', 'add', parmas, function() {
											zs.toast('购买道具成功!');
											var detailPage = plus.webview.getWebviewById('my');
											mui.fire(detailPage, 'change_gold', {});
											setTimeout(function() {
												mui.openWindow({
													url: '../tpl/my_prop.html'
												});
											}, 1000)
										})
										plus.nativeUI.alert("支付成功：感谢你的支持， 我们会继续努力完善产品。 ", function() {
											var show = show || zs.aniShow;
											var data = {
												id: obj.dialog.id,
												status: 0 //订单支付状态
											};
										}, "捐赠");
									},
									function(e) {
										zs.d("----- 支付失败 -----");									
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

			//})
		},

	});
}(mui, zs);