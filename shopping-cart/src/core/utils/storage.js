import jsCookie from 'js-cookie'

/**
 * Handle get/set/remove Session
 */
export const Session = {
  get: (key, fallbackValue = {}) => {
    if (typeof sessionStorage === 'undefined') {
      return fallbackValue
    }
    const data = sessionStorage.getItem(key)

    try {
      return JSON.parse(data) || fallbackValue
    } catch (error) {
      return data || fallbackValue
    }
  },
  set: (key, value) => {
    sessionStorage.setItem(key, JSON.stringify(value))
  },
  remove: (key) => {
    sessionStorage.removeItem(key)
  }
}

/**
 * Handle get/set/remove LocalStorage
 */
export const LocalStorage = {
  get: (key, fallbackValue = {}) => {
    if (typeof localStorage === 'undefined') {
      return fallbackValue
    }
    const data = localStorage.getItem(key)
    try {
      return JSON.parse(data) ?? fallbackValue
    } catch (e) {
      return data || fallbackValue
    }
  },
  set: (key, value) => {
    localStorage.setItem(key, JSON.stringify(value))
  },
  remove: (key) => {
    localStorage.removeItem(key)
  }
}

/**
 * Handle Cookie (use lib js-cookie)
 * Refer check detail: https://www.npmjs.com/package/js-cookie
 */
export const Cookies = jsCookie.withAttributes({ secure: true })
