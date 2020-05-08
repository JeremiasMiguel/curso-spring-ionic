import { Component, OnInit } from '@angular/core';
import { CategoriaService } from 'src/services/domain/categoria.service';
import { CategoriaDTO } from 'src/models/categoria.dto';
import { APIConfig } from 'src/config/api.config';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {

  categories: CategoriaDTO[];
  bucketURL: string = APIConfig.bucketBaseURL;

  constructor(public categoriaService: CategoriaService) { }

  ngOnInit() {
    this.categoriaService.findAll().subscribe(response => {
      this.categories = response;
    }, error => {
      console.log(error);
    });
  }

}
