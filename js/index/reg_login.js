/**
 * Created by mc on 2016/6/29.
 */
var urlHead = "";

//登录框系列 begin
//点击 验证码点击切换
$(".mobile-yzm img,.change-yzm").on("click",function(){
    var id = $(this).parents("form").attr("id");
    fleshVerify(id);
});

//注销
$(".loginOut").on("click",function(){
	var url = urlHead + "business/com.platform.action.web.UserManageAction?action=loginOut";
	$.ajax({
        type:"POST",
        url: url,
        dataType:"json",
        success: function (data) {
        	if(data.errorcode == 100) {  // 成功
                alert("注销成功");
                //urlHead +;
                window.location.href = "home-page.jsp";
            } else {
                return false;
            } 
        },
        error:function(){
            return false;
        }
	})
});

//重载验证码
function fleshVerify(id){
	var timestap = new Date().getTime();
	//alert(urlHead);
	$("#"+id+" .mobile-yzm img").attr('src', urlHead + "VerifyCodeServlet?time="+timestap);
    $("#"+id+" input[name=verifiy_code]").val('');
}

//点击 发送手机验证码
$(".send-code.now").on("click",function(){
    $(this).siblings("input").val('');
    var this_reg_id = $(this).parents("form").attr("id");
    send_code(this_reg_id);
    $("input").removeClass("error_b");
    if($("#"+this_reg_id+" input[type=mobile_verifiy_code]","#"+this_reg_id+" input[type=mobile_code]").siblings(".send-code").val() == '再次发送'){
        settime($(".send-code"));
    }
});
//点击单独页面的 发送手机验证码
$(".m-item .send-code").on("click",function(){
    $(this).siblings("input").val('');
    var this_reg_id = $(this).parents("form").attr("id");
    apage_send_code(this_reg_id);
    settime($(".send-code"));
    $("input").removeClass("error_b");
});

//删除整个 pop弹窗
$(".pop-del").on("click",function(){
	$(this).parent("div").hide();
    $(".pop-bg").hide();
});

//点击 nav 登录
$(".login .m-log-in,.m-home-tip .m-log-in,.sub-link .sub-login").on("click",function(){
	fleshVerify("log_form");
    $(".pop-reg,.pop-bg").show();
    $(".pop-tab li:last-child").addClass("on").siblings().removeClass("on");
    $(".pop-reg >div.reg").hide().siblings().show();
});

//点击注册按钮
$("#m_reg").on("click",function(){
    var this_reg_id = $(this).parents("form").attr("id");
    reg_form(this_reg_id);
});
$(".m-mt-login").on("click",function(){
    fleshVerify("reg_form");
    $('.pop-reg,.pop-bg').show();
});

//注册+登录
$(".m-log-in").on("click",function(){
    fleshVerify("reg_form");
    $(".pop-reg,.pop-bg,.pop-ct").css("display","block");
});
$(".m-log-in").on("click",function(){
    fleshVerify("log_form");
    $(".pop-reg,.pop-bg,pop-ct").css("display","block");
});

//点击 忘记密码 按钮
$(".pop-reg .forget-pw").on("click",function(){
    fleshVerify("ver_phone");
    $("input:not('.send-code')").val('').removeClass("error_b");//清空所有的input
    $(".error-tips").html('');
    $(".pop-reg").css("display","none");
    $(".ver-phone,.pop-bg").css("display","block");
});
$("#forgetpwd").on("click",function(){
    fleshVerify("ver_phone");
    $(".item0").hide();
    $(".item1").show();
});

//点击 使用微信登录 按钮
$(".log-wechat").on("click",function(){
    fleshVerify($(this).parents("form").attr("id"));
    $(".pop-reg").css("display","none");
    $(".wechat-log,.pop-bg").css("display","block");
});

//点击 登录按钮
$("#m_log").on("click",function(){
    var this_log_id = $(this).parents("form").attr("id");
    log_form(this_log_id);
    $("input").removeClass("error_b");
});

$("#m_log_2").on("click",function(){
    var this_log_id = $(this).parents("form").attr("id");
    log_form(this_log_id);
    $("input").removeClass("error_b");
});

//点击验证手机--下一步
$("#next_page").on("click",function(){
    $(".error-tips").html('');
    var next_page_id = $(this).parents("form").attr("id");
    next_page(next_page_id);
});

//点击设置新密码--确认
$("#find_pw_true").on("click",function(){
    var find_pw_true_id = $(this).parents("form").attr("id");
    find_pw_true(find_pw_true_id);
});

