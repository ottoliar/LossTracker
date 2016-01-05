using System;
using System.Collections.Generic;
using System.Linq;

namespace LossTracker.Models
{
    public class TrackerRepository : ITrackerRepository
    {
        private TrackerContext _context;

        public TrackerRepository(TrackerContext context)
        {
            _context = context;
        }

        public IEnumerable<Food> GetAllFoods()
        {
            return _context.Foods.OrderBy(f => f.Calories).ToList();
        }

        public IEnumerable<Profile> GetUserProfiles()
        {
            return _context.Profiles.OrderBy(p => p.UserName).ToList();
        }
    }
}