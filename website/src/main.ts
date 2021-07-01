import App from './App.svelte';
import init from '../public/build/wasm_parser'

const app = new App({
	target: document.body,
	props: {
		name: 'world'
	}
});

init().then(() => {
    console.debug('WASM loaded')
})

export default app;