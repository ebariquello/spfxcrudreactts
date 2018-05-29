
import * as React from 'react'; 
import { IContact, Contact } from "../../../../models/Contact";
//import { ICrudSheetProps } from "./sheetProps";
// import { ISheetState } from "./sheetState";
import CrudRow from "./row";

export interface ISheetState {
  contacts: Contact[];
 
}
export interface ICrudSheetProps{
  contacts: IContact[];
  saveContact: Function  ;
  deleteContact:Function;
  addContact:  Function;
}



//Classe representa uma única célula ou do grid uma célula.
export default class CrudSheet extends React.Component<ICrudSheetProps, ISheetState> {

    private contact: IContact;

    constructor(props: ICrudSheetProps){
        //Passando o props para o contructor da Classe
        super(props);
        
        //Configurando o objeto state do CrudSheet
        this.state = {"contacts": props.contacts};
        
        //Bind dos Eventos
        this.contactEdited = this.contactEdited.bind(this);
        this.contactDeleted = this.contactDeleted.bind(this);
        this.contactAdded = this.contactAdded.bind(this);
    }
    //Método de contrução da celula
    public render(): React.ReactElement<ICrudSheetProps> {
        return (
            <div>
              <div >
                <button onClick={this.contactAdded}>Novo Contato</button>
              </div>
              <div className="ms-Grid">
                <div className="ms-Grid-row ms-bgColor-themeDark ms-fontColor-white">
                  <div className="ms-Grid-col ms-u-sm1 ms-u-md1 ms-u-lg1">
                  </div>
                  <div className="ms-Grid-col ms-u-sm2 ms-u-md2 ms-u-lg2">
                    Nome do Contato
                  </div>
                  <div className="ms-Grid-col ms-u-sm2 ms-u-md2 ms-u-lg2">
                   Endereço
                  </div>
                  <div className="ms-Grid-col ms-u-sm2 ms-u-md2 ms-u-lg2">
                    Empresa
                  </div>
                  <div className="ms-Grid-col ms-u-sm2 ms-u-md2 ms-u-lg2">
                    Telefone
                  </div>
                  <div className="ms-Grid-col ms-u-sm2 ms-u-md2 ms-u-lg2">
                    E-mail
                  </div>
                </div>
                {this.state.contacts.map(contact => {
                    return  <CrudRow key={contact.id} contact={contact} contactEdited={this.contactEdited} contactDeleted={this.contactDeleted} />;
                })}
              </div>
            </div>
          );
    }
    public async contactEdited(contact:IContact){
        var contacts = await this.props.saveContact(contact);
        this.setState({ 'contacts': contacts });
    }
  
    public async contactDeleted(contact:IContact){
      var contacts = await this.props.deleteContact(contact);
      this.setState({ 'contacts': contacts });
    }
  
    public async contactAdded(){
      var contacts = await this.props.addContact();
      this.setState({ 'contacts': contacts });
    }

}
