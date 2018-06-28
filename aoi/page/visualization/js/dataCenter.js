/*除输入框外禁止选中*/
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
});



/*在库房屋幢数*/
(function(){
	/*echarts盒子 写到网站时去掉高宽写到HTML里*/
	//document.write('<div class="echartsComponent" style="width:500px;height:300px;float:left;margin:10px;"></div>');
	$("#components_left").append('<div class="echartsComponent" style="width:500px;height:300px;margin:10px;"></div>');
	/*echarts盒子 写到网站时去掉高宽写到HTML里*/
	
	var data = [40307,13595,7498,1351,589,199];
	var dataCategory = ['1级', '2级', '3级', '4级', 'C级', 'D级'];
	var dataColor = ["#01adf1","#7845A9","#9fc675","#fec600","#cc0000","#aaaaaa"];
	var max = eval(data.join("+"));
	
	
	function showEcharts(obj){
		obj.html("<div style='width:100%;height:100%;'></div>");
		var chart = echarts.init(obj.find("div")[0]);
		var chartOption = {
			backgroundColor:"black",
			title: [
				{
					text: '在库房屋',
					textStyle:{color:"#fff",fontWeight:"normal"},
					top:10,
					left:6
				},
				{
					text: '幢数',
					textStyle:{color:"orange",fontSize:22,fontWeight:"normal"},
					top:8,
					left:80
				},
				{
					text: '档案累计值:',
					textStyle:{color:"white",fontSize:14,fontWeight:"normal"},
					top:15,
					right:70
				},
				{
					text: max,
					textStyle:{color:"#01adf1",fontSize:16,fontWeight:"normal"},
					top:14,
					right:20
				}
			],
			grid: {
				left:50,
				right:50,
				top:50,
				bottom:10,
			},
			xAxis: {
				type:"value",
				show:false,
			},
			yAxis: {
				type : 'category',
				data : dataCategory.reverse(),
				axisLabel:{
					backgroundColor:"rgba(255,255,255,0.2)",
					padding:5,
					barBorderRadius:10,
					color:"#01adf1",
				},
				axisTick: {
					show: false
				},
				axisLine:{
					show:false
				}
			},
			series : [
				{
					name:'房屋数',
					type:'bar',
					barWidth:11,
					stack: '总量',
					label: {
						normal: {
							show: false,
						}
					},
					itemStyle:{
						normal:{
							barBorderRadius:[50,0,0,50]               
						}
					},
					data:(function(){
						var bdata=[];
						for(var i=0;i<data.length;i++){
							bdata.push({itemStyle:{normal:{color:dataColor[i]}},value:data[i]});
						}
						return bdata.reverse()
					})()
				},
				{
					name:'房屋数',
					type:'bar',
					stack: '总量',
					label: {
						normal: {
							show: true,
							position:"right",
							color:"orange",
							formatter: function(a){return(max-a.data.value)+"幢" }
						}
					},
					itemStyle:{
						normal:{
							barBorderRadius:[0,50,50,0]               
						}
					},
					data:(function(){
						var bdata=[];
						for(var i=0;i<data.length;i++){
							bdata.push({label:{normal:{color:"#ddd"}},itemStyle:{normal:{color:"rgba(255,255,255,.2)"}},value:max-data[i]});
						}
						return bdata.reverse()
					})()
				}
			]
		};
		chart.setOption(chartOption);
		
		chart.on('mousedown', function (params) {
			
			alert(params.value)
			if(params.componentType == "yAxis"){  
				alert("单击了"+params.value+"x轴标签");  
			}
		});
			
	}
	var obj = $(".echartsComponent").eq(0);
	obj.attr("class","");
	showEcharts(obj);
	$(window).resize(function(){
		showEcharts(obj);
	})
})();


