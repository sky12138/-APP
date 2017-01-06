var express = require('express');
var router = express.Router();
var APIUsers = function () { };

APIUsers.datas = [
    { id: 100, name: '张三丰', pass:'zsf', age: 20, ico:'/imgs/0.jpg', en_name:'ZhangSanFeng', money:100 },
    { id: 200, name: '许文强', pass:'xwq', age: 30, ico: '/imgs/1.jpg', en_name:'XueWenQiang', money:200 },
    { id: 300, name: '杨过', pass:'yg', age: 40, ico: '/imgs/2.jpg', en_name:'YangGuo', money:300 }
];

APIUsers.cnfs = {
	'get': function (req, res, callbackFun) {
		var id = req.params.id;
		if (id) {
			var u = APIUsers.datas.filter(function (item) {
				return item.id == id;
			}), result = {};
			if (u.length) {
				result.err = 0;
				result.data = u[0];
			} else {
				result.err = 404;
			}
			callbackFun.apply(null, [result]);
		} else { 
			callbackFun.apply(null, [APIUsers.datas]);
		}
	},
	'post': function (req, res, callbackFun) {
		var name = req.body.name, pass = req.body.pass, age = parseInt(req.body.age), ico = req.body.ico, en_name = req.body.en_name, money = parseFloat(req.body.money),
			result = {err:0};
		if (name) {
			if (req.params.id) {
				var user = APIUsers.datas.find(function (item) { 
					return item.id == req.params.id;
				});
				if (user) {
					if (pass) { 
						user.pass = pass;
					}
					if (age) { 
						user.age = age;
					}
					if (ico) { 
						user.ico = ico;
					}
					if (en_name) { 
						user.en_name = en_name;
					}
					if (money) { 
						user.money = money;
					}
				} else { 
					result.err = 404;
				}
			} else { 
				var id = 0, blExist = false;
				APIUsers.datas.forEach(function (item) {
					if (item.id > id) {
						id = item.id;
					}
					if (item.name == name) {
						blExist = true;
					}
				});
				if (blExist) {
					result.err = 101;
				} else {
					var newId = id + 1;
					APIUsers.datas.push({
						id: newId,
						name: name,
						pass: pass || '',
						age: age || 0,
						ico: ico || '',
						en_name: en_name || '',
						money: money || 0
					});
					result.id = newId;
				}
			}
		} else { 
			result.err = 100;
		}
		callbackFun.apply(null, [ result ]);
	},
	'delete': function (req, res, callbackFun) {
		APIUsers.datas = APIUsers.datas.filter(function (item) {
			return item.id != req.params.id;
		});
		callbackFun.apply(null, [{ err: 0 }]);
    }
};

APIUsers.api = function(req, res) {
    var pathname = req._parsedUrl.pathname,
		method = req.method.toLowerCase(), handler = APIUsers.cnfs[method];
	console.log(method);
    if (handler) {
        handler.apply(null, [req, res, function (result) {
                res.send(result);
            }]);
    } else {
        res.send({err:400});
    }
};

module.exports = APIUsers;