export const NONONO = {
  crazy: false,
}
export const IS_DEVELOPMENT = process.env.NODE_ENV === 'development'
export const PARAMS = window.location.search.substr(1).split('&')
export const IS_DEBUG = IS_DEVELOPMENT && PARAMS.includes('debug')

console.log()
