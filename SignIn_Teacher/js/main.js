$(function(){
	getInfo(1);
	$(".InfoSearch").keydown(function(event){
		if(event.keyCode ==13){
			var search=$(".InfoSearch input").val();
    		searchInfo(search);
		}
	});
    
})
var url='http://39.108.63.108/Sign_In/'
//var url='http://172.16.120.116:8080/Sign_In/';//赵博
//var url='http://39.108.63.108/signin/'//董涛
var pn;
//查询函数
function getInfo(page){
	//var urls=url+'AdminStudent/findAll.action?page='+page;//赵博
	var urls=url+'AdminTeacher/findAll.action?page='+page
	//var urls=url+"StudentServlet?method=findAll";//董涛
	$(".mainRightNav").empty();
	$(".page").empty();
	$(".mainRightNav").append("<h1 class='fl'>全部老师信息  </h1><div class='InfoSearch fr'><input type='text' placeholder='姓名、工号、年龄、性别'><a href='#'><i  class='am-icon-search ' aria-hidden='true' ></i></a></div><button class='btn btn-primary btn-lg btn-addInfo' data-toggle='modal' data-target='#myModal'>添加</button> <table cellspacing='0' class='table'><tr><td class='operation'>选定</td> <td class='sign'>签到</td> <td class='sname'>姓名</td> <td>工号</td>  <td>密码</td> <td>年龄</td> <td>学院</td> <td>性别</td>  <td>操作</td> </tr></table>");
	$.getJSON(urls,function(res){
		//页码 
		var data=res.rows;//赵博
		//console.log(data)
		for(var i=0;i<data.length;i++){
			var stu=data[i];//学生信息
			var dbAcademy=stu.dbAcademy;//学院
			var dbClass=stu.dbClass;
			
			
			//赵博
			$(".table").append("<tr ids='"+stu.tid+"'>"+
				"<td class='operation'><input type='checkbox'/></td>"+
				"<td>"+"  "+"</td>"+
				"<td>"+stu.tname+"</td>"+
				"<td>"+stu.tnumber+"</td>"+
				"<td>"+stu.tpass+"</td>"+
				"<td>"+stu.tage+"</td>"+
				"<td>"+dbAcademy.aname+"</td>"+
				"<td>"+stu.tsex+"</td>"+
				/*"<td>"+stu.spass+"</td>"+*/
				"<td> <button class='btn btn-primary' data-toggle='modal' data-target='#myModal1'><span class='am-icon-pencil-square-o'></span> 修改</button> <button class='btn btn-primary' style='background: #F91028;border:1px solid #F91028' ><span class='am-icon-trash-o'></span> 删除</button>  "+"</td>"+
			"</tr>");
		}
		//添加
		$(".btn-addInfo").click(function(){
			listPage('userAca','userClass');
		})

		//删除
		$(".table td button:last-child").click(function(){
			var i=$(this).parent().parent().attr("ids");
			deleInfo(i);
		});

		//修改
		$(".table td button:first-child").click(function(){
			var ids=$(this).parent().parent().attr("ids");
			var arr=new Array();
			for(var i=1;i<=$(this).parent().siblings().length;i++){
				arr[i]=$(this).parent().siblings("td:nth-child("+i+")").text();
			}
			arr.push(ids);
			console.log(arr);
			correctInfo(arr);
		})

		//分页
    	pageNumber();

    	//搜索
    	$(".InfoSearch a").click(function(){
    		//alert("********");
    		var search=$(".InfoSearch input").val();
    		searchInfo(search);
    	})

		
	});
}

function signin(sin){
	var urls="http://39.108.63.108/signin/AdminServlet?method="+sin;
	$.getJSON(urls,function(res){
		//console.log(res);
		//document.write("res");
		var msg= parseInt(res.msg);
		if(res.status==200 ){
			//console.log(msg)
			alert("操作成功！！！")
		}else{
			alert("操作失败！！！")
		}
	});
}


