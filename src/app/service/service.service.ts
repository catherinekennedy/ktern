import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ServiceService {
  constructor(private http: HttpClient) {}
  getbasicSmoothedEchartData(): Observable<any> {
    return this.http.get(
      "https://s3-us-west-2.amazonaws.com/s.cdpn.io/95368/obama_budget_proposal_2012.list.json"
    );
  }
  gettreedata(): Observable<any> {
    return this.http.get(
      "https://echarts.apache.org/examples/data/asset/data/flare.json"
    );
  }
}
