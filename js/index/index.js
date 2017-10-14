require(['./js/common/config.js'],function(config){
  require(['slider','mock','template'],function(slider,Mock,template){
    $(function(){
      page={
        init:function(){
          var that=this;
          that.initJs();
          that.initData();
        },
        initJs:function(){
          var self=this;
          self.slider()
        },
        initData:function(){
          var self=this;
          // 模拟数据
          Mock.mock('http://test.com', {
            'data|8':[{
              image: Mock.Random.image('720x300')
            }]
          });
          //
          $.ajax({
            url:'http://test.com',
            params:{id:self.paramsId},
            type:'get',
            success:function(res){
              var res1=JSON.parse(res);
              console.log(res1)
              var html=template('imageContain',res1);
              // $('#wrap1').html(html);
            }
          })
        },
        slider:function(){
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
              //置顶图标显示
      					$('#top-back').hide();
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
          }
        }
      page.init();

    })
  })
})
