document.addEventListener("plusready", function() {
	// 声明的JS“扩展插件别名”
	var clsName = 'ZlocPlugin',
		bridge = window.plus.bridge;
	window.plus.zloc = {
		init: function(uid,userLocationUrl) {
			return bridge.execSync(clsName, "init", [uid,userLocationUrl]);
		},
		// 声明同步返回方法
		stop: function() {
			// 通知Native层plugintest扩展插件运行“PluginTestFunctionSync”方法并同步返回结果                       
			return bridge.execSync(clsName, "stop", []);
		},
		// 声明同步返回方法
		getUid: function() {
			// 通知Native层plugintest扩展插件运行“PluginTestFunctionSync”方法并同步返回结果                       
			return bridge.execSync(clsName, "getUid", []);
		},
		// 声明异步返回方法
		get: function(succ, err) {
			var success = typeof succ !== 'function' ? null : function(args) {
					succ(args);
				},
				fail = typeof err !== 'function' ? null : function(code) {
					err(code);
				};
			var callbackID = bridge.callbackId(success, fail);
			// 通知Native层plugintest扩展插件运行”PluginTestFunction”方法
			return bridge.exec(clsName, "get", [callbackID]);
		},
		watch: function(succ, err) {
			var success = typeof succ !== 'function' ? null : function(args) {
					succ(args);
				},
				fail = typeof err !== 'function' ? null : function(code) {
					err(code);
				};
			var callbackID = bridge.callbackId(success, fail);
			return bridge.exec(clsName, "watch", [callbackID]);
		}
	};
}, true);