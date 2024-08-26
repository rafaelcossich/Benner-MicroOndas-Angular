import { Component } from '@angular/core';
import { FormularioControllerService } from '../formulario-controller.service';
import { interval, Subscription } from 'rxjs';
import { EnumModo } from '../modos';

@Component({
  selector: 'app-timer-container',
  templateUrl: './timer-container.component.html',
  styleUrl: './timer-container.component.scss'
})
export class TimerContainerComponent {

  constructor(public form: FormularioControllerService) { }
  tempoRestante: number = 0;
  subscription!: Subscription;
  pausado = false;
  iniciado = false;

  public iniciar() {
    const tempo = this.form.obterControle('tempo');

    if (!tempo.value) return;

    if (this.tempoRestante <= 0) {
      this.form.obterControle('mensagem').setValue('');
      if (tempo.value as string === '00:00')
        tempo.setValue('00:30')
      const min = parseInt(tempo.value.split(':')[0]);
      const sec = parseInt(tempo.value.split(':')[1]);

      const totalSec = (min === 0 ? 0 : min === 1 ? 60 : 120) + sec;

      this.tempoRestante = totalSec * 1000;
    }
    debugger
    if (this.pausado || !this.iniciado)
      this.startTimer();
  }

  private startTimer() {
    this.pausado = false;
    this.iniciado = true;
    this.subscription = interval(1000).subscribe(() => {
      this.tempoRestante -= 1000;

      this.salvaMsg();

      if (this.tempoRestante <= 0)
        this.finalizar('Aquecimento Finalizado!');
    })
  }

  private salvaMsg() {
    const mensagem = this.form.obterControle('mensagem');
    const potencia = this.form.getPotencia();
    let pontos: string = "";
    for (let i = 0; i < potencia; i++) { pontos += '.' }   
    const oldMsg = mensagem.value;

    mensagem.setValue(`${oldMsg} ${pontos}`);

  }

  public pausarCancelar() {

    if (this.subscription && !this.subscription?.closed)
      return this.pausar();

    this.finalizar('Cancelado')
  }

  private pausar() {
    this.pausado = true;
    this.subscription.unsubscribe()
  }

  private finalizar(msg: string = '') {
    this.iniciado = false;
    this.form.obterControle('mensagem').setValue(msg);
    this.form.obterControle('tempo').setValue('00:00');
    this.tempoRestante = 0;
    //zera conta click
    this.subscription?.unsubscribe()
  }

  inputChange(ev: any){
    //validação maior q 2 min
  }

  clickBtn(val: number){
    //TECLADO VIRTUAL
    // essa func n vai valida via input change 

    this.form.obterControle('tempo').setValue('00:00');
  }
}
