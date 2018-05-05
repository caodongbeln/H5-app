/*!
 * =====================================================
 * zs v1.0.0 ()
 * =====================================================
 */
!
function(mui, zs) {
	zs.InchatPage = zs.UserPage.extend({
		initPage: function() {
			mui.plusReady(function() {
				plus.webview.currentWebview().setStyle({
					softinputMode: "adjustResize"
				});
			}.bind(this))
			//初始化SDK
			RongIMClient.init(zs.rong_appId); //e0x9wycfx7flq z3v5yqkbv8v30
			var token = zs.User.get_userinfo().data.token;
			//链接融云
			RongIMClient.connect(token, {
				onSuccess: function(x) {
					if (RongIMClient.getInstance().getConversation(RongIMClient.ConversationType.setValue(zs.getItem('type')), zs.getItem('discussion_id')) === null) {
							//alert(11);
						RongIMClient.getInstance().createConversation(RongIMClient.ConversationType.setValue(zs.getItem('type')), zs.getItem('discussion_id'), zs.getItem('discussion_name'));
					 }
						//链接成功之后同步会话列表
					RongIMClient.getInstance().syncConversationList({
						onSuccess: function() {
							//同步会话列表
							setTimeout(function() {								
								zs.ConversationList = RongIMClient.getInstance().getConversationList();	
								zs.getHistory(zs.getItem('discussion_id'), zs.getItem('discussion_name'), zs.getItem('type'));
								zs.initConversationList();	
								// alert(zs.ConversationList.length);
								//alert(zs.historyMessages.length);
								//zs.d(zs.getItem('discussion_name'));
								//zs.d(zs.getItem('discussion_id'));
								//zs.d(zs.getItem('type'));
								
								zs.closeWaiting();
							}, 1000);
						},
						onError: function() {
							zs.ConversationList = RongIMClient.getInstance().getConversationList();
						}
					})					
				},
				onError: function(c) {
					var info = '';
					switch (c) {
						case RongIMClient.callback.ErrorCode.TIMEOUT:
							info = '超时';
							break;
						case RongIMClient.callback.ErrorCode.UNKNOWN_ERROR:
							info = '未知错误';
							break;
						case RongIMClient.ConnectErrorStatus.UNACCEPTABLE_PROTOCOL_VERSION:
							info = '不可接受的协议版本';
							break;
						case RongIMClient.ConnectErrorStatus.IDENTIFIER_REJECTED:
							info = 'appkey不正确';
							break;
						case RongIMClient.ConnectErrorStatus.SERVER_UNAVAILABLE:
							info = '服务器不可用';
							break;
						case RongIMClient.ConnectErrorStatus.TOKEN_INCORRECT:
							info = 'token无效';
							break;
						case RongIMClient.ConnectErrorStatus.NOT_AUTHORIZED:
							info = '未认证';
							break;
						case RongIMClient.ConnectErrorStatus.REDIRECT:
							info = '重新获取导航';
							break;
						case RongIMClient.ConnectErrorStatus.PACKAGE_ERROR:
							info = '包名错误';
							break;
						case RongIMClient.ConnectErrorStatus.APP_BLOCK_OR_DELETE:
							info = '应用已被封禁或已被删除';
							break;
						case RongIMClient.ConnectErrorStatus.BLOCK:
							info = '用户被封禁';
							break;
						case RongIMClient.ConnectErrorStatus.TOKEN_EXPIRE:
							info = 'token已过期';
							break;
						case RongIMClient.ConnectErrorStatus.DEVICE_ERROR:
							info = '设备号错误';
							break;
					}
					zs.d("失败:" + info);
				}
			});
			//链接状态监听器
			RongIMClient.setConnectionStatusListener({
				onChanged: function(status) {
					switch (status) {
						//链接成功
						case RongIMClient.ConnectionStatus.CONNECTED:
							zs.d('链接成功');
							break;
							//正在链接
						case RongIMClient.ConnectionStatus.CONNECTING:
							zs.d('正在链接');
							break;
							//重新链接
						case RongIMClient.ConnectionStatus.RECONNECT:
							zs.d('重新链接');
							break;
							//其他设备登陆
						case RongIMClient.ConnectionStatus.OTHER_DEVICE_LOGIN:
							//连接关闭
						case RongIMClient.ConnectionStatus.CLOSURE:
							//未知错误
						case RongIMClient.ConnectionStatus.UNKNOWN_ERROR:
							//登出
						case RongIMClient.ConnectionStatus.LOGOUT:
							//用户已被封禁
						case RongIMClient.ConnectionStatus.BLOCK:
							//location.href = "/WebIMDemo/login.html";
							break;
					}
				}
			});
			//接收消息监听器
			RongIMClient.getInstance().setOnReceiveMessageListener({
				onReceived: function(data) {					
					//如果接收的消息为通知类型或者状态类型的消息，什么都不执行
					if (data instanceof RongIMClient.NotificationMessage || data instanceof RongIMClient.StatusMessage) {
						return;
					}				
				//	alert(data.getTargetId());
					zs.currentConversationTargetId = zs.getItem('discussion_id');
					if (zs.currentConversationTargetId != data.getTargetId()) {

						if (!zs._historyMessagesCache[data.getConversationType().valueOf() + "_" + data.getTargetId()]) {
							zs._historyMessagesCache[data.getConversationType() + "_" + data.getTargetId()] = [data];
						} else {
							zs._historyMessagesCache[data.getConversationType().valueOf() + "_" + data.getTargetId()].push(data);
						}
					} else {
						//alert(11);
						addHistoryMessages(data);
					}
					zs.initConversationList();					
				}
			});
			var MIN_SOUND_TIME = 800;
				mui.init({
					gestureConfig: {
						tap: true, //默认为true
						doubletap: true, //默认为false
						longtap: true, //默认为false
						swipe: true, //默认为true
						drag: true, //默认为true
						hold: true, //默认为false，不监听
						release: true //默认为false，不监听
					}
				});
				template.config('escape', false);
				
			var showKeyboard = function() {
						if (mui.os.ios) {
							var webView = plus.webview.currentWebview().nativeInstanceObject();
							webView.plusCallMethod({
								"setKeyboardDisplayRequiresUserAction": false
							});
						} else {
							var Context = plus.android.importClass("android.content.Context");
							var InputMethodManager = plus.android.importClass("android.view.inputmethod.InputMethodManager");
							var main = plus.android.runtimeMainActivity();
							var imm = main.getSystemService(Context.INPUT_METHOD_SERVICE);
							imm.toggleSoftInput(0, InputMethodManager.SHOW_FORCED);
							//var view = ((ViewGroup)main.findViewById(android.R.id.content)).getChildAt(0);
							imm.showSoftInput(main.getWindow().getDecorView(), InputMethodManager.SHOW_IMPLICIT);
							//alert("ll");
						}
					};
					/*var record = [{
						sender: 'zs',
						type: 'text',
						content: 'Hi，我是 MUI 小管家！'
					}];*/
					var ui = {
						body: document.querySelector('body'),
						footer: document.querySelector('footer'),
						footerRight: document.querySelector('.footer-right'),
						footerLeft: document.querySelector('.footer-left'),
						btnMsgType: document.querySelector('#msg-type'),
						boxMsgText: document.querySelector('#msg-text'),
						boxMsgSound: document.querySelector('#msg-sound'),
						btnMsgImage: document.querySelector('#msg-image'),
						areaMsgList: document.querySelector('#msg-list'),
						boxSoundAlert: document.querySelector('#sound-alert'),
						h: document.querySelector('#h'),
						content: document.querySelector('.mui-content')
					};
					ui.h.style.width = ui.boxMsgText.offsetWidth + 'px';
					//alert(ui.boxMsgText.offsetWidth );
					var footerPadding = ui.footer.offsetHeight - ui.boxMsgText.offsetHeight;
					var msgItemTap = function(msgItem, event) {
						var msgType = msgItem.getAttribute('msg-type');
						var msgContent = msgItem.getAttribute('msg-content')
						if (msgType == 'sound') {
							player = plus.audio.createPlayer(msgContent);
							var playState = msgItem.querySelector('.play-state');
							playState.innerText = '正在播放...';
							player.play(function() {
								playState.innerText = '点击播放';
							}, function(e) {
								playState.innerText = '点击播放';
							});
						}
					};
					var imageViewer = new mui.ImageViewer('.msg-content-image', {
						dbl: false
					});			
					window.addEventListener('resize', function() {
						ui.areaMsgList.scrollTop = ui.areaMsgList.scrollHeight + ui.areaMsgList.offsetHeight;
					}, false);			
					function msgTextFocus() {
						ui.boxMsgText.focus();
						setTimeout(function() {
							ui.boxMsgText.focus();
						}, 150);
					}
					//解决长按“发送”按钮，导致键盘关闭的问题；
					ui.footerRight.addEventListener('touchstart', function(event) {
						if (ui.btnMsgType.classList.contains('mui-icon-paperplane')) {	
							msgTextFocus();
							event.preventDefault();
						}
					});
					//解决长按“发送”按钮，导致键盘关闭的问题；
					ui.footerRight.addEventListener('touchmove', function(event) {
						if (ui.btnMsgType.classList.contains('mui-icon-paperplane')) {
							msgTextFocus();
							event.preventDefault();
						}
					});
					ui.footerRight.addEventListener('release', function(event) { 
						//监听释放按钮的函数
						if (ui.btnMsgType.classList.contains('mui-icon-paperplane')) {
							
							//showKeyboard();
							ui.boxMsgText.focus();
							setTimeout(function() {
								ui.boxMsgText.focus();
							}, 150);					
							send('text');
							
							
						} else if (ui.btnMsgType.classList.contains('mui-icon-mic')) {
							//alert(2);
							ui.btnMsgType.classList.add('mui-icon-compose');
							// mui-icon clear_img
							ui.btnMsgType.classList.add('mui-icon');
							ui.btnMsgType.classList.add('clear_img');
							ui.btnMsgType.classList.remove('mui-icon-mic');
							ui.boxMsgText.style.display = 'none';
							ui.boxMsgSound.style.display = 'block';
							ui.boxMsgText.blur();
							document.body.focus();
						} else if (ui.btnMsgType.classList.contains('mui-icon-compose')) {
							//alert(3);
							ui.btnMsgType.classList.add('mui-icon-mic');
							ui.btnMsgType.classList.remove('mui-icon-compose');
							ui.boxMsgSound.style.display = 'none';
							ui.boxMsgText.style.display = 'block';
							//--
							//showKeyboard();
							ui.boxMsgText.focus();
							setTimeout(function() {
								ui.boxMsgText.focus();
							}, 150);
						}
					}, false);
					ui.footerLeft.addEventListener('tap', function(event) {
						var btnArray = [{
							title: "拍照"
						}, {
							title: "从相册选择"
						}];
						plus.nativeUI.actionSheet({
							title: "选择照片",
							cancel: "取消",
							buttons: btnArray
						}, function(e) {
							var index = e.index;
							switch (index) {
								case 0:
									break;
								case 1:
									var cmr = plus.camera.getCamera();
									cmr.captureImage(function(path) {
											zs.showWaiting();
											zs.File.upload(path,function(url){
												send('image',zs.uploadbase+url);
												zs.closeWaiting();
											})
												
									}, function(err) {});
									break;
								case 2:
									plus.gallery.pick(function(path) {
										zs.File.upload(path,function(url){
												send('image',zs.uploadbase+url);
										})	
									}, function(err) {}, null);
									break;
							}
						});
					}, false);
					var setSoundAlertVisable = function(show) {
						if (show) {
							ui.boxSoundAlert.style.display = 'block';
							ui.boxSoundAlert.style.opacity = 1;
						} else {
							ui.boxSoundAlert.style.opacity = 0;
							//fadeOut 完成再真正隐藏
							setTimeout(function() {
								ui.boxSoundAlert.style.display = 'none';
							}, 200);
						}
					};
					var recordCancel = false;
					var recorder = null;
					var audio_tips = document.getElementById("audio_tips");
					var startTimestamp = null;
					var stopTimestamp = null;
					var stopTimer = null;
					ui.boxMsgSound.addEventListener('hold', function(event) {
						recordCancel = false;
						if (stopTimer) clearTimeout(stopTimer);
						audio_tips.innerHTML = "手指上划，取消发送";
						ui.boxSoundAlert.classList.remove('rprogress-sigh');
						setSoundAlertVisable(true);
						recorder = plus.audio.getRecorder();
						if (recorder == null) {
							plus.nativeUI.toast("不能获取录音对象");
							return;
						}
						startTimestamp = (new Date()).getTime();
						recorder.record({
							filename: "_doc/audio/"
						}, function(path) {
							if (recordCancel) return;
							send('audio',path);
						}, function(e) {
							plus.nativeUI.toast("录音时出现异常: " + e.message);
						});
					}, false);
					ui.body.addEventListener('drag', function(event) {
						//zs.d('drag');
						if (Math.abs(event.detail.deltaY) > 50) {
							if (!recordCancel) {
								recordCancel = true;
								if (!audio_tips.classList.contains("cancel")) {
									audio_tips.classList.add("cancel");
								}
								audio_tips.innerHTML = "松开手指，取消发送";
							}
						} else {
							if (recordCancel) {
								recordCancel = false;
								if (audio_tips.classList.contains("cancel")) {
									audio_tips.classList.remove("cancel");
								}
								audio_tips.innerHTML = "手指上划，取消发送";
							}
						}
					}, false);
					ui.boxMsgSound.addEventListener('release', function(event) {
						//zs.d('release');
						if (audio_tips.classList.contains("cancel")) {
							audio_tips.classList.remove("cancel");
							audio_tips.innerHTML = "手指上划，取消发送";
						}
						//
						stopTimestamp = (new Date()).getTime();
						if (stopTimestamp - startTimestamp < MIN_SOUND_TIME) {
							audio_tips.innerHTML = "录音时间太短";
							ui.boxSoundAlert.classList.add('rprogress-sigh');
							recordCancel = true;
							stopTimer = setTimeout(function() {
								setSoundAlertVisable(false);
							}, 800);
						} else {
							setSoundAlertVisable(false);
						}
						recorder.stop();
					}, false);
					ui.boxMsgSound.addEventListener("touchstart", function(e) {
						//zs.d("start....");
						e.preventDefault();
					});
					ui.boxMsgText.addEventListener('input', function(event) {
						//输入框获取焦点的监听事件
						ui.btnMsgType.classList[ui.boxMsgText.value == '' ? 'remove' : 'add']('mui-icon-paperplane');
						//清除或者背景图，使发送能够显示
						if(ui.boxMsgText.value == ''){
							document.getElementById('msg-type').style.backgroundImage='url(../images/Microphone.png)';
						}else{
							document.getElementById('msg-type').style.backgroundImage='url()';
						}
						
						
						//给发送按钮增加一个for属性
						ui.btnMsgType.setAttribute("for", ui.boxMsgText.value == '' ? '' : 'msg-text');
						//写入消息到聊天框中
						ui.h.innerText = ui.boxMsgText.value.replace(new RegExp('\n', 'gm'), '\n-') || '-';
						//设置写入时键盘弹出后页脚的高度以及content的高度样式
						ui.footer.style.height = (ui.h.offsetHeight + footerPadding) + 'px';
						ui.content.style.paddingBottom = ui.footer.style.height;
					});
					var focus = false;
					ui.boxMsgText.addEventListener('tap', function(event) {
						//使输入框获取焦点的函数
						ui.boxMsgText.focus();
						setTimeout(function() {
							ui.boxMsgText.focus();
						}, 0);
						focus = true;
						setTimeout(function() {
							focus = false;
						}, 1000);
						event.detail.gesture.preventDefault();
					}, false);
					//点击消息列表，关闭键盘
					ui.areaMsgList.addEventListener('click', function(event) {
						if (!focus) {
							ui.boxMsgText.blur();
						}
					})			
			 //渲染历史记录
			function addHistoryMessages(item,type) {
				if(item){
					zs.historyMessages.push(item);
					var cover = zs.User.get_userinfo().data.cover;	
					$("#msg-list").append(zs.stringFormat(zs.historyStr, item.getMessageType(),item.getContent(),item.getMessageDirection() == 1 ? "msg-item-self" : "", item.getMessageDirection() == 1 ? cover : "images/personPhoto.png", zs.myUtil.msgType(item), item.getMessageId(),item.getMessageDirection() == 1 ? "user-self" : ""));
					//zs.d(item.getMessageType()+'/'+item.getContent()+'/'+item.getMessageDirection());
					//zs.d(zs.stringFormat(zs.historyStr, item.getMessageType(),item.getContent(),item.getMessageDirection() == 1 ? "msg-item-self" : "", item.getMessageDirection() == 1 ? cover : "images/personPhoto.png", zs.myUtil.msgType(item), item.getMessageId()));
				}				
			};
			//发送
			function send(type,content) {
						alert(zs.conver);
						//alert(zs.currentConversationTargetId);
							if (!zs.conver && !zs.currentConversationTargetId) {
								alert("请选中需要聊天的人");
								return;
							}
							
							if (con == "") {
								alert("不允许发送空内容");
								return;
							}
							if (RongIMClient.getInstance().getConversation(RongIMClient.ConversationType.setValue(zs.conver), zs.currentConversationTargetId) === null) {
								//alert(11);
					            RongIMClient.getInstance().createConversation(RongIMClient.ConversationType.setValue(zs.conver), zs.currentConversationTargetId, zs.conversationTitle);
					        }
							if(type == 'text'){
								var con = ui.boxMsgText.value.replace(/\[.+?\]/g, function(x) {
									return RongIMClient.Expression.getEmojiObjByEnglishNameOrChineseName(x.slice(1, x.length - 1)).tag || x;
								});
								//alert(con);
								var content = new RongIMClient.MessageContent(RongIMClient.TextMessage.obtain(zs.myUtil.replaceSymbol(con)));
							}
							if(type == 'image'){
								var con = content;
								var content = new RongIMClient.MessageContent(RongIMClient.ImageMessage.obtain(zs.myUtil.replaceSymbol(con)));
							}							
							if(type == 'audio'){
								var con = content;
								var content = new RongIMClient.MessageContent(RongIMClient.VoiceMessage.obtain(zs.myUtil.replaceSymbol(con)));
							}
							//发送消息
							
							//设置会话名称	
							RongIMClient.getInstance().sendMessage(RongIMClient.ConversationType.setValue(zs.conver), zs.currentConversationTargetId, content, null, {
								onSuccess: function() {
									if(zs.conver == 3){
										RongIMClient.getInstance().setConversationName(RongIMClient.ConversationType.GROUP,zs.currentConversationTargetId,zs.conversationTitle);
									}
									if(zs.conver == 4){
										RongIMClient.getInstance().setConversationName(RongIMClient.ConversationType.PRIVATE,zs.currentConversationTargetId,zs.conversationTitle);
									}
									zs.d("send successfully");
									//zs.getHistory(zs.getItem('discussion_id'), zs.getItem('discussion_name'), zs.getItem('type'));
									addHistoryMessages(content.getMessage(),zs.conver);
									
									ui.boxMsgText.value = '';
									mui.trigger(ui.boxMsgText, 'input', null);
								},
								onError: function(x) {
									var info = '';
									switch (x) {
										case RongIMClient.callback.ErrorCode.TIMEOUT:
											info = '超时';
											break;
										case RongIMClient.callback.ErrorCode.UNKNOWN_ERROR:
											info = '未知错误';
											break;
										case RongIMClient.SendErrorStatus.REJECTED_BY_BLACKLIST:
											info = '在黑名单中，无法向对方发送消息';
											break;
										case RongIMClient.SendErrorStatus.NOT_IN_DISCUSSION:
											info = '不在讨论组中';
											break;
										case RongIMClient.SendErrorStatus.NOT_IN_GROUP:
											info = '不在群组中';
											break;
										case RongIMClient.SendErrorStatus.NOT_IN_CHATROOM:
											info = '不在聊天室中';
											break;
										default:
											info = x;
											break;
									}									
									zs.d('发送失败:' + info);
								}
							});			
			};
			String.stringFormat = function(str) {
				for (var i = 1; i < arguments.length; i++) {
					str = str.replace(new RegExp("\\{" + (i - 1) + "\\}", "g"), arguments[i] != undefined ? arguments[i] : "");
				}
				return str;
			};
		}
	});
}(mui, zs);