import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import Link from "next/link"

export default function Home() {
    const { data: session, status } = useSession()
    const router = useRouter()

    if (status === "loading") {
        return null
    }

    if (session) {
        router.push("/home")
    }

    return <Link href="/api/auth/signin">login</Link>
}
