using API.Error;
using Infrastructure.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class BuggyController : BaseApiController
{
    private readonly StoreContext _context;

    public BuggyController(StoreContext context)
    {
        _context = context;
    }

    [HttpGet("not-found")]
    public ActionResult GetNotFound()
    {
        var thing = _context.Products.Find(42);

        if (thing == null)
        {
            return NotFound(new ApiResponse(404));
        }

        return Ok();
    }

    [HttpGet("bad-request")]
    public ActionResult GetBadRequest()
    {
        return BadRequest(new ApiResponse(400));
    }
    
    [HttpGet("bad-request/{id}")]
    public ActionResult GetNotFoundRequest(int id)
    {
        return Ok();
    }

    [HttpGet("testauth")]
    [Authorize]
    public ActionResult<string> GetSecretText()
    {
        return "secret stuff";
    }


    [HttpGet("server-error")]
    public ActionResult GetServerError()
    {
        var thing = _context.Products.Find(42);

        var thingToReturn = thing.ToString();

        return Ok();
    }
}