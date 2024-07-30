import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        "./src/**/*.{js,ts,jsx,tsx}",
        "./public/index.html",
    ],
    theme: {
        extend: {
            colors: {
                main: 'var(--main-color)',
                submain: 'var(--submain-color)',
                mainv: 'var(--main-vertical)',
                mainh: 'var(--main-horizontal)',
            },
        },
    },
    plugins: [],
}
export default config

  