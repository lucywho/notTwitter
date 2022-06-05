export const getTweets = async (prisma, take, cursor) => {
    return await prisma.tweet.findMany({
        where: {
            parent: null, //stops replies showing up in main listing
        },
        orderBy: [
            {
                id: "desc",
            },
        ],
        include: {
            author: true,
        },
        take,
        cursor, //bookmarks location in a result set
        skip: cursor ? 1 : 0, //ensures next set of results starts after the cursor
    })
}

export const getUserTweets = async (name, prisma) => {
    const tweets = await prisma.tweet.findMany({
        where: {
            author: {
                name: name,
            },
            parent: null, //stops replies showing up in profile page
        },
        orderBy: [
            {
                id: "desc",
            },
        ],
        include: {
            author: true,
        },
    })

    return tweets
}

export const getTweet = async (id, prisma) => {
    const tweet = await prisma.tweet.findUnique({
        where: {
            id: parseInt(id),
        },
        include: {
            author: true,
        },
    })

    return tweet
}

export const getReplies = async (id, prisma) => {
    const tweets = await prisma.tweet.findMany({
        where: {
            parent: parseInt(id),
        },
        orderBy: [
            {
                id: "desc",
            },
        ],
        include: {
            author: true,
        },
    })

    return tweets
}
