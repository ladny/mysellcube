import storage from 'good-storage'

const SELLER_KEY = '__seller__'

// 存 区分商家id 不同功能收藏 key 值value
export function saveToLocal(id, key, val) {
  const seller = storage.get(SELLER_KEY, {})
  if (!seller[id]) {
    seller[id] = {}
  }
  seller[id][key] = val
  storage.set(SELLER_KEY, seller)
}

// 取 def表示默认值
export function loadFromLocal(id, key, def) {
  const seller = storage.get(SELLER_KEY, {})
  if (!seller[id]) {
    return def
  }
  return seller[id][key] || def
}
