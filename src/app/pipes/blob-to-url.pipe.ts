import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Pipe({
  name: 'blobToUrl',
  standalone: true // Mark as standalone
})
export class BlobToUrlPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) { }

  transform(blob: File | Blob | string | null): SafeUrl | string {
    if (blob instanceof File || blob instanceof Blob) {
      const url = URL.createObjectURL(blob);
      return this.sanitizer.bypassSecurityTrustUrl(url);
    } else if (typeof blob === 'string') {
      return blob; // Handle existing image URLs if loading an existing patient
    }
    return ''; // Return empty string for null or other types
  }
}
