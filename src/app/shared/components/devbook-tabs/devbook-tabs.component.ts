import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { DevBookDocument } from '../../../core/models';
import { DevBookMarkdownPipe } from '../../pipes/devbook-markdown.pipe';

@Component({
  selector: 'app-devbook-tabs',
  imports: [MatIconModule, DevBookMarkdownPipe],
  templateUrl: './devbook-tabs.component.html',
  styleUrl: './devbook-tabs.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class DevBookTabsComponent {
  readonly documents = input.required<DevBookDocument[]>();

  private readonly activeFileName = signal<string | null>(null);

  readonly activeDocument = computed(() => {
    const docs = this.documents();
    if (docs.length === 0) {
      return undefined;
    }

    const selected = this.activeFileName();
    return docs.find((doc) => doc.fileName === selected) ?? docs[0];
  });

  selectTab(fileName: string): void {
    this.activeFileName.set(fileName);
  }

  isActive(fileName: string): boolean {
    return this.activeDocument()?.fileName === fileName;
  }
}
