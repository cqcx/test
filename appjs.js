var http = require('http');
var fs = require('fs');
var template = require('art-template')
var url = require('url');
const { time } = require('console');
var comments = [
   {
    name:'名字',
    good:"本次迭代好的地方",
    bad:'本次迭代不好的地方',
    people:'想要感谢的人',
    suggest:'意见或建议'
}
] 
http.createServer(function(req,res){
    var parseObj = url.parse(req.url.toString(),true)
    var pathname =  parseObj.pathname
    console.log(pathname)
    if(pathname === '/'){
        fs.readFile('./views/index.html',function(err,data){
            if(err){
               return res.end('404 Not Found.')
            }
            var html = template.render(data.toString(),{
                comments:comments
            })
            res.end(html)
        })
    }else if(pathname === '/post'){
        fs.readFile('./views/post.html',function(err,data){
            if(err){
                return res.end('404 Not Found.')
            }
            res.end(data)
        })
    }
    else if(pathname.indexOf('/public/') ===  0){
        fs.readFile('.'+pathname,function(err,data){
            
            if(err){
                console.log(err)
               return res.end('404 Not Found.')
            }
            res.end(data)
        })
    }else if(pathname === '/pinglun'){
        var comment = parseObj.query
        comments.push(comment)

        res.statusCode = 302
        res.setHeader('Location','/')
        res.end()
    }
    else{
        fs.readFile('./views/404.html',function(err,data){
            if(err){
                return res.end('404 Not Found')
            }
            res.end(data)
        })
    }
}).listen(3000,function(){
    console.log('running...')
})