using System.Text.Json;
using Core.Entities;
using Core.Interfaces;
using StackExchange.Redis;

namespace Infrastructure.Data;

public class BasketRepository : IBasketRepository
{
    private readonly IDatabase _database;

    public BasketRepository(IConnectionMultiplexer redis)
    {
        _database = redis.GetDatabase();
    }


    public async Task<CustomerBasket> GetBasketAsync(string basketId)
    {
        // Get the basket from Redis
        var data = await _database.StringGetAsync(basketId);
        // If the basket is not found, return null
        return data.IsNullOrEmpty ? null : JsonSerializer.Deserialize<CustomerBasket>(data);
    }

    public async Task<CustomerBasket> UpdateBasketAsync(CustomerBasket basket)
    {
        // Update the basket in Redis
        var created =
            await _database.StringSetAsync(basket.Id, JsonSerializer.Serialize(basket), TimeSpan.FromDays(30));
        // If the basket was not updated, return null
        if (!created) return null;
        // Return the updated basket
        return await GetBasketAsync(basket.Id);
    }

    public async Task<bool> DeleteBasketAsync(string basketId)
    {
        // Delete the basket from Redis
        return await _database.KeyDeleteAsync(basketId);
    }
}