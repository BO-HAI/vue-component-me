/*
 * @Author: your name
 * @Date: 2021-04-28 14:03:43
 * @LastEditTime: 2021-04-29 14:47:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue-component-me/library/use/dateTools.js
 */

;
(function (factory) {
    if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    } else {
        window.hqui = window.hqui || {};
        window.hqui.dateTools = factory();
    }
}(function () {
    let Tools = function () {

    }

    /**
     * @description: 格式化日期
     * @param {*} dateObj
     * @param {*} template
     * @return {*}
     */        
    Tools.prototype.formatDate = function (dateObj, template) {
        var z = {
            y: dateObj.getFullYear(),
            M: dateObj.getMonth() + 1,
            d: dateObj.getDate(),
            h: dateObj.getHours(),
            m: dateObj.getMinutes(),
            s: dateObj.getSeconds()
        };  
        return template.replace(/(y+|M+|d+|h+|m+|s+)/g, function(v) {
            var _n_ = z[v.slice(-1)].toString().slice(-(v.length > 2 ? v.length : 2)); 
            return ((_n_ < 10 ? '0' : '') + _n_); // eval('z.' + v.slice(-1))).slice(-(v.length > 2 ? v.length : 2))
        });  
    }

    /**
     * 为了获得每个月的日期有多少，我们需要判断 平年闰年[四年一闰，百年不闰，四百年再闰]
     * @param  {[type]} year [description]
     * @return {[type]}      [description]
     */
    Tools.prototype.isLeapYear = function (year) {
        return (year % 400 === 0) || (year % 100 !== 0 && year % 4 === 0);
    }
    /**
     * 获得每个月的日期有多少，注意 month - [0-11]
     * @param  {[type]} year  [description]
     * @param  {[type]} month [description] 非自然月 month 0-11
     * @return {[type]}       [description]
     */
    Tools.prototype.getMonthCount = function (year, month) {
        let arr = [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        let count = arr[month] || (this.isLeapYear(year) ? 29 : 28);
        return Array.from(new Array(count), (item, value) => value + 1);
    }
    /**
     * @description: 获得某年某月的 x号 是星期几，这里要注意的是 JS 的 API-getDay() 是从 [日-六](0-6)，返回 number 
     * @param {*} year
     * @param {*} month 自然月(1-12)
     * @param {*} day
     * @return {*}
     */    
    Tools.prototype.getWeekNumber = function (year, month, day) {
        let date = new Date(year, month, day);
        return date.getDay();
    }

    Tools.prototype.getThisMonthCount = function (year, month) {
        return this.getMonthCount(year, month - 1);
    }

    /**
     * @description: 获得上个月的天数 
     * @param {*} year
     * @param {*} month 自然月(1-12)
     * @return {*}
     */    
    Tools.prototype.getPrevMonthCount = function (year, month) {
        if (month === 1) {
            return this.getMonthCount(year - 1, 11);
        } else {
            return this.getMonthCount(year, month - 2); // 传入的月份已经加1, 这里获取上个月应该-2
        }
    }

    /**
     * @description: 获得下个月的天数 
     * @param {*} year
     * @param {*} month 自然月(1-12)
     * @return {*}
     */    
    Tools.prototype.getNextMonthCount = function (year, month) {
        if (month === 12) {
            return this.getMonthCount(year + 1, 0);
        } else {
            return this.getMonthCount(year, month); // 传入的月份已经加1, 这里获取下个月保持不变, 例如今天是8月, 传入的也是8(1开始), 获取下个月其实就是下标8的月份(0开始,即9月)
        }
    }

    /**
     * @description: 获取上个月的年份与月份
     * @param {String} year
     * @param {String} month 自然月
     * @return {Object} 返回上月月份, 同时给出上月所在年份
     */    
    Tools.prototype.getPrevMonth = function (year, month) {
        let thisDate = new Date(year + '-' + month + '-01');
        let timeStamp = thisDate.getTime() - 1000 * 60 * 60 * 24;
        let newDate = new Date(timeStamp);
        return {
            year: newDate.getFullYear(),
            month: newDate.getMonth() + 1 < 10 ? '0' + (newDate.getMonth() + 1) : newDate.getMonth() + 1 
        }
    }

    /**
     * @description: 
     * @param {String} year
     * @param {String} month 自然月
     * @return {Object} 返回上月月份, 同时给出上月所在年份
     */    
    Tools.prototype.getNextMonth = function (year, month) {
        let arr = [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        let count = arr[parseInt(month) - 1] || (this.isLeapYear(year) ? 29 : 28);
        let thisDate = new Date(year + '-' + month + '-' + count);
        let timeStamp = thisDate.getTime() + 1000 * 60 * 60 * 24;
        let newDate = new Date(timeStamp);
        return {
            year: newDate.getFullYear(),
            month: newDate.getMonth() + 1 < 10 ? '0' + (newDate.getMonth() + 1) : newDate.getMonth() + 1 
        }
    }

    return new Tools();
}))

