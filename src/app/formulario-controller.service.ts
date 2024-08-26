import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormularioControllerService {
  public formulario!: FormGroup;
  
  constructor() { 
    this.formulario = new FormGroup({
      potencia: new FormControl(10),
      modo: new FormControl(null),
      tempo: new FormControl('00:00'),
      mensagem: new FormControl('')
    });
  }
  
  public obterControle<T>(nome: string): FormControl{
    const control = this.formulario.get(nome);
    
    if(!control)
      throw new Error('controle não existe')
    
    return control as FormControl<T>;
  }
  public getPotencia(): number {
    return this.obterControle('potencia').value;
  }
}
