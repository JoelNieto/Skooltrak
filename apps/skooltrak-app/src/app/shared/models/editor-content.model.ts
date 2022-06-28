import { SafeUrl } from '@angular/platform-browser';

export interface ContentBlock {
  type: 'image' | 'paragraph' | 'header' | 'list' | 'delimiter' | 'link';
  data: ContentData;
}

export interface ContentData {
  text?: string;
  level?: number;
  items?: string[];
  style?: 'ordered' | 'unordered';
  caption?: string;
  file?: FileData;
  link?: SafeUrl;
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
