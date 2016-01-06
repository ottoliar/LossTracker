using System;
using System.Collections.Generic;

namespace LossTracker.Models
{
   public class Profile
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public int CalorieGoal { get; set; }
        public int ProteinGoal { get; set; }
        public int FatGoal { get; set; }
        public int CarbGoal { get; set; }

        public ICollection<Measurement> Measurements { get; set; }
        public ICollection<DiaryEntry> Entries { get; set; }
    }

}
