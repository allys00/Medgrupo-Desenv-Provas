import { Component, OnInit, Input, ViewChild, OnChanges } from '@angular/core';
import { IGrade } from 'src/app/models/grade.model';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-grades-table',
  templateUrl: './grades-table.component.html',
  styleUrls: ['./grades-table.component.scss']
})
export class GradesTableComponent implements OnInit, OnChanges {

  @ViewChild('dataTable') table: Table;
  @Input() grades: IGrade[] = []
  gradesFiltered: IGrade[]
  rows: number = 10;
  page: 1;

  constructor() { }

  ngOnInit(): void { }

  ngOnChanges(changes) {
    if (changes.grades) {
      this.grades = this.setPositionInGrades(this.grades);
      this.gradesFiltered = this.grades;
    }
  }

  setPositionInGrades(grades = []) {
    let currentPosition = 1;
    return grades
      .sort((a, b) => b.value - a.value)
      .map((grade: IGrade, index: number, grades: IGrade[]) => {
        if (index && grade.value !== grades[index - 1].value) {
          currentPosition++
        }
        return { ...grade, position: currentPosition }
      })
  }

  onFilter({
    branchSelected = [],
    classSelected = [],
    specialtySelected = []
  }) {

    this.table.filter(branchSelected, 'branch', 'in');
    this.table.filter(classSelected, 'class', 'in');
    this.table.filter(specialtySelected, 'specialty', 'in');
  }

  onTableFilter({ filteredValue }) {
    this.gradesFiltered = this.setPositionInGrades(filteredValue)
  }

  onSearch(enrollmentValue) {
    if (!enrollmentValue) return this.table.first = 0
    const index = this.gradesFiltered
      .findIndex(({ enrollment }) => enrollment === Number(enrollmentValue));

    this.table.first = index === -1 ? 0 : index;
  }

  print() {
    window.print();
  }

  downloadCsv() {
    const newArray = this.gradesFiltered.map(grade => {
      delete grade.id;
      return {
        ...grade,
        specialty: grade.specialty.name,
        branch: grade.branch.name,
        class: grade.class.name,
      }
    });

    let array = [...newArray];
    let str = '';
    for (let i = 0; i < array.length; i++) {
      let line = '';
      for (const index in array[i]) {
        if (line != '') line += ','

        line += array[i][index];
      }

      str += line + '\r\n';
    }
    const csvContent = `data:text/csv;charset=utf-8,Nota,Matrícula,Filial,Turma,Especialidade,Posição\r\n${str}`

    const encodedUri = encodeURI(csvContent);
    window.open(encodedUri);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "planilha.csv");
    document.body.appendChild(link);
    link.click();
  }
}
