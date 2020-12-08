import { Component, OnInit } from '@angular/core';
import { DndDropEvent, DropEffect} from 'ngx-drag-drop';
import { field, value } from '../../../data/FieldsModel';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-edit-app',
  templateUrl: './edit-app.component.html',
  styleUrls: ['./edit-app.component.scss']
})
export class EditAppComponent implements OnInit {

  value: value = {
    label: '',
    value: ''
  };
  success = false;
  show = 0;

  modelFields: Array<field> = [];
  model: any = {
    name: 'Form name...',
    description: 'Form Description...',
    theme: {
      bgColor: 'ffffff',
      textColor: '555555',
      bannerImage: ''
    },
    attributes: this.modelFields
  };

  report = false;
  reports: any = [];

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

  }

  onDragStart(event: DragEvent): void{
    console.log('drag started', JSON.stringify(event, null, 2));
  }

  onDraggableCopied(event: DragEvent): void {
    console.log('draggable copied', JSON.stringify(event, null, 2));
  }

  onDraggableLinked(event: DragEvent): void {
    console.log('draggable linked', JSON.stringify(event, null, 2));
  }

   onDragged( item: any, list: any[], effect: DropEffect ): void{
    if ( effect === 'move' ) {
      const index = list.indexOf( item );
      list.splice( index, 1 );
    }
  }

  onDragCanceled(event: DragEvent): void {
    console.log('drag cancelled', JSON.stringify(event, null, 2));
  }

  onDragover(event: DragEvent): void {
    console.log('dragover', JSON.stringify(event, null, 2));
  }

  onDrop( event: DndDropEvent, list?: any[] ): void {
    if ( list && (event.dropEffect === 'copy' || event.dropEffect === 'move') ) {
      if (event.dropEffect === 'copy') {
      event.data.name = event.data.type + '-' + new Date().getTime();
      }
      let index = event.index;
      if ( typeof index === 'undefined' ) {
        index = list.length;
      }
      list.splice( index, 0, event.data );
    }
  }

  addValue(values): void{
    values.push(this.value);
    this.value = {label: '', value: ''};
  }

  removeField(i): void{
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to remove this field?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#00B96F',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, remove!'
    }).then((result) => {
      if (result.value) {
        this.model.attributes.splice(i, 1);
      }
    });

  }

  updateForm(): void{
    const input = new FormData();
    input.append('id', this.model._id);
    input.append('name', this.model.name);
    input.append('description', this.model.description);
    input.append('bannerImage', this.model.theme.bannerImage);
    input.append('bgColor', this.model.theme.bgColor);
    input.append('textColor', this.model.theme.textColor);
    input.append('attributes', JSON.stringify(this.model.attributes));

    // this.us.putDataApi('/admin/updateForm',input).subscribe(r=>{
    //   console.log(r);
    //   swal('Success','App updated successfully','success');
    // });
  }


  initReport(): void{
    this.report = true;
    const input = {
      id: this.model._id
    };
  }



  toggleValue(item): void{
    item.selected = !item.selected;
  }

  submit(): boolean{
    let valid = true;
    const validationArray = JSON.parse(JSON.stringify(this.model.attributes));
    validationArray.reverse().forEach( field => {
      console.log(field.label + '=>' + field.required + '=>' + field.value);
      if (field.required && !field.value && field.type !== 'checkbox'){
        Swal.fire('Error', 'Please enter ' + field.label, 'error');
        valid = false;
        return false;
      }
      if (field.required && field.regex){
        const regex = new RegExp(field.regex);
        if (regex.test(field.value) === false){
          Swal.fire('Error', field.errorText, 'error');
          valid = false;
          return false;
        }
      }
      if (field.required && field.type === 'checkbox'){
        if (field.values.filter(r => r.selected).length === 0){
          Swal.fire('Error', 'Please enterrr ' + field.label, 'error');
          valid = false;
          return false;
        }

      }
    });
    if (!valid){
      return false;
    }
    console.log('Save', this.model);
    const input = new FormData();
    input.append('formId', this.model._id);
    input.append('attributes', JSON.stringify(this.model.attributes));
  }

  _show(x: number): void {
    this.show = x;
  }

}
