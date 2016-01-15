using AutoMapper;
using LossTracker.Models;
using LossTracker.ViewModels;
using Microsoft.AspNet.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Net;

namespace LossTracker.Controllers.Api
{
    [Route("api/profile")]
    public class ProfileController : Controller
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
            return Json(Mapper.Map<ProfileViewModel>(_repository.GetProfile("ottoliar")));
        }

        [HttpPost("")]
        public JsonResult Post([FromBody]ProfileViewModel vm)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    // Map new profile, and then supply username so old profile can be updated
                    var newProfile = Mapper.Map<Models.Profile>(vm);

                    _logger.LogInformation("Updating profile...");
                    _repository.UpdateProfile(newProfile, "ottoliar");

                    if (_repository.SaveAll())
                    {
                        Response.StatusCode = (int)HttpStatusCode.Created;
                        return Json(Mapper.Map<ProfileViewModel>(_repository.GetProfile("ottoliar")));
                    }
                }
            }
            catch (Exception ex)
            {
                _logger.LogInformation("Failed to update profile.", ex);
                Response.StatusCode = (int)HttpStatusCode.BadRequest;
                return Json(new { Message = ex.Message });
            }

            Response.StatusCode = (int)HttpStatusCode.BadRequest;
            return Json(new { Message = "Failed", ModelState = ModelState });
        }

    }
}