'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : new P(function (resolve) {
                resolve(result.value);
            }).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var findArrayMaxCount = function findArrayMaxCount(arr) {
    return new Promise(function (r) {
        var maxCount = 0;
        var maxItem = '';
        var obj = {};
        arr.forEach(function (item) {
            obj[item] ? obj[item].count += 1 : obj[item] = { count: 1 };
            // tslint:disable-next-line:no-unused-expression
            obj[item].count > maxCount && (maxCount = obj[item].count, maxItem = item);
        });
        r(maxItem);
    });
};
var findArrayNumCount = function findArrayNumCount(result, num) {
    return new Promise(function (r) {
        var arr = [];
        result.sort();
        for (var i = 0; i < result.length;) {
            var count = 0;
            for (var j = i; j < result.length; j++) {
                if (result[i] === result[j]) {
                    count++;
                }
            }
            arr.push({
                text: result[i],
                count: count
            });
            i += count;
        }
        arr.sort(function (x, y) {
            return y.count - x.count;
        });
        r(arr.slice(0, num));
    });
};
var handleMongoString = function handleMongoString(field, data, Schema, from, type) {
    return __awaiter(undefined, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var _this = this;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        return _context2.abrupt('return', new Promise(function (r, j) {
                            return __awaiter(_this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                                var schemaData, reg, fieldData;
                                return regeneratorRuntime.wrap(function _callee$(_context) {
                                    while (1) {
                                        switch (_context.prev = _context.next) {
                                            case 0:
                                                if (!(!field || !data || !Schema || !from)) {
                                                    _context.next = 2;
                                                    break;
                                                }

                                                return _context.abrupt('return');

                                            case 2:
                                                _context.next = 4;
                                                return Schema.findOne({
                                                    _id: from
                                                });

                                            case 4:
                                                schemaData = _context.sent;

                                                if (!((!schemaData[field] || schemaData[field].indexOf(data) === -1) && type)) {
                                                    _context.next = 11;
                                                    break;
                                                }

                                                _context.next = 8;
                                                return Schema.update({ _id: from }, _defineProperty({}, field, schemaData[field] + ',' + data));

                                            case 8:
                                                r({});
                                                _context.next = 16;
                                                break;

                                            case 11:
                                                reg = new RegExp(data, 'g');
                                                fieldData = schemaData[field].replace(reg, '');
                                                _context.next = 15;
                                                return Schema.update({ _id: from }, _defineProperty({}, field, fieldData));

                                            case 15:
                                                r({});

                                            case 16:
                                            case 'end':
                                                return _context.stop();
                                        }
                                    }
                                }, _callee, this);
                            }));
                        }));

                    case 1:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, this);
    }));
};
var handleDataSameInArray = function handleDataSameInArray(array) {
    return __awaiter(undefined, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        var _this2 = this;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        return _context4.abrupt('return', new Promise(function (r, j) {
                            return __awaiter(_this2, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
                                var newArray;
                                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                                    while (1) {
                                        switch (_context3.prev = _context3.next) {
                                            case 0:
                                                newArray = array.map(function (item) {
                                                    return JSON.stringify(item);
                                                });

                                                r(Array.from(new Set(newArray)));

                                            case 2:
                                            case 'end':
                                                return _context3.stop();
                                        }
                                    }
                                }, _callee3, this);
                            }));
                        }));

                    case 1:
                    case 'end':
                        return _context4.stop();
                }
            }
        }, _callee4, this);
    }));
};
var removeDeduplication = function removeDeduplication(arr, keys) {
    return new Promise(function (r) {
        var setArray = new Set();
        var call = arr.filter(function (x) {
            var setKey = JSON.stringify(keys.reduce(function (pre, cur) {
                return Object.assign({}, _defineProperty({}, cur, x[cur]));
            }, {}));
            return !setArray.has(setKey) ? setArray.add(setKey) : false;
        });
        r(call);
    });
};
/**
 * 1.按照keys过滤数组对象相同的部分并且合并
 */
