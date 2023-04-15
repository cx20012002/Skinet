using API.Errors;
using API.Helper;
using Core.Interfaces;
using Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;

namespace API.Extensions;

public static class ApplicationServicesExtensions
{
    public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
    {
        services.AddScoped<IProductRepository, ProductRepository>();
        services.AddScoped(typeof(IGenericRepository<>), (typeof(GenericRepository<>)));
        services.AddAutoMapper(typeof(MappingProfiles));
        services.Configure<ApiBehaviorOptions>(x=>x.InvalidModelStateResponseFactory = actionContext =>
        {
            var errors = actionContext.ModelState
                .Where(e => e.Value.Errors.Count > 0)
                .SelectMany(x => x.Value.Errors)
                .Select(x => x.ErrorMessage).ToArray();
    
            var errorResponse = new ApiValidationErrorResponse
            {
                Errors = errors
            };
    
            return new BadRequestObjectResult(errorResponse);
        });
        return services;
    }
}