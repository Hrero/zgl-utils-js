'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var dateFormat = function dateFormat(date, format) {
    var $date = void 0;
    var padLeftZero = function padLeftZero(str) {
        return ('00' + str).substr(str.length);
    };
    if (!date) {
        return '';
    } else if (typeof date === 'string') {
        var resetDate = date.indexOf('T') > -1 ? date : date.replace(/-/g, '/');
        $date = new Date(resetDate);
    } else {
        $date = new Date(date);
    }
    if (isNaN($date.getTime())) {
        return date;
    }
    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, ($date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    var dateKey = {
        'M+': $date.getMonth() + 1,
        'd+': $date.getDate(),
        'h+': $date.getHours(),
        'm+': $date.getMinutes(),
        's+': $date.getSeconds()
    };
    for (var key in dateKey) {
        if (new RegExp('(' + key + ')').test(format)) {
            var str = dateKey[key].toString();
            format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str));
        }
    }
    return format;
};
exports.default = {
    dateFormat: dateFormat
};
//# sourceMappingURL=time.js.map