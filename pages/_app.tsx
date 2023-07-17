import type { AppProps } from "next/app"
import { useState } from "react"
import Head from "next/head"
import { ThemeProvider } from "@mui/material/styles"
import { theme } from "@/lib/theme"
import createCache from "@emotion/cache"
import { CacheProvider } from "@emotion/react"
import { AppBarHeader } from "@/content/AppBar"
import "@/assets/locale.ja.js"
import "../styles/globals.css"


export default function App({ Component, pageProps }: AppProps) {
  // emotionのキャッシュを生成
  const cache = createCache({
    // MuiのコンポーネントCSSに一意の接頭辞を付ける
    key: "css",
    prepend: true,
    // これは不要なAutoPrefixer、IE設定などを無効にする処理
    stylisPlugins: [],
  })

  return (
    <>
      <ThemeProvider theme={theme}>
        <CacheProvider value={cache}>
          <Head>
            <title>dotData Insight</title>
            <meta name="description" content="dotData Insight" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <AppBarHeader>
            <Component {...pageProps} />
          </AppBarHeader>
        </CacheProvider>
      </ThemeProvider>
    </>
  )
}
