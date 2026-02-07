import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; // <--- 1. Importe isso

@Component({
  selector: 'app-landing',
  imports: [RouterModule],
  templateUrl: './landing.html',
  styleUrl: './landing.css',
})
export class Landing {

}
