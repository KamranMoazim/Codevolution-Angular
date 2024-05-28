

export class Ticket {
  constructor(
    public _id: string,
    public event: string,
    public user: string,
    public price: number,
    public status: string,
    public purchaseDate: Date,
  ) {}
}
