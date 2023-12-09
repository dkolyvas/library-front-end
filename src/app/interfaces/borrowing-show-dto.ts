import { BorrowingRawDTO } from "./borrowing-raw-dto"

export class BorrowingShowDTO {
    id?: number
    memberName?: string
    bookTitle?: string
    startDate: Date
    endDate?: Date
    memberAddress?: string
    memberEmail?: string
    memberPhone?: string
    bookId?: number

    constructor(data: BorrowingRawDTO){
        this.id = data.id
        this.memberName = data.memberName
        this.bookTitle = data.bookTitle
        this.startDate = new Date(data.startDate?data.startDate:0)
        this.endDate = data.endDate?new Date(data.endDate): undefined
        this.memberAddress = data.memberAddress
        this.memberEmail = data.memberEmail
        this.memberPhone = data.memberPhone
        this.bookId = data.bookId
    }
}
