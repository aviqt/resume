
//地区名
var areaData=["余姚市","慈溪","奉化区","宁海县","象山县","鄞州区","海曙区","江东区","江北区","镇海区","北仑区","杭州湾新区","保税区","大榭开发区","高新区","东钱湖旅游度假区","梅山保税港区"];

//定时器数组
var sta = [];
//清除所有定时器
function clearIntervals(array){
	for (i=0; i <array.length; i++) {
		clearInterval(array[i]);
	};
	sta = [];
}

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
})

//自适应屏幕
function setBodySize(){
	$("body").css({"transform":"scale("+($(this).width()/2500)+")"});
	return;
}


//加载内容
function fillExample(boxObj){
	clearIntervals(sta);
	getECharts1(boxObj);
	getECharts2(boxObj);
	getECharts3(boxObj);
	getECharts4(boxObj);
	getECharts5(boxObj);
	getTable1(boxObj);
	getTip1(boxObj);
	getMainDiv(boxObj);
	
}
//创建DIV
function creatDiv(id,style,parentObj){
	$("#" + id).remove();
	var html = "<div id='" + id + "'></div>";
	var div = $(html);
	div.css(style);
	parentObj.append(div);
	return div;
}

//坐标轴颜色
var lineColor = {
		lineStyle:{
			color:'#fff',
			width:1,
		}
	}
var labelColor = {
		show: true,
		textStyle: {
			color: '#fff'
		}
	}








function getECharts1(boxObj){
	var id = boxObj.attr("id") + "-echarts-1";
	var	style={
			width:500,
			height:300,
			top:-100,
			left:-200,
			padding:20,
			border:"1px solid #3f556f",
			position:"absolute",
			opacity:0
		}
	var div = creatDiv(id,style,boxObj);
	div.animate({top:40,left:40,opacity:1},500)
	var chart = echarts.init(div[0]);
	
	var option = {
		color: ['#3398DB'],
		title : [
			{
				text: '企业类型',
				textStyle:{color:"#fff",fontSize:16},
				x:'left',
				top:4
			},{
				text: '产值',
				textStyle:{color:"#FB9008",fontSize:20},
				x:'left',
				left:66
			},{
				text: '排行',
				textStyle:{color:"#fff",fontSize:16},
				x:'left',
				left:108,
				top:4
			},{
				text: '单位：亿元',
				textStyle:{color:"#fff",fontWeight:"normal",fontSize:14},
				x:'right',
			},{
				text: '2016年',
				backgroundColor:"rgba(255,255,255,0.2)",
				textStyle:{color:"#00AEF1",fontSize:12},
				x:'left',
				left:160,
				top:5
			}
		],
		tooltip : {
			trigger: 'axis',
			axisPointer : {            // 坐标轴指示器，坐标轴触发有效
				type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
			}
		},
		grid: {
			left: '3%',
			right: '3%',
			bottom: '3%',
			containLabel: true
		},
		xAxis : [
			{
				type : 'category',
				data : ['施工', '监理', '安全房屋\n鉴定', '勘察', '设计', '施工图\n审查'],
				axisTick: {
					alignWithLabel: true
				},
				axisLine:lineColor,
				axisLabel:labelColor
			}
		],
		yAxis : [
			{
				type : 'value',
				max:700,
				axisLine:lineColor,
				axisLabel:labelColor,
				splitArea : {show : false}  
			}
		],
		series : [
			{
				name:'产值',
				itemStyle:{normal:{color:"#00AEF1"}},
				type:'bar',
				barWidth: '40%',
				data:[152, 200, 334, 390, 330, 220],
				animationDelay: function (idx) {
					return idx * 50 + 100;
				}
			}
		],
		animationEasing: 'elasticOut',
		animationDelayUpdate: function (idx) {
			return idx * 5;
		}
	};
	chart.setOption(option);
	sta.push(setInterval(function (){
			var data = option.series[0].data;
			var num = Math.floor(Math.random() * data.length);
			data[num] = Math.round(Math.random() * 400 + 200);
			
			div.animate({opacity:0},1000,function(){
				chart.clear();
				chart.setOption(option);
				div.animate({opacity:1},1500);
			})
		}, 16100)
	)
	
}


