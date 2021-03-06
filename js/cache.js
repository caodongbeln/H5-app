/*!
 * Offline Cache Library v1.0.0
 *
 * Copyright (c) 2013 Tencent
 *
 * Date: 2013-05-21 17:42:16  (Wed, 21 May 2013)
 * Revision: 01
 */
(function(h) {
	var a = {
		code: {
			WEBSQL_ERR: 1,
			INDEXDB_ERR: 2,
			FILESYSTEM_ERR: 3,
			LOCALSTORAGE_ERR: 4,
			OUT_OF_MEMERY: 5,
			NO_RESULT: 6,
			UNKNOWN: 7
		},
		msg: {
			WEBSQL_ERR: "WebSQL error",
			INDEXDB_ERR: "IndexDB error",
			FILESYSTEM_ERR: "Filesystem error",
			LOCALSTORAGE_ERR: "Localstorage error",
			OUT_OF_MEMERY: "Out of memmory",
			NO_RESULT: "No result",
			UNKNOWN: "Unknow error"
		}
	};
	var g = {
		FILESYSTEM_NUM: 10,
		FILESYSTEM_SIZE: 50 * 1024 * 1024,
		WEBSQL_SIZE: 30 * 1024 * 1024
	};
	var j = location.pathname || "";
	var b = "ts";
	var c = window.requestFileSystem || window.webkitRequestFileSystem;
	var d = window.BlobBuilder || window.WebKitBlobBuilder;
	var i = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
	var f = {
		webSQL: {
			inited: false,
			defaultDBName: b + "_webSQL_db",
			defaultTableName: "webSQL_table"
		},
		fileSystem: {
			inited: false,
			defaultFileName: b + "_fileSystem_file",
			num: g.FILESYSTEM_NUM,
			cache: {},
			cacheBackup: {}
		},
		indexedDB: {
			inited: false,
			oldVersion: false,
			indexedDB: i,
			IDBTransaction: window.IDBTransaction || window.webkitIDBTransaction,
			IDBKeyRange: window.IDBKeyRange || window.webkitIDBKeyRange,
			defaultDBName: b + "_indexedDB_db",
			defaultTableName: "indexedDB_table"
		},
		supportWebSQL: !! (window.openDatabase),
		supportFileSystem: !! c,
		supportIndexedDB: !! i,
		localStorage: {}
	};

	function e(l) {
		if (typeof(l) != "object") {
			return l
		}
		if (l == null) {
			return l
		}
		var m = new Object();
		for (var k in l) {
			m[k] = e(l[k])
		}
		return m
	}
	f.webSQL.init = function(m, n) {
		var l = f.webSQL;
		l.dbName = l.defaultDBName;
		l.version = "1.0";
		l.displayName = l.defaultDBName;
		l.size = g.WEBSQL_SIZE;
		var k;
		try {
			k = openDatabase(l.dbName, l.version, l.displayName, l.size);
			if (!k) {
				f.supportWebSQL = false;
				f.webSQL.inited = false;
				n && n()
			} else {
				f.supportWebSQL = true;
				setTimeout(function() {
					l.createTable(l.defaultTableName);
					f.webSQL.inited = true;
					m && m()
				}, 17)
			}
		} catch (o) {
			k = undefined;
			f.supportWebSQL = false;
			f.webSQL.inited = false;
			n && n()
		}
		f.webSQL.db = k
	};
	f.webSQL.createTable = function(k, m) {
		k = "table_" + k;
		var l = "CREATE TABLE IF NOT EXISTS " + k + " ([key] TEXT  NOT NULL UNIQUE,[value] TEXT  NOT NULL)";
		f.webSQL.db && f.webSQL.db.transaction(function(n) {
			n.executeSql(l, [], function() {
				m && m()
			}, function() {})
		})
	};
	f.webSQL.insertData = function(k, o, m, n) {
		var l = f.webSQL;
		k = "table_" + k;
		var p = "INSERT OR REPLACE INTO " + k + " VALUES (?, ?)";
		l.db && l.db.transaction(function(q) {
			q.executeSql(p, o, function() {
				m && m()
			}, function() {
				n && n({
					code: a.code.WEBSQL_ERR,
					msg: a.msg.WEBSQL_ERR
				})
			})
		}, function() {
			n && n({
				code: a.code.WEBSQL_ERR,
				msg: a.msg.WEBSQL_ERR
			})
		})
	};
	f.webSQL.selectData = function(n, l, m, k) {
		f.webSQL.db && f.webSQL.db.transaction(function(o) {
			o.executeSql(n, [], function(w, t) {
				if (t.rows.length > 0) {
					if (!k) {
						var r = t.rows.item(0);
						l && l(r.value)
					} else {
						var x = {};
						var u = t.rows;
						var p = u.length;
						for (var s = 0; s < p; s++) {
							var q = u.item(s);
							x[q.key] = q.value
						}
						l && l(x)
					}
				} else {
					m && m({
						code: a.code.NO_RESULT,
						msg: a.msg.NO_RESULT
					})
				}
			}, function(p, q) {
				m && m({
					code: a.code.NO_RESULT,
					msg: a.msg.NO_RESULT
				})
			})
		})
	};
	f.webSQL.dropTables = function(k, l, m) {
		k = "table_" + k;
		var n = "DROP TABLE " + k + ";";
		f.webSQL.db && f.webSQL.db.transaction(function(o) {
			o.executeSql(n, [], function() {
				l && l()
			}, function() {
				m && m({
					code: a.code.WEBSQL_ERR,
					msg: a.msg.WEBSQL_ERR
				})
			})
		})
	};
	f.webSQL.drop = function(k, l, m) {
		!f.webSQL.inited && f.webSQL.init();
		f.webSQL.dropTables(k, l, m)
	};
	f.webSQL.getItem = function(m, l, o) {
		var k = f.webSQL;
		if (!k.inited) {
			k.init();
			k.createTable(k.defaultTableName)
		}
		var n = "table_" + k.defaultTableName;
		var q = "SELECT * FROM " + n + ' where key="' + m + '"';
		try {
			k.selectData(q, l, o)
		} catch (p) {
			o && o({
				code: a.code.NO_RESULT,
				msg: a.msg.NO_RESULT
			})
		}
	};
	f.webSQL.setItem = function(m, p, l, n) {
		var k = f.webSQL;
		if (!k.inited) {
			k.init();
			k.createTable(k.defaultTableName)
		}
		var o = [];
		o[0] = m + "";
		o[1] = p + "";
		k.insertData(k.defaultTableName, o, l, n)
	};
	f.webSQL.getAll = function(l, n) {
		var k = f.webSQL;
		if (!k.inited) {
			k.init();
			k.createTable(k.defaultTableName)
		}
		var m = "table_" + k.defaultTableName;
		var p = "SELECT * FROM " + m;
		try {
			k.selectData(p, l, n, true)
		} catch (o) {
			n && n({
				code: a.code.NO_RESULT,
				msg: a.msg.NO_RESULT
			})
		}
	};
	f.webSQL.removeItem = function(m, l, o) {
		var k = f.webSQL;
		if (!k.inited) {
			k.init();
			k.createTable(k.defaultTableName)
		}
		var n = "table_" + k.defaultTableName;
		var p = "DELETE FROM " + n + ' WHERE key="' + m + '"';
		f.webSQL.db && f.webSQL.db.transaction(function(q) {
			q.executeSql(p, [], function() {
				l && l()
			}, function() {
				o && o({
					code: a.code.WEBSQL_ERR,
					msg: a.msg.WEBSQL_ERR
				})
			})
		})
	};
	f.webSQL.clear = function(l, m) {
		var k = f.webSQL;
		if (!k.inited) {
			k.init();
			k.createTable(k.defaultTableName)
		}
		k.drop(k.defaultTableName, function() {
			k.inited = undefined;
			l && l()
		}, function() {
			k.inited = undefined;
			m && m({
				code: a.code.WEBSQL_ERR,
				msg: a.msg.WEBSQL_ERR
			})
		})
	};
	f.fileSystem.init = function(m, n) {
		var l = g.FILESYSTEM_SIZE;
		var k = f.fileSystem;
		f.supportFileSystem = false;
		if (!window.JSON) {
			f.supportFileSystem = false;
			n && n();
			return
		}
		try {
			c(TEMPORARY, l, function(p) {
				k.fs = p;
				f.supportFileSystem = true;
				k.check(function() {
					k.fetchAll(function() {
						k.inited = true;
						m && m()
					}, n)
				}, function() {
					k.generate(function() {
						k.fetchAll(function() {
							k.inited = true;
							m && m()
						}, n)
					}, n)
				})
			}, function(p) {
				n && n()
			})
		} catch (o) {
			n && n()
		}
	};
	f.fileSystem.fetchAll = function(o, q) {
		var n = f.fileSystem;
		var l;
		var p = 0,
			k = false,
			r = false;
		for (var m = 0; m < n.num && !k; m++) {
			l = n.defaultFileName + m;
			n.fetch(l, function() {
				p++;
				if (p === n.num) {
					o && o()
				}
			}, function() {
				k = true;
				if (!r) {
					r = true;
					q && q({
						code: a.code.FILESYSTEM_ERR,
						msg: a.msg.FILESYSTEM_ERR
					})
				}
			})
		}
	};
	f.fileSystem.fetch = function(k, m, n) {
		var l = f.fileSystem;
		l.fs.root.getFile(k, {
			create: false
		}, function(o) {
			o.file(function(q) {
				var p = new FileReader();
				p.onloadend = function(r) {
					if (this.result) {
						try {
							l.cache[k] = JSON.parse(this.result);
							l.cacheBackup[k] = e(l.cache[k])
						} catch (r) {
							l.cache[k] = {};
							l.cacheBackup[k] = {};
							l.flush(k, m, n)
						}
					} else {
						l.cache[k] = {};
						l.cacheBackup[k] = {}
					}
					m && m()
				};
				p.readAsText(q)
			})
		}, function() {
			n && n({
				code: a.code.FILESYSTEM_ERR,
				msg: a.msg.FILESYSTEM_ERR
			})
		})
	};
	f.fileSystem.get = function(n, m, o) {
		var l = f.fileSystem;
		var k = l.hash(n);
		if (n in l.cache[k]) {
			m && m(l.cache[k][n])
		} else {
			o && o({
				code: a.code.NO_RESULT,
				msg: a.msg.NO_RESULT
			})
		}
	};
	f.fileSystem.generate = function(o, q) {
		var n = f.fileSystem;
		var l;
		var p = 0,
			k = false,
			r = false;
		for (var m = 0; m < n.num && !k; m++) {
			l = n.defaultFileName + m;
			n.fs.root.getFile(l, {
				create: true
			}, function(s) {
				p++;
				if (p === n.num) {
					o && o()
				}
			}, function() {
				k = true;
				if (!r) {
					r = true;
					q && q({
						code: a.code.FILESYSTEM_ERR,
						msg: a.msg.FILESYSTEM_ERR
					})
				}
			})
		}
	};
	f.fileSystem.check = function(n, o) {
		var m = f.fileSystem;
		var l = m.num - 1;
		var k = m.defaultFileName + l;
		m.fs.root.getFile(k, {
			create: false
		}, function(p) {
			n && n()
		}, function(p) {
			o && o({
				code: a.code.FILESYSTEM_ERR,
				msg: a.msg.FILESYSTEM_ERR
			})
		})
	};
	f.fileSystem.flush = function(k, m, n) {
		var l = f.fileSystem;
		l.fs.root.getFile(k, {
			create: false
		}, function(o) {
			o.createWriter(function(p) {
				p.onwriteend = function() {
					o.createWriter(function(q) {
						q.onwriteend = function() {
							l.cacheBackup[k] = e(l.cache[k]);
							m && m()
						};
						q.onerror = function(s) {
							l.cache[k] = e(l.cacheBackup[k]);
							l.flush(k, m, n)
						};
						var r = undefined;
						if (!d) {
							r = new Blob([JSON.stringify(l.cache[k])], {
								type: "text/plain"
							});
							q.write(r)
						} else {
							r = new d();
							r.append(JSON.stringify(l.cache[k]));
							q.write(r.getBlob("text/plain"))
						}
					}, function() {
						n && n({
							code: a.code.FILESYSTEM_ERR,
							msg: a.msg.FILESYSTEM_ERR
						})
					})
				};
				p.truncate(0)
			}, function() {
				n && n({
					code: a.code.FILESYSTEM_ERR,
					msg: a.msg.FILESYSTEM_ERR
				})
			})
		}, function(o) {
			if (o.code === 1) {
				l.generate(function() {
					l.flush(k, m, n)
				}, n)
			} else {
				n && n({
					code: a.code.FILESYSTEM_ERR,
					msg: a.msg.FILESYSTEM_ERR
				})
			}
		})
	};
	f.fileSystem.hash = function(o) {
		var n = f.fileSystem;
		o = o + "";
		var k = o.length;
		var p = 0;
		var l;
		if (k > 0) {
			for (var m = 0; m < k; m++) {
				p += o.charCodeAt(m)
			}
		}
		l = n.defaultFileName + (p % n.num);
		return l
	};
	f.fileSystem.getItem = function(n, m, o) {
		var l = f.fileSystem;
		var k = l.hash(n);
		n += "";
		if (l.cache[k] != undefined && l.cache[k] != null && l.cache[k] != "") {
			l.get(n, m, o)
		} else {
			l.fetchAll(function() {
				l.get(n, m, o)
			}, function() {
				o && o({
					code: a.code.NO_RESULT,
					msg: a.msg.NO_RESULT
				})
			})
		}
	};
	f.fileSystem.getAll = function(l, m) {
		var k = f.fileSystem;
		var n = {};

		function o() {
			var s = Object.keys(k.cache);
			var u = s.length;
			for (var v = 0; v < u; v++) {
				var q = k.cache[s[v]];
				var p = Object.keys(q);
				var r = p.length;
				for (var t = 0; t < r; t++) {
					n[p[t]] = q[p[t]]
				}
			}
		}
		if (Object.keys(k.cache).length == 0) {
			k.fetchAll(function() {
				o();
				l && l(n)
			}, function() {
				m && m({
					code: a.code.NO_RESULT,
					msg: a.msg.NO_RESULT
				})
			})
		} else {
			o();
			l && l(n)
		}
	};
	f.fileSystem.setItem = function(n, p, m, o) {
		n += "";
		var l = f.fileSystem;
		var k = l.hash(n);
		l.cache[k][n] = p + "";
		l.flush(k, m, o)
	};
	f.fileSystem.removeItem = function(n, m, o) {
		var l = f.fileSystem;
		var k = l.hash(n);
		delete l.cache[k][n];
		l.flush(k, m, o)
	};
	f.fileSystem.clear = function(o, q) {
		var n = f.fileSystem;
		n.cache = {};
		var l;
		var p = 0,
			k = false,
			r = false;
		for (var m = 0; m < n.num && !k; m++) {
			l = n.defaultFileName + m;
			n.cache[l] = {};
			n.flush(l, function() {
				p++;
				if (p === n.num) {
					o && o()
				}
			}, function() {
				k = true;
				if (!r) {
					r = true;
					q && q({
						code: a.code.FILESYSTEM_ERR,
						msg: a.msg.FILESYSTEM_ERR
					})
				}
			})
		}
	};
	f.indexedDB.init = function(l, n) {
		var k = f.indexedDB;
		if (!k.indexedDB) {
			f.supportIndexedDB = false;
			n && n();
			return
		}
		if (k.db != undefined && k.db != null) {
			f.supportIndexedDB = true;
			l && l();
			return
		}
		var m = k.indexedDB.open(k.defaultDBName, 1);
		if ("onupgradeneeded" in m) {
			k.oldVersion = false
		} else {
			k.oldVersion = true
		}
		if (k.oldVersion) {
			m.onsuccess = function(o) {
				f.supportIndexedDB = true;
				k.db = o.target.result;
				if (k.db.version != "1.0") {
					var p = k.db.setVersion("1.0");
					p.onerror = function(q) {
						n && n()
					};
					p.onsuccess = function(q) {
						var r = k.db.createObjectStore(k.defaultTableName, {
							keyPath: "key",
							autoIncrement: false
						});
						r.createIndex("value", "value", {
							unique: false
						})
					};
					p.onblocked = function(q) {}
				}
				f.indexedDB.inited = true
			};
			m.onerror = function(o) {
				f.supportIndexedDB = false;
				f.indexedDB.inited = false;
				n && n()
			}
		} else {
			m.onupgradeneeded = function(p) {
				k.db = p.currentTarget.result;
				var o = k.db.createObjectStore(k.defaultTableName, {
					keyPath: "key",
					autoIncrement: false
				});
				o.createIndex("value", "value", {
					unique: false
				})
			};
			m.onsuccess = function(o) {
				k.db = o.currentTarget.result;
				f.indexedDB.inited = true;
				l && l()
			};
			m.onerror = function(o) {
				f.supportIndexedDB = false;
				f.indexedDB.inited = false;
				n && n()
			}
		}
	};
	f.indexedDB.setItem = function(p, n, s, k) {
		if (!f.indexedDB.inited) {
			k && k({
				code: a.code.INDEXDB_ERR,
				msg: a.msg.INDEXDB_ERR
			});
			return
		}
		var r = f.indexedDB.db;
		var t;
		var q = f.indexedDB.defaultTableName;
		if (f.indexedDB.IDBTransaction.READ_WRITE) {
			t = r.transaction([q], f.indexedDB.IDBTransaction.READ_WRITE)
		} else {
			t = r.transaction(q, "readwrite")
		}
		var o = t.objectStore(q);
		var m = {};
		m.key = p + "";
		m.value = n + "";
		var l = o.put(m);
		l.onsuccess = function(u) {
			s && s()
		};
		l.onerror = function(u) {
			k && k({
				code: a.code.INDEXDB_ERR,
				msg: a.msg.INDEXDB_ERR
			})
		};
		l.onblocked = function(u) {
			k && k({
				code: a.code.INDEXDB_ERR,
				msg: a.msg.INDEXDB_ERR
			})
		}
	};
	f.indexedDB.getItem = function(q, p, r) {
		if (!f.indexedDB.inited) {
			r && r({
				code: a.code.NO_RESULT,
				msg: a.msg.NO_RESULT
			});
			return
		}
		q += "";
		var l = f.indexedDB;
		var n = l.defaultTableName;
		var o = l.db.transaction(n);
		var m = o.objectStore(n);
		var k = m.get(q);
		k.onsuccess = function(t) {
			if (t.target.result == null || t.target.result == undefined) {
				r && r({
					code: a.code.NO_RESULT,
					msg: a.msg.NO_RESULT
				});
				return
			}
			var s = t.target.result.value;
			p && p(s)
		};
		k.error = function(s) {
			r && r({
				code: a.code.NO_RESULT,
				msg: a.msg.NO_RESULT
			})
		}
	};
	f.indexedDB.removeItem = function(p, o, r) {
		if (!f.indexedDB.inited) {
			r && r({
				code: a.code.INDEXDB_ERR,
				msg: a.msg.INDEXDB_ERR
			});
			return
		}
		p += "";
		var k = f.indexedDB;
		var n;
		var m = k.defaultTableName;
		if (k.IDBTransaction.READ_WRITE) {
			n = k.db.transaction(m, k.IDBTransaction.READ_WRITE)
		} else {
			n = k.db.transaction(m, "readwrite")
		}
		var l = n.objectStore(m);
		var q = l["delete"](p);
		q.onsuccess = function(s) {
			o && o()
		};
		q.onerror = function(s) {
			r && r({
				code: a.code.INDEXDB_ERR,
				msg: a.msg.INDEXDB_ERR
			})
		}
	};
	f.indexedDB.getAll = function(o, q) {
		if (!f.indexedDB.inited) {
			q && q({
				code: a.code.NO_RESULT,
				msg: a.msg.NO_RESULT
			});
			return
		}
		var k = f.indexedDB;
		var m = k.defaultTableName;
		var n = k.db.transaction(m);
		var l = n.objectStore(m);
		var p = l.openCursor();
		var r = {};
		p.onsuccess = function(s) {
			var t = s.target.result;
			if (t) {
				r[t.key] = t.value.value;
				t["continue"]()
			} else {
				o && o(r)
			}
		};
		p.onerror = function(s) {
			q && q()
		}
	};
	f.indexedDB.clear = function(p, q) {
		if (!f.indexedDB.inited) {
			q && q({
				code: a.code.INDEXDB_ERR,
				msg: a.msg.INDEXDB_ERR
			});
			return
		}
		var k = f.indexedDB;
		var m = k.defaultTableName;
		var o;
		if (k.IDBTransaction.READ_WRITE) {
			o = k.db.transaction(m, k.IDBTransaction.READ_WRITE)
		} else {
			o = k.db.transaction(m, "readwrite")
		}
		var l = o.objectStore(m);
		var n = l.clear();
		n.onsuccess = function(r) {
			p && p()
		};
		n.onerror = function(r) {
			q && q({
				code: a.code.INDEXDB_ERR,
				msg: a.msg.INDEXDB_ERR
			})
		}
	};
	f.localStorage.setItem = function(l, n, k, m) {
		try {
			localStorage.setItem(l, n);
			k && k()
		} catch (o) {
			m && m({
				code: a.code.LOCALSTORAGE_ERR,
				msg: a.msg.LOCALSTORAGE_ERR
			})
		}
	};
	f.localStorage.getItem = function(l, k, m) {
		try {
			var n = localStorage.getItem(l);
			k && k(n)
		} catch (o) {
			m && m({
				code: a.code.NO_RESULT,
				msg: a.msg.NO_RESULT
			})
		}
	};
	f.localStorage.getAll = function(m) {
		var o = {};
		var k = localStorage.length;
		for (var l = 0; l < k; l++) {
			var n = localStorage.key(l);
			o[n] = localStorage.getItem(n)
		}
		m && m(o)
	};
	f.localStorage.removeItem = function(l, k, m) {
		try {
			var n = localStorage.removeItem(l);
			k && k(n)
		} catch (o) {
			m && m({
				code: a.code.LOCALSTORAGE_ERR,
				msg: a.msg.LOCALSTORAGE_ERR
			})
		}
	};
	f.localStorage.clear = function(k, l) {
		try {
			var m = localStorage.clear();
			k && k(m)
		} catch (n) {
			l && l({
				code: a.code.LOCALSTORAGE_ERR,
				msg: a.msg.LOCALSTORAGE_ERR
			})
		}
	};
	f.inited = false;
	h.cache = {};
	f.init = function(k) {
		f.webSQL.init(function() {
			var l = f.webSQL;
			f.set = l.setItem;
			f.get = l.getItem;
			f.remove = l.removeItem;
			f.clearItem = l.clear;
			f.getAll = l.getAll;
			f.inited = true;
			k && k()
		}, function() {
			f.fileSystem.init(function() {
				var l = f.fileSystem;
				f.set = l.setItem;
				f.get = l.getItem;
				f.remove = l.removeItem;
				f.clearItem = l.clear;
				f.inited = true;
				f.getAll = l.getAll;
				k && k()
			}, function() {
				f.indexedDB.init(function() {
					var l = f.indexedDB;
					f.set = l.setItem;
					f.get = l.getItem;
					f.remove = l.removeItem;
					f.clearItem = l.clear;
					f.inited = true;
					f.getAll = l.getAll;
					k && k()
				}, function() {
					var l = f.localStorage;
					f.set = l.setItem;
					f.get = l.getItem;
					f.remove = l.removeItem;
					f.clearItem = l.clear;
					f.inited = true;
					f.getAll = l.getAll;
					k && k()
				})
			})
		})
	};
	h.cache.setItem = function(l, n, k, m) {
		if (f.inited) {
			f.set(l, n, k, m)
		} else {
			f.init(function() {
				f.set(l, n, k, m)
			})
		}
	};
	h.cache.getItem = function(l, k, m) {
		if (f.inited) {
			f.get(l, k, m)
		} else {
			f.init(function() {
				f.get(l, k, m)
			})
		}
	};
	h.cache.removeItem = function(l, k, m) {
		if (f.inited) {
			f.remove(l, k, m)
		} else {
			f.init(function() {
				f.remove(l, k, m)
			})
		}
	};
	h.cache.clear = function(k, l) {
		if (f.inited) {
			f.clearItem(k, l)
		} else {
			f.init(function() {
				f.clearItem(k, l)
			})
		}
	};
	h.cache.getAll = function(k, l) {
		if (f.getAll) {
			f.getAll(k, l)
		} else {
			l && l()
		}
	};
	h.cache.init = function(k) {
		if (!f.inited) {
			f.init(k)
		} else {
			k && k()
		}
	};
	f.init()
})(window);