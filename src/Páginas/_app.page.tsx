import { SessionProvider } from 'next-auth/react'
import '../lib/dayjs'
import { globalStyles } from '../styles/global'

globalStyles()

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}

export default MyApp
