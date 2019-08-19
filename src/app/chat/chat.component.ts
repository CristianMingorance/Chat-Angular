import {
  Component,
  OnInit
} from '@angular/core';
import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  newMesg = ""
  chatList = [];

  users = {
    UEBAQ4BR6: ["jhervas", "https://ca.slack-edge.com/T7E7HQJUF-UEBAQ4BR6-64015be7202d-48"],
    UL3470NDU: ["Eric Franco Cuenca", "https://ca.slack-edge.com/T7E7HQJUF-UL3470NDU-g7cc1c8ea118-48"],
    UL2R04WNT: ["Cristian Mingorance Mulero", "https://ca.slack-edge.com/T7E7HQJUF-UL2R04WNT-g802ee3d4748-72"],
    UKUK1PJN5: ["Fernando Perez Caelles", "https://ca.slack-edge.com/T7E7HQJUF-UKUK1PJN5-gbf5230bc0d1-48"],
    UEC1Z6A4D: ["Gabriel Moser", "https://ca.slack-edge.com/T7E7HQJUF-UEC1Z6A4D-a564859112ec-48"],
    UFX66K86P: ["Lara", "https://ca.slack-edge.com/T7E7HQJUF-UFX66K86P-84c9540b1c1d-48"],
    UGN88H30C: ["Satoshi", "https://ca.slack-edge.com/T7E7HQJUF-UGN88H30C-493372bf36c1-48"]

  }
  messages = [];
  totalOnline = 0;
  user = 1;




  enviarPost() {

    let pushingDatos = {

      id: "UL2R04WNT",
      idNombre: "Cristian Mingorance Mulero",
      fecha: "Miércoles, 31 de julio",
      fechaTs: "186298797",
      mensaje: this.newMesg,
      imagen: "https://ca.slack-edge.com/T7E7HQJUF-UL2R04WNT-g802ee3d4748-72"

    }





    this.chatList.push(pushingDatos)

    this._http.post("https://cristianmingorance.free.beeceptor.com", pushingDatos)
      .subscribe((response) => {


        alert("Pago realizado con exito")
      })

    this.newMesg = ""
  }


  chargeChat() {
    this._http.get("http://demo2243680.mockable.io/slack")
      .subscribe((response) => {

        let arrMsn = response["messages"]

        for (let i = 0; i < arrMsn.length; i++) {


          this.chatList.unshift({
            id: arrMsn[i].user,
            idNombre: this.getUserName(arrMsn[i].user),
            fecha: this.converterTime(arrMsn[i].ts),
            fechaTs: arrMsn[i].ts,
            mensaje: arrMsn[i].text,
            imagen: this.getUserImg(arrMsn[i].user)
          })

        }



        console.log(this.chatList)
      })



    return;
  }


  getUserImg(codigo) {

    return this.users[codigo][1]


  }
  getUserName(codigo) {


    return this.users[codigo][0]

  }

  converterTime(timestamp) {

    var date = new Date(timestamp * 1000)
    let timestampOrg = date.toString()

    return timestampOrg.slice(0, 24);
  }


  //   {code: "UKUK1PJN5", name: "Fernando Perez Caelles"},
  //   {code: "UL3470NDU", name: "Eric Franco Cuenca"},
  //   {code: "UL2R04WNT", name: "Cristian Mingorance Mulero"},
  //   {code: "UEC1Z6A4D", name: "Gabriel Moser"}]




  //  let key = "UEBASFAS";
  //  users[key]


  constructor(public _http: HttpClient) {



  }


ngAfterViewChecked(){

  

  document.getElementById("msgs").scrollTop = document.getElementById("msgs").scrollHeight



}

  ngOnInit(
    
  ) {

    this.chargeChat()
  

  }

}
