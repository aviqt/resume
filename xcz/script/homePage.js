$(function(){

	
	/*内容块高度自适应*/
	setMainHeight();
    window.onresize = function () {
       setMainHeight();
    }
	
	/*获取当前日期*/
	$("#nowDate").html(getNowTime());
	
	/**************循环加载内容******************/
	/*主菜单*/
	showHomeMenu(menuData);
	
	$(".btn_win").click(function(){
		$(".postion_text, .btn_win_btns").toggle();
	})
	
	
})



/*树形菜单的无限下级*/
function treeList(treeData){ 
	if(treeData.length == 0) return "";
	var treeListHtml = "<ul>";
	for(var i=0;i < treeData.length;i++){
		var newTreeData = menuData.filter(function(item){
			return item.pid === treeData[i].id;
		})
		var nodeClass = newTreeData.length==0 ? "" : "haveChildren";
		treeData[i].page = treeData[i].page ? 'onclick="changeIframeBodySrc(\'' + treeData[i].page + '\')"' : '';
		var checkboxHtml = treeData[i].haveCheckbox==1 ? '<input type="checkbox"> ' : "";
		
		treeListHtml += '<li class="' + nodeClass + '">' + checkboxHtml + '<span ' + treeData[i].page + '>' + treeData[i].text + '</span>';
		treeListHtml += treeList(newTreeData);
		treeListHtml += '</li>';
	}
	treeListHtml += "</ul>";
	return treeListHtml;
}

/*显示主菜单*/
function showHomeMenu(menuData){ 
	var menuLHtml="";
	var menuRHtml="";
	var menuLData=menuData.filter(function(item){
		return item.pid === 0;
	})
	for(var i=0;i < menuLData.length;i++){
		menuLData[i].page = menuLData[i].page ? ' onclick="changeIframeBodySrc(\'' + menuLData[i].page + '\')"' : '';
		menuLHtml += '<li alt="' + menuLData[i].id + '" ' + menuLData[i].page + '>\
						<img src="images/menu_l_icon1.png">\
						<span>' + menuLData[i].text + '</span>\
					</li>';
					
		var treeData = menuData.filter(function(item){
			return item.pid === menuLData[i].id;
		})
		//if(treeData.length == 0) continue;
		menuRHtml += '<div class="menuRItem" alt="' + menuLData[i].id + '">\
						<div class="menuRItem_title"><img src="images/menu_l_icon1.png">' + menuLData[i].text + '</div>\
						<div class="treeMenu">';
		for(var j=0;j < treeData.length;j++){
			var nodeClass = "treeItem";
			if(j == 0) nodeClass += " treeItem_t";
			if(j == treeData.length - 1) nodeClass += " treeItem_b";
            if (treeData[j].type == 1) nodeClass = "treeItem treeItem_s";
			treeData[j].page = treeData[j].page ? ' onclick="changeIframeBodySrc(\'' + treeData[j].page + '\')"' : '';
			
			var checkboxHtml = treeData[j].haveCheckbox==1 ? '<input type="checkbox"> ' : "";
			
			menuRHtml += '<div class="' + nodeClass + '">\
							 '+ checkboxHtml +'<span ' + treeData[j].page + '><img src="images/treeItem_icon.png">' + treeData[j].text + '</span>';
			var newTreeData = menuData.filter(function(item){
				return item.pid === treeData[j].id;
			})	
			menuRHtml += treeList(newTreeData);
			menuRHtml += '</div>';
		}
		menuRHtml += '	</div>\
					</div>';			
					
	}

	$(".menu_l ul").html(menuLHtml);
	$(".menu_r").html(menuRHtml);
	
	
	
    /*一镇一档的特殊情况*/
    $(".treeItem_s").siblings().hide();
    $(".treeItem_s").append("<div class='treeItem_s_icon'></div>");
    $(".treeItem_s .haveChildren").append("<div class='treeItem_s_icon'></div>");
	
	/*多选框全选功能*/
	$(".menu_r :checkbox").click(function(){
		$(this).siblings().find(":checkbox").prop({"checked":this.checked});
		$(this).parents("li").each(function(){
			if($(this).find("ul").length>0){
				$(this).children(":checkbox").prop({"checked":$(this).find("ul :checkbox:checked").length==0?false:true});
			}
		})
	});
	
	/*阻止表单控件事件冒泡*/
	$("input,a").click(function (e) {
		if (e && e.stopPropagation){
			e.stopPropagation();
		}else{
			window.event.cancelBubble = true;
		}
	});
	
	/*菜单切换展开效果*/
	$(".home_menu").mouseleave(function(){
		if($(".menu_l ul li.hover").index() == mainMenuIndex)return;
		var obj = $(".menu_l ul li:eq(" + mainMenuIndex + ")");
		obj.mouseover();
		obj.parent().scrollTop(0);
		obj.parent().scrollTop(obj.position().top);
	})
	$(".menu_l ul li").hover(function(){
		if($(".menu_l ul li.hover").index() == $(this).index())return;
		var alt = $(this).attr("alt");
		$(".menuRItem").stop(true,true);
		$(".menuRItem").hide();
		$(".menuRItem[alt='" + alt + "']").fadeIn();
		$(this).siblings().removeClass("hover");
		$(this).addClass("hover");
	},function(){}).click(function(){
		mainMenuIndex = $(this).index();
		$(this).siblings().removeClass("active");
		$(this).addClass("active");
	})
	$(".menu_l ul li:eq(" + mainMenuIndex + ")").mouseover().addClass("active");
	
	
	 $(".treeItem span,.treeItem_s .treeItem_s_icon").click(function () {
        var treeItem = $(this).parent();
        if (!($(this).attr("onclick") == 'changeIframeBodySrc("")') && $(this).attr("onclick") != '') {
            $(".menu_l ul li").removeClass("active");
            mainMenuIndex = $(".menu_l ul li.hover").index();
        }
        if (treeItem.hasClass("open")) {
            treeItem.removeClass("open");
            treeItem.find("li").removeClass("open");
            treeItem.find("ul").slideUp(300);
            return;
        }
        //treeItem.siblings().removeClass("open");
        //treeItem.siblings().find("ul").slideUp(300);
        //treeItem.siblings().find("li").removeClass("open");
        //treeItem.parents(".menuRItem").siblings().find("ul").slideUp(300);
        //treeItem.parents(".menuRItem").siblings().find("li,.treeItem").removeClass("open");
        treeItem.addClass("open");
        treeItem.children("ul").slideDown(300);

    })
}

