import { defineConfig, presetWind4, presetIcons } from 'unocss'

export default defineConfig({
    // ...UnoCSS options
    rules: [
        ['m-50' , { margin: '50px' }],
    ],
    presets: [
        presetWind4({}),
        presetIcons({}),
    ]
})