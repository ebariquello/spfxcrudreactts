import { ICellProps } from "./cellProps";
import React = require("react");
import { ICellState } from "./cellState";

//Classe representa uma única célula ou do grid uma célula.
export default class CrudCell extends React.Component<ICellProps, ICellState> {

    private readOnly: boolean;
    private name: string;
    private value: string;
    private className: string;
    

    constructor(props: ICellProps){
        //Passando o props para o contructor da Classe
        super(props);
        
        //Configurando os campos da Classe/Objeto a partir do props recebido
        this.readOnly = props.readOnly; // Definindo se está em modo de leitura ou não
        this.name = props.name; 
        this.value = props.value;
        this.className = props.className;
        this.state = { editMode: false, editValue: props.value };// Definindo o estado da célula
        
        //Bind dos Eventos
        this.enableEditing = this.enableEditing.bind(this);
        this.cellEditing = this.cellEditing.bind(this);
        this.cellEdited = this.cellEdited.bind(this);
    }
    //Método de contrução da celula
    public render(): React.ReactElement<ICellProps> {
        if(!this.readOnly && this.state.editMode){
            return (<div className={ this.className }>
                     <input onChange={this.cellEditing}  onBlur={this.cellEdited} type="text" value={this.state.editValue} />
                   </div>);
        }
        else {
            return (<div className={ this.className }>
                     <span onDoubleClick={this.enableEditing} >{this.props.value}</span>
                   </div>);
        }
    }

    //Evento que torna a célula editável e define o valor da célula antes de ser editado.
    public enableEditing(event): void{
        if(!this.readOnly){
          this.setState({'editMode': true, 'editValue': this.props.value});
        }
    }
    //Evento que ao ter mudança na célula captura seu valor e o guarda no estado do componente
    public cellEditing(event): void {
        this.setState({'editMode': true, 'editValue': event.target.value});
    }
    //Evento que ao sair na célula captura seu valor e o guarda no estado do componente e torna a célula não editável
    public cellEdited(event): void {
       this.setState({'editMode': false, 'editValue': event.target.value});
       //Dispara evento do component Row avisando que a célula foi editada.
       this.props.rowEdited(this.name, event.target.value);
    }

}