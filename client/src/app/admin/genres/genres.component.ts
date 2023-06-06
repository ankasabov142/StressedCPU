import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import IGenre from 'src/app/interfaces/IGenre';
import { AdminService } from '../admin.service';
import { DialogFormNameComponent } from '../dialog-form-name/dialog-form-name.component';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.css']
})
export class GenresComponent {
  constructor(public dialog: MatDialog, private adminService: AdminService) { }

  get genres(): IGenre[] | undefined {
    return this.adminService.genres;
  };

  openNewGenre(): void {
    this.dialog.open(DialogFormNameComponent, {
      data: {
        title: 'New Genre',
        suffixIcon: 'gamepad',
        submit: (form: any) => this.postGenre(form.value)
      }
    })
  }

  openEditGenre(genre: IGenre): void {
    this.dialog.open(DialogFormNameComponent, {
      data: {
        title: 'Edit ' + this.toString(genre),
        suffixIcon: 'gamepad',
        submit: (form: any) => console.log(form.value),
        value: genre.name
      }
    })
  }

  postGenre(body: IGenre): void {
    this.adminService.postGenre(body);
  }

  editGenre(genreId: string, body: IGenre): void {
    this.adminService.editGenre(genreId, body);
  }

  deleteGenre(genreId: string): void {
    this.adminService.deleteGenre(genreId);
  }

  toString(genre: IGenre): string {
    return `Genre "${genre.name}" #${genre._id}`;
  }
}
