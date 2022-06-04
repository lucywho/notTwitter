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
        <div className="pt-10">
            <Tweet tweet={tweet} />
            {session && session.user.email === tweet.author.email && (
                <Link href="#">
                    <button
                        className="float-left mt-5 ml-10 px-8 py-2 font-bold rounded-full hover:bg-blue-300
                        text-blue-900 hover:border-blue-300 bg-fuchsia-300
                        border-fuchsia-300"
                        onClick={async () => {
                            const res = await fetch("/api/tweet", {
                                body: JSON.stringify({
                                    id: tweet.id,
                                }),
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                method: "Delete",
                            })

                            if (res.status === 401) {
                                return <p>Action not authorised</p>
                            }
                            if (res.status === 200) {
                                router.push("/home")
                            }
                        }}
                    >
                        Delete this Tweet
                    </button>
                </Link>
            )}
            <Link href="/home">
                <button className="float-right px-8 py-2 mt-5 mr-10 font-bold rounded-full bg-blue-900 text-white border-blue-900 hover:bg-fuchsia-700 hover:border-fuchsia-700">
                    Home
                </button>
            </Link>
        </div>
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