//分页
function pageNumber(){
	var urls=url+'AdminTeacher/findAll.action?page=1';
	$.getJSON(urls,function(res){
		//var data=res.rows;//赵博
		//console.log(res);
		var pageNumber=Math.ceil(res.total/res.pageNumber);
		//console.log(pageNumber);
		if(pageNumber=1){

		}else{
			for(var i=1;i<=pageNumber;i++){	
			$(".page").append("<a href='#' class='pages' cla='"+i+"''>"+i+"</a>");
			}
		}
		
		$(".pages").click(function(){
			var pn=$(this).attr("cla");
			//console.log(pn);
			getInfo(pn);
		})
	});
}

//选择学院
function listPage(aca){
	$("."+aca).empty();
	var urls=url+'AdminAcademy/findAll.action?';
	$.ajax({
		url:urls,
		data:{Full:'full'},
		type:"get",
		dataType:'json',
		success:function(data){
			var data=data.data;
			//console.log(data);
			for(var i=0;i<data.length;i++){
				//console.log(data[i]);
				$("."+aca).append("<option value="+data[i].aid+">"+data[i].aname+"</option>");
			}
		},
		error:function(){
			alert("获取学院失败！请检查你的网络！");
		}
	})
	//console.log("--------")
}



//删除老师信息
function deleInfo(i){
	if(confirm("是否删除此老师？")){
    	//deleInfo(i);
	    var urls=url+"AdminTeacher/delete.action?ids="+i;
		$.getJSON(urls,function(res){
			if(res.status==200){
	            //alert("删除成功！！！");
	            //console.log(pn);
	            getInfo(1);
	        }else{
	        	alert("删除失败！")
	        }
		})
    }  
    else{
        alert("已取消删除");
    }
}


//添加老师
function addInfo(){
	//var userName=document.getElmentById("userName").value;
	var sname=$("#userName").val();
	var snumber=$("#userNumber").val();
	var spass=$("#userPwd").val();
	var ssex=$("#userSex input:checked").val();
	var sage=$("#userAge").val();
	var sdate=$("#userDate").find("option:selected").text();
	var aid=$(".userAca").find("option:selected").val();
	var cid=$(".userClass").find("option:selected").val();
	//             姓名 学号   性别 年龄 日期  班级 学院 是否在校
	var urls=url+"AdminTeacher/add.action?"
	$.ajax({
			url:urls,
			type:'post',
			data:{
				tname:sname,
				tnumber:snumber,
				tage:sage,
				tsex:ssex,
				tdate:sdate,
				cid:cid,
				aid:aid
			},
			dataType:'json',
			success:function(data){
				if(data.status==200){
					alert("添加学生信息成功！");
					window.location.reload();//刷新当前页面.
				}else{
					alert("添加学生信息失败！请重新填写");
				}
				getInfo(1);
			},
			error:function(){
				alert("添加学生信息失败！请检查你的网络！")
			}
		})
}


