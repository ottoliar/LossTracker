using AutoMapper;
using LossTracker.Models;
using LossTracker.ViewModels;
using Microsoft.AspNet.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Net;

namespace LossTracker.Controllers.Api
{
    [Route("api/measurements")]
    public class MeasurementController : Controller
    {
        private ILogger<MeasurementController> _logger;
        private ITrackerRepository _repository;

        public MeasurementController(ITrackerRepository repository, ILogger<MeasurementController> logger)
        {
            _repository = repository;
            _logger = logger;
        }

        [HttpGet("")]
        public JsonResult Get()
        {
            return Json(Mapper.Map<IEnumerable<MeasurementViewModel>>
                (_repository.GetMeasurements("ottoliar")));
        }

        [HttpPost("")]
        public JsonResult Post([FromBody]MeasurementViewModel vm)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var newMeasurement = Mapper.Map<Measurement>(vm);

                    _logger.LogInformation("Saving new measurement...");
                    _repository.AddMeasurement("ottoliar", newMeasurement);

                    if (_repository.SaveAll())
                    {
                        Response.StatusCode = (int)HttpStatusCode.Created;
                        return Json(Mapper.Map<MeasurementViewModel>(newMeasurement));
                    }
                }
            }
            catch (Exception ex)
            {
                _logger.LogError("Failed to save new measurement to the database", ex);
                Response.StatusCode = (int)HttpStatusCode.BadRequest;
                return Json(new { Message = ex.Message });
            }

            Response.StatusCode = (int)HttpStatusCode.BadRequest;
            return Json(new { Message = "Failed", ModelState = ModelState });
        }
    }
}
