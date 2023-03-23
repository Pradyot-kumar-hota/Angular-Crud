import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms'
import { ApiService } from '../services/api.service';
import {MatDialogRef, MAT_DIALOG_DATA}  from '@angular/material/dialog'

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  productForm !: FormGroup
  actionBtn: string ="save"
  constructor( private formBuilder: FormBuilder, 
    @Inject (MAT_DIALOG_DATA) public editData:any,
    private api:ApiService, private dialogRef: MatDialogRef <DialogComponent>) { }

  ngOnInit(): void {
    this.productForm=this.formBuilder.group({
      productName:['', Validators.required],
      price:['', Validators.required],
      freshness:['', Validators.required],
      productCategory:['', Validators.required],
      remark:['', Validators.required],
      date:['', Validators.required]
    });
    if(this.editData){
        this.actionBtn="Update"
        this.productForm.controls['productName'].setValue(this.editData.productName);
        this.productForm.controls['productCategory'].setValue(this.editData.productCategory);
        this.productForm.controls['date'].setValue(this.editData.date);
        this.productForm.controls['freshness'].setValue(this.editData.freshness);
        this.productForm.controls['price'].setValue(this.editData.price);
        this.productForm.controls['remark'].setValue(this.editData.remark);

    }
  }

  
  
  freshnessList=["New", "Second Hand", "Refurbished"]

  addProduct(){
    if(!this.editData){
      if(this.productForm.valid){
        this.api.postProduct(this.productForm.value).subscribe({
          next:(res)=>{
            alert("Item added successfully!!!")
            this.productForm.reset();
            this.dialogRef.close('save')
          },
          error:()=>{
            alert("Error while adding the form")
          }
        })
      } 
    } else{
      this.updateProduct();
    }
  }

  

  updateProduct(){
    this.api.putProduct(this.productForm.value, this.editData.id).subscribe({
      next: (res)=>{
        alert("Data updated successfully")
        this.productForm.reset();
        this.dialogRef.close('update')
      },
      error:(err)=>{
        alert("Error while updating")
      }
    })


  }
}
