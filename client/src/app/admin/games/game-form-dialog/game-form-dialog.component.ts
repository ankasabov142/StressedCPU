import { Component, Inject } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import IGame from 'src/app/interfaces/IGame';
import { getError } from 'src/app/shared/util/functions';
import { ChipAutocompleteItem } from 'src/app/shared/util/types';
import { AdminService } from '../../admin.service';


@Component({
  selector: 'app-game-form-dialog',
  templateUrl: './game-form-dialog.component.html',
  styleUrls: ['./game-form-dialog.component.css']
})
export class GameFormDialogComponent {
  media: string[] = [];
  categories: ChipAutocompleteItem[];
  genres: ChipAutocompleteItem[];
  tags: ChipAutocompleteItem[];
  discounts: ChipAutocompleteItem[];
  title: string;

  get allCategories(): ChipAutocompleteItem[] {
    return this.mapToCAI(this.adminService.categories || []);
  }

  get allGenres(): ChipAutocompleteItem[] {
    return this.mapToCAI(this.adminService.genres || []);
  }

  get allTags(): ChipAutocompleteItem[] {
    return this.mapToCAI(this.adminService.tags || []);
  }

  get allDiscounts(): ChipAutocompleteItem[] {
    return this.mapToCAI(this.adminService.discounts || [], { name: 'code', value: '_id' });
  }

  gameData = {
    name: this.data.game?.name || '',
    description: this.data.game?.description || '',
    price: this.data.game?.price || '',
    displayImage: this.data.game?.displayImage || '',
    media: this.data.game?.media || [],
    categories: this.mapToCAI(this.data.game?.categories || []),
    genres: this.mapToCAI(this.data.game?.genres || []),
    tags: this.mapToCAI(this.data.game?.tags || []),
    discounts: this.mapToCAI(this.data.game?.discounts || [], { name: 'code', value: '_id' }),
    quantityInStock: this.data.game?.price || '',
  }

  constructor(
    private dialogRef: MatDialogRef<GameFormDialogComponent>,
    private adminService: AdminService,
    @Inject(MAT_DIALOG_DATA) public data: { title: string, game?: IGame, submit: Function }
  ) {
    this.title = data.title;
    this.media = this.gameData.media;
    this.categories = this.gameData.categories;
    this.genres = this.gameData.genres;
    this.tags = this.gameData.tags;
    this.discounts = this.gameData.discounts;
  }

  close(): void {
    this.dialogRef.close();
  }

  submitHandler(form: NgForm): void {
    const body = {
      ...form.value,
      media: this.media,
      categories: this.mapToId(this.categories),
      genres: this.mapToId(this.genres),
      tags: this.mapToId(this.tags),
      discounts: this.mapToId(this.discounts),
    };

    this.data.submit(body);
  }

  getNameError({ control }: NgModel): string {
    return getError(control.errors, 'Game name')
  }
  getDescriptionError({ control }: NgModel): string {
    return getError(control.errors, 'Decription')
  }
  getDisplayImageError({ control }: NgModel): string {
    return getError(control.errors, 'Display image URL')
  }
  getPriceError({ control }: NgModel): string {
    return getError(control.errors, 'Price')
  }
  getQuantityInStockError({ control }: NgModel): string {
    return getError(control.errors, 'Quantity in stock')
  }

  private mapToCAI(arr: any[], options = { name: 'name', value: '_id' }): ChipAutocompleteItem[] {
    return arr.map(item => ({ name: item[options.name], value: item[options.value] }));
  }

  private mapToId(arr: ChipAutocompleteItem[]): string[] {
    return arr.map(item => item.value);
  }
}
