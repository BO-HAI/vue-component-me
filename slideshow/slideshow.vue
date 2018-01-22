<template lang="html">
    <div class="slider-image">
        <ul class="image-list">
            <li v-for="(img, index) in images" class="image-item"
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
        <ul class="play-group" :style='{"margin-left": ((images.length * 17 + 20) / 2) * -1 + "px" }'>
            <li v-for="(img, index) in images" class="play-button" :class="{active: index == temp}" v-on:click="setIndex(index)"></li>
        </ul>
    </div>
</template>

<script>
export default {
    props: {
        images: {
            type: Array,
            default: function () {
                return [
                    {
                        url: 'http://ykonlinevideo.bs2dl.yy.com:80/22b9cb28d7174b00a2fb3d6c8ecdaa37.jpg',
                        link: '#',
                        title: 'You Growth is Our Target',
                        subtitle: 'Proper sadness that says the deep feelings of sadness, that the lack of wisdom',
                        linkText: 'ABOUT US',
                        color: '#ffffff'
                    },
                    {
                        url: 'http://ykonlinevideo.bs2dl.yy.com:80/0d07557681874b5f966f46f938809b8c.jpg',
                        link: '#',
                        title: 'You Growth is Our Target',
                        subtitle: 'Proper sadness that says the deep feelings of sadness, that the lack of wisdom',
                        linkText: 'ABOUT US',
                        color: '#ffffff'
                    },
                    {
                        url: 'http://ykonlinevideo.bs2dl.yy.com:80/22b9cb28d7174b00a2fb3d6c8ecdaa37.jpg',
                        link: '#',
                        title: 'You Growth is Our Target',
                        subtitle: 'Proper sadness that says the deep feelings of sadness, that the lack of wisdom',
                        linkText: 'ABOUT US',
                        color: '#ffffff'
                    },
                    {
                        url: 'http://ykonlinevideo.bs2dl.yy.com:80/0d07557681874b5f966f46f938809b8c.jpg',
                        link: '#',
                        title: 'You Growth is Our Target',
                        subtitle: 'Proper sadness that says the deep feelings of sadness, that the lack of wisdom',
                        linkText: 'ABOUT US',
                        color: '#ffffff'
                    }
                ]
            }
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
        this.go();
    },
    methods: {
        init(images) {
            let _self = this;
            _self.$data.count = images.length;
            // 将原始图片对象列表拷贝一份，如果不复制，后续对列表的操作会导致watch会再次执行init
            images.forEach((img) => {
                _self.$data.imgList.push(img);
            });


            _self.$data.imgList.forEach((img, index) => {
                img.position = ((index * -1) * 100) + '%';
            });
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

<style>

</style>
