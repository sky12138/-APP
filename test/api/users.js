var express = require('express');
var router = express.Router();
var APIUsers = function () { };

APIUsers.datas = [
    { id: 100, name: '张三丰', pass:'zsf', age: 20, ico:'/imgs/0.jpg', en_name:'ZhangSanFeng', money:100 },
    { id: 200, name: '许文强', pass:'xwq', age: 30, ico: '/imgs/1.jpg', en_name:'XueWenQiang', money:200 },
    { id: 300, name: '杨过', pass:'yg', age: 40, ico: '/imgs/2.jpg', en_name:'YangGuo', money:300 }
    //{ id: 1, name: '商品一', price: 100, num: 1, ico: '/imgs/0.jpg' },
    //{ id: 2, name: '商品二', price: 150, num: 2, ico: '/imgs/0.jpg' },
    //{ id: 3, name: '商品三', price: 200, num: 3, ico: '/imgs/0.jpg' }
];

APIUsers.cnfs = {
    'login': {
        method: 'post',
        handler: function (req, res, callbackFun) {
            var u = null, result = {err:0};
            var name = req.body.name, pass = req.body.pass;
            if (name && pass) {
                for (var i = 0; i < APIUsers.datas.length; i++) {
                    var t = APIUsers.datas[i];
                    if (t.name == name) {
                        u = t;
                        break;
                    }
                }
                if (u && u.pass == pass) {
                    res.cookie('user_auth', u.id, { expires: new Date(Date.now() + 43200000), httpOnly: true });
                    result.data = {id:u.id, name:u.name, age:u.age};
                } else { 
                    result.err = 404;
                }
            } else { 
                result.err = 100;
            }
            callbackFun.apply(null, [result]);
        }
    },
    'logout': {
        method: 'post',
        handler: function (req, res, callbackFun) {
            res.cookie('user_auth', null, { expires: new Date(Date.now() - 2000) });
            callbackFun.apply(null, [{err:0}]);
        }
    },
    'check_login_state': {
        method: 'post',
        handler: function (req, res, callbackFun) {
            var authCookie = req.cookies.user_auth;
            var result = {err:0};
            if (authCookie) {
                var u = null;
                for (var i = 0; i < APIUsers.datas.length; i++) {
                    var t = APIUsers.datas[i];
                    if (t.id == authCookie) {
                        u = t;
                        break;
                    }
                }
                if (u) {
                    result.data = { id: u.id, name: u.name, age: u.age };
                } else { 
                    result.err = 410;
                }
            } else { 
                result.err = 410;
            }
            callbackFun.apply(null, [result]);
        }
    },
    'get': {
        method: 'get',
        handler: function (req, res, callbackFun) {
            var u = APIUsers.datas.filter(function (item) {
                return item.id == req.query.id;
            }), result = {};
            if (u.length) {
                result.err = 0;
                result.data = u[0];
            } else { 
                result.err = 404;
            }
            callbackFun.apply(null, [result]);
        }
	},
	'get2': {
		method: 'get',
		handler: function (req, res, callbackFun) {
			var cb = req.query.callback || 'callback';
			var u = APIUsers.datas.filter(function (item) {
				return item.id == req.query.id;
			}), result = {};
			if (u.length) {
				result.err = 0;
				result.data = u[0];
			} else {
				result.err = 404;
			}
			callbackFun.apply(null, [ cb + '(' + JSON.stringify(result) + ')']);
		}
	},
    'gets': {
        method: 'get',
        handler: function (req, res, callbackFun) {
            callbackFun.apply(null, [{err:0, data:APIUsers.datas}]);
        }
    },
    'add': {
        method: 'post',
        handler: function (req, res, callbackFun) {
            var name = req.body.name, pass = req.body.pass, age = parseInt(req.body.age), ico = req.body.ico, en_name = req.body.en_name, money = parseFloat(req.body.money),
			    result = { err: 0 };
            if (name) {
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
            } else {
                result.err = 100;
            }
            
            callbackFun(result);
        }
    },
	'update': {
		method: 'post',
		handler: function (req, res, callbackFun) {
			var id = parseInt(req.body.id), age = parseInt(req.body.age),
				result = {};
			if (id && age) { 
				var u = APIUsers.datas.filter(function (item) {
					return item.id == id;
				});
				if (u.length) {
					result.err = 0;
					u[0].age = age;
				} else {
					result.err = 404;
				}
			} else { 
				result.err = 100;
			}
			callbackFun(result);
		}
	},
    'get_of_page': {
        method: 'get',
        handler: function (req, res, callbackFun) {
            var pidx = 0;
            if (req.query.pidx) { 
                pidx = parseInt(req.query.pidx);
            }
            var us = APIUsers.datas.slice(pidx * 3, pidx * 3 + 4);
            var result = { err: 0, data: {lst:us} };
            if (us.length > 3) {
                result.data.over = false;
                result.data.lst = us.slice(0, 3);
            } else { 
                result.data.over = true;
            }
            callbackFun.apply(null, [result]);
        }
	},
	'remove': {
		method: 'post',
		handler: function (req, res, callbackFun) {
			APIUsers.datas = APIUsers.datas.filter(function (item) { 
				return item.id != req.body.id;
			});
			callbackFun.apply(null, [{ err: 0 }]);
		}
	}
};

APIUsers.api = function(req, res) {
    var pathname = req._parsedUrl.pathname, apiname = pathname.substr(pathname.lastIndexOf('/') + 1),
        cnf = APIUsers.cnfs[apiname], method = req.method.toLowerCase();
    if (cnf && (!cnf.method || method == cnf.method)) {
        cnf.handler.apply(null, [req, res, function (result) {
                res.send(result);
            }]);
    } else {
        res.send({err:400});
    }
};

module.exports = APIUsers;