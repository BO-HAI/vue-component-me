<template>
    <div class="hqui component-calendar" :class="'component-calendar-ani' + animationId" :style="{width: componentWidth}">
        <div class="calendar-info-block">
            <span class="eui-calendar-year">{{date.now.year}}<span class="unit">{{yearUnit}}</span></span>
            <span class="eui-calendar-month">{{date.now.month}}<span class="unit">{{monthUnit}}</span></span>
            <!-- <span class="eui-calendar-day">{{date.now.day}}日</span> -->
        </div>
        <div class="calendar-control-block">
            <button @click="prveYear">&lt;</button>
            <button @click="prveMonth">上个月</button>
            <button @click="comeback">今日</button>
            <button @click="nextMonth">下个月</button>
            <button @click="nextYear">&gt;</button>
        </div>
        <div class="calendar-week clearfix" ref="weekBlock" :style="{width: componentWidth}">
            <span class="week-item" :style="{width: animation_params[animationId].weekBlockElementParams.width + 'px'}" ref="weekItem" v-for="(weekStr, index) in weekTitles" :key="index">{{weekStr}}</span>
        </div>
        <div class="calendar-days">
            <div class="day-item prev" v-for="(item, index) in date.prevMonthDays" :key="index + '_prev'" :style="item.css">
                <div class="date-info">
                    <i class="date-month-txt" v-if="unitShowMonth">{{date.now.prevMonth}}月</i>
                    <i class="date-day-txt">{{item.day}}{{dayUnit}}</i>
                </div>
                <div class="day-container" v-if="data[item.year] && data[item.year][item.month] && data[item.year][item.month][item.day]" v-html="data[item.year][item.month][item.day]">
                </div>
            </div>
            <div class="day-item" :class="{active: item.isActive}" v-for="(item, index) in date.thisMonthDays" :key="index + '_this'" :style="item.css" @click="onChange(item)">
                <div class="date-info">
                    <i class="date-month-txt" v-if="unitShowMonth">{{date.now.month}}月</i>
                    <i class="date-day-txt">{{item.day}}{{dayUnit}}</i>
                </div>
                <div class="day-container" v-if="data[item.year] && data[item.year][item.month] && data[item.year][item.month][item.day]" v-html="data[item.year][item.month][item.day]">
                </div>
            </div>
            <div class="day-item next" v-for="(item, index)  in date.nextMonthDays" :key="index + '_next'" :style="item.css">
                <div class="date-info">
                    <i class="date-month-txt" v-if="unitShowMonth">{{date.now.nextMonth}}月</i>
                    <i class="date-day-txt">{{item.day}}{{dayUnit}}</i>
                </div>
                <div class="day-container" v-if="data[item.year] && data[item.year][item.month] && data[item.year][item.month][item.day]" v-html="data[item.year][item.month][item.day]">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import dateTools from './use/dateTools'
