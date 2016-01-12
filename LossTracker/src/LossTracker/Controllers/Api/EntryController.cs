﻿using AutoMapper;
using LossTracker.Models;
using LossTracker.ViewModels;
using Microsoft.AspNet.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Net;

namespace LossTracker.Controllers.Api
{
    [Route("api/entries/{date}")]
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
        public JsonResult Get(string date)
        {
            // DateTime date mm/dd/yyyy
            DateTime dateTime = Convert.ToDateTime(date);

            return Json(Mapper.Map<IEnumerable<EntryViewModel>>(_repository.GetDiaryEntries(dateTime, "ottoliar")));
        }

        [HttpPost("")]
        public JsonResult Post([FromBody]EntryViewModel vm)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var newEntry = Mapper.Map<DiaryEntry>(vm);

                    _logger.LogInformation("Attempting to save new entry...");
                    _repository.AddDiaryEntry("ottoliar", newEntry);

                    if (_repository.SaveAll())
                    {
                        Response.StatusCode = (int)HttpStatusCode.Created;
                        return Json(Mapper.Map<EntryViewModel>(newEntry));
                    }
                }
            }
            catch (Exception ex)
            {
                _logger.LogError("Failed to save new entry to the database", ex);
                Response.StatusCode = (int)HttpStatusCode.BadRequest;
                return Json(new { Message = ex.Message });
            }

            Response.StatusCode = (int)HttpStatusCode.BadRequest;
            return Json(new { message = "Failed", ModelState = ModelState });
        }

        [HttpPost("/edit")]
        public JsonResult editPost([FromBody]EntryViewModel vm)
        {
            try
            {
                if (ModelState.IsValid)
                {
                   
                }
            }
            catch (Exception ex)
            {

            }
        } 

    }
}
