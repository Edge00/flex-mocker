# flex-mocker

一个让前端 mock 数据更灵活的 webpack dev server 扩展

## 特点

不需要重启项目即可随时切换请求 mock 数据还是请求代理接口

默认请求本地 mock 数据

通过在地址栏添加 `mode=online` 的 query 即可请求代理（webpack proxy）接口

## 使用方法

```bash
npm install flex-mocker --save-dev
```

安装后在项目下新建一个存放 mock 数据的文件夹

例如一个请求地址为 `api/queryCities`，则在 mock 文件夹下新建 `[mock folder]/api/queryCities.json`

queryCities.json 文件内容：

```json
{
  "code": "0",
  "msg": "success",
  "result": [
    { "city": "beijing", "code": 1 },
    { "city": "shanghai", "upcName": 2 }
  ],
  "success": true
}
```

如果需要对入参做一些逻辑处理则创建 js 文件：

```javascript
const dict1 = [{ type: 1, value: "1" }];

const dict2 = [{ label: "name", value: "1" }];

module.exports = req => {
  // 获取入参
  const { dataType } = req.body;
  return {
    code: "0",
    msg: "success",
    dictionaryList: dataType === 1 ? dict1 : dict2,
    success: true
  };
};
```

配置 webpack 的 `devServer` 使 mock 生效：

```javascript
// webpack 配置文件
const mocker = require('flex-mocker')

devServer: {
  ...
  before: app => {
    mocker({
      mockDir: resolve('./mock'),
      requestPrefixes: ['/api']
    })(app)
  },
  proxy: {
   ...
  }
}
```

## 参数

`mockDir` : mock 文件夹的绝对路径

`requestPrefixes` : 需要进行 mock 的请求 url 前缀

`delay` : 响应延迟，默认值为 0