function getECharts2(boxObj){
	var id = boxObj.attr("id") + "-echarts-2"
	var style={
		width:500,
		height:300,
		top:300,
		left:40,
		padding:20,
		border:"1px solid #3f556f",
		position:"absolute",
		opacity:0
	}
	var div = creatDiv(id,style,boxObj);
	div.animate({opacity:1,top:380},400)
	var chart = echarts.init(div[0]);
	
	var option = {
		title : [
			{
				text: '建筑业走出去产值',
				textStyle:{color:"#fff",fontSize:16},
				x:'left',
				top:4
			},{
				text: '分布',
				textStyle:{color:"#FB9008",fontSize:20},
				x:'left',
				left:130
			},{
				text: '图',
				textStyle:{color:"#fff",fontSize:16},
				x:'left',
				left:172,
				top:4
			},{
				text: '2015年',
				backgroundColor:"rgba(255,255,255,0.2)",
				textStyle:{color:"#00AEF1",fontSize:12},
				x:'left',
				left:210,
				top:5
			}
		],
		tooltip : {
			trigger: 'item',
			formatter: "{a} <br/>{b} : {c} ({d}%)"
		},
		legend: {
			orient: 'vertical',
			left: 'left',
			top: 60,
			textStyle:{color:"white"},
			data: ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
		},
		series : [
			{
				name: '访问来源',
				type: 'pie',
				radius : '60%',
				center: ['65%', '60%'],
				data:[
					{value:335, name:'直接访问'},
					{value:310, name:'邮件营销'},
					{value:234, name:'联盟广告'},
					{value:135, name:'视频广告'},
					{value:1548, name:'搜索引擎'}
				],
				itemStyle: {
					emphasis: {
						shadowBlur: 10,
						shadowOffsetX: 0,
						shadowColor: 'rgba(0, 0, 0, 0.5)'
					}
				}
			}
		]
	};
	chart.setOption(option,false,false);
	
	sta.push(setInterval(function (){
			var data = option.series[0].data;
			var num = Math.floor(Math.random() * data.length);
			data[num].value = Math.round(Math.random() * 1200 + 300);
			chart.clear();
			chart.setOption(option);
		}, 7200)
	)
}


