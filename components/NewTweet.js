import { useState } from "react"
import { useRouter } from "next/router"
import { useSession } from "next-auth/react"
import SignOut from "./SignOut"

export default function NewTweet() {
    const [content, setContent] = useState("")
    const { data: session } = useSession()
    const router = useRouter()

    if (!session || !session.user) return null

    return (
        <form
            onSubmit={async (e) => {
                e.preventDefault()

                if (!content) {
                    let error = "no content"

                    return <p>{error}</p>
                }
                await fetch("/api/tweet", {
                    body: JSON.stringify({
                        content,
                    }),
                    headers: {
                        "Content-Type": "application/json",
                    },
                    method: "POST",
                })
                router.reload(window.location.pathname)
            }}
        >
            <div className="flex ml-10 mr-10">
                <div className="flex-1 px-1 pt-2 mt-2 mr-1 ml-1">
                    <textarea
                        className="border-2 border-fuchsia-300 rounded-md p-4 w-full text-lg font-medium bg-fuchsia-100"
                        rows={2}
                        cols={50}
                        placeholder="What's happening?"
                        name="content"
                        onChange={(e) => setContent(e.target.value)}
                    />
                </div>
            </div>
            <div className="flex">
                <div className="flex-1 m-10 mt-5 mr-10">
                    <button className="border float-right px-8 py-2 mt-0 mr-2 font-bold rounded-full bg-blue-900 text-white border-blue-900 hover:bg-fuchsia-700 hover:border-fuchsia-700">
                        notTweet
                    </button>
                    <SignOut />
                </div>
            </div>
        </form>
    )
}
