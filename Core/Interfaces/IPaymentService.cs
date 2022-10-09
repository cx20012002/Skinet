using Core.Entities;
using Core.Entities.OrderAggregate;

namespace Core.Interfaces;

public interface IPaymentService
{
    Task<CustomerBasket> CreateOrUpdatePaymentIntent(string basketId);
    Task<Order> UpdateOrderPaymentSucceeded(string paymentIntendId);
    Task<Order> UpdateOrderPaymentFailed(string paymentIntendId);
}