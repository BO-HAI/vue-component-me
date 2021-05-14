<template>
<div class="hqui component-week" :class="'component-week-ani' + animationId">
    <div class="week-days">
        <transition-group v-if="animationId === 1" name="week-day-list" tag="div" :class="'week-days--thisweek'" ref="weekDayList">
            <div class="week-day" :style="item.css" :class="{active:item.isActive}" @click="onChange(item, key)" v-for="(item, key) in date.everyday" :key="item.name">
                <div class="week-day-name">
                    {{item.name}}
                </div>
                <div class="week-day-data">{{item.day}}</div>
                <div class="week-day-container" v-if="data[item.year] && data[item.year][item.month] && data[item.year][item.month][item.day]" v-html="data[item.year][item.month][item.day]">
                    
                </div>
            </div>
        </transition-group>
        <transition-group v-if="animationId === 2" name="week-day-list" tag="div" :class="'week-days--thisweek'" ref="weekDayList">
            <div class="week-day" :style="item.css" :class="[item.cssName]" @click="onChange(item, key)" v-for="(item, key) in date.everyday" :key="item.name">
                <div class="front" v-if="date.everydayOld.length > 0" :class="{active:date.everydayOld[key].isActive}">
                    <div class="week-day-name">
                        {{date.everydayOld[key].name}}
                    </div>
                    <div class="week-day-data">{{date.everydayOld[key].day}}</div>
                    <div class="week-day-container" v-if="data[date.everydayOld[key].year] && data[date.everydayOld[key].year][date.everydayOld[key].month] && data[date.everydayOld[key].year][date.everydayOld[key].month][date.everydayOld[key].day]" v-html="data[date.everydayOld[key].year][date.everydayOld[key].month][date.everydayOld[key].day]">
                        
                    </div>
                </div>
                <div class="back" :class="{active:item.isActive}">
                    <div class="week-day-name">
                        {{item.name}}
                    </div>
                    <div class="week-day-data">{{item.day}}</div>
                    <div class="week-day-container" v-if="data[item.year] && data[item.year][item.month] && data[item.year][item.month][item.day]" v-html="data[item.year][item.month][item.day]">
                        
                    </div>
                </div>
            </div>
        </transition-group>
    </div>
    <div class="week-control">
        <div class="week-ctl-year">{{date.now.year}}年{{date.now.month}}月{{date.now.day}}日</div>
        <div class="week-ctl-btns">
            <span class="week-ctl-lbtn" @click="prev"></span>
            <span class="week-ctl-nowbtn" @click="comeback">{{title}}</span>
            <span class="week-ctl-rbtn" @click="next"></span>
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
                return ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
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
                everyday: [],
                prveEveryday: [],
                nextEveryday: [],
                everydayOld: []
            },
            animation_params: {
                '1': {
                    weekDayListElementParams: {},
                    weekDayElementParams: {
                        css: {
                        }
                    },
                },
                '2': {
                    weekDayListElementParams: {},
                    weekDayElementParams: {
                        css: {
                        }
                    },
                }
            }
        }
    },
    mounted: function() {

        let that = this;
        that.animation_params[that.animationId].weekDayListElementParams = {
            width: parseInt(that.$refs.weekDayList.$el.offsetWidth),
            height: parseInt(that.$refs.weekDayList.$el.offsetHeight)
        }

        that.animation_params[that.animationId].weekDayElementParams = {
            width: Math.floor(that.animation_params[that.animationId].weekDayListElementParams.width / 7),
            height: that.animation_params[that.animationId].weekDayListElementParams.height
        }

        that.run(that.datePoint);
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
        /**
         * @description: 获取指定位置的css
         * @param {*} type "init":初始位置 "enter":进入位置 "leave":退出位置
         * @param {*} i
         * @return {*}
         */        
        getCss: function (type='init', i) {
            let that = this;
            let css = {};
            switch (that.animationId) {
                case 1:
                    if (type === 'init') {
                        css = {
                            width: Math.floor(that.animation_params[that.animationId].weekDayListElementParams.width / 7) + 'px',
                            height: that.animation_params[1].weekDayListElementParams.height + 'px',
                            position: 'absolute',
                            top: 0,
                            left: '50%',
                            opacity: 0
                        } 
                    } else if (type === 'enter') {
                        css = {
                            width: Math.floor(that.animation_params[that.animationId].weekDayListElementParams.width / 7) + 'px',
                            height: that.animation_params[1].weekDayListElementParams.height + 'px',
                            position: 'absolute',
                            top: 0,
                            left: i * Math.floor(that.animation_params[that.animationId].weekDayListElementParams.width / 7) + 'px',
                            opacity: 1
                        }
                    } else if (type === 'leave') {
                       css = {
                            width: Math.floor(that.animation_params[that.animationId].weekDayListElementParams.width / 7) + 'px',
                            height: that.animation_params[1].weekDayListElementParams.height + 'px',
                            position: 'absolute',
                            top: 0,
                            left: i * Math.floor(that.animation_params[that.animationId].weekDayListElementParams.width / 7) + 'px',
                            opacity: 1
                        } 
                    }
                break;
                case 2:
                    if (type === 'init') {
                        css = {
                            width: Math.floor(that.animation_params[that.animationId].weekDayListElementParams.width / 7) + 'px',
                        } 
                    } else if (type === 'enter') {
                        css = {
                            width: Math.floor(that.animation_params[that.animationId].weekDayListElementParams.width / 7) + 'px',
                        }
                    } else if (type === 'leave') {
                       css = {
                            width: Math.floor(that.animation_params[that.animationId].weekDayListElementParams.width / 7) + 'px',
                        } 
                    }
                break;
            }
            
            return css;
        },
        /**
         * @description: 获取相应的css名称
         * @param {*} type "init":初始位置 "enter":进入位置 "leave":退出位置
         * @param {*} i
         * @return {*}
         */        
        getCssName: function (type='init', i) {
            let that = this;
            let css = {};
            switch (that.animationId) {
                case 1:
                    if (type === 'init') {
                        return i;
                    } else if (type === 'enter') {
                        return i;
                    } else if (type === 'leave') {
                        return i;
                    }
                break;
                case 2:
                    if (type === 'init') {
                        return 'a';
                    } else if (type === 'enter') {
                        return 'b';
                    } else if (type === 'leave') {
                        return 'a';
                    }
                break;
            }
            
            return css;
        },
        /**
         * @description: 动画1 进入
         * @param {*}
         * @return {*}
         */        
        animation_1_enter: function () {
            let that = this;

            let timer = setTimeout(function () {
                that.date.everyday.forEach((item, i) => {
                    item.css = that.getCss('enter', i);
                });

                clearTimeout(timer);

            }, 500);
        },
        /**
         * @description: 动画1 移除
         * @param {*}
         * @return {*}
         */        
        animation_1_leave: function () {
            let promise = new Promise(function (resolve) {
                resolve({status: {code: 0}}); 
            });

            return promise;
        }, 
        /**
         * @description: 
         * @param {*} direction . direction  "now" "prev" "next" 
         * @return {*}
         */        
        animation_2_enter: function (direction) {
            let that = this;

            if (direction === 'prev') {
                let x = 0
                let l = that.date.everyday.length - 1; 
                let timer = setInterval(function () {
                    if (x === that.date.everyday.length) {
                        clearInterval(timer);
                        return;
                    }
                    that.date.everyday[l - x].css = that.getCss('enter', x);
                    that.date.everyday[l - x].cssName = that.getCssName('enter', x);
                    x++;
                }, 100); 
            } else {
                let x = 0
                let timer = setInterval(function () {
                    if (x === that.date.everyday.length) {
                        clearInterval(timer);
                        return;
                    }
                    that.date.everyday[x].css = that.getCss('enter', x);
                    that.date.everyday[x].cssName = that.getCssName('enter', x);
                    x++;
                }, 100); 
            }

            
        },  
        animation_2_leave: function () {
            // let that = this;
            let promise = new Promise(function (resolve) {

                // let x = 0
                // let timer = setInterval(function () {
                //     if (x === that.date.everyday.length) {
                //         clearInterval(timer);
                //         resolve({status: {code: 0}}); 
                //         return;
                //     }
                //     that.date.everyday[x].css = that.getCss('leave', x);
                //     that.date.everyday[x].cssName = that.getCssName('leave', x);
                //     x++;
                // }, 150);
                resolve({status: {code: 0}}); 
            });

            return promise;
        },    
        /**
         * @description: 
         * @param {*} new_date_str  'YYYY-MM-DD' OR  时间戳
         * @param {*} isCompare     是否比对非今日日期, 设置激活状态. 在选择非今日日期时传入该参数, 好为元素设置激活状态
         * @param {*} direction     direction  "now" "prev" "next" 
         * @return {*}
         */        
        run: function (new_date_str, direction="now") {
            let that = this;
            
            that.setDateParams(new_date_str, direction);
            that.getWeekAllDay(direction);
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

            that.date.today.timeStamp = _today_.getTime();
            that.date.today.dayOfWeek = _today_.getDay() === 0 ? 7 : _today_.getDay();  //this.nowDayOfWeek === 0 ? 7: this.nowDayOfWeek
            that.date.today.year = _today_.getFullYear();
            that.date.today.month = _today_.getMonth() + 1 < 10 ? '0' + (_today_.getMonth() + 1) : _today_.getMonth() + 1;
            that.date.today.day = _today_.getDate() < 10 ? '0' + _today_.getDate() : _today_.getDate();
            that.date.today.dateStr = that.date.today.year + '-' + that.date.today.month + '-' + that.date.today.day;

            that.changeDatePoint = Object.assign({}, that.date.now);
        },
        /**
         * @description: 获取当天是第几周 
         * @param {*}
         * @return {*}
         */        
        getWeekNumOfYear: function (timeStamp, thisYear) {
            // let that = this;
            /*
                date1是当前日期
                date2是当年第一天
                d是当前日期是今年第多少天
                用d + 当前年的第一天的周差距的和在除以7就是本年第几周
            */
            let date1 = new Date(timeStamp),
                date2 = new Date(thisYear + '-01-01'),
                d = Math.round((date1.valueOf() - date2.valueOf()) / 86400000);
            return Math.ceil((d + ((date2.getDay() + 1) - 1)) / 7);
        },             
        /**
        * @description: 获取本周所有天的信息 (核心函数)
         * @param {*} isCompare 是否比对非今日日期, 设置激活状态. 在选择非今日日期时传入该参数, 好为元素设置激活状态
         * @param {*} direction  "now" "prev" "next"
         * @return {*}
         */        
        getWeekAllDay: function (direction="") {
            let that = this;
            let isThisWeek = false;
            let originYear = null;
            let originMonth = null;
            let originDay = null;
            let originDayFoWeek = null;

            if (direction === 'now' || that.date.everyday.length === 0) {
                // 如果everyday是空, 表示第一次渲染, 初始日期设置为当前日
                originYear = that.date.now.year; 
                originMonth = parseInt(that.date.now.month) - 1;
                originDay = that.date.now.day;
                originDayFoWeek = that.date.now.dayOfWeek;
            } else if (direction === 'thisWeek') {
                originYear = that.date.today.year; 
                originMonth = parseInt(that.date.today.month) - 1;
                originDay = that.date.today.day;
                originDayFoWeek = that.date.today.dayOfWeek; 
            } else {
                let originTimestamp = direction === 'prev' ? that.date.everyday[0].timeStamp - 1000 * 60 * 60 * 24 : that.date.everyday[6].timeStamp + 1000 * 60 * 60 * 24 
                let originDate = new Date(originTimestamp);
                originYear = originDate.getFullYear() 
                originMonth = originDate.getMonth();
                originDay = originDate.getDate();
                originDayFoWeek = originDate.getDay() === 0 ? 7 : originDate.getDay();  
            }

            if (that.date.everyday.length > 0) {
                that.date.everydayOld = that.date.everyday.slice(0, that.date.everyday.length);
            }
            
            that.date.everyday = [];
            for (var i = 0; i < 7; i++) {
                let _d1_ = new Date(originYear, originMonth, originDay - originDayFoWeek + i + 1);
                let _YMD_ = dateTools.formatDate(_d1_, 'yyyy-MM-dd');
                let _MD_ = dateTools.formatDate(_d1_, 'yyyy年MM月dd日');
                let _YMDARR_ = _YMD_.split('-');
                let _Y_ = _YMDARR_[0];
                let _M_ = _YMDARR_[1]; 
                let _D_ = _YMDARR_[2];
                let _TIMESTAMP_ = _d1_.getTime();
                let _isActive_ = false;
                let _DAYOFWEEK_ = _d1_.getDay() === 0 ? 7 : _d1_.getDay();

                // 是否被选中日期
                if (that.date.now.year.toString() === _Y_ && that.date.now.month.toString() === _M_ && that.date.now.day.toString() === _D_) {
                    _isActive_ = true;
                }
                // 日期是否处于本周(循环中只要包含今日, 即本周)
                if (that.date.today.year.toString() === _Y_ && that.date.today.month.toString() === _M_ && that.date.today.day.toString() === _D_) {
                    isThisWeek = true;
                }

                that.date.everyday.push({
                    dateStr: _YMD_,
                    dateStrCn: _MD_,
                    year: _Y_,
                    month: _M_,
                    day: _D_,
                    name: that.weekTitles[i],
                    isActive: _isActive_,
                    timeStamp: _TIMESTAMP_,
                    dayOfWeek: _DAYOFWEEK_,
                    css: that.getCss('init', i),
                    cssName: that.getCssName('init', i)
                });
            }
            that.title = isThisWeek ? '本周' : '第' + that.getWeekNumOfYear(that.date.everyday[0].timeStamp, that.date.everyday[0].year) + '周 | 返回本周'

            that['animation_' + that.animationId + '_enter'](direction);
        },
        /**
         * @description: 选择天
         * @param {*} originDayObj
         * @param {*} key
         * @return {*}
         */        
        onChange: function (originDayObj) {
            let that = this;
            that.date.everyday.forEach((item) => {
                if (item.timeStamp === originDayObj.timeStamp) {
                    item.isActive = true;
                    that.setDateParams(item.timeStamp, 'now');
                } else {
                    item.isActive = false;
                }
            });
        },
        /**
         * @description: 下一周
         * @param {*}
         * @return {*}
         */        
        next: function () {
            let that = this;
            let _e_st_ = that.date.everyday[6].timeStamp + 1000 * 60 * 60 * 24; // 本周最后一天加上一天
            that['animation_' + that.animationId + '_leave']().then(() => {
                that.run(_e_st_, 'next');
            });
        },
        /**
         * @description: 上一周
         * @param {*}
         * @return {*}
         */        
        prev: function () {
            let that = this;
            let _s_st_ = that.date.everyday[0].timeStamp - 1000 * 60 * 60 * 24; // 本周第一天减去1天
            that['animation_' + that.animationId + '_leave']().then(() => {
                that.run(_s_st_, 'prev');
            });
        },
        /**
         * @description: 回到本周
         * @param {*}
         * @return {*}
         */        
        comeback: function () {
            let that = this;

            that['animation_' + that.animationId + '_leave']().then(() => {
               that.run(that.date.today.timeStamp, 'thisWeek');
            });
        }
    }
}


