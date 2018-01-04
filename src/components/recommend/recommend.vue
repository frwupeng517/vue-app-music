<template>
    <div class="recommend" ref="recommend">
        <scroll ref="scroll" class="recommend-content" :data="discList">
            <div>
                <div v-if="recommends.length" class="slider-wrapper" ref="sliderWrapper">
                    <slider>
                        <div v-for="(item, index) in recommends">
                            <a :href="item.linkUrl" @load="loadImage">
                                <!-- needsclick 这个class是用于使轮播图可点击，因为引入scroll的click为true，与fastclick冲突导致点击失效 -->
                                <img class="needsclick" :src="item.picUrl" alt="">
                            </a>
                        </div>
                    </slider>
                </div>
                <div class="recommend-list">
                    <h2 class="list-title">电台</h2>
                    <ul class="list-container">
                        <li v-for="radio in radioList" class="item">
                            <a href="https://i.y.qq.com/v8/playsong.html?ADTAG=myqq&from=myqq&channel=10007100&songid=104251904,201844913,200792833,204179897,212448952,105561979,105391499,203801126,208482132,202915119,202979233,211997756,204289330,105621350,102950518,205618103,202665327,211941841,204270540,105511154">
                                <div class="list-media">
                                    <img :src="radio.picUrl" alt="">
                                    <span class="icon icon-play"></span>
                                </div>
                                <div class="list-info">
                                    <h3>{{radio.Ftitle}}</h3>
                                </div>
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="recommend-list">
                    <h1 class="list-title">热门歌单</h1>
                    <ul class="list-container">
                        <li v-for="disc in discList" class="item">
                            <a :href="songListUrl+disc.id">
                                <div class="list-media">
                                    <img v-lazy="disc.picUrl" alt="">
                                    <span class="icon icon-play"></span>
                                </div>
                                <div class="list-info">
                                    <h3>{{disc.songListDesc}}</h3>
                                    <p>{{disc.songListAuthor}}</p>
                                </div>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="loading-container" v-show="!discList.length">
                <loading></loading>
            </div>
        </scroll>
    </div>
</template>

<script>
import BScroll from 'better-scroll'
import {getRecommend} from 'api/recommend'
import {ERR_OK} from 'api/config'
import Slider from 'base/slider/slider'
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'
export default {
    data () {
        return {
            recommends: [],
            radioList: [],
            discList: [],
            songListUrl: 'https://y.qq.com/w/taoge.html?ADTAG=myqq&from=myqq&channel=10007100&id='
        }
    },
    components: {
        Slider, Scroll, Loading
    },
    created () {
        this._getRecommend()
    },
    methods: {
        // 获取轮播图数据
        _getRecommend () {
            getRecommend().then((res) => {
                if (res.code === ERR_OK) {
                    this.recommends = res.data.slider
                    this.radioList = res.data.radioList
                    this.discList = res.data.songList
                }
            })
        },
        // 轮播图中图片加载成功以后调用重新刷新
        loadImage () {
            // 默认是没有checkLoaded属性的，通过这种写法只执行一次，避免重复调用该方法
            if (!this.checkLoaded) {
                this.$refs.scroll.refresh()
                this.checkLoaded = true
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import "~common/scss/variable";

.recommend{
    position: fixed;
    width: 100%;
    top: 88px;
    bottom: 0;
    .recommend-content{
        height: 100%;
        overflow: hidden;
        .slider-wrapper{
            position: relative;
            width: 100%;
            overflow: hidden;
        }
        .recommend-list{
            margin-bottom: 10px;
            padding: 0 10px;
            .list-title{
                height: 65px;
                line-height: 65px;
                text-align: left;
                font-size: $font-size-medium-x;
                color: $color-theme;
            }
            .list-container{
                font-size: 0;
                .item{
                    display: inline-block;
                    vertical-align: top;
                    box-sizing: border-box;
                    width: 50%;
                    padding-right: 8px;
                    margin-bottom: 10px;
                    >a{
                        display: block;
                    }
                    .list-media{
                        position: relative;
                        margin-bottom: 5px;
                        img{
                            width: 100%;
                        }
                        .icon{
                            position: absolute;
                            bottom: 5px;
                            right: 5px;
                            display: block;
                            width: 24px;
                            height: 24px;
                            z-index: 10;
                            font-size: 22px;
                        }
                    }
                    .list-info{
                        padding: 0 7px 5px;
                        h3{
                            height: 36px;
                            line-height: 18px;
                            text-align: left;
                            font-size: $font-size-medium;
                            color: $color-theme;
                            white-space: nowrap;
                            overflow: hidden;
                            text-overflow: ellipsis;
                        }
                        p{
                            font-size: $font-size-small;
                            color: $color-theme;
                        }
                    }
                }
            }
            // .item{
            //     display: flex;
            //     box-sizing: border-box;
            //     align-items: center;
            //     padding: 0 20px 20px 20px;
            //     .icon{
            //         flex: 0 0 60px;
            //         width: 60px;
            //         padding-right: 20px;
            //     }
            //     .text{
            //         display: flex;
            //         flex-direction: column;
            //         justify-content: center;
            //         flex: 1;
            //         line-height: 20px;
            //         overflow: hidden;
            //         font-size: $font-size-medium;
            //         .name{
            //             margin-bottom: 10px;
            //             color: $color-text;
            //         }
            //         .desc{
            //             color: $color-text-d;
            //         }
            //     }
            // }
        }
        .loading-container{
            position: absolute;
            width: 100%;
            top: 50%;
            transform: translateY(-50%);
        }
    }
}
</style>


