import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-tasks',
  templateUrl: 'tasks.page.html',
  styleUrls: ['tasks.page.scss']
})
export class TasksPage {

  constructor(public alertCtrl: AlertController, public store: Storage) {
    //console.log(store.get("data"))
    this.setTaskList();
  }

  public tasks: string[] = [];

  async deleteTask(taskname: string){
    if(this.tasks.length == 1){
      this.tasks = [];
    }
    for(let task of this.tasks){
      if(task == taskname){
        let index = this.tasks.indexOf(task);
        console.log(index);
        this.tasks = this.tasks.splice(index, 1);
      }
    }
    this.store.set("data", this.tasks);
  }

  async setTaskList(){
    //console.log(this.store.get("data"));
    //console.log(typeof(this.store.get("data")));
    //this.store.set("data", ["Jonas"]);
    if(this.store.get("data") && typeof(this.store.get("data")) == "object"){
      await this.store.get("data").then((data) => {
        console.log(this.tasks);
        this.tasks = data;
      });
      
    }
  }

  async addNewTask(task: string){
    console.log(this.tasks);
    this.tasks.push(task);
    this.store.set("data", this.tasks);
    //console.log(await this.store.get("data"))
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
    await task.present().then();
    
  }

}
