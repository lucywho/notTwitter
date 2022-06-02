import Image from "next/image"
import timeago from "lib/timeago"

export default function Tweet({ tweet }) {
    if (!tweet.author.name) {
        tweet.author.name = "anonymous"
    }

    if (!tweet.author.image) {
        tweet.author.image = `/marshmallow.png`
    }

    return (
        <p>
            {tweet.author.image && (
                <Image
                    className="w-64 h-64 rounded-full"
                    src={tweet.author.image}
                    alt={tweet.author.name}
                    width="40"
                    height="40"
                />
            )}
            {timeago.format(new Date(tweet.createdAt))} {": "}
            {tweet.content} {" from "} {tweet.author.name}
        </p>
    )
}
