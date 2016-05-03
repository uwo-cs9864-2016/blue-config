# blue-config

Config library for loading `config.*.json` where `*` is either `bluemix` or `local`. This allows a library to test easily between locally and `bluemix`. 

## Example

The configuration JSON file is parsed. The `locals` property is loaded into the `locals` property of the result. 

```js
// load a configuration and pass a folder where `config.bluemix.json` and `config.local.json` 
// lives. Must be specified
const cfg = require('blue-config')(__dirname + '/config');

const util = require('util');

console.log('cfg = %s', util.inspect(cfg, { deep: true }));
```
