import prisma from "lib/prisma"
import { useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { getTweets } from "lib/data.js"
import NewTweet from "components/NewTweet"
import Tweets from "components/Tweets"
import LoadMore from "components/LoadMore"

export default function Home({ initialTweets }) {
    const { data: session, status } = useSession()
    const loading = status === "loading"
    const router = useRouter()
    const [tweets, setTweets] = useState(initialTweets)

    if (loading) {
        return <p className="text-xl text-blue-900 pt-10 pl-10">...loading</p>
    }

    if (!session) {
        router.push("/")
        return null
    }

    if (session && !session.user.name) {
        router.push("/setup")
        return null
    }
    return (
        <>
            <NewTweet />

            <Tweets tweets={tweets} />

            <LoadMore tweets={tweets} setTweets={setTweets} />
        </>
    )
}

export async function getServerSideProps() {
    const take = 7
    let tweets = await getTweets(prisma, take)
    tweets = JSON.parse(JSON.stringify(tweets))

    return {
        props: {
            initialTweets: tweets,
        },
    }
}
