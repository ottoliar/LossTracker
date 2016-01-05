using System.Collections.Generic;

namespace LossTracker.Models
{
    public interface ITrackerRepository
    {
        IEnumerable<Food> GetAllFoods();
        IEnumerable<Profile> GetUserProfiles();
    }
}