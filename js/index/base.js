/**
 * Created by mc on 2016/3/28.
 */
$(function(){
//	$("#aaaa").click(function () {
//	$(".pop-reg").css("display","block");
//	$(".pop-ct").css("display","block");
//	$("#aaaa").css("color":"#dcfc2b");
//	alert(5)
//})
    //用户登录
    //登陆之后，当用户设备小于1280px时，宽度 特殊处理
    if($("div").is('.toolbar')){
        $(".contact_def").css("display","none");
        $("#doyoo_panel").hover(function(){
            $(this).css("background-color","#ff8800");
        });
        if($(window).width() < 1280){
            $(".g-wrap").css("margin-left","1.2em");
        }
    } else {
        $(".contact_def").css("display","block");
        $("#doyoo_panel").removeClass("bg_hover_f");
        if($(window).width() < 1280){
            $(".g-wrap").css("margin-left","auto");
        }
    }

    if($("div").hasClass("g-hd-wrap")){
        if($(document).scrollTop() > 80 ){
            var nav = $(".m-nav");
            nav.css({"overflow":"visible","height":"0"}).addClass("nav-scroll").animate({height: 40},500);
            setTimeout("$('.ri,.ri-1').show(200)",50);
        }
    }

    //公众号名称溢出截字+显示title
    $(".dd-tit a").each(function(){
        var n_len = $(this).html().length;
        if(n_len > 6){
            $(this).attr("title",$(this).html());
        }
    });

    //导航效果
//  var subNav = $(".sub-nav");
//  $(".ztsc").hover(function(){
//      $(subNav).show().addClass("u-inbs");
////      $(subNav).stop().animate({height:"142px"},200);
//  },function(){
////      $(subNav).stop().animate({height:"0px"},200);
//      $(subNav).hide();
//  });
//
    var topMain = $(".g-hd").height();//头部高度；
    var nav_top = $(".m-nav,.m-nav-1");
    $(window).scroll(function(){
        if($(window).scrollTop() > topMain){//如果滚动条顶部的距离大于topMain则就nav导航就添加类.nav-scroll，否则就移除
            nav_top.css({"overflow":"visible","height":"80","background-color":"rgba(140,198,63,0.7)"}).addClass("nav-scroll");
//          setTimeout("$('.ri,.ri-1').show(200)",50);
//          $(".sea-ass").stop(true,false).slideUp(300);//页面滚动 搜索联想 自动关闭；
//          $(".search input,.ri input,.ri-1 input").blur();//页面滚动input失去焦点
        } else {
            if( nav_top.parent().hasClass("wo-hd")){
                nav_top.css({"overflow":"visible","height":"80","background-color":"rgba(140,198,63,1)"}).removeClass("nav-scroll");
            } else {
                nav_top.css({"overflow":"hidden","height":"80","background-color":"rgba(140,198,63,1)"}).removeClass("nav-scroll");
            }
//          setTimeout("$('.ri,ri-1').hide(200)",50);
        }
    });

    //用户登录状态
    $(".person,.sub-person").hover(function(){
        $(".sea-ass").stop(true,false).slideUp(300);//页面滚动 搜索联想 自动关闭；
        $(".search input,.ri input,.ri-1 input").blur();//页面滚动input失去焦点
        $(this).find(".drop-down").stop().slideDown(200);
        $(this).find(".person-1,.sub-person-1").addClass("hover");
    },function(){
        $(this).find(".drop-down").stop().slideUp(0);
        $(this).find(".person-1,.sub-person-1").removeClass("hover");
    });

    //获取焦点
    $(".search input,.ri input,.ri-1 input").each(function(){
        $(this).focus(function(){
            $(this).siblings(".sea-ass").stop(true,false).slideDown(300);//获得焦点
        });
        $(this).blur(function(){
            $(this).siblings(".sea-ass").stop(true,false).slideUp(300);//失去焦点
        });
    });

    function tab_hover(Name){
        $(".u-tab li").mouseover(function(){
            var liIndex = $(this).index();//获取当前li 下标；
            $(this).addClass("on").siblings().removeClass("on");
            $(this).parents(Name).siblings(".u-tab-main").find(".ct.u-dl").eq(liIndex).show().siblings().hide().removeClass("u-bd");
            var liWidth = $(this).width();
            if(liIndex == 0){
                $(this).siblings("p").stop(false,true).animate({'left' : liIndex * liWidth + 'px'},200);
            }　else {
                $(this).siblings("p").stop(false,true).animate({'left' : liIndex * liWidth + 15 + 'px'},200);
            }
        });
    }
    tab_hover(".u-tit");

    $(".order-public .m-tit li").on("click",function(){
        $(this).addClass("on").siblings().removeClass("on");
    });


    //右侧侧栏 鼠标经过
    $(".nav-slide .h-tooltips").mouseenter(function(){
        $(this).children(".m-tooltip").animate({left:-98,queue:true});
        $(this).children(".m-tooltip").css("visibility","visible");
    });
    $(".nav-slide .h-tooltips").mouseleave(function(){
        $(this).children(".m-tooltip").css("visibility","hidden");
        $(this).children(".m-tooltip").animate({left:-118,queue:true});
    });
    //点击右侧侧栏，内容出现 + 切换tab
    var id_1,id_2;
    $(".toolbar-link >div >.item-inner").on('click',function(){
        //tab切换；
        var thisIndex = $(this).parent('div').index();
        $(".main .m_slide").eq(thisIndex).show().siblings().hide();

        var _this = $(this).parent('div');
        var id_1 = $(this).parent('div').attr('id');
        if(id_1 !== id_2){
            $(".toolbar").stop().animate({right:'0',speed:'fast',easing:'swing'});
            $("#doyoo_panel").addClass("r282").removeClass("r0").stop().animate({right:'282',speed:'fast',easing:'swing'});
            $(this).parent('div').addClass('on').siblings().removeClass('on');
            id_2 = id_1;
        } else {
            id_1 = id_2='';
            $(_this).removeClass('on');
            $(".toolbar").stop().animate({right:'-280',speed:'fast',easing:'swing'});
            $("#doyoo_panel").addClass("r0").removeClass("r282").stop().animate({right:'0',speed:'fast',easing:'swing'});
        }
    });
    $(".toolbar b.title span").on("click",function(){
        id_1 = id_2='';
        var _this = $(this).parent('div');
        $(_this).removeClass('on');
        $(".toolbar").animate({right:'-280',speed:'fast',easing:'swing'});
    });

    //选号栏，收藏 内部tab切换
    $(".toolbar .tab li").on("click",function(){
        $(this).addClass("on").siblings().removeClass("on");
        var thisIndex = $(this).index();
        $(this).parent(".tab").siblings(".tool-ct-tab").eq(thisIndex).addClass("u-bd").siblings(".tool-ct-tab").removeClass("u-bd");
    });

    //收藏 点击查看所有跳转页面
    $(".collect_box .choose-box-tips .btn").on("click",function(){
        var _href_collect = $(".collect_box ul.tab li:first-child").hasClass("on") ? '/Member/collection.html?t=m' : '/Member/collection.html?t=p';
        window.open(_href_collect);
    });


    //删除素材
    $(".tools_box .pic").hover(function(){
        $(this).find(".edit").fadeIn().unbind('click').on("click","a.d",function(){
            var _this_ = $(this)
            $.app.util.pop_cancel_ok('是否确认删除该素材？');
            $.app.util.pop_del_tools(_this_);
        });
    },function(){
        $(this).find(".edit").fadeOut();
    });

    //回到顶部
    $("#go_top,.ha-d-op .back_top").on("click",function(){
        $("body,html").animate({scrollTop:0},500);
        return false;
    });


    //公众号列表 js  begin
    //公众号列表

    $(".s-line a").not(".s-sx").on("click",function(event){
        event.stopPropagation();
        $(this).addClass("on").siblings("a").removeClass("on");
    });
    $(".s-current a").on("click",function(){
        $(this).addClass("on").siblings("a").removeClass("on");
        var any = $(this).parents(".s-current").siblings(".any");
        any.removeClass("on");
        any.on("click",function(){
            $(this).siblings(".s-current").find("a").removeClass("on");
        });
    });
    $(".operating .add").on("click",function(){
        $(this).addClass("crt");
    });

    //筛选切换
    $(".s-bj a.s-sx").on("click",function(){
        var thisIndex = $(this).index()-1;
        $(".s-current >div").eq(thisIndex).show().siblings("div").hide();
        //find("a").removeClass("on");
    });

    //收藏+详情
    $(".operating .ck").toggle(function(){
        $(this).addClass("on");
    },function(){
        $(this).removeClass("on");
    });


   

    //推广类型----复选框
    $(".made-need .pro-type a,.made-need .ind-sec b.m-msg").toggle(function(){
        $(this).addClass("crt").siblings(".txt-w200,.u-ml1").show();
        //定制推广计划 行业领域最多三个
        if($(".ind-sec li b.crt").length > 3){
            $(this).removeClass("crt");
            $.app.util.pop_tips('最多可以选择三个');
            return false;
        }
    },function(){
        $(this).removeClass("crt").siblings(".txt-w200,.u-ml1").hide();
    });

    //分页点击
    function click_this(v){
        $(v).on("click",function(){
            $(this).addClass("crt").siblings().removeClass("crt");
        });
    }
    click_this(".u-page li.num");
    click_this(".choose-box-tips form >div");



    //管理中心-公众号订单详情

    //全选/不全选
    $(".choose-all label input").on("click",function(){
        if(this.checked){
            $(".g-table .name input").attr("checked",true);
            $(".g-table .name i").addClass("crt");
            $(".btn-pay").addClass("u-btn-bfbfff").removeClass("u-btn-bg");
        } else {
            $(".g-table .name input").attr("checked",false);
            $(".g-table .name i").removeClass("crt");
            $(".btn-pay").removeClass("u-btn-bfbfff").addClass("u-btn-bg");
        }
    });



    //点击单独的
    var num_checkbox = $(".g-table .name input").size();//判断 table里面有多少个input；
    var j_w_choose = $(".choose-all label,table .name label,.lst-yllj .u-mbn label");
    j_w_choose.on("click",function(){
        if ($(this).find("input[type='checkbox']").attr("checked") == 'checked') {
            $(this).find("i").addClass("crt");
            $(".btn-pay").addClass("u-btn-bfbfff").removeClass("u-btn-bg");

            var num_checked = 0;
            $(".g-table .name input").each(function(){
                if($(this).attr("checked")){
                    num_checked++;
                }
            });

            if(num_checked == num_checkbox){
                $(".choose-all label input").attr("checked",true).siblings("i").addClass("crt");
            }
        } else {
            $(".choose-all label input").attr("checked",false).siblings("i").removeClass("crt");
            $(this).find("i").removeClass("crt");
        }
    });

    //点击详情弹窗
    click_det_pop("pay");
    click_det_pop("view");
    click_det_pop("jt");
    click_det_pop("tj");
    function click_det_pop(n){
        $(".det-"+n+"").on("click",function(){
            $(".det-pop-"+n+"").show();
            $(".pop-bg").show();
        });
    }

    //点击批量支付
    $(".btn-pay").on("click",function(){
        if($(".btn-pay").hasClass("u-btn-bfbfff")){
            $(".det-pop-pay").show();
            $(".pop-bg").show();
        }
    });

    //删除
    $(".disappear").on("click",function(){
        $(this).parents(".g-warp-612").hide();
        $(".pop-bg").hide();
    });

    //查看更多
    $(".det-pop-pay .expand-more").toggle( function () {
        $(this).siblings("ul.lst-mc").css("height","auto");
        $(this).text("点击隐藏");
        //$("this").siblings("ul.lst-mc").height("auto");
    },function(){
        $(this).siblings("ul.lst-mc").css("height","100px");
        $(this).text("展开更多...");
    });

    <!--支付成功-->
    function pop_success(amount,balance){
        '<div class="g-warp-612 det-pop-success"><div class="hd cb"> <div class="inner"><i class="disappear"></i></div> </div><div class="ct inner cb"><dl class="m-success-ct"><dt class="fl"></dt> <dd class="fl"><p class="u-fs14">已成功支付<span class="u-fcf u-fs20">￥'+amount+'</span></p> <p class="u-fc9">您的余额还剩余￥'+balance+'</p></dd></dl></div><div class="ft inner cb u-fs14"><a class="u-br3 u-btn-bgf u-btn-34 fr">确定</a></div></div>'
    }


    //当用户设备小于768px时，made-need 特殊处理
    if($(window).height() < 768) $(".judgment-block").remove();

    //点击选择接、投广告
    $("#reg_form .pop-num a.u-btn-w150,#reg_form a.u-btn-w190").on("click",function(){
        $(this).addClass("u-btn-bfbfff").removeClass("u-btn-bgfg").siblings("a").removeClass("u-btn-bfbfff").addClass("u-btn-bgfg");
        var data_id = $(".pop-num a.u-btn-bfbfff,.m-item a.u-btn-bfbfff").data("id");
        $(this).siblings("input[name=intention]").val(data_id);
    });

    //loading
    function loading(name){
        $(name).append('<div class="spinner"><div class="double-bounce1"></div><div class="double-bounce2"></div></div>');
    }

    //忘记密码
    $(".forget-pw,.find-pw .pop-back").on("click",function(){
        $("input:not('.send-code')").val('');//清空所有的input
        $(".ver-phone").show();
        fleshVerify("log_form");
    });
    //back
    $(".ver-phone .pop-back").on("click",function(){
        $("input:not('.send-code')").val('');//清空所有的input
        $(".pop-reg").show();
        $(".ver-phone").hide();
        fleshVerify("log_form");
    });
    $(".find-pw .pop-back").on("click",function(){
        $(".ver-phone").show();
        $(".find-pw").hide();
        fleshVerify("ver_phone");
    });

    //添加关键词  -- 定制推广需求--相同未判断
    $("#submit_made_need").on("click",function(){
        var txt_msg = $(this).siblings("input").val();
        if(txt_msg != ''){
            $(".key-word-ct").prepend('<li class="new_add_label"><span>'+txt_msg+'</span><a name="key-word-del" data-id="{$kw.id}"></a></li>');
            $("p.error-tips").remove();
            var ii = $("li.new_add_label:nth-child(1)").width();
            $("li.new_add_label:nth-child(1)").animate({width:ii+1+'px'},300);
            $(this).siblings("input").val('');//清空
            var data = {};
            data.keyword=txt_msg;

            $.app.http.post('demand_keyword.html',data,function(data){
                if(data.errorcode == 6411){
                    $.app.util.pop_tips("关键词数量上限")
                }
            })
        } else {
            $.app.util.pop_tips('请添加关键词')
        }

        //删除关键词  -- 定制推广需求  ul>li(del)>a
        del_key_word ();

        });

    del_key_word ();

    //删除关键词  -- 定制推广需求  ul>li(del)>a
    function del_key_word (){
        $("a[name=key-word-del]").on("click",function(){
            $(this).parent("li").animate({width:"0"},300,function(){
                $(this).remove()
            });

            var data_id = $(this).attr('data-id')
            $.app.http.delete('demand_keyword.html?id='+data_id,'',function(data){
            })
        });
    }

    //申请成为媒体主报价单
    $(".choose-all-wri").each(function(){
        if($(this).hasClass('crt')){
            $(this).siblings(".txt-w200,.u-ml1").show();
        }
    });


    //tab切换
    $(".wo-gd-tab li").on('click',function(){
        var liIndex = $(this).index();
        $(this).addClass('crt').siblings().removeClass('crt');
        $(this).parents(".wo-gd-tab").siblings(".wo-gd-ct").find('.wo-gd-1').eq(liIndex).show().siblings().hide().removeClass("u-bd");
    });

    $(".SC-ct .u-page").hide();
    //搜索页面--tab
    $(".SC-tab .tab-inner li").on('click',function(){
        var liIndex = $(this).index();

        $(this).addClass('on').siblings().removeClass('on');

        if ( liIndex == 0 ){
            $(".SC-ct .SC-ct-item").show().css("margin-top","0");
            $(".SC-ct .u-tit").show();
            $(".MeLabel-inner").css("margin-top","30px");
            $(".u-page").hide();

        } else{
            var ctIndex = $(this).parents(".SC-tab").siblings(".SC-ct").find('.SC-ct-item').eq(liIndex-1);
            ctIndex.show().siblings().hide().removeClass("u-bd");
            $(".SC-ct .u-tit").hide();
            $(".SC-ct .SC-ct-item").css("margin-top","30px");
            $(".u-page").show();
        }
    });

    //点击搜索
    $(".search .sea-btn").on("click",function(){
        if(window.location.pathname == '/Mp/index.html' || window.location.pathname == '/mp/index.html'){
            var data = window['condition'];
            if($(this).siblings("input").val() != '' || $(this).siblings("input").val() != undefined){
                data['keyword'] = $(this).siblings("input").val();
                data['offset'] = 1;
                get_mps(data);
            }
        } else {
            if($(this).siblings("input").val() == '' || $(this).siblings("input").val() == undefined){
            } else {
                search_txt('/index/search.html',$(this).parent().attr('id'));
            }
        }
    });

    //按回车键--搜索
    $("#search_tall,#search_short").keydown(function(event){
        var e = event || window.event;
        if (e.keyCode == 13){
            if(window.location.pathname == '/Mp/index.html' || window.location.pathname == '/mp/index.html'){
                var data = window['condition'];
                if($(this).find("input").val() != '' || $(this).find("input").val() != undefined){
                    data['keyword'] = $(this).find("input").val();
                    data['offset'] = 1;
                    get_mps(data);
                }
            } else {
                search_txt('/index/search.html',$(this).attr('id'));
            }
        }
    });
    function search_txt(_this_url,form_id){
        var search_txt = $("#"+form_id+" input").val(),
            url = '/Index/setSearchKeyword.html',title;
        if( search_txt != ''){
            $.post(url, {keyword:search_txt}, function( data) {
                window.location.href = _this_url;
            });
        }
    }

    //点击退出
    $("#login_out a,#login_out1 a").on("click",function(){
        $.app.util.pop_cancel_ok('您是否确定退出登录？');
        $(".cancel-ok .determine").on("click",function(){
            window.location.href = '/Data/login_out.html';
        });

    });

    //管理中心--我的主页+公众号广告订单 列表最后边框 none
    $(".order-public table").each(function(){
        var num_order = $(this).find("tr").length;
        if( num_order == 0 ){
            $.app.util.data_empty($(this), "暂无订单");//数据为空时；
        }
    });

    $(".coll-med .u-tab-main .ct").each(function(){
        var num_coll = $(this).find("dl").length;
        if( num_coll == 0 ){
            $.app.util.data_empty($(this), "暂无收藏");//数据为空时；
        }

    });

    $(".order-public table tr:last-child").css("border-bottom","none");

    $("#pro").change(function(){
        if($(this).val() == 2){
            $(this).parent().siblings().hide();
        } else{
            $(this).parent().siblings().show();
        }
    });

    //各个页面回车设置
    click_block(".view-link",".pop-view-link");
    click_block(".effect-data",".pop-effect-data");
    click_block(".release-data",".pop-release-data");
    click_block(".confirm-do",".pop-confirm-do");
    click_block(".check",".pop-check");
    click_block(".pop-pay",".det-pop-pay");
    click_block(".pop-jt",".det-pop-jt");
    click_block(".pop-tj",".det-pop-tj");
    function pop_bg_show(){
        $(".pop-bg").show();
    }
    function click_block(c,d){
        $(c).on("click",function(){
            pop_bg_show();
            $(d).show();
        });
    }

    var _wri_search_txt;
    //点击标签搜索功能
    $(".mt-ct a,.mC-hd li a,.label-inner a").on("click",function(){
         _wri_search_txt = $(this).text();
         var url = '/Index/setSearchKeyword.html';
        $.post(url, {label:_wri_search_txt}, function( data) {
            window.open('/index/search.html');
        });

    });
});





























