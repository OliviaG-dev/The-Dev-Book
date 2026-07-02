import { Pipe, PipeTransform, inject } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { renderMarkdownToHtml } from '../../core/utils/markdown.renderer';

@Pipe({
  name: 'devbookMarkdown',
  standalone: true,
})
export class DevBookMarkdownPipe implements PipeTransform {
  private readonly sanitizer = inject(DomSanitizer);

  transform(value: string | null | undefined): SafeHtml {
    if (!value?.trim()) {
      return '';
    }

    return this.sanitizer.bypassSecurityTrustHtml(renderMarkdownToHtml(value));
  }
}