/*在库房屋总数与丙类房屋汇总*/
(function(){
	/*echarts盒子 写到网站时去掉高宽写到HTML里*/
	//document.write('<div class="echartsComponent" style="width:500px;height:300px;float:left;margin:10px;"></div>');
	$("#components_left").append('<div class="echartsComponent" style="width:500px;height:300px;margin:10px;"></div>');
	/*echarts盒子 写到网站时去掉高宽写到HTML里*/
	
	var data = [2134,630,9294,19836,32024];
	var data2 = [280,73,1347,437,14];
	var data3 = [1230,173,547,737,54];
	var dataCategory = ['解放前', '50~60年', '70~80年', '90~2000年', '2001~至今'];
	var sti = null;
	
	function showEcharts(obj){
		obj.html("<div style='width:100%;height:100%;'></div>");
		var chart = echarts.init(obj.find("div")[0]);
		var chartOption = {
			backgroundColor:"black",
			title: [
				{
					text: '在库房屋总数与丙类房屋',
					textStyle:{color:"#fff",fontSize:16,fontWeight:"normal"},
					top:9,
					left:6
				},
				{
					text: '汇总',
					textStyle:{color:"orange",fontSize:18,fontWeight:"normal"},
					top:8,
					left:185
				},
				{
					text: '单位:',
					textStyle:{color:"white",fontSize:14,fontWeight:"normal"},
					top:11,
					right:40
				},
				{
					text: '幢',
					textStyle:{color:"#white",fontSize:15,fontWeight:"normal"},
					top:10,
					right:20
				}
			],
			grid: {
				left:60,
				right:20,
				top:80,
				bottom:35,
			},
			legend: {
				data: ['在库房屋总数', '丙类房屋'],
				textStyle:{color:"white"},
				top:45
			},
			xAxis: {
				type:"category",
				data : dataCategory,
				axisLabel:{
					color:"#a7dafc",
					interval:0
				},
				lineStyle:{normal:{color:"#fff"}}
			},
			yAxis: {
				type : 'value',
				axisLabel:{
					color:"#fff"
				},
				lineStyle:{normal:{borderColor:"#fff"}},
				splitLine : {
					lineStyle:{
						color:"#002d59"
					}
				}  
			},
			series : [
				{
					name:'在库房屋总数',
					type:'bar',
					data:data,
					label: {
						normal: {
							show: true,
							position: 'top',
							color:"white"
						}
					},
					itemStyle:{
						normal:{
							color:"#0af"
						}
					}
				},
				{
					name:'丙类房屋',
					type:'bar',
					data:data2,
					label: {
						normal: {
							show: true,
							position: 'top',
							color:"white"
						}
					},
					itemStyle:{
						normal:{
							color:"#666"
						}
					}
				},
			]
		};
		var chartOption2 = {
			backgroundColor:"black",
			title: [
				{
					text: '在库房屋总数与C,D级房屋',
					textStyle:{color:"#fff",fontSize:16,fontWeight:"normal"},
					top:9,
					left:6
				},
				{
					text: '汇总',
					textStyle:{color:"orange",fontSize:18,fontWeight:"normal"},
					top:8,
					left:195
				},
				{
					text: '单位:',
					textStyle:{color:"white",fontSize:14,fontWeight:"normal"},
					top:11,
					right:40
				},
				{
					text: '幢',
					textStyle:{color:"#white",fontSize:15,fontWeight:"normal"},
					top:10,
					right:20
				}
			],
			grid: {
				left:60,
				right:20,
				top:80,
				bottom:35,
			},
			legend: {
				data: ['在库房屋总数', 'C,D级房屋'],
				textStyle:{color:"white"},
				top:45
			},
			xAxis: {
				type:"category",
				data : dataCategory,
				axisLabel:{
					color:"#a7dafc",
					interval:0
				},
				lineStyle:{normal:{color:"#fff"}}
			},
			yAxis: {
				type : 'value',
				axisLabel:{
					color:"#fff"
				},
				lineStyle:{normal:{borderColor:"#fff"}},
				splitLine : {
					lineStyle:{
						color:"#002d59"
					}
				}  
			},
			series : [
				{
					name:'在库房屋总数',
					type:'bar',
					data:data,
					label: {
						normal: {
							show: true,
							position: 'top',
							color:"white"
						}
					},
					itemStyle:{
						normal:{
							color:"#0af"
						}
					}
				},
				{
					name:'C,D级房屋',
					type:'bar',
					data:data3,
					label: {
						normal: {
							show: true,
							position: 'top',
							color:"white"
						}
					},
					itemStyle:{
						normal:{
							color:"#666"
						}
					}
				},
			]
		};
		chart.setOption(chartOption);
		
		var bl = true;
		sti = setInterval(function(){
			obj.find("div").eq(0).animate({opacity:0},1500,function(){
				chart.clear();
				var currentOption = bl ? chartOption2 : chartOption;
				bl = !bl;
				chart.setOption(currentOption);
				$(this).animate({opacity:1},1000,function(){})
			})
			
		},15000)
		console.log(sti);
	}
	var obj = $(".echartsComponent").eq(0);
	obj.attr("class","");
	showEcharts(obj);
	$(window).resize(function(){
		showEcharts(obj);
	})
})();