function getECharts3(boxObj){
	var id = boxObj.attr("id") + "-echarts-3"
	var style={
		width:500,
		height:300,
		top:720,
		left:140,
		padding:20,
		border:"1px solid #3f556f",
		position:"absolute",
		opacity:0
	}
	var div = creatDiv(id,style,boxObj);
	div.animate({opacity:1,left:40},800)
	var chart = echarts.init(div[0]);
	
	var option = {
		title: [
			{
				text: '建筑业',
				textStyle:{color:"#fff",fontSize:16},
				x:'left',
				top:4
			},{
				text: '产值及增速',
				textStyle:{color:"#FB9008",fontSize:20},
				x:'left',
				left:50
			},{
				text: '单位：亿元',
				textStyle:{color:"#fff",fontWeight:"normal",fontSize:14},
				x:'right',
			}
		],
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'cross',
				crossStyle: {
					color: '#fff',
					width: 1,
					type: 'dashed'
				},
				label: {
					backgroundColor: '#666',
				}
			}
		},
		grid: {
			left: '3%',
			right: '3%',
			bottom: '3%',
			containLabel: true
		},
		legend: {
			textStyle:{color:"white"},
			data:['生产总值', '建筑业增速'],
			top:50
		},
		dataZoom: {
			show: false,
			start: 0,
			end: 100
		},
		xAxis: [
			{
				type: 'category',
				boundaryGap: true,
				axisLine:lineColor,
				axisLabel:labelColor,
				data: (function (){
					var now = new Date();
					var res = [];
					var len = 10;
					while (len--) {
						res.unshift(now.toLocaleTimeString().replace(/^\D*/,''));
						now = new Date(now - 2000);
					}
					return res;
				})()
			},
			{
				type: 'category',
				boundaryGap: true,
				axisLine:{show:false},
				axisLabel:{show:false},
				data: (function (){
					var res = [];
					var len = 10;
					while (len--) {
						res.push(len + 1);
					}
					return res;
				})()
			}
		],
		yAxis: [
			{
				type: 'value',
				scale: true,
				max: 30,
				min: 0,
				axisLine:lineColor,
				axisLabel:labelColor,
				boundaryGap: [0.2, 0.2],
				splitLine : {show : false}  
			},
			{
				type: 'value',
				scale: true,
				max: 1200,
				min: 0,
				axisLine:lineColor,
				axisLabel:labelColor,
				boundaryGap: [0.2, 0.2],
				splitLine : {show : false}  
			}
		],
		series: [
			{
				name:'生产总值',
				type:'bar',
				barWidth: '70%',
				itemStyle:{normal:{color:"#85DAF4"}},
				xAxisIndex: 1,
				yAxisIndex: 1,
				data:(function (){
					var res = [];
					var len = 10;
					while (len--) {
						res.push(Math.round(Math.random() * 1000));
					}
					return res;
				})()
			},
			{
				name:'建筑业增速',
				type:'line',
				data:(function (){
					var res = [];
					var len = 0;
					while (len < 10) {
						res.push((Math.random()*10 + 5).toFixed(1) - 0);
						len++;
					}
					return res;
				})()
			}
		]
	};

	chart.setOption(option);
	var count = 11;
	
	sta.push(setInterval(function (){
			axisData = (new Date()).toLocaleTimeString().replace(/^\D*/,'');

			var data0 = option.series[0].data;
			var data1 = option.series[1].data;
			data0.shift();
			data0.push(Math.round(Math.random() * 1000));
			data1.shift();
			data1.push((Math.random() * 10 + 5).toFixed(1) - 0);

			option.xAxis[0].data.shift();
			option.xAxis[0].data.push(axisData);
			option.xAxis[1].data.shift();
			option.xAxis[1].data.push(count++);

			chart.setOption(option);
		}, 2100)
	)
	
}


