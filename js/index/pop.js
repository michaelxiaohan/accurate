/**
 * Created by mc on 2016/4/7.
 */
//弹窗
$(function(){
   
    //跳过此步骤
    $(".pop-bot a:not('.forget-pw')").on("click",function(event){
    	$(this).parents(".reg-succ,.pop-addmt,.made-need").hide();
        $(".pop-bg").hide();
        event.stopPropagation();
    });

    //单独 注册 登录 切换
    $(".separate-entrance .m-tab li").on("click",function(){
    	var liIndex = $(this).index();
        $(this).parents(".title").siblings(".inner").eq(liIndex).show().siblings(".inner").hide();
        $(this).addClass("on").siblings().removeClass("on");
        var id = $(this).parents(".title").siblings(".inner").eq(liIndex).find("form").attr("id");
        fleshVerify(id);
        if(liIndex == 0){
            $(".separate-entrance .content").css("height","506px");
        } else {
            $(".separate-entrance .content").css("height","646px");
            $("input:not(input[type=button])").val('');
        }
    });
    //首页 注册 登录 切换
    $(".pop-tab li").on("click",function(){
    	var liIndex = $(this).index();
        $(this).parent(".pop-tab").siblings(".pop-ct").eq(liIndex).show().siblings(".pop-ct").hide();
        $(this).addClass("on").siblings().removeClass("on");
        var id = $(this).parent(".pop-tab").siblings(".pop-ct").eq(liIndex).find("form").attr("id");
        fleshVerify(id);
    });

    //点击 nav 注册
    $(".register .m-log-in,.sub-link .sub-register").on("click",function(){
    	fleshVerify("reg_form");
        $(".pop-reg,.pop-bg").show();
        $(".pop-tab li:first-child").addClass("on").siblings().removeClass("on");
        $(".pop-reg >div.log").hide().siblings().show();
        $("input:not(input[type=button])").val('');
    });


    //排期弹窗
        //选择上下午
    $(".sche-pop .time li").on("click",function(){
        $(this).addClass("on").siblings("li").removeClass("on");
    });


    //更换手机号
    $(".basic_inner .change-num").on("click",function(){
        $(".pop-bg,.ver-phone").show();
    })
});

