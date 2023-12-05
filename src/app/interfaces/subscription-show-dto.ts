import { SubscriptionRawDTO } from "./subscription-raw-dto"

export class SubscriptionShowDTO {
    id?:number
    memberId?: number
    startDate: Date
    endDate?: Date
    alowance?: number

    constructor(data: SubscriptionRawDTO){
        this.id = data.id
        this.memberId = data.memberId
         this.startDate=data.startDate?new Date(data.startDate): new Date()
        if(data.endDate) this.endDate = new Date(data.endDate)
        this.alowance = data.alowance
    }

}
