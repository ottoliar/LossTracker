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

        public IEnumerable<Measurement> GetMeasurements(DateTime day, string name)
        {
            try
            {
                return _context.Profiles
                               .Include(p => p.Measurements)
                               .Where(p => p.UserName == name)
                               .FirstOrDefault()
                               .Measurements
                               .Where(m => m.Created == day).ToList();
            }
            catch (Exception ex)
            {
                _logger.LogError("Could not get measurements from database", ex);
                return null;
            }
        }

        public IEnumerable<DiaryEntry> GetDiaryEntries(DateTime day, string name)
        {
            try
            {
                return _context.Profiles
                                .Include(p => p.Entries)
                                .Where(p => p.UserName == name)
                                .FirstOrDefault()
                                .Entries
                                .Where(e => e.Day == day).ToList();
            }
            catch (Exception ex)
            {
                _logger.LogError("Could not retrieve diary entries from the database", ex);
                return null;
            }
        }

        public Profile GetProfile(string name)
        {
            return _context.Profiles
                .Where(p => p.UserName == name)
                .FirstOrDefault();
        }

        public bool SaveAll()
        {
            return _context.SaveChanges() > 0;
        }
    }
}