using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class ProductsController : BaseApiController
{
    private readonly IProductRepository _productRepository;

    public ProductsController(IProductRepository productRepository)
    {
        _productRepository = productRepository;
    }

    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<Product>>> GetProducts()
    {
        return Ok(await _productRepository.GetProductsAsync());
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Product>> GetProduct(int id)
    {
        return await _productRepository.GetProductByIdAsync(id);
    }

    [HttpGet("brands")]
    public async Task<ActionResult<IReadOnlyList<ProductBrand>>> GetProductBrands()
    {
        return Ok(await _productRepository.GetProductBrandsAsync());
    }
    
    [HttpGet("types")]
    public async Task<ActionResult<IReadOnlyList<ProductType>>> GetProductTypes()
    {
        return Ok(await _productRepository.GetProductTypesAsync());
    }
}