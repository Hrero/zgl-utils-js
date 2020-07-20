'use strict';

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
module.exports = {
    findArrayMaxCount: findArrayMaxCount, findArrayNumCount: findArrayNumCount,
    handleDataSameInArray: handleDataSameInArray, handleMongoString: handleMongoString, removeDeduplication: removeDeduplication, handleArrayDifferent: handleArrayDifferent, getSomeIdAssign: getSomeIdAssign
};
//# sourceMappingURL=index.js.map