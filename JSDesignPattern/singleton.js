/**
 * Created by liuyb on 2015/7/3.
 */
var getSingle = function (fn) {
    var result;
    return function(){
        return result ||(result=fn.apply(this,arguments));
    }
}