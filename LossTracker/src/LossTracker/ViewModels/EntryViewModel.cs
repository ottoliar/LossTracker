using LossTracker.Models;
using System;
using System.ComponentModel.DataAnnotations;

namespace LossTracker.ViewModels
{
    public class EntryViewModel
    {
        public int Id { get; set; }

        [Required]
        public int NumberOfServings { get; set; }

        [Required]
        public Food Food { get; set; }

        public DateTime Day { get; set; } = DateTime.UtcNow.Date;
    }
}
