using System;

namespace LossTracker.Models
{
    public class Measurement
    {
        public int Id { get; set; }
        public DateTime Created { get; set; }
        public double WeightLbs { get; set; }
        public double WaistInches { get; set; }
    }
}