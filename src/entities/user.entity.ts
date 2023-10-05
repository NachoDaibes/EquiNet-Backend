
import { Type } from "src/entities/type.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserStatus } from "./userStatus.entity";
import { LegalPerson } from "./legalPerson.entity";
import { IndividualPerson } from "./individualPerson.entity";
import { UserProfile } from "./userProfile.entity";
import { News } from "./news.entity";
import { Publication } from "./publication.entity";
import { Discussion } from "./discussion.entity";
import { Report } from "./report.entity";
import { Bookmark } from "./bookmark.entity";
import { DiscussionLikes } from "./discussionLikes.entity";
import { Reply } from "./reply.entity";
import { ReplyLikes } from "./replyLikes.entity";


@Entity({name: 'User'})
export class User{

    @PrimaryGeneratedColumn('increment', {name: 'id'})
    id: number

    @Column({name: 'username', length: 20, nullable: true})
    username: string

    @Column({name: 'email', length: 256, nullable: true})
    email: string

    @Column({name: 'password', length: 127, nullable: true})
    password: string

    @Column({name: 'image', length: 256, nullable: true})
    image: string

    @Column({name: 'failLoginCount', nullable: true})
    failLoginCount: number

    @Column({name: 'lastLogin', nullable: true})
    lastLogin: Date

    @Column({name: 'sessionOpen', nullable: true})
    sessionOpen: number

    @Column({name: 'sessionId', nullable: true})
    sessionId: number

    @OneToMany(() => UserStatus, (userStatus) => userStatus.user, {cascade: true})
    userStatus: UserStatus[]

    @OneToOne(() => LegalPerson, (legalPerson) => legalPerson.user, {cascade: true})
    legalPerson: LegalPerson

    @OneToOne(() => IndividualPerson, (individualPerson) => individualPerson.user, {cascade: true})
    individualPerson: IndividualPerson

    @OneToMany(() => UserProfile, (userProfile) => userProfile.user, {cascade: true})
    userProfile: UserProfile[]
    // @OneToMany(() => UserUserType, (userUserType) => userUserType.user, {cascade: true})
    // userUserType: UserUserType[]

    @OneToMany(() => News, (news) => news.creator)
    news: News[]

    @OneToMany(() => Publication, (publication) => publication.user)
    publication: Publication[]

    @OneToMany(()=> Discussion, (discussion) => discussion.author)
    discussion: Discussion[]

    @OneToMany(() => Report, (report) => report.user)
    report: Report[]

    @OneToMany(() => Bookmark, (bookmark) => bookmark.user)
    bookmark: Bookmark[]

    @OneToMany(() => DiscussionLikes, (discussionLikes) => discussionLikes.user)
    discussionLikes: DiscussionLikes[]

    @OneToMany(() => Reply, (reply) => reply.author)
    reply: Reply[]
    
    @OneToMany(() => ReplyLikes, (replyLikes) => replyLikes.user)
    replyLikes: ReplyLikes[]
}