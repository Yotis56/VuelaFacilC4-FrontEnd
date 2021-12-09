import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { LoadingService } from 'src/app/services/loading/loading.service';

@Injectable()
export class NetworkInterceptor implements HttpInterceptor {

  private totalRequests = 0
  private completedRequests = 0

  constructor(private loader: LoadingService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.loader.show()
    //this.completedRequests++

    return next.handle(request).pipe(
      finalize(() => {
        //this.completedRequests++
        this.loader.hide()
        // if (this.completedRequests === this.totalRequests) {
        //   this.completedRequests = 0
        //   this.totalRequests = 0
        // }
      })
    )
  }
}