export default {
    name: 'component-week',
    model: {
        prop: 'datePoint',
        event: 'change'
    },
    props: {
        // 日期节点 ‘YYYY-MM-DD’ or 时间戳
        datePoint: {
            type: String,
            default: ''
        },
        // 表头
        weekTitles: {
            type: Array,
            default: function () {
                return ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
            }
        },
        data: {
            type: Object,
            default: function () {
                let _todayObj_ = new Date();
                let _obj_ = {};
                let _year_ = _todayObj_.getFullYear();
                let _month_ = _todayObj_.getMonth() + 1;
                let _day_ = _todayObj_.getDate();

                _month_ = _month_ < 10 ? '0' + _month_ :_month_;
                _day_ = _day_ < 10 ? '0' + _day_ : _day_;

                _obj_[_year_] = {};
                _obj_[_year_][_month_] = {};
                _obj_[_year_][_month_][_day_] = '<i>今日</i>'; 
                return _obj_;
            }
        },
        animationId: {
            type: Number,
            default: 1
        },
        unitShowMonth: {
            trye: Boolean,
            default: false
        },
        dayUnit: {
            type: String,
            default: '日'
        },
        monthUnit: {
            type: String,
            default: '月'
        },
        yearUnit: {
            type: String,
            default: '年'
        },
        width: {
            type: String,
            default: ''
        }
    },
    data () {
        return{
            changeDatePoint: this.datePoint,
            componentWidth: '',
            title: '本周',
            date: {
                // 当前选中的日期
                select: {
                    // 时间戳
                    timeStamp: 0,
                    // 本周第几天
                    dayOfWeek: 0,
                    // 年
                    year: 0,
                    // 月
                    month: 0,
                    // 日
                    day: 0,
                    // 日期字符串
                    dateStr: this.time
                },
                // 日历渲染参照此对象, 渲染的具体年月来自这个对象
                now: {
                    // 时间戳
                    timeStamp: 0,
                    // 本周第几天
                    dayOfWeek: 0,
                    // 年
                    year: 0,
                    // 月
                    month: 0,
                    // 日
                    day: 0,
                    // 日期字符串
                    dateStr: this.time
                },
                // 今日(暂未参与逻辑)
                today: {
                    // 时间戳
                    timeStamp: 0,
                    // 本周第几天
                    dayOfWeek: 0,
                    // 年
                    year: 0,
                    // 月
                    month: 0,
                    // 日
                    day: 0,
                    // 日期字符串
                    dateStr: this.time
                },
                prevMonthDays: [],
                thisMonthDays: [],
                nextMonthDays: []
            },
            animation_params: {
                '1': {
                    weekBlockElementParams: {},
                    titleWidth: ''
                }
            }
        }
    },
    mounted: function() {

        let that = this;

        that.animation_params[that.animationId].weekBlockElementParams.width = parseInt(that.$refs.weekBlock.offsetWidth / 7);
        
        if (that.width.length === 0) {
            that.componentWidth = that.animation_params[that.animationId].weekBlockElementParams.width * 7 + 'px'; 
        }

        that.run();
    },
    computed: {
       
    },
    watch: {
        datePoint(newValue) {
            let that = this;
            let date = new Date(newValue);
            that.run(date.getTime());
        }, 
        changeDatePoint(newValue) {
            console.log(newValue);
            this.$emit('change', newValue.dateStr);
        }
    },
    methods: {
        run (_dateStr_, _type_="all") {
            let that = this;
            that.setDateParams(_dateStr_, _type_);
            that.renderMonth();
        },     
        /**
        * @description: 设置日期参数
         * @param {String} _dateStr_ 'YYYY-MM-DD' OR 时间戳
         * @param {String} type       "all": 更新全部日期; “now”:更新当前选择年份与月份, 日历渲染参照这个日期; “select”: 更新选择当前日期, 负责记录当前选中的日期
         * @return {*}
         */        
        setDateParams: function (_dateStr_, type="all") {
            let that = this;
            let _now_date_ = _dateStr_ ? new Date(_dateStr_) : new Date();
            let _today_ = new Date();


            // 当前选择的日期
            if (type === 'select' || type === 'all') {
                that.date.select.timeStamp = _now_date_.getTime();
                that.date.select.dayOfWeek = _now_date_.getDay() === 0 ? 7 : _now_date_.getDay();  //this.nowDayOfWeek === 0 ? 7: this.nowDayOfWeek
                that.date.select.year = _now_date_.getFullYear();
                that.date.select.month = _now_date_.getMonth() + 1 < 10 ? '0' + (_now_date_.getMonth() + 1) : _now_date_.getMonth() + 1;
                that.date.select.day = _now_date_.getDate() < 10 ? '0' + _now_date_.getDate() : _now_date_.getDate();
                that.date.select.dateStr = that.date.select.year + '-' + that.date.select.month + '-' + that.date.select.day;
                that.date.select.prevMonth = _now_date_.getMonth() < 10 ? '0' + _now_date_.getMonth() : _now_date_.getMonth();
                that.date.select.nextMonth = _now_date_.getMonth() + 2 < 10 ? '0' + (_now_date_.getMonth() + 2) : _now_date_.getMonth() + 2;  

                that.changeDatePoint = Object.assign({}, that.date.select);
            }

            // 用于保存切换的年份月份(其他信息,仅辅助作用)
            if (type === 'now' || type === 'all') {
                that.date.now.timeStamp = _now_date_.getTime();
                that.date.now.dayOfWeek = _now_date_.getDay() === 0 ? 7 : _now_date_.getDay();  //this.nowDayOfWeek === 0 ? 7: this.nowDayOfWeek
                that.date.now.year = _now_date_.getFullYear();
                that.date.now.month = _now_date_.getMonth() + 1 < 10 ? '0' + (_now_date_.getMonth() + 1) : _now_date_.getMonth() + 1;
                that.date.now.day = _now_date_.getDate() < 10 ? '0' + _now_date_.getDate() : _now_date_.getDate();
                that.date.now.dateStr = that.date.now.year + '-' + that.date.now.month + '-' + that.date.now.day;
                that.date.now.prevMonth = _now_date_.getMonth() < 10 ? '0' + _now_date_.getMonth() : _now_date_.getMonth();
                that.date.now.nextMonth = _now_date_.getMonth() + 2 < 10 ? '0' + (_now_date_.getMonth() + 2) : _now_date_.getMonth() + 2;  
            }

            that.date.today.timeStamp = _today_.getTime();
            that.date.today.dayOfWeek = _today_.getDay() === 0 ? 7 : _today_.getDay();  //this.nowDayOfWeek === 0 ? 7: this.nowDayOfWeek
            that.date.today.year = _today_.getFullYear();
            that.date.today.month = _today_.getMonth() + 1 < 10 ? '0' + (_today_.getMonth() + 1) : _today_.getMonth() + 1;
            that.date.today.day = _today_.getDate() < 10 ? '0' + _today_.getDate() : _today_.getDate();
            that.date.today.dateStr = that.date.today.year + '-' + that.date.today.month + '-' + that.date.today.day;
            that.date.today.prevMonth = _today_.getMonth() < 10 ? '0' + _today_.getMonth() : _today_.getMonth();
            that.date.today.nextMonth = _today_.getMonth() + 2 < 10 ? '0' + (_today_.getMonth() + 2) : _today_.getMonth() + 2;  
        },
        /**
         * @description: 更新月历 
         * @param {Number} year  自然年
         * @param {Number} month 自然月
         * @param {Number} day   自然日
         * @return {*}
         */        
        renderMonth (_year_, _month_, _day_) {
            let that = this;
            let year = _year_ ? _year_ : that.date.now.year;
            let month = _month_ ? _month_ : that.date.now.month;
            let day = _day_ ? _day_ : that.date.now.day;
            let prevArr = dateTools.getPrevMonthCount(year, parseInt(month))
            let thisArr = dateTools.getThisMonthCount(year, parseInt(month))
            let nextArr = dateTools.getNextMonthCount(year, parseInt(month))
            let weekdayNumber = dateTools.getWeekNumber(year, parseInt(month) - 1, 1) // 获取本月一号是星期几
            let _isActive_ = false;

            that.date.prevMonthDays = [];
            that.date.nextMonthDays = [];
            that.date.thisMonthDays = [];

            if (weekdayNumber === 0) {
                (prevArr.slice(-1 * weekdayNumber, 0)).forEach(function (item) {
                    let prevYearAndMonth = dateTools.getPrevMonth(year, month);
                    that.date.prevMonthDays.push({
                        day: item < 10 ? '0' + item : item,
                        year: prevYearAndMonth.year,
                        month: prevYearAndMonth.month,
                        css: {
                            width: that.animation_params[that.animationId].weekBlockElementParams.width + 'px',
                            height: that.animation_params[that.animationId].weekBlockElementParams.width + 'px'
                        }
                    });
                });

            } else {
                (prevArr.slice(-1 * weekdayNumber)).forEach(function (item) {
                    let prevYearAndMonth = dateTools.getPrevMonth(year, month);
                    that.date.prevMonthDays.push({
                        day: item < 10 ? '0' + item : item,
                        year: prevYearAndMonth.year,
                        month: prevYearAndMonth.month,
                        css: {
                            width: that.animation_params[that.animationId].weekBlockElementParams.width + 'px',
                            height: that.animation_params[that.animationId].weekBlockElementParams.width + 'px'
                        }
                    });
                });
            }

            (nextArr.slice(0, (function () {
                // 42天, 减去当月天数 减去星期数, 计算出下月补全天数(为什么不是35天? 部分月份会超出35天)
                let n = 42 - thisArr.length - weekdayNumber;
                return n < 0 ? 0 : n;
            }()))).forEach(function (item) {
                let nextYearAndMonth = dateTools.getNextMonth(year, month);
                that.date.nextMonthDays.push({
                    day: item < 10 ? '0' + item : item,
                    year: nextYearAndMonth.year,
                    month: nextYearAndMonth.month,
                    css: {
                        width: that.animation_params[that.animationId].weekBlockElementParams.width + 'px',
                        height: that.animation_params[that.animationId].weekBlockElementParams.width + 'px'
                    }
                });
            });

            thisArr.forEach(function (item) {
                let day = item < 10 ? '0' + item : item;
                (function (_day_) {
                    
                    // 是否被选中日期
                    if (that.date.select.year.toString() === year.toString() && that.date.select.month.toString() === month.toString() && that.date.select.day.toString() === _day_.toString()) {
                        _isActive_ = true;
                    } else {
                        _isActive_ = false;
                    }

                    that.date.thisMonthDays.push({
                        day: item < 10 ? '0' + item : item,
                        year: year,
                        month: month,
                        isActive: _isActive_,
                        css: {
                            width: that.animation_params[that.animationId].weekBlockElementParams.width + 'px',
                            height: that.animation_params[that.animationId].weekBlockElementParams.width + 'px'
                        }
                    }); 
                }(day))
            });
        },
        /**
         * @description: 选择日期
         * @param {*} dayObj
         * @return {*}
         */        
        onChange (dayObj) {
            let that = this;
            that.run(dayObj.year + '-' + dayObj.month + '-' + dayObj.day, 'select');
        },
        /**
         * @description: 上个月
         * @param {*}
         * @return {*}
         */        
        prveMonth () {
            let that = this;
            let nowDate = new Date(that.date.now.dateStr);
            // 获取上个月的年与月份
            let prevYearAndMonth = dateTools.getPrevMonth(that.date.now.year, that.date.now.month);
            that.run(prevYearAndMonth.year + '-' + prevYearAndMonth.month + '-' + '01', 'now');
        },
        /**
         * @description: 下个月
         * @param {*}
         * @return {*}
         */        
        nextMonth () {
            let that = this;
            let nowDate = new Date(that.date.now.dateStr);
            // 获取下个月的年与月份
            let nextYearAndMonth = dateTools.getNextMonth(that.date.now.year, that.date.now.month);
            that.run(nextYearAndMonth.year + '-' + nextYearAndMonth.month + '-' + '01', 'now');
        },

        /**
         * @description: 上一年
         * @param {*}
         * @return {*}
         */        
        prveYear () {
            let that = this;
            that.run((parseInt(that.date.now.year) - 1)+ '-' + that.date.now.month + '-' + '01', 'now');
        },

        /**
         * @description: 下一年
         * @param {*}
         * @return {*}
         */        
        nextYear () {
            let that = this;
            that.run((parseInt(that.date.now.year) + 1)+ '-' + that.date.now.month + '-' + '01', 'now');
        },

        /**
         * @description: 回到今日
         * @param {*}
         * @return {*}
         */        
        comeback () {
            let that = this;
            let nowDate = new Date();
        
            that.run(nowDate.getTime(), 'all');
        }
    }
}


