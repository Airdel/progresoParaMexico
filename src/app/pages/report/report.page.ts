import { Component, OnInit, ViewChild } from '@angular/core';
import { format, parseISO} from 'date-fns';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-report',
  templateUrl: './report.page.html',
  styleUrls: ['./report.page.scss'],
})
export class ReportPage implements OnInit {

  /**
  * Variables para la validación del formulario de reporte de violencia (No alterar)
  * @var formReports Formulario para reportar la violencia
  * @var validationMessages Mensajes de validación
  */
  public formReports: FormGroup;
  public validationMessages: object;


  //VARIABLES QUE GUARDAN LA INFORMACIÓN PROVENIENTE DEL HTML. 
  //---------------YA ESTAN LISTAS PARA USARSE----------------
  choosed = true;
  date = '';
  actualDate=''
  formattedDate = '';

  aggressor_name: string;
  aggressor_gen: string;
  aggressor_role: string;
  victim_gen: string;
  victim_role: string;  
  violence_type: string; 
  level: string;
  school: string;   
  school_place: string;  
  description: string; 
  proceed: boolean;
  contact: string;

  //----------------------------------------------------------
  
  
  /**
   * Constructor de la clase
   * @param formBuilder para crear el formulario
   *
   * v_type: Tipo de violencia reportada
   *
   * vic_gen: Genero de la víctima
   * 
   * ag_gen: Genero del agresor
   *
   * ag_name: Nombre del agresor
   *
   * place: Lugar de la violencia
   *
   * vic_role: Rol de la víctima
   *
   * ag_role: Rol del agresor
   *
   * school_form: Escuela en donde ocurrió la agresión
   *
   * sc_place_form: Lugar de la escuela en donde ocurrió la agresión
   */
  constructor(private fb: FormBuilder) { 
    this.formReports = this.fb.group({
      v_type: ['', Validators.required],
      vic_gen: ['', Validators.required],
      ag_gen:['', Validators.required],
      ag_name: ['', Validators.required],      
      vic_role: ['', Validators.required],
      ag_role: ['', Validators.required],
      school_form: ['', Validators.required],
      sc_place_form: ['', Validators.required],
      desc: ['', Validators.required],
      lvl: ['', Validators.required],
      proc: ['', Validators.required],
      cont: [''],
      date_val: ['', Validators.required]
    });

    this.validationMessages = {
      v_type: [{ type: 'required', message: "Obligatorio!" }],      
      vic_gen: [{ type: 'required', message: "Obligatorio!" }],      
      ag_gen: [{ type: 'required', message: "Obligatorio!" }],
      ag_name: [{ type: 'required', message: "Obligatorio!" }],
      place_form: [{ type: 'required', message: "Obligatorio!" }],
      vic_role: [{ type: 'required', message: "Obligatorio!" }],
      ag_role: [{ type: 'required', message: "Obligatorio!" }],
      school_form: [{ type: 'required', message: "Obligatorio!" }],
      sc_place_form: [{ type: 'required', message: "Obligatorio!" }],
      lvl:[{type: 'required', message: "Obligatorio!"}],
      desc:[{type: 'required', message: "Obligatorio!"}],
      proc:[{type: 'required', message: "Obligatorio!"}],
      date_val:[{type: 'required', message: "Obligatorio!"}]
    }

    this.aggressor_name = "";
    this.aggressor_gen = "";
    this.aggressor_role = "";
    this.victim_gen = "";
    this.victim_role = "";  
    this.violence_type = "";
    this.level = "";
    this.school = "";    
    this.school_place = "";
    this.description = "";
    this.contact = "";
    this.actualDate = this.getActualDate();
  }

  ngOnInit() {
  }

  /**
   * Funcion para enviar los datos del formulario a la base de datos
   * @param alert para mostrar un mensaje de alerta datos a enviar:
   * @variable violence_type: Tipo de violencia reportada
   * @variable victim_gen: Genero de la víctima
   * @variable aggresor_gen: Genero del agresor
   * @variable aggressor_name: Nombre del agresor
   * @variable place: Lugar de la violencia
   * @variable victim_role: Rol de la víctima
   * @variable aggressor_role: Rol del agresor*
   * @variable school: Escuela en donde ocurrió la agresión
   * @variable school_place: Lugar de la escuela
   */

//--------------------------------------------------------------------------------------------------------------------------------------------
  //Funciones utilizadas para la seleccion y el formato de fechas seleccionadas. 

  //obtiene la fecha actual. Utilizada en la variable {actualDate} para evitar que se seleccione una fecha que aun no ha pasado.
  private getActualDate(){
    return (new Date().getMonth()+1)<10 ? new Date().getFullYear() + '-0' + (new Date().getMonth()+1) + '-' + new Date().getDate() : new Date().getFullYear() + '-' + (new Date().getMonth()+1) + '-' + new Date().getDate()
  }

  //permite saber si la fecha ha sido o no seleccionada por el usuario
  setDate(){
    this.choosed = false;
  }

  //Guarda la fecha seleccionada dentro de la variable {formattedDate}. Esta variable es la que se debe utilizar para las operaciones en la BD.
  getDate(){
    this.choosed = true;
    this.formattedDate = format(parseISO(this.date), 'd MMM, yyyy'); //El formato puede ser modificado a criterio del desarrollador.
  }

//--------------------------------------------------------------------------------------------------------------------------------------------

  send(){
    /*

      Aqui van los codigos que envían el formulario a la base de datos

    */

    //Este alert permite visualizar los datos que fueron ingresados en el formulario
    alert(this.aggressor_name
      +"\n"+this.aggressor_gen
      +"\n"+this.aggressor_role
      +"\n"+this.victim_gen
      +"\n"+this.victim_role
      +"\n"+this.violence_type
      +"\n"+this.level
      +"\n"+this.school
      +"\n"+this.school_place
      +"\n"+this.description
      +"\n"+this.formattedDate
      +"\n"+this.contact);
  }
}

