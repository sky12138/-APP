var express = require('express');
var router = express.Router();
var APIGoods = function () { };

APIGoods.datas = [
    { 
    	id: 1, 
    	name: '丰田埃尔法 2011款 埃尔法 3.5 自动 豪华版(进口)', 
    	price: '43.50万', 
    	ico: '/imgs/1.png', 
    	content:'2010年12月上牌,行驶11万公里' 
    },
     { 
    	id: 2, 
    	name: '本田雅阁 2014款 第九代雅阁 2.4 无级 EXN 豪华导航版', 
    	price: '45.50万', 
    	ico: '/imgs/2.png', 
    	content:'2011年12月上牌,行驶21万公里' 
    },
     { 
    	id: 3, 
    	name: '丰田威驰 2014款 威驰 1.5 自动 智尚版', 
    	price: '43.50万', 
    	ico: '/imgs/3.png', 
    	content:'2008年12月上牌,行驶17万公里' 
    },
    { 
    	id: 4, 
    	name: '日产骐达 2014款 骐达 1.6 无级 XE 舒适型', 
    	price: '30.25万', 
    	ico: '/imgs/4.png', 
    	content:'2010年12月上牌,行驶11万公里' 
    },
     { 
    	id: 5, 
    	name: '长城C30 2010款 1.5 手动 豪华版', 
    	price: '60.23万', 
    	ico: '/imgs/5.png', 
    	content:'2001年12月上牌,行驶21万公里' 
    },
     { 
    	id: 6, 
    	name: '丰田卡罗拉 2014款 卡罗拉 1.6 无级 GL', 
    	price: '20.56万', 
    	ico: '/imgs/6.png', 
    	content:'2009年12月上牌,行驶17万公里' 
    },
    { 
    	id: 7, 
    	name: '奔腾X80 2015款 1.8T 自动 豪华型', 
    	price: '43.50万', 
    	ico: '/imgs/7.png', 
    	content:'2010年12月上牌,行驶11万公里' 
    },
     { 
    	id: 8, 
    	name: '思铭 2012款 1.8 自动', 
    	price: '20.69万', 
    	ico: '/imgs/8.png', 
    	content:'2016年10月上牌,行驶1万公里' 
    },
     { 
    	id: 9, 
    	name: '众泰V10 2012款 1.2 手动 标准版', 
    	price: '10.26万', 
    	ico: '/imgs/9.png', 
    	content:'2009年12月上牌,行驶27万公里' 
    },
    { 
    	id: 10, 
    	name: '丰田卡罗拉 2014款 卡罗拉 1.6 无级 GL', 
    	price: '10.25万', 
    	ico: '/imgs/10.png', 
    	content:'2008年12月上牌,行驶11万公里' 
    },
     { 
    	id: 11, 
    	name: '2016款  海马S5 1.5T  CVT创亨版', 
    	price: '30.14万', 
    	ico: '/imgs/11.png', 
    	content:'2010年12月上牌,行驶21万公里' 
    },
     { 
    	id: 12, 
    	name: '起亚K5 2014款 2.0 自动 LUXURY', 
    	price: '20.56万', 
    	ico: '/imgs/12.png', 
    	content:'2009年12月上牌,行驶17万公里' 
    },
    { 
    	id: 13, 
    	name: '丰田埃尔法 2011款 埃尔法 3.5 自动 豪华版(进口)', 
    	price: '43.50万', 
    	ico: '/imgs/13.png', 
    	content:'2010年12月上牌,行驶11万公里' 
    },
     { 
    	id: 14, 
    	name: '本田雅阁 2014款 第九代雅阁 2.4 无级 EXN 豪华导航版', 
    	price: '45.50万', 
    	ico: '/imgs/14.png', 
    	content:'2011年12月上牌,行驶21万公里' 
    },
     { 
    	id: 15, 
    	name: '丰田威驰 2014款 威驰 1.5 自动 智尚版', 
    	price: '43.50万', 
    	ico: '/imgs/15.png', 
    	content:'2008年12月上牌,行驶17万公里' 
    },
    { 
    	id: 16, 
    	name: '日产骐达 2014款 骐达 1.6 无级 XE 舒适型', 
    	price: '30.25万', 
    	ico: '/imgs/16.png', 
    	content:'2010年12月上牌,行驶11万公里' 
    },
     { 
    	id: 17, 
    	name: '长城C30 2010款 1.5 手动 豪华版', 
    	price: '60.23万', 
    	ico: '/imgs/17.png', 
    	content:'2001年12月上牌,行驶21万公里' 
    },
     { 
    	id: 18, 
    	name: '丰田卡罗拉 2014款 卡罗拉 1.6 无级 GL', 
    	price: '20.56万', 
    	ico: '/imgs/18.png', 
    	content:'2009年12月上牌,行驶17万公里' 
    },
    { 
    	id: 19, 
    	name: '奔腾X80 2015款 1.8T 自动 豪华型', 
    	price: '43.50万', 
    	ico: '/imgs/19.png', 
    	content:'2010年12月上牌,行驶11万公里' 
    },
     { 
    	id: 20, 
    	name: '思铭 2012款 1.8 自动', 
    	price: '20.69万', 
    	ico: '/imgs/20.png', 
    	content:'2016年10月上牌,行驶1万公里' 
    },
     { 
    	id: 21, 
    	name: '众泰V10 2012款 1.2 手动 标准版', 
    	price: '10.26万', 
    	ico: '/imgs/21.png', 
    	content:'2009年12月上牌,行驶27万公里' 
    },
    { 
    	id: 22, 
    	name: '丰田卡罗拉 2014款 卡罗拉 1.6 无级 GL', 
    	price: '10.25万', 
    	ico: '/imgs/22.png', 
    	content:'2008年12月上牌,行驶11万公里' 
    },
     { 
    	id: 23, 
    	name: '2016款  海马S5 1.5T  CVT创亨版', 
    	price: '30.14万', 
    	ico: '/imgs/23.png', 
    	content:'2010年12月上牌,行驶21万公里' 
    },
     { 
    	id: 24, 
    	name: '起亚K5 2014款 2.0 自动 LUXURY', 
    	price: '20.56万', 
    	ico: '/imgs/24.png', 
    	content:'2009年12月上牌,行驶17万公里' 
    },
];

