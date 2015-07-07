/**
 * Created by liuyb on 2015/7/3.
 * 迭代器模式
 */
/*
内部迭代器
 */
 var each = function(ary,callback){
     for(var i= 0,l=ary.length;i<l;i++){
         callback.call(ary[i],i,ary[i]);
     }
 };

