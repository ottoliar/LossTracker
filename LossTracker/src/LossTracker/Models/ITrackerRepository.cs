using System;
using System.Collections.Generic;

namespace LossTracker.Models
{
    public interface ITrackerRepository
    {
        void AddFood(Food newFood);
        void AddMeasurement(string name, Measurement newMeasurement);
        void AddDiaryEntry(string name, DiaryEntry newEntry);
        void DeleteDiaryEntry(int id);
        void DeleteMeasurement(int id);
        void EditEntry(DiaryEntry newEntry, int id);
        void UpdateProfile(Profile profile, string name);
        Food GetFood(int id);
        Profile GetProfile(string name);
        IEnumerable<Food> GetAllFoods();
        IEnumerable<Measurement> GetMeasurements(string name);
        IEnumerable<DiaryEntry> GetDiaryEntries(DateTime day, string name);
        bool SaveAll();
    }
}