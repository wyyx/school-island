const arr = [
  {
    id: 27,
    categoryType: 5,
    categoryName: '值周礼仪',
    itemType: 7,
    itemName: '2019年第25周礼仪扣分排名Top10',
    result: {
      keyDes: {
        '1': '2017级3班',
        '2': '2016级1班',
        '3': '2017级1班',
        '4': '2017级4班',
        '5': '2017级2班',
        '6': '2018级1班'
      },
      valueDes: {},
      data: {
        sum: 0,
        detail: {
          '1': -3,
          '2': -9.2,
          '3': -6.3,
          '4': -0.4,
          '5': -0.5,
          '6': -9.4
        }
      }
    },
    createTime: '2019-06-20 12:07:57',
    updateTime: '2019-06-20 12:23:39'
  },
  {
    id: 28,
    categoryType: 5,
    categoryName: '值周文明',
    itemType: 7,
    itemName: '2019年第25周文明扣分排名Top10',
    result: {
      keyDes: { '1': '2017级3班', '2': '2018级1班' },
      valueDes: {},
      data: { sum: 0, detail: { '1': -4, '2': -15.5 } }
    },
    createTime: '2019-06-20 12:07:57',
    updateTime: '2019-06-20 12:23:41'
  },
  {
    id: 29,
    categoryType: 5,
    categoryName: '值周两操',
    itemType: 7,
    itemName: '2019年第25周两操扣分排名Top10',
    result: {
      keyDes: { '1': '2017级3班', '2': '2017级1班', '3': '2018级1班' },
      valueDes: {},
      data: { sum: 0, detail: { '1': -2, '2': -1, '3': -1.7 } }
    },
    createTime: '2019-06-20 12:07:57',
    updateTime: '2019-06-20 12:23:44'
  },
  {
    id: 30,
    categoryType: 5,
    categoryName: '值周卫生',
    itemType: 7,
    itemName: '2019年第25周卫生扣分排名Top10',
    result: {
      keyDes: { '1': '2018级1班' },
      valueDes: {},
      data: { sum: 0, detail: { '1': -6.2 } }
    },
    createTime: '2019-06-20 12:07:57',
    updateTime: '2019-06-20 12:23:47'
  },
  {
    id: 31,
    categoryType: 5,
    categoryName: '值周纪律',
    itemType: 7,
    itemName: '2019年第25周纪律扣分排名Top10',
    result: {
      keyDes: { '1': '2017级3班' },
      valueDes: {},
      data: { sum: 0, detail: { '1': -5 } }
    },
    createTime: '2019-06-20 12:07:57',
    updateTime: '2019-06-20 12:23:50'
  }
]

const aaa = arr.map(e => {
  const resultArr = []

  const result = e['result']

  const nameKeys = Object.keys(result.keyDes)
  const valueKeys = Object.keys(result.data.detail)

  nameKeys.forEach(key => {
    resultArr.push({
      className: result.keyDes[key],
      classDesc: result.data.detail[key]
    })
  })

  return {
    ...e,
    result: {
      ...result,
      resultArr
    }
  }
})

console.log('TCL: aaa', JSON.stringify(aaa))
