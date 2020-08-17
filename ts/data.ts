/**
 * 取数组中出现次数最多
 */
const findArrayMaxCount = (arr: Array<any>): Promise<any> => {
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
/**
 * ['',1,2] 一维数组
 * 取数组中前出现次数n位 
 */
const findArrayNumCount = (result, num): Promise<any> => {
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
/**
 * 把[{} || '', {} || '']模式数据遍历，筛掉多余，其余放入一个数组中,{}为等量固定。;
 */
const handleDataSameInArray = async (array): Promise<any> => {
    return new Promise(async (r, j) => {
        const newArray = array.map(item => JSON.stringify(item)); r(Array.from(new Set(newArray)));
    });
};
/**
 *  吧 [{x,y}, {x,y}]模式数组对象遍历，筛掉相应的key的多余索引元素(arr, ['name', 'userid'])
 */
const removeDeduplication = (arr: Array<any>, keys: Array<string>)
: any => {
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
const handleArrayDifferent = ( arr1: Array<any>, arr2: Array<any>, keys: Array<string>) => {
    // 1.传入要改变数组对象1(老数组)，2.对比数组对象2，3.要检索的数组['x', 'y']值
    // console.log(JSON.stringify(arr1), JSON.stringify(arr2), '======');
    return new Promise(r => {
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
        r(cc)
    })
};
/**
 * 合并两个数组，按照传入key-id，补充key-drop的值为0
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
/**
 * 合并类似webpack包development和production那种结构的对象数组
 */
const getMergeObject = (obj1, obj2) => {
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
/**
 * 获取深层的key的value
 */
const getDeepObjKeysValue = (target: any, path: string) => { //  getDeepObjKeysValue(obj, 'a.b.c.e');
    // fields = ['a', 'b', 'c', 'd']
    // obj = {a: {b: {c: { d: 123123, e: '我是eee' } } } }
    const fields = path.split('.')
    // obj = {a: {b: {c: { d: 123123, e: '我是eee' } } } }
    let obj = target
    // l = 4
    const l = fields.length
    // 通过循环，逐层深入，这里i最大是2
    for (let i = 0; i < l - 1; i++) {
        const key = fields[i]
        if (!obj[key]) {
        return undefined
        }
        obj = obj[key]
    }
    // obj = { d: 123123, e: '我是eee' }
    // fields[l - 1] = d
    // 所以 obj[fields[l - 1]] = obj[d] = 123123
    return obj[fields[l - 1]]
}
/**
 * 数组扁平化 [1,2,3,{}, [4, 5]] => [1, 2, 3, 4, {}, 4, 5]将数组展开，concat
 * @param arr 
 */
const flattenDeep = (arr: Array<any>) => {
    return arr.reduce((acc, val) => Array.isArray(val) ? acc.concat(flattenDeep(val)) : acc.concat(val), []);
};

export default {
    findArrayMaxCount, findArrayNumCount,
    handleDataSameInArray, removeDeduplication, handleArrayDifferent, getSomeIdAssign,
    getMergeObject, getDeepObjKeysValue, flattenDeep
};