using API.Extensions;
using Core.Entities.Identity;
using Infrastructure.Data;
using Infrastructure.Identity;
using Microsoft.AspNetCore.Identity;
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
var userManager = scope.ServiceProvider.GetRequiredService<UserManager<AppUser>>();
var identityContext = scope.ServiceProvider.GetRequiredService<AppIdentityDbContext>();
try
{
    await context.Database.MigrateAsync();
    await identityContext.Database.MigrateAsync();
    await StoreContextSeed.SeedAsync(context, loggerFactory);
    await IdentityDbContextSeed.SeedUsersAsync(userManager);
}
catch (Exception ex)
{
    loggerFactory.CreateLogger<Program>().LogError(ex.Message);
}

// Configure the HTTP request pipeline.
app.UseApplicationBuilder();

app.UseHttpsRedirection();

app.UseStaticFiles();

app.UseCors(x => x.AllowAnyHeader().AllowAnyMethod().WithOrigins("https://localhost:3000", "https://localhost:4200"));

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

await app.RunAsync();