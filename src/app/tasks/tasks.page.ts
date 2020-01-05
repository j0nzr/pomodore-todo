import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage';

@Component({
  selector: 'app-tasks',
  templateUrl: 'tasks.page.html',
  styleUrls: ['tasks.page.scss']
})
export class TasksPage {

  constructor(public alertCtrl: AlertController) {
  }

  public tasks: string[] = [];

  addNewTask(task: string){
    this.tasks.push(task);
  }

  async addNewTaskUI(){
    const task = await this.alertCtrl.create({
      header: "Neue Aufgabe eintragen",
      message: 'Trage hier den Titel deiner neuen Aufagabe ein:',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Aufgabentitel'
        }
      ],
      buttons: [
        {
          text: 'Abbrechen',
          role: 'cancel',
          cssClass: 'secondary',
        }, {
          text: 'Ok',
          handler: data => {
            this.addNewTask(data.name);
          }
        }
      ]
    });
    await task.present();
  }

}
