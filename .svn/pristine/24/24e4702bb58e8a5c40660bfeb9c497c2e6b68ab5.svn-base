/*!
 * =====================================================
 * zs v1.0.0 ()
 * =====================================================
 */
!
function(mui, zs) {
	zs.RongyunPage = zs.UserPage.extend({
		initPage: function() {
			mui.plusReady(function() {
				zs.Rongyun = new zs.RongyunClass;
				plus.screen.lockOrientation("portrait-primary");
				//推送
			
				if(zs.User.isLogin()){
				//获取用户token
				var token = zs.User.get_userinfo().token;
				
				zs.d(token);
				//连接融云
				zs.Rongyun.connect(zs.rong_appId, token);
				}	
				window.setInterval(function() {
					zs.Rongyun.getCurrentConnectionStatus(function(status) {
						zs.d(status);
					});
					zs.Rongyun.reconnect(function() {
						alert(222);
					});
				}, 300000);
				
				document.addEventListener("resume", function() {
					zs.Rongyun.reconnect(function() {
						alert(222);
					});
					zs.toast("切换到前台");
				}, false);
				document.addEventListener("pause", function() {
					zs.toast("切换到后台");
				}, false);
				document.addEventListener("netchange", function() {
					var nt = plus.networkinfo.getCurrentType();
					switch (nt) {
						case plus.networkinfo.CONNECTION_ETHERNET:
						case plus.networkinfo.CONNECTION_WIFI:
							zs.toast("Switch to Wifi networks!");
							zs.Rongyun.reconnect(function() {
								//alert(111);
							});
							break;
						case plus.networkinfo.CONNECTION_CELL2G:
						case plus.networkinfo.CONNECTION_CELL3G:
						case plus.networkinfo.CONNECTION_CELL4G:
							zs.toast("Switch to Cellular networks!");
							zs.Rongyun.reconnect(function() {
								//alert(222);
							});
							break;
						default:
							zs.Rongyun.getCurrentConnectionStatus(function(status) {
								//alert(status);
							});
							zs.Rongyun.reconnect(function() {
								//alert(222);
							});
							zs.toast("Not networks!");
							break;
					}
				}, false);
				window.addEventListener('customEvent', function(event) {
					var type = event.detail.type; //消息类型
					var content = event.detail.content; //消息内容  图片消息和语音消息为base64字符串，位置消息为:位置缩略图
					var extra = event.detail.extra; //附加参数
					var targetId = event.detail.targetId; //目标id
					var ConversationType = event.detail.ConversationType; //会话类型
					var duration = event.detail.duration; //语音消息用到，播放时长
					var imageUri = event.detail.imageUri; //图片消息用到，传到自己服务器的图片地址
					var latitude = event.detail.latitude; //"纬度";
					var longitude = event.detail.longitude; //"经度";
					var poi = event.detail.desc; // "位置描述";
					var operation = event.detail.operation //Request：请求， AcceptResponse：接受，RejectResponse：拒绝
					var sourceUserId = event.detail.sourceUserId; //发送者id	

					switch (type) {
						case 'TxtMsg':
							{ // 文本消息
								// 定义消息类型,文字消息使用 RongIMLib.TextMessage
								zs.Rongyun.emojiToSymbol(content, function(result) {
									content = result
								});
								zs.d(content);
								var msg = new RongIMLib.TextMessage({
									content: content,
									extra: extra
								});
								var conversationtype = RongIMLib.ConversationType.PRIVATE; // 私聊							
								send_message(conversationtype, targetId, msg);
							};
							break;
						case 'VcMsg':
							{ //语音消息
								var msg = new RongIMLib.VoiceMessage({
									content: content,
									duration: duration,
									extra: extra
								});
								var conversationtype = RongIMLib.ConversationType.PRIVATE; // 私聊							
								send_message(conversationtype, targetId, msg);
							};
							break;
						case 'ImgMsg':
							{ //图片消息
								var msg = new RongIMLib.ImageMessage({
									content: content,
									imageUri: imageUri,
									extra: extra
								});
								var conversationtype = RongIMLib.ConversationType.PRIVATE; // 私聊							
								send_message(conversationtype, targetId, msg);
							};
							break;
						case 'LBSMsg':
							{ //位置消息 
								var msg = new RongIMLib.LocationMessage({
									latitude: longitude,
									longitude: longitude,
									poi: poi,
									content: content,
									extra: extra
								});
								var conversationtype = RongIMLib.ConversationType.PRIVATE; // 私聊							
								send_message(conversationtype, targetId, msg);
							};
							break;
						case 'ContactNtf':
							{ //联系人好友消息   // 位置公开  
								var msg = new RongIMLib.ContactNotificationMessage({
									"operation": operation,
									"sourceUserId": sourceUserId,
									"targetUserId": targetId,
									"message": content,
									"extra": extra
								})
								var conversationtype = RongIMLib.ConversationType.PRIVATE; // 私聊							
								send_message(conversationtype, targetId, msg);
							};
							break;
						case 'CardMsg':
							{
								var conversationtype = RongIMLib.ConversationType.PRIVATE; // 私聊							
								var msg = new RongIMClient.RegisterMessage.CardMessage({
									"content": extra.username + "的名片",
									"cover": extra.cover,
									"username": extra.username,
									"extra": extra
								});
								send_message(conversationtype, targetId, msg);
							};
							break;
						default:
							{
								alert("选择类型！");
							}
					}
				});
				//获取会话列表
				window.addEventListener('get_conversationList', function(event) {
					var from_id = event.detail.from_id;
					var detailPage = plus.webview.getWebviewById(from_id);
					zs.Rongyun.getConversationList(from_id, function(result) {
						mui.fire(detailPage, 'resh', {
							list: result
						});
					});
				});
				//获取会话历史消息
				window.addEventListener('get_historymessages', function(event) {
				
					var from_id = event.detail.from_id;
					var conversationType = event.detail.conversationType; //消息类型
					var targetId = event.detail.targetId;
					var page = event.detail.page;
					var detailPage = plus.webview.getWebviewById(from_id);
					zs.Rongyun.getRemoteHistoryMessages(page, from_id, conversationType, targetId, 20, function(is_true,from_id, result, conversationType, targetId) {
						var detailPage = plus.webview.getWebviewById(from_id);
						//setInterval(function(){
							mui.fire(detailPage, 'resh', {
								is_true:is_true,
								list: result,
								conversationType: conversationType,
								targetId: targetId,
								page: page
							});
						//},200)
							
					});
				});
				//获取表情
				window.addEventListener('get_emojis', function(event) {

					zs.Rongyun.getemojis("chat", function(form_id, result) {
						var detailPages = plus.webview.getWebviewById(form_id);
						mui.fire(detailPages, 'resh_emojis', {
							list: result
						});
					});
				});
				//清除未读消息数
				window.addEventListener('clearMessages', function(event) {

					var conversationType = event.detail.conversationType; //消息类型
					var targetId = event.detail.targetId;
					zs.Rongyun.clearMessagesUnreadStatus(conversationType, targetId, function() {
						var detailPages = plus.webview.getWebviewById('contacts_msg');
						zs.Rongyun.getConversationList('contacts_msg', function(result) {
							mui.fire(detailPages, 'resh', {
								list: result
							});
						});
					});
				});
				window.addEventListener('reg_page', function(event) {
					if (zs.pages.indexOf(event.detail.page) == -1) {
						zs.pages.push(event.detail.page);
					}
				});
				window.addEventListener('del_page', function(event) {
					var page = event.detail.page;
					for (var i in zs.pages) {
						if (pages[i] == page) {
							zs.pages.splice(i)
						};
					}
				});
				/*监听已读事件，对于已读的信息；通知融云将消息置为已读，下次登录时不再接受该用户消息；
				 * targetId: 目标用户
				 * ConversationType：消息类型
				 */
				window.addEventListener('readed', function(event) {
					var targetId = event.detail.targetId;
					var type = event.detail.ConversationType;
					zs.d("readed start!!!!");
					zs.Rongyun.clearMessagesUnreadStatus(type, targetId, function() {
						zs.d("readed!!!");
						var contacts_msg = plus.webview.getWebviewById("contacts_msg");
						zs.Rongyun.getConversationList('contacts_msg', function(result) {
							contacts_msg && mui.fire(contacts_msg, 'resh', {});
						});
					});
				});

				function send_message(conversationtype, targetId, msg) {
					RongIMClient.getInstance().sendMessage(conversationtype, targetId, msg, {
						// 发送消息成功
						onSuccess: function(message) {
							zs.d("222   " + JSON.stringify(message));
							var detailPage = plus.webview.getWebviewById('chat');
							var list = [];
							list.push(message);
							mui.fire(detailPage, 'add', {
								list: list
							});
							zs.Rongyun.historyMessagesCache = zs.Conversation.getHistory();
							if (!zs.Rongyun.historyMessagesCache[message.conversationType + "_" + message.targetId]) {
								zs.Rongyun.historyMessagesCache[message.conversationType + "_" + message.targetId] = [];
							}
							//zs.d(zs.Rongyun.historyMessagesCache);
							//zs.d(message.conversationType + "_" + message.targetId);
							//zs.d(zs.Rongyun.historyMessagesCache[message.conversationType + "_" + message.targetId].length);
							zs.Rongyun.historyMessagesCache[message.conversationType + "_" + message.targetId].push(message);
							zs.Conversation.setHistory(zs.Rongyun.historyMessagesCache);
							var detailPages = plus.webview.getWebviewById('contacts_msg');
							zs.Rongyun.getConversationList('contacts_msg', function(result) {
								mui.fire(detailPages, 'resh', {
									list: result
								});
							});
						},
						onError: function(errorCode, message) {
							var info = '';
							switch (errorCode) {
								case RongIMLib.ErrorCode.TIMEOUT:
									zs.Rongyun.reconnect(function() {});
									info = '超时';
									break;
								case RongIMLib.ErrorCode.UNKNOWN_ERROR:
									info = '未知错误';
									break;
								case RongIMLib.ErrorCode.REJECTED_BY_BLACKLIST:
									info = '在黑名单中，无法向对方发送消息';

								case RongIMLib.ErrorCode.NOT_IN_DISCUSSION:
									info = '不在讨论组中';
									break;
								case RongIMLib.ErrorCode.NOT_IN_GROUP:
									info = '不在群组中';
									break;
								case RongIMLib.ErrorCode.NOT_IN_CHATROOM:
									info = '不在聊天室中';
									break;
								default:
									info = message;
									break;
							}
							zs.d('发送失败:' + info);
						}
					});
				}

			}.bind(this))
		}
	});
}(mui, zs);