import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
declare interface TableData {
  titulo: string[];
  conteudo: string[][];
}

@Component({
    selector: 'chamada-cmp',
    moduleId: module.id,
    templateUrl: 'chamada.component.html'
})

export class ChamadaComponent implements OnInit{
    public headers = new HttpHeaders();
    public tabelaChamada: TableData;
    public hora : any = new Date();
    public audio : any;
    public sons : any = [
                      ["proximo-guiche","um","dois","tres","quatro","cinco","som"],
                      ["next-tickt-window","one","two","tree","four","five"]
                        ];

    public chamada : any = {
      numero : 0,
      guiche : 0,
      hora   :'0'
    }
    // ['1','12','09:04:12 21/06/2019'],
    public listaChamada : any = []
    
    constructor( public http : HttpClient) {
      this.headers = this.headers.set("Content-Type","application/json; charset=UTF-8");
      setInterval(() => this.hora = new Date(), 1000);
      setInterval(() => this.loop(), 5000);
    }
    loop(){
      this.getChamada();
    }
    ngOnInit(){
      this.tabelaChamada = {
        titulo: [ 'Guiche', 'Senha','Hora'],
        conteudo: this.listaChamada
    };
    }
    getChamada(){
      this.http.post(environment.apiUrl, JSON.stringify({opt:4}),{headers: this.headers}).subscribe((data:any)  => {
        if (data != null){
          if (data[0] != undefined){
            if ( data[0].idChamada != this.chamada.numero){
              this.alarme();
              this.chamada.numero = data[0].idChamada;
              this.chamada.guiche = data[0].guiche;
              this.chamada.hora   = data[0].dataRegistro;
              this.listaChamada.length = 0;
              for (let item of data){
                this.listaChamada.push([item.guiche,item.idChamada,item.dataRegistro]);
              }  
            }
          }
        } 
      });
    }
    alarme(){
      this.tocar(this.sons[0][6]);
      this.delay(3000).then(()=>{
        this.tocar(this.sons[0][0]);      
        this.delay(2000).then(()=>{
          this.tocar(this.sons[0][this.chamada.guiche]);
          this.delay(2000).then(()=>{
            this.tocar(this.sons[1][0]);
            this.delay(2000).then(()=>{
              this.tocar(this.sons[1][this.chamada.guiche]);
            });
          });  
        });
      });
    }
    private tocar(valor){
      let audio = new Audio();
      audio.src = "../../../assets/som/"+valor+".mp3";
      audio.load();
      audio.play();
    }
    private delay(ms: number): Promise<boolean> {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(true);
        }, ms);
      });
    }
}
