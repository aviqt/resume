

window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
var weekday = ["日", "一", "二", "三", "四", "五", "六"];

$(function(){
	/*除输入框外禁止选中*/
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




/*数据表格展示*/
function showTable(columns,data,obj){  
	var tableHtml = "<table><thead><tr>"
	for(var i=0;i < columns.length;i++){
		tableHtml += "<th " + columns[i].attr + ">" + columns[i].html +"</th>";
	}
	tableHtml += "</tr></thead><tbody>";
	for(var j=0;j < data.length;j++){
		tableHtml += "<tr " + data[j].attr + ">"; 
		for(var i=0;i < columns.length;i++){
			tableHtml += "<td>" + data[j][columns[i].name] +"</td>";
		}
		tableHtml +="</tr>";
	}
	tableHtml += "</tbody></table>";
	obj.html(tableHtml);
	
	/*阻止表单控件事件冒泡*/
	$("input,a").click(function (e) {
		if (e && e.stopPropagation){
			e.stopPropagation();
		}else{
			window.event.cancelBubble = true;
		}
	});
	
	 /*多选框全选功能*/
	obj.find("th :checkbox").click(function () {
	    var checkboxState = this.checked;
	    obj.find(":checkbox").prop({ "checked": checkboxState });
	})
	obj.find("td :checkbox").click(function () {
	    var checkboxState = obj.find("td :checkbox").not(":checked").length == 0 ? true : false;
	    obj.find("th :checkbox").prop({ "checked": checkboxState });
	})
}


/*页码设置*/
function setPage(pageIndex, pageRow, count,fn, obj) {
    var pageCount = parseInt(count / pageRow) + 1;
	var pageStart = pageIndex  < 3 ? 1 : pageIndex - 2;
	var pageEnd = pageStart + 5 > pageCount ? pageCount : pageStart + 5;
	pageStart = pageEnd - 5 > 0 ? pageEnd - 5 : 1;
	var attr = '';
	attr = 1 == pageIndex ? 'class="prev disabled"' : 'class="prev" onclick="' + getFName(fn) + '(' + (pageIndex-1) + ')"';
	var pageHtml = '<div class="pageBody">\
                        <span>第' + pageIndex + '页/共' + pageCount + '页</span>\
                        <ul>\
                        <li ' + attr + '><</li>';
	for (var i = pageStart; i <= pageEnd ; i++) {
	    attr = i == pageIndex ? 'class="active"' : 'onclick = "' + getFName(fn) + '(' + i + ')"';
	    pageHtml += '<li ' + attr + '> ' + i + '</li>'; 
	}
	attr = pageCount == pageIndex ? 'class="next disabled"' : 'class="next" onclick="' + getFName(fn) + '(' + (pageIndex + 1) + ')"';
	pageHtml += '<li ' + attr + '>></li>\
                        </ul>\
                        <div class="pageGoto"><span>转到</span><input type="text" /><a>GO</a></div>\
                    </div>';
	obj.html(pageHtml);

	obj.find(".pageGoto a").click(function () {
	    var pid = parseInt($(this).siblings("input").val());
	    if (pid > 0 && pid <= pageCount) fn(pid);
	})
}


/*获取函数名*/
function getFName(fn){
    return (/^[\s\(]*function(?:\s+([\w$_][\w\d$_]*))?\(/).exec(fn.toString())[1] || '';
}



















