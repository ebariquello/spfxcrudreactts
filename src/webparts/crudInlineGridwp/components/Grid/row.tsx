
import React = require("react");
import { IRowProps } from "./rowProps";
import { IContact } from "../../../../models/Contact";
import CrudCell from "./cell";

//Classe representa uma única célula ou do grid uma célula.
export default class CrudRow extends React.Component<IRowProps, void> {

    private contact: IContact;

    constructor(props: IRowProps){
        //Passando o props para o contructor da Classe
        super(props);
        
        //Configurando os campos da Classe/Objeto a partir do props recebido
        this.contact = props.contact; 
        
        //Bind dos Eventos
        this.rowEdited = this.rowEdited.bind(this);
        this.rowDeleted = this.rowDeleted.bind(this);
    }
    //Método de contrução da celula
    public render(): React.ReactElement<IRowProps> {
        return (<div className="ms-Grid-row ms-bgColor-themeLighter ms-fontColor-neutralDark">
        <div className="ms-Grid-col ms-u-sm1 ms-u-md1 ms-u-lg1"><i onClick={this.rowDeleted} className="ms-Icon ms-Icon--Delete" aria-hidden="true"></i></div>
        {/* <CrudCell key={this.contact.id } readOnly={false} name="Id" value={this.contact.id.toString()} rowEdited={this.rowEdited} className="ms-Grid-col ms-u-sm1 ms-u-md1 ms-u-lg1" /> */}
        <CrudCell key={this.contact.id} readOnly={false} name="name" value={this.contact.name} rowEdited={this.rowEdited} className="ms-Grid-col ms-u-sm3 ms-u-md3 ms-u-lg2" />
        <CrudCell key={this.contact.id} readOnly={false} name="address" value={this.contact.address} rowEdited={this.rowEdited} className="ms-Grid-col ms-u-sm2 ms-u-md2 ms-u-lg2" />
        <CrudCell key={this.contact.id} readOnly={false} name="company" value={this.contact.company} rowEdited={this.rowEdited} className="ms-Grid-col ms-u-sm2 ms-u-md2 ms-u-lg2" />
        <CrudCell key={this.contact.id} readOnly={false} name="phone" value={this.contact.phone} rowEdited={this.rowEdited} className="ms-Grid-col ms-u-sm3 ms-u-md3 ms-u-lg3" />
        <CrudCell key={this.contact.id} readOnly={false} name="email" value={this.contact.email} rowEdited={this.rowEdited} className="ms-Grid-col ms-u-sm3 ms-u-md3 ms-u-lg3" />
     </div>);
    }

    public rowEdited(name:string, value:string): void {
        switch(name){
            case 'name':
            this.contact.name = value;
            break;
            case 'address':
            this.contact.address = value;
            break;
            case 'company':
            this.contact.company = value;
            break;
            case 'phone':
            this.contact.phone = value;
            break;
            case 'email':
            this.contact.email = value;
            break;
        }
        this.props.contactEdited(this.contact);
    }
  
    public rowDeleted(): void {
      this.props.contactDeleted(this.contact);
    }

}