//修改学生信息
function correctInfo(arr){
	listPage("userAcas");
	var urls=url+"AdminTeacher/update.action?"
	$(".correctInfo .addInfo").empty();
	$(".correctInfo").append("<div class='addInfo' ids='"+arr[9]+"'>"+
				"<p><label for='userName'>姓名：<input type='text' id='userName' name='sname'></label></p>"+
				"<p><label for='userNumber'>学号：<input type='text' id='userNumber' name='snumber'></label></p>"+
				"<p><label for='userPwd'>密码：<input type='text' id='userPwd' name='spass'></label></p>"+
				"<p><label for='userAge'>年龄：<input type='text' id='userAge' name='sage'></label></p>"+
				"<p><from id='userSex' class='userSex'>性别：<label><input name='ssex' type='radio' value='男' checked='true'>男</label><label><input name='ssex' type='radio' value='女'>女</label></from></p>"+
				"<p>学院：<select class='userAcas' name='aid'><option value=''>选择学院</option>	</select></p>"+"</div>"
				);
	//console.log(arr);
	/*
		1   key: "value", "选定"
		2   key: "value", "签到"
		3   key: "value", "姓名"
		4   key: "value", "学号"
		5   key: "value", "班级"
		6   key: "value", "密码"
		7   key: "value", "年龄"
		8   key: "value", "入学时间"
		9   key: "value", "学院"
		10  key: "value", "性别"
		11  key: "value", "sid"
	*/
	$(".correctInfo .addInfo #userName").val(arr[3]); //名字
	$(".correctInfo .addInfo #userNumber").val(arr[4]);//学号
	$(".correctInfo .addInfo #userPwd").val(arr[5]);//密码
	$(".correctInfo .addInfo #userAge").val(arr[6]);//年龄
	$(".correctInfo .addInfo .userAcas option:selected").text(arr[7]);//学院
	//给性别赋值
	function getSex(){
		var sex=$(".correctInfo .addInfo #userSex input");
		//console.log(sex);
		for(var i =0;i<sex.length;i++){
            var r =sex[i];
            if(r.value==arr[8]){
                r.checked=true;
                break;
            }
        }
	}
	getSex();
	//console.log(arr[7])
	$(".btn-correctInfo").click(function(){
		console.log($(".correctInfo .addInfo #userSex input").val())
		$.ajax({
			url:urls,
			type:'post',
			data:{
				tid:arr[9],        //sid必传
				tname:$(".correctInfo .addInfo #userName").val(),
				tnumber:$(".correctInfo .addInfo #userNumber").val(),
				tage:$(".correctInfo .addInfo #userAge").val(),
				tsex:$(".correctInfo .addInfo #userSex input:checked").val(),
				aid:$(".correctInfo .addInfo .userAcas option:selected").val()
			},
			dataType:'json',
			success:function(data){
				if(data.status==200){
					alert("修改成功！！");
				}else{
					alert("修改失败！请检查！");
				}
			},
			error:function(){
				alert("请检查你的网络")
			}

		})
	})
}

