import { signOut } from "next-auth/react"

export default function SignOut() {
    return (
        <button
            className="float-left ml-2 px-8 py-2 font-bold rounded-full bg-blue-900 text-white border-blue-900 hover:bg-fuchsia-700 hover:border-fuchsia-700"
            onClick={() => signOut()}
        >
            Sign out
        </button>
    )
}