//按回车键
$("#reg_form").keydown(function(){
    if (event.keyCode == 13){ //keyCode=13 是回车键；
        var this_log_id = $(this).attr("id");
        reg_form(this_log_id);
    }
});
$("#log_form").keydown(function(){
    if (event.keyCode == 13){ //keyCode=13 是回车键；
        var this_log_id = $(this).attr("id");
        log_form(this_log_id);
    }
});
$("#ver_phone").keydown(function(){
    if (event.keyCode == 13){ //keyCode=13 是回车键；
        var this_log_id = $(this).attr("id");
        next_page(this_log_id);
    }
});
$("#find_pw").keydown(function(){
    if (event.keyCode == 13){ //keyCode=13 是回车键；
        var this_log_id = $(this).attr("id");
        find_pw_true(this_log_id);
    }
});

//倒计时
var countdown=60,
    time_run;
function settime(val) {
    if (countdown == 0) {
        val.attr("disabled",false);
        val.val("再次发送").css({"color":"#ff8800","border":"1px solid #ff8800"});
        countdown = 60;
        return false;
    } else {
        val.attr("disabled",true);
        val.val("重新发送(" + countdown + ")").css({"color":"#999999","border":"1px solid #dbdbdb"});
        countdown--;
    }
    time_run = setTimeout(function() {
        settime(val)
    },1000)
    console.log(1);
}

input_mobile_blur("reg_form");
input_mobile_blur("log_form");
input_mobile_blur("ver_phone");
//input 失焦
function input_mobile_blur (id){
    $("#"+ id +" input[name=mobile]").blur(function(){
        if ($(this).val() == ''){
            //$(this).addClass("error_b").siblings(".pop-num .error-tips,.m-item .error-tips").html('手机号不能为空');
            $(this).addClass("error_b").siblings(".pop-num .error-tips,.m-item .error-tips").html('手机号码不能为空');
            return false;
        } else if (!$(this).val().match(/^(((1[0-9][0-9]{1}))+\d{8})$/)) {
            $(this).addClass("error_b").siblings(".pop-num .error-tips,.m-item .error-tips").html('请输入正确的手机号');
            return false;
        } else {
            $(this).removeClass("error_b").siblings(".pop-num .error-tips").html('');
            $("input").removeClass("error_b");
        }
    });
}

