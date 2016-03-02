using LossTracker.Models;
using System;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace LossTracker.ViewModels
{
    public class EntryViewModel
    {
        public int Id { get; set; }

        [Required]
        public double NumberOfServings { get; set; }

        [Required]
        public int FoodId { get; set; }
        public int MealId { get; set; }

        public Food Food { get; set; }

        public DateTime Day { get; set; } = DateTime.Today.Date;
    }
}
