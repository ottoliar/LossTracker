using LossTracker.Models;
using Microsoft.AspNet.Mvc;
using Microsoft.Extensions.Logging;
using System;

namespace LossTracker.Controllers.Api
{
    [Route("api/profile")]
    class ProfileController : Controller
    {
        private ITrackerRepository _repository;
        private ILogger<ProfileController> _logger;

        public ProfileController(ITrackerRepository repository, ILogger<ProfileController> logger)
        {
            _repository = repository;
            _logger = logger;
        }

        [HttpGet("")]
        public JsonResult Get()
        {
            return Json(true);
        }
    }
}