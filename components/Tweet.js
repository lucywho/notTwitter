import timeago from "lib/timeago"

export default function Tweet({ tweet }) {
    if (!tweet.author.name) {
        tweet.author.name = "anonymous"
    }

    return (
        <p>
            {timeago.format(new Date(tweet.createdAt))} {": "}
            {tweet.content} {" from "} {tweet.author.name}
        </p>
    )
}
