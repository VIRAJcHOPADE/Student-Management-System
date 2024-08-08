import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgIf, NgFor, CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms'; 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, NgIf, NgFor, RouterModule, FormsModule], 
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('myModal') modal: ElementRef | undefined;
  studentList: Student[] = [];
  currentStudentId: number | null = null;
  cities: string[] = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'];

  student: Student = new Student();

  ngOnInit(): void {
    const localData = localStorage.getItem("angular17crud");
    if (localData != null) {
      this.studentList = JSON.parse(localData);
    }
  }

  openModal(student?: Student) {
    if (student) {
      this.currentStudentId = student.id;
      this.student = { ...student };
    } else {
      this.currentStudentId = null;
      this.student = new Student();
    }
    const modal = document.getElementById("myModal");
    if (modal) {
      modal.style.display = 'block';
    }
  }

  closeModal() {
    this.student = new Student();
    const modal = document.getElementById("myModal");
    if (modal) {
      modal.style.display = 'none';
    }
  }

  onDelete(item: Student) {
    const isDelete = confirm("Are you sure you want to delete this record?");
    if (isDelete) {
      const currentRecordIndex = this.studentList.findIndex(m => m.id === item.id);
      if (currentRecordIndex !== -1) {
        this.studentList.splice(currentRecordIndex, 1);
        localStorage.setItem('angular17crud', JSON.stringify(this.studentList));
      }
    }
  }

  onEdit(item: Student) {
    this.openModal(item);
  }

  saveStudent(form: NgForm) {
    if (form.valid) {
      const newStudent = { ...this.student };
      if (this.currentStudentId) {
        const currentRecordIndex = this.studentList.findIndex(m => m.id === this.currentStudentId);
        if (currentRecordIndex !== -1) {
          this.studentList[currentRecordIndex] = newStudent;
        }
      } else {
        const id = this.studentList.length ? Math.max(...this.studentList.map(s => s.id)) + 1 : 1;
        newStudent.id = id;
        this.studentList.push(newStudent);
      }
      localStorage.setItem('angular17crud', JSON.stringify(this.studentList));
      this.closeModal();
    }
  }

  isMobileNoInvalid(mobileNo: string): boolean {
    return !/^\d{10}$/.test(mobileNo);
  }

  isPincodeInvalid(pincode: string): boolean {
    return !/^\d{6}$/.test(pincode);
  }
}

export class Student {
  id: number = 0;
  name: string = '';
  mobileNo: string = '';
  email: string = '';
  city: string = '';
  state: string = '';
  pincode: string = '';
  address: string = '';
  gender: string = '';  
}



// import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
// import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
// import { RouterModule, RouterOutlet } from '@angular/router';
// import { NgIf, NgFor, CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-root',
//   standalone: true,
//   imports: [ReactiveFormsModule, RouterOutlet, CommonModule, NgIf, NgFor,RouterModule],
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css']
// })
// export class AppComponent implements OnInit {
//   @ViewChild('myModal') model: ElementRef | undefined;
//   studentForm: FormGroup;
//   studentList: Student[] = [];
//   currentStudentId: number | null = null;
//   cities: string[] = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'];

//   constructor(private fb: FormBuilder) {
//     this.studentForm = this.fb.group({
//       id: [0],
//       name: ['', Validators.required],
//       mobileNo: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
//       email: ['', [Validators.required, Validators.email]],
//       city: ['', Validators.required],
//       state: ['', Validators.required],
//       pincode: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]],
//       address: ['', Validators.required],
//       gender: ['', Validators.required]  
//     });
//   }

//   ngOnInit(): void {
//     const localData = localStorage.getItem("angular17crud");
//     if (localData != null) {
//       this.studentList = JSON.parse(localData);
//     }
//   }

//   openModel(student?: Student) {
//     if (student) {
//       this.currentStudentId = student.id;
//       this.studentForm.patchValue(student);
//     } else {
//       this.currentStudentId = null;
//       this.studentForm.reset();
//     }
//     const modal = document.getElementById("myModal");
//     if (modal) {
//       modal.style.display = 'block';
//     }
//   }

//   closeModel() {
//     this.studentForm.reset();
//     const modal = document.getElementById("myModal");
//     if (modal) {
//       modal.style.display = 'none';
//     }
//   }

//   onDelete(item: Student) {
//     const isDelet = confirm("Are you sure you want to delete this record?");
//     if (isDelet) {
//       const currentRecordIndex = this.studentList.findIndex(m => m.id === item.id);
//       if (currentRecordIndex !== -1) {
//         this.studentList.splice(currentRecordIndex, 1);
//         localStorage.setItem('angular17crud', JSON.stringify(this.studentList));
//       }
//     }
//   }

//   onEdit(item: Student) {
//     this.openModel(item);
//   }

//   updateStudent() {
//     if (this.studentForm.valid) {
//       const updatedStudent = this.studentForm.value as Student;
//       const currentRecordIndex = this.studentList.findIndex(m => m.id === updatedStudent.id);
//       if (currentRecordIndex !== -1) {
//         this.studentList[currentRecordIndex] = updatedStudent;
//         localStorage.setItem('angular17crud', JSON.stringify(this.studentList));
//       }
//       this.closeModel();
//     }
//   }

//   saveStudent() {
//     if (this.studentForm.valid) {
//       const newStudent = this.studentForm.value as Student;
//       if (this.currentStudentId) {
//         const currentRecordIndex = this.studentList.findIndex(m => m.id === this.currentStudentId);
//         if (currentRecordIndex !== -1) {
//           this.studentList[currentRecordIndex] = newStudent;
//         }
//       } else {
//         const id = this.studentList.length ? Math.max(...this.studentList.map(s => s.id)) + 1 : 1;
//         newStudent.id = id;
//         this.studentList.push(newStudent);
//       }
//       localStorage.setItem('angular17crud', JSON.stringify(this.studentList));
//       this.closeModel();
//     }
//   }
// }

// export class Student {
//   id: number;
//   name: string;
//   mobileNo: string;
//   email: string;
//   city: string;
//   state: string;
//   pincode: string;
//   address: string;
//   gender: string;  

//   constructor() {
//     this.id = 0;
//     this.name = '';
//     this.mobileNo = '';
//     this.email = '';
//     this.city = '';
//     this.state = '';
//     this.pincode = '';
//     this.address = '';
//     this.gender = '';  
//   }
// }