</script>

<style scoped lang="scss">
@import '../src/style/theme/index';
@import '../src/style/component';
/*日历-周*/
.hqui.component-calendar {
    width: 100%;
    box-sizing: border-box;
    user-select: none;

    .calendar-info-block {
        float: left;
        height: 50px;
        line-height: 50px;
        font-size: 24px;
        font-weight: bold;

        .eui-calendar-year,
        .eui-calendar-month {
            float: left;
            font-size: 30px;
            margin-right: 5px;
            height: 50px;

            .unit {
                font-size: 16px;
            }
        }
    }

    .calendar-control-block {
        float: right;
        height: 50px;
        line-height: 50px;

        button {
            border: 0;
            background: $color-primary;
            color: $color-white;
            height: 30px;
            font-size: 12px;
            line-height: 30px;
            cursor: pointer;
        }
    }

    .calendar-week {
        // display: flex;
        height: 50px;
        line-height: 50px;
        background: $color-primary;
        color: $color-white;
        clear: both;

        .week-item {
            font-size: 12px;
            // flex: 1;
            text-align: center;
            float: left;
        }
    }

    .calendar-days {
        .day-item {
            float: left;
            text-align: center;
            border: 1px solid #dddddd;
            border-right: 0;
            border-bottom: 0;
            box-sizing: border-box;
            cursor: pointer;
            position: relative;

            .date-info {
                margin-top: 10px;
                .date-month-txt {
                    font-style: normal;
                    font-size: 14px;
                    font-weight: normal;
                }

                .date-day-txt {
                    font-size: 16px;
                    font-weight: bold;
                    font-style: normal;
                }
            }
        }

        .day-item.active {
            background: $color-assist;
            color: $color-white
        }

        .day-item:nth-child(7n) {
            border-right: 1px solid #dddddd;
        }

        .day-item:nth-child(n + 35) {
            border-bottom: 1px solid #dddddd;
        }

        .day-item.prev, .day-item.next {
            background: #f6f6f6;
            color: #c7c7c7;
            cursor: not-allowed;
        }
    }
}
</style>
