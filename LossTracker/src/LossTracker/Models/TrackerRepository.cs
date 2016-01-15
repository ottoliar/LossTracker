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

        public void AddMeasurement(string name, Measurement newMeasurement)
        {     
            _context.Profiles
                .Where(p => p.UserName == name)
                .Include(p => p.Measurements)
                .FirstOrDefault()
                .Measurements
                .Add(newMeasurement);
        }

        public void EditEntry(DiaryEntry entry)
        {
 
        }

        public void UpdateProfile(Profile newProfile, string name)
        {
            var oldProfile = GetProfile(name);

            foreach (PropertyInfo prop in oldProfile.GetType().GetProperties())
            {
                // Update all fields except ID/UserName
                if (prop.Name != "Id" && prop.Name != "UserName")
                {
                    prop.SetValue(oldProfile, prop.GetValue(newProfile));
                }
            }
        }

        public Food GetFood(int id)
        {
            return _context.Foods.
                    Where(f => f.Id == id)
                    .FirstOrDefault();
        }

        public IEnumerable<Food> GetAllFoods()
        {
            try
            {
                return _context.Foods.OrderBy(f => f.Calories).ToList();
            }
            catch (Exception ex)
            {
                _logger.LogError("Could not get trips from database", ex);
                return null;
            }
        }

        public IEnumerable<Measurement> GetMeasurements(string name)
        {
            try
            {
                return _context.Profiles
                               .Include(p => p.Measurements)
                               .Where(p => p.UserName == name)
                               .FirstOrDefault()
                               .Measurements.ToList();
            }
            catch (Exception ex)
            {
                _logger.LogError("Could not get measurements from database", ex);
                return null;
            }
        }

        public IEnumerable<DiaryEntry> GetDiaryEntries(DateTime date, string name)
        {
            try
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
            catch (Exception ex)
            {
                _logger.LogError("Could not retrieve diary entries from the database", ex);
                return null;
            }
        }

        public Profile GetProfile(string name)
        {
            return  _context.Profiles
                            .Where(p => p.UserName == name)
                            .SingleOrDefault();
        }

        public bool SaveAll()
        {
            return _context.SaveChanges() > 0;
        }
    }
}