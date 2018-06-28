$(window).ready(function(){


	//鼠标滚轮事件浏览器兼容
	var mousewheel = document.all?"mousewheel":"DOMMouseScroll";


	

	//四个主按钮鼠标移上移出动画
	$(".menu_team").mouseover(function(){$(".main").attr({class:"main main_t"});})
	$(".menu_team").mouseout(function(){$(".main").attr({class:"main"});})
	$(".menu_contact").mouseover(function(){$(".main").attr({class:"main main_b"});})
	$(".menu_contact").mouseout(function(){$(".main").attr({class:"main"});})
	$(".menu_stack").mouseover(function(){$(".main").attr({class:"main main_l"});})
	$(".menu_stack").mouseout(function(){$(".main").attr({class:"main"});})
	$(".menu_work").mouseover(function(){$(".main").attr({class:"main main_r"});})
	$(".menu_work").mouseout(function(){$(".main").attr({class:"main"});})
	
	//四个主按钮点击动画
	var staus=true;
	var stausN=3;
	$(".menu_team").click(function(){
		if(staus && stausN!=1){
			staus=false;
			$(".team_box").css({"z-index":"7"})
			$(".team_box").animate({top:"0"},1000,function(){
				tiIn();
				reset("team");
				stausN=1;
				staus=true;
			})
		}
		return false;
	})
	$(".menu_contact").click(function(){
		if(staus && stausN!=2){
			staus=false;
			$(".contact_box").css({"z-index":"7"})
			$(".contact_box").animate({top:"0"},1000,function(){
				reset("contact");
				stausN=2;
				staus=true;
			})
		}
		return false;
	})
	$(".menu_stack").click(function(){
		if(staus && stausN!=3){
			staus=false;
			$(".stack_box").css({"z-index":"7"})
			$(".stack_box").animate({left:"0"},1000,function(){
				reset("stack");
				stausN=3;
				staus=true;
			})
		}
		return false;
	})
	$(".menu_work").click(function(){
		if(staus && stausN!=4){
			staus=false;
			$(".work_box").css({"z-index":"7"})
			$(".work_box").animate({left:"0"},1000,function(){
				reset("work");
				stausN=4;
				$(".work_list").animate({bottom:"0"},1000);
				staus=true;
			})
		}
		return false;
	})
	
	//版块切换后位置还原
	function reset(s){
		if(s!='team'){
			$(".team_item").css({opacity:"0",top:"40px"})
			$(".team_box").css({top:"-100%"});
			$(".team_title").removeClass("on");
			$(".team_pic").css({left:"50px"});
		}
		if(s!='contact'){
			$(".contact_box").css({top:"100%"});
		}
		if(s!='stack'){
			$(".stack_box").css({left:"-100%"});
		}
		if(s!='work'){
			$(".work_box").css({left:"100%"});
			$(".work_list").css({bottom:"-30"});
		}
		$(".main > div").css({"z-index":"5"})
		$("."+s+"_box").css({"z-index":"6"})
		$(".menu > div").removeClass("on");
		$(".menu_"+s).addClass("on");
		return false;
	}
	reset("stack");
	
	/*********************************team**************************************/
	//团队成员出现动画
	function tiIn(){
		var time=0;
		$(".team_item").each(function(){
			var object=$(this);
			time+=200;
			setTimeout(function(){object.animate({opacity:"1",top:"0"},500)},time+700);
		})
		setTimeout(function(){$(".team_title").addClass("on");},500);
	}
	//团队成员鼠标滚轮动画
	$(".team_box").mousewheel(function(event, delta, deltaX, deltaY) {
		var left=$(".team_pic").position().left;
		if(delta==-1 && left>-950){
			left-=20;
		}
		if(delta==1 && left<50){
			left+=20;
		}
		$(".team_pic").css({left:left+"px"});
		return false;
		
	});
	
	/*********************************work**************************************/
	var workItemNum=$('.work_pic').length;
	var workItemId=0;
	var workStatus=true;
	$(".work_pic:eq("+workItemId+")").css({height:"700",display:"block",top:"0","z-index":"1","left":"0",width:""});
	$(".work_content:eq("+workItemId+")").css({top:"0",display:"block"});
	$(".work_listi:eq("+workItemId+")").css({color:"#ff6600"});
	function workViewItem(id){
		if(workStatus){
			var height=($(window).height()-90)>($(window).width()-90)*0.8*0.65?($(window).height()-90):($(window).width()-90)*0.8*0.65;
			var rheight=height-120;
			workStatus=false;
			$(".work_pic:eq("+workItemId+")").css({"z-index":"2"});
			$(".work_content:eq("+workItemId+")").css({"z-index":"2"});
			$(".work_pic:eq("+workItemId+")").animate({"left":"100%"},1000);
			$(".work_content:eq("+workItemId+")").animate({left:"-100%"},1000);
			workItemId=id;
			$(".work_content:eq("+workItemId+")").css({display:"block",top:"50px",left:"0px","z-index":"1"});
			$(".work_content:eq("+workItemId+")").animate({top:"0"},1000);
			$(".work_listi").css({color:"#000"})
			$(".work_listi:eq("+workItemId+")").css({color:"#ff6600"});
			$(".work_pic:eq("+workItemId+")").css({height:rheight+"px",display:"block",top:"50px","z-index":"1","left":"0",width:""});
			$(".work_pic:eq("+workItemId+")").animate({height:height+"px",top:"0"},1000,function(){workStatus=true;});
		}
	}
	$(".work_pic").click(function(){
		if((workItemId+1)<workItemNum){
			workViewItem(workItemId+1);
		}
	})
	$(".work_box").mousewheel(function(event, delta, deltaX, deltaY) {
		if(delta==-1){
			if((workItemId+1)<workItemNum){
				workViewItem(workItemId+1);
			}
		}
		if(delta==1){
			if((workItemId-1)>=0){
				workViewItem(workItemId-1);
			}
		}
	})
	$(".work_listi").click(function(){
		var id=parseInt($(this).attr("alt"));
		if(workItemId!=id){
			workViewItem(id);
		}
	})

	
	
	//浏览器大小变化时
	$(window).resize(function(){mainResize();})
	function mainResize(){
		var wpHeight=($(window).height()-90)>($(window).width()-90)*0.8*0.65?($(window).height()-90):($(window).width()-90)*0.8*0.65;		
		var height=$(window).height()-90;
		var tiWidth=height*0.4*282/377;
		var mr=tiWidth/10;
		var fs=height/13;
		var tth=fs*2.5;
		$(".main").css({height:height+"px"})
		$(".team_title").css({"font-size":fs,height:tth})
		$(".team_item").css({width:tiWidth+"px",margin:"0 0 0 "+mr+"px"})
		$(".work_pic").css({height:wpHeight});
	}
	mainResize()
	
	
	
	
})