var handleArrayDifferent = function handleArrayDifferent(arr1, arr2, keys, callback) {
    // 1.传入要改变数组对象1(老数组)，2.对比数组对象2，3.要检索的数组['x', 'y']值，4.处理函数
    // console.log(JSON.stringify(arr1), JSON.stringify(arr2), '======');
    var cc = arr1.filter(function (item1) {
        var bb = arr2.filter(function (item2) {
            var aa = keys.reduce(function (pre, cur) {
                return item1[cur] === item2[cur] && pre;
            }, true);
            if (aa) {
                return keys.reduce(function (pre, cur) {
                    return Object.assign(pre, _defineProperty({}, cur, item2[cur]));
                }, {});
            }
        });
        if (bb.length === 0) {
            return keys.reduce(function (pre, cur) {
                return Object.assign(pre, _defineProperty({}, cur, item1[cur]));
            }, {});
        }
    });
    callback(cc);
};
/**
 * 合并两个数组，按照传入key-id，初始另一个key-drop的值为0
 */
var getSomeIdAssign = function getSomeIdAssign(arr1, arr2, id, drop) {
    arr1.forEach(function (item1, index1) {
        Object.assign(item1, _defineProperty({}, drop, 0));
        arr2.forEach(function (item2, index2) {
            if (item1[id] === item2[id]) {
                Object.assign(item1, item2);
            }
        });
    });
    return arr1;
};
var priceFormat = function priceFormat(s) {
    if (/[^0-9\.]/.test(s)) {
        return '0.00';
    }
    s = s.toString().replace(/^(\d*)$/, '$1.');
    s = (s + '00').replace(/(\d*\.\d\d)\d*/, '$1');
    s = s.replace('.', ',');
    var re = /(\d)(\d{3},)/;
    while (re.test(s)) {
        s = s.replace(re, '$1,$2');
    }
    s = s.replace(/,(\d\d)$/, '.$1');
    return s.replace(/^\./, '0.');
};
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
var getMergeObject = function getMergeObject(obj1, obj2) {
    var _loop = function _loop(key) {
        if (Array.isArray(obj1[key])) {
            obj1[key] = obj2.hasOwnProperty(key) ? [].concat(_toConsumableArray(obj1[key]), _toConsumableArray(obj2[key])) : [].concat(_toConsumableArray(obj1[key]));
        } else if (obj1[key] instanceof Object) {
            var keys = [];
            for (var value in obj1[key]) {
                if (Array.isArray(obj1[key][value])) {
                    keys.push(key);
                    obj1[key][value] = obj2.hasOwnProperty(key) && obj2[key].hasOwnProperty(value) ? [].concat(_toConsumableArray(obj1[key][value]), _toConsumableArray(obj2[key][value])) : [].concat(_toConsumableArray(obj1[key][value]));
                }
            }
            obj1[key] = Object.assign({}, obj1[key], keys.some(function (cur) {
                return cur === key;
            }) ? {} : obj2.hasOwnProperty(key) ? obj2[key] : {});
        } else if (typeof obj1[key] === 'number' || typeof obj1[key] === 'string') {
            obj1[key] = obj2.hasOwnProperty(key) ? obj2[key] : obj1[key];
        }
    };

    for (var key in obj1) {
        _loop(key);
    }
    for (var key in obj2) {
        if (!obj1.hasOwnProperty(key)) {
            obj1[key] = obj2[key];
        }
    }
    return obj1;
};
module.exports = {
    findArrayMaxCount: findArrayMaxCount, findArrayNumCount: findArrayNumCount,
    handleDataSameInArray: handleDataSameInArray, handleMongoString: handleMongoString, removeDeduplication: removeDeduplication, handleArrayDifferent: handleArrayDifferent, getSomeIdAssign: getSomeIdAssign,
    priceFormat: priceFormat, getMergeObject: getMergeObject
};
//# sourceMappingURL=index.js.map