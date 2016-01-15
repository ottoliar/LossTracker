using Microsoft.Data.Entity;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;

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
                .Measurements.Add(newMeasurement);
        }

        public void EditEntry(DiaryEntry entry)
        {
 
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
                return _context.Profiles
                                .Include(p => p.Entries)
                                .Where(p => p.UserName == name)
                                .FirstOrDefault()
                                .Entries
                                .Where(e => e.Day == date).ToList();
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