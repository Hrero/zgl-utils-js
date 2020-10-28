'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ErrorInterMessage = function () {
    function ErrorInterMessage() {
        _classCallCheck(this, ErrorInterMessage);

        this.max = '输入已达上限5个字';
        this.min = '最少输入5个字';
        this.vaNum = '请输入纯数字';
        this.onPiece = '已存在';
        this.vaRequired = '不能为空';
    }

    _createClass(ErrorInterMessage, [{
        key: 'getMax',
        value: function getMax(num) {
            return this.max.replace(/\d+/g, num);
        }
    }, {
        key: 'getMin',
        value: function getMin(num) {
            return this.min.replace(/\d+/g, num);
        }
    }, {
        key: 'getVaNum',
        value: function getVaNum() {
            return this.vaNum;
        }
    }, {
        key: 'getOnPiece',
        value: function getOnPiece(str) {
            return str + this.onPiece;
        }
    }, {
        key: 'getVaRequired',
        value: function getVaRequired(str) {
            return str + this.vaRequired;
        }
    }]);

    return ErrorInterMessage;
}();

exports.default = {
    ErrorInterMessage: ErrorInterMessage
};
//# sourceMappingURL=inter.js.map