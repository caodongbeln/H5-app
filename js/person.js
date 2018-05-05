/*!
 * =====================================================
 * zs v1.0.0 ()
 * =====================================================
 */
!
function(mui, zs) {
	zs.PersonPage = zs.UserPage.extend({
		initPage: function() {
			var cls = this;
			mui.plusReady(function() {
				var pamas = {
					uid:zs.User.isLogin()
				}
				zs.Api.post('user', 'info', pamas, function(info) {
					var len = info.data.back_cover.length;
					for(var i=0;i<len;i++) {
						zs.d(info.data.back_cover[i])
						var li = '<li><div class=""><img src="../images/cover.png" data-src="info.data.back_cover[i]" data-css='a50'/></div></li>'
						$('.General_lighting').prepend(li);
					}
					document.getElementById('tel').value=info.data.mobile;
					document.getElementById('nick').innerHTML=info.data.username;
					if(info.data.gender == 0) {
						$("#gender option[value='female']").attr("selected","selected");
					}else{
						$("#gender option[value='male']").attr("selected","selected");
					}
					if(info.data.birth != null){
						document.getElementById('data').innerHTML=info.data.birth
					}else{
						document.getElementById('data').innerHTML='未设置'
					}
					if(info.data.work_unit != null){
						document.getElementById('job').innerHTML=info.data.work_unit
					}else{
						document.getElementById('job').innerHTML='未设置'
					}
					if(info.data.work_addr != null){
						document.getElementById('job_addr').innerHTML=info.data.work_addr
					}else{
						document.getElementById('job_addr').innerHTML='未设置'
					}
					if(info.data.living_addr != null){
						document.getElementById('live').innerHTML=info.data.living_addr
					}else{
						document.getElementById('live').innerHTML='未设置'
					}
					if(info.data.often_addr != null){
						document.getElementById('see').innerHTML=info.data.often_addr
					}else{
						document.getElementById('see').innerHTML='未设置'
					}
					if(info.data.hobby.movie == null){
						document.getElementById('movie').value = ''
					}else{
						document.getElementById('movie').value=info.data.hobby.movie;	
					}
					if(info.data.hobby.book == null){
						document.getElementById('book').value = ''
					}else{
						document.getElementById('book').value=info.data.hobby.book;
					}
					if(info.data.hobby.music == null){
						document.getElementById('music').value='';
					}else{
						document.getElementById('music').value=info.data.hobby.music;
					}
					if(info.data.mood == null){
						document.getElementById('mood').value='';
					}else{
						document.getElementById('mood').value=info.data.mood;
					}
					if(info.data.is_show == 0){
						document.getElementById('seLshow').className = 'mui-switch mui-switch-blue mui-pull-right';
					}else{
						document.getElementById('seLshow').className = 'mui-switch mui-switch-blue mui-pull-right mui-active kaiguan';
					}
				});
			})
		},
		initEvent: function() {
//			点击修改昵称
			document.getElementById("promptBtn").addEventListener('tap', function(e) {
				e.detail.gesture.preventDefault(); //修复iOS 8.x平台存在的bug，使用plus.nativeUI.prompt会造成输入法闪一下又没了
				var btnArray = ['取消', '确定'];
				mui.prompt('修改昵称','','',btnArray, function(e) {
					if (e.index == 1 && e.value != '') {
						nick.innerText = e.value;
					} else {
						
					}
				})
			});
//			点击修改工作单位
			document.getElementById("seLjob").addEventListener('tap', function(e) {
				e.detail.gesture.preventDefault(); //修复iOS 8.x平台存在的bug，使用plus.nativeUI.prompt会造成输入法闪一下又没了
				var btnArray = ['取消', '确定'];
				mui.prompt('工作单位','','',btnArray, function(e) {
					if (e.index == 1 && e.value != '') {
						job.innerText = e.value;
					} else {
						
					}
				})
			});
			//点击修改工作地点
			document.getElementById("seLaddr").addEventListener('tap', function(e) {
				e.detail.gesture.preventDefault(); //修复iOS 8.x平台存在的bug，使用plus.nativeUI.prompt会造成输入法闪一下又没了
				var btnArray = ['取消', '确定'];
				mui.prompt('工作地点','','',btnArray, function(e) {
					if (e.index == 1 && e.value != '') {
						job_addr.innerText = e.value;
					} else {
						
					}
				})
			});
			//点击修改生活地点
			document.getElementById("seLlive").addEventListener('tap', function(e) {
				e.detail.gesture.preventDefault(); //修复iOS 8.x平台存在的bug，使用plus.nativeUI.prompt会造成输入法闪一下又没了
				var btnArray = ['取消', '确定'];
				mui.prompt('生活地点','','',btnArray, function(e) {
					if (e.index == 1 && e.value != '') {
						live.innerText = e.value;
					} else {
						
					}
				})
			});
			//点击修改常出没地
			document.getElementById("seLsee").addEventListener('tap', function(e) {
				e.detail.gesture.preventDefault(); //修复iOS 8.x平台存在的bug，使用plus.nativeUI.prompt会造成输入法闪一下又没了
				var btnArray = ['取消', '确定'];
				mui.prompt('常出没地','','',btnArray, function(e) {
					if (e.index == 1 && e.value != '') {
						see.innerText = e.value;
					} else {
						
					}
				})
			});
			document.getElementById("save").addEventListener('tap', function() {
						var gender = $("#gender  option:selected").text();
						if(gender == '男'){
							var sex = 1
						}else{
							var sex = 0
						}
						var parm = {
						id:zs.User.isLogin(),
						username:document.getElementById('nick').innerHTML,
						movie:document.getElementById('movie').value,
						book:document.getElementById('book').value,
						music:document.getElementById('music').value,
						work_unit:document.getElementById('job').innerHTML,
						birth:document.getElementById('data').innerText,
						mobile:document.getElementById('tel').value,
						mood:document.getElementById('mood').value,
						gender:sex,
						work_addr:document.getElementById('job_addr').innerHTML,
						living_addr:document.getElementById('live').innerHTML,
						often_addr:document.getElementById('see').innerHTML,
						is_show:window.isShow
					}
					zs.Api.post('user', 'edit', parm, function() {
						zs.toast('修改成功~')
					})
			})
			document.getElementById("confirmBtn").addEventListener('tap', function() {
				var btnArray = ['取消', '确定'];
				mui.confirm('对方也可以看到你的位置,是否继续？', '要求好友公开位置', btnArray, function(e) {
					if (e.index == 1) {
						mui.alert('对方同意公开位置后,你可以查看它的位置', '申请成功', function() {
						});
					}
				})
			});
			document.getElementById("pickDateBtn").addEventListener('tap', function() {
				var dDate = new Date();
				dDate.setFullYear(2014, 7, 16);
				var minDate = new Date();
				minDate.setFullYear(2010, 0, 1);
				var maxDate = new Date();
				maxDate.setFullYear(2016, 11, 31);
				plus.nativeUI.pickDate(function(e) {
					var d = e.date;
					data.innerText = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
				}, function(e) {
					data.innerText = "您没有选择日期";
				}, {
					title: "请选择日期",
					date: dDate,
					minDate: minDate,
					maxDate: maxDate
				});
			})
			mui('.mui-content .mui-switch').each(function() { //循环所有toggle
				this.addEventListener('toggle', function(event) {
//					可直接获取当前状态
					if(event.detail.isActive){
						window.isShow = 1;
//						@Tocheck 解决默认打开页面开关位置问题
						document.getElementById('seLshow').className = 'mui-switch mui-switch-blue mui-pull-right mui-active';
						zs.toast('已开启');
					}else{
						window.isShow = 0;
//						@Tocheck 解决默认打开页面开关位置问题
						document.getElementById('seLshow').className = 'mui-switch mui-switch-blue mui-pull-right';
						zs.toast('已关闭');
					}
				});
			});
		},
	});
}(mui, zs);