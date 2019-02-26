var reg = {
	strReg: /[^\x00-\xff]/g;
}

(function(w,undefined){
	var c = {};
	c.isNumber = function(e) {
		var d = /^[1-9]\d*$/;
		return d.test(e)
	};
	c.limitStr = function(s, m, n) {
		s = parseInt(a.trim(s).length, 10);
		if(m == -1) {m = s + 1};
		if(n == -1){n = s - 1};
		return (s <= m && s >= n)
	};
	c.limitNum = function(s, m, n) {
		s = parseInt(s, 10);
		if(m == -1) {m = s + 1};
		if(n == -1){n = s - 1};
		return (s <= m && s >= n)
	};
	c.char = function(e,m,n) {
		var d = /[^\x00-\xff]/g;
		e.replace(d,"**");	
		return c.limitStr(e);

	};
	c.required = function(e) {
		return a.trim(e).length;
		// return e.replace(/^[\s\xA0]+/,"").replace(/[\s\xA0]+$/,"").length;
	};
	c.spChar = function(e) {
		var d = /^([a-zA-Z0-9 ,.\(\)'"£¬¡£¡°¡®¡¯¡±-]|[\u4e00-\u9fa5])*$/;
		return d.test(a.trim(e))
	};

	c.nickName = function(e) {
		var d = /^([a-zA-Z]|[\u4e00-\u9fa5]){2,6}$/;
		return d.test(a.trim(e))
	};

	c.mobile = function(e) {
		var d = /^1[345678]\d{9}$|^01[345678]\d{9}$/;
		return d.test(e);
	};
	c.tel = function(e) {
		var d = /^(0\d{2,4}-?)?[2-9]\d{6,7}(-\d{2,5})?$|^(?!\d+(-\d+){4,})[48]00(-?\d){7,16}$/;
		return d.test(e);
	};
	c.phone = function(e) {
		return c.mobile(e) || c.tel(e);
	};

	c.hasTelMail = function(e) {
		var d = /[0-9£°£±£²£³£´£µ£¶£·£¸£¹ÁãÒ»¶þÈýËÄÎåÁùÆß°Ë¾ÅÒ¼·¡ÈþËÁÎéÂ½Æâ°Æ¾Á]{6,}/
		return !d.test(e);
	};

	c.isContent = function(s, m, n) {
		if (a.trim(s).length <= 0 || (c.limitStr(s, m, n) && c.spChar(s))) {
			return true
		} 
		return false
	};
	
	c.choose = function(e) {
		return e == -1 ? false : true
	};

	c.username = function(e) {
		var d = /^([a-zA-Z0-9]|[\u4e00-\u9fa5]){4,16}$/;
		return d.test(e);
	};

	c.pwd = function(e) {
		var d = /^([a-zA-Z0-9_]){6,}$/;
		return d.test(e);
	};
	c.isNan = function(e) {
		return isNaN(e);
	};
	c.time = function(e) {
		var d = /^(\d{4})-(\d{2})-(\d{2})$/;  
		return d.test(e);
	};
	c.email = function() {
		var d = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
		return d.test(e);
	};
	w.regex = c;
}(window));

function isIdCard(code) {
    var city = { 11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古", 21: "辽宁", 22: "吉林", 23: "黑龙江 ", 31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南", 42: "湖北 ", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏 ", 61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外 " };
    var tip = "";
    var pass = true;
    code = code.toUpperCase();
    //验证身份证格式（6个地区编码，8位出生日期，3位顺序号，1位校验位）
    if (!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)) {
        tip = "身份证号格式错误";
        pass = false;
    } else if (!city[code.substr(0, 2)]) {
        tip = "地址编码错误";
        pass = false;
    } else {
        //18位身份证需要验证最后一位校验位
        if (code.length == 18) {
            code = code.split('');
            //∑(ai×Wi)(mod 11)
            //加权因子
            var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
            //校验位
            var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
            var sum = 0;
            var ai = 0;
            var wi = 0;
            for (var i = 0; i < 17; i++) {
                ai = code[i];
                wi = factor[i];
                sum += ai * wi;
            }
            var last = parity[sum % 11];
            if (parity[sum % 11] != code[17]) {
                tip = "校验位错误";
                pass = false;
            }
        }
    }
    return tip;
}

 // 去掉syle样式
html.replace(/<style(([\s\S])*?)<\/style>/g, '');
// 去掉html标签
html.replace(/\n/mg, '')