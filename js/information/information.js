require(['./js/common/config.js'],function(config){
  require(['pagination','template','mock'],function(page,template,Mock){
        $(function(){
          page={
            totalData:null,//总共有多少数据
            currentPage:window.location.href.split("=")[1] || 1,//当前页数
            init:function(){
              var that=this;
              that.initJs();
              that.initData();
            },
            initJs:function(){
              var that=this;
              var bodyHeight=$('body').height(),
              sectionHeight=$('section').height();
              if(sectionHeight+154 < bodyHeight){
                $('footer').css('margin-top',bodyHeight-sectionHeight-154)
              }
            },
            initData:function(){
              var self=this;
              // 模拟数据
              Mock.mock('http://test.com', {
                'data|3':[{
                  id     : Mock.Random.id(),
                  title  : Mock.Random.title(5),
                  content: Mock.Random.paragraph(),
                  time : '@date("yyyy-MM-dd")'
                }],
                'totalData': Mock.Random.natural(60, 100)
              });
              //
              $.ajax({
                url:'http://test.com',
                params:{page:self.currentPage},
                type:'get',
                success:function(res){
                  var res1=JSON.parse(res);
                  self.initPagination(res1.totalData)
                  var html=template('artical',res1);
                  $('#container').html(html);
                }
              })
            },
            initPagination(totalData){
              var self=this;
              function tt(page){
                window.location.href="information.html?page="+page;
              }
                $("#page").initPage(totalData,self.currentPage,tt);
              }
            }

          page.init()
        })
  })
})
