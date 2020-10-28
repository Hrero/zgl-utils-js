class ErrorInterMessage {
    constructor() {
        this.max = '输入已达上限5个字';
        this.min = '最少输入5个字';
        this.vaNum = '请输入纯数字';
        this.onPiece = '已存在';
        this.vaRequired = '不能为空';
    }
    getMax(num) {
        return this.max.replace(/\d+/g, num);
    }
    getMin(num) {
        return this.min.replace(/\d+/g, num);
    }
    getVaNum() {
        return this.vaNum;
    }
    getOnPiece(str) {
        return str + this.onPiece;
    }
    getVaRequired(str) {
        return str + this.vaRequired;
    }
}
export default {
    ErrorInterMessage
};
//# sourceMappingURL=inter.js.map