</script>

<style scoped lang="scss">
@import '../src/style/theme/index';
$bgColor: #f6f6f6;
/*日历-周*/
.hqui.component-week {
    // background: $color-primary;
    // color: $color-white;
    background: $bgColor;
    color: $color-primary;
    height: 100px;
    user-select: none;
    text-align: center;
    
    * {
        box-sizing: border-box;
    }

    &:before, &:after {
        content: "";
        display: table;
    }
    &:after {
        clear: both;
    }

    width: 100%;

    .week-days {
        width: 80%;
        height: 100px;
        float: left;
        position: relative;
        // display: flex;

        .week-days--thisweek {
            width: 100%;
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            // display: flex;
            overflow: hidden;
        }

        .week-day {
            float: left;
            // flex: 1;
            cursor: pointer;
            padding-top: 10px;
            height: 100px;
            // transition-timing-function: ease-out;

            .week-day-name {

            }

            .week-day-data {
                font-size: 20px;
                font-weight: bold;
            }
        }

        .week-day.active {
            background: $color-assist;
            color: $color-white;
        }
    }

    .week-control {
        width: 20%;
        height: 100px;
        float: left;
    
        .week-ctl-year {
            padding-top: 10px;
        }

        .week-ctl-btns {
            position: relative;
        }

        .week-ctl-lbtn {
            display: block;
            border-top: 4.5px solid transparent;
            border-bottom: 4.5px solid transparent;
            position: absolute;
            top: 2px;
            cursor: pointer;
            border-right: 6px solid $color-assist;
            border-left: 0;
            left: 10px;
            cursor: pointer;
        }

        .week-ctl-rbtn {
            display: block;
            border-top: 4.5px solid transparent;
            border-bottom: 4.5px solid transparent;
            position: absolute;
            top: 2px;
            cursor: pointer;
            border-left: 6px solid $color-assist;
            border-right: 0;
            right: 10px;
            cursor: pointer;
        }
    }
}

