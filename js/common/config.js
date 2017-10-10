require.config({
  paths:{
    "jquery"  : "../index/jquery-1.8.0.min",
    "slider"  : "../index/jquery.SuperSlide.2.1",
    "pagination":"../common/page",
    "template"   : "../common/arttemplate"
  },
  shim:{
    "slider":['jquery'],
    "pagination":['jquery']
  }
})
