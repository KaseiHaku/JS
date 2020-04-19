/** js 验证码倒计时按钮 */
function disableRegisteVerificationCodeSend(time, buttonId){
	
	var str = "#"+buttonId;
	if(time>0){
		$(str).val("倒计时 "+time+" 秒");
		time--;
		var strt = "disableRegisteVerificationCodeSend("+time+", \""+buttonId+"\");";
		window.setTimeout(strt, 1000);
	}else {
		$(str).val("重新发送验证码");
		$(str).removeAttr("disabled");
		return ;
	}				
}

/** todo 克隆一个对象，返回一个新对象 */
function clone(obj){
    var temp = null;
    if(obj instanceof Array){
        temp = obj.concat();
    }else if(obj instanceof Function){
        //函数是共享的是无所谓的，js也没有什么办法可以在定义后再修改函数内容
        temp = obj;
    }else{
        temp = new Object();
        for(var item in obj){
            var val = obj[item];
            temp[item] = typeof val == 'object'?clone(val):val; //这里也没有判断是否为函数，因为对于函数，我们将它和一般值一样处理
        }
    }
    return temp;
}





