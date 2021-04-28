<template>
    <div class="hqui component-calendar" :class="'component-calendar-ani' + animationId">
        <div class="calendar-info-block">
            <span class="eui-calendar-year">{{date.now.year}}年</span>
            <span class="eui-calendar-month">{{date.now.month}}月</span>
            <span class="eui-calendar-day">{{date.now.day}}日</span>
        </div>
        <div class="calendar-control-block">
            <button>上个月</button>
            <button>今日</button>
            <button>下个月</button>
        </div>
        <div class="calendar-week" ref="weekBlock">
            <span class="week-item" ref="weekItem" v-for="(weekStr, index) in weekTitles" :key="index">{{weekStr}}</span>
        </div>
        <div class="calendar-days">
            <div class="day-item prev" v-for="(item, index) in date.prevMonthDays" :key="index + '_prev'" :style="item.css">
                <div class="date-info">
                    <i class="date-month-txt">{{date.now.prevMonth}}月</i>
                    <i class="date-day-txt">{{item.number}}日</i>
                </div>
                <div class="day-container">
                </div>
            </div>
            <div class="day-item" v-for="(item, index) in date.thisMonthDays" :key="index + '_this'" :style="item.css">
                <div class="date-info">
                    <i class="date-month-txt">{{date.now.month}}月</i>
                    <i class="date-day-txt">{{item.number}}日</i>
                </div>
                <div class="day-container">
                </div>
            </div>
            <div class="day-item next" v-for="(item, index)  in date.nextMonthDays" :key="index + '_next'" :style="item.css">
                <div class="date-info">
                    <i class="date-month-txt">{{date.now.nextMonth}}月</i>
                    <i class="date-day-txt">{{item.number}}日</i>
                </div>
                <div class="day-container">
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
        }
    },
    data () {
        return{
            changeDatePoint: this.datePoint,
            title: '本周',
            date: {
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
                    weekBlockElementParams: {}
                }
            }
        }
    },
    mounted: function() {

        let that = this;

        that.animation_params[that.animationId].weekBlockElementParams.width = parseInt(that.$refs.weekBlock.offsetWidth / 7); 

        that.run();
    },
    watch: {
        datePoint(newValue) {
            let that = this;
            let _run_ = true;
            (function () {
                that.date.everyday.forEach(function (item) {
                    if (item.dateStr === newValue) {
                        item.isActive = true;
                        _run_ = false;
                    } else {
                        item.isActive = false;
                    }
                });
            }());

            // 只有在不是本周的情况下才会重新渲染
            if (_run_) {
                this.run(newValue);
            } else {
                this.setDateParams(newValue, 'now');
            }
        }, 
        changeDatePoint(newValue) {
            this.$emit('change', newValue.dateStr);
        }
    },
    methods: {
        run () {
            let that = this;
            that.setDateParams();
            that.renderMonth(that.date.now.year, that.date.now.month);
        },
                /**
         * @description: 设置日期参数
         * @param {String} _dateStr_ 'YYYY-MM-DD' OR 时间戳
         * @return {*}
         */        
        setDateParams: function (_dateStr_, _direction_) {
            let that = this;
            let _now_date_ = _dateStr_ ? new Date(_dateStr_) : new Date();
            let _today_ = new Date();

            if (_direction_ === 'prev' || _direction_ === 'next' || _direction_ === 'thisWeek') {
                return;
            }

            that.date.now.timeStamp = _now_date_.getTime();
            that.date.now.dayOfWeek = _now_date_.getDay() === 0 ? 7 : _now_date_.getDay();  //this.nowDayOfWeek === 0 ? 7: this.nowDayOfWeek
            that.date.now.year = _now_date_.getFullYear();
            that.date.now.month = _now_date_.getMonth() + 1 < 10 ? '0' + (_now_date_.getMonth() + 1) : _now_date_.getMonth() + 1;
            that.date.now.day = _now_date_.getDate() < 10 ? '0' + _now_date_.getDate() : _now_date_.getDate();
            that.date.now.dateStr = that.date.now.year + '-' + that.date.now.month + '-' + that.date.now.day;
            that.date.now.prevMonth = _now_date_.getMonth() < 10 ? '0' + _now_date_.getMonth() : _now_date_.getMonth();
            that.date.now.nextMonth = _now_date_.getMonth() + 2 < 10 ? '0' + (_now_date_.getMonth() + 2) : _now_date_.getMonth() + 2;  

            that.date.today.timeStamp = _today_.getTime();
            that.date.today.dayOfWeek = _today_.getDay() === 0 ? 7 : _today_.getDay();  //this.nowDayOfWeek === 0 ? 7: this.nowDayOfWeek
            that.date.today.year = _today_.getFullYear();
            that.date.today.month = _today_.getMonth() + 1 < 10 ? '0' + (_today_.getMonth() + 1) : _today_.getMonth() + 1;
            that.date.today.day = _today_.getDate() < 10 ? '0' + _today_.getDate() : _today_.getDate();
            that.date.today.dateStr = that.date.today.year + '-' + that.date.today.month + '-' + that.date.today.day;
            that.date.today.prevMonth = _today_.getMonth() < 10 ? '0' + _today_.getMonth() : _today_.getMonth();
            that.date.today.nextMonth = _today_.getMonth() + 2 < 10 ? '0' + (_today_.getMonth() + 2) : _today_.getMonth() + 2;  

            that.changeDatePoint = Object.assign({}, that.date.now);
        },
        /**
         * @description: 
         * @param {Number} year  自然年
         * @param {Number} month 自然月
         * @param {Number} day   自然日
         * @return {*}
         */        
        renderMonth (year, month, day) {
            let that = this;
            let prevArr = dateTools.getPrevMonthCount(year, parseInt(month))
            let thisArr = dateTools.getThisMonthCount(year, parseInt(month))
            let nextArr = dateTools.getNextMonthCount(year, parseInt(month))
            let weekdayNumber = dateTools.getWeekNumber(year, parseInt(month) - 1, 1) // 获取本月一号是星期几

            console.log(prevArr);
            console.log(thisArr);
            console.log(nextArr);

            if (weekdayNumber === 0) {
                // that.date.prevMonthDays = prevArr.slice(-1 * weekdayNumber, 0);

                (prevArr.slice(-1 * weekdayNumber, 0)).forEach(function (item) {
                    that.date.prevMonthDays.push({
                        number: item,
                        css: {
                            width: that.animation_params[that.animationId].weekBlockElementParams.width + 'px',
                            height: that.animation_params[that.animationId].weekBlockElementParams.width + 'px'
                        }
                    });
                });

            } else {
                // that.date.prevMonthDays = prevArr.slice(-1 * weekdayNumber);

                (prevArr.slice(-1 * weekdayNumber)).forEach(function (item) {
                    that.date.prevMonthDays.push({
                        number: item,
                        css: {
                            width: that.animation_params[that.animationId].weekBlockElementParams.width + 'px',
                            height: that.animation_params[that.animationId].weekBlockElementParams.width + 'px'
                        }
                    });
                });
            }

            // that.date.nextMonthDays = nextArr.slice(0, (function () {
            //     // 42天, 减去当月天数 减去星期数, 计算出下月补全天数(为什么不是35天? 部分月份会超出35天)
            //     let n = 42 - nextArr.length - weekdayNumber;
            //     return n < 0 ? 0 : n;
            // }()));

            (nextArr.slice(0, (function () {
                // 42天, 减去当月天数 减去星期数, 计算出下月补全天数(为什么不是35天? 部分月份会超出35天)
                let n = 42 - thisArr.length - weekdayNumber;
                return n < 0 ? 0 : n;
            }()))).forEach(function (item) {
                that.date.nextMonthDays.push({
                    number: item,
                    css: {
                        width: that.animation_params[that.animationId].weekBlockElementParams.width + 'px',
                        height: that.animation_params[that.animationId].weekBlockElementParams.width + 'px'
                    }
                });
            });

            // that.date.thisMonthDays = thisArr;
            thisArr.forEach(function (item) {
                that.date.thisMonthDays.push({
                    number: item,
                    css: {
                        width: that.animation_params[that.animationId].weekBlockElementParams.width + 'px',
                        height: that.animation_params[that.animationId].weekBlockElementParams.width + 'px'
                    }
                }); 
            });

            console.log(that.date.nextMonthDays);
        }
    }
}


</script>

<style scoped lang="scss">
@import '../src/style/theme/index';
/*日历-周*/
.hqui.component-calendar {
    width: 100%;
    box-sizing: border-box;
    user-select: none;

    .calendar-week {
        display: flex;
        height: 50px;
        line-height: 50px;
        background: $color-primary;
        color: $color-white;

        .week-item {
            flex: 1;
            text-align: center;
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
