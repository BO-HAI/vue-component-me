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
                }
            }
        }
    },
    mounted: function() {

        let that = this;

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
        run () {
            
        }
    }
}


</script>

<style scoped lang="scss">
@import '../src/style/theme/index';
/*日历-周*/
.hqui.component-calendar {
    
}
</style>
