import { Component } from '@angular/core';
import { RouterLink } from '@angular/router'; // 1. Importar aqui

@Component({
  selector: 'landing-header',
  imports: [RouterLink],
  templateUrl: './landing-header.html',
  styleUrl: './landing-header.css',
})
export class LandingHeader {

}
