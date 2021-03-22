import { Component, forwardRef, Input, OnDestroy } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import Delimiter from '@editorjs/delimiter';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import ImageTool from '@editorjs/image';
import LinkTool from '@editorjs/link';
import List from '@editorjs/list';
import Marker from '@editorjs/marker';
import Paragraph from '@editorjs/paragraph';
import Underline from '@editorjs/underline';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-editorjs',
  templateUrl: './editorjs.component.html',
  styleUrls: ['./editorjs.component.sass'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EditorjsComponent),
      multi: true,
    },
  ]
})
export class EditorjsComponent implements ControlValueAccessor, OnDestroy {
  @Input() readonly = false;
  editor: EditorJS;
  constructor() {}

  ngOnDestroy(): void {
    this.editor.destroy();
  }

  onTouched = () => {};

  onChange = (items: any) => {};

  save() {
    this.editor
      .save()
      .then((data) => {
        this.onChange(data.blocks);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  writeValue(obj: any): void {
    this.editor = new EditorJS({
      holder: 'editor-js',
      readOnly: this.readonly,
      tools: {
        header: {
          class: Header,
          config: {
            placeholder: 'Ingrese título',
            levels: [4, 5, 6],
            defaultLevel: 5,
          },
          inlineToolbar: true,
        },
        link: {
          class: LinkTool,
          inlineToolbar: true,
          config: { endpoint: environment.editorLinkInfoURL },
        },
        underline: Underline,
        delimiter: Delimiter,
        image: {
          class: ImageTool,
          config: {
            endpoints: {
              byFile: environment.editorImagesURL,
              byURL: environment.editorFilesURL,
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
      data: {
        blocks: obj,
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
      onChange: () => {
        this.save();
      },
    });
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
