
 if($( window).width() < 1200){
    	$("html").css("width","1200px");
    	$("body").css("width","100%")
    	$("body").css("height","100%")
    	$(".appsf").css("width","90%")
    	$(".part3").css("width","350px")
    	$("#wrap1").css("width","100%")
    	$(".tup1").css("width","100%")
    	$(".tup1 img").css("width","100%")
    }

/**
 * Created by mc on 2016/5/23.
 * Author 630
 * yfb-2.0 main.js
 */
;(function($){
    var _url = '/Data/';
    $.app = $.app || {version: "v1.0.0"};
    $.extend($.app,{
        util:{
            //弹窗
            pop_cancel_ok:function(val){
                $("body").append(
                    '<div class="pop-bg-ok"></div>' +
                    '<div class="g-warp-540 cancel-ok">' +
                    '<i class="m-icon"></i>' +
                    '<div class="ct">' +
                    '<p class="u-fs18 wri1">'+val+'</p>' +
                    '</div>' +
                    '<div class="ft">' +
                    '<div class="btn">' +
                    '<a class="u-btn-p13 cancel u-btn-bgfg">取消</a>' +
                    '<a class="u-btn-p13 determine u-btn-bgf">确定</a>' +
                    '</div>' +
                    '</div>' +
                    '</div>');
                $.app.util.pop_del();

            },
            pop_tips:function(val){
                $("body").append(
                    '<div class="pop-bg-ok"></div>' +
                    '<div class="g-warp-540 cancel-ok">' +
                    '<i class="m-icon"></i>' +
                    '<div class="ct">' +
                        //'<p class="u-fs24 wri2">已成功支付<span class="u-fcf">￥25000</span></p>' +
                        //'<p class="u-fs14 u-fc9 wri3">您的余额还剩余<span class="u-fcf">￥5000</span></p>' +
                    '<p class="u-fs18 wri1">'+ val +'</p>' +
                    '</div>' +
                    '<div class="ft">' +
                    '<div class="btn">' +
                    '<a class="u-btn-p13 determine u-btn-bgf">确定</a>' +
                    '</div>' +
                    '</div>' +
                    '</div>');

                $.app.util.pop_del();
            },
            pop_tips_yes:function(val){
                $("body").append(
                    '<div class="pop-bg-ok"></div>' +
                    '<div class="g-warp-540 cancel-ok pop-tips-540">' +
                    '<i class="m-icon"></i>' +
                    '<div class="ct">' +
                        //'<p class="u-fs24 wri2">已成功支付<span class="u-fcf">￥25000</span></p>' +
                        //'<p class="u-fs14 u-fc9 wri3">您的余额还剩余<span class="u-fcf">￥5000</span></p>' +
                    '<p class="u-fs18 wri1">'+ val +'</p>' +
                    '</div>' +
                    '<div class="ft">' +
                    '<div class="btn">' +
                    '<a class="u-btn-p13 determine u-btn-bgf">确定</a>' +
                    '</div>' +
                    '</div>' +
                    '</div>');

                $.app.util.pop_del();
            },

            pop_del:function(){
                //弹窗--点击取消--点击确定
                $(".g-warp-540 .u-btn-p13").on("click",function(){
                    $(".g-warp-540").remove();
                    $(".pop-bg-ok").remove();
                })
            },

            pop_del_tools:function(_this_){
                $(".cancel-ok .determine").on("click",function(){
                    _this_.parents('.module').slideUp('500',function(){
                        _this_.parents('.module').remove();
                    });
                    var count = $(".tools_box .ct .module").length;
                    if(count <= 1){
                        $.app.util.tools_box_empty_data();//素材为空
                    } else {
                        $(".tools_box .empty-data").remove();
                    }
                })
            },

            //table数据空
            table_empty:function(name){
                var count_tr = $( name + " tr" ).length;
                if( count_tr == 0){
                    $(name).append(
                        '<tr class="no_data_table" style="height: 320px;padding:100px 0">' +
                        '<td colspan="7">' +
                        '<div class="empty-data-table">' +
                        '<i class="empty-data-icon"></i>' +
                        '<p class="empty-data-desc">抱歉！没有找到相关公众号</p>' +
//                        '<a class="empty-data-operating u-fcftd">重新刷新</a>' +
                        '</div>' +
                        '</td>' +
                        '</tr>'
                    );
                }
            },

            //普通空数据
            data_empty:function(name,v){
                $(name).append(
                    '<div class="no_data_table" style="height:120px;padding:100px 0">' +
                    '<div class="empty-data-table">' +
                    '<i class="empty-data-icon"></i>' +
                    '<p class="empty-data-desc">'+v+'</p>' +
//                        '<a class="empty-data-operating u-fcftd">重新刷新</a>' +
                    '</div>' +
                    '</div>'
                );
            },

            event_cart:function(action,data,op,callback){
                var url;
                if(action.indexOf('/') == 0){
                    url = action;
                }else{
                    url = _url+action+'.html';
                }
                if(op == undefined) op = 'post';
                //添加 / 删除
                $.ajax({
                    'url':url,
                    'type':op,
                    'data':data,
                    'dataType':'json',
                    success:function(d){
                        callback(d);
                    },
                    error:function(){},
                });
            },

            //当页面数据为空时
            //选号栏
            choose_box_empty_data:function(){
                $(".choose_box .tool-ct-tab").append(
                    '<div class="empty-data">' +
                    '<i class="empty-data-icon"></i>' +
                    '<p class="empty-data-desc">暂未添加媒体</p>' +
                        //'<a href="{:U('Index/index')}" class="empty-data-operating u-fcftd">去首页看看</a>'
                        //'<a href="INDEX/index.html" class="empty-data-operating u-fcftd">去首页看看</a>' +
                    '</div>'
                );
            },
            //我的素材
            tools_box_empty_data:function(){
                $(".tools_box .ct").html(
                    '<div class="empty-data">' +
                    '<i class="empty-data-icon"></i>' +
                    '<p class="empty-data-desc">暂无素材</p>' +
                    '</div>'
                );
            },
            // 重新计算 选号栏数据
            getCartStatistics:function(){
                var count = $("#data_mpid .ct dl").length,
                    min_price_sum = 0,reg=/[\u4E00-\u9FA5]/g;
                if(count == 0){
                    $.app.util.choose_box_empty_data();
                    $(".choose_box .choose-box-tips .btn").css({"background-color":"#dbdbdb","cursor":" no-drop"}).attr("href","javascript:void(0);");
                } else {
                    $(".choose_box .empty-data").remove();
                    $(".choose_box .choose-box-tips .btn").css({"background-color":"#ff8800","color":"#ffffff","cursor":" pointer"}).attr("href","/Mp/date.html")
                }
                $.each($("#data_mpid .ct dl"),function(){
                    min_price_sum += parseFloat(($(this).find(".u-mon").html()).replace(reg,''));
                });
                $("#toolbar1 >.item-inner >span").html(count);
                $(".choose_box .choose-box-tips span.u-fcf").html(count);
                $(".total>span").html('￥'+min_price_sum+'起');
            },
            // 重新计算 收藏栏数据
            collect_box_data:function(type){
                var _count = 0;
                $.app.http.get('my_collection.html',type,function(kol_data){
                    _count = kol_data._count;
                    $("#collect_box_mp .callout span").html(_count);
                    $("#collect_box_kol .callout span").html(_count);
                });
            },
            //点击 "X" 删除整个dl--侧栏
            del_this_dl:function(){
                $(".toolbar .ct .del").unbind('click').on("click",function(){
                    $(this).unbind('click');
                    var _this_class = $(this).parents(".m_slide").attr("class"),
                        name = $(this).parents(".m_slide").attr("class") == 'choose_box m_slide'?'my_cart':'my_collection',
                        url = name+".html",
                        mid_number = $(this).attr('data_del_sid'),
                        type = $(this).siblings("b").hasClass("u-hj") ? 3 : 1;


                    $.app.http.post(url,{"mid": mid_number, "type": type},function(data){
                    });

                    $(this).parents("dl").slideUp(500,function(){
                        $(this).remove();
                        $.app.util.getCartStatistics(); // 重新计算 选号栏数据
                        $.app.util.collect_box_data(type); // 重新计算 收藏数据
                    });

                    var data_del_sid = $(this).attr("data_del_sid");//删除 的 data_del_sid 值；
                    //首页等dl 状态
                    $("dl .u-imghbg input").each(function(){
                        if($(this).val() == data_del_sid){
                            if( _this_class == 'choose_box m_slide'){
                                $(this).siblings(".yfb-medias-add").removeClass("on").text("添加");//删除 相同的 class值。
                            } else {
                                $(this).siblings(".yfb-medias-coll").removeClass("on").text("收藏");//删除 相同的 class值。
                            }
                        }
                    });

                    //微信公众号广告 状态
                    $(".m-table-48 td.operating input[type=hidden]").each(function(){
                        if($(this).val() == data_del_sid){
                            if( _this_class == 'choose_box m_slide'){
                                $(this).siblings(".yfb-medias-add").removeClass("on").text("添加至选号栏");//删除 相同的 class值。
                            } else {
                                $(this).siblings(".yfb-medias-coll").removeClass("on").text("收藏");//删除 相同的 class值。
                            }
                        }
                    });

                    //公众号详情 状态
                    if($(".Pnd-item-1 input").val() == data_del_sid){
                        if( _this_class == 'choose_box m_slide'){
                            $(".Pnd-item-1").parent(".content").siblings(".sidebar").find(".yfb-medias-add").removeClass("u-btn-bggg").addClass("u-gzhhj").text("添加至选号栏");
                        } else {
                            $(".Pnd-item-1").parent(".content").siblings(".sidebar").find(".yfb-medias-coll").removeClass("u-btn-bggg").addClass("u-hrhj").text("收藏");
                        }
                    }

                });
            },

            //点击 "X" 删除整个dl--个人中心
            del_this_dl_cc:function(){
                $(".u-tab-main dd.btn-del").unbind('click').on("click",function(){
                    $(this).unbind('click');
                    var mid_number = $(this).attr('data_del_sid'),
                        type = $(this).siblings("dd").find("p").hasClass("u-hj") ? 3 : 1;
                    $.app.http.post("my_collection.html",{"mid": mid_number, "type": type},function(data){
                    });
                    $(this).parents("dl").animate({"width" : 0},500,function(){
                        $(this).remove();
                    });
                });
            },

            //首页dl列表
            add_list_to_toolbar:function(id,this_click){
                var is = this_click.parents("dl").find('img').attr('src') != undefined ? 1 :0;
                var _id,_pric_mp_deail;
                if(this_click.siblings("input").attr("name") == 'id'){
                    _id = 'id';
                } else {
                    _id = 'mp_id';
                }


                if(this_click.hasClass("Pnd-side-btn")){
                    var arr_pirc = [];
                    $('.Pnd-sidebar-lst li').each(function(){
                        if($(this).find("span").text() != "暂不接单"){
                            arr_pirc.push($(this).find("span").text());
                        }
                    });

                    arr_pirc.sort(function(a,b){
                        return a-b;
                    });

                    var mp_id           = this_click.siblings('input[name='+_id+']').val(),
                        list_img_src    = this_click.parents(".sidebar").siblings(".content").find('.Pnd-item-1 dt img').attr('src'),
                        list_title      = this_click.parents(".sidebar").siblings(".content").find('.Pnd-item-1 dd b.m-tit').text(),
                        list_title_href = this_click.parents(".sidebar").siblings(".content").find('.Pnd-item-1 dd a').attr('href'),
                        list_catname    = this_click.parents(".sidebar").siblings(".content").find('.Pnd-item-1 li:nth-child(1) i.u-fs18').text(),
                        list_fans_num   = this_click.parents(".sidebar").siblings(".content").find('.Pnd-item-1 li:nth-child(2) i.u-fs18').text()+'粉丝',
                        list_min_pric   = arr_pirc[0]+'起';
                } else {
                    var mp_id           = this_click.siblings('input[name='+_id+']').val(),
                        list_img_src    = is ? this_click.parents("dl").find('img').attr('src') : this_click.parents("tr").find('img._logo').attr('src'),
                        list_title      = is ? this_click.parents("dl").find('.dd-tit a').text() : this_click.parents("tr").find('img._logo').attr('alt'),
                        list_title_href = is ? this_click.parents("dl").find('.dd-tit a').attr('href') : this_click.parents("tr").find('a.tit').html(),
                        list_catname    = is ? this_click.parents("dl").find('dd .ind').text() : this_click.parents("tr").find('.catname').html(),
                        list_fans_num   = is ? this_click.parents("dl").find('dd .num').text() : this_click.parents("tr").find('.fans_num').html()+'粉丝',
                        list_min_pric   = is ? this_click.parents("dl").find('dd .u-mon').text() : this_click.parents("tr").find('.min-price').html()+'起',
                        hj_type         = this_click.parents("dl").find('dd .item-ct b').attr("class"),
                        hj_name         = this_click.parents("dl").find('dd .item-ct b').text(),
                        hj_desc         = this_click.parents("dl").find('dd .item-ct p.exp').text();
                }
                if(this_click.parents("dl").hasClass("m-gzhhj")){
                    $('.toolbar '+id+' .ct').append('<dl class="cart_mp_'+mp_id+'"><dt><img src='+list_img_src+' alt="公众号名称" class="tool-img"></dt>' +
                        '<dd><b class="dd-tit"><a href="'+list_title_href+'" target="_blank">'+list_title+'</a></b>' +
                        '<b class="'+hj_type+'">'+hj_name+'</b>' +
                        '<p class="exp">'+hj_desc+'</p>' +
                        '<span class="del" data_del_sid="'+mp_id+'"></span>' +
                        '</dd>' +
                        '</dl>');
                } else {
                    $('.toolbar '+id+' .ct').prepend('<dl class="cart_mp_'+mp_id+'"><dt><img src='+list_img_src+' alt="公众号名称" class="tool-img"></dt><dd><b class="dd-tit"><a href='+list_title_href+'>'+list_title+'</a></b><p><span class="ind">'+list_catname+'</span>/<span class="num">'+list_fans_num+'</span></p><p class="u-mon">'+list_min_pric+'</p><span class="del" data_del_sid="'+mp_id+'"></span></dd></dl>');
                }
            },

            table_tags:function(data){
                var tags_wrap = $(".tags-wrap").height();
                if(tags_wrap > 44){
                    $(".tags-wrap").css({"overflow":"hidden","height":"44px"});
                    $(".mt-lab a.more").css("display","block").attr("href",data);
                }
            },

            //合集--添加到侧栏 dl列表
            add_hj_to_toolbar:function(id,this_click){
                var _id;
                if(this_click.siblings("input").attr("name") == 'id'){
                    _id = 'id';
                } else {
                    _id = 'mp_id';
                }
                var mp_id           = this_click.siblings('input[name='+_id+']').val(),
                    list_img_src    = this_click.siblings("div.u-w96").find('img').attr('src'),
                    list_title      = this_click.siblings("b.ct-tit").text(),
                    list_title_desc = this_click.siblings("p.desc").text();
                $('.toolbar '+id+' .ct').prepend('<dl class="cart_mp_'+mp_id+'"><dt><img src='+list_img_src+' alt="公众号名称" class="tool-img"></dt><dd><b class="dd-tit"><a href="/Index/package.html?id='+mp_id+'"  target="_blank">'+list_title+'</a></b>' +
                        //'<b class="u-hj '+hj_type+'">'+hj_name+'</b>' +
                    '<p class="exp">'+list_title_desc+'</p><span class="del" data_del_sid="'+mp_id+'"></span></dd></dl>');
            },

            //右侧功能栏公众号列表
            choose_box_list:function(data,val_type){
                return '<dl class=cart_mp_'+val_type+'>' +
                    '<dt><img src='+data.thumb+' alt="公众号名称" class="tool-img"></dt>' +
                    '<dd>' +
                    '<b class="dd-tit">' +
                    '<a href="/Mp/detail.html?id='+val_type+'" target="_blank">'+data.name+'</a>' +
                    '</b>' +
                    '<p><span class="ind">'+data.catname+'</span>/<span class="num">'+data.fans_num+'粉丝</span></p>' +
                    '<p class="u-mon">'+data.min_price+'起</p><span class="del" data_del_sid="'+data.id+'"></span>' +
                    '</dd>' +
                    '</dl>'
            },
            //右侧功能栏公众号列表
            choose_box_list_hj:function(data,val_type){
                var hj_name = data.package_type == 1 ?  "公众号合集" : "媒体合集";
                var hj_type = data.package_type == 1 ? "u-gzhhj" : "u-hrhj";
                return '<dl class=cart_mp_'+val_type+'>' +
                    '<dt><img src='+data.thumb+' alt="公众号名称" class="tool-img"></dt>' +
                    '<dd>' +
                    '<b class="dd-tit">' +
                    '<a href="/Index/package.html?id='+val_type+'" target="_blank">'+data.name+'</a>' +
                    '</b>' +
                    '<b class="u-hj '+hj_type+'">'+hj_name+'</b>' +
                    '<p class="exp">'+data.description+'</p>' +
                    '<span class="del" data_del_sid="'+data.id+'"></span>' +
                    '</dd>' +
                    '</dl>'
            },


            //单选
            filter:function(filter_num){
                $(".filter li").on("click",function(){
                    if(filter_num == 0){
                        $(this).find("i").addClass("choose").parents("li").siblings().find("i").removeClass("choose");
                    }
                });
            },


            //提示弹窗
            default_pop:function(data){
                $('body').append('<div class="g-warp-460"><div class="ct inner cb u-mt3"><i class="fa fa-question-circle-o" aria-hidden="true"></i><span class="pop-wri-default">'+data+'</span></div><div class="ft inner cb"><a class="u-br3 u-btn-bgf u-btn-80 fr">确定</a><a class="u-br3 u-btn-bgg u-btn-80 fr" id="cancel_pop">取消</a></div></div>');

                $("#cancel_pop").on("click",function(){
                    $(".pop-bg").hide();
                    $(this).parents(".g-warp-460").remove();
                });
            },

            //鼠标经过dl时，公众号头像 效果出现
            hover_dl_imghbg:function(){
                $(".g-wrap .cb dl").hover(function(){
                    $(this).find(".u-imghbg").stop().show();
                },function(){
                    $(this).find(".u-imghbg").stop().hide();
                });
            },

            loading_entire_window:function(num){
                if(num == 0){
                    $('body').append(
                        '<div class="loading_entire_window">' +
                        '<div class="loading_inner">' +
                        '<div class="spinner"><div class="double-bounce1"></div><div class="double-bounce2"></div></div>' +
                        '<p class="wir">导入中...</p>' +
                        '</div>' +
                        '</div>'
                    )
                } else if (num == 1){
                    $(".loading_entire_window").remove();
                }
            }

        },
        tool:{
            upload_oss:function(id_name,callback,dirname){
                var imageType = ['image/jpeg','image/png','image/gif'];
                var uploader = new plupload.Uploader({
                    runtimes : 'html5,flash,silverlight,html4',
                    browse_button : id_name,  //选择图片按钮 ID
                    multi_selection: false, //是否可多选图片
                    //container: document.getElementById('container'),
                    flash_swf_url : 'lib/plupload-2.1.2/js/Moxie.swf',
                    silverlight_xap_url : 'lib/plupload-2.1.2/js/Moxie.xap',
                    url : host,
                    init: {
                        PostInit: function() { //post 初始化
                        },
                        FilesAdded: function(up, files) { //添加文件
                            get_dirname(dirname); //文件名称
                            for(var i in files){
                                if(imageType.indexOf(files[i].type) == -1){
                                    callback({'error':-1,'msg':'图片格式不正确'});
                                    return false;
                                }
                            }
                            set_upload_param(uploader, '', false);
                            return false;
                        },

                        BeforeUpload: function(up, file) { //上传前
                            check_object_radio();
                            set_upload_param(up, file.name, true);
                            //return false;
                        },

                        UploadProgress: function(up, file) { //上传 进度
                            $("div[name=pic_show] .cover-pic-default").append('<div class="loading_upload"></div>')
                            //$(".pic-default").append('<div class="loading_upload"></div>')
                        },

                        FileUploaded: function(up, file, info) { //上传成功
                            $(".loading_upload").remove();
                            var filename = get_uploaded_object_name(file.name),
                                imgurl = host+'/'+filename;
                            callback({'name':imgurl});
                            return false;
                        },

                        Error: function(up, err) { //失败
                            $.app.util.pop_tips('图片上传失败');
                        }
                    }
                });
                uploader.init();
            }
        },
        http:{

            //ajax 封装方法
            get:function(action,data,callback) {
                var url = _url+action;
                $.ajax({
                    url: url,
                    type: 'GET',
                    dataType: 'json',
                    data: data,
                    headers: {
                        'X-CSRF-TOKEN': $.app.cookie.get('XSRF-TOKEN')
                    }
                }).done(function (d) {
                    callback(d);

                }).fail(function (e) {
                    callback(e);
                });
            },

            post:function(action,data,callback) {
                data = (data == null || data == "" || typeof(data) == "undefined") ? {"date": new Date().getTime()} : data;
                var url = _url+action;
                $.ajax({
                    url: url,
                    type: 'post',
                    dataType: 'json',
                    data: data,
                    headers: {
                        'X-CSRF-TOKEN': $.app.cookie.get('XSRF-TOKEN')
                    }
                }).done(function (d) {
                    callback(d);

                }).fail(function (e) {
                    callback(e);
                });
            },

            put:function(action,data,callback) {
                data = (data == null || data == "" || typeof(data) == "undefined") ? {"date": new Date().getTime()} : data;
                var url = _url+action;
                $.ajax({
                    url: url,
                    type: 'put',
                    dataType: 'json',
                    data: data,
                    headers: {
                        'X-CSRF-TOKEN': $.app.cookie.get('XSRF-TOKEN')
                    }
                }).done(function (d) {
                    callback(d);

                }).fail(function (e) {
                    callback(e);
                });
            },

            delete:function(action,data,callback){
                data = (data == null || data == "" || typeof(data) == "undefined") ? {"date": new Date().getTime()} : data;
                var url = _url+action;
                $.ajax({
                    url: url,
                    type: 'delete',
                    dataType: 'json',
                    data: data,
                    headers: {
                        'X-CSRF-TOKEN': $.app.cookie.get('XSRF-TOKEN')
                    }
                }).done(function (d) {
                    callback(d);

                }).fail(function (e) {
                    callback(e);
                });
            }

        },
        cache:{
            get:function(key){
                return JSON.parse(localStorage.getItem(key));
            },
            put:function(key,data_obj){
                return localStorage.setItem(key, JSON.stringify(data_obj));
            },
            remove:function(key){
                return localStorage.removeItem(key);
            },
            clear:function(){
                return localStorage.clear();
            },
            //编辑页面
            get_edit:function(name){
                return this.get(name);
            },
            put_edit:function(name,data_obj){
                return this.put(name,data_obj);
            },
            remove_edit:function(name){
                return this.remove(name);
            },
            //添加公众号页面
            get_add_mp:function(name){
                return this.get(name);
            },
            put_add_mp:function(name,data_obj){
                return this.put(name,data_obj);
            },
            remove_add_mp:function(name){
                return this.remove(name);
            }
        },
        cookie:{
            get:function(cname){
                var name = cname + "=";
                var ca = document.cookie.split(';');
                for(var i=0; i<ca.length; i++)
                {
                    var c = ca[i].trim();
                    if (c.indexOf(name)==0) return c.substring(name.length,c.length);
                }
                return "";
            },
            put:function(cname,cvalue,exdays)
            {
                var d = new Date();
                d.setTime(d.getTime()+(exdays*24*60*60*1000));
                var expires = "expires="+d.toGMTString();
                document.cookie = cname + "=" + cvalue + "; " + expires;
            }
        }
    });

    $.fn.table_loading = function(is){
        if(is == undefined) is = 1;
        if(is){
            $(this).html('')
            $(this).append(
                '<tr class="loading-table" style="height:320px;padding:100px 0">' +
                '<td colspan="7">' +
                '<div class="spinner"><div class="double-bounce1"></div><div class="double-bounce2"></div></div>' +
                '</td>' +
                '</tr>'
            )
        }else{
            $(this).find('.loading-table').remove();
        }

    };
})(jQuery);



