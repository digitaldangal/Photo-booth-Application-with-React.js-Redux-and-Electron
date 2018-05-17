import { createAction } from 'redux-actions'

export default {
  photoCaptured: createAction('PHOTO_CAPTURED'),
  lastPhotoCaptured: createAction('PHOTO_ALL_CAPTURED'),
  SavePrintableImage: createAction('SavePrintableImage')
}
