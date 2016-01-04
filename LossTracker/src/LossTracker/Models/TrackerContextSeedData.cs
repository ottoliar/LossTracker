using System;
using System.Collections.Generic;
using System.Linq;

namespace LossTracker.Models
{
    public class TrackerContextSeedData
    {
        private TrackerContext _context;

        public TrackerContextSeedData(TrackerContext context)
        {
            _context = context;
        }

        public void EnsureSeedData()
        {
            if (!_context.Foods.Any())
            {
                var seedFoods = new List<Food>
                {
                    new Food() { Description = "Chicken, Chipotle", ServingSizeInGrams = 113, Calories = 180, ProteinGrams = 32, FatGrams = 7, CarbGrams = 0 },
                    new Food() { Description = "White Rice, Chipotle", ServingSizeInGrams = 113, Calories = 190, ProteinGrams = 4, FatGrams = 4, CarbGrams = 34 },
                    new Food() { Description = "Fajitas, Chipotle", ServingSizeInGrams = 56, Calories = 20, ProteinGrams = 1, FatGrams = 0, CarbGrams = 4 },
                    new Food() { Description = "Black Beans, Chipotle", ServingSizeInGrams = 113, Calories = 120, ProteinGrams = 7, FatGrams = 1, CarbGrams = 22 },
                    new Food() { Description = "Guacamole, Chipotle", ServingSizeInGrams = 113, Calories = 230, ProteinGrams = 2, FatGrams = 22, CarbGrams = 8 }
                };   

                foreach (var food in seedFoods)
                {
                    _context.Foods.Add(food);
                }

                _context.SaveChanges();
            }
        }
    }
}
