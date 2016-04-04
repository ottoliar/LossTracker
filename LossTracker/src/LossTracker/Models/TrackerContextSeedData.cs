using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LossTracker.Models
{
    public class TrackerContextSeedData
    {
        private TrackerContext _context;
        private UserManager<LossTrackerUser> _userManager;

        public TrackerContextSeedData(TrackerContext context, UserManager<LossTrackerUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        public async Task EnsureSeedDataAsync()
        {
            if (await _userManager.FindByEmailAsync("ottoliarobert@gmail.com") == null)
            {
                var newUser = new LossTrackerUser()
                {
                    UserName = "ottoliar",
                    Email = "ottoliarobert@gmail.com"
                };

                await _userManager.CreateAsync(newUser, "testP@ssw0rd");
            }

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

                var seedProfile = new Profile()
                {
                    UserName = "ottoliar",
                    CalorieGoal = 2300,
                    ProteinGoal = 170,
                    FatGoal = 90,
                    CarbGoal = 180,
                    Measurements = new List<Measurement>(),
                    Entries = new List<DiaryEntry>()
                };

                var seedMeasurements = new List<Measurement>
                {
                    new Measurement() { Created = Convert.ToDateTime("01/24/2016"), WeightLbs = 206, WaistInches = 38 },
                    new Measurement() { Created = Convert.ToDateTime("01/30/2016"), WeightLbs = 203, WaistInches = 38 },
                    new Measurement() { Created = Convert.ToDateTime("02/12/2016"), WeightLbs = 199, WaistInches = 37 },
                    new Measurement() { Created = Convert.ToDateTime("02/19/2016"), WeightLbs = 197, WaistInches = 36 },
                    new Measurement() { Created = Convert.ToDateTime("02/27/2016"), WeightLbs = 197, WaistInches = 36 },
                    new Measurement() { Created = Convert.ToDateTime("03/04/2016"), WeightLbs = 195, WaistInches = 36 },
                    new Measurement() { Created = Convert.ToDateTime("03/14/2016"), WeightLbs = 194, WaistInches = 36 },
                    new Measurement() { Created = Convert.ToDateTime("03/31/2016"), WeightLbs = 190, WaistInches = 35 }
                };

                var seedEntry = new DiaryEntry()
                {
                    Day = DateTime.Today.Date,
                    NumberOfServings = 2,
                    FoodId = 1,
                    MealId = 1,
                    Food = _context.Foods.Where(f => f.Id == 1).FirstOrDefault()
                };

                foreach (var measurement in seedMeasurements)
                {
                    seedProfile.Measurements.Add(measurement);
                }

                seedProfile.Entries.Add(seedEntry);

                 _context.Profiles.Add(seedProfile);
                 _context.SaveChanges();
            }
        }
    }
}
