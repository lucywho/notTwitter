import { useSession } from "next-auth/react"

export default function NewTweet() {
    const { data: session } = useSession()

    //don't display if we're not logged in
    if (!session) return null

    return <p>form placeholder!</p>
}
