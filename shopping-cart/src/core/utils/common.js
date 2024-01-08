import { storeToRefs } from 'pinia'

import app from '@/main'
import * as store from '@/stores'

/**
 * Create instance router
 * Use in file *.js. If want to use function "handleRouter" in *.vue => /hooks/commom.ts
 * @props Object ex: {path: '/', query: {name: 'a'}}
 * @newTab Boolean => open new tab or not
 */
export const $router = {
  push(props, newTab = false) {
    if (!newTab) {
      app.config.globalProperties.$router.push({ ...props })
    } else {
      const newRoute = app.config.globalProperties.$router.resolve(props)
      window.open(newRoute.href)
    }
  },
  replace(props) {
    app.config.globalProperties.$router.replace({ ...props })
  },
  allConfig() {
    return app.config.globalProperties.$router
  }
}

/**
 * Create instance store
 * Use in file *.js. If want to use function in *.vue => /hooks/commom.js
 * @storeName Name of store file export default
 * @fucDispatch Name of actions in file store
 * @payload Data pass to actions handle
 */
export const $store = {
  getStore(storeName) {
    const { [storeName]: targetStore } = store

    return targetStore
  },
  getter(storeName) {
    const useStore = this.getStore(storeName)
    const storeData = storeToRefs(useStore())

    return { ...storeData }
  },
  dispatch(storeName, fucDispatch, payload) {
    const useStore = this.getStore(storeName)
    const { [fucDispatch]: action } = useStore()

    action(payload)
  }
}

// Check value is not exists
export const isNullOrEmpty = (value) => {
  return (value ?? '') === ''
}

/**
 * @param params object payload to call api
 * @param notRequired type string[] => keys want not check empty or null
 * @returns If payload have value null/empty will return false => not access to call api
 */
export const validParams = (params, notRequired) => {
  if (params) {
    const objClone = { ...params }
    notRequired?.map((p) => {
      delete objClone[p]
    })
    const notOk = Object.values(objClone).some(
      (d) => (typeof d === 'number' && isNaN(d)) || isNullOrEmpty(d)
    )
    if (!notOk) {
      return true
    }
  }

  return false
}

/**
 * Sleep
 * @param {*} ms type Number
 * @returns
 */
export const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * Remove duplicates in array
 * @param {*} arr <T = string | number> => arr: T[]
 * @returns
 */
export const removeDuplicates = (arr) => {
  const s = new Set(arr)
  const it = s.values()

  return Array.from(it)
}

export const convertFileToBase64 = (file, callback) => {
  const reader = new FileReader()
  reader.onload = () => {
    const _bs64 = reader.result
    callback(_bs64)
  }
  reader.onerror = () => {
    callback(null)
  }
  reader.readAsDataURL(file)
}

export const scrollToTop = () => {
  const target = document.documentElement.scrollTop || document.body.scrollTop
  if (target > 0) {
    window.requestAnimationFrame(scrollToTop)
    window.scrollTo(0, target - target / 8)
  }
}
