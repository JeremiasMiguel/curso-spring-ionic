import { Component, OnInit } from '@angular/core';
import { CategoriaService } from 'src/services/domain/categoria.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {

  constructor(public categoriaService: CategoriaService) { }

  ngOnInit() {
    this.categoriaService.findAll().subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
    });
  }

}
