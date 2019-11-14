import qs from 'qs'
import request from '@/utils/request'

export function HelloWorld() {
  return request({
    url: 'libraries.json'
  })
}

// post 请求示例
export function postRequestEG(data) {
  return request({
    url: 'testURL',
    data: qs.stringify(data)
  })
}

// get 请求示例
export function getRequestEG(params) {
  return request({
    url: 'testURL',
    params: params
  })
}
