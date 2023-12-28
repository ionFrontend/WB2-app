import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ModalComponent } from '../modal/modal.component';
import { DataService } from '../data.service';

@Component({
  selector: 'app-notebook',
  templateUrl: './notebook.component.html',
  styleUrls: ['./notebook.component.scss'],
})
export class NotebookComponent implements AfterViewInit {
  displayedColumns: string[] = ['fio', 'email', 'status', 'actions'];
  dataSource!: MatTableDataSource<any>;
  searchValue:string = '';

  constructor(private dialog: MatDialog, private dataService: DataService) {}

  ngAfterViewInit() {
    this.loadData();
  }

  loadData() {
    const data = this.dataService.getData();
    this.dataSource = new MatTableDataSource(data);
  }

  openModal(action: string, element?: any) {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '400px',
      data: { action, element },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (action === 'add') {
          this.dataSource.data.push(result);
        } else if (action === 'edit') {
          const index = this.dataSource.data.findIndex((e) => e === element);
          this.dataSource.data[index] = result;
        }
        this.dataService.setData(this.dataSource.data);
      }
    });
  }

  deleteItem(element: any) {
    const index = this.dataSource.data.indexOf(element);
    this.dataSource.data.splice(index, 1);
    this.dataService.setData(this.dataSource.data);
  }

  applyFilter() {
    this.dataSource.filter = this.searchValue.trim().toLowerCase();
  }

  resetFilters() {
    localStorage.clear();
  }
}
