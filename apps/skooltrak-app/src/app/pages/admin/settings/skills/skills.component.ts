import { Component, OnInit } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { TableOptions } from '@skooltrak/custom-components';
import { Observable } from 'rxjs';
import { Skill } from 'src/app/shared/models/skills.model';
import { SkillsService } from 'src/app/shared/services/skills.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'skooltrak-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.sass'],
})
export class SkillsComponent implements OnInit {
  table = new TableOptions();
  skills$: Observable<Skill[]>;
  constructor(
    private skillsService: SkillsService,
    private transloco: TranslocoService
  ) {}

  ngOnInit(): void {
    this.table.columns = [
      { name: 'name', title: 'Nombre', required: true },
      { name: 'description', title: 'Descripción' },
      { name: 'active', title: 'Activo', type: 'boolean', required: true },
    ];
    this.skills$ = this.skillsService.getAll();
  }

  createSkill(skill: Skill) {
    this.skillsService.create(skill).subscribe({
      next: (res) => {
        Swal.fire(skill.name, 'Habilidad creada', 'success');
        this.skills$ = this.skillsService.getAll();
      },
      error: (err: Error) => {
        Swal.fire(
          this.transloco.translate('Something went wrong'),
          this.transloco.translate(err.message),
          'error'
        );
      },
    });
  }

  editSkill(skill: Skill) {
    this.skillsService.edit(skill.id, skill).subscribe({
      next: () => {
        Swal.fire(skill.name, 'Habilidad actualizada', 'success');
        this.skills$ = this.skillsService.getAll();
      },
      error: (err: Error) => {
        Swal.fire(
          this.transloco.translate('Something went wrong'),
          this.transloco.translate(err.message),
          'error'
        );
      },
    });
  }

  deleteSkill(id: string) {
    this.skillsService.delete(id).subscribe({
      next: () => {
        Swal.fire('Habilidad eliminada', '', 'info');
        this.skills$ = this.skillsService.getAll();
      },
      error: (err: Error) => {
        Swal.fire(
          this.transloco.translate('Something went wrong'),
          this.transloco.translate(err.message),
          'error'
        );
      },
    });
  }
}
