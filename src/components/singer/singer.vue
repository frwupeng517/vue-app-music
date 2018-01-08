<template>
    <div class="singer">
        
    </div>
</template>

<script>
import {getSingerList} from 'api/singer'
import {ERR_OK} from 'api/config'
import Singer from 'common/js/singer.js'

const HOT_NAME = '热门'
const HOT_SINGER_LEN = 10

export default {
    data () {
        return {
            singers: []
        }
    },
    created () {
        this._getSingerList()
    },
    methods: {
        _getSingerList () {
            getSingerList().then((res) => {
                if (res.code === ERR_OK) {
                    this.singers = res.data.list
                    console.log(this._normalizeSinger(this.singers))
                }
            })
        },
        _normalizeSinger (list) {
            let map = {
                hot: {
                    title: HOT_NAME,
                    items: []
                }
            }
            console.log(map)
             /*
                singers是由下列对象组成的无序数组
                {
                    "Farea": "1",
                    "Fattribute_3": "3",
                    "Fattribute_4": "0",
                    "Fgenre": "0",
                    "Findex": "X",
                    "Fother_name": "Joker",
                    "Fsinger_id": "5062",
                    "Fsinger_mid": "002J4UUk29y8BY",
                    "Fsinger_name": "薛之谦",
                    "Fsinger_tag": "541,555",
                    "Fsort": "1",
                    "Ftrend": "0",
                    "Ftype": "0",
                    "voc": "0"
                }
            */
            list.forEach((item, index) => {
                // 如果歌手清单小于10条的话，那所有歌手都是热门歌手
                if (index < HOT_SINGER_LEN) {
                    map.hot.items.push(new Singer({
                        id: item.Fsinger_mid,
                        name: item.Fsinger_name
                    }))
                }
                /*
                [
                    9: {
                        title: "9",
                        items: []
                    },
                    A: {
                        title: "A",
                        items: []
                    },
                    hot: {
                        title: "热门",
                        items: Array(10)
                    }
                ]
                */
                // 此时，map就是一个上述结构的数组
                const key = item.Findex
                if (!map[key]) {
                    map[key] = {
                        title: key,
                        items: []
                    }
                }
                map[key].items.push(new Singer({
                    id: item.Fsinger_mid,
                    name: item.Fsinger_name
                }))
            })
            console.log(map)
            // 为了得到有序列表，需要处理map
            let hot = []
            let ret = []
            for (let key in map) {
                let val = map[key]
                if (val.title.match(/[a-zA-Z]/)) { // 获取非热门歌手清单
                    ret.push(val)
                } else if (val.title === HOT_NAME) { // 获取热门歌手清单
                    hot.push(val)
                }
            }
            console.log(ret) 
            /*
                [
                    0: {
                        title: "A",
                        items: Array(3)
                    },
                    ...
                    21: {
                        title: "Z",
                        items: Array(15)
                    }
                ]
            */
            ret.sort((a, b) => {
                // 按照A-Z的顺序排列
                return a.title.charCodeAt(0) - b.title.charCodeAt(0)
            })
            return hot.concat(ret)
            console.log(hot)
            /*
                [
                    0: {
                        title: "热门",
                        items: Array(10)
                    },
                    ...
                    22: {
                        title: "Z",
                        items: Array(15)
                    }
                ]
            */
        }
    }
}
</script>

<style lang="scss" scoped>
.singer{
    position: fixed;
    top: 88px;
    bottom: 0;
    width: 100%;
}
</style>


