using Microsoft.Data.Entity;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;

namespace LossTracker.Models
{
    public class TrackerRepository : ITrackerRepository
    {
        private TrackerContext _context;
        private ILogger<TrackerRepository> _logger;

        public TrackerRepository(TrackerContext context, ILogger<TrackerRepository> logger)
        {
            _context = context;
            _logger = logger;
        }
 
        public void AddFood(Food newFood)
        {
            _context.Add(newFood);
        }

        public void AddDiaryEntry(string name, DiaryEntry newEntry)
        {
            _context.Profiles
                .Where(p => p.UserName == name)
                .Include(p => p.Entries)
                .FirstOrDefault()
                .Entries
                .Add(newEntry);
        }

        public void DeleteDiaryEntry(int id)
        {
            var entryToDelete = GetSingleEntry(id);

            _context.Remove(entryToDelete);
        }

        public void DeleteMeasurement(int id)
        {
            var measurementToDelete = GetSingleMeasurement(id);

            _context.Remove(measurementToDelete);
        }

        public void AddMeasurement(string name, Measurement newMeasurement)
        {     
            _context.Profiles
                .Where(p => p.UserName == name)
                .Include(p => p.Measurements)
                .FirstOrDefault()
                .Measurements
                .Add(newMeasurement);
        }

        public void EditEntry(DiaryEntry newEntry, int id)
        {
            // Find the old entry and update it with the new information
            var oldEntry = GetSingleEntry(id);

            oldEntry.MealId = newEntry.MealId;
            oldEntry.NumberOfServings = newEntry.NumberOfServings;
            oldEntry.FoodId = newEntry.FoodId;
        }

        public void UpdateProfile(Profile newProfile, string name)
        {
            var oldProfile = GetProfile(name);

            // Create new profile if none exists; otherwise update the old to match the new
            if (oldProfile == null)
            {
                newProfile.UserName = name;
                _context.Profiles.Add(newProfile);
            }
            else
            {
                oldProfile.CalorieGoal = newProfile.CalorieGoal;
                oldProfile.ProteinGoal = newProfile.ProteinGoal;
                oldProfile.CarbGoal = newProfile.CarbGoal;
                oldProfile.FatGoal = newProfile.FatGoal;
            }
        }

        public Food GetFood(int id)
        {
            return _context.Foods.
                    Where(f => f.Id == id)
                    .FirstOrDefault();
        }

        public IEnumerable<Food> SearchFoods(string query)
        {
            return _context.Foods
                            .Where(f => f.Description.Contains(query));
        }

        public IEnumerable<Measurement> GetMeasurements(string name)
        {
            return _context.Profiles
                               .Include(p => p.Measurements)
                               .Where(p => p.UserName == name)
                               .FirstOrDefault()
                               .Measurements.ToList();
        }

        public IEnumerable<DiaryEntry> GetDiaryEntries(DateTime date, string name)
        {
            var result = _context.Profiles
                            .Include(p => p.Entries)
                            .Where(p => p.UserName == name)
                            .FirstOrDefault()
                            .Entries
                            .Where(e => e.Day.Date == date.Date)
                            .ToList();

            foreach (DiaryEntry entry in result)
            {
                entry.Food = GetFood(entry.FoodId);
            }

            return result;                   
        }

        public Profile GetProfile(string name)
        {
            return  _context.Profiles
                            .Where(p => p.UserName == name)
                            .SingleOrDefault();
        }

        public DiaryEntry GetSingleEntry(int id)
        {
            return _context.DiaryEntries
                            .Include(f => f.Food)
                            .Where(e => e.Id == id)
                            .SingleOrDefault();
        }

        public Measurement GetSingleMeasurement(int id)
        {
            return _context.Measurements
                            .Where(e => e.Id == id)
                            .SingleOrDefault();
        }

        public bool SaveAll()
        {
            return _context.SaveChanges() > 0;
        }
    }
}