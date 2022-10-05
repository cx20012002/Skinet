using API.Dtos;
using AutoMapper;
using Core.Entities;
using Core.Entities.Identity;

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
    }
}