require(['./js/common/config.js'],function(config){
  require(['pagination','template'],function(page,template){
        $(function(){
          page={
            init:function(){
              var that=this;
              that.initData()
            },
            initData:function(){
              $.ajax({
                url:'http://192.168.1.55/eolinker_os/server/index.php?g=Web&c=Mock&o=success&mockCode=B3j8G7Qu6JJ3IXQKjmjmAFIdaPCsFuLj',
                type:'get',
                success:function(res){
                  var html=template('artical',res);
                  $('#container').html(html);
                }
              })
            }
          }

          page.init()
        })
  })
})
