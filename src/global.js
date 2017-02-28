
export const GAPI_KEY = 'AIzaSyC_HowlHisUiAyQDJCHZlE57eq6onUOXrg'

export const YOUTUBE_SEARCH_API = `https://www.googleapis.com/youtube/v3/search?part=snippet&key=${GAPI_KEY}&videoCategoryId=10&type=video`

export const YOUTUBE_VIDEO_API = `https://www.googleapis.com/youtube/v3/videos?part=snippet&key=${GAPI_KEY}`

export const GOOGLE_LOGIN_API = 'https://www.googleapis.com/auth/plus.login'

export const slugify = str => (str || '').toLowerCase().replace(/\//g, '-').replace(/[^a-zA-Z \- 0-9]+/g, '').replace(new RegExp(' ', 'gi'), '-').replace(/-+/gi, '-')