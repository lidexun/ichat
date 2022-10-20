function dateFormat(t) {
  var nowDate = new Date()
  if (t) {
    // t = t * 1000
    nowDate = new Date(t)
  }
  var year = nowDate.getFullYear()
  var month =
    nowDate.getMonth() + 1 < 10
      ? '0' + (nowDate.getMonth() + 1)
      : nowDate.getMonth() + 1
  var date =
    nowDate.getDate() < 10 ? '0' + nowDate.getDate() : nowDate.getDate()
  var hour =
    nowDate.getHours() < 10 ? '0' + nowDate.getHours() : nowDate.getHours()
  var minute =
    nowDate.getMinutes() < 10
      ? '0' + nowDate.getMinutes()
      : nowDate.getMinutes()
  var second =
    nowDate.getSeconds() < 10
      ? '0' + nowDate.getSeconds()
      : nowDate.getSeconds()
  return year + '-' + month + '-' + date + ' ' + hour + ':' + minute
}

export function transferData(data) {
  const tempData = data
  tempData.contentCopy = tempData.content
  tempData.content = tempData.content
    .replace(/&amp;/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/<br\/>/g, ' ')
  tempData.addtime = dateFormat(data.createTime)
  tempData.timestamp = Math.round(new Date(data.createTime) / 1000)
  return tempData
}
