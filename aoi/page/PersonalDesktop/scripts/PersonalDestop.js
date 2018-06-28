

var PD_padding=10;

(function ($) {
	$.fn.PersonalDestop = function (options) {
		var defaults = {
			BlockPadding: PD_padding,
			XUnitPixs: 80,
			YUnitPixs: 80,
			GridColor: "#fff"
		};
		option = $.extend(defaults, options);
		var p_divs = [];
		var othis = this;
		var thisobj = $(this);
		this.RefreshGrid = function (xb, yb) {
			if (xb == null || xb == undefined) xb = option.XUnitPixs;
			if (/^\d+$/.test(xb) == false) xb = option.XUnitPixs;
			if (yb == null || yb == undefined) yb = option.YUnitPixs;
			if (/^\d+$/.test(yb) == false) yb = option.YUnitPixs;

			option.XUnitPixs = xb;
			option.YUnitPixs = yb;

			RefreshDiv();
		}
		function TransformCoordinate(x, y, w, h) {
			x = parseInt(x);
			y = parseInt(y);
			w = parseInt(w);
			h = parseInt(h);
			var m1 = $M([[x, y, 1]]);
			var m2 = $M([
				[option.XUnitPixs, 0, 0],
				[0, option.YUnitPixs, 0],
				[0, 0, 1]
			]);
			var r = m1.x(m2);
			return { x: r.e(1, 1), y: r.e(1, 2), w: w * option.XUnitPixs, h: h * option.YUnitPixs };
		}
		function IsCoverDivs(x, y, w, h, id2) {
			x = parseInt(x);
			y = parseInt(y);
			w = parseInt(w);
			h = parseInt(h);
			for (var i = 0; i < p_divs.length; i++) {
				var o = p_divs[i];
				if (id2 != null && id2 != undefined && id2 == o.id2) continue;
				if (x > (o.x - w) && x < (o.x + o.w) && y > (o.y - h) && y < (o.y + o.h)) return true;
			}
			return false;
		}
		function IsInContainer(x, y, w, h) {
			x = parseInt(x);
			y = parseInt(y);
			w = parseInt(w);
			h = parseInt(h);
			var width = thisobj.width();
			var height = thisobj.height();
			var xcnt = (width - (width % option.XUnitPixs)) / option.XUnitPixs;
			var ycnt = (height - (height % option.YUnitPixs)) / option.YUnitPixs;

			if (x < 0 || y < 0) return false;
			if ((x + w) > xcnt) return false;
			if ((y + h) > ycnt) return false;
			return true;
		}
		this.Move = function (id2, x, y, w, h) {
			if (id2 == null || id2 == undefined) return;
			if (x == null || x == undefined) x = 0;
			if (y == null || y == undefined) y = 0;
			if (w == null || w == undefined) w = 0;
			if (h == null || h == undefined) h = 0;
			x = parseInt(x);
			y = parseInt(y);
			w = parseInt(w);
			h = parseInt(h);
			var o = null;
			for (var i = 0; i < p_divs.length; i++) {
				if (p_divs[i].id2 == id2) {
					o = p_divs[i];
					if (IsCoverDivs(x, y, w, h, o.id2) == false && IsInContainer(x, y, w, h)) {
						o.x = parseInt(x);
						o.y = parseInt(y);
						o.w = parseInt(w);
						o.h = parseInt(h);
						p_divs[i] = o;
					}
					break;
				}
			}
			if (o != null) {
				RefreshDiv();
			}
			return o;
		}
		this.Expand=function(id2, direct) {
			if (id2 == null || id2 == undefined) return;
			if (direct == null || direct == undefined) return;
			direct = direct.replace(/(^\s*)|(\s*$)/g, "").toLowerCase();
			if (direct != "left" && direct != "up" && direct != "down" && direct != "right") return;
			var width = thisobj.width();
			var height = thisobj.height();
			var xcnt = (width - (width % option.XUnitPixs)) / option.XUnitPixs;
			var ycnt = (height - (height % option.YUnitPixs)) / option.YUnitPixs;
			var o = null;
			for (var i = 0; i < p_divs.length; i++) {
				if (p_divs[i].id2 == id2) {
					o = p_divs[i];
					if (direct == "left") {
						for (var x = 0; x < o.x; x++) {
							if (IsCoverDivs(x, o.y, o.w, o.h, o.id2) == false && IsInContainer(x, o.y, o.w, o.h)) {
								o.w = o.x - x + o.w;
								o.x = x;
							}
						}
					} else if (direct == "up") {
						for (var y = 0; y < o.y; y++) {
							if (IsCoverDivs(o.x, y, o.w, o.h, o.id2) == false && IsInContainer(o.x, y, o.w, o.h)) {
								o.h = o.y - y + o.h;
								o.y = y;
							}
						}
					} else if (direct == "down") {
						for (var h = ycnt - o.y; h > o.h; h--) {
							if (IsCoverDivs(o.x, o.y, o.w, h, o.id2) == false && IsInContainer(x, o.y, o.w, h)) {
								o.h = h;
							}
						}
					} else {
						for (var w = xcnt - o.x; w > o.w; w--) {
							if (IsCoverDivs(o.x, o.y, w, o.h, o.id2) == false && IsInContainer(x, o.y, w, o.h)) {
								o.w = w;
							}
						}
					}
					p_divs[i] = o;
					break;
				}
			}
			if (o != null) {
				RefreshDiv();
			}
		}
		function RefreshDiv() {
			for (var i = 0; i < p_divs.length; i++) {
				var o = p_divs[i];
				var r = TransformCoordinate(o.x, o.y, o.w, o.h);
				thisobj.find("div[id2='" + o.id2 + "']").css("left", (r.x + option.BlockPadding) + "px");
				thisobj.find("div[id2='" + o.id2 + "']").css("top", (r.y + option.BlockPadding) + "px");
				thisobj.find("div[id2='" + o.id2 + "']").css("width", (r.w - option.BlockPadding) + "px");
				thisobj.find("div[id2='" + o.id2 + "']").css("height", (r.h - option.BlockPadding) + "px");
			}
		}
		this.DelDiv=function(id2) {
			ds = [];
			for (var i = 0; i < p_divs.length; i++) {
				if (p_divs[i].id2 == id2) {
					thisobj.find("div[id2='" + id2 + "']").remove();
				} else {
					ds.push(p_divs[i]);
				}
			}
			p_divs = ds;
			RefreshDiv();
		}
		this.AddDiv = function (x, y, w, h, divHtml) {
			if (divHtml == null || divHtml == undefined) divHtml = "";
			divHtml2 = divHtml.replace(/(^\s*)|(\s*$)/g, "").toLowerCase();
			var isDiv = /^<\s*div\s*/.test(divHtml2);
			if (x == null || x == undefined || x < 0) x = 0;
			if (y == null || y == undefined || y < 0) y = 0;
			if (w == null || w == undefined || w <= 0) w = 3;
			if (h == null || h == undefined || h <= 0) h = 2;
			x = parseInt(x);
			y = parseInt(y);
			w = parseInt(w);
			h = parseInt(h);
			var width = thisobj.width();
			var height = thisobj.height();
			var xcnt = (width - (width % option.XUnitPixs)) / option.XUnitPixs;
			var ycnt = (height - (height % option.YUnitPixs)) / option.YUnitPixs;
			if (IsCoverDivs(x, y, w, h) || !IsInContainer(x, y, w, h)) {
				b = false;
				for (var y1 = 0; y1 <= ycnt; y1++) {
					for (var x1 = 0; x1 <= xcnt; x1++) {
						if (IsCoverDivs(x1, y1, w, h) == false && IsInContainer(x1, y1, w, h)) {
							x = x1;
							y = y1;
							b = true;
							break;
						}
					}
					if (b) break;
				}
				if (b == false) {
					alert("空间满了");
					return;
				}
			}
			var r = TransformCoordinate(x, y, w, h);
			if (isDiv == false) {
				divHtml = "<div>" + divHtml + "</div>";
			}
			var id2 = "div" + parseInt(Math.random() * 1000000);
			thisobj.append(divHtml);
			thisobj.children().last().attr("id2", id2);
			thisobj.children().last().attr("id",  "destopDiv"+id2);
			//thisobj.children().last().find(".divItemClear").attr("onclick", "p.DelDiv('"+id2+"')");
			thisobj.children().last().css("position", "absolute");
			thisobj.children().last().css("left", (r.x + option.BlockPadding) + "px");
			thisobj.children().last().css("top", (r.y + option.BlockPadding) + "px");
			thisobj.children().last().css("width", (r.w - option.BlockPadding) + "px");
			thisobj.children().last().css("height", (r.h - option.BlockPadding) + "px");
			var o = { id2: id2, x: x, y: y, w: w, h: h, html: divHtml };
			p_divs.push(o);
			return o;
		}
		return this;
	}
})(jQuery);





