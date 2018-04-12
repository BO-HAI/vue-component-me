<template lang="html">
    <div class="slider-image" :style="{height, width}" v-on:touchstart="touchstart($event)" v-on:touchend="touchend($event)">
        <ul class="image-list">
            <li v-for="(img, index) in imgList" class="image-item"
                :style="{
                    'color': img.color,
                    'background-image': 'url(' + img.url + ')',
                    'right': img.position,
                    'transition': 'all ' + speed + 's ease-in-out'
                    }">
                <div v-if="img.title.length > 0" class="text-bg">
                    <p class="title en">{{img.title}}</p>
                    <p class="subtitle en">{{img.subtitle}}</p>
                    <a class="button en"
                       v-on:mouseover="setColor(img.btnHoverColor, $event)"
                       v-on:mouseout="setColor(img.color, $event)"
                       target="_black"
                       :href="img.link"
                       :style="{'color': img.color, 'border': '1px solid ' + img.color}">
                        {{img.linkText}}
                        <i class="button-line button-line--top" :style="{'background-color': img.btnHoverColor ? img.btnHoverColor : '#f36371'}"></i>
                        <i class="button-line button-line--bottom" :style="{'background-color': img.btnHoverColor ? img.btnHoverColor : '#f36371'}"></i>
                        <i class="button-line button-line--left" :style="{'background-color': img.btnHoverColor ? img.btnHoverColor : '#f36371'}"></i>
                        <i class="button-line button-line--right" :style="{'background-color': img.btnHoverColor ? img.btnHoverColor : '#f36371'}"></i>
                    </a>
                </div>
                <a v-if="img.title.length === 0" class="button en button-full"
                   target="_black"
                   :href="img.link">
                </a>
            </li>
        </ul>
        <ul v-if="imgList.length > 2" class="play-group" :style='{"margin-left": ((images.length * (btnMargin * 2 + 10) + 20) / 2) * -1 + "px" }'>
            <li v-for="(img, index) in images" class="play-button"
            :class="{active: index == temp}"
            v-on:click="movement(index)" :style="{'margin': '0 ' + btnMargin + 'px'}"></li>
        </ul>
    </div>
</template>

<script>
export default {
    props: {
        images: {
            type: Array
        },
        speed: {
            type: Number,
            default: 1.5
        },
        time: {
            type: Number,
            default: 15000
        },
        btnMargin: {
            type: Number,
            default: 10
        },
        height: {
            type: String,
            default: '450px'
        },
        width: {
            type: String,
            default: '100%'
        }
    },
    watch: {
        'images': 'init'
    },
    data() {
        return {
            count: 0,
            forward: true,
            temp: 0, // 当前图片下标
            timer: null,
            imgList: [],
            defBtnHoverColor: '#f36371',
            startX: 0,
            startY: 0,
            endX: 0,
            endY: 0
            // btnMargin: 10
        }
    },
    beforeMount(){

    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            let _self = this;
            _self.$data.count = this.images.length;
            // 将原始图片对象列表拷贝一份，如果不复制，后续对列表的操作会导致watch会再次执行init
            this.$data.imgList = this.images.slice(0)

            _self.$data.imgList.forEach((img, index) => {
                img.position = ((index * -1) * 100) + '%';
            });

            this.timeMeter();
        },
        movement(index) {
            // 运动开始
            let _self = this;
            clearInterval(_self.$data.timer);
            // 接受当前激活的图片下标
            _self.$data.temp = index;
            // 如果当前下标是最后一张，这只方向向后运动，并且下标＋1
            if (index === _self.$data.count - 1) {
                _self.$data.forward = false;
                _self.$data.temp++;
            }
            // 如果当前下标是第一张，这只方向向前运动，并且下标－1
            if (index === 0) {
                _self.$data.forward = true;
                _self.temp--;
            }
            // 既不是第一张也不是最后一张 向前运动
            if (index !== _self.$data.count - 1 && index !== 0 && _self.$data.forward) {
                _self.$data.temp--;
            }
            // 既不是第一张也不是最后一张 向后运动
            if (index !== _self.$data.count - 1 && index !== 0 && !_self.$data.forward) {
                _self.$data.temp++;
            }

            _self.computePosition();
            _self.timeMeter();
        },
        timeMeter() {
            // 计时器
            let _self = this;
            if (_self.images.length < 2) {
                return;
            }

            _self.$data.timer = setInterval(() => {
                _self.computePosition();
            }, _self.time);
        },
        computePosition() {
            let _self = this;
            if (!_self.$data.forward ) {
                // _self.temp--;
                _self.$data.imgList.forEach((img, index) => {
                    img.position = (_self.$data.count - (index + (_self.$data.count - (_self.temp - 1)))) * 100 + '%';
                    _self.$set(_self.$data.imgList, index, img);
                });
                _self.temp--;
                _self.$data.forward = _self.temp === 0 ? true : false;
            } else {
                _self.$data.imgList.forEach((img, index) => {
                    img.position = (_self.$data.count - (index + (_self.$data.count - (_self.temp + 1)))) * 100 + '%';
                    _self.$set(_self.$data.imgList, index, img);
                });
                _self.temp++;
                _self.$data.forward = _self.temp === _self.$data.count - 1 ? false : true;
            }
        },
        setColor(color, event) {
            event.path[0].style.color = color ? color : this.$data.defBtnHoverColor;
        },
        getAspect(startX, startY, endX, endY) {
            var dx, dy, result;

            dx = endX - startX;
            dy = endY - startY;

            //如果滑动距离太短
            if (Math.abs(dx) < 2 && Math.abs(dy) < 2) {
                return -1;
            }

            var angle = Math.atan2(dy, dx) * 180 / Math.PI;

            if (angle >= -45 && angle < 45) {
                result = 4; // 右
            } else if (angle >= 45 && angle < 135) {
                result = 1; // 上
            } else if (angle >= -135 && angle < -45) {
                result = 2; // 下
            }
            else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
                result = 3; // 左
            }

            return result;
        },
        touchstart(e) {
            e.preventDefault();
            this.$data.startX = e.changedTouches[0].pageX;
            this.$data.startY = e.changedTouches[0].pageY;
        },
        touchend(e) {
            let direction;
            e.preventDefault();
            this.$data.endX = e.changedTouches[0].pageX;
            this.$data.endY = e.changedTouches[0].pageY;

            direction = this.getAspect(this.$data.startX, this.$data.startY, this.$data.endX, this.$data.endY);

            switch (direction) {
                case -1:
                    window.location.href = this.$data.imgList[this.$data.temp].link;
                    break;
                case 3:
                    if (this.$data.temp + 1 >= this.$data.count - 1) {
                        this.$data.temp = this.$data.count - 2;
                    }
                    this.movement(this.$data.temp + 1)
                    break;
                case 4:
                    if (this.$data.temp - 1 < 0) {
                        this.$data.temp = 1;
                    }
                    this.movement(this.$data.temp - 1)
                    break;
            }

        }
    }
}
</script>