//发送验证码,注册
function send_code(id){
    var mobile = $("#"+id+" input[name=mobile]").val(),
        verifiy_code = $("#"+id+" input[name=verifiy_code]").val(),data;
    data = {"mobile":mobile,"verifiy_code":verifiy_code};
    $.ajax({
        type:"POST",
        url:"",
        //data:$("#reg_form").serialize(),
        data:data,
        dataType:"json",
        success: function (data) {
            if (!$("#reg_form input[name=mobile]").val().match(/^(((1[0-9][0-9]{1}))+\d{8})$/)) {
                $("#"+id+" input[name=mobile]").removeClass("error_b");
                error_show(id,"mobile","请输入正确的手机号");
                fleshVerify(id);
                return false;
            } else if (data.errorcode == 6001){
                $("#"+id+" input[name=mobile]").removeClass("error_b");
                error_show(id,"mobile","用户已存在");
                fleshVerify(id);
                return false;
            } else if (data.errorcode == 4009){
                $("#"+id+" input[name="+data.name+"]").removeClass("error_b");
                error_show(id,data.name,data.remark);
                fleshVerify(id);
                $("input[name=mobile_verifiy_code]").val('');
                return false;
            } else {
                error_show();
                settime($(".send-code"));
            }
        },
        error:function(){
            return false;
        }
    });
}
//单独页面 发送验证码
function apage_send_code(id){
    var mobile = $("#"+id+" input[name=mobile]").val(),
        verifiy_code = $("#"+id+" input[name=verifiy_code]").val(),data;
    data = {"mobile":mobile,"verifiy_code":verifiy_code};
    $.ajax({
        type:"POST",
        url:"",
        data:data,
        dataType:"json",
        success: function (data) {
            if (data.errorcode == 4009){
                $("input").removeClass("error_b");
                error_show(id,data.name,data.remark);
                fleshVerify(id);
                $("input[name=mobile_verifiy_code]").val('');
                return false;
            } else {
                error_show();
            }
        },
        error:function(){
            return false;
        }
    });
}
//注册
function reg_form(id){
    var mobile = $("#"+id+" input[name=mobile]").val(),
        verifiy_code = $("#"+id+" input[name=verifiy_code]").val(),
        mobile_verifiy_code = $("#"+id+" input[name=mobile_verifiy_code]").val(),
        password = $("#"+id+" input[name=password]").val(),
        rpassword = $("#"+id+" input[name=rpassword]").val(),
        intention = $("#"+id+" input[name=intention]").val(),
        data;

    if(mobile == ''){
        $("#"+id+" input[name=mobile]").removeClass("error_b");
        error_show(id,"mobile","手机号码不能为空");
        return false;
    } else if (!mobile.match(/^(((1[0-9][0-9]{1}))+\d{8})$/)) {
        $("#"+id+" input[name=mobile]").removeClass("error_b");
        error_show(id,"mobile","请输入正确的手机号");
        return false;
    } else if( password.length < 6 || password.length > 20 ){
        $("#"+id+" input[name=password]").removeClass("error_b");
        error_show(id,"password","请输入6-20位字符");
        return false;
    } else if(rpassword == ''){
        $("#"+id+" input[name=rpassword]").removeClass("error_b");
        error_show(id,"rpassword","请再次输入密码");
        return false;
    } else if(rpassword != password){
        $("#"+id+" input[name=rpassword]").removeClass("error_b");
        error_show(id,"rpassword","两次输入的密码不一致");
        return false;
    }
    data = {"mobile":mobile,"verifiy_code":verifiy_code,"mobile_verifiy_code":mobile_verifiy_code,"intention":intention,"password":password,"rpassword":rpassword};
    $.ajax({
        type:"POST",
        url:"",
        data:data,
        dataType:"json",
        success: function (data) {
            if (data.errorcode == 6001){
                $("#"+id+" input[name=mobile]").removeClass("error_b");
                error_show(id,"mobile","用户已存在");
                return false
            } else if ( data.errorcode != 6001 && data.errorcode){
                //$("input").removeClass("error_b");
                $("#"+id+" input[name="+data.name+"]").removeClass("error_b");
                error_show(id,data.name,data.remark);
                if(data.name == 'verifiy_code'){
                    fleshVerify(id);
                    return false;
                }
                return false;
            } else{
                error_show();
                $(".pop-reg").css("display","none");
                //注册时，点击接投弹出框判断
                if($("#post_Ad").hasClass("u-btn-bgfg")){
                    window.location.href = '';
                } else {
                    var s = window.location.pathname;
                    location.href  = s + "?reg=yes";
                }
            }
        },
        error:function(){
            return false;
        }
    });
}

//登录
function log_form(id){
    var mobile = $("#"+id+" input[name=mobile]").val(),
        verifiy_code = $("#"+id+" input[name=verifiy_code]").val(),
        password = $("#"+id+" input[name=password]").val(),
        data;
    if(mobile == ''){
        $("#"+id+" input[name=mobile]").removeClass("error_b");
        error_show(id,"mobile","手机号码不能为空");
        return false;
    } else if (!mobile.match(/^(((1[0-9][0-9]{1}))+\d{8})$/)) {
        $("#"+id+" input[name=mobile]").removeClass("error_b");
        error_show(id,"mobile","请输入正确的手机号");
        return false;
    }
    data = {"mobile":mobile,"verifiy_code":verifiy_code,"password":password};
    $.ajax({
        type:"POST",
        url: urlHead + "business/com.platform.action.web.UserManageAction?action=checkValue",
        data:data,
        dataType:"json",
        success: function (data) {
        	//alert("a1" + data);
        	if(data.errorcode == 1000) {
                error_show(id,"mobile","账号或密码错误");
                fleshVerify(id);
                return false;
            } else if(data.errorcode == 100) {
                $("#m_log").addClass("un_click");
                error_show();
                $(".pop-reg,.pop-bg,.m-home-tip .more,.sub-link,.link .register,.link .login").hide();
                $('.sub-person,.link .person,.person-1').show();
                var s = window.location.pathname;
                location.href  = s + "?login=yes";
            } else {
            	//error_show(id,data.name,data.remark);
                alert("登录失败：" + data.remark);
            	if(data.name == 'verifiy_code') fleshVerify(id);
                return false;
            }
        },
        error:function(){
        	return false;
        }
    });
}


