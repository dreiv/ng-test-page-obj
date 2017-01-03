import { Component, OnInit } from '@angular/core';
import { HelloService } from '../hello.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-service-consumer',
  templateUrl: './service-consumer.component.html',
  styleUrls: ['./service-consumer.component.css'],
  providers: [HelloService]
})
export class ServiceConsumerComponent implements OnInit {
  data: any;

  constructor(private service: HelloService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.service.get().subscribe(data => this.data = data);
    this.route.params.map(param => param['id'])
  }

}
