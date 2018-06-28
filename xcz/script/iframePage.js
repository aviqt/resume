

$(function () {
    /*隐藏滚动条*/
    
	setTimeout(function () {
            hideScrollY($(".hideScrollY"));
    }, 500);
    $(window).resize(function () {
        hideScrollY($(".hideScrollY"));
    })

    /*搜索框自动检索*/
    var mapSearchSt;
    var mapSearchB = false;
    $(".mapSearchBox input").focus(function () {
        $(this).parent().find(".searchList").show();
    }).blur(function () {
        if (mapSearchB) return;
        $(this).parent().find(".searchList").hide();
    })

    $(".mapSearchBox").mouseout(function () {
        mapSearchB = false;
        mapSearchSt = setTimeout(function () {
            $(".mapSearchBox input").blur();
        }, 2000);
    }).mouseover(function () {
        mapSearchB = true;
        clearTimeout(mapSearchSt);
    });
    $(".searchList li").click(function () {
        $(this).parents(".mapSearchBox").find("input").val($(this).find("span").html());
        $(this).parents(".searchList").hide();
    })


    /*tab页切换*/
    $(".tab_head div").click(function () {
        $(this).siblings().removeClass("active");
        $(this).addClass("active");
        var index = $(this).index();
        $(".tab_body").hide();
        $(".tab_body:eq(" + index + ")").show();
		hideScrollY($(".hideScrollY"));
    })
    $(".tab_head div:eq(0)").click();
	
	
	/*放大IFRAMEBODY*/
	$(".toBig").click(function(){
        window.parent.pageFullWeb();
	})
})
/*隐藏滚动条*/
function hideScrollY(objs) {
    objs.each(function () {
        if (!$(this).parent().hasClass("hideScrollY_box")) $(this).wrap("<div class='hideScrollY_box'></div>");
        $(this).width($(this).parent().parent().width());
    })
}






