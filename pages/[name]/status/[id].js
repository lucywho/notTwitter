import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import Tweet from "components/Tweet"
import Link from "next/link"
import { getTweet } from "lib/data.js"
import prisma from "lib/prisma"

export default function SingleTweet({ tweet }) {
    const { data: session, status } = useSession()
    const router = useRouter()
    return (
        <>
            <Tweet tweet={tweet} />
            {session && session.user.email === tweet.author.email && (
                <p> this is your message </p>
            )}
            <Link href="/home">
                <button className="border float-right px-8 py-2 mt-5 mr-10 font-bold rounded-full bg-blue-900 text-white border-blue-900 hover:bg-fuchsia-700 hover:border-fuchsia-700">
                    Home
                </button>
            </Link>
        </>
    )
}

export async function getServerSideProps({ params }) {
    let tweet = await getTweet(params.id, prisma)
    tweet = JSON.parse(JSON.stringify(tweet))

    return {
        props: {
            tweet,
        },
    }
}