/*房屋总数饼图*/
(function(){
	/*echarts盒子 写到网站时去掉高宽写到HTML里*/
	//document.write('<div class="echartsComponent" style="width:500px;height:300px;float:left;margin:10px;"></div>');
	$("#components_left").append('<div class="echartsComponent" style="width:500px;height:300px;margin:10px;"></div>');
	/*echarts盒子 写到网站时去掉高宽写到HTML里*/
	
	var data = [1120,33,1409,958,2097,2129,1897,2255];
	var dataCategory = ['余姚市','慈溪市','象山县','宁海县','鄞州区','海曙区','江东区','其他'];
	var dataColor = ['#0066ff','#bbaa11','#ffcc00','#cc0000','#00aaff','#ff9900','#7744aa','#99cc77'];
	var max = eval(data.join("+"));
	
	function showEcharts(obj){
		obj.html("<div style='width:100%;height:100%;'></div>");
		var chart = echarts.init(obj.find("div")[0]);
		var chartOption = {
			backgroundColor:"black",
			title: [
				{
					text: '房屋总数',
					textStyle:{color:"#fff",fontWeight:"normal"},
					top:10,
					left:6
				},
				{
					text: '占比',
					textStyle:{color:"orange",fontSize:22,fontWeight:"normal"},
					top:8,
					left:80
				}
			],
			legend: {
				orient: 'vertical',
				data: dataCategory,
				textStyle:{color:"white"},
				right:30,
				y:"center"
			},
			series : [
				{
					name:'房屋总数',
					type:'pie',
					radius : '55%',
					center: ['40%', '55%'],
					label: {
						normal: {
							textStyle:{
								fontWeight:"bold"
							},
							formatter: function(a){return (a.data.value/max*100).toFixed(2) + "%" }
						}
					},
					data:(function(){
						var bdata=[];
						for(var i=0;i<data.length;i++){
							bdata.push({itemStyle:{normal:{color:dataColor[i]}},value:data[i],name:dataCategory[i]});
						}
						return bdata.reverse()
					})()
				},
			]
		};
		chart.setOption(chartOption);
	}
	var obj = $(".echartsComponent").eq(0);
	obj.attr("class","");
	showEcharts(obj);
	$(window).resize(function(){
		showEcharts(obj);
	})
})();


