window.audio = {
	doc_dir: "_doc/audio/",
	recorder: null,
	timer: null,
	len: 0,
	player: null,
	dir: '',
	init: function() {
		if (window.plus) {
			// 获取音频目录对象
			plusReady();
		} else {
			document.addEventListener("plusready", plusReady, false);
		}
		var cls = this;

		function plusReady() {
			// 获取音频目录对象
			plus.io.resolveLocalFileSystemURL("_doc/", function(entry) {
				entry.getDirectory("audio", {
					create: true
				}, function(dir) {
					cls.dir = dir;
				}, function(e) {
					zs.d("Get directory \"audio\" failed: " + e.message);
				});
			}, function(e) {
				zs.d("Resolve \"_doc/\" failed: " + e.message);
			});
		}
	},
	start: function(succ, proc, err) {
		//succ：录制成功回调
		//prco：录制过程回调，每秒钟一次
		//err：录制失败回调
		this.recorder = plus.audio.getRecorder();
		if (this.recorder == null) {
			zs.d("录音对象未获取");
			return;
		}
		this.recorder.record({
			filename: "_doc/audio/"
		}, function(ac) {
			succ && succ(ac);
		}, function(e) {
			zs.d(e.message);
			err && err(e);
		});
		if (proc) {
			this.timer = setInterval(function() {
				this.len++;
				proc(this.len);
			}, 1000);
		}
	},
	stop: function() {
		clearInterval(this.timer);
		this.timer = null;
		this.recorder.stop();
		this.recorder = null;
		this.len = 0;
	},
	play: function(url, succ, proc) {
		//url 音频文件地址；
		//播放成功时回调
		//播放过程中回调，输入为音频总长与已播放时长
		var cls = this;
		this.player = plus.audio.createPlayer(url);
		this.player.play(function() {
			// 播放完成
			succ && succ(this.len);
			cls.stopPlay(succ);
		}, function(e) {
			zs.d("播放音频文件\"" + url + "\"失败：" + e.message);
		});
		if (proc) {
			// 获取总时长
			this.len = this.player.getDuration();
			if (this.len) {
				proc(this.len, 0);
			}
			var cls = this;
			this.timer = setInterval(function() {
				if (!this.len) { // 兼容无法及时获取总时长的情况
					this.len = cls.player.getDuration();
				}
				var pos = cls.player.getPosition();
				if (!pos) { // 兼容无法及时获取当前播放位置的情况
					return;
				}
				proc(this.len, pos);
			}, 1000);
		}
	},
	// 停止播放
	stopPlay: function(succ) {
		clearInterval(this.timer);
		this.timer = null;
		succ && setTimeout(succ, 500);
		// 操作播放对象
		if (this.player) {
			this.player.stop();
			this.player = null;
		}
	},
	del: function(url, succ) {
		// 获取音频目录对象
		plus.io.resolveLocalFileSystemURL(url, function(entry) {
			entry.remove(function() { //删除成功
				zs.d("删除成功");
				succ && succ();
			});
		});
	},
	delAll: function(succ) {
		if (!this.dir) return;
		this.dir.removeRecursively(function() {
			// Success
			zs.d("操作成功！");
			succ && succ();
		}, function(e) {
			zs.d("操作失败：" + e.message);
		});
	},
}
audio.init();
window.audioPage = {
	options: {
		container: 'audio_container',
		record_init: {
			tpl: 'record_init',
			title: '录制',
		},
		record_started: {
			tpl: 'record_started',
			title: '录制中',
			op: '结束',
		},
		play_init: {
			tpl: 'play_init',
			title: '播放',
			op: '删除'
		},
		play_started: {
			tpl: 'play_started',
			title: '播放中',
			op: '停止'
		},
	},
	init: function(options) {
		//options:参数
		options && mui.extend(this.options, options);
	},
	initAudio: function(url,withOpt,uploadSucc) {
		if(url){
			this.initPlay(url,withOpt);
		}else{
			if(withOpt){
				this.initRecord(uploadSucc);
			}
		}
	},
	initRecord: function(succ) {
		//初始化录制操作
		var cls = this;
		zs.template(cls.options.container, this.options.record_init.tpl, this.options.record_init);
		mui(document.body).off("tap", "#audio_switch_ico_init");
		mui(document.body).on("tap", "#audio_switch_ico_init", function() {
			zs.template(cls.options.container, cls.options.record_started.tpl, cls.options.record_started);
			//开始录制
			audio.start(function(ac) {
				//录制成功
				cls.initPlay(ac, true);
				if (!zs.Audio) zs.Audio = new zs.fileClass('audio');
				zs.Audio.upload(ac, function(uri) {
					succ && succ(uri);
				});
			}, null, null);
			mui(document.body).off("tap", "#audio_opt_ico_started");
			mui(document.body).on("tap", "#audio_opt_ico_started", function() {
				audio.stop();
			});
		});
	},
	initPlay: function(url, withOpt) { //初始化播放操作
		//options:参数
		//withOpt：true 有删除权限，false：无删除权限 

		var cls = this;
		zs.template(cls.options.container, cls.options.play_init.tpl, this.options.play_init);		
		withOpt && this.showDelBtn(url);
		mui(document.body).off("tap", "#audio_switch_ico_play_init");
		mui(document.body).on("tap", "#audio_switch_ico_play_init", function() {
			zs.template(cls.options.container, cls.options.play_started.tpl, cls.options.play_started);
			withOpt && cls.showDelBtn(url);
			if (!zs.Audio) zs.Audio = new zs.fileClass('audio');
			zs.Audio.get(url, function(uri) {
				zs.d("url：uri"+url+":"+uri);
				audio.play(uri, function() {
					cls.initPlay(url, withOpt);
				});
			}, true);
			mui(document.body).off("tap", "#audio_switch_ico_play_started");
			mui(document.body).on("tap", "#audio_switch_ico_play_started", function() {
				audio.stopPlay(function() {
					zs.d("show stoplay");
					cls.initPlay(url, withOpt);
				});
			})
		});

	},
	showDelBtn: function(url) {
		var cls = this;	
		//zs.d(document.querySelector("#audio_opt_del"));
		document.querySelector("#audio_opt_del").style.display = 'block';
		document.querySelector("#audio_opt_title").style.display = 'block';
		mui(document.body).off("tap", "#audio_opt_del");
		mui(document.body).on("tap", "#audio_opt_del", function() {
			audio.stopPlay();
			cls.del(url);
		});
	},
	del: function(url) {
		var cls = this;
		zs.d("cache:::" + url);
		cache.getItem(url, function(ret) {
			zs.d("cache:::" + ret);
			audio.del(url, function() {
				zs.setItem('video','');
				cls.initRecord();
			});
		},function(){
			cls.initRecord();
		});
		cache.removeItem(url);
	},
	delAll: function(url) {
		var cls = this;
		audio.delAll(function() {
			zs.setItem('video','');
			cls.initRecord();
		});
	}
}