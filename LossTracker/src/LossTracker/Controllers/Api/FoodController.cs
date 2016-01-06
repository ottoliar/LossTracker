using AutoMapper;
using LossTracker.Models;
using LossTracker.ViewModels;
using Microsoft.AspNet.Mvc;
using System;
using System.Net;

namespace LossTracker.Controllers.Api
{
    [Route("api/foods")]
    public class FoodController : Controller
    {
        private ITrackerRepository _repository;

        public FoodController(ITrackerRepository repository)
        {
            _repository = repository;
        }

        [HttpGet("")]
        public JsonResult Get()
        {
            var results = _repository.GetAllFoods();

            return Json(results);
        }

        [HttpPost("")]
        public JsonResult Post([FromBody]FoodViewModel vm)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var newFood = Mapper.Map<Food>(vm);

                    Response.StatusCode = (int)HttpStatusCode.Created;
                    return Json(true);
                }
            }
            catch (Exception ex)
            {
                Response.StatusCode = (int)HttpStatusCode.BadRequest;
                return Json(new { Message = ex.Message });
            }

            Response.StatusCode = (int)HttpStatusCode.BadRequest;
            return Json(new { Message = "Failed", ModelState = ModelState });
        }
    }
}