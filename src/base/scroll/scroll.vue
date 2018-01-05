<template>
    <div ref="wrapper">
        <slot></slot>              
    </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
    props: {
        // 默认值为0，可选值1, 2, 3
        /**
            * 1 滚动的时候会派发scroll事件，会截流。
            * 2 滚动的时候实时派发scroll事件，不会截流。
            * 3 除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件
        */
        probeType: {
            type: Number,
            default: 1
        },
        // 点击列表是否派发click事件
        click: {
            type: Boolean,
            default: true
        },
        // 列表的数据
        data: {
            type: Array,
            default: null
        }
    },
    watch: {
        // 监听数据的变化，延时20ms后调用refresh方法重新计算，保证滚动效果正常
        // 20ms 是一个经验值，每一个tick的时间是17ms
        data () {
            setTimeout(() => {
                this.refresh()
            }, 20)
        }
    },
    mounted () {
        // 保证在DOM渲染完毕后初始化better-scroll
        setTimeout(() => {
            this._initScroll()
        }, 20)
    },
    methods: {
        _initScroll () {
            if (!this.$refs.wrapper) {
                return
            }
            // better-scroll的初始化
            this.scroll = new BScroll(this.$refs.wrapper, {
                probeType: this.probeType,
                click: this.click
            })
        },
        // 代理better-scroll的enable方法
        enable () {
            this.scroll && this.scroll.enable()
        },
        // 代理better-scroll的disable方法
        disable () {
            this.scroll && this.scroll.disable()
        },
        // 代理better-scroll的refresh方法
        refresh () {
            this.scroll && this.scroll.refresh()
        }
    }
}
</script>

