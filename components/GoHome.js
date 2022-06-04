import { useRouter } from "next/router"

export default function GoHome({}) {
    const router = useRouter()
    return (
        <button
            className="float-right px-8 py-2 mt-5 mr-10 font-bold rounded-full bg-blue-900 text-white border-blue-900 hover:bg-fuchsia-700 hover:border-fuchsia-700"
            onClick={() => router.push("/home")}
        >
            Home
        </button>
    )
}