function getECharts4(boxObj){
	var id = boxObj.attr("id") + "-echarts-4"
	var style={
		width:500,
		height:300,
		top:40,
		right:140,
		padding:20,
		border:"1px solid #3f556f",
		position:"absolute",
		opacity:0
	}
	var div = creatDiv(id,style,boxObj);
	div.animate({opacity:1,right:40,top:40},800);
	var chart = echarts.init(div[0]);
	
	var option = {
		title: [
			{
				text: '房屋工程',
				textStyle:{color:"#fff",fontSize:16},
				x:'left',
				top:4
			},{
				text: '竣工面积及增速',
				textStyle:{color:"#FB9008",fontSize:20},
				x:'left',
				left:66
			},{
				text: '单位：万㎡',
				textStyle:{color:"#fff",fontWeight:"normal",fontSize:14},
				x:'right',
			}
		],
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'cross',
				crossStyle: {
					color: '#fff',
					width: 1,
					type: 'dashed'
				},
				label: {
					backgroundColor: '#666',
				}
			}
		},
		grid: {
			left: '3%',
			right: '3%',
			bottom: '3%',
			containLabel: true
		},
		legend: {
			textStyle:{color:"white"},
			data:['竣工面积', '竣工增长'],
			top:50
		},
		dataZoom: {
			show: false,
			start: 0,
			end: 100
		},
		xAxis: [
			{
				type: 'category',
				boundaryGap: true,
				axisLine:lineColor,
				axisLabel:labelColor,
				data: ["2008","2009","2010","2011","2012","2013","2014","2015"]
			},
			{
				type: 'category',
				boundaryGap: true,
				axisLine:lineColor,
				axisLabel:{show:false},
				data: (function (){
					var res = [];
					var len = 8;
					while (len--) {
						res.push(len + 1);
					}
					return res;
				})()
			}
		],
		yAxis: [
			{
				type: 'value',
				scale: true,
				max: 30,
				min: 0,
				axisLine:lineColor,
				axisLabel:labelColor,
				boundaryGap: [0.2, 0.2],
				splitLine : {show : false}  
			},
			{
				type: 'value',
				scale: true,
				max: 1200,
				min: 0,
				axisLine:lineColor,
				axisLabel:labelColor,
				boundaryGap: [0.2, 0.2],
				splitLine : {show : false}  
			}
		],
		series: [
			{
				name:'竣工面积',
				type:'bar',
				barWidth: '30%',
				itemStyle:{normal:{color:"white"}},
				xAxisIndex: 1,
				yAxisIndex: 1,
				data:(function (){
					var res = [];
					var len = 8;
					while (len--) {
						res.push(Math.round(Math.random() * 1000));
					}
					return res;
				})()
			},
			{
				name:'竣工增长',
				type:'line',
				itemStyle:{normal:{color:"#00AEF1"}},
				data:(function (){
					var res = [];
					var len = 0;
					while (len < 8) {
						res.push((Math.random()*8 + 5).toFixed(1) - 0);
						len++;
					}
					return res;
				})()
			}
		]
	};
	
	var option2 = {
		title : [
			{
				text: '房建工程',
				textStyle:{color:"#fff",fontSize:16},
				x:'left',
				top:4
			},{
				text: '竣工面积构成',
				textStyle:{color:"#FB9008",fontSize:20},
				x:'left',
				left:66
			},{
				text: '图',
				textStyle:{color:"#fff",fontSize:16},
				x:'left',
				left:188,
				top:4
			}
		],
		tooltip : {
			trigger: 'item',
			formatter: "{a} <br/>{b} : {c} ({d}%)"
		},
		legend: {
			orient: 'vertical',
			left: 'right',
			top: 60,
			textStyle:{color:"white"},
			data: ['住宅房屋','厂房及建筑物','商业及服务用房屋','办公用房屋','其他']
		},
		series : [
			{
				name: '竣工面积',
				type: 'pie',
				radius : '50%',
				center: ['30%', '60%'],
				data:[
					{value:335, name:'住宅房屋'},
					{value:310, name:'厂房及建筑物'},
					{value:234, name:'商业及服务用房屋'},
					{value:135, name:'办公用房屋'},
					{value:1548, name:'其他'}
				],
				itemStyle: {
					emphasis: {
						shadowBlur: 10,
						shadowOffsetX: 0,
						shadowColor: 'rgba(0, 0, 0, 0.5)'
					}
				}
			}
		]
	};
	
	
	
	chart.setOption(option);
	var echarts_b = false;
	
	sta.push(setInterval(function (){
			var thisOption = echarts_b?option:option2;
			echarts_b = !echarts_b;
			div.animate({opacity:0},2000,function(){
				chart.clear();
				chart.setOption(thisOption);
				div.animate({opacity:1},1000);
			})
		}, 28000)
	)
		
}


function getECharts5(boxObj){
	var id = boxObj.attr("id") + "-echarts-5"
	var style={
		width:500,
		height:300,
		top:420,
		right:40,
		padding:20,
		border:"1px solid #3f556f",
		position:"absolute",
		opacity:0
	}
	var div = creatDiv(id,style,boxObj);
	div.animate({opacity:1,right:40,top:380},900)
	var chart = echarts.init(div[0]);
	
	var xAxisData = [];
	var data1 = [];
	var data2 = [];
	for (var i = 0; i < 100; i++) {
		xAxisData.push('T' + i);
		data1.push((Math.sin(i / 5) * (i / 5 -10) + i / 6) * 5);
		data2.push((Math.cos(i / 5) * (i / 5 -10) + i / 6) * 5);
	}

	var option = {
		title: [
			{
				text: '柱状图',
				textStyle:{color:"#fff",fontSize:16},
				x:'left',
				top:4
			},{
				text: '动画延迟',
				textStyle:{color:"#FB9008",fontSize:20},
				x:'left',
				left:50
			}
		],
		legend: {
			data: ['bar', 'bar2'],
			textStyle:{color:"#fff"},
			align: 'left',
			x:"right",
		},
		grid: {
			left: '3%',
			right: '3%',
			bottom: '3%',
			containLabel: true
		},
		tooltip: {},
		xAxis: {
			data: xAxisData,
			silent: false,
			splitLine: {
				show: false
			},
			axisLine:lineColor,
			axisLabel:labelColor
		},
		yAxis: {
			axisLine:lineColor,
			axisLabel:labelColor,
		},
		series: [{
			name: 'bar',
			type: 'bar',
			data: data1,
			animationDelay: function (idx) {
				return idx * 10;
			}
		}, {
			name: 'bar2',
			type: 'bar',
			data: data2,
			itemStyle:{normal:{color:"#00AEF1"}},
			animationDelay: function (idx) {
				return idx * 10 + 100;
			}
		}],
		animationEasing: 'elasticOut',
		animationDelayUpdate: function (idx) {
			return idx * 5;
		}
	};
	chart.setOption(option);
	
	sta.push(setInterval(function (){
			div.animate({opacity:0},1200,function(){
				chart.clear();
				chart.setOption(option);
				div.animate({opacity:1},400);
			})
		}, 20100)
	)
	
}


