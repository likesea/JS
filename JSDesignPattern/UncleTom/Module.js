/**
 * Created by liuyb on 2015/7/8.
 */
var Calculator = function (eq) {
    var eqCtl = document.getElementById(eq);
    return{
        add: function (x,y) {
            var val=x+y;
            eqCtl.innerHTML=val;
        }
    };
};
//通过这样的代码，每个单独分离的文件都保证这个结构，那么我们就可以实现任意顺序的加载，所以，这个时候的var就是必须要声明的，因为不声明，其它文件读取不到哦。
var blogModule = (function (my) {

    // 添加一些功能

    my.PWD="passowrd";
    return my;
} (blogModule || {}));

//类似c sharp中的扩展方法

var blogModule = (function (my) {
    var  privateName = "博客园";

    function privateAddTopic(data) {
        // 这里是内部处理代码
    }

    my.Name = privateName;
    my.AddTopic = function (data) {
        privateAddTopic(data);
    };

    return my;
} (blogModule || {}));