/*巡查量*/
(function(){
	/*echarts盒子 写到网站时去掉高宽写到HTML里*/
	//document.write('<div class="echartsComponent" style="width:500px;height:300px;float:left;margin:10px;"></div>');
	$("#components_right").append('<div class="echartsComponent" style="width:500px;height:300px;margin:10px;"></div>');
	/*echarts盒子 写到网站时去掉高宽写到HTML里*/
	
	var data = [12235,9852,8549,15462,8643,11528,14564,13885,7785,11645,23555,25555];
	var dataCategory = ["12","01","02","03","04","05","06","07","08","09","10","11"];
	
	
	function showEcharts(obj){
		obj.html("<div style='width:100%;height:100%;'></div>");
		var chart = echarts.init(obj.find("div")[0]);
		var chartOption = {
			backgroundColor:"black",
			title: [
				{
					text: '巡查',
					textStyle:{color:"orange",fontSize:18,fontWeight:"normal"},
					top:8,
					left:6
				},
				{
					text: '量',
					textStyle:{color:"#fff",fontSize:16,fontWeight:"normal"},
					top:9,
					left:42
				}
			],
			grid: {
				left:60,
				right:20,
				top:60,
				bottom:35,
			},
			legend: {
				data: ['按月'],
				textStyle:{color:"white"},
				top:30,
				right:20
			},
			xAxis: {
				type:"category",
				data : dataCategory,
				axisLabel:{
					color:"#a7dafc",
					interval:0
				},
				axisTick: {
					lineStyle:{
						color:'red',
						width:5,
						barBorderRadius:50  
					}
				},
				axisLine:{
					show:false
				}
			},
			yAxis: {
				type : 'value',
				axisLabel:{
					color:"#fff"
				},
				lineStyle:{normal:{borderColor:"#fff"}},
				splitLine : {
					lineStyle:{
						color:"#002d59"
					}
				}  
			},
			series : [
				{
					name:'按月',
					type:'line',
					data:data,
					itemStyle:{
						normal:{
							color:"#fff"
						}
					}
				}
			]
		};
		chart.setOption(chartOption);
	}
	var obj = $(".echartsComponent").eq(0);
	obj.attr("class","");
	showEcharts(obj);
	$(window).resize(function(){
		showEcharts(obj);
	})
})();


/*最新巡查记录*/
(function(){
	/*echarts盒子 写到网站时去掉高宽写到HTML里*/
	//document.write('<div class="tableComponent" style="width:500px;height:300px;float:left;margin:10px;"></div>');
	$("#components_right").append('<div class="tableComponent" style="width:500px;height:300px;margin:10px;"></div>');
	/*echarts盒子 写到网站时去掉高宽写到HTML里*/
	
	var data = [
		["余姚市兰江街道富士花园小区29幢","1级","11.7 14:33:16","巡查"],
		["余姚市梨洲街道四明东路55弄(后幢)","2级","11.7 14:33:16","巡查"],
		["奉化区西坞街道余家坝村中横街","D级","11.7 14:33:16","巡查"],
		["余姚市兰江街道富士花园小区12幢","4级","11.7 14:33:16","巡查"],
		["宁海县路龙街道北斗南路23弄5，6号","2级","11.7 14:33:16","巡查"],
		["浙江省二建建设集团有限公司","C级","11.7 14:33:16","巡查"],
		["余姚市兰江街道富士花园小区21幢","3级","11.7 14:33:16","巡查"],
		["余姚市梨洲街道四明东路55弄(前幢)","1级","11.7 14:33:16","巡查"],
	];
	
	
	function showTable(obj){
		obj.html("<div style='width:100%;height:100%;background:black;overflow:hidden;'></div>");
		var div = obj.find("div").eq(0);
		var divContent = "<div style='color:white;font-size:16px;padding:0 10px;line-height:50px;'>最新<span style='color:#FB9008;font-size:20px;'>巡查记录</span></div>";
		divContent += "<div class='tableComponent_tableTh'>";
		divContent += 	"<div style='width:50px;border:none;'>类别</div>";
		divContent += 	"<div style='width:120px;'>时间</div>";
		divContent += 	"<div style='width:50px;'>等级</div>";
		divContent += 	"<div style='float:none;'>房屋坐落</div>";
		divContent += "</div>";
		divContent += "<div class='tableComponent_tableBody'>";
		
		for(var i=0;i<data.length;i++){
			var trStyle = i%2==0?"background:rgba(0,174,241,0.15);":"";
			divContent += "<div class='tableComponent_tableTr' style='" + trStyle + "'>";
			divContent += 	"<div style='width:50px;border:none;'>" + data[i][3] + "</div>";
			divContent += 	"<div style='width:120px;'>" + data[i][2] + "</div>";
			divContent += 	"<div style='width:50px;'>" + data[i][1] + "</div>";
			divContent += 	"<div style='float:none;text-align:left;padding:0 10px;'>" + data[i][0] + "</div>";
			divContent += "</div>";
		}	
		
		divContent += "</div>";
		divContent += "<style>";
		divContent += "*{box-sizing:border-box;}";
		divContent += ".tableComponent_tableTh{clear:both;overflow:hidden;}";
		divContent += ".tableComponent_tableTh div{color:#bbeeee;text-align:center;float:right;font-size:14px;border:1px solid #036;line-height:40px;}";
		divContent += ".tableComponent_tableTr{clear:both;overflow:hidden;}";
		divContent += ".tableComponent_tableTr div{padding:0 5px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;color:#fff;text-align:center;float:right;font-size:14px;border:1px solid #036;border-top:none;line-height:40px;}";
		divContent += "</style>";
		div.html(divContent);
		
		setInterval(function(){
			div.find(".tableComponent_tableBody .tableComponent_tableTr").eq(0).slideUp(1000,function(){
				$(this).show();
				div.find(".tableComponent_tableBody").append($(this));
			});
		},5000)
	}
	var obj = $(".tableComponent").eq(0);
	obj.attr("class","");
	showTable(obj);
	$(window).resize(function(){
		showTable(obj);
	})
})();


