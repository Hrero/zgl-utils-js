'use strict';

var _data = require('./data');

var _data2 = _interopRequireDefault(_data);

var _simple = require('./simple');

var _simple2 = _interopRequireDefault(_simple);

var _time = require('./time');

var _time2 = _interopRequireDefault(_time);

var _agent = require('./agent');

var _agent2 = _interopRequireDefault(_agent);

var _position = require('./position');

var _position2 = _interopRequireDefault(_position);

var _inter = require('./inter');

var _inter2 = _interopRequireDefault(_inter);

var _expression = require('./expression');

var _expression2 = _interopRequireDefault(_expression);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var assObj = Object.assign({}, _data2.default, _simple2.default, _time2.default, _inter2.default, _agent2.default, _position2.default, _expression2.default);
// console.log(assObj)
module.exports = assObj;
//# sourceMappingURL=index.js.map