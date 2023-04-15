using System.Text.Json;
using Core.Entities;

namespace Infrastructure.Data;

public class StoreContextSeed
{
    public static async Task SeedAsync(StoreContext context)
    {
        if (!context.ProductBrands.Any())
        {
            var brandsData = await File.ReadAllTextAsync("../Infrastructure/Data/SeedData/brands.json");
            var brands = JsonSerializer.Deserialize<List<ProductBrand>>(brandsData);
            foreach (var item in brands)
            {
                context.ProductBrands.Add(item);
            }
        }
        if (!context.ProductTypes.Any())
        {
            var typesData = await File.ReadAllTextAsync("../Infrastructure/Data/SeedData/types.json");
            var types = JsonSerializer.Deserialize<List<ProductType>>(typesData);
            foreach (var item in types)
            {
                context.ProductTypes.Add(item);
            }
        }
        if (!context.Products.Any())
        {
            var productsData = await File.ReadAllTextAsync("../Infrastructure/Data/SeedData/products.json");
            var products = JsonSerializer.Deserialize<List<Product>>(productsData);
            foreach (var item in products)
            {
                context.Products.Add(item);
            }
        }
        await context.SaveChangesAsync();
    }
}