import { FileDataModel } from 'src/app/core/models/file-structure/file/file-data.model';
import { Component, Input } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'sb-top-bar',
  standalone: false,
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.scss',
})
export class TopBarComponent {
  @Input() data: FileDataModel | null = null;

  public isSectionOverviewVisible: boolean = false;

  public contextMenuItems: MenuItem[] = [
    {
      label: 'Edit Meta Data',
      command: () => {},
    },
    {
      label: 'Show Sections',
      command: () => (this.isSectionOverviewVisible = true),
    },
    {
      label: 'Delete',
      command: () => {},
    },
  ];

  ngOnInit(): void {}
}
