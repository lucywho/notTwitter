import { signOut } from "next-auth/react"

export default function SignOut() {
    return (
        <button
            className="float-left ml-2 px-8 py-2 font-bold rounded-full hover:bg-blue-300 text-blue-900 hover:border-blue-300 bg-fuchsia-300 border-fuchsia-300"
            onClick={() => signOut()}
        >
            Sign out
        </button>
    )
}
