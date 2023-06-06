import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import ITag from 'src/app/interfaces/ITag';
import { AdminService } from '../admin.service';
import { DialogFormNameComponent } from '../dialog-form-name/dialog-form-name.component';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent {
  constructor(public dialog: MatDialog, private adminService: AdminService) { }

  get tags(): ITag[] | undefined {
    return this.adminService.tags;
  };

  openNewTag(): void {
    this.dialog.open(DialogFormNameComponent, {
      data: {
        title: 'New Tag',
        suffixIcon: 'tag',
        submit: (form: any) => this.postTag(form.value)
      }
    })
  }

  openEditTag(tag: ITag): void {
    this.dialog.open(DialogFormNameComponent, {
      data: {
        title: 'Edit ' + this.toString(tag),
        suffixIcon: 'gamepad',
        submit: (form: any) => console.log(form.value),
        value: tag.name
      }
    })
  }

  postTag(body: ITag): void {
    this.adminService.postTag(body);
  }

  editTag(tagId: string, body: ITag): void {
    this.adminService.editTag(tagId, body);
  }

  deleteTag(tagId: string): void {
    this.adminService.deleteTag(tagId);
  }

  toString(tag: ITag): string {
    return `Tag "${tag.name}" #${tag._id}`;
  }
}
