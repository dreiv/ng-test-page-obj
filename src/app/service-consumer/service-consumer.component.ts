import { Component, OnInit } from '@angular/core';
import { HelloService } from '../hello.service';

@Component({
  selector: 'app-service-consumer',
  templateUrl: './service-consumer.component.html',
  styleUrls: ['./service-consumer.component.css'],
  providers: [HelloService]
})
export class ServiceConsumerComponent implements OnInit {
  data: any;

  constructor(private service: HelloService) {
  }

  ngOnInit() {
    this.service.get().subscribe(data => this.data = data);
  }

}
