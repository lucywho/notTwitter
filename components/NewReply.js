import { useRouter } from "next/router"
import { useState } from "react"

export default function NewReply({ tweet }) {
    const router = useRouter()
    const [reply, setReply] = useState("")

    return (
        <form
            className="flex mx-10 my-2"
            onSubmit={async (e) => {
                e.preventDefault()

                if (!reply) {
                    return (
                        <p className="text-center text-fuschsia-800">
                            You cannot post a blank reply
                        </p>
                    )
                }

                const res = await fetch("/api/tweet", {
                    body: JSON.stringify({
                        parent: tweet.id,
                        content: reply,
                    }),
                    headers: {
                        "Content-Type": "application/json",
                    },
                    method: "POST",
                })
                router.reload(window.location.pathname)
            }}
        >
            <textarea
                className="border-2 border-fuchsia-300 rounded-md p-4 w-full text-lg font-medium bg-fuchsia-100"
                rows={1}
                cols={50}
                placeholder="Tweet your reply"
                onChange={(e) => setReply(e.target.value)}
            />
            <button className="ml-5 px-4  font-bold text-xs rounded-full hover:bg-blue-900 text-white hover:border-blue-900 bg-fuchsia-700 border-fuchsia-700">
                Reply
            </button>
        </form>
    )
}
