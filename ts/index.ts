import data from './data';
import simple from './simple';
import time from './time';
import agent from './agent';
import position from './position';
import inter from './inter';
import expression from './expression';
const assObj = Object.assign({},
    data,
    simple,
    time,
    inter,
    agent,
    position,
    expression
    )
// console.log(assObj)
module.exports = assObj