/*菜单和页面内容区域的高度*/
function setMainHeight(){ 
	var documentH = document.documentElement.clientHeight || document.body.clientHeight;
	var otherHeight = $(".home_top").height() + $(".home_logo").height() + $(".home_post").height();
	$(".home_menu ,.home_content,.menu_l ul,.menu_r").css({"height":documentH - otherHeight});
}

/*获取当前日期*/
function getNowTime() { 
    var date = new Date();
    var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
    var currentDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    var day = date.getDay();
    return date.getFullYear() + "年" + month + "月" + currentDate
        + "日 星期" + weekday[day];
}

/*IframeBody跳转*/
function changeIframeBodySrc(url){
	if(!url)return;
	if($("#IframeBody").attr("src")!=url)$("#IframeBody").attr("src",url);
}

/*IframeBody充满页面*/
var isPageFullWeb = false;
function pageFullWeb() {
    if (isPageFullWeb) {
        //$("#IframeBody", parent.document).css({ "z-index": "", "position": "", "width": "", "height": "", "top": "" });
        $(".home_menu ,.home_post,.home_logo,.home_top").css({"width":"","height":""});
        isPageFullWeb = false;
		$("#IframeBody")[0].contentWindow.$(".toBig").html("放大");
    } else {
        //$("#IframeBody", parent.document).css({ "z-index": "99", "position": "fixed", "width": "100%", "height": "100%", "top": "0" });
        $(".home_menu ,.home_post,.home_logo,.home_top").css({"width":"0px","height":"0px"});
		$("#IframeBody")[0].contentWindow.$(".toBig").html("还原");
        isPageFullWeb = true;
    }
    setMainHeight();
}





