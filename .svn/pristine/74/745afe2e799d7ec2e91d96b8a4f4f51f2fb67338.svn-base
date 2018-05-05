(function($, window) {
	var ZsImage = function(options) {
		this.options = $.extend(true, {
			width: 190, //宽度
			height: 190, //高度
			format:'image/png',
			quality:0.8
		}, options || {});
	};
	var proto = ZsImage.prototype;
	proto.draw = function(imgs,succ) {
		/*
		var imgs = [{
			src: 'img1.png',
			x: 0,
			y: 0,
			w: 500,
			h: 500
		}, {
			src: 'img2.png',
			x: 0,
			y: 0,
			w: 500,
			h: 500
		}];
		*/
		var canvas = document.createElement('canvas'),
			ctx = canvas.getContext('2d'),
			size = imgs.length;
		canvas.width = this.options.width;
		canvas.height = this.options.height;
		ctx.rect(0, 0, canvas.width, canvas.height);
		ctx.fillStyle = '#fff';
		ctx.fill();
		for (var i = 0; i < imgs.length; i++) {
			var info=imgs[i];
			var img = new Image;
			//img.crossOrigin = 'Anonymous'; //解决跨域
			img.src = info.src;
			img.onload = function() {
				ctx.drawImage(img, info.x, info.y, info.w, info.h);
			}
		}
		var src= c.toDataURL(this.options.format,this.options.quality);
		succ && succ(src);
	}
})(mui, window);