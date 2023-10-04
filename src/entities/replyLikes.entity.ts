import { Reply } from "./reply.entity"
import { User } from "./user.entity"

export class ReplyLikes{
    
    id: number

    user: User

    reply: Reply
}