//搜索功能
function searchInfo(Info){

	/*if(typeof(parseInt(Info))=="number"){
		alert(Info);
	}else{
		alert("不是数字")
	}*/
	var tname,tsex,tage,tnumber,aname; 
	var info=Number(Info);
	if(!isNaN(info)){
		//alert("是数字");
		tnumber=Info;
		tage=Info;
	}else{
		tname=Info;
		tsex=Info;
		aname=Info;
	}
	//console.log(tsex);
	$.ajax({
		url:url+'AdminTeacher/select.action?',
		type:'post',
		data:{
			tname:tname,
			tnumber:tnumber,
			tsex:tsex,
			tage:tage,
			//dbAcademy.aname:aname
		},
		dataType:'json',
		success:function(data){
			
			//console.log(data);		
			//console.log(data.total);
			if(data.total=='0'){
				alert("不存在此用户！");
			}else{
				//$(".table").empty();
				$(".mainRightNav").empty();
				//$(".mainRightNav table tbody").empty();
				$(".mainRightNav").append("<h1 class='fl'>全部老师信息</h1><div class='InfoSearch fr'><input type='text' placeholder='姓名、工号、年龄、性别'><a href='#'><i  class='am-icon-search ' aria-hidden='true' ></i></a></div><button class='btn btn-primary btn-lg btn-addInfo' data-toggle='modal' data-target='#myModal'>添加</button><table cellspacing='0' class='searchtable'><tr><td class='operation'>选定</td> <td class='sign'>签到</td> <td class='sname'>姓名</td> <td>工号</td>  <td>密码</td> <td>年龄</td> <td>学院</td> <td>性别</td>  <td>操作</td> </tr></table>");
				for(var i=0;i<data.rows.length;i++){
					var stu=data.rows[i];//学生信息
					//console.log(stu);
					var dbAcademy=stu.dbAcademy;//学院
					var dbClass=stu.dbClass;
					//赵博
					$(".searchtable").append("<tr ids='"+stu.tid+"'>"+
						"<td class='operation'><input type='checkbox'/></td>"+
						"<td>"+"  "+"</td>"+
						"<td>"+stu.tname+"</td>"+
						"<td>"+stu.tnumber+"</td>"+
						"<td>"+stu.tpass+"</td>"+
						"<td>"+stu.tage+"</td>"+
						"<td>"+dbAcademy.aname+"</td>"+
						"<td>"+stu.tsex+"</td>"+
						"<td><button class='btn btn-primary btn-revise' data-toggle='modal' data-target='#myModal1'><span class='am-icon-pencil-square-o'></span>修改</button> <button class='btn btn-primary btn-deleInfo' style='background: #F91028;border:1px solid #F91028' ><span class='am-icon-trash-o'></span> 删除</button>  "+"</td>"+
					"</tr>");
				}
			}
				
			 //$('#search').click(highlight);//点击search时，执行highlight函数； 
			    //$('#clear').click(clearSelection);//点击clear按钮时，执行clearSelection函数； 
			  	
			   	
			      //clearSelection();//先清空一下上次高亮显示的内容； 
			      //var searchText = $('#text').val();//获取你输入的关键字； 
			      var regExp = new RegExp(Info, 'g');//创建正则表达式，g表示全局的，如果不用g，则查找到第一个就不会继续向下查找了； 
			      $('tr').each(function()//遍历文章； 
			      { 
			        var html = $(this).html(); 
			        var newHtml = html.replace(regExp, '<span class="highlight">'+Info+'</span>');//将找到的关键字替换，加上highlight属性； 
			        $(this).html(newHtml);//更新文章； 
			      }); 

				//添加
				$(".btn-addInfo").click(function(){
					listPage('userAca','userClass');
				})

				//删除
				$(".btn-deleInfo").click(function(){
					var i=$(this).parent().parent().attr("ids");
					deleInfo(i);
				});

				//修改
				$(".btn-revise").click(function(){
					var ids=$(this).parent().parent().attr("ids");
					var arr=new Array();
					for(var i=1;i<=$(this).parent().siblings().length;i++){
						arr[i]=$(this).parent().siblings("td:nth-child("+i+")").text();
					}
					arr.push(ids);
					console.log(arr);
					correctInfo(arr);
				})

				//分页
    			pageNumber();

		    	//搜索
		    		//点击搜索
		    	$(".InfoSearch a").click(function(){
		    		//alert("********");
		    		var search=$(".InfoSearch input").val();
		    		searchInfo(search);
		    	})
					//回车搜索
				$(".InfoSearch").keydown(function(event){
					if(event.keyCode ==13){
						var search=$(".InfoSearch input").val();
			    		searchInfo(search);
					}
				});
			      
		},
		error:function(){
			alert("暂未搜索到此用户！");
		}
	})
}

/*function getReqstr(Info){
	var reqstr = "t";
	var reg = /^[\u4E00-\u9FA5]+$/; //全部为汉字的正则
	if(reg.test(Info)){
		if(Info == "男" || Info == "女"){
			reqstr += "sex" + Info;
			return reqstr;
		}else if(Info.length <= 3 && Info.length > 1){
			reqstr += "name" + Info;
			return reqstr;
		}else if(Info.length >3 && Info.length < 9){
			reqstr += "aid" + Info;
			return reqstr;
		}else return false;
	}else if(!isNaN(Integer.parseInt(Info))){
		if(Info.length <= 2){
			reqstr += "age"+Info;
			return reqstr;
		}else if(Info.length == 10){
			reqstr += "number"+ Info;
			return reqstr;
		}else return false;
	}else return false;
}
function searchAjax(Info){
	var req = (getReqstr(Info));
	if(!req){
		alert("输入有误！");
		return;
	}
	$.get("action?"+req,function(data,status){
		if(status == "success") console.log(data);
		else console.log("查询无果");
	});
}*/