<style lang="scss">
.slider-image {
    padding: 0;
    margin: 0;
    position: relative;
    overflow: hidden;

    p {
        margin: 0;
        padding: 0;
    }

    .image-list {
        width: 100%;
        height: 100%;
        padding: 0;
        margin: 0;
    }

    .image-item {
        background-repeat: no-repeat;
        background-size: cover;
        background-position: 50%;
        height: 100%;
        width: 100%;
        overflow: hidden;
        position: absolute;
        top: 0;
        transition-timing-function: ease;

        .text-bg {
            width: 100%;
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            background: rgba(29, 29, 29, 0.67);
        }

        .title {
            text-align: center;
            font-weight: bold;
            margin-top: 6rem;
            margin-bottom: 2rem;
            line-height: 3rem;
            font-size: 3rem;
            transition: all .5s;
        }

        .subtitle {
            text-align: center;
            font-weight: bold;
            margin-bottom: 4rem;
            height: 16px;
            transition: all .5s;
            line-height: 1.2rem;
            font-size: 1.2rem;
        }

        .button {
            width: 168px;
            height: 43px;
            text-align: center;
            line-height: 43px;
            margin: auto;
            display: block;
            font-weight: bold;
            position: relative;
            transition: all .5s;
            box-sizing: content-box;

            .button-line {
                position: absolute;
                display: block;
                opacity: 0;
                transition: all .5s;
                transition-timing-function: ease;
            }

            .button-line--top {
                height: 1px;
                width: 170px;
                top: -1px;
                left: -170px;
            }

            .button-line--bottom {
                height: 1px;
                width: 170px;
                bottom: -1px;
                right: -170px;
            }

            .button-line--left {
                width: 1px;
                height: 45px;
                bottom: -45px;
                left: -1px;
            }

            .button-line--right {
                width: 1px;
                height: 45px;
                top: -45px;
                right: -1px;
            }

            &:hover {
                .button-line {
                    opacity: 1;
                }

                .button-line--top {
                    left: -1px;
                }

                .button-line--bottom {
                    right: -1px;
                }

                .button-line--left {
                    bottom: -1px;
                }

                .button-line--right {
                    top: -1px;
                }
            }
        }

        .button-full {
            position: absolute;
            top: 0;
            left: 0;
            margin: 0;
            width: 100%;
            height: 100%;

            i {
                display: none !important;
            }
        }
    }

    .play-group {
        height: 20px;
        line-height: 20px;
        background: rgba(51, 51, 51, 0.74);
        position: absolute;
        text-align: center;
        bottom: 20px;
        padding: 0 10px;
        border-radius: 15px;
        left: 50%;

        .play-button {
            display: inline-block;
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background: #848080;
            cursor: pointer;

            &.active {
                background: #ffffff;
            }
        }
    }
}

@media screen and (max-width: 600px) {
    .slider-image .image-item {
        .title {
            font-size: 2.3rem;
            padding: 0 25px;
        }

        .subtitle {
            padding: 0 25px;
        }
    }
}
</style>
