/*window.onload=function (){
	var oNav=document.getElementsByClassName('nav_menu');
	//console.log(oNav);
	var oNavlist=document.getElementsByClassName('nav_list');
	//console.log(oNavlist);
	for(var i=0;i<oNav.length;i++){
		console.log(i)
		oNav[i].onmouseover=function(){
			for(var j=0;j<i;j++){
				console.log(j);
				oNavlist[j].style.display="block";
			}	
		}
		oNav[i].onmouseout=function(){
			for(var j=0;j<i;j++){
				oNavlist[j].style.display="none";
			}	
		}
	}
}*/
/*$(function(){
    $(".mainLeft li").click(function() {
        $(this).siblings().children("a").removeClass('active');  // 删除其他兄弟元素的样式
        $(this).children("a").addClass('active');                            // 添加当前元素的样式
    });
}); */

$(function(){
    $(".mainLeft li a").click(function(){
        $(this).parent().siblings().children().removeClass('active');  // 删除其他兄弟元素的样式
        $(this).siblings().removeClass('active');  
        //$(this).parent().addClass('active');
        $(this).addClass('active');                            // 添加当前元素的样式
    });
    $(".mainLeft li a ul li a").click(function(){
        console.log("***********");
    })
}); 

function isDel() {
    if(confirm("是否删除"))
        alert("删除成功");
    else
        alert("未能删除");
}


/*function show(li){
	var ul=li.getElementsByTagName("ul")[0];
	// 关建二：在li这个对象内查询标签名为ul的标签，由于二级标签只有一个，所以索引为0即可。
	ul.style.display="block";
	// 关键三：当鼠标划过li时，其子元素ul标签的display为block
	}
	function hide(li){
	var ul=li.getElementsByTagName("ul")[0];
	ul.style.display="none";
	// 关键四：当鼠标划出li时，其子元素ul的display为none
}*/
/*
function ShowMenu(obj, noid) {
    var block = document.getElementById(noid);
    var n = noid.substr(noid.length - 1);
    if (noid.length == 4) {
        var ul = document.getElementById(noid.substring(0, 3)).getElementsByTagName("ul");
        var h2 = document.getElementById(noid.substring(0, 3)).getElementsByTagName("h2");
        for (var i = 0; i < h2.length; i++) {
            h2[i].innerHTML = h2[i].innerHTML.replace("+", "-");
            h2[i].style.color = "";
        }
        obj.style.color = "#FF0000";
        for (var i = 0; i < ul.length; i++) {
            if (i != n) {
                ul[i].className = "no";
            }
        }
    } else {
        var span = document.getElementById("menu").getElementsByTagName("span");
        var h1 = document.getElementById("menu").getElementsByTagName("h1");
        for (var i = 0; i < h1.length; i++) {
            h1[i].innerHTML = h1[i].innerHTML.replace("+", "-");
            h1[i].style.color = "";
        }
        obj.style.color = "#0000FF";
        for (var i = 0; i < span.length; i++) {
            if (i != n) {
                span[i].className = "no";
            }
        }
    }
    if (block.className == "no") {
        block.className = "";
        obj.innerHTML = obj.innerHTML.replace("-", "+");
    } else {
        block.className = "no";
        obj.style.color = "";
    }
}
*/

/*window.onload = function()
    {
        initLinks();
        changeFrameHeight();
    };
var nav_list=document.getElementById("nav_list");
function initLinks() {
    //for (var i=0; i<document.links.length; i++) {
     //   document.links[i].target = "icontent";
   // }
   nav_list
}
//iframe自适应高度
function changeFrameHeight(){
    var ifm= document.getElementById("icontent"); 
    ifm.height=document.documentElement.clientHeight;
}
changeFrameHeight()
window.onresize=function(){  
     changeFrameHeight();  
}*/