function getTable1(boxObj){
	var id = boxObj.attr("id") + "-table-1"
	var style={
		width:500,
		height:300,
		top:820,
		right:-100,
		border:"1px solid #3f556f",
		position:"absolute",
		overflow:"hidden",
		//background:"rgba(0,174,241,0.2)",
		opacity:0
	}
	var div = creatDiv(id,style,boxObj);
	div.animate({opacity:1,right:40,top:720},500);
	
	var data = [
		["浙江省二建建设集团有限公司","建筑企业","108.18"],
		["龙元建设集团有限公司","建筑企业","285.22"],
		["浙江欣捷建设有限公司","建筑企业","145.20"],
		["浙江万华建设集团股份有限公司","建筑企业","110.68"],
		["博宏恒基集团有限公司","建筑企业","114.54"],
		["大荣建设有限公司","建筑企业","110.68"],
		["宁波建工股份有限公司","建筑企业","541.88"],
		["华丰建设股份有限公司","建筑企业","138.50"],
	];

	
	
	var divContent = "<div class='boxTitle'>2015年宁波市<span>龙头企业</span></div>";
		divContent += "<div class='boxRTText'>单位:<span>亿元</span></div>";
		divContent += "<div class='tableTh'>";
		divContent += 	"<span style='width:45%;'>企业名称</span>";
		divContent += 	"<span style='width:30%;'>企业类型</span>";
		divContent += 	"<span style='width:25%;border:none;'>产值额</span>";
		divContent += "</div>";
		divContent += "<div class='tableBody'>";
		for(var i=0;i<data.length;i++){
			var trStyle = i%2==0?"background:rgba(0,174,241,0.15);":"";
			divContent += 	"<div class='tableTr' style='" + trStyle + "'>";
			divContent += 		"<span style='width:45%;color:white;'>" + data[i][0] + "</span>";
			divContent += 		"<span style='width:30%;'>" + data[i][1] + "</span>";
			divContent += 		"<span style='width:25%;border:none;'>" + data[i][2] + "</span>";
			divContent += 	"</div>";
		}
		divContent += "</div>";
	div.html(divContent);
		
	sta.push(setInterval(function(){
			div.find(".tableBody .tableTr").eq(0).slideUp(1000,function(){
				$(this).show();
				div.find(".tableBody").append($(this));
			});
		},5000)
	)
}


