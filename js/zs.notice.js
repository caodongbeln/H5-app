/*!
 * =====================================================
 * zs v1.0.0 ()
 * =====================================================
 */
!
function(mui, zs, win, doc) { //扩展
	zs.NoticeClass = mui.Class.extend({
		cache_key: "NOTICE_LIST",
		cache_log_key: "NOTICE_LOG_LIST",
		task_log_key: "TASK_LOG_LIST",
		getsFromNet: function(succ, err) {
			var cls=this;
			zs.Api.post('notice', 'lists', {
				uid: zs.User.getUid()
			}, function(ret) {
				if (ret.status == 1 && ret.data) {
					list = ret.data;
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
			zs.Api.post('notice_msg', 'lists', {
				receiver: zs.User.getUid()
			}, function(ret) {
				if (ret.status == 1 && ret.data) {
					list = ret.data;
					zs.setItem(cls.cache_log_key, JSON.stringify(list));
					succ && succ(list);
				} else {
					err && err();
				}
			}, function() {
				err && err();
			});
		},
		getstasklogFromNet: function(succ, err) {
			var cls=this;
			zs.Api.post('task_log', 'lists', {
				receiver: zs.User.getUid()
			}, function(ret) {
				if (ret.status == 1 && ret.data) {
					list = ret.data;
					zs.setItem(cls.task_log_key, JSON.stringify(list));
					succ && succ(list);
				} else {
					err && err();
				}
			}, function() {
				err && err();
			});
		},
		gets_tasklog: function() {
			var items = zs.getItem(this.task_log_key);
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
		get: function(id) {
			var items = this.gets();
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