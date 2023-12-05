import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryShowDTO } from '../../interfaces/category-show-dto';
import { SubscriptionTypeShowDTO } from '../../interfaces/subscription-type-show-dto';
import { AppService } from '../../app.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-parameters',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './parameters.component.html',
  styleUrl: './parameters.component.css'
})
export class ParametersComponent {
  categories? : CategoryShowDTO[]
  selectedCategory?: CategoryShowDTO
  types? :SubscriptionTypeShowDTO[]
  selectedType? : SubscriptionTypeShowDTO
  error: any
  editCategory: boolean = false
  addUpdateCategory: boolean = false
  editType: boolean = false
  addUpdateType: boolean = false
  catButtonText: string = "+ Show"
  typButtonText: string = "+ Show"

  formCategories = new FormGroup({
    id: new FormControl<number>(0),
    categoryName: new FormControl("")
  })

  formTypes = new FormGroup({
    id: new FormControl<number>(0),
    name: new FormControl(''),
    duration: new FormControl<number>(0),
    allowance: new FormControl<number>(0)

  })

  constructor(private service: AppService = Inject(AppService)){}

  loadCategories(){
    this.service.getCategories().subscribe({
      next: (data)=>{
        this.categories = data
      },
      error: (err)=>
      this.error = err
    })
  }

  addCategory(){
    this.service.addCategory(this.formCategories.value as CategoryShowDTO).subscribe({
      next: (data)=>{
        this.categories?.push(data)
        this.addUpdateCategory = false
      },
      error: (err)=>{
        this.error = err
      }

    })
  }
  selectAddCategory(){
    this.addUpdateCategory = true
    this.selectedCategory = undefined
    this.formCategories.reset()
  }

  selectCategory(id: number){
    this.selectedCategory = this.categories?.find(a => a.id == id)
  
    if(this.selectedCategory){
      this.addUpdateCategory = true
      this.formCategories.patchValue(this.selectedCategory)
      
    }
  }

  updateCategory(){
    this.service.updateCategory(this.formCategories.value as CategoryShowDTO).subscribe({
      next: (data)=>{
        this.loadCategories()
        this.addUpdateCategory = false
      },
      error: (err)=>{
        this.error = err
      }
    })
  }
  addOrUpdateCategory(){
    if(this.selectedCategory) this.updateCategory()
    else this.addCategory()
  }

  deleteCategory(id?: number){
     this.service.deleteCategory(id).subscribe({
      next: (data)=>{
        this.loadCategories()
      },
      error: (err)=>{
        this.error = err
      }
    })
  }

  loadTypes(){
    this.service.getSubscTypes().subscribe({
      next: (data)=>{
        this.types = data
      },
      error: (err)=>{
        this.error = err
      }
    })

  }

  selectType(id: number){
    this.selectedType = this.types?.find(a => a.id == id)
    if(this.selectedType){
      this.addUpdateType = true
      this.formTypes.patchValue(this.selectedType)
      
    }
  }

  selectAddType(){
    this.selectedType = undefined
    this.addUpdateType = true
    this.formTypes.reset()

  }

  addType(){
    this.service.addSubscType(this.formTypes.value as SubscriptionTypeShowDTO).subscribe({
      next: (data)=>{
        this.types?.push(data)
        this.addUpdateType = false
      },
      error: (err)=>{
        this.error = err
      }
    })
  }

  updateType(){
    this.service.updateSubscType(this.formTypes.value as SubscriptionTypeShowDTO).subscribe({
      next: (data)=>{
        this.loadTypes()
        this.addUpdateType = false
      },
      error: (err)=>{
        this.error = err
      }
    })
  }
  addOrUpdateType(){
    if(this.selectedType) this.updateType()
    else this.addType()
  }

  deleteType(id: number){
    this.service.deleteSubscType(id).subscribe({
      next: (data)=>{
        this.loadTypes()
      },
      error: (err)=>{
        this.error = err
      }
    })
  }

  showEditCategory(){
    this.editCategory = !this.editCategory
    this.catButtonText = this.editCategory?"- Hide":"+ Show"

  }

  showEditType(){
    this.editType = !this.editType
    this.typButtonText = this.editType?"- Hide":"+ Show"
  }

  ngOnInit(){
    this.loadCategories()
    this.loadTypes()
  }

  
  

}
