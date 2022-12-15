import { Component } from '@angular/core';
import IAddress from 'src/app/interfaces/IAddress';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.css']
})
export class AddressesComponent {
  private _addresses?: IAddress[];

  get addresses(): IAddress[] | undefined {
    return this._addresses
  }

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getAddresses().subscribe({
      next: (value: IAddress[]) => {
        this._addresses = value;
      }
    });
  }
}
