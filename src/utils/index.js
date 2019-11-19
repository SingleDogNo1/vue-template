import { debounce, throttle } from './throttle'

export {
  uuid, // 生成随机不重复的字符串
  timeCountDown, // 格式化时间 && 倒计时
  sendFormAjax, // 发送form表单请求
  browser, // 浏览器UA速查表
  getQueryParameter, // 获取字符串中query的值
  removeArrValue, // 删除数组中的值
  flatten, // 多维数组降成一维数组(避免flat不兼容)
  hex2RGB, // 16进制颜色转rgb
  RGB2Hex, // rgb转16进制
  debounce, // 防抖
  throttle, // 节流
  compare // 对象按照某个键值排序
}

// uuid() => "621dc209-1371-4602-97a5-04c913acc274"
function uuid() {
  let s = []
  let hexDigits = '0123456789abcdef'
  for (let i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
  }

  s[14] = '4'
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1)
  s[8] = s[13] = s[18] = s[23] = '-'
  return s.join('')
}

/**
 * 格式化时间倒计时(将XXX秒格式化为X天 HH:MM:DD，status为0，倒计时停止)
 * @param t {string | number} 倒计时时间
 * @param status {number} 为0时只读一次，不会每秒倒计时
 * @param callback {function} 成功回调
 * @callback data
 * @example
 * timeCountDown(1000, 1, data => {
 *   console.log(data)
 * })
 */
function timeCountDown(t, status = 0, callback = () => {}) {
  let d = (t - (t % 86400)) / 86400
  let h = ((t - (t % 3600)) / 3600) % 24
  let i = ((t - (t % 60)) / 60) % 60
  let s = t % 60
  let time = ''
  if (d > 0) {
    time += d + '天'
  }
  time += h < 10 ? '0' + h + ':' : h + ':'
  time += i < 10 ? '0' + i + ':' : i + ':'
  time += s < 10 ? '0' + s : s
  callback(time)
  if (status === 0) return
  let timeOut = null
  t--
  if (t >= 0) {
    timeOut = setTimeout(() => {
      timeCountDown(t, status, callback)
    }, 1000)
  } else {
    clearTimeout(timeOut)
  }
}

/**
 * 发送form表单请求
 * @param {string} url 请求发送地址
 * @param {object} params 请求数据
 * @param {string} target 是否在新的页面打开
 * @example
 * sendFormAjax('http:www.baidu.com', {
 *  name: 'singleDogNo.1',
 *  sex: 1
 * }, '_black')
 */
function sendFormAjax(url, params, target) {
  let tempForm = document.createElement('form')
  tempForm.setAttribute('name', 'form')
  tempForm.action = url
  tempForm.method = 'post'
  tempForm.style.display = 'none'
  if (target) {
    tempForm.target = target
  }
  for (let x in params) {
    let opt = document.createElement('input')
    opt.name = x
    opt.value = params[x]
    tempForm.appendChild(opt)
  }
  let opt = document.createElement('input')
  opt.type = 'submit'
  opt.setAttribute('id', '_submit')
  tempForm.appendChild(opt)
  document.body.appendChild(tempForm)
  tempForm.submit()
  document.body.removeChild(tempForm)
}

// 浏览器UA速查表
const browser = {
  versions: (function() {
    let u = navigator.userAgent
    return {
      trident: u.includes('Trident'), // IE内核
      presto: u.includes('Presto'), // opera内核
      webKit: u.includes('AppleWebKit'), // 苹果、谷歌内核
      gecko: u.includes('Gecko') && !u.includes('KHTML'), // 火狐内核
      mobile: !!u.match(/AppleWebKit.*Mobile.*/), // 是否为移动终端
      ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ios终端
      android: u.includes('Android') || u.includes('Adr'), // android终端
      iPhone: u.includes('iPhone'), // 是否为iPhone或者QQHD浏览器
      iPad: u.includes('iPad'), // 是否iPad
      wx: u.includes('MicroMessenger'), // 是否微信
      qq: u.match(/\sQQ/i) === ' qq' // 是否QQ
    }
  })(),
  language: (navigator.browserLanguage || navigator.language).toLowerCase()
}

// getQueryParameter('http://localhost:8080/#/home?id=1&name=2&sex=3', 'name') => 2
function getQueryParameter(url = window.location.href, name) {
  let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
  let params = url.substr(url.indexOf('?') + 1)
  let r = params.match(reg)
  if (r != null) return decodeURIComponent(r[2])
  return ''
}

// removeArrValue(['a', 'b', 'c'], 'b') => ['a', 'c']
function removeArrValue(arr, val) {
  for (let i = 0; i < arr.length; i++) {
    // 处理数字
    if (arr[i].toString() == val.toString()) {
      arr.splice(i, 1)
      break
    }
  }
}

// flatten([1,[2,3,[4,5]]]) => [1,2,3,4,5]
function flatten(arr) {
  let res = []
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      res = res.concat(flatten(arr[i]))
    } else {
      res.push(arr[i])
    }
  }
  return res
}

// hex2RGB('#ace') => rgb(170,204,238)
function hex2RGB(hex) {
  const rgb = []
  hex = hex.substr(1)
  if (hex.length === 3) {
    hex = hex.replace(/(.)/g, '$1$1')
  }
  hex.replace(/../g, function(color) {
    rgb.push(parseInt(color, 0x10))
  })

  return `rgb(${rgb.join(',')})`
}

// RGB2Hex('rgb(170,204,238)') => '#aaccee'
function RGB2Hex(rgb) {
  const color = rgb.toString().match(/\d+/g)
  let hex = '#'
  for (let i = 0; i < 3; i++) {
    hex += ('0' + Number(color[i]).toString(16)).slice(-2)
  }
  return hex
}

/**
 * 对象按照某个键值排序
 * @param {*} property 比对的参数
 * @param {number} mode 升序 1 or 降序 -1
 * @return {Function}
 * @example
 ** res = [{name: 'a', age: 20},{name: 'b', age: 10}]
 ** res.sort(compare('age')) => [{name: 'b', age: 10},{name: 'a', age: 20}]
 */
function compare(property, mode = -1) {
  return function(obj1, obj2) {
    let [value1, value2] = [obj1[property], obj2[property]]
    if (mode === 1) {
      return value1 - value2
    } else {
      return value2 - value1
    }
  }
}
