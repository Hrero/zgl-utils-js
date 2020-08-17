'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _tslib = require('tslib');

var tslib_1 = _interopRequireWildcard(_tslib);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * 取数组中出现次数最多
 */
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
/**
 * ['',1,2] 一维数组
 * 取数组中前出现次数n位
 */
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
/**
 * 把[{} || '', {} || '']模式数据遍历，筛掉多余，其余放入一个数组中,{}为等量固定。;
 */
var handleDataSameInArray = function handleDataSameInArray(array) {
    return tslib_1.__awaiter(undefined, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var _this = this;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        return _context2.abrupt('return', new Promise(function (r, j) {
                            return tslib_1.__awaiter(_this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                                var newArray;
                                return regeneratorRuntime.wrap(function _callee$(_context) {
                                    while (1) {
                                        switch (_context.prev = _context.next) {
                                            case 0:
                                                newArray = array.map(function (item) {
                                                    return JSON.stringify(item);
                                                });

                                                r(Array.from(new Set(newArray)));

                                            case 2:
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
/**
 *  吧 [{x,y}, {x,y}]模式数组对象遍历，筛掉相应的key的多余索引元素(arr, ['name', 'userid'])
 */
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
var handleArrayDifferent = function handleArrayDifferent(arr1, arr2, keys) {
    // 1.传入要改变数组对象1(老数组)，2.对比数组对象2，3.要检索的数组['x', 'y']值
    // console.log(JSON.stringify(arr1), JSON.stringify(arr2), '======');
    return new Promise(function (r) {
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
        r(cc);
    });
};
/**
 * 合并两个数组，按照传入key-id，补充key-drop的值为0
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
/**
 * 合并类似webpack包development和production那种结构的对象数组
 */
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
/**
 * 获取深层的key的value
 */
var getDeepObjKeysValue = function getDeepObjKeysValue(target, path) {
    // fields = ['a', 'b', 'c', 'd']
    // obj = {a: {b: {c: { d: 123123, e: '我是eee' } } } }
    var fields = path.split('.');
    // obj = {a: {b: {c: { d: 123123, e: '我是eee' } } } }
    var obj = target;
    // l = 4
    var l = fields.length;
    // 通过循环，逐层深入，这里i最大是2
    for (var i = 0; i < l - 1; i++) {
        var key = fields[i];
        if (!obj[key]) {
            return undefined;
        }
        obj = obj[key];
    }
    // obj = { d: 123123, e: '我是eee' }
    // fields[l - 1] = d
    // 所以 obj[fields[l - 1]] = obj[d] = 123123
    return obj[fields[l - 1]];
};
/**
 * 数组扁平化 [1,2,3,{}, [4, 5]] => [1, 2, 3, 4, {}, 4, 5]将数组展开，concat
 * @param arr
 */
var flattenDeep = function flattenDeep(arr) {
    return arr.reduce(function (acc, val) {
        return Array.isArray(val) ? acc.concat(flattenDeep(val)) : acc.concat(val);
    }, []);
};
exports.default = {
    findArrayMaxCount: findArrayMaxCount, findArrayNumCount: findArrayNumCount,
    handleDataSameInArray: handleDataSameInArray, removeDeduplication: removeDeduplication, handleArrayDifferent: handleArrayDifferent, getSomeIdAssign: getSomeIdAssign,
    getMergeObject: getMergeObject, getDeepObjKeysValue: getDeepObjKeysValue, flattenDeep: flattenDeep
};
//# sourceMappingURL=data.js.map