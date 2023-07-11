import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'default-qintess',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css']
})
export class DefaultComponent implements OnInit {

  logoQintess: string = 'assets/Logo-qintess-branco.jpg';

  constructor() { }

  ngOnInit() {
  }

}
