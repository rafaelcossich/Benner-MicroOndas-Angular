import { Component } from '@angular/core';
import { FormularioControllerService } from './formulario-controller.service';
import { EnumModo, IModos } from './modos';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'timer-angular';
  public modosEnum = EnumModo;
  constructor(public form: FormularioControllerService) {
    const modo = this.form.obterControle('modo');
    const potencia = this.form.obterControle('potencia');
    const tempo = this.form.obterControle('tempo');
    modo.valueChanges.subscribe(value => {
      if(!this.modosEnum.find(v => v == value)){
        potencia.setValue(10);
        tempo.setValue('00:00');
      } else{
        const aux = modo.value as IModos;
        potencia.setValue(aux.potencia);
        tempo.setValue(aux.tempo);
      }
    })
  }

  displayFn(val: IModos): string {
    return val?.nome ?? '';
  }
}
