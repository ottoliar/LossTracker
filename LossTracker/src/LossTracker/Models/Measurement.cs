using System;

namespace LossTracker.Models
{
    public class Measurement
    {
        public int Id { get; set; }
        public DateTime Created { get; set; }
        public int WeightLbs { get; set; }
        public int WaistInches { get; set; }
    }
}