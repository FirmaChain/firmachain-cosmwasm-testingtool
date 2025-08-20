import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { SnackbarProvider } from 'notistack'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'

import App from './App'
import store from './redux/store'

const persistor = persistStore(store)

const container = document.getElementById('root')
const root = createRoot(container!)

root.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <SnackbarProvider
                maxSnack={3}
                style={{ fontSize: '1.2rem' }}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <App />
            </SnackbarProvider>
        </PersistGate>
    </Provider>
)
