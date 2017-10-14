require(['./js/common/config.js'],function(config){
  require(['pagination','template','mock'],function(page,template,Mock){
        $(function(){
          page={
            totalData:null,//总共有多少数据
            init:function(){
              var that=this;
              that.initJs();
              that.initData();
            },
            initJs:function(){
              var that=this;
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
              Mock.mock('http://test.com',{
                'images|2':[{
                  image: Mock.Random.image('720x300')
                }],
                'content':Mock.Random.paragraph()
              });
              //
              $.ajax({
                url:'http://test.com',
                type:'get',
                success:function(res){
                  var res1=JSON.parse(res);
                  var html=template('imageAndContent',res1);
                  $('#container').html(html);
                }
              })
            }
          }

          page.init()
        })
  })
})
