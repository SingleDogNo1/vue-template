<template>
  <div class="hello">
    <img src="./1.png" alt="" />
    <br />
    <br />
    <hr />
    <br />
    <br />
    <section v-html="msg"></section>
    <br />
    <br />
    <hr />
    <br />
    <br />
    <div>默认添加了element-ui并修改了基础色，详情查看文档</div>
    <el-button>el-button</el-button>
    <br />
    <br />
    <hr />
    <br />
    <br />
    <div id="example">这个元素的样式由sass操作并且保存到了全局</div>
    <br />
    <br />
    <hr />
    <br />
    <br />
    <ul>
      <li>
        <h1>
          通过nodeJs可以启用本地服务，自己启用接口。可以保证不和server联调的情况下完成开发任务。配合mockjs使用有奇效。下面的数据是从localhost:8080/test/api得到的
        </h1>
      </li>
      <li v-for="(item, index) in userList" :key="index">
        <span>姓名：{{ item.name }}</span>
        <span>性别：{{ item.sex }}</span>
        <span>年龄：{{ item.age }}</span>
      </li>
    </ul>
    <br />
    <br />
    <hr />
    <br />
    <br />
    <section>
      <header>
        下面的内容是请求得到的所有 <a href="https://www.bootcdn.cn/api/">bootcdn</a>收录的开源库
      </header>
      <footer>
        <ul :style="{ display: 'flex', 'flex-wrap': 'wrap' }">
          <li
            v-for="(item, index) in exampleAxios"
            :key="index"
            :style="{ margin: '0 5px', 'line-height': 2 }"
          >
            {{ item[0] }}
          </li>
        </ul>
      </footer>
    </section>
    <br />
    <br />
    <hr />
    <br />
    <br />
    <h1>快速滑动预览懒加载图片效果</h1>
    <ul>
      <li v-for="(item, index) in imgList" :key="index">
        <img v-lazy="item.src" />
      </li>
    </ul>
    防抖函数示例 --- 1s
    <input type="text" v-model="eg" />
    <br />
    <div>{{ egeg }}</div>
  </div>
</template>

<script>
import { HelloWorld } from '@/api/HelloWorld'
import { debounce } from '@/utils'
import mixin from '@/vue-mixins/exampleMixins'
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  mixins: [mixin],
  data() {
    return {
      user: {},
      userList: [],
      imgList: [
        {
          alt: 'test0.jpg',
          src: require('./test0.jpg')
        },
        {
          alt: 'test1.jpg',
          src: require('./test1.jpg')
        },
        {
          alt: 'test2.jpg',
          src: require('./test2.jpg')
        },
        {
          alt: 'test3.jpg',
          src: require('./test3.jpg')
        }
      ],
      exampleAxios: [],
      eg: '',
      egeg: ''
    }
  },
  watch: {
    eg: debounce(function(value) {
      this.egeg = value
    }, 1000)
  },
  methods: {
    async init() {
      await axios.get('/userList').then(({ data }) => {
        this.userList = data.userList
      })
      await axios.get('/user').then(({ data }) => {
        console.log(data)
      })
      await HelloWorld().then(({ data }) => {
        this.exampleAxios = data
      })
    }
  },
  mounted() {
    this.init()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#example {
  @include radiusCube(300px);
  padding: 50px;
  background: $--test-color-red;
  color: $--test-color-white;
  @include center;
}
</style>
