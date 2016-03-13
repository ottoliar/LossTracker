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
    [Route("api/entries/{date}")]
    public class EntryController : Controller
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
            var result = Mapper.Map<IEnumerable<EntryViewModel>>(_repository.GetDiaryEntries(dateTime, User.Identity.Name));

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
        public JsonResult Post([FromBody]EntryViewModel vm)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    vm.Food = _repository.GetFood(vm.FoodId);
                    var newEntry = Mapper.Map<DiaryEntry>(vm);

                    _logger.LogInformation("Attempting to save new entry...");
                    _repository.AddDiaryEntry(User.Identity.Name, newEntry);

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

        [Authorize]
        [HttpPost]
        [Route("/api/entries/edit/{id}")]
        public JsonResult EditPost([FromBody]EntryViewModel vm, int id)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var entry = Mapper.Map<DiaryEntry>(vm);

                    _logger.LogInformation("Updating entry...");
                    _repository.EditEntry(entry, id);

                    if (_repository.SaveAll())
                    {
                        Response.StatusCode = (int)HttpStatusCode.Created;
                        return Json(true);
                    }
                }
            }
            catch (Exception ex)
            {
                _logger.LogError("Failed to save edited entry to the database", ex);
                Response.StatusCode = (int)HttpStatusCode.BadRequest;
                return Json(new { Message = ex.Message });
            }

            Response.StatusCode = (int)HttpStatusCode.BadRequest;
            return Json(new { Message = "Failed", ModelState = ModelState });
        } 

        [Authorize]
        [HttpGet]
        [Route("/api/entries/getentry/{id}")]
        public JsonResult GetSingleEntry(int id)
        {
            try
            {
                _logger.LogInformation("Getting entry from database...");

                var result = Mapper.Map<EntryViewModel>(_repository.GetSingleEntry(id));

                if (result != null)
                {
                    return Json(result);
                }
                else
                {
                    return Json(null);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError("Failed to save new entry to the database", ex);
                Response.StatusCode = (int)HttpStatusCode.BadRequest;
                return Json(new { Message = ex.Message });
            }

            Response.StatusCode = (int)HttpStatusCode.BadRequest;
            return Json(new { Message = "Failed", ModelState = ModelState });

        }

        [Authorize]
        [HttpPost]
        [Route("/api/entries/delete/{id}")]
        public JsonResult DeletePost(int id)
        {
            try
            {
                _logger.LogInformation("Deleting entry from database...");
                _repository.DeleteDiaryEntry(id);

                if (_repository.SaveAll())
                {
                    Response.StatusCode = (int)HttpStatusCode.Created;
                    return Json(true);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError("Failed to delete entry from database");
                Response.StatusCode = (int)HttpStatusCode.BadRequest;
                return Json(new { Message = ex.Message });
            }

            Response.StatusCode = (int)HttpStatusCode.BadRequest;
            return Json(new { Message = "Failed", ModelState = ModelState });
        }

    }
}
