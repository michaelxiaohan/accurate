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
