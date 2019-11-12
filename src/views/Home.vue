<template>
  <div class="home">
    <HelloWorld :msg="msg" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld'

export default {
  name: 'home',
  components: {
    HelloWorld
  },
  data() {
    return {
      msg: `
        <div>
          <h1 style="color: red;">
            特别注意：使用之前必须先执行
            <code>git remote rm origin</code>
            再添加自己的远程分支
          </h1>
          <h1>
            运行 <code>npm run build</code> 对比源文件图片的大小和dist文件图片大小
          </h1>
        </div>
      `,
      radio: '1'
    }
  }
}
</script>

<style lang="scss" scoped></style>
