require(['./js/common/config.js'],function(config){
  require(['pagination','template','mock'],function(page,template,Mock){
        $(function(){
          page={
            init:function(){
              var that=this;
              console.log($('section').height())
              that.initJs();
              that.initData();
            },
            initJs:function(){
              var bodyHeight=$('body').height(),
              sectionHeight=$('section').height();
              if(sectionHeight+154 < bodyHeight){
                $('footer').css('margin-top',bodyHeight-sectionHeight-154)
              }
            },
            initData:function(){
              //模拟数据
              Mock.mock('http://test.com', {
                'data|3':[{
                  id     :    Mock.Random.id(),
                  title  : Mock.Random.title(5),
                  content: Mock.Random.paragraph(),
                  time : '@date("yyyy-MM-dd")'
                }]
              });
              $.ajax({
                url:'http://test.com',
                type:'get',
                success:function(res){
                  var res1=JSON.parse(res)
                  var html=template('artical',res1);
                  $('#container').html(html);
                }
              })
            }
          }

          page.init()
        })
  })
})
