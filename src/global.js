
import {GAPI_KEY} from './config/gapi'


/**
 * youtube data Api : to search youtube.
 * @param {string} part
 * @param {string} key(GAPI_KEY)
 * @param {string} type(video)
 * @param {int} maxResults
 */
export const YOUTUBE_SEARCH_API = `https://www.googleapis.com/youtube/v3/search?part=snippet&key=${GAPI_KEY}&type=video&maxResults=6`

/**
 * youtube data Api : to query details of a video based on its video ID
 */
export const YOUTUBE_VIDEO_API = `https://www.googleapis.com/youtube/v3/videos?part=snippet&key=${GAPI_KEY}`

/**
 * @URL GOOGLE LOGIN API URL
 */
export const GOOGLE_LOGIN_API = 'https://www.googleapis.com/auth/plus.login'

/**
 * @function slugify
 * @param {string} str
 * @return {string} slugified-string
 */
export const slugify = str => (str || '').toLowerCase().replace(/\//g, '-').replace(/[^a-zA-Z \- 0-9]+/g, '').replace(new RegExp(' ', 'gi'), '-').replace(/-+/gi, '-')

/**
 * @function getRandomNumber
 * @param {int} min
 * @param {int} max
 * @returns a random number between the given range.
 */
export const getRandomNumber = (min, max) => {
        const number = Math.floor(Math.random() * (max - min + 1)) + min

        return number
}