using System;
using System.ComponentModel.DataAnnotations;

namespace LossTracker.ViewModels
{
    public class FoodViewModel
    {
        public int Id { get; set; }

        [Required]
        [StringLength(255, MinimumLength = 5)]
        public string Description { get; set; }

        [Required]
        public int ServingSizeInGrams { get; set; }

        [Required]
        public int Calories { get; set; }

        [Required]
        public int ProteinGrams { get; set; }

        [Required]
        public int FatGrams { get; set; }

        [Required]
        public int CarbGrams { get; set; }
    }
}
