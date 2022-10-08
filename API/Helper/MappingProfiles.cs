using API.Dtos;
using AutoMapper;
using Core.Entities;
using Core.Entities.OrderAggregate;
using Address = Core.Entities.Identity.Address;

namespace API.Helper;

public class MappingProfiles : Profile
{
    public MappingProfiles()
    {
        CreateMap<Product, ProductToReturnDto>()
            .ForMember(x => x.ProductBrand, opt => opt.MapFrom(x => x.ProductBrand.Name))
            .ForMember(x => x.ProductType, opt => opt.MapFrom(x => x.ProductType.Name))
            .ForMember(x => x.PictureUrl, opt => opt.MapFrom<ProductUrlResolver>());
        CreateMap<Address, AddressDto>().ReverseMap();
        CreateMap<CustomerBasketDto, CustomerBasket>();
        CreateMap<BasketItemDto, BasketItem>();
        CreateMap<AddressDto, Core.Entities.OrderAggregate.Address>();
        CreateMap<Order, OrderToReturnDto>()
            .ForMember(x => x.DeliveryMethod, o => o.MapFrom(x => x.DeliveryMethod.ShortName))
            .ForMember(x => x.ShippingPrice, o => o.MapFrom(x => x.DeliveryMethod.Price));
        CreateMap<OrderItem, OrderItemDto>()
            .ForMember(x => x.ProductId, o => o.MapFrom(x => x.ItemOrdered.ProductItemId))
            .ForMember(x => x.ProductName, o => o.MapFrom(x => x.ItemOrdered.ProductName))
            .ForMember(x => x.PictureUrl, o => o.MapFrom<OrderItemUrlResolver>());
    }
}