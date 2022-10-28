var db = null
export function initIndexDB(key) {
  return new Promise((resolve, reject) => {
    var request = window.indexedDB.open(key, 1)
    request.onerror = function (event) {
      // console.log('数据库打开报错')
      reject()
    }
    request.onsuccess = function (event) {
      db = request.result
      // console.log('数据库打开成功')
      resolve()
    }
    request.onupgradeneeded = function (event) {
      db = event.target.result
      const temp = [
        {
          key: 'userStore',
          params: { keyPath: '_id' }
        },
        {
          key: 'messageStore',
          params: { keyPath: '_id' }
        },
        {
          key: 'latestMsgFetched',
          params: { keyPath: 'userInfo._id' }
        }
      ]
      for (let index = 0; index < temp.length; index++) {
        const item = temp[index]
        if (!db.objectStoreNames.contains(item.key)) {
          const objectStore = db.createObjectStore(item.key, item.params)
          if (item.key === 'messageStore') {
            objectStore.createIndex('chatKey', 'chatKey', {
              unique: false
            })
          }
        }
      }
    }
  })
}

export async function addIndexDB(key, data) {
  var request = await db
    .transaction([key], 'readwrite')
    .objectStore(key)
    .add(data)
  request.onsuccess = function (event) {
    console.log('数据写入成功')
  }
  request.onerror = function (event) {
    console.log('数据写入失败')
  }
}
export function readIndexDB(key, data = 1, index = '') {
  return new Promise((resolve, reject) => {
    var transaction = db.transaction([key])
    var store = transaction.objectStore(key)
    var request = store.get(data)
    request.onerror = function (event) {
      reject()
    }

    request.onsuccess = function (event) {
      if (request.result) {
        resolve(request.result)
      } else {
        resolve(null)
        console.log('未获得数据记录')
      }
    }
  })
}

export function readAllIndexDB(name) {
  var list = []
  var store = db.transaction(name, 'readwrite').objectStore(name)
  return new Promise((resolve, reject) => {
    store.openCursor().onsuccess = function (event) {
      var { result } = event.target
      if (result) {
        list.push(result.value)
        result.continue()
      } else {
        resolve(list)
      }
    }
  })
}
async function getByIndex(table, keyValue, indexCursor) {
  try {
    let db = await this.openDB()
    let store = db.transaction(table.name, 'readonly').objectStore(table.name)
    let keyRng = IDBKeyRange.only(keyValue)
    let request = store.index(indexCursor).openCursor(keyRng)
    let data = []
    return new Promise((resolve) => {
      request.onerror = function (event) {
        reject(false)
      }
      request.onsuccess = function (event) {
        var cursor = event.target.result
        if (cursor) {
          console.log(cursor.value)
          data.push(cursor.value)
          cursor.continue()
        }
      }
      resolve(data)
    })
  } catch (error) {
    return Promise.reject(false)
  }
}
export async function updateIndexDB(key, data) {
  var request = await db
    .transaction([key], 'readwrite')
    .objectStore(key)
    .put(data)

  request.onsuccess = function (event) {
    console.log('数据更新成功')
  }

  request.onerror = function (event) {
    console.log('数据更新失败')
  }
}

export function readAllMsgIndexDB(storeName, indexName = '', indexValue = '') {
  var list = []
  var store = db.transaction(storeName, 'readwrite').objectStore(storeName)
  var request = store
    .index(indexName)
    .openCursor(IDBKeyRange.only(indexValue), 'prev')
  return new Promise((resolve, reject) => {
    request.onsuccess = function (event) {
      var { result } = event.target
      if (result) {
        list.push(result.value)
        result.continue()
      } else {
        resolve(list)
      }
    }
  })
}

export async function closeIndexDB(key) {
  await db.close()
  db = null
}
