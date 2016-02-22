using System;
using System.Collections.Generic;

namespace LossTracker.Models
{
    public class DiaryEntry
    {
        public int Id { get; set; }
        public DateTime Day { get; set; }
        public int NumberOfServings { get; set; }
        public int FoodId { get; set; }
        public Food Food { get; set; }
        public int MealId { get; set; }
    }
}