APIGoods.cnfs = {
    'get': {
        method: 'get',
        handler: function (req, res, callbackFun) {
            var goods = APIGoods.datas.filter(function (item) {
                return item.id == req.query.id;
            }), result = {};
            if (goods.length) {
                result.err = 0;
                result.data = goods[0];
            } else { 
                result.err = 404;
            }
            callbackFun.apply(null, [result]);
        }
	},
    'gets': {
        method: 'get',
        handler: function (req, res, callbackFun) {
            callbackFun.apply(null, [{err:0, data:APIGoods.datas}]);
        }
    },
    'add': {
        method: 'post',
        handler: function (req, res, callbackFun) {
            var name = req.body.name, price = parseInt(req.body.price), ico = req.body.ico, content = req.body.content,
			    result = { err: 0 };
            if (name && price && ico && content) {
                var id = 0;
                APIGoods.datas.forEach(function (item) {
                    if (item.id > id) {
                        id = item.id;
                    }
                });
                
                var newId = id + 1;
                APIGoods.datas.push({
                    id: newId,
                    name: name,
                    price: price,
                    ico: ico,
                    content:content
                });
                result.id = newId;
            } else {
                result.err = 100;
            }

            callbackFun(result);
        }
    },
	'update': {
		method: 'post',
		handler: function (req, res, callbackFun) {
			var id = parseInt(req.body.id), name=req.body.name, price = parseInt(req.body.price), ico = req.body.ico, content = req.body.content,
				result = {};
			if (id && name && price && ico && content) { 
				var goods = APIGoods.datas.filter(function (item) {
					return item.id == id;
				});
				if (goods.length) {
					result.err = 0;
					goods = goods[0];
					goods.name = name;
					goods.price = price;
					goods.ico = ico;
					goods.content = content;
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
            if(isNaN(pidx)){
                pidx = 0;
            }
            var us = APIGoods.datas.slice(pidx * 6, pidx * 6 + 7);
            var result = { err: 0, data: {lst:us} };
            if (us.length > 6) {
                result.data.over = false;
                result.data.lst = us.slice(0, 6);
            } else { 
                result.data.over = true;
            }
            callbackFun.apply(null, [result]);
        }
	},
	'remove': {
		method: 'post',
		handler: function (req, res, callbackFun) {
			APIGoods.datas = APIGoods.datas.filter(function (item) { 
				return item.id != req.body.id;
			});
			callbackFun.apply(null, [{ err: 0 }]);
		}
	}
};

APIGoods.api = function(req, res) {
    var pathname = req._parsedUrl.pathname, apiname = pathname.substr(pathname.lastIndexOf('/') + 1),
        cnf = APIGoods.cnfs[apiname], method = req.method.toLowerCase();
    if (cnf && (!cnf.method || method == cnf.method)) {
        cnf.handler.apply(null, [req, res, function (result) {
                res.send(result);
            }]);
    } else {
        res.send({err:400});
    }
};

module.exports = APIGoods;