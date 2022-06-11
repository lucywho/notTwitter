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
                    <p className="text-center p-5">
                        User profile:{" "}
                        <span className="font-bold text-blue-900">{name}</span>
                    </p>

                    <Tweets tweets={tweets} />
                </>
            )}
            {!tweeted && (
                <>
                    <p className="text-center p-5 text-fuchsia-900">
                        Sorry, {name} has never notTweeted
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

    console.log(params.name)
    return {
        props: {
            name: params.name,
            tweets,
        },
    }
}