//签到
function signinTime(){
	for(var i=0;i<24;i++){
		if(i<10){
			i="0"+i
		}
		$(".starthours").append("<option value="+i+">"+i+"</option>");
		//$(".stophours").append("<option value="+i+">"+i+"</option>");

	}
	for(var i=0;i<60;i++){
		if(i<10){
			i="0"+i
		}
		$(".startminutes").append("<option value="+i+">"+i+"</option>");
		//$(".stopminutes").append("<option value="+i+">"+i+"</option>")
	}
	$(".starthours").click(function(){
		$(".starttime").val($(".starthours").find("option:selected").val()+":"+$(".startminutes").find("option:selected").val());
		$(".stoptime").val($(".stophours").find("option:selected").val()+":"+$(".stopminutes").find("option:selected").val());
	})
	
	$(".startminutes").click(function(){
		var starthours=parseInt($(".starthours").find("option:selected").val());
		$(".stophours").empty();
		for(var i=starthours;i<24;i++){
			if(i<10){
				i="0"+i
			}
			$(".stophours").append("<option value="+i+">"+i+"</option>");
		}

		var startminutes=parseInt($(".startminutes").find("option:selected").val());
		$(".stopminutes").empty();
		for(var i=startminutes+1;i<60;i++){
				if(i<10){
					i="0"+i
				}
				$(".stopminutes").append("<option value="+i+">"+i+"</option>");
			}

		$(".starttime").val($(".starthours").find("option:selected").val()+":"+$(".startminutes").find("option:selected").val());
		$(".stoptime").val($(".stophours").find("option:selected").val()+":"+$(".stopminutes").find("option:selected").val());
	});


	$(".stophours").click(function(){
		$(".stopminutes").empty();
		var startminutes=parseInt($(".startminutes").find("option:selected").val());
		var stophours=$(".stopminutes").find("option:selected").val()
		var starthours=$(".starthours").find("option:selected").val();
		var stophours=$(".stophours").find("option:selected").val();
		//console.log(stophours)
		//console.log("**"+starthours)
		if(stophours==starthours){
			for(var i=startminutes;i<60;i++){
				if(i<10){
					i="0"+i
				}
				$(".stopminutes").append("<option value="+i+">"+i+"</option>");
			}
		}else{
			for(var i=0;i<60;i++){
				if(i<10){
					i="0"+i
				}
				$(".stopminutes").append("<option value="+i+">"+i+"</option>");
			}
		}
		$(".stoptime").val($(".stophours").find("option:selected").val()+":"+$(".stopminutes").find("option:selected").val());

	})

	$(".stopminutes").click(function(){
		$(".stoptime").val($(".stophours").find("option:selected").val()+":"+$(".stopminutes").find("option:selected").val());
	})

	

    /*$("#signtimebtn").click(function(){
    	if($(this).text()=="确定"){
    		$(this).text("撤销");
    		$(".signin select").attr("disabled","true");
    		$(".signin select").css("background-color","#e9ece5")
    		$(".time").attr("disabled","true");
    		$(".time").val($(".hours").find("option:selected").val()+":"+$(".minutes").find("option:selected").val());
    	}else{
    		$(this).text("确定");
    		$(".signin select").removeAttr("disabled");
    		$(".time").removeAttr("disabled");
    		$(".signin select").css("background-color","#fff")
    	}
    	
	});*/



	//签到方式 定位签 wifi签
	$.ajax({
		url:url+'AdminWaysign/findAll.action',
		type:'post',
		data:{},
		success:function(data){
			//console.log(data.data);
			//console.log(data.data[0]);
			$(".longitude").val(data.data[0].longitude);
			$(".latitude").val(data.data[0].latitude);
			$(".radius").val(data.data[0].radius);
			$(".mac").val(data.data[0].mac);
			var mode=data.data[0].mode;
			//console.log(mode);
			if(mode==1){
				$(".addsigninway").text("目前签到方式为 wifi 签到！");
			}else if(mode==0){
				$(".addsigninway").text("目前签到方式为 定位 签到！");
			}
			
		}
	})
	$("#signbtn").click(function(){
		var urls=url+"AdminWaysign/update.action?"
		var signway=$(".signinway input:checked").val();
		//console.log(signway)
		if(signway !==null && signway !==undefined && signway !== ""){
			//定位签
			if(signway=="location"){
				/*$(".longitude").val();
				$(".latitude").val();*/
				$.ajax({
					url:urls,
					type:'post',
					data:{
						wid:1,
						mode:0,
						longitude:$(".longitude").val(),
						latitude:$(".latitude").val(),
						radius:$(".radius").val(),
					},
					dataType:'json',
					success:function(data){
						if(data.status==200){
							alert("修改 位置签到 成功");
							$()
						}else{
							alert("修改位置签到失败！请检查位置及半径！")
						}
					},
					error:function(){
						alert("请检查网络！！！")
					}

				})
			}else if(signway=="mac"){//wifi签
				$.ajax({
					url:urls,
					type:'post',
					data:{
						wid:1,
						mode:1,
						mac:$(".mac").val()
					},
					dataType:'json',
					success:function(data){
						if(data.status==200){
							alert("修改 wifi签到 成功");
						}else{
							alert("修改wifi签到失败！请检查mac码！")
						}
					},
					error:function(){
						alert("请检查网络！！！")
					}
				})
				//console.log("-----------")
			}
		}
		else{
			alert("请选择签到方式！");
		}
		
	})




	//手动开启签到   
	$(".checkbox input").click(function(){
		//console.log($("#singbtn").text());
			if($(this).text()=="NO"){
				//$(".signin input").removeAttr("disabled");
				$(this).text("OFF");
				console.log("-----------");
				console.log("关闭签到");
				$.ajax({
					url:'http://39.108.63.108/signin/AdminServlet?method=closeTeacherSignin',
					type:'post',
					dataType:'json',
					success:function(data){
						//console.log("****"+data.status)
						if(data.status==200){
							alert("关闭签到成功");
						}else{
							alert("关闭签到失败！！")
						}
					},
					error:function(){
						alert("请检查网络！！！")
					}
				})
			}else{
				//$(".signin select").css("background-color","#e9ece5");
				//$(".signin p input").attr("disabled","true");
				$(this).text("NO");
				console.log("***********");
				console.log("开始签到");
				$.ajax({
					url:'http://39.108.63.108/signin/AdminServlet?method=openTeacherSignin',
					type:'post',
					dataType:'json',
					success:function(data){
						//console.log(data);
						//console.log(data.status);
						//console.log(data.msg);
						if(data.status==200){
							alert("开启签到成功");
						}else{
							alert(data.msg);
						}
					},
					errot:function(){
						alert("请检查网络！！！")
					}
				})
			}
		//$(this).text("NO");
		
	});	
	$(".signinright").empty();
	$(".signinright").append("<h1>签到时间段</h1><table cellspacing='0' class='signtime'><tr><td >名称</td> <td >开始时间</td> <td >结束时间</td>  <td>操作</td> </tr></table>");
	$.ajax({
		url:url+'AdminOperate/findAll.action',
		type:'post',
		data:{},
		success:function(data){
			//console.log(data)
			$(".signtime").empty();
			for(var i=0;i<data.data.length;i++){
				//console.log(data.data[i]);
				var signintime=data.data[i];
				$(".signtime").append("<tr oid="+signintime.oid+"><td>"+signintime.oname+"</td>"+
				"<td>"+signintime.starttime+"</td>"+
				"<td>"+signintime.stoptime+"</td><td> <button class='btn btn-primary delesignintime' data-toggle='modal' data-target='' style='background: #F91028;border:1px solid #F91028' ><span class='am-icon-trash-o' ></span>删除</button>  </td></tr>")
			}
			//删除时间
			$(".signtime .delesignintime").click(function(){
				var oid=$(this).parent().parent().attr("oid");
				//console.log(oid);
				delesigntime(oid);
				overSignTime(oid);
			})
			//修改时间
			$(".signtime .btn-over").click(function(){
				var oid=$(this).parent().parent().attr("oid");
				overSignTime(oid);
			})

		}
	})
		
	
}
//signinTime();
//删除时间段
$("#signtimebtn").click(function(){
	var signname=$(".signname").val();
	var starttime=$(".starttime").val();
	var stoptime=$(".stoptime").val();
	//判断 签到名称、签到开始时间、结束时间 是否为空
	if(signname !==null && signname !==undefined && signname !== ""){
		if(starttime !==null && starttime!==undefined && starttime!== ""){
			if(stoptime!==null && stoptime !==undefined && stoptime !==""){
				//console.log(starttime);
				//console.log(stoptime);
				$.ajax({
					url:url+'AdminOperate/add.action?',
					type:'post',
					data:{
						oname:signname,
						starttime:starttime,
						stoptime:stoptime
						},
					dataType:'json',
					success:function(data){
						if(data.status==200){
							alert("添加 签到时间 成功");
							$(".signintime .addsigntime").text("添加成功！");
								 signinTime();
						}else{
								alert("添加 签到时间 失败！")
						}
					},
					error:function(){
						alert("请检查网络！！！")
					}
				})
					
			}else{
				alert("请输入签到结束时间");
			}
		}else{
			alert("请输入签到开始时间");
		}	
	}else{
		alert("请输入签到名称");
	}
});

