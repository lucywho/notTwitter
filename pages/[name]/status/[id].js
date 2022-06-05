import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import prisma from "lib/prisma"
import { getTweet, getReplies } from "lib/data.js"
import Tweet from "components/Tweet"
import Tweets from "components/Tweets"
import NewReply from "components/NewReply"
import GoHome from "components/GoHome"

export default function SingleTweet({ tweet, replies }) {
    const { data: session, status } = useSession()
    const router = useRouter()

    if (typeof window !== "undefined" && tweet.parent) {
        router.push(`/${tweet.author.name}/status/${tweet.parent}`)
    }

    return (
        <div className="pt-10">
            <Tweet tweet={tweet} />
            <NewReply tweet={tweet} />
            <div className="ml-10 border-l-blue-300 border-l-2 ">
                <Tweets tweets={replies} nolink={true} />
            </div>
            {session && session.user.email === tweet.author.email && (
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
            )}

            <GoHome />
        </div>
    )
}

export async function getServerSideProps({ params }) {
    let tweet = await getTweet(params.id, prisma)
    tweet = JSON.parse(JSON.stringify(tweet))

    let replies = await getReplies(params.id, prisma)
    replies = JSON.parse(JSON.stringify(replies))

    return {
        props: {
            tweet,
            replies,
        },
    }
}
