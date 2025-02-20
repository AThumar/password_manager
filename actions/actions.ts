
"use server"
import { clerkClient } from '@clerk/nextjs/server'

interface Card {
    cardNo: string;
    expiry: string;
    cvv: number;
}

export async function addCardServer(cardNo: string, expiry: string, cvv: number, userId: string) {

    const client = await clerkClient()
    const user = await client.users.getUser(userId)
    let Card: Card[] = []
    if (Array.isArray(user.privateMetadata.passwords)) {
        Card = user.privateMetadata.passwords || []
        Card.push({ cardNo, expiry, cvv })

    }
    await client.users.updateUserMetadata(userId, {
        privateMetadata: {
            Card: Card || []
        },
    })

}


