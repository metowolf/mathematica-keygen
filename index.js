const magicNumbers = [10690, 12251, 17649, 24816, 33360, 35944, 36412, 42041, 42635, 44011, 53799, 56181, 58536, 59222, 61041]

const testSalt = (a, b, c) => {
  for (let i = 0; i < 8; i += 1) {
    const t = (b >> i) & 1
    if (t + ((a - t) & ~1) === a) {
      a = (a - t) >> 1
    } else {
      a = ((c - t) ^ a) >> 1
    }
  }

  return a
}

const genPassword = (string, salt) => {
  const uuid = string.split('').map(x => x.charCodeAt())

  let salt1 = salt
  for (let i = uuid.length - 1; i >= 0; i -= 1) {
    salt1 = testSalt(salt1, uuid[i], 0x105C3)
  }

  let offset1 = 0
  while (testSalt(testSalt(salt1, offset1 & 0xFF, 0x105C3), offset1 >> 8, 0x105C3) !== 0xA5B6) {
    offset1 += 1
    if (offset1 >= 0xFFFF) {
      return ''
    }
  }

  offset1 = parseInt(((offset1 + 0x72FA) & 0xFFFF) * 99999 / 0xFFFF, 10)
  offset1 = `0000${offset1}`.substr(-5)

  let salt2 = `${offset1.substr(0, 2)}${offset1.substr(3, 2)}${offset1.substr(2, 1)}`
  salt2 = parseInt(salt2, 10)
  salt2 = parseInt((salt2 / 99999.0) * 0xFFFF, 10) + 1
  salt2 = testSalt(testSalt(0, salt2 & 0xFF, 0x1064B), salt2 >> 8, 0x1064B)
  for (let i = uuid.length - 1; i >= 0; i -= 1) {
    salt2 = testSalt(salt2, uuid[i], 0x1064B)
  }

  let offset2 = 0
  while (testSalt(testSalt(salt2, offset2 & 0xFF, 0x1064B), offset2 >> 8, 0x1064B) !== 0xA5B6) {
    offset2 += 1
    if (offset2 >= 0xFFFF) {
      return ''
    }
  }

  offset2 = parseInt((offset2 & 0xFFFF) * 99999 / 0xFFFF, 10)
  offset2 = `0000${offset2}`.substr(-5)

  const password = [
    offset2[3],
    offset1[3],
    offset1[1],
    offset1[0],
    '-',
    offset2[4],
    offset1[2],
    offset2[0],
    '-',
    offset2[2],
    offset1[4],
    offset2[1],
    '::1'
  ]

  return password.join('')
}

const keygen = (mathID, activationKey = '1234-4321-123456') => {
  const result = []
  for (const magicNumber of magicNumbers) {
    const password = genPassword(`${mathID}$1&${activationKey}`, magicNumber)
    if (password.length > 0) {
      result.push(password)
    }
  }

  return result
}

module.exports = keygen
