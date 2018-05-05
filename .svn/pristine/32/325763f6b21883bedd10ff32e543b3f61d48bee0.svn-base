/*!
 * =====================================================
 * zs v1.0.0 ()
 * =====================================================
 */
!
function(mui, zs) {
	zs.Location_RemindPage = zs.UserPage.extend({
		initConfig: function() {
			if (!zs.Remind) zs.Remind = new zs.RemindClass;
		},
		initPage: function() {
			var cls = this;
			mui.plusReady(function() {
				var open = ['index', 'contacts', 'surrounding_dynamic', 'my'];
					setTimeout(function() {								
						for(var i = 0; i < open.length; i++) {
						
							var detailPage = plus.webview.getWebviewById(open[i]);
							mui.fire(detailPage, 'resh', {});
						}						
					}, 200);
				mui(document.body).on('tap', '.mui-btn', function(event) {
					var elem = this;
					var li = elem.parentNode.parentNode;
					var data_id = elem.getAttribute("data-id");
					var data_type  = elem.getAttribute("data-type");
					var data_rid  = elem.getAttribute("data-rid");
					var data_receiver  = elem.getAttribute("data-receiver");
					if(data_type ==2){
						mui.confirm('确认屏蔽该好友的位置提醒？', '屏蔽', li, function(e) {
							if (e.index == 0) {
								
								zs.Api.post('remind_msg', 'disable', {
									receiver: data_receiver,
									rid: data_rid									
								}, function(ret) {								
									if (ret.status == 1) {										
										zs.toast('屏蔽成功');
										li.parentNode.removeChild(li);
									} 
								},function(ret) {																			
									zs.toast('该好友已屏蔽');
								});								
							} else {
								setTimeout(function() {
									mui.swipeoutClose(li);
								}, 0);
							}
						});
					}else{
						if(data_rid >0){
							zs.open('../tpl/editRemind.html','editRemind',{data_id:data_rid},'');
						}else{
							zs.toast('该好友已屏蔽');
						}
					}
					
				});
				var list = zs.Remind.gets_log();
				list && cls.renderList(list);				
				zs.Remind.gets_logFromNet(function(list) {					
					cls.renderList(list);
				}, function() {
					
					cls.renderList(null);
				});
			})
		},
		initEvent: function() {},
		renderList: function(list) {			
			if (list != null && list !=undefined && list !='') {
				for (var i = 0; i < list.length; i++) {
					list[i].ctime = getShortTime(list[i].atime);
				}				
			}else{
				var noResults = '<div class="no-result">暂无添加提醒~</div>';
				$('#remind_content').append(noResults);
			}	
			
			zs.template('OA_task_1', 'remind_content', {
				list:list
			});
		},
	});
}(mui, zs);