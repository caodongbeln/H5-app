		function replace_em(str) {
			console.log(str);
			str = str.replace(/\</g, '&lt;');
			str = str.replace(/\>/g, '&gt;');
			str = str.replace(/\n/g, '<br/>');
			str = str.replace(/\[em_([0-9]*)\]/g, '<img src="../arclist/$1.gif"/>');
			console.log(str);
			return str;
		}
		function reversal_em(str) {
			str = str.replace(/&lt;/g, '\<');
			str = str.replace(/&gt;/g, '\>');
			str = str.replace(/<br\/>/g, '\n');
			str = str.replace(/<img\ssrc=[\'"](.+?)[\'"]\>/gi, '[em_$1]');
			str = str.replace(/..\/arclist\//gi, '');
			str = str.replace(/\.gif/gi, '');
			return str;
		}