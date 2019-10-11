<div>
    <a href="https://npmcharts.com/compare/webpack?minimal=true">
        <img src="https://img.shields.io/npm/dm/flex-mocker.svg">
    </a>
    <a href="https://packagephobia.now.sh/result?p=webpack">
        <img src="https://packagephobia.now.sh/badge?p=flex-mocker" alt="install size">
    </a>
</div>

# flex-mocker

[中文](https://github.com/Edge00/flex-mocker/blob/master/README.zh-CN.md)

A webpack dev server extension to make front end data mock more flexible

## Feature

Use url to control whether to use mock.

if you have proxy config in your webpack. you can easily switch mock or proxy server by adding or removing `mode=online` search in url.

## usage

```bash
npm install flex-mocker --save-dev
```

Then create your mock folder in your project.

For example: a request for `api/queryCities`. create a `queryCities.json` or `queryCities.js` file in the mock folder

Json file :

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

If you need to handle some logic from request data. Create a .js file :

```javascript
const dict1 = [{ type: 1, value: "1" }];

const dict2 = [{ label: "name", value: "1" }];

module.exports = req => {
  const { dataType } = req.body;
  return {
    code: "0",
    msg: "success",
    dictionaryList: dataType === 1 ? dict1 : dict2,
    success: true
  };
};
```

Enable mock in your webpack dev server config :

```javascript
// your webpack config file
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

## Options

`mockDir` : the absolute path of the folder where you put your mock files in.

`requestPrefixes` : request prefix that hit mock.

`delay` : response delay. default value is 0.
