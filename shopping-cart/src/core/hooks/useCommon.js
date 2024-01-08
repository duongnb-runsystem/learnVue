/**
 * Attentive: only use hook in file *.vue
 */

import { storeToRefs } from 'pinia'
import * as store from '@/stores'
import { useRoute, useRouter } from 'vue-router'

const useCommon = (initStoreName) => {
  /**
   * Start handle Common hook store
   * @param storeName
   * @returns
   */
  const getStore = (storeName) => {
    const { [storeName ? storeName : initStoreName]: pinia } = store

    return pinia
  }

  // Get store
  const storeGetters = (storeName) => {
    const store = getStore(storeName)
    const storeData = storeToRefs(store())

    return { ...storeData }
  }

  // Store dispatch an action
  const storeDispatch = (fucDispatch, payload, storeName) => {
    const useStore = getStore(storeName)
    const { [fucDispatch]: action } = useStore()

    action(payload)
  }

  /**
   * Common router
   */
  const route = useRoute()
  const router = useRouter()

  const getRouter = (key) => {
    return route[key]
  }

  const getQuery = () => {
    return getRouter('query')
  }

  const getParams = () => {
    return getRouter('params')
  }

  const handleRouter = {
    // settingConfig: {query, param}
    pushPath: (path, settingConfig = {}, openNewTab = false) => {
      const config = {
        ...{ path },
        ...settingConfig
      }

      if (!openNewTab) {
        router.push({ ...config })
      } else {
        const newRoute = router.resolve(config)
        window.open(newRoute.href)
      }
    },
    replacePath: (path, settingConfig = {}) => {
      const config = {
        ...{ path },
        ...settingConfig
      }

      router.replace({ ...config })
    },
    pushName: (nameRouter, settingConfig, openNewTab = false) => {
      const config = {
        ...{ name: nameRouter },
        ...settingConfig
      }

      if (!openNewTab) {
        router.push({ ...config })
      } else {
        const newRoute = router.resolve(config)
        window.open(newRoute.href)
      }
    }
  }

  return {
    // Store
    storeGetters,
    storeDispatch,

    // Router
    getRouter,
    getQuery,
    getParams,
    handleRouter
  }
}

export default useCommon
