using System;
using System.ComponentModel.DataAnnotations;

namespace LossTracker.ViewModels
{
    public class MeasurementViewModel
    {
        public int Id { get; set; }

        [Required]
        public double WeightLbs { get; set; }

        [Required]
        public double WaistInches { get; set; }

        public DateTime Created { get; set; } = DateTime.UtcNow.Date;
    }
}