import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DomainService } from 'src/app/services/domain/domain.service';
import { IEntity } from 'src/app/models/utils.model';

@Component({
  selector: 'app-grades-filter',
  templateUrl: './grades-filter.component.html',
  styleUrls: ['./grades-filter.component.scss']
})
export class GradesFilterComponent implements OnInit {

  @Output() onFilter = new EventEmitter()

  specialtySelected: IEntity;
  branchSelected: IEntity;
  classSelected: IEntity;

  specialtiesOptions: IEntity[]
  branchesOptions: IEntity[]
  classesOptions: IEntity[]


  constructor(public domainServices: DomainService) { }

  ngOnInit(): void {}

  filter() {
    this.onFilter.emit({
      specialtySelected: this.specialtySelected,
      branchSelected: this.branchSelected,
      classSelected: this.classSelected
    })
  }
}
