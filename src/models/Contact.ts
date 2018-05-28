export interface IContact{
    id:number;
    name:string;
    address:string;
    company:string;
    phone:string;
    email:string;
}

export class Contact implements IContact{
    
    constructor(id:number, name:string, address:string, company: string, phone:string, email:string){
        this.id=id;
        this.name=name;
        this.address=address;
        this.company=company;
        this.phone=phone;
        this.email=email;
    }

    public id:number;
    public name:string;
    public address:string;
    public company:string;
    public phone: string;
    public email:string;

}