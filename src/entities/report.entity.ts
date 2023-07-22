import { Entity } from "typeorm"
import { ReportReason } from "./reportReason.entity"

@Entity({name: 'Report'})
export class Report{

    description: string

    reportedAt: Date

    // user: User

    // reply: Reply

    // discussion: Discussion

    reason: ReportReason
}