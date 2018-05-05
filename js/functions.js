/** 
 * 和PHP一样的时间戳格式化函数 
 * @param {string} format 格式 
 * @param {int} timestamp 要格式化的时间 默认为当前时间 
 * @return {string}   格式化的时间字符串 
 */
function date(format, timestamp) {
	var a, jsdate = ((timestamp) ? new Date(timestamp * 1000) : new Date());
	var pad = function(n, c) {
		if ((n = n + "").length < c) {
			return new Array(++c - n.length).join("0") + n;
		} else {
			return n;
		}
	};
	//var txt_weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	var txt_weekdays = ["日", "一", "二", "三", "四", "五", "六"];
	var txt_ordin = {
		1: "st",
		2: "nd",
		3: "rd",
		21: "st",
		22: "nd",
		23: "rd",
		31: "st"
	};
	//var txt_months = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	var txt_months = ["", "1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];
	var f = {
		// Day 
		d: function() {
			return pad(f.j(), 2)
		},
		D: function() {
			return f.l().substr(0, 3)
		},
		j: function() {
			return jsdate.getDate()
		},
		l: function() {
			return txt_weekdays[f.w()]
		},
		N: function() {
			return f.w() + 1
		},
		S: function() {
			return txt_ordin[f.j()] ? txt_ordin[f.j()] : 'th'
		},
		w: function() {
			return jsdate.getDay()
		},
		z: function() {
			return (jsdate - new Date(jsdate.getFullYear() + "/1/1")) / 864e5 >> 0
		},

		// Week 
		W: function() {
			var a = f.z(),
				b = 364 + f.L() - a;
			var nd2, nd = (new Date(jsdate.getFullYear() + "/1/1").getDay() || 7) - 1;
			if (b <= 2 && ((jsdate.getDay() || 7) - 1) <= 2 - b) {
				return 1;
			} else {
				if (a <= 2 && nd >= 4 && a >= (6 - nd)) {
					nd2 = new Date(jsdate.getFullYear() - 1 + "/12/31");
					return date("W", Math.round(nd2.getTime() / 1000));
				} else {
					return (1 + (nd <= 3 ? ((a + nd) / 7) : (a - (7 - nd)) / 7) >> 0);
				}
			}
		},

		// Month 
		F: function() {
			return txt_months[f.n()]
		},
		m: function() {
			return pad(f.n(), 2)
		},
		M: function() {
			return f.F().substr(0, 3)
		},
		n: function() {
			return jsdate.getMonth() + 1
		},
		t: function() {
			var n;
			if ((n = jsdate.getMonth() + 1) == 2) {
				return 28 + f.L();
			} else {
				if (n & 1 && n < 8 || !(n & 1) && n > 7) {
					return 31;
				} else {
					return 30;
				}
			}
		},

		// Year 
		L: function() {
			var y = f.Y();
			return (!(y & 3) && (y % 1e2 || !(y % 4e2))) ? 1 : 0
		},
		//o not supported yet 
		Y: function() {
			return jsdate.getFullYear()
		},
		y: function() {
			return (jsdate.getFullYear() + "").slice(2)
		},

		// Time 
		a: function() {
			return jsdate.getHours() > 11 ? "pm" : "am"
		},
		A: function() {
			return f.a().toUpperCase()
		},
		B: function() {
			// peter paul koch: 
			var off = (jsdate.getTimezoneOffset() + 60) * 60;
			var theSeconds = (jsdate.getHours() * 3600) + (jsdate.getMinutes() * 60) + jsdate.getSeconds() + off;
			var beat = Math.floor(theSeconds / 86.4);
			if (beat > 1000) beat -= 1000;
			if (beat < 0) beat += 1000;
			if ((String(beat)).length == 1) beat = "00" + beat;
			if ((String(beat)).length == 2) beat = "0" + beat;
			return beat;
		},
		g: function() {
			return jsdate.getHours() % 12 || 12
		},
		G: function() {
			return jsdate.getHours()
		},
		h: function() {
			return pad(f.g(), 2)
		},
		H: function() {
			return pad(jsdate.getHours(), 2)
		},
		i: function() {
			return pad(jsdate.getMinutes(), 2)
		},
		s: function() {
			return pad(jsdate.getSeconds(), 2)
		},
		//u not supported yet 

		// Timezone 
		//e not supported yet 
		//I not supported yet 
		O: function() {
			var t = pad(Math.abs(jsdate.getTimezoneOffset() / 60 * 100), 4);
			if (jsdate.getTimezoneOffset() > 0) t = "-" + t;
			else t = "+" + t;
			return t;
		},
		P: function() {
			var O = f.O();
			return (O.substr(0, 3) + ":" + O.substr(3, 2))
		},
		//T not supported yet 
		//Z not supported yet 

		// Full Date/Time 
		c: function() {
			return f.Y() + "-" + f.m() + "-" + f.d() + "T" + f.h() + ":" + f.i() + ":" + f.s() + f.P()
		},
		//r not supported yet 
		U: function() {
			return Math.round(jsdate.getTime() / 1000)
		}
	};
	//return format.replace(/[\]?([a-zA-Z])/g, "");
	return format.replace(/([a-zA-Z])/g, function(t, s) {
		if (t != s) {
			// escaped 
			ret = s;
		} else if (f[s]) {
			// a date function exists 
			ret = f[s]();
		} else {
			// nothing special 
			ret = s;
		}
		return ret;
	});
	/*

	 * */
}
// dis : 距离数，
//返回值： 如果超出1000米，返回千米数，保留一位小数；如果小于1000，返回米，无小数位；
function getShortDis(dis) {
	if (dis > 1000) {
		dis = dis / 1000;
		return dis.toFixed(1) + "千米";
	}
	return dis.toFixed(0) + '米';
}

// atime :时间戳 
//返回值： 60s内返回 xxs前，大于1分钟小于1小时内返回 yy分钟前；1小时前 且在今天返回具体时间；本年度不包含年份；今年之前的返回包含年份；
function getShortTime(atime) {
	var time = new Date().getTime() / 1000;
	time = time.toFixed(0)
	if (time - atime < 60) {
		return (time - atime) + "秒前";
	} else if (time - atime < 3600) {
		var interval = (time - atime) / 60;
		return interval.toFixed(0) + "分钟前";
	} else if (date('Y-m-d', atime) == date('Y-m-d', time)) {
		return date('H:i', atime);
	} else if (date('Y', atime) == date('Y', time)) {
		return date('m-d H:i', atime);
	}
	return date('Y-m-d H:i', atime);
}

function implode(arrs, field, separator) {
	separator = separator ? separator : ',';
	var result = "";
	if (arrs && arrs.length > 0) {
		for (var i = 0; i < arrs.length; i++) {
			result += separator + arrs[i][field];
		}
		if (result != '') {
			result = result.substr(separator.length);
		}
	}
	return result;
}