export const localStorageMiddleware = (store: any) => (next: any) => (action: any) => {
	return next(action)
}