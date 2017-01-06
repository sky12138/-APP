var express = require('express');
var path = require('path');
var fs = require('fs');
var router = express.Router();

var Upload = function () { };

Upload.upimg = function (req, res) {
    var img = req.file;
    if (img) {
        var tmp_path = img.path,
            extidx = img.originalname.lastIndexOf('.'),
            extension = extidx > 0 ? img.originalname.substr(extidx) : '.jpg',
            name = img.filename + extension,
            d = req.body.d || req.query.d,
            target_path_lst = (d ? d : 'imgs') + '/' + name,
            target_path = path.resolve(__dirname, '../public/upload/' + target_path_lst);
        fs.rename(tmp_path, target_path, function (err) {
            fs.unlink(tmp_path, function (err2) {
            });
            res.send({ status: '0', imgUrl: 'http://' + req.headers.host + '/upload/' + target_path_lst });
        });
    } else {
        res.send({ err: 401 });
    }
};

module.exports = Upload;