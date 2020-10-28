js工具包

npm publish

## vs安装运行插件 code runner npm run build 之后 node ./lib/index
## data尽可能使用return 减少 promise

## findArrayMaxCount ----- 取数组中出现次数最多
## findArrayNumCount ----- 取数组中前出现次数20位
## handleDataSameInArray ----- 插入拼接/删除某个表中某个字段
## handleMongoString ----- 把[{} || '', {} || '']模式数据遍历，筛掉多余，其余放入一个数组中,{}为等量固定。;
## removeDeduplication ----- 吧 [{x,y}, {x,y}]模式数组对象遍历，筛掉相应的key的多余索引元素(arr, ['name', 'userid'])
## handleArrayDifferent ----- 按照keys过滤数组对象相同的部分并且合并--传入要改变数组对象1(老数组)，2.对比数组对象2，3.要检索的数组['x', 'y']值，4.函数
## getSomeIdAssign ----- 合并两个数组，按照传入key-id，初始另一个key-drop的值为0
## priceFormat ----- priceFormat(1000)
## dateFormat -----  dateFormat(new Date(), 'yyyy-MM-dd hh:mm:ss')
## getMergeObject ----- 合并类似webpack包development和production那种结构的对象数组
## getDeepObjKeysValue ----- 取出obj对象下的值.xxxx (obj, 'a.b.c.d')
## flattenDeep ----- 数组扁平化[1,2,3,{}, [4, 5]] => [1, 2, 3, 4, {}, 4, 5]将数组展开，concat
## deepClone ----- 深拷贝


##    // "publishConfig": {
##    //     "registry": "http://nexus.xiaozuge.com/repository/node/"
##    // },













