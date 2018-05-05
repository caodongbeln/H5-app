/*!
 * =====================================================
 * zs v1.0.0 ()
 * =====================================================
 */
!
function(mui, zs) {
	zs.Print_toolsPage = zs.UserPage.extend({
		currentDate: null,
		initConfig: function() {},
		initPage: function() {
			mui.plusReady(function() {
				var now = new Date().getTime() / 1000;
				now = Math.floor(now / 24 / 3600) * 24 * 3600; //取得今天0点的时间戳；
				var dates = Array();
				var weeks = Array();
				var times = Array();
				for(var i = 0; i < 7; i++) {
					times[i] = now - (6 - i) * 3600 * 24;
					dates[i] = date('d', times[i]);
					weeks[i] = date('l', times[i]);
				}
				zs.template('content', 'dates', {
					dates: dates,
					weeks: weeks,
					times: times
				}, 'prepend');
			});
		},
		initEvent: function() {
			var cls=this;
			mui.plusReady(function() {
				var opener = plus.webview.currentWebview().opener();
				document.getElementById('bofang').addEventListener('tap', function() {
					$('#bofang').hide();
					$('#zanting').show();
					opener && mui.fire(opener, 'start');
				});
				document.getElementById('zanting').addEventListener('tap', function() {
					$('#bofang').show();
					$('#zanting').hide();
					opener && mui.fire(opener, 'stop');
				});
				document.getElementById('slowDown').addEventListener('tap', function() {
					opener && mui.fire(opener, 'slowDown');
				});
				document.getElementById('speedUp').addEventListener('tap', function() {
					opener && mui.fire(opener, 'speedUp');
				});

				mui('#content').on("tap", '#dates li', function() {
					if(this.children[0].classList.contains("positioning-xuanzhong")) return;
					$('#dates li span').removeClass("positioning-xuanzhong");
					this.children[0].classList.add("positioning-xuanzhong");
					opener && mui.fire(opener, 'reTrack', {
						start: this.getAttribute('data-time')
					});
				});
				window.addEventListener("stop", function() {
					$('#bofang').show();
					$('#zanting').hide();
				});
				window.addEventListener("play", function(event) {
					var loc = event.detail;
					if(!loc) return;
					$('#current').text(date('y-m-d H:i:s', loc.atime));
					var mDate = date('d', loc.atime);
					if(mDate != cls.currentDate) {
						$('#dates li span').removeClass("positioning-xuanzhong");
						zs.d(mDate +"!="+ cls.currentDate);
						document.getElementById("id"+mDate).classList.add("positioning-xuanzhong");
						cls.currentDate=mDate;
					} 
				});
			});
		}
	});
}(mui, zs);