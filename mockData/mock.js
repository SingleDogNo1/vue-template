const fs = require('fs')
const path = require('path')
const Mock = require('mockjs')

function MockData(app) {
  // 使用mockjs模拟的请求
  app.get('/userList', (req, res) => {
    let data = Mock.mock({
      'userList|1-10': [
        {
          'name|+1': ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
          'sex|+1': ['男', '女'],
          'age|10-100': 10
        }
      ]
    })
    res.json(JSON.parse(JSON.stringify(data, null, 4)))
  })

  // 读取文件中的值
  app.get('/user', function(req, res) {
    fs.readFile(path.resolve(__dirname, './user.json'), 'utf-8', (error, data) => {
      if (error) throw error
      res.json(JSON.parse(data))
    })
  })
}

module.exports = MockData
