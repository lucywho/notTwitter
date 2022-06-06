import { useState } from "react"
import { useRouter } from "next/router"
import { useSession } from "next-auth/react"

export default function Setup() {
    const router = useRouter()
    const { data: session, status } = useSession()
    const loading = status === "loading"
    const [name, setName] = useState("")
    const [nameExists, setNameExists] = useState(false)

    if (!session || !session.user) return null
    if (loading)
        return <p className="text-xl text-blue-900 pt-10 pl-10">...loading</p>

    if (!loading && session.user.name && !nameExists) {
        router.push("/home")
    }

    return (
        <form
            className="pt-10 ml-20"
            onSubmit={async (e) => {
                e.preventDefault()
                const userName = await fetch("api/setup", {
                    body: JSON.stringify({
                        name,
                    }),
                    headers: {
                        "Content-Type": "application/json",
                    },
                    method: "POST",
                })

                session.user.name = name

                if (userName.ok) {
                    setNameExists(false)
                    router.push("/home")
                }
                setNameExists(true)
            }}
        >
            <div className="flex-1 mb-5">
                <div className="flex-1 mb-5">Choose a username</div>
                <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border p-1"
                />
                {nameExists && (
                    <p>
                        The name <span className="text-blue-900">{name}</span>{" "}
                        is already in use, please choose another
                    </p>
                )}
            </div>

            <button className="border float-left px-8 py-2 mt-5 mr-10 font-bold rounded-full bg-blue-900 text-white border-blue-900 hover:bg-fuchsia-700 hover:border-fuchsia-700">
                Save
            </button>
        </form>
    )
}
