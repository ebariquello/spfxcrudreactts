
import React = require("react");
import { IContact } from "../../../../models/Contact";
import { ISheetProps } from "./sheetProps";
import { ISheetState } from "./sheetState";
import CrudRow from "./row";
import { Button } from 'office-ui-fabric-react/lib/Button';
//Classe representa uma única célula ou do grid uma célula.
export default class CrudSheet extends React.Component<ISheetProps, ISheetState> {

    private contact: IContact;

    constructor(props: ISheetProps){
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
    public render(): React.ReactElement<ISheetProps> {
        return (
            <div>
              <div style={{'padding':'5px'}}>
                <button onClick={this.contactAdded}>Add a Contact</button>
              </div>
              <div className="ms-Grid">
                <div className="ms-Grid-row ms-bgColor-themeDark ms-fontColor-white">
                  <div className="ms-Grid-col ms-u-sm1 ms-u-md1 ms-u-lg1">
                  </div>
                  <div className="ms-Grid-col ms-u-sm1 ms-u-md1 ms-u-lg1">
                    Nome do Contato
                  </div>
                  <div className="ms-Grid-col ms-u-sm3 ms-u-md3 ms-u-lg2">
                   Endereço
                  </div>
                  <div className="ms-Grid-col ms-u-sm2 ms-u-md2 ms-u-lg2">
                    Empresa
                  </div>
                  <div className="ms-Grid-col ms-u-sm3 ms-u-md3 ms-u-lg3">
                    Telefone
                  </div>
                  <div className="ms-Grid-col ms-u-sm3 ms-u-md3 ms-u-lg3">
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