# mathematica keygen

<p align="center">
<img src="https://user-images.githubusercontent.com/2666735/59565045-c19cc080-9080-11e9-9e54-c305213c6773.png" alt="Meting">
</p>


## Install

```
$ npm install mathematica-keygen
```

## Version

|version|Wolfram Mathematica|
|---|---|
|^12|12.0.0.0 - 12.0.0.0|

## API

### keygen(mathID, [activationKey])

Returns password `array`.

#### mathID

Type: `string`  

`dddd-ddddd-ddddd`

#### activationKey

Type: `string`  
Default: `1234-4321-123456`  

## Usage

```js
const keygen = require('mathematica-keygen');

keygen('0000-00000-00000', '1234-4321-123456');
/*
[
  '2839-935-275::1',
  '8688-857-009::1',
  '4002-675-360::1',
  '1413-944-832::1',
  '6176-312-246::1',
  '9783-667-367::1',
  '4031-456-684::1',
  '9019-580-294::1',
  '8302-753-286::1',
  '5632-729-483::1',
  '4599-309-861::1',
  '5153-290-836::1',
  '2551-822-716::1',
  '1070-597-010::1',
  '3750-206-250::1'
]
*/
```

## License

MIT © [metowolf](https://i-meto.com/)
