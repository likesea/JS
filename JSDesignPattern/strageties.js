/**
 * Created by liuyb on 2015/7/3.
 * 策略模式，表单校验实例
 */
    //策略对象
var strategies={
    isNonEmpty:function(value,errorMsg){
        if(value==''){
            return errorMsg;
        }
    },
    minLength: function (value,length,errorMsg) {
        if(value.length<length){
            return errorMsg;
        }
    },
    isMobile: function (value, errorMsg) {
        if(!/(^1[3|5|8][0-9]{9}$)/.test(value)){
            return errorMsg;
        }
    }
}
//验证类
var Validator =function(){
    this.cache=[];//保存校验规则
}
Validator.prototype.add= function (dom, rules) {
    var self =this;
    for(var i= 0,rule;rule=rules[i++];){
        (function (rule) {
            var strategyAry = rule.strategy.split(':');
            var errorMsg=rule.errorMsg;
            self.cache.push(function () {
                var strategy = strategyAry.shift();
                strategyAry.unshift(dom.value);
                strategyAry.push(errorMsg);
                return strategies[strategy].apply(dom,strategyAry);
            })
        })(rule);
    }
};
Validator.prototype.start= function () {
    for(var i = 0,validatorFunc;validatorFunc=this.cache[i++];){
        var msg = validatorFunc();
        if(msg){
            return msg;
        }
    }
};


