import { Component, OnInit, Input } from '@angular/core';
import { Assignment } from 'src/app/shared/models/assignments.model';
import { AssignmentService } from 'src/app/shared/services/assignments.service';
import { FilesService } from 'src/app/shared/services/files.service';
import { DocumentsService } from 'src/app/shared/services/documents.service';
import { Observable } from 'rxjs';
import { Student } from 'src/app/shared/models/students.model';
import { CoursesService } from 'src/app/shared/services/courses.service';
import { UploadFile } from 'src/app/shared/models/documents.model';
import { RoleType } from 'src/app/shared/enums/role.enum';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.sass'],
})
export class DocumentsComponent implements OnInit {
  @Input() assignment: Assignment;

  $students: Observable<Student[]>;
  $documents: Observable<UploadFile[]>;
  documents: Observable<UploadFile[]>;
  currentStudent: Student = undefined;
  constructor(
    private assignmentService: AssignmentService,
    private coursesService: CoursesService,
    public filesService: FilesService
  ) {}

  ngOnInit(): void {
    this.$students = this.coursesService.getStudents(this.assignment.course.id);
    this.$documents = this.assignmentService.getDocuments(this.assignment.id);
  }

  getFileIcon(file: UploadFile): string {
    switch (file.file.type) {
      case 'application/pdf':
        return 'PDF';
      case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
        return 'XLS';
      case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        return 'DOC';
      case 'image/jpeg':
        return 'JPG';
      case 'image/png':
        return 'PNG';
      default:
        return 'DOC';
    }
  }

  teacherDoc(doc: UploadFile) {
    return doc.createUser.role.code === RoleType.Teacher;
  }
}
