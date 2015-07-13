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
            //执行侦听添加的每个一个函数
            each = function (ary,fn) {
                var ret;
                for(var i= 0,l=ary.length;i<l;i++){
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
            return each(stack, function () {
                return this.apply(_self,args);
            })
        };
        _create = function (namespace) {
            var namespace = namespace||_default;
            var cache={},
                offlineStack=[],//离线事件
                ret ={
                    listen: function (key, fn, last) {
                        _listen(key,fn,cache);
                        if(offlineStack==null){
                            return;
                        }
                        if(last==='last'){
                            offlineStack.length&&offlineStack.pop()();
                        }else{
                            each(offlineStack,function(){
                                this();
                            });
                        }
                        offlineStack=null;
                    },
                    one: function (key, fn, last) {
                        _remove(key,cache);
                        this.listen(key,fn,last);
                    },
                    remove: function (key, fn) {
                        _remove(key,cache,fn);
                    },
                    trigger: function () {
                        var fn,
                            args,
                            _self=this;
                            _unshift.call(arguments,cache);
                        args=arguments;
                        fn = function () {
                            return _trigger.apply(_self,args);
                        };
                        /*trigger 操作会将本次行为记录在offlineStack里，可以实现离线推送
                           不过如果之前执行过listen操作，offlienStack会为null，所以新添加
                           事件不会执行离线操作
                        */
                        if(offlineStack){
                            return offlineStack.push(fn);
                        }
                        return fn();
                    }
                };
            return namespace ?
                (nameSpaceCache[namespace]?nameSpaceCache[namespace]:
                nameSpaceCache[namespace]=ret)
                :ret;
        };
        return {
            //可以创建额外的命名空间，防止时间冲突
            create:_create,
            //一下几个方法也可以直接调用，是用默认的_default命名空间
            //one 方法会把key上其他的侦听函数删除，添加自己
            one: function (key, fn, last) {
                var event = this.create();
                event.one(key,fn,last);
            },
            remove: function( key,fn ){
                var event = this.create( );
                event.remove( key,fn );
            },
            listen: function( key, fn, last ){
                var event = this.create( );
                event.listen( key, fn, last );
            },
            trigger: function(){
                var event = this.create( );
                event.trigger.apply( this, arguments );
            }
        };
    }();
    return Event;
    })();