using LossTracker.Models;
using Microsoft.AspNet.Mvc;
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
            var foods = _repository.GetAllFoods();

            return View(foods);
        }

        public IActionResult Progress()
        {
            return View();
        }

        public IActionResult Goals()
        {
            return View();
        }
    }
}