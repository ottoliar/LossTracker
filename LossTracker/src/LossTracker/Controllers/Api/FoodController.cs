using AutoMapper;
using LossTracker.Models;
using LossTracker.ViewModels;
using Microsoft.AspNet.Authorization;
using Microsoft.AspNet.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Net;

namespace LossTracker.Controllers.Api
{
    [Authorize]
    [Route("api/foods/")]
    public class FoodController : Controller
    {
        private ILogger<FoodController> _logger;
        private ITrackerRepository _repository;

        public FoodController(ITrackerRepository repository, ILogger<FoodController> logger)
        {
            _repository = repository;
            _logger = logger;
        }

        [HttpGet("{queryString}")]
        public JsonResult Get(string queryString)
        {
            return Json(Mapper.Map<IEnumerable<FoodViewModel>>(_repository.SearchFoods(queryString)));
        }

        [HttpPost("")]
        public JsonResult Post([FromBody]FoodViewModel vm)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var newFood = Mapper.Map<Food>(vm);

                    // Save to database after mapping the view model
                    _logger.LogInformation("Attempting to save new food...");
                    _repository.AddFood(newFood);

                    if (_repository.SaveAll())
                    {
                        var lastId = newFood.Id;
                        Response.StatusCode = (int)HttpStatusCode.Created;
                        return Json(lastId);
                    }
                }
            }
            catch (Exception ex)
            {
                _logger.LogError("Failed to save new food to the database", ex);
                Response.StatusCode = (int)HttpStatusCode.BadRequest;
                return Json(new { Message = ex.Message });
            }

            Response.StatusCode = (int)HttpStatusCode.BadRequest;
            return Json(new { Message = "Failed", ModelState = ModelState });
        }
    }
}