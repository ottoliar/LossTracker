using LossTracker.Models;
using Microsoft.AspNet.Mvc;
using Microsoft.Extensions.Logging;
using System;

namespace LossTracker.Controllers.Api
{
    [Route("api/entries/{day}")]
    class EntryController : Controller
    {
        private ILogger<EntryController> _logger;
        private ITrackerRepository _repository;

        public EntryController(ITrackerRepository repository, ILogger<EntryController> logger)
        {
            _repository = repository;
            _logger = logger;
        }

        [HttpGet("")]
        public JsonResult Get(string day)
        {
            return Json(true);
        }
    }
}
