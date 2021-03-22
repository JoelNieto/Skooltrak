import { SafeUrl } from '@angular/platform-browser';

export interface ContentBlock {
  type: 'image' | 'paragraph' | 'header' | 'list' | 'delimiter' | 'link';
  data: ContentData;
}

export interface ContentData {
  text?: string;
  items?: string[];
  style?: 'ordered' | 'unordered';
  caption?: string;
  file?: FileData;
  stretched?: boolean;
  withBackground?: boolean;
  withBorder?: boolean;
  meta?: LinkMetadata;
}

export interface FileData {
  url: SafeUrl;
}

export interface LinkMetadata {
  description?: string;
  image?: FileData;
  title?: string;
}
