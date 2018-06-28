$(function(){
	$(".arrow div").click(function(){
		var alt = $(this).attr("alt");
		var up = $(this).hasClass("up");
		var obj = alt=="1" ? $(".details_table") : $(".patrol");
		var obj2 = alt=="1" ? $(".patrol") : $(".details");
		if(up){
			obj.removeClass("open").scrollTop(0);
			$(".arrow").show();
			$(this).removeClass("up");
			obj2.show();
		}else{
			obj.addClass("open");
			$(".arrow").hide();
			$(this).parent().show();
			$(this).addClass("up");
			obj2.hide();
		}
		$(".details_table_scrollBar").hide();
		if($(".details_table").hasClass("open")){
			$(".details_table_scrollBar").show();
			$(".details_table").scroll();
		}
	})
	
		
	$(".details_table").scroll(function(){
		var t=$(this).scrollTop();
		var tableH=$(this).find("table").height();
		var tableBoxH=$(this).height();
		$(".details_table_scrollBar div").css({"height":tableBoxH/tableH*599})
		$(".details_table_scrollBar div").css({"top":t/tableH*100 + "%"});
	})
	
	
	
	
	var yp;
	var obj;
	
	$(".details_table_scrollBar div").mousedown(function(e){
		obj=$(this);
		yp=e.clientY-obj.offset().top;
		return false;
	})
	$("body").mouseup(function(e){
		obj=false;
		return false;
	})
	$("body").mousemove(function(e){
		if(!obj)return;
		var yy = e.clientY-$(".details_table_scrollBar").offset().top; 
		var barB = obj.parent().height()-obj.height();
		var objT = yy-yp;
		objT = objT<0?0:objT;
		objT = objT>barB?barB:objT;
		var scrollTop=objT*$(".details_table").height()/obj.height();
		if(objT==barB)scrollTop=$(".details_table table").height()-$(".details_table").height();
		$(".details_table").scrollTop(scrollTop);
		return false;
	})
	
	
	
	
	
	
	
	
	
	
	
	
	var dayHtml="";
	for(var i=1;i<32;i++){
		var day=i<10?"0"+i:i;
		var style="";
		if(i==10 || i==15 )style="has";
		if(i==29)style="select";
		dayHtml+="<div class='"+style+"'>"+day+"</div>"
	}
	$(".day").html(dayHtml);
	
	
	$(".pm_item").click(function(){
		
		if($(this).hasClass("pm_item_gray"))return;
		var index=$(this).index()/2;
		console.log(index);
		
		$(".pm_item").removeClass("pm_item_on");
		$(this).addClass("pm_item_on");
		$(".patrol_table").removeClass("pt_on");
		$(".patrol_table:eq("+index+")").addClass("pt_on");
	})
	
	
	
	
	
	
	
})