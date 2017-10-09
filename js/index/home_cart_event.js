/**
 * Created by MianChao on 2016/6/20.
 */
$.app.info = {
    init : function () {
        //选号栏
        $.app.http.get('my_cart.html','',function(data){
            if(data.data != undefined){
                var _html = '';
                $.each(data.data,function(k,v){
                    _html += $.app.util.choose_box_list(v, v.id);
                });
                $("#data_mpid .ct").html(_html);
                $.app.util.del_this_dl();
                $.app.util.getCartStatistics();
            }
        });
    }
};
$.app.info.init();

event_add_cart();

//收藏
$(".nav-slide .col .item-inner,.collect_box .tab li:first-child").unbind("click").on("click",function(){
    var type = {
        'type':1
    };
    coll_data(type);
});
$(".collect_box .tab li:last-child").on("click",function(){
    var type = {
        'type':3
    };
    coll_data(type);
});
function coll_data(type){
    //收藏
    $(".collect_box .ct").html('');
    var id_name = type.type == 1 ? "collect_box_mp" : "collect_box_kol";
    $.app.http.get('my_collection.html',type,function(kol_data){
        if(kol_data.data != undefined){
            var _html = '';
            $.each(kol_data.data,function(k,v){
                var fun_name = type.type == 1 ? $.app.util.choose_box_list(v, v.id) : $.app.util.choose_box_list_hj(v, v.id);
                _html += fun_name;
            });
            $("#"+id_name+" .ct").html(_html);
            $.app.util.del_this_dl();
            var _count = kol_data._count;
            $("#collect_box_mp .callout span").html(_count);
            $("#collect_box_kol .callout span").html(_count); // 重新计算 收藏数据
        }
    });

}

function event_add_cart(){
    //点击选择
    $(".yfb-medias-coll,.yfb-medias-add").unbind('click').on('click',function(){
        var _id,_type,op_name,tips_id,id,action,box,_this,is_list;
        if($(this).nextAll("input").attr("name") == 'id'){
            _id = 'id';
        } else {
            _id = 'mp_id';
        }

        if($(this).parents("dl").hasClass("m-gzhhj")){
                id = $(this).nextAll("input[name="+_id+"]").val(),
                action = $(this).hasClass('yfb-medias-add') ? 'my_cart' : 'my_collection',
                box = {'my_cart':'#data_mpid','my_collection':'#collect_box_kol'},
                _this = $(this),is_list = $(this).parents('table').length;
            _type = 3
        } else {
                id = $(this).nextAll("input[name="+_id+"]").val(),
                action = $(this).hasClass('yfb-medias-add') ? 'my_cart' : 'my_collection',
                box = {'my_cart':'#data_mpid','my_collection':'#collect_box_mp'},
                _this = $(this),is_list = $(this).parents('table').length;
            _type = 1
        }

        if($(this).hasClass('yfb-medias-add')){
            op_name = '添加';
            tips_id = "toolbar1";
            if(is_list) op_name += '至选号栏';
        }else{
            op_name = '收藏';
            tips_id = "toolbar2";
        }


        data_coll_add(id,_type,action,box,_this,tips_id,op_name);
    });

    $(".mC-hd .ct .btn").on("click",function(){
        if($(this).nextAll("input").attr("name") == 'id'){
            _id = 'id';
        } else {
            _id = 'mp_id';
        }
        var id = $(this).nextAll("input[name="+_id+"]").val(),
            _this = $(this);

        data_coll_add(id,"3","my_collection","#collect_box_kol",_this,"toolbar2","收藏");
    });
}

function data_coll_add(id,_type,action,box,_this,tips_id,op_name){
    $.app.util.event_cart(action,{'mid':id,'type':_type},'post',function(d){
        //用户未登录
        if (d.errorcode != undefined && d.errorcode != 6409) {
            //点击登录弹出
            $('.pop-reg,.pop-bg').show();
            $(".pop-tab li:last-child").addClass("on").siblings().removeClass("on");
            $(".pop-reg >div.reg").hide().siblings().show();
            return;
        } else if(d.errorcode == 6409){
            $.app.util.pop_tips("暂不接单");
        }

        //点击公众号状态，查找本页面相同的value值 并 统一 状态；
        var _this_type = _this.hasClass('yfb-medias-add') ? 'yfb-medias-add' : 'yfb-medias-coll';
        $(".g-wrap dt input[type=hidden]").each(function(){
            if($(this).val() == id){
                $(this).siblings("."+_this_type).addClass("on").text("已"+op_name);
            }
        });

        if(d.op == 'add'){
            if(_this.hasClass("Pnd-side-btn yfb-medias-add")){
                _this.removeClass("u-gzhhj").addClass("u-btn-bggg").text("已"+op_name+"至选号栏");
            } else if(_this.hasClass("Pnd-side-btn yfb-medias-coll")){
                _this.removeClass("u-hrhj").addClass("u-btn-bggg").text("已"+op_name);
            } else {
                _this.addClass("on").text("已"+op_name);
            }

            //渲染的代码；
            if( _this.parents("div").hasClass("mC-hd")){
                $.app.util.add_hj_to_toolbar("#collect_box_kol",_this);
            } else {
                $.app.util.add_list_to_toolbar(box[action],_this);
            }
            $.app.util.del_this_dl();

        }else{
            if(_this.hasClass("Pnd-side-btn yfb-medias-add")){
                _this.removeClass("u-btn-bggg").addClass("u-gzhhj").text(op_name);
            } else if(_this.hasClass("Pnd-side-btn yfb-medias-coll")){
                _this.removeClass("u-btn-bggg").addClass("u-hrhj").text(op_name);
            } else {
                var _this_type = _this.hasClass('yfb-medias-add') ? 'yfb-medias-add' : 'yfb-medias-coll';
                $(".g-wrap dt input[type=hidden]").each(function(){
                    if($(this).val() == id){
                        $(this).siblings("."+_this_type).removeClass("on").text(op_name);
                    }
                });
                _this.removeClass("on").text(op_name);
            }
            var list_class = "cart_mp_"+id;
            $("#data_mpid .ct >dl."+list_class).slideUp(500).remove();// 删除
            $("#collect_box_mp .ct >dl."+list_class).slideUp(500).remove();// 删除
            $("#collect_box_kol .ct >dl."+list_class).slideUp(500).remove();// 删除
        }
        $("#"+tips_id+" .op-tips").attr("class","op-tips").addClass(d.op);
        tips_click_result(tips_id, d.op);
        $.app.util.getCartStatistics();
        $.app.util.collect_box_data(_type); // 重新计算 收藏数据
    });
}


//种类species 状态status；提示状态
function tips_click_result(spe,sta){
    $("#"+spe+" .op-tips."+sta+"").show().animate({left:"-198px",opacity:"1"},300);
    setTimeout(function(){
        $("#"+spe+" .op-tips."+sta+"").fadeOut(300,function(){
            $(this).animate({left:"-150px",opacity:"0"},300);
        });
    },800);
}
