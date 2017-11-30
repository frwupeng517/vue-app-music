<template>
    <div class="recommend" ref="recommend">
        <div class="recommend-content">
            <div v-if="recommends.length" class="slider-wrapper" ref="sliderWrapper">
                <slider>
                    <div v-for="(item, index) in recommends">
                        <a :href="item.linkUrl">
                            <img :src="item.picUrl" alt="">
                        </a>
                    </div>
                </slider>
            </div>
            <div class="recommend-list">
                <h1 class="list-title">热门歌单推荐</h1>
                <ul>

                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import BScroll from 'better-scroll'
import {getRecommend, getDiscList} from 'api/recommend'
import {ERR_OK} from 'api/config'
import Slider from 'base/slider/slider'
export default {
    data () {
        return {
            recommends: [],
            discList: []
        }
    },
    components: {
        Slider
    },
    created () {
        this._getRecommend()
        this._getDiscList()
    },
    methods: {
        // 获取轮播图数据
        _getRecommend () {
            getRecommend().then((res) => {
                if (res.code === ERR_OK) {
                    this.recommends = res.data.slider
                    // console.log(this.recommends)
                }
            })
        },
        // 获取歌单列表
        _getDiscList () {
            getDiscList().then((res) => {
                console.log('res--->' + res)
                // if (res.code === ERR_OK) {
                //     this.discList = res.data.list
                //     console.log(`this.discList${res}`)
                // }
            })
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
            .list-title{
                height: 65px;
                line-height: 65px;
                text-align: center;
                font-size: $font-size-medium;
                color: $color-theme;
            }
            .item{
                display: flex;
                box-sizing: border-box;
                align-items: center;
                padding: 0 20px 20px 20px;
                .icon{
                    flex: 0 0 60px;
                    width: 60px;
                    padding-right: 20px;
                }
                .text{
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    flex: 1;
                    line-height: 20px;
                    overflow: hidden;
                    font-size: $font-size-medium;
                    .name{
                        margin-bottom: 10px;
                        color: $color-text;
                    }
                    .desc{
                        color: $color-text-d;
                    }
                }
            }
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


