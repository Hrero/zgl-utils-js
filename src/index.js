var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const findArrayMaxCount = (arr) => {
    return new Promise(r => {
        let maxCount = 0;
        let maxItem = '';
        const obj = {};
        arr.forEach((item) => {
            obj[item] ? (obj[item].count += 1) : obj[item] = { count: 1 };
            // tslint:disable-next-line:no-unused-expression
            obj[item].count > maxCount && (maxCount = obj[item].count, maxItem = item);
        });
        r(maxItem);
    });
};
const findArrayNumCount = (result, num) => {
    return new Promise(r => {
        const arr = [];
        result.sort();
        for (let i = 0; i < result.length;) {
            let count = 0;
            for (let j = i; j < result.length; j++) {
                if (result[i] === result[j]) {
                    count++;
                }
            }
            arr.push({
                text: result[i],
                count
            });
            i += count;
        }
        arr.sort((x, y) => {
            return y.count - x.count;
        });
        r(arr.slice(0, num));
    });
};
const handleMongoString = (field, data, Schema, from, type) => __awaiter(this, void 0, void 0, function* () {
    // 插入拼接/删除某个表中某个字段
    /**
     * field 字段
     * data 改变的参数
     * Schema 表名
     * from 表查询的id
     * type true插入 false删除
     * 以调用为触发
     */
    return new Promise((r, j) => __awaiter(this, void 0, void 0, function* () {
        if (!field || !data || !Schema || !from) {
            return;
        }
        const schemaData = yield Schema.findOne({
            _id: from
        });
        if ((!schemaData[field] || schemaData[field].indexOf(data) === -1) && type) {
            yield Schema.update({ _id: from }, { [field]: schemaData[field] + ',' + data });
            r({});
        }
        else {
            const reg = new RegExp(data, 'g');
            const fieldData = schemaData[field].replace(reg, '');
            yield Schema.update({ _id: from }, { [field]: fieldData });
            r({});
        }
    }));
});
const handleDataSameInArray = (array) => __awaiter(this, void 0, void 0, function* () {
    return new Promise((r, j) => __awaiter(this, void 0, void 0, function* () {
        const newArray = array.map(item => JSON.stringify(item));
        r(Array.from(new Set(newArray)));
    }));
});
const removeDeduplication = (arr, keys) => {
    return new Promise(r => {
        const setArray = new Set();
        const call = arr.filter(x => {
            const setKey = JSON.stringify(keys.reduce((pre, cur) => Object.assign({}, { [cur]: x[cur] }), {}));
            return !setArray.has(setKey) ? setArray.add(setKey) : false;
        });
        r(call);
    });
};
const handleArrayDifferent = (arr1, arr2, keys, callback) => {
    // 1.传入要改变数组对象1，2.对比数组对象2，3.要检索的数组['x', 'y']值，4.处理函数
    // console.log(JSON.stringify(arr1), JSON.stringify(arr2), '======');
    const cc = arr1.filter((item1) => {
        const bb = arr2.filter((item2) => {
            const aa = keys.reduce((pre, cur) => {
                return item1[cur] === item2[cur] && pre;
            }, true);
            if (aa) {
                return keys.reduce((pre, cur) => Object.assign(pre, { [cur]: item2[cur] }), {});
            }
        });
        if (bb.length === 0) {
            return keys.reduce((pre, cur) => Object.assign(pre, { [cur]: item1[cur] }), {});
        }
    });
    callback(cc);
};
module.exports = {
    findArrayMaxCount, findArrayNumCount,
    handleDataSameInArray, handleMongoString, removeDeduplication, handleArrayDifferent
};
//# sourceMappingURL=index.js.map