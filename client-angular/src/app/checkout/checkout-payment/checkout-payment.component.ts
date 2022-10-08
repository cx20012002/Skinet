import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {BasketService} from "../../basket/basket.service";
import {CheckoutService} from "../checkout.service";
import {ToastrService} from "ngx-toastr";
import {IBasket} from "../../shared/models/basket";
import {IOrder, IOrderToCreate} from "../../shared/models/order";
import {NavigationExtras, Router} from "@angular/router";

@Component({
  selector: 'app-checkout-payment',
  templateUrl: './checkout-payment.component.html',
  styleUrls: ['./checkout-payment.component.scss']
})
export class CheckoutPaymentComponent implements OnInit {
  @Input() checkoutForm: FormGroup;

  constructor(
    private basketService: BasketService,
    private checkoutService: CheckoutService,
    private toastr: ToastrService,
    private router: Router) {
  }

  ngOnInit(): void {
  }

  submitOrder() {
    const basket = this.basketService.getCurrentBasketValue();
    const orderToCreate = this.getOrderToCreate(basket);
    this.checkoutService.createOrder(orderToCreate).subscribe({
      next: (order: IOrder) => {
        this.toastr.success('Order created successfully');
        this.basketService.deleteLocalBasket(basket.id);
        const navigationExtra: NavigationExtras = {state: order};
        this.router.navigate(['checkout/success'], navigationExtra);
      }, error: err => {
        this.toastr.error(err.message);
        console.log(err);
      }
    })
  }

  private getOrderToCreate(basket: IBasket): IOrderToCreate {
    return {
      basketId: basket.id,
      deliveryMethodId: +this.checkoutForm.get('deliveryForm').get('deliveryMethod').value,
      shippingAddress: this.checkoutForm.get('addressForm').value
    }
  }
}
