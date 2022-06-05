export default function LoadMore({ tweets, setTweets, take }) {
    return (
        <div className="flex py-2">
            <button
                className="float-left px-8 py-2 ml-10 font-bold rounded-full bg-blue-900 text-white border-blue-900 hover:bg-fuchsia-700 hover:border-fuchsia-700"
                onClick={async () => {
                    const lastTweetId = tweets[tweets.length - 1].id

                    const res = await fetch(
                        `/api/tweets?${take}&cursor=${lastTweetId}`
                    )
                    const data = await res.json()

                    setTweets([...tweets, ...data])
                }}
            >
                Load more . . .
            </button>
        </div>
    )
}
