import { Component, OnInit } from '@angular/core';

import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-pagina',
  templateUrl: './pagina.component.html',
  styleUrls: ['./pagina.component.css']
})
export class PaginaComponent implements OnInit {
  title = "Bienvenido a Codeleaf";
  constructor(private titleService: Title) {
    this.titleService.setTitle($localize`${this.title}`);
   }

  ngOnInit(): void {
  }

}
