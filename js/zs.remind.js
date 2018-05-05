/*!
 * =====================================================
 * zs v1.0.0 ()
 * =====================================================
 */
!
function(mui, zs, win, doc) { //扩展
	zs.RemindClass = mui.Class.extend({
		cache_key: "REMIND_LIST",
		cache_log_key: "REMIND_LOG_LIST",
		getsFromNet: function(succ, err) {
			var cls=this;
			zs.Api.post('remind', 'lists', {
				uid: zs.User.getUid()
			}, function(ret) {
				if (ret.status == 1 && ret.data) {
					list = ret.data;
					for (var i = 0; i < list.length; i++) {
						if (list[i].remind_msg) {
							list[i].remind_msg[0].atime = getShortTime(list[i].remind_msg[0].atime);
						}
					}
					zs.setItem(cls.cache_key, JSON.stringify(list));
					succ && succ(list);
				} else {
					err && err();
				}
			}, function() {
				err && err();
			});
		},
		gets_logFromNet: function(succ, err) {
			var cls=this;
			zs.Api.post('remind_msg', 'lists', {
				receiver: zs.User.getUid()
			}, function(ret) {
				
				if (ret.status == 1 && ret.data) {
					list = ret.data;
					for (var i = 0; i < list.length; i++) {
						if (list[i].remind_msg) {
							list[i].remind_msg[0].atime = getShortTime(list[i].remind_msg[0].atime);
						}
					}
					zs.setItem(cls.cache_log_key, JSON.stringify(list));				
					succ && succ(list);
				} else {
					err && err();
				}
			}, function() {
				err && err();
			});
		},
		gets: function() {
			var items = zs.getItem(this.cache_key);
			if (items)
				try {
					return JSON.parse(items)
				} catch (err) {
					return !1
				}
			return !1
		},
		gets_log: function() {
			var items = zs.getItem(this.cache_log_key);
			if (items)
				try {
					return JSON.parse(items)
				} catch (err) {
					return !1
				}
			return !1
		},
		get: function(id) {
			var items = this.gets();
			zs.d(JSON.stringify(items));
			if (items) {
				for (var i = 0; i < items.length; i++) {
					if (id == items[i]['id']) {
						return items[i];
					}
				}
			}
			return false;
		}
	})
}(mui, zs, window, document)