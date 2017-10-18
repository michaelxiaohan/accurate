require(['./js/common/config.js'],function(config){
  require(['template','mock','jquery'],function(template,Mock,jquery){
        $(function(){
          page={
            paramsId:window.location.href.split("=")[1] || 1,//当前页数
            init:function(){
              var that=this;
              that.initJs();
              that.initData();
            },
            initJs:function(){
              var self=this;
              setTimeout(function(){
                var mainHeight=$('body').height(),
                sectionHeight=$('section').height();
                if(sectionHeight+154 < mainHeight){
                  $('footer').css('margin-top',mainHeight-sectionHeight-154)
                }
              },500)
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
            },
            initData:function(){
              var self=this;
              // 模拟数据
              Mock.mock('http://test.com', {
                'data':[{
                  id     : Mock.Random.id(),
                  title  : Mock.Random.title(5),
                  content: Mock.Random.paragraph(),
                  time : '@date("yyyy-MM-dd")',
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
                  var html=template('detailContain',res1);
                  $('.box').html(html);
                }
              })
            }
          }

          page.init()
        })
  })
})
