# flex-mocker

A webpack dev server extension to make front end data mock enjoyable

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

If you need to handle some logic from request data. Create a js file :

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
  before: mocker({
    mockDir: path.join(__dirname, './mock'),
    requestPrefixes: ['/api', '/order']
  }),
  proxy: {
   ...
  }
}
```

## Options

`mockDir` : the absolute path of the folder where you put your mock files in.

`requestPrefixes` : request prefix that hit mock.
