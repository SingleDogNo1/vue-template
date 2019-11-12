<template>
  <div class="hello">
    <img src="./1.png" alt="" />
    <br />
    <el-button>el-button</el-button>
    <section v-html="msg"></section>
    <div id="example">这个元素的样式由sass操作并且保存到了全局</div>
    <h1>快速滑动预览懒加载图片效果</h1>
    <ul>
      <li v-for="(item, index) in imgList" :key="index">
        <img v-lazy="item.src" />
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
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
      ]
    }
  },
  mounted() {}
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
