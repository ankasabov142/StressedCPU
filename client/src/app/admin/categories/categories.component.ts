import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import ICategory from 'src/app/interfaces/ICategory';
import { AdminService } from '../admin.service';
import { DialogFormNameComponent } from '../dialog-form-name/dialog-form-name.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent {
  get categories(): ICategory[] | undefined {
    return this.adminService.categories;
  };

  constructor(public dialog: MatDialog, private adminService: AdminService) { }

  openNewCategory(): void {
    this.dialog.open(DialogFormNameComponent, {
      data: {
        title: 'New Category',
        suffixIcon: 'category',
        submit: (form: any) => this.postCategory(form.value)
      }
    })
  }

  openEditCategory(category: ICategory): void {
    this.dialog.open(DialogFormNameComponent, {
      data: {
        title: 'Edit ' + this.toString(category),
        suffixIcon: 'category',
        submit: (form: any) => console.log(form.value),
        value: category.name
      }
    })
  }

  postCategory(body: ICategory): void {
    this.adminService.postCategory(body);
  }

  editCategory(categoryId: string, body: ICategory): void {
    this.adminService.editCategory(categoryId, body);
  }

  deleteCategory(categoryId: string): void {
    this.adminService.deleteCategory(categoryId);
  }

  toString(category: ICategory): string {
    return `Category "${category.name}" #${category._id}`;
  }
}