function getTip1(boxObj){
	var id = boxObj.attr("id") + "-tip-1"
	var style={
		width:1340,
		height:90,
		bottom:100,
		left:580,
		position:"absolute",
		overflow:"hidden",
		padding:"0 20px",
		//background:"rgba(0,174,241,0.2)",
		opacity:0
	}
	var div = creatDiv(id,style,boxObj);
	div.animate({opacity:1,bottom:40},500);
	
	var flowOutMessage = 9617;
	var flowInMessage = 17902;
	
	var divContent = "<div class='tip'>建筑业总产值<br><span>7735.1</span>亿元</div>";
		divContent += "<div class='tip'>企业总数<br><span>5349</span>家</div>";
		divContent += "<div class='tip'>从业人员<br><span>4182</span>人</div>";
		divContent += "<div class='tip'>项目总数<br><span>59609</span>个</div>";
		divContent += "<div class='tip'>起重机械<br><span>9617</span>架</div>";
		divContent += "<div class='tip2'>";
		divContent += 	"<div class='tip2_item'><span>今日流出：</span><span id='flowoutM'>" + flowOutMessage.toLocaleString() + "</span><span>条</span></div>";
		divContent += 	"<div class='tip2_item'><span>累计数据总量：</span><span>98.9</span><span>GB</span></div>";
		divContent += "</div>";
		divContent += "<div class='tip2'>";
		divContent += 	"<div class='tip2_item'><span>今日流入：</span><span id='flowinM'>" + flowInMessage.toLocaleString() + "</span><span>条</span></div>";
		divContent += 	"<div class='tip2_item'><span>累计数据总数：</span><span>885.6366</span><span>万条</span></div>";
		divContent += "</div>";
	div.html(divContent);
	
	sta.push(setInterval(function (){
			flowOutMessage += Math.floor(Math.random() * 50);
			flowInMessage += Math.floor(Math.random() * 50);
			$("#flowoutM").html(flowOutMessage.toLocaleString());
			$("#flowinM").html(flowInMessage.toLocaleString());
		}, 1000)
	)
}


function getMainDiv(boxObj){
	var id = boxObj.attr("id") + "-main-div"
	var style={
		width:1340,
		height:800,
		bottom:150,
		left:580,
		position:"absolute",	
		overflow:"hidden",
		padding:"0 20px",
		opacity:0
	}
	var div = creatDiv(id,style,boxObj);
	div.animate({opacity:1,bottom:170},500);
	
	var divContent = "<div class='cornerLine TLCorner'></div>";
		divContent += "<div class='cornerLine TRCorner'></div>";
		divContent += "<div class='cornerLine BLCorner'></div>";
		divContent += "<div class='cornerLine BRCorner'></div>";
		divContent += "<div class='MD_title'>宁波建筑业专题</div>";
	div.append($(divContent));
	
	getMDECharts(div);
	getMDTip(div);
	getMDMap(div);
}


function getMDMap(boxObj){
	var id = boxObj.attr("id") + "-MD-map"
	var style={
		width:600,
		height:600,	
		top:120,
		left:370,
		position:"absolute",	
		overflow:"hidden",
		border:"0px solid #3f556f",
		background:"rgba(63,85,111,0)",
		padding:"0 20px",
		"z-index":"2",
		opacity:0
	}
	var div = creatDiv(id,style,boxObj);
	div.animate({opacity:1},500);
	div.html("<div style='zoom:1.2;position:absolute;left:-60px;top:20px;'>" + ningMap + "</div>");
	//var chart = echarts.init(div[0]);
	
	//chart.setOption(option);
}


