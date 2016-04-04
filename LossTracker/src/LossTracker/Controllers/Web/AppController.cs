using AutoMapper;
using LossTracker.Models;
using LossTracker.ViewModels;
using Microsoft.AspNet.Authorization;
using Microsoft.AspNet.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace LossTracker.Controllers
{
    public class AppController : Controller
    {
        private ITrackerRepository _repository;

        public AppController(ITrackerRepository repository)
        {
            _repository = repository;
        }

        public IActionResult Index()
        {
            return View();
        }

        [Authorize]
        public IActionResult Entries()
        {
            return View();
        }

        public IActionResult Progress()
        {
            return View();
        }

        public IActionResult Profile()
        {
            return View();
        }
    }
}