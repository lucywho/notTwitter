import prisma from "lib/prisma"
import { getSession } from "next-auth/react"
const logger = require("pino")()

export default async function handler(req, res) {
    const session = await getSession({ req })

    if (!session) return res.end()

    if (req.method === "POST") {
        const userExists = await prisma.user.findMany({
            where: {
                name: req.body.name,
            },
        })

        if (userExists.length) {
            let error = "user exists"
            return res.status(409).json(error)
        } else {
            logger.info({ email: session.user.email })
            try {
                await prisma.user.update({
                    where: { email: session.user.email },
                    data: {
                        name: req.body.name,
                    },
                })
                res.end()
            } catch (error) {
                console.log(error)
            }
        }
    }
}
