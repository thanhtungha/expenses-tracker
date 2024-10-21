import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../../../services/loading/loading.service';

@Component({
  selector: 'app-loading-indicator',
  templateUrl: './loading-indicator.component.html',
  styleUrls: ['./loading-indicator.component.scss'],
})
export class LoadingIndicatorComponent implements OnInit {
  isShowLoading = false;

  constructor(private readonly loadingService: LoadingService) {}

  ngOnInit(): void {
    this.loadingService.loading$.subscribe((value) => {
      this.isShowLoading = value;
    });
  }
}
