import {css} from 'glamor'

import regularFont from './Fonts/Montserrat-Regular.ttf'
import boldFont from './Fonts/Montserrat-Bold.ttf'

export const MontserratRegular = css.fontFace({
  fontFamily: 'Montserrat-Regular',
  fontStyle: 'normal',
  src: `url(${regularFont})`
})

export const MontserratBold = css.fontFace({
  fontFamily: 'Montserrat-Bold',
  fontStyle: 'Bold',
  src: `url(${boldFont})`
})