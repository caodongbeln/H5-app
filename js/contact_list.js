/*!
 * =====================================================
 * zs v1.0.0 ()
 * =====================================================
 */
!
function(mui, zs) {
	zs.ContactslistPage = zs.UserPage.extend({
		initConfig: function() {},
		initPage: function() {

		},
		initEvent: function() {
			mui.plusReady(function() {
				mui(document.body).on("tap", "[data-add]", function() {
					var data_id = this.getAttribute("data-id");
					$(this).html('等待验证');
					$(this).removeClass("fuceng-qianwang");
					zs.Api.post('invite', 'add', {
						fid: data_id, //好友id
						uid: zs.User.isLogin(), //用户id
						source: 3
					}, function(result) {
						if(result.status == 1) {
							zs.toast( "申请成功");													
						}						
					})
				})
				$("#search").bind("input propertychange", function() {
					//alert($('.mui-input-clear').val());
					zs.Api.post('contacts', 'lists', {
						mobile: $('.mui-input-clear').val(),
						uid: zs.User.isLogin() //用户id
					}, function(result) {
						if(result.status == 1) {
							zs.template('contacts_list', 'contacts_list', {
								list: result.data
							});
						}
					});
				});
				plus.contacts.getAddressBook(plus.contacts.ADDRESSBOOK_PHONE, function(addressbook) {
					addressbook.find(null, function(contacts) {
						plus.nativeUI.showWaiting("检测更新...");
						setTimeout(function() {
							zs.Api.post('contacts', 'edit', {
								uid: zs.User.isLogin(),
								data: JSON.stringify(contacts)
							}, function(result) {
								if(result.status == 1) {
									if(!result.data){
										zs.toast('没有通讯录好友~');
										return;
									}
									zs.template('contacts_list', 'contacts_list', {
										list: result.data
									}, 'append');
								}
								plus.nativeUI.closeWaiting();
							})
						}, 1000);
					}, function() {
						//alert("error");
					}, {
						multiple: true
					});
				}, function(e) {
					//alert( "Get address book failed: " + e.message );
				});
			});
		},
	});
}(mui, zs)