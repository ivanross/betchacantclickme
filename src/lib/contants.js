export const NONONO = {
  crazy: false,
}

export const FOOTER_HEIGHT = 40

export const IS_DEVELOPMENT = process.env.NODE_ENV === 'development'
export const PARAMS = window.location.search.substr(1).split('&')
export const IS_DEBUG = IS_DEVELOPMENT && PARAMS.includes('debug')
export const SHOULD_CLEANUP = IS_DEVELOPMENT && PARAMS.includes('cleanup')
