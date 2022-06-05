import Image from "next/image"
import timeago from "lib/timeago"
import Link from "next/link"

export default function Tweet({ tweet, nolink }) {
    if (!tweet.author.name) {
        tweet.author.name = "anonymous"
    }

    if (!tweet.author.image) {
        tweet.author.image = `/default.jpg`
    }

    return (
        <div className="ml-10 mr-10 mb-1">
            <div className="flex items-center content-center bg-gradient-to-r from-fuchsia-300 to-blue-300 rounded-lg p-1">
                <p className="mr-2 pt-1 pl-1 ">
                    {tweet.author.image && (
                        <Image
                            className="w-64 h-64 rounded-full"
                            src={tweet.author.image}
                            alt={tweet.author.name}
                            width="65vw"
                            height="65vw"
                        />
                    )}
                </p>
                <div className="container">
                    <div className="flex flex-row items-center">
                        <Link href={`/${tweet.author.name}`}>
                            <p className=" mr-2 hover:underline active:text-blue-500">
                                {tweet.author.name}
                                {": "}
                            </p>
                        </Link>
                        {nolink ? (
                            <span>
                                {timeago.format(new Date(tweet.createdAt))}
                            </span>
                        ) : (
                            <Link
                                href={`/${tweet.author.name}/status/${tweet.id}`}
                            >
                                <p className="mr-2 text-gray-700 hover:underline">
                                    {timeago.format(new Date(tweet.createdAt))}
                                </p>
                            </Link>
                        )}
                    </div>
                    <p className="font-bold">{tweet.content}</p>
                </div>
            </div>
        </div>
    )
}
