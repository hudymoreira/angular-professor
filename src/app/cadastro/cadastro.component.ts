import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

declare var $:any;
@Component({
    selector: 'cadastro-cmp',
    moduleId: module.id,
    templateUrl: 'cadastro.component.html'
})

export class CadastroComponent implements OnInit{
    public headers = new HttpHeaders();
    public paciente : any;
    public resumo : any = {
       meuGuiche : 2,
      senhaAtual : 0,
 totalCadastrado : 0 
    }
    public pacientes : any;
        
    constructor(public http : HttpClient){
        this.headers = this.headers.set("Content-Type","application/json; charset=UTF-8");
        
        setInterval(() => this.loop(), 5000);
       
    }
    loop(){
        this.carregaPacientes();
        this.getChamada();
    }
    alerta(tipo,msg){
        var type = ['info','success','warning','danger'];
    	$.notify({
        	icon: "ti-gift",
        	message:msg
        },{
            type: type[tipo],
            timer: 2000,
            placement: {
                from: 'top',
                align: 'center'
            }
        });
    }
    ngOnInit(){
        this.paciente = {
            email : null,
             nome : null,
            snome : null,
         endereco : null,
           cidade : null,
           estado : null,
              cep : null,
              obs : null
        }
        this.carregaPacientes();
    }

    cadastrar(){
      let opt : any = {
          opt : 2,
          paciente : this.paciente
      }
      this.http.post(environment.apiUrl, JSON.stringify(opt),{headers: this.headers}).subscribe(data => {
        if (data != null){
          console.log(data);
          if (data[0] == "00000"){
            this.alerta(1,'cadastrado com sucesso');
            this.ngOnInit();
          }
        } 
      }); 
    }
    cancelar(){
        this.alerta(3,'cadastro cancelado');
        this.ngOnInit();
    }
    carregaPaciente(paciente){
        this.paciente = paciente;
        this.alerta(0,'Carregando dados do paciente : ' + paciente.nome);
    }
    carregaPacientes(){
       this.http.post(environment.apiUrl, JSON.stringify({opt : 1}),{headers: this.headers}).subscribe(data => {
        if (data != null){
          this.pacientes = data;
          this.resumo.totalCadastrado = Object.keys(this.pacientes).length;
         } 
      });
    }
    proximo(){
        let post : any = {
            opt : 3,
            guiche : this.resumo.meuGuiche
        }
        this.http.post(environment.apiUrl, JSON.stringify(post),{headers: this.headers}).subscribe(data => {
         if (data != null){
           this.resumo.senhaAtual = data[0].senha;
           this.alerta(0,'proximo é ' + data[0].senha);
         } 
       });
     }
     getChamada(){
       this.http.post(environment.apiUrl, JSON.stringify({opt:4}),{headers: this.headers}).subscribe(data => {
         if (data != null){
           this.resumo.senhaAtual = data[0].idChamada;
         } 
       });
     }
}
