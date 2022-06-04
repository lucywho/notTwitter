import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import Link from "next/link"
import Tweets from "components/Tweets"
import prisma from "lib/prisma"
import { getTweets } from "lib/data"

export default function Welcome({ tweets }) {
    const { data: session, status } = useSession()
    const router = useRouter()

    if (status === "loading") {
        return <p className="text-xl text-blue-900 pt-10 pl-10">...loading</p>
    }

    if (session) {
        router.push("/home")
    }

    return (
        <div className="flex flex-col justify-center items-center text-center p-10">
            <p className="text-6xl text-blue-900">Welcome to NotTwitter</p>
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
            <div className="pt-10 w-full mx-10">
                <Tweets tweets={tweets} />
            </div>
        </div>
    )
}

export async function getServerSideProps() {
    const take = 3
    let tweets = await getTweets(prisma, take)
    tweets = JSON.parse(JSON.stringify(tweets))

    return {
        props: {
            tweets,
        },
    }
}