//点击 验证手机 下一步按钮
function next_page(id){
    var mobile = $("#"+id+" input[name=mobile]").val(),
        verifiy_code = $("#"+id+" input[name=verifiy_code]").val(),data;
    if(mobile == ''){
        $("#"+id+" input[name=mobile]").removeClass("error_b");
        error_show(id,"mobile","手机号码不能为空");
        return false;
    } else if (!mobile.match(/^(((1[0-9][0-9]{1}))+\d{8})$/)) {
        $("#"+id+" input[name=mobile]").removeClass("error_b");
        error_show(id,"mobile","请输入正确的手机号");
        return false;
    }
    data = {'mobile':mobile,'verifiy_code':verifiy_code,'step':1};
    $.ajax({
        type:"POST",
        url:"",
        data:data,
        dataType:"json",
        success: function (data) {
            if(data.errorcode == 4009){
                $("#"+id+" input[name="+data.name+"]").removeClass("error_b");
                error_show(id,data.name,data.remark);
                fleshVerify(id);
                return false;
            } else if( data.code != undefined ){ //成功
                $(".ver-phone").css("display","none");
                $(".find-pw,.pop-bg").css("display","block");
                //单独的登陆页
                $(".item1").hide();
                $(".item2").show();
                countdown=60;
                settime($(".send-code"));
                $(".item2 input:not(input[type=button])").val('');
                $("#find_pw input[name=password]").focus();
            }else{
                $("#"+id+" input[name="+data.name+"]").removeClass("error_b");
                error_show(id,data.name,data.remark);
                fleshVerify(id);
            }
        },
        error:function(){
            return false;
        }
    });
}

//点击 设置新密码  确认
function find_pw_true(id){
    var password = $("#"+id+" input[name=password]").val(),
        rpassword = $("#"+id+" input[name=rpassword]").val(),
        mobile_code = $("#"+id+" input[name=mobile_code]").val(),data;
    if ( mobile_code ==''){
        $("#"+id+" input[name=mobile_code]").removeClass("error_b");
        error_show(id,"mobile_code","请输入手机验证码");
        return false;
    } else if ( password ==''){
        $("#"+id+" input[name=password]").removeClass("error_b");
        error_show(id,"password","请输入新密码");
        return false;
    } else if ( password.length < 6 || password.length > 20 ){
        $("#"+id+" input[name=password]").removeClass("error_b");
        error_show(id,"password","请输入6-20位字符");
        return false;
    } else if ( rpassword ==''){
        $("#"+id+" input[name=rpassword]").removeClass("error_b");
        error_show(id,"rpassword","请再次输入新密码");
        return false;
    }
    data = {'password':password,'rpassword':rpassword,'mobile_code':mobile_code,'step':2};
    $.ajax({
        type:"POST",
        url:"",
        data:data,
        dataType:"json",
        success: function (data) {
            if(data.errorcode == 4009 || data.errorcode == 6008){
                $("#"+id+" input[name="+data.name+"]").removeClass("error_b");
                error_show(id,data.name,data.remark);
                return false;
            } else if( data.code != undefined ){ // 成功
                $(".find-pw").css("display","none");
                $(".item0").show();
                $(".item0 input:not(input[type=button])").val('');
                $(".item1").hide();
                $(".item2").hide();
                $(".pop-reg,.pop-bg").css("display","block");
                $("#log_form input[name=mobile]").focus();
                fleshVerify(id);
                return false;
            } else if(data.errorcode == 6701){ // 验证码您已输错3次，请重新进行短信验证
                $.app.util.pop_tips("验证码您已输错3次，请重新进行短信验证");
                $("input").removeClass("error_b");
                $(".error-tips").html('');
                $(".find-pw").css("display","none");
                $(".ver-phone,.pop-bg").css("display","block");
                $(".item1").show();
                $(".item2").hide();
                clearTimeout(time_run);
                $(".item1 input:not(input[type=button])").val('');
                fleshVerify("ver_phone");
                return false;
            }
        },
        error:function(){
            return false;
        }
    });
}

//报错
function error_show(id,name,remark){
    $(".error-tips").remove();
    $(".pw-tips").css("display","block");
    if(remark){
        var this_input = $('#'+id+' input[name='+name+']');
        this_input.focus();
        this_input.addClass("error_b");
        this_input.siblings(".pw-tips").hide();
        this_input.parents(".pop-num,.m-item,.m-item-1").append('<p class="error-tips">'+remark+'</p>');
        this_input.parents(".pop-num,.m-item,.m-item-1").siblings().find("input").removeClass("error_b");
    }

}
