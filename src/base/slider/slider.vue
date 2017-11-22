<template>
    <div class="slider" ref="slider">
        <div class="slider-group" ref="sliderGroup">
            <slot></slot>
        </div>
        <div class="dots"></div>
    </div>
</template>

<script>
import BScroll from 'better-scroll'
import {addClass} from 'common/js/dom'
export default {
    props: {
        autoPlay: {
            type: Boolean,
            default: true
        },
        loop: {
            type: Boolean,
            default: true
        },
        interval: {
            type: Number,
            default: 4000
        }
    },
    mounted () {
        console.log(1)
        setTimeout(() => {
            this._setSliderWidth()
            this._initSlider()
        }, 20)
    },
    methods: {
        // 计算轮播图所有图片的宽度
        _setSliderWidth () {
            this.children = this.$refs.sliderGroup.children  // Dom 扩展 children: 只包含元素中同样还是元素的子节点
            // 轮播图的总长度
            let width = 0
            // 单个轮播图的宽度
            let sliderWidth = this.$refs.slider.clientWidth  // clientWidth: 是元素内容区宽度加上左右内边距宽度
            for (var i = 0; i < this.children.length; i++) {
                let child = this.children[i]
                addClass(child, 'slider-item')
                child.style.width = sliderWidth + 'px'
                width += sliderWidth + 'px'
            }
            if (this.loop) { // 如果开启循环轮播
                width += 2 * sliderWidth + 'px' // 为了营造无缝轮播的效果，会把首图和尾图各复制一份
            }
            this.$refs.sliderGroup.style.width = width + 'px'
        },
        // 初始化slider
        _initSlider () {
            this.slider = new BScroll(this.$refs.slider, {
                scrollX: true, // 当设置为 true 的时候，可以开启横向滚动
                scrollY: false,
                momentum: true, // 当快速在屏幕上滑动一段距离的时候，会根据滑动的距离和时间计算出动量，并生成滚动动画。设置为 true 则开启动画
                snap: {
                    loop: this.loop,
                    threshold: 0.3,
                    speed: 400
                }
            })
            // this.slider.on('scrollEnd', () => {

            // })
        }
    }
}
</script>


<style lang="scss" scoped>
 @import "~common/scss/variable";

 .slider{
    min-height: 1px;
    .slider-group{
        position: relative;
        overflow: hidden;
        white-space: nowrap;
        .slider-item{
            float: left;
            box-sizing: border-box;
            overflow: hidden;
            text-align: center;
            a{
                display: block;
                width: 100%;
                overflow: hidden;
                text-decoration: none;
            }
            img{
                display: block;
                width: 100%;
            }
        }
    }
    .dots{
        position: absolute;
        right: 0;
        left: 0;
        bottom: 12px;
        text-align: center;
        font-size: 0;
        .dot{
            display: inline-block;
            margin: 0 4px;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: $color-text-l;
            &.active{
                width: 20px;
                border-radius: 5px;
                background: $color-text-ll;
            }
        }
    }
 }

</style>

