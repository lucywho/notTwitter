import prisma from "lib/prisma"
import { getUserTweets } from "lib/data"
import Link from "next/link"

import Tweets from "components/Tweets"

export default function UserProfile({ name, tweets }) {
    let tweeted = tweets.length > 0

    return (
        <>
            {tweeted && (
                <>
                    <p className="text-center p-5">User profile of {name}</p>

                    <Tweets tweets={tweets} />
                </>
            )}
            {!tweeted && (
                <>
                    <p className="text-center p-5">
                        Sorry, {name} has never tweeted
                    </p>
                </>
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
    let tweets = await getUserTweets(params.name, prisma)
    tweets = JSON.parse(JSON.stringify(tweets))
    return {
        props: {
            name: params.name,
            tweets,
        },
    }
}
