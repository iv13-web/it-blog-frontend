import {ThemeProvider, Typography} from '@mui/material'
import {theme} from './theme/theme'
import {FC} from 'react'
import {Provider} from 'react-redux'
import {store} from './store/store'
import SignIn from './components/SignIn'

export const App: FC = () => {
	return (
		<Provider store={store}>
			<ThemeProvider theme={theme}>
				<SignIn/>
			</ThemeProvider>
		</Provider>
	)
}
