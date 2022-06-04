import prisma from "lib/prisma"
import { getUserTweets } from "lib/data"

import Tweets from "components/Tweets"
import GoHome from "components/GoHome"

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

            <GoHome />
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
