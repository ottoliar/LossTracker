﻿using System;
using System.Collections.Generic;

namespace LossTracker.Models
{
    public interface ITrackerRepository
    {
        void AddFood(Food newFood);
        void AddMeasurement(string name, Measurement newMeasurement);
        void AddDiaryEntry(string name, DiaryEntry newEntry);
        void EditEntry(DiaryEntry entry);
        void UpdateProfile(Profile profile, string name);
        IEnumerable<Food> GetAllFoods();
        IEnumerable<Measurement> GetMeasurements(string name);
        IEnumerable<DiaryEntry> GetDiaryEntries(DateTime day, string name);
        Profile GetProfile(string name);
        bool SaveAll();
    }
}