.hqui.component-week-ani1 {
    .week-days {
        .week-day {
            cursor: pointer;
            padding-top: 10px;
            transition: all 0.5s;
        }
    }
}

.hqui.component-week-ani2 {
    .week-days {
        .week-day {
            transform-style: preserve-3d;/*设置为3d空间*/
            position: relative;
            transition: all 1s;
            padding-top: 0;

            .front {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                padding-top: 10px;
            }

            .back {
                display: none;
                width: 100%;
                height: 100%;
                padding-top: 10px;
            }
        }

        .week-day.a {
            transform: perspective(2000px) rotatex(0deg) rotatey(0deg);/*拥有近大远小透视效果*/
            transition: none;
            .front.active, .back.active {
                background: $color-assist;
                color: $color-white;
            }
        }

        .week-day.b {
            transform: perspective(2000px) rotatex(-180deg) rotatey(0deg);

            .front {
                transform: translatez(1px);
                // background-color: $color-primary;
                background: $bgColor;
                // color: $color-primary;
                float: left;
            }

            .back {
                transform: rotatex(0deg) rotatey(180deg) translatez(1px);
                // background-color: $color-primary;
                background: $bgColor;
                color: $color-primary;
                display: block;
                float: left;
                transform: rotateX(180deg);
            }

            .front.active, .back.active {
                background: $color-assist;
                color: $color-white;
            }
        }
    }
}


