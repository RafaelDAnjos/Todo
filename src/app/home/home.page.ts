import { Component } from '@angular/core';
import { AlertButton, AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  tarefas: any[] = [];
  constructor(private alertCtrl:AlertController, private toastCtrl:ToastController) {
    this.tarefas = this.buscarTarefas();
    if(this.tarefas == null){
      this.tarefas = [];
    }
   }


  checkTarefa(tarefa:any,event:any){
    
    tarefa.done = !tarefa.done;
    console.log(this.tarefas);
  }
  async criarTarefa(){
    const alerta = await this.alertCtrl.create({cssClass: 'my-custom-class',
    header: 'Insira sua tarefa!',
    inputs: [
      {
        name: 'Tarefa',
        type: 'text',
        placeholder: 'Insira sua tarefa'
      }],
    buttons: [{
      text: 'Cancelar',
      role: 'cancel',
      cssClass: 'secondary',
      handler: () => {
        console.log('Confirm Cancel:');
      }

    },
    {
      text: 'Adicionar',
      handler: (form) => {
        console.log(form);
        this.add(form.Tarefa);
      }


    }]
    });
    alerta.present();
  }

  async add(newTask:string){
    console.log(newTask);
    
    if (newTask.trim().length < 1) {

      const toast = await this.toastCtrl.create({
        message: 'Informe o que deseja fazer!',
        duration: 2000,
        position: 'top'
      });
      toast.present();
      return;
    }else{

      this.tarefas.push({titulo:newTask,done:false});
      this.atualizarTarefas();

    }
  }
  buscarTarefas(){
    let tasks =  JSON.parse(localStorage.getItem('tarefas'));
    return tasks;
  }
  atualizarTarefas(){
    localStorage.setItem('tarefas',JSON.stringify(this.tarefas));
  }

  deletarTarefa(tarefa:any){
    console.log(tarefa);
    this.tarefas = this.tarefas.filter(itemTarefa=> itemTarefa!=tarefa);
    localStorage.setItem('tarefas',JSON.stringify(this.tarefas));
  }

}
