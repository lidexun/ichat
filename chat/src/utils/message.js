export function dateFormat(t) {
  var nowDate = new Date()
  if (t) {
    // t = t * 1000
    nowDate = new Date(t * 1000)
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
export function timestamp(t) {
  return Math.round(new Date(t) / 1000)
}
export function transferData(data) {
  const tempData = data
  tempData.contentCopy = tempData.content
    .replace(/&amp;/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/<br\/>/g, ' ')
  tempData.contentHTML = tempData.content
  tempData.addtime = dateFormat(data.createTime)
  tempData.timestamp = data.createTime
  return tempData
}