function getMDTip(boxObj){
	var id = boxObj.attr("id") + "-MD-tip"
	var style={
		width:300,
		height:450,	
		top:20,
		right:65,
		position:"absolute",	
		overflow:"hidden",
		//border:"1px solid #3f556f",
		padding:"0 20px",
		"z-index":"3",
		opacity:0
	}
	var div = creatDiv(id,style,boxObj);
	div.animate({opacity:1,top:150},500);
	
	var divContent = "<div class='MDTipTitle'>鄞州区</div>";
		divContent += "<div class='MDTipLine'>开工项目数量与面积</div>";
		divContent += "<div class='MDTipLine2' id='MDTip1'><span>4,017</span>个<span>／28,741</span>万㎡</div>";
		divContent += "<div class='MDTipLine'>竣工项目数量与面积</div>";
		divContent += "<div class='MDTipLine2' id='MDTip2'><span>345</span>个<span>／4,216</span>万㎡</div>";
		divContent += "<div class='MDTipLine'>企业数量</div>";
		divContent += "<div class='MDTipLine2' id='MDTip3'><span>519</span>家</div>";
		divContent += "<div class='MDTipLine'>龙头企业</div>";
		divContent += "<div class='MDTipLine2' id='MDTip4'>";
		divContent += 	"浙江万华建设集团股份有限公司";
		divContent += 	"<br>大荣建设有限公司";
		divContent += 	"<br>宁波建工股份有限公司";
		divContent += "</div>";
	
	div.html(divContent);
	sta.push(setInterval(function (){
			div.fadeOut(1000,function(){
				var r = Math.floor(Math.random() * areaData.length + 1);
				div.find("div").eq(0).html(areaData[r]);
				$("#MDTip1 span").eq(0).html((Math.floor(Math.random() * 5000 + 1000)).toLocaleString());
				$("#MDTip1 span").eq(1).html(" / "+(Math.floor(Math.random() * 20000 + 4000)).toLocaleString());
				$("#MDTip2 span").eq(0).html((Math.floor(Math.random() * 2000 + 100)).toLocaleString());
				$("#MDTip2 span").eq(1).html(" / "+(Math.floor(Math.random() * 5000 + 1000)).toLocaleString());
				$("#MDTip3 span").html((Math.floor(Math.random() * 1500 + 150)).toLocaleString());
				div.slideDown(300);
			})
		}, 17400)
	)
}


function getMDECharts2(boxObj){
	var id = boxObj.attr("id") + "-MD-echarts-2";
	var style={
		width:400,
		height:500,
		top:250,
		left:-20,
		position:"absolute",	
		overflow:"hidden",
		padding:"0 20px",
		opacity:0,
		background:"rgba(255,255,255,0)"
	}
	var div = creatDiv(id,style,boxObj);
	div.animate({opacity:1,top:100,left:20},500);
	
	//地区名
	var areaDataN = ["余姚市","慈溪","奉化区","宁海县","象山县","鄞州区","海曙区","江北区","镇海区","北仑区","杭州湾新区","大榭开发区","高新区","东钱湖旅游度假区"];
	var data = ["78%","86%","70%","50%","24%","44%","55%","85%","67%","42%","98%","12%","63%","57%","49%"];
	var data2 = ["166.6%","166.6%","166.6%","166.6%","166.6%","166.6%","166.6%","166.6%","166.6%","166.6%","166.6%","166.6%","166.6%","166.6%","166.6%"];
	var title = ["丙类房屋治理完成情况(三年计划)","2016年丙类房屋治理完成情况(1537/2101)"];
	
	
	function getHtml(title,data){
		var html = '<div style="color:#ddd;font-size:16px;line-height:30px;margin-bottom:20px;">' + title + '</div>'
		for(var i = 0;i<areaDataN.length;i++){
			html += '<div style="clear:both;overflow:hidden;">\
						<div style="line-height:30px;font-size:14px;color:#ddd;float:left;width:120px;text-align:right">' + areaDataN[i] + '</div>\
						<div style="overflow:hidden;height:14px;color:#ddd;float:left;width:160px;text-align:right;margin:8px 10px;border:1px solid gray;padding:1px;">\
							<div style="height:100%;background:#eee;width:0%;" alt="' + data[i] + '"></div>\
						</div>\
						<div style="display:none;line-height:30px;font-size:14px;color:#add3e6;float:left;width:50px">' + data[i] + '</div>\
					</div>';
		}
		div.html(html);
		div.find("div[alt]").each(function(a){
			$(this).animate({width:$(this).attr("alt")},1500,function(){
				$(this).parent().next().fadeIn();
			})
		})
	}
	
	getHtml(title[0],data);
	var bl = true;
	sta.push(setInterval(function (){
			div.fadeOut(1000,function(){
				if(bl){
					getHtml(title[1],data2);
				}else{
					getHtml(title[0],data);
				}
				bl=!bl;
				div.slideDown(200);
			})
		}, 15400)
	)
	
}

