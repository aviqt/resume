	
	$(function(){
		var isInputText = false;
		$("input[type='text'] ,textarea").focus(function () {
			isInputText = true;
		}).blur(function () {
			isInputText = false;
		})
		document.onselectstart = function () {
			return isInputText;
		};
	})

	function getMenu(menuData){
		var html = '';
		var newData = menuData.filter(function(item){
			return item.pid === '0';
		})
		html = getTreeMenuHtml(menuData,newData,1);
		$(".menu").html(html);
		
		$(".slideItem").click(function(){
			if(!$(this).attr("alt"))return false;
			showIframe($(this).find("span").html(),$(this).attr("alt"));
		})
		$(".item_lv1,.item_lv2 span").click(function(){
			var obj = $(this).siblings(".slideItem");
			$(this).parent().siblings().find(".slideItem").slideUp(150);
			if(obj.is(":hidden")){
				obj.slideDown(150);
			}else{
				obj.slideUp(150);
			}
		})
		$(".menu").find("[alt]").eq(0).click();
		
		return false;
	}
	
	function getTreeMenuHtml(menuData,data,n){
		var html = '';
		for(var i = 0;i < data.length;i++){
			if(n == 1){
				html += '<div class="menulist"><div class="item_lv1">' + data[i].text + '</div>';
			}else{
				var attr = '';
				if(data[i].url != "") attr = 'alt="' + data[i].url + '"';
				html += '<div class="item_lv' + n + ' slideItem" ' + attr + '><span>' + data[i].text + '</span>';
			}
			var newData = menuData.filter(function(item){
				return item.pid === data[i].id;
			})
			html += getTreeMenuHtml(menuData,newData,n+1);
			html += '</div>';
		}
		return html;
	}
	
	function showIframe(title,url){
		if($(".tab_menu_item[alt='" + url + "']").length > 0){
			$(".tab_menu_item[alt='" + url + "']").click();
			return false;
		}
		var menuHtml = '<div class="tab_menu_item" alt="' + url + '">' + title + '<span></span></div>';
		var iframeBoxHtml = '\
			<div class="iframeBox" alt="' + url + '">\
				<iframe frameborder="0" allowtransparency="true" height="100%" width="100%" src="' + url + '"></iframe>\
			</div>';
		$(".tab_menu").append($(menuHtml));
		$(".tab_body").append($(iframeBoxHtml));
		$(".tab_menu_item").unbind();
		$(".tab_menu_item").click(function(){
			var obj;
			var itemLv2 = $(".item_lv2[alt='" + $(this).attr("alt") + "']");
			var itemLv3 = $(".item_lv3[alt='" + $(this).attr("alt") + "']");
			if(itemLv2.length == 0){
				obj = itemLv3;
				itemLv2 = obj.parent(".item_lv2");
			}else{
				obj = itemLv2;
			}
			var iframeBox = $(".iframeBox[alt='" + $(this).attr("alt") + "']");
			$(".iframeBox").hide();
			iframeBox.show();
			$(".tab_menu_item").removeClass("active")
			$(this).addClass("active");
			$(".item_lv2,.item_lv3").removeClass("active")
			obj.addClass("active");
			itemLv2.addClass("active");
			$(".item_lv1").removeClass("active1");
			itemLv2.siblings(".item_lv1").addClass("active1");
			
			if(obj.is(":hidden")){
				if(itemLv2.is(":hidden"))itemLv2.siblings(".item_lv1").click();
				itemLv2.find("span").eq(0).click()
			}
			
		})
		$(".tab_menu_item span").unbind();
		$(".tab_menu_item span").click(function(){
			if($(this).parent().hasClass("active")){
				$(this).parent().remove();
				$(".item_lv2").removeClass("active")
				$(".tab_menu_item").last().click();
			}else{
				$(this).parent().remove();
			}
			$(".iframeBox[alt='" + $(this).parent().attr("alt") + "']").remove();
			
		})
		$(".tab_menu_item").last().click();
		return false;
	}