function delesigntime(ids){
	if(confirm("是否删除此时间段？")){
		$.ajax({
			url:url+'AdminOperate/delete.action?',
			type:'post',
			data:{
				ids:ids,
			},
			dataType:'json',
			success:function(data){
				if(data.status==200){
					$(".signintime .addsigntime").text("删除成功！");
					signinTime();
				}
			},
			error:function(){
				alert("删除失败，请求数据失败");
			}
		})
	}else{
		 alert("已取消删除");
	}
	
}


function overSignTime(ids){
	console.log(ids);
	/*<button class='btn btn-primary btn-over' data-toggle='modal' data-target='#myModal3'><span class='am-icon-pencil-square-o '></span>修改</button>*/
}

//mac地址：28:f0:76:18:82:f6
//中心经度108.913018
//中心纬度34.219703
//半径50

//签到查询
function signInfo(){
	$(".signinInfo").empty();
	$(".signinInfo").append("<h1>签到信息查询 </h1><table cellspacing='0' class='signday'><tr> <td>今天签到时间</td> <td class='sname'>姓名</td> <td>工号</td>    <td>学院</td>    </tr></table>");
	$.ajax({
		url:url+'AdminInSign/findTByMonthAndDay.action',
		type:'post',
		data:{},
		dataType:'json',
		success:function(data){
			//console.log(data);
			var rows=data.rows;
			for(var i=0;i<rows.length;i++){
				//console.log(rows[i]);
				var dbDay=rows[i].dbDay[0].dtime;
				//console.log(dbDay)
				for(var j=0;j<rows[i].dbDay.length;j++){
					$(".signday").append("<tr ids='"+rows[i].tid+"'>"+
					"<td>"+rows[i].dbDay[j].dtime+"</td>"+
					"<td>"+rows[i].dbTeacher.tname+"</td>"+
					"<td>"+rows[i].dbTeacher.tnumber+"</td>"+
					"<td>"+rows[i].dbAcademy.aname+"</td>"+
					
				"</tr>");


				}
				
			}
		},
	})
}