.hqui.component-week {
    background: linear-gradient(180deg, #FDFEFF 0%, #F8FAFF 100%) !important;
    color: rgba(0, 0, 0, 0.85) !important;
}
.hqui.component-week .week-days .week-day.active {
    background: linear-gradient(54deg, #5A82FF 50%, #7AAAFF) !important;
    color: #ffffff !important;
    border-radius: 3px !important;
}

.hqui.component-week .week-control .week-ctl-lbtn {
    border-right: 6px solid #646466 !important;
}

.hqui.component-week .week-control .week-ctl-rbtn {
    border-left: 6px solid #646466 !important;
}

.hqui.component-week-ani2 .week-days .week-day.b .back,
.hqui.component-week-ani2 .week-days .week-day.b .front {
    background: linear-gradient(180deg, #FDFEFF 0%, #F8FAFF 100%) !important;
    color: rgba(0, 0, 0, 0.85) !important; 
}
.hqui.component-week-ani2 .week-days .week-day.b .front.active, 
.hqui.component-week-ani2 .week-days .week-day.b .back.active,
.hqui.component-week-ani2 .week-days .week-day.a .front.active, 
.hqui.component-week-ani2 .week-days .week-day.a .back.active {
    background: linear-gradient(54deg, #5A82FF 50%, #7AAAFF) !important;
    color: #ffffff !important;
    border-radius: 3px !important;
}

.hqui.component-week-ani1 .week-days .week-day .week-day-name,
.hqui.component-week-ani1 .week-days .week-day .week-day-data {
    transition: none !important;
    color: #646466;
}

.hqui.component-week-ani1 .week-days .week-day.active .week-day-name,
.hqui.component-week-ani1 .week-days .week-day.active .week-day-data,
.hqui.component-week-ani1 .week-days .week-day.active .week-day-container {
    color: #ffffff;
}
</style>
