using AutoMapper;
using LossTracker.Models;
using LossTracker.ViewModels;
using Microsoft.AspNet.Authorization;
using Microsoft.AspNet.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Net;

namespace LossTracker.Controllers.Api
{
    [Authorize]
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
            var result = Mapper.Map<ProfileViewModel>(_repository.GetProfile(User.Identity.Name)));

            if (result != null)
            {
                return Json(result);
            }
            else
            {
                return Json(null);
            }
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
                    _repository.UpdateProfile(newProfile, User.Identity.Name);

                    if (_repository.SaveAll())
                    {
                        Response.StatusCode = (int)HttpStatusCode.Created;
                        return Json(Mapper.Map<ProfileViewModel>(_repository.GetProfile(User.Identity.Name)));
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