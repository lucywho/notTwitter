import timeago from "lib/timeago"

export default function Tweets({ tweet }) {
    return (
        <p>
            {timeago.format(new Date(tweet.createdAt))} {": "}
            {tweet.content} {" from "} {tweet.author.email}
        </p>
    )
}
