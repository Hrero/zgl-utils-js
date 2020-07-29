const findArrayMaxCount = (arr: Array<any>): Promise<any> => { // 取数组中出现次数最多
    return new Promise(r => {
        let maxCount = 0;
        let maxItem = '';
        const obj = {};
        arr.forEach((item) => {
            obj[item] ? (obj[item].count += 1) : obj[item] = {count: 1};
            // tslint:disable-next-line:no-unused-expression
            obj[item].count > maxCount && (maxCount = obj[item].count, maxItem = item);
        });
        r(maxItem);
    })
};

const findArrayNumCount = (result, num): Promise<any> => { // 取数组中前出现次数20位
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
    })
};

const handleMongoString= async (field, data, Schema, from, type): Promise<any> => {
    // 插入拼接/删除某个表中某个字段
    /**
     * field 字段
     * data 改变的参数
     * Schema 表名
     * from 表查询的id
     * type true插入 false删除
     * 以调用为触发
     */
    return new Promise(async (r, j) => {
        if (!field || !data || !Schema || !from) {
            return;
        }
        const schemaData = await Schema.findOne({
            _id: from
        });
        if ((!schemaData[field] || schemaData[field].indexOf(data) === -1) && type) {
            await Schema.update({ _id : from }, { [field]: schemaData[field] + ',' + data });
            r({});
        } else {
            const reg = new RegExp(data, 'g');
            const fieldData = schemaData[field].replace(reg, '');
            await Schema.update({ _id : from }, { [field]: fieldData });
            r({});
        }
    });
};

const handleDataSameInArray = async (array): Promise<any> => { // 把[{} || '', {} || '']模式数据遍历，筛掉多余，其余放入一个数组中,{}为等量固定。;
    return new Promise(async (r, j) => {
        const newArray = array.map(item => JSON.stringify(item)); r(Array.from(new Set(newArray)));
    });
};

const removeDeduplication = (arr: Array<any>, keys: Array<string>)
: any => { // 吧 [{x,y}, {x,y}]模式数组对象遍历，筛掉相应的key的多余索引元素(arr, ['name', 'userid'])
    return new Promise(r => {
        const setArray = new Set();
        const call =  arr.filter(x => {
            const setKey = JSON.stringify(
                keys.reduce((pre, cur) => Object.assign({}, {[cur]: x[cur]}), {})
                );
            return !setArray.has(setKey) ? setArray.add(setKey) : false;
        });
        r(call);
    });
};
/**
 * 1.按照keys过滤数组对象相同的部分并且合并
 */
const handleArrayDifferent = ( arr1: Array<any>, arr2: Array<any>, keys: Array<string>, callback: any) => {
    // 1.传入要改变数组对象1(老数组)，2.对比数组对象2，3.要检索的数组['x', 'y']值，4.处理函数
    // console.log(JSON.stringify(arr1), JSON.stringify(arr2), '======');
    const cc = arr1.filter((item1) => {
        const bb = arr2.filter((item2) => {
            const aa = keys.reduce((pre, cur) => {
                return item1[cur] === item2[cur] && pre;
            }, true);
            if (aa) {
                return keys.reduce((pre, cur) => Object.assign(pre, {[cur]: item2[cur]}), {});
            }
        });
        if (bb.length === 0) {
            return keys.reduce((pre, cur) => Object.assign(pre, {[cur]: item1[cur]}), {});
        }
    });
    callback(cc);
};
/**
 * 合并两个数组，按照传入key-id，初始另一个key-drop的值为0
 */
const getSomeIdAssign = (arr1: Array<any>, arr2: Array<any>, id, drop) => { // 根据传入的id值，合并drop这个key并赋值0
    arr1.forEach((item1, index1) => {
        Object.assign(item1, {
            [drop]: 0
        })
        arr2.forEach((item2, index2) => {
            if (item1[id] === item2[id]) {
                Object.assign(item1, item2)
            }
        })
    })
    return arr1
}

const priceFormat = (s) => { // priceFormat(1000)
    if (/[^0-9\.]/.test(s)) {
        return '0.00';
    }
    s = s.toString().replace(/^(\d*)$/, '$1.');
    s = (s + '00').replace(/(\d*\.\d\d)\d*/, '$1');
    s = s.replace('.', ',');
    const re = /(\d)(\d{3},)/;
    while (re.test(s)) {
        s = s.replace(re, '$1,$2');
    }
    s = s.replace(/,(\d\d)$/, '.$1');
    return s.replace(/^\./, '0.');
}

const dateFormat = (date, format) => { // dateFormat(new Date(), 'yyyy-MM-dd hh:mm:ss')
    let $date: any;
    const padLeftZero = (str) => {
        return ('00' + str).substr(str.length);
    };
    if ( !date ) {
        return '';
    } else if (typeof date === 'string') {
        const resetDate = date.indexOf('T') > -1 ? date : date.replace(/-/g, '/');
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
    const dateKey = {
        'M+': $date.getMonth() + 1,
        'd+': $date.getDate(),
        'h+': $date.getHours(),
        'm+': $date.getMinutes(),
        's+': $date.getSeconds()
    };
    for (const key in dateKey) {
        if (new RegExp(`(${key})`).test(format)) {
            const str = dateKey[key].toString();
            format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str));
        }
    }
    return format;
};

const getMergeObject = (obj1, obj2) => { // 合并类似webpack包development和production那种结构的对象数组
    for (let key in obj1) {
        if ( Array.isArray(obj1[key]) ) {
            obj1[key] =  obj2.hasOwnProperty(key)?[...obj1[key], ...obj2[key]]: [...obj1[key]];
        } else if ( obj1[key] instanceof Object ) {
            const keys = [];
            for ( let value in obj1[key]) {
                if ( Array.isArray(obj1[key][value]) ) {
                    keys.push(key);
                    obj1[key][value] = obj2.hasOwnProperty(key) && obj2[key].hasOwnProperty(value)? [...obj1[key][value], ...obj2[key][value]]: [...obj1[key][value]]
                }
            }
            obj1[key] = Object.assign({}, obj1[key], keys.some(cur => cur === key)? {}: obj2.hasOwnProperty(key)? obj2[key]: {})
        } else if ( typeof obj1[key] === 'number' ||  typeof obj1[key] === 'string') {
            obj1[key] = obj2.hasOwnProperty(key)? obj2[key]: obj1[key]
        }
    }
    for (let key in obj2) {
        if ( !obj1.hasOwnProperty(key) ) {
            obj1[key] = obj2[key]
        }
    }
    return obj1
}

module.exports = {
    findArrayMaxCount, findArrayNumCount,
    handleDataSameInArray, handleMongoString, removeDeduplication, handleArrayDifferent, getSomeIdAssign,
    priceFormat, getMergeObject
};
