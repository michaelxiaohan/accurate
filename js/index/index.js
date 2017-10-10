require(['./js/common/config.js'],function(config){
  require(['slider'],function(slider){
    $(document).ready(
				function() {
					//鼠标经过dl时，公众号头像 效果出现
					//      $.app.util.hover_dl_imghbg();
					$(".fullSlide").hover(
							function() {
								$(this).find(".prev,.next").stop(true, true)
										.fadeTo("show", 0.8);
							}, function() {
								$(this).find(".prev,.next").fadeOut();
							});
					$(".fullSlide").slide(
							{
								titCell : ".hd ul",
								mainCell : ".bd ul",
								effect : "fold",
								autoPlay : true,
								autoPage : true,
								trigger : "click",
								startFun : function(i) {
									var curLi = jQuery(".fullSlide .bd li").eq(
											i);
									if (!!curLi.attr("_src")) {
										curLi.css("background-image",
												curLi.attr("_src")).removeAttr(
												"_src");
									}
								}
							});
				});
				//置顶图标显示
					$('#top-back').hide()
					$(window).scroll(function(){
						 if($(this).scrollTop() > 350){
							$("#top-back").fadeIn();
						 }
						 else{
							$("#top-back").fadeOut();
						 }
					  })

				//置顶事件
        $('#top-back').click(function(){
           $('body,html').animate({scrollTop:0},300);
        })
  })
})
