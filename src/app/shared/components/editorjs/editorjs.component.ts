import { Component, OnInit } from '@angular/core';
import Delimiter from '@editorjs/delimiter';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import ImageTool from '@editorjs/image';
import LinkTool from '@editorjs/link';
import List from '@editorjs/list';
import Marker from '@editorjs/marker';
import Paragraph from '@editorjs/paragraph';
import Table from '@editorjs/table';
import Underline from '@editorjs/underline';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-editorjs',
  templateUrl: './editorjs.component.html',
  styleUrls: ['./editorjs.component.sass'],
})
export class EditorjsComponent implements OnInit {
  editor: any;
  constructor() {}

  ngOnInit(): void {
    this.editor = new EditorJS({
      holder: 'editor-js',
      defaultBlock: 'paragraph',
      tools: {
        header: {
          class: Header,
          inlineToolbar: true,
        },
        link: { class: LinkTool, inlineToolbar: true },
        underline: Underline,
        delimiter: Delimiter,
        table: {
          class: Table,
          inlineToolbar: true,
          config: {
            rows: 2,
            cols: 3,
          },
        },
        image: {
          class: ImageTool,
          config: {
            endpoints: {
              byFile: environment.urlAPI + 'Images',
              byURL: environment.urlAPI + 'Images',
            },
          },
        },
        list: {
          class: List,
          inlineToolbar: true,
        },
        Marker: {
          class: Marker,
          shortcut: 'CMD+SHIFT+M',
        },
        paragraph: {
          class: Paragraph,
          inlineToolbar: true,
          config: {
            placeholder: 'Comience a escribir...',
          },
        },
      },
      i18n: {
        messages: {
          tools: {
            image: {
              'Select an Image': 'Elija una imagen',
              Caption: 'Leyenda',
            },
          },
        },
      },
    });
  }
}
