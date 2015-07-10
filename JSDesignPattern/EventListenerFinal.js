/**
 * Created by liuyb on 2015/7/10.
 * 带命名空间的发布-订阅
 */
var Event=(function () {
       var global =this,
           Event,
           _default='default';
    Event = function(){
        var _listen,
            _remove,
            _trigger,
            _slice = Array.prototype.slice,
            _shift = Array.prototype.shift,
            _unshift = Array.prototype.unshift,
            nameSpaceCache={},
            _create,
            find,
            each = function (ary,fn) {
                var ret;
                for(var i= 0,l=arg.length;i<l;i++){
                    var n =ary[i];
                    ret = fn.call(n,i,n);
                }
                return ret;
            };
        _listen= function (key,fn,cache) {
            if(!cache[key]){
                cache[key]=[];
            }
            cache[key].push(fn);
        };
        _remove = function (key,cache,fn) {
            if(cache[key]){
                if(fn)
                {
                    for(var i = cache[key].length;i>=0;i--){
                        if(cache[key]===fn){
                            cache.splice(i,1);
                        }
                    }
                }else{
                    cache[key]=[];
                }
            }
        };
        _trigger = function(){
            var cache = _shift.call(arguments),
                key = _shift.call(arguments),
                args = arguments,
                _self =this,
                ret,
                stack = cache[key];
            if(!stack||!stack.length){
                return;
            }
        }
    }
    }()
);