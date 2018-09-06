
var menuData = [
  {
	text:'常用',
	items:[
	  {
		text:'数据驾驶舱',
		icon:'images/icon/message.png',
		href:'form.html',
		items:[]
	  },
	  {
		text:'表计电量',
		icon:'images/icon/message.png',
		href:'table-list.html',
		items:[]
	  },
	  {
		text:'表计电量-树',
		icon:'images/icon/message.png',
		href:'tree.html',
		items:[]
	  },
	]
  },
  {
	text:'运营管理',
	items:[
	  {
		text:'能耗台帐',
		icon:'images/icon/nhtz.png',
		items:[
		  {
			text:'用能日历',
			items:[
			  {
				text:'用能日历',
				items:[]
			  },
			  {
				text:'用能实时数据'
			  },
			]
		  },
		  {
			text:'用能实时数据'
		  },
		  {
			text:'历史数据分析'
		  },
		  {
			text:'表计电量',
			href:'table-list.html',
		  },
		]
	  },
	  {
		text:'策略管理',
		icon:'images/icon/clgl.png',
		items:[
		  {
			text:'用能实时数据'
		  },
		  {
			text:'历史数据分析'
		  },
		  {
			text:'表计电量'
		  },
		]
	  },
	  {
		text:'远程控制',
		icon:'images/icon/yckz.png',
		items:[
		  {
			text:'用能实时数据'
		  },
		  {
			text:'历史数据分析'
		  },
		  {
			text:'表计电量'
		  },
		]
	  },
	  {
		text:'设备管理',
		icon:'images/icon/sbgl.png',
		items:[
		  {
			text:'用能实时数据'
		  },
		  {
			text:'历史数据分析'
		  },
		  {
			text:'表计电量'
		  },
		]
	  },
	  {
		text:'告警消息',
		icon:'images/icon/gjxx.png',
		items:[]
	  },
	  {
		text:'组织管理',
		icon:'images/icon/zzgl.png',
		items:[]
	  },
	]
  },
  {
	text:'运营后台',
	items:[
	  {
		text:'日常维护',
		icon:'images/icon/rcwh.png',
		items:[]
	  },
	  {
		text:'实施部署',
		icon:'images/icon/ssbs.png',
		items:[]
	  }
	]
  },
]




$(document).ready(function(){
  console.log(menuData);
  showMenu(menuData,$('.menu-inner'));
})


function showMenu(data,obj){
  var html = '';
  data.map(function(item){
    html += '<div class="menu-item">';
    html += '<span>';
    html += item['text'];
    html += '</span>';
    html += getChildMenu(item['items'],-1);
    html += '</div>';
  })
  //console.log(html);
  obj.html(html);
  menuLoad(obj.find('.menu-item li'));
}


function getChildMenu(data,i){
  var html = '';
  var marginLeft = i >= 0 ? 50 + i * 15:'';
  if(!data || data.length == 0)return html;
  html += '<ul>';
  data.map(function(item){
    var liClass = (item['items'] && item['items'].length > 0)? 'hasChild':'';
    html += '<li class="' + liClass + '" data-href="' + (item['href']?item['href']:'') + '" data-text="' + (item['text']?item['text']:'') + '">';
    html += '<div>';
    html += '<span style="margin-left:' + marginLeft + 'px;">';
    if(item['icon'])html += '<img src="' + item['icon'] + '" />';
    html += item['text'];
    html += '</span>';
    html += '</div>';
    html += getChildMenu(item['items'],(i + 1));
    html += '</li>';
  })
  html += '</ul>';
  return html;
}


function menuLoad(obj){
  obj.click(function(e){
  	var thisObj = $(this);
	
	if(thisObj.attr('data-href') !== ''){
		$('#mainIframe').attr({src:thisObj.attr('data-href')});
		$('#iframeTitle').html(thisObj.attr('data-text'));
	}
	
  	if(thisObj.children('ul').is(":hidden")){
  	  thisObj.children('ul').slideDown(200,function(){
  	  	thisObj.addClass('open');
  	  });
  	  
  	}else{
  	  thisObj.find('ul').slideUp(200,function(){
  	  	thisObj.removeClass('open');
  	  	thisObj.find('li').removeClass('open');
  	  });
  	}
  	if(thisObj.children('ul').length === 0 && thisObj.attr('data-href') !== ''){
  	  obj.removeClass('active');
  	  thisObj.addClass('active');
  	}
  	e.stopPropagation();
  })
}









