﻿using AutoMapper;
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
            var result = (Mapper.Map<IEnumerable<MeasurementViewModel>>
                         (_repository.GetMeasurements(User.Identity.Name)));

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
        public JsonResult Post([FromBody]MeasurementViewModel vm)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var newMeasurement = Mapper.Map<Measurement>(vm);

                    _logger.LogInformation("Saving new measurement...");
                    _repository.AddMeasurement(User.Identity.Name, newMeasurement);

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

        [Authorize]
        [HttpPost]
        [Route("/api/delete/measurements/{id}")]
        public JsonResult DeletePost(int id)
        {
            try
            {
                _logger.LogInformation("Deleting measurement from database...");
                _repository.DeleteMeasurement(id);

                if (_repository.SaveAll())
                {
                    Response.StatusCode = (int)HttpStatusCode.Created;
                    return Json(true);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError("Failed to delete measurement from database");
                Response.StatusCode = (int)HttpStatusCode.BadRequest;
                return Json(new { Message = ex.Message });
            }

            Response.StatusCode = (int)HttpStatusCode.BadRequest;
            return Json(new { Message = "Failed", ModelState = ModelState });
        }
    }
}
