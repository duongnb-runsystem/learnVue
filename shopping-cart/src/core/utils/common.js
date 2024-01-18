import { storeToRefs } from 'pinia'

import app from '@/main'
import * as store from '@/stores'
import { registerRuntimeCompiler } from 'vue'
import service from '@/services/axios.service'
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

export const processErrorFirebase = (errorCode) => {
  switch (errorCode) {
    case 'auth/invalid-email':
      return 'Email không hợp lệ';
    case 'auth/user-disabled':
      return 'Tài khoản đã bị vô hiệu hóa';
    case 'auth/wrong-password':
    case 'auth/invalid-credential':
      return 'Sai thông tin đăng nhập';
    case 'auth/email-already-in-use':
      return 'Email đã được sử dụng';
    default:
      return 'Đã có lỗi xảy ra';
  }
}

export const formatVND = (value) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
};
export const calculateTotal = (data, includeAdditionalFee) => {
  let sum = 0;
  data.forEach(item => {
    sum += item.price.value * item.quantity;
  });

  if (includeAdditionalFee) {
    sum += 15000;
  }
  return formatVND(sum);
};
export const getIdShopCommon = async () => {
  let url = "https://shopeefood.vn/ho-chi-minh/highlands-coffee-bach-dang";
  let deliveryUrl = url.replace("https://shopeefood.vn/", "");
  let rsIdShop = await service.get(`api/delivery/get_from_url?url=${deliveryUrl}`);
  return rsIdShop.data.reply.delivery_id;
}
export const dataDetailShop = async () => {
  var id = await getIdShopCommon();
  const result = await service.get(`api/delivery/get_detail?id_type=2&request_id=${id}`);
  return result.data.reply.delivery_detail;
}

export const getDataShopCommon = async () => {
  var id = await getIdShopCommon();
  //get menu
  const res = await service.get(`api/dish/get_delivery_dishes?id_type=2&request_id=${id}`);
  return res;
}
