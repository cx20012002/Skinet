import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {CheckoutService} from "../checkout.service";
import {IDeliveryMethod} from "../../shared/models/deliveryMethod";
import {BasketService} from "../../basket/basket.service";

@Component({
  selector: 'app-checkout-delivery',
  templateUrl: './checkout-delivery.component.html',
  styleUrls: ['./checkout-delivery.component.scss']
})
export class CheckoutDeliveryComponent implements OnInit {
  @Input() checkoutForm: FormGroup;
  deliveryMethods: IDeliveryMethod[];

  constructor(private checkoutService: CheckoutService, private basketService: BasketService) {
  }

  ngOnInit(): void {
    this.checkoutService.getDeliveryMethods().subscribe({
      next: (dm: IDeliveryMethod[]) => {
        this.deliveryMethods = dm;
      },
      error: err => console.log(err)
    })
  }

  setShippingPrice(deliveryMethod: IDeliveryMethod){
    this.basketService.setShippingPrice(deliveryMethod);
  }

}
