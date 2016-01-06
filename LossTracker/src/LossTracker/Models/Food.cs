using System;

namespace LossTracker.Models
{
    public class Food
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public int ServingSizeInGrams { get; set; }
        public int Calories { get; set; }
        public int ProteinGrams { get; set; }
        public int FatGrams { get; set; }
        public int CarbGrams { get; set; }
    }
}
