<template lang="html">
    <div class="slider-image">
        <ul class="image-list">
            <li v-for="(img, index) in imgList" class="image-item"
                :style="{
                    'color': img.color,
                    'background-image': 'url(' + img.url + ')',
                    'right': img.position,
                    'transition': 'all ' + speed + 's ease-in-out'
                    }">
                <p class="title en">{{img.title}}</p>
                <p class="subtitle en">{{img.subtitle}}</p>
                <a class="button en"
                   target="_black"
                   :href="img.link"
                   :class="{'button-full': !img.linkText}"
                   :style="{'color': img.color, 'border': '1px solid ' + img.color}">
                    {{img.linkText}}
                    <i class="button-line button-line--top"></i>
                    <i class="button-line button-line--bottom"></i>
                    <i class="button-line button-line--left"></i>
                    <i class="button-line button-line--right"></i>
                </a>
            </li>
        </ul>
        <ul v-if="imgList.length > 2" class="play-group" :style='{"margin-left": ((images.length * 17 + 20) / 2) * -1 + "px" }'>
            <li v-for="(img, index) in images" class="play-button" :class="{active: index == temp}" v-on:click="setIndex(index)"></li>
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
            imgList: []
        }
    },
    beforeMount(){

    },
    mounted() {
        this.init().go();
    },
    methods: {
        init() {
            let _self = this;
            _self.$data.count = this.images.length;
            // 将原始图片对象列表拷贝一份，如果不复制，后续对列表的操作会导致watch会再次执行init
            this.images.forEach((img) => {
                _self.$data.imgList.push(img);
            });

            _self.$data.imgList.forEach((img, index) => {
                img.position = ((index * -1) * 100) + '%';
            });
            return this;
        },
        setIndex(index) {
            let _self = this;
            clearInterval(_self.$data.timer);
            // 接受当前激活的图片下标
            _self.temp = index;
            // 如果当前下标是最后一张，这只方向向后运动，并且下标＋1
            if (index === _self.$data.count - 1) {
                _self.$data.forward = false;
                _self.temp++;
            }
            // 如果当前下标是第一张，这只方向向前运动，并且下标－1
            if (index === 0) {
                _self.$data.forward = true;
                _self.temp--;
            }
            // 既不是第一张也不是最后一张 向前运动
            if (index !== _self.$data.count - 1 && index !== 0 && _self.$data.forward) {
                _self.temp--;
            }
            // 既不是第一张也不是最后一张 向后运动
            if (index !== _self.$data.count - 1 && index !== 0 && !_self.$data.forward) {
                _self.temp++;
            }

            _self.compute();
            _self.go();
        },
        go() {
            let _self = this;
            if (_self.images.length < 2) {
                return;
            }
            _self.$data.timer = setInterval(() => {
                _self.compute();
            }, _self.time);
        },
        compute() {
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
        }
    }
}
</script>

<style lang="scss">
.slider-image {
    width: 100%;
    height: 450px;
    padding: 0;
    margin: 0;
    position: relative;
    overflow: hidden;

    .image-list {
        width: 100%;
        height: 100%;
        padding: 0;
        margin: 0;
    }

    .image-item {
        background-repeat: no-repeat;
        background-size: cover;
        height: 100%;
        width: 100%;
        overflow: hidden;
        position: absolute;
        top: 0;
        transition-timing-function: ease;

        .title {
            text-align: center;
            font-size: 60px;
            font-weight: bold;
            margin-top: 150px;
            height: 50px;
            line-height: 60px;
        }

        .subtitle {
            text-align: center;
            font-size: 16px;
            font-weight: bold;
            margin-top: 20px;
            height: 16px;
        }

        .button {
            width: 168px;
            height: 43px;
            text-align: center;
            line-height: 43px;
            margin: auto;
            display: block;
            margin-top: 35px;
            font-weight: bold;
            position: relative;
            transition: all .5s;

            .button-line {
                position: absolute;
                display: block;
                background: #f36371;
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
                color: #f36371 !important;

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
        background: rgba(51, 51, 51, 0.51);
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
            background: #ffffff;
            border-radius: 50%;
            margin: 0 2px;
            background: #696969;
            cursor: pointer;

            &.active {
                background: #ffffff;
            }
        }
    }
}
</style>
