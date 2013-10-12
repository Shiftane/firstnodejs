exports.index = function(req, res){
  //res.render(view, [locals], callback) Le callback est facultatif
  res.render('index', {layout:'layout.jade', title: 'Express' })
};

