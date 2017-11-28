<template>
    <div class="slider" ref="slider">
        <div class="slider-group" ref="sliderGroup">
            <slot></slot>
        </div>
        <div class="dots">
            <span class="dot" :class="{active: currentPageIndex === index}" v-for="(item, index) in dots"></span>
        </div>
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
    data () {
        return {
            currentPageIndex: 0,
            dots: []
        }
    },
    mounted () {
        setTimeout(() => {
            this._setSliderWidth()
            this._initDots()
            this._initSlider()
            this._play()
        }, 20)
        // 给窗口添加resize事件，屏幕大小改变时图片的大小没有改变，造成粘连的效果
        window.addEventListener('resize', () => {
            if (!this.slider) {
                return
            }
            this._setSliderWidth(true) // isResize 每次窗口大小改变会重新计算宽度，宽度就会加2张，为了避免所以这里取值为true
            this.slider.refresh()
        })
    },
    methods: {
        // 计算轮播图所有图片的宽度
        _setSliderWidth (isResize) {
            this.children = this.$refs.sliderGroup.children  // Dom 扩展 children: 只包含元素中同样还是元素的子节点
            // 轮播图的总长度
            let width = 0
            // 单个轮播图的宽度
            let sliderWidth = this.$refs.slider.clientWidth  // clientWidth: 是元素内容区宽度加上左右内边距宽度
            for (let i = 0; i < this.children.length; i++) {
                let child = this.children[i]
                addClass(child, 'slider-item')
                child.style.width = sliderWidth + 'px'
                width += sliderWidth 
            }
            if (this.loop && !isResize) { // 如果开启循环轮播
                width += 2 * sliderWidth // 为了营造无缝轮播的效果，会把首图和尾图各复制一份
            }
            this.$refs.sliderGroup.style.width = width + 'px'
        },
        // 初始化slider
        _initSlider () {
            this.slider = new BScroll(this.$refs.slider, {
                scrollX: true, // 当设置为 true 的时候，可以开启横向滚动
                scrollY: false,
                momentum: false, // 当快速在屏幕上滑动一段距离的时候，会根据滑动的距离和时间计算出动量，并生成滚动动画。设置为 true 则开启动画(设置true时会造成图片无法按需轮播)
                snap: true,
                snapLoop: this.loop,
                snapThreshold: 0.3,
                snapSpeed: 400
            })
            this.slider.on('scrollEnd', () => {
                let pageIndex = this.slider.getCurrentPage().pageX
                if (this.loop) {
                    pageIndex -= 1
                }
                this.currentPageIndex = pageIndex
                if (this.autoPlay) {
                    clearTimeout(this.timer)
                    this._play()
                }
                /* scrollEnd 触发时机：滚动结束。
                    参数：{Object} {x, y} 滚动结束的位置坐标
                */
                /* getCurrentPage() 获取当前页面的信息
                    返回值：{Object} { x: posX, y: posY,pageX: x, pageY: y} 其中，x 和 y 表示偏移的坐标值，
                    pageX 和 pageY 表示横轴方向和纵轴方向的页面数
                */
            })
        },
        // 自动播放
        _play () {
            let pageIndex = this.currentPageIndex + 1
            if (this.loop) {
                pageIndex += 1
            }
            this.timer = setTimeout(() => {
                this.slider.goToPage(pageIndex, 0, 400)
            }, this.interval)
            /* goToPage(x, y, time, easing) 用于滚动到指定的页面
                x: x轴的页数，y：y轴的页数，time：动画执行的时间，easing：缓动函数
            */
        },
        // 初始化圆点
        _initDots () {
            this.dots = new Array(this.children.length)
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