//判断两个元素是否有重叠
function collision(a, b) {
    var ax = a.offset().left;
    var ay = a.offset().top;
    var aw = a.width();
    var ah = a.height();
    var bx = b.offset().left;
    var by = b.offset().top;
    var bw = b.width();
    var bh = b.height();
    return (ax + aw > bx && ax < bx + bw && ay + ah > by && ay < by + bh);
}







function clickToMoveDiv(objDiv){
	var xp = 0, yp = 0, xx = 0, yy = 0;
	var objWidth ;
	var objHeight;
	var boxWidth ;
	var boxHeight;
	var boxTop ;
	var boxLeft ;
	var obj = null;
	objDiv.mousedown(function (e) {
		obj = $(this);
		objDiv.css({ "z-index": "1" });
		obj.css({ "z-index": "2" });
		xp = e.clientX - obj.offset().left;
		yp = e.clientY - obj.offset().top;
		objWidth = obj.width();
		objHeight = obj.height();
		boxWidth = obj.parent().width();
		boxHeight = obj.parent().height();
		boxTop = obj.parent().offset().top;
		boxLeft = obj.parent().offset().left;
		xx = e.clientX - xp - boxLeft;
		yy = e.clientY - yp - boxTop
		return false;
	})
	$(window).mouseup(function (e) {
		if(!obj)return;
		var id2 = obj.attr("id2");
		var isC = false
		for(var i = 0;i<divsList.length;i++){
			if(divsList[i].id2 == id2)break;
		}
		objDiv.each(function(){
			if($(this).attr("id2") == id2)return;
			isC = isC || collision($(this),obj);
		})
		if(!isC){
			divsList[i].x = xx/cellWidth;
			divsList[i].y = yy/cellHeight;
		}else{
			alert("不支持组件重叠");
		}
		obj = null;
		p.Move(id2, divsList[i].x, divsList[i].y, divsList[i].w, divsList[i].h)
		return false;
	})
	$(window).mousemove(function (e) {
		if(!obj)return;
		xx = e.clientX - xp - boxLeft;
		yy = e.clientY - yp - boxTop
		xx = xx < 0 ? 0 : xx;
		yy = yy < 0 ? 0 : yy;
		xx = xx > boxWidth - objWidth ? boxWidth - objWidth : xx;
		yy = yy > boxHeight - objHeight ? boxHeight - objHeight : yy;
		
		xx = parseInt(xx/cellWidth) * cellWidth + PD_padding;
		yy = parseInt(yy/cellHeight) * cellHeight + PD_padding;
		obj.css({ left: xx,  top: yy });
		return false;
	})
	
}