/*及时率对比*/
(function(){
	/*echarts盒子 写到网站时去掉高宽写到HTML里*/
	//document.write('<div class="echartsComponent" style="width:500px;height:300px;float:left;margin:10px;"></div>');
	$("#components_right").append('<div class="echartsComponent" style="width:500px;height:300px;margin:10px;"></div>');
	/*echarts盒子 写到网站时去掉高宽写到HTML里*/
	
	var data = [92.79,91.16,84.68,74.22,71.37,67.51,61.69,60.87];
	var data2 = [92.79,91.16,84.68,74.22,71.37,67.51,61.69,60.87];
	var dataCategory = ['镇海区','东钱湖旅\n游度假区','象山县','北仑区','宁海县','高新区','江东区','杭州弯'];
	
	
	function showEcharts(obj){
		obj.html("<div style='width:100%;height:100%;'></div>");
		var chart = echarts.init(obj.find("div")[0]);
		var chartOption = {
			backgroundColor:"black",
			title: [
				{
					text: '及时率',
					textStyle:{color:"#fff",fontSize:16,fontWeight:"normal"},
					top:10,
					left:6
				},
				{
					text: '对比',
					textStyle:{color:"orange",fontSize:18,fontWeight:"normal"},
					top:8,
					left:55
				}
			],
			grid: {
				left:60,
				right:30,
				top:60,
				bottom:50,
			},
			xAxis: {
				type:"category",
				data : dataCategory,
				axisLabel:{
					color:"#aaa",
					interval:0
				},
				axisLine:{
					lineStyle:{
						color:'#a7dafc',
						width:1,
					}
				}
			},
			yAxis: {
				type : 'value',
				axisLabel:{
					color:"#a7dafc",
					formatter: function(a){return a+"%" }
				},
				axisLine:{
					lineStyle:{
						color:'#a7dafc',
						width:1,
					}
				},
				splitLine : {
					lineStyle:{
						color:"#002d59"
					}
				},
				splitLine:{show:false}  ,
				splitNumber:10
			},
			series : [
				{
					name:'百分比',
					type:'bar',
					barWidth:'40%',
					z:2,
					stack:"1",
					data:data,
					label: {
						normal: {
							show: true,
							position: 'top',
							color:"white",
							formatter: function(a){return(a.data)+"%" }
						}
					},
					itemStyle:{
						normal:{
							color:"#88ddff"
						}
					}
				},
				{
					name:'补满',
					type:'bar',
					stack:"1",
					z:1,
					data:(function(){
						var bdata=[];
						for(var i=0;i<data.length;i++){
							bdata.push({itemStyle:{normal:{color:"rgba(255,255,255,0.2)"}},value:100 - data[i]});
						}
						return bdata;
					})(),
					label: {
						normal: {
							show: false,
						}
					},
					itemStyle:{
						normal:{
							color:"#666"
						}
					}
				},
			]
		};
		chart.setOption(chartOption);
	}
	var obj = $(".echartsComponent").eq(0);
	obj.attr("class","");
	showEcharts(obj);
	$(window).resize(function(){
		showEcharts(obj);
	})
})();



