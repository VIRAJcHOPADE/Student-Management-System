import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Student } from '../app.component'; 
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-old-students',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './old-students.component.html',
  styleUrls: ['./old-students.component.css']
})
export class OldStudentsComponent implements OnInit {

  studentForm: FormGroup;
  studentList: Student[] = [];
  currentStudentId: number | null = null;

  constructor(private fb: FormBuilder) {
    this.studentForm = this.fb.group({
      id: [0],
      name: ['', Validators.required],
      mobileNo: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      email: ['', [Validators.required, Validators.email]],
      city: ['', Validators.required],
      state: ['', Validators.required],
      pincode: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]],
      address: ['', Validators.required],
      gender: ['', Validators.required]  
    });
  }

  onDelete(item: Student) {
    const isDelet = confirm("Are you sure you want to delete this record?");
    if (isDelet) {
      const currentRecordIndex = this.studentList.findIndex(m => m.id === item.id);
      if (currentRecordIndex !== -1) {
        this.studentList.splice(currentRecordIndex, 1);
        localStorage.setItem('angular17crud', JSON.stringify(this.studentList));
      }
    }
  }

  onEdit(item: Student) {
    this.openModel(item);
  }

  openModel(student?: Student) {
    if (student) {
      this.currentStudentId = student.id;
      this.studentForm.patchValue(student);
    } else {
      this.currentStudentId = null;
      this.studentForm.reset();
    }
    const modal = document.getElementById("myModal");
    if (modal) {
      modal.style.display = 'block';
    }
  }

  ngOnInit(): void {
    const localData = localStorage.getItem("angular17crud");
    if (localData) {
      this.studentList = JSON.parse(localData);
    }
  }
}
