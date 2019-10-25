<template>
  <div id="app">
    <el-button>el-button</el-button>
    <HelloWorld :msg="msg" />
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'app',
  components: {
    HelloWorld
  },
  data() {
    return {
      msg: `<strong style="color: red;">特别注意：使用之前必须先执行<code>git remote rm origin</code>再添加自己的远程分支</strong>`,
      radio: '1'
    }
  }
}
</script>

<style></style>