function getMDECharts(boxObj){
	var id = boxObj.attr("id") + "-MD-echarts-1"
	var style={
		width:350,
		height:700,
		bottom:150,
		left:-20,
		position:"absolute",	
		overflow:"hidden",
		padding:"0 20px",
		opacity:0
	}
	var div = creatDiv(id,style,boxObj);
	div.animate({opacity:1,bottom:20,left:20},500);
	
	var chart = echarts.init(div[0]);
	
	
	var data = [
		{itemStyle:{normal:{color:"#900006"}},value:1132},
		{itemStyle:{normal:{color:"#900006"}},value:2461},
		{itemStyle:{normal:{color:"#900006"}},value:1115},
		{itemStyle:{normal:{color:"#900006"}},value:1854},
		{itemStyle:{normal:{color:"#900006"}},value:4990},
		4216,
		3451,
		1967,
		1579,
		2004,
		710,
		376,
		5,
		23,
		63,
		5,
		50
	];
	var data2 = [
		{itemStyle:{normal:{color:"#900006"}},value:125},
		{itemStyle:{normal:{color:"#900006"}},value:527},
		{itemStyle:{normal:{color:"#900006"}},value:239},
		{itemStyle:{normal:{color:"#900006"}},value:585},
		{itemStyle:{normal:{color:"#900006"}},value:1169},
		1148,
		928,
		675,
		378,
		1028,
		539,
		45,
		111,
		5,
		221,
		10,
		12
	];

	var option = {
		title: [
			{
				text: '各区域产值对比',
				textStyle:{color:"#fff",fontSize:16},
				top:20
			},
			{
				text: '(单位：亿元)',
				textStyle:{color:"#ccc",fontSize:12,fontWeight:"normal"},
				top:24,
				left:114
			},
		],
		grid: {
			left: '1%',
			right: '13%',
			bottom: '1%',
			containLabel: true
		},
		xAxis: {
			type: 'value',
			max: 2000,
			splitLine: {
				show: false
			},
			show:false
		},
		yAxis: {
			type: 'category',
			axisLine:{show:false},
			data: areaData,
			axisTick: {
				show: false
			},   
			axisLabel:labelColor
		},
		series: [
			{
				type: 'bar',
				barWidth:"30%",
				label: {
					normal: {
						show: true,
						position:'right',
						color:'#94BEE8',
						formatter:function(a){
							return a.value.toLocaleString();
						}
					}
				},
				itemStyle:{normal:{color:"#B26316"}},
				data:data2.reverse(),
				animationDelay: function (idx) {
					return idx * 50 + 1;
				}
			}
		],
		animationEasing: 'elasticOut',
		animationDelayUpdate: function (idx) {
			return idx * 2;
		}
	};
	var option2 = {
		title: [
			{
				text: '各区域竣工面积对比',
				textStyle:{color:"#fff",fontSize:16,},
				top:20
			},
			{
				text: '(单位：万㎡)',
				textStyle:{color:"#ccc",fontSize:12,fontWeight:"normal"},
				top:24,
				left:146
			},
		],
		grid: {
			left: '1%',
			right: '13%',
			bottom: '1%',
			containLabel: true
		},
		xAxis: {
			show:false
		},
		yAxis: {
			type: 'category',
			axisLine:{show:false},
			data: areaData.reverse(),
			axisTick: {
				show: false
			},   
			axisLabel:labelColor
		},
		series: [
			{
				type: 'bar',
				barWidth:"30%",
				label: {
					normal: {
						show: true,
						position:'right',
						color:'#94BEE8',
						formatter:function(a){
							return a.value.toLocaleString();
						}
					}
				},
				itemStyle:{normal:{color:"#B26316"}},
				data:data.reverse(),
				animationDelay: function (idx) {
					return idx * 100 + 10;
				}
			}
		],
		animationEasing: 'elasticOut',
		animationDelayUpdate: function (idx) {
			return idx * 2;
		}
	};
	
	chart.setOption(option);
	var echarts_b = false;
	
	sta.push(setInterval(function (){
			var thisOption = echarts_b?option:option2;
			echarts_b = !echarts_b;
			div.animate({opacity:0},3000,function(){
				chart.clear();
				chart.setOption(thisOption);
				div.animate({opacity:1},2000);
			})
		}, 15000)
	)
}





