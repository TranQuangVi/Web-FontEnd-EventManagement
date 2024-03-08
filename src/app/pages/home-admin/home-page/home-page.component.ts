import { Component, OnInit } from "@angular/core";

@Component({
    selector: 'home-page.component',
    templateUrl: "./home-page.component.html",
    styleUrls: ['./home-page.component.scss']
})

export class HomePageComponent implements OnInit {

    async loadData() {
        try {


        } catch (error) {
        }
    }

    async ngOnInit() {
        try {
            this.loadData()
        } catch (error) {
        }
    }
    tabs: any[] = [
        {
          title: 'Route tab #1',
          route: '/pages/layout/tabs/tab1',
        },
        {
          title: 'Route tab #2',
          route: '/pages/layout/tabs/tab2',
        },
      ];
}