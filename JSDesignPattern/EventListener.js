/**
 * Created by liuyb on 2015/7/6.
 */

var event ={
    clientList:[],
    listen: function (key,fn) {
        if(!this.clientList[key]){
            this.clientList[key]=[];
        }
        this.clientList[key].push(fn);
    },
    trigger: function () {
        var key = Array.prototype.shift.call(arguments),
            fns = this.clientList[key];
        if(!fns||fns.length===0){
            return false;
        }
        for(var i= 0,fn;fn=fns[i++];){
            fn.apply(this,arguments);
        }
    }
};
var installEvent = function(obj){
    for(var i in event){
        obj[i]=event[i];
    }
};
var salesOffices={};
installEvent(salesOffices);
salesOffices.listen('squreMeter88', function (price) {
    console.log('price='+price);
})

salesOffices.listen('squreMeter100', function (price) {
    console.log('price='+price);
})
var xiaoMing ={
    smallHouse: function () {

    }
}
salesOffices.trigger('squreMeter88',200000);
salesOffices.trigger('squreMeter88',500000);
salesOffices.trigger('squreMeter100',300000);