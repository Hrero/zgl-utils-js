class ErrorInterMessage {
    private max = '输入已达上限5个字';
    private min = '最少输入5个字';
    private vaNum = '请输入纯数字';
    private onPiece = '已存在';
    private vaRequired = '不能为空';

    public getMax(num): string {
        return this.max.replace(/\d+/g, num);
    }

    public getMin(num): string {
        return this.min.replace(/\d+/g, num);
    }

    public getVaNum(): string {
        return this.vaNum;
    }

    public getOnPiece(str): string {
        return str + this.onPiece;
    }

    public getVaRequired(str): string {
        return str + this.vaRequired;
    }
}

export default {
    ErrorInterMessage
};