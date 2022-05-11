import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.css']
})
export class CountdownComponent implements OnInit {

  @Output() onDecrease = new EventEmitter<number>();
  @Output() onComplete = new EventEmitter<void>();

  @Input() init:number = 0; //el valor en el que inicia el contador recibido desde el padre
  public counter: number =0; //contador real

  constructor() { }

  ngOnInit(): void {
    this.startCountdown();
  }

  //inicializa la cuenta atras tomando como referenci el init
  startCountdown(){
    if(this.init && this.init > 0){
      this.counter = this.init;
      //llamar a la funcion que decrementa mi contador
      this.doCountdown();
    }
  }

  doCountdown(){
    setTimeout ( ()=>{
      this.counter = this.counter -1
      //funcion de comprobacion
      this.processCountdown();
    },1000)
  }

  processCountdown(){
    //TODO: emit even count
    this.onDecrease.emit(this.counter);
    console.log("coun is:", this.counter);

    if (this.counter===0){
      //emit event counter end
      this.onComplete.emit();
      console.log('counter end');
    }else{
      this.doCountdown();
    }
    
  }
}
