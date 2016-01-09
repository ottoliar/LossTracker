using LossTracker.Models;
using Microsoft.AspNet.Mvc;
using Microsoft.Extensions.Logging;
using System;

namespace LossTracker.Controllers.Api
{
    [Route("api/measurements")]
    class MeasurementController : Controller
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
            return Json(true);
        }

        [HttpGet("/measurements/{day}")]
        public JsonResult GetMeasurements(DateTime day, string name)
        {
            try
            {
                var results = _repository.GetMeasurements(day, name);

                if (results == null)
                {
                    return Json(null);
                }

                return Json(true);
            }
            catch (Exception ex)
            {

                return Json("Error occurred finding measurements.");
            }
        }
    }
}
