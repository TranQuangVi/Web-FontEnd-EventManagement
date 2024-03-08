import { Component, OnDestroy, AfterViewInit, Output, EventEmitter, ElementRef, forwardRef } from '@angular/core';
import { LocationStrategy } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { async } from '@angular/core/testing';

declare var tinymce: any;

const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CusTinyMCEComponent),
    multi: true,
};

@Component({
    selector: 'cus-tiny-mce',
    template: '<div id="editor"></div>',
    providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR],
})
export class CusTinyMCEComponent implements ControlValueAccessor, OnDestroy, AfterViewInit {

    @Output() editorKeyup = new EventEmitter<any>();

    editor: any;

    onChange: any = () => { };
    onTouched: any = () => { };

    constructor(
        private host: ElementRef,
        private locationStrategy: LocationStrategy,
    ) { }

    async ngAfterViewInit() {
        await tinymce.init({
            target: this.host.nativeElement,
            plugins: ['link', 'paste', 'table'],
            skin_url: `${this.locationStrategy.getBaseHref()}assets/skins/lightgray`,
            setup: editor => {
                this.editor = editor;
                editor.on('keyup', () => {
                    const content = editor.getContent();
                    this.onChange(content);
                    this.editorKeyup.emit(content);
                });
            },
            height: '320',
        });
    }

    ngOnDestroy() {
        tinymce.remove(this.editor);
    }

    async writeValue(value: any): Promise<void> {
        if (value !== undefined && this.editor) {
           await this.editor.setContent(value);
        }
    }

    async registerOnChange(fn: any): Promise<void> {
        this.onChange = await fn;
    }

    async registerOnTouched(fn: any): Promise<void> {
        this.onTouched = await fn;
    }
}
