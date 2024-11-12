import { configureStore } from "@reduxjs/toolkit"
import { createLogger } from "redux-logger"
import thunkMiddleware from "redux-thunk"
import * as reducers from "./reducers"

const logger = createLogger({
  collapsed: true,
  actionTransformer: (action) => {
    console.log(JSON.stringify(action))
    return action
  },
})

const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger, thunkMiddleware),
})

export default store
