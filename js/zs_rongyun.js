!
function(mui, zs, win, doc) { //扩展
	//融云
	zs.RongyunClass = mui.Class.extend({
		historyMessagesCache: {},
		all_emojis: new Array(),
		currentConversationTargetId: '',
		init: function() {

		},
		connect: function(key, token) {
			var cls = this;
			var date1=new Date();  //开始时间
			//初始化SDK
			RongIMLib.RongIMClient.init(key);
			RongIMLib.RongIMEmoji.init();
			RongIMLib.RongIMVoice.init();
			//注册名片消息类型
			var messageName = "CardMessage"; // 消息名称。
			var objectName = "s:CardMsg"; // 消息内置名称，请按照此格式命名。
			var mesasgeTag = new RongIMLib.MessageTag(true, true); // 消息是否保存是否计数，true true 保存且计数，false false 不保存不计数。
			var propertys = ["content", "cover", "username", "extra"]; // 消息类中的属性名。
			RongIMClient.registerMessageType(messageName, objectName, mesasgeTag, propertys);
			// 设置连接监听状态 （ status 标识当前连接状态 ）
			// 连接状态监听器
			RongIMClient.setConnectionStatusListener({
				onChanged: function(status) {
					zs.toast('111'+status);
					switch (status) {
						case RongIMLib.ConnectionStatus.CONNECTED:
							zs.d('链接成功');
							break;
						case RongIMLib.ConnectionStatus.CONNECTING:
							zs.d('正在链接');
							break;
						case RongIMLib.ConnectionStatus.DISCONNECTED:
							zs.Rongyun.reconnect(function(){
								
							});
							zs.d('断开连接');
							break;
						case RongIMLib.ConnectionStatus.KICKED_OFFLINE_BY_OTHER_CLIENT:
							zs.d('其他设备登陆');
							break;
						case RongIMLib.ConnectionStatus.DOMAIN_INCORRECT:
							zs.d('域名不正确');
							break;
						case RongIMLib.ConnectionStatus.CLOSURE:
							zs.Rongyun.reconnect(function(){
								
							});
							break;
						case RongIMLib.ConnectionStatus.NETWORK_UNAVAILABLE:
							zs.Rongyun.reconnect(function(){
								
							});
							zs.d('网络不可用');
							break;
					}
				}
			});
			// 消息监听器
			RongIMClient.setOnReceiveMessageListener({
				// 接收到的消息
				onReceived: function(message) {					
																						
						//zs.d("3333   " + JSON.stringify(message));
					// 判断消息类型
					switch (message.messageType) {
						case RongIMClient.MessageType.TextMessage:
							//message.content.content = RongIMLib.RongIMEmoji.emojiToHTML(message.content.content);
							//message.content.content => 111,
							break;
						case RongIMClient.MessageType.VoiceMessage:
							// 对声音进行预加载                
							// message.content.content 格式为 AMR 格式的 base64 码
							break;
						case RongIMClient.MessageType.ImageMessage:
							// message.content.content => 图片缩略图 base64。
							// message.content.imageUri => 原图 URL。
							break;
						case RongIMClient.MessageType.DiscussionNotificationMessage:
							// message.content.extension => 讨论组中的人员。
							break;
						case RongIMClient.MessageType.LocationMessage:
							// message.content.latiude => 纬度。
							// message.content.longitude => 经度。
							// message.content.content => 位置图片 base64。
							break;
						case RongIMClient.MessageType.RichContentMessage:
							// message.content.content => 文本消息内容。
							// message.content.imageUri => 图片 base64。
							// message.content.url => 原图 URL。
							break;
						case RongIMClient.MessageType.InformationNotificationMessage:
							// do something...
							break;
						case RongIMClient.MessageType.ContactNotificationMessage:
							// do something...
							break;
						case RongIMClient.MessageType.ProfileNotificationMessage:
							// do something...
							break;
						case RongIMClient.MessageType.CommandNotificationMessage:
							// do something...
							break;
						case RongIMClient.MessageType.CommandMessage:
							// do something...
							break;
						case RongIMClient.MessageType.CardMessage:
							// do something...
							break;
						case RongIMClient.MessageType.UnknownMessage:
							// do something...
							break;
						default:
							// do something...
					}									
					mui.plusReady(function() {						
						var pages = zs.pages
							/*判断数组中是否存在某个元素的方法*/
						function isExistInArr(_array, _element) {
							if (!_array || !_element) return false;
							if (!_array.length) {
								return (_array == _element);
							}
							for (var i = 0; i < _array.length; i++) {
								if (_element == _array[i]) return true;
							}
							return false;
						}
						/*去除数组中重复元素的方法*/
						function distinct(_array) {
							if (!_array || !_array.length) return _array;
							var newArray = new Array();
							for (var i = 0; i < _array.length; i++) {
								var oEl = _array[i];
								if (!oEl || isExistInArr(newArray, oEl)) continue;
								newArray[newArray.length] = oEl;
							}
							return newArray;
						}
						pages = distinct(pages);
						var date2=new Date();    //接收时间
						var date3=(date2.getTime()-date1.getTime())/1000;   //相差秒数 
						if(date3 > 5){
							if (!zs.Rongyun.historyMessagesCache[message.conversationType + "_" + message.targetId]) {
								zs.Rongyun.historyMessagesCache[message.conversationType + "_" + message.targetId] = [];
							}					
							zs.Rongyun.historyMessagesCache[message.conversationType + "_" + message.targetId].push(message);
							zs.Conversation.setHistory(zs.Rongyun.historyMessagesCache);
							plus.device.beep(1);							
							date1 = new Date();//重置起始时间
							for (var i in pages) {
							zs.d(pages[i]);
							
							var detailPage = plus.webview.getWebviewById(pages[i]);
							if (pages[i] == 'contacts_msg') {
								zs.Rongyun.getConversationList(pages[i], function(result, from_id) {
									var detailPage = plus.webview.getWebviewById(from_id);
									mui.fire(detailPage, 'resh', {
										list: result
									});
									zs.d(11);
								});
							} else if (pages[i] == 'chat') {
								var result = new Array();
								result.push(message);											
								mui.fire(detailPage, 'add', {
									list: result
								});
							} else {
								mui.fire(detailPage, 'resh', {});
							}
						}
						}
						
					})
				}
			});
			//链接融云
			RongIMClient.connect(token, {
				onSuccess: function(userId) {
					zs.d("Login successfully." + userId);
					RongIMClient.getInstance().getConversationList({
						onSuccess: function(list) {
							zs.Conversation.setConversations(list);						
							zs.Conversation.setHistory(zs.Rongyun.historyMessagesCache);							
						},
						onError: function(error) {

						}
					}, null);
				},
				onTokenIncorrect: function() {
					zs.d('token无效');
				},
				onError: function(errorCode) {
					var info = '';
					switch (errorCode) {
						case RongIMLib.ErrorCode.TIMEOUT:
							info = '超时';
							break;
						case RongIMLib.ErrorCode.UNKNOWN_ERROR:
							info = '未知错误';
							break;
						case RongIMLib.ErrorCode.UNACCEPTABLE_PaROTOCOL_VERSION:
							info = '不可接受的协议版本';
							break;
						case RongIMLib.ErrorCode.IDENTIFIER_REJECTED:
							info = 'appkey不正确';
							break;
						case RongIMLib.ErrorCode.SERVER_UNAVAILABLE:
							info = '服务器不可用';
							break;
					}
					zs.d(errorCode);
				}
			});
		},
		/* 获取在线状态
		 * 
		 * */
		get_status: function(user_id) {			
			var params = {
				user_id: user_id
			};
			zs.Api.post("rongyun", "get_user_status", params, function(result) {
				return result.data.status
			})
		},
		/*
		 *  断线重连
		 */
		reconnect: function(callback) {
			var cls = this;
			 RongIMClient.reconnect({
 				 onSuccess:function(){
		  			var pages = zs.pages;
		  			for (var i in pages) {
							zs.toast(pages[i]);
							var detailPage = plus.webview.getWebviewById(pages[i]);
							if (pages[i] == 'contacts_msg') {
								zs.Rongyun.getConversationList(pages[i], function(result, from_id) {
									var detailPage = plus.webview.getWebviewById(from_id);
									mui.fire(detailPage, 'resh', {
										list: result
									});
								zs.toast('重连成功');
								});
							}else if (pages[i] == 'chat') {
								mui.fire(detailPage, 'resh', {
									list: zs.Rongyun.historyMessagesCache[1 + "_" + zs.Rongyun.currentConversationTargetId],
									page:1
								});
							}else {
								mui.fire(detailPage, 'resh', {});
							}
						}
		  			callback();
				 },		
				 onError:function(){
				 	zs.d('重连失败');
		 				
		 		}		
		 	});
		},
		/*
		 *  获取会话列表
		 */
		getConversationList: function(from_id, callback) {
			var cls = this;
			RongIMClient.getInstance().getConversationList({
				onSuccess: function(list) {
					zs.Conversation.setConversations(list);
					zs.d(JSON.stringify(list));
					callback(list, from_id);
					/*zs.Rongyun.historyMessagesCache =zs.Conversation.getHistory();				
					for (var i in list) {
						if (!zs.Rongyun.historyMessagesCache[list[i].conversationType+ "_" + list[i].targetId]) {
							zs.Rongyun.historyMessagesCache[list[i].conversationType+ "_" + list[i].targetId] = [];
						}
						zs.d(list[i].targetId);
						RongIMLib.RongIMClient.getInstance().getRemoteHistoryMessages(parseInt(list[i].conversationType), list[i].targetId, null, 20, {
							onSuccess: function(lists, hasMsg) {
								zs.toast(hasMsg);
								if (hasMsg == true) {								
									zs.Rongyun.historyMessagesCache[list[i].conversationType+ "_" + list[i].targetId] = lists;
									zs.Conversation.setHistory(zs.Rongyun.historyMessagesCache);	
								}else{								
									zs.Rongyun.historyMessagesCache[list[i].conversationType+ "_" + list[i].targetId] = [];
									zs.Conversation.setHistory(zs.Rongyun.historyMessagesCache);
								}
								zs.d(list[i].conversationType + "_" + list[i].targetId+'///  '+zs.Rongyun.historyMessagesCache[list[i].conversationType + "_" + list[i].targetId].length);
								//list 历史消息数组，hasMsg为boolean值，如果为true则表示还有剩余历史消息可拉取，为false的话表示没有剩余历史消息可供拉取。
							},
							onError: function(error) {
								zs.d('获取历史消息失败');
							}
						});
					}*/
					
				},
				onError: function(error) {

				}
			}, null);
		},
		/*
		 *  表情转文字
		 */
		emojiToSymbol: function(content, callback) {
			var cls = this;
			var str = RongIMLib.RongIMEmoji.emojiToSymbol(content);
			callback(str);
		},
		/*
		 *  获取全部表情
		 */
		getemojis: function(from_id, callback) {
			var emojis = RongIMLib.RongIMEmoji.emojis;
			if (zs.Rongyun.all_emojis.length == 0) {
				for (var i in emojis) {
					zs.Rongyun.all_emojis.push(emojis[i].innerHTML);
				}
			}
			callback(from_id, zs.Rongyun.all_emojis);
		},
		/* 获取单个会话
		 * 
		 * */
		getConversation: function(conversationType, currentConversationTargetId) {

			RongIMClient.getInstance().getConversation(conversationType, currentConversationTargetId, {
				onSuccess: function(conver) {					
					return conver;					
				},
				onError: function(error) {
					//失败
				}
			});
		},
		/* 清除未读消息
		 * 
		 * */
		clearMessages: function(conversationType, currentConversationTargetId, callback) {

			RongIMClient.getInstance().clearMessages(conversationType, currentConversationTargetId, {
				onSuccess: function(isClear) {
					callback();
					// isClear true 清除成功 ， false 清除失败
				},
				onError: function() {
					//清除遇到错误。
				}
			});
		},
		/* 指定清除本地会话中的未读消息状态
		 * 
		 * */
		clearMessagesUnreadStatus: function(conversationType, currentConversationTargetId, callback) {

			RongIMClient.getInstance().clearMessagesUnreadStatus(conversationType, currentConversationTargetId, {
				onSuccess: function(isClear) {
					RongIMClient.getInstance().clearUnreadCount(conversationType, currentConversationTargetId, {
						onSuccess: function(isClear) {
							//zs.d(isClear);

						},
						onError: function() {}
					});
					callback();
					// isClear true 清除成功 ， false 清除失败
				},
				onError: function() {
					//清除遇到错误。
				}
			});
		},
		/* 获取未读消息数
		 * 
		 * */
		getUnreadCount: function(conversationType, currentConversationTargetId) {
			RongIMLib.RongIMClient.getInstance().getUnreadCount(conversationType, currentConversationTargetId, {
				onSuccess: function(count) {
					zs.d(count);
					// count => 指定会话的总未读数。
				},
				onError: function() {
					// error => 获取指定会话未读数错误码。
				}
			});
		},
		/* 获取链接状态
		 * 
		 * */
		getCurrentConnectionStatus: function(callback) {
			var connectStatus = RongIMClient.getInstance().getCurrentConnectionStatus();
			callback(connectStatus)
		},
		/* 获取历史消息
		 * 
		 * */
		getRemoteHistoryMessages: function(page,from_id, conversationType, currentConversationTargetId, count, callback) {
			var cls = this;
			zs.Rongyun.historyMessagesCache =zs.Conversation.getHistory();
			zs.Rongyun.currentConversationTargetId = currentConversationTargetId;			
			if (!zs.Rongyun.historyMessagesCache[conversationType + "_" + currentConversationTargetId]) {
				zs.Rongyun.historyMessagesCache[conversationType + "_" + currentConversationTargetId] = [];
			}
			if(page >1){
				RongIMLib.RongIMClient.getInstance().getRemoteHistoryMessages(parseInt(conversationType), currentConversationTargetId, null, count, {
					onSuccess: function(list, hasMsg) {
							for (var i = 0; i < list.length; i++) {
								zs.Rongyun.historyMessagesCache[conversationType + "_" + currentConversationTargetId].splice(0, 0, list[i]);  
								//zs.Rongyun.historyMessagesCache[conversationType + "_" + currentConversationTargetId].push(list[i]);									
							}
							zs.Conversation.setHistory(zs.Rongyun.historyMessagesCache);
							callback(hasMsg,from_id, zs.Rongyun.historyMessagesCache[conversationType + "_" + currentConversationTargetId], conversationType, currentConversationTargetId);
						
						
						//list 历史消息数组，hasMsg为boolean值，如果为true则表示还有剩余历史消息可拉取，为false的话表示没有剩余历史消息可供拉取。
					},
					onError: function(error) {
						zs.d('获取历史消息失败');
					}
				});
			}else{								
				if (zs.Rongyun.historyMessagesCache[conversationType + "_" + currentConversationTargetId].length == 0) {
					RongIMLib.RongIMClient.getInstance().getRemoteHistoryMessages(parseInt(conversationType), currentConversationTargetId, null, count, {
						onSuccess: function(list, hasMsg) {						
							//if (hasMsg == true) {								
								zs.Rongyun.historyMessagesCache[conversationType + "_" + currentConversationTargetId] = list;
								//alert(zs.Rongyun.historyMessagesCache[conversationType + "_" + currentConversationTargetId].length );
								zs.Conversation.setHistory(zs.Rongyun.historyMessagesCache);
								callback(hasMsg,from_id, list, conversationType, currentConversationTargetId);
							/*}else{								
								zs.Rongyun.historyMessagesCache[conversationType + "_" + currentConversationTargetId] = [];
								zs.Conversation.setHistory(zs.Rongyun.historyMessagesCache);
							}	*/			
							//list 历史消息数组，hasMsg为boolean值，如果为true则表示还有剩余历史消息可拉取，为false的话表示没有剩余历史消息可供拉取。
						},
						onError: function(error) {
							zs.d('获取历史消息失败');
						}
					});
				} else {
					callback(1,from_id, zs.Rongyun.historyMessagesCache[conversationType + "_" + currentConversationTargetId], conversationType, currentConversationTargetId);
				}
			}
			
		},

		/* 获取所有会话的未读消息
		 * 
		 * */
		getTotalUnreadCount: function() {
			RongIMClient.getInstance().getTotalUnreadCount({
				onSuccess: function(count) {
					zs.d("count:" + count);
				},
				onError: function(error) {}
			});
		}
	});
}(mui, zs, window, document);