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

    return (
        <div className="flex flex-col justify-center items-center text-center p-10">
            <p className="text-6xl text-blue-900">
                Welcome to (very much) NotTwitter
            </p>
            <p className="text-4xl text-blue-900 pt-10">
                To join the conversation, click login and verify your email
                address
            </p>

            <div className="flex justify-center mt-10">
                <Link href="/api/auth/signin">
                    <button className="px-8 py-2 font-bold rounded-full bg-blue-900 text-white border-blue-900 hover:bg-fuchsia-700 hover:border-fuchsia-700">
                        Login
                    </button>
                </Link>
            </div>
        </div>
    )
}
