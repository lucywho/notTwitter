import "../styles/globals.css"
import { SessionProvider } from "next-auth/react"

function MyApp({ Component, pageProps }) {
    return (
        <div className="bg-gradient-to-l from-fuchsia-200 to-blue-200 min-h-screen">
            <SessionProvider session={pageProps.session}>
                <Component {...pageProps} />
            </SessionProvider>
        </div>
    )
}

export default MyApp
