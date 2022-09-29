using API.Extensions;
using API.Middleware;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddApplicationServices(builder.Configuration);

var app = builder.Build();

using var scope = app.Services.CreateScope();

var context = scope.ServiceProvider.GetRequiredService<StoreContext>();
var loggerFactory = scope.ServiceProvider.GetRequiredService<ILoggerFactory>();

try
{
    await context.Database.MigrateAsync();
    await StoreContextSeed.SeedAsync(context, loggerFactory);
}
catch (Exception ex)
{
    loggerFactory.CreateLogger<Program>().LogError(ex.Message);
}

// Configure the HTTP request pipeline.
app.UseApplicationBuilder();

app.UseHttpsRedirection();

app.UseStaticFiles();

app.UseAuthorization();

app.MapControllers();

await app.RunAsync();