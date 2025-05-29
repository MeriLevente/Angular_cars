import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DataService } from '../data.service';
import { CarModel } from '../car.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-voting',
  imports: [FormsModule],
  templateUrl: './voting.component.html',
  styleUrl: './voting.component.css'
})
export class VotingComponent {
  vote = {
    carId: '',
    email: '',
    comment: '',
    tou: false
  }

  cars: CarModel[] = [];
  errorMsg = '';

  constructor(private dataService: DataService, private route: ActivatedRoute, private router: Router){

  }

  ngOnInit(){
    this.dataService.getCars('').subscribe({
      next: (result: CarModel[]) => {
        this.cars = result;
        this.vote.carId = this.route.snapshot.queryParamMap.get('carId') ?? '';
      },
      error: (err: any) => {
        this.errorMsg = err.error.message ?? err.message;
      }
    })
  }

  voteClick() {
    this.errorMsg = '';
    if(!this.vote.carId) {
      this.errorMsg += "Kérem válassza ki az autót!"
    }
    if(!this.vote.email) {
      this.errorMsg += "Kérem adja meg az email címet!"
    }
    if(!this.vote.tou) {
      this.errorMsg += "Fogadja el a felhasználási feltételeket!"
    }
    if(!this.errorMsg){
      this.dataService.postVote(this.vote).subscribe({
        next: (result: any) => {
          alert('Köszönjük a szavazatát!')
          this.router.navigate(['']);
        },
        error: (err: any) => {
          this.errorMsg = err.error.message ?? err.message;
        }
      })
    }
  }
}
