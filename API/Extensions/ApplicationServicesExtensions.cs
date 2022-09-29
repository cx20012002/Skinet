using API.Helper;
using API.Middleware;
using Core.Interfaces;
using Infrastructure;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions;

public static class ApplicationServicesExtensions
{
    public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
    {
        services.AddSwaggerGen();
        services.AddDbContext<StoreContext>(x =>
            x.UseSqlite(config.GetConnectionString("DefaultConnection")));
        services.AddScoped<IProductRepository, ProductRepository>();
        services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));
        services.AddAutoMapper(typeof(MappingProfiles));

        return services;
    }

    public static IApplicationBuilder UseApplicationBuilder(this IApplicationBuilder app)
    {
        app.UseMiddleware<ExceptionMiddleware>();
        app.UseSwagger();
        app.UseSwaggerUI();

        return app;
    }
}