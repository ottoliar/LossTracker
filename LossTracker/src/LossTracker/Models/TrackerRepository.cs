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

        public IEnumerable<Profile> GetUserProfiles()
        {
            return _context.Profiles.OrderBy(p => p.UserName).ToList();
        }
    }
}