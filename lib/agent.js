'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * 是否是移动端
 */
var checkIsMobile = function checkIsMobile() {
    var userAgentInfo = navigator.userAgent;
    var Agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod'];
    var flag = false;
    // tslint:disable-next-line:prefer-for-of
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = true;
            break;
        }
    }
    return flag || document.documentElement.clientWidth < 640;
};
exports.default = {
    checkIsMobile: checkIsMobile
};
//# sourceMappingURL=agent.js.map