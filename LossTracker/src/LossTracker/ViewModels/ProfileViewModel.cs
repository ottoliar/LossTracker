using System;
using System.ComponentModel.DataAnnotations;

namespace LossTracker.ViewModels
{
    public class ProfileViewModel
    {
        public int Id { get; set; }

        [Required]
        public int CalorieGoal { get; set; }

        [Required]
        public int ProteinGoal { get; set; }

        [Required]
        public int FatGoal { get; set; }

        [Required]
        public int CarbGoal { get; set; }
    }
}
