import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-pomodore',
  templateUrl: 'pomodore.page.html',
  styleUrls: ['pomodore.page.scss']
})
export class PomodorePage {

  private tasks: string[];
  private actualTask: string;
  //private timer: NodeJS.Timer;
  private timer: any;
  private state: string;
  private stateMessage: string;

  constructor(public store: Storage, public alertCtrl: AlertController) {
    this.setTaskList();
  }

  public async setTaskList(){
    await this.store.get("data").then(
      (data) => {
        //console.log(data);
        this.tasks = data;
        this.startWork();
      }
    );
  }

  public startWork(){
    //setze aktuelle Aufgabe
    this.actualTask = this.tasks[0];
    this.stateMessage = "Du arbeitest gerade an:";

    //starte Timer, wenn Timer fertig, starte Pause
    let workLength = 1500000 //25 Minuten in Millisekunden
    let countDownDate = new Date().getTime() + workLength;
    this.state="work";

    // Update the count down every 1 second
    this.timer = setInterval(function () {

      // Get todays date and time
      let now = new Date().getTime();

      // Find the distance between now and the count down date
      let distance = countDownDate - now;
      // Time calculations for days, hours, minutes and seconds
      let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((distance % (1000 * 60)) / 1000);
      //console.log(now, "now", "countDownDate", countDownDate, "distance", distance, "days", days);

      // Output the result in an element with id="demo"
      document.getElementById("timerWork").innerHTML = minutes + "m " + seconds + "s ";

      // If the count down is over, write some text 
      if (distance < 0) {
        clearInterval(this.timer);

        //Wurde die Aufgabe erledigt?

        this.startPause();
      }
    }, 1000);

  }

  public endWork(){

    clearInterval(this.timer);

  }

  public reset(){
    clearInterval(this.timer);
    this.startWork();
  }

  public startPause(){
    let workLength = 300000 //5 Minuten in Millisekunden
    let countDownDate = new Date().getTime() + workLength;
    this.state = "pause";
    this.stateMessage = "Du hast jetzt erstmal Pause. Im nächsten Intervall arbeitest du an:"

    // Update the count down every 1 second
    this.timer = setInterval(function () {

      // Get todays date and time
      let now = new Date().getTime();

      // Find the distance between now and the count down date
      let distance = countDownDate - now;
      // Time calculations for days, hours, minutes and seconds
      let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Output the result in an element with id="demo"
      document.getElementById("timerWork").innerHTML = minutes + "m " + seconds + "s ";

      // If the count down is over, write some text 
      if (distance < 0) {
        clearInterval(this.timer);

        this.startPause();
      }
    }, 1000);

  }

  public async nextTask(){

    const task = await this.alertCtrl.create({
      header: "Fertig?",
      message: 'Wurde die Aufgabe erledigt?',
      buttons: [
        {
          text: 'Ja',
          handler: data => {
            this.tasks.shift();
            this.store.set("data", this.tasks);
            this.actualTask = this.tasks[0];
            if(this.tasks.length > 0){
              this.actualTask = this.tasks[0];
            } else {
              this.actualTask = "";
            }
          }
        }, {
          text: 'Nein',
          handler: data => {
            this.store.set("data", this.tasks);
            this.actualTask = this.tasks[0];
          }
        }
      ]
    });
    await task.present().then();
}

  public async nextIntervall(){
    clearInterval(this.timer);
    if(this.state == "pause"){
      this.startWork();
    }else if(this.state == "work"){
      this.startPause();
    }
  }
}


//TODO:s
//Aufgabenreihenfolge
//Was passiert wen keine Aufgaben mehr zu tun sind?
//Screenshots für Ausarbeitung
//Splash und Icon