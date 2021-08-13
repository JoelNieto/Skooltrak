import { Component, Input, OnInit } from '@angular/core';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { Observable } from 'rxjs';
import { Content } from 'src/app/shared/models/content.model';
import { Course } from 'src/app/shared/models/studyplans.model';
import { CoursesService } from 'src/app/shared/services/courses.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.sass'],
})
export class ContentComponent implements OnInit {
  @Input() course: Course;

  printing: boolean;

  contents$: Observable<Content[]>;
  constructor(private courseService: CoursesService) {}

  ngOnInit(): void {
    this.contents$ = this.courseService.getContent(this.course.id);
  }

  public convertToPDF(content: Content) {
    this.printing = true;
    const data = document.getElementById('content');
    html2canvas(data, { allowTaint: true }).then((canvas) => {
      // Few necessary setting options
      const imgWidth = 170;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const contentDataURL = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      pdf.setFont('helvetica'); // A4 size page of PDF
      pdf.setFontSize(14);
      pdf.text(content.title, 20, 20);
      pdf.setFontSize(12);
      pdf.text('Docente: ' + content.createUser.displayName, 20, 25);
      pdf.text('Asignatura: ' + content.course.subject.name, 20, 30);
      pdf.addImage(contentDataURL, 'PNG', 20, 35, imgWidth, imgHeight);
      pdf.autoPrint(); // <<--------------------- !!
      const oHiddFrame = document.createElement('iframe');
      oHiddFrame.style.position = 'fixed';
      oHiddFrame.style.visibility = 'hidden';
      oHiddFrame.src = pdf.output('bloburl').toString();
      document.body.appendChild(oHiddFrame);
      this.printing = false;
    });
  }
}
