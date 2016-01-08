using System;
using System.Collections.Generic;

namespace LossTracker.Models
{
    public interface ITrackerRepository
    {
        void AddFood(Food newFood);
        IEnumerable<Food> GetAllFoods();
        IEnumerable<Measurement> GetMeasurements(DateTime day, string name);
        IEnumerable<DiaryEntry> GetDiaryEntries(DateTime day, string name);
        Profile GetProfile(string name);
        bool SaveAll();
    }
}