import { NgModule, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser, isPlatformServer } from '@angular/common';

// @angular/material
import { HeaderComponent } from './header/header.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatBadgeModule } from '@angular/material/badge'
import { RouterModule } from '@angular/router';
import { LocalStorage } from '../injection-tokens';



@NgModule({
  declarations: [
    HeaderComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    // @angular/material
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatBadgeModule
  ],
  exports: [
    HeaderComponent,
  ],
  providers: [
    {
      provide: LocalStorage,
      useFactory: (platformId: typeof PLATFORM_ID) => {
        if (isPlatformBrowser(platformId)) {
          return window.localStorage;
        }

        if (isPlatformServer(platformId)) {
          return class implements Storage {
            private data: Record<string, string> = {};
            length: number = 0;

            clear(): void {
              this.data = {};
            }

            getItem(key: string): string | null {
              return this.data[key];
            }

            key(index: number): string | null {
              const keys = Object.keys(this.data);

              if (index >= keys.length || index < 0) {
                return null;
              }

              return keys[index];
            }

            removeItem(key: string): void {
              const { [key]: removedItem, ...others } = this.data;
              this.data = others;
            }

            setItem(key: string, value: string): void {
              this.data[key] = value;
            }
          }
        }
        throw Error('ENVIRONMENT NOT SUPPORTED.')
      },
      deps: [PLATFORM_ID]
    }
  ]
})
export class CoreModule { }
