const dateFormat = (date, format) => {
    let $date;
    const padLeftZero = (str) => {
        return ('00' + str).substr(str.length);
    };
    if (!date) {
        return '';
    }
    else if (typeof date === 'string') {
        const resetDate = date.indexOf('T') > -1 ? date : date.replace(/-/g, '/');
        $date = new Date(resetDate);
    }
    else {
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
export default {
    dateFormat
};
//# sourceMappingURL=time.js.map